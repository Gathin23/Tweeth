const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Twitter Contract", function() {
  let Tweeth;
  let tweeth;
  let owner; 

  const NUM_TOTAL_NOT_MY_TWEETS = 5;
  const NUM_TOTAL_MY_TWEETS = 3;

  let totalTweets;
  let totalMyTweets;

  beforeEach(async function() {
    Tweeth = await ethers.getContractFactory("TweethContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    tweeth = await Tweeth.deploy();

    totalTweets = [];
    totalMyTweets = [];

    for(let i=0; i<NUM_TOTAL_NOT_MY_TWEETS; i++) {
      let tweet = {
        'tweetText': 'Ramdon text with id:- ' + i,
        'username': addr1,
        'isDeleted': false
      };

      await tweeth.connect(addr1).addTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
    }

    for(let i=0; i<NUM_TOTAL_MY_TWEETS; i++) {
      let tweet = {
        'username': owner,
        'tweetText': 'Ramdon text with id:- ' + (NUM_TOTAL_NOT_MY_TWEETS+i),
        'isDeleted': false
      };

      await tweeth.addTweet(tweet.tweetText, tweet.isDeleted);
      totalTweets.push(tweet);
      totalMyTweets.push(tweet);
    }
  });

  describe("Add Tweet", function() {
    it("should emit AddTweet event", async function() {
      let tweet = {
        'tweetText': 'New Tweet',
        'isDeleted': false
      };
      //we are expecting it to emit some evnet with the following arguments
      await expect(await tweeth.addTweet(tweet.tweetText, tweet.isDeleted)
    ).to.emit(tweeth, 'AddTweet').withArgs(owner.address, NUM_TOTAL_NOT_MY_TWEETS + NUM_TOTAL_MY_TWEETS);
    })
  });

  describe("Get All Tweets", function() {
    it("should return the correct number of total tweets", async function() {
      const tweetsFromChain = await tweeth.getAllTweets();
      expect(tweetsFromChain.length).to.equal(NUM_TOTAL_NOT_MY_TWEETS+NUM_TOTAL_MY_TWEETS);
    })

    it("should return the correct number of all my tweets", async function() {
      const myTweetsFromChain = await tweeth.getMyTweets();
      expect(myTweetsFromChain.length).to.equal(NUM_TOTAL_MY_TWEETS);
    })
  })

  describe("Delete Tweet", function() {
    it("should emit delete tweet event", async function() {
      const TWEET_ID = 0;
      const TWEET_DELETED = true;

      await expect(
        tweeth.connect(addr1).deleteTweet(TWEET_ID, TWEET_DELETED)
      ).to.emit(
        tweeth, 'DeleteTweet'
      ).withArgs(
        TWEET_ID, TWEET_DELETED
      );
    })
  })
});