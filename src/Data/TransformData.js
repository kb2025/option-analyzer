import React from 'react'
import GetData from '../Data/GetData'
import { TickerContext, ExpMonthContext } from '../App'

/* This is where I would like to manipulate data to send to the tables */
const TransformData = () => {
    const ticker = React.useContext(TickerContext)
    const expMonth = React.useContext(ExpMonthContext)
    const data = GetData(ticker, expMonth)

    /* Trying to get underlyingPrice from data returns undefined*/
    const price = data.underlyingPrice
    console.log({'From TransformData': data.underlyingPrice})

    return {data, price}
}

export default TransformData