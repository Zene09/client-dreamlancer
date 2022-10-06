import { useState, useEffect,  } from 'react'
import { destroyOneJob } from './../../api/jobs'
import { useParams, useNavigate } from 'react-router-dom' 
import LoadingScreen from '../shared/LoadingScreen'
import { getOneJob, editOneJob } from '../../api/jobs'
import messages from '../shared/AutoDismissAlert/messages'
import { Container, Card } from 'react-bootstrap'

import EditJobModal from './EditJobModal'
import BidIndexModel from '../bids/BidIndexModel'
import { cardHeader, destroyButton, showButton, pageStyle } from "../shared/Styling"

const ShowJob = (props) => {
    const [job, setJob] = useState(null)
    const [clickedJob, setClickedJob]  = useState(null)
    const [addBidForm, setAddBidForm] = useState(null)
    const { user, msgAlert } = props
    const { id } = useParams()
    
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [bidModalShow, setBidModalShow] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        getOneJob(user, id)
            .then(res => setJob(res.data.contract))
            .catch(err => {                   
               msgAlert({
                   heading: 'Error getting job',
                   message: messages.getjobsFailure,
                   variant: 'danger'
               })
               navigate('/')
           })
    }, [updated, id, msgAlert, navigate, user])

    const deleteThis = () => {
        console.log('id: ',id)
        console.log('props.user: ', props.user)
        destroyOneJob(id, props.user)
        .then(res => {
            console.log('DONE, job has been deleted')
            navigate('/')
        })
        .catch(console.error)
    }

    if (!job) {
        return <LoadingScreen />
    }
    return (
        <Container className="fluid">
            <Card>
                <Card.Header style={ cardHeader }>{ job.title }</Card.Header>
                <Card.Body style={ pageStyle }>
                    <Card.Text>
                        <div><small>Owner ID: { job.owner }</small></div>
                        <div><small>Description: { job.description }</small></div>
                        <div><small>Deadline: { job.deadline }</small></div>
                        <div><small>Job Type: { job.jobtype }</small></div>
                        <div><small>Price: { job.price }</small></div>
                        <div><small>Tags: { job.tags }</small></div>
                    </Card.Text>
                </Card.Body>
            </Card>

            {job.owner === user.id
                ?
                <>
            <button class="btn btn-outline-light" style={ destroyButton } onClick={deleteThis}>Delete Job</button>
            {/* <button onClick={}>Bid on job</button> */}
            
                    <button 
                        style={ showButton }
                        onClick={() => setEditModalShow(true)} 
                        className="m-2" 
                        class="btn btn-outline-light"
                    >Edit The Job
                    </button>
                </>
                :
                null}

                {user.is_dev === true ?
                <>
                    <button class="btn btn-outline-light" style={showButton} onClick={()=> {
                        setBidModalShow(true)
                        setAddBidForm(false)
                        setClickedJob(job)}}
                    >See Bids Already Made
                    </button>
                    <button class="btn btn-outline-light" style={destroyButton} onClick={()=> {
                        setBidModalShow(true)
                        setAddBidForm(true)
                        setClickedJob(job)}}
                    >Make A Bid For This Job
                    </button>
                </>
                : null}

            <EditJobModal 
                user={user}
                job={job} 
                show={editModalShow} 
                editOneJob={editOneJob}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <BidIndexModel 
                user={user} 
                job={clickedJob} 
                msgAlert={msgAlert}
                show={bidModalShow} 
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setBidModalShow(false)} 
                addBidForm={addBidForm}  
            />
        </Container>
    )
}
 
 export default ShowJob