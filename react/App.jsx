import React, {Component, useState, useRef, useLayoutEffect, Suspense, useEffect} from "react";
// import styles from '../stylesheet/style.module.css'
import {Routes, Route, useNavigate} from "react-router-dom"
import './stylesheet/homepage.scss'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Canvas} from '@react-three/fiber'
import { OrbitControls, useGLTF} from "@react-three/drei";
import HomePage from './pages/homepage.jsx'
import Display  from './pages/Display.jsx'

const App = () => {
const [response, setResponse] = useState('')
    return(
    <Routes>
        <Route path = '/' element = {<HomePage data={setResponse}/>} />
        <Route path = '/display' element = { <Display data={response}/> } />
    </Routes>
    )
}

// const Canvas = (props) => (
//     <canvas>{props.threeD}</canvas>
// )

export default App

// ref = {mountRef}