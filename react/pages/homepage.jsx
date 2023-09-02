import '../stylesheet/homepage.scss'
import {Routes, Route, useNavigate} from "react-router-dom";
import React, {Component, useState, useRef, useLayoutEffect, Suspense, useEffect} from "react";
import TextBox from '../components/TextBox';

let counter = 0

const HomePage = props => {
    return (  
    <div className = 'container'>
        <div className = 'title'>TravelAgent</div>
        <TextBox data={props.data}/>
    </div>
    )
}
export default HomePage;