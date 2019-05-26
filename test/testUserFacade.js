const expect = require('chai').expect;

let connect = require('../mongoConnector').connect;
let disconnect = require('../mongoConnector').disconnect;
let connection = require('../mongoConnections').test;

let User = require('../models/user');
let userFacade = require('../facade/userFacade');

describe('Testing User Facade', () => {
	before(async () => {
		await connect(connection);
		await User.deleteMany({});
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
	});

	after(async () => {
		await User.deleteMany({});
		disconnect();
	});

	/*beforeEach(() => {
		console.log("Sets up test environment before individual");
	});

	afterEach(() => {
		console.log("Sets test environment after individual");
	}); */

	it('should return a list of users', async () => {
		const users = await userFacade.getAll();
		expect(users).not.to.be.empty;
	});
    
	it('should return a user', async () => {
        const user = await userFacade.getByUsername('marc');
		expect(user).to.not.be.null;
    });
    
    it('should return a user', async () => {
        let { _id } = await userFacade.getByUsername('noah');
        let user = await userFacade.getByID(_id);
        expect(user).to.not.be.null;
    });

    it('should return a user by ID', async () => {
        let { _id } = await userFacade.getByUsername('noah');
        let user = await userFacade.getByID(_id);
        expect(String(user._id)).to.be.equal(String(_id));
    });
    
    it('should return a user by username', async () => {
		const user = await userFacade.getByUsername('marc');
		expect(user.username).to.be.equal('marc');
    });
    
    it('should return a user by username', async () => {
        await userFacade.add("Melissa", "Falck", "mlisa", "pw", "mf@mail.com");
        const user = await userFacade.getByUsername("mlisa");
		expect(user.username).to.be.equal('mlisa');
	});

});
