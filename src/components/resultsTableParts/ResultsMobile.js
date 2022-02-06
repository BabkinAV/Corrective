import React from 'react';
import { connect } from 'react-redux';

import getComparator from '../../helpers/getComparator';
import ResultSingleMobile from './ResultSingleMobile';

//MUI stuff

import { Box } from '@mui/material';

function ResultsMobile({ rows, order, orderBy, selected, onCheckboxClick, authenticated }) {
  const isSelected = (docId) => selected.indexOf(docId) !== -1;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {rows
        .slice()
        .sort(getComparator(order, orderBy))
        .map((row) => {
          const isItemSelected = isSelected(row.docId);
          return (
            <ResultSingleMobile
              key={row.docId}
              isItemSelected={isItemSelected}
              number={row.number}
              title = {row.title}
              type={row.type}
              subsystem={row.subsystem}
              link={row.link}
              status={row.status}
              publishedAt={row.publishedAt}
              docId={row.docId}
              onCheckboxClick={onCheckboxClick}
              authenticated={authenticated}
            />
          );
        })}
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    authenticated : state.ui.authenticated,
  }
}


export default connect(mapStateToProps)(ResultsMobile);
