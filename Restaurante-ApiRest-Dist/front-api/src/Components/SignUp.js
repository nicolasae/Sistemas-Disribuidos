import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { Link } from "react-router-dom";
import NavBar from './NavBar';




class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                name:'',
                password:'',
                lastname:'',
                cash:'',
                phone:'',
                email:'', 
                active: ''
            },
            verificate:false,
        }
    }

    handleChange=async e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }

    redirect=()=>{
        if(this.state.verificate) return '/login'
    }
    
    signup=()=>{
        console.log(this.state.form);
        
        fetch('http://localhost:3001/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.form.name, 
                lastname: this.state.form.lastname,
                email: this.state.form.email, 
                password: this.state.form.password,
                phone: this.state.form.phone,
                cash: this.state.form.cash,
                active: true

            }),
        })
        .then(response => {
            this.setState({
                verificate: true,
            })
            alert(response.data)})

        
        .catch(errormessage => {
            console.log(errormessage);
            alert('Ingrese datos correctamente.');
        })     
    };

 
    render(){
        return (
            <div>
                <NavBar/>
                <div 
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)', margin: '30px'
                }}
                >
                <MDBContainer>
                    <p className="h4 text-center py-6">Registrarse</p>

                    <MDBRow>
                        <MDBCol md="16">
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                            <div className="grey-text">
                                            <MDBInput
                                                name = 'name'
                                                label="Nombre "
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />

                                            <MDBInput
                                                name = 'lastname'
                                                label="Apellidos "
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                onChange={this.handleChange}
                                                success="right"
                                            />
                
                                            <MDBInput
                                                name = 'email'
                                                label="Correo electrónico"
                                                icon="envelope"
                                                group
                                                type="email"
                                                validate
                                                onChange={this.handleChange}
                                                error="wrong"
                                                success="right"
                                            />
                                            
                                            <MDBInput
                                                name = 'password'
                                                label="Contraseña"
                                                icon="lock"
                                                group
                                                onChange={this.handleChange}
                                                type="password"
                                                validate
                                            />                                            

                                            <MDBInput
                                                name = 'phone'
                                                label="Telefono"
                                                icon="address-book"
                                                onChange={this.handleChange}
                                                group
                                                type="number"
                                                validate
                                            />


                                            <MDBInput
                                                name = 'cash'
                                                label="Initial cash"
                                                icon="comment-dollar"
                                                onChange={this.handleChange}
                                                group
                                                type="number"
                                                validate
                                            />


                                        </div>
                                        <div className="text-center py-5 mt-6">
                                            <MDBBtn onClick={()=>this.signup()}>
                                                <Link to= {this.redirect()}> Registrarse</Link>
                                            </MDBBtn>
                                        </div>
            
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            </div>
          );
          
    }

};

export default SignUp;