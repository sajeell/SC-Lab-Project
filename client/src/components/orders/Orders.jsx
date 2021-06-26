import React, {useState, useEffect} from 'react'
import './Orders.css'

export default function Orders() {
  const [tickets, setTickets] = useState([])
  const [userId, setUserId] = useState(0)

  async function getProfile() {
    try {
      const res = await fetch('http://localhost:5000/user/credential', {
        method: 'POST',
        headers: {jwt_token: localStorage.getItem('customer_token')},
      })

      const parseData = await res.json()
      setUserId(parseData[0].id)
      getTickets(parseData[0].id)
    } catch (err) {
      console.error(err.message)
      console.log('Error in getting profile')
    }
  }

  async function getTickets(id) {
    try {
      const response = await fetch(`http://localhost:5000/ticket/${id}`, {
        method: 'GET',
      })

      const parseData = await response.json()
      setTickets(parseData)
    } catch (error) {
      console.error(error.message)
      console.log('Error in getting tickets')
    }
  }

  async function deleteTicket(
    id,
    route,
    quantity,
    source,
    destination,
    price,
    bookedOn
  ) {
    try {
      const body = {route, quantity}
      const response = await fetch(`http://localhost:5000/ticket/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const parseData = await response.json()

      const archiveOrderBody = {
        userId,
        source,
        destination,
        quantity,
        price,
        bookedOn,
      }

      const archived = await fetch(`http://localhost:5000/archive`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(archiveOrderBody),
      })
      const archivedData = await archived.json()

      alert(archivedData)
      alert(parseData)
    } catch (error) {
      console.error(error)
      alert('Error in deleting tickets')
    }
  }

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="Orders-wrapper">
      <div className="heading">
        <h3>Your Orders</h3>
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
            <th>Cancel</th>
          </tr>
          {tickets.map(ticket => (
            <tr>
              <td>{ticket.Route == null ? 'none' : ticket.id}</td>
              <td>
                {ticket.Route == null ? 'none' : ticket.Route.Source.name}
              </td>
              <td>
                {ticket.Route == null ? 'none' : ticket.Route.Destination.name}
              </td>
              <td>{ticket.Route == null ? 'none' : ticket.quantity}</td>
              <td>{ticket.Route == null ? 'none' : ticket.Route.seat_price}</td>
              <td>
                {ticket.Route == null
                  ? 0
                  : ticket.Route.seat_price * ticket.quantity}
              </td>
              <td>{ticket.Route == null ? 'none' : ticket.createdAt}</td>
              <td
                id="ticket-cancel"
                onClick={() => {
                  if (ticket.Route == null) {
                    return
                  } else {
                    deleteTicket(
                      ticket.id,
                      ticket.RouteId,
                      ticket.quantity,
                      ticket.Route.Source.name,
                      ticket.Route.Destination.name,
                      ticket.Route.seat_price,
                      ticket.createdAt
                    )
                  }
                }}>
                {ticket.Route == null ? '-' : 'CANCEL'}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}
