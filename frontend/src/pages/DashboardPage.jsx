import React, { useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import Layout from '../components/Layout'
import StripeNav from '../components/StripeNav'
import { Link } from 'react-router-dom'
import { getCookie } from '../components/HelperFunctions'
import { userHotelBookings } from '../actions/hotelActions'
import BookingCard from '../components/BookingCard'

const DashboardPage = () => {
  const [booking, setBooking] = useState([])
  useEffect(() => {
    loadUserBookings()
  }, [])

  const loadUserBookings = async () => {
    const resp = await userHotelBookings(getCookie().token)
    setBooking(resp.data)
  }

  return (
    <Layout>
      <div className='container-fluid backround2-img p-5'>
        <StripeNav />
      </div>

      <div className='container-fluid p-4'>
        <DashboardNav />
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <h2>Your Bookings</h2>
          </div>

          <div className='col-md-2'>
            <Link to='/' className='btn btn-primary btn-raised'>
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            orderedBy={b.orderedBy}
            session={b.session}
          />
        ))}
      </div>
    </Layout>
  )
}

export default DashboardPage
