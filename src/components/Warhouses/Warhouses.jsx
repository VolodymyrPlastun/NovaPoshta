import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getListOfWarehouses from '../API/getListOfWarehouses ';
import TableOfWarhouses from '../TableOfWarhouses';
import { getWarehouses } from '../redux/postSlice';
import { Box, InputContainer, PostInfoBox } from './Warhouses.styled';

const Warhouses = () => {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();
  const { warehouses } = useSelector(state => state.post);

  const handleGetWarehouses = async () => {
    const data = await getListOfWarehouses(cityName);
    if (data && data.success) {
      dispatch(getWarehouses(data.data));
    } else {
      dispatch(getWarehouses(null));
    }
  };

  return (
    <Box>
      <InputContainer>
        <TextField
          label="Назва міста"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
        <Button variant="contained" onClick={handleGetWarehouses}>
          Дивитись
        </Button>
      </InputContainer>
      {warehouses && (
        <div>
          <TableOfWarhouses />
        </div>
      )}
      {warehouses?.length === 0 && (
        <PostInfoBox>
          <Typography variant="h5">
            Перевірте правельність введеного міста
          </Typography>
        </PostInfoBox>
      )}
    </Box>
  );
};

export default Warhouses;
