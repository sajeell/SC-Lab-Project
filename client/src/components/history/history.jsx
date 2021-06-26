import React, {useState, useEffect} from 'react'
import './history.css'

export default function History() {
  const [tickets, setTickets] = useState([])
  async function getProfile() {
    try {
      const res = await fetch('http://localhost:5000/user/credential', {
        method: 'POST',
        headers: {jwt_token: localStorage.getItem('customer_token')},
      })

      const parseData = await res.json()
      localStorage.setItem('userId', parseData[0].id)
      getTickets()
    } catch (err) {
      console.error(err.message)
      console.log('Error in getting profile')
    }
  }

  async function getTickets() {
    try {
      const id = localStorage.getItem('userId')
      const response = await fetch(`http://localhost:5000/archive/${id}`, {
        method: 'GET',
      })

      const parseData = await response.json()
      console.log(parseData)
      setTickets(parseData)
    } catch (error) {
      console.error(error.message)
      console.log('Error in getting archived tickets')
    }
  }

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="Orders-wrapper">
      <div className="heading">
        <h3>Your History</h3>
      </div>
      <div className="orders-table">
        <table>
          <tr>
            <th>Id</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Quantity</th>
            <th>Ticket Price</th>
            <th>Total Price</th>
            <th>Booked On</th>
            <th>Archived On</th>
          </tr>
          {tickets.map(ticket => (
            <tr>
              <td>{ticket.id}</td>
              <td>{ticket.source}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.quantity}</td>
              <td>{ticket.price}</td>
              <td>{ticket.quantity * ticket.price}</td>
              <td>{ticket.bookedOn}</td>
              <td>{ticket.createdAt}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}
