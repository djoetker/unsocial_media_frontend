import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './pages/home/Home'
import DataContextProvider from './context/DataContext'

function App() {

  return (
    <DataContextProvider>
     <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
     </Routes>
     </DataContextProvider>
  );
};

export default App
