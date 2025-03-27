console.log('Starting');

setTimeout(() => {
  console.log('Two seconds have passed');
}, 2000);

setTimeout(() => {
  console.log('Zero seconds have passed');
}, 0);

console.log('Finishing');