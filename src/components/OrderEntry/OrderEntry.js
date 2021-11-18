import React from 'react'
import Options  from '../../Entry/Options'
function OrderEntry() {
    return (
        <div>
            <Options optionType={"scoops"}/>
            <Options optionType={"toppings"} />
        </div>
    )
}

export default OrderEntry;
