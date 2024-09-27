import React, { Component } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './RecordTable.css';
import { getRecords } from '../../../../connector.js';



class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            columnDefs: [
                //all attributes: company, name, hobby, importantDate, note, additionalNote, family, birthday, reasonOfKnowing, email, position, phoneNumber
                { headerName: "Name", field: "name", sortable: true, filter: true, width: 230 },
                { headerName: "Company", field: "company", sortable: true, filter: true, width: 230 },
                { headerName: "Hobby", field: "hobby", sortable: true, filter: true, width: 230 },
                { headerName: "Important Event Date", field: "importantDate", sortable: true, filter: true, width: 230, valueFormatter: this.dateFormatter },
                { headerName: "Family", field: "family", sortable: true, filter: true, width: 230 }
            ]
        };
    }

    componentDidMount() {
        this.loadRecords();
    }

    loadRecords = async () => {
        try {
            const records = await getRecords();
            this.setState({ records });
        } catch (error) {
            console.error("Error loading records:", error);
        }
    };

    //parse the date format to year-Month-day by get rid of the stuffs after T
    dateFormatter = (params) => {
        const date = new Date(params.value);
        if(!isNaN(date)) {
            return date.toISOString().split('T')[0];
        }
        return params.value;
    }

    render() {
        return (
            <div className="body">
                <div className="RecordPageContainer ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                    <AgGridReact
                        rowData={this.state.records}
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                    />
                </div>
            </div>
        );
    }
}

export default RecordTable;
