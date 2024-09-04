import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import MessageInboxCard from '../MessageBox/MessageInboxCard';
import { useSelector } from 'react-redux';

function ListingPageScroller({page}) {
    const listInnerRef = useRef();
    const { chatRoomMessageList } = useSelector((state) => state.developerData)
    const [currPage, setCurrPage] = useState(page);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async (page) => {
        console.log(page,"page")
        setLoading(true);
        try {
            const response = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`);
            const data = response.data.data;
            if (data.length === 0) {
                setLastList(true);
            } else {
                setUserList(prevList => [...prevList, ...data]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!lastList) {
            console.log("lastList")
            fetchData(currPage);
        }
    }, [currPage, lastList]);

    const onScroll = () => {
        console.log("onscrolllerrr")
        if (listInnerRef.current && !loading) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) { // Trigger before reaching bottom
                if (!lastList) {
                    setCurrPage(prevPage => prevPage + 1);
                }
            }
        }
    };

    return (
        <div
         ref={listInnerRef} 
         onScroll={onScroll} style={{ height: '100vh', overflowY: 'auto' }}>
            <MessageInboxCard userList={userList} />
            {loading && <div>Loading...</div>}
            {lastList && <div>No more items to load</div>}
        </div>
    );
}

export default ListingPageScroller;
