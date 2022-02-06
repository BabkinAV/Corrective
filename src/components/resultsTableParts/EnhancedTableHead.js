import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import TableSortLabel from '@mui/material/TableSortLabel';
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
  {
    id: 'link',
    label: 'Link',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    authenticated,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {authenticated && (
          <TableCell padding="checkbox">
            <Checkbox
              color="secondary"
              onChange={onSelectAllClick}
              checked={rowCount > 0 && numSelected === rowCount}
              inputProps={{
                'aria-label': 'select all documents',
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, headCellIndex) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            onClick={
              headCellIndex < headCells.length - 1
                ? createSortHandler(headCell.id)
                : null
            }
            sx={{
              '&:not(:last-child):hover': { cursor: 'pointer' },
              whiteSpace: 'nowrap',
            }}
          >
            {headCell.label}
            {headCellIndex < headCells.length - 1 && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.ui.authenticated,
    numSelected : state.data.selected.length
  }
}

export default connect(mapStateToProps)(EnhancedTableHead);

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
