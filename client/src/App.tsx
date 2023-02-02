import io from 'socket.io-client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavComponent from './components/Nav';
import Home from './components/Home';
import Products from './components/Proposals';
import AddProduct from './components/AddProposal';
import BidProduct from './components/BidProposal'
import { ChakraProvider } from '@chakra-ui/react'

const socket = io('http://localhost:4000', { transports: ['websocket'] });

const App = () => {
  return (
    <>
      <ChakraProvider>
        <Router>
          <NavComponent socket={socket} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/proposals" element={<Products />} />
            <Route
              path="/proposals/add"
              element={<AddProduct socket={socket} />}
            />
            <Route
              path="/proposals/bid/:name/:price"
              element={<BidProduct socket={socket} />}
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
