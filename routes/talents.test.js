var app = require("../app")
var request = require("supertest")
jest.setTimeout(30000)

  test('createaccountTrue', async (done)=>{
    var response = await request(app).post('/talents/createAccount')
    .send({"email" : 'test@mail2222222.com', "password" : "a"})
    .expect(200)

    expect(response.body.result).toEqual(true)
    expect(response.body.profil).toBeDefined() 
    expect(response.body.token).toBeDefined()
    done()
  })

test('createaccountFalse', async (done)=>{
    await request(app).post('/talents/createAccount')
    .send({"email" : ''})
    .expect(200)
    .expect({'result' : false})
  
    done()
  })

test('detail', async (done)=>{
    await request(app).get('/talents/detail-restaurant/:id')
    .send({'id': ''})
    .expect(200)
    .expect({'result': false})

done()
})