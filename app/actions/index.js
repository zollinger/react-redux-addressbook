import 'isomorphic-fetch';
import {browserHistory} from 'react-router'
import {values} from 'lodash'
import {shuffle} from 'lodash/collection'
import cookie from 'react-cookie'

const BASE_URL = 'https://nameless-sierra-8010.herokuapp.com/api'

const CONTACTS_RESOURCE_URL = BASE_URL + '/Contacts'
const LOGIN_URL = BASE_URL + '/Users/login'

export const LOGIN = 'LOGIN'
export function login(user) {
  return (dispatch) => {
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(res => {
        cookie.save('AUTH_TOKEN', res.id, { path: '/' })
        dispatch({
          type: LOGIN,
          token: res.id
        })
        browserHistory.push('/contact-list')
      })
  }
}

export const CONTACTS_FETCHED = 'CONTACTS_FETCHED'
export function fetchContacts() {
  return (dispatch, getState) => {
    fetch(CONTACTS_RESOURCE_URL, {
        headers: {
          'Authorization': getState().auth.token
        }
      })
      .then(res => res.json())
      .then((contacts) => {
          dispatch({
            type: CONTACTS_FETCHED,
            contacts
          })
        }
      )
  }
}

export const CONTACT_DETAILS_FETCHED = 'CONTACT_DETAILS_FETCHED'
export function fetchContactDetail(id) {
  return (dispatch, getState) => {
    fetch(`${CONTACTS_RESOURCE_URL}/${id}`, {
        headers: {
          'Authorization': getState().auth.token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((contact) => {
          dispatch({
            type: CONTACT_DETAILS_FETCHED,
            contact
          })
        }
      )
  }
}
export const RESET_CONTACT_DETAILS = 'RESET_CONTACT_DETAILS'
export function resetContactDetails() {
  return {
    type: RESET_CONTACT_DETAILS
  }
}

export function updateContact(contact) {
  let url = CONTACTS_RESOURCE_URL;

  return (dispatch, getState) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': getState().auth.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(() => { browserHistory.push('/contact-list') });
  }
}

export const SEARCH_CONTACTS = 'SEARCH_CONTACTS'
export function searchContacts(newTerm) {
  return {
    type: SEARCH_CONTACTS,
    newTerm
  }
}

