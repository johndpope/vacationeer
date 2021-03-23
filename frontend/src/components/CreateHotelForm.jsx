import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { DatePicker, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const CreateHotelForm = ({
  information,
  setInformation,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, description, price, location } = information

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-secondary m-2 text-left'>
          Image
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            accept='image/*'
            hidden
          />
        </label>

        <input
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Title'
          className='form-control m-2'
          value={title}
          autoFocus
        />

        <textarea
          name='description'
          onChange={handleChange}
          placeholder='Description'
          className='form-control m-2'
          value={description}
          style={{ height: '100px' }}
        />

        <div
          className='m-2 w-100 h-100'
          value={location}
          onChange={(e) =>
            setInformation({ ...information, location: e.target.value })
          }
        >
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            selectProps={{
              location,
              onChange: (e) =>
                setInformation({ ...information, location: e.label }),
              placeholder: 'Enter Location',
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
        onChange={(date, dateString) =>
          setInformation({ ...information, from: dateString })
        }
        disabledDate={(currentDate) =>
          currentDate && currentDate.valueOf() < moment().subtract(1, 'days')
        }
      />

      <DatePicker
        placeholder='To'
        className='form-control m-2'
        onChange={(date, dateString) =>
          setInformation({ ...information, to: dateString })
        }
        disabledDate={(currentDate) =>
          currentDate && currentDate.valueOf() < moment().subtract(1, 'days')
        }
      />

      <button className='btn btn-outline-primary m-2'>Save</button>
    </form>
  )
}

export default CreateHotelForm
