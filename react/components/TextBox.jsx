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
import images from '../components/images.js';
import voicelines from '../components/voiceLines.js';
import voiceLines from '../components/voiceLines.js';
let counter = 0;
let inputs = [];
const TextBox = props => {
  const [textBox, setTextBox] = useState('Hello there I am your travel agent?');
  const [inputBox, setInputBox] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [firstOption, setFirstOption] = useState(
    '1:  Hiiiiiiiii nice to meet you',
  );
  const [secondOption, setSeconOption] = useState('2:  Hiiii nice to meet you');

  const navigate = useNavigate();

  const preset = [
    'What is your budget?',
    'What activities would you like to do?',
    'Give me one moment to prepare you travel plan',
  ];

  const dialougeTree = [
    {
      response1: {
        option: '1:  Yes im so excited to travel out of the country',
        agentResponse:
          'YAY! I love travling out of the country! You are taking me with you right?',
        image: images.happyAgent,
        voiceline: voiceLines.voiceline3,
      },
      response2: {
        option: `2:  Yes I can't wait to see a new place`,
        agentResponse: 'I love exploring new places... we should go together',
        image: images.shyAgent,
        voiceline: voiceLines.voiceline4,
      },
    },
    {
      response1: {
        option: '1:   Sorry i perfer to travel alone',
        agentResponse: 'OMG of course so where are you travling too',
        image: images.embarassedAgent,
        voiceline: voiceLines.voiceline5,
      },
      response2: {
        option: '2:   fo sho shawty',
        agentResponse: 'fo sho shawty?... soooooo where are we going too',
        image: images.confusedAgent,
        voiceline: voiceLines.voiceline6,
      },
    },
    {
      response1: {
        option: '1: (select option 3)',
        agentResponse: `i've always wanted to go there when are you leaving`,
        image: images.gladAgent,
        voiceline: voiceLines.voiceline7,
      },
      response2: {
        option: '2:   (select option 3)',
        agentResponse: 'That sounds fun',
        image: images.thinkingAgent,
        voiceline: voiceLines.voiceline7,
      },
    },
    {
      response1: {
        option: '1:   (select option 3)',
        agentResponse: 'We should hangout before then',
        image: images.gladAgent,
        voiceline: voiceLines.voiceline8,
      },
      response2: {
        option: '2:   (select option 3)',
        agentResponse: 'Sweet! soooooo where are we going too',
        image: images.gladAgent,
        voiceline: voiceLines.voiceline8,
      },
    },
    {
      response1: {
        option: '1:   ew, i dont wanna hangout with you ',
        agentResponse: 'rude. when are you coming back so i can ignore you.',
        image: images.sadAgent,
        voiceline: voiceLines.voiceline9,
      },
      response2: {
        option: '2:   oh we can go on a date',
        agentResponse:
          'OMG YAY! when do you come back from the trip so we can have our date then?',
        image: images.blushingAgent,
        voiceline: voiceLines.voiceline10,
      },
    },
    {
      response1: {
        option: '1:   (select option 3)',
        agentResponse:
          'Please wait while i plan your trip (this will take a sec)',
        image: images.thinkingAgent,
        voiceline: voiceLines.voiceline11,
      },
      response2: {
        option: '2:   (select option 3)',
        agentResponse:
          'Please wait while i plan your trip (this will take a sec)',
        image: images.thinkingAgent,
        voiceline: voiceLines.voiceline11,
      },
    },
    {
      response1: {
        option: '1:   please wait',
        agentResponse:
          'Please wait while i plan your trip (this will take a sec)',
        image: images.thinkingAgent,
        voiceline: voiceLines.voiceline11,
      },
      response2: {
        option: '2:   please wait',
        agentResponse:
          'Please wait while i plan your trip (this will take a sec)',
        image: images.thinkingAgent,
        voiceline: voiceLines.voiceline11,
      },
    },
  ];

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('bob');
    const input = e.target.input.value;
    setInputBox(false);
    if (counter === 0) {
      let audio = new Audio(voiceLines.voiceline2);
      audio.play();
      let music = new Audio(voiceLines.bgMusic);
      music.play();
      music.volume = 0.2;
      setTextBox('Are you excited to travel');
    } else {
      let audio = new Audio(dialougeTree[counter - 1].response1.voiceline);
      audio.play();
      props.agentSetImage(dialougeTree[counter - 1].response1.image);
      setTextBox(dialougeTree[counter - 1].response1.agentResponse);
    }
    counter += 1;
    setFirstOption(dialougeTree[counter - 1].response1.option);
    setSeconOption(dialougeTree[counter - 1].response2.option);
    inputs.push(inputValue);
    console.log(`This is ${inputs}`);

    if (inputs.length === 3) {
      console.log('it worked');
      try {
        const response = await fetch('http://localhost:3000/travelInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: inputs[0],
            returnDate: inputs[2],
            leaveDate: inputs[1],
          }),
        });
        if (response.ok) {
          console.log('res is ok');
          const parsed = await response.json();
          // props.data(parsed);
          const response2 = await fetch(
            'http://localhost:3000/api/users/update',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: window.localStorage.getItem('user_id'),
                vacation: parsed,
              }),
            },
          );
          console.log(response2);
          console.log(parsed);
          // props.setfetchData(parsed);
          // console.log(`This is correct: ${props.fetchData}`);
          navigate('/display', { state: parsed });
        } else {
          console.log('error gg');
        }
      } catch (err) {
        console.log(err);
        console.log('error fetching data');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      let validInput = false;
      console.log(e.target.type);
      if (e.target.type === 'text') {
        console.log('LET THE MAN TYPE');
      } else if (e.code === 'Digit1') {
        validInput = true;
        console.log('pressed1');
        console.log(counter);
        if (counter === 0) {
          setTextBox('Are you excited to travel');
          let audio = new Audio(voiceLines.voiceline2);
          audio.play();
          let music = new Audio(voiceLines.bgMusic);
          music.play();
          music.volume = 0.2;
        } else {
          let audio = new Audio(dialougeTree[counter - 1].response1.voiceline);
          audio.play();
          props.agentSetImage(dialougeTree[counter - 1].response1.image);
          setTextBox(dialougeTree[counter - 1].response1.agentResponse);
        }
        counter += 1;
        console.log(counter);
      } else if (e.code === 'Digit2') {
        validInput = true;
        if (counter === 0) {
          setTextBox('Are you excited to travel');
          let audio = new Audio(voiceLines.voiceline2);
          audio.play();
          let music = new Audio(voiceLines.bgMusic);
          music.play();
          music.volume = 0.2;
        } else {
          let audio = new Audio(dialougeTree[counter - 1].response2.voiceline);
          audio.play();
          props.agentSetImage(dialougeTree[counter - 1].response2.image);
          setTextBox(dialougeTree[counter - 1].response2.agentResponse);
        }
        counter += 1;
        console.log('pressed2');
      } else if (e.code === 'Digit3') {
        console.log('pressed3');
        setInputBox(true);
      }
      if (validInput) {
        setFirstOption(dialougeTree[counter - 1].response1.option);
        setSeconOption(dialougeTree[counter - 1].response2.option);
      }
      // updatetextBox(preset[counter])
      // counter+=1
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className='textbox'>
      <h1 className='animateText'>{textBox}</h1>
      {/* <h1 className="animateText">{textBox}</h1> */}
      <ul>
        <li>{firstOption}</li>
        <li>{secondOption}</li>
        <li>3: Other</li>
        {inputBox && (
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleInputChange}
              placeholder='Type Here...'
              name='input'></input>
          </form>
        )}
      </ul>
    </div>
  );
};

export default TextBox;

// {inputValue.map((elem, index) => {
//     return <h1 className="animateText" id = {index}>{elem}</h1>
//  })}
