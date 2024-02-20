import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as IconPlus } from "./assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "./assets/images/icon-minus.svg";

interface IQuestionSet {
  questionIndex: number;
  currentIndex: number;
  updateQuestionIndex: (newIndex: number) => void;
  question: string;
  answer: string;
  isLastQuestion: boolean;
}

export const QuestionSet: React.FC<IQuestionSet> = ({
  questionIndex,
  currentIndex,
  updateQuestionIndex,
  question,
  answer,
  isLastQuestion,
}) => {
  const CLOSED_INDEX = -1;
  const [showAnswer, setShowAnswer] = useState<boolean>(
    currentIndex == questionIndex
  );

  const handleQuestionClick = useCallback(() => {
    if (showAnswer) {
      updateQuestionIndex(CLOSED_INDEX);
      setShowAnswer(false);
    } else {
      updateQuestionIndex(currentIndex);
      setShowAnswer(true);
    }
  }, [showAnswer, currentIndex]);

  return (
    <div className="question-set">
      <div className="question-title" onClick={handleQuestionClick}>
        <p className="question">{question}</p>
        {questionIndex == currentIndex ? (
          <IconMinus className="icon minus" />
        ) : (
          <IconPlus className="icon plus" />
        )}
      </div>
      {questionIndex == currentIndex && <p className="answer">{answer}</p>}
      {!isLastQuestion && <hr className="divider" />}
    </div>
  );
};
