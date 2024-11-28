
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import url from "../../url"

function HomePage() {


    const navigate = useNavigate();

    const [adminCounter, setAdminCounter] = useState();
    const [moderatorCounter, setModeratorCounter] = useState();
    const [userCounter, setUserCounter] = useState();

    const getCounterValues = async () => {
        const authToken = localStorage.getItem("authTokens")

        if (!authToken) {
            alert("First login")
            navigate("/");
        }
        else {
            const res = await fetch(`${url}/getvalues`)

            const data = await res.json();

            if (data.status === "success") {
                console.log(data.adminCount+" "+ data.moderatorCount +" "+ data.userCount)
                setModeratorCounter(data.moderatorCount)
                setAdminCounter(data.adminCount)
                setUserCounter(data.userCount)
            }
            else {
                alert(data.msg)
            }
        }
    }

    const verifyAccess = async () => {
        const authToken = localStorage.getItem("authTokens")
        const res = await fetch(`${url}/access`, {
            method: 'POST',
            body: JSON.stringify({
                "authToken": authToken,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        return data.role;

    }

    const adminCount = async () => {
        const role = await verifyAccess();
        if (role === "admin") {
            setAdminCounter(adminCounter + 1);
            const res = await fetch(`${url}/incrementvalues`, {
                method: 'POST',
                body: JSON.stringify({
                    "adminCount": adminCounter+1,
                    "moderatorCount": moderatorCounter,
                    "userCount": userCounter
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }
        else {
            alert("You are not " + "admin" + ". You can change only " + role + " count.")
        }
    }
    const moderatorCount = async () => {
        const role = await verifyAccess();
        if (role === "moderator") {
            setModeratorCounter(moderatorCounter + 1);
            const res = await fetch(`${url}/incrementvalues`, {
                method: 'POST',
                body: JSON.stringify({
                    "adminCount": adminCounter,
                    "moderatorCount": moderatorCounter+1,
                    "userCount": userCounter
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }
        else {
            alert("You are not " + "moderator" + ". You can change only " + role + " count.")
        }
    }
    const userCount = async () => {
        const role = await verifyAccess();
        if (role === "user") {
            setUserCounter(userCounter + 1);
            const res = await fetch(`${url}/incrementvalues`, {
                method: 'POST',
                body: JSON.stringify({
                    "adminCount": adminCounter,
                    "moderatorCount": moderatorCounter,
                    "userCount": userCounter+1
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }
        else {
            alert("You are not " + "user" + ". You can change only " + role + " count.")
        }
    }

    const logout = () => {
        localStorage.removeItem("authTokens");
        navigate("/");
    }

    useEffect(() => {
        getCounterValues();
    }, [ moderatorCounter, userCounter]);


    return (
        <>
            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>


                <div className="fs-5 mt-1"> Admin Counter value : {adminCounter}</div>
                <button className="btn btn-primary mt-3" onClick={adminCount}>Admin Counter</button>

                <div className="fs-5 mt-5"> Moderator Counter value : {moderatorCounter}</div>
                <button className="btn btn-primary mt-3" onClick={moderatorCount}>Moderator Counter</button>

                <div className="fs-5 mt-5"> User Counter value : {userCounter}</div>
                <button className="btn btn-primary mt-3" onClick={userCount}>User Counter</button>

                <button type="button" className="btn btn-danger ms-2 mt-5 d-block" onClick={logout}>Log out</button>

            </div>
        </>
    );
}

export default HomePage