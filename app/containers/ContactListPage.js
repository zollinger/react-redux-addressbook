import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchContacts, searchContacts } from '../actions'
import {filter} from 'lodash/collection'
import { Link } from 'react-router'
import Loader from '../components/Loader'
import RoboHashImage from '../components/RoboHashImage'
import SearchInput from '../components/SearchInput'

class ContactListPage extends Component {

  componentWillMount() {
    this.props.fetchContacts()
  }

  renderItem(contact, idx) {
    let detailPage = '/contact-detail/' + contact.id
    return (
      <li key={idx} className="card">
        <h3>
          <RoboHashImage width={70} height={70} token={contact.email} />
          {contact.first_name}<br />
          {contact.last_name}
        </h3>
        <p>
          Phone: <br/>
          { contact.phone }<br/>
          E-Mail:<br/>
          <a href="mailto:{ contact.email }">{ contact.email }</a>
        </p>
        <p className="footer">
          <Link to={detailPage}>
            Detail
          </Link>
        </p>
      </li>
    )
  }

  applyFilter(list, searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase()
    return list.filter((contact)=>{
      const name = `${contact.first_name} ${contact.last_name}`
      return name.toLowerCase().indexOf(lowerCaseSearch) > -1
    })
  }

  render() {
    const {list, searchTerm, searchContacts, isLoaded} = this.props;
    const filteredList = this.applyFilter(list, searchTerm)
    let loader = <Loader />
    let contactList = null

    if (isLoaded) {
      loader = null
      contactList = <ul className="contacts-list">
               {filteredList.map(this.renderItem)}
             </ul>
    }

    return (
      <div className="contacts">
        <h1>
          Contacts
          <Link to="/contact-detail">
            <button>New</button>
          </Link>
        </h1>
        <p className="search-box">
          <SearchInput value={searchTerm}  onChange={searchContacts} />
        </p>
        {loader}
        {contactList}
     </div>
    )
  }
}

ContactListPage.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  let {searchTerm, list, isLoaded} = state.contactList;
  return {
    list,
    searchTerm,
    isLoaded
  }
}


export default connect(
  mapStateToProps,
  {
    fetchContacts,
    searchContacts
  }
  )(ContactListPage)
