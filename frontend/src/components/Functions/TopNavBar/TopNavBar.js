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
        return (
            <div className="navBar">
                <div className="navBar-left">
                    <div className="navTitle">Zwj Info Tracker</div>
                </div>
                <div className="navBar-right">
                    <ul className="nav-list">
                        <li><NavButton path="/Draft" text="Draft" /></li>
                        <li><NavButton path="/Client" text="Create Client"/></li>
                        <li><NavButton path="/Export" text="Export"/></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
