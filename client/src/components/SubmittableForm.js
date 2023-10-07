import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function SubmittableForm() {
    return (
        <InputGroup data-bs-theme="dark">
            <Button id="button-addon1">
                Upload
            </Button>
            <Form.Control as="textarea" aria-label="With textarea" />
        </InputGroup>
    )
}

export default SubmittableForm;