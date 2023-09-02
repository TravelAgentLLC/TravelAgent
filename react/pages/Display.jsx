import '../stylesheet/homepage.scss'
import {Routes, Route, useNavigate} from "react-router-dom";
import React, {Component, useState, useRef, useLayoutEffect, Suspense, useEffect} from "react";
import Hotels from '../components/Hotels';
import ToDo from '../components/ToDo';

const Display = props => {
    const response = props.data;
    const { hotels, thingsToDo } = response;
    return(
        <container>
            <Hotels list={hotels}/>
            <ToDo list={thingsToDo}/>
        </container>
    )
    
}







export default Display