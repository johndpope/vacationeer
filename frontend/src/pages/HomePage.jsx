import React, { useEffect, useState } from 'react'
import { getHotelsCount, loadAllHotels } from '../actions/hotelActions'
import HotelCard from '../components/HotelCard'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import { Pagination } from 'antd'

const HomePage = () => {
  const [hotels, setHotels] = useState([])
  const [page, setPage] = useState(1)
  const [hotelsCount, setHotelsCount] = useState(0)

  useEffect(() => {
    importAllHotels()
  }, [page])

  useEffect(() => {
    getHotelsCount().then((resp) => setHotelsCount(resp.data))
  }, [])

  const importAllHotels = async () => {
    const resp = await loadAllHotels(page)
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

      <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
        <Pagination
          current={page}
          total={(hotelsCount / 6) * 10}
          onChange={(value) => setPage(value)}
        />
      </nav>
    </Layout>
  )
}

export default HomePage
