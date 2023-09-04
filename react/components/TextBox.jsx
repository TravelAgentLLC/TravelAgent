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
        image: 'path/path',
      },
      response2: {
        option: '2:  Yes i can wait to see a new place',
        agentResponse: 'I love exploring new places we should go together',
      },
    },
    {
      response1: {
        option: '1:   Sorry i perfer to travel alone',
        agentResponse: 'Oh... thats ok. so where are you travling too',
      },
      response2: {
        option: '2:   Of course! travling with friends is way more fun',
        agentResponse: 'Sweet! soooooo where are we going too',
      },
    },
    {
      response1: {
        option: '1: (select option 3)',
        agentResponse: 'That sounds fun',
      },
      response2: {
        option: '2:   (select option 3)',
        agentResponse: 'That sounds fun',
      },
    },
    {
      response1: {
        option: '1:   Yes it will be a great time',
        agentResponse: 'Oh... thats ok. so where are you travling too',
      },
      response2: {
        option: '2:   Of course! travling with friends is way more fun',
        agentResponse: 'Sweet! soooooo where are we going too',
      },
    },
    {
      response1: {
        option: '1:   Sorry i perfer to travel alone',
        agentResponse: 'Oh... thats ok. so where are you travling too',
      },
      response2: {
        option: '2:   Of course! travling with friends is way more fun',
        agentResponse: 'Sweet! soooooo where are we going too',
      },
    },
    {
      response1: {
        option: '1:   Sorry i perfer to travel alone',
        agentResponse: 'Oh... thats ok. so where are you travling too',
      },
      response2: {
        option: '2:   Of course! travling with friends is way more fun',
        agentResponse: 'Sweet! soooooo where are we going too',
      },
    },
  ];

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const input = e.target.input.value;
    setInputBox(false);
    setTextBox(dialougeTree[counter - 1].response1.agentResponse);
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
            returnDate: inputs[1],
            leaveDate: inputs[2],
          }),
        });
        if (response.ok) {
          console.log('res is ok');
          const parsed = await response.json();
          // props.data(parsed);
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
        } else {
          setTextBox(dialougeTree[counter - 1].response1.agentResponse);
        }
        counter += 1;
        console.log(counter);
      } else if (e.code === 'Digit2') {
        validInput = true;
        if (counter === 0) {
          setTextBox('Are you excited to travel');
        } else {
          setTextBox(dialougeTree[counter - 1].response2.agentResponse);
        }
        counter += 1;
        console.log('pressed2');
      } else if (e.code === 'Digit3') {
        validInput = true;
        console.log('pressed3');
        setInputBox(true);
      }
      if (validInput) {
        props.agentSetImage(images.sadAgent);
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
