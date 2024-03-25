"use client"

import { useEffect, useState } from 'react';
import style from "./admin.module.css"
import { getMembers,deleteMember } from '../_lib/MemberApi';
import {getPosts,deletePost} from '@/app/(afterLogin)/_lib/PostApi';
import { Member } from '@/app/_component/MemberRecoilState';
import BackButton from '../_component/BackButton';
import PostAbstract from '../_component/PostAbstract';
import {useRouter} from 'next/navigation';

interface Member {

    id:bigint,
    nickname:string,
    statusImg:string,
    email:string,
    intimacy:number,
    roles:[]
}
interface Post{
    id:bigint,
    title:string,
    writer:string,
    nickname:string,
    statusImg:string,
    createdAt:string,
    content_1:string,
    myAmad:string,
    likes:number,
    commentsNum: number,
    whoLikesMyPost:BigInt[]
}

export default function Admin() {

    const storedAccessToken = localStorage.getItem("Authorization") || '';
    const storedRefreshToken = localStorage.getItem("Refresh") || '';
    const [members, setMembers] = useState<Member[] >([]);
    const [posts, setPosts] = useState<Post[] >([]);
    const [page, setPage] = useState(1);
    const [postPage, setPostPage] = useState(1);
    const [postTotalPage, setPostTotalPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isFetched, setIsFetched] = useState(false);
    const router = useRouter();

    const onClickDelete = (id:bigint)=>{
        if(confirm('삭제하시면 복구할수 없습니다.\n정말로 삭제하시겠습니까??')){
            fetchDeleteMember(id);
        }
        
    }
    const onClickDeletePost = (id:bigint)=>{
        if(confirm('삭제하시면 복구할수 없습니다.\n정말로 삭제하시겠습니까??')){
            fetchDeletePost(id);
        }
        
    }
    const fetchDeletePost = async(id:bigint) => {
        const postId = id;
        const accessToken = storedAccessToken;
        const refreshToken = storedRefreshToken;
        const {success, error} = await deletePost({accessToken,refreshToken, postId});
        if(success) {
            setIsFetched(true);
          }
          if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
    }
    const fetchDeleteMember = async(id:bigint) => {
        const memberId = id;
        const {success, error} = await deleteMember({storedAccessToken,storedRefreshToken, memberId});
        if(success) {
            setIsFetched(true);
          }
          if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
    }
    const onClickButtonNext = () => {
        setPage((prevPage)=> prevPage+1);
    }
    const onClickButtonPrev = () => {
        if(page != 1){
        setPage((prevPage)=> prevPage-1);
        }
    }

    const onClickButtonNextForPosts = () => {
        setPostPage((prevPage)=> prevPage+1);
    }
    const onClickButtonPrevForPost = () => {
        if(postPage != 1){
        setPostPage((prevPage)=> prevPage-1);
        }
    }
    useEffect(() => {
        const fetchUserData = async () => {
        
            
                const { success, data, error } = await getMembers({
                    accessToken: storedAccessToken,
                    refreshToken: storedRefreshToken,page
                });
                if(success){
                    setMembers(data.members);
                    setTotalPage(data.totalPage);
                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
                }
            
        };

            fetchUserData();
            setIsFetched(false);

    }, [isFetched,page,storedAccessToken,storedRefreshToken]);

    useEffect(() => {
        const fetchPosts = async () => {
            const accessToken = storedAccessToken;
            const refreshToken = storedRefreshToken;
            const page = postPage;
            
            const { success, data, error } =  await getPosts({ accessToken, refreshToken, page });

            if (success) {
                setPosts(data.posts);
                setPostTotalPage(data.totalPage);
            }
            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }
        };

        fetchPosts();
        setIsFetched(false);
    }, [storedAccessToken, storedRefreshToken, isFetched, postPage]);


    return(
        
    <main className={style.main}>
        <div className={style.headContainer}>
            <BackButton/> <h3>관리자 페이지</h3>
        </div>
        <div className={style.userListSection}>
            

            {members !== null && members.length > 0 && (
                <div className={style.myLastPostsContainer}>
                    <div className={style.postAbstract}>
                    <div className={style.recommendPostBox}>
                    <h3>유저</h3>
                    &emsp;
                        {members.map((member, index) => (
                            <div className={style.itemSection} key={index}>
                                <div className={style.userLogoSection}>
                                    <div className={style.userLogo}>
                                        <img src={member.statusImg} alt={member.email} />
                                    </div>
                                </div>
                                <div className={style.userInfo}>
                                    <div className={style.title}>{member.nickname}</div>
                                    <div className={style.count}>@{member.email.replace('@gmail.com', '')}</div>
                                </div>
                                <div className={style.deleteButtonSection}>
                                    <button onClick={() => onClickDelete(member.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" id="Layer_1" width="20px" height="20px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                                            <g>
                                                <path d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54   c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z" />
                                                <path d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z" />
                                                <path d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z" />
                                                <path d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z" />
                                                <path d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3   V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51   c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                         {members.length > 0 && (
                            <div className={style.seeMoreButtonSection}>
                            <button disabled={page === 1} className={style.seeMoreButton} onClick={onClickButtonPrev}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                                    <polyline fill="none" stroke={page !== 1 ? "#000000" : "#e3e3e3"} strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
                                </svg>
                            </button>
                            <button disabled={page===totalPage} className={style.seeMoreButton} onClick={onClickButtonNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={page !== totalPage ? "#000000" : "#e3e3e3"} height="20px" width="20px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
                                <g id="next"><g>
                                <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "/></g></g>
                                </svg>
                            </button>
                            </div>
                            )}
                        </div>
        </div>
    </div>
)}
                       
        
        <div>
            <div className={style.videoBox}>
                <h3>포스트</h3>
                &emsp;
 
                {posts !== null && posts.length > 0 && (
                    <>
                    <div className={style.myLastPostsContainer}>
                    <div className={style.postAbstract}>
                        {posts.map((post, index) => (
                        <div key={post.id} className={style.lastPostBox}>
                            <div className={style.contentBox}>
                            <PostAbstract key={index} post={post}/>
                            </div>
                            <div className={style.deleteButtonSection}>
                            <button onClick={() => onClickDelete(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" id="Layer_1" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" >
                                <g>
                                    <path d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54   c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z"/>
                                    <path d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z"/>
                                    <path d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z"/>
                                    <path d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z"/>
                                    <path d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3   V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51   c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z"/>
                                </g>
                                </svg>
                                </button>
                            </div>
                            
                    </div>
                        ))}
                        {posts.length > 0 && (
                            <div className={style.seeMoreButtonSection}>
                            <button disabled={postPage === 1} className={style.seeMoreButton} onClick={onClickButtonPrevForPost}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                                    <polyline fill="none" stroke={postPage !== 1 ? "#000000" : "#e3e3e3"} strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
                                </svg>
                            </button>
                            <button disabled={postPage===postTotalPage} className={style.seeMoreButton} onClick={onClickButtonNextForPosts}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={postPage !== postTotalPage ? "#000000" : "#e3e3e3"} height="20px" width="20px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
                                <g id="next"><g>
                                <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "/></g></g>
                                </svg>
                            </button>
                            </div>
                            )}
                    </div>
                
                    </div>
                    </>
                )}
            </div>
            <div>
            <h3></h3>

            </div>
        
        </div>
        </div>
     
    </main>
    
)
}