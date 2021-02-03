import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as _deleteCategories } from '../../actions'
import Layout from '../../components/layouts';
import ModalComponent from '../../UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import { IoCheckbox, IoSquareOutline, IoCheckboxOutline, IoChevronDownOutline, IoChevronForwardSharp, IoAdd, IoTrash, IoCloudUpload } from 'react-icons/io5';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoryModal from './components/updateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';

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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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
                    children: (category.children && category.children.length > 0) && renderCategories(category.children)
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
                parentId: category.parentId,
                type: category.type
            });

            if (category.children && category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    };

    const updateCheckedAndExpandedCategories = () => {
        const myCategories = createCategoryList(categories.categories);
        const checkedArray = [];
        const expandedArray = [];
        if (checked.length > 0) {
            checked.forEach((categoryId, index) => {
                const category = myCategories.find((category, _index) => category.value === categoryId);
                category && checkedArray.push(category);
            })
        }

        if (expanded.length > 0) {
            expanded.forEach((categoryId, index) => {
                const category = myCategories.find((category, _index) => category.value === categoryId);
                category && expandedArray.push(category);
            })
        }
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    };

    const updateCategoriesForm = () => {

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type ? item.type : '');
            form.append('parentId', item.parentId ? item.parentId : '');
        });

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type ? item.type : '');
            form.append('parentId', item.parentId ? item.parentId : '');
        });

        dispatch(updateCategories(form));

        setUpdateCategoryModal(false);
    };

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    };

    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, index) => ({
            _id: item.value,
        }));

        const expandedIdArray = expandedArray.map((item, index) => ({
            _id: item.value,
        }));

        const idsArray = expandedIdArray.concat(checkedIdArray);

        if (checkedIdArray.length > 0) {
            dispatch(_deleteCategories(checkedIdArray))
                .then(result => {
                    setDeleteCategoryModal(false);
                    if (result) {
                        dispatch(getAllCategory());
                    }
                })
        }


    }

    const renderDeleteCategoryModal = () => {
        return (
            <ModalComponent
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => alert('No')
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}>

                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>
                        {item.name}
                    </span>)
                }

                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>
                        {item.name}
                    </span>)
                }

            </ModalComponent>
        )
    }






    const categoryList = createCategoryList(categories.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                        </div>

                        <div className="actionBtnContainer">
                            <span>Actions: </span>
                            <button onClick={handleShow}><span><IoAdd /></span>Add</button>
                            <button onClick={deleteCategory}><span><IoTrash /></span>Delete</button>
                            <button onClick={updateCategory}><span><IoCloudUpload /></span>Edit</button>
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


            </Container>

            {/* { renderAddCategoryModal()} */}
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoryModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList} />
            { renderDeleteCategoryModal()}
        </Layout>
    )
}

export default Category
