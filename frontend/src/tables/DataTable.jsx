import { Fragment } from 'react'
import { Table } from 'react-bootstrap'

const DataTable = (props) => {
  const { data, config, keyFn, nextPrevious, ...rest } = props

  let pageData = [...data]
  if (nextPrevious) pageData = nextPrevious.getPageData(data)

  const renderedHeaders = config.map((column) => {
    if (column.header)
      return <Fragment key={column.label}>{column.header()}</Fragment>
    return <th key={column.label}>{column.label}</th>
  })
  const renderedRows = pageData.map((rowData) => {
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
