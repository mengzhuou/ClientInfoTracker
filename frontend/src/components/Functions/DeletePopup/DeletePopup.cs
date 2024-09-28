/* Basic Styling */
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

/* Popup Styling */
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.popup-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}

/* Cancel Button */
.cancel-btn {
  background-color: transparent;
  border: none;
  color: #007BFF;
  font-size: 16px;
  cursor: pointer;
}

/* Confirm Button */
.confirm-btn {
  background-color: transparent;
  border: none;
  color: #007BFF;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}