import React, {Component, useState, useRef, useLayoutEffect, Suspense, useEffect} from "react";
// import styles from '../stylesheet/style.module.css'
import {Routes, Route, useNavigate} from "react-router-dom"
import './stylesheet/homepage.scss'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Canvas} from '@react-three/fiber'
import { OrbitControls, useGLTF} from "@react-three/drei";


const App = () => {
    // <Canvas>
    //             <ambientLight intensity = {.5}/>
    //             <directionalLight position = {[-2,5,2]} intensity = {1}/>
    //             <OrbitControls/>
    //             <mesh rotation = {[50,10,0]}>
    //                 <boxGeometry attach = "geometry" args = {[3,3,3]}/>
    //                 <meshLambertMaterial attach = "material" color = "blue"/>
    //             </mesh>
    //             </Canvas>
// const mountRef = useRef(null)
// useEffect(() => {
// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.outputColorSpce = THREE.SRGBColorSpace;
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x000000)
// renderer.setPixelRatio(window.devicePixelRatio)
// mountRef.current.appendChild(renderer.domElement)
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000)
// camera.position.set(4,5,11);
// camera.lookAt(0,0,0)
// const groundGeometry = new THREE.PlaneGeometry(20,20,32,32)
// groundGeometry.rotateX(-Math.PI/2);
// const material = new THREE.MeshStandardMaterial({
//     color: 0x555555,
//     side: THREE.DoubleSide
// })
// const mesh = new THREE.Mesh(groundGeometry, material)
// scene.add(mesh)
// const spotlight = new THREE.SpotLight(0xfffffff, 200, 100, .2,0.4)
// spotlight.position.set(0,25,0);
// scene.add(spotlight)
// const load =  useGLTF('./agent.gltf')
// // const loader = new GLTFLoader()
// // loader.load('../Public/millennium_falcon', (gltf) => {
// //     const mesh = gltf.scene;
// //     mesh.position.set(0,1.05,1);
// //     scene.add(mesh)
// // })

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene,camera)
// }
// animate();
// return () => mountRef.current.removeChild(renderer.domElement)
// }, [])
      
    return(
    <Routes>
        <Route path = '/' element = {
        <div className = "color" >
            <div ></div>
        </div>

        }/>

    </Routes>
    )

}

// const Canvas = (props) => (
//     <canvas>{props.threeD}</canvas>
// )

export default App

// ref = {mountRef}