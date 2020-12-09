import React,{useState} from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/Login';
import Landing from './Components/Landing'
import Transactions from './Components/Transactions'
import GetPass from './Components/GetPass'
import SignUp from  './Components/SignUp'


const App = props => {
  const [token,setToken] = useState("");
  const [iduser,setIduser] = useState("");

    return(

      
      <Switch>

        <Route exact path='/' component={Home}/>  

        <Route path='/login' exact render={propiedades => (<Login {...propiedades} setToken = {setToken}  setIduser={setIduser}/>)}/>

        <Route path='/signup' exact render={propiedades => (<SignUp {...propiedades} setToken = {setToken}  setIduser={setIduser}/>)}/>

        <Route path='/getpass' exact render={propiedades => (<GetPass {...propiedades} setToken = {setToken}  setIduser={setIduser}/>)}/>


        <Route path='/landing' exact render={propiedades => (<Landing {...propiedades} token = {token} iduser={iduser}/>)}/>

        <Route path='/transactions' exact render={propiedades => (<Transactions {...propiedades} setToken = {setToken}  setIduser={setIduser}/>)}/>



      </Switch>
    
    
    );

}

export default App;
