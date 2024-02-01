var NUM = require(__dirname + '/Num.js');
module.exports = cc = {
  Num: function (num) {
    if (typeof num == 'string') {
      return NUM(num.replace(/\"/g,'').replace(/\'/g, ''));
    } else return NUM(num);
  },
  Decimal: require(__dirname + '/../node_modules/decimal.js-light'),
  noE: function (x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    }
    else {
      var e = parseInt(x.toString().split('+')[1]);
      if(e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += (new Array(e + 1)).join('0');
      }
    }
    return x;
  },
  fixed: function (coin, n) {
    if (coin == undefined) coin = "0.00000000";
    if (coin.indexOf('.') == -1) coin = coin + '.00000000';
    coin = (coin + '0000000000000000').split('.');
    return coin[0] + '.' + (coin[1].substr(0,n));
  },
  qsatToSat: function (qsat) {
    if (qsat == undefined) qsat = "0";
      qsat = qsat + '';
      qsat = qsat.replace(/\"/g, '').replace(/\'/g, '');
      if (qsat == "0") return "0";
      else return (qsat.length < 9) ? ("0") : (NUM(qsat).divide(NUM('100000000')).toString());
    },
  qsatToCoin: function (coin) {
    if (coin == undefined) coin = "0";
    coin = coin + '';
    for (; coin.length > 16 && coin[0] == '0';) coin = coin.substr(1);
    for (; coin.length < 16;) coin = '0' + coin;
    coin = coin.split('').reverse().join('');
    if (coin.length > 16) coin = coin.substr(0, 16) + '.' + coin.substr(16);
    else coin = coin + '.0';
    coin = coin.split('').reverse().join('');
    return coin;
  },
  qsatToReadable: function (coin, input_val) {
    if (coin == undefined) coin = "0";
    coin = coin + '';
    for (; coin.length > 16 && coin[0] == '0';) coin = coin.substr(1);
    for (; coin.length < 16;) coin = '0' + coin;
    coin = coin.split('').reverse().join('');
    if (coin.length > 16) coin = coin.substr(0, 16) + '.' + coin.substr(16);
    else coin = coin + '.0';
    var qsat = coin.substr(0, 8)
    .replace(/0/g, '₀')
    .replace(/1/g, '₁')
    .replace(/2/g, '₂')
    .replace(/3/g, '₃')
    .replace(/4/g, '₄')
    .replace(/5/g, '₅')
    .replace(/6/g, '₆')
    .replace(/7/g, '₇')
    .replace(/8/g, '₈')
    .replace(/9/g, '₉');
    if (!input_val) qsat = '<b style="font-size:11px;">' + (qsat.split('').reverse().join('')) + '</b>';
    else qsat = qsat.split('').reverse().join('');
    coin = coin.substr(8);
    coin = coin.split('').reverse().join('');
    return coin + qsat;
  },
  satToReadable: function (coin) {
    if (coin == undefined) coin = "0";
    coin = coin + '';
    coin = coin.replace(/\"/g, '').replace(/\'/g, '');
    for (; coin.length > 8 && coin[0] == '0';) coin = coin.substr(1);
    for (; coin.length < 8;) coin = '0' + coin;
    coin = coin.split('').reverse().join('');
    if (coin.length > 8) coin = coin.substr(0, 8) + '.' + coin.substr(8);
    else coin = coin + '.0';
    coin = coin.split('').reverse().join('');
    return coin;
  },
  coinToSat: function (coin) {
    if (coin == undefined) coin = "0";
    coin = coin + '';
    coin = this.fixed(coin, 8);
    coin = coin.replace(/\"/g, '').replace(/\'/g, '');
    if (coin.indexOf('.') == -1) coin = coin + '.0';
    coin = coin.split('.');
    for (; coin[1].length < 8;) coin[1] = coin[1] + '0';
    coin = coin[0] + coin[1];
    for (; coin[0] == '0';) coin = coin.substr(1);
    return coin.replace('\n', '');
  },
  coinToQsat: function (coin) {
    if (coin == undefined) coin = "0";
    coin = coin + '';
    coin = this.fixed(coin, 16);
    coin = coin.replace(/\"/g, '').replace(/\'/g, '');
    if (coin.indexOf('.') == -1) coin = coin + '.0';
    coin = coin.split('.');
    for (; coin[1].length < 16;) coin[1] = coin[1] + '0';
    coin = coin[0] + coin[1];
    for (; coin[0] == '0';) coin = coin.substr(1);
    return coin.replace('\n', '');
  },
  satToCoin: function (sat) {
    if (sat == undefined) sat = "0";
    sat = sat + '';
    sat = sat.replace(/\"/g, '').replace(/\'/g, '').replace(/\./g, '');
    for (; sat.length > 8 && sat[0] == '0';) sat = sat.substr(1);
    for (; sat.length < 8;) sat = '0' + sat;
    sat = sat.split('').reverse().join('');
    sat = [sat.substr(8), sat.substr(0, 8)];
    if (sat[0] == '') sat[0] = '0';
    sat[0] = sat[0].split('').reverse().join('');
    sat[1] = sat[1].split('').reverse().join('');
    return sat[0] + '.' + (sat[1].substr(0, 8));
  },
  qsatToCoin: function (qsat) {
    if (qsat == undefined) qsat = "0";
    qsat = qsat + '';
    qsat = qsat.replace(/\"/g, '').replace(/\'/g, '').replace(/\./g, '');
    for (; qsat.length > 16 && qsat[0] == '0';) qsat = qsat.substr(1);
    for (; qsat.length < 16;) qsat = '0' + qsat;
    qsat = qsat.split('').reverse().join('');
    qsat = [qsat.substr(16), qsat.substr(0, 16)];
    if (qsat[0] == '') qsat[0] = '0';
    qsat[0] = qsat[0].split('').reverse().join('');
    qsat[1] = qsat[1].split('').reverse().join('');
    return qsat[0] + '.' + (qsat[1].substr(0, 8));
  },
  satToQsat: function (sat) {
    if (sat == undefined) sat = "0";
    sat = sat + '';
    sat = sat.replace(/\"/g, '').replace(/\'/g, '');
    return (NUM(sat).multiply(NUM('100000000')).toString());
  },
  calcShare: function (my_balance, total, new_reward) {
    if (my_balance == undefined) my_balance = "0";
    if (total == undefined) total = "0";
    if (new_reward == undefined) new_reward = "0";
    if ([my_balance, total, new_reward].indexOf("0") !== -1) return ["0", "0", "0"];
    else {    
      my_balance = my_balance.replace(/\"/g, '').replace(/\'/g, '');
      total = total.replace(/\"/g, '').replace(/\'/g, '');
      new_reward = new_reward.replace(/\"/g, '').replace(/\'/g, '');
      var my_share_percent = cc.noE(new cc.Decimal(new cc.Decimal(new cc.Decimal(my_balance).times(100)).dividedBy(total)).toFixed(16));
      if (my_share_percent == "0") return ["0", "0", "0"];
      else{
        var my_reward = new cc.Decimal(new cc.Decimal(new cc.Decimal(my_share_percent).times(new_reward)).dividedBy(100)).toString().split('.')[0];
        return [my_reward, my_share_percent];
        }
      }
    },
  pctToShare: function (percent, of_number) {
    if (percent == undefined) percent="0";
    if (of_number == undefined) of_number = "0";
    if([percent, of_number].indexOf("0") !== -1) return "0";
    else{
      return new cc.Decimal(percent).times(of_number).dividedBy(100).toString().split('.')[0]; // (percent * total / 100)
    }
  },
  shareToPct: function (balance, total) {
    if (balance == undefined) balance = "0";
    if (total == undefined) total = "0";
    balance = balance + '';
    total = total + '';
    if (balance == "0" || total == "0") return "0";
    else {
      return cc.noE(new cc.Decimal(new cc.Decimal(new cc.Decimal(balance).times(100)).dividedBy(total)).toFixed(16)); // ((balance / total) * 100)
    }
  },
  add: function (a, b) {
    if (a == undefined) a = "0";
    if (b == undefined) b = "0";
    a = a + '';
    b = b + '';
    a = a.replace(/\"/g, '').replace(/\'/g, '');
    b = b.replace(/\"/g, '').replace(/\'/g, '');
    return NUM(NUM(a).add(NUM(b))).toString();
  },
  sub: function (a, b) {
    if (a == undefined) a = "0";
    if (b == undefined) b = "0";
    a = a + '';
    b = b + '';
    a = a.replace(/\"/g, '').replace(/\'/g, '');
    b = b.replace(/\"/g, '').replace(/\'/g, '');
    return NUM(NUM(a).minus(NUM(b))).toString();
  }
};
