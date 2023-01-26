import React from "react";
import Tilt from 'react-parallax-tilt';
import '../Logo.css'
import brain from '../photos/aibrain.png'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="logo">
                <div className="br2 shadow-2" style={{ height: '150px', backgroundColor: 'darkgreen' }}>
                    <div className="brain pa3"><img style={{paddingTop: '7px'}}alt="logo" src={brain}/></div>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;