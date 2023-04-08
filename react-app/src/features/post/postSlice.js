import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// APIへリクエストし、指定したIDの投稿を1件取得する
export const fetchAsyncGetPost = createAsyncThunk(
  'post/get',
  async (id) => {
    const response = await axios.get(`${apiBaseUrl}/posts/${id}`);
    return response.data;
  }
);

// APIへリクエストし、投稿の一覧を取得する
export const fetchAsyncGetPosts = createAsyncThunk(
  'post/list',
  async () => {
    const response = await axios.get(`${apiBaseUrl}/posts`)
    return response.data;
  }
);

// APIへリクエストして新規に投稿を作成する
export const fetchAsyncNewPost = createAsyncThunk(
  'post/post',
  async (inputPost) => {
    const response = await axios.post(`${apiBaseUrl}/posts/`, inputPost, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

// APIへリクエストし、指定したIDの投稿を更新する
export const fetchAsyncUpdatePost = createAsyncThunk(
  'post/put',
  async (inputPost) => {
    const response = await axios.put(`${apiBaseUrl}/posts/${inputPost.id}`, inputPost, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

// APIへリクエストし、指定したIDの投稿を削除する
export const fetchAsyncDeletePost = createAsyncThunk(
  'post/delete',
  async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/posts/${id}`);
    return response.data
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPost: {
      id: null,
      title: '',
      body: '',
      author: ''
    },
    posts: []
  },
  reducers: {}, // stateを更新するための同期的な処理を定義するが、今回は空のオブジェクト。
  // 非同期のアクションを定義する場所
  extraReducers: (builder) => {
    // fetchAsyncGetPostが成功した場合にstateのcurrentPostにAPIからのレスポンスをセットする
    builder.addCase(fetchAsyncGetPost.fulfilled, (state, action) => {
      return {
        ...state,
        currentPost: action.payload
      };
    });
    // fetchAsyncGetPostsが成功した場合にstateのpostsにAPIからのレスポンスをセットする
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload === null ? [] : action.payload // fetchAsyncGetPostsのreturnをpostsにセットする。
      }
    });
    // fetchAsyncNewPostが成功した場合にstateのpostsにAPIからのレスポンスを追加する
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    });
    // fetchAsyncNewPostが成功した場合にstateのpostsにAPIからのレスポンスを追加する
    builder.addCase(fetchAsyncUpdatePost.fulfilled, (state, action) => {
      console.log(action.payload)
      let posts = state.posts.filter((item) => item.id !== action.payload.id)
      posts = [...posts, action.payload]
      posts.sort((a, b) => a.id - b.id)
      return {
        ...state,
        posts: posts
      }
    });
    // fetchAsyncDeletePostが成功した場合にstateのpostsから削除したIDの投稿を削除します
    builder.addCase(fetchAsyncDeletePost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.payload.id)
      }
    })
  }
});

// stateからcurrentPostを取得する
export const selectPost = (state) => state.post.currentPost;
// stateからpostsを取得する
export const selectPosts = (state) => state.post.posts;

export default postSlice.reducer;

/* コード解説
createSliceの引数にオブジェクト形式でオプションを渡してReduxのSliceを作成します。

name: Sliceの名称

initialState: stateの初期値

reducers: stateを変更する処理を記述します。今回は利用しないので空としています。

extraReducers: APIへのアクセス後にstateを変更する処理を記述します。

次に/src/app/store.jsを変更して、postSliceのreducerを登録しておきます。
 */