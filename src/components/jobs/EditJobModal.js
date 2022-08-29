import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateJobSuccess, updateJobFailure } from '../shared/AutoDismissAlert/messages'

// components
import JobForm from '../shared/JobForm'

const EditJobModal = (props) => {
    const { 
        user, show, handleClose, 
        editOneJob, msgAlert, triggerRefresh
    } = props

    //PlaceHolder for the Job going to be edited, so I'll have all the part that are not been changed.
    const [job, setJob] = useState(props.job)

    console.log('job in edit modal', job)

    const handleChange = (e) => {
        setJob(prevJob => {
            // the key/value pair
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // console.logs
            console.log('this is the input type', e.target.type)
            console.log('%s: %s', e.target.name, e.target.value)

            // Create the key/value pair in an object
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
        // e equals the event
        e.preventDefault()
        editOneJob(job, user)
            // if successful cose the modal.
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateJobSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showJob component
            // updated is in ShowJob's useEffect's dependency array
            // changes to the updated boolean cause ShowJob's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateJobFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
            <JobForm job={ job } handleChange={ handleChange } handleSubmit={ handleSubmit } />
            </Modal.Body>
        </Modal>
    )
}

export default EditJobModal