import React, {Component, useState, useRef, useLayoutEffect, Suspense, useEffect} from "react";
import { useNavigate } from "react-router";
import '../stylesheet/textbox.scss'
let counter = 0
let inputs = [];
const TextBox = props => {
 const [textBox, setTextBox] = useState("Where would you like to travel to?")
 const [inputBox, setInputBox] = useState(false);
 const [inputValue, setInputValue] = useState('');

 const navigate = useNavigate();

 const preset = ["What is your budget?",
                 "What activities would you like to do?",
                 "Give me one moment to prepare you travel plan" ]
                
const handleInputChange = (event) => {
    setInputValue(event.target.value) 
        };
const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.input.value;
    setInputBox(false)
    setTextBox(preset[counter])
    counter+=1;
    inputs.push(inputValue)
    console.log(inputs);
    if(inputs.length === 3){
        try{
            const response = await fetch('/travelInfo', {
                method: 'POST',
                headers: 'application/json',
                body: JSON.stringify({location: inputs[0], activities: inputs[2]})
            });
            if(response.ok){
                const parsed = await response.json()
                props.data(parsed)
                console.log(response)
                navigate('/display')
            }else{
                console.log('error gg')
            }
        }catch(err){
            console.log('error fetching data')
        }
    }
}

    useEffect(() => {
        const handleKeyDown = (e) => {
        if (e.code === 'Digit1') {
          console.log('pressed1');
          console.log(counter)
          setTextBox(preset[counter])
          counter += 1;
          console.log(counter)
        } else if(e.code === 'Digit2') {
            setTextBox(preset[counter])
          counter += 1;
            console.log('pressed2')
        } else if(e.code === 'Digit3') {
            console.log('pressed3')
            setInputBox(true);
        }
        // updatetextBox(preset[counter])
        // counter+=1
    }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    return(
        <div className="textbox">
                <h1 className="animateText">{textBox}</h1>
          
            {/* <h1 className="animateText">{textBox}</h1> */}
            <ul>
                <li>1: Awesome to be here! You look great today!</li>
                <li>2: I need help please! </li>
                <li>3: Other</li>{inputBox && <form onSubmit={handleSubmit}>
                    <input onChange= {handleInputChange} placeholder="Type Here..." name="input"></input>
                    
                    </form>}
            </ul>
            
        </div>
)
}


export default TextBox;


// {inputValue.map((elem, index) => {
//     return <h1 className="animateText" id = {index}>{elem}</h1>
//  })}