import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import Spinner from 'react-bootstrap/Spinner';
import { addToWishList } from '../Redux/wishListSlice';
import { addToCart } from '../Redux/cartSlice';
import Header from '../Components/Header';

function Home() {

  const dispatch = useDispatch()
  const {loading,products,error}=useSelector((state)=>state.productReducer)
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)
  // console.log(loading);
  // console.log(products);
  // console.log(error);


  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  
  const handleWishlist=(product)=>{
    const existingProduct = wishlist.find(item=>item?.id==product?.id)
    if(existingProduct){
      alert("Product already exist in wishlist")
    }else{
      dispatch(addToWishList(product))
    }
  }
  
  const handleCart=(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("Items added")
    }else{
      dispatch(addToCart(product))
      alert("Items added")
    }
  }
  return (
    <>
    <Header insideHome={true}/>
    <div style={{marginTop:"70px"}}>
      {
        loading?
        <div className='text-center mt-5'>
           <Spinner animation="border" variant='warning' />Loading...
        </div>:
     
      <Row className="mt-5 container">
       {
        products?.length>0?products.map((product,index)=>(
          <Col key={index} className="mt-5" sm={12} md={6} lg={4} xl={3}>
      
          <Card style={{ width: '18rem'}}>
            <Link to={`view/${product.id}`}><Card.Img variant="top" style={{width:"100%",height:"200px"}} src={product.thumbnail}/>
            </Link>
          
          <Card.Body>
            <Card.Title>{product.title.slice(0,10)}</Card.Title>
            <Card.Text>
            {product.description.slice(0,20)}
            </Card.Text>
            <div className="d-flex justify-content-between">
            <Button className="btn btn-ligt" onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i></Button>
            <Button className="btn btn-ligt" onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i></Button>
    
            </div>
    
          </Card.Body>
        </Card>
          </Col>
        )):<div className='fw-bolder mt-5 mb-5'>
          <p className='text-danger'>
            Nothing to display
          </p>
        </div>
       }
      </Row>
     }
    </div>

    </>
  )
}

export default Home
