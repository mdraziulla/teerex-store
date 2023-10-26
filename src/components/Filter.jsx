import React, { useEffect, useState } from 'react'
import { Card,Form } from 'react-bootstrap'
function Filter({colorType, genderType,productType, priceData, handleFilter, Filters,resetFilter}) {
  
  return (
    <div>
      <Card>
        <Card.Body>
            <Card.Title>Color</Card.Title>
            {colorType.map((color,index)=>
              <Form.Check 
              key={index}
              type='checkbox'
              id={color}
              label={color}
              onChange={e => handleFilter('color', color, e)}
              checked={Filters.color.includes(color)}
            />
            )}
        </Card.Body>
        <Card.Body>
            <Card.Title>Gender</Card.Title>
            {genderType.map((gender,index)=>
              <Form.Check 
              key={index}
              type='checkbox'
              id={gender}
              label={gender}
              onChange={e => handleFilter('gender', gender, e)}
              checked={Filters.gender.includes(gender)}
            />
            )}
        </Card.Body>
        <Card.Body>
            <Card.Title>Product Type</Card.Title>
            {productType.map((type,index)=>
              <Form.Check // prettier-ignore
              key={index}
              type='checkbox'
              id={type}
              label={type}
              onChange={e => handleFilter('type', type, e)}
              checked={Filters.type.includes(type)}
            />
            )}
        </Card.Body>
        <Card.Body>
            <Card.Title>Price Range</Card.Title>
            {priceData.map((price,index)=> 
              <Form.Check // prettier-ignore
              key={index}
              type='checkbox'
              id={price}
              label={`Rs ${price}`}
              name={price}
              onChange={e => handleFilter('price', price, e)}
              checked={Filters.price.includes(price)}
            />
            )}
        </Card.Body>
        </Card>
    </div>
  )
}

export default Filter
