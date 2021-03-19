import { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

// const config = {
// 	appId: process.env.REACT_APP_ALGOLIA_APP_ID,
// 	apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
// 	language: 'en',
// 	countries: [ 'se' ]
// }

console.log(process.env.REACT_APP_GOOGLE_API_KEY)

const NewHotelsPage = () => {
	const [ information, setInformation ] = useState({
		title: '',
		description: '',
		location: '',
		image: '',
		price: '',
		from: '',
		to: '',
		bed: ''
	})

	const [ preview, setPreview ] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')

	const { title, description, location, image, price, from, to, bed } = information

	const handleSubmit = () => {}

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

				<GooglePlacesAutocomplete
					apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
					className='form-control m-2'
					placeholder='Location'
					defaultValue={location}
					onChange={({ suggestion }) => setInformation({ ...information, location: suggestion.value })}
					style={{ height: '50px' }}
				/>

				<input
					type='number'
					name='price'
					onChange={handleChange}
					placeholder='Price'
					className='form-control m-2'
					value={price}
				/>

				<input
					type='number'
					name='bed'
					onChange={handleChange}
					placeholder='Number of beds'
					className='form-control m-2'
					value={bed}
				/>
			</div>

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
