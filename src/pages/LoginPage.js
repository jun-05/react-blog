import React from 'react';
import AuthTemplate from './../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

function LoginPage() {
  return (
    <AuthTemplate>
      <LoginForm type="login" />
    </AuthTemplate>
  );
}

export default LoginPage;
