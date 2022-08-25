import { useState, useEffect,  } from 'react'
import { destroyOneJob } from './../../api/jobs'
import { useParams, Link, useNavigate } from 'react-router-dom' 
 import LoadingScreen from '../shared/LoadingScreen'
 import { getOneJob, editOneJob } from '../../api/jobs'
 import messages from '../shared/AutoDismissAlert/messages'
 import { Container, Card } from 'react-bootstrap'

 import EditJobModal from './EditJobModal'

const ShowJob = (props) => {
    const [job, setJob] = useState(null)
    const { user, msgAlert } = props
    const { id } = useParams()
    
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

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
    }, [updated])

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
                <Card.Header>{ job.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Description: { job.description }</small></div>
                        <div><small>Deadline: { job.deadline }</small></div>
                        <div><small>Job Type: { job.jobtype }</small></div>
                        <div><small>Price: { job.price }</small></div>
                        <div><small>Tags: { job.tags }</small></div>
                    </Card.Text>
                </Card.Body>
            </Card>

            <button onClick={deleteThis}>Delete Job</button>
            
            <button onClick={() => setEditModalShow(true)} 
                        className="m-2" 
                        variant="warning"
                    >Edit The Job
                </button>

            <EditJobModal 
                user={user}
                job={job} 
                show={editModalShow} 
                editOneJob={editOneJob}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            
        </Container>
    )
}
 
 export default ShowJob