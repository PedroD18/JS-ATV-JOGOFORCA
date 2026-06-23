const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bancoDePalavras = {
  Cores: [
    { palavra: "VERMELHO", dica: "Cor do morango" },
    { palavra: "AZUL", dica: "Cor do céu limpo" },
    { palavra: "AMARELO", dica: "Cor do sol" },
    { palavra: "VERDE", dica: "Cor da grama" },
    { palavra: "BRANCO", dica: "Cor da neve" },
    { palavra: "PRETO", dica: "A cor mais escura de todas" },
    { palavra: "ROXO", dica: "Mistura de azul com vermelho" },
  ],
  Instrumentos: [
    { palavra: "VIOLAO", dica: "Instrumento de cordas tocado com os dedos" },
    { palavra: "BATERIA", dica: "Conjunto de tambores e pratos" },
    { palavra: "PIANO", dica: "Tem teclas brancas e pretas" },
    { palavra: "FLAUTA", dica: "Instrumento de sopro pequeno" },
    { palavra: "VIOLINO", dica: "Tocado com um arco, apoiado no ombro" },
    { palavra: "SAXOFONE", dica: "Instrumento de sopro muito usado no jazz" },
    { palavra: "TROMPETE", dica: "Instrumento de sopro de metal dourado" },
  ],
  Transportes: [
    { palavra: "BICICLETA", dica: "Tem duas rodas e pedais" },
    { palavra: "AVIAO", dica: "Voa pelos céus" },
    { palavra: "NAVIO", dica: "Transporte grande que anda no mar" },
    { palavra: "ONIBUS", dica: "Transporte coletivo urbano" },
    { palavra: "METRO", dica: "Trem que anda por baixo da cidade" },
    { palavra: "CAMINHAO", dica: "Transporta cargas pesadas" },
    { palavra: "HELICOPTERO", dica: "Voa com hélices girando no topo" },
  ],
};

const PENALIDADE_USO_DICA = 20;

function exibirPalavra(palavra, acertos) {
  return [...palavra].map((l) => (acertos.includes(l) ? l : "_")).join(" ");
}

async function jogarRodada(nome) {
  console.log("\nEscolha a dificuldade do jogo:");
  console.log("  1) Fácil   (8 erros permitidos)");
  console.log("  2) Médio   (6 erros permitidos)");
  console.log("  3) Difícil (4 erros permitidos)");
  const nivel = Number(await rl.question("Digite o número: "));
  let maxErros;
  if (nivel === 1) maxErros = 8;
  else if (nivel === 3) maxErros = 4;
  else maxErros = 6;

  const categorias = Object.keys(bancoDePalavras);
  console.log("\nEscolha uma categoria:");
  categorias.forEach((c, i) => console.log(`  ${i + 1} - ${c}`));
  console.log(`  ${categorias.length + 1} - Aleatória`);

  const escolha = Number(await rl.question("Digite o número: "));
  let categoria;
  if (escolha >= 1 && escolha <= categorias.length) {
    categoria = categorias[escolha - 1];
  } else {
    categoria = categorias[Math.floor(Math.random() * categorias.length)];
    console.log(`Categoria sorteada: ${categoria}`);
  }

  const lista = bancoDePalavras[categoria];
  const item = lista[Math.floor(Math.random() * lista.length)];
  const palavra = item.palavra; 

  const acertos = []; 
  const erradas = []; 
  let erros = 0;
  let pontos = 0;
  let usouDica = false;

  while (true) {
    console.log("\nPalavra: " + exibirPalavra(palavra, acertos));
    console.log("Categoria: " + categoria);
    console.log("Letras erradas: " + (erradas.join(" ") || "nenhuma"));
    console.log(`Erros: ${erros}/${maxErros}  |  Tentativas restantes: ${maxErros - erros}`);

    if ([...palavra].every((l) => acertos.includes(l))) {
      pontos += (maxErros - erros) * 15;
      if (usouDica) pontos -= PENALIDADE_USO_DICA;
      pontos = Math.max(pontos, 0);
      console.log(`\nParabéns, ${nome}! A palavra era: ${palavra}`);
      return { venceu: true, palavra, pontos };
    }

    if (erros >= maxErros) {
      if (usouDica) pontos -= PENALIDADE_USO_DICA;
      pontos = Math.max(pontos, 0);
      console.log(`\nPerdeu ${nome}! A palavra era: ${palavra}`);
      return { venceu: false, palavra, pontos };
    }

    const letraEscolhida = (await rl.question("\nDigite uma letra maiuscula ou digite 'dica' para dica: ")).trim();

    if (letraEscolhida.toLowerCase() === "dica") {
      if (usouDica) console.log("Você já usou a dica");
      else {
        usouDica = true;
        console.log(`Dica: ${item.dica} (-${PENALIDADE_USO_DICA} pontos no final)`);
      }
      continue;
    }

    if (!/^[A-Za-z]$/.test(letraEscolhida)) {
      console.log("Digite apenas uma letra sem acento");
      continue;
    }

    if (acertos.includes(letraEscolhida) || erradas.includes(letraEscolhida)) {
      console.log("Você já tentou essa letra");
      continue;
    }

    if (palavra.includes(letraEscolhida)) {
      acertos.push(letraEscolhida);
      pontos += 10;
      console.log("Acertou!");
    } else {
      erradas.push(letraEscolhida);
      erros++;
      console.log("Errou!");
    }
  }
}

async function main() {
  console.log("--  Jogo da forca  --");

  const nome = (await rl.question("\nDigite o seu nome: ")).trim() || "Jogador";
  let total = 0;
  let continuar = true;

  while (continuar) {
    const r = await jogarRodada(nome);
    total += r.pontos;

    console.log("\n--   Fim da rodada  --");
    console.log(`Jogador: ${nome}`);
    console.log(`Resultado: ${r.venceu ? "Venceu " : "Perdeu "}`);
    console.log(`Palavra correta: ${r.palavra}`);
    console.log(`Pontuação da rodada: ${r.pontos}`);
    console.log(`Pontuação total: ${total}`);

    const resp = (await rl.question("\nJogar novamente? (sim ou nao): ")).trim().toLowerCase();
    continuar = resp === "s" || resp === "sim";
  }

  rl.close();
}

main();