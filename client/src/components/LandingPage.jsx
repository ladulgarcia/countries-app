import React from "react";
import {Link} from 'react-router-dom'

function LandingPage(){
    return (
        <div>
            <h1>Welcome</h1>
            <Link to='/home'>
            <div>
                <button>Enter</button>
            </div>
            </Link>
        </div>
    )
}

export default LandingPage;