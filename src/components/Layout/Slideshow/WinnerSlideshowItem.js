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
        <h2>{data.name}</h2>
        <div className='extra-info'>
          <p>
            {` ${data.totalDaysLasted} days, `}
            {`${
              data.totalTribalWins + data.totalIndividualWins
            } challenge wins`}
          </p>
        </div>
      </div>

      <div className='white-layover'></div>
      <div className='orange-layover'>
        <p className='h4 m-0'>
          Winner of {data.winningSeason}{' '}
          <span className='d-none d-xl-block'>
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
          </span>
        </p>
      </div>
    </div>
  );
};

export default WinnerSlideshowItem;
