import React, { Component } from "react";
import './RecordTable.css';
import { getRecords } from '../../../../connector.js';
import AgGridTable from '../AgGridTable/AgGridTable.js';

class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Name", field: "name", sortable: true, width: 160 },
                { headerName: "Company", field: "company", sortable: true, width: 180 },
                { headerName: "Hobby", field: "hobby", sortable: true, width: 190 },
                { headerName: "Important Event Date", field: "importantDate", sortable: true, width: 300, valueFormatter: this.dateFormatter },
                { headerName: "Family", field: "familySituation", sortable: true, width: 300 }
            ],
            defaultColDef: { sortable: true, resizable: true },
            domLayout: 'autoHeight',
            suppressHorizontalScroll: true
        };
    }

    componentDidMount() {
        this.loadRecords();
    }

    loadRecords = async () => {
        try {
            const records = await getRecords();
            // Set records in a different place if necessary (for other features)
            // this.setState({ records });
            console.log("records: ", records)
            this.setState({ records });
        } catch (error) {
            console.error("Error loading records:", error);
        }
    };

    dateFormatter = (params) => {
        const date = new Date(params.value);
        if (!isNaN(date)) {
            return date.toISOString().split('T')[0];
        }
        return params.value;
    }

    render() {
        const { rowData } = this.props; // Use rowData from props

        return (
            <div className="body">
                <div className="RecordPageContainer">
                    <AgGridTable
                        rowData={rowData} // Use the passed rowData
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        domLayout={this.state.domLayout}
                        suppressHorizontalScroll={this.state.suppressHorizontalScroll}
                    />
                </div>
            </div>
        );
    }
}

export default RecordTable;
