export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
          reason: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      interests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: Database["public"]["Enums"]["interest_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["interest_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["interest_status"]
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_id: string | null
          body: string | null
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_unlocks: {
        Row: {
          amount_paise: number
          created_at: string
          id: string
          payer_id: string
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
          status: string
          unlocked_profile_id: string
        }
        Insert: {
          amount_paise?: number
          created_at?: string
          id?: string
          payer_id: string
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
          status?: string
          unlocked_profile_id: string
        }
        Update: {
          amount_paise?: number
          created_at?: string
          id?: string
          payer_id?: string
          razorpay_order_id?: string
          razorpay_payment_id?: string
          razorpay_signature?: string
          status?: string
          unlocked_profile_id?: string
        }
        Relationships: []
      }
      profile_views: {
        Row: {
          created_at: string
          id: string
          viewed_id: string
          viewer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          viewed_id: string
          viewer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          viewed_id?: string
          viewer_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_me: string | null
          alternate_phone: string | null
          annual_income: string | null
          blood_group: string | null
          body_type: string | null
          city: string | null
          community: string | null
          complexion: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          date_of_birth: string
          diet: string | null
          education: string | null
          family_details: string | null
          family_photo_url: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          gothram: string | null
          height_cm: number | null
          id: string
          is_banned: boolean
          is_complete: boolean
          is_verified: boolean
          last_seen_at: string | null
          manglik: string | null
          marital_status: Database["public"]["Enums"]["marital_status_type"]
          mother_tongue: string | null
          nakshatram: string | null
          parent_name: string | null
          parent_phone: string | null
          parent_relation: string | null
          photo_privacy: string
          photo_url: string | null
          photo_url_2: string | null
          photo_url_3: string | null
          photo_url_4: string | null
          place_of_birth: string | null
          pref_age_max: number | null
          pref_age_min: number | null
          pref_cities: string[] | null
          pref_diets: string[] | null
          pref_marital_statuses: string[] | null
          pref_min_income_lpa: number | null
          pref_mother_tongues: string[] | null
          pref_religions: string[] | null
          profession: string | null
          rasi: string | null
          religion: string | null
          state: string | null
          thidi: string | null
          time_of_birth: string | null
          time_of_birth_period: string | null
          updated_at: string
        }
        Insert: {
          about_me?: string | null
          alternate_phone?: string | null
          annual_income?: string | null
          blood_group?: string | null
          body_type?: string | null
          city?: string | null
          community?: string | null
          complexion?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          date_of_birth: string
          diet?: string | null
          education?: string | null
          family_details?: string | null
          family_photo_url?: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          gothram?: string | null
          height_cm?: number | null
          id: string
          is_banned?: boolean
          is_complete?: boolean
          is_verified?: boolean
          last_seen_at?: string | null
          manglik?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status_type"]
          mother_tongue?: string | null
          nakshatram?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          parent_relation?: string | null
          photo_privacy?: string
          photo_url?: string | null
          photo_url_2?: string | null
          photo_url_3?: string | null
          photo_url_4?: string | null
          place_of_birth?: string | null
          pref_age_max?: number | null
          pref_age_min?: number | null
          pref_cities?: string[] | null
          pref_diets?: string[] | null
          pref_marital_statuses?: string[] | null
          pref_min_income_lpa?: number | null
          pref_mother_tongues?: string[] | null
          pref_religions?: string[] | null
          profession?: string | null
          rasi?: string | null
          religion?: string | null
          state?: string | null
          thidi?: string | null
          time_of_birth?: string | null
          time_of_birth_period?: string | null
          updated_at?: string
        }
        Update: {
          about_me?: string | null
          alternate_phone?: string | null
          annual_income?: string | null
          blood_group?: string | null
          body_type?: string | null
          city?: string | null
          community?: string | null
          complexion?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string
          diet?: string | null
          education?: string | null
          family_details?: string | null
          family_photo_url?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          gothram?: string | null
          height_cm?: number | null
          id?: string
          is_banned?: boolean
          is_complete?: boolean
          is_verified?: boolean
          last_seen_at?: string | null
          manglik?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status_type"]
          mother_tongue?: string | null
          nakshatram?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          parent_relation?: string | null
          photo_privacy?: string
          photo_url?: string | null
          photo_url_2?: string | null
          photo_url_3?: string | null
          photo_url_4?: string | null
          place_of_birth?: string | null
          pref_age_max?: number | null
          pref_age_min?: number | null
          pref_cities?: string[] | null
          pref_diets?: string[] | null
          pref_marital_statuses?: string[] | null
          pref_min_income_lpa?: number | null
          pref_mother_tongues?: string[] | null
          pref_religions?: string[] | null
          profession?: string | null
          rasi?: string | null
          religion?: string | null
          state?: string | null
          thidi?: string | null
          time_of_birth?: string | null
          time_of_birth_period?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: string
          reported_id: string
          reporter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          reported_id: string
          reporter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          reported_id?: string
          reporter_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      shortlists: {
        Row: {
          created_at: string
          id: string
          shortlisted_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          shortlisted_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          shortlisted_id?: string
          user_id?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          approved: boolean
          couple_names: string
          created_at: string
          featured: boolean
          id: string
          location: string | null
          married_on: string | null
          photo_url: string | null
          story: string
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          approved?: boolean
          couple_names: string
          created_at?: string
          featured?: boolean
          id?: string
          location?: string | null
          married_on?: string | null
          photo_url?: string | null
          story: string
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          approved?: boolean
          couple_names?: string
          created_at?: string
          featured?: boolean
          id?: string
          location?: string | null
          married_on?: string | null
          photo_url?: string | null
          story?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_list_reports: {
        Args: never
        Returns: {
          created_at: string
          details: string
          id: string
          reason: string
          reported_id: string
          reported_name: string
          reporter_id: string
          reporter_name: string
          status: string
        }[]
      }
      admin_list_users: {
        Args: never
        Returns: {
          about_me: string
          annual_income: string
          city: string
          community: string
          contact_phone: string
          country: string
          created_at: string
          date_of_birth: string
          education: string
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          height_cm: number
          id: string
          is_admin: boolean
          is_banned: boolean
          is_complete: boolean
          is_verified: boolean
          last_sign_in_at: string
          marital_status: Database["public"]["Enums"]["marital_status_type"]
          mother_tongue: string
          photo_url: string
          profession: string
          religion: string
          state: string
          updated_at: string
        }[]
      }
      admin_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      users_are_matched: { Args: { _a: string; _b: string }; Returns: boolean }
      users_have_blocked: { Args: { _a: string; _b: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      gender_type: "male" | "female" | "other"
      interest_status: "pending" | "accepted" | "declined"
      marital_status_type:
        | "never_married"
        | "divorced"
        | "widowed"
        | "awaiting_divorce"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      gender_type: ["male", "female", "other"],
      interest_status: ["pending", "accepted", "declined"],
      marital_status_type: [
        "never_married",
        "divorced",
        "widowed",
        "awaiting_divorce",
      ],
    },
  },
} as const
