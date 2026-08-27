# Real Estate Full-Stack Application

## 1. Product Vision

Build a premium, production-ready real estate platform for discovering, comparing, saving, and enquiring about properties.

The application should feel like a real commercial product rather than a basic property-listing template.

### Design Direction

- Premium and modern
- Minimal but visually rich
- Editorial + fintech-inspired aesthetic
- Large, high-quality property photography
- Generous whitespace
- Elegant typography
- Subtle glassmorphism where appropriate
- Smooth micro-interactions and page transitions
- Fully responsive across desktop, tablet, and mobile
- Accessibility-first components
- Fast loading and SEO-friendly

---

# 2. User Types

## Guest

Guests can:

- Browse properties
- Search properties
- Filter listings
- View property details
- Explore locations
- View agent profiles
- Use the EMI calculator
- Compare limited properties
- Contact agents
- Schedule enquiries

## Registered User

Registered users can additionally:

- Save/favourite properties
- Compare properties
- Save searches
- Receive search alerts
- Manage their profile
- Track enquiries
- Track scheduled visits
- Contact agents
- Manage their own property listings if enabled as a seller

## Agent

Agents can:

- Create and manage property listings
- Upload property images/videos
- Manage listing information
- Receive leads
- Respond to enquiries
- Manage property visits
- View listing analytics
- Manage their public profile

## Administrator

Administrators can:

- Manage users
- Manage agents
- Approve/reject properties
- Manage listings
- Manage enquiries
- Manage locations
- Manage featured properties
- Manage amenities
- Manage content
- View platform analytics
- Configure application settings

---

# 3. Core Features

## Property Discovery

- Global property search
- Buy / Rent toggle
- Location autocomplete
- Property type filters
- Price range
- Bedroom count
- Bathroom count
- Area range
- Furnishing status
- Property age
- Availability
- Amenities
- Parking
- Floor
- Facing
- Possession status
- Sort by price
- Sort by newest
- Sort by relevance
- Map-based discovery

## Property Listing

Every property should support:

- Property title
- Price
- Location
- Property type
- Listing type
- Bedrooms
- Bathrooms
- Area
- Floor
- Total floors
- Parking
- Furnishing
- Property age
- Facing
- Possession status
- Description
- Amenities
- Images
- Videos
- Floor plans
- Location coordinates
- Agent information
- Verification status
- Listing status

## User Features

- Authentication
- User profile
- Favourites
- Saved searches
- Property comparison
- Enquiry history
- Visit history
- Notifications
- Search alerts

## Agent Features

- Agent profile
- Agency information
- Property management
- Lead management
- Visit management
- Listing analytics
- Contact information

## Communication

- Enquiry form
- Contact agent
- Call action
- WhatsApp action
- Email enquiry
- Visit scheduling
- Optional in-app messaging

---

# 4. Main Pages

## Public Pages

### Home

Sections:

1. Navigation
2. Hero
3. Property search
4. Property types
5. Featured properties
6. Popular locations
7. Recently added properties
8. Why choose us
9. Agent/agency section
10. CTA
11. Footer

### Property Search

Features:

- Search bar
- Advanced filters
- Sort
- List/grid toggle
- Map view
- Pagination/infinite scroll
- Property cards
- Save property
- Compare property

### Property Details

Sections:

- Image gallery
- Video/virtual tour
- Property summary
- Price
- Key specifications
- Description
- Amenities
- Floor plan
- Location
- Map
- Nearby places
- Agent information
- Enquiry form
- Schedule visit
- Similar properties

### Agent Profile

Include:

- Agent photo
- Name
- Agency
- Experience
- Contact options
- About
- Active listings
- Reviews
- Performance indicators

### Locations

Include:

- Popular cities
- Localities
- Average prices
- Property counts
- Popular property types
- Locality highlights

### Compare

Allow users to compare:

- Price
- Area
- Bedrooms
- Bathrooms
- Parking
- Floor
- Amenities
- Location
- Property type
- Furnishing

### EMI Calculator

Inputs:

- Property price
- Down payment
- Loan amount
- Interest rate
- Loan tenure

Outputs:

- Monthly EMI
- Total interest
- Total payment
- Amortization summary

---

# 5. Authentication

Support:

- Email/password
- Google login
- Forgot password
- Email verification
- Session management
- Role-based access control

Recommended authentication options:

- Auth.js
- Clerk

---

# 6. User Dashboard

## Dashboard

Show:

- Saved properties
- Recent searches
- Upcoming visits
- Recent enquiries
- Recommended properties

## Saved Properties

Users can:

- Favourite/unfavourite
- Remove properties
- Compare
- Contact agent

## Saved Searches

Users can:

- Save filter combinations
- Rename searches
- Delete searches
- Enable/disable alerts

## Visits

Show:

- Property
- Agent
- Date
- Time
- Status
- Reschedule option
- Cancel option

## Enquiries

Show:

- Property
- Agent
- Date
- Status
- Last interaction

---

# 7. Agent Dashboard

## Overview

Metrics:

- Total listings
- Active listings
- Total views
- Leads
- Scheduled visits
- Conversion rate

## Property Management

Agents can:

- Create property
- Edit property
- Delete property
- Publish/unpublish
- Upload images
- Upload videos
- Add floor plans
- Manage amenities
- Update availability

## Lead Management

Lead statuses:

- New
- Contacted
- Qualified
- Visit scheduled
- Negotiation
- Converted
- Closed
- Lost

## Visit Management

Agents can:

- Accept visit
- Reject visit
- Reschedule
- Mark completed
- Add notes

---

# 8. Admin Dashboard

## Overview

Display:

- Total users
- Total agents
- Total properties
- Active listings
- Pending approvals
- Total enquiries
- Scheduled visits
- Revenue if monetization is enabled

## User Management

Admin can:

- View users
- Search users
- Suspend users
- Delete users
- Change roles

## Property Moderation

Admin can:

- Review properties
- Approve listings
- Reject listings
- Request changes
- Feature listings
- Remove listings

## Agent Management

Admin can:

- Verify agents
- Approve agencies
- Suspend agents
- Review agent listings

---

# 9. Database Architecture

Recommended database:

**PostgreSQL**

Recommended ORM:

**Prisma**

## Core Models

### User

```text
id
name
email
passwordHash
role
avatar
phone
createdAt
updatedAt
```

### Agent

```text
id
userId
agencyId
bio
experience
licenseNumber
verified
createdAt
updatedAt
```

### Agency

```text
id
name
logo
description
website
phone
email
address
createdAt
updatedAt
```

### Property

```text
id
agentId
title
slug
description
propertyType
listingType
price
area
bedrooms
bathrooms
parking
floor
totalFloors
furnishing
propertyAge
facing
possessionStatus
address
city
locality
latitude
longitude
status
verificationStatus
featured
createdAt
updatedAt
```

### PropertyImage

```text
id
propertyId
url
alt
sortOrder
createdAt
```

### Amenity

```text
id
name
icon
```

### PropertyAmenity

```text
propertyId
amenityId
```

### Favourite

```text
id
userId
propertyId
createdAt
```

### SavedSearch

```text
id
userId
name
filters
alertsEnabled
createdAt
updatedAt
```

### Enquiry

```text
id
userId
propertyId
agentId
message
status
createdAt
updatedAt
```

### Visit

```text
id
userId
propertyId
agentId
scheduledAt
status
notes
createdAt
updatedAt
```

### Review

```text
id
userId
agentId
rating
comment
createdAt
```

### Notification

```text
id
userId
type
title
message
read
createdAt
```

---

# 10. API Architecture

Use REST or a well-structured server-action/API approach.

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## Properties

```text
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id
```

## Search

```text
GET /api/search/properties
GET /api/search/locations
GET /api/search/agents
```

## Favourites

```text
GET    /api/favourites
POST   /api/favourites/:propertyId
DELETE /api/favourites/:propertyId
```

## Enquiries

```text
GET  /api/enquiries
POST /api/enquiries
PATCH /api/enquiries/:id
```

## Visits

```text
GET  /api/visits
POST /api/visits
PATCH /api/visits/:id
DELETE /api/visits/:id
```

## Admin

```text
GET   /api/admin/users
GET   /api/admin/properties
PATCH /api/admin/properties/:id/approve
PATCH /api/admin/properties/:id/reject
```

---

# 11. Recommended Tech Stack

## Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Backend

- Next.js API routes/server actions
- Node.js runtime where required

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- Auth.js or Clerk

## File Storage

- Cloudinary
- Supabase Storage

## Maps

- Mapbox or Google Maps

## Search

Start with:

- PostgreSQL full-text search
- PostgreSQL indexes

Scale later to:

- Algolia
- Elasticsearch/OpenSearch

## Deployment

- Vercel
- Supabase/PostgreSQL
- Cloudinary

---

# 12. Component System

Create reusable components instead of page-specific UI.

## Navigation

- Navbar
- Mobile navigation
- User menu
- Search header

## Property

- PropertyCard
- PropertyGrid
- PropertyGallery
- PropertySpecs
- AmenityGrid
- PropertyMap
- SimilarProperties
- PropertyComparison

## Forms

- SearchForm
- PropertyForm
- EnquiryForm
- VisitForm
- ProfileForm

## UI

- Button
- Input
- Select
- Modal
- Drawer
- Dropdown
- Tabs
- Toast
- Skeleton
- Pagination
- EmptyState
- ErrorState

---

# 13. Property Card

A premium property card should include:

- Large image
- Property type badge
- Featured/verified badge
- Favourite button
- Compare button
- Price
- Property name
- Location
- Bedrooms
- Bathrooms
- Area
- Agent/agency
- Optional price trend

Example:

```text
┌─────────────────────────────┐
│                             │
│       PROPERTY IMAGE        │
│                             │
│  FOR SALE          ♡        │
├─────────────────────────────┤
│ ₹1.85 Cr                    │
│ Modern 3 BHK Apartment      │
│ Salt Lake, Kolkata          │
│                             │
│ 3 Beds  • 2 Baths • 1250ft²│
│                             │
│ Rahul Sharma         →      │
└─────────────────────────────┘
```

---

# 14. Search Experience

Search should be one of the strongest parts of the application.

## Basic Search

```text
[ Buy ] [ Rent ]

Where?
[ Search city, locality or landmark ]

Property type
[ Apartment ▼ ]

Budget
[ Min ] — [ Max ]

[ Search Properties ]
```

## Advanced Filters

- Price
- Area
- Bedrooms
- Bathrooms
- Property type
- Furnishing
- Parking
- Amenities
- Floor
- Possession
- Property age
- Verified listings

Filters should update results without unnecessarily reloading the entire page.

---

# 15. Map Experience

Search results should support:

```text
┌──────────────────┬─────────────────────────────┐
│                  │                             │
│  PROPERTY LIST   │          MAP                │
│                  │                             │
│  Property Card   │      ₹1.2 Cr                │
│  Property Card   │             ₹85L            │
│  Property Card   │   ₹2.4 Cr                   │
│  Property Card   │                             │
│                  │                             │
└──────────────────┴─────────────────────────────┘
```

Map markers should show approximate property prices.

Clicking a marker should highlight the corresponding property card.

---

# 16. Notifications

Support:

- New enquiry
- Visit confirmation
- Visit reminder
- Visit reschedule
- Saved search match
- Property approval
- Property rejection
- Agent response

Delivery channels can include:

- In-app
- Email
- Optional WhatsApp/SMS

---

# 17. SEO

Every public property should have:

- SEO-friendly slug
- Dynamic title
- Meta description
- Open Graph image
- Structured data
- Canonical URL

Use real estate structured data where appropriate.

Generate:

- Sitemap
- Robots.txt
- Dynamic property metadata
- Location landing pages

Example:

```text
/properties/modern-3bhk-apartment-salt-lake
/buy/kolkata
/buy/kolkata/salt-lake
/rent/kolkata
/agents/rahul-sharma
```

---

# 18. Performance

Target:

- Fast initial load
- Optimized images
- Lazy loading
- Responsive image sizes
- Server-side rendering where useful
- Streaming where appropriate
- Cached search results where appropriate
- Database indexes for common filters

Avoid:

- Huge client-side bundles
- Unoptimized images
- Excessive animation
- Unnecessary API requests

---

# 19. Security

Implement:

- Password hashing
- Secure sessions
- Role-based access control
- Input validation
- Server-side authorization
- Rate limiting
- CSRF protection where applicable
- File upload validation
- Image type/size validation
- SQL injection protection through ORM
- XSS protection
- Secure HTTP headers
- Audit logs for administrative actions

Never trust role information supplied by the client.

---

# 20. Image Upload System

Property uploads should support:

- Multiple images
- Drag and drop
- Reordering
- Image preview
- Cover image selection
- Compression
- Automatic optimization
- Alt text
- Video uploads
- Floor-plan uploads

Recommended flow:

```text
Browser
   ↓
Upload validation
   ↓
Cloud storage
   ↓
Image URL
   ↓
Database
   ↓
Property listing
```

---

# 21. Property Verification

Listings should have statuses such as:

```text
DRAFT
PENDING_REVIEW
APPROVED
REJECTED
EXPIRED
SOLD
RENTED
ARCHIVED
```

Only approved listings should appear publicly.

---

# 22. Analytics

Track:

- Property views
- Search queries
- Favourite actions
- Compare actions
- Enquiries
- Visit bookings
- Agent responses
- Conversion rates

Agent analytics:

```text
Views
  ↓
Property interactions
  ↓
Enquiries
  ↓
Visits
  ↓
Conversions
```

---

# 23. Recommended Folder Structure

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── properties/
│   │   ├── buy/
│   │   ├── rent/
│   │   ├── agents/
│   │   └── locations/
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── favourites/
│   │   ├── searches/
│   │   ├── enquiries/
│   │   └── visits/
│   │
│   ├── agent/
│   │   ├── page.tsx
│   │   ├── properties/
│   │   ├── leads/
│   │   └── visits/
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── properties/
│   │   ├── agents/
│   │   └── settings/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── property/
│   ├── search/
│   ├── dashboard/
│   └── navigation/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── search/
│   ├── maps/
│   ├── storage/
│   └── validations/
│
├── prisma/
│   └── schema.prisma
│
└── types/
```

---

# 24. Design System

## Typography

Recommended:

- Primary: Inter
- Display/headings: Poppins or a refined editorial serif pairing

## Principles

- Strong visual hierarchy
- Large headlines
- Compact supporting metadata
- Consistent spacing
- 8px spacing system
- Rounded but not overly playful cards
- High-quality photography
- Clear CTAs

## Motion

Use animation for:

- Page transitions
- Card hover
- Image gallery
- Filter drawer
- Modal transitions
- Map interactions
- Dashboard transitions

Animations should remain subtle and purposeful.

---

# 25. Home Page Concept

```text
NAVIGATION
────────────────────────────────────────

             FIND A PLACE
             THAT FEELS LIKE HOME.

        [ Buy ] [ Rent ]

      [ 📍 Search location...      🔍 ]

             [ Explore ]

          HERO PROPERTY IMAGE

────────────────────────────────────────

EXPLORE PROPERTY TYPES

[ Apartments ] [ Villas ] [ Plots ] [ Commercial ]

────────────────────────────────────────

FEATURED PROPERTIES

[ Property ] [ Property ] [ Property ]

────────────────────────────────────────

POPULAR LOCATIONS

[ Kolkata ] [ Mumbai ] [ Delhi ] [ Bangalore ]

────────────────────────────────────────

WHY CHOOSE US

Verified listings
Trusted agents
Smart property discovery

────────────────────────────────────────

READY TO FIND YOUR NEXT HOME?

[ Explore Properties ]

────────────────────────────────────────

FOOTER
```

---

# 26. Property Detail Concept

```text
← Back to properties

┌──────────────────────────────────────────┐
│                                          │
│             PROPERTY GALLERY             │
│                                          │
└──────────────────────────────────────────┘

₹1.85 Cr
Modern 3 BHK Apartment

Salt Lake, Kolkata

♡ Save     ⇄ Compare

──────────────────────────────────────────

1250 sq.ft    3 Beds    2 Baths
2 Parking     Ready     East Facing

──────────────────────────────────────────

ABOUT THIS PROPERTY

Description...

──────────────────────────────────────────

AMENITIES

✓ Swimming Pool
✓ Gym
✓ Parking
✓ Security
✓ Clubhouse

──────────────────────────────────────────

LOCATION

              [ MAP ]

──────────────────────────────────────────

LISTED BY

Agent information

[ Chat ] [ Call ] [ Schedule Visit ]

──────────────────────────────────────────

SIMILAR PROPERTIES

[ Property ] [ Property ] [ Property ]
```

---

# 27. Development Roadmap

## Phase 1 — Foundation

- Initialize Next.js
- Configure TypeScript
- Configure Tailwind
- Configure component system
- Set up PostgreSQL
- Set up Prisma
- Create environment configuration
- Set up authentication

## Phase 2 — Design System

- Typography
- Colors
- Spacing
- Buttons
- Cards
- Forms
- Navigation
- Responsive layout
- Motion system

## Phase 3 — Public Experience

- Homepage
- Search
- Property listing
- Property detail
- Agent profiles
- Location pages
- Compare
- EMI calculator

## Phase 4 — Backend

- Database schema
- Property CRUD
- User management
- Agent management
- Enquiries
- Visits
- Favourites
- Saved searches

## Phase 5 — Dashboards

- User dashboard
- Agent dashboard
- Admin dashboard

## Phase 6 — Advanced Features

- Maps
- Image upload
- Search optimization
- Notifications
- Analytics
- Recommendations
- Verification workflow

## Phase 7 — Production

- SEO
- Security audit
- Performance optimization
- Error handling
- Loading states
- Empty states
- Accessibility
- Testing
- Deployment
- Monitoring

---

# 28. Testing Strategy

## Unit Tests

Test:

- Search filters
- Price calculations
- EMI calculation
- Validation
- Permissions

## Integration Tests

Test:

- Authentication
- Property creation
- Enquiry flow
- Visit scheduling
- Favourite system
- Agent workflows

## E2E Tests

Critical flows:

```text
User registration
        ↓
Property search
        ↓
Property details
        ↓
Favourite
        ↓
Contact agent
        ↓
Schedule visit
```

Agent flow:

```text
Agent login
    ↓
Create listing
    ↓
Upload images
    ↓
Submit for approval
    ↓
Admin approval
    ↓
Listing becomes public
```

---

# 29. Production Quality Checklist

Before launch:

- [ ] Responsive design
- [ ] Authentication works
- [ ] Role permissions work
- [ ] Property CRUD works
- [ ] Search works
- [ ] Filters work
- [ ] Map works
- [ ] Image upload works
- [ ] Favourites work
- [ ] Compare works
- [ ] Enquiries work
- [ ] Visit scheduling works
- [ ] Agent dashboard works
- [ ] Admin dashboard works
- [ ] Notifications work
- [ ] SEO metadata works
- [ ] Sitemap works
- [ ] Error states implemented
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Security reviewed
- [ ] Performance reviewed
- [ ] Accessibility reviewed
- [ ] Production environment configured
- [ ] Database backups configured
- [ ] Monitoring configured

---

# 30. Future Enhancements

Possible future features:

- AI property recommendations
- AI property search using natural language
- Property price prediction
- Locality price trends
- Mortgage integrations
- Digital document verification
- Virtual property tours
- 3D property tours
- Developer project pages
- Rental agreements
- Online booking
- Payment integration
- Agent CRM
- Property investment analytics
- WhatsApp automation
- Personalized home feed

---

# 31. Product Principle

The application should not feel like a collection of pages.

Every part of the product should connect into one coherent experience:

```text
DISCOVER
   ↓
SEARCH
   ↓
FILTER
   ↓
COMPARE
   ↓
SAVE
   ↓
ENQUIRE
   ↓
SCHEDULE VISIT
   ↓
CONNECT WITH AGENT
   ↓
CONVERT
```

The goal is to build a **production-grade real estate platform with a premium user experience, robust full-stack architecture, scalable database design, secure role management, and polished interactions.**
