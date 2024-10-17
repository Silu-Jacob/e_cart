import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../Redux/productSlice';

function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount]=useState(0)
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  // const [cartCount,setCartCount]=useState(0)
  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    // setCartCount(cart?.length)

  },[wishlist])
  


  return (
    <div>
      {/* header */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">E-Cart <i class="fa-solid fa-cart-shopping fa-bounce"></i></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

            {insideHome&&<Nav.Link>
              <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} type='text' />
              </Nav.Link>}
              {/* need to add navigation  */}
            <Link to={'/wishlist'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>  
             <Button variant="primary" className='me-2'>
                Wishlist <Badge bg="secondary">{wishlistCount}</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button></Link>
              <Link to={'/cart'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
              <Button variant="primary" className='me-2'>
                Cart <Badge bg="secondary">0</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>
              </Link>
            
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* header ends */}
    </div>
  )
}

export default Header

// import React, { useEffect, useState } from 'react'
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import { searchProduct } from '../Redux/productSlice'
// import { useDispatch, useSelector } from 'react-redux'

// function Header() {
//   const dispatch = useDispatch()
//   const [wishlistCount,setWishlistCount]=useState(0)
//   const {wishlist} = useSelector((state)=>state.wishlistReducer)

//   useEffect(()=>{
//     setWishlistCount(wishlist?.length)
//   },[wishlist])

//   return (
//     <div>
//         <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{zIndex:1}}>
//         <Container>
//         <Navbar.Brand> <Link to={'/'} style={{color:"white",fontWeight:"bold",textDecoration:"none"}} > <i class="fa-solid fa-truck-fast fa-bounce text-dark"></i> E-Cart </Link></Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">

//           <Nav.Link>
//                 <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text"
//                  className='form-control me-5' placeholder='search products' style={{width:"250px",height:"30px"}} />
//             </Nav.Link>

//             <Nav.Link className=''> 
//             <Link to={'/wishlist'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
//             <i class="fa-solid fa-heart text-danger"></i>WishList<Badge bg="success rounded ms-2">{wishlistCount}</Badge>
//             </Link></Nav.Link>

//             <Nav.Link className='btn btn-outline-light ms-2'> 
//             <Link to={'/cart'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}>
//             <i class="fa-solid fa-cart-shopping text-warning"></i>Cart<Badge bg="success rounded ms-2">0</Badge>
//             </Link></Nav.Link>

//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar> 
//     </div>
//   )
// }

// export default Header