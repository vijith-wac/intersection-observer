"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UsingSWR = () => {
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState([]);
  const [isData,setIsData] = useState(true)
  const [message,setMessage] = useState('')
  const observerRef = useRef(null);
  let size = 10;

  const { data, error, isLoading } = useSWR(
    `https://dev.vieroot.webc.in/public/api/blog/list?page=${page}&length=${size}`,
    fetcher,
    { revalidateOnFocus: false }
  );


  useEffect(() => {   
    if (data) {
      let finalData = data.data.original.data
      if(finalData.length>0){
        setInfo((prevInfo) => [...prevInfo, ...finalData]);
      }else{
        setIsData(false)
      }
      
    }
  }, [data]);

  const loadMore = useCallback(() => {
   if(isData){
    setPage((prevPage) => prevPage + 1);
   }else{
    setMessage('Data completed')
   }
    
  }, [isData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

  return (
    <div>
      {info?.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <img src={item.image_url}/>
          </div>
      ))}
      <div ref={observerRef} style={{ height: '20px' }} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
    </div>
  );
};

export default UsingSWR;
