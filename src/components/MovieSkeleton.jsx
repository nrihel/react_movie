import React from 'react'

const Skeleton = () => {
  return (
    <div className="details-card">
        <div className="details-body">
            <div className="details__top">
                <div className="details__header">
                    <div className="skeleton skeleton-button"></div>  
                    <div className="skeleton skeleton-title"></div>
                </div>
            </div>
            <div className="details__info--container skeleton-layout">
                <div className="skeleton skeleton-poster"></div>
                <div className="details__info">
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>
            </div>
        </div> 
    </div>
  );
};

export default Skeleton;
