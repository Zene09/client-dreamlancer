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