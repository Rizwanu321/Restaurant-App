import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cartItems, title} = props
  const getCount = () => cartItems.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <nav className="header-container">
      <h1 className="header-name">{title}</h1>
      <div className="order-container">
        <p className="order">My Orders</p>
        <div className="cart-container">
          <AiOutlineShoppingCart size={30} color="#534343" />
          <span className="item-count">{getCount()}</span>
        </div>
      </div>
    </nav>
  )
}

export default Header
