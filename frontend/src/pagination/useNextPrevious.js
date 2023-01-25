import { useState, useEffect } from 'react'

const useNextPrevious = (limit, data) => {
  const [index, setIndex] = useState(0)
  const [showNext, setShowNext] = useState(false)
  const [showPrevious, setShowPrevious] = useState(false)

  useEffect(() => {
    if (data) {
      setShowNext(data.length > limit)
    }
  }, [data, limit])

  const handleNext = () => {
    const newIndex = index + limit
    setShowPrevious(newIndex > 0)
    setShowNext(data.length > newIndex + limit)
    setIndex(newIndex)
  }

  const handleLast = () => {
    const newIndex = Math.floor(data.length / limit) * limit
    setShowPrevious(newIndex > 0)
    setShowNext(false)
    setIndex(newIndex)
  }

  const handlePrevious = () => {
    const newIndex = index - limit
    setShowPrevious(newIndex !== 0)
    setShowNext(data.length > newIndex + limit)
    setIndex(newIndex)
  }

  const handleFirst = () => {
    setShowPrevious(false)
    setShowNext(data.length > limit)
    setIndex(0)
  }

  const getPageData = (sortedData) => {
    return sortedData.slice(index, index + limit)
  }

  const resetIndex = () => {
    setIndex(0)
    setShowNext(data.length > limit)
    setShowPrevious(false)
  }

  return {
    start: index + 1,
    stop: index + limit > data?.length ? data?.length : index + limit,
    showNext,
    showPrevious,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    getPageData,
    resetIndex
  }
}

export default useNextPrevious
