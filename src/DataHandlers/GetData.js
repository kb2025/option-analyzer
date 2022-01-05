import { useEffect } from 'react'
import { useOptionData } from "./OptionDataProvider";
const KEY = process.env.REACT_APP_API_KEY;

const UseGetData = (ticker, expMonth) => {

    const { setOptionData } = useOptionData()

    /* API call using ticker and expMonth */
    const year = new Date().getFullYear()
    const month = new Date(`${expMonth}-1-01`).toLocaleDateString(`en`, { month: `2-digit` })
    const day = new Date(year, month, 0).toLocaleDateString(`en`, { day: `2-digit` })

    let request = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${KEY}&symbol=${ticker}&fromDate=${year}-${month}-01&toDate=${year}-${month}-${day}`;    

    console.log('API CALL: ', request)

    const fetchData = () => {
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                console.log('FETCHED OPTION DATA: ', data)
                setOptionData(data)
            })
    }

    /* Fetch data and set data state on expMonth change */
    useEffect(() => {
        fetchData()
    }, [expMonth])
}

export default UseGetData
