import { shuffle } from "lodash";
import Game from "./modules/Game";

async function initGame() {
    const countries = await fetch("https://restcountries.com/v3.1/all").then(
        (data) => data.json()
    );
    const shuffledCountries = shuffle(countries);

    const game = new Game(shuffledCountries);

    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();

        if (!game.isOver()) {
            const answer = e.target.querySelector("input").value;
            if (game.currentCountry.isValid(answer)) {
                game.addPoint();
            }

            if (localStorage.getItem("highScore")) {
                const hs = localStorage.getItem("highScore");
                const score = game.score > hs ? game.score : hs;
                localStorage.setItem("highScore", score);
                document.querySelector(
                    "#highscore h1"
                ).textContent = `Highscore: ${score}`;
            } else {
                localStorage.setItem("highScore", game.score);
            }

            document.querySelector(
                "#score h1"
            ).textContent = `Score: ${game.score}`;
            game.nextCountry();
        } else {
            alert(`Game Over! Score: ${game.score}`);
            console.log(`Game Over! Score: ${game.score}`);
        }
        e.currentTarget.reset();
    });
}

initGame();

if (localStorage.getItem("highScore")) {
    const hs = localStorage.getItem("highScore");
    document.querySelector("#highscore h1").textContent = `Highscore: ${hs}`;
}
