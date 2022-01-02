import React from 'react'

const StrikeTables = () => {
    return (
        <>
            <div className="row">
                <div className="col ml-2 mt-2">
                    <div className="card rounded">
                        <div className="card-header">
                            PUT
                        </div>

                        <div className="card-body scroll">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>

                    </div>
                </div>

                <div className="col mt-2">
                    <div className="card">
                    <div className="card-header">
                            CALL
                        </div>

                        <div className="card-body scroll">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>


                    </div>
                </div>

                <div className="col mr-2 mt-2">
                    <div className="card">
                    <div className="card-header">
                        RESULTS
                    </div>

                        <div className="scroll">

                            <pre>
                                <code>
                                    TEST
                                </code>
                            </pre>

                        </div>

                        <div className="card-footer"></div>
                    </div>
                </div>
                </div>
            </>
            )
}

            export default StrikeTables