import './index.css'

const Item = props => {
  const {item, onChangeTab, activeId} = props
  const {menuCategory, menuCategoryId} = item
  const onClickItem = () => {
    onChangeTab(menuCategoryId)
  }
  const activeClass = activeId === menuCategoryId ? 'active-id' : ''
  return (
    <li className="list-item">
      <button
        type="button"
        className={`${activeClass} item-btn`}
        onClick={onClickItem}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default Item
