import './index.css'

const ItemDetails = props => {
  const {item, cartItems, addToCart, removeFromCart} = props
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = item

  const getQuantity = () => {
    const cart = cartItems.find(cartItem => cartItem.dishId === dishId)
    return cart ? cart.quantity : 0
  }

  const currentQuantity = getQuantity()

  const onIncreaseQuantity = () => {
    addToCart(item)
  }

  const onDecreaseQuantity = () => {
    if (currentQuantity > 0) {
      removeFromCart(item)
    }
  }

  const renderButton = () => (
    <div className="btn-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="count">{currentQuantity}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )
  return (
    <li className="list-item-container">
      <div className="Item-details-container">
        <div className={`border-type ${dishType === 1 ? 'border-1' : ''}`}>
          <div className={`round-type ${dishType === 1 ? 'round-1' : ''}`} />
        </div>
        <div className="item-details">
          <h1 className="item-name">{dishName}</h1>
          <p className="item-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="item-description">{dishDescription}</p>
          {dishAvailability && renderButton()}
          {!dishAvailability && <p className="not-availabile">Not available</p>}
          {addonCat.length !== 0 && (
            <p className="addon">Customizations available</p>
          )}
        </div>
      </div>

      <p className="item-calories">{dishCalories} calories</p>
      <img className="item-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default ItemDetails
