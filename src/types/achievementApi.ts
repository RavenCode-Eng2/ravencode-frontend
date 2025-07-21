// ============================
// ACHIEVEMENT API TYPE DEFINITIONS
// ============================

// Base achievement record from API
export interface ApiAchievementRecord {
  id?: string;
  email: string; // User email - links achievement to user
  achievement_name: string; // Unique identifier for the achievement type
  course_id: string; // Course this achievement belongs to
  title: string; // Display title
  description?: string | null; // Achievement description
  score: number; // Points scored by user
  total_points: number; // Maximum possible points
  percentage?: number; // Calculated percentage (score/total_points * 100)
  date_earned?: string | null; // ISO date when achievement was earned
  status?: string; // 'completed', 'in_progress', 'failed', etc.
  achieved?: boolean; // Whether the achievement has been earned
  metadata?: AchievementMetadata; // Additional achievement data
}

// Metadata structure for achievements
export interface AchievementMetadata {
  category?: 'learning' | 'practice' | 'achievement' | 'mastery' | 'dedication' | 'community';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  xp_reward?: number; // Experience points awarded
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  module?: string; // Specific module/lesson within course
  icon_url?: string; // Custom icon URL for the achievement
  requirements?: string[]; // List of requirements to earn this achievement
  tags?: string[]; // Additional categorization tags
  [key: string]: any; // Allow additional custom fields
}

// Request to create/update an achievement
export interface AchievementUpdateRequest {
  email: string; // User email
  achievement: AchievementInput; // Achievement definition
  score: number; // User's score
  total_points: number; // Maximum possible points
}

// Achievement input structure
export interface AchievementInput {
  achievement_name: string; // Unique identifier
  course_id: string; // Course association
  title: string; // Display title
  description?: string | null; // Description
  metadata?: AchievementMetadata; // Additional data
}

// Bulk update request for multiple achievements
export interface BulkUpdateRequest {
  updates: AchievementUpdateRequest[]; // Array of achievement updates
}

// Achievement statistics for a user
export interface AchievementStats {
  total_achievements: number; // Total achievements earned
  total_xp: number; // Total XP earned from achievements
  average_score: number; // Average percentage across all achievements
  achievements_by_course: Record<string, number>; // Count per course
  recent_achievements: ApiAchievementRecord[]; // Recently earned achievements
  completion_rate?: number; // Overall completion percentage
  streak_count?: number; // Current achievement streak
  best_category?: string; // Category with most achievements
}

// Available achievement template (what achievements exist for a course)
export interface AvailableAchievement {
  achievement_name: string; // Unique identifier
  title: string; // Display title
  description?: string; // Description
  requirements?: string[]; // What user needs to do
  max_points: number; // Maximum points possible
  category?: string; // Achievement category
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'; // Rarity level
  metadata?: AchievementMetadata; // Additional metadata
}

// Response wrapper for API calls
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// User achievement data response (what gets returned for a specific user)
export interface UserAchievementResponse {
  email: string; // User email
  achievements: ApiAchievementRecord[]; // All achievements for this user
  stats?: AchievementStats; // Optional statistics
}

// Admin-specific achievement record (includes user information)
export interface AdminAchievementRecord extends ApiAchievementRecord {
  user_name?: string; // User's display name
  user_email: string; // User's email (same as email but more explicit)
  created_at?: string; // When achievement record was created
  updated_at?: string; // When achievement was last updated
}

// Request to create achievement for admin panel
export interface CreateAchievementRequest {
  user_email: string; // Target user
  course_id: string; // Course association
  achievement_name: string; // Achievement identifier
  title: string; // Display title
  description: string; // Description
  score: number; // User's score
  total_points: number; // Maximum points
  metadata?: AchievementMetadata; // Additional data
}

// ============================
// API ENDPOINT EXPECTATIONS
// ============================

/*
1. GET /achievements/{email}
   - Returns: ApiResponse<ApiAchievementRecord[]>
   - Gets all achievements for a specific user

2. GET /achievements/{email}/stats  
   - Returns: ApiResponse<AchievementStats>
   - Gets achievement statistics for a user

3. POST /achievements/update
   - Body: AchievementUpdateRequest
   - Returns: ApiResponse<any>
   - Creates or updates an achievement

4. POST /achievements/bulk-update
   - Body: BulkUpdateRequest  
   - Returns: ApiResponse<any>
   - Updates multiple achievements at once

5. GET /achievements/course/{course_id}/available
   - Returns: ApiResponse<AvailableAchievement[]>
   - Gets available achievements for a course

6. DELETE /achievements/{email}/{achievement_name}
   - Returns: ApiResponse<{deleted: boolean}>
   - Deletes a specific achievement

7. GET /admin/achievements (NEW - needed for admin panel)
   - Returns: ApiResponse<AdminAchievementRecord[]>
   - Gets all achievements across all users (admin only)

8. GET /admin/achievements/user/{email} (NEW - optional)
   - Returns: ApiResponse<AdminAchievementRecord[]>
   - Gets all achievements for a specific user (admin view)
*/

// ============================
// EXAMPLE API RESPONSES
// ============================

/*
Example: GET /achievements/user@example.com
{
  "data": {
    "email": "user@example.com",
    "achievements": [
      {
        "id": "uuid-here",
        "email": "user@example.com",
        "achievement_name": "first_lesson_completed",
        "course_id": "python-101",
        "title": "Primera Lección Completada",
        "description": "Has completado tu primera lección de Python",
        "score": 85,
        "total_points": 100,
        "percentage": 85,
        "date_earned": "2025-01-21T15:50:08.641000",
        "status": "completed",
        "achieved": true,
        "metadata": {
          "category": "learning",
          "rarity": "common",
          "xp_reward": 100,
          "difficulty": "beginner",
          "module": "introduction",
          "requirements": ["Complete first lesson"],
          "tags": ["beginner", "python"]
        }
      }
    ]
  }
}

Example: POST /achievements/update
{
  "email": "user@example.com",
  "achievement": {
    "achievement_name": "first_lesson_completed",
    "course_id": "python-101", 
    "title": "Primera Lección Completada",
    "description": "Has completado tu primera lección de Python",
    "metadata": {
      "category": "learning",
      "rarity": "common",
      "xp_reward": 100,
      "difficulty": "beginner",
      "module": "introduction"
    }
  },
  "score": 85,
  "total_points": 100
}
*/ 