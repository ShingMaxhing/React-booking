import {Fragment} from 'react'
import courseData from './../data/courses'
import CourseCard from './../components/CourseCard'

export default function Courses() {

	console.log(courseData)

	return(
		<Fragment>
			<CourseCard courseProp={courseData[0]} />
			<CourseCard courseProp={courseData[1]} />
		</Fragment>

	)
}