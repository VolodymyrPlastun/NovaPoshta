import { CheckCircleOutline, Receipt, Send } from '@mui/icons-material';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import getPackageStatus from '../API/getPackageStatus';
import {
  getWaybillData,
  getwaybillFromLS,
  setWaybillNumber,
} from '../redux/postSlice';
import {
  Container,
  InfoContainer,
  InputContainer,
  PostInfoBox,
  PreviousNumbersContainer,
  StyledContainer,
  StyledListItemButton,
  StyledTextField,
} from './Tracking.styled';

const Tracking = () => {
  const { waybillData, previousWaybillNumbers, waybillNumber } = useSelector(
    state => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const savedWaybillNumbers =
      JSON.parse(localStorage.getItem('waybillNumbers')) || [];

    dispatch(getwaybillFromLS(savedWaybillNumbers));
  }, [dispatch]);

  const handleGetStatus = async () => {
    if (!isValidWaybillNumber(waybillNumber)) {
      toast.error(
        'Неправильний номер накладної. Номер повинен містити 14 цифр.'
      );
      dispatch(getWaybillData(null));
      return;
    }

    await getData(waybillNumber);
  };

  const handlePreviousWaybillClick = async waybill => {
    if (waybill !== waybillNumber) {
      dispatch(setWaybillNumber(waybill));
      dispatch(getWaybillData(null));
      await getData(waybill);
    }
  };

  const handleClearPreviousWaybills = () => {
    dispatch(getwaybillFromLS([]));
    localStorage.removeItem('waybillNumbers');
  };

  const isValidWaybillNumber = waybill => {
    return /^[0-9]{14}$/.test(waybill);
  };

  const getData = async waybill => {
    const data = await getPackageStatus(waybill);
    if (data && data.success) {
      dispatch(getWaybillData(data.data[0]));
      if (!previousWaybillNumbers.includes(waybill)) {
        dispatch(getwaybillFromLS([...previousWaybillNumbers, waybill]));
        localStorage.setItem(
          'waybillNumbers',
          JSON.stringify([...previousWaybillNumbers, waybill])
        );
      }
    } else {
      toast.error('Номер накладної некоректний або посилки немає.');
      dispatch(getWaybillData(null));
    }
  };

  return (
    <Container>
      <InputContainer>
        <StyledTextField
          sx={{ marginBottom: '20px' }}
          label="Номер накладної"
          value={waybillNumber}
          type="number"
          onChange={e => dispatch(setWaybillNumber(e.target.value))}
        />
        <Button
          sx={{ marginBottom: '20px' }}
          variant="contained"
          onClick={handleGetStatus}
        >
          Перевірити
        </Button>
      </InputContainer>
      <StyledContainer>
        {waybillData ? (
          <InfoContainer>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemIcon>
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary={waybillData.Status} />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemIcon>
                      <Send />
                    </ListItemIcon>
                    <ListItemText primary={waybillData.WarehouseSender} />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton>
                    <ListItemIcon>
                      <Receipt />
                    </ListItemIcon>
                    <ListItemText primary={waybillData.WarehouseRecipient} />
                  </StyledListItemButton>
                </ListItem>
              </List>
            </nav>
          </InfoContainer>
        ) : (
          <PostInfoBox>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Тут буде інформація про посилку
            </Typography>
          </PostInfoBox>
        )}

        <PreviousNumbersContainer>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Попередні номера ТТН
          </Typography>
          {previousWaybillNumbers.length === 0 && (
            <Typography variant="h6">Тут будуть переглянуті посилки</Typography>
          )}
          <List>
            {previousWaybillNumbers.map((waybill, index) => (
              <ListItem
                key={index}
                onClick={() => handlePreviousWaybillClick(waybill)}
              >
                <ListItemText primary={waybill} />
              </ListItem>
            ))}
          </List>
          {previousWaybillNumbers.length > 0 && (
            <Button variant="contained" onClick={handleClearPreviousWaybills}>
              Очистити
            </Button>
          )}
        </PreviousNumbersContainer>
      </StyledContainer>
    </Container>
  );
};

export default Tracking;
