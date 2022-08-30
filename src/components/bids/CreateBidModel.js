import { useState } from 'react'
import { createOneBid } from './../../api/bids'
import { useNavigate } from 'react-router-dom'
import BidForm from '../shared/BidForm'


const CreateBidModel = (props) => {
     const navigate = useNavigate()
     const {
          user, job, show, handleClose, msgAlert, triggerRefresh
     } = props

     const [bid, setBid] = useState({
          description: '',
          bid_amount: '',
          title: 'hi',
          contract_ref: job.id
     })

     const handleChange = (e) => {
          setBid(prevBid => {
               const updatedName = e.target.name
               let updatedValue = e.target.value
               console.log(`${updatedName}: ${updatedValue}`)

               const updatedBid = {
                    [updatedName]: updatedValue
               }
               return {
                    ...prevBid,
                    ...updatedBid
               }
          })
     }

     const handleSubmit = (e) => {
          e.preventDefault()
          createOneBid(bid, props.user)
               .then(() => triggerRefresh())
               .then(() => handleClose())
               .then(() => {
                    msgAlert({
                         heading: 'Oh Yeah!',
                         message: 'Bid added',
                         variant: 'success'
                    })
               })

               .catch((err) =>
                    console.log(err)
               )
     }

     return <BidForm triggerRefresh={triggerRefresh} show={show} bid={bid} handleChange={handleChange} handleSubmit={handleSubmit} />
}

export default CreateBidModel