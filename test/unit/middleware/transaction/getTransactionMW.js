const expect = require('chai').expect;
const getTransactionMW = require('../../../../middleware/transaction/getTransactionMW');

describe('getTransactionMW middleware ', function () {
    
    it('should set transaction from the database to res.locals', function (done) {
        const mw = getTransactionMW({
            TransactionModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 1 });
                    cb(null, 'mockTransaction');
                }
            }
        });

        const resMock = {
            locals: {}
        };
        mw({
            params: {
                transactionid: 1
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ transaction: 'mockTransaction' });
            done();
        });
    });

    it('should call next with error when there is a database problem', function (done) {
        const mw = getTransactionMW({
            TransactionModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 1 });
                    cb('hiba', 'mockTransaction');
                }
            }
        });

        const resMock = {
            locals: {}
        };
        mw({
            params: {
                transactionid: 1
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('hiba');
            done();
        });
    });

    it('should call next when there is no transaction in the database', function (done) {
        const mw = getTransactionMW({
            TransactionModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 1 });
                    cb(undefined, null);
                }
            }
        });

        const resMock = {
            locals: {}
        };
        mw({
            params: {
                transactionid: 1
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ });
            done();
        });
    });

});
