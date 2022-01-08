import React, { useState } from 'react';
import { DropdownButton, Dropdown, Form, FormControl, Col, Row } from 'react-bootstrap';
import useGetData from '../DataHandlers/useGetData'
import DateSelectButtons from './DateSelectButtons'

const ApiInputs = () => {

    const [ticker, setTicker] = useState('SPY')
    const [expMonth, setExpMonth] = useState('JAN')
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    useGetData(ticker, expMonth)

    return (
        <>
        <Row>
        <Col xs lg="5">
            <Form>
                <FormControl
                    type="text"
                    id="ticker"
                    name="ticker"
                    placeholder="TICKER"
                    aria-label="TICKER"
                    value={ticker}
                    onChange={(event) => setTicker(event.target.value)}
                    required
                />
            </Form>
            </Col>
            <Col>
            {/*Dropdown values used for EXP date selection - sets state*/}
            <DropdownButton
                variant="outline-light"
                title={expMonth}
                id="collasible-nav-dropdown"
                onSelect={(event) => setExpMonth(event)}
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
            </Col>
            <Col className='mt-3'>
            <DateSelectButtons />    
            </Col>     
            </Row>
        </>
    );
}

export default ApiInputs
