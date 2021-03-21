import axios from 'axios'

export const createHotel = async (token, data) =>
	await axios.post(`${process.env.REACT_APP_API}/add-hotel`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const loadAllHotels = async () => await axios.get(`${process.env.REACT_APP_API}/hotels`)

export const diffDays = (from, to) => {
	const day = 24 * 60 * 60 * 1000
	const start = new Date(from)
	const end = new Date(to)
	const difference = Math.round(Math.abs((start - end) / day))
	return difference
}

export const hotelsSeller = async (token) =>
	await axios.get(`${process.env.REACT_APP_API}/hotels/seller`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const deleteHotel = async (token, hotelId) =>
	await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const read = async (hotelId) => await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`)

export const editHotel = async (token, data, hotelId) =>
	await axios.put(`${process.env.REACT_APP_API}/edit-hotel/${hotelId}`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const userHotelBookings = async (token) =>
	await axios.get(`${process.env.REACT_APP_API}/user/hotel-bookings`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const isAlreadyBooked = async (token, hotelId) =>
	await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

export const searchListings = async (query) => await axios.post(`${process.env.REACT_APP_API}/search-listings`, query)
