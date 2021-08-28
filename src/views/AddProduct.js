import React, { Component } from 'react'
import { Formik,Form,Field } from 'formik';
import * as Yup from 'yup';
import { addProduct, getCategories } from '../api/apiCall'
import {Alert} from 'react-bootstrap';

const AddProductFormSchema = Yup.object().shape({
    'title': Yup.string().required('Required'),
    'price':Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Please enter a valid price form").required('Required'),
    'description': Yup.string().required('Required'),
    'image': Yup.string().required('Required'),
    'category': Yup.string().required('Required'),   
})


const FormInitialValues={
    title:'',
    price:'',
    description:'',
    image:'',  
    category:''
}

export default class AddProduct extends Component {
    constructor(){
        super();
        this.state={
            categories:[],
            serverError: false,
            success: false,
            failure: false
        }
    }

    componentDidMount() {
        this.getAllCats()
    }

    getAllCats=async ()=>{
        const cats=await getCategories()
        if (cats===500){this.setState({serverError:true})}
        if (cats !== 500 || cats !== 400){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    handleSubmit=async (values)=>{
        const res = await addProduct(values)
        console.log(res)
        if (res){
            this.setState({success:true})
        }else{
            this.setState({failure:true})
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
                        {this.state.success?<Alert variant="success">Your Product was sucessfully created</Alert>:""}
                        {this.state.serverError?<Alert variant="danger">There was an error while creating your product. Please Try again</Alert>:""}

                        <Formik initialValues={FormInitialValues}
                            validationSchema={AddProductFormSchema}
                            onSubmit={ (values, {resetForm}) => {
                            console.log(values);
                            this.handleSubmit(values);
                            resetForm(FormInitialValues)
                            }}>

                        {({ errors, touched }) => (
                            <Form>
                                <h2 className='text-center'>Add A New Product</h2>
                                <label htmlFor="title" className="form-label mt-5 fw-bold">Product Title</label>
                                <Field name="title" className="form-control"/>
                                {errors.title && touched.title ? (<div style={{color:'red'}}>{errors.title}</div>) : null}
                                
                                <label htmlFor="description" className="form-label fw-bold">Description</label>
                                <Field name="description" className="form-control"/>
                                {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>) : null}
                                
                                <label htmlFor="price" className="form-label fw-bold">Price</label>
                                <Field name="price" className="form-control"/>
                                {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>) : null}
                            
                                <label htmlFor="image" className="form-labelfw-bold">Image Link</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>) : null}
                            
                                <label htmlFor="category" className="form-label fw-bold">Category</label>
                                <Field as="select" name="category" className="form-select">
                                    {this.state.categories?.map((c,index)=><option value={index} key={index}>{c}</option>)}
                                </Field>
                                {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category_id}</div>) : null}

                                <button className="btn btn-primary form-control" type="submit fw-bold">Submit</button>
                            </Form>)}
                    </Formik>
                </div>
              </div>
            </div>
        )
    }
}
