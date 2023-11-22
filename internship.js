// questionStore.js
class QuestionStore {
  constructor() {
    this.questions = [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  getQuestions() {
    return this.questions;
  }
}

// questionPaperGenerator.js
class QuestionPaperGenerator {
  constructor(questionStore) {
    this.questionStore = questionStore;
  }

  generateQuestionPaper(totalMarks, difficultyDistribution) {
    const questionPaper = [];
    for (const difficulty in difficultyDistribution) {
      const percentage = difficultyDistribution[difficulty];
      const difficultyQuestions = this.getQuestionsByDifficulty(difficulty);
      const marks = (totalMarks * percentage) / 100;

      // Randomly select questions for the given difficulty
      const selectedQuestions = this.getRandomQuestions(difficultyQuestions, marks);
      questionPaper.push(...selectedQuestions);
    }

    return questionPaper;
  }

  getQuestionsByDifficulty(difficulty) {
    return this.questionStore.getQuestions().filter(question => question.difficulty === difficulty);
  }

  getRandomQuestions(questions, marks) {
    const selectedQuestions = [];
    let remainingMarks = marks;

    while (remainingMarks > 0 && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];

      if (selectedQuestion.marks <= remainingMarks) {
        selectedQuestions.push(selectedQuestion);
        remainingMarks -= selectedQuestion.marks;
      }

      questions.splice(randomIndex, 1);
    }

    return selectedQuestions;
  }
}

// Example usage
const questionStore = new QuestionStore();
questionStore.addQuestion({ question: "What is the speed of light", subject: "Physics", topic: "Waves", difficulty: "Easy", marks: 5 });
// Add more questions as needed

const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

const difficultyDistribution = {
  Easy: 20,
  Medium: 50,
  Hard: 30,
};

const generatedQuestionPaper = questionPaperGenerator.generateQuestionPaper(100, difficultyDistribution);
console.log("Generated Question Paper:", generatedQuestionPaper);
