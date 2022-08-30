const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h1 className='home'>Home Page</h1>
			<p> The goal of Dreamlancer is to provide a one stop shop where clients can request and fulfill their projects with the help of freelance developer(s). Clients will be able to take small peeks as their project is built by their selected development team, a form of transparancy and accountability that is needed in the freelancing world! Developers will be able to update and provide a roadmap as development of a project continues, assuring that no misunderstandings happen along the development process. </p>
			<footer> By MMO & Co. | Special credit to EfrainAD, who puts the 'co' in code & Co. </footer>

		</>
	)
}

export default Home
