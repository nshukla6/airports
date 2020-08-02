import React, { useState } from 'react';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select'


function Airports() {

  const [value, setValue] = useState(null);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAirport, setShowAirport] = useState(false);


  const getAirportsdata = () => {
    setLoading(true);
    setShowAirport(true);
    fetch('airports.json')
      .then(res => res.json())
      .then(data => data.map(d => {
        return {label: `${d.name} - ${d.city}/${d.country} - ${d.code}`, value: d.code}
      }))
      .then(response => setAirports(response))
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }

  const changeHandler = (e) => {
    setValue(e)
  }
  const buttonHandler = () => {
    getAirportsdata();
  }

  return (
    <div className="airport-select">
      <button className="btn" onClick={buttonHandler}>Airports</button>
        { showAirport && <VirtualizedSelect
        options={airports}
        onChange={changeHandler}
        value={value}
        placeholder={loading ? "Loading" : "Select Airport"}
      />}
    </div>
    
    
  );
}
export default Airports;