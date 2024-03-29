import React from 'react'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'
import { useResultsData } from '../Providers/ResultsDataProvider'
import StrikeSelections from './StrikeSelections'
import DateSelectButtons from './DateSelectButtons'
import { useOptionData } from '../Providers/OptionDataProvider'

const StrikeTable = () => {

    let { selectedDate } = useSelectedDate()
    const { resultsData, setResultsData } = useResultsData()

    const {
        symbol,
        underlyingPrice,
        expDates,
        callStrikes,
        putStrikes
    } = useTransformData()

    const {optionData} = useOptionData()

    const strikes = putStrikes

    if (expDates?.length) {
        selectedDate = (selectedDate) ? selectedDate : expDates[expDates.length - 1]
        return (
            <div className='bg-dark'>
                {expDates.map((date, i) => {
                    if (date === selectedDate) {
                        return (
                            <React.Fragment key={date[i]}>
                                <div className="head justify-content-center text-white pt-2">
                                    <div className='row justify-content-center text-center'>
                                        <div className='h5'>
                                            {symbol}
                                        </div>
                                        <div className='text-warning h6'>
                                            {`$${parseFloat(underlyingPrice).toFixed(2)}`}
                                        </div>
                                        <div className='row justify-content-center text-center'>
                                            {date.replace(":", ` | `)} Days Until Expiration
                                        </div>
                                    </div>
                                    <div className='row justify-content-center text-center'>
                                        <div className='day-scroll col m-2'> <DateSelectButtons /></div>
                                    </div>
                                    <div className='row justify-content-center bg-dark border-top border-bottom text-center pt-2 pb-2 mb-3 collapsible'>
                                        <StrikeSelections />
                                    </div>
                                </div>

                                <div id="table" className="table-responsive scroll">
                                    <table className="table table-sm table-striped table-dark">
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
                                        <tbody>
                                            {Object.keys(strikes[i])?.map((strike, key) => {
                                                return (
                                                    <tr key={key} className='align-middle'>
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
                                                                    <td className="strike-match text-center text-warning border border-warning border-top-0 border-bottom-0">
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
                            </React.Fragment>
                        )
                    } else { return null }
                })}
            </div>
        )
    } else {
        if(optionData == 'FAILED') {
        return (
            <div className='justify-content-center align-items-center bg-dark text-white'>
                    <div className="col text-center">
                        <h3 className='pt-3'>Sorry!</h3>
                        <p>We didn't find an option chain for {symbol} in selected month.</p>
                    </div>
            </div>
        )
        } else {return null}
    }
}

export default StrikeTable
