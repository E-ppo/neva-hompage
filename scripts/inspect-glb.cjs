const fs = require('fs');

const file = process.argv[2] || 'public/models/tiny_isometric_room.glb';
const buf = fs.readFileSync(file);
const jsonLength = buf.readUInt32LE(12);
const jsonData = buf.slice(20, 20 + jsonLength).toString('utf8');
const gltf = JSON.parse(jsonData);

console.log('File:', file);
console.log('File size:', (buf.length / 1024 / 1024).toFixed(2), 'MB');

console.log('\n=== Nodes (' + gltf.nodes.length + ') ===');
gltf.nodes.forEach((n, i) => {
  const info = [n.name || 'unnamed'];
  if (n.mesh != null) info.push('mesh:' + n.mesh);
  if (n.translation) info.push('pos:[' + n.translation.map(v => v.toFixed(2)).join(', ') + ']');
  if (n.rotation) info.push('rot:[' + n.rotation.map(v => v.toFixed(2)).join(', ') + ']');
  if (n.scale) info.push('scale:[' + n.scale.map(v => v.toFixed(2)).join(', ') + ']');
  if (n.children) info.push('children:[' + n.children.join(',') + ']');
  console.log('  ' + i + ': ' + info.join(' | '));
});

console.log('\n=== Meshes (' + gltf.meshes.length + ') ===');
gltf.meshes.forEach((m, i) => {
  console.log('  ' + i + ': ' + m.name);
});

console.log('\n=== Materials (' + gltf.materials.length + ') ===');
gltf.materials.forEach((m, i) => {
  console.log('  ' + i + ': ' + m.name);
});

if (gltf.textures) {
  console.log('\n=== Textures (' + gltf.textures.length + ') ===');
}
