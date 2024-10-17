import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToWishList } from '../Redux/wishListSlice';
import { addToCart } from '../Redux/cartSlice';
import Header from '../Components/Header';


function View() {
  const {id} = useParams()
  // console.log(id);
  const{loading}=useSelector((state)=>state.productReducer)
  const [product,setProduct] = useState({})
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()
  const cart = useSelector((state)=>state.cartReducer)

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
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
   <Header/>
    <div className='mt-5' style={{marginTop:"100px"}}>
      {
        loading?<div>
      <Spinner animation="border" variant='warning' />Loading...

      </div>: 
        <div className="container row" style={{marginTop:"100px"}}>
        <div className="col-lg-4">
          <img src={product?.thumbnail} alt="" 
          style={{width:"100%", height:"400px"}} />
        </div>
        <div className="col-lg-2">

        </div>
        <div className="col-lg-6">
          <p>{product?.id}</p>
          <h1>{product?.title}</h1>
          <h5 className="fw-bolder">Price: <span style={{color:"red"}}>{product?.price}</span></h5>
          <p>{product?.description}</p>

        <div className="d-flex justify-content-between mt-4">
         <Button className="btn btn-ligt mb-2" onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i>Wishlist</Button>
         <Button className="btn btn-ligt mb-2" onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i>Cart</Button>
        </div>

        </div>  
      </div>
      }
    </div>
   </>
       
  )
}

export default View
