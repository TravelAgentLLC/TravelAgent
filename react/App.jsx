import React, {
  Component,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
  useEffect,
} from 'react';
// import styles from '../stylesheet/style.module.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import HomePage from './pages/homepage.jsx';
import Display from './pages/Display.jsx';
import Signup from './components/signup';
import Login from './components/Login';
import UserPage from './pages/userPage';

const App = () => {
  const [fetchData, setfetchData] = useState([]);
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/display' element={<Display />} />
      <Route path='/userPage' element={<UserPage />} />
    </Routes>
  );
};

// const Canvas = (props) => (
//     <canvas>{props.threeD}</canvas>
// )

export default App;

// ref = {mountRef}
