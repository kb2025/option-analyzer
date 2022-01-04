import React, {useState, createContext, useContext} from 'react'

const OptionDataContext = React.createContext()

const OptionDataProvider = ({ children }) => {

    const [optionData, setOptionData] = useState([null])

    return (
        <OptionDataContext.Provider value={[optionData, setOptionData]}>{children}</OptionDataContext.Provider>
    )
}

const useOptionData = () => {
    const context = React.useContext(OptionDataContext)
    if (context === undefined) {
        throw new Error('useOptionData must be used within an OptionDataProvider')
    }
    return context
}

export { OptionDataProvider, useOptionData }
