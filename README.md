# JS-ATV-JOGOFORCA

**Nome: Pedro Daniel Souza Leal**  

**REGRAS DO JOGO**  

- O jogo sorteia uma palavra de uma categoria escolhida pelo jogador.
- A cada rodada o jogador tenta adivinhar a palavra digitando uma letra por vez.
- Cada letra errada conta como 1 erro, o número máximo de erros depende da dificuldade escolhida.
- O jogador vence quando descobre todas as letras da palavra antes de esgotar as tentativas.
- O jogo diferencia maiúsculas de minúsculas: as palavras estão em maiúcula, então você deve digitar as letras em maiúsculo.
- O jogo não aceita acentos letras como á ou ç são consideradas inválidsa.
- O número de erros é mostrado por um contador.
- Letras repetidas ou inválidas não contam como erro, o jogo apenas avisa e pede outra letra.

**COMO JOGAR**  

1. Iniciar informando o nome.
2. Escolha a dificuldade: Fácil, Médio ou Difícil.
3. Escolha uma categoria: cores, instrumentos musicais ou meios de transporte ou a opção aleatória.
4. Digite uma letra maiúscula e pressione Enter.
5. Digite dica para receber uma dica sobre a palavra existe uma penalidade se usar.
6. Ao final da rodada veja o resultado e escolha se quer jogar novamente.

**COMO EXECUTAR**  

1. Clone o repositório ou acesse pelo codespace.
2. inicie o jogo pelo terminal 'npm start'.

**Bônus**  
Sistema de Dicas  
- Cada palavra no banco de palavras possui uma dica associada a ela.
- O jogador pode solicitar a dica digitando dica durante a rodada.
- Penalidade: Usar a dica desconta 20 pontos da pontuação final da rodada.
- A dica só pode ser usada uma vez por rodada.

**Como a pontuação é calculada**  
- +10 pontos para cada letra correta descoberta.
- Bônus de vitória: tentativas restantes × 15 pontos ao acertar a palavra.
- −20 pontos se a dica for utilizada.
- A pontuação nunca fica negativa.
- A pontuação é acumulada entre as rodadas seguidas.

**Personalizações**  

- Níveis de dificuldade (Fácil, Médio e Difícil), que mudam o número de erros permitidos.
- Exibe o número de erros com um contador.
- O jogo é sensível a maiúsculas/minúsculas e não aceita acentos.
- O jogador pode escolher a categoria ou deixar o jogo sortear aleatoriamente.
- Há múltiplas rodadas seguidas com placar acumulado.

**CRÉDITOS**  

- Documentação do Node: https://nodejs.org/api/readline.html
- Documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- Acentos e maiúsculas/minúsculas: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Acentos e maiúsculas/minúsculas: https://www.horadecodar.com.br/como-remover-acentos-em-javascript/
- Referência da lógica do jogo: https://www.youtube.com/watch?v=zvbaQZt_89s     ,      https://www.youtube.com/watch?v=79eON_zPRy8

**LICENÇA DO PROJETO**
`MIT`


