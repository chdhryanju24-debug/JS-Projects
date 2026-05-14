const questions = [

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },

    {
        question: "Which method is used to print something in the console?",
        options: ["console.log()", "print()", "document.write()", "echo()"],
        answer: "console.log()"
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "<!-- -->", "#", "**"],
        answer: "//"
    },

    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: "Netscape"
    },

    {
        question: "Which operator is used for strict equality?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },

    {
        question: "How do you write an arrow function?",
        options: ["=>", "->", "function()", "::"],
        answer: "=>"
    },

    {
        question: "Which method converts JSON data into JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
        answer: "JSON.parse()"
    },

    {
        question: "Which array method adds an element at the end?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "push()"
    },

    {
        question: "What is the correct way to write an if condition?",
        options: ["if x > 5", "if(x > 5)", "if x => 5", "if: x > 5"],
        answer: "if(x > 5)"
    },

    {
        question: "Which event occurs when a button is clicked?",
        options: ["mouseover", "keydown", "click", "change"],
        answer: "click"
    }

];


const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('btn');



let currentQuestion = 0;
let score = 0;


function loadQuestion() {

    const current = questions[currentQuestion];

    questionEl.innerHTML =
        `<span>Q${currentQuestion + 1}:</span> ${current.question}`;

    optionsEl.innerHTML = '';

    if (currentQuestion === questions.length - 1) {
        submitBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    }

    current.options.forEach((option) => {

        const btn = document.createElement('button');

        btn.innerText = option;

        btn.classList.add('option-btn');

        btn.addEventListener('click', () => {

            // Disable all buttons
            document.querySelectorAll('.option-btn')
                .forEach((button) => {

                    button.disabled = true;

                });

            // Correct Answer
            if (option === current.answer) {

                score++;

                btn.style.backgroundColor = 'green';

            } else {

                btn.style.backgroundColor = 'red';

            }

            // Show correct answer
            document.querySelectorAll('.option-btn')
                .forEach((button) => {

                    if (button.innerText === current.answer) {

                        button.style.backgroundColor = 'green';

                    }

                });

        });

        optionsEl.appendChild(btn);

    });

}



nextBtn.addEventListener('click', () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});



prevBtn.addEventListener('click', () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});



submitBtn.addEventListener('click', () => {

    showResult();

});


function showResult() {

    questionEl.innerHTML =
        `Quiz Finished 🎉 <br> Your Score: ${score}/${questions.length}`;

    optionsEl.innerHTML = '';

    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';

}

loadQuestion();