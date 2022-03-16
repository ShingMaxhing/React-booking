import {useState, useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'

export default function CourseCard({courseProp}){
	const {id, name, description, price, onOffer} = courseProp

	const [count, setCount] = useState(0)
	const [seats, setSeats] = useState(10)
	const [isOpen, setIsOpen] = useState(true)

	//useEffect allows us to execute code when a given state(s) (inside of the array) changes

	//when a component mounts (loads for the user for the first time), all of its associated states are initialized/created. Initialization counts as a state change, so useEffect fires/activates

	//The array inside of a useEffect hook can contain 0 states, 1 state, or many states (but the array must always be present)

	//If the array is empty, useEffect will ONLY happen on component mount (when it first loads)

	//If the array has one state named, useEffect will fire when the component mounts AND when the state changes

	//If there are two or more states in the array, useEffect will fire when the component mounts AND when ANY of those states change

	useEffect(() => {
		if(seats === 0){
			setIsOpen(false)
		}
	}, [seats])

	const enroll = () => {
		setCount(count + 1)
		setSeats(seats - 1)			
		// console.log(`Enrollees:` + count)
	}

	return(
		<Card className="m-3">
			<Card.Body>
			    <Card.Title>{name}</Card.Title>
			    <Card.Subtitle>Description:</Card.Subtitle>
			    <Card.Text>{description}</Card.Text>
			    <Card.Subtitle>Price:</Card.Subtitle>
			    <Card.Text>{price}</Card.Text>
			    <Card.Text>Enrollees: {count}</Card.Text>
			    <Card.Text>Seats: {seats}</Card.Text>
			    {isOpen
			    	?
			    	<Button variant="primary" onClick={enroll}>Enroll</Button>
			    	:
			    	<Button variant="primary" disabled>Enroll</Button>
			    }
			    
		  	</Card.Body>
		</Card>
	)
}
