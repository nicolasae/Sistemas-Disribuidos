import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from "react-router-dom";


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={
        form:{
            username:'',
            password:''
        },
        cargo:'',
        isOpen: false

    }
}


toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (        
      <MDBNavbar color="default-color" dark expand="md">      
        <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to={'/'}>Inicio</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink  to={'/login'}>Inicio Sesión</MDBNavLink>             
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink  to={'/transactions'}>Transacciones</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>

    );
  }
}

export default Navbar;