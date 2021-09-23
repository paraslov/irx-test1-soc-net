export function set_cookie(name: string, value: string) {
    const cookie_string = name + '=' + escape(value)

    document.cookie = cookie_string
}

export function delete_cookie(cookie_name: string) {
    const cookie_date = new Date()
    cookie_date.setTime(cookie_date.getTime() - 1)
    document.cookie = cookie_name += '=; expires=' + cookie_date.toUTCString()
}

export function get_cookie(cookie_name: string) {
    const results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)')

    if (results)
        return (unescape(results[2]))
    else
        return null
}