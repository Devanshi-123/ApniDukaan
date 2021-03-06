import {Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import Product from "../components/Product";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import Head from '../components/Head';
import React,{useState,useEffect} from 'react';


const Homescreen = () => {
    //used to call action creators
    const dispatch = useDispatch()
    //use the same name as in reducer
    //useSelector is used to select a particular state

    const productList = useSelector(state=>state.productList)
    const {loading,error,products} = productList

    //fires as soon as this component load
    useEffect(()=>{
       dispatch(listProducts())
    },[dispatch])

    return (
        <>
        <Head/>
          <h1>Latest Products</h1>
          {loading?<Loader/>:
           error?<Message variant="danger">{error}</Message>:
           <Row>
           {products.map(product=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
              </Col>
           ))}
           </Row>  
          }
        </>
    )
}

export default Homescreen
