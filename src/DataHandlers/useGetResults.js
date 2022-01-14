import { useEffect } from "react";
import { useOptionData } from "../Providers/OptionDataProvider";
import { useResultsData } from "../Providers/ResultsDataProvider";


const useGetResults = () => {

    const { resultsData, maxProfit, setMaxProfit, maxLoss, setMaxLoss } = useResultsData()
    const { optionData } = useOptionData()

    const calculateResults = () => {

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
        let maxProfit
        let maxLoss

        /* Make sure there is data to calculate */
        if (strikes && resultsData.length > 0) {

            /*Pull the strikes out of resultsData*/
            for (let item in resultsData) {
                if (Object.keys(resultsData[item]) == 'CALL') {
                    strikes.push(resultsData[item].CALL[0])
                } else if (Object.keys(resultsData[item]) == 'PUT') {
                    strikes.push(resultsData[item].PUT[0])
                }
            }

            /*Sort the strikes from lowest to highest*/
            strikes = strikes.sort()

            /*Find the highest strike and add 1 for infinite checks later on*/
            highestStrike = Math.max(...strikes) + 1


            /*Build arrays of p/l per leg. Also, build p/l leg for 0 strike value and a leg for the highest strike + 1*/

            /*
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


            /* Claculate Max Profit and Max Loss
            - Max Profit is the Highest value in sumLegs
                - if highest strike is greater than second to last array value then Max Profit is infinite
            - Max Loss is the lowest value in sumLegs
                - if highest strike is less than second to last array value then Max Profit is infinite 
            */

            if (sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 1] > sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 2]) {
                setMaxProfit('INFINITE')
            } else {
                setMaxProfit(Math.abs(Math.max(...sumLegs)).toFixed(2))
            }

            if (sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 1] < sumLegsPlusHighestStrike[sumLegsPlusHighestStrike.length - 2]) {
                setMaxLoss('INFINITE')
            } else {
                setMaxLoss(Math.abs(Math.min(...sumLegs)).toFixed(2))
            }
        }
    }

    useEffect(() => {
        calculateResults()
    }, [resultsData])
}

export default useGetResults
