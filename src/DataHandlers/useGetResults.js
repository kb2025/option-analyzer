import { useEffect } from "react";
import { useOptionData } from "../Providers/OptionDataProvider";
import { useResultsData } from "../Providers/ResultsDataProvider";


const useGetResults = () => {

    const { resultsData,
        maxProfit,
        setMaxProfit,
        maxLoss,
        setMaxLoss,
        setStrategy,
        chanceProfit,
        setChanceProfit,
        setExpectancy
    } = useResultsData()

    const { optionData } = useOptionData()

    const {
        underlyingPrice,
        volatility,
    } = optionData

    let daysToExp
    let strikes = []
    let highestStrike = []
    let zeroPl = []
    let firstLegPl = []
    let secondLegPl = []
    let thirdLegPl = []
    let fourthLegPl = []
    let infiniteCheck = []
    let sumLegsPlusHighestStrike = []
    let sumLegs = []
    let breakEven = []

    const calculateResults = () => {

        /* Make sure there is data to calculate */
        if (resultsData.length > 0) {

            /*Pull the strikes out of resultsData*/
            for (let item in resultsData) {
                if (Object.keys(resultsData[item]) == 'CALL') {
                    strikes.push(resultsData[item].CALL[0])
                    daysToExp = resultsData[item].CALL[3]
                } else if (Object.keys(resultsData[item]) == 'PUT') {
                    strikes.push(resultsData[item].PUT[0])
                    daysToExp = resultsData[item].PUT[3]
                }
            }

            /*Sort the strikes from lowest to highest*/
            strikes = strikes.sort()

            /*Find the highest strike and add 1 for infinite checks later on*/
            highestStrike = Math.max(...strikes) + 1

            /*Build arrays of p/l per leg. Also, build p/l leg for 0 strike value and a leg for the highest strike + 1
            Calls:
            - underlying price minus strike price (if the option expires in the money)
            - zero (if it doesn’t)
            - Reverse Sign for Short
            
            Puts:
            - strike price minus underlying price (if the option expires in the money)
            - zero (if it doesn’t)
            - Reverse Sign for Short
            */

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    zeroPl.push((Math.max(0 - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    zeroPl.push(-(Math.max(0 - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    zeroPl.push((Math.max(parseFloat(resultsData[item].PUT[0]) - 0, 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    zeroPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - 0, 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    firstLegPl.push((Math.max(strikes[0] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    firstLegPl.push(-(Math.max(strikes[0] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    firstLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[0], 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    firstLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[0], 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    secondLegPl.push((Math.max(strikes[1] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    secondLegPl.push(-(Math.max(strikes[1] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    secondLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[1], 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    secondLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[1], 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    thirdLegPl.push((Math.max(strikes[2] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    thirdLegPl.push(-(Math.max(strikes[2] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    thirdLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[2], 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    thirdLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[2], 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    fourthLegPl.push((Math.max(strikes[3] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    fourthLegPl.push(-(Math.max(strikes[3] - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    fourthLegPl.push((Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[3], 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    fourthLegPl.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - strikes[3], 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            for (let item in resultsData) {

                if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                    infiniteCheck.push((Math.max(highestStrike - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                    infiniteCheck.push(-(Math.max(highestStrike - parseFloat(resultsData[item].CALL[0]), 0) - parseFloat(resultsData[item].CALL[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                    infiniteCheck.push((Math.max(parseFloat(resultsData[item].PUT[0]) - highestStrike, 0) - parseFloat(resultsData[item].PUT[1])) * 100)

                } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                    infiniteCheck.push(-(Math.max(parseFloat(resultsData[item].PUT[0]) - highestStrike, 0) - parseFloat(resultsData[item].PUT[1])) * 100)
                }
            }

            /*Store sum of p/l legs*/
            sumLegs = [zeroPl.reduce((p, n) => p + n),
            firstLegPl.reduce((p, n) => p + n),
            secondLegPl.reduce((p, n) => p + n),
            thirdLegPl.reduce((p, n) => p + n),
            fourthLegPl.reduce((p, n) => p + n)].filter((item) => (item))

            /*Store sum of p/l legs including next highest strike*/
            sumLegsPlusHighestStrike = [zeroPl.reduce((p, n) => p + n),
            firstLegPl.reduce((p, n) => p + n),
            secondLegPl.reduce((p, n) => p + n),
            thirdLegPl.reduce((p, n) => p + n),
            fourthLegPl.reduce((p, n) => p + n),
            infiniteCheck.reduce((p, n) => p + n)].filter((item) => (item))
        }
    }


    const calculateProfitLoss = () => {
        /* Calculate Max Profit and Max Loss
        - Max Profit is the Highest value in sumLegs
            - if highest strike is greater than second to last array value then Max Profit is infinite
        - Max Loss is the lowest value in sumLegs
            - if highest strike is less than second to last array value then Max Profit is infinite 
        */

        /* Make sure there is data to calculate */
        if (resultsData.length > 0) {

            if (parseFloat(sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 1]) > parseFloat(sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 2])) {
                setMaxProfit('INFINITE')
            } else {
                setMaxProfit('$' + Math.abs(Math.max(...sumLegs)).toFixed(2))
            }

            if (parseFloat(sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 1]) < parseFloat(sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 2])) {
                setMaxLoss('INFINITE')
            } else {
                setMaxLoss('$' + Math.abs(Math.min(...sumLegs)).toFixed(2))
            }
        }
    }

    const calculateBreakEvens = () => {

        /*Check if strategy is only a long/short call/put
        BreakEvens =
            Long Call: Strike + cost
            Short Call: Strike - cost
            Long Put: Strike - cost
            Short Put: Strike + cost
            */

        /* Make sure there is data to calculate */
        if (resultsData.length > 0) {

            if (resultsData.length == 1) {

                if (Object.keys(resultsData[0]) == 'CALL' && resultsData[0].CALL[2] == 'BUY') {
                    breakEven.push(parseFloat(resultsData[0].CALL[0] + parseFloat(resultsData[0].CALL[1])))

                } else if (Object.keys(resultsData[0]) == 'CALL' && resultsData[0].CALL[2] == 'SELL') {
                    breakEven.push(parseFloat(resultsData[0].CALL[0] - parseFloat(resultsData[0].CALL[1])))

                } else if (Object.keys(resultsData[0]) == 'PUT' && resultsData[0].PUT[2] == 'BUY') {
                    breakEven.push(parseFloat(resultsData[0].PUT[0] - parseFloat(resultsData[0].PUT[1])))

                } else if (Object.keys(resultsData[0]) == 'PUT' && resultsData[0].PUT[2] == 'SELL') {
                    breakEven.push(parseFloat(resultsData[0].PUT[0] - parseFloat(resultsData[0].PUT[1])))
                }

            } else {

                /*Find break even points */
                /*Get profit loss values*/
                let pl = [
                    firstLegPl.reduce((p, n) => p + n),
                    secondLegPl.reduce((p, n) => p + n),
                    thirdLegPl.reduce((p, n) => p + n),
                    fourthLegPl.reduce((p, n) => p + n)
                ].filter((item) => (item))

                /*Find the deltas between the strikes and lop off the first non-delta*/
                let deltas = strikes.map((strike, index, strikes) => strike - (strikes[index - 1] || 0))
                deltas.shift()

                /*Loop through strikes and perform formula on each strike - push non-falsy values
                The ratio of the break-even point’s distances from the two strikes (x1 : x2) will be exactly 
                the same as the ratio of distances between zero and the two P/L’s (y1 : y2)
     
                x1 = (x1 + x2) * y1 / (y1 + y2)
                */
                for (let i in strikes) {
                    let j = parseInt(i) + 1
                    let breakEvenPoint = Math.abs(strikes[i] + (deltas[i]) * (0 - pl[i]) / (pl[j] - pl[i]))

                    if (Number(breakEvenPoint) && breakEvenPoint !== Infinity) {
                    breakEven.push(strikes[i] + (breakEvenPoint))
                    } else {
                    breakEven.push(0)
                    
                    }
                }  
            }
        }
    }

    const calculateProbability = () => {
        if (resultsData.length > 0) {

            let calls = resultsData.filter((item)=> {if(Object.keys(item) == 'CALL'){return item}})
            let puts =  resultsData.filter((item)=> {if(Object.keys(item) == 'PUT'){return item}})

            /* Give probs for strategy selection */
            for (let item in resultsData) {

                let j = parseInt(item + 1)

                /* Give probs for long/short call/put*/
                if (resultsData.length === 1) {

                    if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'BUY') {
                        for (let item in breakEven) {
                            if (breakEven[item]) {
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[0] + '%')
                                setStrategy('Long Call')
                            }
                        }

                    } else if (Object.keys(resultsData[item]) == 'CALL' && resultsData[item].CALL[2] == 'SELL') {
                        for (let item in breakEven) {
                            if (breakEven[item]) {
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                setStrategy('Short Call')
                            }
                        }

                    } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'BUY') {
                        for (let item in breakEven) {
                            if (breakEven[item]) {
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                setStrategy('Long Put')
                            }
                        }


                    } else if (Object.keys(resultsData[item]) == 'PUT' && resultsData[item].PUT[2] == 'SELL') {
                        for (let item in breakEven) {
                            if (breakEven[item]) {
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[0] + '%')
                                setStrategy('Short Put')
                            }
                        }
                    } break
                }

                /* Give probs for Bull/Bear Call/Put spreads */
                if (resultsData.length === 2 && calls.length === 2 || puts.length  === 2) {
                    console.log(1)

                    if (Object.keys(resultsData[item]) == 'CALL') {
                        if (
                            resultsData[item].CALL[2] == 'BUY' &&
                            resultsData[j].CALL[2] == 'SELL' &&
                            resultsData[item].CALL[0] < resultsData[j].CALL[0]) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bull Call Spread')
                                }
                            }
                        } else if (
                            resultsData[item].CALL[2] == 'SELL' &&
                            resultsData[j].CALL[2] == 'BUY' &&
                            resultsData[item].CALL[0] > resultsData[j].CALL[0]) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bull Call Spread')
                                }
                            }
                        } else {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bear Call Spread')
                                }
                            }
                        } break
                    }

                    if (Object.keys(resultsData[item]) == 'PUT') {
                        if (resultsData[item].PUT[2] == 'BUY' &&
                            resultsData[j].PUT[2] == 'SELL' &&
                            resultsData[item].PUT[0] < resultsData[j].PUT[0]) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bull Put Spread')
                                }
                            }
                        } else if (
                            resultsData[item].PUT[2] == 'SELL' &&
                            resultsData[j].PUT[2] == 'BUY' &&
                            resultsData[item].PUT[0] > resultsData[j].PUT[0]) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bull Put Spread')
                                }
                            }
                        } else {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Bear Put Spread')
                                }
                            } 
                        } break
                    }
                }


                 /* Give probs for strangles and guts */
                 if (resultsData.length === 2 && calls.length===1 && maxProfit && maxLoss) {

                    /*let allProbs = []
                    let maxP = (Number(maxProfit.replace(/[^0-9.-]+/g,""))/100)
                    let maxL = (Number(maxLoss.replace(/[^0-9.-]+/g,""))/100)

                    if (Object.keys(resultsData[item]) == 'CALL' && calls[item].CALL[0] !== puts[item].PUT[0]) {
                        if (calls[item].CALL[0] < puts[item].PUT[0]) {
                            let be = [calls[item].CALL[0]-maxP, puts[item].PUT[0]+maxP]
                            console.log(be)
                            for (let item in be) {
                                    allProbs.push(getProbs(be[item], daysToExp)[0],getProbs(be[item], daysToExp)[1] )
                            } 
                            setChanceProfit(Math.abs(allProbs[2]-allProbs[0]))
                            setStrategy('Short Guts')
                            
                            console.log(allProbs)
                        } else {
                            for (let item in breakEven) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Short Strangle')
                            }
                        } break
                    } */

                    if (Object.keys(resultsData[item]) == 'CALL') {
                        if (calls[item].CALL[0] == puts[item].PUT[0] && calls[item].CALL[2] == 'SELL') {
                            for (let item in breakEven) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Short Straddle')
                            }
                        } else {
                            for (let item in breakEven) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Straddle')
                            }
                        } break
                    }

                    if (Object.keys(resultsData[item]) == 'PUT' && calls[item].CALL[0] !== puts[item].PUT[0]) {
                            if (puts[item].PUT[0] < calls[item].CALL[0]) {
                            for (let item in breakEven) {
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Short Strangle')
                                }
                        } else {
                            for (let item in breakEven){
                                    setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                    setStrategy('Short Guts')
                            } 
                        } break
                    }      
                    
                    if (Object.keys(resultsData[item]) == 'PUT') {
                        if (puts[item].PUT[0] == calls[item].CALL[0] && puts[item].PUT[2] == 'SELL') {
                        for (let item in breakEven) {
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                setStrategy('Short Straddle')
                            }
                    } else {
                        for (let item in breakEven){
                                setChanceProfit(getProbs(breakEven[item], daysToExp)[1] + '%')
                                setStrategy('Straddle')
                        } 
                    } break
                }  
                }    


                    /* Give probs for Condors/Butterflies */
                    if (resultsData.length === 4) {

                        let strategy = []
                        let allProbs = []

                        /* Here compiling spread types for analysis later*/
                        if (calls && calls.length == 2) {
                            if (
                                calls[item].CALL[2] == 'BUY' &&
                                calls[j].CALL[2] == 'SELL' &&
                                calls[item].CALL[0] < calls[j].CALL[0]) {
                                strategy.push('Bull Call Spread')
                            } else if (
                                calls[item].CALL[2] == 'SELL' &&
                                calls[j].CALL[2] == 'BUY' &&
                                calls[item].CALL[0] > calls[j].CALL[0]) {
                                strategy.push('Bull Call Spread')
                            } else {
                                strategy.push('Bear Call Spread')
                            }
                        }
                        
                        if (puts && puts.length == 2) {
                            if (
                                puts[item].PUT[2] == 'BUY' &&
                                puts[j].PUT[2] == 'SELL' &&
                                puts[item].PUT[0] < puts[j].PUT[0]) {
                                strategy.push('Bull Put Spread')
                            } else if (
                                puts[item].PUT[2] == 'SELL' &&
                                puts[j].PUT[2] == 'BUY' &&
                                puts[item].PUT[0] > puts[j].PUT[0]) {
                                strategy.push('Bull Put Spread')
                            } else {
                                strategy.push('Bear Put Spread')
                            }
                        }

                        /* looking at spread types, identifying butterfly/condor and calculating probs based off their break even point */
                        if (strategy.includes('Bull Put Spread') && strategy.includes('Bear Call Spread')) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    allProbs.push(getProbs(breakEven[item], daysToExp)[0], getProbs(breakEven[item], daysToExp)[1])
                                }
                            }
                                if (Math.abs(allProbs.filter((item) => (item))[1] - allProbs.filter((item) => (item))[2])) {
                                    setChanceProfit(Math.abs(allProbs.filter((item) => (item))[1] - allProbs.filter((item) => (item))[2]) + '%')
                                } else {setChanceProfit(0+'%')}
                            setStrategy('Iron Condor / Butterfly')
                        } else if (strategy.includes('Bear Put Spread') && strategy.includes('Bull Call Spread')) {
                            for (let item in breakEven) {
                                if (breakEven[item]) {
                                    allProbs.push(getProbs(breakEven[item], daysToExp).filter((item) => (item))[0], getProbs(breakEven[item], daysToExp).filter((item) => (item))[1])
                                } {setChanceProfit(0+'%')}
                            }
                            if (Math.abs(allProbs.filter((item) => (item))[1] - allProbs.filter((item) => (item))[2])) {
                            setChanceProfit(100 - (Math.abs(allProbs.filter((item) => (item))[1] - allProbs.filter((item) => (item))[2])) + '%')
                            } else 
                            setStrategy('Inverse Iron Condor / Butterfly')
                        } else {
                            if (breakEven[item]) {
                                setChanceProfit('Cannot Calculate')
                                setStrategy('Unknown')
                            }
                        } break 
                    }
                }
            }
        }
    

    /*Calculate expectancy calc */
    const calculateExpectancy = () => {
        if (resultsData.length > 0) {
            if (maxLoss && chanceProfit) {
                if ((.01 + (1 - parseFloat(chanceProfit) / 100)) / (parseFloat(chanceProfit) / 100) * parseFloat(maxLoss.replace(/[$,]+/g, "")) < maxProfit.replace(/[$,]+/g, "")) {
                    setExpectancy('Positive')
                } else if ((.01 + (1 - parseFloat(chanceProfit) / 100)) / (parseFloat(chanceProfit) / 100) * parseFloat(maxLoss.replace(/[$,]+/g, "")) >= maxProfit.replace(/[$,]+/g, "")) {
                    setExpectancy('Negative')
                } else {
                    setExpectancy('Unknown')
                }
            }
        }
    }

        //Normal distribution function to return probability of underlying price
    //Ending up above or below the break even price of strategy
    //Takes breakeven and expiration dates as parameters
    const getProbs = (breakeven, expiration) => {
        let p = parseFloat(underlyingPrice);
        let q = parseFloat(breakeven);
        let t = parseFloat(expiration) / 365;
        let v = parseFloat(volatility) / 100;

        let vt = v * Math.sqrt(t);
        let lnpq = Math.log(q / p);
        let d1 = lnpq / vt;

        let y =
            Math.floor((1 / (1 + 0.2316419 * Math.abs(d1))) * 100000) / 100000;
        let z =
            Math.floor(0.3989423 * Math.exp(-((d1 * d1) / 2)) * 100000) /
            100000;
        let y5 = 1.330274 * Math.pow(y, 5);
        let y4 = 1.821256 * Math.pow(y, 4);
        let y3 = 1.781478 * Math.pow(y, 3);
        let y2 = 0.356538 * Math.pow(y, 2);
        let y1 = 0.3193815 * y;
        let x = 1 - z * (y5 - y4 + y3 - y2 + y1);
        x = Math.floor(x * 100000) / 100000;

        if (d1 < 0) {
            x = 1 - x;
        }

        let pabove = Math.floor(x * 1000) / 10;
        let pbelow = Math.floor((1 - x) * 1000) / 10;

        //return probabilities for underlying price ending up above or below breakeven
        return [pbelow, pabove];
    }

    useEffect(() => {
        calculateResults()
        calculateProfitLoss()
        calculateBreakEvens()
        calculateProbability()
        calculateExpectancy()
    })
}

export default useGetResults
