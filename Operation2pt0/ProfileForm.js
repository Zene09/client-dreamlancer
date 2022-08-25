import { Form, Button, } from 'react-bootstrap'

const ProfileForm = (props) => {
    console.log('ProfileForm props: ', props)
    const { profile } = props
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="Resume Name"
                value={profile.name}
                name="name"
                id="name"
                onChange={props.handleChange}
            />
            <Form.Label htmlFor="linkedIn">LinkedIn</Form.Label>
            <Form.Control
                placeholder="LinkedIn Profile Link"
                value={profile.linkedIn}
                name="linkedIn"
                id="linkedIn"
                onChange={props.handleChange}
            />
            <Form.Label htmlFor="github">Github</Form.Label>
            <Form.Control
                placeholder="Github Profile Link"
                value={profile.github}
                name="github"
                id="github"
                onChange={props.handleChange}
            />
            <Form.Label htmlFor="portfolio">Portfolio</Form.Label>
            <Form.Control
                placeholder="Portfolio Link"
                value={profile.portfolio}
                name="portfolio"
                id="portfolio"
                onChange={props.handleChange}
            />
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
                placeholder="Description"
                value={profile.description}
                name="description"
                id="description"
                onChange={props.handleChange}
            />
            <Form.Label htmlFor="skills">Skills</Form.Label>
            <Form.Control
                placeholder="Add Skills"
                value={profile.skills}
                type="string"
                name="skills"
                id="skills"
                onChange={props.handleChange}
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ProfileForm 