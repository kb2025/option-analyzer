import React, { useState, useRef } from 'react';
import { DropdownButton, Dropdown, Form, FormControl, ButtonGroup, ToggleButton } from 'react-bootstrap';
import UseGetData from '../DataHandlers/GetData'
import useTransformData from '../DataHandlers/TransformData';
import DateSelectButtons from './DateSelectButtons'

const TickerExpInputs = () => {
    const { currentPrice } = useTransformData()
    let underlyinPrice = (currentPrice) ? parseFloat(underlyinPrice).toFixed(2) : '$0.00'

    useTransformData()
    
    const tickerInput = useRef();
    const [ticker, setTicker] = useState(null)
    const [expMonth, setExpMonth] = useState('CHOOSE EXP MONTH')
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    UseGetData(ticker, expMonth)

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
            
            <div className='text-white text-center ml-2 mr-2'>
                <strong>Current Price</strong>
                <br></br>
                {underlyinPrice}
                </div>

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
            <DateSelectButtons />         
        </>
    );
}

export default TickerExpInputs
