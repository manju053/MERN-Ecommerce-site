import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions'
import Layout from '../../components/layouts';
import { Modal, Button } from 'react-bootstrap';
import Input from '../../UI/input';
import ModalComponent from '../../UI/Modal';

const Category = () => {

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);


    const categories = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const dispatch = useDispatch();




    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form)); // dispatch action
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        setShow(false);
    };

    const renderCategories = (categories) => {
        let cat = [];
        for (let category of categories) {
            cat.push(
                <li key={category.name}>
                    {category.name}
                    {
                        category.children.length > 0 ? <ul>{renderCategories(category.children)}</ul> : ''
                    }
                </li>
            )
        }

        return cat;
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

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            {
                                renderCategories(categories.categories)
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>

            <ModalComponent
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}>
                <Input
                    value={categoryName}
                    placeholder="Category Name"
                    onChange={(e) => setCategoryName(e.target.value)}
                    type="text"
                    label="Category Name"
                />

                <select className="form-control" onChange={e => setParentCategoryId(e.target.value)}
                    value={parentCategoryId}>
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
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </ModalComponent>


        </Layout>
    )
}

export default Category
