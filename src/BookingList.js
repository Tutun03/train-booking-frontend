import React, { useEffect, useState } from "react";
function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
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