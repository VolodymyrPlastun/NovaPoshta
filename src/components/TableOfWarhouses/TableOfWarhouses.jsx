import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { StyledTableSell } from './TableOfWarhouses.styled';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableOfWarhouses = () => {
  const { warehouses } = useSelector(state => state.post);
  return (
    <TableContainer
      sx={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}
    >
      <Table>
        <TableHead sx={{ color: 'white' }}>
          <TableRow>
            <StyledTableSell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>
              Адреса
            </StyledTableSell>
            <StyledTableSell
              sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}
              align="right"
            >
              Область
            </StyledTableSell>
            <StyledTableSell
              sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}
              align="right"
            >
              Телефон
            </StyledTableSell>
            <StyledTableSell
              sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}
              align="right"
            >
              Індекс
            </StyledTableSell>
            <StyledTableSell
              sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}
              align="right"
            >
              № Відділення
            </StyledTableSell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warhouse, index) => (
            <StyledTableRow key={index} >
              <TableCell component="th" scope="row">
                {warhouse.ShortAddress}
              </TableCell>
              <TableCell align="right">
                {warhouse.CategoryOfWarehouse === 'Postomat'
                  ? 'Поштомат'
                  : warhouse.Phone}
              </TableCell>
              <TableCell align="right">
                {warhouse.SettlementAreaDescription}
              </TableCell>
              <TableCell align="right">{warhouse.PostalCodeUA}</TableCell>
              <TableCell align="right">{warhouse.Number}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfWarhouses;
