import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Report =()=>{
    return(
        <Card className="mt-4 w-50 mx-auto my-4">
            <Card.Header><strong>Report a Problem</strong></Card.Header>
            <Card.Body>
                <Form.Check
                inline
                label="Technical"
                name="group1"
                type='radio'
                id={`inline-$'radio'-2`}
                />
                <Form.Check
                    inline
                    label="Financial"
                    name="group1"
                    type='radio'
                    id={`inline-$'radio'-2`}
                />
                <Form.Check
                    inline
                    label="Other"
                    name="group1"
                    type='radio'
                    id={`inline-$'radio'-2`}
                />
                <FloatingLabel
                    controlId="floatingTitle"
                    label="Describe your problem"
                    className="mb-3"
                >
                <Form.Control type="title" placeholder="Title" />
                </FloatingLabel>
            </Card.Body>
            <Button className="w-25 mx-auto mb-3" variant="primary">Submit Report</Button>
        </Card>

    )
}

export default Report;
