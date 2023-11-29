import { useEffect , useState} from "react";
import axios from 'axios'
export default function useFetch(url, query=""){
    const[data,setData] = useState([])
    const[isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        async function fetchData(){
            try {
                setIsLoading(true)
                const {data} = await axios.get(`${url}?${query}`)
                setData(data)
                console.log("hotelsdata" , data);
            } catch (error) {
                setData([])
                console.log(error)
                console.log("hotel fetching error");
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[query,url])
    return {isLoading,data}
}