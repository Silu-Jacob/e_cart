import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/cartSlice'
import Header from '../Components/Header'

function Cart() {
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()

  const [total,setTotal]=useState(0)

useEffect(()=>{
 if(cart?.length>0){
  setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
 }else{
  setTotal(0)
 }
},[cart])
  return (
<>
<Header/>
    <div className="container row" style={{ marginTop: "100px" }}>

   {
      cart?.length>0?
      <div className="row mt-5">
        <div className="col-lg-8">
          <table className="table shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {  
              cart?.map((product,index)=>(
                <tr>
                <td>{index+1}</td>
                <td>{product?.title}</td>
                <td><img style={{ width: "300px", height: "300px" }} src={product?.thumbnail} alt="" /></td>
                <td><input type="text" readOnly value={product?.quantity} style={{width:"25px"}}/></td>
                <td className='text-danger fw-bolder'>${product?.totalprice}</td>
                <td><Button className='btn' onClick={()=>dispatch(removeFromCart(product?.id))}><i class="fa-solid fa-trash text-danger"></i></Button></td>
              </tr>
              ))  
              }
            </tbody>

          </table>

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-danger" onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
            <Link to={'/'} style={{ textDecoration: "none" }} className="btn btn-outline-success">Shop</Link>

          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <div className="container border rounded shadow mt-5 p-5 w-100">
            <h2>Cart Summary</h2>
            <h4>Total Products:{cart.length}</h4>
            <h5>Total: <span className='text-danger fw-bolder'>${total}</span></h5>
          </div>
          <div className="d-grid">
            <button className="btn btn-success m-3 rounded">Checkout</button>
          </div>

        </div>
      </div>:
      <div className='d-flex align-items-center mt-5 mb-5'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSYGaboja89r-d3wxcA1U_15r9LmM79x8hw&s" alt="" />
      <h1>Your Cart is empty!!!</h1>
      </div>
    }

    </div>
    </>
  )
}

export default Cart
