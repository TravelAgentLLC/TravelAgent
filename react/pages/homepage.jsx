import '../stylesheet/homepage.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SceneInit from '../../lib/SceneInit';
import Box from '../components/Box.jsx';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {
  Component,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
  useEffect,
} from 'react';
import TextBox from '../components/TextBox';

let counter = 0;
const HomePage = props => {
  // useEffect(() => {
  //   const test = new SceneInit('myCanvas');
  //   test.initialize();
  //   test.animate();
  // });
  // const gltfLoader = new GLTFLoader();
  // gltfLoader.load(
  //   '../../build/celeste_-_animal_crossing_new_horizons/scene.gltf',
  //   gltfScene => {
  //     test.scene.add(gltfScene.scene);
  //   },
  // ); {/* <Canvas>
  //   <OrbitControls />
  //   <ambientLight intesnity={0.5} />
  //   <directionalLight position={[-2, 5, 2]} intensity={1} />
  //   <Box />
  // </Canvas> */}

  return (
    <div className='container'>
      <div className='title'>TravelAgent</div>
      <img
        src={require(`../Assets/travelAgentGirl/gladAgentGirl.png`)}
        alt='failed'
        className='agentGirl'
      />
      <img
        src={require('../Assets/receptionistDesk-removebg-preview.png')}
        alt='failed'
        className='desk'
      />
      <TextBox />
    </div>
  );
};
export default HomePage;
