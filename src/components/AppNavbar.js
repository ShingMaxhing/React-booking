import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import UserContext from "../UserContext"

export default function AppNavbar(){

	//analogy:
	//The user state and user state functions (setUser/unsetUser) that we defined in App.js are our "gifts"
	//When UserProvider passes these gifts to the entire app, they are wrapped inside of a "box" called UserContext
	//The useContext hook can be thought of as a "box cutter," because it is the only way to open the UserContext box and get the values within

	//destructure the user state and unsetUser function from UserContext, but using our book cutter: the useContext hook
	const { user, unsetUser } = useContext(UserContext)

	const history = useHistory()

	//function for logging out
	const logout = () => {
		unsetUser()

		history.push("/login")
	}

	//conditional rendering for our NavBar, showing "Register" and "Log In" for user who are not logged in, and "Log Out" for users who are logged in
	const rightNav = (!user.id) ? (
		<>
			<Link className="nav-link" to="/register">Register</Link>
			<Link className="nav-link" to="/login">Log In</Link>
		</>
	) : (
		<Nav.Link onClick={logout}>Log Out</Nav.Link>
	)

	return(
		<Navbar bg="light" expand="lg">
		  <Container>
		    <Link className="navbar-brand" to="/">Zuitt</Link>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="ms-auto">
		        <Link className="nav-link" to="/">Home</Link>
		        <Link className="nav-link" to="/courses">Courses</Link>
		        {rightNav}
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}

