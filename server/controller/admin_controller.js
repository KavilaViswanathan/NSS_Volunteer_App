const {adminSignUp,volunteerActivity} = require('../modules/admin_modules')

module.exports.signin = async(req,res)=>{
    try{
        const admin = await adminSignUp.findOne({admin_email:req.params.admin_email});
        if(admin){
            if((admin.admin_email === req.params.admin_email) && (admin.admin_password === req.params.admin_password)){
                curr_stud = admin;
                res.send(admin);
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
module.exports.signUpAdmin = async(req,res)=>{
    const{admin_name,admin_dept,admin_email,admin_phoneNum,admin_password}= req.body;

    try{
        const task = await adminSignUp.create({admin_name,admin_dept,admin_email,admin_phoneNum,admin_password});
        res.status(200).json(task);
    }
    catch(e){
        res.status(400).json({error: e.message});
    }
}
module.exports.insertVolunteer = async(req,res)=>{
    const{vol_id,startDate,endDate,location,activity,slot_available,createdAt} = req.body;
    try{
        const task = await volunteerActivity.create({vol_id,startDate,endDate,location,activity,slot_available,createdAt});
        res.status(200).json(task);
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
}

module.exports.getVolunteer = async(req,res)=>{
    try{
        const getvol = await volunteerActivity.find({})
        res.status(200).json(getvol)
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}
module.exports.UpdateVolunteer = async (req, res) => {
    const { vol_id } = req.params;
    try {
        const update = await volunteerActivity.findOneAndUpdate({ vol_id }, { ...req.body }, { new: true });
        if (!update) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.status(200).json(update);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports.deleteVol = async (req, res) => {
    const { vol_id } = req.params;
    
    try {
        const deleteVol = await volunteerActivity.findOneAndDelete({ vol_id });
        if (!deleteVol) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.status(200).json(deleteVol);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
