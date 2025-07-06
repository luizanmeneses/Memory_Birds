
//Vamos começar criando as vars globais:
//1. Esse array tem 8 posições e irá armazenar as cartas
var tabuleiro = new Array("0","1","2","3","4","5","6","7","8","9","10","11");
//2. Array para controlar a visibilidade das cartas, tem 8 pos tbm
var visibilidade = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
//3. Array com 12 posição para auxiliar o de visibilidade
var visibilidadeAux = new Array(12)//num de posições
var numCliques = 0;//para contar a qtd de cliques
var numAcertos = 0;//para contar os acertos do jogador
var indiceCartaAnterior = -1;
var cartaAtual = -1;

//Função para embaralhar as cartas do tabuleiro aleatoriamente
function embaralhaCartas(){
    j = -1;// j armazena índices aleatorios
    for(i = 0; i < 12; i++){//percorre o array tabuleiro
//A ideia aqui é que r seja definida por um num aleat entre 0 e 8 menos 1:
        j = Math.round(Math.random() * (tabuleiro.length - 1));
//Math.random gera um num aleat entre 0 e 1(é isso o que esse comando faz) e * pelo tam do tabuleiro - 1
//E o Math.round arredonda esse result pro + próximo
aux = tabuleiro[j]//o elem na pos j é arm na var aux
tabuleiro[j] = tabuleiro[i]//o elem da pos i vai p/ a pos j
tabuleiro[i] = aux;//o elem q era de j e q agora esta em aux vai p/ i
    }
}
//O num do loop indep do tam do array, mas pode ser que ele pegue posições vazias
//isso pode atrapalhar.

//Função para Verificar qual o clique da jogada
function verificaJogada(indice){//ver se carta está visível
    if(visibilidade[indice] == 0){//se 0 invis se 1 visivel
    visibilidade[indice] = 1; //torna-a visivel
    numCliques++; //increm o cont de cliques

    carta = parseInt( tabuleiro[ parseInt( indice ) ] );
        visualizarCarta( carta, indice );//chama essa funcao pra mostrar a carta ao usuário

        if (numCliques % 2 != 0) { // se for o 1. clique de uma jogada, armazena o i da carta, se for o 2. verif se as cartas são =
            indiceCartaAnterior = indice; 
        } else if ((tabuleiro[indice] % 6) == (tabuleiro[indiceCartaAnterior] % 6)) { // Acertou.
            acertos++;//se forem = incrementa o cont de acertos
            
            if (acertos == tabuleiro.length / 2) {//se todos os pares são encontrados, exibe a mensagem.
              document.getElementById( "msg" ).value = "*** Fim de Jogo! *** Você errou " + ( ( numCliques / 2 ) - acertos ) + " vez(es).";
            }
        } else { // Errou, então exibe mensagem de erro, trava as cartas p/ não permitir mais cliques, esconde a carta após 1s e limpa msg erro
            cartaAtual = indice; // Passando o valor para a variável global pode-se usar 'setTimeout'
            document.getElementById("msg").value = "ERROU!";

            // Os procedimentos adotados abaixo permitem ao jogador visualizar a segunda
            // carta clicada sem poder clicar em nenhuma outra enquanto as outras duas ainda
            // estiverem visíveis.
            trava( 1 );
            setTimeout( "trava( 0 );", 1000 );

            setTimeout( "esconderCarta( indiceCartaAnterior );", 1000 );
            setTimeout( "esconderCarta( cartaAtual );", 1000 );
            setTimeout( "document.getElementById( \"msg\" ).value = \"\";", 1000 );
        }
        }
        return;
    }
      
//Função para Visualizar cartas
function visualizarCarta(carta, indice){
//o num da carta pode ser qualquer valor int
    endereco = "imgs memorybirds/carta" + (carta % 6) + ".jpg";
//esse % 6 calc o resto da divisao do num da carta por 4.
//concatena o endereco + result + extensao jpg => caminho da img
console.log("Mostrando carta: ",carta, "no indice ", indice, "endereco ", endereco)
    document.campo[indice].src = endereco;
    //acessa o elem de img corresp ao indice no form campo(imagens do html)
}


//Função para Esconder carta do jogador
function esconderCarta(indice){
    document.campo[indice].src = "imgs memorybirds/costas.jpg";
    visibilidade[indice] = 0;
}

//Função para iniciar Novo Jogo
function novoJogo(){
    acertos = 0;
    numCliques = 0;
    indiceBotaoClicado = -1;

    for(i = 0; i < tabuleiro.length; i++){
        esconderCarta(i);//vira todas cartas
    }
    embaralhaCartas();
//Atualização da msg, elem lá do html, q serve p/ exibir msgs p/ o jogador
    document.getElementById("msg").value = "Novo jogo iniciado :)"
    
    return;
}

//Função para controle se jogador pode ou não clicar na carta
function trava(flag){//flag é usado p/ determ comport da funcao
    if(flag == 1) {//se 1 bloqueia as cartas para cliques
        for(i = 0; i < visibilidade.length; i++){
            visibilidadeAux[i] = visibilidade[i];
            visibilidade[i] = 1;
/*o loop percorre o array de visib e copia cada elem deste p/ o aux
e assim manter um backup do estado atual das cartas. Ao mesmo tempo,
cada elem do visib é definido como '1'
*/
  }
}else if (flag == 0){
    for (i = 0; i < visibilidade.length; i++){
        visibilidade[i] = visibilidadeAux[i];
    }
}
    return;//indica o término da funcao

/*se flag = 0 sign = desbloquear cartas. Aí as mesmas voltam ao 
estado original*/ 
}
var audio = document.getElementById("audio");
document.getElementById("play").addEventListener("click",
    function(){
        audio.play();
});




