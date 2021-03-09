import cookie from 'js-cookie'

export const setCookie = (key, value) => {
	if (window !== 'undefined') {
		cookie.set(key, value, {
			expires: 1
		})
	}
}

export const removeCookie = (key) => {
	if (window !== 'undefined') {
		cookie.remove(key, {
			expires: 1
		})
	}
}

export const getCookie = (key) => {
	if (window !== 'undefined') {
		return cookie.get(key)
	}
}

export const setToLocalStorage = (key, value) => {
	if (window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

export const removeFromLocalStorage = (key) => {
	if (window !== 'undefined') {
		localStorage.removeItem(key)
	}
}

export const authenticate = (response, callback) => {
	setCookie('token', response.data.token)
	setToLocalStorage('user', response.data.user)
	callback()
}

export const isAuthenticated = () => {
	if (window !== 'undefined') {
		const confirmedCookie = getCookie('token')
		if (confirmedCookie) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'))
			} else {
				return false
			}
		}
	}
}

export const signOut = (callback) => {
	removeCookie('token')
	removeFromLocalStorage('user')
	callback()
}

export const updateUserInfo = (resp, callback) => {
	if (typeof window !== 'undefined') {
		let authentication = JSON.parse(localStorage.getItem('user'))
		authentication = resp.data
		localStorage.setItem('user', JSON.stringify(authentication))
	}

	callback()
}
