import { useState } from 'react';
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
// import Banner from './components/Banner'
// import Highlights from './components/Highlights'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Register from './pages/Register'
import Login from './pages/Login'
import { UserProvider } from './UserContext'
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

  return (
  //UserProvider distributes our user state, setUser function, and unsetUser function to our entire app
  <UserProvider value={{user, setUser, unsetUser}}>
    <AppNavbar/>
    <Container>
      <Login/> 
    </Container>
  </UserProvider>
);
}

export default App;
