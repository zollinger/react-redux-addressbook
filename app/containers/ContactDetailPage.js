import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchContactDetail, updateContact, resetContactDetails} from '../actions'
import { Link } from 'react-router'
import ContactEditForm from '../components/ContactEditForm'
import Loader from '../components/Loader'
import {isEmpty} from 'lodash'

class ContactDetailPage extends Component {

  componentWillMount() {
    if(this.props.contactId) {
      this.props.fetchContactDetail(this.props.contactId)
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetContactDetails())
  }

  render() {
    const {contact, updateContact, contactId} = this.props
    let loader = <Loader />
    let contactForm = null
    if (!contactId || !isEmpty(contact)) {
      loader = null
      contactForm = <ContactEditForm contact={contact} onSubmit={updateContact} />
    }

    return (
      <div>
        <div className="side">
          <Link className="button button-back" to="/contact-list">
            Back
          </Link>
        </div>
        <div className="contact-detail">
        {loader}
        {contactForm}
        </div>
     </div>
    )
  }
}

ContactDetailPage.propTypes = {
  contactId: PropTypes.string,
  contact: PropTypes.object
}


function mapStateToProps(state, ownProps) {
  let {contactDetail} = state
  let {contactId} = ownProps.params
  return {
    contactId,
    contact: contactDetail
  }
}


export default connect(
  mapStateToProps,
  {
    fetchContactDetail,
    updateContact
  }
  )(ContactDetailPage)
