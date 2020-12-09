import React, { Component } from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";


class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password:''
            },
            cargo:'',
        }
    }

    
 
    render(){
        return (
        <MDBContainer >
            <MDBCarousel
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
            background-color={'blue'}
            >
            <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                     <MDBView>
                        <img
                            className="d-block w-100 "
                            src="https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696229_960_720.jpg"
                            alt="First slide"
                            height = '800px'

                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2" >
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src="https://cdn.pixabay.com/photo/2018/02/27/06/30/skyscraper-3184798_960_720.jpg"
                            alt="Second slide"
                            height = '800px'

                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                    <MDBView>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2016/08/29/08/55/work-1627703_960_720.jpg"
                        alt="Third slide"
                        height = '800px'

                    />
                    </MDBView>
                </MDBCarouselItem>
            </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
        
        );
    }

};

export default Header;