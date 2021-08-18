const BLOCK = 1085963;
const CONTRACT_ADDRESS = "0xd7e3e9bA710b7356DD04b7bCA4B021e59fAeAD36";
const CONTRACT_ABI = require("../subgraph/abis/PersonRegistry.json");
const JANUS = "http://qtum:testpasswd@localhost:23889";
const JANUS_WS = "ws://qtum:testpasswd@localhost:23889/ws";

module.exports = {BLOCK, CONTRACT_ABI, CONTRACT_ADDRESS, JANUS, JANUS_WS};