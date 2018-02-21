const Path = require('path')
const menubar = require('menubar')
const request = require('request');
const repeat = require('repeat');

var mb = menubar({
    index: Path.join('file://',__dirname,'index.html'),
    icon: Path.join('file://',__dirname,'icon.png')
})

function updatePrice(){
    request({
      method: 'POST',
      url: 'https://api.idex.market/returnTicker',
      json: {
        market: 'ETH_POLY'
      }
    }, function (err, resp, body) {
        if(body && body.last !== undefined){
            mb.tray.setTitle(body.last.slice(0,11))
        }
    })
        
}

mb.on('ready',function ready(){
    console.log('app is ready');
    updatePrice();
    repeat(updatePrice).every(5000,'ms').start.now();
})
