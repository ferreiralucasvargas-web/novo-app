"use client"

import { useState } from "react"
import { TrendingUp, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  time: string
  date: string
  recommendation: string
  probability: number
  confidence: number
  status: string
  stats: {
    possession: { home: number; away: number }
    xg: { home: number; away: number }
    bigChances: { home: number; away: number }
    shots: { home: number; away: number }
    saves: { home: number; away: number }
    corners: { home: number; away: number }
    fouls: { home: number; away: number }
    passes: { home: number; away: number }
    tackles: { home: number; away: number }
    freekicks: { home: number; away: number }
    yellowCards: { home: number; away: number }
  }
  analystNotes: string
}

const initialMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Flamengo",
    awayTeam: "Palmeiras",
    time: "16:00",
    date: "2024-01-20",
    recommendation: "Over 1.5 gols",
    probability: 78,
    confidence: 4,
    status: "upcoming",
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
    },
    analystNotes: "Ambas as equipes apresentam média alta de gols nos últimos jogos."
  }
]

export default function AdminPage() {
  const [matches, setMatches] = useState<Match[]>(initialMatches)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [formData, setFormData] = useState<Partial<Match>>({
    homeTeam: "",
    awayTeam: "",
    time: "",
    date: "",
    recommendation: "",
    probability: 50,
    confidence: 3,
    status: "upcoming",
    analystNotes: "",
    stats: {
      possession: { home: 50, away: 50 },
      xg: { home: 1.0, away: 1.0 },
      bigChances: { home: 2.0, away: 2.0 },
      shots: { home: 10.0, away: 10.0 },
      saves: { home: 3.0, away: 3.0 },
      corners: { home: 5.0, away: 5.0 },
      fouls: { home: 12.0, away: 12.0 },
      passes: { home: 400, away: 400 },
      tackles: { home: 15.0, away: 15.0 },
      freekicks: { home: 4.0, away: 4.0 },
      yellowCards: { home: 2.0, away: 2.0 }
    }
  })

  const handleSave = () => {
    if (editingMatch) {
      setMatches(matches.map(m => m.id === editingMatch.id ? { ...formData, id: editingMatch.id } as Match : m))
    } else {
      const newMatch = {
        ...formData,
        id: Math.max(...matches.map(m => m.id), 0) + 1
      } as Match
      setMatches([...matches, newMatch])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (match: Match) => {
    setEditingMatch(match)
    setFormData(match)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este jogo?")) {
      setMatches(matches.filter(m => m.id !== id))
    }
  }

  const resetForm = () => {
    setEditingMatch(null)
    setFormData({
      homeTeam: "",
      awayTeam: "",
      time: "",
      date: "",
      recommendation: "",
      probability: 50,
      confidence: 3,
      status: "upcoming",
      analystNotes: "",
      stats: {
        possession: { home: 50, away: 50 },
        xg: { home: 1.0, away: 1.0 },
        bigChances: { home: 2.0, away: 2.0 },
        shots: { home: 10.0, away: 10.0 },
        saves: { home: 3.0, away: 3.0 },
        corners: { home: 5.0, away: 5.0 },
        fouls: { home: 12.0, away: 12.0 },
        passes: { home: 400, away: 400 },
        tackles: { home: 15.0, away: 15.0 },
        freekicks: { home: 4.0, away: 4.0 },
        yellowCards: { home: 2.0, away: 2.0 }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-xs text-gray-500">Gerenciamento de Jogos e Análises</p>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Jogo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMatch ? "Editar Jogo" : "Novo Jogo"}</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do jogo e as estatísticas dos últimos 30 jogos
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Informações Básicas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="homeTeam">Time Mandante</Label>
                        <Input
                          id="homeTeam"
                          value={formData.homeTeam}
                          onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                          placeholder="Ex: Flamengo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="awayTeam">Time Visitante</Label>
                        <Input
                          id="awayTeam"
                          value={formData.awayTeam}
                          onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                          placeholder="Ex: Palmeiras"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Data</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Horário</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Recomendação</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="recommendation">Tipo de Aposta</Label>
                        <Input
                          id="recommendation"
                          value={formData.recommendation}
                          onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                          placeholder="Ex: Over 1.5 gols"
                        />
                      </div>
                      <div>
                        <Label htmlFor="probability">Probabilidade (%)</Label>
                        <Input
                          id="probability"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.probability}
                          onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confidence">Confiança (1-5)</Label>
                        <Select
                          value={formData.confidence?.toString()}
                          onValueChange={(value) => setFormData({ ...formData, confidence: Number(value) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n} estrela{n > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Estatísticas (Média dos últimos 30 jogos)</h3>
                    <div className="space-y-3">
                      {[
                        { key: "possession", label: "Posse de Bola (%)" },
                        { key: "xg", label: "Gols Esperados (xG)" },
                        { key: "bigChances", label: "Grandes Chances" },
                        { key: "shots", label: "Finalizações" },
                        { key: "saves", label: "Defesas do Goleiro" },
                        { key: "corners", label: "Escanteios" },
                        { key: "fouls", label: "Faltas" },
                        { key: "passes", label: "Passes" },
                        { key: "tackles", label: "Desarmes" },
                        { key: "freekicks", label: "Faltas (Tiros Diretos)" },
                        { key: "yellowCards", label: "Cartões Amarelos" }
                      ].map((stat) => (
                        <div key={stat.key} className="grid grid-cols-3 gap-4 items-center">
                          <Label className="text-sm">{stat.label}</Label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Mandante"
                            value={formData.stats?.[stat.key as keyof typeof formData.stats]?.home || 0}
                            onChange={(e) => setFormData({
                              ...formData,
                              stats: {
                                ...formData.stats!,
                                [stat.key]: {
                                  ...formData.stats![stat.key as keyof typeof formData.stats],
                                  home: Number(e.target.value)
                                }
                              }
                            })}
                          />
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Visitante"
                            value={formData.stats?.[stat.key as keyof typeof formData.stats]?.away || 0}
                            onChange={(e) => setFormData({
                              ...formData,
                              stats: {
                                ...formData.stats!,
                                [stat.key]: {
                                  ...formData.stats![stat.key as keyof typeof formData.stats],
                                  away: Number(e.target.value)
                                }
                              }
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyst Notes */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Observações do Analista</h3>
                    <Textarea
                      value={formData.analystNotes}
                      onChange={(e) => setFormData({ ...formData, analystNotes: e.target.value })}
                      placeholder="Adicione observações sobre a análise..."
                      rows={4}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false)
                        resetForm()
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingMatch ? "Atualizar" : "Publicar"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jogos Cadastrados</h2>
          <p className="text-gray-600">Total: {matches.length} jogo(s)</p>
        </div>

        <div className="grid gap-4">
          {matches.map((match) => (
            <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{match.date}</Badge>
                    <Badge variant="outline">{match.time}</Badge>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                      {match.recommendation}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-gray-900">{match.homeTeam}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="font-bold text-lg text-gray-900">{match.awayTeam}</span>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Probabilidade: </span>
                      <span className="font-bold text-emerald-600">{match.probability}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Confiança: </span>
                      <span className="font-bold text-amber-600">{match.confidence}/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(match)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(match.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {matches.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum jogo cadastrado
              </h3>
              <p className="text-gray-600 mb-4">
                Clique em "Novo Jogo" para adicionar sua primeira análise
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
