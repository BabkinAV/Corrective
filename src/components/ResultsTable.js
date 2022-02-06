import { React, useState} from 'react';
import EnhancedTableToolbar from './resultsTableParts/EnhancedTableToolbar';
import useViewport from '../hooks/useViewport';
import EnhancedTableHead from './resultsTableParts/EnhancedTableHead';
//MUI stuff
import { Grid, Typography, Box } from '@mui/material';
import ResultsMobile from './resultsTableParts/ResultsMobile';
import Table from '@mui/material/Table';
import EnhancedTableBody from './resultsTableParts/EnhancedTableBody';
import TableHeadMobile from './resultsTableParts/TableHeadMobile';

//Main component


function ResultsTable({rows, unitNo, onButtonClickedHandler, handleSelectAllClick, handleClick, selected, foundUnit}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
 

  const { width } = useViewport();

  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  

  return (
    <Grid
      container
      sx={{ px: { xs: 1, sm: 4 }, mt: 8, mb: 5 }}
      columnSpacing={{ xl: 35, lg: 20, md: 10 }}
    >
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h3">{
          foundUnit ? ` Your upgrade documents found for unit ${unitNo}:` : `No upgrade document(s) found for unit ${unitNo}`
        }
        </Typography>
      </Grid>
      {foundUnit && <Grid item xs={12} sx={{ mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onButtonClicked={onButtonClickedHandler}
        />
        {width > 900 ? (
          <Table sx={{ minWidth: 650 }} aria-label="results table">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              />
            <EnhancedTableBody
              rows={rows}
              order={order}
              orderBy={orderBy}
              selected={selected}
              onCheckboxClick={handleClick}
              />
          </Table>
        ) : (
          <Box>
            <TableHeadMobile
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              />
            <ResultsMobile
              rows={rows}
              order={order}
              orderBy={orderBy}
              selected={selected}
              onCheckboxClick={handleClick}
            />
          </Box>
        )}
      </Grid>}
    </Grid>
  );
}

export default ResultsTable;
