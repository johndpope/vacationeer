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
import { LoadingOutlined } from '@ant-design/icons'

const ViewHotelPage = ({ match, history }) => {
  const [hotel, setHotel] = useState({})
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)
  const [star, setStar] = useState(0)

  const hotelId = match.params.hotelId

  useEffect(() => {
    loadHotel()
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
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
  }, [hotelId])

  const loadHotel = async () => {
    setBuffering(true)
    const resp = await read(match.params.hotelId)
    setHotel(resp.data)
    setImage(`${process.env.REACT_APP_API}/hotel/image/${resp.data._id}`)
    setBuffering(false)
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

    stripe.redirectToCheckout({
      sessionId: resp.data.sessionId,
    })
  }

  return (
    <Layout>
      {buffering && (
        <div className='text-center mt-5'>
          <LoadingOutlined className='display-1 text-primary mt-5' />
        </div>
      )}
      {!buffering && (
        <div className='container-fluid p-5'>
          <h2 className='text-center secondary-heading'>
            <span>{hotel.title}</span>
          </h2>
          <Button
            className='btn btn-raised btn-primary back-button'
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <div className='d-flex justify-content-center'>
            <img
              src={image}
              alt={hotel.title}
              className='img img-fluid intro w-100 m-2 hotel-img mb-5 mt-5'
            />
          </div>
        </div>
      )}

      {!buffering && (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 mb-5'>
              <br />
              <b className='hotel-description'>{hotel.description}</b>

              <div className='text-center'>
                <h4 className='alert alert-info mt-5 mb-5'>€{hotel.price}</h4>

                <div className='card-text'>
                  <span className='text-primary h5'>
                    for {diffDays(hotel.from, hotel.to)}{' '}
                    {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                  </span>
                </div>
                <div className='d-flex align-items-center justify-content-center m-5'>
                  <Card className='w-25 m-2 mr-5 d-flex justify-content-center align-items-center'>
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
              <div className='d-flex justify-content-center'>
                <p className='mr-5'>
                  From <br />{' '}
                  {moment(new Date(hotel.from)).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </p>
                <p>
                  To <br />{' '}
                  {moment(new Date(hotel.to)).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
              </div>

              <div className='text-center'>
                <button
                  onClick={handleClick}
                  className='btn btn-primary mt-5 btn-raised'
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
                <div className='m-5'>
                  <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ViewHotelPage
