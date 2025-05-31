let queue = [];
queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue);
while (queue.length !== 0) {
  console.log(queue[0]);
  queue.shift();
}
