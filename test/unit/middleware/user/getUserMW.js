const expect = require('chai').expect;
const getUserMW = require('../../../../middleware/user/getUserMW');

describe('getUserMW middleware ', function () {
    
    it('should set user from the database to res.locals', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 1 });
                    cb(null, 'mockUser');
                }
            }
        });

        const resMock = {
            locals: {}
        };
        mw({
            params: {
                userid: 1
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ user: 'mockUser' });
            done();
        });
    });

    it('should call next with error when there is a database problem', function (done) {
        const mw = getUserMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 1 });
                    cb('hiba', 'mockUser');
                }
            }
        });

        const resMock = {
            locals: {}
        };
        mw({
            params: {
                userid: 1
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('hiba');
            done();
        });
    });

    it('should call next when there is no user in the database', function (done) {
        const mw = getUserMW({
            UserModel: {
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
                userid: 1
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
