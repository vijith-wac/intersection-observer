"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Placeholder from 'react-bootstrap/Placeholder';

const InfiniteScrolling = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const [error,setError] = useState('')
  const loaderRef = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dev.vieroot.webc.in/public/api/blog/list`,
        {
          params: { page: page, length: 10 },
        }
      );
      const newPosts = response.data.data.original.data;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);

      if (newPosts.length < 10) {
        setHasMore(false); 
      }
    } catch (error) {
        setHasMore(false)
        setError(error.message)
        console.log('error found',error.message)
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {     
    if (hasMore) {
      fetchPosts();
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);


  return (
    <div className="row">
      {posts?.map((post, index) => (
        <div className="col-6 d-flex justify-content-center my-4" key={index}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={post.image_url} className="img-fluid" />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div
        ref={loaderRef}
        style={{
          height: "100px",
          backgroundColor: "lightblue",
          textAlign: "center",
          paddingTop: "40px",
        }}
      >
        {error?error:
        loading ? "Loading More Posts..." : hasMore ? "Scroll down to load more" : "No more posts"}
      </div>
    </div>
  );
};

export default InfiniteScrolling;
