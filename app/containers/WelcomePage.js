import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class WelcomePage extends Component {

  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <p>
          <Link to="/contact-list">
            Contacts
          </Link>
        </p>
      </div>
    )
  }
}


export default connect()(WelcomePage)
