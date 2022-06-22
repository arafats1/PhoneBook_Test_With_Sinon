const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const index = require('./index');


describe('getContactByFirstname', () => {
    it('should getContactByFirstname', (done) => {
        let requestMock = sinon.mock(request);
        const myContact = [{
            "id": 1,
            "firstname": "Magezi",
            "lastname": "Arafat",
            "telephone": "0784528444"
        },
        {
            "id": 2,
            "firstname": "Akampa",
            "lastname": "Bushrah",
            "telephone": "0700529223"
        }];

        requestMock.expects("get")
            .once()
            .withArgs('https://jsonplaceholder.typicode.com/users?firstname=Magezi')
            .yields(null, null, JSON.stringify(myContact));

        index.getContactByFirstname('Magezi').then((contact) => {
            expect(contact.length).to.equal(2);
            contact.forEach((contact) => {
                expect(contact).to.have.property('id');
                expect(contact).to.have.property('firstname');
                expect(contact).to.have.property('lastname');
                expect(contact).to.have.property('telephone');
            });

            requestMock.verify();
            requestMock.restore();
            done();
        }).catch((err) => {
            console.log(err);
        }
        );
    });
});

