import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import { getAllBids } from '../../api/bids'
import Card from 'react-bootstrap/Card'
import { useNavigate, Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import { Modal } from 'react-bootstrap'
import CreateBidModel from './CreateBidModel'
import { editOneJob } from '../../api/jobs'
import { pageStyle, showButton, submitButton} from '../shared/Styling'
// style for our card container
const cardContainerStyle = {
     display: 'flex',
     flexFlow: 'row wrap',
     justifyContent: 'left'
}

const BidIndexModel = (props) => {
     const navigate = useNavigate()
     const [bids, setBids] = useState(null)
     const [createModalShow, setCreateModalShow] = useState(false)
     const [updated, setUpdated] = useState(false)
     const [error, setError] = useState(false)
     // const [accepted, setAccepted] = useState(false)

     const { user, job, msgAlert, show, handleClose, addBidForm, editOneJob } = props
     // const [job, setJob] = useState(props.job)

     // console.log('ujob in index modal', ujob)

     console.log('Props in BidsIndexModel', props)

     useEffect(() => {
          if (!user) { return navigate('/sign-in') }
          if (!job) { return null }
          getAllBids(user, job)
               .then(res => {
                    const conBids = res.data.bids.filter(bid => (bid.contract_ref == job.id))
                    console.log(conBids)
                    setBids(conBids)
               })
               .catch(err => {
                    msgAlert({
                         heading: 'Error Getting Bids',
                         message: messages.getBidsFailure,
                         variant: 'danger',
                    })
                    setError(true)
               })
     }, [show, updated])

     if (error) {
          return <p>Error!</p>
     }
     if (!bids) {
          return null
     }

     // const acceptButton = (<>
     //      {job.owner === user.id ?
     //           <button onClick={() => setAccepted(true)} > Accept </button>
     //           :
     //           null}
     // </>)

     // if (accepted) {
     //      console.log("can_bid status", job.can_bid)
     //      setJob(prevJob => {
     //           const updatedJob = {
     //                can_bid: false
     //           }
     //           return {
     //                ...prevJob,
     //                ...updatedJob
     //           }
     //      })
     //      editOneJob(job, user)

     //      job.can_bid = false
     //      console.log("new can_bid status?", job.can_bid)

     // }

     const bidCards = bids.map((bid) => (
          <Card style={{ width: '30%', margin: 5 }} key={bid._id}>
               <Card.Header style={pageStyle}>${bid.bid_amount} - Owner: {bid.owner}</Card.Header>
               <Card.Body>
                    <Card.Text>
                         {bid.description} <br />
                         contract Id: {bid.contract_ref}
                    </Card.Text>
               </Card.Body>
          </Card>
     ))

     const clientBidCards = bids.map((bid) => (
          <Card style={{ width: '30%', margin: 5 }} key={bid._id}>
               <Card.Header>${bid.bid_amount} - Owner: {bid.owner}</Card.Header>
               <Card.Body>
                    <Card.Text>
                         {bid.description} <br />
                         contract Id: {bid.contract_ref}
                         {/* <p>{acceptButton}</p> */}
                    </Card.Text>
               </Card.Body>
          </Card>
     ))

     return (
          <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton />
               <Modal.Body>
                    {bids.length === 0
                    ?
                    <p>No bids</p>
                    : null
          }
                    {user.is_dev === true
                         ?
                         <div style={cardContainerStyle}>
                              {bidCards}
                         </div>
                         :
                         <div style={cardContainerStyle}>
                              {clientBidCards}
                         </div>
                    }


                    {addBidForm === true ?
                         <>
                              <h5 style={pageStyle}>Add A Bid! You Might Win!</h5>
                              <CreateBidModel
                                   user={user}
                                   job={job}
                                   msgAlert={msgAlert}
                                   show={createModalShow}
                                   triggerRefresh={() => setUpdated(prev => !prev)}
                                   handleClose={() => setCreateModalShow(false)}
                              />
                         </>
                         : null
                    }
               </Modal.Body>
          </Modal>
     )
}

export default BidIndexModel