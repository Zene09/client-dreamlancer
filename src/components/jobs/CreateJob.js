import { useState } from 'react'
import { createOneJob } from './../../api/jobs'
import { useNavigate } from 'react-router-dom'
import JobForm from '../shared/JobForm'

const CreateJob = (props) => {
     const navigate = useNavigate()

     const [job, setJob] = useState({
          title: '',
          description: '',
          deadline: '',
          jobtype: '',
          price: '',
          tags: ''
     })

     const handleChange = (e) => {
          setJob(prevJob => {
               const updatedName = e.target.name
               let updatedValue = e.target.value
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
               navigate(`/jobs/${res.data.contract.id}`, {replace: true})
          })
          .catch((error)=>{
            console.log(error)})
     }

    return <JobForm job={ job } handleChange={ handleChange } handleSubmit={ handleSubmit } />
}

export default CreateJob