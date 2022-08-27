import { useState, useEffect } from "react"
import LoadingScreen from '../shared/LoadingScreen'
import { getAllBids } from '../../api/bids'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'left'
}

const BidsIndex = (props) => {
    const [bids, setBids] = useState(null)
    const [error, setError] = useState(false)
    const { user, msgAlert } = props
    console.log('Props in BidsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllBids(user)
            .then(res => {
                setBids(res.data.bids)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Bids',
                    message: messages.getBidsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!bids) {
        return <p>Wating for the virtual mail man <LoadingScreen /></p>
    } else if (bids.length === 0) {
        return <p>No active bids yet.</p>
    }

    const bidCards = bid.map((bid) => (
        <Card style={{ width: '30%', margin: 5 }} key={bid._id}>
            <Card.Header>{bid.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/bids/${bid.id}`}>From {bid.description}</Link>
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
export default BidsIndex