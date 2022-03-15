import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
// import Banner from './components/Banner'
// import Highlights from './components/Highlights'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css';

//App.js is typically called the "top-level component"

function App() {
  return (
  <>
    <AppNavbar/>
    <Container>
      <Login/>
    </Container>
  </>
);
}

export default App;
