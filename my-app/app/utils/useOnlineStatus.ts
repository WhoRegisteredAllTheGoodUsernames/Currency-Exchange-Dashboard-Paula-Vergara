"use client"

import { useState, useEffect } from 'react'

export default function useOnlineStatus() {
	const [status, setStatus] = useState<boolean>(true);

	useEffect(() => {
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
