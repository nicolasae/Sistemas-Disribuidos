import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBSelect } from 'mdbreact';
import NavBar from './NavBar';


class Landing extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password:'',
                valueConsign:0,
                valueOutcash:0,
                sendvalue:0,
                receiver:'',
            },
            cash:0,
            forsend:'',
            users:[],
            seeCash:false,
            outCash:false,
            consignCash:false,
            sendCash:false,
        }
    }


/////////////////////////////////////////////////////////////////
    handleChange=async e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }
    handleSel=(event)=>{
        this.setState({forsend: event.target.value })
    }
/////////////////////////////////////////////////////////////////
    getcashdata=()=>{
        let cadenacontra= 'contra: ';
        console.log(this.props.token);
        let autorizacion= cadenacontra.concat(this.props.token);
        var users=[];
        fetch('http://localhost:3001/user/getcash', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization':  autorizacion,
                'id':this.props.iduser
            },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                cash:data
            })
            console.log(data);
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('Usuario no autenticado, por favor vuelva a iniciar sesion');
        })
    }
    getuserdata=()=>{
        let cadenacontra= 'contra: ';
        console.log(this.props.token);
        let autorizacion= cadenacontra.concat(this.props.token);
        var users=[];
        fetch('http://localhost:3001/user/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization':  autorizacion,
                'id':this.props.iduser
            },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                users:data
            })
            users=data;
            console.log(data);
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('Usuario no autenticado, por favor vuelva a iniciar sesion');
        })
    }
    consignCashfunc=()=>{
        let cadenacontra= 'contra: ';
        console.log(this.props.token);
        let autorizacion= cadenacontra.concat(this.props.token);
        if(this.state.form.valueConsign>0){
            fetch('http://localhost:3001/transaction/consign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization':  autorizacion,
                    'id':this.props.iduser
                },
                body: JSON.stringify({
                    transmitter:this.props.iduser,
                    receiver:this.props.iduser,
                    value: this.state.form.valueConsign, 
                    reference: 'Consignacion'  
                }),
            })
            .then(response => {
                this.setState({form:{ ...this.state.form, valueConsign:0}})
                alert('consignacion exitosa')})
            .catch(errormessage => {
                console.log(errormessage);
                alert('Usuario no autenticado, por favor vuelva a iniciar sesion');
            })
        }
    }
    outCashfunc=()=>{
        let cadenacontra= 'contra: ';
        console.log(this.props.token);
        let autorizacion= cadenacontra.concat(this.props.token);
        if(this.state.form.valueOutcash>0){
            fetch('http://localhost:3001/transaction/outcash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization':  autorizacion,
                    'id':this.props.iduser
                },
                body: JSON.stringify({
                    transmitter:this.props.iduser,
                    receiver:this.props.iduser,
                    value: this.state.form.valueOutcash, 
                    reference: 'Retiro'  
                }),
            })
            .then(response => {
                this.setState({form:{ ...this.state.form, valueOutcash:0}});
                if(response.status == 200) alert('Retiro Exitoso');
                if(response.status == 401) alert('Fondos Insuficientes');
            })
            .catch(errormessage => {
                console.log(errormessage);
                alert('Usuario no autenticado, por favor vuelva a iniciar sesion');
            })
        }
    }
    sendCashfunc=()=>{
        let cadenacontra= 'contra: ';
        console.log(this.props.token);
        let autorizacion= cadenacontra.concat(this.props.token);
        fetch('http://localhost:3001/transaction/sendcash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization':  autorizacion,
                'id':this.props.iduser
            },
            body: JSON.stringify({
                transmitter:this.props.iduser,
                receiver:this.state.forsend,
                value: this.state.form.sendvalue, 
                reference: 'Envio de dinero'  
            }),
        })
        .then(response => {
            if(response.status==401) alert('Usuarios no validos, Inicie sesion');
            if(response.status==400) alert('Fondos Insuficientes');
            if(response.status==200) alert('Envio exitoso');
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('Usuario no autenticado, por favor vuelva a iniciar sesion');
        })
    }
 /////////////////////////////////////////////////////////////////

    seeCash=(event)=>{
        event.preventDefault();
        this.getcashdata();
        this.setState({
            seeCash:!this.state.seeCash,
            outCash:false,
            consignCash:false,
            sendCash:false,
        })
    }
    outCash=(event)=>{
        event.preventDefault(); 
        this.setState({
            outCash:!this.state.outCash,
            seeCash:false,
            consignCash:false,
            sendCash:false,
        })
    }
    consignCash=(event)=>{
        event.preventDefault(); 
        // this.consignCashfunc();
        this.setState({
            consignCash:!this.state.consignCash,
            outCash:false,
            seeCash:false,
            sendCash:false,
        })
    }
    sendCash=(event)=>{
        event.preventDefault(); 
        this.getuserdata();
        this.setState({
            sendCash:!this.state.sendCash,
            outCash:false,
            consignCash:false,
            seeCash:false,
        })
    }

 /////////////////////////////////////////////////////////////////////
    seeCashrender=()=>{
        if(this.state.seeCash){
            return(
                <div fa-border> 
                    <h1> Saldo Actual: </h1>
                    <h1> {this.state.cash}</h1>

                </div>

            )
        }else{
            return <div> </div>
        }
    }

    outCashrender=()=>{
        if(this.state.outCash){
            return(
                <div> 
                    <h1> Retirar dinero</h1>
                    <div 
                        style={{
                            position: 'absolute', left: '50%',
                            transform: 'translate(-50%, 0%)'
                        }}
                    >
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="16">
                                <div className="grey-text">
                                    <MDBInput name = 'valueOutcash' label="Valor" icon="dollar-sign" group type="number"  onChange={this.handleChange} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={()=>this.outCashfunc()}>Confirmar</MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                </MDBContainer>
                </div>
                </div>

            )
        }else{
            return <div> </div>
        }
    }
    consignCashrender=()=>{
        if(this.state.consignCash){
            return(
                <div>
                    <h1> Consignar dinero</h1>
                    <div 
                        style={{
                            position: 'absolute', left: '50%',
                            transform: 'translate(-50%, 0%)'
                        }}
                    >
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="16">
                                <div className="grey-text">
                                    <MDBInput name = 'valueConsign' label="Valor" icon="comment-dollar" group type="number"  onChange={this.handleChange} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={()=>this.consignCashfunc()}>Confirmar</MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                </MDBContainer>
                </div>
                </div>

            )
        }else{
            return <div> </div>
        }
    }
    listoptions=()=>{
        const users = this.state.users;
        var options= [];
        options.push(<option> Elige un usuario</option>)
        for(const i in users){
        options.push( <option value={users[i]._id}> {users[i].name +' '+ users[i].lastname}</option>)
        }
        return options;
    }

    sendCashrender=()=>{
        if(this.state.sendCash){
            return(
                <div> 
                    <h1> Enviar dinero</h1>
                    <MDBContainer>
                    <MDBRow>
                        <MDBCol md="16">
                            <MDBCard>
                                <MDBCardBody>
                                    <div className="grey-text">
                                    <select className="browser-default custom-select" value={this.state.forsend} onChange={this.handleSel}>
                                        <this.listoptions/>
                                    </select>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="16">
                            <MDBCard>
                                <MDBCardBody>
                                <div className="grey-text">
                                    <MDBInput
                                        name = 'sendvalue'
                                        label="Valor "
                                        icon="dollar-sign"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={this.handleChange}
                                    />
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center py-5 mt-6">
                        <MDBBtn onClick={()=>this.sendCashfunc()}>
                            Enviar dinero
                        </MDBBtn>
                    </div>
                </MDBContainer>
                </div>

            )
        }else{
            return <div> </div>
        }
    }
    render(){
        return (
            <div>
                <NavBar/>
                <div className="text-center" 
                style={{
                    position: 'absolute', top: '50%',
                    transform: 'translate( 50%, -50%)'
                }}> 
                    <MDBBtn onClick={this.seeCash}>Ver Saldo</MDBBtn>
                    <MDBBtn onClick={this.outCash}>Retirar</MDBBtn>
                    <MDBBtn onClick={this.consignCash}> Consignar </MDBBtn>
                    <MDBBtn onClick={this.sendCash}>Enviar Dinero</MDBBtn>
                    <this.seeCashrender/>
                    <this.sendCashrender/>
                    <this.outCashrender/>
                    <this.consignCashrender/>
                    
                </div>
            </div>
        );
    }

};

export default Landing;