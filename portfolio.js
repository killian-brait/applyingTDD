const { existsSync } = require("fs");

class Portfolio {
    constructor() {
      this.stocks = [];
    }
  
    getStocks() {
        return this.stocks;
    }

    isEmpty() {
        if (this.stocks.length == 0) {
            return true;
        }
        return false;
    }

    countTicks() {
        const ticks = new Set();
        this.stocks.forEach((stock) => {
            if (!ticks.has(stock.symbol)) {
                ticks.add(stock.symbol);
            }
        });
        return ticks.size;
    }

    purchase(symbol, shares) {
        const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
        if (existingStock) {
            existingStock.shares += shares;
        } else {
            this.stocks.push({ symbol, shares });
        }
    }

    sale(symbol, shares) {
        const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
        if (!existingStock) {
            throw new Error(`No shares of ${symbol} owned`);
        }
        else {
            if (existingStock.shares < shares) {
                throw new ShareSaleException(`Attempting to sell ${shares} shares of ${symbol}, but only ${existingStock.shares} shares owned`);
            }
            else {
                existingStock.shares -= shares;
            }
        }
    }

    // removeStock(symbol) {
    //   const index = this.stocks.findIndex((stock) => stock.symbol === symbol);
    //   if (index !== -1) {
    //     this.stocks.splice(index, 1);
    //   }
    // }
  }

  class ShareSaleException extends Error {}
  
  module.exports = Portfolio;
  