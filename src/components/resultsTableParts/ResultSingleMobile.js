import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import ChipStatus from './ChipStatus';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';

//action
import { handleClick } from '../../redux/actions/dataActions';

function ResultSingleMobile({
  docId,
  isItemSelected,
  number,
  title,
  type,
  subsystem,
  publishedAt,
  link,
  status,
  handleClick,
  authenticated,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        backgroundColor: isItemSelected ? 'rgba(0, 0, 0, 0.08)' : '',
        '&:not(:last-child)': { borderBottom: '1px solid black' },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
      >
        {authenticated && (
          <Checkbox
            color="secondary"
            onChange={(event) => handleClick(event, docId)}
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': docId,
            }}
          />
        )}

        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            alignItems: 'center',
            color: 'primary.light',
          }}
        >
          {number}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            ml: 'auto',
          }}
        >
          <ChipStatus status={status} />
        </Box>
      </Box>
      <Typography sx={{ textAlign: 'justify', color: 'primary.light' }}>
        {title}
      </Typography>
      <Box
        className="product-details"
        sx={{ width: '15rem', mx: 'auto', my: 3 }}
      >
        <Box
          className="product-details_item"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            gap: '1rem',
          }}
        >
          <Typography variant="body2">Document type</Typography>
          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            {type}
          </Typography>
        </Box>
        <Box
          className="product-details_item"
          sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}
        >
          <Typography variant="body2">Subsystem</Typography>
          <Typography variant="body2">{subsystem}</Typography>
        </Box>
        <Box
          className="product-details_item"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="body2">Date</Typography>
          <Typography variant="body2">
            {dayjs(publishedAt).format('DD.MM.YYYY')}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        href={link}
        color="secondary"
        sx={{ height: '3rem', width: '10rem', mx: 'auto' }}
        disableElevation={true}
      >
        Download
      </Button>
    </Box>
  );
}

export default connect(null, {handleClick})(ResultSingleMobile);
