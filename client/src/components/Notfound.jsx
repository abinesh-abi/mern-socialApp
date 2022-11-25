import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div className='pt-5'>
    <section id="wrapper" className="error-page">
        <div className="error-box">
            <div className="error-body text-center">
                <h1>404</h1>
                <h3 className="text-uppercase">Page Not Found !</h3>
                <p className="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                <Link to="/" className="btn btn-info btn-rounded waves-effect waves-light m-b-40">Back to home</Link> </div>
        </div>
    </section>
    </div>
  )
}

export default Notfound