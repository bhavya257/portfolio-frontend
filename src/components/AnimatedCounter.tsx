'use client';

import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {useRef} from 'react';

gsap.registerPlugin(useGSAP);

interface Props {
    from: number
    to: number
}

export default function AnimatedCounter(props: Props) {
    const countRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const counter = {val: props.from}
        gsap.to(counter, {
            val: props.to,
            duration: 2,
            ease: "easeOut",
            snap: {val: 1},
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.innerText = counter.val.toString()
                }
            }
        });
    }, [props, countRef]);

    return (
        <span ref={countRef}>Loading...</span>
    )
}