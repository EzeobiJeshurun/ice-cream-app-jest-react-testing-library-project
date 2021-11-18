import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from server',async ()=>{
    render(<Options optionType="scoops" />)

    //find images
  const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images

  const altText = scoopImages.map((element)=> element.alt);
  expect(altText).toEqual(['milk scoop', 'carot scoop']);

});

test('displays image for each toppings option from server', async ()=>{
    render(<Options optionType={"toppings"} />)
    const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i});

    expect(toppingsImages).toHaveLength(3);

   //test for correct alt
   const toppingsAlt = toppingsImages.map((item)=> item.alt);
   expect(toppingsAlt).toEqual(["M&Ms topping","Hot fudge topping", "Peanut butter cups topping"]);
})