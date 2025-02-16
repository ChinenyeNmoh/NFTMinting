## Communication Services
This platform allows users to mint NFTs by connecting their wallets using MetaMask or any Ethereum-compatible wallet. The minting process is executed on the Sepolia testnet, and the smart contract manages the NFT minting and transactions. Additionally, users can manage their minted NFTs through a clean UI,and  interact with metadata stored via the backend API.
## Getting Started

### Getting an Authorization key
1. Register and verify your email address to get Access token to the communication service

**Post** /register
- request body
```
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

```
2. This endpoint verifies the user's email using the token sent to their email and returns an access token to them

**GET** /verify/:id/:token
- response
```
{
  "message": "Email verified successfully.",
  "apiKey": "your-generated-api-key"
}

```

## SMS Sending

1. Send sms to a single user
**POST** /send-sms
- Request body
```
{
  "phone": "2349044246525",
  "message": "Your message content here"
}

```
**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```
- Response:
- 200: SMS sent successfully.
- 400: Missing phone or messages.
- 401: No communication Service Api Key
- 500: Failed to send sms due to a server error.
2. Send bulk messages

**POST** /send-multiple-sms

- Request body

```
{
  "phone": ["2349044246525", "2347038224367"],
  "message": "Your bulk message content here"
}

```
**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```
- Response:
- 200: SMS(s) sent successfully.
- 400: Missing phone or messages.
- 401: No communication Service Api Key
- 500: Failed to send sms due to a server error.

## Email Sending

**POST** /send-email
This endpoint sends emails to one or more users.

- request body : you can send either html content or text content
```
{
  "email": ["user1@example.com", "user2@example.com"],
  "subject": "Email Subject",
  "html": "<h1>Email Content</h1>",
  "cc":["makerer241@advitize.com"],
  "bcc":["adebayooluyemi4@gmail.com", "makerer241@advitize.com"], 
  "text": "Plain text version of the email"
}

```
**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```

- Response:
- 200: email(s) sent successfully.
- 400: Missing email.
- 401: No communication Service Api Key
- 500: Failed to send  email due to a server error.


## Push notification sending
**Post** /send-push-notification
This endpoint sends push notification to one or more users.

- request body 
```
{
  "title": "Notification Title",
  "body": "Notification body content",
  "token": ["token1", "token2"]
}


```

**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```

**Response**
- 200: Push notification sent successfully.
- 400: Missing title, body, or token.
- 401: No communication Service Api Key
- 500: Failed to send push notification due to a server error.



## Schedule notifications
**Post** /schedule-notification
 Schedules an SMS, email, or push notification to be sent at a specific time

**request body** 
The scheduleTime is a required Parameter.
The jobDetails is also required with  atleast one field. Either sms, email or push notification

```
{
  "scheduleTime": {
    "minute": "1",
    "hour": "14",
    "dayOfMonth": "7",
    "month": "*",
    "dayOfWeek": "3"
  },
  "jobDetails": {
    "sms": {
      "phone": "2347038224367",
      "message": "Your scheduled SMS message"
    },
    "email": {
      "email": "recipient@example.com",
      "subject": "Scheduled Email",
      "text": "This is a scheduled email."
    },
    "pushNotification": {
      "title": "Scheduled Notification",
      "body": "This is your scheduled push notification.",
      "token": ["token1"]
    }
  }
}

```


The scheduleTime field uses cron-like values:

- minute: Values from 0–59 (e.g., "30" for every 30th minute).
- hour: Values from 0–23 (e.g., "14" for 2 PM).
- dayOfMonth: Day of the month (e.g., "7" for the 7th of the month).
- month: Values from 1–12 or * for every month.
- dayOfWeek: Values from 0 (Sunday) to 6 (Saturday) or * for every day.

If you want the job to run every day at 12:30 PM on Fridays, set dayOfWeek to "5" and leave other values as it was.


**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```

**Response**
- 200: Notification(s) scheduled successfully returns a jobId that uniquely identifies the scheduled task in. Store this jobId for future reference(to stop job).

```
{
  "message": "Notification(s) scheduled successfully!",
  "jobId": "generated-job-id"
}

```
- 400: Schedule time or job details are missing.
- 401: No communication Service Api Key
- 500: Failed to schedule notification due to a server error.



## Stop notification
**Put** /stop-notification-job/:jobId
 Use this API to stop a previously scheduled notification job using the jobId returned from the scheduleNotification endpoint.


**Header**
include the access token gotten from your registration to your request headers
```
x-api-key : your-authorization-key

```

**Request Parameters**

jobId: The unique identifier for the scheduled job to be stopped.

**Response**
- 200: Notification(s) scheduled successfully returns a jobId that uniquely identifies the scheduled task in. Store this jobId for future reference(to stop job).

```
{
  "message": "Notification job stopped successfully.",
  
}

```
- 400: Invalid or missing jobId.
- 401: No communication Service Api Key
- 500: Failed to schedule notification due to a server error.
