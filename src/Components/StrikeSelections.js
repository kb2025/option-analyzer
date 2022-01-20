import { useResultsData } from "../Providers/ResultsDataProvider"

const StrikeSelections = () => {
    const { resultsData, setResultsData, strategy } = useResultsData()

    const handleClick = (id) => {
        setResultsData(resultsData.filter((_, index) => index !== parseInt(id)))
    }

    if (resultsData.length > 0) {
        return (
            <>
                <div className="row justify-content border-bottom text-center pb-1 mb-2">
                <div className='col'>
                STRIKE&nbsp; 
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height='30' fill="currentColor" class="bi bi-piggy-bank-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199zm-8.999-.65A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 1 0 .286-.958A7.601 7.601 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962zM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
                </svg>
                &nbsp;BANK
                <div>{strategy}</div>
                </div>
                </div>
                
        {/* eslint eqeqeq: 0 */}
                {resultsData.map((item) => {
                    if (Object.keys(item) == 'CALL') {
                        if (item.CALL[2] == 'BUY') {
                            return (
                                <div key={resultsData.indexOf(item)} className='col-auto'>
                                    <button
                                        className='btn btn-sm btn-success m-1 bi bi-caret-up-square-fill'
                                        id={resultsData.indexOf(item)}
                                        value={[item.CALL[0], item.CALL[1]]}
                                        onClick={(event) => handleClick(event.target.id)}
                                    >
                                        &nbsp;${item.CALL[0]}
                                    </button>
                                </div>
                            )
                        } else if (item.CALL[2] == 'SELL') {
                            return (
                                <div key={resultsData.indexOf(item)} className='col-auto'>
                                    <button
                                        className='btn btn-sm btn-success m-1 bi bi-caret-down-square-fill'
                                        id={resultsData.indexOf(item)}
                                        value={[item.CALL[0], item.CALL[1]]}
                                        onClick={(event) => handleClick(event.target.id)}
                                    >
                                     &nbsp;${item.CALL[0]}
                                    </button>
                                </div>
                            )
                        }
                    } else if (Object.keys(item) == 'PUT') {
                        if (item.PUT[2] == 'BUY') {
                            return (
                                <div key={resultsData.indexOf(item)} className='col-auto'>
                                    <button
                                        className='btn btn-sm btn-danger m-1 bi bi-caret-up-square-fill'
                                        id={resultsData.indexOf(item)}
                                        value={[item.PUT[0], item.PUT[1]]}
                                        onClick={(event) => handleClick(event.target.id)}>
                                        &nbsp;${item.PUT[0]}
                                    </button>
                                </div>
                            )
                        } else if (item.PUT[2] == 'SELL') {
                            return (
                                <div key={resultsData.indexOf(item)} className='col-auto'>
                                    <button
                                        className='btn btn-sm btn-danger m-1 bi bi-caret-down-square-fill'
                                        id={resultsData.indexOf(item)}
                                        value={[item.PUT[0], item.PUT[1]]}
                                        onClick={(event) => handleClick(event.target.id)}>
                                       &nbsp;${item.PUT[0]}
                                    </button>
                                </div>
                            )
                        }
                    } else {return null}
                })
                } </>)
    } else {return null}
}


export default StrikeSelections
