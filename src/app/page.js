import Image from "next/image";
import styles from "./page.module.css";
import Basics from "./components/Basics";
import InfiniteScrolling from "./components/InfiniteScrolling";
import UsingSWR from "./components/usingSWR";

export default function Home() {
  return (
   <div className="container">
    {/* <Basics/> */}
    {/* <InfiniteScrolling/> */}
    <UsingSWR/>
   </div>
  );
}
