import React from 'react'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'
import { useResultsData } from '../Providers/ResultsDataProvider'

const StrikeTable = () => {

    let { selectedDate } = useSelectedDate()
    const { resultsData, setResultsData } = useResultsData()

    const {
        optionData,
        underlyingPrice,
        expDates,
        callStrikes,
        putStrikes
    } = useTransformData()

    const strikes = putStrikes

    if (expDates) {
        selectedDate = (selectedDate) ? selectedDate : expDates[0]
        return (
            <div className='card scroll'>
                {expDates.map((date, i) => {
                    if (date == selectedDate) {
                        return (
                            <>
                                <div className='card-header bg-dark text-white text-center'>
                                    {date.replace(":", ` | Days Until Expiration `)}
                                </div>
                                <div id="table" className="table-responsive m-0 p-0">
                                    <table className="table table-sm table-striped table-dark m-0 p-0">
                                        <thead>
                                            <tr>
                                                <th colSpan="4" className="text-center bg-danger">
                                                    PUT
                                                </th>
                                                <th className="text-center">
                                                    CURRENT PRICE:   ${underlyingPrice}
                                                </th>
                                                <th colSpan="4" className="text-center bg-success">
                                                    CALL
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="text-center">+/-</th>
                                                <th className="text-center">OPEN INTEREST</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">STRIKE</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">OPEN INTEREST</th>
                                                <th className="text-center">+/-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(strikes[i])?.map((strike) => {
                                                return (
                                                    <tr key={strike}>
                                                        <td className="text-center">
                                                            <button
                                                                className='btn-success btn-sm m-1'
                                                                value={'PUT'}
                                                                onClick={() => setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(-putStrikes[i][strike][0].mark.toFixed(2)),
                                                                        ]
                                                                }])}>
                                                                BUY
                                                            </button>
                                                            <button
                                                                className='btn-danger btn-sm m-1'
                                                                value={'PUT'}
                                                                onClick={() => setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(putStrikes[i][strike][0].mark.toFixed(2)),
                                                                        ]
                                                                }])}>
                                                                SELL
                                                            </button>
                                                        </td>
                                                        <td className="text-center">
                                                            {putStrikes[i][strike][0].openInterest}
                                                        </td>
                                                        <td className="text-center">
                                                            {putStrikes[i][strike][0].delta.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${putStrikes[i][strike][0].mark.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${parseFloat(strike).toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${callStrikes[i][strike][0].mark.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            {callStrikes[i][strike][0].delta.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            {callStrikes[i][strike][0].openInterest.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                className='btn-success btn-sm m-1'
                                                                onClick={() => setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(-callStrikes[i][strike][0].mark.toFixed(2)),
                                                                        ]
                                                                }])}>
                                                                BUY
                                                            </button>
                                                            <button
                                                                className='btn-danger btn-sm m-1'
                                                                onClick={() => setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(callStrikes[i][strike][0].mark.toFixed(2)),
                                                                        ]
                                                                }])}>
                                                                SELL
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    }
                })}
            </div>
        )
    } else {
        return null
    }
}

export default StrikeTable
