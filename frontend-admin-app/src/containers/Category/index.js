import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions'
import Layout from '../../components/layouts';
import { Modal, Button } from 'react-bootstrap';
import Input from '../../UI/input';
import ModalComponent from '../../UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import { IoCheckbox, IoSquareOutline, IoCheckboxOutline, IoChevronDownOutline, IoChevronForwardSharp } from 'react-icons/io5';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = () => {

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);


    const categories = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

            )
        }
        return cat;
    };


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId
            });

            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const myCategories = createCategoryList(categories.categories);
        const checkedArray = [];
        if(checked.length > 0) {
            checked.forEach((categoryId, index) => {
                const category = myCategories.find((category, _index) => category.value === categoryId);
                category && checkedArray.push(category);
            })
        }

        if(expanded.length > 0) {
            expanded.forEach((categoryId, index) => {
                const category = myCategories.find((category, _index) => category.value === categoryId);
                category && checkedArray.push(category);
            })
        }

    };


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
                        {/* <ul>
                            {
                                renderCategories(categories.categories)
                            }
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(categories.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoCheckbox />,
                                uncheck: <IoSquareOutline />,
                                halfCheck: <IoCheckboxOutline />,
                                expandClose: <IoChevronForwardSharp />,
                                expandOpen: <IoChevronDownOutline />,
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
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


            {/* Edit category */}

            <ModalComponent
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                modalTitle={'Update Categories'}
                size="lg">

                    <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>

                <Row>
                    <Col>
                        <Input
                            value={categoryName}
                            placeholder="Category Name"
                            onChange={(e) => setCategoryName(e.target.value)}
                            type="text"
                        />
                    </Col>

                    <Col>
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
                    </Col>
                    <Col>
                        <select className="form-control">
                            <option value=''>Select type</option>
                            <option value='store'>Store</option>
                            <option value='product'>Product</option>
                            <option value='page'>Page</option>
                        </select>
                    </Col>
                </Row>



                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </ModalComponent>


        </Layout>
    )
}

export default Category
