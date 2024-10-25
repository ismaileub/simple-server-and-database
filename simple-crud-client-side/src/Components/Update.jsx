import { useRef } from "react";
import { useLoaderData } from "react-router-dom";


const Update = () => {

    const loadedUsers = useLoaderData();
    console.log(loadedUsers.name);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef(); // Ref for the form element

    // Handle form submission
    const handleUpdate = (e) => {
        e.preventDefault(); // Prevent page reload

        // Get the current values from input fields using useRef
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const user = { name, email, password };
        console.log(user);
    }

    return (
        <div>
            <h3>Update information of {loadedUsers.name}</h3>

            <form ref={formRef} onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input type="text" ref={nameRef} placeholder="Enter your name" defaultValue={loadedUsers.name} />
                </div>

                <br />

                <div>
                    <label>Email:</label>
                    <input type="email" ref={emailRef} placeholder="Enter your email" defaultValue={loadedUsers.email} />
                </div>

                <br />

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Enter your password"
                        defaultValue={loadedUsers.password}
                    />
                </div>

                <br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;