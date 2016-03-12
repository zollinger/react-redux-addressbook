import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import { combineReducers } from 'redux'
import cookie from 'react-cookie'

function contactList(state={list:[], searchTerm:'', isLoaded: false}, action) {
  if (action.contacts) {
    return {...state, list: action.contacts, isLoaded: true}
  }

  if(action.type === ActionTypes.SEARCH_CONTACTS) {
    return {...state, searchTerm: action.newTerm}
  }

  return state
}

function contactDetail(state={}, action) {
  if (action.contact) {
    return action.contact
  }
  if(action.type === ActionTypes.RESET_CONTACT_DETAILS) {
    return {}
  }
  return state
}

const INITIAL_AUTH_STATE = {
  token: cookie.load('AUTH_TOKEN'),
  isAuthenticated: cookie.load('AUTH_TOKEN') ? true : false
}
function auth(state=INITIAL_AUTH_STATE, action) {
  if(action.type === ActionTypes.LOGIN && action.token) {
    return {...state, token: action.token, isAuthenticated: true}
  }

  return state
}

const rootReducer = combineReducers({
  routing,
  auth,
  contactList,
  contactDetail,
  form: formReducer
})

export default rootReducer
