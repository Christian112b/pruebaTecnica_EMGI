import { useState, useEffect } from 'react'

export default function ConnectionStatus() {
  const [status, setStatus] = useState('checking')

  const getBackendUrl = () => {
    if (import.meta.env.DEV) {
      return 'http://localhost:8000'
    }
    return window.location.origin
  }

  const checkConnection = async () => {
    const backendUrl = getBackendUrl()
    try {
      const response = await fetch(`${backendUrl}/health`)
      if (response.ok) {
        setStatus('online')
      } else {
        setStatus('offline')
      }
    } catch {
      setStatus('offline')
    }
  }

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      padding: '6px 10px',
      borderRadius: '8px',
      backgroundColor: status === 'online' ? '#22c55e' : status === 'offline' ? '#ef4444' : '#f59e0b',
      color: 'white',
      fontSize: '12px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      Backend: {status}
    </div>
  )
}
