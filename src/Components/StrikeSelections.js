import useGetResults from "../DataHandlers/useGetResults"
import { useResultsData } from "../Providers/ResultsDataProvider"

const StrikeSelections = () => {
    const { resultsData, setResultsData, strategy } = useResultsData()

    const handleClick = (id) => {
        setResultsData(resultsData.filter((_, index) => index !== parseInt(id)))
    }

    useGetResults()

    if (resultsData.length > 0) {
        return (
            <>
                <div className="row justify-content  text-center pb-1 mb-2">
                <div className='col h5'>
                STRIKE&nbsp; 
                <i className="h5 bi bi-piggy-bank-fill"/>
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
