import { React, useState} from 'react';
import { connect } from 'react-redux';
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


function ResultsTable({ unitNo, foundUnit}) {
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
        <EnhancedTableToolbar/>
        {width > 900 ? (
          <Table sx={{ minWidth: 650 }} aria-label="results table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              />
            <EnhancedTableBody
              order={order}
              orderBy={orderBy}
              />
          </Table>
        ) : (
          <Box>
            <TableHeadMobile
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              />
            <ResultsMobile
              order={order}
              orderBy={orderBy}
            />
          </Box>
        )}
      </Grid>}
    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    foundUnit: state.data.foundUnit,
    unitNo: state.data.unitNo
  };
};

export default connect(mapStateToProps)(ResultsTable);
