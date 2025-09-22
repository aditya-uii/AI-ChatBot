import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContextData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  const { userData, url, setUserdata, geminiResponse } = useContext(userContextData)

  const [listening, setIsListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const isRecognizingRef = useRef(false)
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis

  // ---- LOGOUT HANDLER ----
  const handleLogout = async () => {
    try {
      await axios.get(`${url}/api/auth/logout`, { withCredentials: true })
      setUserdata(null)
      navigate('/signup')
    } catch (error) {
      console.error(error)
      setUserdata(null)
    }
  }

  // ---- SPEAK FUNCTION ----
  const speak = (text) => {
    if (!text) return
    const utterance = new SpeechSynthesisUtterance(text)
    isSpeakingRef.current = true

    utterance.onend = () => {
      isSpeakingRef.current = false
    }

    synth.speak(utterance)
  }

  // ---- COMMAND HANDLER ----
  const handleCommand = (data) => {
    const { type, userInput, response } = data
    speak(response)

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=${query}`, '_blank')
    }

    if (type === 'calculator-open') {
      window.open('https://www.google.com/search?q=calculator', '_blank')
    }

    if (type === 'instagram-open') {
      window.open('https://www.instagram.com', '_blank')
    }

    if (type === 'facebook-open') {
      window.open('https://www.facebook.com', '_blank')
    }

    if (type === 'weather-show') {
      const query = encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=weather+${query}`, '_blank')
    }

    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput)
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
    }
  }

  // ---- SPEECH RECOGNITION ----
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'

    recognitionRef.current = recognition

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start()
          console.log('recognition start')
        } catch (error) {
          console.log(error)
        }
      }
    }

    recognition.onstart = () => {
      console.log('recognition started')
      isRecognizingRef.current = true
      setIsListening(true)
    }

    recognition.onend = () => {
      console.log('recognition ended')
      isRecognizingRef.current = false
      setIsListening(false)

      if (!isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000)
      }
    }

    recognition.onerror = (event) => {
      console.log('recognition error:', event.error)
      isRecognizingRef.current = false
      setIsListening(false)

      if (event.error !== 'aborted' && !isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000)
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log('Heard:', transcript)

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        try {
          recognition.stop()
          isRecognizingRef.current = false
          setIsListening(false)

          const data = await geminiResponse(transcript)
          handleCommand(data)
        } catch (err) {
          console.error('Gemini error:', err)
        }
      }
    }

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition()
      }
    }, 5000)

    return () => {
      recognition.stop()
      setIsListening(false)
      isRecognizingRef.current = false
      clearInterval(fallback)
    }
  }, [userData, geminiResponse])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-5'>
      <button
        className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] absolute top-[30px] right-[20px] cursor-pointer'
        onClick={handleLogout}
      >
        LogOut
      </button>

      <button
        className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] absolute top-[100px] right-[20px] p-[10px] cursor-pointer'
        onClick={() => navigate('/customize')}
      >
        Customize assistant
      </button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>

      <h1 className='text-white text-[18px] font-semibold'>
        Hi I'm {userData?.assistantName}
      </h1>
    </div>
  )
}

export default Home
