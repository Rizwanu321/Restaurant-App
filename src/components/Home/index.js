import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Items from '../Items'
import ItemDetails from '../ItemDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [response, setResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [cartItems, setCartItems] = useState([])

  const addToCart = item => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(e => e.dishId === item.dishId)

      if (existingItem) {
        return prevCartItems.map(e =>
          e.dishId === item.dishId ? {...e, quantity: e.quantity + 1} : e,
        )
      }
      return [...prevCartItems, {...item, quantity: 1}]
    })
  }

  const removeFromCart = item => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(e => e.dishId === item.dishId)

      if (existingItem && existingItem.quantity > 1) {
        return prevCartItems.map(e =>
          e.dishId === item.dishId ? {...e, quantity: e.quantity - 1} : e,
        )
      }
      if (existingItem && existingItem.quantity === 1) {
        return prevCartItems.filter(e => e.dishId !== item.dishId)
      }
      return prevCartItems
    })
  }

  const updatedData = data =>
    data.map(e => ({
      menuCategory: e.menu_category,
      menuCategoryId: e.menu_category_id,
      menuCategoryImage: e.menu_category_image,
      categoryDishes: e.category_dishes.map(each => ({
        dishId: each.dish_id,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
        dishImage: each.dish_image,
        dishCurrency: each.dish_currency,
        dishCalories: each.dish_calories,
        dishDescription: each.dish_description,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
        addonCat: each.addonCat,
      })),
    }))

  const getData = async () => {
    setResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })

    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const res = await fetch(url, options)
    const responseData = await res.json()
    console.log(responseData)
    if (res.ok) {
      const data = updatedData(responseData[0].table_menu_list)
      setResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstants.success,
        data,
      }))
      setTitle(responseData[0].restaurant_name)
      setCategoryId(data[0].menuCategoryId)
    } else {
      setResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstants.failure,
        errorMsg: responseData.error_msg,
      }))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onChangeTab = id => setCategoryId(id)

  const renderTab = () => (
    <ul className="items-container">
      {response.data.map(each => (
        <Items
          key={each.menuCategoryId}
          item={each}
          onChangeTab={onChangeTab}
          activeId={categoryId}
        />
      ))}
    </ul>
  )

  const renderTabItems = () => {
    const filteredData = response.data.filter(
      each => each.menuCategoryId === categoryId,
    )
    if (filteredData.length === 0) {
      return null
    }
    return (
      <ul className="items-details-container">
        {filteredData[0].categoryDishes.map(each => (
          <ItemDetails
            key={each.dishId}
            item={each}
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSuccessView = () => (
    <div className="home-container">
      <Header cartItems={cartItems} title={title} />
      {renderTab()}
      {renderTabItems()}
    </div>
  )

  const renderFailureView = () => (
    <div className="err-container">
      <h1>Something Went Wrong</h1>
      <button type="button" className="retry-btn" onClick={getData}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loding-container">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  const renderRestaurant = () => {
    const {status} = response

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <>{renderRestaurant()}</>
}

export default Home
