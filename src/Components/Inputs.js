import React, { useState, useRef } from 'react';
import { DropdownButton, Dropdown, Form, FormControl } from 'react-bootstrap';
import GetData from '../Data/GetData'

const TickerExpInputs = () => {

    const tickerInput = useRef();
    const [ticker, setTicker] = useState(null)
    const [expMonth, setExpMonth] = useState('CHOOSE EXP MONTH')
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        
    GetData(ticker, expMonth)


    /* Set ticker and expiration month after expiration month is chosen*/
    const handleChange = (event) => {
        setExpMonth(event)
        setTicker(tickerInput.current.value.toUpperCase())
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
        </>
    );
}

export default TickerExpInputs
