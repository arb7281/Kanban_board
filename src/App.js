import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy} from 'react';
import './App.css';
import Header from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from './slices/tasksSlice';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
const Board = lazy(() => import('./pages/board/Board'))
const Registration = lazy(() => import('./pages/registration/Registration'))
const Login = lazy(() => import('./pages/login/Login'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))

function App() {

const {tasks} = useSelector((state)=> state.tasks)
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const dispatch = useDispatch()
const {user, isLoggedIn} = useSelector((state) => state.auth)


useEffect(() => {
  ;(async () => {
    try {
      const tasks = await fetch(`http://localhost:3000/tasks?userId=${user?.id}`);
      const result = await tasks.json();

      if (result) {
        dispatch(setTasks(result));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  })();
}, [isLoggedIn]);

  return (
    <div className="App" style={{ backgroundColor: '#eee' }}>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>} user={user}/>} />
        <Route path='/board' element={<ProtectedRoute element={<Board tasks={tasks.filter((task) => task.userId === user?.id)} error={error} loading={loading} />} user={user} />} />
      </Routes> 
      </Suspense>
      
    </div>
  );
}

export default App;
