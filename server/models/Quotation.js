import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer is required']
  },
  items: [{    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    // We'll use product's existing discount if available
    additionalDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Additional discount cannot be negative'],
      max: [100, 'Additional discount cannot exceed 100']
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
    default: 'draft'
  },
  validUntil: {
    type: Date,
    required: true,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) // 30 days from creation
  },
  notes: {
    type: String,
    trim: true
  },
  termsAndConditions: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before save
quotationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate totals
quotationSchema.virtual('subtotal').get(function() {
  return this.populated('items.product') ? 
    this.items.reduce((total, item) => {
      return total + (item.quantity * item.product.price);
    }, 0) : 0;
});

quotationSchema.virtual('totalDiscount').get(function() {
  if (!this.populated('items.product')) return 0;
  
  return this.items.reduce((total, item) => {
    const productDiscount = item.product.discount?.percentage || 0;
    const combinedDiscount = productDiscount + (item.additionalDiscount || 0);
    return total + (item.quantity * item.product.price * (combinedDiscount / 100));
  }, 0);
});

quotationSchema.virtual('total').get(function() {
  return this.subtotal - this.totalDiscount;
});

// Ensure virtuals are included when converting to JSON
quotationSchema.set('toJSON', { virtuals: true });
quotationSchema.set('toObject', { virtuals: true });

export default mongoose.models.Quotation || mongoose.model('Quotation', quotationSchema);
