"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UsingSWR = () => {
  const [page, setPage] = useState(1);
  const [info,setInfo] = useState([])
  let size = 2;
  const fetchInfo = async()=>{
    const { data, error, isLoading } = await useSWR(
        `https://dev.vieroot.webc.in/public/api/blog/list?page=${page}&length=${size}`,
        fetcher
      );
      setInfo([...info,...data])
  }

  useEffect(()=>{
    fetchInfo()
  },[])
  


  console.log(info)

  return (
    <div>
     
     
    </div>
  );
};

export default UsingSWR;
