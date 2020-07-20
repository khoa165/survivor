import React from 'react';

const WinnerSlideshowItem = ({ data }) => {
  return (
    <div className='slideshow-item'>
      <img
        src={data.avatar}
        alt={data.name}
        className='slideshow-item-avatar'
      />
      <div className='slideshow-item-info'>
        <p className='h2'>{data.name}</p>
        <p className='h5'>{data.originalSeason}</p>
      </div>

      <div className='white-layover'></div>
      <div className='orange-layover'>
        <p className='h4 d-none d-md-block'>
          Winner of {data.winningSeason}{' '}
          {data.secondWinningSeason ? (
            <span className='d-inline-block'>
              {`& ${data.secondWinningSeason}`}
            </span>
          ) : null}
          {data.runnerUpSeason ? (
            <span className='d-inline-block'>
              {`& Runner-up of ${data.runnerUpSeason}`}
            </span>
          ) : null}
          {data.secondRunnerUpSeason ? (
            <span className='d-inline-block'>
              {`& 2nd Runner-up of ${data.secondRunnerUpSeason}`}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default WinnerSlideshowItem;
