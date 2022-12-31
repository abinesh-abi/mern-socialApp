import React from 'react'

function Pagination({pageNumber,pageCount,previousFn,nextFn}) {
  return (
        <div className='d-flex flex-row-reverse'>
          <div className="btn-container d-flex">
            <button onClick={previousFn} disabled={pageNumber === 1} 
            className='mx-2 btn btn-primary'>
              Previous
            </button>
            <i className="btn">
              Page {pageNumber} of {pageCount}
            </i>
            <button
            className="btn btn-primary"
              onClick={nextFn}
              disabled={pageNumber === pageCount}
            >
              Next
            </button>
          </div>
        </div>
  )
}

export default Pagination