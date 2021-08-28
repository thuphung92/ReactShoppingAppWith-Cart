import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import {Button, Alert} from 'react-bootstrap';
import {getToken} from '../api/apiCall';
import {Redirect} from 'react-router-dom';
import login from '../images/login.jpg'

const loginFormSchema = Yup.object().shape({
    "username": Yup.string().required('Required'),
    "password": Yup.string().required('Required')
})

const loginFormInitialValues={
    username:'',
    password:''
}

export default class Login extends Component {

    constructor(){
        super();
        this.state={
            badLogin:false,
            serverError:false,
            redirect:false,
        }
    }

    handleSubmit= async ({username, password})=>{
        const token = await getToken({username, password});
        console.log(token);
        if (token === 500){return this.setState({badLogin:false, serverError:true})};
        if (token === null){return this.setState({badLogin: true,serverError:false})};
        if (token !== 500 || token !== null){
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            this.props.setUser(username);
            this.props.setToken(token);
            this.setState({redirect:true})}
    }


    render() {

        const styles={
            error:{color:'red'},
            wrapper:{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            container:{
                width: '400px',
                height: '450px',
                padding: '20px 20px 20px 20px',
                border: '0px solid #fff',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,.7)'
            }
        }
        return (
            <div style={{ backgroundImage: `url(${login})` }}>     
                <div className="wrapper" style={styles.wrapper}>
                    <div className="container" style={styles.container}> 

                        {this.state.redirect ? <Redirect to={{pathname:"/", props:{token:localStorage.getItem("token")} }}/>:''}
                        
                        <Formik 
                            initialValues={loginFormInitialValues}
                            validationSchema={loginFormSchema}
                            onSubmit={(values)=>{this.handleSubmit(values)}}>

                        {({errors, touched})=>(
                            <Form>
                                <h1 className="my-4 font-weight-bold-display-5">Login</h1>

                                <label htmlFor="username" className="form-label">User Name</label>
                                <Field name="username" className="form-control"/>

                                {errors.email && touched.email ? (<div style={styles.error}>{errors.username}</div>):null}

                                <label htmlFor="password" className="form-label">Password</label>
                                <Field name="password" className="form-control" type="password"/>
                                
                                <div>
                                {this.state.badLogin?<small style={styles.error}>Invalid User Name or Password</small>:''}
                                {this.state.searverError?<small style={styles.error}>Unexpected error. Please try again!</small>:''}
                                </div>                     
                                
                                <Button type="submit">Login</Button>
                            </Form>
                        )}
                        </Formik>
                    </div>  
                </div>   
            </div>
        )
    }
}