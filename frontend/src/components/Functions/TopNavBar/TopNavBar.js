import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton"
import './TopNavBar.css';

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDroppedDown: false,
        };
        this.menuRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.closeDropdown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeDropdown);
    }

    closeDropdown = (e) => {
        if (e.target !== this.menuRef.current) {
            this.setState({
                isDroppedDown: false
            });
        }
    };

    toggleDropdown = (e) => {
        e.stopPropagation();
        this.setState(prevState => ({
            isDroppedDown: !prevState.isDroppedDown,
        }));
    };

    render() {
        /*if (window.location.pathname === "/entercode") {
            return (
                <div className="navBar"></div>
            );
        }*/
        return (
            <div className="navBar">
                <div className="navBar-left">
                    <NavButton className="navTitle" path="/" text="Zwj Info Tracker" />
                </div>

                <div className="navBar-right">
                    <ul className="nav-list">
                        <li><NavButton className="nav-button" path="/draft" text="Draft" /></li>
                        <li><NavButton className="nav-button" path="/create-client" text="Create Client" /></li>
                        <li><NavButton className="nav-button" path="/export" text="Export" /></li>
                    </ul>
                    <div className="dropdownIcon" onClick={this.toggleDropdown}>
                        &#9776;
                    </div>
                    {this.state.isDroppedDown ? (
                    <ul ref={this.menuRef} className="dropdown-container">
                        <li><NavButton className="dropdown-content" path="/draft" text="Draft" /></li>
                        <li><NavButton className="dropdown-content" path="/client" text="Create Client" /></li>
                        <li><NavButton className="dropdown-content" path="/export" text="Export" /></li>
                    </ul>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default withFuncProps(TopNavBar);
