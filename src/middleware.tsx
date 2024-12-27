import React from 'react';
    import { useAuth } from '@clerk/clerk-react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useUserStore } from './store/user';

    interface MiddlewareProps {
      children: React.ReactNode;
    }

    export function Middleware({ children }: MiddlewareProps) {
      const { isSignedIn, isLoaded, user } = useAuth();
      const location = useLocation();
      const setCurrentUser = useUserStore((state) => state.setCurrentUser);

      React.useEffect(() => {
        if (user) {
          setCurrentUser({
            id: user.id,
            name: user.firstName || '',
            email: user.emailAddresses[0]?.emailAddress || '',
            photo: user.imageUrl,
            planId: null,
            role: user.publicMetadata.role as 'admin' | 'employee' || 'employee'
          });
        }
      }, [user, setCurrentUser]);

      if (!isLoaded) {
        return <div>Loading...</div>;
      }

      const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

      if (isSignedIn && isAuthPage) {
        return <Navigate to="/dashboard" replace />;
      }

      if (!isSignedIn && !isAuthPage) {
        return <Navigate to="/login" replace />;
      }

      return <>{children}</>;
    }
