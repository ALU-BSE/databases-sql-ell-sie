import User from "./users.js"
import { Product }from "./products.js"
import { Transaction } from "./transactions.js"




// async function createProduct() {
//     const johnDoe = await User.find({name: "John Doe"})
//     console.log(johnDoe)
//     Product.create([{name: "Laptop", description: "MacBook", prise: 1000, userId: johnDoe._id}])

//     const laptop = await new Product({
//         name: "Ipad",
//         description: "High-performance laptop",
//         price: 1200,
//         userId: johnDoe._id
//     });
//     await laptop.save();
//     createTransaction()
// } 

// createProduct()

// // Create product



// // create transaction
// async function createTransaction() {
//     const laptop = await Product.find({name: "Laptop"})
//     console.log(laptop)

//     const transaction = await new Transaction({
//         buyerId: johnDoe._id,
//         productId: laptop._id,
//         quantity: 2
//     });
//     await transaction.save();
// }

