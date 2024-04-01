
const [Data, setData] = useState([]);

handerGetTopic = async () =>{
    const topicList = await fetch('https://se346-skillexchangebe.onrender.com'+'/api/v1/topic/limit/:limit', {
        method: 'GET',
        redirect: 'follow'
      }).then(responese => responese.json())
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
        console.log('Error:', Error);
        alert('An error occurred. Please try again later.');
      })
}

export default Tag_Data;