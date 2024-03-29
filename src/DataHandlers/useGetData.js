import { useEffect } from 'react'
import { useApiInputs } from '../Providers/ApiInputsProvider';
import { useOptionData } from "../Providers/OptionDataProvider";
import { useSelectedDate } from '../Providers/SelectedDateProvider';

const KEY = 'KOS1RXP2ZUGW0XKIKVNYZBK4ZJAZP5KB' /*process.env.REACT_APP_API_KEY;*/

const useGetData = () => {

    const { setOptionData } = useOptionData()
    const { setSelectedDate } = useSelectedDate()
    const {ticker, expMonth, submit, setSubmit } = useApiInputs()
  

    /* API call using ticker and expMonth */
    const year = new Date().getFullYear()
    const month = new Date(`${expMonth}-1-01`).toLocaleDateString(`en`, { month: `2-digit` })
    const day = new Date(year, month, 0).toLocaleDateString(`en`, { day: `2-digit` })

    let request = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${KEY}&symbol=${ticker}&fromDate=${year}-${month}-01&toDate=${year}-${month}-${day}`;    
    /*console.log('API CALL: ', request)*/

    const fetchData = () => {
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                /*console.log('FETCHED OPTION DATA: ', data)*/
                if (data.status=='FAILED') {
                    setOptionData('FAILED')
                } else {
                setOptionData(data) }
            })
    }

    useEffect(() => {
        fetchData()
        setSelectedDate('')
        setSubmit(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit])
}

export default useGetData
