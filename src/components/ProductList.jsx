import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Offcanvas, Row,ThemeProvider } from 'react-bootstrap'
import ProductCard from './layout/ProductCard'
import Filter from './Filter'
import { AiFillFilter } from 'react-icons/ai';

function ProductList({products, addTocart}) {
    const [searchValue, setSearchValue] =useState('');
    const [serarchResult, setSearchResult]=useState([]);
    const [colorType, setColorType]=useState([]);
    const [genderType, setGenderType]=useState([]);
    const [productType, setProductType]=useState([]);
    const [Filters, setFilters] = useState({
        color: [],
        type: [],
        price: [],
        gender: [],
      });
    const [priceData, setPriceData]=useState([])
    useEffect(()=>{
        const filteredData = products.filter(data => {
            return (
              data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              data.color.toLowerCase().includes(searchValue.toLowerCase()) ||
              data.type.toLowerCase().includes(searchValue.toLowerCase())
            );
          });
          setSearchResult(filteredData)
    },[searchValue])
    useEffect(()=>{
      const color = products.map(item => item.color)
                    .filter((value, index, self) => self.indexOf(value)===index);
      const gender = products.map(item => item.gender)
                    .filter((value, index, self) => self.indexOf(value)===index); 
      const type = products.map(item => item.type)
                   .filter((value, index, self) => self.indexOf(value)===index);  
      const price = products.map(item => item.price)
                   .filter((value, index, self) => self.indexOf(value)===index);                          
    setColorType(color);
    setGenderType(gender);
    setProductType(type);
    setPriceData(price)
  },[products]);
  const handleFilter =(filter, value, event)=>{
    event.preventDefault();
      const currentFilters = Filters;
      
      if (!currentFilters[filter].includes(value)) {
        if (event.target.checked) {
          currentFilters[filter].push(value);
        }
      } else {
        
        console.log(currentFilters[filter].indexOf(value));
        currentFilters[filter].splice(currentFilters[filter].indexOf(value), 1);
      }
      setFilters({ ...currentFilters });
  }
  useEffect(()=>{
      if(serarchResult.length > 0){
        const searchfilteredData = products.filter(data => {
            return (
              data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              data.color.toLowerCase().includes(searchValue.toLowerCase()) ||
              data.type.toLowerCase().includes(searchValue.toLowerCase())
            );
          });
          const filteredData = searchfilteredData.filter(data => {
            if (
              Filters.color.length > 0
                ? Filters.color.includes(data.color)
                : true
            ) {
              if (
                Filters.type.length > 0
                  ? Filters.type.includes(data.type)
                  : true
              ) {
                if (
                  Filters.gender.length > 0
                    ? Filters.gender.includes(data.gender)
                    : true
                ) {
                  if (Filters.price.length === 0) {
                    return data;
                  } else if (
                    Filters.price.length > 0
                    ? Filters.price.includes(data.price)
                    : true
                      
                  ) {
                    return data;
                  }
                }
              }
            }
          });
          setSearchResult(filteredData);
      }else{
        const filteredData = products.filter(data => {
            console.log(Filters);
            if (
              Filters.color.length > 0
                ? Filters.color.includes(data.color)
                : true
            ) {
              if (
                Filters.type.length > 0
                  ? Filters.type.includes(data.type)
                  : true
              ) {
                if (
                  Filters.gender.length > 0
                    ? Filters.gender.includes(data.gender)
                    : true
                ) {
                  if (Filters.price.length === 0) {
                    return data;
                  } else if (
                    Filters.price.length > 0
                    ? Filters.price.includes(data.price)
                    : true
                  ) {
                    return data;
                  }
                }
              }
            }
          });
          
          setSearchResult(filteredData);
      }
  }, [Filters])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        
      <Container>
      <Row>
            <Col lg={12}>
            <FloatingLabel controlId='floatingInput' label="Search Product by color, type, price , name" className='mb-3'>
                <Form.Control type='text' placeholder='Search Product by color, type, price , name' onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
            </FloatingLabel>
            </Col >
            <Col lg={12} className='mobilefilter' onClick={handleShow}>
                <AiFillFilter/>Filter
            </Col>
        </Row>
        </Container>
        <Container>
        <Row>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Filter colorType={colorType} genderType={genderType} productType={productType} priceData={priceData} handleFilter={handleFilter} Filters={Filters}/>
                </Offcanvas.Body>
            </Offcanvas>
            <Col lg={3} xs={12} className='sidebar'>
                <Filter colorType={colorType} genderType={genderType} productType={productType} priceData={priceData} handleFilter={handleFilter} Filters={Filters}/>
            </Col>
            <Col lg={9} xs={12}>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  >
                <Container>
                    <Row>
                        
                    {  
                     searchValue.length > 0 || serarchResult.length > 0 && serarchResult ? (
                        serarchResult.length===0 ?(
                            <Col xs={12} gap={3} className='mt-5'>No Product Found</Col>
                        ): (serarchResult.map(data =>
                            <Col lg={4} xs={12} gap={3} className='mt-5'>
                                <ProductCard  key={data.id} data={data}/>
                            </Col>
                            ))
                    ):(products.map(data =>
                    <Col lg={4} xs={12} gap={3} className='mt-5'>
                        <ProductCard data={data} addTocart={addTocart}/>
                    </Col>
                    ))}
                    </Row>
                </Container>
            </ThemeProvider>
                
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductList
