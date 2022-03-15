import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Register(){

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNo, setMobileNo] = useState("")
	const [password1, setPassword1] = useState("")
	const [password2, setPassword2] = useState("")
	const [isActive, setIsActive] = useState(false)

	const registerUser = (e) => {
		//prevent page redirect via form submission
		e.preventDefault()

		//check if user's email is unique first
		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data){
				Swal.fire({
					title: "Duplicate email found",
					icon: "error",
					text: "Please provide a different email"
				})
			}else{
				fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then(res => res.json())
				.then(data => {
					if(data){
						Swal.fire({
							title: "Registration successful",
							icon: "success",
							text: "Welcome to Zuitt!"
						})
					}else{
						Swal.fire({
							title: "Registration failed",
							icon: "error",
							text: "Please try again."
						})
					}
				})
			}
		})
	}

	//form validation
	useEffect(() => {

		if((firstName !== '' && lastName !== '' && email !== '' && mobileNo !== '' && password1 !== '' && password2 !== '') && (mobileNo.length === 11) && (password1 === password2)){
			setIsActive(true)
		}else{
			setIsActive(false)
		}

	}, [firstName, lastName, email, mobileNo, password1, password2])

	return(
		//Two-way Binding is implemented for each form input so that we can capture what the user is currently typing in a specific input

		//For example, our firstName input starts as blank because its value is our firstName state, which is an empty string by default

		//As the user types in the firstName input, an onChange event occurs. That onChange event's target is the firstName input, and the firstName input's value is whatever the user is currently typing

		//So as the user types, our state is changed to copy the value of the input that they are typing in

		<Form onSubmit={e => registerUser(e)} className="my-3">

			<Form.Group controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter first name"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter last name"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="mobileNo">
				<Form.Label>Mobile Number</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter mobile number"
					value={mobileNo}
					onChange={e => setMobileNo(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="password1">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter password"
					value={password1}
					onChange={e => setPassword1(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group controlId="password2" className="mb-4">
				<Form.Label>Verify Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Verify password"
					value={password2}
					onChange={e => setPassword2(e.target.value)}
					required
				/>
			</Form.Group>

			{isActive ?
				<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
				:
				<Button variant="secondary" id="submitBtn" disabled>Submit</Button>
			}

		</Form>
	)
}