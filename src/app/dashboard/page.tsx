'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, TrendingUp, Calendar, Users, Bell, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">FitNexus</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-purple-500 text-white">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button onClick={handleLogout} variant="outline" className="border-white/40 text-white hover:bg-white/10">
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
          </h2>
          <p className="text-purple-200">Continue sua jornada fitness hoje.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Treinos Esta Semana</CardTitle>
              <Dumbbell className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-purple-200">+2 do que na semana passada</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Progresso</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+15%</div>
              <p className="text-xs text-purple-200">Aumento na força</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Próximo Treino</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Hoje</div>
              <p className="text-xs text-purple-200">Treino de pernas</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Amigos</CardTitle>
              <Users className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-purple-200">Na sua rede</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Atividade Recente</CardTitle>
              <CardDescription className="text-purple-200">Seus últimos treinos e conquistas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-500/20 text-green-200">Concluído</Badge>
                <div>
                  <p className="text-white font-medium">Treino de Peito</p>
                  <p className="text-sm text-purple-200">2 horas atrás</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">Novo Record</Badge>
                <div>
                  <p className="text-white font-medium">Supino: 100kg</p>
                  <p className="text-sm text-purple-200">Ontem</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">Meta Atingida</Badge>
                <div>
                  <p className="text-white font-medium">10 treinos no mês</p>
                  <p className="text-sm text-purple-200">3 dias atrás</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Próximos Treinos</CardTitle>
              <CardDescription className="text-purple-200">Planeje seus próximos exercícios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Treino de Pernas</p>
                  <p className="text-sm text-purple-200">Hoje, 18:00</p>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Iniciar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Cardio HIIT</p>
                  <p className="text-sm text-purple-200">Amanhã, 07:00</p>
                </div>
                <Button size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">Agendar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Treino de Costas</p>
                  <p className="text-sm text-purple-200">Quarta, 19:00</p>
                </div>
                <Button size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">Agendar</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}