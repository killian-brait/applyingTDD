// constructor for an empty portfolio
const Portfolio = require('./portfolio.js');

describe('Portfolio', () => {
    let portfolio;

    beforeEach(() => {
        portfolio = new Portfolio();
    });

    describe('utilities', () => {
        test('2.1 - creates an empty portfolio', () => {
            expect(portfolio.getStocks()).toEqual([]);
        });
        test('2.2 - check if portfolio is empty', () => {
            expect(portfolio.isEmpty()).toBe(true);
        });
        test('2.3 - count unique tickers', () => {
            expect(portfolio.countTicks()).toBe(0);
        });
        test('2.3 - count unique tickers', () => {
            portfolio.purchase('GME', 5);
            portfolio.purchase('RBLX', 10);
            expect(portfolio.countTicks()).toEqual(2);
        });
    });

    describe('stockPurchase', () => {
        test('2.4 - make a purchase', () => {
            portfolio.purchase('GME', 5);
            expect(portfolio.getStocks()).toEqual([{ symbol: 'GME', shares: 5 }]);
        });
        test('2.4 - increment shares on a ticker already purchased', () => {
            portfolio.purchase('AAPL', 10);
            portfolio.purchase('AAPL', 5);
            expect(portfolio.getStocks()).toEqual([{ symbol: 'AAPL', shares: 15 }]);
        });
        test('2.4 - make multiple purchases', () => {
            portfolio.purchase('AAPL', 10);
            portfolio.purchase('GOOG', 5);
            expect(portfolio.getStocks()).toEqual([
                { symbol: 'AAPL', shares: 10 },
                { symbol: 'GOOG', shares: 5 },
            ]);
        });
    });

    describe('stockSale', () => {
        beforeEach(() => {
            portfolio.purchase('AAPL', 10);
            portfolio.purchase('GOOG', 5);
        });

        test('2.5 - sell shares of a stock', () => {
            portfolio.sale('AAPL', 5);
            expect(portfolio.getStocks()).toEqual([
                { symbol: 'AAPL', shares: 5 },
                { symbol: 'GOOG', shares: 5 }
            ]);
        });
        test('2.5 - sell every share in the portfolio', () => {
            portfolio.sale('AAPL', 10);
            portfolio.sale('GOOG', 5);
            expect(portfolio.getStocks()).toEqual([
                { symbol: 'AAPL', shares: 0 },
                { symbol: 'GOOG', shares: 0 }
            ]);
        });

        // test('2.8 - raise exception if trying to sell more shares than owned', () => {
        //     expect(() => {
        //         portfolio.sellStock('AAPL', 15);
        //     }).toThrow(ShareSaleException);
        // });
    });

//   describe('removeStock', () => {
//     beforeEach(() => {
//       portfolio.addStock('AAPL', 10);
//       portfolio.addStock('GOOG', 5);
//     });

//     it('removes a stock from the portfolio', () => {
//       portfolio.removeStock('AAPL');
//       expect(portfolio.getStocks()).toEqual([{ symbol: 'GOOG', shares: 5 }]);
//     });

//     it('removes all shares of a stock from the portfolio', () => {
//       portfolio.removeStock('AAPL');
//       portfolio.removeStock('GOOG');
//       expect(portfolio.getStocks()).toEqual([]);
//     });

//     it('does nothing if stock is not in the portfolio', () => {
//       portfolio.removeStock('MSFT');
//       expect(portfolio.getStocks()).toEqual([
//         { symbol: 'AAPL', shares: 10 },
//         { symbol: 'GOOG', shares: 5 },
//       ]);
//     });
//   });
});
