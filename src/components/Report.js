import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, {useRef} from 'react'

const Report =()=>{
    // /report
    // /report/:user/:coursetitle

    const descriptionRef = useRef();

    const addReport = async () => {
        // const type = titleRef.current.value;
        const description = description.current.value;
    }
    const addCourse = async () => {
        const title = titleRef.current.value;
        const subject = subjectRef.current.value;
        const price = Number(priceRef.current.value);
        const description = descriptionRef.current.value;
        const subtitle1Title = subtitle1TitleRef.current.value;
        const subtitle2Title = subtitle2TitleRef.current.value;
        const subtitle3Title = subtitle3TitleRef.current.value;
        const subtitle1Duration= Number(subtitle1DurationRef.current.value);
        const subtitle2Duration= Number(subtitle2DurationRef.current.value);
        const subtitle3Duration= Number(subtitle3DurationRef.current.value);
        const subtitle1Description= subtitle1DescriptionRef.current.value;
        const subtitle2Description= subtitle2DescriptionRef.current.value;
        const subtitle3Description= subtitle3DescriptionRef.current.value;

        const data = {title, description, subject, price,
            subtitles:[
                {title: subtitle1Title, description: subtitle1Description, duration: subtitle1Duration },
                {title: subtitle2Title, description: subtitle2Description, duration: subtitle2Duration },
                {title: subtitle3Title, description: subtitle3Description, duration: subtitle3Duration }
            ]};
        const link = APIURL + '/instructor/' + user.username + "/add-course";
        await axios.post(link, data);
        titleRef.current.value = "";
        subjectRef.current.value = "";
        priceRef.current.value = "";
        descriptionRef.current.value = "";
        subtitle1TitleRef.current.value = "";
        subtitle2TitleRef.current.value = "";
        subtitle3TitleRef.current.value = "";
        subtitle1DurationRef.current.value = "";
        subtitle2DurationRef.current.value = "";
        subtitle3DurationRef.current.value = "";
        subtitle1DescriptionRef.current.value = "";
        subtitle2DescriptionRef.current.value = "";
        subtitle3DescriptionRef.current.value = "";
        alert("Course Added")
    }

    return(
        <Card className="mt-4 w-50 mx-auto my-4">
            <Card.Header><strong>Report a Problem</strong></Card.Header>
            <Card.Body>
                <p>Please select the type of problem you have.</p>
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
                <p>{"\n"}</p>
                <FloatingLabel
                    controlId="floatingTitle"
                    label="Describe your problem"
                    className="mb-3"
                >
                <Form.Control ref={descriptionRef} type="title" placeholder="Title" />
                </FloatingLabel>
            </Card.Body>
            <Button className="w-25 mx-auto mb-3" variant="primary">Submit Report</Button>
        </Card>

    )
}

export default Report;
