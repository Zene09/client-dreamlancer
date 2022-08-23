import { Form, Button,  } from 'react-bootstrap'
 
const JobForm = (props) => {
    console.log('JobForm props: ', props)
    const { job } = props
     return (
          <Form onSubmit={props.handleSubmit}>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                  placeholder="What is your job's title?"
                  value={job.title}
                  name="title"
                  id="title"
                  onChange={props.handleChange}
              />
              <Form.Label htmlFor="body">Discription</Form.Label>
              <Form.Control
                  placeholder="Where is this job about?"
                  value={job.body}
                  name="body"
                  id="body"
                  onChange={props.handleChange}
              />
              <Form.Label htmlFor="tags">Tags</Form.Label>
              <Form.Control
                  placeholder="What are your tags/notes on this job?"
                  value={job.tags}
                  type="string"
                  name="tags"
                  id="tags"
                  onChange={props.handleChange}
              />
              <Button type="submit">Submit</Button>
          </Form>
      )
 }
 
 export default JobForm 