import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../Redux/wishListSlice';
import { addToCart } from '../Redux/cartSlice';
import Header from '../Components/Header';

function Wishlist() {
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()

   const handleCart=(product)=>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addToCart(product))
   }


  return (
    <>
    <Header/>
    <div style={{ marginTop: "70px" }}>
      <Row className="mt-5 container">
       { 
        wishlist?.length>0?wishlist.map(product=>(
        <Col className="mt-5" sm={12} md={6} lg={4} xl={3}>

          <Card style={{ width: '18rem' }}>
            <Link to={`view/${product.id}`}><Card.Img variant="top" src={product.thumbnail}/>
            </Link>

            <Card.Body>
              <Card.Title>{product.title.slice(0,10)}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button className="btn btn-ligt" onClick={()=>dispatch(removeFromWishlist(product.id))}><i class="fa-solid fa-trash text-danger"></i></Button>
                <Button onClick={()=>handleCart(product)} className="btn btn-ligt"><i class="fa-solid fa-cart-shopping text-warning"></i></Button>

              </div>

            </Card.Body>
          </Card>
        </Col>
        )):<div className='d-flex align-items-center mt-5 mb-5'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSYGaboja89r-d3wxcA1U_15r9LmM79x8hw&s" alt="" />
          <h1>You wishlist is empty!!!</h1>
       
      </div>
      }
      </Row>

    </div>
    </>
  )
}

export default Wishlist
