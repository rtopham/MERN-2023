import { Table } from 'react-bootstrap'

const DataTable = (props) => {
  const { data, config, keyFn, ...rest } = props

  const renderedHeaders = config.map((column) => {
    return <th key={column.label}>{column.label}</th>
  })
  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return <td key={column.label}>{column.render(rowData)}</td>
    })
    return <tr key={keyFn(rowData)}>{renderedCells}</tr>
  })
  return (
    <div>
      <Table {...rest}>
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </Table>
    </div>
  )
}
export default DataTable
