import React, { useEffect } from 'react';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import { useDispatch, useSelector } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;
    useEffect(() => {

        const params = getParams(props.location.search);
        const payload = {
            ...params
        };
        dispatch(getProductPage(payload));
    }, [])
    return (
        <div style={{ margin: '0 10px' }}>
            <h2>{page.title}</h2>
            <Carousel
                renderThumbs={() => { }}>
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a key={index}
                            style={{ display: 'block' }}
                            href={banner.navigateTo}>
                            <img src={banner.img} alt="" style={{objectFit: 'contain'}} />
                        </a>
                    )
                }
            </Carousel>

            <div style={{
                display: 'flex',

                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card key={index}
                            style={{
                                width: '400px',
                                height: '200px',
                                margin: '0 5px'
                            }}>
                            <img src={product.img} alt="" style={{
                                width: '100%',
                                height: '100%'
                            }} />
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

export default ProductPage
