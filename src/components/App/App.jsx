import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Buttons from '../Buttons';
import Tracking from '../Tracking';
import Warhouses from '../Warhouses';
import { Container } from './App.styled';

const App = () => {
  const { isBOLActive } = useSelector(state => state.post);
  return (
    <Container>
      <Buttons />
      {isBOLActive ? <Tracking /> : <Warhouses />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '16px',
          },
        }}
      />
    </Container>
  );
};

export default App;
