const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || 5555

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

function coinFlip() {
  // return Math.random() < 0.6 ? ("heads") : ("tails")
  var ran = Math.random();
    if (ran < 0.5) {
        return "heads";
    }
    else {
        return "tails";
    }
}

function coinFlips(flips) {
  // const arr = [];
  // for (let i = 0; i < flips; i++) {
  //   arr[i] = coinFlip();
  // }
  // return arr;
  if (flips < 0 || flips == '' || flips == null) {
    console.log('Error: no input');
  } else {
    var list = [];
    for(var i = 0; i < flips; i++) {
    list.push(coinFlip());
    }
    return list;
    }
}

function countFlips(array) {
  // let h_amt = 0;
  // let t_amt = 0;
  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] == "heads") {
  //     h_amt += 1;
  //   } else {
  //     t_amt += 1;
  //   }
  // }
  // if (h_amt == 0) {
  //   return "{ tails: " + t_amt + " }";
  // }
  // if (t_amt == 0) {
  //   return "{ heads: " + h_amt + " }";
  // }
  // return "{ heads: " + h_amt + ", tails: " + t_amt + " }";
  var heads = 0;
    var tails = 0;
    for(var i = 0; array.length > i; i++) {
        if (array[i] == "heads") {
            heads++;
        }
    else {
            tails++
        }
  }
  return {'heads' : heads, 'tails' : tails}
}

function flipACoin(call) {
  // let flip = coinFlip();
  // let result = "";
  // if (call == flip) {
  //   result = "win";
  // } else {
  //   result = "lose";
  // }
  // return "{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }";
  var flip = coinFlip();
  var result = ""
  if (call == flip) {
    result = "win"
  } else {
    result = "lose"
  }
  return {"call": call, "flip": flip, "result": result};
}

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({ "flip" : flip })
})

app.get('/app/flips/:number', (req, res) => {
    let flips = coinFlips(req.params.number)
    let total = countFlips(flips)
    res.status(200).json({ 'raw': flips, 'summary': total })
})

app.get('/app/flip/call/tails', (req, res) => {
    const flipResult = flipACoin('tails')
    res.status(200).json({ 'call' : flipResult.call, 'flip' : flipResult.flip, 'result' : flipResult.result })
})

app.get('/app/flip/call/heads', (req, res) => {
  const flipResult = flipACoin('heads')
  res.status(200).json({ 'call' : flipResult.call, 'flip' : flipResult.flip, 'result' : flipResult.result })
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});