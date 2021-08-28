import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {getProducts,deleteProduct, updateProduct, getCategories} from '../api/apiCall';
import {Button, Alert} from 'react-bootstrap'

const CreateProductFormSchema = Yup.object().shape({
    'title': Yup.string().required('Required'),
    'price':Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Please enter a valid price form").required('Required'),
    'description': Yup.string().required('Required'),
    'image': Yup.string().required('Required'),
    'category': Yup.string().required('Required'),   
})

export default class UpdateProduct extends Component {
    constructor(){
        super();
        this.state={
            serverError:false,
            products:[],
            product:{},
            categories:[],
            category:{},
            unsuccessfulPost:false,
            successfulPost:false,
            unsuccessfulDelete:false,
            successfulDelete:false,
        }
    }

    
    componentDidMount() {
        this.getAllProducts()
        this.getAllCategories()
    }
    
    getAllProducts=async ()=>{
        const products=await getProducts()
        if (products===500){this.setState({serverError:true})}
        if (products !== 500){
            this.setState({products:products}, console.log(this.state.products))
        }
    }

    getAllCategories = async ()=>{
        const cats = await getCategories()
        if (cats===500){this.setState({serverError:true})}
        if (cats !== 500){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    handleSubmit= async (values)=>{
        const res=await updateProduct({id:this.state.product.id, values})
        console.log(res)
        if (res){
            this.setState({successfulPost:true,unsuccessfulPost:false,product:{}})
            this.getAllProducts()
        }else{
            this.setState({unsuccessfulPost:true,successfulPost:false})
        }

    }

    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newProduct = this.state.products.filter((li)=>li.id===parseInt(newId))[0];
        this.setState({product:newProduct});
    }

    deleteProduct=async()=>{
        if (window.confirm(`Are you sure you want to delete ${this.state.product.title}?`)){
            const res =await deleteProduct(this.state.product.id)
            if (res){this.setState({successfulDelete:true,unsuccessfulDelete:false}); this.getAllProducts();
            }
            else{this.setState({successfulDelete:false,unsuccessfulDelete:true})
            }
        }
    }

    render() {
        const styles={
            error:{color:'red'},
            wrapper:{
                paddingTop: '30px',
                justifyContent: 'center',
                alignItems: 'center',
            },
            container:{
                padding: '20px 20px 20px 20px',
                border: '0px solid #fff',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,.65)'
            }
        }
        return (
            <div>
                <div className="wrapper" style={styles.wrapper}>
                <div className="container" style={styles.container}> 
                    {this.state.successfulDelete?<Alert variant="success">Your product has been deleted successfully</Alert>:""}
                        {this.state.unsuccessfulDelete?<Alert variant="danger">There was an error while deleting the product. Please try again!</Alert>:""}
                        {this.state.successfulPost?<Alert variant="success">Your product has been updated successfully</Alert>:""}
                        {this.state.unsuccessfulPost?<Alert variant="danger">There was an error while updating your product. Please try again!</Alert>:""}
                        {this.state.serverError?<Alert variant="danger">There was an error. Please try again later!</Alert>:''}
                    
                        <label htmlFor="product" className="form-label fw-bold">Choose a Product to Update</label>
                        <select  id="options" className="form-select form-select-lg mb-3" onChange={(event)=>this.handlePullDown(event)} name="products"> 
                            <option defaultValue={0} label="-- Choose a Product --"/>
                            {this.state.products?.map((product)=><option key={product.id} value={product.id} label={product.title}/>)}
                        </select>
                        <br/>

                        {Object.entries(this.state.product??{}).length>0?
                            <>
                                <hr/>
                                <h2>#{this.state.product?.id??'000'} - {this.state.product?.title??"No Product"}</h2>
                                <Button variant="danger" onClick={()=>this.deleteProduct()}>Delete Product</Button>
                                <hr/>
                                <br/>
                                
                                <Formik initialValues={
                                    {
                                        title:this.state.product?.title ?? '',
                                        price:this.state.product?.price??'',
                                        description:this.state.product?.description??'',   
                                        image:this.state.product?.image?? '',
                                        category:this.state.product?.category??''   
                                    }
                                }
                                validationSchema={CreateProductFormSchema}
                                onSubmit={ (values, {resetForm}) => {
                                    console.log(values);
                                    this.handleSubmit(values);
                                    resetForm({  title: '',
                                                price: '',
                                                description: '',
                                                image:'',
                                                category:''
                                            })
                                
                                    }}
                                >
                                {({ errors, touched }) => (
                                    <Form>
                                        <label htmlFor="title" className="form-label fw-bold">Product Title</label>
                                        <Field name="title" className="form-control"/>
                                        {errors.title && touched.title ? (<div style={{color:'red'}}>{errors.title}</div>) : null}
                                        
                                        <label htmlFor="description" className="form-label mt-3 fw-bold">Description</label>
                                        <Field name="description" className="form-control"/>
                                        {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>) : null}
                                        
                                        <label htmlFor="price" className="form-label mt-3 fw-bold">Price</label>
                                        <Field name="price" className="form-control"/>
                                        {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>) : null}
                                    
                                        <label htmlFor="image" className="form-label mt-3 fw-bold">Image Link</label>
                                        <Field name="image" className="form-control"/>
                                        {errors.img && touched.image ? (<div style={{color:'red'}}>{errors.img}</div>) : null}
                                    
                                        <label htmlFor="category" className="form-label mt-3 fw-bold">Category</label>
                                        <Field as="select" name="category" className="form-select">
                                            {this.state.categories?.map((c,index)=><option value={c} key={index}>{c}</option>)}
                                        </Field>

                                        {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category}</div>) : null}

                                        <button className="btn btn-primary form-control mt-3" type="submit">Submit</button>
                                    </Form>)}
                                </Formik>
                            </>
                    :''}
              </div>
              </div>
            </div>
        )
    }
}
