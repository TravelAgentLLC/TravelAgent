import '../stylesheet/homepage.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, {
  Component,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
  useEffect,
} from 'react';
import Hotels from '../components/Hotels';
import ToDo from '../components/ToDo';

const Display = props => {
  const { state } = useLocation();
  //const response = props.data;
  console.log(state);
  //   list={hotels}
  //   list={thingsToDo}
  //   const { hotels, thingsToDo } = response;
  return <div>hi</div>;
};

export default Display;
