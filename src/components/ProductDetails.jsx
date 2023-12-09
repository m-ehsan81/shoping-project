import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

//Context
import { ProductsContext } from '../context/ProductContextProvider';

//API
import { getProduct } from '../services/api';

//Style
import styles from './ProductDetails.module.css'

const ProductDetails = (props) => {

    const params = useParams();
    const id = params.id;

    const [data, setData] = useState({ isFetch: false });

    useEffect(() => {
        const fetchAPI = async () => {
            setData({ isFetch: true, ...await getProduct(id) });
        }

        fetchAPI();
    }, [])

    // getProduct(id);
    // const data = useContext(ProductsContext);
    // const product = data[id - 1];
    const { image, title, description, price, category } = data;

    return (
        <div className={styles.container}>
            {
                data.isFetch ?
                    <>
                        <img className={styles.image} src={image} alt="product" />
                        <div className={styles.textContainer}>
                            <h3>{title}</h3>
                            <p className={styles.description}>{description}</p>
                            <p className={styles.category}><span>Category:</span> {category}</p>
                            <div className={styles.buttonContainer}>
                                <span className={styles.price}>{price} $</span>
                                <Link to="/products">Back to shop</Link>
                            </div>
                        </div>
                    </> :
                    <h1 style={{ color: "#1a73e8" }}>Loading...</h1>
            }

        </div>
    );
};

export default ProductDetails;