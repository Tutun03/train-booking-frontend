import React,{useState} from "react";
import "./BookingForm.css";
function BookingForm(){
    const [name,setname]=useState("");
    const[trainNo,settraiNno]=useState("");

    const handleSubmit =async (e)=>{
        e.preventDefault();
        // alert(`Booking for ${name} on Train ${trainNo}`);
        try {
    const res = await fetch('https://train-booking-backend-ajzh.onrender.com/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, trainNo })
    });

    const data = await res.json();
    alert(data.message);
  } catch (error) {
    console.error('Booking error:', error);
  }
    }

    return(
<form onSubmit={handleSubmit} className="form-container">

    <h2>Book your train</h2>
    <label>
        Name:
        <input type="text" value={name} onChange={(e)=> setname(e.target.value)} required/> 
    </label>
    <br/><br/>
    <label>
        Train Number:
        <input type="text" value={trainNo} onChange={(e)=> settraiNno(e.target.value)} required/> 
    </label>
    <br/><br/>
    <button type="submit">Book Now</button>

</form>

    );
}
export default BookingForm;