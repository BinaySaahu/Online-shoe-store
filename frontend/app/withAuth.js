import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const User = useSelector((state)=>state.user);
    const userIsAuthenticated = User.isLoggedIn;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/login');
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}