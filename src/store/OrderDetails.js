import { createContext, useContext,useEffect, useState, useMemo} from 'react';
import { pricePerItem } from './constants';
const OrderDetails = createContext();


//format currency
const formatCurrency=(amount)=>{
    return Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}
//create custom hook to check whether we'te inside a provider

export const UserOrderDetails=()=>{
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        )
    }
    return context;

}

export const OrderDetailsProvider=(props)=>{
    const [optionCounts,setOptionCount] = useState({
        scoops: new Map(),
        toppings: new Map(),
    })
    const zeroCurrency = formatCurrency(0)
    const [totals,setTotal] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    })
    
    const calculateSubtotal=(orderType, optionCounts)=>{
     let optionCount = 0;
     for(const count of optionCounts[orderType]){
         optionCount += count;
     }

     return optionCount * pricePerItem[orderType]
    }

    useEffect(()=>{
      const scoopsSubtotal = calculateSubtotal("scoops",optionCounts)
      const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
      const grandTotal = scoopsSubtotal + toppingsSubtotal;
      setTotal({
          scoops: formatCurrency(scoopsSubtotal),
          toppings: formatCurrency(toppingsSubtotal),
          grandTotal: formatCurrency(grandTotal),
      })
    },[optionCounts])
    const value = useMemo(()=>{
        const updateItemCount=(itemName,newItemCount, optionType)=>{
            const newOptionCounts = {...optionCounts};

            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCount(newOptionCounts);
        }
        //getter: object containing option count for scoops and toppings, subtotals and totals
        //setter: updateOptionCount
        return [{...optionCounts, totals}, updateItemCount]
    },[optionCounts,totals]);

    return <OrderDetails.Provider value={value} {...props} />
}


