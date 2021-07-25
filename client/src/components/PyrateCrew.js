import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const PyrateCrew = (props) => {
    const {datos, setDatos} = props;
    
    const history = useHistory();

    const addPirate = (event) => {
        history.push("/pirate/new")
    }

    const viewPirate = (event, id) => {
        history.push(`/pirate/${id}`)
    }

    const walkThePlank = (event, id) => {
        Swal.fire({
            title: 'Walk the Plank',
            text: 'Are you sure this pirate goes to the Plank',
            icon: 'warning',
            showCancelButton: true
        }).then(result => {
            if(result.value) {
                axios.delete(`/api/pyrate/delete/${id}`)
                .then(resp => {
                    const pyrate = props.datos.filter(p => p._id !== id);
                    props.setDatos(pyrate); 
                }).catch(error => Swal.fire({
                    icon: "error",
                    title: "Error for the Plank",
                    text: "Occurred and error for pirate goes to the plank"
                }))
            }
        })
    }

    return ( 
        <Card>
            <CardHeader style={{backgroundColor:'#421010'}}><h1 style={{textAlign: 'center', color:'white'}}>Pirate Crew <Button style={{backgroundColor: '#6495ED', color:'#000', float:'right' , fontWeight:'bold', border:'2px solid black'}} onClick={event => addPirate(event)}>Add Pirate</Button></h1></CardHeader>
            <CardBody style={{backgroundColor:'#FFA500'}}>
                {datos && datos.map((people, index) => (
                <Row key={index} style={{border: '2px solid  black', marginBottom: '1rem'}}>
                    <Col sm={3}>
                        <img src={people.imageUrl} alt={people._id} style={{width: '11rem'}}/>
                    </Col>
                    <Col sm={9} style={{textAlign: 'center'}}>
                        <Row><h1 >{people.pyrateName}</h1></Row>
                        <Row>
                            <Col sm={6}><Button color="primary" style={{color:'#fff' , fontWeight:'bold', border:'2px solid black'}} onClick={(event)=> viewPirate(event, people._id) }>View Pirate</Button></Col>
                            
                            <Col sm={6}><Button color="danger" style={{color:'#fff' , fontWeight:'bold', border:'2px solid black'}} onClick={(event)=> walkThePlank(event, people._id) }>Walk the Plank</Button></Col>
                        </Row>
                    </Col>
                </Row>))}
            </CardBody>
        </Card>
    );
}

export default PyrateCrew;
