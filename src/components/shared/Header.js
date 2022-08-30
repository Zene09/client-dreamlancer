import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
	color: '#FEF8EB',
	fontFamily: 'Play',
	textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const clientOptions = (
	<Nav.Item className='m-2'>
		<Link to="/addJob" style={linkStyle}>
			Post A Job
		</Link>
	</Nav.Item>
)
const devOptions = (
	<Nav.Item className='m-2'>
		<Link to="/mybids" style={linkStyle}>
			{/* My Bids */}
		</Link>
	</Nav.Item>
)

const unauthenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
		</Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
		<Nav.Item className='m-2'>
			<Link to='/jobs' style={linkStyle}>
				Jobs
			</Link>
		</Nav.Item>
	</>
)

const nothing = (<></>)

const Header = ({ user }) => (
	<Navbar sticky='top' style={{ backgroundColor: '#381D2A' }} variant='dark' expand='md'>
		<Navbar.Brand>
			<Link to='/' style={linkStyle}>
				DreamLancer
			</Link>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.name}</span>
				)}
				{alwaysOptions}
				{user && user.is_dev === true ?
					devOptions :
					nothing}
				{user && user.is_dev === false ?
					clientOptions :
					nothing}
				{user ?
					authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
