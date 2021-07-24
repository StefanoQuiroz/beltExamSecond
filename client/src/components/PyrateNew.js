import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';


const PyrateNew = (props) => {
    //const {id} = useParams()
    const history = useHistory()
    
    const crewBoard = (event) => {
        history.push(`/pirates`)
    }
    
    const {datos, setDatos} = props
    //const [error, setError] = useState({})
    const [input, setInput] = useState({
        pyrateName: "",
        imageUrl: "",
        treasureChest: 0,
        catchPhrase: "",
        crewPosition: "",
        pegLeg: "",
        eyePatch: "",
        hookHand: ""
    })

    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const checkChange = (event) => {
        const {name, checked} = event.target;
        setInput({
            ...input,
            [name]:checked
        })
    }


    const addPyrate = (event) => {
        axios.post("/api/pyrate/new", input)
            .then(response => {
                if(response.data&&response.data.data){
                    setDatos(datos.concat([response.data.data]));
                    crewBoard(event);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Add a Pirate Form",
                        text: response.data.message
                    })
                }
            })
            .catch(err => Swal.fire({
                icon: "error",
                title: "Loading Data not response",
                text: "An error occurred while creating a project"
            }))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        addPyrate(event);
    }

    const {pyrateName, imageUrl, treasureChest, catchPhrase, crewPosition, pegLeg, eyePatch, hookHand} = input;
    
    return (
        <Card>
            <CardHeader style={{backgroundColor:'#421010'}}><h1 style={{textAlign: 'center', color:'white'}}>Welcome to Pirate Crew <Button onClick={(event) => crewBoard(event)} style={{backgroundColor: '#6495ED', color:'#000', float:'right' , fontWeight:'bold', border:'2px solid black'}}>Crew Board</Button></h1></CardHeader>
            <CardBody style={{backgroundColor:'#FFA500'}}>
                <Row>
                    <Form onSubmit={onSubmit}  style={{border:'2px solid black', marginTop:'1.5rem', padding:'0.5rem'}}>   <Row>
                            <Col sm={6}>
                                <FormGroup row style={{padding: '1rem'}}>
                                    <Label for="name" style={{fontWeight:'600'}}>Pirate New</Label>
                                    <Input type="text" name="pyrateName" id="name" value={pyrateName} onChange={onChange} style={{border: '2px solid black'}} required/>
                                    {(pyrateName.length > 0 && pyrateName.length<3) && <p style={{color:'red', fontSize:'1.3rem'}}>The pyrate's name must be 3 character or longer</p>}              
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Label for="image" style={{fontWeight:'600'}}>Image Url</Label>
                                    <Input type="text" name="imageUrl" id="image" value={imageUrl} onChange={onChange} style={{border: '2px solid black'}} required/>
                                    {(imageUrl.length > 0 && imageUrl.length<6) && <p style={{color:'red', fontSize:'1.3rem'}}>The image Url's name must be 6 character or longer</p>}              
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Label for="treasures" style={{fontWeight:'600'}}># of treasure Chests</Label>
                                    <Input type="number" name="treasureChest" id="treasures" value={treasureChest} onChange={onChange} style={{border: '2px solid black'}} required/>
                                    {(treasureChest < 0) && <p style={{color:'red', fontSize:'1.3rem'}}>The treasure chest can not be negative</p>}              
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Label for="phrase" style={{fontWeight:'600'}}>Pirate Catch Phrase</Label>
                                    <Input type="text" name="catchPhrase" id="phrase" value={catchPhrase} onChange={onChange} style={{border: '2px solid black'}} required/>
                                    {(catchPhrase.length > 0 && pyrateName.length<4) && <p style={{color:'red', fontSize:'1.3rem'}}>The catch phrase must be 4 character or longer</p>}              
                                </FormGroup>
                            </Col>    
                            
                            <Col sm={6}>
                                <FormGroup row style={{padding: '1rem'}}>
                                    <Label for="crew" style={{fontWeight:'600'}}>Crew Position</Label>
                                    <Input type="select" name="crewPosition" id="crew" value={crewPosition} onChange={onChange} style={{border: '2px solid black'}} required>
                                        <option>Only Add crew position</option>
                                        <option value="Captain">Captain</option>
                                        <option value="First Mate">First Mate</option>
                                        <option value="Quarter Master">Quarter Master</option>
                                        <option value="Boatswain">Boatswain</option>
                                        <option value="Powder Monkey">Powder Monkey</option>
                                    </Input>
                                    {(!crewPosition) && <p style={{color:'red', fontSize:'1.3rem'}}>Add crew position please</p>}              
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Col sm={1}>
                                        <Input type="checkbox" name="pegLeg" id="peg" checked={pegLeg} onChange={checkChange} style={{border: '2px solid black'}} />    
                                    </Col>
                                    {(!pegLeg) && <p style={{color:'red', fontSize:'1.3rem'}}>The peg leg must be obligatory</p>}          
                                    <Label for="peg" style={{fontWeight:'600'}} sm={4}>Peg Leg</Label>
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Col sm={1}>
                                        <Input type="checkbox" name="eyePatch" id="eye" checked={eyePatch} onChange={checkChange} style={{border: '2px solid black'}} />
                                    </Col>
                                    {(!eyePatch) && <p style={{color:'red', fontSize:'1.3rem'}}>The eye patch must be obligatory</p>}           
                                    <Label for="eye" style={{fontWeight:'600'}} sm={4}>Eye Patch</Label>
                                </FormGroup>

                                <FormGroup row style={{padding: '1rem'}}>
                                    <Col sm={1}>
                                        <Input type="checkbox" name="hookHand" id="hook" checked={hookHand} onChange={checkChange} style={{border: '2px solid black'}}/>
                                         
                                    </Col>        
                                    {(!hookHand) && <p style={{color:'red', fontSize:'1.3rem'}}>The hook hand must be obligatory</p>}     
                                    <Label for="hook" style={{fontWeight:'600'}} sm={4}>Hook Hand</Label>
                                </FormGroup>    
                            
                                
                                <FormGroup row style={{padding: '1rem'}}>
                                    <Col xs>
                                        <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit" >Add Pirate</Button>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>        
                    </Form>
                </Row>
            </CardBody>
        </Card>
    );
}

export default PyrateNew;
