import React, {useState} from 'react'

const ApiInputsContext = React.createContext()

const ApiInputsProvider = ({ children }) => {

    const [ticker, setTicker] = useState('SPY')
    const [expMonth, setExpMonth] = useState('JAN')
    const [submit, setSubmit] = useState(false)

    return (
        <ApiInputsContext.Provider value={{
            ticker: ticker, 
            setTicker: setTicker, 
            expMonth: expMonth, 
            setExpMonth: setExpMonth,
            submit: submit,
            setSubmit: setSubmit
            }}>{children}</ApiInputsContext.Provider>
    )
}

const useApiInputs = () => {
    const context = React.useContext(ApiInputsContext)
    
    if (context === undefined) {
        throw new Error('useApiInputs must be used within an ApiInputsProvider')
    }
    return context
}

export { ApiInputsProvider, useApiInputs }
