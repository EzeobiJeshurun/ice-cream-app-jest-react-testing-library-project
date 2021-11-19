import Container from 'react-bootstrap/Container';
import './App.css';
import OrderEntry from './components/OrderEntry/OrderEntry';
import { OrderDetailsProvider } from './store/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
      <OrderEntry/>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
