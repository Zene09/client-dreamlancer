import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import {getAllBids} from '../../api/bids'
import Card from 'react-bootstrap/Card'
import { useNavigate, Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import { Modal } from 'react-bootstrap'
import CreateBidModel from './CreateBidModel'

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
     const [error, setError] = useState(false)
    const { user, job, msgAlert, show, handleClose, addBidForm } = props
    console.log('Props in BidsIndexModel', props)

     useEffect(() => { 
          if (!user){return navigate('/sign-in')}
          if (!job) {return null}
          getAllBids(user, job)
               .then(res => {
                    const conBids = res.data.bids.filter(bid=>(bid.contract_ref == job.id))
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
     },[show])

     if (error) {
          return <p>Error!</p>
      }
     if (!bids){
          return null
     } else if (bids.length === 0) {
          return <p>No bids yet.</p>
     }

     const bidCards = bids.map((bid) => (
          <Card style={{ width: '30%', margin: 5}} key={ bid._id }>
            <Card.Header>${ bid.bid_amount } - Owner: { bid.owner }</Card.Header>
            <Card.Body>
                <Card.Text> 
                         { bid.description } <br /> 
                         contract Id: { bid.contract_ref}
                </Card.Text>
            </Card.Body>
        </Card>
     ))
     
     return (
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton />
              <Modal.Body>
                    <div style={ cardContainerStyle }>
                         { bidCards }
                    </div>
                    {/* <button onClick={setCreateModalShow(true)}>Add A Bid! You Might Win!</button> */}
                    {addBidForm === true ?
                         <>
                              <h5>Add A Bid! You Might Win!</h5>
                              <CreateBidModel 
                                   user={user} 
                                   job={job} 
                                   msgAlert={msgAlert}
                                   show={createModalShow}
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