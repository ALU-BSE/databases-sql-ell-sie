import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Techshop")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const { Schema } = mongoose;

  // User Schema
  const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
  });
  
  // Index on name field of users collection
  userSchema.index({ name: 1 });

const User = mongoose.model('User', userSchema);

// Insert sample data into users collection
const user1 = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  });
  
  const user2 = new User({
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'pass456'
  });
  
  await user1.save();
  await user2.save();

    // Product Schema
    const productSchema = new Schema({
        name: String,
        description: String,
        price: Number,
        user: { type: Schema.Types.ObjectId, ref: 'User' }
      });
    
    const Product = mongoose.model('Product', productSchema);
  
  // Insert sample data into products collection
  const product1 = new Product({
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1200,
    user: user1._id
  });
  
  const product2 = new Product({
    name: 'Smartphone',
    description: 'Latest smartphone model',
    price: 800,
    user: user2._id
  });
  
  await product1.save();
  await product2.save();

    // Transaction Schema
    const transactionSchema = new Schema({
        buyer: { type: Schema.Types.ObjectId, ref: 'User' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        date: Date,
        quantity: Number
      });
      const Transaction = mongoose.model('Transaction', transactionSchema);
  // Insert sample data into transactions collection
  const transaction1 = new Transaction({
    buyer: user2._id,
    product: product1._id,
    date: new Date(),
    quantity: 1
  });
  
  const transaction2 = new Transaction({
    buyer: user1._id,
    product: product2._id,
    date: new Date(),
    quantity: 2
  });
  
  await transaction1.save();
  await transaction2.save();  

  const productsByUser = await Product.find({ user: user1._id });
  console.log("all products listed by a specific user:",productsByUser)

  const totalAmount = await Transaction.aggregate([
    { $match: { buyer: user1._id } },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: { $multiply: ['$product.price', '$quantity'] }
        }
      }
    }
  ]);

  console.log("total amount spent by a specific user:",totalAmount)

  const topProducts = await Transaction.aggregate([
    {
      $group: {
        _id: '$product',
        totalTransactions: { $sum: '$quantity' }
      }
    },
    { $sort: { totalTransactions: -1 } },
    { $limit: 5 }
  ]);
  
  console.log("the top 5 most popular products", topProducts)
