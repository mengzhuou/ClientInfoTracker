import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton"
import './TopNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDroppedDown: false,
        };
    }

    render() {
        /*if (window.location.pathname === "/entercode") {
            return (
                <div className="navBar"></div>
            );
        }*/
        return (
            <div className="navBar">
                <div className="navBar-left">
                    <div className="navTitle">Zwj Info Tracker
                    <Link to="/DraftPage"> Draft Page </Link>
                    </div>
                </div>
                <div className="navBar-right">
                    <ul className="nav-list">
                        <li><NavButton path="/draft" text="Draft" /></li>
                        <li><NavButton path="/client" text="Create Client" /></li>
                        <li><NavButton path="/export" text="Export" /></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
