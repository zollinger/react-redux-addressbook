import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'
import { Link } from 'react-router'
import LoginForm from '../components/LoginForm'

class LoginPage extends Component {

  render() {
    const {login} = this.props;

    return (
      <div>
        <h1>Login</h1>
        <LoginForm onSubmit={login} />
     </div>
    )
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
}


function mapStateToProps(state, ownProps) {
  return {
  }
}


export default connect(
  mapStateToProps,
  {
    login
  }
  )(LoginPage)
