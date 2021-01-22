import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import Layout from '../../components/layouts';
import { Row, Col} from 'react-bootstrap';
import './style.css'

const Home = () => {
    return (
       <Layout>
           <Container fluid>
           <Row>
               <Col md={2} className="sidebar">Sidebar</Col>
               <Col md={10} style={{marginLeft: 'auto'}}>Main </Col>
           </Row>
           </Container>
           
           {/* <Jumbotron className="text-center" style={{margin: '5rem', background: '#fff'}}>
               <h1>Welcome to Admin Dashboard</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus modi possimus assumenda et, minus quisquam nam doloremque. Numquam, eveniet accusantium qui ratione ut quas! Maiores?</p>
           </Jumbotron> */}
       </Layout>
    )
}

export default Home
