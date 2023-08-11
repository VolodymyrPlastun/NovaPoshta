import { ButtonGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeFlag } from '../redux/postSlice';
import { Btn, ButtonBox } from './Buttons.styled';

const Buttons = () => {
  const dispatch = useDispatch();

  return (
    <ButtonBox>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Btn onClick={() => dispatch(changeFlag(true))}>Перевірити ТТН</Btn>
        <Btn onClick={() => dispatch(changeFlag(false))}>Список відділень</Btn>
      </ButtonGroup>
    </ButtonBox>
  );
};

export default Buttons;
