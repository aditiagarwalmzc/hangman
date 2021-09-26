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
    } else if (chosenCategory === categories[3]) {
      catagoryName.innerHTML = "Category: Programming";
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
        showLives.innerHTML = "You Win! Click on Play again for another game.";
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
        "hannah-montana",
        "greys-anatomy",
        "the-big-bang-theory",
        "game-of-thrones",
        "fleabag",
        "killing-eve",
        "brooklyn-nine-nine",
      ],
      [
        "la-la-land",
        "dead-poets-society",
        "tangled",
        "ratatouille",
        "mean-girls",
        "minions",
        "legally-blonde",
        "titanic",
        "soul",
        "toy-story",
        "the-sound-of-music",
        "life-of-pi"
      ],
      ["thirteen", 
        "blank-space", 
        "folklore", 
        "reputation", 
        "all-too-well",
        "kanye-west",
        "meredith",
        "benjamin",
        "olivia",
        "red",
        "fearless"
    ],
    [
      "big-o",
      "index",
      "python",
      "javascript",
      "java",
      "swift",
      "c-sharp",
      "ada-lovelace",
      "errors",
      "vscode"
    ]
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
        "A teen pop icon who lives a double life.",
        "Medical drama that doesn't seem to end",
        "Bazinga!",
        "Winter is coming",
        "Hot priest! O.o",
        '"I bet your kids are ugly!"',
        "Noice!"
      ],
      [
        "A musical that won an oscar, almost.",
        '"O Captain, my Captain!"',
        "Lanterns",
        "Chef rat",
        "Plastics",
        "BANANA!",
        "Just bend and snap!",
        "One of the most iconic Leo films",
        "Jazzing!",
        "To infinity and beyond!",
        "Raindrops on roses and whiskers on kittens",
        "Piscine"
      ],
      [
        "The lucky number",
        "The most iconic song of all time",
        "Her first surprise album",
        "The comeback album",
        "Jake Gyllenhaal",
        "Taylor Swift made this guy famous",
        "Swifties thought this cat was dead",
        "Her most recent cat",
        "Dibbles",
        "Not the album about Harry Styles",
        "Her first album that won a Grammy"
      ],
      [
        "Time and space complexity",
        "Starts with 0",
        "Snake",
        "Language used to build this game",
        "The most popular language",
        "Apple made this language",
        "Language mostly used for game development",
        "First female programmer",
        "These bugs are not cute!",
        "Most people prefer this text editor for coding"
      ]
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