import React from 'react'
import TransformData from '../Data/TransformData'

const Cards = () => {
    const data = TransformData().data

    return (
        <>
            <div className="row">
                <div className="col ml-2 mt-2">
                    <div className="card rounded">
                        <div className="card-header bg-dark text-white text-center">
                            PUT
                        </div>
                        <ul className="list-group list-group-flush scroll">
                            {/* This is where I need to map through data returned from TransformData */}
                            <li className="list-group-item">Strike Data 1</li>
                            <li className="list-group-item">Strike Data 2</li>
                            <li className="list-group-item">Strike Data 3</li>
                            <li className="list-group-item">Strike Data 4</li>

                        </ul>
                    </div>
                </div>

                <div className="col mt-2">
                    <div className="card">
                        <div className="card-header bg-dark text-white text-center">
                            CALL
                        </div>
                        <ul className="list-group list-group-flush scroll">
                            {/* This is where I need to map through data returned from TransformData */}
                            <li className="list-group-item">Strike Data 1</li>
                            <li className="list-group-item">Strike Data 2</li>
                            <li className="list-group-item">Strike Data 3</li>
                            <li className="list-group-item">Strike Data 4</li>
                        </ul>
                    </div>
                </div>

                <div className="col mr-2 mt-2">
                    <div className="card">
                        <div className="card-header bg-dark text-white text-center">
                            RESULTS
                        </div>
                        {/* Returning JSON data for now */}
                        <div className="scroll">
                            <pre>
                                <code>
                                    {JSON.stringify(data, undefined, 2)}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards