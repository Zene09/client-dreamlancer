import { useState, useEffect,  } from 'react'
import { destroyOneJob } from './../../api/jobs'
import { useParams, Link, useNavigate } from 'react-router-dom' 
 import LoadingScreen from '../shared/LoadingScreen'
 import { getOneJob } from '../../api/jobs'
 import messages from '../shared/AutoDismissAlert/messages'
 import { Container, Card } from 'react-bootstrap'

const ShowJob = (props) => {
    
    const [job, setJob] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    const { msgAlert } = props

    useEffect(() => {
        getOneJob(id)
            .then(res => setJob(res.data.job))
            .catch(err => {                   
               msgAlert({
                   heading: 'Error getting job',
                   message: messages.getjobsFailure,
                   variant: 'danger'
               })
               navigate('/')
           })
    }, [])

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
    console.log('HIIII, ', job)
    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{ job.name }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>This job was from: { job.from }</small></div>
                        <div><small>User's thoughts on the job was: { job.thoughts }</small></div>
                        <div><small>
                            User has eaten this job? { job.haveEaten ? 'yes' : 'no'}
                        </small></div>
                    </Card.Text>
                </Card.Body>
            </Card>

            <button onClick={deleteThis}>Delete Job</button>
            
            <Link to={`/jobs/${id}/edit`}>
                <button>Edit Job</button>
            </Link>
            
        </Container>
    )
}
 
 export default ShowJob