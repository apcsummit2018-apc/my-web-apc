# Admin Panel Setup Guide

## Creating an Admin Account

To access the admin panel and manage products, you need to create a user account in Supabase.

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User** (or **Invite**)
4. Enter:
   - Email address (e.g., admin@asokeprasanmit.com)
   - Password (create a strong password)
5. Click **Create User** or **Send Invitation**

### Method 2: Using SQL

Run this SQL in your Supabase SQL Editor:

```sql
-- This will be handled through Supabase Auth UI
-- Use the dashboard method above instead
```

## Accessing the Admin Panel

1. Open the website
2. Navigate to `/admin` or click "Admin" in the header
3. Enter your admin email and password
4. Click "Sign In"
5. You'll be redirected to `/admin/dashboard`

## Admin Panel Features

### Product Management

**View Products:**
- See all products in a table format
- View product images, names, prices, stock levels
- Filter by category
- Check featured and active status

**Add New Product:**
1. Click the green "Add Product" button
2. Fill in the form:
   - Product Name (required)
   - Description
   - Price in Thai Baht (required)
   - Stock Quantity (required)
   - Category (required)
   - Image URL (required) - Use Pexels URLs
   - Featured checkbox - Shows on homepage
   - Active checkbox - Shows in shop
3. Click "Add Product"

**Edit Product:**
1. Click the blue edit icon on any product row
2. Update the fields you want to change
3. Click "Update Product"

**Delete Product:**
1. Click the red trash icon on any product row
2. Confirm the deletion
3. Product will be permanently removed

### Image URLs

For product images, use high-quality stock photos from Pexels:
- Visit https://www.pexels.com
- Search for relevant images (e.g., "laptop", "keyboard", "monitor")
- Right-click on an image and select "Copy Image Address"
- Paste the URL in the Image URL field

Example URLs already used:
- `https://images.pexels.com/photos/7640443/pexels-photo-7640443.jpeg`
- `https://images.pexels.com/photos/18105/pexels-photo.jpg`

## Default Categories

The system comes with these product categories:
1. Laptops & Computers
2. Networking Equipment
3. Peripherals
4. Storage Solutions
5. Software & Licenses

## Tips

- **Featured Products:** Check "Featured" to display products on the homepage
- **Active/Inactive:** Uncheck "Active" to hide products without deleting them
- **Stock Management:** Update stock quantity as products are sold
- **Pricing:** Enter prices without currency symbols (just numbers)
- **Image Quality:** Use high-resolution images for best appearance

## Security

- Never share your admin credentials
- Use a strong, unique password
- Log out when finished managing products
- The admin panel is protected by Supabase authentication
- All admin actions require authentication

## Logout

Click the "Sign Out" button in the top-right corner of the dashboard when you're done.

## Troubleshooting

**Can't log in?**
- Check your email and password are correct
- Verify the user was created in Supabase Dashboard
- Check browser console for errors

**Images not showing?**
- Verify the URL is accessible
- Use direct image URLs (not webpage URLs)
- Ensure the URL starts with `https://`

**Need Help?**
Refer to PROJECT_DOCUMENTATION.md for complete technical details.
