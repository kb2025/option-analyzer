![Options Analyzer Logo: Arrow in Bullseye](https://github.com/NickForneris/option-analyzer/blob/main/public/OptionsAnalyzerSM.png)

# Option Analyzer

Utilizes the TD Ameritrade API to retrieve option chains for any stock/ETF and allows for analysis of option strategies including single long and short call/puts, spreads, condors/butterflies, straddles, strangles, guts, etc.

## [Hosted Example](https://nickforneris.github.io/option-analyzer/)

## How To Use
1. Click/Touch the Select Ticker and Results Button
2. Select Ticker and Expiration Month
3. Back on the Home Page, Select Expiration Day 
4. Select Up to Four Legs of Strategy Utilizing the Buy/Sell Buttons 
   - (Deselect Options by Clicking/Touching Icons Under Selected Strikes Header)
6. Once Strategy is Chosen, Click/Touch Ticker and Results Button to View Analysis

## Key Formulas
### Black-Scholes Based Probability Calculation

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
    
### Expectancy Calculations
        Expectancy         = (Probability of Win * Average Win) - (Probability of Loss * Average Loss)
        Necessary Profit   = (.01 + Probability of Loss) / Probability of Win
        Early Profit Level = (Necessary Profit / Max Profit) * 100



