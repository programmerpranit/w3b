import BlogPostJSON from '../build/contracts/BlogPost.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    const { blogContract, blogs } = await loadContract(addressAccount);

    return { addressAccount, blogContract, blogs };
};

const loadBlogs = async (blogContract, addressAccount) => {
    const blogCount = await blogContract.counter;
    const blogs = [];
    for (var i = 0; i < blogCount; i++) {
        const blog = await blogContract.Blogs(i);
        blogs.push(blog);
    }
    return blogs;
};

const loadContract = async (addressAccount) => {
    const theContract = contract(BlogPostJSON);
    theContract.setProvider(web3.eth.currentProvider);
    const blogContract = await theContract.deployed();
    const blogs = await loadBlogs(blogContract, addressAccount);

    return { blogContract, blogs }
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};