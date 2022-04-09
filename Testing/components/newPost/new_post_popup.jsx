import React from "react";
import popupStyles from "./custom-popup.module.css";

const NewPostPopUp = (props) => {
    return (
        <div className={popupStyles.overlay}
        style={{
            visibility: props.show? "visible" : "hidden",
            opacity: props.show? "1" : "0"
        }}>   
            <div className={popupStyles.modal}>
                <span className={popupStyles.close} onClick={() => props.onClose(false)}>
                &times;
                </span>
                <div className={popupStyles.content}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default NewPostPopUp;
