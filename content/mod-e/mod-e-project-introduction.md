

# Project Introduction

 This project is mod-e. The name is just a tongue and cheeek name to mean mode.  But since its dealing with emotional states I want it to be a play on the word moody. 

 The purpose of this project is to show a fun visual simulation of a robot system. I am building a robot face and I am going to have it simulated a range of emotions.  The emotions will be based on the Lövheim Cube Of Emotions. I'll speak more about it below.

## Lövheim Cube Of Emotions

  The Lövheim Cube Of Emotions is based on a research paper from 2012. It takes monamaine neurotransmitters and shows moods based on the levels of each neurotransmitter. The three are Serotonin, Dopamine, and Noradrenaline and creates emotional states.  Below is a comon table used:

| Emotion             | Serotonin | Dopamine | Noradrenalinea |
| ------------------- | --------- | -------- | -------------- |
| Distress/Anguish    | Low       | Low      | High           |
| Anger/Rage          | Low       | High     | High           |
| Fear/Terror         | Low       | High     | Low            |
| Shame/Humiliation   | Low       | Low      | Low            |
| Disgust/Contempt    | High      | Low      | Low            |
| Joy/Enjoyment       | High      | High     | Low            |
| Interest/Excitement | High      | High     | High           |
| Surprise            | High      | Low      | High           |


This can also be visualized with the following popular illustration

![[Lövheim_cube_of_emotion.jpg]].

As you can see the combination of neurotramitters map directly to common moods from human beings. And the goal is to emote a robot based on if it has these current states. However, the key part is to do it as a neuromorphic brain.  And this is where the interesting part of the project comes to life



## Neuromorphic brain simulator in Zig

So this is the interesting part. I want this behavior to emergent. That means I don't want to intentionally program it. I want it to be apart of the simulators internal wiring. This means that the neuromorphic brain has to be wired to somehow process these emotions. 

Neuromorphic systems are event driven systems. Meaning they aren't doing anything until they receive a "spike".  A "spike" usually occurs when the brain receives enough voltage.  It reaches a threshold and fires. The brain fires a spike, neurons receive it, then it connects to other related neurons. This is how as humans we are able to process information in parallel. 

If you are new to neuromorphic computing, this blog post isn't an attempt to introduce it. But in short it is a field of AI that is focused on brain inspired computing. The focus is mostly on hardware and the concept is to model a computer system that looks like a brain. This is usually by modeling hardware as neurocores with local memory (synpases).  The deviates from the Vonn Neauman architecture quite signficantly, in that we are not using central memory.

From a simulator standpoint what I really need to do is model the neurons and the synapses. And then try to bridge a connection between different neurons. This is usually represented as a synapsed graph where each neuron is is able to "connect" with another neuron.

Representing this computationally can be intensive, and in future blogs I'll take you through the journey by showing code.



## Neuron model: Izhikevich Dynamical System

So when build a neuromorphic simulator, we are presenting with how our neurons behave. We know that it fires spikes based on a certain threshold.  The "hello, world" of a neuron model is basically Leaky Integrate an Fire (LIF). LiF is a simple neuron model, and its very computationally cheap.  It looks like so

![[Screenshot 2026-03-15 at 7.19.50 PM.png]]

Basically in a nutshell, I an input constant. E presents leak (what happens when voltage goes over thresshold) and V is voltage. As any electrical system membrane resistence. What is important to note is decay.  When there is not further input, the brain decays back to its resting potential. This is basically to avoid having things like seizures. I will go into this into more details as blog further

Anyway LiF has a few issues for what I want to do.  For one its a single type of spike. It has a predicatable rate of decay. In a true biological system this usually isn't the case. Our brains are far more complex. LiF while its good for simple examples, probably isn't going to make the brain feel dynamic. Hence we look at another neuron model, Izhikevich

Like LiF the Izhikevich Neuron model is computationally cheap. But it adds more dynamic spiking behavior.  It has regular and fast spiking.  As well as burst and chattering. Each of these expose parameters for how fast or slow the decay rate is per each spike. This is useful if we want to simulate emotional state.  It's a simple dynamical system:

![[Screenshot 2026-03-15 at 7.34.47 PM.png]]


This is then basic differential equation.  It also includes the decay parameters:
![[Screenshot 2026-03-15 at 7.34.57 PM.png]]



Paramters a,b,c,d values change based on the spiking type. Which is already a cool dynamic system. As I go through the code, keep in mind this is what I will be implementing

##  Reward and R-STDP

Finally we want our systems to learn dynamically. Because neuromorphich computing is sparase by nature, it is able to do online learning.  It can used something called Spike Timing Dependent Plasticity (STDP).  I am using a modified version called R-STDP. Since I am basing a simulation off of emotions, it needs some sort of reward system that allows it to figure out what behaviors are reinforced.  Typically the reward is based on dopamine. I will go into a lot more depth here, but I just put this here to mention I will be implementing this as well in my simulator.


## Visualization

There will be 2 visualization modes:

Terminal based emulation.  This will give things like charts and status for the behavior of the brain. It will show things like spiking populations, neurochemical levels, and other stats for average voltage, spikes, and total synapse count.

![[Screenshot 2026-03-15 at 7.48.23 PM.png]]


And there will be a robot face that will emotion.  It will be displayed using Raylib.  Its still a WIP, so no images available yet.


## Why Zig?

Well the truth is that I just like Zig, and I'm learning it. No reason exist beyond that. I don't really want to do it in Python, which is common for this type of work. This also gives me an opportunity to really learn Zig.  It forces me to interact with the language more than I otherwise would have

## Conclusion

Overall I hope to take people on my journey. Neuromorphic computing is part of a very personal mission for me. And I've been looking for excuses to tussle with it. It's certainly not simple, but I think its a fun and interesting topic to study. I'm not an expert, and this is my attempt to build expertise by struggling with these concepts in public.

Anyway thanks for your time, and stay blessed!
