import React from 'react'
import { GetData } from '../Data/DataFetch'
import { TickerContext } from './Navbar'
import { ExpMonthContext } from '../Components/Navbar'

const StrikeTables = () => {
    const ticker = React.useContext(TickerContext)
    const expMonth = React.useContext(ExpMonthContext)

    const data = GetData(ticker, expMonth)

    return (
        <div id="table" className="table-responsive m-0 p-0">
            <table className="table table-sm table-hover table-striped table-dark m-0 p-0">
                <thead>
                    <tr>
                        <th colSpan="6" className="text-center">
                            TESTING
                        </th>
                    </tr>
                    <tr>
                        <th className="text-center">DATA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center bg-white">

                            <pre>
                                <code>
                                    {JSON.stringify(data, undefined, 2)}
                                </code>
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StrikeTables