const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('lvbp.html'));
console.log($('.tab-pane').length + ' tabs found');
$('.tab-pane').each((i, tab) => {
  console.log('Tab ID: ' + $(tab).attr('id'));
  const headers = $(tab).find('table th').map((_, th) => $(th).text().trim()).get();
  console.log('Headers: ' + headers.join(', '));
  const rows = $(tab).find('table tbody tr').map((_, tr) => {
    return $(tr).find('td').map((_, td) => $(td).text().trim()).get().join(' | ');
  }).get();
  console.log('Rows:\n' + rows.join('\n') + '\n');
});
