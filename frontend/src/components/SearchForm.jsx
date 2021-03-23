import React, { useState } from 'react'
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const { RangePicker } = DatePicker
const { Option } = Select

const SearchForm = () => {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [bed, setBed] = useState('')

  const history = useHistory()

  const handleSubmit = () => {
    if (!location || !date || !bed) return //toast.error("Fill out all fields")
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
  }

  return (
    <div className='d-flex pb-4'>
      <div
        className='w-100'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          defaultValue={location}
          selectProps={{
            onChange: (e) => setLocation(e.label),
            placeholder: 'Enter Destination',
            defaultInputValue: location,
          }}
        />
      </div>
      <RangePicker
        className='w-100'
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, 'days')
        }
      />

      <Select
        className='w-100'
        onChange={(value) => setBed(value)}
        size='large'
        placeholder='Number of beds'
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <SearchOutlined
        style={{ color: '#fff' }}
        onClick={handleSubmit}
        className='btn btn-primary p-3'
      />
    </div>
  )
}

export default SearchForm
