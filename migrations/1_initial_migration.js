const Migrations = artifacts.require("Migrations");
const BlogPost = artifacts.require("BlogPost");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(BlogPost);
};
