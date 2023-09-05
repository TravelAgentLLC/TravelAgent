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
import '../stylesheet/Display.scss';
import Hotels from '../components/Hotels';
import ToDo from '../components/ToDo';

const Display = props => {
  const { state } = useLocation();
  const navigate = useNavigate();
  let { flights, hotels, thingsToDo } = state;
  flights = Object.entries(flights);
  return (
    <div className='contain'>
      <div className='navContain'>
        <button className='next' onClick={() => {
          navigate('/')
        }}>Add Trip</button>
        <div className='navBar'>Your Travel Plan</div>
        <button onClick = {() => {
          navigate(`/userPage`);
        }}className='next'>View All Trips</button>
      </div>
      <div className='travelBox'>
        <div className='itinerary'>
          <h1 className='header'>Hotels</h1>
          <br />
          <div id='hotelComponent'>
            <h4>{hotels[0].name}</h4>
            <p>Rating: {hotels[0].rating}</p>
            <img src={hotels[0].photos} height='150px' />
          </div>
          <div id='hotelComponent'>
            <h4>{hotels[1].name}</h4>
            <p>Rating: {hotels[1].rating}</p>
            <img src={hotels[1].photos} height='150px' />
          </div>
          <div id='hotelComponent'>
            <h4>{hotels[2].name}</h4>
            <p>Rating: {hotels[2].rating}</p>
            <img src={hotels[2].photos} height='150px' />
          </div>
        </div>
        <div className='itinerary'>
          <h1 className='header'>Places to visit</h1>
          <br />
          <div id='hotelComponent'>
            <h4>{thingsToDo[0].name}</h4>
            <p>Rating: {thingsToDo[0].rating}</p>
            <img src={thingsToDo[0].photo} height='150px' />
          </div>
          <div id='hotelComponent'>
            <h4>{thingsToDo[1].name}</h4>
            <p>Rating: {thingsToDo[1].rating}</p>
            <img src={thingsToDo[1].photo} height='150px' />
          </div>
          <div id='hotelComponent'>
            <h4>{thingsToDo[2].name}</h4>
            <p>Rating: {thingsToDo[2].rating}</p>
            <img src={thingsToDo[2].photo} height='150px' />
          </div>
        </div>
        <div className='itinerary'>
          <h1 className='header'>Flights</h1>
          <br />
          {flights.map((flight, index) => {
            const [expand, setExpand] = useState(false);
            const i = flight[1].indexOf('.');
            const text = expand
              ? flight[1]
              : `${flight[1].substring(0, i + 1)}`;
            return (
              <div key={index}>
                <p className='expand' onClick={() => setExpand(!expand)}>
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const List = props => {};

export default Display;
