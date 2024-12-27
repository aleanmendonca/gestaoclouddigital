import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { AuthLayout } from '../../components/auth/AuthLayout';
    import { SignUp } from '@clerk/clerk-react';

    export function Register() {
      const navigate = useNavigate();

      return (
        <AuthLayout>
          <div className="mt-8">
            <SignUp afterSignUpUrl="/select-plan" />
          </div>
        </AuthLayout>
      );
    }
