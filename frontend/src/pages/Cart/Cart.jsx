import React, { useContext, useEffect, useState } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../../Admin/src/assets/assets';
import { toast } from 'react-toastify';
// import FoodItem from '../../components/FoodItem/FoodItem';

const Cart = () => {
  const { cartItems, food_list,loading,  removeFromCart, gettotalCartAmount, deliveryFee,calculateDiscountedTotal } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
  const validPromoCodes = { 'FOODE25': 20 ,'FOODE10':10}; // Promo code dictionary
  const handlePromoCodeSubmit = () => {
    if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode]);
      setIsPromoCodeValid(true);
      toast.success('Promo code applied successfully!');
    } else {
      toast.error('Invalid promo code');
      setDiscount(0);
      setIsPromoCodeValid(false);
    }
  };
  
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
 
  // }, [cartItems, food_list]);
  console.log(loading)
  if (loading ) {
    return <div>Loading...</div>;
  }
  console.log(cartItems,food_list)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems?.length >= 0 ? (
          cartItems.map((cartItem) => {
            const foodItem = food_list.find(item => item.name === cartItem.name);
            return (
              <div className="cart-items-title cart-items-item" key={cartItem.id}>
                <img src={url + "/images/" + foodItem?.image} alt={foodItem?.name} />
                <p>{foodItem?.name}</p>
                <p>₹{foodItem?.price}</p>
                <p>{cartItem?.quantity}</p>
                <p>₹{foodItem?.price * cartItem?.quantity}</p>
                <p className="cross" onClick={() => removeFromCart(cartItem?.name)}>x</p>
              </div>
            );
          })
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{gettotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee()}</p>
          </div>
          <hr />
          {isPromoCodeValid &&  (
            <>
              <div className="cart-total-details">
                <p>Discount ({discount}%)</p>
                <p>-₹{calculateDiscountedTotal()}</p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{calculateDiscountedTotal() + deliveryFee()}</p>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
          <hr />
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter the code</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo code' value={promoCode}  onChange={(e) => setPromoCode(e.target.value)} />
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
