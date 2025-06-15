import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative'],
  },
  discount: {
    percentage: {
      type: Number,
      min: [0, 'Discount percentage cannot be negative'],
      max: [100, 'Discount percentage cannot exceed 100'],
      default: 0
    },
    validUntil: {
      type: Date,
      default: null
    }
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    trim: true,
  },
  specifications: [{
    key: String,
    value: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Calculate final price with discount
productSchema.methods.getFinalPrice = function() {
  if (!this.discount || !this.discount.percentage) return this.price;
  
  // Check if discount is expired
  if (this.discount.validUntil && new Date() > this.discount.validUntil) {
    return this.price;
  }
  
  return this.price * (1 - this.discount.percentage / 100);
};

// Add virtual field for final price
productSchema.virtual('finalPrice').get(function() {
  return this.getFinalPrice();
});

// Ensure virtuals are included when converting to JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
