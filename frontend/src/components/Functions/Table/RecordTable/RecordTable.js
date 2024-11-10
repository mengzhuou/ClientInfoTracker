import React, { Component } from "react";
import './RecordTable.css';
import AgGridTable from '../AgGridTable/AgGridTable.js';

class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Name", field: "name", sortable: true, flex: 1 },
                { headerName: "Company", field: "company", sortable: true, flex: 1 },
                { headerName: "Hobby", field: "hobby", sortable: true, flex: 1 },
                { headerName: "Important Event Date", cellRenderer: this.importantDateFormatter, sortable: true, cellStyle: { 'white-space': 'pre' }, flex: 2, wrapText: true, autoHeight:true },
                { headerName: "Family", field: "familySituation", sortable: true, flex: 1 }
            ],
            defaultColDef: { sortable: true, resizable: true },
            domLayout: 'autoHeight',
            suppressHorizontalScroll: true
        };
    }
    componentDidMount() {
        this.loadRecords();
    }

    //function for combine important date and note to show in one cell
    importantDateFormatter = (params) => {
        let date = params.data.importantDate;

        if (!date) {
            date = '';
        } else {
            const time = new Date(date);
            date = time.toISOString().split('T')[0];
        }
        if (!params.data.note) {
            params.data.note = '';
        }
        return date  + '\n' + params.data.note;
    }

    loadRecords = async () => {
        try {
            const records = await getRecords();
            const reversedRecords = records.reverse();
            console.log("records: ", records)
            this.setState({ records: reversedRecords });
        } catch (error) {
            console.error("Error loading records:", error);
        }
    };

    dateFormatter = (params) => {
        if (!params.value){
            return '';
        }
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
