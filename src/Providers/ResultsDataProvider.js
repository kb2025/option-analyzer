import React, {useState, setState, createContext, useContext} from 'react'

const ResultsDataContext = React.createContext()

const ResultsDataProvider = ({ children }) => {

    const [resultsData, setResultsData] = useState([])

    return (
        <ResultsDataContext.Provider value={{resultsData: resultsData, setResultsData: setResultsData}}>{children}</ResultsDataContext.Provider>
    )
}

const useResultsData = () => {
    const context = React.useContext(ResultsDataContext)
    
    if (context === undefined) {
        throw new Error('useResultsData must be used within an ResultsDataProvider')
    }
    return context
}

export { ResultsDataProvider, useResultsData }