import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to your backend's WebSocket server
const socket = io("https://train-booking-backend-ajzh.onrender.com", {
  transports: ["polling"],  // force polling instead of WebSocket
});

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch initial list of bookings
    fetch("https://train-booking-backend-ajzh.onrender.com/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Initial bookings fetched:", data);
        setBookings(data);
      })
      .catch((err) => console.error("Error fetching bookings:", err));

    // Listen for new booking events from backend
    socket.on("newBooking", (booking) => {
      console.log("📥 New booking received via socket:", booking);
      setBookings((prev) => [booking, ...prev]); // Add to top of list
    });

    // Cleanup on component unmount
    return () => {
      socket.off("newBooking");
    };
  }, []); // Runs once when component mounts

  return (
    <div style={{ margin: "20px auto", maxWidth: "500px" }}>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            Name: {booking.name}, Train No: {booking.trainNo}, Status:{" "}
            {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
