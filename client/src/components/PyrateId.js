import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const PyrateId = (props) => {
    const {id} = useParams()
    //const {datos, setDatos} = props;
    const [pyrate, setPyrate] = useState([]);
    
    const history = useHistory();

    const crewBoard = (event) => {
        history.push("/pirates");
    }


    /* const [input, setInput] = useState({
        pyrateName: "",
        imageUrl: "",
        treasureChest: 0,
        catchPhrase: "",
        crewPosition: "",
        pegLeg: true,
        eyePatch: true,
        hookHand: true
    } */

    useEffect(()=>{
        axios.get(`/api/pyrate/${id}`)
            .then(response => setPyrate(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Single private",
                text: "Error on loading the single private"
            }))
    }, [id])
    
    //buttons
    /* const update = (event) => {
        axios.put(`/api/pyrate/update/${id}`, pyrate)
            .then(response => {
                const index = datos.findIndex( dato => dato._id === id);
                datos.splice(index, 1, pyrate);
                setDatos(datos); 
            })
            .catch(err => Swal.fire({
                icon:'error',
                title:'Update error',
                text: "Error on loading"
            }))
    } */

    return (
        <Card>
            <CardHeader style={{backgroundColor:'#421010'}}><h1 style={{textAlign: 'center', color:'white'}}>{pyrate.pyrateName}<Button onClick={(event) => crewBoard(event)} style={{backgroundColor: '#6495ED', color:'#000', float:'right' , fontWeight:'bold', border:'2px solid black'}}>Crew Board</Button></h1></CardHeader>
            <CardBody style={{backgroundColor:'#FFA500'}}>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <img src={pyrate.imageUrl} alt={pyrate._id} style={{width:'100%'}}/>
                        </Row>    
                        <Row>
                            <h1 style={{textAlign: 'center', fontSize:'3.5rem'}}>" {pyrate.catchPhrase} "</h1>
                        </Row>    
                    </Col>
                    
                    <Col sm={6} style={{backgroundColor:'white'}}>
                        <Row>
                            <h1 style={{textAlign:'center'}}>About</h1>
                        </Row>
                        <Row>
                            <h2>Position: {pyrate.crewPosition}</h2>
                        </Row>
                        <Row>
                            <h2>Treasures: {pyrate.treasureChest}</h2>
                        </Row>
                        <Row>
                            <h2>Peg Leg: {pyrate.pegLeg? <span>Yes</span>:<Button color="danger">No</Button>}{!pyrate.pegLeg? <span>Yes</span>:<Button color="danger">No</Button>}</h2>
                        </Row>
                        <Row>
                            <h2>Eye Patch: {pyrate.eyePatch? <span>Yes</span>:<Button color="danger">No</Button>}{!pyrate.eyePatch? <span>Yes</span>:<Button color="danger">No</Button>}</h2>
                        </Row>
                        <Row>
                            <h2>Hook Hand: {pyrate.hookHand? <span>Yes</span>:<Button color="danger">No</Button>}{!pyrate.hookHand? <span>Yes</span>:<Button color="danger">No</Button>}</h2>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default PyrateId;
