'use strict';
//14行目//10ミリ秒ごとにcountUpを呼び出す 
//現在時刻とタイマーの差を表示し続ける
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  //(2,'0') この値を2桁で表示 その桁に満たなかったら
  //文字列の前を0で埋めてね
  //テンプレートリテラルで文字列にしろ
  //直近のelapsedTimeしか保持しないので、+=としてタイマーが走っていた時間をすべて足す
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();


  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;  //それ以降の処理をしない
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return; 
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
    //elapsedTime = elapsedTime + (Date.now() - startTime);
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return; 
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });

}