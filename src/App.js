import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner'
// import Highlights from './components/Highlights'
import Home from './pages/Home';
import Courses from './pages/Courses';
import SpecificCourse from './pages/SpecificCourse';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import { UserProvider } from './UserContext';
import './App.css';

//App.js is typically called the "top-level component"

function App() {

  //main app-wide user state
  //the user state determines whether a user is logged in or not (via the id) and if the user is an admin (via isAdmin)
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  //function to unset the user state/logging the user out
  const unsetUser = () => {
    localStorage.clear()

    setUser({
      id: null,
      isAdmin: null
    })
  }

  //Because our user state's values are reset to null when the page reloads (thus logging the user out), we need to use React's useEffect hook to re-fetch the user's details on reload to repopulate the fields in the user state
  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      //if we receive the user's data from our API, set the user state's values back to the user's details
      if(typeof data._id !== "undefined"){

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })

      }else{ //if not, set the user state's values to null

        setUser({
          id: null,
          isAdmin: null
        })

      }
    })

  }, [])

  return (
  //UserProvider distributes our user state, setUser function, and unsetUser function to our entire app
  <UserProvider value={{user, setUser, unsetUser}}>
    <Router>
      <AppNavbar/>
      <Container>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/courses" component={Courses}/>
            <Route exact path="/courses/:courseId" component={SpecificCourse}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route component={Error}/>
        </Switch>
      </Container>
    </Router>
  </UserProvider>
);
}

export default App;
