# ASOKE PRASANMIT COMPUTER - Website Documentation

## Project Overview

A complete, production-ready website for ASOKE PRASANMIT COMPUTER.CO.,LTD - an IT Support business and computer shop. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Design

- **Primary Color:** Deep Blue (Trust/Corporate)
- **Secondary Color:** Tech Green (Innovation/Active)
- **Background:** Clean White
- **Modern, professional design with attention to detail**

## Features

### Public Pages

1. **Home** (`/`)
   - Hero section with professional banner
   - "Why Choose Us" section highlighting company strengths
   - Featured services showcase
   - Featured products carousel
   - Call-to-action sections

2. **Services** (`/services`)
   - Complete list of IT services
   - Service descriptions and pricing
   - Service process explanation
   - Contact call-to-action

3. **Shop** (`/shop`)
   - Product listing with category filtering
   - Search functionality
   - Stock status indicators
   - Product details with pricing

4. **About Us** (`/about`)
   - Company history and story
   - Core values
   - Statistics and achievements
   - Team certifications

5. **FAQ** (`/faq`)
   - Frequently asked questions
   - Category filtering
   - Expandable answers
   - Contact options

6. **Contact** (`/contact`)
   - Contact form (saves to database)
   - Google Maps integration
   - Contact information
   - Business hours

### Admin Panel

**Access:** `/admin`

**Features:**
- Secure login with Supabase authentication
- Product management dashboard
- Add new products
- Edit existing products
- Delete products
- Update product details:
  - Name
  - Description
  - Price
  - Stock quantity
  - Category
  - Image URL
  - Featured status
  - Active/Inactive status

## Database Structure

### Tables

1. **categories**
   - Product categorization
   - Pre-populated with 5 categories

2. **products**
   - Complete product information
   - Linked to categories
   - Stock management
   - Featured products flag

3. **services**
   - IT services offered
   - Pricing information
   - Display ordering

4. **contact_submissions**
   - Customer inquiries
   - Read/unread status

5. **faqs**
   - Frequently asked questions
   - Category grouping
   - Display ordering

## Getting Started

### Admin Setup

To create an admin user, use Supabase dashboard or SQL:

```sql
-- The admin panel uses Supabase Auth
-- Create an admin user through Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Enter email and password
```

### Admin Login

1. Navigate to `/admin`
2. Enter your email and password
3. Access the dashboard at `/admin/dashboard`

### Managing Products

1. **Add Product:**
   - Click "Add Product" button
   - Fill in all required fields
   - Use image URLs from Pexels or other sources
   - Check "Featured" to show on homepage
   - Click "Add Product"

2. **Edit Product:**
   - Click the edit icon on any product
   - Update fields as needed
   - Click "Update Product"

3. **Delete Product:**
   - Click the delete icon
   - Confirm deletion

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React
- **Build Tool:** Vite

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   └── ProductModal.tsx    # Add/Edit product modal
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── supabase.ts         # Supabase client & types
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Shop.tsx
│   ├── About.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   └── admin/
│       ├── Login.tsx       # Admin login
│       └── Dashboard.tsx   # Product management
├── App.tsx                 # Route configuration
└── main.tsx               # App entry point
```

## Sample Data

The database comes pre-populated with:
- 5 product categories
- 12 sample products
- 6 IT services
- 8 FAQs

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for active products, services, FAQs
- Authenticated-only access for admin operations
- Public insert for contact form submissions
- Secure authentication with Supabase

## Color Palette

- **Blue-900:** `#1e3a8a` (Primary headings)
- **Blue-600:** `#2563eb` (Primary buttons)
- **Green-500:** `#22c55e` (Secondary/Call-to-action)
- **Green-600:** `#16a34a` (Prices, highlights)
- **Gray-50:** `#f9fafb` (Backgrounds)
- **White:** `#ffffff` (Cards, content)

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly interface

## Contact Information Display

- **Address:** Asoke-Din Daeng Road, Bangkok 10400
- **Phone:** 02-123-4567
- **Email:** info@asokeprasanmit.com
- **Hours:** Mon-Sat: 9AM-6PM, Sun: By appointment

## Future Enhancements

Consider adding:
- Shopping cart functionality
- Online payment integration
- Customer accounts
- Service booking system
- Live chat support
- Blog/News section
- Email notifications for contact forms
- Advanced admin analytics

## Support

For technical issues or questions about the codebase, refer to the inline documentation in the source files.
