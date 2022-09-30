import { Form, Button,  } from 'react-bootstrap'

import { submitButton, pageStyle } from './Styling'
 
const JobForm = (props) => {
    console.log('JobForm props: ', props)
    const { job } = props
     return (
         <Form style={ pageStyle } onSubmit={props.handleSubmit}>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                  placeholder="What is your job's title?"
                  value={job.title}
                  name="title"
                  id="title"
                  onChange={props.handleChange}
                  />
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                  placeholder="Describe what the job entails"
                  value={job.description}
                  name="description"
                  id="description"
                  onChange={props.handleChange}
                  />
                <Form.Label htmlFor="deadline: 2022-08-24T08:26:30">Deadline</Form.Label>
              <Form.Control
                  placeholder="ex. DD-MM-YYYY 08:26:00"
                  value={job.deadline}
                  name="deadline"
                  id="deadline"
                  onChange={props.handleChange}
                  />
              <Form.Label htmlFor="jobtype">Job Type</Form.Label>
                        <Form.Select aria-label="Default select example" name="jobtype" value={ job.jobtype }
                        onChange={ props.handleChange }>
                            <option>Open this select menu</option>
                            <option value="UI" >UI</option>
                            <option value="UX" >UX</option>
                            <option value="FE" >Frontend</option>
                            <option value="BE" >Backend</option>
                            <option value="FS" >Fullstack</option>
                            <option value="RE" >REFACTOR</option>
                        </Form.Select>
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                  placeholder="price"
                  value={job.price}
                  name="price"
                  id="price"
                  onChange={props.handleChange}
                  />
              <Form.Label htmlFor="tags">Tags</Form.Label>
              <Form.Control
                  placeholder="Enter what skills this job requires"
                  value={job.tags}
                  type="string"
                  name="tags"
                  id="tags"
                  onChange={props.handleChange}
              />
              <Button style={ submitButton } type='submit' variant='outline-dark'>Submit</Button>
          </Form>
      )
 }
 
 export default JobForm 