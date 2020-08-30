import axios from 'axios'

export function sendGet(url: string, query?: string) {
    return axios.get(url)
}
