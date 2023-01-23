import { useState } from 'react'
import DataTable from './DataTable'
import {
  Icon,
  SORT_UNSORTED_ICON,
  SORT_ASC_ICON,
  SORT_DESC_ICON
} from '../icons'
import './table.css'
const SortableTable = (props) => {
  const { data, config } = props

  const [sortOrder, setSortOrder] = useState(null)
  const [sortBy, setSortBy] = useState(null)

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder('asc')
      setSortBy(label)
      return
    }
    if (sortOrder === null) {
      setSortOrder('asc')
      setSortBy(label)
    } else if (sortOrder === 'asc') {
      setSortOrder('desc')
      setSortBy(label)
    } else if (sortOrder === 'desc') {
      setSortOrder(null)
      setSortBy(null)
    }
  }
  const updatedConfig = config.map((column) => {
    if (!column.sortValue) return column
    return {
      ...column,
      header: () => (
        <th role='button' onClick={() => handleClick(column.label)}>
          <div className='d-flex flex-row align-items-center'>
            {getIcons(column.label, sortBy, sortOrder)}
            <span className='heading'>{column.label}</span>
          </div>
        </th>
      )
    }
  })
  let sortedData = data
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy)
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a)
      const valueB = sortValue(b)
      const reverseOrder = sortOrder === 'asc' ? 1 : -1

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder
      } else {
        return (valueA - valueB) * reverseOrder
      }
    })
  }

  const getIcons = (label, sortBy, sortOrder) => {
    if (label !== sortBy || sortOrder === null) {
      return (
        <div className='d-flex flex-column'>
          <Icon className='text-primary me-2' icon={SORT_UNSORTED_ICON} />
        </div>
      )
    }
    if (sortOrder === 'asc') {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_ASC_ICON} />
        </div>
      )
    } else if (sortOrder === 'desc') {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_DESC_ICON} />
        </div>
      )
    }
  }

  return <DataTable {...props} data={sortedData} config={updatedConfig} />
}
export default SortableTable
