import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SubjectsPage from './pages/SubjectsPage'
import FoldersPage from './pages/FoldersPage'
import TopicsPage from './pages/TopicsPage'
import TagsPage from './pages/TagsPage'
import CommentsPage from './pages/CommentsPage'
import { Row, Col, Statistic, Card } from 'antd'
import {
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';

// Dashboard component
const Dashboard = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Total Products"
          value={1234}
          prefix={<MedicineBoxOutlined />}
          valueStyle={{ color: '#1890ff' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Total Orders"
          value={567}
          prefix={<ShoppingCartOutlined />}
          valueStyle={{ color: '#52c41a' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Revenue"
          value={89765}
          prefix={<DollarOutlined />}
          precision={2}
          valueStyle={{ color: '#722ed1' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card>
        <Statistic
          title="Customers"
          value={892}
          prefix={<TeamOutlined />}
          valueStyle={{ color: '#fa8c16' }}
        />
      </Card>
    </Col>
  </Row>
)

function App() {
  return (
    <FrappeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Login Route - Public */}
            <Route path="/frontend/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/frontend"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/subjects"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <SubjectsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/folders"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FoldersPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/topics"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <TopicsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/tags"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <TagsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/comments"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CommentsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/frontend/*"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
