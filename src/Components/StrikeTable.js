import React from 'react'
import Button from './Button'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'

const StrikeTable = () => {

    const { selectedDate } = useSelectedDate()

    const {
        optionData,
        underlyingPrice,
        expDates,
        callStrikes,
        putStrikes
    } = useTransformData()


    if (expDates) {
        return (
            <div className='card scroll'>
            {expDates.map((date, i) => {
                if (date == selectedDate && (date.split(":")[1] >= 0)) {
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
                                    {Object.keys(putStrikes[i])?.map((putStrike) => {
                                        return (
                                            <tr key={putStrike}>
                                                <td className="text-center">
                                                    <Button variant="success" size={"sm"} margin={'m-1'} >+</Button>
                                                    <Button variant="danger" size={"sm"} margin={'m-1'} >-</Button>
                                                </td>
                                                <td className="text-center">
                                                {putStrikes[i][putStrike][0].openInterest}
                                            </td>
                                                <td className="text-center">
                                                {putStrikes[i][putStrike][0].delta.toFixed(2)}
                                            </td>
                                                <td className="text-center">
                                                    ${putStrikes[i][putStrike][0].mark.toFixed(2)}
                                            </td>
                                                <td className="text-center">
                                                    ${parseFloat(putStrike).toFixed(2)}
                                                </td>
                                                <td className="text-center">
                                                ${callStrikes[i][putStrike][0].mark.toFixed(2)}
                                            </td>
                                                <td className="text-center">
                                                {callStrikes[i][putStrike][0].delta.toFixed(2)}
                                            </td>
                                                <td className="text-center">
                                                {callStrikes[i][putStrike][0].openInterest.toFixed(2)}
                                            </td>
                                                <td className="text-center">
                                                    <Button variant="success" size={"md"} margin={'m-1'} >+</Button>
                                                    <Button variant="danger" size={"md"} margin={'m-1'} >-</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div></>
                    )
                }
            })}
     </div>

        )
    } else { return null

    }
}

export default StrikeTable
