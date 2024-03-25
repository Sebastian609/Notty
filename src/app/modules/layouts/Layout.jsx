import React from 'react'
import Header from '../Header/Header'
import TaskCreator from '../TaskComponents/TaskCreator'

export default function Layout() {
  return (
    <div>
      <div className="flex flex-col h-screen">
      <Header/>
        <div className="m-5 flex flex-row justify-center">
          <TaskCreator/>
        </div>
     
    </div>
    </div>
  )
}
