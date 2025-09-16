// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// // ============================================
// // ANSWER POPUP COMPONENT
// // ============================================
// interface PopupProps {
//   isVisible: boolean;
//   isCorrect: boolean;
//   onClose: () => void;
// }

// const AnswerPopup: React.FC<PopupProps> = ({
//   isVisible,
//   isCorrect,
//   onClose,
// }) => {
//   useEffect(() => {
//     if (isVisible) {
//       // Play audio based on answer correctness
//       const audio = new Audio(
//         isCorrect ? "/audio/rightAnswer.mp3" : "/audio/wrongAnswer.mp3"
//       );
//       audio.play().catch((error) => {
//         console.log("Audio playback failed:", error);
//       });

//       // Auto close popup after 2 seconds
//       const timer = setTimeout(() => {
//         onClose();
//       }, 1400);

//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, isCorrect, onClose]);

//   if (!isVisible) return null;

//   return (
//     <div
//       style={{ background: "rgba(0,0,0,0.8)" }}
//       className="fixed inset-0  flex items-center justify-center z-50"
//     >
//       {isCorrect ? (
//         <div className="flex flex-col gap-2 text-center justify-center items-center">
//           <Image
//             src="/right.png"
//             alt="right"
//             width={234}
//             height={144}
//             className="w-full object-contain"
//           />
//           <h3 className="quantico-bold text-2xl">You Scored A Point!</h3>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-2 text-center justify-center items-center">
//           <Image
//             src="/oops.png"
//             alt="right"
//             width={234}
//             height={144}
//             className="w-full object-contain"
//           />
//           <h3 className="quantico-bold text-2xl">
//             Off target! <br />
//             Try the next one
//           </h3>
//         </div>
//       )}
//     </div>
//   );
// };

// // Define interfaces
// interface QuizOption {
//   id: string;
//   text: string;
//   isCorrect: boolean;
// }

// interface QuizQuestion {
//   id: string;
//   question: string;
//   options: QuizOption[];
// }

// interface QuizCardProps {
//   questionData: QuizQuestion;
//   onAnswerSelect?: (
//     questionId: string,
//     selectedOptionId: string,
//     isCorrect: boolean
//   ) => void;
//   className?: string;
//   zIndex: number;
//   isActive: boolean;
//   cardIndex: number;
//   isAnimatingOut: boolean;
//   currentQuestionIndex: number;
//   onShowPopup: (isCorrect: boolean) => void;
//   isLoaded: boolean;
// }

// // Extract QuizCard as a separate component
// const QuizCard: React.FC<QuizCardProps> = ({
//   questionData,
//   onAnswerSelect,
//   className = "",
//   zIndex,
//   isActive,
//   cardIndex,
//   isAnimatingOut,
//   currentQuestionIndex,
//   onShowPopup,
//   isLoaded,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [isAnswered, setIsAnswered] = useState(false);

//   const handleOptionClick = (optionId: string, isCorrect: boolean) => {
//     if (!isActive || isAnswered) return; // Only allow interaction with the top card and prevent multiple clicks

//     setSelectedOption(optionId);
//     setIsAnswered(true);

//     // Show popup with correct/incorrect feedback
//     onShowPopup(isCorrect);

//     if (onAnswerSelect) {
//       onAnswerSelect(questionData.id, optionId, isCorrect);
//     }
//   };

//   const color: string[] = [
//     "#38539A",
//     "#A65523B2",
//     "#62625A80",
//     "#396E7580",
//     "#54622380",
//     "#62625A40",
//     "#C087644D",
//     "#38539A66",
//     "#396E7533",
//     "#fffff",
//   ];

//   // Animation styles
//   const getAnimationStyle = () => {
//     if (isAnimatingOut) {
//       return {
//         transform: `translate(-50%, -50%) translateY(${
//           cardIndex * -13
//         }px) scale(${1 - cardIndex * 0.03}) 
//                    rotateZ(-45deg) translateX(200px) translateY(300px)`,
//         opacity: 1,
//         transition: "all 0.8s ease-in-out",
//       };
//     }

//     // Add fade-in and slide animation for cards
//     const baseTransform = `translate(-50%, -50%) translateY(${
//       cardIndex * -16
//     }px) scale(${1 - cardIndex * 0.03})`;

//     if (!isLoaded && isActive) {
//       return {
//         transform: `${baseTransform} translateY(50px)`,
//         opacity: 0,
//         transition: "all 0.6s ease-out",
//       };
//     }

//     return {
//       transform: baseTransform,
//       opacity: 1,
//       transition: "all 0.1s ease-out",
//     };
//   };

//   return (
//     <div
//       className={`absolute bg-[#F1F2FF] h-[360px] rounded-b-[18px] p-6 w-full max-w-md ${className} ${
//         isActive && !isAnswered ? "" : "pointer-events-none"
//       }`}
//       style={{
//         zIndex,
//         top: "50%",
//         left: "50%",
//         boxShadow: "0 4px 12px rgba(100, 100, 100, 0.4)",
//         ...getAnimationStyle(),
//       }}
//     >
//       {/* Question */}
//       <div
//         style={{
//           backgroundColor: color[cardIndex + currentQuestionIndex],
//           width: "600px",
//           border: `1px solid ${color[cardIndex + currentQuestionIndex]}`,

//           filter: ` blur(${cardIndex}px)`,
//         }}
//         className="h-2  absolute top-0 left-0"
//       ></div>

//       <div className="mb-6">
//         <h2 className="font-normal text-sm text-gray-800 leading-relaxed">
//           {questionData.question}
//         </h2>
//       </div>

//       {/* Options */}
//       <div className="space-y-3">
//         {questionData.options.map((option) => (
//           <button
//             key={option.id}
//             onClick={() => handleOptionClick(option.id, option.isCorrect)}
//             disabled={isAnswered}
//             className={`w-full p-2 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
//               selectedOption === option.id
//                 ? "border-blue-500 bg-blue-50 text-blue-700"
//                 : "border-gray-200 bg-white text-gray-700"
//             } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
//           >
//             <span className="block text-sm font-medium">{option.text}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// function Quiz() {
//   const router = useRouter();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [score, setScore] = useState<number>(0);
//   const [answers, setAnswers] = useState<
//     Array<{ questionId: string; selectedOptionId: string; isCorrect: boolean }>
//   >([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
//     new Set()
//   );
//   const [animatingCards, setAnimatingCards] = useState<Set<number>>(new Set());
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupIsCorrect, setPopupIsCorrect] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   const sampleQuizData: QuizQuestion[] = [
//     {
//       id: "q1",
//       question:
//         "Q1. If you get some sun exposure daily, do you still need a Vitamin D supplement?",
//       options: [
//         {
//           id: "a1",
//           text: "No, sun exposure is always enough",
//           isCorrect: false,
//         },
//         {
//           id: "a2",
//           text: "Yes, because sunlight may not always provide adequate Vitamin D",
//           isCorrect: true,
//         },
//         { id: "a3", text: "Only in winter", isCorrect: false },
//         { id: "a4", text: "Only if you have light skin", isCorrect: false },
//       ],
//     },
//     {
//       id: "q2",
//       question: "Q2. Vitamin D mainly helps your body absorb which mineral?",
//       options: [
//         { id: "b1", text: "Iron", isCorrect: false },
//         { id: "b2", text: "Zinc", isCorrect: false },
//         { id: "b3", text: "Calcium", isCorrect: true },
//         { id: "b4", text: "Magnesium", isCorrect: false },
//       ],
//     },
//     {
//       id: "q3",
//       question: "Q3. Which vitamin helps direct calcium into bones?",
//       options: [
//         { id: "c1", text: "Vitamin A", isCorrect: false },
//         { id: "c2", text: "Vitamin K2", isCorrect: true },
//         { id: "c3", text: "Vitamin E", isCorrect: false },
//         { id: "c4", text: "Vitamin C", isCorrect: false },
//       ],
//     },
//     {
//       id: "q4",
//       question: "Q4. Which mineral enhances Vitamin D utilization?",
//       options: [
//         { id: "d1", text: "Potassium", isCorrect: false },
//         { id: "d2", text: "Boron", isCorrect: true },
//         { id: "d3", text: "Selenium", isCorrect: false },
//         { id: "d4", text: "Copper", isCorrect: false },
//       ],
//     },
//     {
//       id: "q5",
//       question:
//         "Q5. What’s the D3 amount per serving in Nutrilite Vitamin D Plus Boron?",
//       options: [
//         { id: "e1", text: "200 IU / 5 mcg", isCorrect: false },
//         { id: "e2", text: "400 IU / 10 mcg", isCorrect: false },
//         { id: "e3", text: "600 IU / 15 mcg", isCorrect: true },
//         { id: "e4", text: "1000 IU / 25 mcg", isCorrect: false },
//       ],
//     },
//     {
//       id: "q6",
//       question: "Q6. Vitamin D is just a vitamin, not a hormone.",
//       options: [
//         { id: "f1", text: "TRUE", isCorrect: false },
//         {
//           id: "f2",
//           text: "False — it also acts like a hormone",
//           isCorrect: true,
//         },
//       ],
//     },
//     {
//       id: "q7",
//       question: "Q7. Why is Vitamin K2 important for bone mineralization?",
//       options: [
//         { id: "g1", text: "It helps produce more energy", isCorrect: false },
//         {
//           id: "g2",
//           text: "It directs calcium into bones and teeth",
//           isCorrect: true,
//         },
//         { id: "g3", text: "It increases muscle strength", isCorrect: false },
//         { id: "g4", text: "It prevents dehydration", isCorrect: false },
//       ],
//     },
//     {
//       id: "q8",
//       question:
//         "Q8. Why are women after the age of 40 considered a key target group for Vitamin D supplements?",
//       options: [
//         {
//           id: "h1",
//           text: "They often reduce calcium intake",
//           isCorrect: false,
//         },
//         {
//           id: "h2",
//           text: "Hormonal changes can speed up bone loss",
//           isCorrect: true,
//         },
//         {
//           id: "h3",
//           text: "They stop producing Vitamin D naturally",
//           isCorrect: false,
//         },
//         { id: "h4", text: "They exercise less", isCorrect: false },
//       ],
//     },
//     {
//       id: "q9",
//       question:
//         "Q9. How many key steps are there in the Value-Based Selling framework?",
//       options: [
//         { id: "i1", text: "2", isCorrect: false },
//         { id: "i2", text: "3", isCorrect: false },
//         { id: "i3", text: "4", isCorrect: false },
//         { id: "i4", text: "5", isCorrect: true },
//       ],
//     },
//     {
//       id: "q10",
//       question:
//         "Q10. Which of these is not a step in the Value-Based Selling framework?",
//       options: [
//         { id: "j1", text: "Share your Personal Story", isCorrect: false },
//         { id: "j2", text: "Explain the features", isCorrect: true },
//         { id: "j3", text: "Inspire Connections", isCorrect: false },
//         { id: "j4", text: "Identify the Value", isCorrect: false },
//         { id: "j5", text: "Build loyalty", isCorrect: false },
//       ],
//     },
//   ];

//   useEffect(() => {
//     // Trigger animations after component mounts
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleShowPopup = (isCorrect: boolean) => {
//     setPopupIsCorrect(isCorrect);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleAnswerSelect = (
//     questionId: string,
//     selectedOptionId: string,
//     isCorrect: boolean
//   ) => {
//     // Add to answered questions
//     setAnsweredQuestions((prev) => new Set([...prev, questionId]));

//     // Add answer
//     setAnswers((prev) => [
//       ...prev,
//       { questionId, selectedOptionId, isCorrect },
//     ]);

//     if (isCorrect) {
//       setScore((prev) => prev + 1);
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < sampleQuizData.length - 1) {
//       // Start animation for current card
//       setAnimatingCards((prev) => new Set([...prev, currentQuestionIndex]));

//       // Wait for animation to complete before moving to next question
//       setTimeout(() => {
//         setCurrentQuestionIndex((prev) => prev + 1);
//         setAnimatingCards((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(currentQuestionIndex);
//           return newSet;
//         });
//       }, 600); // Match the animation duration
//     }
//   };

//   const finishQuiz = () => {
//     // Start animation for the last card
//     setAnimatingCards((prev) => new Set([...prev, currentQuestionIndex]));

//     // Wait for animation to complete before redirecting
//     setTimeout(() => {
//       // Option 1: Pass data via URL query parameters
//       router.push({
//         pathname: "/result",
//         query: {
//           score: score,
//           total: sampleQuizData.length,
//           percentage: Math.round((score / sampleQuizData.length) * 100),
//         },
//       });
//     }, 600);
//   };

//   const resetQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setAnswers([]);
//     setAnsweredQuestions(new Set());
//     setAnimatingCards(new Set());
//     setShowPopup(false);
//     setPopupIsCorrect(false);
//     setIsLoaded(false);

//     // Retrigger load animation
//     setTimeout(() => {
//       setIsLoaded(true);
//     }, 100);
//   };

//   const isQuizComplete = currentQuestionIndex >= sampleQuizData.length;

//   return (
//     <div
//       className={`bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden transition-opacity duration-1000  ${
//         isLoaded ? "opacity-100" : "opacity-0"
//       } `}
//     >
//       <div className="flex flex-col flex-1">
//         {/* Header with logo and score - slides from 100px bottom to actual position */}
//         <div
//           className={`flex justify-between items-center quantico-bold transform transition-all duration-800 ease-out ${
//             isLoaded ? "translate-y-0" : "translate-y-[100px]"
//           }`}
//         >
//           <Image src="/logo.png" alt="Logo" width={99} height={34} />
//           <div className="p-2 rounded-full bg-white text-[#2C2C2C] w-fit text-sm">
//             Score: {score}/{sampleQuizData.length}
//           </div>
//         </div>

//         <div className="flex-1 relative">
//           {/* Stack all cards on top of each other */}
//           {sampleQuizData.map((question, index) => {
//             // Only render cards that haven't been completed yet
//             if (index < currentQuestionIndex && !animatingCards.has(index))
//               return null;

//             return (
//               <QuizCard
//                 key={question.id}
//                 questionData={question}
//                 onAnswerSelect={handleAnswerSelect}
//                 zIndex={sampleQuizData.length - index}
//                 isActive={index === currentQuestionIndex}
//                 cardIndex={index - currentQuestionIndex}
//                 isAnimatingOut={animatingCards.has(index)}
//                 currentQuestionIndex={currentQuestionIndex}
//                 onShowPopup={handleShowPopup}
//                 isLoaded={isLoaded}
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* Answer Popup */}
//       <AnswerPopup
//         isVisible={showPopup}
//         isCorrect={popupIsCorrect}
//         onClose={handleClosePopup}
//       />

//       {/* Navigation Buttons - slides from bottom to actual position */}
//       {!isQuizComplete && (
//         <div
//           className={`flex flex-col gap-6 transform transition-all duration-1000 ease-out delay-500 ${
//             isLoaded ? "translate-y-0" : "translate-y-[100px]"
//           }`}
//         >
//           {currentQuestionIndex === sampleQuizData.length - 1 ? (
//             <button
//               onClick={finishQuiz}
//               disabled={
//                 !answeredQuestions.has(
//                   sampleQuizData[currentQuestionIndex].id
//                 ) || animatingCards.has(currentQuestionIndex)
//               }
//               className={`rounded-full p-3 w-full border quantico-bold transition-all duration-300 ${
//                 answeredQuestions.has(
//                   sampleQuizData[currentQuestionIndex].id
//                 ) && !animatingCards.has(currentQuestionIndex)
//                   ? "bg-white text-black "
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {animatingCards.has(currentQuestionIndex)
//                 ? "FINISHING..."
//                 : "FINISH QUIZ"}
//             </button>
//           ) : (
//             <button
//               onClick={nextQuestion}
//               disabled={
//                 !answeredQuestions.has(
//                   sampleQuizData[currentQuestionIndex].id
//                 ) || animatingCards.has(currentQuestionIndex)
//               }
//               className={`rounded-full p-3 w-full border quantico-bold transition-all duration-300 ${
//                 answeredQuestions.has(
//                   sampleQuizData[currentQuestionIndex].id
//                 ) && !animatingCards.has(currentQuestionIndex)
//                   ? "bg-white text-black hover:bg-gray-100"
//                   : "border-white backdrop-blur-sm shadow-sm text-white cursor-not-allowed"
//               }`}
//             >
//               {animatingCards.has(currentQuestionIndex) ? "MOVING..." : "NEXT"}
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Quiz;


import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// ============================================
// ANSWER POPUP COMPONENT
// ============================================
interface PopupProps {
  isVisible: boolean;
  isCorrect: boolean;
  onClose: () => void;
}

const AnswerPopup: React.FC<PopupProps> = ({
  isVisible,
  isCorrect,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      // Play audio based on answer correctness
      const audio = new Audio(
        isCorrect ? "/audio/rightAnswer.mp3" : "/audio/wrongAnswer.mp3"
      );
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });

      // Auto close popup after 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isCorrect, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{ background: "rgba(0,0,0,0.8)" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {isCorrect ? (
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <Image
            src="/right.png"
            alt="right"
            width={234}
            height={144}
            className="w-full object-contain"
          />
          <h3 className="quantico-bold text-2xl">You Scored A Point!</h3>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <Image
            src="/oops.png"
            alt="right"
            width={234}
            height={144}
            className="w-full object-contain"
          />
          <h3 className="quantico-bold text-2xl">
            Off target! <br />
            Try the next one
          </h3>
        </div>
      )}
    </div>
  );
};

// Define interfaces
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
  zIndex: number;
  isActive: boolean;
  cardIndex: number;
  isAnimatingOut: boolean;
  currentQuestionIndex: number;
  onShowPopup: (isCorrect: boolean) => void;
  isLoaded: boolean;
}

// Extract QuizCard as a separate component
const QuizCard: React.FC<QuizCardProps> = ({
  questionData,
  onAnswerSelect,
  className = "",
  zIndex,
  isActive,
  cardIndex,
  isAnimatingOut,
  currentQuestionIndex,
  onShowPopup,
  isLoaded,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (!isActive || isAnswered) return; // Only allow interaction with the top card and prevent multiple clicks

    setSelectedOption(optionId);
    setIsAnswered(true);

    // Show popup with correct/incorrect feedback
    onShowPopup(isCorrect);

    if (onAnswerSelect) {
      onAnswerSelect(questionData.id, optionId, isCorrect);
    }
  };

  function convertCount(count:number) {
    // if (count < 1 || count > 10) {
    //   throw new Error("Count must be between 1 and 9");
    // }

    if (count === 1 || count===0) {
      return 1.0;
    } else {
      return (10 - count) / 10;
    }
  }


  const color: string[] = [
    "#38539A",
    "#A65523",
    "#62625A",
    "#396E75",
    "#546223",
    "#38539A",
    "#A65523",
    "#62625A",
    "#396E75",
    "#546223",
  ];

  // Animation styles
  const getAnimationStyle = () => {
    if (isAnimatingOut) {
      return {
        transform: `translate(-50%, -50%) translateY(${
          cardIndex * -16
        }px) scale(${1 - cardIndex * 0.03}) 
                   rotateZ(-45deg) translateX(200px) translateY(300px)`,
        opacity: 1,
        transition: "all 0.8s ease-in-out",
      };
    }

    // Add fade-in and slide animation for cards
    const baseTransform = `translate(-50%, -50%) translateY(${
      cardIndex * -25
    }px) scale(${1 - cardIndex * 0.04})`;

    if (!isLoaded && isActive) {
      return {
        transform: `${baseTransform} translateY(50px)`,
        opacity: 0,
        transition: "all 0.6s ease-out",
       
      };
    }

    return {
      transform: baseTransform,
      opacity: 1,
      transition: "all 0.1s ease-out",
     
    };
  };

  return (
    <div
      className={`absolute bg-[#FBFCFF] h-[360px]  rounded-b-[18px]  p-6 w-full max-w-md ${className} ${
        isActive && !isAnswered ? "" : "pointer-events-none"
      }`}
      style={{
        zIndex,
        top: "50%",
        left: "50%",
        boxShadow: "0 4px 12px rgba(100, 100, 100, 0.4)",
        ...getAnimationStyle(),
        opacity: convertCount(cardIndex + 1),
        // filter: ` blur(${cardIndex}px)`
      }}
    >
      {/* Question */}
      <div
        style={{
          backgroundColor: color[cardIndex + currentQuestionIndex],
          width: "600px",
          // border: `1px solid ${color[cardIndex + currentQuestionIndex]}`,
          // opacity: convertCount(cardIndex),
          // filter: ` blur(${cardIndex}px)`,
        }}
        className="h-2  absolute top-0 left-0"
      ></div>

      <div className="mb-6">
        <h2
          className={`font-normal text-sm ${cardIndex==0?"text-gray-800":"text-white"} leading-relaxed`}
        >
          {questionData.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const isCorrectOption = option.isCorrect;
          const isWrongSelection = isSelected && !isCorrectOption && isAnswered;
          const isCorrectSelection =
            isSelected && isCorrectOption && isAnswered;
          const shouldShowAsCorrect = isAnswered && isCorrectOption; // Show correct answer even if not selected
          const shouldShowIcon =
            (isAnswered && isSelected) || (isAnswered && isCorrectOption);
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D...

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id, option.isCorrect)}
              disabled={isAnswered}
              className={`w-full p-2 text-left border-[0.6px]  rounded-lg transition-all duration-200 flex items-center justify-between ${
                shouldShowAsCorrect
                  ? "border-green-500 bg-green-100 text-green-800"
                  : isWrongSelection
                  ? "border-red-500 bg-red-100 text-red-800"
                  : isSelected && !isAnswered
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-[#000000] bg-white text-gray-700"
              } ${
                !isAnswered
                  ? "hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <span className="block text-sm font-medium">
                <span className="font-bold mr-2">{optionLabel}.</span>
                {option.text}
              </span>
              {shouldShowIcon && (
                <div className="flex-shrink-0 ml-2">
                  {isCorrectOption ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function Quiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; selectedOptionId: string; isCorrect: boolean }>
  >([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [animatingCards, setAnimatingCards] = useState<Set<number>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupIsCorrect, setPopupIsCorrect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sampleQuizData: QuizQuestion[] = [
    {
      id: "q1",
      question:
        "Q1. If you get some sun exposure daily, do you still need a Vitamin D supplement?",
      options: [
        {
          id: "a1",
          text: "No, sun exposure is always enough",
          isCorrect: false,
        },
        {
          id: "a2",
          text: "Yes, because sunlight may not always provide adequate Vitamin D",
          isCorrect: true,
        },
        { id: "a3", text: "Only in winter", isCorrect: false },
        { id: "a4", text: "Only if you have light skin", isCorrect: false },
      ],
    },
    {
      id: "q2",
      question: "Q2. Vitamin D mainly helps your body absorb which mineral?",
      options: [
        { id: "b1", text: "Iron", isCorrect: false },
        { id: "b2", text: "Zinc", isCorrect: false },
        { id: "b3", text: "Calcium", isCorrect: true },
        { id: "b4", text: "Magnesium", isCorrect: false },
      ],
    },
    {
      id: "q3",
      question: "Q3. Which vitamin helps direct calcium into bones?",
      options: [
        { id: "c1", text: "Vitamin A", isCorrect: false },
        { id: "c2", text: "Vitamin K2", isCorrect: true },
        { id: "c3", text: "Vitamin E", isCorrect: false },
        { id: "c4", text: "Vitamin C", isCorrect: false },
      ],
    },
    {
      id: "q4",
      question: "Q4. Which mineral enhances Vitamin D utilization?",
      options: [
        { id: "d1", text: "Potassium", isCorrect: false },
        { id: "d2", text: "Boron", isCorrect: true },
        { id: "d3", text: "Selenium", isCorrect: false },
        { id: "d4", text: "Copper", isCorrect: false },
      ],
    },
    {
      id: "q5",
      question:
        "Q5. What's the D3 amount per serving in Nutrilite Vitamin D Plus Boron?",
      options: [
        { id: "e1", text: "200 IU / 5 mcg", isCorrect: false },
        { id: "e2", text: "400 IU / 10 mcg", isCorrect: false },
        { id: "e3", text: "600 IU / 15 mcg", isCorrect: true },
        { id: "e4", text: "1000 IU / 25 mcg", isCorrect: false },
      ],
    },
    {
      id: "q6",
      question: "Q6. Vitamin D is just a vitamin, not a hormone.",
      options: [
        { id: "f1", text: "TRUE", isCorrect: false },
        {
          id: "f2",
          text: "False — it also acts like a hormone",
          isCorrect: true,
        },
      ],
    },
    {
      id: "q7",
      question: "Q7. Why is Vitamin K2 important for bone mineralization?",
      options: [
        { id: "g1", text: "It helps produce more energy", isCorrect: false },
        {
          id: "g2",
          text: "It directs calcium into bones and teeth",
          isCorrect: true,
        },
        { id: "g3", text: "It increases muscle strength", isCorrect: false },
        { id: "g4", text: "It prevents dehydration", isCorrect: false },
      ],
    },
    {
      id: "q8",
      question:
        "Q8. Why are women after the age of 40 considered a key target group for Vitamin D supplements?",
      options: [
        {
          id: "h1",
          text: "They often reduce calcium intake",
          isCorrect: false,
        },
        {
          id: "h2",
          text: "Hormonal changes can speed up bone loss",
          isCorrect: true,
        },
        {
          id: "h3",
          text: "They stop producing Vitamin D naturally",
          isCorrect: false,
        },
        { id: "h4", text: "They exercise less", isCorrect: false },
      ],
    },
    {
      id: "q9",
      question:
        "Q9. How many key steps are there in the Value-Based Selling framework?",
      options: [
        { id: "i1", text: "2", isCorrect: false },
        { id: "i2", text: "3", isCorrect: false },
        { id: "i3", text: "4", isCorrect: false },
        { id: "i4", text: "5", isCorrect: true },
      ],
    },
    {
      id: "q10",
      question:
        "Q10. Which of these is not a step in the Value-Based Selling framework?",
      options: [
        { id: "j1", text: "Share your Personal Story", isCorrect: false },
        { id: "j2", text: "Explain the features", isCorrect: true },
        { id: "j3", text: "Inspire Connections", isCorrect: false },
        { id: "j4", text: "Identify the Value", isCorrect: false },
        { id: "j5", text: "Build loyalty", isCorrect: false },
      ],
    },
  ];

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleShowPopup = (isCorrect: boolean) => {
    setPopupIsCorrect(isCorrect);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAnswerSelect = (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) => {
    // Add to answered questions
    setAnsweredQuestions((prev) => new Set([...prev, questionId]));

    // Add answer
    setAnswers((prev) => [
      ...prev,
      { questionId, selectedOptionId, isCorrect },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < sampleQuizData.length - 1) {
      // Start animation for current card
      setAnimatingCards((prev) => new Set([...prev, currentQuestionIndex]));

      // Wait for animation to complete before moving to next question
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAnimatingCards((prev) => {
          const newSet = new Set(prev);
          newSet.delete(currentQuestionIndex);
          return newSet;
        });
      }, 600); // Match the animation duration
    }
  };

  const finishQuiz = () => {
    // Start animation for the last card
    setAnimatingCards((prev) => new Set([...prev, currentQuestionIndex]));

    // Wait for animation to complete before redirecting
    setTimeout(() => {
      // Option 1: Pass data via URL query parameters
      router.push({
        pathname: "/result",
        query: {
          score: score,
          total: sampleQuizData.length,
          percentage: Math.round((score / sampleQuizData.length) * 100),
        },
      });
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setAnsweredQuestions(new Set());
    setAnimatingCards(new Set());
    setShowPopup(false);
    setPopupIsCorrect(false);
    setIsLoaded(false);

    // Retrigger load animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  };

  const isQuizComplete = currentQuestionIndex >= sampleQuizData.length;

  return (
    <>
      {/* Main Quiz Content */}
      <div
        className={`bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden transition-all duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${showPopup ? "blur-sm" : ""}`}
      >
        <div className="flex flex-col flex-1">
          {/* Header with logo and score - slides from 100px bottom to actual position */}
          <div
            className={`flex justify-between items-center quantico-bold transform transition-all duration-800 ease-out ${
              isLoaded ? "translate-y-0" : "translate-y-[100px]"
            }`}
          >
            <Image src="/logo.png" alt="Logo" width={99} height={34} />
            <div className="p-2 rounded-full bg-white text-[#2C2C2C] w-fit text-sm">
              Score: {score}/{sampleQuizData.length}
            </div>
          </div>

          <div className="flex-1 relative mt-28 ">
            {/* Stack all cards on top of each other */}
            {sampleQuizData.map((question, index) => {
              // Only render cards that haven't been completed yet
              if (index < currentQuestionIndex && !animatingCards.has(index))
                return null;

              return (
                <QuizCard
                  key={question.id}
                  questionData={question}
                  onAnswerSelect={handleAnswerSelect}
                  zIndex={sampleQuizData.length - index}
                  isActive={index === currentQuestionIndex}
                  cardIndex={index - currentQuestionIndex}
                  isAnimatingOut={animatingCards.has(index)}
                  currentQuestionIndex={currentQuestionIndex}
                  onShowPopup={handleShowPopup}
                  isLoaded={isLoaded}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons - slides from bottom to actual position */}
        {!isQuizComplete && (
          <div
            className={`flex flex-col gap-6 transform transition-all duration-1000 ease-out delay-500 ${
              isLoaded ? "translate-y-0" : "translate-y-[100px]"
            }`}
          >
            {currentQuestionIndex === sampleQuizData.length - 1 ? (
              <button
                onClick={finishQuiz}
                disabled={
                  !answeredQuestions.has(
                    sampleQuizData[currentQuestionIndex].id
                  ) || animatingCards.has(currentQuestionIndex)
                }
                className={`rounded-full p-3 w-full border quantico-bold transition-all duration-300 ${
                  answeredQuestions.has(
                    sampleQuizData[currentQuestionIndex].id
                  ) && !animatingCards.has(currentQuestionIndex)
                    ? "bg-white text-black "
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {animatingCards.has(currentQuestionIndex)
                  ? "FINISHING..."
                  : "FINISH QUIZ"}
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={
                  !answeredQuestions.has(
                    sampleQuizData[currentQuestionIndex].id
                  ) || animatingCards.has(currentQuestionIndex)
                }
                className={`rounded-full p-3 w-full border quantico-bold transition-all duration-300 ${
                  answeredQuestions.has(
                    sampleQuizData[currentQuestionIndex].id
                  ) && !animatingCards.has(currentQuestionIndex)
                    ? "bg-white text-black "
                    : "border-white backdrop-blur-sm shadow-sm text-white cursor-not-allowed"
                }`}
              >
                {animatingCards.has(currentQuestionIndex)
                  ? "MOVING..."
                  : "NEXT"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Answer Popup - Outside main container so it won't get blurred */}
      <AnswerPopup
        isVisible={showPopup}
        isCorrect={popupIsCorrect}
        onClose={handleClosePopup}
      />
    </>
  );
}

export default Quiz;
