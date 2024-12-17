大家好，欢迎来到我的频道。 我是Veeja，一个专注在编程、游戏、足球上的新人博主。

Hello everyone, welcome to my channel! I'm Veeja, a new content creator focused on programming, gaming, and football.

今天我要聊的事情就有关于这三件事~

Today, I’m going to talk about these three things!~

我是一个忠实的FIFA(也就是现在的FC)生涯模式玩家。

I'm a dedicated FIFA (now FC) career mode player.

我几乎完全不玩FUT模式。

I hardly play FUT mode at all.

因为我更喜欢经营一支自己的球队，看到球员的成长，然后和他们一起建立一个伟大的王朝。

I prefer managing my own team, watching the players grow, and building a great dynasty with them.

在生涯模式中，看到球员的成长，是非常令人开心的。

In career mode, you can watch players grow, and it's really satisfying.

尤其是那些你从青年队培养的球员，

Especially those you’ve developed from the youth team.

看到他们一步步的进步，然后成为一名世界级球员，这种感觉真的很棒。

Watching them make progress bit by bit, growing into a world-class player, is such an amazing feeling.

但是久久以来，一直有个问题一直困扰着我，那就是如何更好的观察和记录球员的成长。

But for a long time, there’s been a problem that’s been bothering me: how to better observe and record a player’s growth.

所以我非常需要一个工具来追踪这些数据。

I really need a something to track this data.

最早的时候，我把球员的数据写到纸上。

In the early days, I wrote down player data on paper.

我使用 Live Editor 和 Cheat Engine table 读取出来每个球员的年龄、能力值、潜力值，然后写下来。

I used Live Editor and Cheat Engine to read the age, overall and potential of each player, and then wrote it down.

并且我会把那些关键球员重点标记出来，比如那些潜力值很高的球员。

I would also highlight the key players, especially those with high potential.

我会重点培养他们，因为他们能达到更高的高度，这是我球队的未来。

I would focus on developing them because they could reach greater heights, and they were the future of my team.

然后每个赛季结束后，我都会更新这个数据。

Then at the end of each season, I would update the data.

将原有的数据划掉，然后写上新的数据。

Cross out the old numbers and write in the new ones.

写在纸上让我感觉很好，我像是一个真正的老式的教练。

Writing it down on paper feels great; I feel like a real old-school coach.

我根据他们数值的变化，来决定他们未来一个赛季的安排，甚至是未来的转会，这真的令人享受。

I look at how their numbers change to decide their plans for the next season and even future transfers. I really enjoy it.

但是，这样的方式也有很大的缺点。数据的更新和管理是一个非常繁琐的过程，而且很容易出错。

But this approach has its downsides. Updating and managing the data is a really tedious process, and it’s easy to make mistakes.

再后来，因为有了EA的反作弊引擎，PC上不得不使用Live editor。

Later on, it became necessary to use Live Editor on the PC because of EA's anti-cheat engine.

我发现他支持Lua脚本并且提供了相当丰富的API。

And I discovered it supports Lua scripts and offers a pretty rich API.

我写了一个简单的脚本，将数据导出成csv格式，然后导入到Notion或者Excel中。

I wrote a simple script to export the data as a CSV file, and then I import it into Notion or Excel.

但是在后面的更新数据中，比如球员的能力值发生了变化，或者你买入了新的球员，

But when it comes to updating data later — like if a player’s overall change or you buy new players

即便能通过脚本快捷的导出数据，

even though the script can export the data quickly,

但是还是需要手动的合并到原来的数据中，这个过程还是很繁琐。

you still need to manually merge it into old data. That's also very tedious.

并且因为Excel只会保留了最新的数据，所以失去了一个重大的优势，那就是历史数据的追踪。

And because Excel only keeps the latest data, it loses a major advantage, which is tracking historical data.

写在纸上的时候我还可以通过划掉的数字看到球员的成长轨迹，

When it was written on paper, I could still see a player's growth by checking out the crossed-out numbers.

但是表格中，你只保留了最新的数据。

But in the table, you only keep the latest data.

如果你要保留历史数据，那么你需要另外的表格或者一些高级的用法。

If you want to keep historical data, you’ll need another table or some more advanced feature.

所以，是时候做出一些改变了!

So, it’s time to make some changes!

我的研究仍然基于Live Editor，因为它提供了非常丰富的API，可以让我们做很多事情。

My research is still based on Live Editor because it offers a very rich API that allows us to do a lot of things.

我在想，既然可以通过 Live Editor 导出数据，

I'm thinking, since we can export data through Live Editor,

那么我为什么不将数据导入到一个数据库中，然后我写一个应用来展示这些数据呢？

Then why not import the data into a database and create an application to showcase that data?

这就是我今天要给你介绍的我做的一个新的应用 —— 我命名为 FC Career Top!

This is what I want to introduce to you today — a new application I created, I called it FC Career Top!

这个应用的目的就是解决我们上面所有的问题，并将整个过程变得自动化！

This application aims to address all the problems we talked about and make the entire process automated!

并且尽可能多的提供各种维度的数据展示，

and provide as many different dimensions of data display as possible.

以及我还做了一些有意思的小功能，我会逐步的介绍给你们。

I also added some interesting little features, I’ll share with you step by step.

这个应用是免费的，因为我使用的是oracle的免费主机，所以我暂时没有任何付费的计划。

This application is free because I'm using Oracle's free hosting, so I don't have any paid plans yet.

另外这个项目是开源的！如果你有兴趣，欢迎你一起来参与这个项目的开发，或者提出你的建议。

Also, this project is open source! If you're interested, feel free to join in the development or share your suggestions.

好，接下来让我为你展示一些如何使用这个应用。

Alright, let me show you how to use this application.

首先前往应用网站，app.fccareer.top，

First, go to this webpage and register for an account.

当然你可以通过 www.fccareer.top 来访问我制作的一个简陋的官网，然后点击 Go to APP 前往应用界面。

Of course, you can visit www.fccareer.top, the simple official website I made, and click Go to APP to go to the application interface.

接下来让我们注册一个账号。

And then let’s register an account.

这里请注意，这里需要输入邮箱，但是我并没有添加邮箱验证，你可以输入任意的邮箱

Note that you need to enter your email here. But I haven’t added email verification. So, you can use any email address.

但是我还是推荐你使用你真实的邮箱

But I still recommend using your real email.

首先，对你来说比较容易记忆，

Firstly, It’s easier to remember for you.

并且如果你忘记了密码，或者后续我不得不添加邮箱验证，

Plus, if you forget your password or if I have to add email verification later,

那么这个邮箱会成为唯一且重要的凭证。

that email will be your only important credential.

注册之后，你可以登录到这个应用。

After registering, you can log into the application.

这里还没有任何的数据。

There’s no data here yet.

首先，我们先选择一下你的游戏版本。

First, let’s select your game version.

点击一下这里，选择你的游戏版本。

Click here to choose your game version.

你可以随时切换你的游戏版本，并且数据是独立的。

You can switch your game version anytime, and the data will be independent for each version.

但是很遗憾的是，目前只支持一个存档。

Unfortunately, it only supports one save file right now.

但是目前我的使用体验来看，这足够了，

But from my experience, this is enough for now.

如果你们确实需要多个存档，我会考虑添加这个功能。

If you really need multiple save files, I’ll consider adding this feature.

我会以FC 25为例，所以我就选择FC 25。

OK, I'll use FC 25 as an example, so I'll select FC 25.

接下来，让我们转到Get Started页面。

Next, let’s go to the Get Started page.

这里有简单的说明，你可以看到如何使用这个应用，以及这个应用的依赖项。

"Here’s a quick guide where you can see how to use this app and what it depends on."

让我们实际上操作一遍吧，这更简单。

"Let’s actually walk through it together; it’ll be easier that way."

让我们返回桌面，

Let’s go back to the desktop.

首先打开Live Editor，

First, open Live Editor.

然后打开游戏，

Then launch the game.

这可能需要点时间，让我们等待一会，

This might take a moment, so let’s wait a bit.

好了我们进入了游戏，

Alright, we’re in the game now.

为了方便演示，我这里会创建一个新的存档。

To make it easier for the demo, I'll create a new manager career mode save.

好了，我们现在来到了经理生涯模式中。

"Okay, we’re now in the manager career mode."

这个时候，我们就需要再次唤醒Live Editor, 我这里是F9。

然后，我们打开 Lua engine 功能。

"Next, we’ll open the Lua engine features."

这里呢，我们需要一段可以导出数据的脚本。

Here, we need a script to export the data.

"Don't worry, I've got all of that prepared for you."

你可以在Get Started页面找到。

you can find it on the Get Started page.

点击这个按钮来复制代码。

Click this button to copy the code.

但是请注意，这个代码是根据你的账号生成的，里面包含了你的secret key，所以请不要分享给其他人。

Please note that this code is generated based on your account and includes your secret key, so do not share it with others.

当然，你可以随时在setting界面里面重置你的secret key。

"Of course, you can reset your secret key anytime in the settings page."

就像这样，
"Just like this,"

在我结束这个视频之后，我会重置我的secret key。
"After I finish this video, I'll reset my secret key."

让我们回到Get Started页面，代码中的secret key会自动替换成新的的secret key。
"Let’s go back to the Get Started page, and the secret key in the code will automatically be replaced with the new one."

所以我们再次复制这个代码。
"So, let’s copy this code again."

我们回到游戏，然后粘贴这个代码到这里。
"Now, let's go back to the game and paste this code here."

在执行这个代码之前，先让我为你简单的描述一下这个脚本做了什么。
"Before we run this code, let me briefly explain what this script does."

这个脚本利用了 Live Editor 的API，
"This script uses the Live Editor API

收集你的球员的数据并且发送到我们的后端服务器。
"Collects your player data and sends it to our backend server."

这样，就完成了一次数据收集。
"And that’s how we complete a data collection."

并且还使用了 Live Editor 提供的Event功能，

"And it also uses the event feature provided by the Live Editor

为游戏绑定了一个事件

to bind an event to the game."

当游戏中每经过一周，就会自动执行一遍这个过程

"Every time a week passes in the game, this process will automatically run."

这样就达到了我们说的自动化的目的。

"This way, we achieve the goal of automation."

好，让我们试一下。

"Alright, let’s give it a try."

粘贴代码后，点击运行按钮。

past the code, then click Execute.

可能你看到了一个黑窗口一闪而过，这就是发送你的数据到服务器的过程。
You might have seen a black window flash briefly; that’s the process of sending your data to the server.

你可能想问，为什么会有这样的一个该死的黑窗口，这很不优雅。
You might be wondering why there's this annoying black window; it’s not very elegant.

这是因为目前没有什么好的办法可以在Lua脚本中直接发送http请求。
"This is because there isn't a great way to send HTTP requests directly from Lua scripts right now."

所以我只能通过cmd来调用系统的curl命令来执行。
"So, I can only use the cmd to call the system's curl command to execute it."

后面我会尝试找到更好的解决方案。让这个过程更加的优雅。
"I'll try to find a better solution later to make this process more elegant."

但是实际上，一般情况下，这个黑窗口会非常快的消失，几乎看不到。
"But usually, this black window will disappear very quickly, almost without being noticed."

并且在下面，你可以看到一些日志，这是这个过程执行过程中的一些输出。
"And below, you can see some logs; these are outputs from the execution of the process."

现在让我们返回应用，然后刷新一下页面。

Now, let’s go back to the website and refresh the page.

如果一切正常，你会看到你的数据已经被成功的导入到了应用中。
"If everything went well, you should see that your data has been successfully imported into the app."

让我们暂时回到游戏中，让我们把时间快进一些，好能收集到更多的数据。
"Let’s temporarily go back to the game and speed up time a bit so we can collect more data."

并且在此之前，我先修改一下球员们的发展计划，以让他们的能力值更快的提升。
"And before that, let me adjust the players' development plans to help them improve their attributes faster."

先让我把窗口缩小一些，然后把网站放在右边。
"First, let me minimize the window a bit and place the website on the right."

OK，让我们开始快进。
"Okay, let’s start fast-forwarding."

你可以看到，每经过一周，就会弹出一个黑窗口，这就是我们之前说的事件。这样就完成了一次数据收集。
"You can see that every week, a black window pops up; that's the event we talked about. This completes another data collection."

并且，你可能已经注意到了，网页中不断地有通知弹出来
"And you may have noticed that notifications keep popping up on the webpage."

这是我另一个非常喜欢的功能，我将稍后为你介绍。
"That's another feature I really like, and I'll explain it to you later."

好了，时间过了一段时间了，我们已经收集了足够多的数据了。
"Alright, some time has passed, and we've collected enough data."

让我为你介绍一下这个应用的一些功能。
"Let me introduce you to some features of this app."

这里是球员的列表，
Here’s the player list.

你可以看到他们的基本信息，比如名字、年龄、位置、能力、潜力...
You can see their basic information, like name, age, position, ability, and potential.

并且这里有简单的搜索和排序功能。
"And there’s a simple search and sorting feature here."

并且如果球员的能力值已经达到了他的潜力值，那么潜力值会成为灰色，并且旁边有个小的标记。
If a player’s ability has reached their potential, the potential will appear in gray with a little marker next to it.

这个是模仿了FIFA/FC中的显示方式。
"This mimics the display style used in FIFA/FC."

并且我还添加一个功能，这是我最近才添加的，我称之为 ”金牌球员“
"And I've also added a feature, which I recently implemented. I call it 'Gold Player'."

在同一位置上，我会给那些能力值或者潜力值前三的球员添加一个标记，分别是金牌和银牌和铜牌。
"In the same position, I’ll mark the top three players based on their attributes or potential with gold, silver, and bronze badges."

这意味着他们是你的球队中最好或者最值得培养的球员。
"This means they are the best or most promising players in your team."

我觉得这是一个非常有用的功能，让我更容易的找到我的关键球员。
"I think this is a very useful feature that makes it easier for me to identify my key players."

然后是 Trends 页面，这里会显示了球员的能力值和潜力值的变化。
"Next is the Trends page, where you can see the changes in players' overall and potential."

每个球员都会有

并且我想为你介绍一个小功能，这个功能是我最近加入的。

And I’d like to share a little feature with you. This is something I recently added.

如果球员的能力值、潜力值、弱脚能力或者花式技巧有变化，会在应用里面通知你。

If there are any changes to a player's overall, potential, weak foot skill, or flair, the app will notify you.

就像这个一样。你们喜欢这个功能吗。我是非常喜欢。

Just like this. Do you like this feature? I really enjoy it!

这就像一个助教一样，每周跑过来告诉你，“嗨，老板，你的球员又取得了一些进步，这是报告，请查看一下”

It’s like having an assistant who comes over every week to say, "Hey, boss, your players have made some progress! Here’s the report—take a look!"

当然如果你实在不喜欢这个功能，你可以在设置页面里面关闭它。

Of course, if you really don’t like this feature, you can turn it off in the settings page.

这里提供了多种选项，你只开启你想要的通知。

Here, you have various options. You can enable only the notifications you want.

这里还有一个简单的详情页面，你可以看到球员更详细的属性信息，

There’s also a simple details page, you can see more detailed attributes of the player

以及他的成长的趋势。

and their growth trends.

这就是整个应用现在所有的内容了。

That’s all the content of the application for now.

最后我想谈一谈这个应用的缺点和对未来的一些展望。

Finally, I’d like to discuss some of the drawbacks of this application and my thoughts for the future.

我认为这对一个开源的和想造福游戏玩家的项目来说很重要。

I think this is important for an open-source project aimed at benefiting gamers.

正如你看到的，这个项目依赖于Live Editor，那就意味着你只能在PC上使用这个应用。

As you can see, this project relies on Live Editor, which means you can only use this application on a PC.

对于其他平台的玩家，就很遗憾了。

It’s unfortunate for players on other platforms.

当然了，你可以说，那就加入一个手动导入数据的功能呗。

Of course, you might suggest adding a manual data import feature.

这是一种方案没错。

That’s one solution, no doubt.

但是说真的，我非常的不想引入它。在一件事情不能完全自动化之前，那就是在给人添麻烦。

But honestly, I really don’t want to go that route. Until a process can be fully automated, it just adds more hassle.

我的初衷永远是解放人，而不是让你重复性的劳动。

My goal has always been to free people from repetitive tasks, not to make them do more of it.

但是让我讨论另一种可能性，就是基于OCR和LLM，这是一个非常有趣的方向。

But let me discuss another possibility, which is based on OCR and LLM. This is a very interesting direction.

这样的话，你可以通过手机拍照，然后应用会自动识别出你的球员数据。

In that case, you could take a photo with your phone, and the app would automatically recognize your player data.

这样起码不会让你重复的手动输入数据。

At least this way, you wouldn’t have to manually enter the data repeatedly.

但是这个中间会有很多障碍，让我们一步一步来完成。

But there will be many obstacles along the way, so let’s take it step by step.

我希望这个应用能够帮助到你，让你更好的管理你的球队，让你更好的享受这个游戏。

I hope this application can help you manage your team better and enhance your enjoyment of the game.

并且请记得，这个项目是免费且开源的，如果你有什么好的想法或者建议，欢迎你来参与这个项目中。

And please remember, this project is free and open source. If you have any great ideas or suggestions, feel free to get involved!

这是我们的discord， 以及这是这个项目的github， 我都会放在简介里面。

Here’s our Discord and the project’s GitHub link. I’ll put both in the video description.

好了，这就是我今天要给你介绍的内容，希望你喜欢，我们下次再见~

Alright, that’s all I wanted to share with you today. I hope you enjoyed it! See you next time!~
