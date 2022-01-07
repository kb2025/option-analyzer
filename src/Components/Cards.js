import React from 'react'
import Button from './Button'
import useTransformData from '../DataHandlers/TransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'

const Cards = () => {

    const { selectedDate } = useSelectedDate()

    const {
        optionData,
        expDates,
        callStrikes,
        putStrikes
    } = useTransformData()


    if (expDates) {
        return (
            expDates.map((date, i) => {
                if (date == selectedDate) {
                    return (
                        <div id="table" className="table-responsive m-0 p-0">
                            <table className="table table-sm table-striped table-dark m-0 p-0">
                                <thead>
                                    <tr>
                                        <th colSpan="9" className="text-center">
                                            {date.replace(":", ` | Days Until Expiration `)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th colSpan="4" className="text-center bg-danger">
                                            PUT
                                        </th>
                                        <th className="text-center">
                                            CURRENT PRICE
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
                                                    OPEN INTEREST
                                            </td>
                                                <td className="text-center">
                                                    DELTA VALUE
                                            </td>
                                                <td className="text-center">
                                                    MARK VALUE
                                            </td>
                                                <td className="text-center">
                                                    ${parseFloat(putStrike).toFixed(2)}
                                                </td>
                                                <td className="text-center">
                                                    MARK VALUE
                                            </td>
                                                <td className="text-center">
                                                    DELTA
                                            </td>
                                                <td className="text-center">
                                                    OPEN INTEREST
                                            </td>
                                                <td className="text-center">
                                                    <Button variant="success" size={"sm"} margin={'m-1'} >+</Button>
                                                    <Button variant="danger" size={"sm"} margin={'m-1'} >-</Button>
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
            })
        )
    } else {
        return (
            <div>INPUT TICKER</div>
        )
    }
}

export default Cards
