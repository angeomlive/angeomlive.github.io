import React, { useEffect, useState } from 'react'
import { Group } from './types'
import GroupPage from './pages/GroupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import HomePage from "./pages/HomePage";

export default function App(){
  const [groups, setGroups] = useState<Group[]>([])

  const path = '/data/scheme-groups.json'
  useEffect(()=>{
    fetch(path).then(r=>r.json()).then((g)=>setGroups(g))
  },[])

  console.log('🔵 path: ', path)
  console.log('🔵 groups: ', groups)

  return (
      <BrowserRouter>
        <div className="site-container px-3 py-4">
          <Routes>
            <Route path='/' element={<HomePage groups={groups} />} />
            <Route path='/:groupId' element={<GroupPage groups={groups} />} />
          </Routes>
          <footer className=" py-3">
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











