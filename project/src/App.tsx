import React, { useEffect, useState } from 'react'
import { Group } from './types'
import QuestionsBlock from "./QuestionRandom";

// Функция для поиска группы или дочерней группы по id
function findGroupById(groups: Group[], id: string): Group | undefined {
  for (const group of groups) {
    if (group.id === id) return group

    if (group.children) {
      const child = findGroupById(group.children, id)
      if (child) return child
    }
  }
  return undefined
}

const getNestedClass = (level: number) => {
  switch (level) {
    case 1:
      return 'nested-level-1';
    case 2:
      return 'nested-level-2';
    default:
      return level >= 3 ? 'nested-level-3' : '';
  }
};


export default function App() {
  const [groups, setGroups] = useState<Group[]>([])
  const [key, setKey] = React.useState<string | null>(null);

  useEffect(() => {
    fetch('/data/scheme-groups.json')
        .then(r => r.json())
        .then(g => setGroups(g))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // @ts-ignore
    setKey(Array.from(params.keys())[0]);
  }, []);

  const group = groups.length > 0 && key
      ? findGroupById(groups, key)
      : null;

  return (
      <div className="container p-3" style={{maxWidth: '1200px'}}>
        <header>
          <div className="row text-center py-2 mb-1">
            <div className="col-lg-10 mx-auto">
              <h1 className="h2 fw-bold mb-3">
                <a href="/" className="text-dark hover-underline">Аналитическая геометрия</a>
              </h1>
              <p className="mb-0 text-dark fw-light fs-5 lh-base mb-3">
                {group ? group.name : 'Проверь свои знания по курсу аналитической геометрии' }
              </p>
            </div>
          </div>
          {group && (
              <div className="row justify-content-center mb-4">
                <div className="hline col-lg-10 mx-auto  text-center" style={{maxWidth: '960px', opacity: '0.2',}}>
                  <div className="hline-opacity hline-left"></div>
                  <div className="hline-center"></div>
                  <div className="hline-opacity hline-right"></div>
                </div>
              </div>
          )}
        </header>

        <main>
        {group ?
            // CASE - SHOW Questions GROUPS or Single Question
            <>
              {group.children && group.children.length > 0 ?
                  // CASE - SHOW GROUPS PAGE
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <ul className="group-list-plain">
                        {group.children.map((it, idx) => (
                            <li key={it.id} className={getNestedClass(idx + 1)}>
                              <a href={`/?${it.id}`} className="h3 text-decoration-none hover-underline">
                                {it.name}</a>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  :
                  // CASE - SHOW Single Question
                  <QuestionsBlock groupId={group.id} />
              }
            </> :
            // CASE -  SHOW HOME PAGE
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 pt-4 px-4 mb-5">
              {groups.map(group => (
                  <div className="col p-4 mb-5" key={group.id}>
                    <div className="card border-0 rounded-0 h-100 ">
                      {group.image && (
                          <a href={`/?${group.id}`} className="text-decoration-none">
                            <div className="home-card-image-box bg-dark rounded mb-2"
                                 style={{backgroundImage: `url(/data/${group.image})`}}
                            ></div>
                          </a>
                      )}
                      <h3 className="text-center p-3">
                        <a href={`/?${group.id}`} className="text-dark hover-underline">
                          {group.name}</a>
                      </h3>
                    </div>
                  </div>
              ))}
            </div>
        }
        </main>
        <footer>
          <div className="row pt-5 py-3">
            <div className="col-lg-10 mx-auto text-center">
              <p className="text-muted mb-1">
                © Механико-математический факультет, Кафедра высшей геометрии и топологии
              </p>
              <p className="text-muted mb-0">
                e-mail: ssmirnov at higeom.math.msu.su
              </p>
            </div>
          </div>
        </footer>
      </div>
  )
}