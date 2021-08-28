import React, { Component } from 'react';
import {Card, Button, Col } from 'react-bootstrap';
import {titleCase} from '../helpers';
import {Redirect} from 'react-router-dom';


export default class ProductCard extends Component {
    constructor(){
        super();
        this.state={
            clicked:false
        }
    }

    handleRenderProduct=()=>{
        this.setState({clicked:true})
    }

    render() {

        const styles={
            card:{
                width: '300px',
                height: '430px',
                marginBottom: '25px',
            },
            img:{
                height: '150px',
                objectFit: 'contain',
            },
            btn:{backgroundColor: '#fca311'}
        }

        return (          
            <Col>
                {this.state.clicked ? <Redirect to={`/product${this.props.product.id}`}/>:''}
                <Card style={styles.card}>
                    <div style={{paddingTop: '10px', paddingBottom: ''}}>
                    <Card.Img style={styles.img} alt={this.props.product.title+" image"} src={this.props.product.image} />
                    </div>
                    <Card.Body>
                        <Card.Title style={{fontSize: '20px'}}>{titleCase(this.props.product.title)}</Card.Title>
                        <Card.Text>Category: {this.props.product.category}</Card.Text>
                        <Card.Subtitle className="float-end">${this.props.product.price}</Card.Subtitle><br/>
                        <div>
                        
                        <button style={{backgroundColor:"white", border:'none', color:'blue'}} onClick={()=>this.handleRenderProduct()}>See More</button>
                        </div>
                        <Button style={styles.btn} className="button" onClick={()=>this.props.addToCart(this.props.product)}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </Col>
    
        )
    }
}
