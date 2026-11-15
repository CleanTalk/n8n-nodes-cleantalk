# n8n-nodes-cleantalk

This is an n8n community node. It lets you use [CleanTalk Anti-Spam](https://cleantalk.org/) in your n8n workflows.

CleanTalk is a cloud anti-spam service that checks form submissions, comments and registrations in real time, without CAPTCHA. The verdict is based on the sender's email, IP address, message text and behavior, matched against spam activity data from more than 1,000,000 protected websites. Use this node to stop spam leads before they reach your CRM, inbox, spreadsheet or chat.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The package name is `n8n-nodes-cleantalk`.

## Operations

Resource **Submission**:

- **Check Message**: checks a contact form submission, comment, review or any other message for spam. Required fields: Sender Email and Message. Optional: Sender Name, Sender IP Address, JavaScript Enabled, Seconds Spent on the Form, Request Headers, Bot Detector Event ID.
- **Check Registration**: checks a new user registration or sign-up for spam. Required field: Sender Email. Optional fields are the same as above, without Message.

Both operations return one item per input item:

| Field | Meaning |
| --- | --- |
| `isSpam` | `true` if CleanTalk blocked the submission, `false` if it is allowed |
| `allow` | Raw server decision: `1` allowed, `0` forbidden |
| `codes` | Reason codes, space separated, for example `DENIED BL` or `ALLOWED` ([full list](https://cleantalk.org/help/api-check-message)) |
| `comment` | Human-readable verdict that can be shown to the visitor |
| `blacklisted` | `true` if the sender is in the CleanTalk blacklists |
| `fastSubmit` | `true` if the form was submitted too quickly |
| `jsDisabled` | `true` if the submission came without JavaScript |
| `stopQueue` | `true` for obvious spam that needs no manual review |
| `requestId` | Request ID, useful when contacting CleanTalk support |

## Credentials

1. Sign up at [cleantalk.org](https://cleantalk.org/register?product=anti-spam) (7-day free trial, no card needed).
2. Open the dashboard at [cleantalk.org/my](https://cleantalk.org/my) and copy the **Access key** of your Anti-Spam service.
3. In n8n create new **CleanTalk API** credentials and paste the key. n8n verifies the key against your CleanTalk account when you save.

One access key can be used in any number of workflows.

## Compatibility

Tested with n8n 2.x. Requires n8n 1.0 or later.

## Usage

A typical workflow:

1. **Webhook** or **Form Trigger** receives the submission.
2. **CleanTalk** checks it (map the visitor's email, message, name and IP address from the trigger).
3. **IF** node on `{{ $json.isSpam }}`:
   - `false`: send the lead to your CRM, email or Slack.
   - `true`: log it to a spreadsheet or simply stop.

Tips:

- Pass the visitor's IP address and the time spent on the form whenever your trigger provides them. Both improve accuracy.
- If the form page loads the [CleanTalk Bot Detector](https://cleantalk.org/help/bot-detector) script, pass its `event_token` value in the Bot Detector Event ID field.
- Set the node's **On Error** setting to "Continue" if you prefer to let the submission through when CleanTalk is unreachable. The item then contains an `error` field instead of a verdict.

To test the node, submit a message from the address `stop_email@example.com`. CleanTalk always blocks it.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [CleanTalk Anti-Spam API: check_message](https://cleantalk.org/help/api-check-message)
- [CleanTalk Anti-Spam API: check_newuser](https://cleantalk.org/help/api-check-newuser)
- [CleanTalk help center](https://cleantalk.org/help)

## Version history

- 0.1.0: initial release with Check Message and Check Registration operations.
