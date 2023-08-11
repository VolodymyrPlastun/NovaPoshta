import { ListItemButton, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StyledTextField = styled(TextField)`
  width: 200px;
`;

export const InfoContainer = styled.div`
  min-height: 208px;
  max-width: 360px;
`;

export const PreviousNumbersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
`;

export const StyledListItemButton = styled(ListItemButton)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: lightblue;
  border-radius: 5px;
  padding: 10px;
`;

export const PostInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
