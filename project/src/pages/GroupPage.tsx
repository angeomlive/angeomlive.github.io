import React, { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { Group } from '../types'
import QuestionsBlock from "./QuestionBlock";

export default function GroupPage({ group }:{group:Group}) {


    const renderList = (items: Group[], lvl = 0) => (
        <ul className="group-list-plain">
            {items.map(it => (
                <li
                    key={it.id}
                    className={
                        lvl === 1
                            ? 'nested-level-1'
                            : lvl === 2
                                ? 'nested-level-2'
                                : lvl >= 3
                                    ? 'nested-level-3'
                                    : ''
                    }
                >
                    <Link to={`/?${it.id}`} className="h3 text-decoration-none hover-underline">
                        {it.name}
                    </Link>
                    {it.children && it.children.length > 0 && renderList(it.children, lvl + 1)}
                </li>
            ))}
        </ul>
    );

    console.log('Page, group: ', group)

    let content;
    if (!group || (Array.isArray(group) && group.length === 0) || (typeof group === 'object' && Object.keys(group).length === 0)) {
        content = <div className="col">Группа не найдена</div>
    }
    else if (group.children) {
        content = renderList(group.children)
    } else if (group.name) {
        // @ts-ignore
        content =  <QuestionsBlock groupId={group.id} />
    } else {
        content = <div className="row justify-content-center">
            <div className="col-auto p-5">
                Загрузка вопросов...
            </div>
        </div>
    }

    return (
        <>
            <header className="py-2 mb-4">
                <div className="container text-center">
                    <div className="col-lg-10 mx-auto">
                        <h1 className="h2  fw-bold mb-3">
                            <a href="/" className="text-dark hover-underline">Аналитическая геометрия</a>
                        </h1>
                        <p className="mb-0 text-dark fw-light fs-5 lh-base mb-3">
                            {group && group.name}
                        </p>

                        <div className="col" style={{maxWidth: '960px'}}>
                            <div className="" style={{opacity: '0.2',}}>
                                <div className="white-line-opacity"
                                     style={{backgroundImage: 'linear-gradient(to left, #000000, rgba(0,0,0,0))'}}></div>
                                <div className="white-line"
                                     style={{background: '#000000'}}></div>
                                <div className="white-line-opacity"
                                     style={{backgroundImage: 'linear-gradient(to right, #000000, rgba(0,0,0,0))'}}></div>
                            </div>
                        </div>


                    </div>
                </div>
            </header>
            <div className="container mb-5">
                {content}
            </div>
        </>
    )
}