const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const server = require('../app');
const Staff = require('../app/models/staff')

describe('/staffs requests', () => {
    let staff;
    let staffObject = { name: 'Asefon Michael P.', email: 'pelumiasefon@gmail.com'}
    beforeEach(async () => {
      staff =  await Staff.create(staffObject);
    });


    describe('GET /staffs', () => {
        it('returns list of staffs which should be array', async () => {
            const response = await request(server).get('/staffs')
            expect(response.body.data).to.be.an('array');
        });
    });

    describe('GET /staffs/:id', () => {
        it('returns single staff', async () => {
            const response = await request(server).get(`/staffs/${staff._id}`);
            expect(response.body.data).to.have.deep.include(staffObject);
        });

    });

    describe('POST /staffs (= create)', () => {
        const newStaffObject = { name: 'David G.', email: 'test@gmail.com'}
        it('creates staff ', async () => {
            const response = await request(server)
                .post('/staffs')
                .send(newStaffObject);

            const responseData = response.body.data;

            expect(responseData._id).not.to.be.null;
            expect(responseData).to.deep.include(newStaffObject);

            //fetch what was created to be 100% sure of data creation
            const loadedStaff = await Staff.findById(responseData._id);
            expect(loadedStaff).to.deep.include(newStaffObject);
        });
    });


    describe('PATCH /staffs/:id (= update)', () => {

        it('updates selected staffs', async () => {
            const response = await request(server)
                .patch(`/staffs/${staff._id}`)
                .send({   name: 'Michael' });

            expect(response.body.data).to.deep.include({
                name: 'Michael'
            });

        });
    });

    describe('DELETE /staffs/:id (= destroy)', () => {

        it('deletes specific staff selected', async () => {
            const response = await request(server)
                .delete(`/staffs/${staff._id}`);

            expect(response.status).to.equal(204);
            expect(response.body).to.deep.equal({});
            const loadedStaff = await Staff.findById(staff._id);
            expect(loadedStaff).to.be.null;
        });
    });
});
