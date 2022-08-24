import { useState } from 'react'
import { createOneJob } from './../../api/jobs'
import { useNavigate } from 'react-router-dom'
import JobForm from '../shared/JobForm'

const CreateJob = (props) => {
     const navigate = useNavigate()

     const [job, setJob] = useState({
          name: '',
          from: '',
          thoughts: '',
          haveEaten: false
     })

     const handleChange = (e) => {
          setJob(prevJob => {
               const updatedName = e.target.name
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
          createOneJob(job, props.user)
          .then((res) => {
               navigate(`/jobs/${res.data.job._id}`)
          })
          .catch((error)=>{
            console.log(error)})
     }

    return <JobForm job={ job } handleChange={ handleChange } handleSubmit={ handleSubmit } />
}

export default CreateJob