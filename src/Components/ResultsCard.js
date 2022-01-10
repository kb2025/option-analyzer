import { useResultsData } from "../Providers/ResultsDataProvider"


const ResultsCard = () => {
    const { resultsData } = useResultsData()

    const handleClick=(event)=>{
        console.log(event)

    }

    console.log([resultsData])

    return (
        <div className="card text-white">
            <div className='card-header bg-dark text-white text-center'>
                <strong>RESULTS</strong>
                <div id="table" className="table-responsive m-0 p-0">
                    <table className="table table-sm table-striped table-dark m-0 p-0">
                        <thead>
                            <tr>
                                <th>
                                    DISPLAY STRATEGY BASED ON BUY/SELL SELECTION
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {resultsData.map((item) => {
                                        console.log(item)
                                        if (Object.keys(item) == 'CALL') {
                                            if (item.CALL[1] < 0) {
                                                return (
                                                    <button 
                                                    className='btn-success'
                                                    value={item}
                                                    onClick={(event)=>handleClick(event.target.value)}
                                                    >
                                                        CALL ${item.CALL[0]}
                                                    </button>
                                                )
                                            } else if (item.CALL[1] > 0) {
                                                return (
                                                    <button className='btn-danger'>
                                                        CALL ${item.CALL[0]}
                                                    </button>
                                                )
                                            }

                                        } else if (Object.keys(item) == 'PUT') {
                                            if (item.PUT[1] < 0) {
                                                return (
                                                    <button className='btn-success'>
                                                        PUT ${item.PUT[0]}
                                                    </button>
                                                )
                                            } else if (item.PUT[1] > 0) {
                                                return (
                                                    <button className='btn-danger'>
                                                        PUT ${item.PUT[0]}
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
                                    isplay Expectancy
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
        </div>

    )
}

export default ResultsCard