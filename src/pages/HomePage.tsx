import { Link } from "react-router-dom";
import { Group } from "../types";

interface Props {
    groups: Group[];
}

export default function HomePage({ groups }: Props) {
    const topGroups = groups;

    return (
        <>
            <header className="py-2 mb-4">
                <div className="container text-center">
                    <div className="col-lg-10 mx-auto">
                        <h1 className="h2 fw-bold mb-3">
                            <a href="/" className="text-dark hover-underline">Аналитическая геометрия</a>
                        </h1>
                        <p className="mb-0 text-dark fw-light fs-5 lh-base mb-3">
                            Проверь свои знания по курсу аналитической геометрии
                        </p>
                    </div>
                </div>
            </header>
            <div className="container mb-5">
                <div className="row row-cols-2 px-4">
                    {topGroups.map(group => (
                        <div className="col px-4 py-2" key={group.id}>
                            <div className="card border-0 rounded-0 h-100 ">
                                {group.image && (
                                    <Link to={`/${group.id}`} className="text-decoration-none">
                                        <div
                                            className="bg-dark rounded mb-2"
                                            style={{
                                                backgroundImage: `url(/data/${group.image})`,
                                                backgroundSize: 'cover',       // cover entire div
                                                backgroundPosition: 'center',  // center the image
                                                height: '370px',               // set height of the div
                                                width: '100%',                 // full width
                                            }}
                                        ></div>
                                    </Link>
                                )}
                                <h3 className="text-center p-3">
                                    <Link to={`/${group.id}`} className="text-dark hover-underline">
                                        {group.name}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}