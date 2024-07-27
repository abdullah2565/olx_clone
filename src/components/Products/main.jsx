import React, { useState, useEffect } from 'react';
import './product.css';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import ads from '../../Views/Navbar/ads.png'
import { getAllProducts } from '../../Config/firebase';
function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getAds()
    }, [])

    const getAds = async () => {
        const res = await getAllProducts()
        console.log('res', res)
        setProducts(res)
    }
     return (
        <div className="products-container">
            <div className="thirddiv">
                <img src={ads} alt="" />
            </div>
            {products.map(item => (
                <div
                    onClick={() => navigate(`/productsdetail/${item.id}`)}

                    className='productsdiv' key={item.id}>

                    <div className='imgdiv'>
                        <img className='thumbnailimg' src={item.imageURL} alt="" />
                    </div>
                    <div className='detail'>
                        <div className='priceDiv'>
                            <h3>Rs {item.price}</h3>

                            <i class="ri-heart-line"></i>
                        </div>
                        <br />
                        <p>Brand: {item.brand}</p>
                     
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Products;
