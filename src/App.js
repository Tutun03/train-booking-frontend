import React from "react";  
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

function App() {
  return (
    <div style={{ textAlign:"center",  padding:"20px", fontFamily: "Arial"}}>
      <h1>Train ticket booking</h1>
      <BookingForm/>
      <hr/>
      <BookingList />
    </div>
  );
}

export default App;
