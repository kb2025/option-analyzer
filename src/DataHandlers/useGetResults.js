import { useState, useEffect } from "react";
import { useOptionData } from "../Providers/OptionDataProvider";
import { useResultsData } from "../Providers/ResultsDataProvider";

const useGetResults = () => {
    
    const { resultsData, maxProfit, setMaxProfit } = useResultsData()
    const { optionData } = useOptionData()
    const  {underlyingPrice} = optionData

    const calculateResults = () => {
    /*const maxProfitArr = (resultsData.length > 0) ? resultsData.reduce((previous, current) => previous.CALL[1] > current.CALL[1] ? previous : current) : null*/
    let profitLoss;

    for (let item in resultsData) {
        if (Object.keys(resultsData[item]=='CALL')) {
            profitLoss = Math.max(parseFloat(underlyingPrice-resultsData[item].CALL[0]),0)-resultsData[item].CALL[1]
        } else {
            profitLoss = Math.max(parseFloat(resultsData[item].PUT[0]-underlyingPrice),0)-resultsData[item].PUT[1]
        } 
    }
   
    setMaxProfit(profitLoss)
    }


    useEffect(() => {
        calculateResults()
    }, [resultsData])
}




export default useGetResults
