# Campus Lost & Found Web Application Design Document

### Contributors:
- Aditya More 

---

## Overview

On large university campuses, students often misplace items like keys, IDs, wallets, and water bottles. Traditional lost-and-found systems rely on physical offices or scattered online posts, making recovery inconvenient and uncoordinated.

The **Heel & Found** web application offers a **centralized, community-driven platform** where students can manually post and browse lost or found items. It is a **simple, independent third-party app** that connects people directly—no campus administration involvement and no AI automation. Users can easily report items, search listings, and communicate to return belongings to their rightful owners.

Items older than **90 days** are automatically deleted to preserve memory and storage efficiency.

---

## Key Personas

The system supports three core roles with distinct responsibilities:

- **Sally Student (Lost Item Owner):** Reports missing items by posting descriptions, photos, and last-known locations. Sally can also browse the app to check if anyone has found and posted her belongings. Once she retrieves the item, she can mark it as “Recovered.”

- **Frank Finder (Item Reporter):** A community member who finds an unclaimed item and creates a “Found Item” post. Frank includes a short description, a photo, and where he dropped it off (e.g., “Student Union front desk”).

- **Rhonda Root (Moderator/Admin):** A third-party moderator who ensures fair and appropriate use of the platform. Rhonda is **not affiliated with the university** and can delete posts, handle reports of misuse, or ban users who violate community guidelines.

---

## User Stories

1. **As Sally Student**, I want to report a lost item by adding a description, photo, and location so others can help me find it.  
2. **As Sally Student**, I want to search or filter listings to see if anyone has posted my lost item.  
3. **As Sally Student**, I want to mark my item as “Recovered” once I’ve retrieved it.  
4. **As Frank Finder**, I want to post a found item with its description, image, and location to help return it to its owner.  
5. **As Frank Finder**, I want to edit or delete my post if the item is claimed.  
6. **As Rhonda Root**, I want to remove inappropriate or duplicate listings and manage user accounts.  
7. **As a System**, I want to automatically delete posts older than 90 days to maintain storage efficiency.

---

## Wireframes / Mockups

### Homepage

- Displays a search bar, filters (e.g., “Keys,” “Cards,” “Electronics”), and “Post Lost” / “Post Found” buttons.  
- Shows the most recent lost and found items with images and timestamps.

### Report Item Page

- Form for users to submit a new post.  
- Fields include title, description, category, location, upload image, and contact email (optional or hidden until verified).  
- Option to mark item as “Lost” or “Found.”

### Search Results Page

- Displays a scrollable grid of posts that match the search query or selected category.  
- Users can sort by newest, oldest, or closest location.

### Item Detail Page

- Displays full description, image, location, and poster contact info.  
- Includes button to mark as “Recovered” or “Claimed.”

### Admin Dashboard

- Allows moderators to view all active posts.  
- Options to delete posts, view flagged reports, and manage user bans.  
- Auto-expiration logic view for posts nearing 90 days.

---

## Technical Implementation

### Dependencies
- **User System:** Secure email login and role-based permissions (student, moderator).  
- **Item Model:** Stores item metadata such as title, description, image, location, timestamp, and status.  
- **Post Lifecycle:** Items automatically expire and delete after 90 days.  
- **Moderation Tools:** Enable moderators to remove or edit listings.  

---

### Technology Stack
- **Frontend:** React.js (for UI and dynamic content updates).  
- **Backend:** Node.js + Express (handles routes, CRUD operations, and post expiration logic).  
- **Database:** MongoDB (stores user and item data with TTL index for automatic deletion after 90 days).  
- **Hosting:** Vercel (frontend) + Render or AWS (backend).

---

## API / Routes

| Route | Method | Description |
|-------|---------|-------------|
| `/items` | GET | Retrieve all posts (with search and filters). |
| `/items/:id` | GET | Retrieve details for a specific post. |
| `/items` | POST | Create a new post (lost or found). |
| `/items/:id` | PUT | Update an existing post. |
| `/items/:id` | DELETE | Delete a post (owner or moderator). |
| `/admin/reports` | GET | Retrieve flagged or reported posts (admin only). |

---

## Models

**User**  
- `id`, `name`, `email`, `role`, `profile_img`

**Item**  
- `id`, `title`, `description`, `photo_url`, `status` (lost/found/recovered), `category`, `location`, `timestamp`, `user_id`

**Report**  
- `id`, `item_id`, `reason`, `submitted_by`, `timestamp`

---

## Security and Privacy

- All users must log in to post or comment.  
- Contact info is private by default and shared only when both parties agree.  
- Only moderators can remove others’ posts or ban users.  
- Posts automatically delete after 90 days to maintain privacy and server efficiency.

---

## Future Extensions

- **Community Verification:** Add verified badges for frequent, trustworthy users.  
- **Map Integration:** Allow users to pin lost or found locations visually.  
- **Notification System:** Optional email alerts for category or keyword matches.  
- **Mobile Version:** Build a PWA or React Native app for easier on-the-go posting.

---

## Summary

The **Heel & Found** web app creates a simple, transparent, and independent platform for connecting people with their lost belongings. By focusing on manual community engagement, clear posting tools, and automatic data cleanup, it makes campus item recovery fast, intuitive, and sustainable—without relying on AI or institutional involvement.

