import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  free: [{
    id: "0x01",
    userProfileImg: "src",
    userNickname: "규니규니",
    userId: "ygh424",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    comments: [{
      commentUserProfileImg: "src",
      commentsUserNickname : "모니모니",
      commentsUserId : "ttsss556",
      commnet: "라떼가 맛있습니다."
    }],
    like: 100
  }],
  notice: [{
    id: "0x01",
    userProfileImg: "src",
    userNickname: "규니규니",
    userId: "ygh424",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    comments: [{
      commentUserProfileImg: "src",
      commentsUserNickname : "모니모니",
      commentsUserId : "ttsss556",
      commnet: "라떼가 맛있습니다."
    }],
    like: 100
  }],
  review: [{
    id: "0x01",
    userProfileImg: "src",
    userNickname: "규니규니",
    userId: "ygh424",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    comments: [{
      commentUserProfileImg: "src",
      commentsUserNickname : "모니모니",
      commentsUserId : "ttsss556",
      commnet: "라떼가 맛있습니다."
    }],
    like: 100
  }]
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addComment: (state, { payload : { listname, id, comment }}) => {
      let targetPost;
      switch (listname) {
        case "review":
          targetPost = state.review.find(post => post.id === id);
          break;
        case "free":
          targetPost = state.free.find(post => post.id === id);
          break;
        case "notice":
          targetPost = state.notice.find(post => post.id === id);
        default:
          console.error("에러입니다.");
          break;
      }

      targetPost.comments.push(comment);
    }
  }
});

export default postSlice.reducer;