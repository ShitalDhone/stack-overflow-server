import Questions from '../models/Questions.js'
import mongoose from 'mongoose';

export const postAnswer = async (req, res) => {

    const {id : _id} = req.params;

    const {noOfAnswers, answerBody, userAnswered, userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){

      return  res.status(404).send("question unavailaible");
    }

    updatedNoofQuestion(_id, noOfAnswers)

    try {

        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{answerBody,  userAnswered, userId}] }})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error)
        
    }

}


 const updatedNoofQuestion = async (_id, noOfAnswers) =>{

    try {

        await Questions.findByIdAndUpdate(_id, { $set: {'noOfAnswers': noOfAnswers}})
        
        
    } catch (error) {
        console.log(error)
        
    }
}



export const deleteAnswer = async (req, res) => {

    const {id: _id} = req.params;

    const {answerId, noOfAnswers} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
         return  res.status(404).send("question unavailaible");
    }


    if(!mongoose.Types.ObjectId.isValid(_id)){
        return  res.status(404).send("Answer unavailaible");
   }


   updatedNoofQuestion(_id, noOfAnswers)

   try {

  await Questions.updateOne(
    { _id },
    {$pull : {'answer': {_id: answerId}}}
  )

  res.status(200).json({message: " successfully deleted...."})
   } catch (error) {

    res.status(405).json(error)
    
   }


}