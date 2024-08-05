'use client'
import { useEffect, useRef } from "react"

const Basics = ()=>{
   const elementRef = useRef(null)

useEffect(()=>{
    const observer =  new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                console.log('Target is intersecting')
            }else{
                console.log('Target is not intersecting')
            }
        })
    })

    if(elementRef.current){
        observer.observe(elementRef.current)
    }

    return()=>{
        if(elementRef.current){
            observer.unobserve(elementRef.current)
        }
    }
    
},[])
   
    return(
        <div>
            <div style={{height:'100vh', backgroundColor:' #cdcdd7'}}>Content before the target element</div>
            <div ref={elementRef} style={{ height: '100px', backgroundColor: 'lightblue' }}>
            observe me
            </div>
            
            <div style={{height:'100vh', backgroundColor:'#c7d7d9'}}>Content after the target element</div>
            
        </div>  
    )
}

export default Basics