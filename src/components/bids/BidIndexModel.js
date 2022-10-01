import { useState, useEffect } from "react"
import { getAllBids } from '../../api/bids'
import Card from 'react-bootstrap/Card'
import { useNavigate} from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import { Modal } from 'react-bootstrap'
import CreateBidModel from './CreateBidModel'
import { editOneJob } from '../../api/jobs'
import { createOneContractBid } from '../../api/jobBids'
import { pageStyle, submitButton, cardHeader } from '../shared/Styling'
// sowButton is still here comment out. removed import {showButton} from '../shared/Styling' to remove React worning. 
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

     const { user, msgAlert, job, show, handleClose, addBidForm } = props
     // const [jobn, setJobn] = useState({...job})

     // console.log('HIHIHIHI JOBNS', jobn)

     console.log('Props in BidsIndexModel', props)

     useEffect(() => {
          if (!user) { return navigate('/sign-in') }
          if (!job) { return null }
          getAllBids(user, job)
               .then(res => {
                    // If we use ===, it will give a false when it should be true because the types are not the same.
                    // eslint-disable-next-line
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
     const run = async (bidId) => {
          console.log("HIHIHI!")
          console.log('bidId ',bidId)
          console.table(job)
          // console.log('bidId ',bidId)
          
          const updatedJob = {
                    can_bid: false
               }
               console.log('HIHIHIHI preJob')
               // console.log(prevJob)
               console.log('HIHIHIHI updatedjob')
               console.log(updatedJob)
               const prevJob = {...job}
               editOneJob({...prevJob, ...updatedJob}, user)
               const contractBid = {
                    contract_id: job.id, 
                    bid_id: bidId, 
                    status: 'PL', }
               createOneContractBid(contractBid, user)
     }

// setAccepted(true)
     // const acceptButton = (<>
     //      {job.owner === user.id ?
     //           <button onClick={run} > Accept </button>
     //           :
     //           null}
     // </>)

     // const acceptButton = (<>
     //      {job.owner === user.id ?
     //           <button onClick={() => setAccepted(true)} > Accept </button>
     //           :
     //           null}
     // </>)

     const bidCards = bids.map((bid) => (
          <Card style={{ width: '30%', margin: 5 }} key={bid._id}>
               <Card.Header style={ cardHeader }>${bid.bid_amount} - Owner: {bid.owner}</Card.Header>
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
                         <p>
                         {job.owner === user.id ?
               <button class='btn btn-outline-dark' style={ submitButton } onClick={()=>run(bid.id)} > Accept </button>
               :
               null}
                         </p>
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