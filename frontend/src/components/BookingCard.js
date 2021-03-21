import { currencyFormatter } from '.././actions/stripeActions'
import { diffDays } from '../actions/hotelActions'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import OrderModal from './OrderModal'

const BookingCard = ({ hotel, session, orderedBy }) => {
	const [ showModal, setShowModal ] = useState(false)

	const history = useHistory()
	return (
		<div className='card mb-3'>
			<div className='row no-gutters'>
				<div className='col-md-4'>
					{hotel.image && hotel.image.contentType ? (
						<img
							src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
							alt='default hotel image'
							className='card-image img img-fluid'
						/>
					) : (
						<img
							src='https://via.placeholder.com/900x500.png?text=Vacationeer+Booking'
							alt='default hotel image'
							className='card-image img img-fluid'
						/>
					)}
				</div>

				<div className='col-md-8'>
					<div className='card-body'>
						<h3 className='card-title'>
							{hotel.title}{' '}
							<span className='float-right text-primary'>
								{currencyFormatter({
									amount: hotel.price * 100,
									currency: 'usd'
								})}
							</span>
						</h3>

						<p className='alert alert-info'>{hotel.location}</p>
						<p className='card-text'>{`${hotel.description.substring(1, 200)}...`}</p>
						<p className='card-text'>
							<span className='float-right text-primary'>
								for {diffDays(hotel.from, hotel.to)} {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
							</span>
						</p>
						<p className='card-text'>
							{hotel.bed}
							{hotel.bed === 1 ? ' bed' : ' beds'}
						</p>
						<p className='card-text'>Available from {new Date(hotel.from).toLocaleDateString()}</p>

						{showModal && (
							<OrderModal showModal={showModal} setShowModal={setShowModal} session={session} orderedBy={orderedBy} />
						)}

						<div className='d-flex justify-content-between h4'>
							<button onClick={() => setShowModal(!showModal)} className='btn btn-primary'>
								Show Payment Information
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookingCard
