import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './About'
import './index.css'
import './styles/users.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UsersPage from './pages/UsersPage.tsx'
import UserDetailPage from './pages/UserDetailsPage.tsx'

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
