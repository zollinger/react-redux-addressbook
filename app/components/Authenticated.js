import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

export function requireAuthentication(Component) {

  class Authenticated extends React.Component {

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        browserHistory.push(`/login?next=${redirectAfterLogin}`)
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
        )
      }
    }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(Authenticated)
}
