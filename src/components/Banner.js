import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Banner({bannerProps}){

	const { title, content, destination, label } = bannerProps
	
	return(
		<Row>
			<Col className="p-5 text-center">
				<h1>{title}</h1>
				<p>{content}</p>
				<Link className="btn btn-primary" to={destination}>{label}</Link>
			</Col>
		</Row>
	)
}