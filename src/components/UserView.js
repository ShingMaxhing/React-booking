import { useState, useEffect } from 'react';
// import courseData from './../data/courses'
import CourseCard from './CourseCard'

export default function UserView({coursesProp}) {

	const [coursesArr, setCoursesArr] = useState([])

	// console.log(courseData)

	//on component mount/page load, useEffect will run and call our fetchData function, which runs our fetch request
	useEffect(() => {
		const courses = coursesProp.map(course => {
			// console.log(course)
			if(course.isActive){
				return <CourseCard key={course._id} courseProp={course} />
			}else{
				return null
			}
		})

		setCoursesArr(courses)

	}, [coursesProp])

	return(
		<>
			{coursesArr}
		</>
	)
}