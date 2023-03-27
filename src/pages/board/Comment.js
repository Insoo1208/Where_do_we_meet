import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addComment, removeComment } from "../../features/post/postSlice";
import { selectUser } from "../../features/user/userSlice";
import { RiCloseFill } from "react-icons/ri";
import { selectColor } from "../../features/color/colorSlice";

// 댓글 CSS
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .comment-title {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.98rem;
      margin: 0 0 8px 0;
    }
    font-size: 15px; 
    margin-bottom: 10px;
    margin-left: 15px;
  }

  .comment-title span {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.98rem;
    }
    color: #1f44a0 ;
    font-weight:bold;
  }
`;

const CommentInput = styled.input`
  @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.98rem;
      margin: 0;
    }

  border: none;
  outline: none;
  font-weight:bold;
`;

const InputWrap = styled.div`
  display: flex;
  border: 1px solid #efefef;
  border-radius: 50px;
  padding: 0 2rem;
  margin-bottom: 10px;
  height: 50px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`;

const CommentButton = styled.button`
  border: none;
  background: none;  
  font-weight: bold;
  letter-spacing: -0.05rem;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  color: ${props => props.myColorHex.mainColor};
`;

const CommentWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: .625rem;

  .comment-item-image {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  .comment-item-name {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.98rem;
    }
    font-size: 14px;
    font-weight: bold;
    margin: 3px 0 5px;
    display:flex;
  }
  .comment-item-name span{
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.92rem;
    }
    color:#adadad;
    font-weight: normal;
    font-size: 12px;
    margin-left: 5px;
}
  .comment-item-text {
    @media ${({ theme }) => theme.device.tablet } {
      font-size: 0.94rem;
    }
    font-size: 13px;
    color:#999;
  }

  svg {
    color: #BB2649;
  }
`;
const CommentListItem = styled.div`
  display: flex;
  margin-right: 20px;

`;
function Comment(props) {
  const [comment, setComment] = useState('');
  const { data, postId, listName } = props;
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  // const [authority, setAuthority] = useState('anonymous');
  const authority = useRef('anonymous');


  const myColor = useSelector(selectColor);
  
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.authority === 'admin') authority.current = 'admin';
      else if (loggedInUser.authority === 'user') authority.current = 'user';
    } else authority.current = 'anonymous';

  }, [loggedInUser]);

  const handleSubmit = () => {
    if(comment) {
      let commentArr;
      if (loggedInUser) {
        commentArr = {
          id: data.length + 1,
          commentUserProfileImg: loggedInUser.userProfileImg,
          commentsUserNickname : loggedInUser.nickname,
          commentsUserId : loggedInUser.id,
          comment
        }
      } else {
        commentArr = {
          id: data.length + 1,
          commentUserProfileImg: "/images/user05.png",
          commentsUserNickname : "익명",
          commentsUserId : null,
          comment
        }
      }
      dispatch(addComment({ id: postId, comment: commentArr, listName}));
      setComment('');
    } 
  };

  return (
    <Wrapper myColorHex={myColor}>
      <p className="comment-title">전체댓글 <span>{data.length}</span></p>  
      <InputWrap>
        <CommentInput
          myColorHex={myColor}
          type="text" 
          placeholder="댓글을 작성하세요."
          value={comment} 
          onChange={e => setComment(e.target.value)}
          onKeyUp={ e => {if (e.key === 'Enter' ) handleSubmit();} }
          spellCheck="false" 
          autoComplete="off"
        />
        <CommentButton myColorHex={myColor} type="button" onClick={handleSubmit}>게시하기</CommentButton>
      </InputWrap>
      <ul>
        {data.map(targetComment => {
          return (
            <CommentWrapper key={targetComment.id}>
              <CommentListItem>
                <img src={targetComment.commentUserProfileImg} className="comment-item-image"/>
                <div>
                  <p className="comment-item-name">{targetComment.commentsUserNickname} <span>{targetComment.commentsUserId && `@ ${targetComment.commentsUserId}`}</span></p>
                  <p className="comment-item-text">{targetComment.comment}</p>
                </div>
              </CommentListItem>
              {
                authority.current === 'admin'
                ? <RiCloseFill className="cursor-pointer" onClick={() => dispatch(removeComment({ postId: postId, commentId: targetComment.id, listName }))}/>
                  : (authority.current === 'user' && targetComment.commentsUserId === loggedInUser.id) && (
                  <RiCloseFill className="cursor-pointer" onClick={() => dispatch(removeComment({ postId: postId, commentId: targetComment.id, listName }))}/>
                )
              }
            </CommentWrapper>                   
          );
        })}        
      </ul>
    </Wrapper>    
  );
}

export default Comment;