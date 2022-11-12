import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'renderer/pages/Home';
import Login from 'renderer/pages/Login';
import Message from 'renderer/pages/Messages';
import Register from 'renderer/pages/Register';
import LayoutsWithNavbarProps from './LayoutsWithNavbarProps';

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<LayoutsWithNavbarProps />}>
          <Route path="/home" element={<Home />} />
          <Route path="/messages" element={<Message />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
