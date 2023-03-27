import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import PostListItem from "./PostListItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectAll } from '../../features/post/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { selectColor } from '../../features/color/colorSlice';

const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet } {
    padding: 2rem;    
  }
  padding: 3.125rem;
  flex: 1;

  h3 {
    @media ${({ theme }) => theme.device.tablet } {
      margin-bottom: 1.5rem;
    }
    font-size: 1.625rem;
    padding-bottom: .9375rem;
    margin-bottom: 3.125rem;
    font-weight: 600;
    letter-spacing: -0.0625rem;
    color: #333;
    letter-spacing: -0.125rem;
  }
`;

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .writeIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    min-width: 64px;
    min-height: 64px;
    margin-right: 15px;
    color: ${props => props.myColorHex.mainColor};
  }
`;
const Search = styled.div`
  display: flex;
  border-radius: 50px;
  background:#fff;
  padding: 20px 30px;
  flex:1;
  height: 60px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebebeb;
  
  .search-icon {
    font-size: 1.5rem;
    margin-right: 5px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border:none;
  flex:1;
  font-size: 17px;

  &::placeholder {
    color: #d9d9d9;
    letter-spacing: -1px;
  }
`;

const PostList = styled.div`
  background-color: #fff;
  border:1px solid #efefef;
`;

function BoardPage() {
  const [searchValue, setSearchValue] = useState('');
  const [postData, setPostData] = useState([]);
  
  const data = useSelector(selectAll);
  const myColor = useSelector(selectColor);
  const navigate = useNavigate();
  const titleParams = useParams();

  const titleData = useRef('카페 리뷰');
  let currentPostList;

  useEffect(() => {
    const setTitle = () => {
      switch (titleParams.listName) {
        case 'review':
          titleData.current = '카페 리뷰';
          currentPostList = data.review;
          break;
      
        case 'notice':
          titleData.current = '공지사항';
          currentPostList = data.notice;
          break;
      
        case 'free':
          titleData.current = '자유 게시판';
          currentPostList = data.free;
          break;
      
        default:
          console.error('페이지 에러');
          break;
      }
    };
    setTitle();
    setPostData(currentPostList);
  }, [data, titleParams]);

  const handleSearch = () => {
    if (searchValue === '') return setPostData([...data[titleParams.listName]]);
    const searchData = data[titleParams.listName].filter(post => post.content.toLowerCase().includes(searchValue.toLowerCase()));
    if (searchData.length < 1) {
      return alert('검색 결과가 없습니다.');
    } else {
      setPostData(searchData);
    }
  }

  return (
    <Wrapper>
      <h3>{titleData.current}</h3>
      <StyleDiv myColorHex={myColor}>
        <AiFillPlusSquare className="writeIcon cursor-pointer" onClick={() => {navigate("/board/post-write"); }}/>
        <Search>
          <AiOutlineSearch className="search-icon cursor-pointer" onClick={handleSearch}/>
          <SearchInput type="text" placeholder="게시물 검색" value={searchValue} onChange={e => setSearchValue(e.target.value)}
            onKeyUp={ e => {if (e.key === "Enter") handleSearch();}}
            autoComplete="off"
            spellCheck="false"
          />
        </Search>
      </StyleDiv>

      <PostList>
        {postData.map((post) => {
          return <PostListItem post={post} key={post.id} listName={titleParams.listName}/> ;
        })}
      </PostList>
    </Wrapper>
  );
}

export default BoardPage;