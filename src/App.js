import React from 'react';
import './App.css';
import aud1 from './assets/audios/BeepSound.mp3';
import aud2 from './assets/audios/BeepSound.wav';

let breakLength = 5;
let sessionLength = 25;
let session = '25:00';
let play = false;
let identifier;
let flag = 'session';

function breakInc() {
  let breakSpan = document.querySelector('#breakSpan');
  if (breakLength < 60) {
    ++breakLength;
  }
  breakSpan.textContent = String(breakLength);
}

function breakDec() {
  let breakSpan = document.querySelector('#breakSpan');
  if (breakLength > 1) {
    --breakLength;
  }
  breakSpan.textContent = String(breakLength);
}

function sessionInc() {
  let timeLeft = document.querySelector('#time-left');
  let sessionSpan = document.querySelector('#sessionSpan');
  let [min, sec] = [...timeLeft.textContent.split(':')];
  if (sessionLength < 60) {
    ++sessionLength;
  }
  sessionSpan.textContent = String(sessionLength);
  sessionLength > 9 ? (min = sessionLength) : (min = '0' + sessionLength);
  timeLeft.textContent = `${min}:${sec}`;
}

function sessionDec() {
  let timeLeft = document.querySelector('#time-left');
  let sessionSpan = document.querySelector('#sessionSpan');
  let [min, sec] = [...timeLeft.textContent.split(':')];
  if (sessionLength > 1) {
    --sessionLength;
  }
  sessionSpan.textContent = String(sessionLength);
  sessionLength > 9 ? (min = sessionLength) : (min = '0' + sessionLength);
  timeLeft.textContent = `${min}:${sec}`;
}

function handleStart() {
  let playButton = document.querySelector('#start-stop i');
  let timeLeft = document.querySelector('#time-left');
  let sessionSpan = document.querySelector('#sessionSpan');
  let breakSpan = document.querySelector('#breakSpan');
  let aud = document.querySelector('#beep');
  let min = 0,
    sec = 0;
  let temp = true;
  if (play) {
    playButton.classList.remove('fa-pause-circle');
    playButton.classList.add('fa-play-circle');
    play = false;
    clearInterval(identifier);
  } else {
    identifier = setInterval(function () {
      if (timeLeft.textContent === '00:00') {
        aud.pause();
        if (flag === 'session') {
          timeLeft.textContent = `${
            breakSpan.textContent < 10
              ? '0' + breakSpan.textContent
              : breakSpan.textContent
          }:00`;
          flag = 'break';
        } else {
          timeLeft.textContent = `${
            sessionSpan.textContent < 10
              ? '0' + sessionSpan.textContent
              : sessionSpan.textContent
          }:00`;
          flag = 'session';
        }
        temp = true;
      }
      if (temp) {
        [min, sec] = [...timeLeft.textContent.split(':')];
        temp = false;
      }
      if (sec === '00') {
        sec = '59';
        if (min > 0) {
          --min;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (min === '00') {
          timeLeft.style.color = 'red';
        } else {
          timeLeft.style.color = 'black';
        }
      } else {
        if (sec > 0) {
          --sec;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
      }
      timeLeft.textContent = `${min}:${sec}`;
      if (timeLeft.textContent === '00:00') {
        aud.play();
      }
    }, 1000);
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
    play = true;
  }
}

function handleReset() {
  let breakSpan = document.querySelector('#breakSpan');
  let sessionSpan = document.querySelector('#sessionSpan');
  let timeLeft = document.querySelector('#time-left');
  let playButton = document.querySelector('#start-stop i');
  breakLength = 5;
  sessionLength = 25;
  session = '25:00';
  breakSpan.textContent = breakLength;
  sessionSpan.textContent = sessionLength;
  timeLeft.textContent = session;
  clearInterval(identifier);
  playButton.classList.remove('fa-pause-circle');
  playButton.classList.add('fa-play-circle');
  timeLeft.style.color = 'black';
}

function App() {
  return (
    <div className="App">
      <h1 id="header">
        <i className="far fa-clock"></i>
        <br />
        Pomodoro Clock
      </h1>
      <div id="labels">
        <div id="break-label">
          Break Length <br />
          <span>
            <button id="break-increment" onClick={breakInc}>
              <i className="fas fa-chevron-circle-up"></i>
            </button>
            <span id="breakSpan">5</span>
            <button id="break-decrement" onClick={breakDec}>
              <i className="fas fa-chevron-circle-down"></i>
            </button>
          </span>
        </div>
        <div id="session-label">
          Session Length <br />
          <span>
            <button id="session-increment" onClick={sessionInc}>
              <i className="fas fa-chevron-circle-up"></i>
            </button>
            <span id="sessionSpan">25</span>
            <button id="session-decrement" onClick={sessionDec}>
              <i className="fas fa-chevron-circle-down"></i>
            </button>
          </span>
        </div>
      </div>
      <div id="session">
        <div id="timer-label">Session</div>
        <div id="time-left">25:00</div>
      </div>
      <button id="start-stop" onClick={handleStart}>
        <i className="fas fa-play-circle"></i>
      </button>
      <button id="reset" onClick={handleReset}>
        <i className="fas fa-redo"></i>
      </button>
      <audio id="beep">
        <source src={aud1} type="audio/mpeg" />
        <source src={aud2} type="audio/wav" />
      </audio>
    </div>
  );
}

export default App;
