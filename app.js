import { ReadableStream } from 'stream/web'; // In Node.js 18+, this is global too

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello, ");
    controller.enqueue("world!");
    controller.close();
  }
});

const reader = stream.getReader();

async function read() {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(value); // value is a Uint8Array (in browser) or string (in Node)
  }
}

read();
