async function run() {
  const res = await fetch('https://tujonron.com/');
  const html = await res.text();
  
  const urls = html.match(/https:\/\/api\.tujonron\.net[^"']+/g);
  if (urls) {
    console.log("Found API URLs:");
    console.log([...new Set(urls)]);
  }
}
run();
