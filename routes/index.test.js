var app = require("../app")
var request = require("supertest")
jest.setTimeout(30000)
const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://Baptiste:12345@cluster0.s5jcn.mongodb.net/OnaTray?retryWrites=true&w=majority', {
      useNewUrlParser: true,
    });
    db = await connection.db('OnaTray');
  });
  afterAll(async () => {
    await connection.close();
    await db.close();
  });
  it('should insert a doc into collection', async () => {
    const users = db.collection('talents');

    const mockUser = {token: '1', firstName: 'John'};

    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({token: '1'});
    expect(insertedUser).toEqual(mockUser);
  });
});



test("signIn", async (done) => {
await request(app).post("/sign_in")
  .send({ "email": "", "password": "" })
  .expect(200)
  .expect({ result: 'Error' })

done()
})

test("signIn", async (done) => {
  var response = await request(app).post("/sign_in")
    .send({ "email": "lamotte.baptiste@gmail.com", "password": "a" })
    .expect(200)
    
    expect(response.body.result).toEqual(true)
    expect(response.body.profil).toBeDefined() 
    expect(response.body.token).toBeDefined()
  
  done()
  })
test('getmychatroom', async (done)=>{
    await request(app).post('/getMyChatRoom')
    .send({"token" : ''})
    .expect(200)
    .expect({result : 'error'})

    done()
})

test('getmychatroomTrue', async (done)=>{
  var response = await request(app).post('/getMyChatRoom')
  .send({"token" : 'ss0YgX93YyqJ4YTGtfDjWjjJsPPQqmYP'})
  .expect(200)
  
  expect(response.body.result).toBeDefined()

  done()
})