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
//   "hotels": {
//     "0": {
//         "name": "Four Seasons Hotel Miami",
//         "rating": 4.7,
//         "photos": "https://lh3.googleusercontent.com/places/ANJU3DuQrUy3qww6z81i1o58J4vs_bUlVXsNiF_Kt86mWB-7pF-41izdFi3dVe_qnCFVsNZnNkDgSRCUsf4OHl1ccflZFjljKlnkzj0=s1600-w800-h800"
//     },
//     "1": {
//         "name": "Hampton Inn & Suites by Hilton Miami Brickell Downtown",
//         "rating": 4.5,
//         "photos": "https://lh3.googleusercontent.com/places/ANJU3Dtk7ug4RCGb8TjRcL9xuYi30TefjD_MfxxJNcj0yuEBADzyzMXbtQMpx67DZto9vQnZzlSOaLAnTIRgVZ3-TNw3kYaVPB3rdug=s1600-w800-h800"
//     },
//     "2": {
//         "name": "JW Marriott Miami",
//         "rating": 4.4,
//         "photos": "https://lh3.googleusercontent.com/places/ANJU3DscAbnDowwgJZTffckxy0lz--vaVkifKS-4Xq1ERB-Gkkg6qkHOpy53EvgTUVCm33T4WhPcqsnR0mdiFrJ3Jxc4JWboMx6joHM=s1600-w480-h320"
//     }
// },
// "thingsToDo": {
//     "0": {
//         "name": "Mirador Brickell",
//         "rating": 4.9,
//         "photo": "https://lh3.googleusercontent.com/places/ANJU3Duppvn51fwXZX4v7ANU5snnnAb8cVYOOm37NLpxxasHXocMUa_zpIndI0QGXEj9wWKyoDHJtBmvV4IYNnJAzcOygWAMGQA33oc=s1600-w800-h800"
//     },
//     "1": {
//         "name": "Brickell Key Park",
//         "rating": 4.8,
//         "photo": "https://lh3.googleusercontent.com/places/ANJU3DtAoB_geGjydoj9CTdji5Dmpzzsqb2Kv53DrIKxv72kTYdmRTbP7_1VvtuQ91oZ03xp6aSVcWMLvH0GrGdy-J0j4ds9raKUGc8=s1600-w800-h800"
//     },
//     "2": {
//         "name": "Simpson Park",
//         "rating": 4.6,
//         "photo": "https://lh3.googleusercontent.com/places/ANJU3DvhQ9Gfq1_LDRl3zTcgNAGfEj_jHFMtQaqgWXOppTtqjDZjOoBYMEY_luJkuy5VHsh-GmwFSjHYaawUBnmzVCQRnySo4DDPGbU=s1600-w800-h800"
//     }
// },
// "flights": {
//     "0": "From 384 US dollars round trip total. 1 stop flight with Delta. Leaves St. Louis Lambert International Airport at 11:51 AM on Saturday, May 25 and arrives at Fort Lauderdale-Hollywood International Airport at 5:36 PM on Saturday, May 25. Total duration 4 hr 45 min. Layover (1 of 1) is a 1 hr 18 min layover at Hartsfield-Jackson Atlanta International Airport in Atlanta. Select flight",
//     "1": "From 395 US dollars round trip total. 1 stop flight with American. Leaves St. Louis Lambert International Airport at 2:38 PM on Saturday, May 25 and arrives at Fort Lauderdale-Hollywood International Airport at 7:54 PM on Saturday, May 25. Total duration 4 hr 16 min. Layover (1 of 1) is a 30 min layover at Charlotte Douglas International Airport in Charlotte. Select flight",
//     "2": "From 450 US dollars round trip total. Nonstop flight with American. Leaves St. Louis Lambert International Airport at 5:31 AM on Saturday, May 25 and arrives at Miami International Airport at 9:20 AM on Saturday, May 25. Total duration 2 hr 49 min.  Select flight"
// }
// }

const Display = props => {
  const { state } = useLocation();
  let { flights, hotels, thingsToDo } = state;
  flights = Object.entries(flights);
  return (
    <div className='contain'>
      <div className='navBar'>Your Travel Plan</div>
      <div className='travelBox'>
        <div className='itinerary'>
        <h1>Hotels</h1>
        <br />
         <div id='hotelComponent'>
          <h4>{hotels[0].name}</h4>
          <p>Rating: {hotels[0].rating}</p>
          <img src={hotels[0].photos} height='150px'/>
          </div>
          <div id='hotelComponent'>
          <h4>{hotels[1].name}</h4>
          <p>Rating: {hotels[1].rating}</p>
          <img src={hotels[1].photos} height='150px'/>
          </div>
          <div id='hotelComponent'>
          <h4>{hotels[2].name}</h4>
          <p>Rating: {hotels[2].rating}</p>
          <img src={hotels[2].photos} height='150px'/>
          </div>
        </div>
        <div className='itinerary'>
          <h1>Places to visit</h1>
          <br />
          <div id='hotelComponent'>
          <h4>{thingsToDo[0].name}</h4>
          <p>Rating: {thingsToDo[0].rating}</p>
          <img src={thingsToDo[0].photo} height='150px'/>
          </div>
          <div id='hotelComponent'>
          <h4>{thingsToDo[1].name}</h4>
          <p>Rating: {thingsToDo[1].rating}</p>
          <img src={thingsToDo[1].photo} height='150px'/>
          </div>
          <div id='hotelComponent'>
          <h4>{thingsToDo[2].name}</h4>
          <p>Rating: {thingsToDo[2].rating}</p>
          <img src={thingsToDo[2].photo} height='150px'/>
          </div>
        </div>
        <div className='itinerary'>
          <h1>Flights</h1>
          <br />
          {flights.map((flight,index) => {
            const [expand, setExpand] = useState(false);
            const i = flight[1].indexOf('.');
            const text = expand ? flight[1] : `${flight[1].substring(0,i + 1)}`;
            return(
              <div key={index}>
                <p className = "expand" onClick={() => setExpand(!expand)}>{text}</p>
              </div>
            )
          })}
          </div>
      </div>
    </div>
  );
};

const List = props => {};

export default Display;
