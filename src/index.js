import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
// import AppNavbar from './components/AppNavbar'


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const name = "Chad"

// const user = {
//   firstName: "Thor",
//   lastName: "Odinson"
// }

// function formatName(user){
//   return user.firstName + ' ' + user.lastName
// }

// const formatName = (user) => `${user.firstName} ${user.lastName}`

// const element = <h1>Hello, {formatName(user)}</h1>

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );