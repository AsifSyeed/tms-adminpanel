import { isAuthenticatedState } from "~/composables/state"

export default defineNuxtRouteMiddleware((to, from) => {
        if (to.path === '/logout') {
            console.log("inside path if")
            const token = useCookie('token')
            token.value = null
            console.log(token)
            const isAuthenticated = isAuthenticatedState()
            isAuthenticated.value = false
            return navigateTo('/signin')
        }
        if (to.path === '/') {
            const token = useCookie('token').value
            // console.log(token)
            if (token === null) {
                return navigateTo('/signin')
            } 
        }
        if (to.path === '/events') {
            const token = useCookie('token').value
            // console.log(token)
            if (token === null) {
                return navigateTo('/signin')
            } 
        }
        if (to.path === '/events/create') {
            const token = useCookie('token').value
            // console.log(token)
            if (token === null) {
                return navigateTo('/signin')
            } 
        }
})