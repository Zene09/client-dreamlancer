import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import {getAllJobs} from '../../api/jobs'
import Card from 'react-bootstrap/Card'
import { useNavigate, Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// style for our card container
const cardContainerStyle = {
     display: 'flex',
     flexFlow: 'row wrap',
     justifyContent: 'left'
 }

const JobsIndex = (props) => {
     const navigate = useNavigate()
     const [jobs, setJobs] = useState(null)

     const [error, setError] = useState(false)

    const { user, msgAlert } = props
    console.log('Props in JobsIndex', props)

     useEffect(() => { 
          if (!user){return navigate('/sign-in')}
          getAllJobs(user)
               .then(res => {
                    setJobs(res.data.contracts)
               })
               .catch(err => {
                    msgAlert({
                        heading: 'Error Getting Jobs',
                        message: messages.getJobsFailure,
                        variant: 'danger',
                    })
                    setError(true)
                })
     },[])

     if (error) {
          return <p>Error!</p>
      }
     if (!jobs){
          return <p>Wating for the virtual mail man <LoadingScreen/></p>
     } else if (jobs.length === 0) {
          return <p>No jobs yet.</p>
     }

     const jobCards = jobs.map((job) => (
          <Card style={{ width: '30%', margin: 5}} key={ job._id }>
            <Card.Header>{ job.title }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/jobs/${job.id}`}>From { job.description }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
     ))

     return (
          <div style={ cardContainerStyle }>
               { jobCards }
          </div>
     )
}

export default JobsIndex