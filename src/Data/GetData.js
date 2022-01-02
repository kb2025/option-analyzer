import React from 'react';
import { useState, useEffect } from 'react'
const KEY = process.env.REACT_APP_API_KEY;

export const DataContext = React.createContext(null);
export const StrikeDatesContext = React.createContext(null);

const GetData = (ticker, expMonth) => {

    /* API call using ticker and expMonth */
    const year = new Date().getFullYear()
    const month = new Date(`${expMonth}-1-01`).toLocaleDateString(`en`, { month: `2-digit` })
    const day = new Date(year, month, 0).toLocaleDateString(`en`, { day: `2-digit` })
    const request = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${KEY}&symbol=${ticker}&fromDate=${year}-${month}-01&toDate=${year}-${month}-${day}`;

    const [data, setData] = useState([null])

    const fetchData = () => {
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }

    /* Fetch data and set data state on expMonth change */
    useEffect(() => {
        fetchData()
    }, [ticker, expMonth])


    console.log({'From GetData': data.underlyingPrice})
    
    return {data}
}

export default GetData