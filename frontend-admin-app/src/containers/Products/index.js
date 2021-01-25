import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts';
import { Modal, Button } from 'react-bootstrap';
import Input from '../../UI/input';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';
import { addProduct } from '../../actions/product.actions';

const Products = () => {

    const categories = useSelector(state => state.category); 

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState('');


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    const handleClose = () => {

        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for(let pic of productPictures) {
            form.append('productPicture', pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    };

    useEffect(() => {
        dispatch(getAllCategory())
    }, []);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            });

            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };


    const handleProductPictures = (e) => {
        const file = e.target.files[0];
        setProductPictures([
            ...productPictures,
            file
        ])
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={name}
                        placeholder="Product Name"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        label="Product Name"
                    />

                    <Input
                        value={quantity}
                        placeholder="Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        type="text"
                        label="Quantity"
                    />

                    <Input
                        value={price}
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        label="Price"
                    />

                    <Input
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        type="textarea"
                        label="Price"
                    />
                    <select className="form-control" onChange={e => setCategoryId(e.target.value)}
                        value={categoryId}>
                        <option value=''>Select Category</option>
                        {
                            createCategoryList(categories.categories).map(option => {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <input type="file" name="productPicture" onChange={handleProductPictures}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products
