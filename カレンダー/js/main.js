'use strict';

console.clear(); // console.logから表示したものを消す

{
  //new Date()をDate()とすると現在の時刻が出る
  //new Date()でも現在の時刻を表せる newDate()で時刻の指定もできる
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 5月

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate(); //先月の末日
    const n = new Date(year, month, 1).getDay(); //今月の1日のオブジェクトが、週の何日目かを取得→getDay()

    for (let i = 0; i < n; i++) {
      // ループを回すたびに [30] [30,29]としたい→ unshift()
      dates.unshift({
        date: d - i,  // i++ i + 1の違い
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

   function getCalendarBody() {
    const dates = []; //date 日付 day 曜日
    const date = new Date(year, month + 1, 0)
    const lastDate = date.getDate();
    //他のやり方もOK

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
     }

     if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
     }
    return dates;
  }


   function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    //末日が何日かを求めてあげて、７から引けば全てに対応できるカレンダーのはじめを作成できる

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
      date: i,
      isToday: false,
      isDisabled: true,
      });
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    //tbodyの最初の子要素がある限り、tbodyから最初の子要素を削除して
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function  renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    // title = document.getElementById('title').textContent;はなぜだめ？
    //padstartは文字列にしか使えないstring 2桁で表示してそうじゃなかったら０でうめてください
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
     ...getCalendarHead(),
     ...getCalendarBody(),
     ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
      //console.log(`i: ${i}, weeks:[${weeks}]`);
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today')
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
     month--;
     if (month < 0) {
      year--;
      month = 11;
     }
     createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
     year++;
     month = 0;
    }
    createCalendar();
 });
 
   document.getElementById('today').addEventListener('click', () => {
     year = today.getFullYear();
     month = today.getMonth();


  createCalendar();
});

   createCalendar();
}


  // 70行目 for文で書いたとしたら,
  //   for (let i = 0; i < weeks.length; i++) {
  //     const tr = document.createElement("tr");
  //     for (let j = 0; j < weeks[i].length; j++) {
  //       const td = document.createElement("td");
  //       td.textContent = weeks[i][j].date;
  //       if (weeks[i][j].isDisabled) {
  //         td.classList.add("disabled");
  //       }
  //       if (weeks[i][j].isToday) {
  //         td.classList.add("today");
  //       }
  //       tr.appendChild(td);
  //     }
  //     document.querySelector("tbody").appendChild(tr);
  // }

  
  //date.date 例：3日 {
  //   date: 3,
  //   isToday: false,
  //   isDisabled: false
  // }  この場合date.dateは3になる
  //weeks[dates[i=0]spliceで0から7まで取り出したdatesの配列をweeksに代入
//dates[i=1]splice次の8から15まで取り出したdatesの配列をweeksに入れる]

  //配列の中に3つの配列がある 配列の中に配列があると扱いにくい
  //なぜか getCalendarHead(),getCalendarBody(),getCalendarTail()のそれぞれで配列の中にオブジェクトがある 今回は、カレンダーの性質上「1日から末日をひとつの配列で扱う必要があります」
  //そんな中3つの配列を1つの配列に入れたまま扱おうとすると「配列の中に3つの配列があって、さらにそこにオブジェクトがある複雑な配列で扱いにくい」
  //であれば、3つの配列の中身だけを一つの配列にまとめてしまえば、「1つの配列に複数のオブジェクトがあるシンプルな配列にでき扱いやすい」
  //全ての要素を一つの配列の中で展開してほしいので、スプレッド構文を使う。

 
 // const date = new Date(year(年), month + 1(月), 0(日))
    // const lastDate = date.getDate()
    // new dateはDateクラスを作成している
    //month + 1で,来月を指定しているが、日に0を加えることで,来月の0日目
    //つまり先月の末日という意味
  // //if (date.isToday) {
  //   td.classList.add('today');
  // }
  // // dateが今日の日付の場合にtodayというclassをつける処理をする
  // // const dates = [1,2,3,4];が来た時、dateには1や3の値が入るのだが、どの数値が来た時に、todayクラスをつけるのかが判別できない

  // const dates = [   こうすると今日の日付かどうか判定できる
  //   {
  //     date: 1,
  //     isToday: true,
  //     isDisabled: false,
  //   },
  //   {
  //     date: 1,
  //     isToday: true,
  //     isDisabled: false,
  //   },
  //   {
  //     date: 1,
  //     isToday: true,
  //     isDisabled: false,
  //   },
  //   {
  //     date: 1,
  //     isToday: true,
  //     isDisabled: false,
  //   }
  // ]

  //レスト構文 余ったものをまとめる 
  //const scores = [70, 90, 80, 85];
  //const [first, ... others] = scores;
  //console.log(first); console.log(others);

  //const moreScores = [77, 88];
  //const scores = [70, 90, 80, 85, moreScores];
  //const [first, ... others] = scores; →左辺の...レスト構文
  //結果 70
  // [90, 80, 85, array(2)] othersの配列の中にもうひとつの配列ができてしまっている →スプレッド構文を使う: 右辺の...スプレッド構文(配列の中の配列をやめて1つの配列に全ての要素を展開するようにする)
  //スプレッド構文 const scores = [70, 90, 80, 85. ..moreScores];