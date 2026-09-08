const fs = require('fs');
async function run() {
  const res = await fetch('https://tujonron.com/');
  const html = await res.text();
  fs.writeFileSync('tujonron.html', html);
  console.log('Saved tujonron.html');
}
run();
