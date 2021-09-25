window.onload = function () {
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  var categories;
  var chosenCategory;
  var word;
  var guess;
  var guesses = [];
  var lives;
  var counter;
  var space;

  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");
    letters.id = "alphabet";

    for (var i = 0; i < alphabet.length; i++) {
      list = document.createElement("li");
      list.id = `letter-${i}`;
      list.innerHTML = alphabet[i];
      check();
      letters.appendChild(list);
    }
    myButtons.appendChild(letters);
  };

  var disableAllButtons = function () {
    for (var i = 0; i < alphabet.length; i++) {
      var btbtn = document.getElementById(`letter-${i}`);
      btbtn.setAttribute("class", "active");
      btbtn.onclick = null;
    }
    var hintBtn = document.getElementById("hint");
    hintBtn.onclick = null;
    hintBtn.style.pointerEvents = "none";
  };

  //Category
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Category: TV Shows";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Category: Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Category: Taylor Swift";
    }
  };

  // Create guesses ul
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space += 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "CLICK ON PLAY AGAIN!";
      alert("YOU LOSE!");
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
        alert("YOU WIN!");
        disableAllButtons();
        break;
      }
    }
  };

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  leftArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1,
  ];

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var guess = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = word.indexOf(guess);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };

  // Play
  play = function () {
    categories = [
      [
        "schitts-creek",
        "bojack-horseman",
        "how-i-met-your-mother",
        "the-office",
        "friends",
        "doctor-who",
        "this-is-us",
      ],
      [
        "la-la-land",
        "dead-poets-society",
        "tangled",
        "ratatouille",
        "mean-girls",
      ],
      ["thirteen", "blank-space", "folklore", "reputation", "all-too-well"],
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();

  // Hint
  hint.onclick = function () {
    hints = [
      [
        "Incredibly rich family that went broke",
        "One Trick Pony",
        "Legen... wait for it... dary!",
        "Michael Scarn",
        "funny",
        "tardis",
        "Big three!",
      ],
      [
        "A musical that won an oscar, almost.",
        '"O Captain, my Captain!"',
        "Lanterns",
        "Chef rat",
        "Plastics",
      ],
      [
        "The lucky number",
        "The most iconic song of all time",
        "Her first surprise album",
        "The comeback album",
        "Jake Gyllenhaal",
      ],
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: " + hints[catagoryIndex][hintIndex];
  };

  // Reset
  document.getElementById("reset").onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    context.clearRect(0, 0, 200, 200);
    play();
  };
};
