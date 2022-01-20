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
        putStrikes
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
                                <div key={'1'} className="bg-dark justify-content-center text-white pt-3">
                                    <div className='row justify-content-center text-center'>
                                    <div className='h5 row justify-content-center text-center'>
                                    {ticker} 
                                    </div>
                                    {`Underlying Price: $${parseFloat(underlyingPrice).toFixed(2)}`}
                                    <div className='row justify-content-center text-center'>
                                    {date.replace(":", ` | `)} Days Until Expiration
                                    </div>
                                    </div>
                                    <div className='row justify-content-center text-center'>
                                        <div className='day-scroll col m-2'> <DateSelectButtons /></div>
                                    </div>
                                    <div className='row justify-content-center border-top border-bottom text-center pt-1 pb-2 mb-3 collapsible'>
                                    <StrikeSelections />
                                    </div>
                                    </div>

                                <div key={'2'} id="table" className="table-responsive scroll">
                                    <table className="table table-sm table-striped table-hover table-dark">
                                        <thead className='header'>
                                            <tr className='border-dark'>
                                                <th colSpan="4" className="text-center bg-danger align-middle p-0">PUT</th>
                                                <th className='put-call-bg text-center text-warning p-1'>
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
                                        <tbody key={'3'}>
                                            {Object.keys(strikes[i])?.map((strike, key) => {
                                                return (
                                                    <tr key={strike[key]} className='align-middle'>
                                                        <td className="text-center">
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
                                                            {parseFloat(putStrikes[i][strike][0].delta).toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            ${putStrikes[i][strike][0].mark}
                                                        </td>
                                                        {(() => {
                                                            if (parseFloat(strike) <= Math.ceil(parseFloat(underlyingPrice)) && parseFloat(strike) >= Math.round(parseFloat(underlyingPrice))) {
                                                                return (
                                                                    <td key={key} className="text-center text-warning rounded border">
                                                                        ${parseFloat(strike)}
                                                                    </td>
                                                                )
                                                            } else {
                                                                return (
                                                                    <td key={key} className="text-center">
                                                                        ${parseFloat(strike)}
                                                                    </td>
                                                                )
                                                            }
                                                        })()}
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
