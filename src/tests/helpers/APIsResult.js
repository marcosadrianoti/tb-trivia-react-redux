const API_LOGIN = {
    "response_code": 0,
    "response_message": "Token Generated Successfully!",
    "token": "522866eca4060cb3868f170fbf01d89ae4a4591719ac5b0d286afedf1708675b"
    };

const API_QUESTIONS = {
    "response_code": 0,
    "results": [
        {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": "medium",
        "question": "In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?",
        "correct_answer": "Drill Containment Unit",
        "incorrect_answers": [
        "Anti-Gravity Hook",
        "Influx Waver",
        "Cosmic Car Key"
        ]
        },
        {
        "category": "Animals",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which animal was part of an Russian domestication experiment in 1959?",
        "correct_answer": "Foxes",
        "incorrect_answers": [
        "Pigeons",
        "Bears",
        "Alligators"
        ]
        },
        {
        "category": "Entertainment: Film",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which sci-fi cult films plot concerns aliens attempting to prevent humans from creating a doomsday weapon?",
        "correct_answer": "Plan 9 from Outer Space",
        "incorrect_answers": [
        "The Man from Planet X",
        "It Came from Outer Space",
        "The Day The Earth Stood Still"
        ]
        },
        {
        "category": "Geography",
        "type": "multiple",
        "difficulty": "hard",
        "question": "Which country is the Taedong River in?",
        "correct_answer": "North Korea",
        "incorrect_answers": [
        "South Korea",
        "Japan",
        "China"
        ]
        },
        {
        "category": "Entertainment: Cartoon & Animations",
        "type": "multiple",
        "difficulty": "easy",
        "question": "In The Simpsons, which war did Seymour Skinner serve in the USA Army as a Green Beret?",
        "correct_answer": "Vietnam War",
        "incorrect_answers": [
        "World War 2",
        "World War 1",
        "Cold War"
        ]
        }
    ]
};

export {API_LOGIN, API_QUESTIONS};
