const { existsSync } = require("fs");

class ShareSaleException extends Error {};

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
        try {
            const existingStock = this.findStock(symbol);
            existingStock.shares += shares;
        } catch(error) {
            // push new stock if it can't be found
            this.stocks.push({ symbol, shares });
        }
    }

    sale(symbol, shares) {
        const existingStock = this.findStock(symbol);
        if (existingStock.shares < shares) {
            throw new ShareSaleException(`Attempting to sell ${shares} shares of ${symbol}, but only ${existingStock.shares} shares owned`);
        }
        if (existingStock.shares == shares) {
            this.removeStock(symbol);
        }
        else {
            existingStock.shares -= shares;
        }
    }

    countShares(symbol) {
        const existingStock = this.findStock(symbol);
        return existingStock.shares;
    }

    // helper functions - refactoring
    findStock(symbol) {
        const existingStock = this.stocks.find((stock) => stock.symbol === symbol);
        if (!existingStock) {
            throw new Error(`${symbol} isn't owned in this portfolio`);
        }
        return existingStock;
    }

    removeStock(symbol) {
        this.stocks = this.stocks.filter((stock) => stock.symbol !== symbol);
    }
  };
  
  module.exports.Portfolio = Portfolio;
  module.exports.ShareSaleException = ShareSaleException;
  