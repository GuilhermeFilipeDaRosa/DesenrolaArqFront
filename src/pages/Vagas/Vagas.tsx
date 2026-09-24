import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import VagaCard from '../../components/VagaCard'
import {
  listarVagas,
  type Vaga,
} from '../../services/vagaService'

function Vagas() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarVagas() {
      try {
        const dados = await listarVagas()

        setVagas(dados)
      } catch (error) {
        console.error(error)

        setErro('Não foi possível carregar as vagas.')
      } finally {
        setCarregando(false)
      }
    }

    carregarVagas()
  }, [])

  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Vagas
          </h1>

          <p className="mt-1 text-slate-500">
            Gerencie as vagas utilizadas nas análises.
          </p>
        </div>

        <Link
          to="/vagas/nova"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Nova vaga
        </Link>

      </div>

      {carregando && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Carregando vagas...
        </div>
      )}

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {erro}
        </div>
      )}

      {!carregando && !erro && vagas.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="font-medium text-slate-700">
            Nenhuma vaga cadastrada.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Cadastre sua primeira vaga para começar.
          </p>
        </div>
      )}

      {!carregando && !erro && vagas.length > 0 && (
        <div className="space-y-4">

          {vagas.map((vaga) => (
            <VagaCard
              key={vaga.id}
              vaga={vaga}
            />
          ))}

        </div>
      )}

    </div>
  )
}

export default Vagas