import React from 'react'
import { useOptionData } from "../DataHandlers/OptionDataProvider";
import useTransformData from '../DataHandlers/TransformData';

const Cards = () => {

    const { optionData } = useOptionData()
    const { selectedDate, uniqueDates, putStrikes, putMark, putDelta, callStrikes, callMark, callDelta } = useTransformData()

    return (
        <div className="row">
            <div className="col ml-2 mt-2">
            <div className="card-header bg-dark text-white text-center rounded">
                        PUTS
                    </div>
                <div className="card rounded scroll">
                    {uniqueDates.map((date, i) => {
                        if (date.split(":")[1] > 0) {
                            return (
                                <>
                                    <div key={date} className="card-header bg-dark text-white text-center">
                                        {date.replace(":", ` | Days Until Expiration `)}
                                    </div>
                                    <ul className="list-group list-group-flush text-center">
                                        {putStrikes[i]?.map((putStrike) => {
                                            return (
                                                <li key={putStrike} className="list-group-item">${putStrike}</li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )
                        }
                    })
                    }
                </div>
            </div>

            <div className="col ml-2 mt-2">
            <div className="card-header bg-dark text-white text-center rounded">
                        CALLS
                    </div>
                <div className="card rounded scroll">
                    {uniqueDates.map((date, i) => {
                        if (date.split(":")[1] > 0) {
                            return (
                                <>
                                    <div key={date} className="card-header bg-dark text-white text-center">
                                        {date.replace(":", ` | Days Until Expiration `)}
                                    </div>
                                    <ul className="list-group list-group-flush text-center">
                                        {callStrikes[i]?.map((callStrike) => {
                                            return (
                                                <li key={callStrike} className="list-group-item">${callStrike}</li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )
                        }
                    })
                    }
                </div>
            </div>


            <div className="col mr-2 mt-2">
            <div className="card-header bg-dark text-white text-center">
                        RESULTS
                    </div>
                <div className="card rounded scroll">
                    {/* Returning JSON data for now */}
                    <div>
                        <pre>
                            <code>
                                {JSON.stringify(optionData, undefined, 2)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Cards
