/*Activity:
	Populate the fields in our specific course Card Component with the data that we receive from the server

	Points to remember:
		-Use the ID to get the course's specific data from the proper endpoint

		-The fetch request should happen on page load/component mount

		-Find a way to move that data from the scope of a .then statement into your return statement

		When done, push to Gitlab and paste the link to React - Routing and Conditional Rendering

*/

import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function SpecificCourse(){

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")

	const { user } = useContext(UserContext);

	//useParams() contains any values we are trying to pass in the URL, stored as a key/value pair
	//e.g.
	//courseId: 6i29905023852389058390
	const { courseId } = useParams();

	const history = useHistory();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})
	}, [])

	const enroll = () => {
		fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data){
				Swal.fire({
					title: "Successfully enrolled",
					icon: "success",
					text: `You have successfully enrolled to ${name}`
				})

				history.push("/courses")
			}else{
				Swal.fire({
					title: "Enrollment failed",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	return(
		<Card className="mt-3">
			<Card.Header className="bg-dark text-white text-center pb-0">
				<h4>{name}</h4>
			</Card.Header>
			<Card.Body>
				<Card.Text>{description}</Card.Text>
				<h6>Price: {price}</h6>
			</Card.Body>
			<Card.Footer className="d-grid gap-2">
				{user.id !== null ?
					<Button variant="primary" block="true" onClick={enroll}>Enroll</Button>
					:
					<Link className="btn btn-danger btn-block" to="/login">Log In to Enroll</Link>
				}
			</Card.Footer>
		</Card>
	)
}