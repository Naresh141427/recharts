import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITITAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccinationData: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')

    if (response.ok === true) {
      const data = await response.json()

      const upDatedLast7DaysVaccinationData = data.last_7_days_vaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )

      const updatedVaccinationByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))

      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        each => ({
          count: each.count,
          gender: each.gender,
        }),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        last7DaysVaccinationData: upDatedLast7DaysVaccinationData,
        vaccinationByGender: updatedVaccinationByGender,
        vaccinationByAge: updatedVaccinationByAge,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBarChart = () => {
    const {
      last7DaysVaccinationData,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state

    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="logo"
            alt="website logo"
          />
          <h1 className="logo-title">Co-WIN</h1>
        </div>
        <p className="website-description">CoWIN Vaccination In India</p>
        <div className="bar-chart-container">
          <h1 className="bar-chart-header">Vaccination Coverage</h1>
          <VaccinationCoverage
            last7DaysVaccinationData={last7DaysVaccinationData}
          />
        </div>

        <div className="bar-chart-container">
          <h1 className="bar-chart-header">Vaccination by gender</h1>
          <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="app-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          className="logo"
          alt="website logo"
        />
        <h1 className="logo-title">Co-WIN</h1>
      </div>
      <p className="website-description">CoWIN Vaccination In India</p>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure"
        />
        <p className="failure-text">Something went wrong</p>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="app-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          className="logo"
          alt="website logo"
        />
        <h1 className="logo-title">Co-WIN</h1>
      </div>
      <p className="website-description">CoWIN Vaccination In India</p>
      <div className="container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderBarChart()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default CowinDashboard
