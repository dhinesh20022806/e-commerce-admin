// import { Product } from "@/models/Product";
// import {mongooseConnect} from '@/lib/mongoose'

// export default async function handle(req, res){
//     res.json(req.method)

//     const {method} = req;
//     await mongooseConnect();
//     if(method === 'GET'){
//        console.log(method , ' from here')
//     console.log(await Product.find(), 'from api/product.js');
//     const data = await Product.find();
//     res.json(data)
//    }
//     if(method === 'POST') {
//         const {title, description, price} = req.body;
//     const productDoc = await  Product.create({
//         title, description, price,
//         })
//         res.json(productDoc)
//     }
// }

import { Product } from "@/models/Product";
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();
        
        if (method === 'GET') {

          if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
          }
          else{

            const data = await Product.find();
           res.json(data);
          }
        }
        
        if (method === 'POST') {
          const {title,description,price,images,category,properties} = req.body;
          const productDoc = await Product.create({
            title,description,price,images,category,properties,
          })
          res.json(productDoc);
        }

        if (method === 'PUT') {
          const {title,description,price,images,category,properties,_id} = req.body;
          await Product.updateOne({_id}, {title,description,price,images,category,properties});
          res.json(true);
        }
        
        if (method === 'DELETE') {
          if (req.query?.id) {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
          }
        }

        // Handle other HTTP methods if needed
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
