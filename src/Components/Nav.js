import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import useTransformData from '../DataHandlers/useTransformData';
import ApiInputs from './ApiInputs';

const Navigation = () => {

  const { transformData } = useTransformData()
    
    return (
      <>
          <Navbar className='pl-0' expand='lg' bg="dark" variant="dark" sticky="top">
            {/*<Navbar.Brand href="#home">
              <img src={process.env.PUBLIC_URL + '/OptionsOptimizer.png'} width='150' />
            </Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <div className='row'>
              <Nav>
                <ApiInputs />
              </Nav>
              </div>
            </Navbar.Collapse>
          </Navbar>
      </>
    );
  }
  
  export default Navigation
