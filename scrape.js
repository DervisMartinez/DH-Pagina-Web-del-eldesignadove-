async function run() {
  const res = await fetch('https://tujonron.com/');
  const html = await res.text();
  
  // Find the standings component
  const snapshotMatches = html.matchAll(/wire:snapshot="(.*?)"/g);
  for (const match of snapshotMatches) {
    const unescaped = match[1].replace(/&quot;/g, '"');
    if (unescaped.includes('standings')) {
      console.log("FOUND STANDINGS SNAPSHOT:");
      console.log(JSON.stringify(JSON.parse(unescaped), null, 2));
    }
  }
}
run();
