# Pyrgoose Bot

A bot to fulfill's Telecommunications Engineering Students at ITB's needs

## How to use

If you've never make a LineBot before, please refer to Line's official **'Building a Bot'** docs : https://developers.line.biz/en/docs/messaging-api/building-bot/

### Install deps

```shell
$ npm install
```

### Configuration

```shell
$ export CHANNEL_SECRET=YOUR_CHANNEL_SECRET
$ export CHANNEL_ACCESS_TOKEN=YOUR_CHANNEL_ACCESS_TOKEN
$ export PORT=1234
$ export FIREBASE_URL=YOUR_FIREBASE_URL
```

If you want to use the meme feature, you have to add your imgflip account

```shell
$ export IMGFLIP_USERNAME=YOUR_IMGFLIP_USERNAME
$ export IMGFLIP_PASSWORD=YOUR_IMGFLIP_PASSWORD

```

### Run

```shell
$ node .
```

## Webhook URL

```
https://your.base.url/callback
```
