// const express = require('express')
// const app = express()

// const args = require('minimist')(process.argv.slice(2))
// args['port']
// const port = args.port || process.env.PORT || 5000;

// const server = app.listen(port, () => {
//     console.log('App listening on port %PORT%'.replace('%PORT%', port))
// });

// function coinFlip() {
//   return Math.random() < 0.6 ? ("heads") : ("tails")
// }

// function coinFlips(flips) {
//   const arr = [];
//   for (let i = 0; i < flips; i++) {
//     arr[i] = coinFlip();
//   }
//   return arr;
// }

// function countFlips(array) {
//   let h_amt = 0;
//   let t_amt = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] == "heads") {
//       h_amt += 1;
//     } else {
//       t_amt += 1;
//     }
//   }
//   if (h_amt == 0) {
//     return "{ tails: " + t_amt + " }";
//   }
//   if (t_amt == 0) {
//     return "{ heads: " + h_amt + " }";
//   }
//   return "{ heads: " + h_amt + ", tails: " + t_amt + " }"; 
// }

// function flipACoin(call) {
//   let flip = coinFlip();
//   let result = "";
//   if (call == flip) {
//     result = "win";
//   } else {
//     result = "lose";
//   }
//   return "{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }";
// }

// app.get('/app/', (req, res) => {
//   res.statusCode = 200;
//   res.statusMessage = 'OK';
//   res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
//   res.end(res.statusCode+ ' ' +res.statusMessage)
// });

// // app.get('/app/flip/', (req, res) => {
// //     const flip = coinFlip()
// //     res.status(200).json({ "flip" : flip })
// // })

// // app.get('/app/flips/:number([0-9]{1,3})', (req, res) => {
// //     const flips = coinFlips(req.params.number)
// //     const total = countFlips(flips)
// //     res.status(200).json({ 'raw': flips, 'summary': total })
// // })

// // app.get('/app/flip/call/:guess(heads|tails)/', (req, res) => {
// //     const flipResult = flipACoin(req.params.guess)
// //     res.status(200).json(flipResult)
// // })

// app.get('/app/flip/', (req, res) => {
//   const flip = coinFlip()
//   res.status(200).json({'flip' : flip})
// });

// // autograder
// app.get('/app/flips/:number/', (req, res) => {
//   const flips = coinFlips(req.params.number)
//   const count = countFlips(flips)
  
//   res.status(200).json({'raw' : flips, 'summary' : count})
// });

// app.get('/app/flip/call/heads', (req, res) => {
//   res.status(200).json(flipACoin("heads"))
// });

// app.get('/app/flip/call/tails', (req, res) => {
//   res.status(200).json(flipACoin("tails"))
// });

// app.use(function(req, res){
//   res.status(404).send('404 NOT FOUND')
// });

const express = require('express')
const app = express()


// Start an app server
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000
const server = app.listen(port, () => {
    // console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({'flip' : flip})
});

// autograder
app.get('/app/flips/:number/', (req, res) => {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips)
    
    res.status(200).json({'raw' : flips, 'summary' : count})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


function coinFlip() {
 
    let num = Math.round(Math.random())%2;
    
    if(num==0) {return "heads"};
    return "tails";
}

function coinFlips(flips) {
    let arr= [];
    for(let i=0; i<flips; i++) {
      arr[i] = coinFlip();
    }
    return arr;
}

function countFlips(array) {
    let heads =0;
    let tails=0;
    for(let i=0; i < array.length; i++) {
      if(array[i]=="heads") {
        heads++;
      } else {
        tails++;
      }
    }
    if(heads==0) {
        return "{ tails: " + tails + " }"
    } else if (tails==0) {
        return "{ heads: " + heads + " }"
    } else {
        return {"heads":heads,"tails":tails}
    }
    
}

function flipACoin(call) {
    let side = coinFlip();
    let result = "";
    if(side==call) {
      result = "win";
    } else {result="lose";}
    return {call: call, flip: side, result: "win"}
}