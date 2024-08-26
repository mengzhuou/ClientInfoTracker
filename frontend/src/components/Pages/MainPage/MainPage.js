import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import RecordTable from "../../Functions/Table/RecordTable/RecordTable";
import './MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeInput: "",
            classTable: []
        };
    }

    render() {
        return (
            <div className="main-page-body">
                <div className="main-page-container">
                    <div className="record-table-section">
                        <RecordTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default withFuncProps(MainPage);
