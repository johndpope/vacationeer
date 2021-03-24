import { currencyFormatter } from '../actions/stripeActions'
import { diffDays } from '../actions/hotelActions'
import { Link, useHistory } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { showAverage } from './Rating'

const HotelCard = ({
  hotel,
  handleDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory()
  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-md-4'>
          {hotel.image && hotel.image.contentType ? (
            <img
              src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
              alt='default hotel'
              className='card-image img img-fluid'
            />
          ) : (
            <img
              src='https://via.placeholder.com/900x500.png?text=Vacationeer+Booking'
              alt='default hotel'
              className='card-image img img-fluid'
            />
          )}
        </div>

        <div className='col-md-8'>
          <div className='card-body'>
            <h3 className='card-title'>
              {hotel.title}{' '}
              <span className='float-right'>
                {currencyFormatter({
                  amount: hotel.price * 100,
                  currency: 'eur',
                })}
              </span>
            </h3>

            <p className='alert alert-info'>{hotel.location}</p>
            <p className='card-text'>{`${hotel.description.substring(
              0,
              400
            )}...`}</p>
            {hotel && hotel.ratings && hotel.ratings.length > 0 ? (
              showAverage(hotel)
            ) : (
              <div className='text-danger pt-1 pb-3'>No ratings yet</div>
            )}
            <p className='card-text'>
              <span className='text-primary'>
                for {diffDays(hotel.from, hotel.to)}{' '}
                {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
              </span>
            </p>
            <p className='card-text'>
              {hotel.bed}
              {hotel.bed === 1 ? ' bed on hand' : ' beds on hand'}
            </p>
            <p className='card-text'>
              Available from {new Date(hotel.from).toLocaleDateString()}
            </p>

            <div className='d-flex justify-content-between h4'>
              {showViewMoreButton && (
                <button
                  onClick={() => history.push(`/hotel/${hotel._id}`)}
                  className='btn btn-primary btn-raised'
                >
                  Show More
                </button>
              )}
              {owner && (
                <>
                  <Link to={`/hotel/edit/${hotel._id}`}>
                    <EditOutlined />
                  </Link>
                  <DeleteOutlined
                    onClick={() => handleDelete(hotel._id)}
                    className='text-danger'
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
