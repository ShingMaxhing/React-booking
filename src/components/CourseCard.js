import {useState} from 'react'
import {Card, Button} from 'react-bootstrap'

export default function CourseCard({courseProp}){
	const {id, name, description, price, onOffer} = courseProp

	const [count, setCount] = useState(0)

	function enroll(){

		setCount(count + 1)
		console.log(`Enrollees:` + count)
	}

	return(
		<Card className="m-3">
			<Card.Body>
			    <Card.Title>{name}</Card.Title>
			    <Card.Subtitle>Description:</Card.Subtitle>
			    <Card.Text>{description}</Card.Text>
			    <Card.Subtitle>Price:</Card.Subtitle>
			    <Card.Text>{price}</Card.Text>
			    <Card.Text>Enroll: {count}</Card.Text>
			    <Button variant="primary" onClick={enroll}>Enroll</Button>
		  	</Card.Body>
		</Card>
	)
}