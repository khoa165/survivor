import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import './Slideshow.scss';

const Slideshow = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = data.map((legend) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={legend.id}
      >
        <div className='slideshow-item'>
          <img
            src={legend.avatar}
            alt={legend.name}
            className='slideshow-item-avatar'
          />
          <div className='slideshow-item-info'>
            <p className='h2'>{legend.name}</p>
            <p className='h5'>{legend.originalSeason}</p>
          </div>

          <div className='white-layover'></div>
          <div className='orange-layover'>
            <p className='h4 d-none d-md-block'>
              Winner of {legend.winningSeason}{' '}
              {legend.secondHighlightedSeason ? (
                <span className='d-inline-block'>
                  {'& '}
                  {legend.hasTwoWins ? null : 'Runner-up of '}
                  {legend.secondHighlightedSeason}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      pause={false}
    >
      {/* <CarouselIndicators
        items={data}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      /> */}
      {slides}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
};
export default Slideshow;
