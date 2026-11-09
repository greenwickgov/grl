import { internalMutation } from './_generated/server';
import { teams, news } from '../src/data';
export const initialize=internalMutation({args:{},handler:async(ctx)=>{
 for(const {symbol,...team} of teams){const old=await ctx.db.query('teams').withIndex('by_slug',q=>q.eq('slug',team.slug)).unique();if(!old)await ctx.db.insert('teams',team);}
 for(const n of news){const old=await ctx.db.query('news').withIndex('by_slug',q=>q.eq('slug',n.slug)).unique();if(!old)await ctx.db.insert('news',n);}
 return 'Official clubs and supplied news initialized; no invented results.';
}});
