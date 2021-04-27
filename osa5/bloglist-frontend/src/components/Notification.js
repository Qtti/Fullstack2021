import React from 'react'

const Notification = ({message}) => {
    const Style = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
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