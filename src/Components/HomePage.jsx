
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function HomePage() {


    const navigate = useNavigate();

    const [adminCounter, setAdminCounter] = useState(0);
    const [moderatorCounter, setModeratorCounter] = useState(0);
    const [userCounter, setUserCounter] = useState(0);

    const getCounterValues = async () => {
        authToken = localStorage.getItem("authTokens")
        const res = await fetch(`${url.url}/countervalues`, {
            method: 'POST',
            body: JSON.stringify({
                "authToken": authToken,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        if (data.status === "success") {
            setAdminCounter(data.data.adminCounter)
            setAdminCounter(data.data.moderatorCounter)
            setAdminCounter(data.data.userCounter)
        }
        else alert(data.msg)
    }

    const verifyAccess = async()=>{
        authToken = localStorage.getItem("authTokens")
        const res = await fetch(`${url.url}/countervalues`, {
            method: 'POST',
            body: JSON.stringify({
                "authToken": authToken,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
    }




    return (
        <>
            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>


                    <div className="fs-5 mt-1"> Admin Counter value : {adminCounter}</div>
                    <button className="btn btn-primary mt-3">Admin Counter</button>
                    
                    <div className="fs-5 mt-5"> Moderator Counter value : {moderatorCounter}</div>
                    <button className="btn btn-primary mt-3">Moderator Counter</button>
                    
                    <div className="fs-5 mt-5"> User Counter value : {userCounter}</div>
                    <button className="btn btn-primary mt-3">User Counter</button>

                    <Link to="/dashboard"><button type="button" className="btn btn-danger ms-2 mt-5 d-block">Log out</button>
                    </Link>
            </div>
        </>
    );
}

export default HomePage