import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  const Style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if((message)){
    return (

      <div style={Style}>
        <span>{message}</span>
      </div>
    )
  }else
  {
    return (<></>)
  }
}

export default Notification