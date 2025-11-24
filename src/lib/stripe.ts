import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    priceId: null,
    features: [
      'Treinos básicos',
      'Acompanhamento de progresso',
      'Comunidade global',
      'Suporte por email',
      'Acesso limitado a receitas',
    ],
    limits: {
      workoutsPerWeek: 3,
      aiConsultations: 0,
      nutritionPlans: 1,
    }
  },
  premium: {
    name: 'Premium',
    price: 29.90,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
    features: [
      'Todos os recursos do Gratuito',
      'Treinos ilimitados com IA',
      '5 consultas IA por mês',
      'Planos nutricionais personalizados',
      'Sem anúncios',
      'Suporte prioritário',
      'Análise avançada de progresso',
    ],
    limits: {
      workoutsPerWeek: -1, // ilimitado
      aiConsultations: 5,
      nutritionPlans: -1,
    }
  },
  pro: {
    name: 'Pro',
    price: 59.90,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    features: [
      'Todos os recursos do Premium',
      'Consultas IA ilimitadas',
      'Personal trainer virtual dedicado',
      'Nutricionista virtual dedicado',
      'Acesso antecipado a novos recursos',
      'Suporte 24/7 prioritário',
      'Relatórios detalhados semanais',
      'Integração com wearables',
    ],
    limits: {
      workoutsPerWeek: -1,
      aiConsultations: -1,
      nutritionPlans: -1,
    }
  }
};

export async function createCheckoutSession(priceId: string, userId: string) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId, userId }),
  });

  const session = await response.json();
  return session;
}

export async function createPortalSession(customerId: string) {
  const response = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId }),
  });

  const session = await response.json();
  return session;
}
