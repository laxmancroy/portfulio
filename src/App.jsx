import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Home } from './pages/Home';
import { BlogDetail } from './pages/BlogDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
