import React from 'react'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'
import { useResultsData } from '../Providers/ResultsDataProvider'
import { useApiInputs } from '../Providers/ApiInputsProvider'
import StrikeSelections from './StrikeSelections'
import DateSelectButtons from './DateSelectButtons'

const StrikeTable = () => {

    let { selectedDate } = useSelectedDate()
    const { resultsData, setResultsData } = useResultsData()
    const { ticker } = useApiInputs()

    const {
        underlyingPrice,
        expDates,
        callStrikes,
        putStrikes,
        markChange,
        markPercentChange
    } = useTransformData()

    const strikes = putStrikes

    if (expDates) {
        selectedDate = (selectedDate) ? selectedDate : expDates[expDates.length - 1]
        return (
            <div className='bg-dark'>
                {expDates.map((date, i) => {
                    if (date === selectedDate) {
                        return (
                            <>
                                <div className="bg-dark justify-content-center text-white pt-3">
                                    <div className='row justify-content-center text-center'>
                                    SELECT EXPIRATION DAY
                                    <div className='row justify-content-center text-center'>
                                    {ticker} {date.replace(":", ` | Days Until Expiration: `)}
                                    </div>
                                    </div>
                                    <div className='row justify-content-center text-center'>
                                    <DateSelectButtons />
                                    </div>
                                    <div className='row justify-content-center text-center p-1'>
                                    <StrikeSelections />
                                    </div>
                                    </div>

                                <div id="table" className="table-responsive scroll">
                                    <table className="table table-sm table-striped table-dark">
                                        <thead className='header'>
                                            <tr>
                                                <th colSpan="4" className="text-center bg-danger align-middle p-0">PUT</th>
                                                <th className='text-center border rounded text-white p-2'>
                                                {`${ticker} $${parseFloat(underlyingPrice).toFixed(2)}`}
                                                </th>
                                                <th colSpan="4" className="text-center bg-success align-middle p-0">CALL</th>
                                            </tr>
                                            <tr>
                                                <th className="left-head text-center">+/-</th>
                                                <th className="text-center">OPEN INTEREST</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">STRIKE</th>
                                                <th className="text-center">MARK</th>
                                                <th className="text-center">DELTA</th>
                                                <th className="text-center">OPEN INTEREST</th>
                                                <th className="right-head text-center">+/-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(strikes[i])?.map((strike) => {
                                                return (
                                                    <tr key={strike}>
                                                        <td className="text-center align-middle">
                                                            <button
                                                                className='btn btn-success btn-sm m-1 text-center'
                                                                value={'PUT'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(putStrikes[i][strike][0].mark),
                                                                            'BUY',
                                                                            putStrikes[i][strike][0].daysToExpiration

                                                                        ]
                                                                }]) : null}>
                                                                BUY
                                                            </button>
                                                            <button
                                                                className='btn btn-danger btn-sm m-1 text-center'
                                                                value={'PUT'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    PUT:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(putStrikes[i][strike][0].mark),
                                                                            'SELL',
                                                                            putStrikes[i][strike][0].daysToExpiration
                                                                        ]
                                                                }]) : null}>
                                                                SELL
                                                            </button>
                                                        </td>
                                                        <td className="text-center">
                                                            {putStrikes[i][strike][0].openInterest}
                                                        </td>
                                                        <td className="text-center">
                                                            {putStrikes[i][strike][0].delta}
                                                        </td>
                                                        <td className="text-center">
                                                            ${putStrikes[i][strike][0].mark}
                                                        </td>
                                                        {(() => {
                                                            if (parseFloat(strike) <= underlyingPrice + underlyingPrice * .001 && parseFloat(strike) >= underlyingPrice - underlyingPrice * .001) {
                                                                return (
                                                                    <td className="text-center text-warning">
                                                                        ${parseFloat(strike)}
                                                                    </td>
                                                                )
                                                            } else {
                                                                return (
                                                                    <td className="text-center">
                                                                        ${parseFloat(strike)}
                                                                    </td>
                                                                )
                                                            }
                                                        })()}
                                                        <td className="text-center">
                                                            ${callStrikes[i][strike][0].mark}
                                                        </td>
                                                        <td className="text-center">
                                                            {callStrikes[i][strike][0].delta}
                                                        </td>
                                                        <td className="text-center">
                                                            {callStrikes[i][strike][0].openInterest}
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                className='btn btn-danger btn-sm m-1 text-center'
                                                                value={'CALL'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(callStrikes[i][strike][0].mark),
                                                                            'SELL',
                                                                            putStrikes[i][strike][0].daysToExpiration
                                                                        ]
                                                                }]) : null}>
                                                                SELL
                                                            </button>
                                                            <button
                                                                className='btn btn-success btn-sm m-1 text-center'
                                                                value={'CALL'}
                                                                onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                    CALL:
                                                                        [
                                                                            parseFloat(strike),
                                                                            parseFloat(callStrikes[i][strike][0].mark),
                                                                            'BUY',
                                                                            putStrikes[i][strike][0].daysToExpiration
                                                                        ]
                                                                }]) : null}>
                                                                BUY
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
                    } else { return null }
                })}
            </div>
        )
    } else { return null }
}

export default StrikeTable
