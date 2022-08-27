// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import JobsIndex from './components/jobs/JobsIndex'
import ShowJob from './components/jobs/ShowJob'
import CreateJob from './components/jobs/CreateJob'
// import EditJob from './components/jobs/EditJob'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route 
						path='/' element={<Home msgAlert={msgAlert} user={user} />}
					/>
					{/* User Routes */}
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser}/>}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser}/>}
					/>
					<Route
						path='/sign-out'
						element={
							<RequireAuth user={user}>
								<SignOut 
									msgAlert={msgAlert} clearUser={clearUser} user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path='/change-pw'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					{/* Job Routes */}
					<Route
						path="/jobs"
						element={ 
							<JobsIndex 
								user={ user } 
								msgAlert={ msgAlert } 
							/>
						}
					/>
					<Route
						path="/jobs/:id"
						element={ 
							<ShowJob
								user={ user } 
								msgAlert={ msgAlert } 
							/>
						}
				/>
				<Route
					path="/addJob"
					element={
						<RequireAuth user={ user }>
							<CreateJob user={user} />
						</RequireAuth>
					}
				/>
				{/* <Route
=======
					/>
					<Route
						path="/myBets"
						element={
							<RequireAuth user={user}>
								<CreateJob user={user} />
							</RequireAuth>
						}
					/>
				<Route
>>>>>>> 09254643a64bbc8cd1ca578584ca0bcbf9e050cb
					path="/jobs/:id/edit"
					element={
						<RequireAuth user={ user }>
							<EditJob msgAlert={ msgAlert } user={ user } />
						</RequireAuth>
					}
				/> */}
				{/* These can be for developer user types, pending on how we would like to create them */}
		  		<Route
					path='sign-in/'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
          		<Route
            		path='sign-out/'
            		element={
              		<RequireAuth user={user}>
                		<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              		</RequireAuth>
            		}
          		/>
          		<Route
            		path='change-password/'
            		element={
              		<RequireAuth user={user}>
                		<ChangePassword msgAlert={msgAlert} user={user} />
              		</RequireAuth>}
          		/>
				
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
