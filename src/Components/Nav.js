import React from 'react';
import { Nav, Navbar, Container, Offcanvas, Col, CloseButton } from 'react-bootstrap';
import useGetData from '../DataHandlers/useGetData';
import { useResultsData } from '../Providers/ResultsDataProvider';
import ApiInputs from './ApiInputs';
import ResultsCard from './ResultsCard';

const Navigation = () => {

  useGetData()

  const { show, setShow } = useResultsData();

  return (
    <Navbar collapseOnSelect className='text-white shadow' bg='dark' expand={false}>
      <Container fluid>
      <Navbar.Brand href="#home">
      <div className="container">
        <div className='row'>
        <Col>
        <img src={process.env.PUBLIC_URL + '/OptionsAnalyzerLogo.png'} alt='logo: target with arrow in bullseye' width='37'/>
        </Col>
        <Col>
          <h5 className='mt-2 text-white'>OPTION ANALYZER</h5>
          </Col>
          </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle className='bg-dark border-white text-white' onClick={()=>setShow(true)}><i className="h3 bi bi-search"></i></Navbar.Toggle>
        <Navbar.Offcanvas
          show={show}
          className='bg-dark text-white'
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header>
            <Offcanvas.Title id="offcanvasNavbarLabel">TICKER SELECTION & RESULTS</Offcanvas.Title>
            <CloseButton variant="white" onClick={()=>setShow(false)}/>
          </Offcanvas.Header>
          <Offcanvas.Body className='text-white'>
            <Nav className="justify-content-end">
              <ApiInputs />
              <ResultsCard />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}



export default Navigation
