import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (hotel) => {
  if(hotel && hotel.ratings) {
    let ratingsArray = hotel && hotel.ratings;
    let total = [];
    let length = ratingsArray.length;
  

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((h, n) => h + n, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div className="pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="orange"
            rating={result}
            editing={false}
          />{" "}
          ({hotel.ratings.length})
        </span>
      </div>
    );
  }
};