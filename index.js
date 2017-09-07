const spawn = require('child_process').spawn

function run(env) {
  if (env === 'production') {
    const child = spawn('node', ['server/app.js'])
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
  } else {
    const child = spawn('nodemon', ['-L', 'server/app.js'])
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
  }
}

try {
  run(process.env.NODE_ENV)
} catch (err) {
  console.log(err)
}
