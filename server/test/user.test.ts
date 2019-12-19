import request from "supertest";
import app from "../src/app";
import { expect } from "chai";


//Before running this test, you have to create 3 users:
//{
//  email: jason@gmail.com
//  password: 123456
//  usertype: user
//}
//{
//  email: jason@gmail.com
//  password: 123456
//  usertype: doctor
//}
//{
//  email: jason@gmail.com
//  password: 123456
//  usertype: admin
//}


describe("POST /login", () => {

    it("should return some defined error message with valid parameters", (done) => {
        return request(app).post("/login")
                        .field("email", "john@me.com")
                        .field("password", "Hunter2")
                        .expect(302)
                        .end(function(err, res) {
                            expect(res.error).not.to.be.undefined;
                            done();
                        });
    });

    /**
     * user login
     */
    it("User shoud successfully login", (done) => {
        return request(app)
            .post("/login")
            .send({
                "email": "jason@gmail.com",
                "password": "123456",
                "usertype": "user"
            })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.msg).equal("You have logged in!");
                done();
            });
    });

    /**
     * doctor login
     */
    it("Doctor shoud successfully login", (done) => {
        return request(app)
            .post("/login")
            .send({
                "email": "jason@gmail.com",
                "password": "123456",
                "usertype": "doctor"
            })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.msg).equal("You have logged in!");
                done();
            });
    });

    /**
     * user login
     */
    it("Admin shoud successfully login", (done) => {
        return request(app)
            .post("/login")
            .send({
                "email": "jason@gmail.com",
                "password": "123456",
                "usertype": "admin"
            })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.msg).equal("You have logged in!");
                done();
            });
    });



});

// describe("Pat POST /login", () => {
//     let cookie: Array<string>;

//     beforeEach((done) => {
//         return request(app)
//             .post("/login")
//             .send({
//                 "email": "jason@gmail.com",
//                 "password": "123456",
//                 "usertype": "user"
//             })
//             .expect(200)
//             .end(function(err, res) {
//                 cookie = res.header['set-cookie'][0].split(';');
//                 // console.log(cookie)
//                 expect(res.body.msg).equal("You have logged in!")
//                 done();
//             });
//     })

//     it("should return some defined error message with valid parameters", (done) => {
//         return request(app).post("/login")
//                         .field("email", "john@me.com")
//                         .field("password", "Hunter2")
//                         .expect(302)
//                         .end(function(err, res) {
//                             expect(res.error).not.to.be.undefined;
//                             done();
//                         });
//     });
//     it("success login", (done) => {
//         return request(app)
//             .post("/login")
//             .set('Cookie', cookie)
//             .send({
//                 "email": "jason@gmail.com",
//                 "password": "123456",
//                 "usertype": "user"
//             })
//             .expect(200)
//             .end(function(err, res) {
//                 // console.log(res.header['set-cookie'][0]);
//                 expect(res.body.msg).equal("You have logged in!")
//                 done();
//             });
//     });

//     afterEach((done) => {
//         return request(app)
//                 .get('/logout')
//                 .set('Cookie', cookie)
//                 .expect(200)
//                 .end(() => {
//                     cookie = [];
//                     done();
//                 })
//     })
// });

