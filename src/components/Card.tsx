import React, { useState } from "react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizCardProps {
  questionData: QuizQuestion;
  onAnswerSelect?: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) => void;
  className?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  questionData,
  onAnswerSelect,
  className = "",
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    setSelectedOption(optionId);
    if (onAnswerSelect) {
      onAnswerSelect(questionData.id, optionId, isCorrect);
    }
  };

  return (
    <div
      className={`bg-[#F1F2FF] rounded-[18px] p-6 shadow-lg w-full max-w-md mx-auto ${className}`}
    >
      {/* Question */}
      <div className="mb-6">
        <h2 className=" font-normal text-sm text-gray-800 leading-relaxed">
          {questionData.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {questionData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id, option.isCorrect)}
            className={`w-full p-2 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
              selectedOption === option.id
                ? option.isCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-red-500 bg-red-50 text-red-700"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <span className="block text-sm font-medium">{option.text}</span>
          </button>
        ))}
      </div>

      {/* Selected Answer Feedback */}
      {selectedOption && (
        <div className="mt-4 p-3 rounded-lg text-sm">
          {questionData.options.find((opt) => opt.id === selectedOption)
            ?.isCorrect ? (
            <div className="text-green-700 bg-green-50 p-2 rounded">
              ✅ Correct! Well done.
            </div>
          ) : (
            <div className="text-red-700 bg-red-50 p-2 rounded">
              ❌ Incorrect. The correct answer is:{" "}
              {questionData.options.find((opt) => opt.isCorrect)?.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Demo Component with Sample Quiz Data
const QuizCardDemo: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; selectedOptionId: string; isCorrect: boolean }>
  >([]);

  const sampleQuizData: QuizQuestion[] = [
    {
      id: "q1",
      question: "What is the capital of France?",
      options: [
        { id: "a1", text: "London", isCorrect: false },
        { id: "a2", text: "Berlin", isCorrect: false },
        { id: "a3", text: "Paris", isCorrect: true },
        { id: "a4", text: "Madrid", isCorrect: false },
      ],
    },
    {
      id: "q2",
      question:
        "Which programming language is known as the 'language of the web'?",
      options: [
        { id: "b1", text: "Python", isCorrect: false },
        { id: "b2", text: "JavaScript", isCorrect: true },
        { id: "b3", text: "Java", isCorrect: false },
        { id: "b4", text: "C++", isCorrect: false },
      ],
    },
    {
      id: "q3",
      question: "What does HTML stand for?",
      options: [
        { id: "c1", text: "Hyper Text Markup Language", isCorrect: true },
        { id: "c2", text: "High Tech Modern Language", isCorrect: false },
        { id: "c3", text: "Home Tool Markup Language", isCorrect: false },
        {
          id: "c4",
          text: "Hyperlink and Text Markup Language",
          isCorrect: false,
        },
      ],
    },
    {
      id: "q4",
      question: "Which company developed React?",
      options: [
        { id: "d1", text: "Google", isCorrect: false },
        { id: "d2", text: "Microsoft", isCorrect: false },
        { id: "d3", text: "Facebook (Meta)", isCorrect: true },
        { id: "d4", text: "Apple", isCorrect: false },
      ],
    },
  ];

  const handleAnswerSelect = (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) => {
    const newAnswer = { questionId, selectedOptionId, isCorrect };
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== questionId),
      newAnswer,
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < sampleQuizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const currentQuestion = sampleQuizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuizData.length - 1;
  const hasAnsweredCurrent = answers.some(
    (a) => a.questionId === currentQuestion.id
  );

  return (
   
        <QuizCard
          questionData={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          className="mb-6"
        />

  );
};

export default QuizCardDemo;
