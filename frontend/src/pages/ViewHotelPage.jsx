import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import {
  diffDays,
  isAlreadyBooked,
  read,
  hotelStar,
} from '../actions/hotelActions'
import moment from 'moment'
import { getCookie, isAuthenticated } from '../components/HelperFunctions'
import { getSessionId } from '../actions/stripeActions'
import { loadStripe } from '@stripe/stripe-js'
import StarRating from 'react-star-ratings'
import RatingModal from '../components/RatingModal'
import { Card, Button } from 'antd'
import { showAverage } from '../components/Rating'

const ViewHotelPage = ({ match, history }) => {
  const [hotel, setHotel] = useState({})
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)
  const [star, setStar] = useState(0)

  const hotelId = match.params.hotelId

  useEffect(() => {
    loadHotel()
  }, [])

  useEffect(() => {
    if (hotel.ratings && isAuthenticated()) {
      let existingRatingObject = hotel.ratings.find(
        (ele) => ele.postedBy.toString() === isAuthenticated()._id.toString()
      )
      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

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
    setLoading(true)

    if (!isAuthenticated() || !getCookie().token) {
      history.push({
        pathname: '/login',
        state: { from: `/hotel/${hotelId}` },
      })
    }

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
      <div className='container-fluid p-5'>
        <h2 className='text-center'>{hotel.title}</h2>
        <Button
          className='btn btn-raised btn-primary'
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <br />
            <img
              src={image}
              alt={hotel.title}
              className='img img-fluid m-2 hotel-img'
            />
          </div>

          <div className='col-md-6'>
            <br />
            <b>{hotel.description}</b>
            <p className='alert alert-info mt-3'>€{hotel.price}</p>
            <div className='card-text'>
              <span className='text-primary'>
                for {diffDays(hotel.from, hotel.to)}{' '}
                {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
              </span>

              <div className='d-flex align-items-center'>
                <Card
                  className='w-25 m-2 mr-5 d-flex justify-content-center align-items-center'
                  style={{ maxHeight: '75px' }}
                >
                  <RatingModal>
                    <StarRating
                      name={hotel._id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={(newRating, name) => {
                        setStar(newRating)
                        hotelStar(name, newRating, getCookie().token).then(
                          (resp) => {
                            loadHotel()
                          }
                        )
                      }}
                      isSelectable={true}
                      starRatedColor='orange'
                      starHoverColor='orange'
                    />
                  </RatingModal>
                </Card>

                {hotel && hotel.ratings && hotel.ratings.length > 0 ? (
                  showAverage(hotel)
                ) : (
                  <div className='text-danger pt-1 pb-3'>No ratings yet</div>
                )}
              </div>
            </div>
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
