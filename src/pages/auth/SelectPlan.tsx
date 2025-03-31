import React from 'react';
import { Button } from '../components/ui/Button';

const plans = [
  {
    id: 'basic',
    name: 'Plano Básico',
    price: 'R$ 29,90/mês',
    description: 'Acesso a funcionalidades básicas.',
  },
  {
    id: 'pro',
    name: 'Plano Pro',
    price: 'R$ 49,90/mês',
    description: 'Acesso a funcionalidades avançadas.',
  },
  {
    id: 'enterprise',
    name: 'Plano Enterprise',
    price: 'R$ 99,90/mês',
    description: 'Acesso a todas as funcionalidades e suporte prioritário.',
  },
];

export function SelectPlan() {
  const handleSelectPlan = (planId: string) => {
    console.log(`Plano selecionado: ${planId}`);
    // Aqui você pode adicionar a lógica para prosseguir com a seleção do plano
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Selecione um Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-lg font-bold">{plan.price}</p>
            <p className="text-gray-600">{plan.description}</p>
            <Button 
              onClick={() => handleSelectPlan(plan.id)} 
              className="mt-4 w-full"
            >
              Selecionar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
