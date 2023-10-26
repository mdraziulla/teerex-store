import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function ProductCard({data, addTocart}) {
    
    
  return (
    <Card >
      <Card.Img variant="top" src={data.imageURL} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
        Rs {data.price}
        </Card.Text>
        {data.quantity > 0 ? (
            <Button variant="primary" onClick={ ()=> addTocart(data)}>Add to cart</Button>
        ):(
            <Button variant="danger" onClick={ ()=> addTocart(data)} disabled={true}>Out of stock</Button>
        )}
      </Card.Body>
    </Card>
  )
}
