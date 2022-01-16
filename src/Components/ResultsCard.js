import { useResultsData } from "../Providers/ResultsDataProvider"
import useGetResults from "../DataHandlers/useGetResults.js"


const ResultsCard = () => {
    const { resultsData, setResultsData, maxProfit, maxLoss, strategy, chanceProfit } = useResultsData()
    useGetResults()

    return (
            <div className='bg-dark text-white text-left mt-5'>
                <div id="table" className="table-responsive">
                    <table className="table table-lg table-striped table-dark">
                        <thead>
                            <tr>
                                <th colSpan='2' className='text-center'>
                                {strategy}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Max Profit: 
                                </td>
                                <td>    
                                {maxProfit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Max Loss:
                                </td>
                                <td>
                                {maxLoss}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Chance of Profit
                                </td>
                                <td>
                                {chanceProfit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Expectancy
                                </td>
                                <td>
                                    Work in Progress ...
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Percentage of Max Profit Needed To Be Captured to Maintain Positive Expectancy
                                </td>
                                <td>
                                Work in Progress ...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

    )
}

export default ResultsCard
