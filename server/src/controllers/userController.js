import { UserModel } from "../models/user.js";

const getCart = async (req, res) => {
  const user_ID = req.id;

  console.log(" user_ID " + user_ID);

  try {
    const info = await UserModel.findById(user_ID)
      .populate({
        path: "cart",
        select: "name image price ",
      })
      .exec();

    console.log(" il cart " + info);

    return res.status(200).json({ info });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error on getCart" });
  }
};

const getPurchases = async (req, res) => {
  const  user_ID  = req.id;

  try {
   const content = await UserModel.findById(user_ID)
     .populate({
       path: "purchases",
       select: "date",
       populate: {
         path: "product",
         select: "name price image",
       },
     })
     .select("-cart -username -password")
     .exec();


      console.log("ecco i purchases" + content)

   
      return res.status(201).json({ content });
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal server error on getPurchases" });
  }
};

const getUserInfos = async (req,res) =>{
   const user_ID = req.id;

  const user = await UserModel.findById(user_ID);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exists" });
  }

  const userData = {
    address : user.address,
    city : user.city,
    creditcard : user.creditcard
  }

  return res.status(201).json({userData})
}

export { getCart, getPurchases, getUserInfos };
