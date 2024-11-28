import "./Dashboard.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard() {


    const navigate = useNavigate();

    return (
        <>
            <div id="formContainer">

                <div className="form-container">
                    <div className="form d-flex flex-wrap">
                        <span className="heading">Practice Assignment</span>
                        <span className="c1">Here we have 3 counters, one for each role.</span>
                        <span className="c2">Only admin, moderator and user can change their counters respectively.</span>
                        <div className="button-container d-flex flex-wrap">

                            <Link to='/signup'> <button className="send-button">Signup</button></Link>
                            <div className="reset-button-container">
                                <Link to='/login'>  <button className="reset-button" id="reset-btn">Login</button>  </Link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard