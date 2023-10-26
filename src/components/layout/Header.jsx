import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
export default function Header({cartdata}) {
 console.log(cartdata.length)
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Teerex Store</Navbar.Brand>
        <Navbar.Text>
        <Link to='/' className='product mr-2'> Products
         </Link>
        <Link to='/cart' className='cartlink'> Cart <AiOutlineShoppingCart fontSize={'23px'} />
        {cartdata.length > 0 && (<span className='cartcount'> {cartdata.length} </span> )}
        </Link>
            
          </Navbar.Text>
      </Container>
    </Navbar>
  )
}
