import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>REACTERS -- BLOG</title>
      </Helmet>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={WritePage} path="/write" />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
    </>
  );
}

export default App;
