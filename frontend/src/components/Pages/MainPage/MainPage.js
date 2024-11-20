import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import RecordTable from "../../Functions/Table/RecordTable/RecordTable";
import ClientSearch from "../../ClientSearch";
import './MainPage.css';
import { getRecords } from "../../../connector.js";
import { useNavigate } from "react-router-dom";


export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [], 
            searchTerm: '',
            selectedRowData: null
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

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });
    };

    getFilteredData = () => {
        const { searchTerm, records } = this.state;
        if (!searchTerm) return records;
        return records.filter(item =>
            (item.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    handleRowSelected = (selectedData) => {
            this.setState({ selectedRowData: selectedData }, ()=>{
                this.props.navigate('/edit-existing-client', { state: { selectedRow: selectedData } });
            });
        };

    render() {
        const filteredData = this.getFilteredData();

        return (
            <div className="main-page-body">
                <div className="main-page-container">
                    <div>
                        <ClientSearch onSearch={this.handleSearch} />
                    </div>
                    <div className="record-table-section">
                        <RecordTable rowData={filteredData}
                        onRowSelected={this.handleRowSelected} /> {}
                    </div>
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MainPage));
