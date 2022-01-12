import { useResultsData } from "../Providers/ResultsDataProvider"


const ResultsCard = () => {
    const { resultsData, setResultsData } = useResultsData()

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
