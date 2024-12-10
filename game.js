document.addEventListener('DOMContentLoaded', () => {
    const setupForm = document.getElementById('setup-form');
    const gameArea = document.getElementById('game-area');
    const gameBoard = document.getElementById('game-board');
    const playerDisplay = document.getElementById('player-display');
    const timerDisplay = document.getElementById('timer');
    const restartButton = document.getElementById('restart-game');
    let timerInterval;
    let flippedCards = [];
    let matchedCount = 0;
    let isBoardLocked = false;
  
    setupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const playerName = document.getElementById('player-name').value;
      const pairCount = parseInt(document.getElementById('pair-count').value);
      startGame(playerName, pairCount);
    });
  
    function startGame(playerName, pairCount) {
      playerDisplay.innerText = `Hello, ${playerName}`;
      setupForm.classList.add('hidden');
      gameArea.classList.remove('hidden');
      initializeBoard(pairCount);
      startTimer();
    }
  
    function initializeBoard(pairCount) {
      const cardValues = Array.from({ length: pairCount }, (_, i) => i + 1)
        .flatMap(value => [value, value]);
      shuffleArray(cardValues);
  
      gameBoard.innerHTML = '';
      cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }
  
    function flipCard() {
      if (isBoardLocked || this.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
      }
  
      this.classList.add('flipped');
      this.textContent = this.dataset.value;
      flippedCards.push(this);
  
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount++;
        flippedCards = [];
        if (matchedCount === parseInt(document.getElementById('pair-count').value)) {
          endGame();
        }
      } else {
        isBoardLocked = true;
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.textContent = '';
          card2.textContent = '';
          flippedCards = [];
          isBoardLocked = false;
        }, 1000);
      }
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function startTimer() {
      let elapsedTime = 0;
      timerInterval = setInterval(() => {
        elapsedTime++;
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
      }, 1000);
    }
  
    function endGame() {
      clearInterval(timerInterval);
      alert(`Well done! You finished in ${timerDisplay.textContent}`);
      restartButton.classList.remove('hidden');
      restartButton.addEventListener('click', () => location.reload());
    }
  });
  
  
  function playMusic(){
    var button = document.getElementById('play-music');
    var audio = document.getElementById('music-audio');
    if (audio.paused) {
        audio.play();
        button.innerText = "⏸️ Pause Music";
    } else {
        audio.pause();
        button.innerText = "🎵 Play Music";
    }
  }
  
  
  