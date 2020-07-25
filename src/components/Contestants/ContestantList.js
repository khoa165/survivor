import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Table } from 'reactstrap';
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

const ContestantList = ({ list, onIconClick }) => (
  <Table striped hover className='mt-4' id='contestantList'>
    <thead className='thead-dark'>
      <tr>
        <th className='column-7over12-lg-1over3 pl-3 pl-md-4'>Contestants</th>
        <th className='column-none-lg-7over18'></th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-crown'></i>
        </th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-star'></i>
        </th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-heart'></i>
        </th>
        <th className='column-5over48 text-center'></th>
      </tr>
    </thead>
    <tbody>
      {list &&
        list.length > 0 &&
        list.map((contestant) => (
          <tr
            className={`${colorBasedOnAppearance(contestant.numberSeasons)}`}
            key={contestant.id}
          >
            <td className='column-7over12-lg-1over3 pl-3 pl-md-4'>
              <p className='contestantName'>{contestant.name}</p>
              <p className='d-lg-none'>
                {formatSeasonName(contestant.seasonsStat[0])}
              </p>
            </td>
            <td className='column-none-lg-7over18'>
              <p>{formatSeasonName(contestant.seasonsStat[0], true)}</p>
            </td>
            <td className='column-5over48 text-center'>
              <i
                className='fas fa-crown vote-icon'
                onClick={() => onIconClick(1, contestant.id)}
              ></i>
            </td>
            <td className='column-5over48 text-center'>
              <i
                className='far fa-star vote-icon'
                onClick={() => onIconClick(2, contestant.id)}
              ></i>
            </td>
            <td className='column-5over48 text-center'>
              <i
                className='far fa-heart vote-icon'
                onClick={() => onIconClick(3, contestant.id)}
              ></i>
            </td>

            <td className='column-5over48 text-center'>
              <Link
                className='text-dark'
                to={{
                  pathname: `${ROUTES.VIEW_CONTESTANTS}/${contestant.uid}`,
                  state: { contestant },
                }}
              >
                <i className='fas fa-external-link-alt'></i>
              </Link>
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);

export default ContestantList;
