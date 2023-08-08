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
      <h1 className="appHeader">The Power of Compounding Small Wins</h1>
      <form className="container">
        <label>
          Portfolio Value: <input step="100000" {...startVal} />{" "}
        </label>
        <label>Goal Value: &nbsp; <input step="100000" {...goalVal} />{" "}
        </label>
        <div>
          % away from goal: <i>{calcPercentAway(startVal.value, goalVal.value)}%</i>
        </div>
        <br />
        <CalcInterestGoal startVal={startVal.value} endVal={goalVal.value} />
      </form>
    </>
  );
}

const CalcInterestGoal = ({startVal, endVal}) => {
  return (
    <table>
        <CalcInterestRow interest="0.5" startVal={startVal} endVal={endVal} />
        <CalcInterestRow interest="1" startVal={startVal} endVal={endVal} />
        <CalcInterestRow interest="2" startVal={startVal} endVal={endVal} />
        <CalcInterestRow interest="5" startVal={startVal} endVal={endVal} />
    </table>
  );
}

// interest in % (not decimal)
const CalcInterestRow = ({interest, startVal, endVal}) => {

  const target = endVal*1.0/startVal
  const weeks = Math.log(target)/Math.log(1 + interest*1.0/100)
  return (<tr>
    <td> <b>{interest}%</b> </td>
    <td> {Math.ceil(weeks)} weeks </td>
  </tr>)
}

const calcPercentAway = (startVal, endVal) => (Math.round((endVal/startVal - 1)*100))

export default App;
