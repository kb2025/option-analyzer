import React, { useState, useRef } from 'react';
import { DropdownButton, Dropdown, Form, FormControl, ButtonGroup, ToggleButton } from 'react-bootstrap';
import UseGetData from '../DataHandlers/GetData'
import useTransformData from '../DataHandlers/TransformData';

const TickerExpInputs = () => {
    const [radioValue, setRadioValue] = useState(null);
    const { currentPrice, uniqueDates } = useTransformData(radioValue)
    const tickerInput = useRef();
    const [ticker, setTicker] = useState(null)
    const [expMonth, setExpMonth] = useState('CHOOSE EXP MONTH')

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
     
    UseGetData(ticker, expMonth, radioValue)

    /* Set ticker and expiration month after expiration month is chosen*/
    const handleChange = (event) => {
        setExpMonth(event)
        setTicker(tickerInput.current.value.toUpperCase())
    }

    const tickerCheck = () => {
    if (ticker !== null) {
        return (
        <div className='text-white text-center ml-2 mr-2'><strong>Current Price</strong><br></br>${currentPrice.toFixed(2)}</div>
        )}
    }

    return (
        <>
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
            {tickerCheck()}
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
                        key={month}
                        id="expMonth"
                        eventKey={month}
                    >
                        {month}
                    </Dropdown.Item>
                )}
            </DropdownButton>
            <ButtonGroup className="m-2">
          {uniqueDates.map((radio, id) => (
            <ToggleButton
              key={id}
              id={`radio-${id}`}
              type="radio"
              variant="outline-light"
              name={radio}
              value={radio}
              checked={radioValue === radio}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio}
            </ToggleButton>
          ))}
        </ButtonGroup>
            
        </>
    );
}

export default TickerExpInputs
