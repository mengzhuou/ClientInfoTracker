import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import { NavLink } from "react-router-dom";
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
                        <li><NavLink to="/Draft" className="nav-button">Draft</NavLink></li>
                        <li><NavLink to="/Client" className="nav-button">Create Client</NavLink></li>
                        <li><NavLink to="/Export" className="nav-button">Export</NavLink></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
