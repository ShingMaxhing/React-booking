import { Row, Col, Card } from 'react-bootstrap'

export default function Highlights(){
	return(
		<Row className="mt-3 mb-3">
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2>Learn From Home</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, numquam atque aliquid aut sed ab suscipit iure voluptas, corporis. Sed non quos est assumenda provident ipsam consequatur quasi repellendus cupiditate.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2>Study Now, Pay Later</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Quaerat aut reprehenderit labore id repellendus vitae omnis, minima deleniti temporibus eaque facere, libero quo eligendi fugit? Earum omnis ad dignissimos maiores.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2>Be Part of our Community</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Quaerat aut reprehenderit labore id repellendus vitae omnis, minima deleniti temporibus eaque facere, libero quo eligendi fugit? Earum omnis ad dignissimos maiores.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

		</Row>
	)
}