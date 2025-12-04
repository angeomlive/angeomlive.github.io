import { useEffect, useState } from "react";
import QuestionsView from "./QuestionView";
import {Question} from "../types";
import shuffle from "lodash/shuffle";


const QuestionsBlock = ({ groupId }: { groupId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<Question | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/data/${groupId}.json`);
      const questionsData: Question[] = await res.json();

      const shuffled = shuffle(questionsData);
      setQuestions(shuffled);

      // берем последний
      const last = shuffled[shuffled.length - 1] || null;
      setCurrent(last);
    };

    load();
  }, [groupId]);

  const nextQuestion = () => {
    setQuestions(prev => {
      const copy = [...prev];
      copy.pop();                       // удаляем последний
      const newCurrent = copy[copy.length - 1] || null;
      setCurrent(newCurrent);
      return copy;
    });
  };

  return (
      <div className="row row-question-block">
          <div className="col">
              {current ?
                  <>
                      <QuestionsView question={current} pathGroupData={`data/${groupId}`}/>

                      <div className="row justify-content-center  mb-5">
                          <div className="col-auto">
                              <button onClick={nextQuestion} className="btn btn-primary rounded-1">
                                  Попробовать другой вопрос
                              </button>
                          </div>
                      </div>

                      <div className="row justify-content-center mb-5">
                          <div className="col-auto">
                              <p>Осталось: {questions.length - 1}</p>
                          </div>
                      </div>
                  </>
                  :
                  <div className="text-center">
                      <div className="h4 fw-light mb-4">Вопросы этой темы закончились 🎉!</div>
                      <button className="btn btn-primary rounded-1" onClick={() => window.location.reload()}>Пройти еще раз
                      </button>
                  </div>
              }
          </div>
      </div>
  );
}


export default QuestionsBlock