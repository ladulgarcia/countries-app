import React from "react";
import {Link} from 'react-router-dom'

// Estilos
import styles from './LandingPage.module.css'


function LandingPage(){
    return (
        <div className={styles.landingimg}>
            <h1>Welcome to countries of the World demo app</h1>
            <Link to='/home'>
            <div className={styles.center}>
                <button className={styles.btn}>Enter</button>
            </div>
            </Link>
        </div>
    )
}

export default LandingPage;