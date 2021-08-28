import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../api/apiCall'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            serverErrorProducts: false,
            productStart:0,
            productEnd:15
        }
    }

    componentDidMount(){this.getAllProducts()}

    getAllProducts = async () =>{
        const products = await getProducts()
        if(products === 500){this.setState({serverErrorProducts:true})}
        if (products !== 500){
            this.setState({products:products,
                            productStart:0,
                            productEnd:15})
        }
    }

    handlePrev=() =>{
        const oldStart = this.state.productStart
        const oldEnd = this.state.productEnd
        this.setState = ({productStart: oldStart - 15, productEnd: oldEnd - 15})
        
    }

    handleNext=() => {
        const oldStart = this.state.productStart
        const oldEnd = this.state.productEnd
        this.setState = ({productStart: oldStart + 15, productEnd: oldEnd + 15})
        console.log(this.state)
    }

    render() {

        const styles={
            error: {color: 'red'},
            btn:{backgroundColor: '#fca311'}
        }

        return (
            <div style={{backgroundColor:'#e9ecef'}}>
                {this.state.serverErrorProducts?<small style={styles.error}>Error. Please try again later!</small>:''}

                <div style={{paddingTop:'50px', paddingRight:'50px', paddingLeft:'50px'}}>
                    <Row>
                        {this.state.products.slice(this.state.productStart,this.state.productEnd).map((i)=><ProductCard addToCart={this.props.addToCart} product={i} key={i.id}/>)}
                    </Row>
                    
                    <div className="d-flex justify-content-center">
                        <Button style={styles.btn} className={"me-2 " + (this.state.productStart===0? "disable":'')} onClick={()=>this.handlePrev()}>{'<< Prev'}</Button>

                        <Button style={styles.btn} className={" " + (this.state.products?.length<=this.state.productEnd?"disabled":'')} onClick={()=>this.handleNext()}>{'Next >>'}</Button>
                    </div>
               </div>
            </div>
        )
    }
}
