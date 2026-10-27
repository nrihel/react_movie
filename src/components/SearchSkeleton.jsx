import React from 'react'

const SearchSkeleton = () => {
  return (
    <>
        <div className="movie-search">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-search"></div>
            <div className="skeleton skeleton-button"></div>  
        </div>
        <div className="movie-list">
            <div className="movie">
                <div className="skeleton skeleton-card"></div>                
                <div className="skeleton skeleton-card"></div>                
                <div className="skeleton skeleton-card"></div>                
            </div>
        </div>
    </>
  )
}

export default SearchSkeleton;
