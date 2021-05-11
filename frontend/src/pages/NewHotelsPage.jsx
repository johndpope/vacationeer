import { useState } from 'react'
import { getCookie } from '../components/HelperFunctions'
import { createHotel } from '../actions/hotelActions'
import { toast } from 'react-toastify'
import CreateHotelForm from '../components/CreateHotelForm'

const NewHotelsPage = ({ history }) => {
  const [information, setInformation] = useState({
    title: '',
    description: '',
    image: '',
    location: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  })

  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  )

  const { title, description, image, location, price, from, to, bed } =
    information

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
      await createHotel(getCookie().token, hotelInfo)

      toast.success('Hotel successfully added!')

      setTimeout(() => {
        history.push('/user/dashboard/seller')
      }, 1500)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
    }
  }

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setInformation({ ...information, image: e.target.files[0] })
  }

  const handleChange = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className='container-fluid p-5 text-center'>
        <h2>Add Hotel</h2>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-10'>
            <br />
            <CreateHotelForm
              information={information}
              setInformation={setInformation}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className='col-md-2'>
            <img
              src={preview}
              alt='preview-hotel'
              className='img img-fluid m-2'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotelsPage
