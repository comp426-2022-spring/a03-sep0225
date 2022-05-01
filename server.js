const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({'flip' : flip})
});

app.get('/app/flips/:number/', (req, res) => {
    const flips = coinFlips(req.params.number)
    const total = countFlips(flips)
    res.status(200).json({'raw' : flips, 'summary' : total})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
});

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

function coinFlip() {
  return Math.random() < 0.6 ? ("heads") : ("tails")
}

function coinFlips(flips) {
  const arr = [];
  for (let i = 0; i < flips; i++) {
    arr[i] = coinFlip();
  }
  return arr;
}

function countFlips(array) {
  let h_amt = 0;
  let t_amt = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "heads") {
      h_amt += 1;
    } else {
      t_amt += 1;
    }
  }
  if (h_amt == 0) {
    return "{ tails: " + t_amt + " }";
  }
  if (t_amt == 0) {
    return "{ heads: " + h_amt + " }";
  }
  return "{ heads: " + h_amt + ", tails: " + t_amt + " }";
}

function flipACoin(call) {
  let flip = coinFlip();
  let result = "";
  if (call == flip) {
    result = "win";
  } else {
    result = "lose";
  }
  return "{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }";
}