# Projeto Trivia! :question:
Projeto desenvolvido grupo durante o curso de Desenvolvimento Web na Trybe. Divulgado aqui como portfólio de aprendizado.

<details>
<summary><strong>Objetivos do projeto:</strong></summary>

  * Desenvolver um jogo de perguntas e respostas baseado no jogo Trivia utilizando `React` e `Redux`, desenvolvendo em grupo suas funcionalidades de acordo com as demandas definidas em um quadro `Kanban`.
  * Verificar se eu era capaz de:
    * Criar um `store Redux` em aplicações `React`.
    * Criar `reducers` no `Redux` em aplicações `React`.
    * Criar `actions` no `Redux` em aplicações `React`.
    * Criar `dispatchers` no `Redux` em aplicações `React`.
    * Conectar `Redux` aos componentes `React`.
    * Criar `actions` assíncronas na sua aplicação `React` que faz uso de `Redux`.
    * Escrever testes para garantir que sua aplicação possua uma boa cobertura de testes.
</details>
<details>
<summary><strong> Requisitos do projeto:</strong></summary>

  * TELA DE LOGIN
    * Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo.
    * Crie o botão de iniciar o jogo.
    * Crie um botão na tela inicial que leve para a tela de configurações.
    * Desenvolva testes para atingir 90% de cobertura da tela de Login.
  * TELA DE JOGO
    * Crie a página de jogo que deve conter as informações relacionadas à pergunta.
    * Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas.
    * Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder.
    * Crie o placar.
    * Crie um botão de `Next` que apareça após a resposta ser dada.
    * Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total.
   * TELA DE FEEDBACK
     * Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora.
     * Crie a mensagem de _feedback_ para ser exibida a pessoa usuária.
     * Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária.
     * Crie a opção para a pessoa jogadora poder jogar novamente.
     * Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_.
     * Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks.
   * TELA DE RANKING
     * Crie um botão para ir ao início.
     * Crie o conteúdo da tela de _ranking_.
     * Desenvolva testes para atingir 90% de cobertura da tela de Rankings.
   * Desenvolva testes para atingir 90% de cobertura da tela de Jogo.
   * Desenvolva testes para atingir 95% de cobertura total.
</details>
  
## Rodando o projeto localmente

Para rodar o projeto em sua máquina, abra seu terminal, crie um diretório no local de sua preferência com o comando `mkdir` e acesse o diretório criado com o comando `cd`:

```bash
mkdir meu-diretorio &&
cd meu-diretorio
```

Clone o projeto com o comando `git clone`:

```bash
git clone git@github.com:marcosadrianoti/tb-trivia-react-redux.git
```

Acesse o diretório do projeto com o comando `cd`:

```bash
cd tb-trivia-react-redux
```

Instale as dependências executando:

```bash
npm install
```

Execute a aplicação:

```bash
npm run start
```

Para executar os testes:

```bash
npm run test
```

Para executar os testes de cobertura:

```bash
npm run test-coverage
```
Para executar os testes com o Cypress:

```bash
npm run cy:open
```
