var express = require('express');
var router = express.Router();
var talentModel = require('../model/talents')
var formationModel = require('../model/formation')
var experienceModel = require('../model/experience')
const {request} = require('express');
var uid2 = require('uid2');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


var restaurantModel = require('../model/restaurants')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async function(req,res,next){
//console.log('its body',req.body)
const zoneFrance= [
  [ -5.3173828125, 48.458124202908934 ],
  [ 2.1313476562500004, 51.26170001449684 ],
  [ 8.811035156250002, 48.90783374365477 ],
  [ 7.998046875000001, 43.70709714273101 ],
  [ 3.2080078125000004, 42.228008913641865 ],
  [ 1.4941406250000002, 42.293056273848215 ],
  [ -2.0214843750000004, 43.06838615478111 ],
  [ -5.3173828125, 48.458124202908934 ]
]
var polygoneFrance = {
  type: "Polygon" ,
  coordinates: [
    zoneFrance
  ]
}
  var salt = uid2(32)
  var talentToCheck = await talentModel.findOne({email:req.body.talentEmail})
  var avatar = 'https://res.cloudinary.com/dpyqb49ha/image/upload/v1604324805/mucu7fy5dbhrxmhtf1dc.jpg'
  if(talentToCheck === null){
    var newTalent = await new talentModel({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      salt : salt,
      password : SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32), 
      phone : req.body.phone,
      avatar:avatar,
      polygone: polygoneFrance,
    })
    var talentSaved = await newTalent.save();
    if(talentSaved){
      res.json({token : talentSaved.token, profil: talentSaved})
    }else{
      res.json(false)
    }
  }
})

router.post('/informations', async function(req,res,next){

  //console.log(req.body)
  var job = JSON.parse(req.body.job)
  var langage = JSON.parse(req.body.langage)

  await talentModel.updateOne({token:req.body.token},{speakLangage:langage, working:req.body.poste, lookingForJob: req.body.recherche, lookingJob:job, typeofContract:req.body.contrat})
  console.log(req.body.experience)
  
  //console.log('formation',req.body.formation)
  //console.log('experience',req.body.experience)
  
  var formation = JSON.parse(req.body.formation)
  var experience = JSON.parse(req.body.experience)
    
  for (let i=0;i<formation.length;i++){
  var newFormation = await new formationModel({
  school : formation[i].school,
  diploma : formation[i].diploma,
  endingDate : formation[i].year,
  city : formation[i].city
  })
  await newFormation.save();
  await talentModel.updateOne({token:req.body.token},{$addToSet:{formation:newFormation.id}})
  }
  
  for(let i=0; i<experience.length;i++){
    var newExperience = await new experienceModel({
    firm : experience[i].firm,
    city : experience[i].city,
    startingDate : experience[i].startDate,
    endingDate : experience[i].endDate
    })
  await newExperience.save();
  await talentModel.updateOne({token:req.body.token},{$addToSet:{experience:newExperience.id}})
  }
})


router.post('/envoi-secteur', async function(req, res, next){
 
  var listePoints = await JSON.parse(req.body.liste);
  console.log(listePoints)
  listePoints.push(listePoints[0]);
  await talentModel.updateOne({ token: req.body.token }, {perimetre: listePoints,adress:req.body.adresse, polygone: {
    type: "Polygon" ,
    coordinates: [
      listePoints
    ]
 }})
})

router.post('/envoi-adresse', async function(req, res, next){
  var lnglat = JSON.parse(req.body.lnglat)
  console.log(req.body.adresse)
  await talentModel.updateOne({token: req.body.token}, {adress:req.body.adresse, adresselgtlat:lnglat})
})

router.post(`/recherche-liste-restaurants`, async function(req, res, next){
  var donnees = JSON.parse(req.body.restaurant)
  var responseAenvoyer = await restaurantModel.find(
     { 
      adresselgtlat: {
        $geoIntersects: {
           $geometry: {
              type: "Polygon" ,
              coordinates: [donnees.zone],
              // crs: {
              //    type: "name",
              //    properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
              // }
           }
        }
      },
      typeOfFood : {$in: donnees.cuisine},
      typeOfRestaurant: { $in: donnees.ambiance},
      clientele: { $in: donnees.type},
      pricing :{ $in: donnees.prix} 
    }
  )
  var user = await talentModel.findOne({token:req.body.token})
  if (user.wishlistTalent){
    var whishlist = user.wishlistTalent
  } else{
   var whishlist = []
  } 
  res.json({liste : responseAenvoyer, whishlist: whishlist})
})

router.get('/detail-restaurant/:id', async function(req, res, next){
  var restaurant = await restaurantModel.findOne({_id:req.params.id})
  res.json(restaurant)
})

router.post('/whishlist', async function( req, res, next){
  var user = await talentModel.findOne({token: req.body.token})
  var restaurant = await restaurantModel.findOne({_id: req.body.restaurant})
  console.log(user)
  if(user.wishlistTalent.includes(restaurant._id)){
    await talentModel.updateOne({token: req.body.token}, { $pull: { wishlistTalent: { $in:  `${req.body.restaurant}` }} })
    console.log('retrait whishlist')
  } else {
    await talentModel.updateOne({token: req.body.token}, {$addToSet:{ wishlistTalent: req.body.restaurant}})
    console.log('ajout whishlist')
  }
  
  var response = await restaurantModel.find()
  var userAjour = await talentModel.findOne({token: req.body.token})
  res.json({liste :response, whishlist: userAjour.wishlistTalent})
})

router.get('/affiche-whishlist/:token', async function( req, res, next){
  console.log(req.params)
  var user = await talentModel.findOne({token: req.params.token}).populate('wishlistTalent').exec()
  res.json(user.wishlistTalent)
})

router.get('/profil/:token', async function( req, res, next){
  console.log(req.params.token)
  var user = await (await talentModel.findOne({token: req.params.token}).populate('experience').populate('formation').exec())
  res.json(user)
})

module.exports = router;
