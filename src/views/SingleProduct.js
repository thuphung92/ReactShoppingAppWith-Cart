import React, { Component } from 'react'
import { getProduct } from '../api/apiCall'
import {Row, Col, Button } from 'react-bootstrap'

export default class SingleProduct extends Component {
    constructor(){
        super();
        this.state={
            product:false
        }
    }

    componentDidMount() {
        this.getSingleProduct()
    }

    getSingleProduct = async () =>{
        const product=await getProduct(this.props.match.params.id)
        if(product === 500){this.setState({serverError:true})}
        if (product !== 500){
            this.setState({product})
        }
    }

    render() {
        return (
            <div className="mt-5">
            {this.state.product ?
                <Row className='wrapper'>
                <Col md={4}>
                    <div style={{paddingLeft:'50px'}}>
                        <h3 className='text-center'>{this.state.product.title}</h3>
                        <div className='mt-5 text-center'><img style={{width:'60%'}} src={this.state.product.image}/></div>
                    </div>
                </Col>
                <Col md={6}>
                    <div style={{paddingLeft:'50px', paddingTop:'50px'}}>
                        <h5 className='fw-bold mb-3'>${this.state.product.price}</h5>
                        <h5 className='fw-bold'>Description</h5>
                        {this.state.product.description}
                        <h5 className='fw-bold mt-3'>Category</h5>
                        {this.state.product.category}
                    </div>
                </Col>
                
            </Row>
                :
                ''
            }
            
        </div>
        )
    }
}
