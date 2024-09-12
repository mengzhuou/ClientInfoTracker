import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
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
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
