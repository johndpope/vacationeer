import { useState, useEffect } from 'react'
import queryString from 'query-string'
import SearchForm from '../components/SearchForm'
import { searchListings } from '../actions/hotelActions'
import HotelCard from '../components/HotelCard'

const SearchResultPage = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search)
    searchListings({ location, date, bed }).then((resp) => {
      setHotels(resp.data)
    })
    // eslint-disable-next-line
  }, [window.location.search])

  return (
    <>
      <div className='col'>
        <br />
        <SearchForm />
      </div>
      <div className='container'>
        <div className='row'>
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchResultPage
