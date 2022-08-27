import { useState, useEffect } from 'react'
import { getOneJob, editOneJob } from './../../api/jobs'
import JobForm from '../shared/JobForm'
import { useParams, useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const EditJob = (props) => {
     const { id } = useParams()
     const { msgAlert } = props
     const [job, setJob] = useState(null)
     const navigate = useNavigate()
	console.log('props in CreateJob', props)
	console.log('params id in CreateJob: ', id)

     useEffect(() => {
          getOneJob(id)
              .then(res => {setJob(res.data.job)})
              .then(res => console.log('started fecth job ', job))
              .catch(err => {
                 msgAlert({
                     heading: 'Error getting job',
                     message: messages.getjobsFailure,
                     variant: 'danger'
                 })
                 navigate('/')
             })
      }, [])

     const handleChange = (e) => {
          setJob(prevJob => {

               const updatedName = e.target.name
               // const updatedValue = e.target.value
               let updatedValue = e.target.value
               const updatedChecked = e.target.checked
               console.log(`${updatedName}: ${updatedValue}`)

               const updatedJob = {
                    [updatedName]: updatedValue
               }
               return {
                    ...prevJob,
                    ...updatedJob
               }
          })
    }

     const handleSubmit = (e) => {
          e.preventDefault()
          console.log('EditJob job', job)
          console.log('EditJob props.user', props.user)
          console.log('EditJob user.token=', props.user.token)
          editOneJob(job, props.user)
          .then((res) => {
               console.log('DONE, job has been edited')
               navigate(`/jobs/${id}`)
           })
           .catch((error)=> console.error)
          // TODO: Find another way.
     }
     // if (job) {}
    return job ? <JobForm job={ job } handleChange={ handleChange } handleSubmit={ handleSubmit } /> : <p>Loading...</p>
//     return <JobForm job={ job } handleChange={ handleChange } handleSubmit={ handleSubmit } />
}

export default EditJob