import { useOptionData } from "../DataHandlers/OptionDataProvider";

const useTransformData = () => {

    const [ optionData ] = useOptionData()
    const putMap = optionData.putExpDateMap
    const callMap = optionData.callExpDateMap

    const currentPrice = optionData.underlyingPrice

    const dates = []
    const daysToExpire = []
    
    const putStrikes = [];
    const putMark = [];
    const putDelta = [];

    const callStrikes = [];
    const callMark = [];
    const callDelta = [];

//get the expiration dates and put strikes
for (let date in putMap) {
    dates.push(date);
    daysToExpire.push(date.split(":")[1]);
    let expDate = putMap[date];
    putStrikes.push(Object.keys(putMap[date]));

    //get various strike info i.e. bid, ask, mark
    for (let strike in expDate) {
      let info = expDate[strike];
      putMark.push(info[0].mark);
      putDelta.push(info[0].delta);
    }
  }

  //get the expiration dates and call strikes
  for (let date in callMap) {
    dates.push(date);
    let expDate = callMap[date];
    callStrikes.push(Object.keys(callMap[date]));

    //get various strike info i.e. bid, ask, mark
    for (let strike in expDate) {
      let info = expDate[strike];
      callMark.push(info[0].mark);
      callDelta.push(info[0].delta);
    }
  }

    return { currentPrice, dates, daysToExpire, putStrikes, putMark, putDelta, callStrikes, callMark, callDelta  }
}

export default useTransformData
