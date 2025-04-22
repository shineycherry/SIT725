const expect = require("chai").expect;
const request = require("request");

const baseUrl = "http://localhost:3000";

before(function (done) {
    setTimeout(done, 1000); // Wait 1 second before running tests
});

describe("Smart Inventory Manager - API Tests", function () {

    it("should return 200 OK for GET /api/items", function (done) {
        request.get(`${baseUrl}/api/items`, function (err, res, body) {
            if (err) return done(err);
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("should add a new item", function (done) {
        request.post({
            url: `${baseUrl}/api/items`,
            json: { name: "TestItem", category: "Test", quantity: 10 }
        }, function (err, res, body) {
            if (err) return done(err);
            expect(res.statusCode).to.equal(201);
            expect(body).to.have.property("name", "TestItem");
            done();
        });
    });

    it("should return error for missing fields", function (done) {
        request.post({
            url: `${baseUrl}/api/items`,
            json: { name: "" }
        }, function (err, res, body) {
            if (err) return done(err);
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it("should update an item", function (done) {
        // First create an item
        request.post({
            url: `${baseUrl}/api/items`,
            json: { name: "TempItem", category: "Temp", quantity: 5 }
        }, function (err, res, body) {
            if (err) return done(err);
            const itemId = body._id;

            // Then update it
            request.put({
                url: `${baseUrl}/api/items/${itemId}`,
                json: { quantity: 20 }
            }, function (err2, res2, body2) {
                if (err2) return done(err2);
                expect(res2.statusCode).to.equal(200);
                expect(body2.quantity).to.equal(20);
                done();
            });
        });
    });

});
