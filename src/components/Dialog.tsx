import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_ERROR } from "../actionTypes";
import './Dialog.scss';

export const Dialog = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => {
        return state.pokedex.error
    });

    return ReactDOM.createPortal(
        (
            <>
                {error && <div className="dialog-overlay">
                    <div className="dialog">
                        Whoops! Something went wrong. Please try again.
                        <button onClick={(e) => dispatch({type: HIDE_ERROR})}>Close</button>
                    </div>
                </div>}
            </>
        ),
        document.querySelector('body')!
    );
}