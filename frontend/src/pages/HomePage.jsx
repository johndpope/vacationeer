import React, { useEffect, useState } from 'react'
import {
  getHotelsCount,
  loadAllHotels,
  searchListings,
} from '../actions/hotelActions'
import HotelCard from '../components/HotelCard'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'
import { Pagination, Menu, Slider, Button } from 'antd'
import { EuroOutlined, LoadingOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/Star'

const { SubMenu } = Menu

const HomePage = () => {
  const [hotels, setHotels] = useState([])
  const [page, setPage] = useState(1)
  const [hotelsCount, setHotelsCount] = useState(0)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [star, setStar] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    importAllHotels()
  }, [page])

  useEffect(() => {
    getHotelsCount().then((resp) => setHotelsCount(resp.data))
  }, [])

  const fetchHotels = (arg) => {
    searchListings(arg).then((res) => {
      setHotels(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchHotels({ price })
  }, [ok])

  const importAllHotels = async () => {
    setLoading(true)
    const resp = await loadAllHotels(page)
    setHotels(resp.data)
    setLoading(false)
  }

  const handleSlider = (value) => {
    setPrice(value)
    setStar('')
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  const displayStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  const handleStarClick = (number) => {
    setLoading(true)
    setPrice([0, 0])
    setStar(number)
    fetchHotels({ stars: number })
  }

  const resetFilters = () => {
    setPrice([0, 0])
    setStar('')
    importAllHotels()
  }

  return (
    <Layout>
      <div className='container-fluid backround-img p-5 text-center'>
        <h1 className='primary-heading'>All TRAVEL EXPERIENCES</h1>
      </div>
      <div className='col'>
        <br />
        <SearchForm />
        <br />
      </div>
      <div className='container-fluid'>
        <Menu mode='horizontal'>
          <SubMenu
            key='1'
            title={
              <span className='h6'>
                <EuroOutlined /> Filter by price
              </span>
            }
          >
            <div>
              <Slider
                className='ml-4 mr-4'
                style={{ width: '500px' }}
                tipFormatter={(v) => `€${v}`}
                range
                value={price}
                onChange={handleSlider}
                max='45000'
              />
            </div>
          </SubMenu>

          <SubMenu
            key='2'
            title={
              <span className='h6'>
                <StarOutlined /> Filter by Rating
              </span>
            }
          >
            <div>{displayStars()}</div>
          </SubMenu>

          <SubMenu
            key='3'
            title={<Button onClick={resetFilters}>Reset Filters</Button>}
          ></SubMenu>
        </Menu>
        <br />
        {loading && (
          <div className='text-center mt-5'>
            <LoadingOutlined className='display-1 text-primary mt-5' />
          </div>
        )}
        {!loading &&
          hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
      </div>

      {!loading && (
        <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
          <Pagination
            current={page}
            total={(hotelsCount / 15) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      )}
    </Layout>
  )
}

export default HomePage
