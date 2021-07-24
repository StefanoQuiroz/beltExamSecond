import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Swal from 'sweetalert2';

const Register = (props) => {
    const {users, setUsers} = props
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const crearUsuario = (event) => {
        axios.post(`/api/users/new`, input)
            .then(response => {
                if(response.data && response.data.data){
                    setUsers(users.concat([response.data.data]));
                    Swal.fire({
                        icon: "success",
                        title: "Registered",
                        text: "Registered with success!!"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error on Register",
                        text: response.data.error.message
                    })
                }
            })

            .catch (err => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while creating a new user'
            }) )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        crearUsuario(event);
    }

    const {firstName, lastName, email, password, confirmPassword} = input

    return (
        <Container style={{border:'2px solid black', marginTop:'1.5rem', backgroundColor:'white'}}>
            <Form onSubmit={onSubmit}>
                <Row>
                    <h4 style={{textAlign: 'center'}}>Register</h4>
                </Row>
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="fName" sm={4}>First Name</Label>
                    <Col sm={8}>
                        <Input type="text" name="firstName" id="fName" value={firstName} onChange={onChange} style={{border: '2px solid black'}}/>
                        {(firstName.length>0 && firstName.length<3) && <p style={{color:'red'}}>First name must be at least 3 characters or longer</p>}
                    </Col>
                </FormGroup>

                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="lName" sm={4}>Last Name</Label>
                    <Col sm={8}>
                        <Input type="text" name="lastName" id="lName" value={lastName} onChange={onChange} style={{border: '2px solid black'}}/>
                        {(lastName.length>0 && lastName.length<3) && <p style={{color:'red'}}>Last name must be at least 3 characters or longer</p>}
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" name="email" id="email" value={email} onChange={onChange} style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="passoword" sm={4}>Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="password" id="password" value={password} onChange={onChange} style={{border: '2px solid black'}}/>
                        {(password.length>0 && password.length<5) && <p style={{color:'red'}}>Password must be at least 5 characters or longer</p>}
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="confPassword" sm={4}>Confirm Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="confirmPassword" id="confPassword" value={confirmPassword} onChange={onChange} style={{border: '2px solid black'}}/>
                        {(password !== confirmPassword) && <p style={{color:'red'}}>Password and confirm password must be match</p>}
                    </Col>
                </FormGroup>
                <FormGroup row style={{padding: '1rem'}}>
                    <Col xs>
                        <Button color="primary" size='lg' style={{width:'100%', color:'#fff' , fontWeight:'bold', border:'2px solid black'}} type="submit">Submit</Button>
                    </Col>
                </FormGroup>  
            </Form>
        </Container>
    );
}

export default Register;
