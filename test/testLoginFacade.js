const expect = require('chai').expect;

let connect = require('../mongoConnector').connect;
let disconnect = require('../mongoConnector').disconnect;
let connection = require('../mongoConnections').test;

let User = require('../models/user');
let Position = require('../models/position');
let loginFacade = require('../facade/loginFacade');

describe('Testing User Facade', () => {
	before(async () => {
		await connect(connection);
	});

	after(async () => {
		await disconnect();
	});

	beforeEach(async () => {
		await User.deleteMany({});
		await Position.deleteMany({});

		await User.insertMany([
			{
				firstName: 'Marc',
				lastName: 'Marcsen',
				username: 'marc',
				password: 'test',
				email: 'marc@mail.com'
			},
			{
				firstName: 'Noah',
				lastName: 'Noahsen',
				username: 'noah',
				password: 'test',
				email: 'noah@mail.com'
			}
		]);

		await loginFacade.login('marc', 'test', 10.00004, 10.00005, 1);
	});

	/* afterEach(() => {
		console.log("Sets test environment after individual");
	}); */

	it('Should find all friends nearby', async function() {
        let friends = await loginFacade.login('noah', 'test', 10.00005, 10.00005, 5);
        console.log(friends)
		expect(friends[0].username).to.be.equal('marc');
	});
});
