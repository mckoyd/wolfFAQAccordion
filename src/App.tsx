import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as BackgroundPatternMobile } from "./assets/images/background-pattern-mobile.svg";
import { ReactComponent as BackgroundPatternDesktop } from "./assets/images/background-pattern-desktop.svg";
import { ReactComponent as IconStar } from "./assets/images/icon-star.svg";
import { questions } from "./constants";
import { QuestionSet } from "./QuestionSet";
import "./App.css";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 375);
  const [questionIndex, setQuestionIndex] = useState<number>(-1);

  const updateScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth <= 375);
  }, []);

  const updateQuestionIndex = useCallback(
    (newQuestionIndex: number) => setQuestionIndex(newQuestionIndex),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  });

  return (
    <>
      {isMobile ? (
        <BackgroundPatternMobile className="bg" />
      ) : (
        <BackgroundPatternDesktop className="bg" />
      )}
      <div className="card">
        <div className="card-title">
          <IconStar className="icon star" />{" "}
          <h1 className="faqs-title">FAQs</h1>
        </div>

        {questions.map((questionObject, currentIndex) => (
          <QuestionSet
            questionIndex={questionIndex}
            currentIndex={currentIndex}
            updateQuestionIndex={updateQuestionIndex}
            question={questionObject.question}
            answer={questionObject.answer}
            isLastQuestion={questions.length - 1 == currentIndex}
            key={`${questionObject.question}-${currentIndex}`}
          />
        ))}
      </div>
    </>
  );
};

export default App;
