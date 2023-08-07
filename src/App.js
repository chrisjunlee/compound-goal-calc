import { useState } from 'react';
import './App.css';

// custom hook
const useField = (type, initVal='') => {
  const [value, setValue ] = useState(initVal)

  const onChange = (event) => {
    console.log(Intl.NumberFormat("en-US").format(value))
    setValue(event.target.value)
  }

  return {type, value, onChange}
}

function App() {
  return <CompoundView />
}

const CompoundView = () => {
  const startVal = useField("number", "700000");
  const goalVal = useField("number", "1000000");
  
  return (
    <>
    <h2>The Power of Compounding Small Wins</h2>
    <form>
      <label> Current Portfolio Value: <input step='100000' {...startVal}/> </label> 
      <br/>
      <label> Goal Value: <input step='100000' {...goalVal}/> </label>
      <div>% away from goal: {calcPercentAway(startVal.value, goalVal.value)}%</div>
      <br/> 
      <CalcInterestGoal interest="0.5" startVal={startVal.value} endVal={goalVal.value}/>
      <CalcInterestGoal interest="1" startVal={startVal.value} endVal={goalVal.value}/>
      <CalcInterestGoal interest="2" startVal={startVal.value} endVal={goalVal.value}/>
      <CalcInterestGoal interest="5" startVal={startVal.value} endVal={goalVal.value}/>
    </form>
    </>
  )
}

// interest in % (not decimal)
const CalcInterestGoal = ({interest, startVal, endVal}) => {
  const target = endVal*1.0/startVal
  const weeks = Math.log(target)/Math.log(1 + interest*1.0/100)
  console.log('target', target)
  return (<div>
    <b>{interest}%:</b> {Math.ceil(weeks)} weeks
  </div>)
}

const calcPercentAway = (startVal, endVal) => (Math.round((endVal/startVal - 1)*100))

export default App;
