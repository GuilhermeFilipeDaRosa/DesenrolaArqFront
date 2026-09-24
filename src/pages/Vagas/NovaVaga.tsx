import { criarVaga } from '../../services/vagaService'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate  } from 'react-router-dom'
import { useState } from 'react'



interface VagaFormData {
  titulo: string
  descricao: string
  tecnologias: string
  prompt: string
  notaCorte: number
}

function NovaVaga() {
  const [formData, setFormData] = useState<VagaFormData>({
    titulo: '',
    descricao: '',
    tecnologias: '',
    prompt: '',
    notaCorte: 7,
  })

  const navigate = useNavigate()

  const [salvando, setSalvando] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setFormData((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault()

  try {

       setSalvando(true)

    await criarVaga({
      titulo: formData.titulo,
      descricao: formData.descricao,
      criterios: formData.tecnologias,
      instrucaoIa: formData.prompt,
      notaCorte: formData.notaCorte,
      status: 'ATIVA'
    })

    
    navigate('/vagas')
  } catch (error) {
    console.error(error)

    alert('Não foi possível cadastrar a vaga.')
  } finally {
    setSalvando(false)
  }
}
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/vagas"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Nova vaga
          </h1>

          <p className="mt-1 text-slate-500">
            Configure a vaga e os critérios utilizados pela análise.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Informações da vaga
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-slate-700"
              >
                Título da vaga
              </label>

              <input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex.: Desenvolvedor Java Pleno"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-slate-700"
              >
                Descrição da vaga
              </label>

              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={5}
                placeholder="Descreva as responsabilidades, requisitos e informações da vaga..."
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="tecnologias"
                className="block text-sm font-medium text-slate-700"
              >
                Tecnologias e critérios
              </label>

              <input
                id="tecnologias"
                name="tecnologias"
                value={formData.tecnologias}
                onChange={handleChange}
                placeholder="Ex.: Java, Spring Boot, REST, SQL, React"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-500">
                Separe os critérios por vírgula.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Configuração da análise por IA
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-slate-700"
              >
                Instruções para a IA
              </label>

              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                rows={7}
                placeholder="Ex.: Analise o currículo considerando experiência profissional, conhecimento técnico e aderência aos requisitos da vaga..."
                className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-500">
                Essas instruções serão utilizadas posteriormente pelo backend
                para orientar a análise do currículo.
              </p>
            </div>

            <div className="max-w-xs">
              <label
                htmlFor="notaCorte"
                className="block text-sm font-medium text-slate-700"
              >
                Nota de corte
              </label>

              <input
                id="notaCorte"
                name="notaCorte"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.notaCorte}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-slate-500">
                Ex.: candidatos com nota igual ou superior a 7 serão considerados aprovados.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            to="/vagas"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </Link>

        <button
  type="submit"
  disabled={salvando}
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  <Save size={18} />

  {salvando ? 'Salvando...' : 'Salvar vaga'}
</button>
        </div>
      </form>
    </div>
  )
}

export default NovaVaga