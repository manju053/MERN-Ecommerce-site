import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/layouts/index';
import Input from '../../UI/input/index';

const Signin = () => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>

                            <Input label="Email address"
                                placeholder="Enter email"
                                type="email"
                                onChange={() => { }} />

                            <Input
                                label="Password"
                                type="paasword"
                                placeholder="Password"
                            />

                            <Button variant="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signin
