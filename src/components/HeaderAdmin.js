import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class HeaderAdmin extends Component {
    render() {
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
                            <div className="container">
                                <Link className="navbar-brand" to="/">FATANONLINEBOOKSTORE</Link>
                            </div>
                        </nav>
        </div>
      )
    }
}

export default HeaderAdmin
