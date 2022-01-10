import { useOptionData } from "../Providers/OptionDataProvider";

const { useResultsData } = require("../Providers/ResultsDataProvider")

const useGetResults = () => {
    
    const {resultsData} = useResultsData()
    const { optionData } = useOptionData()

    /*const maxProfitArr = (resultsData.length > 0) ? resultsData.reduce((previous, current) => previous.CALL[1] > current.CALL[1] ? previous : current) : null*/
    
    let {underlyingPrice} = optionData
    let profitLoss;

    for (let item in resultsData) {
        if (Object.keys(resultsData[item]=='CALL')) {
            profitLoss = Math.max(parseFloat(underlyingPrice-resultsData[item].CALL[0]),0)-resultsData[item].CALL[1]
        } else {
            profitLoss = Math.max(parseFloat(resultsData[item].PUT[0]-underlyingPrice),0)-resultsData[item].PUT[1]
        } 
    }
   
   return profitLoss


}

export default useGetResults
