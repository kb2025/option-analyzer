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

    highestStrike = Math.max(...strikes)+1

    for (let item in resultsData) {
        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            zeroPl.push(Math.max(parseFloat(0-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            zeroPl.push(Math.max(parseFloat(0-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            zeroPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-0),0)+(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            zeroPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-0),0)+(resultsData[item].PUT[1]*100))
        }

        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            firstLegPl.push(Math.max(parseFloat(strikes[0]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            firstLegPl.push(Math.max(parseFloat(strikes[0]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            firstLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[0]),0)+(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            firstLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[0]),0)+(resultsData[item].PUT[1]*100))
        }

        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            secondLegPl.push(Math.max(parseFloat(strikes[1]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            secondLegPl.push(Math.max(parseFloat(strikes[1]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            secondLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[1]),0)+(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            secondLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[1]),0)+(resultsData[item].PUT[1]*100))
        }

        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            thirdLegPl.push(Math.max(parseFloat(strikes[2]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            thirdLegPl.push(Math.max(parseFloat(strikes[2]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            thirdLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[2]),0)+(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            thirdLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[2]),0)+(resultsData[item].PUT[1]*100))
        }

        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            fourthLegPl.push(Math.max(parseFloat(strikes[3]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            fourthLegPl.push(Math.max(parseFloat(strikes[3]-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            fourthLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[3]),0)+(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            fourthLegPl.push(Math.max(parseFloat((resultsData[item].PUT[0])-strikes[3]),0)+(resultsData[item].PUT[1]*100))
        }

        if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='BUY') {
            infiniteCheck.push(Math.max(parseFloat(highestStrike-(resultsData[item].CALL[0])),0)-(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='CALL' && resultsData[item].CALL[2]=='SELL') {
            infiniteCheck.push(Math.max(parseFloat(highestStrike-(resultsData[item].CALL[0])),0)+(resultsData[item].CALL[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='BUY'){
            infiniteCheck.push(Math.max(parseFloat((resultsData[item].PUT[0])-highestStrike),0)-(resultsData[item].PUT[1]*100))
        } else if (Object.keys(resultsData[item])=='PUT' && resultsData[item].PUT[2]==='SELL'){
            infiniteCheck.push(Math.max(parseFloat((resultsData[item].PUT[0])-highestStrike),0)+(resultsData[item].PUT[1]*100))
        }

        totals.push(zeroPl.reduce((p,c)=>p+c),firstLegPl.reduce((p,c)=>p+c),secondLegPl.reduce((p,c)=>p+c),thirdLegPl.reduce((p,c)=>p+c),fourthLegPl.reduce((p,c)=>p+c),infiniteCheck.reduce((p,c)=>p+c))
        totals = totals.filter((item) => item == Number(item))
        maxProfit=Math.max(...totals)
        maxLoss=Math.min(...totals)
        setMaxProfit(maxProfit)
        setMaxLoss(maxLoss)
    }

    console.log('Strikes:',strikes)
    console.log('HighestStrike:',highestStrike)
    console.log('zero PL:', zeroPl.reduce((p,c)=>p+c))
    console.log('first leg:', firstLegPl.reduce((p,c)=>p+c))
    console.log('second leg:',secondLegPl.reduce((p,c)=>p+c))
    console.log('third leg:',thirdLegPl.reduce((p,c)=>p+c))
    console.log('fourth leg:',fourthLegPl.reduce((p,c)=>p+c))
    console.log('infiniteCheck:', infiniteCheck.reduce((p,c)=>p+c))
console.log(totals)
    console.log(maxProfit)
    console.log(maxLoss)
}    
    }


    useEffect(() => {
        calculateResults()
    }, [resultsData])
}




export default useGetResults
