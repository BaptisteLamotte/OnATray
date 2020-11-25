var app = require("../app")
var request = require("supertest")
jest.setTimeout(30000)
test('createaccountrestauFalse', async (done)=>{
    await request(app).post('/restaurants/createAccount')
    .send({"email" : ''})
    .expect(200)
    .expect({'result' : false})
  
    done()
  })

  test('createaccountrestauTrue', async (done)=>{
    var response = await request(app).post('/restaurants/createAccount')
    .send({"restaurantEmail" : 'test@mail233333333.com', "restaurantPassword" : "a"})
    .expect(200)


    expect(response.body.result).toEqual(true)
    expect(response.body.profil).toBeDefined()
    expect(response.body.token).toBeDefined()
    done()
  })

  test('recherche-liste-talents', async (done)=>{
   var response =  await request(app).post('/restaurants/recherche-liste-talents')
    
    .send({
      'token': 'ss0YgX93YyqJ4YTGtfDjWjjJsPPQqmYP',
      'criteres': '{"posterecherché":"tous les postes","typedecontrat":"CDI"}'
    })
    .expect(200)
   
    for (let i = 0; i< response.body.liste.length;i++){
      expect(response.body.liste[i].typeofContract).toContain('CDI')
    }
    done()
  })