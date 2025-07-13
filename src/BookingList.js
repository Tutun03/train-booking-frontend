import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://train-booking-backend-ajzh.onrender.com");
function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    //fetch initial bookings
    fetch("https://train-booking-backend-ajzh.onrender.com/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));

       socket.on("newBooking", (booking)=>{
    setBookings((prev)=> [booking, ...prev]);
  });
  // Cleanup on unmount
  return () => socket.off("newBooking");
  }, []);

 
 

  return(
    <div style={{ margin: "20px auto", maxWidth: "500px" }}>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            Name: {booking.name}, Train No: {booking.trainNo}, Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BookingList;