import React, {useState, setState, createContext, useContext} from 'react'

const ResultsDataContext = React.createContext()

const ResultsDataProvider = ({ children }) => {

    const [resultsData, setResultsData] = useState([])
    const [maxProfit, setMaxProfit] = useState()
    const [maxLoss, setMaxLoss] = useState()
    const [strategy, setStrategy] = useState()
    const [chanceProfit, setChanceProfit] = useState()
    const [expectancy, setExpectancy] = useState()

    return (
        <ResultsDataContext.Provider value={{
            resultsData: resultsData, 
            setResultsData: setResultsData, 
            maxProfit: maxProfit, 
            setMaxProfit: setMaxProfit, 
            maxLoss: maxLoss, 
            setMaxLoss: setMaxLoss,
            strategy: strategy,
            setStrategy: setStrategy,
            chanceProfit: chanceProfit,
            setChanceProfit: setChanceProfit,
            expectancy: expectancy,
            setExpectancy: setExpectancy
        }}>{children}</ResultsDataContext.Provider>
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