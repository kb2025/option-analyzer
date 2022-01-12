import React, { useState } from 'react';
import { DropdownButton, Dropdown, Form, FormControl, Col, Row} from 'react-bootstrap';
import useGetData from '../DataHandlers/useGetData'
import DateSelectButtons from './DateSelectButtons'

const ApiInputs = () => {

    const [ticker, setTicker] = useState('SPY')
    const [expMonth, setExpMonth] = useState('JAN')

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    useGetData(ticker, expMonth)

    return (
        <>
        <Row className="justify-content-md-center">
        <Col className='mt-2 pl-3'>
            <Form>
                <FormControl
                    type="text"
                    id="ticker"
                    name="ticker"
                    placeholder="TICKER"
                    aria-label="TICKER"
                    value={ticker}
                    onChange={(event) => setTicker(event.target.value.toUpperCase())}
                    required
                />
            </Form>
            </Col>
            <Col className='mt-2'>
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
            </Row>
            <Row className='mt-2 p-1'>
            <DateSelectButtons/>
            </Row>
        </>
    );
}

export default ApiInputs
