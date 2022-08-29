// import { useState, useEffect } from "react"
// import LoadingScreen from '../shared/LoadingScreen'
// import { getAllBids } from '../../api/bids'
// import Card from 'react-bootstrap/Card'
// import { useNavigate, Link } from 'react-router-dom'
// import messages from '../shared/AutoDismissAlert/messages'
// import BidIndexModel from '../bids/BidIndexModel'

// // style for our card container
// const cardContainerStyle = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'left'
// }

// // View all jobs Buttons
// const viewBidsStyle = {
//     display: 'flex',
//     justifyContent: 'right'
// }

// const myBidsIndex = (props) => {
//     const navigate = useNavigate()
//     const [bids, setBids] = useState(null)
//     const [clickedJob, setClickedJob] = useState(null)
//     // const [bidModalShow, setBidModalShow] = useState(false)
//     const [error, setError] = useState(false)
//     const [updated, setUpdated] = useState(false)

//     const { user, show, job, msgAlert } = props
//     console.log('Props in JobsIndex', props)

//     useEffect(() => {
//         if (!user) { return navigate('/sign-in') }
//         getAllBids(user, job)
//             .then(res => {
//                 const conBids = res.data.bids.filter(bid => (bid.owner == bid.id))
//                 console.log(conBids)
//                 setBids(conBids)
//             })
//             .catch(err => {
//                 msgAlert({
//                     heading: 'Error Getting Jobs',
//                     message: messages.getJobsFailure,
//                     variant: 'danger',
//                 })
//                 setError(true)
//             })
//     }, [show, updated])

//     if (error) {
//         return <p>Error!</p>
//     }
//     if (!bids) {
//         return <p>Wating for the virtual mail man <LoadingScreen /></p>
//     } else if (bids.length === 0) {
//         return <p>No jobs yet.</p>
//     }

//     const bidCards = bids.map((job) => (
//         <Card style={{ width: '30%', margin: 5 }} key={job._id}>
//             <Card.Header>{job.title} - {job.owner}</Card.Header>
//             <Card.Body>
//                 <Card.Text>
//                     <Link to={`/jobs/${job.id}`}>
//                         {job.description}
//                     </Link>
//                     <br />
//                     <button style={viewBidsStyle} onClick={() => {
//                         setBidModalShow(true)
//                         setClickedJob(job)
//                     }}>How Current Bids</button>
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     ))

//     return (
//         <div style={cardContainerStyle}>
//             {bidCards}
//         </div>
//     )
// }



// export default myBidsIndex