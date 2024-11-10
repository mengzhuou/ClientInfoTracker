import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import RecordTable from "../../Functions/Table/RecordTable/RecordTable";
import ClientSearch from "../../ClientSearch";
import './MainPage.css';
import { getRecords } from "../../../connector.js";

class MainPage extends Component {
   constructor(props) {
       super(props);
       this.state = {
           records: [], 
           searchTerm: '' 
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

   render() {
       const filteredData = this.getFilteredData();

       return (
           <div className="main-page-body">
               <div className="main-page-container">
                   <div>
                       <ClientSearch onSearch={this.handleSearch} />
                   </div>
                   <div className="record-table-section">
                       <RecordTable rowData={filteredData} /> {}
                   </div>
               </div>
           </div>
       );
   }
}

export default withFuncProps(MainPage);
