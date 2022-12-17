import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import AddResident from './containers/AddResident';
import AddGaurd from './containers/AddGaurd'
import AddNotice from './containers/AddNotice'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Security from '@material-ui/icons/Security'
import Announcement from '@material-ui/icons/Announcement'

class App extends Component {

  drawerList = {
    'Add Resident': ['add-resident', <PersonAdd />],
    'Add Gaurd': ['add-gaurd', <Security />],
    'Add Notice': ['add-notice', <Announcement />],
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/login' component={Login} />
        <Route path='/login/dashboard' component={() =>
          <Dashboard drawerList={this.drawerList}>
            <Route exact path='/login/dashboard/add-resident' component={AddResident} />
            <Route exact path='/login/dashboard/add-gaurd' component={AddGaurd} />
            <Route exact path='/login/dashboard/add-notice' component={AddNotice} />
          </Dashboard>
        }
        />
      </div>
    );
  }
}

export default App;
