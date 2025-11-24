"use client";

import { useState, useEffect } from "react";
import { Brain, Heart, Smile, Frown, Meh, TrendingUp, Calendar, BookOpen, Music, Wind, Sun, Moon, Sparkles, MessageCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function MentalWellnessSection() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [showJournal, setShowJournal] = useState(false);
  const [moodStats, setMoodStats] = useState({
    streak: 0,
    totalEntries: 0,
    positivePercentage: 0
  });

  const moods = [
    { id: "great", label: "Ótimo", icon: Smile, color: "from-green-500 to-emerald-600", emoji: "😊" },
    { id: "good", label: "Bom", icon: Smile, color: "from-blue-500 to-cyan-600", emoji: "🙂" },
    { id: "neutral", label: "Neutro", icon: Meh, color: "from-yellow-500 to-orange-600", emoji: "😐" },
    { id: "sad", label: "Triste", icon: Frown, color: "from-orange-500 to-red-600", emoji: "😔" },
    { id: "anxious", label: "Ansioso", icon: Frown, color: "from-purple-500 to-pink-600", emoji: "😰" },
  ];

  const meditationExercises = [
    {
      title: "Respiração 4-7-8",
      duration: "5 min",
      description: "Técnica calmante para reduzir ansiedade",
      icon: Wind,
      color: "from-cyan-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      steps: [
        "Inspire pelo nariz contando até 4",
        "Segure a respiração contando até 7",
        "Expire pela boca contando até 8",
        "Repita 4 vezes"
      ]
    },
    {
      title: "Meditação Guiada",
      duration: "10 min",
      description: "Mindfulness para iniciantes",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
      steps: [
        "Sente-se confortavelmente",
        "Feche os olhos suavemente",
        "Foque na sua respiração",
        "Observe pensamentos sem julgamento"
      ]
    },
    {
      title: "Body Scan",
      duration: "15 min",
      description: "Relaxamento muscular progressivo",
      icon: Sparkles,
      color: "from-green-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop",
      steps: [
        "Deite-se confortavelmente",
        "Relaxe cada parte do corpo",
        "Dos pés até a cabeça",
        "Libere toda a tensão"
      ]
    },
  ];

  const wellnessTips = [
    {
      title: "Gratidão Diária",
      description: "Liste 3 coisas pelas quais você é grato hoje",
      icon: Heart,
      color: "bg-pink-500/10",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=300&h=200&fit=crop"
    },
    {
      title: "Conexão Social",
      description: "Converse com um amigo ou familiar",
      icon: MessageCircle,
      color: "bg-blue-500/10",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop"
    },
    {
      title: "Natureza",
      description: "Passe 20 minutos ao ar livre",
      icon: Sun,
      color: "bg-green-500/10",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop"
    },
    {
      title: "Música Relaxante",
      description: "Ouça sons calmantes por 10 minutos",
      icon: Music,
      color: "bg-purple-500/10",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop"
    },
  ];

  useEffect(() => {
    loadMoodStats();
  }, []);

  const loadMoodStats = async () => {
    // Só tenta carregar se o Supabase estiver configurado
    if (!supabase) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: entries, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (entries && entries.length > 0) {
        const positiveCount = entries.filter(e => 
          e.mood === 'great' || e.mood === 'good'
        ).length;
        
        setMoodStats({
          streak: calculateStreak(entries),
          totalEntries: entries.length,
          positivePercentage: Math.round((positiveCount / entries.length) * 100)
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const calculateStreak = (entries: any[]) => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].created_at);
      entryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    
    // Só tenta salvar se o Supabase estiver configurado
    if (!supabase) {
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Faça login para salvar seu humor');
        return;
      }

      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood: moodId
        });

      if (error) throw error;
      
      loadMoodStats();
    } catch (error) {
      console.error('Erro ao salvar humor:', error);
    }
  };

  const handleSaveJournal = async () => {
    if (!journalEntry.trim()) return;

    // Só tenta salvar se o Supabase estiver configurado
    if (!supabase) {
      alert('Configure o Supabase para salvar seu diário');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Faça login para salvar seu diário');
        return;
      }

      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood: selectedMood || 'neutral',
          journal_entry: journalEntry
        });

      if (error) throw error;

      alert("Diário salvo com sucesso! 📝");
      setJournalEntry("");
      setShowJournal(false);
      loadMoodStats();
    } catch (error) {
      console.error('Erro ao salvar diário:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8 text-white" />
          <h2 className="text-white font-bold text-2xl">Bem-Estar Mental</h2>
        </div>
        <p className="text-white/90 text-sm">
          Cuide da sua saúde mental com práticas diárias de mindfulness e autocuidado
        </p>
      </div>

      {/* Mood Tracker */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <Smile className="w-6 h-6 text-purple-400" />
          Como você está se sentindo hoje?
        </h3>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-br ${mood.color} text-white scale-110 shadow-lg`
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:scale-105"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
        {selectedMood && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 animate-in fade-in duration-300">
            <p className="text-purple-300 text-sm">
              ✨ Obrigado por compartilhar! Vamos cuidar do seu bem-estar juntos.
            </p>
          </div>
        )}
      </div>

      {/* Diário de Emoções */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-xl flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            Diário de Emoções
          </h3>
          <button
            onClick={() => setShowJournal(!showJournal)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:scale-105 transition-all"
          >
            {showJournal ? "Fechar" : "Escrever"}
          </button>
        </div>

        {showJournal && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Como foi seu dia? O que você está sentindo? Escreva livremente..."
              className="w-full h-32 bg-slate-800 text-white rounded-xl p-4 border border-slate-700 focus:border-purple-500 focus:outline-none resize-none"
            />
            <button
              onClick={handleSaveJournal}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Salvar no Diário
            </button>
          </div>
        )}

        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-300 text-sm">
            💡 <strong>Dica:</strong> Escrever sobre suas emoções pode reduzir estresse e ansiedade em até 40%
          </p>
        </div>
      </div>

      {/* Exercícios de Meditação COM IMAGENS */}
      <div>
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <Wind className="w-6 h-6 text-cyan-400" />
          Exercícios de Mindfulness
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meditationExercises.map((exercise, idx) => {
            const Icon = exercise.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Imagem */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exercise.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-bold">
                      {exercise.duration}
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <h4 className="text-white font-bold text-lg mb-2">{exercise.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{exercise.description}</p>
                  
                  <div className="space-y-2">
                    {exercise.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-2">
                        <span className="text-purple-400 text-xs mt-0.5">•</span>
                        <p className="text-gray-300 text-xs">{step}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:scale-105 transition-all">
                    Começar Agora
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dicas de Bem-Estar COM IMAGENS */}
      <div>
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Práticas Diárias de Autocuidado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wellnessTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 flex items-center gap-4"
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-20 h-20 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <h4 className="text-white font-semibold">{tip.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estatísticas de Progresso */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-xl">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Seu Progresso Mental
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-2xl font-bold">{moodStats.streak}</p>
            <p className="text-white/80 text-xs">dias consecutivos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Brain className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-2xl font-bold">45</p>
            <p className="text-white/80 text-xs">min meditados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-2xl font-bold">{moodStats.totalEntries}</p>
            <p className="text-white/80 text-xs">entradas no diário</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Smile className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-2xl font-bold">{moodStats.positivePercentage}%</p>
            <p className="text-white/80 text-xs">humor positivo</p>
          </div>
        </div>
      </div>

      {/* Recursos de Apoio */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-400" />
          Recursos de Apoio
        </h3>
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300 text-sm">
              <strong>🆘 Precisa de ajuda imediata?</strong>
              <br />
              CVV - Centro de Valorização da Vida: 188 (24h, gratuito)
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-300 text-sm">
              <strong>💙 Lembre-se:</strong> Cuidar da saúde mental é tão importante quanto cuidar do corpo. Você não está sozinho nessa jornada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
