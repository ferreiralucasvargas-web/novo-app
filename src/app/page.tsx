"use client"

import { useState, useEffect } from "react"
import { Clock, TrendingUp, Shield, Star, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock data - em produção viria do banco de dados
const mockMatches = [
  {
    id: 1,
    homeTeam: "Internacional",
    awayTeam: "Palmeiras",
    time: "16:00",
    date: "2024-01-20",
    recommendation: "Over 1.5 gols",
    probability: 78,
    confidence: 4,
    status: "upcoming"
  },
  {
    id: 2,
    homeTeam: "São Paulo",
    awayTeam: "Corinthians",
    time: "18:30",
    date: "2024-01-20",
    recommendation: "Ambas marcam",
    probability: 82,
    confidence: 5,
    status: "upcoming"
  },
  {
    id: 3,
    homeTeam: "Internacional",
    awayTeam: "Grêmio",
    time: "20:00",
    date: "2024-01-20",
    recommendation: "Over 2.5 gols",
    probability: 65,
    confidence: 3,
    status: "upcoming"
  },
  {
    id: 4,
    homeTeam: "Atlético-MG",
    awayTeam: "Cruzeiro",
    time: "11:00",
    date: "2024-01-21",
    recommendation: "Vitória mandante",
    probability: 71,
    confidence: 4,
    status: "upcoming"
  }
]

export default function Home() {
  const [filter, setFilter] = useState<"today" | "tomorrow" | "finished">("today")
  const [trialTime, setTrialTime] = useState(30 * 60) // 30 minutos em segundos
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isTrialActive, setIsTrialActive] = useState(false)

  useEffect(() => {
    if (!isTrialActive) return

    const interval = setInterval(() => {
      setTrialTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTrialActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const filteredMatches = mockMatches.filter((match) => {
    const today = new Date().toISOString().split("T")[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]
    
    if (filter === "today") return match.date === today || match.date === "2024-01-20"
    if (filter === "tomorrow") return match.date === tomorrow || match.date === "2024-01-21"
    return match.status === "finished"
  })

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 shadow-2xl border-0">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Análises Matemáticas de Apostas
            </h1>
            
            <div className="space-y-4 text-left bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">
                    As análises são baseadas em probabilidade matemática, não em promessa de ganho.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">
                    Use com responsabilidade. Apostas envolvem risco.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <p className="text-lg font-semibold text-gray-900">
                  Teste grátis por 30 minutos
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Acesso completo a todas as análises e estatísticas
              </p>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg"
              onClick={() => {
                setShowOnboarding(false)
                setIsTrialActive(true)
              }}
            >
              Começar teste de 30 minutos
            </Button>

            <p className="text-xs text-gray-500">
              Após o período de teste: R$ 19,90 no primeiro mês, depois R$ 59,90/mês
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BetAnalytics</h1>
                <p className="text-xs text-gray-500">Análises Matemáticas</p>
              </div>
            </div>

            {isTrialActive && trialTime > 0 && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-500">Tempo restante</p>
                  <p className={`text-sm font-bold ${trialTime < 300 ? "text-red-600" : "text-emerald-600"}`}>
                    {formatTime(trialTime)}
                  </p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700">
                  Assinar agora
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Trial Alert */}
      {isTrialActive && trialTime < 300 && trialTime > 0 && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ Seu teste termina em {formatTime(trialTime)}. Assine para continuar acessando.
              </p>
              <Button size="sm" variant="destructive">
                Assinar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex gap-2">
              <Button
                variant={filter === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("today")}
                className={filter === "today" ? "bg-gradient-to-r from-emerald-500 to-blue-600" : ""}
              >
                Hoje
              </Button>
              <Button
                variant={filter === "tomorrow" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("tomorrow")}
                className={filter === "tomorrow" ? "bg-gradient-to-r from-emerald-500 to-blue-600" : ""}
              >
                Amanhã
              </Button>
              <Button
                variant={filter === "finished" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("finished")}
                className={filter === "finished" ? "bg-gradient-to-r from-emerald-500 to-blue-600" : ""}
              >
                Encerrados
              </Button>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filter === "today" ? "Jogos de Hoje" : filter === "tomorrow" ? "Jogos de Amanhã" : "Jogos Encerrados"}
          </h2>
          <p className="text-gray-600">
            Análises baseadas nos últimos 30 jogos de cada time
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white">
              <div className="space-y-4">
                {/* Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{match.time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {match.date}
                  </Badge>
                </div>

                {/* Teams */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-emerald-50 rounded-lg">
                    <span className="font-bold text-gray-900">{match.homeTeam}</span>
                    <span className="text-xs text-gray-500">Casa</span>
                  </div>
                  <div className="text-center text-gray-400 text-sm font-medium">VS</div>
                  <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                    <span className="font-bold text-gray-900">{match.awayTeam}</span>
                    <span className="text-xs text-gray-500">Fora</span>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Recomendação:</span>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                      {match.recommendation}
                    </Badge>
                  </div>

                  {/* Probability */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium">Probabilidade</span>
                      <span className="text-lg font-bold text-emerald-600">{match.probability}%</span>
                    </div>
                    <Progress value={match.probability} className="h-2" />
                  </div>

                  {/* Confidence */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 font-medium">Confiança</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < match.confidence
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/match/${match.id}`}>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold group">
                    Ver análise completa
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <TrendingUp className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum jogo disponível
            </h3>
            <p className="text-gray-600">
              Não há jogos para o período selecionado
            </p>
          </div>
        )}
      </main>

      {/* Footer Legal Notice */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs text-gray-700 text-center">
              <strong>Aviso Legal:</strong> Este aplicativo fornece análises estatísticas baseadas em dados históricos. 
              Não garantimos resultados. Apostas envolvem risco financeiro. Jogue com responsabilidade.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
