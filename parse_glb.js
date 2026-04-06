const fs = require('fs');
const buffer = fs.readFileSync('./public/robot.glb');
const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546C67) throw new Error('Not a GLB');
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonBuffer = buffer.slice(20, 20 + jsonChunkLength);
const json = JSON.parse(jsonBuffer.toString('utf8'));
console.log("Nodes available:");
console.log(json.nodes ? json.nodes.map((n, i) => `${i}: ${n.name}`).join('\n') : "No nodes");
