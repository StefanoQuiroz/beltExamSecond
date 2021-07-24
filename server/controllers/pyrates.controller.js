const Pyrate = require('../models/pyrates.model');


const findPyrate = (req,res) => {
    Pyrate.find({}).sort("pyrateName")
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const findSinglePyrate = (req,res) => {
    Pyrate.findById(req.params.id)
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const createPyrate = (req,res) => {
    /* const pyrates = req.body;
    pyrates.pegLeg= 'true';
    pyrates.eyepatch= 'true';
    pyrates.hookHand= 'true';
    Pyrate.create(req.body)
                    .then(result => res.json({data:result}))
                    .catch(error => {
                        res.json({error:error, message:"Something went wrong"});
                        res.sendStatus(500)
                    }) */
    const {pyrateName, imageUrl, treasureChest, catchPhrase, crewPosition, pegLeg, eyePatch, hookHand} = req.body;
    if(crewPosition === 'Captain'){
        Pyrate.findOne({crewPosition: crewPosition})
            .then(pos => {
                if(pos){
                    res.json({errors: true, message: "There can only exists one Captain"})
                } else{
                    Pyrate.create(req.body)
                        .then(result => res.json({data:result}))
                        .catch(error => {
                            res.json({error:error, message:"Something went wrong"});
                            res.sendStatus(500)
                        })
                }
            })
    } else {
        Pyrate.create(req.body)
            .then(result => res.json({data:result}))
            .catch(error => {
                res.json({error:error, message:"Something went wrong"});
                res.sendStatus(500)
            })
    }

    /* Pyrate.findOne({crewPosition: req.body.crewPosition})
        .then(response => {
            if(response){
                res.json({error: true, message:`There can be only ${req.body.crewPosition}`})
            } else {
                //const pyrates = req.body;
                //pyrates.pegLeg= 'true';
                //pyrates.eyepatch= 'true';
                //pyrates.hookHand= 'true';
                Pyrate.create(req.body)
                    .then(result => res.json({data:result}))
                    .catch(error => {
                        res.json({error:error, message:"Something went wrong"});
                        res.sendStatus(500)
                    })
            }
        }); */
}

const updatePyrate = (req,res) => {
    Pyrate.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500);
        })
}

const deletePyrate = (req,res) => {
    Pyrate.deleteOne({_id:req.params.id})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(202);
        })
}

module.exports = {findPyrate, findSinglePyrate, createPyrate, updatePyrate, deletePyrate};