import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { usePlansStore, Plan } from '../../store/plans';
    import { useUserStore } from '../../store/user';
    import { Button } from '../../components/ui/Button';
    import { AuthLayout } from '../../components/auth/AuthLayout';
    import { useClerk } from '@clerk/clerk-react';

    export function SelectPlan() {
      const navigate = useNavigate();
      const plans = usePlansStore((state) => state.plans);
      const { setPlanId, currentUser, setCurrentUser } = useUserStore();
      const { user, updateUser } = useClerk();

      const handleSelectPlan = async (planId: string) => {
        if (user) {
          try {
            await updateUser({
              publicMetadata: {
                planId: planId,
              },
            });
            setPlanId(planId);
            if (currentUser) {
              setCurrentUser({...currentUser, planId: planId})
            }
            navigate('/dashboard');
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }
      };

      return (
        <AuthLayout title="Escolha seu Plano">
          <div className="space-y-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(plan.price)} / {plan.billingCycle === 'monthly' ? 'mês' : 'ano'}
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button onClick={() => handleSelectPlan(plan.id)} className="w-full">
                  Selecionar Plano
                </Button>
              </div>
            ))}
          </div>
        </AuthLayout>
      );
    }
