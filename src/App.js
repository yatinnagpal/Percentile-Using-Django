import './App.css';

import axios from 'axios';
import { useState } from 'react';


function App() {
  const [data,setData]=useState('');
  const [percentile,setPercentile]=useState('');
  const [output,setOutput]=useState('');
  const [checked,setChecked]=useState(true);
  const [table,setTable]=useState([]);
  const percentileTable=[];
  const handleChange = () => { 
    setChecked(!checked); 
  }; 
  for (const [i, val] of table.entries()) {
    percentileTable.push(<tr key={i}>
      <td>{i*5}th percentile: </td>
      <td>{val}</td>
    </tr>);
  }
 return (
    <div className='percentile'>
      <div className='content'>
      <h1 className='header'> Percentile Calculator </h1>
      <div className='element-container'>
      <h4 className='elements'> Enter the elements</h4>
      <textarea className='input' type='textarea' onChange={event=>{setData(event.target.value)}} value={data}/>
      </div>
      <div className='percent-container'>
      <h4 className='percent'>Enter the Percentile value</h4>
      <input className='textbox' type='text' onChange={event=>setPercentile(event.target.value)} value={percentile}/>
      </div>
      <div className='button'>
      <button className='calculate' onClick={calculatePercentile}>Calculate</button>
      <button className='clear' onClick={ClearData}>Clear</button>
      </div>
      <div className='table'>
      <input type='checkbox' className='table' onChange={handleChange} onClick={createTable}/> 
      <label className='label'>Create a table</label>
      </div>
      <div className='outer-table' id='table1'>
      <table border='1'>
        <tbody>{percentileTable}</tbody>
     </table>
     </div>
       <h2>{output}</h2>

      </div>

    </div>
  );

  async function calculatePercentile(){
  try{
  const response=await axios.post(`http://127.0.0.1:8000/`, {data,percentile})
  console.log(response.data);
  setOutput(response.data.ans);
  setTable(response.data.finalresult)
  
  }
  catch(err){
    console.log(err);
  }
}
function ClearData()
{
  setData('');
  setPercentile('');
  setOutput('');
}

function createTable()
{
  if(checked)
  document.getElementById('table1').style.display = '';
  else
  document.getElementById('table1').style.display = 'none';

}
}

export default App;
