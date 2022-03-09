import { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
// import Banner from './components/Banner'
// import Highlights from './components/Highlights'
import Home from './pages/Home'
import './App.css';

function App() {
  return (
  <Fragment>
    <AppNavbar/>
    <Container>
      <Home/>
    </Container>
  </Fragment>
);
}

export default App;
