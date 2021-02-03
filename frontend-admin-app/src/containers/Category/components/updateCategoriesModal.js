import React from 'react';
import { Row, Col } from 'react-bootstrap'
import ModalComponent from '../../../UI/Modal';
import Input from '../../../UI/input';



const UpdateCategoryModal = (props) => {

    const {
        show,
        handleClose,
        size,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}>

            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>

            <Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) => <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder="Category Name"
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                type="text"
                            />
                        </Col>

                        <Col>
                            <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                value={item.parentId}>
                                <option value=''>Select Category</option>
                                {
                                    categoryList.map(option => {
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
                            <select className="form-control" value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                <option value=''>Select type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                    )
                }
            </Row>
            <h6>Checked Categories</h6>
            <Row>

                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder="Category Name"
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                        type="text"
                                    />
                                </Col>

                                <Col>
                                    <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                        value={item.parentId}>
                                        <option value=''>Select Category</option>
                                        {
                                            categoryList.map(option => {
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
                                    <select className="form-control" value={item.type}
                                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')} >
                                        <option value=''>Select type</option>
                                        <option value='store'>Store</option>
                                        <option value='product'>Product</option>
                                        <option value='page'>Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Row>
            {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </ModalComponent>
    )
};

export default UpdateCategoryModal;