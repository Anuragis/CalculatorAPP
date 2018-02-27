import React from 'react'
const displayButton=(props)=>{
    return  <button value={props.value} className={props.class} onClick={props.onClick}>{props.value}</button>
}

export default displayButton;