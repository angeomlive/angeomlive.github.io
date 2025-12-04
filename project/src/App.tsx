import React, { useEffect, useState } from 'react'
import { Group } from './types'
import GroupPage from './pages/GroupPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import 'katex/dist/katex.min.css'

function useQueryKeys(): string[] {
  const location = useLocation()
  return Array.from(new URLSearchParams(location.search).keys())
}

// Функция для поиска группы или дочерней группы по id
function findGroupById(groups: Group[], id: string): Group | undefined {
  console.log('🔵 for id: ', id, 'groups:', groups)
  for (const group of groups) {
    console.log('group:', group)
    if (group.id === id) return group

    if (group.children) {
      // рекурсивно ищем в потомках
      const child = findGroupById(group.children, id)
      if (child) return child
    }
  }

  return undefined
}

function MainPage({ groups }: { groups: Group[] }) {
  const keys = useQueryKeys()
  const key = keys[0] // берём первый ключ, если есть

  if (key) {
    const group = findGroupById(groups, key)
    console.log('🍎 group:', group)
    if (group) {
      console.log('🍎 <GroupPage:')
      return <GroupPage group={group}/>
    }
  }

  return <HomePage groups={groups} />
}

export default function App() {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    fetch('/data/scheme-groups.json')
        .then(r => r.json())
        .then(g => setGroups(g))
  }, [])

  return (
      <BrowserRouter>
        <div className="site-container px-3 py-4">
          <Routes>
            <Route path="/" element={<MainPage groups={groups} />} />
          </Routes>

          <footer className="py-3">
            <div className="container text-center">
              <div className="col-lg-10 mx-auto">
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
      </BrowserRouter>
  )
}