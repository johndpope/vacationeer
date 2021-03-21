import { useEffect, useState } from 'react'
import { Select } from 'antd'
import { getCookie } from '../components/HelperFunctions'
import { editHotel, read } from '../actions/hotelActions'
import { toast } from 'react-toastify'
import EditHotelForm from '../components/EditHotelForm'
import Layout from '../components/Layout'

const { Option } = Select

const EditHotelPage = ({ history, match }) => {
	const [ information, setInformation ] = useState({
		title: '',
		description: '',
		location: '',
		price: '',
		from: '',
		to: '',
		bed: ''
	})

	const [ image, setImage ] = useState('')

	const [ preview, setPreview ] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')

	const { title, description, location, price, from, to, bed } = information

	useEffect(() => {
		loadHotel()
	}, [])

	const loadHotel = async () => {
		const resp = await read(match.params.hotelId)
		setInformation({ ...information, ...resp.data })
		setPreview(`${process.env.REACT_APP_API}/hotel/image/${resp.data._id}`)
	}

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

		try {
			const resp = await editHotel(getCookie().token, hotelInfo, match.params.hotelId)
			toast.success('Hotel successfully updated!')

			setTimeout(() => {
				history.push('/user/dashboard/seller')
			}, 1500)
		} catch (error) {
			console.log(error)
			toast.error(error.response.data.error)
		}
	}

	const handleImageChange = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]))
		setImage(e.target.files[0])
	}

	const handleChange = (e) => {
		setInformation({ ...information, [e.target.name]: e.target.value })
	}

	return (
		<Layout>
			<div className='container-fluid bg-secondary p-5 text-center'>
				<h2>Edit Hotel</h2>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-10'>
						<br />
						<EditHotelForm
							information={information}
							setInformation={setInformation}
							handleChange={handleChange}
							handleImageChange={handleImageChange}
							handleSubmit={handleSubmit}
						/>
					</div>
					<div className='col-md-2'>
						<img src={preview} alt='preview-image' className='img img-fluid m-2' />
					</div>
					{/* <pre>{JSON.stringify(information, null, 4)}</pre> */}
				</div>
			</div>
		</Layout>
	)
}

export default EditHotelPage
