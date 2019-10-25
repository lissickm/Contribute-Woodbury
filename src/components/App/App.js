import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import './App.css';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

import AddEvent from '../AddEvent/AddEvent';
import AddVolunteerRoles from '../AddVolunteerRoles/AddVolunteerRoles';
import Calendar from '../Calendar/Calendar';
import DirectoryPage from '../DirectoryPage/DirectoryPage';
import EditEvent from '../EditEvent/EditEvent';
import EditNonprofit from '../EditNonprofit/EditNonprofit';
import EventDetails from '../EventDetails/EventDetails';
import Home from '../Home/Home';
import InfoPage from '../InfoPage/InfoPage';
import NonprofitValidation from '../NonprofitValidation/NonprofitValidation';
import OrganizationHome from '../OrganizationHome/OrganizationHome';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import VolunteerList from '../VolunteerList/VolunteerList';
import VolunteerSignup from '../VolunteerSignup/VolunteerSignup';



class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div >
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}

            <Route
              exact
              path="/calendar"
              component={Calendar}
            />
            {/* NavLogin Test Route */}
            <Route
              exact
              path="/signup/:id"
              component={VolunteerSignup}
              />

            <ProtectedRoute
              exact
              path="/addevent/:id"
              component={AddEvent}
            />
            <ProtectedRoute
              exact
              path="/addvolunteers/:id"
              component={AddVolunteerRoles}
            />

            <ProtectedRoute
              exact
              path="/editEvent/:id"
              component={EditEvent}
            />

            <ProtectedRoute
              exact
              path="/editNonprofit/:id"
              component={EditNonprofit}
            />

            <Route
              exact
              path="/directory"
              component={DirectoryPage}
            />

            <ProtectedRoute
              exact
              path="/validation"
              component={NonprofitValidation}
            />

            <ProtectedRoute
              exact
              path="/volunteerList/:id"
              component={VolunteerList}
            />


            <Route 
              exact
              path="/organizationHome/:id"
              component={OrganizationHome}
            />

            <Route
              exact
              path="/eventDetails/:id"
              component={EventDetails}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}



export default connect()(App);
