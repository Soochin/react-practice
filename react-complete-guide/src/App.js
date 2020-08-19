import React, { useState } from 'react';
import styled from 'styled-components';

import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  };
`;
 
const App = props => {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { id:'argw', name: "Max", age: 28 },
      { id:'ahdf', name: "Manu", age: 29 },
      { id:'erhq3', name: "Stephanie", age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  });

  const [otherState, setOtherState] = useState('some other value');

  const deletePersonHandler = personIndex => {
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);
    setPersonsState({
      persons: persons,
      showPersons: false
    });
  }

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...personsState.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState({
      persons: persons
    });
  }


  const togglePersonsHandler = () => {
    const doesShow = personsState.showPersons;
    setPersonsState({
      persons: [
        { name: "Maximilian", age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 }
      ],
      showPersons: !doesShow
    });
  }

  const style = {};

  let persons = null;

  if (personsState.showPersons) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return <Person
                    click={() => deletePersonHandler(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => nameChangedHandler(event, person.id)} />
        })}
      </div>
    );

    // style.backgroundColor = "red";
    // style[':hover'] = {
    //   backgroundColor: 'salmon',
    //   color: 'black'
    // }
  }

  const classes = [];

  if (personsState.persons.length <= 2) {
    classes.push('red'); 
  }
  if (personsState.persons.length <= 1) {
    classes.push('bold');
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button class="button" onClick={togglePersonsHandler}>
        Switch Name
      </button>
      {persons}
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work now?"));
}

export default App;