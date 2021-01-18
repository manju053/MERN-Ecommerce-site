import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/layouts/index';
import Input from '../../UI/input';

const Signup = () => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        onChange={() => { }} />
                                </Col>

                                <Col md={6}>
                                    <Input label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        onChange={() => { }} />
                                </Col>

                            </Row>

                            <Form.Group controlId="formBasicEmail">
                                <Input label="Email address"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={() => { }}
                                />


                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Input label="Password"
                                type="password"
                                placeholder="Password"
                                onChange={() => { }} />

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

export default Signup
