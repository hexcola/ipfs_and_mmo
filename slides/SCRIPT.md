## What is IPFS?

Just IPFS


- [What is IPFS?](https://docs.ipfs.io/introduction/overview/)
- How it works?
- How to use it?

IPFS is a distributed system for storing and accessing files, websites, applications, and data.

### 举个例子

### 这么做有什么意义？

Making it possible to download a file from many locations that aren’t managed by one organization…

Makes it hard for a website to go offline. If someone attacks Wikipedia’s web servers or an engineer at Wikipedia makes a big mistake that causes their servers to catch fire, you can still get the same page from somewhere else.

网站很少挂了。之前无论是由于 Wiki 被攻击或者工程师不小心导致网站无法访问。

权威机构审查

Makes it harder for authorities to censor content. Because files on IPFS can come from many places and because some of those places might be nearby, it’s very hard for authorities (whether they’re states, corporations, or someone else) to block things. In 2017, Turkey blocked Wikipedia and Spain blocked access to Catalonian independence sites. We hope IPFS can prevent actions like those.


可以提高访问速度。
Can speed up the web when you’re far away or disconnected. If you can retrieve a file from someone nearby instead of hundreds or thousands of miles away, you can get it faster. (Organizations with enough money and expertise can do this with CDNs or multiple data centers, but IPFS aims to make this possible for everyone.) That’s especially valuable if your community is networked, but doesn’t have a good connection to the wider internet.

That last point is actually where IPFS gets it’s name: Inter-Planetary File System! We’re striving to build a system that works across places as disconnected or far apart as other planets. That’s a pretty idealistic goal, but it keeps us working and thinking hard, and most everything we create in pursuit of that goal is also useful closer to home.



基于文件内容而非文件位置Instead of being location-based, IPFS addresses a file by what’s in it, or by it’s content. 

CI 文件标识符号

 The IPFS network is a participatory and collaborative one — if nobody has the content identified by a given address, it won’t be available. On the other hand, content can’t be removed from IPFS so long as someone is interested enough to make it available, whether or not that person is the original author.

---

### IPFS Quick Start

ipfs stores all its settings and internal data in a directory called the repository. Before using IPFS for the first time, you’ll need to initialize the repository with the `ipfs init` command


```
Earth:~ hexcola$ ipfs init
initializing IPFS node at /Users/hexcola/.ipfs
generating 2048-bit RSA keypair...done
peer identity: QmS2u99ZAVkNTey149VJtRDiJ74Aetit7hrQFnsQVTGcEm
to get started, enter:

	ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme

Earth:~ hexcola$
```

要学习 IPFS，最好去 [ProtoSchool](https://proto.school/#/)

## What is MMO?

An MMO game is a “Massively Multiplayer Online” game.

To put it in simpler terms, an MMO is an online multiplayer game which a large number of people can play simultaneously. You don’t play with or against just a handful of players, but thousands, sometimes even millions of them at the same time.

note: what the heck

- large number of people
- play together

魔兽世界哪怕·

大型多人游戏


A **massively multiplayer online game** (**MMOG**, or more commonly, **MMO**) is an online game with large numbers of players, typically from hundreds to thousands, on the same server.[1][not in citation given] MMOs usually feature a huge, persistent open world, although some games differ. These games can be found for most network-capable platforms, including the personal computer, video game console, or smartphones and other mobile devices.

- [Massively multiplayer online game](https://en.wikipedia.org/wiki/Massively_multiplayer_online_game)

---

## What is not MMO?

The Halo and Counter-Strike series of games are examples of basic multiplayer online games (MOGs). Even an online game of Yahoo! chess can be considered an MOG. 

However, these examples are not MMO games because they lack an integrated, persistent gaming world. MOGs typically consist of a list of separate, nonintegrated, multiplayer matches, and the matches continuously recycle through a series of rounds. For example, in Yahoo! chess there is no persistence: the game ends and starts anew each time the match ends. And of course, there is no semblance of a single, integrated, chess game "world."

A persistent world or persistent state world (PSW) is a virtual world which, by the definition by Richard Bartle, "continues to exist and develop internally even when there are no people interacting with it".[1] 


## MMO genres

- MMO RPG()
- MMO RTS
- MMO FPS
- MMO ...

## 开发 MMO 使用了哪些技术？

The MMO game architecture described in this article consists of four major components:

- A gaming client to render the game for the user.
- Gaming servers to interact with the gaming client.
- A Web application server to integrate with the gaming servers and clients.
- A database server to persist and retrieve data.

- [Building a simple yet powerful MMO game architecture, Part 1](https://www.ibm.com/developerworks/library/ar-powerup1/index.html)


## Game Loop

When you build your client game, you're obviously familiar with the game loop. Each frame, you consider all the actions taken, process them, apply updates and render the frame, more or less. Networking will need to work very much the same, although you don't do certain tasks, like rendering.

First, try to consider the type of game you're going to make. I'll work off the example of a zoned off MMO like Everquest or SWTOR. This concept ties into one of your bullet points, authoritative server.



## Authoritative Server

In order to have an authoritative server (and you NEED this to maintain any sort of integrity for your persistent networked game) you need to calculate and maintain state server side. The idea is, you do calculations on the client and replicate those important calculations on the server. The server is authoritative and the client can be expected to work correctly. When the client is not correct, that is, it attempts to make changes to the state that result in invalid or unverifiable results on the server, the client is 'forced' to match what the server has.




Think about a simpler example of a networked game, like a asteroids where two players are playing at the same time. You want the game simulated on the server so that at anytime, the important state of the game is persisted. The server might not care about the particular orientation of a ship, but it would care about the total lifes available, or the direction the ship was when it fired any particular bullet.

To build a game like this, a commone technique that I'm aware of, is building an event driven client. All actions in the game are performed by queuing up events, which at some point in the frame are processed and that state is rendered. This type of design lends itself well to a networked game, because then a server can validate the events it receives from a client against it's own scenarios to determine if they are ok. If the entire game can be represented as a timed, stack of events, then ensuring consistency across multiple machines becomes much more straight forward.

Now, back to the original game example of WoW or SWTOR. In a game like this, you're synchronizing the events of multiple players. What if you want player colison? Well, that's fine perhaps on the client, at worst you lag the client because of the massive amount of players, but if you want that to be server validated (otherwise clipping cheats might be a possibility!) then you need to perform collision checks on the server.

If you have an NN collision problem on the server, you're now no longer bandwidth limited, you're processor limited. If it takes 50ms for a client to send a request to the server, then you might expect 50ms back from the server, I mean lag is network latency right? Nope!

The server would need to perform a server 'tick' or update loop, to verify all actions for a given frame, before it can respond. You now run into the problem games like Guild Wars have, where massive amounts of client's in one spot becomes a huge problem, because even if your latency to the server is 50ms, the server is taking up to 200 - 1000ms to process the frame!

So you have an architectural problem of, how do you scale state on the server? How do you architect a system where all you have to do, is plug in a new machine to 'speed things up'. If at the end of the day, your problem is a money/hardware problem, you're in an awesome spot!

I could keep going on just that but I hope that get's the main point across when I say architecture. You also have to consider resource management, or rather, cloud services. How do you even just plug in a computer to 'make things faster' ? You have to build software to utilize host machines as resources and have some sort of way to manage all those remote resources and divy up work accordingly. This is the cloud part of it.

Deployment comes in, when you need some way to quickly restart random services that failed, load balance resources and replicate databases (because if a server crashes, how do you explain to your players they just wasted the last 24 hours of gameplay?)

It's a big, complicated mess of a problem. I've worked on MMO's for about 8 years now and I think I have a decent enough grasp to actually build my own, given enough time, but it's just a shit load of work.

If you're still commuted, I would recommend looking at Apache and NGINX. Understand how web servers work, familiarize yourself with them and understand, that this is one of the simplest forms of what you're trying to do by building a centralized networked game. Next, I would suggest looking at technology like Kubernetes.

Kubernetes is sorta a hot rage thing atm, but I think it's pretty much the future for deployment and cloud service management and security. (Security isn't that great compared to just running everything in VM's but it soon will be, I'm sure of it, as it gains popularity over VM's)

So, that's just a very high level of some architecture and orchestration issues you'll want to consider.

As for the rest of it, I'll try to sum up my thoughts quickly:

Data transfer

Game's use UDP and error correction techniques on the client. I don't have much experience here myself, but there should be resources on how to do this in any multiplayer game which should apply to mmos as well.

Efficient bandwidth usage

Fuck that, unless you're building a console game. Bandwidth is not the problem. That being said, don't be stupid, but you're most likely going to be worrying about hardware resources in your datacenter. If you're worried about money though, this might be something you want to consider, but if it is, you probably shouldn't really build the MMO then. (Build it anyways and pray for a VC or something :P)

Load balancing all entities

Not exactly sure what you mean, but I suspect this has something to do w/ scaling your server side gamestate across multiple machines. This goes back to the architecture point I made in the beginning.

Multiple server nodes Architecture point. If you're really gana do this, go for the one server model and if it dosn't work out, instance particular zones. That works fine and lets be real, no one likes multiple game servers!

Physics simulation Cut taht shit on the server if you can. Reduce collision to very primitive checks (think, OOBB only collision on the server or something, make it cheap!)

Databases

I'm not very up on the strengths/weaknesses between databases, but I'm pretty sure a 'good' database on it's own isn't going to be enough. Remember, you'll want to replicate your DB's, shard them too most likley (different DB's based on some key, so not one DB has EVERYTHING about the game. Usually you'd do something like, unique user id, so player data is segmented in different db's)

And you'll want to back this with some in memory cache like redis probably, but you're profiling will let you know. Especially for a realtime game, you'll not be wanting to do writes for every player movement for all players :).

MySQL should work fine, you'll run into other problems before the performance of MySQL alone is you're real bottleneck.

Also, Databases ain't easy. They are ripe for security bugs through misues and ontop of that, you will likley want to ensure that player actions are atmoic (done in transactions). Otherwise, you're going to have a fun ol time tracking, debugging and trying to fix race condition bugs on db writes/reads.

Efficient collision detection

yea use some really easy cheap thing on the server, like AABB collision boxes against players and geometry to make sure players aren't glitching through shit they shouldn't. Save the pretty fine grained stuff for the client.

Security

You're pretty much fucked, I could write 10 pages on this. Just do your best and be proud you actually shipped.

Client-side prediction

Latency compensation

A.I. theory

No experience here, but there are plenty of guides out there.

These are client side problems anyways, focus on your server because it's the hardest part.

Anyways GL! This is just an accumulation of crap I've learned over the years, I still think it's possible and one day, I hope to help or maybe even build, a good 'MMO Framework' with the basics to get people going, but we aren't there yet.

Source:

Been working on MMO's for PC and Mobile for the last 8 or so years.

EDIT

Damn, i totally even forgot about all the debugging and logging. You need to log EVERYTHING! Infact, I would reccomend logging to a database, per player if possible. Just imagine when a player sends a CS ticket bitching about an item they get dissapering or something. Not only do you need the tooling built for CS to SEE the logs, you need some sort of backend system to represent the logging. ELK works well in my experience. Then you need to build tools for people to interact with and modify player data....

Damn, the list goes on and on.. Just build a battlefield style game, big maps, lots a players, no persistence :P It will save you a ton of trouble and still be practically unfeasible for a small team.


## 和 IPFS 有什么关系？

IPFS 是颠覆性的技术，但只有真正的应用中，

- 降低原来的成本
- 提供更多的可能性

如果我们能做到MMO的开发与运行，这几乎意味着，目前的所有应用 IPFS 都能解决。

当然，IPFS 还没有完全 Capable 做一个 MMO 游戏，这就是讨论的目标，找到它的边界（限制），并 science this shit out.

- 多人协作编辑
- 基于 P2P 的 IOT 管理系统
- ...

## Engough talk, show me the code!





## IPFS 与游戏

- [Using IPFS in gaming](https://discuss.ipfs.io/t/using-ipfs-in-gaming/3844)
- [Using IPFS in gaming](https://www.reddit.com/r/ipfs/comments/9gjw0w/using_ipfs_in_gaming/)

# How can they work together ?

- pub/sub
- libp2p

## PubSub

- [Jeromy Johnson. Take a look at pubsub on IPFS. 2017-05-17](https://blog.ipfs.io/25-pubsub/)

## Game Demo

- [Build a Space Shooter with Phaser 3 – 5](https://yorkcs.com/2019/02/08/build-a-space-shooter-with-phaser-3-5/)

## Reference

- [IPFS世界的物流系统：libp2p](https://zhuanlan.zhihu.com/p/47107347)
- [什么是libp2p？](https://juejin.im/post/5bd05c87f265da0aca334c8e)
- [Introduction to libp2p](https://blog.keep.network/introduction-to-libp2p-57ce6527babe)

### WebRTC

- [WebRTC in the real world: STUN, TURN and signaling](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/)
- [WebRTC get start](https://webrtc.org/start/)
- [Websocket vs WebRTC](https://www.educba.com/websockets-vs-webrtc/)


## What’s next?



The next two areas of focus for IPFS pubsub are

- authentication

Currently, any peer can publish to any pubsub topic. We plan to implement an authenticated mode for pubsub topics, where only authorized peers — those given a cryptographic key or capability — can publish messages. We are still working out the sharing and capability granting model.

- message routing.

After that, we plan to improve message routing. The current routing algorithm floods messages to every subscriber, resulting in some peers receiving the same message multiple times. We affectionately call this approach “floodsub”. We plan to replace it with a more efficient routing algorithm, which will go a long way towards reducing overhead and improving scalability.

Please note that this is a simple first-blush implementation of the technology. It has known limitations that we will address in future iterations. As it is today, the pubsub implementation can be quite bandwidth intensive. It works well for apps with few peers in the group, but does not scale. We have designed a more robust underlying algorithm that will scale to much larger use cases but we wanted to ship this simple implementation so you can begin using it for your applications.

Enjoy!
All that said, we hope you give ipfs pubsub a try. You can head over to the Discussion Forum to ask questions, get help, or simply let us know how it goes.


## Orbit DB

基本操作

- 增
- 删
- 改
- 查

权限控制

动态更新

## pubsub


## 基本操作

我们将 MMO 中的大地图拆分为一个个小的 chunk，按照索引存储到 Orbit DB 中


用户在地图中探索，到达不同的位置时候，可以加载不同的场景（从 Peers 下载地图数据，并更新）

同时，该用户广播了自己的位置数据，其他用户订阅了该用户的信息，在收到该用户的信时，会在自己的客户端更新其他玩家的数据。

用户除了能行走外，还可以修改地图中的数据，例如，砍树，这将会更新地图数据，同时其他用户也能看到地图的更新。