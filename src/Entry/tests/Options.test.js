import { render, screen } from '@testing-library/react';
import { OrderDetailsProvider} from "../../store/OrderDetails"

import Options from '../Options';

test('displays image for each scoop option from server',async ()=>{
    render(<Options optionType="scoops" />,{wrapper: OrderDetailsProvider})

    //find images
  const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images

  const altText = scoopImages.map((element)=> element.alt);
  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);

});

test('displays image for each toppings option from server', async ()=>{
    render(<Options optionType={"toppings"} />, {wrapper: OrderDetailsProvider})
    const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i});

    expect(toppingsImages).toHaveLength(3);

   //test for correct alt
   const toppingsAlt = toppingsImages.map((item)=> item.alt);
   expect(toppingsAlt).toEqual(["Cherries topping","M&Ms topping","Hot fudge topping"]);
})