import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { DatePicker, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const EditHotelForm = ({ information, setInformation, handleChange, handleImageChange, handleSubmit }) => {
	const { title, description, price, location, bed, from, to } = information

	return (
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
				{location &&
				location.length && (
					<div
						value={location}
						onChange={(e) => setInformation({ ...information, location: e.target.value })}
						className='m-2 w-100 h-100'
					>
						<GooglePlacesAutocomplete
							apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
							defaultValue={location}
							selectProps={{
								onChange: (e) => setInformation({ ...information, location: e.label }),
								placeholder: 'Enter Location',
								defaultInputValue: location
								// styles: {
								// 	input: (provided) => ({
								// 		...provided,
								// 		color: '#0C71E0'
								// 	}),
								// 	option: (provided) => ({
								// 		...provided,
								// 		color: '#0C71E0'
								// 	}),
								// 	singleValue: (provided) => ({
								// 		...provided,
								// 		color: '#0C71E0'
								// 	})
								// }
							}}
						/>
					</div>
				)}
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
					value={bed}
				>
					<Option key={1}>{1}</Option>
					<Option key={2}>{2}</Option>
					<Option key={3}>{3}</Option>
					<Option key={4}>{4}</Option>
				</Select>
			</div>

			{from && (
				<DatePicker
					defaultValue={moment(from, 'YYYY-MM-DD')}
					placeholder='From'
					className='form-control m-2'
					onChange={(date, dateString) => setInformation({ ...information, from: dateString })}
					disabledDate={(currentDate) => currentDate && currentDate.valueOf() < moment().subtract(1, 'days')}
				/>
			)}

			{to && (
				<DatePicker
					defaultValue={moment(to, 'YYYY-MM-DD')}
					placeholder='To'
					className='form-control m-2'
					onChange={(date, dateString) => setInformation({ ...information, to: dateString })}
					disabledDate={(currentDate) => currentDate && currentDate.valueOf() < moment().subtract(1, 'days')}
				/>
			)}

			<button className='btn btn-outline-primary m-2'>Save</button>
		</form>
	)
}

export default EditHotelForm
