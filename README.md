
# GitHub Explorer

  - [1. Descrição do Projeto](#1-descrição-do-projeto)
  - [2. Funcionalidades](#2-funcionalidades)
  - [3. Tecnologias Utilizadas](#3-tecnologias-utilizadas)
  - [4. Pré-requisitos](#4-pré-requisitos)
  - [5. Instalação](#5-instalação)
    - [5.1. Clonar o Repositório](#51-clonar-o-repositório)
    - [5.2. Acessar o Diretório do Projeto](#52-acessar-o-diretório-do-projeto)
    - [5.3. Instalar as Dependências](#53-instalar-as-dependências)
  - [6. Execução](#6-execução)
    - [6.1. Configurar Variáveis de Ambiente](#61-configurar-variáveis-de-ambiente)
    - [6.2. Iniciar a Aplicação](#62-iniciar-a-aplicação)
  - [7. Deploy](#7-deploy)
  - [8. Decisões Técnicas e Observações](#8-decisões-técnicas-e-observações)
    - [8.1. Vite sem React](#81-vite-sem-react)
    - [8.2. Hash Router próprio](#82-hash-router-próprio)
    - [8.3. Componentização sem framework](#83-componentização-sem-framework)
    - [8.4. Separação de estilos CSS por responsabilidade](#84-separação-de-estilos-css-por-responsabilidade)
    - [8.5. Template literals com suporte a HTML](#85-template-literals-com-suporte-a-html)
    - [8.6. Uso de !important no CSS](#86-uso-de-important-no-css)
    - [8.7. Tipagem separada por arquivos](#87-tipagem-separada-por-arquivos)

## 1. Descrição do Projeto
Aplicação client-side desenvolvida em TypeScript que consome a API pública do GitHub e permite buscar perfis de usuários, visualizar seus repositórios ordenados por popularidade e acessar os detalhes de cada repositório.

## 2. Funcionalidades
* **Busca de usuário:** pesquisa um perfil do GitHub pelo nome de usuário diretamente na tela inicial ou pela barra de navegação.
* **Detalhes do usuário:** exibe avatar, bio, e-mail, número de seguidores e de seguidos do perfil buscado.
* **Listagem de repositórios:** apresenta os repositórios públicos do usuário ordenados decrescentemente por número de estrelas.
* **Ordenação dinâmica:** permite reordenar os repositórios por estrelas, forks, nome ou data de atualização sem recarregar a página.
* **Detalhe do repositório:** exibe nome, descrição, quantidade de estrelas, linguagem principal e link externo para o repositório no GitHub.
* **Estados de erro:** trata respostas 404 (usuário ou repositório não encontrado) e erros genéricos de rede com mensagens amigáveis.
* **Loading skeleton:** exibe um esqueleto animado enquanto os dados são carregados da API.

## 3. Tecnologias Utilizadas
* **TypeScript:** Tipagem estática em todo o projeto.
* **Vite:** Servidor de desenvolvimento e bundler.
* **Axios:** Cliente HTTP para consumo da API do GitHub.
* **Bootstrap 5:** Layout responsivo e componentes base.
* **CSS customizado:** Tema dark inspirado na interface do GitHub, com variáveis CSS e estilos modularizados.

## 4. Pré-requisitos
* **Node.js 18+**
* **npm 9+**
* Para melhor experiência de desenvolvimento, instalar a extensão **ES6 String HTML** (`Tobermory.es6-string-html`) no VSCode, pois ela ativa o syntax highlighting e autocomplete de HTML dentro dos template literals TypeScript.

## 5. Instalação
### 5.1. Clonar o Repositório
```sh
git clone https://github.com/aaronalvesvs-web3/desbravador-tech-challenge.git
```

### 5.2. Acessar o Diretório do Projeto
```sh
cd desbravador-tech-challenge
```

### 5.3. Instalar as Dependências
```sh
npm install
```

## 6. Execução
### 6.1. Configurar Variáveis de Ambiente
* Para habilitar as variáveis de ambiente, basta renomear o arquivo `.env.example` para `.env`.

### 6.2. Iniciar a Aplicação
```sh
npm run dev
```
* A aplicação estará disponível em **http://localhost:5173**

## 7. Deploy
O deploy da aplicação foi realizado na **Vercel** para facilitar os testes. Acesse através do link abaixo:

* **[GitHub Explorer](https://desbravador-tech-challenge.vercel.app/#/)**

## 8. Decisões Técnicas e Observações

### 8.1. Vite sem React
O **Vite** foi adotado exclusivamente como servidor de desenvolvimento e bundler. Ele não impõe nenhuma camada de UI, servindo apenas para compilar TypeScript e servir os arquivos em desenvolvimento.

### 8.2. Hash Router próprio
Foi implementado um **hash router próprio** em `src/router.ts` usando `window.location.hash` e `hashchange`, sem nenhuma biblioteca externa. O roteador suporta parâmetros dinâmicos (`:username`, `:repoName`) e um sistema de **render + mount assíncrono**: o HTML do esqueleto de carregamento é inserido imediatamente de forma síncrona, e então a função `mount` busca os dados da API e atualiza o DOM, garantindo feedback visual instantâneo ao usuário.

### 8.3. Componentização sem framework
Seguindo o princípio de componentização do React (blocos reutilizáveis), foram criados componentes em `src/components/` como funções TypeScript que retornam strings HTML. Os principais componentes são `Navbar.ts`, `RepoCard.ts` e `StatCard.ts`. Todos importados pelas páginas, evitando duplicidade no código.

### 8.4. Separação de estilos CSS por responsabilidade
O CSS foi dividido em arquivos específicos por contexto: `globals.css` (variáveis, base, animações), `navbar.css`, `home.css`, `user-profile.css` e `repo-detail.css`. Essa separação facilita a manutenção e localização de estilos, além de comunicar claramente a qual parte da aplicação cada regra pertence.

### 8.5. Template literals com suporte a HTML
Como os componentes retornam strings de template literal TypeScript, o autocomplete nativo do editor não reconhece HTML dentro dessas strings. Para resolver isso, foi criado o utilitário `src/utils/html.ts` que exporta `export const html = String.raw`, usado como tag de template (`html\`...\``). A extensão **ES6 String HTML** do VSCode reconhece essa tag e ativa syntax highlighting e autocomplete de HTML dentro dos templates.

### 8.6. Uso de !important no CSS
A maioria das declarações `!important` foi necessária para sobrescrever os estilos internos do Bootstrap 5, que aplica regras com alta especificidade em classes como `.btn`, `.form-control`, `.navbar` e `.input-group-text`.

### 8.7. Tipagem separada por arquivos
Cada tipo / interface TypeScript possui seu próprio arquivo na pasta `src/types/`, seguindo a convenção `<nome>.types.ts`. Um arquivo `index.ts` (barrel) re-exporta todos os tipos, mantendo os imports das páginas e componentes simples (`from '../types'`). Essa estrutura torna a localização e manutenção das tipagens mais intuitiva à medida que o projeto cresce.
