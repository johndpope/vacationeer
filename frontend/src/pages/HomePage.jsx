import React, { useEffect, useState } from 'react'
import { loadAllHotels } from '../actions/hotelActions'
import HotelCard from '../components/HotelCard'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'

const HomePage = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    importAllHotels()
  }, [])

  const importAllHotels = async () => {
    const resp = await loadAllHotels()
    setHotels(resp.data)
  }
  return (
    <Layout>
      <div className='container-fluid backround-img p-5 text-center'>
        <h1 className='primary-heading'>All Hotels</h1>
      </div>
      <div className='col'>
        <br />
        <SearchForm />
      </div>
      <div className='container-fluid'>
        <br />
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </Layout>
  )
}

export default HomePage
