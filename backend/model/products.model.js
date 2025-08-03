import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
}},
{
    timestamps:true
}
)
const products= mongoose.model("Product",productSchema);
//products shouldbe p capital and singular becaus of mongoose take it as it
export default products;