import React from 'react'
import { useEffect, useState } from 'react'
import { load } from "../src/func";

export default function AddBlog() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(0);
    
  const [refresh, setRefresh] = useState(true);

    // const [blogList, setBlogList] = useState([]);
    const [addressAccount, setAddressAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const handleTitleChange = (e) => setTitle(e.currentTarget.value);
    const handleContentChange = (e) => setContent(e.currentTarget.value);

    const handleSaveBlog = async () => {
        contract.createBlog(title, content, "image", category, {from: addressAccount})
    }

    useEffect(() => {

      if (!refresh) return;

      setRefresh(false);

      load().then((e) => {
        setAddressAccount(e.addressAccount);
        setContract(e.blogContract);
      });
    });


  return (
    <>
    
    <h1>Add Blog</h1>
    <br />
    <input type="text" placeholder='title' value={title} onChange={handleTitleChange}/>
    <br />
    <textarea name="content" id="blogtext" cols="30" rows="10" value={content} onChange={handleContentChange}>

    </textarea>
<br />
    <input type="number" placeholder='category id' />
    <br />
    <button onClick={handleSaveBlog}>Save</button>

    </>
  )
}
