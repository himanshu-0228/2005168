import React, { useState, useEffect } from 'react';

const NumberManagement = () => {
  const [myUrls, setMyUrls] = useState('');
  const [result, setResult] = useState([]);
  
  useEffect(()=>{
    console.log("Final array is:" ,result);
  },[result])
  
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  };
  
   const fetchEndpoints = () => {
    const urls = myUrls.split(',').map((url) => url.trim());

    if (urls.length === 0) {
      alert('Please enter at least one URL.');
      return;
    }
    Promise.all(urls.map(fetchData))
      .then((dataArray) => {
        console.log("dataArray:", dataArray)
        setResult((prevResult) => prevResult.concat(...dataArray));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  

  return (
    <div>
     <h1>Number Management Service</h1>
      <div>
        <input
          type="text"
          value={myUrls}
          onChange={(prop) => {
            setMyUrls(prop.target.value);
         }}
          placeholder="Enter URLs separated by commas"
          style={{
            marginRight:"20px",
            marginLeft:"20px",  
            width:"70rem",
            height:"1.5rem"
          }}
        />
        <button onClick={fetchEndpoints}
          style={{
            marginRight:"20px",
            marginLeft:"20px",  
            height:"1.5rem",
            cursor:"pointer"
          }}
        >
        Get Numbers</button>
      </div>
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NumberManagement;


