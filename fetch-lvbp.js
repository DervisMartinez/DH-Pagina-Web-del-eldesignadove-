const fs = require('fs');
async function run() {
  const res = await fetch('https://stats.lvbp.com/posiciones.php');
  const html = await res.text();
  fs.writeFileSync('lvbp.html', html);
  console.log('Saved lvbp.html');
}
run();
