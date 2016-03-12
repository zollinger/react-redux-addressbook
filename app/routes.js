import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import {requireAuthentication} from './components/Authenticated';
import WelcomePage from './containers/WelcomePage'
import ContactListPage from './containers/ContactListPage'
import ContactDetailPage from './containers/ContactDetailPage'
import LoginPage from './containers/LoginPage'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/contact-list" component={requireAuthentication(ContactListPage)} />
    <Route path="/contact-detail" component={requireAuthentication(ContactDetailPage)} />
    <Route path="/contact-detail/:contactId" component={requireAuthentication(ContactDetailPage)} />
  </Route>
)
