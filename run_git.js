const cp = require('child_process');

function run(cmd) {
  try {
    const res = cp.execSync(cmd, { encoding: 'utf8' });
    console.log(cmd + ' -> OK\n' + res);
  } catch(e) {
    console.error(cmd + ' -> ERROR:\n' + e.stdout + '\n' + e.stderr);
  }
}

// Config user if not set
try {
  cp.execSync('git config user.name', { encoding: 'utf8' });
} catch(e) {
  run('git config user.name "Nizam Hospital Developer"');
  run('git config user.email "dev@nizamlittlestar.in"');
}

run('git init');
run('git add .');
run('git commit -m "Initial commit: Nizam Little Star Children Hospital website"');
run('git branch -M main');
run('git status');
