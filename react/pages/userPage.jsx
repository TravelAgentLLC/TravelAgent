import React, {
  Component,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router';
import '../stylesheet/textbox.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import Data from '../components/Data';
import { useDrop } from 'react-dnd';
import '../stylesheet/userPage.scss';

const notes = [
  { id: 1, note: 'Note1' },
  { id: 2, note: 'Note2' },
  { id: 3, note: 'Note3' },
];
async function getPastVacations() {
  const response = await fetch(
    'http://localhost:3000/api/users/pastvacations',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: window.localStorage.getItem('user_id'),
      }),
    },
  );
  const data = await response.json();
  console.log(data);
  return data;
}
// function handleLoadClick(data) {
//   navigate('/display', data);
// }
const data = await getPastVacations();

const UserPage = props => {
  // const [loc, setLoc] = useState(data.map((elem) => {
  //  elem = elem.location
  // }))
  console.log(data);
  return (
    <div className='Ucontainer'>
      <div className='Profile'>Trip Tracker</div>
      <div className='prevTrips'>
        Your Past Trips
        {data.map((elem, index) => {
          console.log(`This is ${elem}`);
          return <Data data={elem} location={elem.location} />;
        })}
      </div>
    </div>
  );
};

export default UserPage;
