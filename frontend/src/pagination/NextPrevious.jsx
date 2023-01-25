import React from 'react'
import { Button, Pagination } from 'react-bootstrap'
const NextPrevious = (props) => {
  const {
    showPrevious,
    showNext,
    handleNext,
    handlePrevious,
    handleFirst,
    handleLast,
    getPageData,
    resetIndex,
    divClass,
    className,
    children,
    bootstrap,
    first,
    last,
    config,
    ...rest
  } = props

  if (config) {
    const renderedButtons = config.map((button) => {
      return button.render()
    })

    return (
      <div className={divClass || 'd-flex justify-content-end'}>
        {children}
        {renderedButtons}
      </div>
    )
  }

  if (bootstrap)
    return (
      <div className={divClass || 'd-flex justify-content-end'}>
        {children}
        <Pagination>
          {showPrevious && <Pagination.First onClick={handleFirst} />}
          {showPrevious && <Pagination.Prev onClick={handlePrevious} />}
          {showNext && (
            <Pagination.Next className={className} onClick={handleNext} />
          )}
          {showNext && (
            <Pagination.Last className={className} onClick={handleLast} />
          )}
        </Pagination>
      </div>
    )

  return (
    <div className={divClass || 'd-flex justify-content-end'}>
      {children}
      {showPrevious && (
        <Button {...rest} className={className || 'me-3'} onClick={handleFirst}>
          &lt; &lt; &lt;
        </Button>
      )}
      {showPrevious && (
        <Button {...rest} onClick={handlePrevious}>
          Previous
        </Button>
      )}
      {showNext && (
        <Button {...rest} className={className || 'ms-3'} onClick={handleNext}>
          Next
        </Button>
      )}
      {showNext && (
        <Button {...rest} className={className || 'ms-3'} onClick={handleLast}>
          &gt;&gt;&gt;
        </Button>
      )}
    </div>
  )
}
export default NextPrevious
