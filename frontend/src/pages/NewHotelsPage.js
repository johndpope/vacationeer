import { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import { isAuthenticated, getCookie } from '../components/HelperFunctions'
import { createHotel } from '../actions/hotelActions'
import { toast } from 'react-toastify'

const { Option } = Select

const NewHotelsPage = () => {
	const [ information, setInformation ] = useState({
		title: '',
		description: '',
		image: '',
		location: '',
		price: '',
		from: '',
		to: '',
		bed: ''
	})

	const [ preview, setPreview ] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')

	const { title, description, image, location, price, from, to, bed } = information

	const handleSubmit = async (e) => {
		e.preventDefault()

		const hotelInfo = new FormData()

		hotelInfo.append('title', title)
		hotelInfo.append('description', description)
		hotelInfo.append('location', location)
		hotelInfo.append('price', price)
		image && hotelInfo.append('image', image)
		hotelInfo.append('from', from)
		hotelInfo.append('to', to)
		hotelInfo.append('bed', bed)

		const resp = await createHotel(getCookie().token, hotelInfo)

		toast.success('Hotel successfully added!')

		setTimeout(() => {
			window.location.reload()
		}, 1000)
	}

	const handleImageChange = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]))
		setInformation({ ...information, image: e.target.files[0] })
	}

	const handleChange = (e) => {
		setInformation({ ...information, [e.target.name]: e.target.value })
	}

	const hotelForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='btn btn-outline-secondary btn-block m-2 text-left'>
					Image
					<input type='file' name='image' onChange={handleImageChange} accept='image/*' hidden />
				</label>

				<input
					type='text'
					name='title'
					onChange={handleChange}
					placeholder='Title'
					className='form-control m-2'
					value={title}
				/>

				<textarea
					name='description'
					onChange={handleChange}
					placeholder='Description'
					className='form-control m-2'
					value={description}
				/>

				<div
					className='location'
					value={location}
					onChange={(e) => setInformation({ ...information, location: e.target.value })}
				>
					<GooglePlacesAutocomplete
						apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
						selectProps={{
							location,
							onChange: (e) => setInformation({ ...information, location: e.label }),
							className: 'm-2 w-100 h-100',
							placeholder: 'Enter Location'
						}}
					/>
				</div>

				<input
					type='number'
					name='price'
					onChange={handleChange}
					placeholder='Price'
					className='form-control m-2'
					value={price}
				/>

				<Select
					onChange={(value) => setInformation({ ...information, bed: value })}
					className='w-100 m-2'
					size='large'
					placeholder='Number of beds'
				>
					<Option key={1}>{1}</Option>
					<Option key={2}>{2}</Option>
					<Option key={3}>{3}</Option>
					<Option key={4}>{4}</Option>
				</Select>
			</div>

			<DatePicker
				placeholder='From'
				className='form-control m-2'
				onChange={(date, dateString) => setInformation({ ...information, from: dateString })}
				disabledDate={(currentDate) => currentDate && currentDate.valueOf() < moment().subtract(1, 'days')}
			/>

			<DatePicker
				placeholder='To'
				className='form-control m-2'
				onChange={(date, dateString) => setInformation({ ...information, to: dateString })}
				disabledDate={(currentDate) => currentDate && currentDate.valueOf() < moment().subtract(1, 'days')}
			/>

			<button className='btn btn-outline-primary m-2'>Save</button>
		</form>
	)

	return (
		<div>
			<div className='container-fluid bg-secondary p-5 text-center'>
				<h2>Add Hotel</h2>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-10'>
						<br />
						{hotelForm()}
					</div>
					<div className='col-md-2'>
						<img src={preview} alt='preview-image' className='img img-fluid m-2' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewHotelsPage
