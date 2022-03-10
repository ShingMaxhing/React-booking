import {Fragment} from 'react'
import courseData from './../data/courses'
import CourseCard from './../components/CourseCard'

export default function Courses() {

	console.log(courseData)

	const courses = courseData.map(element => {
		// console.log(element)
		return <CourseCard key={element.id} courseProp={element} />
	})

	return(
		<Fragment>
			{courses}
		</Fragment>
	)
}