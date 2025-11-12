"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, TrendingUp, Star, Shield, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - em produção viria do banco de dados
const mockMatchData = {
  id: 1,
  homeTeam: "Flamengo",
  awayTeam: "Palmeiras",
  time: "16:00",
  date: "2024-01-20",
  recommendation: "Over 1.5 gols",
  probability: 78,
  confidence: 4,
  analystNotes: "Ambas as equipes apresentam média alta de gols nos últimos jogos. Flamengo tem 82% de jogos com mais de 1.5 gols em casa, enquanto Palmeiras marca em 76% das partidas como visitante.",
  stats: {
    possession: { home: 58, away: 42 },
    xg: { home: 1.8, away: 1.4 },
    bigChances: { home: 3.2, away: 2.1 },
    shots: { home: 14.5, away: 11.2 },
    saves: { home: 3.8, away: 4.5 },
    corners: { home: 6.3, away: 4.8 },
    fouls: { home: 12.1, away: 13.5 },
    passes: { home: 485, away: 398 },
    tackles: { home: 16.2, away: 18.7 },
    freekicks: { home: 4.2, away: 5.1 },
    yellowCards: { home: 2.3, away: 2.8 }
  }
}

interface StatBarProps {
  label: string
  homeValue: number
  awayValue: number
  homeTeam: string
  awayTeam: string
  isPercentage?: boolean
  decimals?: number
}

function StatBar({ label, homeValue, awayValue, homeTeam, awayTeam, isPercentage = false, decimals = 1 }: StatBarProps) {
  const total = homeValue + awayValue
  const homePercent = (homeValue / total) * 100
  const awayPercent = (awayValue / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-emerald-700">
          {isPercentage ? `${homeValue}%` : homeValue.toFixed(decimals)}
        </span>
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-semibold text-blue-700">
          {isPercentage ? `${awayValue}%` : awayValue.toFixed(decimals)}
        </span>
      </div>
      <div className="flex gap-1 h-3">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full transition-all duration-500"
          style={{ width: `${homePercent}%` }}
        />
        <div 
          className="bg-gradient-to-l from-blue-500 to-blue-400 rounded-r-full transition-all duration-500"
          style={{ width: `${awayPercent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{homeTeam}</span>
        <span>{awayTeam}</span>
      </div>
    </div>
  )
}

export default function MatchDetailPage() {
  const params = useParams()
  const [trialTime, setTrialTime] = useState(30 * 60)
  const [isTrialActive, setIsTrialActive] = useState(true)

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

  const match = mockMatchData

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BetAnalytics</h1>
                <p className="text-xs text-gray-500">Análise Detalhada</p>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Header */}
        <Card className="p-6 mb-8 bg-white shadow-xl border-2 border-emerald-100">
          <div className="space-y-6">
            {/* Date and Time */}
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
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{match.homeTeam}</h2>
                <p className="text-xs text-gray-500 mt-1">Mandante</p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400 mb-2">VS</div>
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                  {match.time}
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{match.awayTeam}</h2>
                <p className="text-xs text-gray-500 mt-1">Visitante</p>
              </div>
            </div>

            {/* Recommendation Highlight */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Recomendação Matemática:</span>
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-base px-4 py-1">
                  {match.recommendation}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Probabilidade</span>
                    <span className="text-2xl font-bold text-emerald-600">{match.probability}%</span>
                  </div>
                  <Progress value={match.probability} className="h-3" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Confiança</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < match.confidence
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics Section */}
        <Card className="p-6 mb-8 bg-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl font-bold text-gray-900">Estatísticas Comparativas</h3>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Média dos últimos 30 jogos de cada time
          </p>

          <div className="space-y-6">
            <StatBar
              label="Posse de Bola"
              homeValue={match.stats.possession.home}
              awayValue={match.stats.possession.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              isPercentage
              decimals={0}
            />

            <StatBar
              label="Gols Esperados (xG)"
              homeValue={match.stats.xg.home}
              awayValue={match.stats.xg.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Grandes Chances"
              homeValue={match.stats.bigChances.home}
              awayValue={match.stats.bigChances.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Finalizações"
              homeValue={match.stats.shots.home}
              awayValue={match.stats.shots.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Defesas do Goleiro"
              homeValue={match.stats.saves.home}
              awayValue={match.stats.saves.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Escanteios"
              homeValue={match.stats.corners.home}
              awayValue={match.stats.corners.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Faltas"
              homeValue={match.stats.fouls.home}
              awayValue={match.stats.fouls.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Passes"
              homeValue={match.stats.passes.home}
              awayValue={match.stats.passes.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              decimals={0}
            />

            <StatBar
              label="Desarmes"
              homeValue={match.stats.tackles.home}
              awayValue={match.stats.tackles.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Faltas (Tiros Diretos)"
              homeValue={match.stats.freekicks.home}
              awayValue={match.stats.freekicks.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <StatBar
              label="Cartões Amarelos"
              homeValue={match.stats.yellowCards.home}
              awayValue={match.stats.yellowCards.away}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
          </div>
        </Card>

        {/* Analyst Notes */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Análise do Especialista</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {match.analystNotes}
          </p>
          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <p className="text-sm text-gray-700">
              <strong>Conclusão:</strong> Baseado em 30 partidas recentes, a probabilidade matemática para{" "}
              <span className="font-bold text-emerald-600">{match.recommendation}</span> é de{" "}
              <span className="font-bold text-emerald-600">{match.probability}%</span>.
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        {isTrialActive && trialTime > 0 && (
          <Card className="p-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Gostou das análises?</h3>
            <p className="mb-4 opacity-90">
              Assine agora e tenha acesso ilimitado a todas as análises matemáticas
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                Assinar por R$ 19,90
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                Ver planos
              </Button>
            </div>
            <p className="text-xs mt-4 opacity-75">
              Primeiro mês por R$ 19,90, depois R$ 59,90/mês
            </p>
          </Card>
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
