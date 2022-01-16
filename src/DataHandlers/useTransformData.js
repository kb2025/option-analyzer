import { useOptionData } from "../Providers/OptionDataProvider";

const useTransformData = () => {

  const { optionData } = useOptionData()
  const { 
    underlyingPrice,
    putExpDateMap,
    callExpDateMap,
    markChange,
    markPercentChange
  } = optionData

  const expDates = (putExpDateMap) ? Object.keys(putExpDateMap) : null
  const putStrikes = (putExpDateMap) ? Object.values(putExpDateMap) : null
  const callStrikes = (callExpDateMap) ? Object.values(callExpDateMap) : null

  return { optionData, expDates, putStrikes, callStrikes, underlyingPrice, markChange, markPercentChange }
}

export default useTransformData
