// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


contract BlogPost {

    uint public counter;
    address public owner;

    constructor() {
        counter = 0;
        owner = msg.sender;
    }

    struct Blog {
        uint id;
        string title;
        string imageUri;
        string content;
        address owner;
        uint categoryId;
    }

    event blogCreated (
        uint id,
        string title,
        string imageUri,
        string content,
        address owner,
        uint categoryId
    );

    event blogUpdated (
        uint id,
        string title,
        string imageUri,
        string content,
        address owner,
        uint categoryId
    );

    mapping (uint => Blog) Blogs;
    // mapping (address => mapping(uint256 => Blog)) UserBlogs;

    function createBlog( string memory title, string memory imageUri, string memory content, uint categoryId) public {

        Blog memory newBlog;
        newBlog.id = counter;
        newBlog.title = title;
        newBlog.imageUri = imageUri;
        newBlog.content = content;
        newBlog.owner = msg.sender;
        newBlog.categoryId = categoryId;

        Blogs[counter] = newBlog;
        counter = counter + 1;
        emit blogCreated(counter, title, imageUri, content, msg.sender, categoryId);
    }

    function getBlog(uint id) public view returns ( 
        uint, //id
        string memory, // title
        string memory, // imageUri
        string memory, // content
        address, // owner
        uint // categoryId
    ) {

        require(id < counter, "No Such Blogpost Exists");
        Blog memory blog = Blogs[id]; //or storage

        return (
            blog.id,
            blog.title,
            blog.imageUri,
            blog.content,
            blog.owner,
            blog.categoryId
        );

    }


    // function getBlog(uint256 id) public view returns (Blog memory) {
        
    //     require(id < counter, "No Such Blogpost Available");
    //     Blog storage blog = Blogs[id];

    //     return blog;
    // }

    function updateBlog(uint id, string memory title, string memory imageUri, string memory content, uint categoryId) public {

        require(id < counter, "No Such Blogpost Exists");
        
        Blog storage blog = Blogs[id];

        require(blog.owner == msg.sender, "You can't update this blog as you are not the owner of this blog");
        
        blog.title = title;
        blog.imageUri = imageUri;
        blog.content = content;
        blog.owner = msg.sender;
        blog.categoryId = categoryId;
        
        emit blogUpdated(counter, title, imageUri, content, msg.sender, categoryId);
    }


}