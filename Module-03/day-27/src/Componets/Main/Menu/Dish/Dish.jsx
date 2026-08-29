import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
function Dish({ name, price, currency = "Birr", spicy }) {
  const [orders,orderState] = useState(0)
  return (
    <div>
      <h2>{orders}</h2>
      <h3>
        {name} {Boolean(spicy) && <span>🌶️ Spicy</span>}
      </h3>
      <p>Price: {price} {currency}</p>
      <button onClick={()=>orderState(orders+1)}><h2>Add</h2></button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool
};

export default Dish;