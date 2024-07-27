import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './like.css'


function LikePage() {
  const dispatch = useDispatch()
  const likeitem = useSelector(state => state.likeReducer.cart)
  console.log('likeitem', likeitem)
  return (
    <div>
      <div className="products-container">
        {likeitem.map(item => (
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
              <p>{item.discription}</p>
              <p>{item.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LikePage
