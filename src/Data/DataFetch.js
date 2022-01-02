import React from 'react';
import { useState, useEffect } from 'react'
import { ExpMonthContext, TickerContext } from '../App';
const KEY = process.env.REACT_APP_API_KEY;

export const DataContext = React.createContext(null);
export const StrikeDatesContext = React.createContext(null);

const GetData = () => {

    const ticker = React.useContext(TickerContext)
    const expMonth = React.useContext(ExpMonthContext)

    const year = new Date().getFullYear()
    const month = new Date(`${expMonth}-1-01`).toLocaleDateString(`en`, { month: `2-digit` })
    const day = new Date(year, month, 0).toLocaleDateString(`en`, { day: `2-digit` })

    const request = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${KEY}&symbol=${ticker}&fromDate=${year}-${month}-01&toDate=${year}-${month}-${day}`;

    const [data, setData] = useState([])

    const fetchData = () => {
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [ticker, expMonth])

    console.log(data)

    const [strikeDates, setStrikeDates] = useState([])

    for (let date in data.putExpDateMap) {
        strikeDates.push(date)
    }

    setStrikeDates(strikeDates)

    return  (
    <>
    <DataContext.Provider value={data}/>
    <StrikeDatesContext.Provider value={strikeDates}/>
    </>
    )
}

export default GetData