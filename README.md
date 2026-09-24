# DesenrolaArq — Frontend

Frontend da plataforma **DesenrolaArq**, uma solução para automação do processo de recrutamento e análise de candidatos.

A aplicação permite que recrutadores cadastrem e gerenciem vagas, definam critérios de avaliação e acompanhem as análises de candidatos realizadas pela plataforma.

## 🚀 Sobre o projeto

O **DesenrolaArq** tem como objetivo automatizar etapas do processo seletivo, reduzindo tarefas manuais realizadas por recrutadores.

O frontend é responsável pela interface da aplicação e pela comunicação com o backend através de uma **API REST**.

Entre as funcionalidades previstas e implementadas estão:

* 📊 Dashboard com informações do processo seletivo
* 💼 Cadastro e gerenciamento de vagas
* ✏️ Edição de vagas
* 🔄 Ativação e desativação de vagas
* 📄 Upload de currículos
* 👤 Cadastro e gerenciamento de candidatos
* 🤖 Integração com análise automatizada dos currículos
* 📈 Visualização dos resultados das análises
* 🔎 Acompanhamento das candidaturas

---

## 🛠️ Tecnologias

O projeto foi desenvolvido utilizando:

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **JavaScript / HTML / CSS**

### Backend

O frontend se comunica com uma API desenvolvida em:

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL

Repositório do backend:

**DesenrolaArq Backend**

---

## 📂 Estrutura do projeto

A estrutura principal do frontend está organizada da seguinte forma:

```text
src/
├── components/
│   ├── ...
│
├── pages/
│   ├── Dashboard/
│   ├── Vagas/
│   ├── Candidatos/
│   └── ...
│
├── services/
│   ├── api.ts
│   ├── vagaService.ts
│   ├── dashboardService.ts
│   └── ...
│
├── App.tsx
├── main.tsx
└── ...
```

### Components

Contém componentes reutilizáveis da interface, como cards, formulários e elementos utilizados em diferentes páginas.

### Pages

Contém as telas principais da aplicação.

Exemplos:

* Dashboard
* Listagem de vagas
* Cadastro de vaga
* Detalhes da vaga
* Candidatos

### Services

Responsável pela comunicação com o backend através da API REST.

A configuração do Axios e os serviços específicos de cada recurso ficam separados nessa camada.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm

Também é necessário que o backend do **DesenrolaArq** esteja em execução para que as funcionalidades que dependem da API funcionem corretamente.

---

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/GuilhermeFilipeDaRosa/DesenrolaArqFront.git
```

Entre na pasta do projeto:

```bash
cd DesenrolaArqFront
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará a aplicação em um endereço semelhante a:

```text
http://localhost:5173
```

O endereço exibido no terminal deve ser utilizado caso a porta padrão esteja ocupada.

---

## 🔌 Comunicação com o Backend

O frontend utiliza uma API REST para realizar operações como:

* Buscar vagas
* Criar vagas
* Atualizar vagas
* Alterar status das vagas
* Enviar currículos
* Buscar informações do dashboard
* Consultar candidatos e análises

Durante o desenvolvimento local, o backend está configurado para executar na porta:

```text
http://localhost:8081
```

A configuração da comunicação com a API fica centralizada no serviço:

```text
src/services/api.ts
```

---

## 📊 Dashboard

O Dashboard apresenta informações resumidas do processo seletivo, como:

* Total de vagas
* Vagas ativas
* Candidatos
* Análises realizadas
* Últimas análises

Os dados são obtidos através da API do backend.

---

## 💼 Gerenciamento de vagas

A aplicação permite criar e gerenciar vagas.

Cada vaga pode possuir informações como:

* Título
* Descrição
* Critérios
* Instrução para análise da IA
* Nota de corte
* Status

Os possíveis status da vaga incluem:

```text
ATIVA
INATIVA
```

Vagas inativas podem ser mantidas no sistema sem aparecer como oportunidades atualmente disponíveis.

---

## 📄 Upload de currículos

Na tela de detalhes da vaga, o recrutador pode realizar o upload de currículos.

O arquivo é enviado para o backend através de uma requisição `multipart/form-data`.

Exemplo de endpoint:

```text
POST /api/vagas/{vagaId}/curriculos
```

Após o envio, o backend poderá processar o currículo e realizar as etapas de cadastro e análise do candidato.

---

## 🤖 Análise automatizada

Uma das principais funcionalidades do DesenrolaArq é a possibilidade de utilizar inteligência artificial para auxiliar na análise dos candidatos.

A vaga possui uma configuração de critérios e uma instrução para a análise.

Exemplo:

```text
Nota de corte: 7.5

Critérios:
Java, Spring Boot, SQL, React

Instrução:
Avalie a compatibilidade do candidato com os critérios
definidos para esta vaga.
```

O backend é responsável pelo processamento da análise e o frontend apresenta os resultados ao recrutador.

---

## 🎯 Objetivo do projeto

O DesenrolaArq está sendo desenvolvido como um projeto de estudo e portfólio, aplicando conceitos utilizados no desenvolvimento de aplicações reais:

* Desenvolvimento frontend moderno
* TypeScript
* Componentização
* Consumo de APIs REST
* Integração frontend/backend
* CRUD
* Upload de arquivos
* Integração com inteligência artificial
* Persistência de dados
* Organização de código
* Separação de responsabilidades

---

## 📌 Status do projeto

🚧 **Em desenvolvimento**

Novas funcionalidades estão sendo implementadas gradualmente, principalmente relacionadas ao processamento de currículos, cadastro de candidatos e análise automatizada.

---

## 👨‍💻 Autor

**Guilherme Filipe da Rosa**

Desenvolvedor de Software

GitHub:

`https://github.com/GuilhermeFilipeDaRosa`

---

## 📄 Licença

Este projeto está sendo desenvolvido para fins de estudo, portfólio e demonstração de conhecimentos em desenvolvimento de software.
