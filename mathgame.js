var start = false;
var pname = "";
var q = 1;
var timer;
var ca;

var o = ['+', '-', '/', '*', '%'];

function sgame() {
    if (start) return;

    pname = prompt("enter your name");
    start = true;
    q = 1;

    document.querySelector("h1").innerHTML = "Question - " + q;
    main();
}

document.addEventListener("keypress", sgame);

document.getElementById("play").onclick = function(e) {
   // e.preventDefault();
    sgame();
};

function op() {
    return o[Math.floor(Math.random() * o.length)];
}

function make() {
    return Math.floor(Math.random() * 99) + 1;
}

function main() {
    var n1 = make();
    var n2 = make();
    var c = op();

    if (c === '+') ca = n1 + n2;
    else if (c === '-') ca = n1 - n2;
    else if (c === '/') ca = Math.floor(n1 / n2);
    else if (c === '*') ca = n1 * n2;
    else if (c === '%') ca = n1 % n2;

    document.getElementById("qu").innerHTML = `Q${q}. ${n1} ${c} ${n2}`;

    makeOptions();
    startTimer();
}

function makeOptions() {
    let cans = [ca];

    while (cans.length < 4) {
        let wrg = ca + Math.floor(Math.random() * 20) - 10;
        if (!cans.includes(wrg)) cans.push(wrg);
    }

    cans.sort(() => Math.random() - 0.5);

    let btns = document.querySelectorAll(".but");

    for (let i = 0; i < 4; i++) {
        btns[i].innerHTML = cans[i];
    }
}

let btns = document.querySelectorAll(".but");

btns.forEach(function(btn) {
    btn.onclick = function() {
        if (!start) return;

        let userAns = Number(this.innerHTML);

        if (userAns === ca) {
            clearInterval(timer);
            q++;
            document.querySelector("h1").innerHTML = "Question - " + q;
            main();
        } else {
            alert("Wrong answer! Game Over");
            resetGame();
        }
    };
});

function startTimer() {
    clearInterval(timer);
    let time = 15;
    document.querySelector(".sec").innerHTML = time + "s";

    timer = setInterval(function() {
        time--;
        document.querySelector(".sec").innerHTML = time + "s";

        if (time <= 0) {
            alert("Time over! Game Over");
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);

    start = false;
    document.querySelector("h1").innerHTML = `amazing ${pname}, your score is ${q-1}.
    press any key to reset`;
    pname = "";
    q = 1;

    
    document.getElementById("qu").innerHTML = "Start please";
    document.querySelector(".sec").innerHTML = "15s";
    document.getElementById("o1").innerHTML = "option 1";
    document.getElementById("o2").innerHTML = "option 2";
    document.getElementById("o3").innerHTML = "option 3";
    document.getElementById("o4").innerHTML = "option 4";
}