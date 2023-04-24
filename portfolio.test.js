// constructor for an empty portfolio
const { Portfolio, ShareSaleException } = require('./portfolio.js');

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
        describe('utilities w setup', () => {
            beforeEach(() => {
                portfolio.purchase('AAPL', 10);
                portfolio.purchase('GOOG', 5);
            });

            test('2.6 - count shares for a given symbol', () => {
                expect(portfolio.countShares('AAPL')).toEqual(10);
                expect(portfolio.countShares('GOOG')).toEqual(5);
            });
            test('2.6 - change counts and recount', () => {
                portfolio.sale('AAPL', 9);
                portfolio.sale('GOOG', 3);
                expect(portfolio.countShares('AAPL')).toEqual(1);
                expect(portfolio.countShares('GOOG')).toEqual(2);
            });
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
        test('2.7 - remove stocks from portfolio by selling all the shares', () => {
            portfolio.sale('AAPL', 10);
            portfolio.sale('GOOG', 5);
            expect(portfolio.getStocks()).toEqual([]);
        });
        test('2.8 - raise exception if trying to sell more shares than owned', () => {
            expect(() => {
                portfolio.sale('AAPL', 15);
            }).toThrow(ShareSaleException);
        });
    });
});
