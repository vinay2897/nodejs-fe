import React, { useState } from 'react';
import './App.css';

function App() {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [users, setUsers] = useState(null);

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  async function set() {
    fetch('http://localhost:5000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName, lastName,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async function get() {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUsers(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <label>
        First Name:
        <input type="text" name="firstName" onChange={handleFirstNameChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" onChange={handleLastNameChange} />
      </label>
      <button onClick={set}>Save</button>

      <button onClick={get}>View users</button>
      <div>
        {
          users ?
            <ul>
              {users.map((item) => {
                return <li key={item.userid}>{`${item.fname} ${item.lname}`}</li>;
              })}
            </ul> : null
        }
      </div>
    </div>


  );
}

export default App;
