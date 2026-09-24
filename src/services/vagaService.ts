import api from './api'

export interface Vaga {
  id: number
  titulo: string
  descricao: string
  criterios: string
  instrucaoIa: string
  notaCorte: number,
  status: string
}

export async function listarVagas(): Promise<Vaga[]> {
  const response = await api.get<Vaga[]>('/vagas')

  return response.data
}

export async function criarVaga(
  vaga: Omit<Vaga, 'id'>
): Promise<Vaga> {
  const response = await api.post<Vaga>('/vagas', vaga)

  return response.data
}

export async function buscarVagaPorId(id: number): Promise<Vaga> {
  const response = await api.get<Vaga>(`/vagas/${id}`)
  return response.data
}

export async function enviarCurriculos(
  vagaId: number,
  arquivos: File[]
): Promise<void> {
  for (const arquivo of arquivos) {
    const formData = new FormData()

    formData.append('arquivo', arquivo)

    await api.post(
      `/curriculo/${vagaId}`,
      formData
    )
  }
}