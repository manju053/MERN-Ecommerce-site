import React from 'react';
import { Row, Col } from 'react-bootstrap'
import ModalComponent from '../../../UI/Modal';
import Input from '../../../UI/input';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props
    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={'Add New Category'}>

            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder="Category Name"
                        onChange={(e) => setCategoryName(e.target.value)}
                        type="text"
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className="form-control form-control-sm" onChange={e => setParentCategoryId(e.target.value)}
                        value={parentCategoryId}>
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
            </Row>

            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />

                </Col>
            </Row>



        </ModalComponent>
    )
}

export default AddCategoryModal;