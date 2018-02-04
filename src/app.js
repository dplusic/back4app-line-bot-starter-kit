// express app is prepared by Back4App
const { app } = global;

app.get('/', (req, res) => {
  res.send('Hello World');
});
