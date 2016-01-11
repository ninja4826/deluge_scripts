import * as mv from 'mv';
var fs = require('fs');
export default function move(obj) {
  const dir = `${obj.path}/${obj.name}`;

  var path_arr = obj.path.split('/');
  var label = path_arr[path_arr.length - 1];
  var newPath = `/root/deluge/${label}`;
  fs.writeSync('/root/deluge_log.log', JSON.stringify({
    label: label,
    original: dir,
    newPath: newPath
  }, null, 2));
  mv(dir, newPath, (err) => {
    if (err) throw err;
  });
}
