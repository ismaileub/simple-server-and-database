import { useRef } from 'react';
import './App.css';

function App() {
  // Refs to access input fields directly
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef(); // Ref for the form element

  // Handle form submission
  const handleAddUser = (e) => {
    e.preventDefault(); // Prevent page reload

    // Get the current values from input fields using useRef
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = { name, email, password };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert('User added successfully');
          // Clear the form after submission
          formRef.current.reset();
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user');
      });
  };

  return (
    <>
      <h1>Simple CRUD</h1>

      <form ref={formRef} onSubmit={handleAddUser}>
        <div>
          <label>Name:</label>
          <input type="text" ref={nameRef} placeholder="Enter your name" />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef} placeholder="Enter your email" />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default App;
