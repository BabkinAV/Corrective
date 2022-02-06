import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import getComparator from '../../helpers/getComparator';
import ChipStatus from './ChipStatus';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';

function EnhancedTableBody({
  rows,
  order,
  orderBy,
  selected,
  onCheckboxClick,
  authenticated,
}) {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableBody>
      {rows
        .slice()
        .sort(getComparator(order, orderBy))
        .map((row) => {
          const isItemSelected = isSelected(row.docId);
          return (
            <TableRow
              hover
              key={row.docId}
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
            >
              {authenticated && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="secondary"
                    onChange={(event) => onCheckboxClick(event, row.docId)}
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': row.docId,
                    }}
                  />
                </TableCell>
              )}
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.subsystem}</TableCell>
              <TableCell align="left">
                {dayjs(row.publishedAt).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell align="left" sx={{ width: '10rem' }}>
                <ChipStatus status={row.status} />
              </TableCell>
              <TableCell align="left">
                <Link href={row.link} color="secondary">
                  Download
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.ui.authenticated,
    selected : state.data.selected
  };
};

export default connect(mapStateToProps)(EnhancedTableBody);
