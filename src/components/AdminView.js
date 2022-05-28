import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){

	// console.log(props)

	const { coursesProp, fetchData } = props;

	const [coursesArr, setCoursesArr] = useState([])

	const [showAdd,setShowAdd]=useState(false)
	const [showEdit,setShowEdit] = useState(false)
	const [courseId, setCourseId] = useState("")
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)

	const token = localStorage.getItem("token")

	//Functions to handle opening and closing modals
	const openAdd = () => setShowAdd(true)
	const closeAdd = () => setShowAdd(false)


	//tips:
	/*
	get fetch request 
	const openEdit = (courseId) =>  {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}
		`, {})


	*/

	const openEdit = (courseId) =>  {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			//console.log(data)
			setCourseId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})
		setShowEdit(true)
	}




	const closeEdit = () => {
		setName("")
		setDescription("")
		setPrice(0)
		setShowEdit(false)
	}

	const addCourse = (e) => {
		e.preventDefault()
		fetch(`${process.env.REACT_APP_API_URL}/courses`, {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data){
				Swal.fire({
					title: "Add Course Success",
					icon: "success",
					text: "Success!"
				})
				fetchData()
				closeAdd()
				//clearing form back to start after success
				setName("")
				setDescription("")
				setPrice(0)
			}else{
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
				fetchData()
			}
		})
	}

	const editCourse = (e) => {
		e.preventDefault()
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
			method: "PUT",
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data){
				Swal.fire({
					title: "Course Updated Success",
					icon: "success",
					text: "Course succesfully updated"
				})
				fetchData()
				closeEdit()
				//clearing form back to start after success				setName("")
				setDescription("")
				setPrice(0)
			}else{
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
				fetchData()
			}
		})
	}



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
			//console.log(data)
			if(data){
				let bool
				isActive ? bool = "disabled" : bool = "re-enabled"
				fetchData()
				Swal.fire({
					title: "Success",
					icon: "success",
					text: `Course successfully ${bool}`

				})
			}else{
				fetchData()
				Swal.fire({
					title: "Error",
					icon: "error",
					text: `Please try again`
			})
		}
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
						<Button variant="primary" size="sm" onClick={() => openEdit(course._id)}>Update</Button>
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
				<Button variant="primary" onClick={openAdd}>Add New Course</Button>			
			</div>
			{/* Table */}
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
			{/* Add Course Modal */}
			{/*
				Activity to be checked on Monday:
				Complete the add course form
				-No data validation necessary
				-Make sure to call the fetchData() function when you revieve a true response from the server
				-When done, only push AdminView.js
			
			 */}
		<Modal show = {showAdd} onHide={closeAdd}>
			<Form onSubmit = {e => addCourse(e)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Course</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId = "courseName">
							<Form.Label>Name</Form.Label>
							<Form.Control 
							value={name}
							onChange={e => setName(e.target.value)}
							type="text"
							required
							/>
						</Form.Group>

						<Form.Group controlId = "courseDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control 
							value={description}
							onChange={e => setDescription(e.target.value)}
							type="text"
							required/>
						</Form.Group>

						<Form.Group controlId = "coursePrice">
							<Form.Label>Price</Form.Label>
							<Form.Control 
							value={price}
							onChange={e => setPrice(e.target.value)}
							type="number"
							required
							/>
						</Form.Group>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>

					</Modal.Footer>
			</Form>
		</Modal>		
		{/* Edit Course Modal */}
		<Modal show = {showEdit} onHide={closeEdit}>
			<Form onSubmit={e => editCourse(e)}>
				<Modal.Header closeButton>
					<Modal.Title>Update Course</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group controlId = "courseName">
							<Form.Label>Name</Form.Label>
							<Form.Control 
							value={name}
							onChange={e => setName(e.target.value)}
							type="text"
							required
							/>
						</Form.Group>

						<Form.Group controlId = "courseDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control 
							value={description}
							onChange={e => setDescription(e.target.value)}
							type="text"
							required
							/>
						</Form.Group>

						<Form.Group controlId = "coursePrice">
							<Form.Label>Price</Form.Label>
							<Form.Control 
							value={price}
							onChange={e => setPrice(e.target.value)}
							type="number"
							required
							/>
						</Form.Group>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>

					</Modal.Footer>
			</Form>
		</Modal>
		</>
	)
}
