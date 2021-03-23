import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { diffDays, isAlreadyBooked, read } from '../actions/hotelActions'
import moment from 'moment'
import { getCookie, isAuthenticated } from '../components/HelperFunctions'
import { getSessionId } from '../actions/stripeActions'
import { loadStripe } from '@stripe/stripe-js'

const ViewHotelPage = ({ match, history }) => {
  const [hotel, setHotel] = useState({})
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)

  const hotelId = match.params.hotelId

  useEffect(() => {
    loadHotel()
  }, [])

  useEffect(() => {
    if (isAuthenticated() && getCookie().token) {
      isAlreadyBooked(getCookie().token, hotelId).then((resp) => {
        if (resp.data.ok) setAlreadyBooked(true)
      })
    }
  }, [])

  const loadHotel = async () => {
    const resp = await read(match.params.hotelId)
    setHotel(resp.data)
    setImage(`${process.env.REACT_APP_API}/hotel/image/${resp.data._id}`)
  }

  const handleClick = async (e) => {
    e.preventDefault()

    if (!isAuthenticated() || !getCookie().token) {
      history.push('/login')
      return
    }
    setLoading(true)
    if (!isAuthenticated()) history.push('/login')

    const resp = await getSessionId(getCookie().token, match.params.hotelId)

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)

    stripe
      .redirectToCheckout({
        sessionId: resp.data.sessionId,
      })
      .then((result) => console.log(result))
  }

  return (
    <Layout>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>{hotel.title}</h2>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <br />
            <img src={image} alt={hotel.title} className='img img-fluid m-2' />
          </div>

          <div className='col-md-6'>
            <br />
            <b>{hotel.description}</b>
            <p className='alert alert-info mt-3'>€{hotel.price}</p>
            <p className='card-text'>
              <span className='text-primary'>
                for {diffDays(hotel.from, hotel.to)}{' '}
                {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
              </span>
            </p>
            <div className='d-flex'>
              <p className='mr-5'>
                From <br />{' '}
                {moment(new Date(hotel.from)).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p>
                To <br />{' '}
                {moment(new Date(hotel.to)).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className='btn btn-lg btn-primary mt-3 btn-raised'
              disabled={loading || alreadyBooked}
            >
              {loading
                ? 'Loading...'
                : alreadyBooked
                ? 'Already Booked'
                : isAuthenticated() && getCookie().token
                ? 'Book Now'
                : 'Log in to proceed with booking'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViewHotelPage
