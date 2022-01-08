const ResultsCard = () => {
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