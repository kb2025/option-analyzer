import { useState, useEffect } from "react";
import { useOptionData } from "../Providers/OptionDataProvider";
import { useResultsData } from "../Providers/ResultsDataProvider";


const useGetResults = () => {
    
    const { resultsData, setResultsData, maxProfit, setMaxProfit, maxLoss, setMaxLoss } = useResultsData()
    const { optionData } = useOptionData()
    const { underlyingPrice } = optionData

    const calculateResults = () => {
    /*const maxProfitArr = (resultsData.length > 0) ? resultsData.reduce((previous, current) => previous.CALL[1] > current.CALL[1] ? previous : current) : null*/
    let strikes = []
    let highestStrike=[]
    let zeroPl=[]
    let firstLegPl=[]
    let secondLegPl=[]
    let thirdLegPl=[]
    let fourthLegPl=[]
    let infiniteCheck=[]
    let totals = []
    let maxProfit
    let maxLoss

    if (strikes && resultsData.length > 0) {

    for (let item in resultsData) {
        if (Object.keys(resultsData[item])=='CALL') {
            strikes.push(resultsData[item].CALL[0])
        } else if (Object.keys(resultsData[item])=='PUT'){
            strikes.push(resultsData[item].PUT[0])
        }
    }

    strikes = strikes.sort()

    highestStrike = Math.max(...strikes)+1

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            zeroPl.push((Math.max(0-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            zeroPl.push(-(Math.max(0-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            zeroPl.push((Math.max(parseFloat(resultsData[item].PUT[0])-0,0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            zeroPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-0,0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            firstLegPl.push((Math.max(strikes[0]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            firstLegPl.push(-(Math.max(strikes[0]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            firstLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0])-strikes[0],0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            firstLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-strikes[0],0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            secondLegPl.push((Math.max(strikes[1]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            secondLegPl.push(-(Math.max(strikes[1]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            secondLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0])-strikes[1],0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            secondLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-strikes[1],0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            thirdLegPl.push((Math.max(strikes[2]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            thirdLegPl.push(-(Math.max(strikes[2]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            thirdLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0])-strikes[2],0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            thirdLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-strikes[2],0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            fourthLegPl.push((Math.max(strikes[3]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            fourthLegPl.push(-(Math.max(strikes[3]-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            fourthLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0])-strikes[3],0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            fourthLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-strikes[3],0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    for (let item in resultsData) {
        
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            infiniteCheck.push((Math.max(highestStrike-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            infiniteCheck.push(-(Math.max(highestStrike-parseFloat(resultsData[item].CALL[0]),0)-parseFloat(resultsData[item].CALL[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='BUY'){
            infiniteCheck.push((Math.max(parseFloat(resultsData[item].PUT[0])-highestStrike,0)-parseFloat(resultsData[item].PUT[1]))*100)

        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]=='SELL'){
            infiniteCheck.push(-(Math.max(parseFloat(resultsData[item].PUT[0])-highestStrike,0)-parseFloat(resultsData[item].PUT[1]))*100)
        }    
    }

    }


}



    useEffect(() => {
        calculateResults()
    }, [resultsData])
}





export default useGetResults
