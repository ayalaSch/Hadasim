import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from './components/Main'
import MemberDetails from './components/MemberDetails';
import Members from './components/Members';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/members" />} />
        <Route path="/members" element={<Main />}>
          <Route index element={<Members />} />
          <Route path=":id/details" element={<MemberDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App