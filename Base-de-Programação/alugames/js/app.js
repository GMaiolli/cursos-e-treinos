function alterarStatus(gameId) {
    let gameItem = document.getElementById(`game-${gameId}`);
    let gameImg = gameItem.getElementsByClassName("dashboard__item__img")[0];
    let gameButton = gameItem.getElementsByClassName("dashboard__item__button")[0];

    if (gameImg.classList.contains("dashboard__item__img--rented")) {
        gameImg.classList.remove("dashboard__item__img--rented");
        gameButton.classList.remove("dashboard__item__button--return");
        gameButton.innerText = "Alugar";
    } else {
        gameImg.classList.add("dashboard__item__img--rented");
        gameButton.classList.add("dashboard__item__button--return");
        gameButton.innerText = "Devolver";
    }
}