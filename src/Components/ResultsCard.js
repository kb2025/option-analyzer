import { useResultsData } from "../Providers/ResultsDataProvider"
import useGetResults from "../DataHandlers/useGetResults.js"


const ResultsCard = () => {
    const { resultsData, setResultsData, maxProfit, maxLoss } = useResultsData()
    useGetResults()

    return (
            <div className='bg-dark text-white text-center'>
                <div id="table" className="table-responsive">
                    <table className="table table-lg table-striped table-dark">
                        <thead>
                            <tr>
                                <th>
                                    DISPLAY STRATEGY BASED ON BUY/SELL SELECTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Max Profit: 
                                    ${maxProfit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Max Loss: ${maxLoss}
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
