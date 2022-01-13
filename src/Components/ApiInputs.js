import React, { useState } from 'react';
import { DropdownButton, Dropdown, Form, FormControl, Col, Row, Button} from 'react-bootstrap';
import useGetData from '../DataHandlers/useGetData'
import { useApiInputs } from '../Providers/ApiInputsProvider';

const ApiInputs = () => {

    const {ticker, setTicker} = useApiInputs()
    const {expMonth, setExpMonth} = useApiInputs()

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

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
        </>
    );
}

export default ApiInputs
