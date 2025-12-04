import {useEffect, useState} from "react";
import {RenderLatex} from "../utils/latex";
import {Question} from "../types";

const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920];

interface ResponsiveImageProps {
    src: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({src}) => {
    // Разделяем имя и расширение
    const dotIndex = src.lastIndexOf(".");
    const name = src.slice(0, dotIndex);
    const ext = src.slice(dotIndex);

    // Генерируем srcSet
    const srcSet = DEFAULT_WIDTHS.map((w) => `${name}-${w}px${ext} ${w}w`).join(", ");

    // Генерируем sizes, если не передан
    const defaultSizes = DEFAULT_WIDTHS
        .map((w) => `(max-width: ${w}px) ${w}px`)
        .join(", ") + `, ${DEFAULT_WIDTHS[DEFAULT_WIDTHS.length - 1]}px`;

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={defaultSizes}
            alt=""
            className="mw-100"
            style={{maxHeight: "50vh", objectFit: "contain"}}
        />
    );
};

export default function QuestionsView({question, groupId}: { question: Question, groupId: string; }) {
    const [selected, setSelected] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setSelected(null);
        setChecked(false);
    }, [question]);

    const handleCheck = () => {
        if (selected !== null) setChecked(true);
    };

    console.log('🔵 Question ID: ', question.id)
    console.log(question.options);

    const imageClassToggle = question.image ? "col" : "col col-md-9 offset-md-3"

    return (
        <div className="row block-question-view d-flex align-items-stretch justify-content-center mb-4">
            {question.image && (
                <div className="col col-md-6 col-lg-5  p-4">

                    <ResponsiveImage src={`data/${groupId}/${question.image}`} />

                </div>
            )}
            <div className={question.image ? "col col-md-6 col-lg-7  " : "col col-md-8"}>
                <div className="row">
                    <div className="col">
                        <div className="text-muted fw-light mb-2">Вопрос №{question.id}</div>
                        <div className="fs-5 fw-light mb-3 ">
                            <RenderLatex>{question.text}</RenderLatex>
                        </div>
                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className="col">
                        <form className="question-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="row justify-content-center mb-3">
                                <div className={imageClassToggle}>
                                    {question.options.map((opt, i) => {
                                        const isSelected = selected === i;
                                        let bgClass = "";

                                        if (checked) {
                                            const isCorrect = opt.istrue;
                                            if (isCorrect) bgClass = "text-success"; // зелёный
                                            if (isSelected && !isCorrect) bgClass = "text-danger"; // красный
                                        } else if (isSelected) {
                                            bgClass = "text-primary";
                                        }

                                        return (
                                            <div className="form-check d-flex align-items-center" key={i} style={{display: "block",}}>
                                                <input
                                                    id={`option-${i}`}
                                                    className="form-check-input mx-2"
                                                    type="radio"
                                                    name="option"
                                                    value={i}
                                                    checked={isSelected}
                                                    onChange={() => setSelected(i)}
                                                />
                                                <label className={`fs-6 fw-light form-check-label ${bgClass}`}
                                                       htmlFor={`option-${i}`}>
                                                    <RenderLatex>{opt.text}</RenderLatex></label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {!checked && (
                                <div className="row justify-content-center">
                                    <div className={question.image ? "col d-flex" : "col d-flex justify-content-center"}>
                                        <button className="btn btn-success rounded-1" onClick={handleCheck}>Проверить</button>
                                    </div>
                                </div>
                            )}
                            {checked && (
                                <>
                                    <div className="row justify-content-center">
                                        <div className={imageClassToggle}>
                                            {selected !== null && question.options[selected].istrue ?
                                                <div className="fs-6 fw-light alert alert-success"
                                                     role="alert">Верно!</div> :
                                                <div className="fs-6 fw-light alert alert-danger"
                                                     role="alert">Неверно!</div>
                                            }
                                        </div>
                                    </div>
                                    {question.explanation && (
                                        <div className="row justify-content-center">
                                            <div className={imageClassToggle}>
                                                <div className="fs-6 fw-light">
                                                    <RenderLatex>{question.explanation}</RenderLatex>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {question.explanation_image && (
                                        <div className="row justify-content-center">
                                            <div className={imageClassToggle}>

                                                <ResponsiveImage src={`data/${groupId}/${question.explanation_image}`} />

                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
        }