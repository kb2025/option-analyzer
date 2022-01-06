import React from 'react'
import { CallBuyButton, CallSellButton }from "./CallButtons";
import { PutBuyButton, PutSellButton } from "./PutButtons";
import useTransformData from '../DataHandlers/TransformData';
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
        <div className='mr-3 ml-3'>
        <div className="row">
            <div className="col ml-2 mt-2">
            <div className="card-header bg-dark text-white text-center rounded">
                        PUTS
                    </div>
                <div className="card rounded scroll">
                    {expDates.map((date, i) => {
                        if ((date.split(":")[1] > 0) && (date == selectedDate)) {
                            return (
                                <>
                                    <div key={date} className="card-header bg-dark text-white text-center w-100">
                                        {date.replace(":", ` | Days Until Expiration `)}
                                    </div>
                                    <ul className="list-group list-group-flush text-center">
                                        {Object.keys(putStrikes[i])?.map((putStrike) => {
                                            return ( 
                                                <li key={putStrike} className="list-group-item">
                                                    <PutBuyButton/>
                                                    ${parseFloat(putStrike).toFixed(2)}
                                                    <PutSellButton/>
                                                    </li>
                                            )
                                        })
                                    }
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
                    {expDates.map((date, i) => {
                        if ((date.split(":")[1] > 0) && (date == selectedDate)) {
                            return (
                                <>
                                    <div key={date} className="card-header bg-dark text-white text-center w-100">
                                        {date.replace(":", ` | Days Until Expiration `)}
                                    </div>
                                    <ul className="list-group list-group-flush text-center">
                                        {Object.keys(callStrikes[i])?.map((callStrike) => {
                                            return (
                                                    <li key={callStrike} className="list-group-item">
                                                    <CallSellButton/>
                                                    ${parseFloat(callStrike).toFixed(2)}
                                                    <CallBuyButton/>
                                                    </li>
                                            )
                                        })
                                        }
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
                    {/* Returning JSON data for now*/ }
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
        </div>
    )
} else {return null}
}

export default Cards
