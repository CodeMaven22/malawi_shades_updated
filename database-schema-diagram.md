# Malawi Shades Database Schema Diagram

```mermaid title="Malawi Shades Database Schema" type="diagram"
erDiagram
    REGIONS ||--o{ DISTRICTS : contains
    DISTRICTS ||--o{ ACCOMMODATIONS : located_in
    DISTRICTS ||--o{ TOURISM_SITES : located_in
    DISTRICTS ||--o{ EXPERIENCES : located_in
    
    ACCOMMODATION_TYPES ||--o{ ACCOMMODATIONS : categorizes
    ACCOMMODATIONS ||--o{ ACCOMMODATION_AMENITIES : has
    AMENITIES ||--o{ ACCOMMODATION_AMENITIES : belongs_to
    ACCOMMODATIONS ||--o{ ACCOMMODATION_MEDIA : has
    MEDIA ||--o{ ACCOMMODATION_MEDIA : belongs_to
    ACCOMMODATIONS ||--o{ ACCOMMODATION_AVAILABILITY : has
    
    TOURISM_CATEGORIES ||--o{ TOURISM_SITES : categorizes
    TOURISM_SITES ||--o{ TOURISM_SITE_MEDIA : has
    MEDIA ||--o{ TOURISM_SITE_MEDIA : belongs_to
    
    EXPERIENCE_CATEGORIES ||--o{ EXPERIENCES : categorizes
    EXPERIENCES ||--o{ EXPERIENCE_MEDIA : has
    MEDIA ||--o{ EXPERIENCE_MEDIA : belongs_to
    EXPERIENCES ||--o{ EXPERIENCE_AVAILABILITY : has
    
    ROLES ||--o{ USERS : has
    USERS ||--o{ USER_ADDRESSES : has
    MEDIA ||--o{ USERS : profile_image
    
    BOOKING_STATUSES ||--o{ ACCOMMODATION_BOOKINGS : status
    BOOKING_STATUSES ||--o{ TOURISM_SITE_BOOKINGS : status
    BOOKING_STATUSES ||--o{ EXPERIENCE_BOOKINGS : status
    
    USERS ||--o{ ACCOMMODATION_BOOKINGS : books
    ACCOMMODATIONS ||--o{ ACCOMMODATION_BOOKINGS : booked_by
    
    USERS ||--o{ TOURISM_SITE_BOOKINGS : books
    TOURISM_SITES ||--o{ TOURISM_SITE_BOOKINGS : booked_by
    
    USERS ||--o{ EXPERIENCE_BOOKINGS : books
    EXPERIENCES ||--o{ EXPERIENCE_BOOKINGS : booked_by
    EXPERIENCE_AVAILABILITY ||--o{ EXPERIENCE_BOOKINGS : scheduled_for
    
    PAYMENT_METHODS ||--o{ PAYMENTS : method
    PAYMENT_STATUSES ||--o{ PAYMENTS : status
    USERS ||--o{ PAYMENTS : made_by
    
    USERS ||--o{ REVIEWS : written_by
    REVIEWS ||--o{ REVIEW_MEDIA : has
    MEDIA ||--o{ REVIEW_MEDIA : belongs_to
    
    PAGE_CATEGORIES ||--o{ PAGES : categorizes
    USERS ||--o{ PAGES : created_by
    USERS ||--o{ PAGES : updated_by
    MEDIA ||--o{ PAGES : featured_image
    
    BLOG_CATEGORIES ||--o{ BLOG_POST_CATEGORIES : contains
    BLOG_POSTS ||--o{ BLOG_POST_CATEGORIES : belongs_to
    USERS ||--o{ BLOG_POSTS : created_by
    USERS ||--o{ BLOG_POSTS : updated_by
    MEDIA ||--o{ BLOG_POSTS : featured_image
    
    ADVERTISING_PACKAGES ||--o{ ADVERTISEMENTS : package
    ADVERTISING_FEATURES ||--o{ PACKAGE_FEATURES : feature
    ADVERTISING_PACKAGES ||--o{ PACKAGE_FEATURES : has
    USERS ||--o{ ADVERTISEMENTS : advertiser
    ADVERTISEMENTS ||--o{ ADVERTISEMENT_MEDIA : has
    MEDIA ||--o{ ADVERTISEMENT_MEDIA : belongs_to
    
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : permission
    ROLES ||--o{ ROLE_PERMISSIONS : has
    USERS ||--o{ ADMIN_ACTIVITY_LOGS : performed_by

