import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Button,Form,Image,Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart,removeFromCart} from '../actions/cartActions'

//to get query string we need to use location.search
const CartScreen = ({match,location,history}) => {
    const productId = match.params.id
    console.log(productId)
    //since we only want the number 
    const qty = location.search?Number(location.search.split('=')[1]):1
    console.log(qty)
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    //dispatch cart only if product is there
    useEffect(()=>{
      if(productId)
      {
        dispatch(addToCart(productId,qty))
      }
    },[dispatch,productId,qty])
    

    const removeFromCartHandler = (id) =>{
        console.log(id)
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = ()=>{
        console.log('checkout')
        //if they are not logged in they will go to login
        //if they are logged in they will go to shipping
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?<Message variant="warning">Your cart is Empty
                    <Link to="">Go Back</Link>
                </Message>:
                <ListGroup variant='flush'>
                 {cartItems.map(item=>(
                     <ListGroup.Item key={item.product}>
                         <Row>
                             <Col md="2">
                                 <Image src={item.image} alt={item.image} fluid rounded/>
                             </Col>
                             <Col md="3">
                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                             </Col>
                             <Col md="2">
                              {item.price}
                             </Col>
                             {/**manage quantity just as in product screen */}
                             <Col md="2">
                             <Form.Control as="select"  value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                 { [...Array(item.countInStock).keys()].map(x=>(
                                      <option key={x+1} value={x+1}>
                                          {x+1}
                                      </option>
              ))}
                                </Form.Control>
                             </Col>
                             <Col>
                             <Button type="button" variant="warning" onClick={()=>removeFromCartHandler(item.product)}>
                                 <i className="fas fa-trash"></i>
                             </Button>
                             </Col>
                         </Row>

                     </ListGroup.Item>
                 ))}
                </ListGroup>
                }
            </Col>
            <Col md="4">
                <ListGroup.Item>
                    <h2>Subtotal
                        ({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
                    <h2>Rs.
                        {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                    </h2>
                </ListGroup.Item>
                <Button type="button" variant="success" className="btn-block"
                disabled={cartItems.length===0} onClick={checkOutHandler}>Proceed To CheckOut</Button>
            </Col>
        </Row>
    )
}

export default CartScreen
