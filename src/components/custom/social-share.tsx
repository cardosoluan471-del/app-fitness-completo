"use client";

import { useState, useEffect } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  MessageCircle,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
}

export default function SocialShare({ 
  title = "FitNexus - Transforme sua vida com IA",
  description = "Junte-se a 2M+ usuários transformando suas vidas com treinos inteligentes, nutrição personalizada e bem-estar mental.",
  url: propUrl
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('https://fitnexus.app');
  const [mounted, setMounted] = useState(false);

  // Atualizar URL apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (propUrl) {
      setUrl(propUrl);
    } else if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [propUrl]);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleShare = (platform: keyof typeof socialLinks) => {
    if (typeof window !== 'undefined') {
      window.open(socialLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  // Não renderizar até estar montado no cliente
  if (!mounted) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12 relative z-10">
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/20 p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Share2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
            Compartilhe o <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">FitNexus</span>
          </h3>
          <p className="text-white/70 text-lg">
            Ajude seus amigos a transformarem suas vidas também!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => handleShare('facebook')}
            className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Facebook
          </Button>

          <Button
            onClick={() => handleShare('twitter')}
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Twitter
          </Button>

          <Button
            onClick={() => handleShare('linkedin')}
            className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            LinkedIn
          </Button>

          <Button
            onClick={() => handleShare('whatsapp')}
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>

          <Button
            onClick={() => handleShare('telegram')}
            className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Telegram
          </Button>

          <Button
            onClick={handleCopyLink}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6 shadow-lg hover:scale-105 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copiar Link
              </>
            )}
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <p className="text-white/60 text-sm text-center mb-2">Link para compartilhar:</p>
          <p className="text-white text-center font-mono text-sm break-all">{url}</p>
        </div>
      </Card>
    </section>
  );
}
