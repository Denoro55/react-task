import {useLayoutEffect, useState} from 'react'

export default function useWindowSize () {
    const [size, setSize] = useState(0)
    useLayoutEffect(() => {
        function updateSize(event: any) {
            setSize(event.target.documentElement.scrollTop)
        }
        window.addEventListener('scroll', updateSize)
        return () => window.removeEventListener('scroll', updateSize)
    }, [])
    return size
}
