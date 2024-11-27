import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL + "/test";
  const appTitle = import.meta.env.VITE_APP_TITLE;
  const test = axios.get(apiUrl)
  console.log(test)

  return (
    <div>
      <h1>{appTitle}</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );
}

export default App
