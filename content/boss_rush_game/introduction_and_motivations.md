# Game Introduction and motivations


AGI is around the corner, and will take all of our jobs. What happens when your career is a coping mechanism, and AI takes that away? I guess I'll answer that in this blog.

If that first line didn't scare you away, I should introduce myself.

Hello my name is Brandon. But I'm often referred to online as Minister Of Defense. One day I'll give the lore behind the name if you're interested. Anyway I'm trying to be better about blogging, so here is my attempt.

On September 13th, 2025 I decided that for the next year I was going to try to build a game. The reasons why are a bit personal, and as this is a personal blog, I'll go into it

## What was going on a few months prior to making the game?

I won't get too personal, but 2025 was quite a rough year. And it seemed like a natural continuation of 2024 (I was laid off with no job for about 3 months), and 2023 (my mother had passed, and we were very close). Those sort of circumstances will start to make you really question your life. In 2025 thinking I found love (and tired of living in Atlanta), I made a 1 way trip to Boston. That whole thing didn't work out, and I found myself in the insular New England culture alone.

In addition to that, the AI discourse was becoming noisier.  So in the past where I could just lean on my career to get over my personal life problems, it felt even that was going away.  The corporate job was become more compressed and "easier", my personal life had a ton of problems, and I just couldn't find a way out.

So I did what any person would do.  I started posting AI takes on reddit. One day during a vulnerable time, I asked a question: "If AI does take over, what meaning does our lives have".  Some people said things like

"Well if a baseball team were full or robots, you would still want to see humans play against each other"

"A painter will still paint even though there are photographers"

But these responses missed the point. My value is that I'm analytical. If AI takes over it invalidates my strengths. I'm not a strong artist or creator.  I can't draw or paint or sculpt.  My art literally is my code. It's where I find my happiness and flow state.

That is when I started to think? How do I combine technical skill with art? And it became obvious to me "build a game". In 2024 I had already tried to dig into game dev by using Godot (but found engines really aren't my vibe). Then I tried to create a pong game in C++.  I eventually got a job and my game programming ambitions dried up. Maybe it was time to revisit it?

## Decision to make a game

As everything in my life, the decision to start a game was just me sitting at a bar on my birthday. My "ex" was nice enough to come and see me on my birthday. When I went home from the bar, the next day I said "its time to get started". And that was it.  And I told myself "it has to be from scratch" because code to me is like paint on a canvas. So I decided to lean into a programming language I'd experimented a bit in the past.  Zig. Lower level like C, that is also simple and expressive. It really fits the way I like to code.

I got started with the game, decided to go with Raylib (I was considering their ECS framework called Mach).  And I got started drawing rectangles on a screen.

## Genre choice

So just to make things clear, I'm not a huge gamer right now. But I have been a competitive fighting game player on and off for decades.  As a competitive fighting game player, and someone who has broken down balance, frames, and advanced strategies. I realized how sensitive fighting games would be. So I needed to dig into other genres I loved.

Well I know I love boss battles. And I played many 3D hack and slash games with massive boss battles. One game that stood out to me was Shadow Of The Colossus.  Bosses were massive in scale. And I really love the visceral feeling of that.

Then I thought "what if I made a 2D game built around boss battles". And that is how I came up with my game concept. I wanted to make a game based around boss battles but from a 2D perspective. I always liked 2D run and gun games like Megaman, Metal Slugs, and Contra.  So I basically said "massive boss battles and a 2D run and gun style".

## Goals and MVP

So by my birthday this year September 13th, 2026, I want to have at least one boss battle done for my game. I will share some details about the boss and design in upcoming blog post

A few things to note.  I am not using sprite art. And that decision came from it being a 2D run and gun game. My character and bosses need very dynamic movement. I made the decision early on that commission an artist to draw hundreds of sprites was not feasible. So I decided to convert to bone animation

I am using Spine2D animation. I'm integrating its C library into Zig (well I've done it already).  And it allows me to test my programming, collisions, and overall responsiveness.

## What have I done so far

So this project has gone on for 6 months.  I wish I were further ahead, but there are periods I needed to take breaks.  But I can highlight what has been done:

- basic movements and controls
- scene manager
- initial scene for first boss
- death animation and scene
- basic bullet system (still refining)
- basic camera system
- basic physics system and collision

Its worth noting I am not a visual artist. I simply don't have the skill to build my own assets. So delays will come from me finding artist and working with their schedule. Has to be done, because I want this game to feel polished. This is not a popular genre, so I'm fully expecting it to flop on steam if it is released. But its fine, if some people can see my vision, that's worth it.


## Direction for this blog

You will see that I talk about neuromorphic computing and KV store databases. These are my other interest in software engineering. And they will be incorporated into the game at some point. They may be out of scope for the MVP, but I think these other systems will make the game feel unique. Plus I want to blog insights I learn about both.

## Conclusion

I really want to share my journey with you. Feel free to reach me

email: ministerofdefense1979@gmail.com

