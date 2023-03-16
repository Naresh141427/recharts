import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart width={1000} height={300} data={last7DaysVaccinationData}>
      <XAxis
        dataKey="vaccineDate"
        tick={{stroke: ' #94a3b8', strokeWidth: 0.5}}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{stroke: ' #cbd5e1', strokeWidth: 0}}
      />
      <Legend
        wrapperStyle={{
          padding: 20,
        }}
      />
      <Bar dataKey="dose1" name="Dose1" fill="#2d87bb" barSize="15%" />
      <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="15%" />
    </BarChart>
  )
}

export default VaccinationCoverage
