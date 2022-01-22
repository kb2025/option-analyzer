import { useResultsData } from "../Providers/ResultsDataProvider"
import useGetResults from "../DataHandlers/useGetResults.js"


const ResultsCard = () => {
    const { maxProfit, maxLoss, strategy, chanceProfit, expectancy, neededPremium } = useResultsData()
    useGetResults()

    const earlyProfit = ((neededPremium/maxProfit)*100) < 100 ? `Yes @ ${parseFloat((neededPremium/maxProfit)*100).toFixed(2)}%` : 'No'

    if (maxProfit) {
        return (
            <div className='bg-dark text-white text-left mt-5'>
                <div id="table" className="table-responsive">
                    <table className="table table-lg table-striped table-dark">
                        <thead className='align-middle'>
                            <tr>
                                <th colSpan='2' className='text-center'>
                                    {strategy}
                                </th>
                            </tr>
                        </thead>
                        <tbody className='align-middle'>
                            <tr>
                                <td>
                                    Max Profit:
                                </td>
                                <td>
                                    {maxProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Max Loss:
                                </td>
                                <td>
                                    {maxLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Chance of Profit
                                </td>
                                <td>
                                    {parseFloat(chanceProfit).toFixed(2)}%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Profit Needed <br/>
                                    For Pos. Expectancy
                                </td>
                                <td>
                                    {neededPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Early Profit Taking?
                                </td>
                                <td>
                                    {earlyProfit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Expectancy
                                </td>
                                <td>
                                    {expectancy}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <small><strong>Disclaimer:</strong> This is a practice project made for a web development portfolio and does not provide invesment advice in any way. Invest at your own risk. The creator of this site does not take any responsibility for your trading losses in any way.</small>
            </div>
        )
    } else {
        return (
            <div className='bg-dark text-white text-left mt-5'>
            <div id="table" className="table-responsive">
                <table className="table table-lg table-striped table-dark">
                    <thead className='align-middle'>
                        <tr>
                            <th colSpan='2' className='text-center'>
                                Strategy
                            </th>
                        </tr>
                    </thead>
                    <tbody className='align-middle'>
                        <tr>
                            <td>
                                Max Profit:
                            </td>
                            <td>
                               
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Max Loss:
                            </td>
                            <td>
                               
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Chance of Profit
                            </td>
                            <td>
                               
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Profit Needed <br/>
                                For Pos. Expectancy
                            </td>
                            <td>
                               
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Early Profit Taking?
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Expectancy
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <small><strong>Disclaimer:</strong> This is a practice project made for a web development portfolio and does not provide invesment advice in any way. Invest at your own risk. The creator of this site does not take any responsibility for your trading losses in any way.</small>
        </div>
        )
    }
}

export default ResultsCard
