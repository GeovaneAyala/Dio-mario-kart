// 1. Definição dos objetos dos personagens
const player1 = { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 };
const player2 = { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 };
const player3 = { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 };
const player4 = { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 3, PODER: 4, PONTOS: 0 };
const player5 = { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 };
const player6 = { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 };

// 2. Agrupamos todos em um array
const todosJogadores = [player1, player2, player3, player4, player5, player6];

// 3. Função para sortear 2 jogadores
function sortearJogadores(lista) {
  // Sorteia o primeiro jogador
  const indice1 = Math.floor(Math.random() * lista.length);
  const p1 = lista[indice1];

  // Filtra a lista removendo o primeiro para não repeti-lo
  const listaRestante = lista.filter((_, index) => index !== indice1);

  // Sorteia o segundo jogador
  const indice2 = Math.floor(Math.random() * listaRestante.length);
  const p2 = listaRestante[indice2];

  return [p1, p2];
}

// 4. Executando o sorteio
const [desafiante1, desafiante2] = sortearJogadores(todosJogadores);

console.log(`Partida definida: ${desafiante1.NOME} vs ${desafiante2.NOME}`);

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random()
  let result
  
  switch (true){
    case random < 0.33:
        result = "Reta"
        break;
    
    case random < 0.66:
        result = "Curva"
        break;

    default:
    result = "Confronto";
    
  }
  return result 
}

async function logRollResult(characteName, block, diceResult, attribute) {
    console.log(`${characteName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++ ){
        console.log(`🏁 Rodada ${round} `);

     // Sortear Bloco  
     let block =   await getRandomBlock()
     console.log(`Bloco: ${block}`);
    
     // Rolar dado
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // Teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if(block === "Reta"){
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

        await logRollResult(
            character1.NOME,
            "Velocidade",
            diceResult1,
            character1.VELOCIDADE
        );

        await logRollResult(
            character2.NOME,
            "Velocidade",
            diceResult2,
            character2.VELOCIDADE
        );
    }
     if(block === "Curva"){
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

        await logRollResult(
            character1.NOME,
            "Manobrabilidade",
            diceResult1,
            character1.MANOBRABILIDADE
        );

        await logRollResult(
            character2.NOME,
            "Manobrabilidade",
            diceResult2,
            character2.MANOBRABILIDADE
        );
    }
     if(block === "Confronto"){
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;

        console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`)

         await logRollResult(
            character1.NOME,
            "Poder",
            diceResult1,
            character1.PODER
        );

        await logRollResult(
            character2.NOME,
            "Poder",
            diceResult2,
            character2.PODER
        );

        if(powerResult1 > powerResult2 && character2.PONTOS > 0 ){
            console.log(`${character1.NOME} venceu o confronto ${character2.NOME} perdeu um ponto!🐢`)
            character2.PONTOS--;
        }

        if(powerResult2 > powerResult1 && character1.PONTOS > 0){
            console.log(`${character2.NOME} venceu o confronto ${character1.NOME} perdeu um ponto!🐢`)
            character1.PONTOS--;
        }
        


        console.log(powerResult2 === powerResult1 ? "Confronto empatado, nenhum ponto foi perdido!" : "");

        
    }

    //VERIFICANDO O VENCEDOR

    if(totalTestSkill1 > totalTestSkill2){
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
    }else if(totalTestSkill2 > totalTestSkill1){
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
    }
    
    console.log("=========================================================")

    }

}

async function declarewinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns🏆`)
    }else if(character2.PONTOS > character1.PONTOS) {
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns🏆`)
    } else {
        console.log("A corrida terminou em empate!")
    }
}

(async function main() {
   console.log(`🏁🚦 Corrida entre ${desafiante1.NOME} e ${desafiante2.NOME} começando...\n `);
   await playRaceEngine(desafiante1, desafiante2);
   await declarewinner(desafiante1, desafiante2);
})();