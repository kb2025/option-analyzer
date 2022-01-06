import React, {useState, setState, createContext, useContext} from 'react'

const SelectedDateContext = React.createContext()

const SelectedDateProvider = ({ children }) => {

    const [selectedDate, setSelectedDate] = useState([null])

    return (
        <SelectedDateContext.Provider value={{selectedDate: selectedDate, setSelectedDate: setSelectedDate}}>{children}</SelectedDateContext.Provider>
    )
}

const useSelectedDate = () => {
    const context = React.useContext(SelectedDateContext)
    
    if (context === undefined) {
        throw new Error('useSelectedDate must be used within an SelectedDateProvider')
    }
    return context
}

export { SelectedDateProvider, useSelectedDate }
