# Database Structure - Primary/Secondary Key Relationships

## Overview
The database now uses a normalized structure with primary and foreign key relationships to ensure data integrity and eliminate redundancy.

## Collections Structure

### 1. **`tags` Collection** (Primary Key Table)
**Purpose**: Central repository for all tags used across the application

**Structure**:
```typescript
{
  id: string,              // Primary key (auto-generated)
  name: string,            // Tag name (e.g., "React", "Frontend")
  category: string,        // Tag category (e.g., "technology", "tool", "domain")
  createdAt: Date,         // Creation timestamp
}
```

**Sample Data**:
```json
{
  "id": "tag_abc123",
  "name": "Frontend",
  "category": "technology",
  "createdAt": "2025-01-08T12:00:00Z"
}
```

### 2. **`techs` Collection** (Foreign Key Reference)
**Purpose**: Individual technologies with references to tags

**Structure**:
```typescript
{
  id: string,              // Primary key (auto-generated)
  name: string,            // Technology name
  icon: string,            // Icon component name
  tags: string[],          // Foreign keys to tags collection
  createdAt: Date,         // Creation timestamp
}
```

**Sample Data**:
```json
{
  "id": "tech_def456",
  "name": "React.js",
  "icon": "RiReactjsLine",
  "tags": ["tag_abc123", "tag_def456", "tag_ghi789"],
  "createdAt": "2025-01-08T12:00:00Z"
}
```

### 3. **`blog` Collection** (Foreign Key Reference)
**Purpose**: Blog posts with tag relationships

**Structure**:
```typescript
{
  id: string,              // Primary key (auto-generated)
  title: string,           // Post title
  content: string,         // Post content
  tags: string[],          // Foreign keys to tags collection
  createdAt: Date,         // Creation timestamp
}
```

### 4. **`projects` Collection** (Foreign Key Reference)
**Purpose**: Projects with tag relationships

**Structure**:
```typescript
{
  id: string,              // Primary key (auto-generated)
  name: string,            // Project name
  description: string,     // Project description
  url: string,             // Project URL
  img?: string,            // Optional image URL
  videoUrl?: string,       // Optional video URL
  article?: string,        // Optional detailed article
  tags: string[],          // Foreign keys to tags collection
}
```

## Key Relationships

### One-to-Many Relationships:
- **Tags → Technologies**: One tag can be used by many technologies
- **Tags → Blog Posts**: One tag can be used by many blog posts
- **Tags → Projects**: One tag can be used by many projects

### Many-to-Many Relationships:
- **Technologies ↔ Tags**: Each technology can have multiple tags, each tag can be used by multiple technologies
- **Blog Posts ↔ Tags**: Each post can have multiple tags, each tag can be used by multiple posts
- **Projects ↔ Tags**: Each project can have multiple tags, each tag can be used by multiple projects

## Benefits of This Structure

### 1. **Data Integrity**
- Tags are stored once and referenced by ID
- No duplicate tag names or inconsistent spelling
- Referential integrity maintained across all collections

### 2. **Efficient Queries**
- Fast lookups by tag ID
- Easy to find all content with specific tags
- Scalable for large datasets

### 3. **Easy Maintenance**
- Rename a tag in one place, changes everywhere
- Track tag usage across all content types
- Delete unused tags without affecting content

### 4. **Analytics Support**
- Count tag usage across different content types
- Identify popular tags and trends
- Generate reports on content categorization

## Usage Examples

### Creating a New Technology with Tags:
```typescript
// 1. Get available tags
const tagsSnapshot = await getDocs(collection(db, 'tags'));
const availableTags = tagsSnapshot.docs.map(doc => ({
  id: doc.id,
  name: doc.data().name
}));

// 2. Select tag IDs for the technology
const selectedTagIds = ["tag_abc123", "tag_def456"];

// 3. Create technology with tag foreign keys
await addDoc(collection(db, 'techs'), {
  name: "Vue.js",
  icon: "SiVuedotjs",
  tags: selectedTagIds,
  createdAt: new Date()
});
```

### Displaying Technology with Tag Names:
```typescript
// 1. Load technology
const tech = await getDoc(doc(db, 'techs', 'tech_id'));
const techData = tech.data();

// 2. Resolve tag IDs to names
const tagNames = await Promise.all(
  techData.tags.map(async (tagId) => {
    const tagDoc = await getDoc(doc(db, 'tags', tagId));
    return tagDoc.data().name;
  })
);

// 3. Display with resolved names
console.log(`${techData.name}: ${tagNames.join(', ')}`);
```

### Finding All Content with a Specific Tag:
```typescript
const tagId = "tag_abc123";

// Find all techs with this tag
const techsQuery = query(
  collection(db, 'techs'),
  where('tags', 'array-contains', tagId)
);

// Find all blog posts with this tag
const blogQuery = query(
  collection(db, 'blog'),
  where('tags', 'array-contains', tagId)
);

// Find all projects with this tag
const projectsQuery = query(
  collection(db, 'projects'),
  where('tags', 'array-contains', tagId)
);
```

## Migration Process

### From Old Structure:
```json
{
  "name": "React.js",
  "icon": "RiReactjsLine",
  "tags": ["Frontend", "Framework", "Web Development"]
}
```

### To New Structure:
```json
{
  "name": "React.js",
  "icon": "RiReactjsLine",
  "tags": ["tag_abc123", "tag_def456", "tag_ghi789"]
}
```

### Migration Steps:
1. **Create Tags Collection**: Add all unique tags with auto-generated IDs
2. **Update Content**: Replace tag names with tag IDs in all content
3. **Update UI**: Resolve tag IDs to names for display
4. **Update Queries**: Use tag IDs for filtering and searching

## Admin Interface Integration

The admin interface automatically handles:
- **Tag Selection**: Checkbox interface for selecting tags by name
- **Tag Resolution**: Displaying tag names instead of IDs
- **Tag Creation**: Adding new tags to the central collection
- **Usage Analytics**: Showing where tags are used across content
- **Referential Integrity**: Warning when deleting tags that are in use

## Best Practices

1. **Always use tag IDs** in database operations
2. **Resolve tag names** only for display purposes
3. **Validate tag existence** before creating content
4. **Clean up unused tags** periodically
5. **Use consistent naming** for tag categories
6. **Index tag arrays** for better query performance

This normalized structure provides a solid foundation for scalable content management with proper data relationships and integrity constraints.
