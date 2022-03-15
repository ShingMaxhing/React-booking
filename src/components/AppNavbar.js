import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import UserContext from "../UserContext"

export default function AppNavbar(){

	//analogy:
	//The user state and user state functions (setUser/unsetUser) that we defined in App.js are our "gifts"
	//When UserProvider passes these gifts to the entire app, they are wrapped inside of a "box" called UserContext
	//The useContext hook can be thought of as a "box cutter," because it is the only way to open the UserContext box and get the values within

	//destructure the user state and unsetUser function from UserContext, but using our book cutter: the useContext hook
	const { user, unsetUser } = useContext(UserContext)

	//function for logging out
	const logout = () => {
		unsetUser()
	}

	//conditional rendering for our NavBar, showing "Register" and "Log In" for user who are not logged in, and "Log Out" for users who are logged in
	const rightNav = (!user.id) ? (
		<>
			<Nav.Link href="#">Register</Nav.Link>
			<Nav.Link href="#">Log In</Nav.Link>
		</>
	) : (
		<Nav.Link onClick={logout}>Log Out</Nav.Link>
	)

	return(
		<Navbar bg="light" expand="lg">
		  <Container>
		    <Navbar.Brand href="#home">Zuitt</Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="ms-auto">
		        <Nav.Link href="#">Home</Nav.Link>
		        <Nav.Link href="#">Courses</Nav.Link>
		        {rightNav}
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}

