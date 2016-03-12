import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import RoboHashImage from './RoboHashImage'

const fields = ['id', 'first_name', 'last_name', 'email']

const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const ContactEditForm = (props) => {
    const {
      fields: {id, first_name, last_name, email},
      handleSubmit,
      contact,
      submitting
    } = props

    return (
      <div>
        <RoboHashImage width={200} height={200} token={email.value} />
        <form onSubmit={handleSubmit}>
          <input type="hidden" {...id} />
          <p>
            <label>First name</label><br/>
            <input type="text" {...first_name} />
          </p>
          {first_name.touched && first_name.error && <p>{first_name.error}</p>}
          <p>
            <label>Last name</label><br/>
            <input type="text" {...last_name} />
          </p>
          {last_name.touched && last_name.error && <p>{last_name.error}</p>}
          <p>
              <label>Email</label><br/>
              <input type="email" {...email} />
          </p>
          {email.touched && email.error && <p>{email.error}</p>}
          <p>
            <input type="submit" disabled={submitting} value="Save" />
          </p>
        </form>
      </div>
    )
}

ContactEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  if (!state.contactDetail.id) {
    return {}
  }
  return {
    initialValues: state.contactDetail
  }
}

export default reduxForm({
  form: 'contactedit',
  fields,
  validate
},
mapStateToProps
)(ContactEditForm)
