import React from 'react'
import { useState } from 'react'
import { GetData } from './DataFetch'
import { TickerContext } from '../App'
import { ExpMonthContext } from '../App'

export const TransformData = () => {
    const ticker = React.useContext(TickerContext)
    const expMonth = React.useContext(ExpMonthContext)
    const data = GetData(ticker, expMonth)

    const [strikeDates, setStrikeDates] = useState([])

    for (let date in data.putExpDateMap) {
        strikeDates.push(date)
    }

    setStrikeDates(strikeDates)

    return {strikeDates}
}