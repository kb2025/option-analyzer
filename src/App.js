import React, { useState, useRef } from 'react';
import { DropdownButton, Dropdown, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import StrikeTables from './Components/StrikeTables';

export const TickerContext = React.createContext(null);
export const ExpMonthContext = React.createContext(null);

const App = () => {
  const tickerInput = useRef();
  const [ticker, setTicker] = useState('')
  const [expMonth, setExpMonth] = useState('CHOOSE EXP MONTH')
  const handleChange = (event) => {
    setExpMonth(event)
    setTicker(tickerInput.current.value.toUpperCase())
  }
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  return (
    <>
    <ExpMonthContext.Provider value={expMonth}>
      <TickerContext.Provider value={ticker}>
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="#home">
            <img src={process.env.PUBLIC_URL + '/OptionsOptimizer.png'} width='150' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ml-0'>
              <Form className="d-flex">
                <FormControl
                  type="text"
                  id="ticker"
                  className="m-2"
                  name="ticker"
                  ref={tickerInput}
                  placeholder="TICKER"
                  aria-label="TICKER"
                  required
                />
              </Form>
              {/*Dropdown values used for EXP date selection - sets state*/}
              <DropdownButton
                className="m-2"
                variant="outline-light"
                title={expMonth}
                id="collasible-nav-dropdown"
                onSelect={handleChange}
              >
                {/*Expiration by month choices*/}
                {months.map((month) => 
                <Dropdown.Item
                  id="expMonth"
                  eventKey={month}
                >
                  {month}
                </Dropdown.Item>
                )}
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
       <StrikeTables />
      </TickerContext.Provider>
      </ExpMonthContext.Provider>
    </>
  );
}

export default App