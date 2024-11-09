// import React, { useContext } from 'react';
// import './FoodItem.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';
// import { url } from '../../../../Admin/src/assets/assets';

// const FoodItem = ({ id, name, price, description, image }) => {
//     const { cartItems, addtoCart, removeFromCart,url } = useContext(StoreContext);
    
//     // Find the item in the cart
//     const cartItem = cartItems.find(item => item.id === id);
//     const quantity = cartItem ? cartItem.quantity : 0;

//     return (
//         <div className='food-item'>
//             <div className='food-item-img-container'>
//                 <img className='food-item-image' src={url+"/images/"+image} alt={name} />
//                 {quantity === 0 ? (
//                     <img className='add' onClick={() => addtoCart(id)} src={assets.add_icon_white} alt="Add" />
//                 ) : (
//                     <div className='food-item-counter'>
//                         <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove' />
//                         <p>{quantity}</p>
//                         <img onClick={() => addtoCart(id)} src={assets.add_icon_green} alt='Add' />
//                     </div>
//                 )}
//             </div>
//             <div className="food-item-info">
//                 <div className="food-item-name-rating">
//                     <p>{name}</p>
//                     <img src={assets.rating_starts} alt="Rating" />
//                 </div>
//                 <p className='food-item-desc'>
//                     {description}
//                 </p>
//                 <div className="food-item-price">
//                     ₹{price}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FoodItem;
import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets'; // Ensure this path is correct
import { StoreContext } from '../../context/StoreContext'; // Ensure this path is correct

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addtoCart, removeFromCart, url } = useContext(StoreContext); // Access url from context
    
    // Find the item in the cart
    console.log(cartItems)
    const cartItem = cartItems.find((item)=> item.name === id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                {quantity === 0 ? (
                    <img className='add' onClick={() => addtoCart(id)} src={assets.add_icon_white} alt="Add" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove' />
                        <p>{quantity}</p>
                        <img onClick={() => addtoCart(id)} src={assets.add_icon_green} alt='Add' />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className='food-item-desc'>
                    {description}
                </p>
                <div className="food-item-price">
                    ₹{price}
                </div>
            </div>
        </div>
    );
}

export default FoodItem;

