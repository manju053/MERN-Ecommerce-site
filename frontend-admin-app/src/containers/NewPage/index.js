import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layouts'
import Input from '../../UI/input'
import ModalComponent from '../../UI/Modal';
import createCategoryList from '../../helpers/linearCategories';
import { useSelector, useDispatch } from 'react-redux'
import { createPage } from '../../actions';

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);


    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(createCategoryList(category.categories));
    }, [category]);

    // useEffect(() => {
    //     if(page.loading) {

    //     }
    // }, [page])


    const handleBannerImages = e => {
        setBanners([...banners, e.target.files[0]]);
    };

    const handleProductImages = e => {
        setProducts([...products, e.target.files[0]]);
    };

    const onCategoryChange = e => {
        const category = categories.find(category => category.value === e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm = (e) => {
        // e.preventDefault();

        if (title === '') {
            window.alert('Title is required');
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form))
            .then(result => {
                setCreateModal(false);
                setTitle('');
                setDesc('');
                setCategoryId('');
                setType('');
                setBanners([]);
                setProducts([]);
            });
    }


    const renderCreatePageModal = () => {
        return (
            <ModalComponent
                show={createModal}
                modalTitle="Create New Page"
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >


                <Container>
                    <Row>
                        <Col>
                            {/* <div className="form-group">
                                <select className="form-control form-control-sm"
                                    value={categoryId}
                                    onChange={onCategoryChange}>

                                    <option value="">Select category</option>
                                    {
                                        categories.map(cat =>
                                            <option key={cat.value} value={cat.value}>{cat.name}</option>)
                                    }
                                </select>
                            </div> */}

                            <Input
                                type="select"
                                placeholder="Select category"
                                onChange={onCategoryChange}
                                options={categories}
                                value={categoryId} />

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Page Title"
                                className="form-control-sm" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Description"
                                className="form-control-sm" />
                        </Col>
                    </Row>

                    {
                        banners.length > 0 ? banners.map((banner, index) =>
                            <Row>
                                <Col key={index}>{banner.name}</Col>
                            </Row>
                        ) : ''
                    }

                    <Row>


                        <Col>
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="banners"
                                    onChange={handleBannerImages}
                                />
                            </div>

                        </Col>
                    </Row>

                    {
                        products.length > 0 ? products.map((product, index) =>
                            <Row>
                                <Col key={index}>{product.name}</Col>
                            </Row>
                        ) : ''
                    }
                    <Row>


                        <Col>
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="products"
                                    onChange={handleProductImages}
                                />
                            </div>

                        </Col>
                    </Row>
                </Container>

            </ModalComponent>
        )
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create</button>
        </Layout>
    )
}

export default NewPage
