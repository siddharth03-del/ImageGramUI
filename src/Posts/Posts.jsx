import { fetchFeed } from "../Services/fetchFeed";
import { useEffect, useRef, useState } from "react";
import { PostFrame } from "./postFrame";
import '../App.css';
import Interact from "../Interact/Interact";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@material-tailwind/react";
import { useInfiniteQuery, useQuery } from "react-query";

export function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const scrollable = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        height = calculateHeight();
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function remToPx(rem) { 
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    function calculateHeight() {
        const viewportHeight = window.innerHeight;
        const headerHeight = remToPx(4); 
        return viewportHeight - headerHeight;
    }
    
    const { data: feed, fetchNextPage, hasNextPage, isFetchingNextPage, status,
     } = useInfiniteQuery( 'feed', ({ pageParam = 1 }) => fetchFeed(pageParam), 
     { getNextPageParam: (lastPage, pages) => { if (lastPage.length > 0) { return pages.length + 1
      } else { return undefined;
       } }, cacheTime: 1000 * 60 * 30, // Cache for 10 minutes 
       staleTime: 1000 * 60 * 30, // Consider data fresh for 5 minutes
     } );
     useEffect(() => {
         if (status === 'success') { const allPosts = feed.pages.flat();
             setPosts(allPosts);
              if (feed.pages[feed.pages.length - 1].length === 0) {
                 setHasMore(false);
                 }
                 }
         }, [feed, status]);
    var height = calculateHeight();

    return (
        <div className="h-[calc(100vh-4rem)] w-full flex-col align-middle" ref={scrollable}>
            <div className="overflow-y-scroll h-[calc(100vh-4rem)] max-w-fit mx-auto scrollable-container">
                <div>
                    {posts && 
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={()=>fetchNextPage()}
                            hasMore={hasMore}
                            loader={
                                <div className="w-[400px] flex justify-center flex-row">
                                    <Spinner className="w-10 h-10"/>
                                </div>
                            }
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            height={height}
                        >
                            {posts.map((element) => (
                                <div key={element._id} className="w-[400px] h-fit">
                                    <PostFrame img={element.image} caption={element.caption} username={element.user.username} profileImage={element.userProfile.image}/>
                                    <Interact post_id={element._id} />
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                </div>
            </div>
        </div>
    );
}
