import { useEffect } from "react"
import useGetResults from "../DataHandlers/useGetResults"
import { useResultsData } from "../Providers/ResultsDataProvider"


const ResultsCard = () => {
    const { resultsData, setResultsData } = useResultsData()

    const handleClick=(id)=>{
        setResultsData(resultsData.filter((_, index)=> index !== parseInt(id)))
    }    

    return (
            <div className='bg-dark text-white text-center'>
                <div id="table" className="table-responsive">
                    <table className="table table-sm table-striped table-dark">
                        <thead>
                                <th>
                                    DISPLAY STRATEGY BASED ON BUY/SELL SELECTION
                                </th>
                            <tr>
                                <td>
                                    STRIKE SELECTIONS<br></br>
                                    {resultsData.map((item) => {
                                        if (Object.keys(item) == 'CALL') {
                                            if (item.CALL[2] == 'BUY') {
                                                return (
                                                    <button 
                                                    className='btn btn-sm btn-success m-1'
                                                    id={resultsData.indexOf(item)}
                                                    value={item.CALL[0], item.CALL[1]}
                                                    onClick={(event)=>handleClick(event.target.id)}
                                                    >
                                                        CALL ${item.CALL[0]} X
                                                    </button>
                                                )
                                            } else if (item.CALL[2] == 'SELL') {
                                                return (
                                                    <button 
                                                    className='btn btn-sm btn-danger m-1'
                                                    id={resultsData.indexOf(item)}
                                                    value={item.CALL[0], item.CALL[1]}
                                                    onClick={(event)=>handleClick(event.target.id)}
                                                    >
                                                        CALL ${item.CALL[0]} X
                                                    </button>
                                                )
                                            }

                                        } else if (Object.keys(item) == 'PUT') {
                                            if (item.PUT[2] == 'BUY') {
                                                return (
                                                    <button 
                                                    className='btn btn-sm btn-success m-1'
                                                    id={resultsData.indexOf(item)}
                                                    value={item.PUT[0], item.PUT[1]}
                                                    onClick={(event)=>handleClick(event.target.id)}>
                                                        PUT ${item.PUT[0]} X
                                                    </button>
                                                )
                                            } else if (item.PUT[2] == 'SELL') {
                                                return (
                                                    <button 
                                                    className='btn btn-sm btn-danger m-1'
                                                    id={resultsData.indexOf(item)}
                                                    value={item.PUT[0], item.PUT[1]}
                                                    onClick={(event)=>handleClick(event.target.id)}>
                                                        PUT ${item.PUT[0]} X
                                                    </button>
                                                )
                                            }
                                        }
                                    }
                                    )}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Display Max Profit
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Display Max Loss
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Display Chance of Profit
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Display Expectancy
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Display Percentage of Max Profit Needed To Be Captured to Maintain Positive Expectancy
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

    )
}

export default ResultsCard
