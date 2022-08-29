import { Form, Button,  } from 'react-bootstrap'
 
const BidForm = (props) => {
    console.log('BidForm props: ', props)
    const { bid } = props
     return (
         <Form onSubmit={props.handleSubmit}>
              {/* <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                  placeholder="What is your bid's title?"
                  value={bid.title}
                  name="title"
                  id="title"
                  onChange={props.handleChange}
                  /> */}
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                  placeholder="Describe what the bid entails"
                  value={bid.description}
                  name="description"
                  id="description"
                  onChange={props.handleChange}
               />
               <Form.Label htmlFor="bid_amount">Bid Amount</Form.Label>
              <Form.Control
                  placeholder="How much are you bidding?"
                  value={bid.bid_amount}
                  name="bid_amount"
                  id="bid_amount"
                  onChange={props.handleChange}
                  />
              <Button type="submit">Submit</Button>
          </Form>
      )
 }
 
 export default BidForm 
/*
import { Form, Button, Container, Row } from 'react-bootstrap'

const BidForm = (props) => {
    return (
        <Container className="justify-content-center mb-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label htmlFor="bid">Please place your bid </Form.Label>
                    <Form.Control
                        size="lg"
                        placeholder="Bid in dollars, no cents. Ex. 25 not 24.84 "
                        name="bid_amount"
                        id="bid_amount"
                        value={bid.bid_amount}
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor="body">Comments and/or Justification</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        style={{ overflow: "auto" }}
                        name="body"
                        id="body"
                        value={bid.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
*/