import React, { useEffect , useState} from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from '../components/ToppingOption';
import AlertBanner from '../components/UI/AlertBanner/AlertBanner';
import { pricePerItem} from "../store/constants";
import { UserOrderDetails } from "../store/OrderDetails"

function Options({optionType}) {
    const [serverResponse, setServerResponse] =useState([])
    const [error,setError] = useState(false);
    const [orderDetails, updateItemCount] = UserOrderDetails();
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
   const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

    const Content = serverResponse.map((item)=> (
    <ComponentItem 
    key={item.name} 
    name={item.name} 
    imagePath={item.imagePath}
    updateItemCount={(itemName, newItemCount)=>{
      updateItemCount(itemName, newItemCount, optionType)
    }}
    />))

    return (
      <>
        <h2>{title}</h2>
        <p>{pricePerItem[optionType]}</p>
        <p>{title} total: {orderDetails.totals[optionType]}</p>
        <Row>
            {serverResponse.length> 0?  Content : null}
        </Row>
      </>  
    )
}

export default Options;
