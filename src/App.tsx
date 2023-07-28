import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from 'react-router-dom';

import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/1" />}></Route>
        <Route path=":postPageCount" element={<Home />}></Route>
      </Routes>
    </ Router>
  );
}

export default App;
