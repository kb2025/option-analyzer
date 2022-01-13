import { useResultsData } from "../Providers/ResultsDataProvider"
import useGetResults from "../DataHandlers/useGetResults"
import { useEffect } from "react"


const StrikeSelections = () => {
    const { resultsData, setResultsData } = useResultsData()

    const handleClick = (id) => {
        setResultsData(resultsData.filter((_, index) => index !== parseInt(id)))
    }

    return (
            resultsData.map((item) => {
                if (Object.keys(item) == 'CALL') {
                    if (item.CALL[2] == 'BUY') {
                        return ( 
                            <div key={resultsData.indexOf(item)} className='col-auto'>
                            <button
                                className='btn btn-sm btn-success m-1'
                                id={resultsData.indexOf(item)}
                                value={item.CALL[0], item.CALL[1]}
                                onClick={(event) => handleClick(event.target.id)}
                            >
                              LC ${item.CALL[0]}
                            </button>
                            </div>
                        )
                    } else if (item.CALL[2] == 'SELL') {
                        return (
                            <div key={resultsData.indexOf(item)} className='col-auto'>
                            <button
                                className='btn btn-sm btn-success m-1'
                                id={resultsData.indexOf(item)}
                                value={item.CALL[0], item.CALL[1]}
                                onClick={(event) => handleClick(event.target.id)}
                            >
                              SC ${item.CALL[0]}
                            </button>
                            </div>
                        )
                    }
                } else if (Object.keys(item) == 'PUT') {
                    if (item.PUT[2] == 'BUY') {
                        return (
                            <div key={resultsData.indexOf(item)} className='col-auto'>
                            <button
                                className='btn btn-sm btn-danger m-1'
                                id={resultsData.indexOf(item)}
                                value={item.PUT[0], item.PUT[1]}
                                onClick={(event) => handleClick(event.target.id)}>
                                LP ${item.PUT[0]}
                            </button>
                            </div>
                        )
                    } else if (item.PUT[2] == 'SELL') {
                        return (
                            <div key={resultsData.indexOf(item)} className='col-auto'>
                            <button
                                className='btn btn-sm btn-danger m-1'
                                id={resultsData.indexOf(item)}
                                value={item.PUT[0], item.PUT[1]}
                                onClick={(event) => handleClick(event.target.id)}>
                                SP ${item.PUT[0]}
                            </button>
                            </div>
                        )
                    }
                }
            } 
        )
    ) 
    useEffect()
}


export default StrikeSelections
