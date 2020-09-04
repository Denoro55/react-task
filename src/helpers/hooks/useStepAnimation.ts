import {useEffect} from "react";

export default function useStepAnimation(list: any[], getItems: any) {
    let animationInterval: any = null;

    useEffect(() => {
        // @ts-ignore
        const items = getItems();
        let i = 0;
        items.forEach((t: any) => {
            t.classList.remove('fade-animation-end');
            t.style.transition = 'none';
            setTimeout(() => {
                t.style.transition = '';
            })
        });

        animationInterval = setInterval(() => {
            if (i < items.length) {
                items[i].classList.add('fade-animation-end');
                i++;
            } else {
                clearInterval(animationInterval);
            }
        }, 100);

        return () => {
            clearInterval(animationInterval);
        }
    }, [list]);
}
