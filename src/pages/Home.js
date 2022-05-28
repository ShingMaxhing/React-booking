import Banner from '../components/Banner'
import Highlights from '../components/Highlights'

export default function Home(){

	const data = {
		title: "Shing Tutorials",
		content: "Opportunities for everyone, everywhere",
		destination: "/courses",
		label: "Enroll now!"
	}

	return(
	<>
		<Banner bannerProps={data}/>
		<Highlights/>
	</>
	)
}
