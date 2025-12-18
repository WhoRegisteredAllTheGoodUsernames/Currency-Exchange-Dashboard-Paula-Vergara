"use client"

import { useState, useEffect } from 'react'

// Detects whether client is online or offline.
export default function useOnlineStatus() {
	const [status, setStatus] = useState<boolean>(true);

	useEffect(() => {
		// Nextjs doesn't like using the setStatus here...
		setStatus(navigator.onLine)
		window.addEventListener("online", () => setStatus(true))
		window.addEventListener("offline", () => setStatus(false))

		return () => {
			window.removeEventListener("online", () => setStatus(true))
			window.removeEventListener("offline", () => setStatus(false))
		}
	}, [])

	return status
}
