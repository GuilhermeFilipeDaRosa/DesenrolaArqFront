import { useEffect, useState } from 'react'

import StatCard from '../../components/StatCard'
import { buscarDashboard } from '../../services/dashboardService'
import type { DashboardData } from '../../services/dashboardService'

function Dashboard() {

  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarDashboard()
  }, [])

  async function carregarDashboard() {
    try {
      setCarregando(true)
      setErro('')

      const dados = await buscarDashboard()

      setDashboard(dados)

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      setErro('Não foi possível carregar os dados do dashboard.')
    } finally {
      setCarregando(false)
    }
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-slate-500">
          Carregando dashboard...
        </p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {erro}
        </p>
      </div>
    )
  }

  if (!dashboard) {
    return null
  }

  return (
    <div className="space-y-6">

      {/* Cabeçalho */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Acompanhe o processo de triagem dos seus candidatos.
        </p>
      </div>

      {/* Indicadores */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Vagas ativas"
          value={dashboard.vagasAtivas}
          description="Vagas em processo de recrutamento"
        />

        <StatCard
          title="Currículos recebidos"
          value={dashboard.curriculosRecebidos}
          description="Currículos enviados"
        />

        <StatCard
          title="Candidatos analisados"
          value={dashboard.candidatosAnalisados}
          description="Análises realizadas pela IA"
        />

        <StatCard
          title="Candidatos aprovados"
          value={dashboard.candidatosAprovados}
          description="Acima da nota de corte"
        />

      </div>

      {/* Conteúdo */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Candidatos por vaga */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-800">
            Candidatos por vaga
          </h2>

          <div className="mt-6 space-y-5">

            {dashboard.candidatosPorVaga.map((vaga) => (

              <div key={vaga.vagaId}>

                <div className="mb-2 flex justify-between text-sm">
                  <span>{vaga.vaga}</span>

                  <span className="font-medium">
                    {vaga.quantidade}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${
                        Math.min(
                          (vaga.quantidade /
                            Math.max(
                              ...dashboard.candidatosPorVaga.map(
                                (item) => item.quantidade
                              )
                            )) * 100,
                          100
                        )
                      }%`,
                    }}
                  />

                </div>

              </div>

            ))}

            {dashboard.candidatosPorVaga.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhuma candidatura registrada.
              </p>
            )}

          </div>

        </div>

        {/* Últimas análises */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-800">
            Últimas análises
          </h2>

          <div className="mt-4 divide-y divide-slate-100">

            {dashboard.ultimasAnalises.map((candidato) => (

              <div
                key={candidato.id}
                className="flex items-center justify-between py-4"
              >

                <div>
                  <p className="font-medium text-slate-800">
                    {candidato.nome}
                  </p>

                  <p className="text-sm text-slate-500">
                    {candidato.vaga}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    candidato.nota >= 7
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {candidato.nota.toFixed(1)}
                </span>

              </div>

            ))}

            {dashboard.ultimasAnalises.length === 0 && (
              <p className="py-4 text-sm text-slate-500">
                Nenhuma análise realizada.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard