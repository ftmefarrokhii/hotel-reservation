import { useEffect } from "react";

export default function useOutsideClick(ref,exception , cb){ // exception id div hast 
    useEffect(()=>{
        function handleOutsideClick(event){
            if(ref.current && !ref.current.contains(event.target) && event.target.id != exception){  //yani outside click kone
                console.log("outside click");
                cb()  // functioni k goftim close kone
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)
        return()=>{
            document.removeEventListener("mousedown", handleOutsideClick)
        }   
    },[ref,cb])
}