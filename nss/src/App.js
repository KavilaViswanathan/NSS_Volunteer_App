import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Admin from './pages/Admin';
import AdminSignUp from './pages/AdminSignUp';
import VolunteerActivity from './pages/VolunteerActivity';
import User from './pages/User';
import UserSignUp from './pages/UserSignUp';
import UserVolunteer from './pages/UserVolunteer';
import UpdateDelete from './pages/UpdateDelete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Homepage/>}></Route>
         <Route path='/admin' element={<Admin/>}></Route>
         <Route path='/adminsignup' element={<AdminSignUp/>}></Route>
         <Route path='/ActivityVolunteer' element={<VolunteerActivity/>}></Route>
         <Route path='/user' element={<User/>}></Route>
         <Route path='/usersignup' element={<UserSignUp/>}></Route>
         <Route path='/uservolunteer' element={<UserVolunteer/>}></Route>
         <Route path='/updated' element={<UpdateDelete/>}></Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
