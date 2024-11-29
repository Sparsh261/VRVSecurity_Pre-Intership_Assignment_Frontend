import { useState } from "react";
import { Link } from "react-router-dom";
import url from '../../url'
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // To login the user.

    const userlogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify({
                "role": role,
                "email": email,
                "password": password
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        // To store authToken 

        if (data.status === "success") {
            localStorage.setItem("authTokens", data.authToken)
            navigate("/homepage");
        }
        else alert(data.msg)
    }

    return (
        <>
            <div className="container   " style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>
                <form onSubmit={userlogin} >
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="role" className='mt-3 fs-5'>Role</label>
                        <select name="role"  className="form-control " id="role" aria-describedby="emailHelp" onChange={(event) => setRole(event.target.value)} required>
                            <option value=""  ></option>
                            <option value="user" >user</option>
                            <option value="moderator">moderator</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1" className="mt-2 fs-5">Email address</label>
                        <input type="email" className="form-control " required id="exampleInputEmail1" name="exampleInputEmail1" onChange={(e) => { setEmail(e.target.value) }}
                            aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted bg-light ">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="mt-3 fs-5">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            name="password" onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">Log in</button>
                    <Link to="/signup"><button type="button" className="btn btn-danger ms-5 mt-5">Sign up</button>
                    </Link>
                </form>
            </div>

        </>
    )
}
