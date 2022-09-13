"use strict";

let playState = false;
let currentWord;
let hintWord;
let indexOf = [];
let rightLetters = [];
let wrongLetters = [];
let errorCount = 0;
let count = 0;
let currentWordLength = 0;

let wordsArray = ["FACA", "TESOURA", "DADO", "CELULAR", "ARGENTINA", "VENEZUELA", "PORTUGAL", "CHINA", "ARROZ", "BANANA", "SALADA", "LEITE"]
let hint = ["OBJETO", "OBJETO", "OBJETO", "OBJETO","PAÍS", "PAÍS","PAÍS","PAÍS","ALIMENTO", "ALIMENTO", "ALIMENTO", "ALIMENTO"];

//----------------------------------------------------------------------//
const containerLines = document.querySelector(".container-lines");
const wrongLettersHTML = document.querySelectorAll('.wrong-letters');
const newGameBtn = document.querySelector(".botao_azul");
const hintHTML = document.querySelector(".hint");
const modalLoseHTML = document.querySelector(".modal-lose");
const modalHTML = document.querySelector(".modal");
const gallowsHTML = document.querySelector(".forca");
const restart = document.querySelector(".reiniciar_botao")

const eraseData = function() {
    wrongLetters = [];
    rightLetters = [];
    document.querySelectorAll('.wrong-letters').forEach(function(wrong) {
        wrong.remove();
    })
    errorCount = 0;
    count = 0;
    document.querySelectorAll(".lines").forEach(function(line) {
        line.remove();
    });
    gallowsHTML.src = "/images/forca.svg";
}

document.querySelector(".hint-container").classList.add("hidden");
document.querySelector(".wrong-letters-p").classList.add("hidden");
document.querySelector(".reiniciar_botao").classList.add("hidden");

//----------------------------------------------------------------------//

newGameBtn.addEventListener('click', function() {

    playState = true;
    document.querySelector(".reiniciar_botao").classList.remove("hidden");
//----Some com botões ao iniciar-----------------//
    {document.querySelector(".botao_azul").classList.add("hidden")};
    {document.querySelector(".botao_branco").classList.add("hidden")};
    {document.querySelector(".hint-container").classList.remove("hidden")};
    {document.querySelector(".wrong-letters-p").classList.remove("hidden")};

    if (count !== currentWordLength) {
        wordsArray.push(currentWord);
        hint.push(hintWord);
    }

    eraseData();

    let randomIndex = Math.floor(Math.random() * wordsArray.length)
    currentWord = wordsArray[randomIndex];
    currentWordLength = currentWord.length;

    for (let i = 0; i < currentWord.length; i++) {
        containerLines.innerHTML += `<span class="lines">_</span>`;
    }

    hintHTML.textContent = hint[randomIndex];
    hintWord = hint[randomIndex];
    hint.splice(randomIndex, 1);
    wordsArray.splice(randomIndex, 1);
})

document.addEventListener("keydown", function(event) {

    if (event.keyCode >= 65 && event.keyCode <= 90 && playState == true) {
        if (modalHTML.classList.contains("hidden")) {

            let key = event.key.toUpperCase();

            if(wrongLetters.includes(key)) {
                alert("Letra repetida");

            } else {

                if (!currentWord.includes(key)) {
                    if (event.keyCode >= 65 && event.keyCode <= 90) {
                        wrongLetters.push(key);
                        errorCount += 1;
                        document.querySelector(".wrong-letters-div").innerHTML += `<span class="wrong-letters">${key}</span>`;

                        switch (errorCount) {
                            case 1 :
                                gallowsHTML.src = "images/1.png";
                                break;

                            case 2 :
                                gallowsHTML.src = "images/2.png";
                                break;

                            case 3 :
                                gallowsHTML.src = "images/3.png";
                                break;

                            case 4 :
                                gallowsHTML.src = "images/4.png";
                                break;

                            case 5 :
                                gallowsHTML.src = "images/5.png";
                                break;

                            case 6 :
                                gallowsHTML.src = "images/6.png";
                                break;
                        }
                    }

                    if (errorCount > 5) {
                        playState = false;
                        modalLoseHTML.classList.remove("hidden");
                        document.querySelector(".reiniciar_botao").classList.remove("hidden")
                        setTimeout(function() {modalLoseHTML.classList.add("hidden")}, 50000);
                    }

                } else {
                    if (!rightLetters.includes(key)) {
                        rightLetters.push(key);

                        for (let i = 0; i < currentWord.length; i++) {
                            if (key == currentWord[i]) {
                                indexOf.push(i);
                                count += 1;

                                let lines = document.querySelectorAll(".lines");

                                for (let i = 0; i < indexOf.length; i++){
                                    lines[indexOf[i]].textContent = key;
                                }
                            }
                        }
                    }
                }
            }

            if (count === currentWordLength) {
                document.querySelector(".modal-win").classList.remove("hidden")
                document.querySelector(".reiniciar_botao").classList.remove("hidden")
                setTimeout(function() {document.querySelector(".modal-win").classList.add("hidden")}, 50000);

                playState = false;

                if (wordsArray.length == 0) {
                    alert("Você acertou todas as palavras");
                }
            }
            indexOf = [];
        }
    }
})

const textArea1 = document.querySelector(".nova_palavra");
const textArea2 = document.querySelector(".dica_nova_palavra");

document.querySelector(".botao_branco").addEventListener("click", function() {
    document.querySelector(".modal").classList.remove("hidden");
})

document.querySelector(".add_palavra_div").addEventListener("click", function() {

    if (nova_palavra.value && dica_nova_palavra.value) {
        wordsArray.push(nova_palavra.value.toUpperCase());
        hint.push(dica_nova_palavra.value.toUpperCase());
        nova_palavra.value = "";
        dica_nova_palavra.value = "";
        alert("Palavra adicionada com sucesso. Clique em Começar a Jogar para iniciar o jogo.");
        document.querySelector(".add_palavra_div").classList.add("hidden");
    }

})

document.querySelector(".botao_branco_add").addEventListener("click", function() {
    document.querySelector(".modal").classList.add("hidden");
})

document.querySelector(".reiniciar_botao").addEventListener("click", function() {
    location.reload();
})