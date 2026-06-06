---
title: Home Server
excerpt: What am I running on my home server?
date: 2026-02-24
tags:
  - Home Server
  - Hardware
  - Software
---

## What server(s)?

During my placement, I bought an old HPE desktop workstation and began tinkering with Ubuntu (mainly to host Minecraft servers and websites). That was the start of a very expensive hobby. Since then, I've now got an actual server rack, 2 more servers, a gigabit switch, and follow the 3-2-1 backup rule.

My first 'proper' server was an Gen9 HPE DL360 with the following specs:
- 8 SFF SAS drive slots (2x 240GB SSDs, 6xTB HHDs in RAID5)
- Dual Intel Xeon E5-2660 v3 (10 cores, 20 threads)
- 96GB DDR4 ECC memory

Now, this is definitely overkill for what I run (which we'll get onto later), but I had some LFF HDDs lying around, so the obvious solution to spare drives is to buy another server, right? And so, I bought a chassis and started collecting all the components for it, so now I also have another Gen9 HPE server, this time a DL380 with the following:
- 12 LFF SAS drive slots (4x1TB HDDs in RAID5 currently)
- Dual Intel Xeon E5-2640 v4 (10 cores, 20 threads)
- 32GB DDR4 ECC memory

No doubt about this being overkill now, but building it from scratch felt more rewarding than buying it outright. So worth it.

## What I run

### Server Number 1 (DL360)
Currently, server number 1 is dedicated to projects, websites, game servers, Docker containers etc. The current list is as follows:
- MariaDB with PHPMyAdmin as the database system for *everything* on my servers
- NGINX Proxy Manager as my reverse proxy
- Uptime Kuma for monitoring all my sites
- Speedtest Tracker to keep an eye on my internet speeds
- Scrutiny for drive health monitoring
- Pulse for monitoring my servers
- OpenSpeedTest to check my uplink speed across my network
- Databasus for database backups
- Karakeep as my bookmark manager
- A local instance of supabase for testing with TATYOU (blog post coming soon...)
- PiHole for network level ad-blocking and privacy
- A large number of websites, both for myself and friends (of course this website is hosted on it too)
- Crafty for minecraft servers
- Some Linux VMs including Arch (I use Arch sometimes btw) and Kali for learning
- Domain Locker for keeping track of my many domains
- Last but not least, Home Assistant so that instead of pressing a light switch, I can press a button on my phone that doesnt work 100% of the time

### Server Number 2 (DL380)
Server number 2 is dedicated to media and file storage, so I run:
- Paperless for important documents
- Immich to replace Google / Apple photos
- NextCloud to replace Google Drive / iCloud

Very basic and unoriginal, but very helpful!

The list of services is constantly changing and evolving, with tools being swapped out, removed, added, all sorts. I'll probably find 2 new services this evening that I try out! But at this point in time, that's everything running!