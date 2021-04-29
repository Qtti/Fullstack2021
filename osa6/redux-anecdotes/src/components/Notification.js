
import React from 'react'
import { useSelector } from 'react-redux'



const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    borderColor: 'green',
    padding: 10,
    borderWidth: 2
  }
  if(notification)
  {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else return (<div></div>)
  
}

export default Notification