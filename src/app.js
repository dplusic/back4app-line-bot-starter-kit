// express app is prepared by Back4App
const { app } = global;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// A simple function
// https://docs.back4app.com/docs/integrations/command-line-interface/a-simple-function/
const { Parse } = global;
Parse.Cloud.define('hello', (req, res) => {
  res.success('Hello world!');
});
