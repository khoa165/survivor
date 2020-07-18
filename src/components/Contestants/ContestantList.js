import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Spinner from '../Spinner/Spinner';

const ContestantList = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [contestants, setContestants] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.contestants().on('value', (snapshot) => {
      const contestantsObject = snapshot.val();

      const contestantsList = Object.keys(contestantsObject).map((key) => ({
        ...contestantsObject[key],
        uid: key,
      }));

      setContestants(contestantsList);
      setLoading(false);
    });

    return () => {
      firebase.contestants().off();
    };
  }, [firebase]);

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

  const formatSeasonName = (originalSeason) => {
    const { seasonNumber, seasonName } = originalSeason;
    if (seasonNumber >= 10) {
      return `[${seasonNumber}] \xa0\xa0\xa0 ${seasonName}`;
    } else {
      return `[0${seasonNumber}] \xa0\xa0\xa0 ${seasonName}`;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container className='p-0'>
      <Table striped hover className='mt-4'>
        <thead className='thead-dark'>
          <tr className='d-flex'>
            <th className='col-6 px-4'>Contestant name</th>
            <th className='col-6 text-center'>Original season</th>
          </tr>
        </thead>
        <tbody>
          {contestants.map((contestant) => (
            <tr
              className={`d-flex ${colorBasedOnAppearance(
                contestant.numberSeasons
              )}`}
              key={contestant.uid}
            >
              <td className='col-6 px-4'>{contestant.name}</td>
              <td className='col-6 px-4 d-flex justify-content-between'>
                {formatSeasonName(contestant.seasonsStat[0])}
                <Link
                  className='text-dark'
                  to={{
                    pathname: `${ROUTES.CONTESTANT_DETAIL}/${contestant.uid}`,
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
    </Container>
  );
};

export default withFirebase(ContestantList);
