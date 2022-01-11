import React from 'react'
import useTransformData from '../DataHandlers/useTransformData'
import ResultsCard from './ResultsCard'
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
        selectedDate = (selectedDate) ? selectedDate : expDates[expDates.length - 1]
        return (
            <div className='card scroll'>
                <ResultsCard />
                {expDates.map((date, i) => {
                    if (date == selectedDate) {
                        return (
                            <>
                                <div className='card-header bg-dark text-white text-center'>
                                    {date.replace(":", ` | Days Until Expiration `)}
                                       <br></br>Current Price: ${parseFloat(underlyingPrice).toFixed(2)}
                                        <div className='row'>
                                            <div className="col text-center bg-danger m-0">
                                                PUT
                                            </div>
                                            <div className="col text-center bg-success m-0">
                                                CALL
                                        </div>
                                    </div>
                                </div>
                                <div id="table" className="table-responsive m-0 p-0">
                                    <table className="table table-sm table-striped table-dark m-0 p-0">
                                        <thead className='header p-5'>
                                            <tr>
                                                <th className="text-center">+/-</th>
                                                <th className="text-center">OI</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">STRIKE</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">OI</th>
                                                <th className="text-center">+/-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(strikes[i])?.map((strike) => {
                                                return (
                                                    <tr key={strike}>
                                                        <td className="text-center">
                                                            <button
                                                                className='btn btn-success btn-sm m-1'
                                                                value={'PUT'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(-putStrikes[i][strike][0].mark.toFixed(2)),
                                                                            'BUY'
                                                                        ]
                                                                }]) : null}>
                                                                BUY
                                                            </button>
                                                            <button
                                                                className='btn btn-danger btn-sm m-1'
                                                                value={'PUT'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(putStrikes[i][strike][0].mark.toFixed(2)),
                                                                            'SELL'
                                                                        ]
                                                                }]) : null}>
                                                                SELL
                                                            </button>
                                                        </td>
                                                        <td className="text-center">
                                                            {putStrikes[i][strike][0].openInterest}
                                                        </td>
                                                        <td className="text-center">
                                                            {parseFloat(putStrikes[i][strike][0].delta).toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${putStrikes[i][strike][0].mark}
                                                        </td>
                                                        <td className="text-center">
                                                            ${parseFloat(strike).toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${callStrikes[i][strike][0].mark}
                                                        </td>
                                                        <td className="text-center">
                                                            {parseFloat(callStrikes[i][strike][0].delta).toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            {callStrikes[i][strike][0].openInterest}
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                className='btn btn-success btn-sm m-1'
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(-callStrikes[i][strike][0].mark.toFixed(2)),
                                                                            'BUY'
                                                                        ]
                                                                }]) : null}>
                                                                BUY
                                                            </button>
                                                            <button
                                                                className='btn btn-danger btn-sm m-1'
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(callStrikes[i][strike][0].mark.toFixed(2)),
                                                                            'SELL'
                                                                        ]
                                                                }]) : null}>
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
