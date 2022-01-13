import React from 'react';
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { useApiInputs } from '../Providers/ApiInputsProvider';
import useGetData from '../DataHandlers/useGetData';
import ApiInputs from './ApiInputs';
import ResultsCard from './ResultsCard';

const Navigation = () => {

  const {ticker} = useApiInputs()
  const {expMonth} = useApiInputs()

  useGetData(ticker,expMonth)

  return (
    <Navbar className='text-white' bg="dark" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#" className='text-white'>OPTION ANALYZER</Navbar.Brand>
        <Navbar.Toggle className='bg-dark border-white text-white'>TICKER SELECTION & RESULTS</Navbar.Toggle>
        <Navbar.Offcanvas
          className='bg-dark text-white'
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title id="offcanvasNavbarLabel">TICKER SELECTION & RESULTS</Offcanvas.Title>
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
