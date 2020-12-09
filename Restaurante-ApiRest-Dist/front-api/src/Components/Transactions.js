import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput,MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import NavBar from './NavBar';

class Transactions extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password:''
            },
            data:[],
        }
        this.transData()
    }

    transData=()=>{
        fetch('http://localhost:3001/transaction/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            var id;
            var transmitter;
            var receiver;
            var value;
            var reference;
            var columns =[];
            console.log(data);
            for(const i in data){
                id=data[i]._id;
                transmitter=data[i].transmitter;
                receiver=data[i].receiver;
                value=data[i].value;
                reference=data[i].reference;
                columns.push({
                    id:id,
                    transmitter:transmitter,
                    receiver:receiver,
                    value:value,
                    reference:reference
                });
            }
            console.log(columns);
            this.setState({data:columns})
        })
        .catch(errormessage => {
            console.log(errormessage);
            alert('No se pudieron obtener las contraseñas');

        })
        

    };
    getTabledata=()=>{
        var listRow=[];
        for(const i in this.state.data){
            listRow.push(this.state.data[i])
        }
        const data ={
                    columns:[
                            {
                            label: 'Id',
                            field: 'id',
                            sort: 'asc',
                            width: 150
                            },
                            {
                            label: 'Transmisor',
                            field: 'transmitter',
                            sort: 'asc',
                            width: 270
                            },
                            {
                            label: 'Receptor',
                            field: 'receiver',
                            sort: 'asc',
                            width: 200
                            },
                            {
                            label: 'Valor',
                            field: 'value',
                            sort: 'asc',
                            width: 100
                            },
                            {
                            label: 'Referencia',
                            field: 'reference',
                            sort: 'asc',
                            width: 100
                            }
                        ],
                    rows: listRow
                }
            console.log(data);
            console.log(this.state.data);
        return data

    }
 
    render(){
        return (
            <div>
                <NavBar/>

            <MDBDataTable responsive striped bordered hover data={this.getTabledata()}/>
                <div className="text-center">
                    <MDBBtn onClick={()=>this.transData()}>
                        Update
                    </MDBBtn>
                </div>    
            </div>
        
        );
    }

};

export default Transactions;