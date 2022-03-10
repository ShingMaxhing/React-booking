import {Card, Button} from 'react-bootstrap'

export default function CourseCard({courseProp}){
	// console.log(props)
	console.log(courseProp)

	const {id, name, description, price, onOffer} = courseProp
	console.log(id)
	console.log(name)
	console.log(description)
	console.log(price)
	console.log(onOffer)


	return(
		<Card className="m-3">
			<Card.Body>
			    <Card.Title>{name}</Card.Title>
			    <Card.Subtitle>Description:</Card.Subtitle>
			    <Card.Text>{description}</Card.Text>
			    <Card.Subtitle>Price:</Card.Subtitle>
			    <Card.Text>{price}</Card.Text>
			    <Button variant="primary">Go somewhere</Button>
		  	</Card.Body>
		</Card>
	)
}