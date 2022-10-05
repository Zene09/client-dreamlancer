import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import { getAllContractBid } from '../../api/jobBids'
import Card from 'react-bootstrap/Card'
import messages from '../shared/AutoDismissAlert/messages'
// import BidIndexModel from '../bids/BidIndexModel'

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'left'
}

// // View all jobs Buttons
// const viewBidsStyle = {
//     display: 'flex',
//     justifyContent: 'right'
// }

const MyBidsIndex = (props) => {
    const [contract_bids, setContract_bids] = useState(null)
    const [error, setError] = useState(false)

    const { user, msgAlert} = props
    console.log('Props in JobsIndex', props)

    useEffect(() => {
        if (!user) return
          console.log("in useEffect")
        getAllContractBid(user)
            .then(res => {
               console.table(res.data.contract_data[0])
                const conBids = res.data.contract_data.filter(contract_bid => (contract_bid.contract.owner === user.id))
                console.log(conBids)
                console.table(conBids)
                console.table(conBids.contract)
                setContract_bids(conBids)
            })
            .catch(err => {
               console.log('err: ', err)
                msgAlert({
                    heading: 'Error Getting Jobs',
                    message: messages.getJobsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    })

    if (error) {
        return <p>There an Error! Figure it out!</p>
    }
    if (!contract_bids) {
        return <p>Wating for the virtual mail man <LoadingScreen /></p>
    } else if (contract_bids.length === 0) {
        return <p>No accepted bids on your table.</p>
    }

    const bidCards = contract_bids.map((bid) => (
        <Card style={{ width: '30%', margin: 5 }} key={bid._id}>
            <Card.Header>{bid.title} - {bid.owner}</Card.Header>
            <Card.Body>
                <Card.Text>
                    Contract Name: {bid.contract.title} <br />
                    Bid's Name: {bid.bid.title} <br />
                    Bid's Amount: {bid.bid.bid_amount} <br />
                    Bid's status: {bid.status}
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {bidCards}
        </div>
    )
}



export default MyBidsIndex