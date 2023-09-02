import React, {Component, useState} from "react";
// import styles from '../stylesheet/style.module.css'
import {Routes, Route, useNavigate} from "react-router-dom"
import './stylesheet/homepage.scss'

const App = () => {
    return(
    <Routes>
        <Route path = '/' element = {
            <div className = "color" >Heyyyyyy</div>
        }/>

    </Routes>
    )

}


export default App