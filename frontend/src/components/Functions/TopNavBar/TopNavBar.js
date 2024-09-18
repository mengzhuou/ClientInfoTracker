import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "./NavButton"
import './TopNavBar.css';

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDroppedDown: false,
        };
    }

    render() {
        if (window.location.pathname === "/entrance") {
            return (
                <div className="navBar"></div>
            );
        }   
        return (
            <div className="navBar">
                <div className="navBar-left">
                    <div className="navTitle">Zwj Info Tracker</div>
                </div>
                <div className="navBar-right">
                    <ul className="nav-list">
                        <li><NavButton path="/draft" text="Draft" /></li>
                        <li><NavButton path="/client" text="Create Client"/></li>
                        <li><NavButton path="/export" text="Export"/></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
