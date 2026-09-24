import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  buscarVagaPorId,
  enviarCurriculos,
  type Vaga,
} from "../../services/vagaService";

import axios from 'axios'

function DetalhesVaga() {
  const { id } = useParams<{ id: string }>();

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [enviandoCurriculos, setEnviandoCurriculos] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = event.target.files;

    if (!arquivos || arquivos.length === 0 || !id) {
      return;
    }

    try {
      setEnviandoCurriculos(true);

      await enviarCurriculos(Number(id), Array.from(arquivos));

      alert("Currículos enviados com sucesso!");
    } catch (error) { 
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("Este candidato já está cadastrado para esta vaga.");
      } else {
        alert("Não foi possível enviar os currículos.");
      }
    } finally {
      setEnviandoCurriculos(false);

      // Permite selecionar novamente o mesmo arquivo
      event.target.value = "";
    }
  }

  useEffect(() => {
    async function carregarVaga() {
      try {
        if (!id) {
          setErro("Vaga não encontrada.");
          return;
        }

        const dados = await buscarVagaPorId(Number(id));
        setVaga(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a vaga.");
      } finally {
        setCarregando(false);
      }
    }

    carregarVaga();
  }, [id]);

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Carregando vaga...
      </div>
    );
  }

  if (erro || !vaga) {
    return (
      <div className="space-y-4">
        <Link
          to="/vagas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Voltar para vagas
        </Link>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {erro ?? "Vaga não encontrada."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/vagas"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
      >
        <ArrowLeft size={17} />
        Voltar para vagas
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{vaga.titulo}</h1>

          <p className="mt-1 text-slate-500">Detalhes da vaga</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            vaga.status === "ATIVA"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {vaga.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">Descrição</h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
            {vaga.descricao}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">Critérios</h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
            {vaga.criterios}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Nota de corte
          </h2>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {vaga.notaCorte.toFixed(1)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Instrução para IA
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
            {vaga.instrucaoIa}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Currículos</h2>

            <p className="mt-1 text-sm text-slate-500">
              Envie os currículos dos candidatos para análise.
            </p>
          </div>

          <label
            htmlFor="upload-curriculos"
            className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
              enviandoCurriculos
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {enviandoCurriculos ? "Enviando..." : "Upload de currículos"}
          </label>

          <input
            id="upload-curriculos"
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        <div className="mt-6 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            Selecione os currículos em PDF
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Você pode selecionar vários arquivos de uma vez.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetalhesVaga;
