import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class App extends Component {

  render() {
    const { children } = this.props
    return (
    <div>
      <header className="page-header"></header>
      <div className="main">
        {children}
      </div>
      <footer className="page-footer"></footer>
    </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
