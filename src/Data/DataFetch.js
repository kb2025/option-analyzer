import { useState, useEffect } from 'react'
const KEY = process.env.REACT_APP_API_KEY;

export const GetData = (ticker, expMonth) => {
    const year = new Date().getFullYear()
    const month = new Date(`${expMonth}-1-01`).toLocaleDateString(`en`, { month: `2-digit` })
    const day = new Date(year, month, 0).toLocaleDateString(`en`, { day: `2-digit` })

    const request = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${KEY}&symbol=${ticker}&fromDate=${year}-${month}-01&toDate=${year}-${month}-${day}`;

    const [data, setData] = useState([])
    const [strikeDates, setStrikeDates] = useState([])

    const fetchData = () => {
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }

    useEffect(() => {
        fetchData()
        getStrikeDates()
    }, [ticker, expMonth])

    const getStrikeDates = () => {
        let strikeDates
        for (let date in data.putExpDateMap) {
            strikeDates.push(date)
        }
        setStrikeDates(strikeDates)
    }

    return { data, strikeDates }
}