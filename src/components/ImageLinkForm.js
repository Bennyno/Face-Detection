import React from "react";
import '../ImageLink.css'

const ImageLinkForm = ({onInputChange, onSubmitDetect}) => {
    return(
        <div>
            <p className="f3">
                {'This Magic Brain Will Detect Faces In Your Pictures. Give It A Try.'}
            </p>
            <div className="center">
                <div className=" form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button onClick={onSubmitDetect} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;