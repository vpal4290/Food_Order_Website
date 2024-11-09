import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header' id='header'>
        <div className='header-contents'>
            <h2>Order your favourite foods</h2>
            <p>Choose from a diverse menu of delicious dishes delivered right to your doorstep.
          Our food delivery service offers a wide range of options, from fast food to gourmet meals,
          ensuring that there is something for everyone. Enjoy the convenience of online ordering
          and experience the joy of having your favourite meals brought to you quickly and efficiently. </p>
            <button>View Menu</button>
        </div>

    </div>
  )
}

export default Header;