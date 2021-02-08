(() => {
    // Константы
    const cards = document.querySelector('.cards'),
          buttonReplay = document.querySelector('.btn-primary'),
          formStart = document.querySelector('form'),
          buttonStart = document.querySelector('.btn-success'),
          inputStart = document.querySelector('input'),
          timer = document.querySelector('.timer');

    buttonReplay.style.display = 'none';

    // Создаем массив с числами для пар
    // let arrWithNumbers = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8',];
    let arrWithNumbers = [];

    // Перемешиваем массив
    function shuffleArr(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    // Создаем и возвращаем карточку
    function createCards() {
        const card = document.createElement('div'),
              p = document.createElement('p');

        card.classList.add('card');
        p.classList.add('text-center');
        p.style.opacity = '0';

        cards.append(card);
        card.append(p);

        return {
            card,
            p
        };
    }

    // Очистка cards от card с прошлой игры
    function clearCards() {
        while (cards.firstChild) {
            cards.removeChild(cards.firstChild);
        }
    }

    // Настройка количества карточек
    function settingsGame() {
        formStart.style.display = 'block';
        clearCards();
        
        buttonStart.addEventListener('click', (e) => {
            e.preventDefault();
            arrWithNumbers = [];
            clearCards();

            if (inputStart.value < 2 || inputStart.value > 10 || inputStart.value % 2 === 1) {
                inputStart.value = 4;
                cards.style.width = '400px';
            }

            cards.style.width = `${inputStart.value}00px`;

            for (let i = 1; i <= inputStart.value * inputStart.value / 2; i++) {
                arrWithNumbers.push(i, i);
            }

            formStart.style.display = 'none';
            startGame();
        });
    }

    // Таймер 60 секунд
    let interval;

    function timerOfGame() {
        clearInterval(interval);
        let time = 60;

        timer.textContent = `До конца игры осталось ${time} секунд`;

        interval = setInterval(() => {
            time--;
            timer.textContent = `До конца игры осталось ${time} секунд`;

            if (time === 0) {
                clearInterval(interval);
                alert('Время вышло! Попробуйте заново.');
                formStart.reset();
                timer.textContent = '';
                settingsGame();

                // Из основного задания с кнопкой "Сыграть еще раз"
                // buttonReplay.style.display = 'inline-block';
                // buttonReplay.addEventListener('click', () => {
                //     while (cards.firstChild) {
                //         cards.removeChild(cards.firstChild);
                //     }
                //     buttonReplay.style.display = 'none';
                //     startGame();
                // });
            }
        }, 1000);
    }

    // Запускаем игру
    function startGame() {
        // Перемешиваем массив
        shuffleArr(arrWithNumbers);

        for (let i = 0; i < arrWithNumbers.length; ++i) {
            createCards().p.textContent = arrWithNumbers[i];
        }

        timerOfGame();

        let count = 0;
        let valueInCards = [];
        let keyInArr = [];
        let endGame = 0;

        for (let i = 0; i < cards.children.length; ++i) {
            cards.children[i].addEventListener('click', () => {
                cards.children[i].children[0].style.opacity = '1';

                valueInCards.push(cards.children[i].children[0].textContent);
                keyInArr.push(i);

                ++count;

                if (valueInCards[0] === valueInCards[1]) {
                    count = 0;
                    ++endGame;

                    cards.children[keyInArr[0]].children[0].opacity = '1';
                    cards.children[keyInArr[1]].children[0].opacity = '1';

                    valueInCards.splice(0, 2);
                    keyInArr.splice(0, 2);
                } else if (count === 3 && valueInCards[0] !== valueInCards[1]) {
                    setTimeout(() => {
                        count = 1;

                        cards.children[keyInArr[0]].children[0].style.opacity = '0';
                        cards.children[keyInArr[1]].children[0].style.opacity = '0';

                        valueInCards.splice(0, 2);
                        keyInArr.splice(0, 2);
                    }, 200);
                }

                if (endGame === arrWithNumbers.length / 2) {
                    clearInterval(interval);
                    alert('Поздравляем! Вы победили.');
                    formStart.reset();
                    timer.textContent = '';
                    settingsGame();

                    // Из основного задания с кнопкой "Сыграть еще раз"
                    // buttonReplay.style.display = 'inline-block';
                    // buttonReplay.addEventListener('click', () => {
                    //     while (cards.firstChild) {
                    //         cards.removeChild(cards.firstChild);
                    //     }
                    //     buttonReplay.style.display = 'none';
                    //     startGame();
                    // });
                }
            });
        }
    }

    window.settingsGame = settingsGame;
})();

