import React, {useEffect, useState} from 'react'
import Header from '../components/layout/Header'
import ProductList from '../components/ProductList'

function Products() {
    const [products, setProducts]=useState([]);
    const [cartdata, setCartdata]=useState(JSON.parse(localStorage.getItem("cartdata")) || []);
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
              const json = await response.json();
              setProducts(json);
              console.log(json);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
    }, [])
    useEffect(() => {
        localStorage.setItem("cartdata", JSON.stringify(cartdata));
    
        console.log(`Saved ${cartdata.length} items to localstorage`);
      }, [cartdata]);
        const addTocart=(cart)=>{
        var carts = [];
        if(cartdata.find(item => item.id === cart.id)){
          alert('Item already in cart ')
            return;
        }else{
            if(cart.quantity===0){
                alert('Product is out of stock')
            }
            const cartto = {...cart, cartQty:1};
            carts.push(cartto);
            setCartdata([...cartdata, cartto]);
        }
        
        
    }
  return (
    <div>
        <Header cartdata={cartdata}/>
        
        <ProductList products={products} addTocart={addTocart}/>
    </div>
  )
}

export default Products
