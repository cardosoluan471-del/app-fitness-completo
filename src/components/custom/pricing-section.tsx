"use client";

import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PLANS } from "@/lib/stripe";

export default function PricingSection() {
  const handleSelectPlan = async (planType: 'free' | 'premium' | 'pro') => {
    if (planType === 'free') {
      // Redirecionar para cadastro gratuito
      window.location.href = '/signup';
      return;
    }

    // Para planos pagos, criar sessão de checkout do Stripe
    const plan = PLANS[planType];
    if (plan.priceId) {
      // Aqui você integraria com o Stripe
      console.log('Iniciando checkout para:', planType);
      // const session = await createCheckoutSession(plan.priceId, userId);
      // window.location.href = session.url;
    }
  };

  return (
    <section id="pricing" className="container mx-auto px-4 py-16 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
          Escolha Seu <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Plano</span>
        </h3>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Comece grátis e evolua quando quiser. Sem compromisso, cancele quando desejar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Plano Gratuito */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border-white/20 p-8 hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
              <Zap className="w-8 h-8 text-white" />
            </div>
            
            <h4 className="text-2xl font-black text-white mb-2">Gratuito</h4>
            <div className="mb-6">
              <span className="text-5xl font-black text-white">R$ 0</span>
              <span className="text-white/60 text-lg">/mês</span>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.free.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => handleSelectPlan('free')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
            >
              Começar Grátis
            </Button>
          </div>
        </Card>

        {/* Plano Premium - DESTAQUE */}
        <Card className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-lg border-2 border-purple-400/50 p-8 hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-2xl shadow-purple-500/50">
          <div className="absolute -top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-xs font-black flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            MAIS POPULAR
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h4 className="text-2xl font-black text-white mb-2">Premium</h4>
            <div className="mb-6">
              <span className="text-5xl font-black text-white">R$ 29</span>
              <span className="text-white/60 text-lg">,90/mês</span>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.premium.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/90">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => handleSelectPlan('premium')}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 hover:from-purple-600 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
            >
              Assinar Premium
            </Button>
            
            <p className="text-center text-white/60 text-xs mt-3">
              Cancele quando quiser
            </p>
          </div>
        </Card>

        {/* Plano Pro */}
        <Card className="bg-gradient-to-br from-yellow-600/30 to-orange-600/30 backdrop-blur-lg border-2 border-yellow-400/50 p-8 hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/50">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <h4 className="text-2xl font-black text-white mb-2">Pro</h4>
            <div className="mb-6">
              <span className="text-5xl font-black text-white">R$ 59</span>
              <span className="text-white/60 text-lg">,90/mês</span>
            </div>

            <ul className="space-y-3 mb-8">
              {PLANS.pro.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/90">
                  <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => handleSelectPlan('pro')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
            >
              Assinar Pro
            </Button>
            
            <p className="text-center text-white/60 text-xs mt-3">
              Para profissionais sérios
            </p>
          </div>
        </Card>
      </div>

      {/* Garantia */}
      <div className="text-center mt-12">
        <Card className="bg-green-500/10 border-green-500/30 backdrop-blur-lg p-6 max-w-2xl mx-auto">
          <p className="text-green-300 font-bold text-lg mb-2">
            ✓ Garantia de 7 dias - 100% do seu dinheiro de volta
          </p>
          <p className="text-white/70 text-sm">
            Experimente sem riscos. Se não ficar satisfeito, devolvemos seu dinheiro.
          </p>
        </Card>
      </div>
    </section>
  );
}
