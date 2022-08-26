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

export default BidForm