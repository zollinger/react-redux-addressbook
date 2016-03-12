import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form';

const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const LoginForm = (props) => {
  const {
    fields: {email, password},
    handleSubmit,
    submitting
  } = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Email</label><br/>
          <input type="email" {...email} />
        </p>
        {email.touched && email.error && <p>{email.error}</p>}
        <p>
          <label>Password</label><br/>
          <input type="password" {...password} />
        </p>
        {password.touched && password.error && <p>{password.error}</p>}
        <p>
          <input type="submit" disabled={submitting} value="Login" />
        </p>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'login',
  fields,
  validate
})(LoginForm)
