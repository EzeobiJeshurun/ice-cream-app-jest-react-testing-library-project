import React, { useEffect , useState} from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from '../components/ToppingOption';
import AlertBanner from '../components/UI/AlertBanner/AlertBanner';

function Options({optionType}) {
    const [serverResponse, setServerResponse] =useState([])
    const [error,setError] = useState(false);
    useEffect(()=>{
      axios.get(`http://localhost:3030/${optionType}`).then((response)=> setServerResponse(response.data))
      .catch((error)=>{
        //handle error
        setError(true);
      })
    },[optionType]);

    if(error){
        return (<AlertBanner />)
    }

    const ComponentItem = optionType === 'scoops'? ScoopOption : ToppingOption;
    const Content = serverResponse.map((item)=> (<ComponentItem key={item.name} name={item.name} imagePath={item.imagePath}/>))

    return (
        <Row>
            {serverResponse.length> 0?  Content : null}
        </Row>
    )
}

export default Options;
