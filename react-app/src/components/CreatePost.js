/*
import { useState } from "react";

const PostCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームの送信処理
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="タイトル"
          required
        />
      </div>
      <div>
        <label htmlFor="body">本文</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="本文"
          required
        />
      </div>
      <button type="submit">投稿する</button>
    </form>
  );
};

export default PostCreate;*/