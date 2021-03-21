import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { searchListings } from "../actions/hotelActions";
import HotelCard from "../components/HotelCard"


const SearchResultPage = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    searchListings({ location, date, bed }).then((resp) => {
      setHotels(resp.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <SearchForm />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResultPage;
