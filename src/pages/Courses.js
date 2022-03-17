import { useState, useEffect, useContext } from 'react';
// import courseData from './../data/courses'
import UserView from  "../components/UserView"
import AdminView from  "../components/AdminView"
import UserContext from "../UserContext"

export default function Courses() {

	const { user } = useContext(UserContext);

	const [coursesData, setCoursesData] = useState([])

	// console.log(courseData)

	const fetchData = () => {
		fetch(`${ process.env.REACT_APP_API_URL }/courses`)
		.then(res => res.json())
		.then(data => {
			//.then has what is called a "self-contained scope"

			//Any code inside of this .then only exists inside of this .then, and therefore cannot be processed properly by React

			//to solve this problem, we use a state. By setting the new value of our state to be the data from our server, that state can be seen by our entire component
			setCoursesData(data)
		})
	}

	//on component mount/page load, useEffect will run and call our fetchData function, which runs our fetch request
	useEffect(() => {
		fetchData()
	}, [])

	return(user.isAdmin ?
		<AdminView />
		:
		<UserView coursesProp={coursesData}/>)
}