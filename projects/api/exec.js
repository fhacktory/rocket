const { exec } = require('child_process');
exec(__dirname + '/bin/missilelauncher', (error, stdout, stderr) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log(stdout);
});
