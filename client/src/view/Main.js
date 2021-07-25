import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Register from '../components/Register';
import Login from '../components/Login';
import PyrateNew from '../components/PyrateNew';
import PyrateCrew from '../components/PyrateCrew';
import PyrateId from '../components/PyrateId';
const Main = () => {
    //const [actualizar, setActualizar] = useState(0)
    const [datos, setDatos] = useState([]);

    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        axios.get("/api/pyrate")
            .then(response => setDatos(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Pyrates",
                text: "Error in loading the data from Pyrates"
            }))
        axios.get("/api/users")
            .then(response => setUsers(response.data.data))
            .catch(err => Swal.fire({
                icon: "error",
                title: "Users Error",
                text: "Error in loading the data from users"
            }))
    }, [])
    
    return (
        <Container>
            <Router>
                <Switch>
                    <Route exact path={`/`}>
                        <Card>
                            <CardHeader style={{backgroundColor:'#421010'}}><h1 style={{textAlign: 'center', color:'white'}}>Welcome to Pirate Crew</h1></CardHeader>
                            <CardBody style={{backgroundColor:'#FFA500'}}>
                                <Row>
                                    <Col xs>
                                        <Register users={users} setUsers={setUsers}/>
                                    </Col>
                                    <Col xs>
                                        <Login/>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Route>
                    <Route path={`/pirate/new`}>
                        <PyrateNew datos={datos} setDatos={setDatos}/>
                    </Route>
                    <Route path={`/pirates`}>
                        <PyrateCrew datos={datos} setDatos={setDatos}/>
                    </Route>
                    <Route path={`/pirate/:id`}>
                        <PyrateId datos={datos} setDatos={setDatos}/>
                    </Route>
                </Switch>
            </Router>
        </Container>

    );
}

export default Main;
