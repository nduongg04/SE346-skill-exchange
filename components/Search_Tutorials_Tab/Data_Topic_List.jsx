import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data =() =>{
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchdata =()=>{
            axios.get('https://se346-skillexchangebe.onrender.com'+'/api/v1/topic/pagination?page=1&limit=6')
            .then(response =>{
                if(response.status == 404) alert('Not found')
            })
            .then(result =>{
                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    throw new Error('Result is empty');
                } else {
                    setData(result);
                }
            })
            .catch(error =>{
                console.error('Error: ', error);
                console.alert('An error occurred. Please try again later.');
            })
        };
        fetchdata();
    }, []);
    return data;
}

export default Data;