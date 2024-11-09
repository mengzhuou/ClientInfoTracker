import React, { Component } from "react";
import './RecordTable.css';
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

    dateFormatter = (params) => {
        const date = new Date(params.value);
        if (!isNaN(date)) {
            return date.toISOString().split('T')[0];
        }
        return params.value;
    }

    render() {
        const { rowData } = this.props; 
        return (
            <div className="body">
                <div className="RecordPageContainer">
                    <AgGridTable
                        rowData={rowData} 
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
