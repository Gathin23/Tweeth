const main = async () => {
  const contractFactory = await ethers.contractFactory("TweethContract");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    processs.exit(1);
  }
};

runMain();
