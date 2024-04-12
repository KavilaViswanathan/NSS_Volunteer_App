const {userSignUp,ActivityRegistration} =require('../modules/user_module')
const {volunteerActivity} = require('../modules/admin_modules')

module.exports.signin = async(req,res)=>{
    try{
        const user = await userSignUp.findOne({user_email:req.params.user_email});
        if(user){
            if((user.user_email === req.params.user_email) && (user.user_password === req.params.user_password)){
                curr_stud = user;
                res.send(user);
            }
            else{
                res.send({msg:"Password is incorrect"})
            }
        }
    }
    catch(e){
        res.status(400).json({error: e.message});
    }
}
module.exports.usersignup = async(req,res)=>{
    const {user_rollno,user_name,user_dept,user_year,user_email,user_password}=req.body;

    try{
        const task = await userSignUp.create({user_rollno,user_name,user_dept,user_year,user_email,user_password});
        res.status(200).json(task);
    }
    catch(e){
        res.status(400).json({error: e.message});
    }
}

module.exports.volunteerActivity = async (req, res) => {
    try {
        const { user_name, vol_id} = req.body;

        if (!user_name || !vol_id) {
            return res.status(400).json({ message: 'Both user_name and vol_id are required' });
        }

        // Find user by user_name
        const user = await userSignUp.findOne({ user_name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find activity by vol_id
        const activity = await volunteerActivity.findOne({ vol_id });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Check if user is already registered for the activity
        const existingRegistration = await ActivityRegistration.findOne({ userId: user._id, activityId: activity._id });
        if (existingRegistration) {
            return res.status(400).json({ message: 'User is already registered for this activity' });
        }

        // Create a new registration
        const registration = new ActivityRegistration({
            user_name: user_name,
            vol_id: vol_id
        });
        console.log(registration)
        // Update available slots in the activity
        activity.slot_available--;
        if(activity.slot_available==0){
            res.status(400).json({message: 'Activity is full, no slots available'})
        }

        await registration.save();
        await activity.save();

        res.status(201).json({ message: 'User registered for activity successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user for activity' });
    }
};

module.exports.getRegisteration = async(req,res)=>{
    try{
        const getreg = await ActivityRegistration.find({})
        res.status(200).json(getreg)
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}