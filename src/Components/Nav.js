import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import TickerExpInputs from './Inputs';

const Navigation = () => {
    
    return (
      <>
          <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
            {/*<Navbar.Brand href="#home">
              <img src={process.env.PUBLIC_URL + '/OptionsOptimizer.png'} width='150' />
            </Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className='ml-0'>
                <TickerExpInputs/>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </>
    );
  }
  
  export default Navigation
