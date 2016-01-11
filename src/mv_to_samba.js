import * as mv from 'mv';

export function move(obj) {
  const dir = `${obj.path}/${obj.name}`;

  var path_arr = obj.path.split('/');
  var label = path_arr[path_arr.length - 1];
  mv(dir, `/root/deluge/${label}`, (err) => {
    if (err) throw err;
  });
}
