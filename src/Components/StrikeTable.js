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
                            <div key={date} id="table" className="table-responsive scroll">
                                <table className="table table-sm table-striped table-dark">
                                    <thead className='header'>
                                        <tr>
                                            <th colSpan="5" className="text-center p-0">
                                                {ticker}: EXPIRATION DAYS <br></br>
                                                <DateSelectButtons />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan="5" className="text-center p-0">
                                                <div className='row justify-content-center p-0'><StrikeSelections /></div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan="5" className="text-center p-0">
                                                {date.replace(":", ` | Days Until Expiration: `)}<br></br>
                                                Underlying Price: ${parseFloat(underlyingPrice).toFixed(2)}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan="2" className="text-center bg-danger p-0">PUT</th>
                                            <th colSpan='1'></th>
                                            <th colSpan="2" className="text-center bg-success p-0">CALL</th>
                                        </tr>
                                        <tr>
                                            <th className="text-center">+/-</th>
                                            <th className="text-center">MARK</th>
                                            <th className="text-center">STRIKE</th>
                                            <th className="text-center">MARK</th>
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
                                                                        parseFloat(putStrikes[i][strike][0].mark.toFixed(2)),
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
                                                        ${putStrikes[i][strike][0].mark}
                                                    </td>
                                                    {(() => {
                                                        if (parseFloat(strike).toFixed(2) <= underlyingPrice+.25 && parseFloat(strike).toFixed(2) >= underlyingPrice-.25)  {
                                                            return (
                                                            <td className="text-center text-warning">
                                                                ${parseFloat(strike).toFixed(2)}
                                                            </td>
                                                            )
                                                        } else {
                                                            return (
                                                            <td className="text-center">
                                                                ${parseFloat(strike).toFixed(2)}
                                                            </td>
                                                            )
                                                        }
                                                    })()}
                                                    <td className="text-center">
                                                        ${callStrikes[i][strike][0].mark}
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            className='btn btn-success btn-sm m-1'
                                                            value={'CALL'}
                                                            onClick={() => (resultsData.length < 4) ? setResultsData([...resultsData, {
                                                                CALL:
                                                                    [
                                                                        parseFloat(strike),
                                                                        parseFloat(callStrikes[i][strike][0].mark.toFixed(2)),
                                                                        'BUY'
                                                                    ]
                                                            }]) : null}>
                                                            BUY
                                                        </button>
                                                        <button
                                                            className='btn btn-danger btn-sm m-1'
                                                            value={'CALL'}
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
