import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";
import NavBar from './NavBar';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                email:'',
                password:''
            },
            verificate:false,
            token: ''
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
        if(this.state.verificate) {
            console.log(this.state.verificate);
            return 'landing'
        }
    }
    
    iniciarSesion=()=>{
        fetch('http://localhost:3001/index/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.form.email, 
                password: this.state.form.password
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.props.setToken(data.token);
            this.props.setIduser(data.id);
            this.setState({
                token: data.token,
                verificate: true,
            });
            console.log(data);
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('El usuario y/o contraseña no coinciden');

        })
        

    };

 
    render(){
        return (
            <div>
                <NavBar/>
            
                <div 
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                >
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="16">
                                <form>
                                <p className="h2 text-center mb-6">Inicio de Sesión</p>
                                <div className="grey-text">
                                    <MDBInput name = 'email' label="Correo" icon="envelope" group type="email"  onChange={this.handleChange} />
                                    <MDBInput name = 'password' label="Contraseña" icon="lock" group type="password"  onChange={this.handleChange}/>
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={()=>this.iniciarSesion()}>
                                        <Link to= {this.redirect()}> Ingresar</Link>
                                    </MDBBtn>
                                    <MDBBtn >
                                        <Link to= {'/signup'}> Registrarse</Link>
                                    </MDBBtn>
                                </div>
                                <div className='text-center'>
                                    <Link to = {'/getpass'}>¿Olvidaste tu contraseña?</Link>
                                </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                </MDBContainer>
                </div>
            </div>
          );
          
    }

};

export default Login;