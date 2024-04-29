
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([]);

  // data load for useEffect
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  // from submit function

  const handleAddUser = e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)

    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...user, data];
        setUser(newUsers);
        form.reset()
      })

  }

  // data load korte error dile er por server side project a giya cors ta ke add koraite hobe 
  return (
    <>
      <h1>user-management-client</h1>
      <h3> Numbers of users : :{user.length} </h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' />,
        <br />
        <input type="email" name='email' placeholder='email' />,
        <br />
        <input type="submit" name='Add User' />
      </form>
      <div>
        {
          user.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
