let display = document.getElementById("display");

function appendValue(val) {
  if (display.innerText === "0") display.innerText = val;
  else display.innerText += val;
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  try {
    display.innerText = eval(display.innerText).toString();
  } catch {
    display.innerText = "Error";
  }
}

// Practice Mode
let correctAnswer = "";
let userTyped = "";

function startPractice(mode) {
  if (!mode) return;
  document.getElementById("practice-screen").classList.remove("hidden");
  generateQuestion(mode);
}

function generateQuestion(mode) {
  const a = Math.floor(Math.random() * 90) + 10;
  const b = Math.floor(Math.random() * 90) + 10;
  let op = mode;
  if (mode === "mix") op = ["+","-","*","/"][Math.floor(Math.random()*4)];
  let qText = `What is ${a} ${op} ${b}?`;
  document.getElementById("question").innerText = qText;
  correctAnswer = eval(a + op + b).toFixed(0);
  userTyped = "";
  document.getElementById("typed-answer").innerText = "";
  document.getElementById("feedback").innerText = "";
}

document.addEventListener("keydown", (e) => {
  const practiceScreen = document.getElementById("practice-screen");
  if (practiceScreen.classList.contains("hidden")) return;
  if (e.key >= "0" && e.key <= "9") {
    userTyped += e.key;
    document.getElementById("typed-answer").innerText = userTyped;
  }
  if (e.key === "Backspace") {
    userTyped = userTyped.slice(0, -1);
    document.getElementById("typed-answer").innerText = userTyped;
  }
  if (e.key === "Enter") {
    if (userTyped === correctAnswer) {
      document.getElementById("feedback").innerText = "✅ Correct!";
    } else {
      document.getElementById("feedback").innerText = `❌ Incorrect. Answer: ${correctAnswer}`;
    }
    setTimeout(() => generateQuestion(document.getElementById("practice-mode").value), 1500);
  }
});

function exitPractice() {
  document.getElementById("practice-screen").classList.add("hidden");
}
