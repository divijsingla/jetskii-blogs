Right now I’m really into studying randomness and how equilibriums form in nature [[Atkin's](https://share.google/ha5GjfIspIe0WwjhO)].

I like studying randomness since childhood, but I actually realised my love for it when I did a course on Randomised Algorithms
(realised how impractical it is to use Dijkstra’s for calculating shortest paths, lol).

Now I’ve realised that I never loved math or music, it is always making sense out of absurdity that I enjoyed.

##

I “vibecoded” this blog using Lovable. It made the site feel way too modern (yes, I still love plain old-school websites), so I spent half a day stripping things back and realised I could have built the whole thing from scratch in half the time. Frustrating, but educational till now.

Then came the Shade of Brown Crisis. Achieving design oneness and seeing this exact brown everywhere consumed my next half day. All because Lovable insisted on Tailwind for a site that didn’t need Tailwind. I asked for vanilla HTML/CSS, it delivered Tailwind. That’s what they politely call it an LLM “hallucination”.

Deploying it to github pages was another task. It took my next half day.

Life was going smooth before I decided I wanted people to comment here, because apparently I now crave public opinion as if I didn’t already have enough. Adding comments was the biggest pain in the ass. I forked the staticman repo, deployed it on Render, god bless the free tier that allows hosting simple apps without a credit card (I dont have one, lol)

Spent half of my day realising the docs are too old. Battled 100s of errors, saw the deployment pipeline running 200 times. 

Docs told me to use openssl genrsa to create keys. The staticman code was last updated 5 years back before it got covid in 2020, but OpenSSL moved on and changed PEM headers. Just a minor change in prefix and suffix of pem files from _-----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY-----_ to _-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----_. This one RSA word skip costed me 2 hours to debug.

Then COVID-era code met modern GitHub tokens, and the integrations exploded. I had to patch my fork, rewire a bunch of things. Finally, after about five hours of gardening the deployment pipeline, comments finally worked. 

##

If you’ve made it this far, you should have assumed it as your moral responsibility to drop a comment, unless you’re a psychopath who enjoys watching people suffer.

That said, I didn't want spam attacks from cryptocurrency scammers who run a thread of bots convincing each other how Alice is the best crypto portfolio manager you can have. So I've enabled moderation, and all your comments first get approved by me before they appear here on the website (yes, I deserve to be a dictator of my blog website).
