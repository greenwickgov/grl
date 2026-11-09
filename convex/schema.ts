import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
export default defineSchema({
 teams: defineTable({slug:v.string(),name:v.string(),short:v.string(),color:v.string(),facebook:v.optional(v.string())}).index('by_slug',['slug']),
 matches: defineTable({season:v.number(),round:v.number(),home:v.string(),away:v.string(),kickoff:v.string(),venue:v.string(),status:v.union(v.literal('scheduled'),v.literal('live'),v.literal('final')),homeScore:v.optional(v.number()),awayScore:v.optional(v.number()),competition:v.union(v.literal('regular'),v.literal('finals'))}).index('by_season',['season']),
 news: defineTable({slug:v.string(),title:v.string(),category:v.string(),summary:v.string(),body:v.string(),image:v.optional(v.string()),publishedAt:v.number(),published:v.boolean(),team:v.optional(v.string())}).index('by_slug',['slug']),
 settings: defineTable({key:v.string(),value:v.string()}).index('by_key',['key'])
});
