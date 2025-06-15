# Quotation System API Documentation

## Base URL
```
{base_url}/api
```

## Authentication
All admin routes require a JWT token in the Authorization header:
```
Authorization: Bearer your-jwt-token
```

## Authentication APIs

### Sign Up
Create a new user account.

```http
POST /auth/signup

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"  // or "user"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    },
    "token": "jwt_token"
  }
}
```

### Login
```http
POST /auth/login

Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    },
    "token": "jwt_token"
  }
}
```

## Product APIs

### Get All Products (Public)
```http
GET /products
GET /products?category=electronics
GET /products?inStock=true

Response:
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "imageUrl": "https://example.com/images/product.jpg",
      "price": 99.99,
      "category": "electronics",
      "specifications": [
        { "key": "Color", "value": "Black" }
      ],
      "inStock": true,
      "discount": {
        "percentage": 10,
        "validUntil": "2025-12-31T23:59:59.999Z"
      },
      "finalPrice": 89.99
    }
  ]
}
```

### Admin Product APIs

Product objects include the following fields:
- `name`: Required, string
- `description`: Required, string
- `imageUrl`: Optional, string (valid URL)
- `price`: Required, number (non-negative)
- `category`: Required, string
- `specifications`: Array of key-value pairs
- `inStock`: Boolean, defaults to true
- `discount`: Object with percentage and validUntil date

#### Create Product (Admin)
```http
POST /admin/products

Request:
{
  "name": "New Product",
  "description": "Product Description",
  "imageUrl": "https://example.com/images/product.jpg",
  "price": 99.99,
  "category": "electronics",
  "specifications": [
    { "key": "Color", "value": "Black" }
  ],
  "discount": {
    "percentage": 10,
    "validUntil": "2025-12-31T23:59:59.999Z"
  }
}

Response:
{
  "success": true,
  "data": {
    // Created product object
  }
}
```

#### Update Product (Admin)
```http
PUT /admin/products/{product_id}

Request:
{
  "price": 89.99,
  "inStock": false
}

Response:
{
  "success": true,
  "data": {
    // Updated product object
  }
}
```

#### Delete Product (Admin)
```http
DELETE /admin/products/{product_id}

Response:
{
  "success": true,
  "data": {}
}
```

## Customer APIs (Admin Only)

### Create Customer
```http
POST /admin/customers

Request:
{
  "name": "John Doe",
  "company": "Acme Corp",
  "email": "john@example.com",
  "contactNo": "+1-555-123-4567",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "dob": "1990-01-01"
}

Response:
{
  "success": true,
  "data": {
    // Created customer object with calculated age
  }
}
```

### Get All Customers
```http
GET /admin/customers
GET /admin/customers?search=john
GET /admin/customers?sort=name&order=asc

Response:
{
  "success": true,
  "data": [
    {
      "_id": "customer_id",
      "name": "John Doe",
      "company": "Acme Corp",
      "email": "john@example.com",
      "contactNo": "+1-555-123-4567",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "dob": "1990-01-01",
      "age": 35
    }
  ]
}
```

### Update Customer
```http
PUT /admin/customers/{customer_id}

Request:
{
  "contactNo": "+1-555-999-8888",
  "company": "New Company LLC"
}

Response:
{
  "success": true,
  "data": {
    // Updated customer object
  }
}
```

### Delete Customer
```http
DELETE /admin/customers/{customer_id}

Response:
{
  "success": true,
  "data": {}
}
```

## Quotation APIs (Admin Only)

### Create Quotation
```http
POST /admin/quotations

Request:
{
  "customer": "customer_id",
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "additionalDiscount": 5
    }
  ],
  "notes": "Special requirements",
  "termsAndConditions": "Payment terms: Net 30"
}

Response:
{
  "success": true,
  "data": {
    "_id": "quotation_id",
    "customer": {
      // Full customer details
    },
    "items": [
      {
        "product": {
          // Full product details including price
        },
        "quantity": 2,
        "additionalDiscount": 5
      }
    ],
    "status": "draft",
    "subtotal": 199.98,
    "totalDiscount": 29.99,
    "total": 169.99,
    "validUntil": "2025-07-15T00:00:00.000Z"
  }
}
```

### Get All Quotations
```http
GET /admin/quotations
GET /admin/quotations?status=draft
GET /admin/quotations?customerId=customer_id

Response:
{
  "success": true,
  "data": [
    // Array of quotation objects with populated customer and product details
  ]
}
```

### Update Quotation
```http
PUT /admin/quotations/{quotation_id}

Request:
{
  "status": "sent",
  "items": [
    {
      "product": "product_id",
      "quantity": 3,
      "additionalDiscount": 10
    }
  ]
}

Response:
{
  "success": true,
  "data": {
    // Updated quotation object with new calculations
  }
}
```

### Delete Quotation
```http
DELETE /admin/quotations/{quotation_id}

Response:
{
  "success": true,
  "data": {}
}
```

## Error Responses
All APIs return errors in this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden (Not Admin)
- 404: Not Found
- 405: Method Not Allowed
- 500: Internal Server Error
