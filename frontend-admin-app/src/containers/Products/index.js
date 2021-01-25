import React, { useState } from 'react'
import Layout from '../../components/layouts';
import Input from '../../UI/input';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../actions/product.actions';
import ModalComponent from '../../UI/Modal';
const Products = () => {

    const product = useSelector(state => state.product);
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

        for (let pic of productPictures) {
            form.append('productPicture', pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    };



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

    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       product.products.length > 0 ? 
                        product.products.map(product => 
                        <tr key={product._id}>
                            <td>1</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>{product.category.name}</td>
                        </tr> ) : null
                    }
                    
                </tbody>
            </Table>
        )
    }

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
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            <ModalComponent
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}>
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

                <input type="file" name="productPicture" onChange={handleProductPictures} />
            </ModalComponent>
        </Layout>
    )
}

export default Products
