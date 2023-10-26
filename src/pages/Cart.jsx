import React, { useState,useEffect } from 'react'
import Header from '../components/layout/Header'

import { Col, Container, Image, Row, ThemeProvider,Card, Button } from 'react-bootstrap';

function Cart() {
   const [cartdata, setCartdata]=useState(JSON.parse(localStorage.getItem("cartdata")) || []);
   useEffect(() => {
    localStorage.setItem("cartdata", JSON.stringify(cartdata));

    console.log(`Saved ${cartdata.length} items to localstorage`);
  }, [cartdata]);
   const removeCart = (data)=>{
    const isItemInCart = cartdata.find((cartItem) => cartItem.id === data.id);

    if (isItemInCart.cartQty === 1) {
        setCartdata(cartdata.filter((cartItem) => cartItem.id !== data.id));
    } else {
        setCartdata(
        cartdata.map((cartItem) =>
          cartItem.id === data.id
            ? { ...cartItem, cartQty: cartItem.cartQty - 1 }
            : cartItem
        )
      );
    }
   }
  return (
    <div>
      <Header cartdata={cartdata}/>
      <Container>
        <Row>
                            <Card className='mt-5 p-5'>
            <h1>Cart</h1>
            <Col>
            {cartdata.length>0 && (
                            <>
                            {cartdata.map(data =>
                                <Col lg={12} xs={12} gap={3} className='mt-5 d-flex justify-content-around border-bottom pb-4' border="primary">
                                    <Image src={data.imageURL} width={'50px'}/>
                                    <h3>{data.name}</h3>
                                    <p>Rs {data.price}</p>
                                    <Button variant="danger" onClick={()=>removeCart(data)}>Remove to cart</Button>
                                </Col>
                                    
                            )}
                            <h1 className='text-center mt-5'>Sub Total: Rs.{' '}
                            {cartdata.reduce(
                            (acc, curr) => acc + curr.price * curr.cartQty,
                            0
                            )}</h1>
                            </>
                            )}
                            
                {cartdata.length === 0 && (
                    <h3 className='text-center'>
                    Cart is Empty
                    </h3>
          )}
                
            </Col>
                            </Card>
        </Row>
      </Container>
    </div>
  )
}

export default Cart
