import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const Btn = styled(Button)`
  &:first-of-type {
    margin-right: 10px;
  }
`;
