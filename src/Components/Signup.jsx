import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom'

import url from '../../url'

export default function Signup() {

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userAdd = async (e) => {
        e.preventDefault();
        const res = await fetch(`${url.url}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                "role": role,
                "name": name,
                "email": email,
                "password":password
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        if (data.status === "success")
            navigate("/login");
        else alert(data.msg)
    }

    return (
        <>
            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>

                <form onSubmit={userAdd}>

                    <h1>Signup</h1>

                    <div className="form-group">
                        <label htmlFor="role" className='mt-3 fs-5'>Role</label>
                        {/* <input type="text " className="form-control " id="role" aria-describedby="emailHelp" required placeholder="Enter Name"  value={name} /> */}
                        <select name="role" className="form-control " id="role" aria-describedby="emailHelp" onChange={(event) => setRole(event.target.value)}>
                            <option value="user">user</option>
                            <option value="moderator">moderator</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="name" className='mt-3 fs-5'>Name</label>
                        <input type="text " className="form-control " id="name" aria-describedby="emailHelp" required placeholder="Enter Name" onChange={(event) => setName(event.target.value)} value={name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className='mt-3 fs-5'>Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" required onChange={(event) => setEmail(event.target.value)} value={email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className='mt-3 fs-5' >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Passowrd" required onChange={(event) => setPassword(event.target.value)} value={password} />
                    </div>

                    <button type="submit" className="btn btn-primary mb-5 mt-5">Signup</button>

                    <Link to='/login'> <button type="submit" className="btn btn-danger mb-5 ms-4 mt-5">Already a user</button></Link>
                
                </form>
            </div>


        </>


    )
}

