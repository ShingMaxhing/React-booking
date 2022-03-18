import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){

	// console.log(props)

	const { coursesProp, fetchData } = props;

	const [coursesArr, setCoursesArr] = useState([])

	const token = localStorage.getItem("token")

	const archiveToggle = (courseId, isActive) => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: !isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			fetchData()
		})
	}

	useEffect(() => {
		const courses = coursesProp.map(course => {
			return(
				<tr key={course._id}>
					<td>{course.name}</td>
					<td>{course.description}</td>
					<td>{course.price}</td>
					<td>
							{course.isActive
								? <span>Available</span>
								: <span>Unavailable</span>
							}
					</td>
					<td>
						<Button variant="primary" size="sm">Update</Button>
						{course.isActive
							? <Button variant="danger" size="sm" onClick={() => archiveToggle(course._id, course.isActive)}>Disable</Button>
							: <Button variant="success" size="sm" onClick={() => archiveToggle(course._id, course.isActive)}>Enable</Button>
						}
					</td>
				</tr>
			)
		})

		setCoursesArr(courses)

	}, [coursesProp])
	
	return(
		<>
			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>			
			</div>
			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{coursesArr}
				</tbody>
			</Table>
		</>
	)
}