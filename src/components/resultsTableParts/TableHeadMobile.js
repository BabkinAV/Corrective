import React from 'react';
import { Box, FormControlLabel, Button, Typography } from '@mui/material';
import { connect } from 'react-redux';

import TableSortLabel from '@mui/material/TableSortLabel';

import Checkbox from '@mui/material/Checkbox';

const headCells = [
  {
    id: 'number',
    label: 'Number',
  },
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'type',
    label: 'Type',
  },
  {
    id: 'subsystem',
    label: 'Subsystem',
  },
  {
    id: 'publishedAt',
    label: 'Date',
  },
  {
    id: 'status',
    label: 'Status',
  },
];

function TableHeadMobile(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    authenticated
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 70px 90px',
        gridGap: '5px',
        maxWidth: '25rem',
        justifyContent: 'center',
      }}
    >
      {(!(numSelected > 0)) && (<><Typography variant="body 1" sx={{ gridRow: '1/ 3', height: '130.5px' }}>
        Sort By:
      </Typography>
      {headCells.map((headCell, headCellIndex) => (
        <Button
          key={headCell.id}
          variant={orderBy === headCell.id ? 'contained' : 'outlined'}
          color = {orderBy === headCell.id ? 'secondary' : 'primary'}
          sx={{justifyContent: 'start', textTransform: 'none', padding: '6px 8px'}}
          disableElevation
          disableRipple
          onClick={createSortHandler(headCell.id)}
        >
          {headCell.label}
          {headCellIndex < headCells.length && (
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              hideSortIcon
              sx={{position: 'absolute', right: '5px','& svg': {
                color: '#fff !important'
              }}}
            />
          )}
        </Button>
      ))}</>)}
      

     {authenticated && <Box sx={{ gridColumn: '1/-1' }}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={onSelectAllClick}
              checked={rowCount > 0 && numSelected === rowCount}
            />
          }
          label="Select all"
        ></FormControlLabel>
      </Box>}
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    authenticated : state.ui.authenticated,
  }
}


export default connect(mapStateToProps)(TableHeadMobile);
