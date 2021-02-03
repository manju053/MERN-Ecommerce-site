import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions/product.action';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000
    });
    useEffect(() => {
        dispatch(getProductsBySlug(props.match.params.slug))
    }, []);

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} mobiles under {priceRange[key]}</div>
                                <button>view all</button>
                            </div>
                            <div style={{ display: 'flex' }}>

                                {
                                    product.productsByPrice[key].map(product => {
                                        return (
                                            <div className="productContainer">
                                                <div className="productImgContainer"
                                                >
                                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt="samsung" />
                                                </div>

                                                <div className="productInfo">
                                                    <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                    <div>
                                                        <span>4.3</span>&nbsp;
                                    <span>3353</span>
                                                    </div>
                                                    <div className="productPrice">{product.price}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductStore
