import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import { getAllJobs } from '../../api/jobs'
import Card from 'react-bootstrap/Card'
import { useNavigate, Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import BidIndexModel from '../bids/BidIndexModel'
import { submitButton, showButton, pageStyle } from "../shared/Styling"
import Alert from 'react-bootstrap/Alert';

// style for our card container
const cardContainerStyle = {
     display: 'flex',
     flexFlow: 'row wrap',
     justifyContent: 'left'
 }

 // View all jobs Buttons
// const viewBidsStyle = {
//      display: 'flex',
//      justifyContent: 'right'
// }

const JobsIndex = (props) => {
     const navigate = useNavigate()
     const [jobs, setJobs] = useState(null)
     const [clickedJob, setClickedJob]  = useState(null)
     const [bidModalShow, setBidModalShow] = useState(false)
     const [error, setError] = useState(false)
     const [show, setShow] = useState(false);
     // const [accepted, setAccepted] = useState(false)

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
     
               // acceptOneBid(user, job)
               // .then(() =>
               //      msgAlert({
               //           heading: 'Sign In Success',
               //           message: messages.closeBidSuccess,
               //           variant: 'success',
               //      })
               // )
               // .then(() => navigate('/'))
                         // .then((res) => {
                         //      navigate(`/jobs/${res.data.contract.id}`, { replace: true })
                         // })

     // }

     if (show) {
          return <Alert variant="success" onClose={() => setShow(false)} dismissible>
               <Alert.Heading>Bid is Closed!</Alert.Heading>
               <p> Check Production status </p>
          </Alert>
     }

     const jobCards = jobs.map((job) => (
          <Card style={{ width: '30%', margin: 5}} key={ job._id }>
            <Card.Header style={{backgroundColor: '#F4A460', fontFamily: 'Play'}}>{ job.title } - { job.owner }</Card.Header>
            <Card.Body style={ pageStyle }>
                <Card.Text>
                    <Link to={`/jobs/${job.id}`}>
                         { job.description }
                    </Link>
                    <br />
                    <button class="btn btn-outline-light" style={ showButton } onClick={() => {
                         setBidModalShow(true)
                         setClickedJob(job)     
                         }}>Show Current Bids</button>
                         {job.owner === user.id ?
                              <button class="btn btn-outline-dark" style={ submitButton } onClick={() => setShow(true)}>Close Bid</button>
                              :
                              null}

                </Card.Text>
            </Card.Body>
        </Card>
     ))

     return (
          <div style={ cardContainerStyle }>
               { jobCards }
               <BidIndexModel 
                              user={user} 
                              job={clickedJob} 
                              msgAlert={msgAlert}
                              show={bidModalShow} 
                              handleClose={() => setBidModalShow(false)}
                              addBidForm={false} 
                         />
          </div>
     )
}

export default JobsIndex