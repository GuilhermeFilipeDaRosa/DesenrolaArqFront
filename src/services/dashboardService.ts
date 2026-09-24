import api from './api'

export interface CandidatosPorVaga {
  vagaId: number
  vaga: string
  quantidade: number
}

export interface UltimaAnalise {
  id: number
  nome: string
  vaga: string
  nota: number
}

export interface DashboardData {
  vagasAtivas: number
  curriculosRecebidos: number
  candidatosAnalisados: number
  candidatosAprovados: number
  candidatosPorVaga: CandidatosPorVaga[]
  ultimasAnalises: UltimaAnalise[]
}

export async function buscarDashboard(): Promise<DashboardData> {
  const response = await api.get<DashboardData>('/dashboard')

  return response.data
}