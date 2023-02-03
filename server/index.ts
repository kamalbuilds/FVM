
import express, { Express, Request, Response } from 'express';
import { Socket, Server } from 'socket.io';
import * as http from "http";
import cors from 'cors';
import fs from 'fs'

const PORT: number = 4000;

const app: Express = express();

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync('data.json');
const productData = JSON.parse(rawData.toString());

// cors support to allow share resources between different sources
app.use(cors());

const httpServer = http.createServer(app)

const socketIO = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  //Listens to the addProduct event
  socket.on('addProduct', (data) => {
    productData['products'].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile('data.json', stringData, (err) => {
      console.error(err);
    });
    //Sends back the data after adding a new product
    socket.emit('addResponse', data);
  });

  //Listens for new bids from the client
  socket.on('bidProduct', (data) => {
    findProduct(
      data.name,
      productData['products'],
      data.last_bidder,
      data.price
    );
    //Sends back the data after placing a bid
    socket.emit('bidResponse', data);
  });

});

const findProduct = (nameKey: string, productsArray: [{ name: string, last_bidder: string, price: string }], last_bidder: string, new_price: string) => {
  productsArray.map((product) => {
    if (product.name === nameKey) {
      product.last_bidder = last_bidder;
      product.price = new_price;
    }
  })
  const stringData = JSON.stringify(productData, null, 2);
  fs.writeFile('data.json', stringData, (err) => {
    console.error(err);
  });
}


app.get('/api', (req: Request, res: Response) => {
  res.json(productData);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});