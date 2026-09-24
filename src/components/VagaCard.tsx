import { ArrowRight } from 'lucide-react'
import type { Vaga } from '../services/vagaService'
import { Link } from 'react-router-dom'

interface VagaCardProps {
  vaga: Vaga
}

function VagaCard({ vaga }: VagaCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between gap-4">

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {vaga.titulo}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {vaga.descricao}
          </p>
        </div>

        <span
  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
    vaga.status === 'ATIVA'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'
  }`}
>
  {vaga.status}
</span>

      </div>

      <div className="mt-5">

        <p className="text-sm font-medium text-slate-600">
          Critérios
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {vaga.criterios}
        </p>

      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

        <div className="text-sm text-slate-500">
          Nota de corte:{' '}

          <strong className="text-slate-700">
            {vaga.notaCorte.toFixed(1)}
          </strong>
        </div>

       <Link
  to={`/vagas/${vaga.id}`}
  className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
>
  Ver vaga
  <ArrowRight size={17} />
</Link>

      </div>

    </div>
  )
}

export default VagaCard