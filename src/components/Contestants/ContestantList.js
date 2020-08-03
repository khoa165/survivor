import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Table } from 'reactstrap';
import { ImageSpinner } from '../Layout/Spinner';
import './ContestantList.scss';

const colorBasedOnAppearance = (numberSeasons) => {
  switch (numberSeasons) {
    case 1:
      return 'table-default';
    case 2:
      return 'table-warning';
    case 3:
      return 'table-success';
    case 4:
      return 'table-primary';
    case 5:
      return 'table-danger';
    default:
      return 'table-default';
  }
};

const formatSeasonName = (originalSeason, addSpace = false) => {
  const { seasonNumber, seasonName } = originalSeason;
  if (seasonNumber >= 10) {
    return `[${seasonNumber}] ${addSpace ? '\xa0\xa0\xa0' : ''} ${seasonName}`;
  } else {
    return `[0${seasonNumber}] ${addSpace ? '\xa0\xa0\xa0' : ''} ${seasonName}`;
  }
};

const ContestantList = ({
  list,
  loading,
  onIconClick,
  onViewContestantsByGroup,
  GOATs,
  legends,
  favorites,
  isSearching,
  viewingGOATs,
  viewingLegends,
  viewingFavorites,
}) => (
  <Table striped hover className='mt-4' id='contestantList'>
    <thead className='thead-dark'>
      <tr>
        <th className='column-7over12-lg-1over3 pl-3 pl-md-4'>Contestants</th>
        <th className='column-none-lg-7over18'></th>
        <th
          className={`column-5over48 text-center table-header-button ${
            viewingGOATs ? 'clicked' : ''
          }`}
          onClick={() => onViewContestantsByGroup(1)}
        >
          <i className='fas fa-crown'></i>
        </th>
        <th
          className={`column-5over48 text-center table-header-button ${
            viewingLegends ? 'clicked' : ''
          }`}
          onClick={() => onViewContestantsByGroup(2)}
        >
          <i className='fas fa-star'></i>
        </th>
        <th
          className={`column-5over48 text-center table-header-button ${
            viewingFavorites ? 'clicked' : ''
          }`}
          onClick={() => onViewContestantsByGroup(3)}
        >
          <i className='fas fa-heart'></i>
        </th>
        <th className='column-5over48 text-center'></th>
      </tr>
    </thead>
    {isSearching && !loading && loading !== null && loading !== undefined ? (
      <tr className='animatedSpinnerWrapper'>
        <td colSpan='6'>
          <ImageSpinner />
        </td>
      </tr>
    ) : (
      <tbody>
        {list &&
          list.length > 0 &&
          list.map((contestant) => (
            <tr
              className={`${colorBasedOnAppearance(
                contestant.basicInfo.numberSeasons
              )}`}
              key={contestant.id}
            >
              <td className='column-7over12-lg-1over3 pl-3 pl-md-4'>
                <p className='contestantName'>{contestant.basicInfo.name}</p>
                <p className='d-lg-none'>
                  {formatSeasonName(contestant.seasonsInfo[0])}
                </p>
              </td>
              <td className='column-none-lg-7over18'>
                <p>{formatSeasonName(contestant.seasonsInfo[0], true)}</p>
              </td>
              <td className='column-5over48 text-center'>
                <i
                  className={`${
                    GOATs.includes(contestant.id) ? 'highlighted' : null
                  } fas fa-crown vote-icon`}
                  onClick={() => onIconClick(1, contestant.id)}
                ></i>
              </td>
              <td className='column-5over48 text-center'>
                <i
                  className={`${
                    legends.includes(contestant.id) ? 'fas' : 'far'
                  } fa-star vote-icon`}
                  onClick={() => onIconClick(2, contestant.id)}
                ></i>
              </td>
              <td className='column-5over48 text-center'>
                <i
                  className={`${
                    favorites.includes(contestant.id) ? 'fas' : 'far'
                  } fa-heart vote-icon`}
                  onClick={() => onIconClick(3, contestant.id)}
                ></i>
              </td>

              <td className='column-5over48 text-center'>
                <Link
                  className='text-dark'
                  to={{
                    pathname: `${ROUTES.VIEW_CONTESTANTS}/${contestant.id}`,
                    state: { contestant },
                  }}
                >
                  <i className='fas fa-external-link-alt'></i>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    )}
  </Table>
);

export default ContestantList;
