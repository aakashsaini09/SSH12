import client from "../config/db";

export const userSignUp = async(req, res) =>{
    const {name, email, city } = req.body;
    try {
        await client.connect();
        const users = client.db('users');
        // check if user already exist?
        const checkUser = await users.findOne({email: email});
        if(checkUser){
            res.json({
                message: "User Already exist."
            })
        }
        const user = await users.insertOne({name: name, email: email, city: city})
        return res.json({
            message: "User Signed-Up successfully."
        })
    } catch (error) {
        res.json({
            message: "Error while signed-up. Error: ",
            error: error
        })
    }
}