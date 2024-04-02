
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TagData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const fetchData = () => {
      axios.get('https://se346-skillexchangebe.onrender.com'+'/api/v1/topic/limit/6')
        .then(response => {
          if(response.status == 404) alert('Not found')
        })
        .then(result => {
          if (Object.keys(result).length === 0 && result.constructor === Object) {
            throw new Error('Result is empty');
        }
        else{
            const newData = {title: result}
            setData(prevData => [...prevData, newData])
        }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
        });
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
};

export default TagData;
