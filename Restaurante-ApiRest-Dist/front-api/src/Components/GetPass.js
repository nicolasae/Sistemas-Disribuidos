import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";
import NavBar from './NavBar';






class GetPass extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                //username:'',
                password:'',
                email:'',
                phone: '',
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
    
    getPass=async()=>{
        console.log(this.state.form);
        await fetch('http://localhost:3001/index/getpass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //email: this.state.form.username, 
                password: this.state.form.password,
                phone: this.state.form.phone,
                email: this.state.form.email
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                verificate: true,
                form:{ ...this.state.form,
                    password: data.pass

                }
            });
            console.log(data);
            console.log(this.state.verificate);
            alert('Su contraseña es: '+ this.state.form.password);
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('Error');

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
                        <p className="h2 text-center mb-6">Recuperar contraseña</p>
                        <div className="grey-text">
                            <MDBInput  name = 'email'label="Correo" icon="envelope" group type="email" onChange={this.handleChange} />
                            <MDBInput name = 'phone' label="Ingrese número de telefono" icon="address-book" group type="phone" onChange={this.handleChange} />
                        </div>
                        <div className="text-center">
                            <MDBBtn onClick={()=>this.getPass()} >
                                 Recordar
                            </MDBBtn>
                            <MDBBtn >
                                <Link to= {'/login'}> Iniciar Sesión</Link>
                            </MDBBtn>
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

export default GetPass;