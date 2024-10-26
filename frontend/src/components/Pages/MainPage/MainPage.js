import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import RecordTable from "../../Functions/Table/RecordTable/RecordTable"; // Correct path to RecordTable
import ClientSearch from "../../ClientSearch";
import './MainPage.css';
import { getRecords } from "../../../connector.js";



class MainPage extends Component {
   constructor(props) {
       super(props);
       this.state = {
           records: [], // Full list of records
           searchTerm: '' // Current search term
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
        console.log("Search Term:", searchTerm);
       this.setState({ searchTerm });
   };


   getFilteredData = () => {
       const { searchTerm, records } = this.state;
       if (!searchTerm) return records; // Return all records if no search term
       return records.filter(item =>
           (item.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.date || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.receivedInterview || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.websiteLink || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.comment || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.click || "").toLowerCase().includes(searchTerm.toLowerCase())
       );
   };


   render() {
       const filteredData = this.getFilteredData(); // Get filtered data based on search term


       return (
           <div className="main-page-body">
               <div className="main-page-container">
                   <div className="search-section">
                       <ClientSearch onSearch={this.handleSearch} />
                   </div>
                   <div className="record-table-section">
                       <RecordTable rowData={filteredData} /> {/* Pass filtered data */}
                   </div>
               </div>
           </div>
       );
   }
}


export default withFuncProps(MainPage);