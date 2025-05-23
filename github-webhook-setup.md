# Setting Up GitHub Webhooks

To automatically trigger Jenkins builds when code is pushed to GitHub, you need to set up a webhook:

## Step 1: Get Jenkins Webhook URL

1. Get your Jenkins server URL (e.g., http://your-jenkins-server:8080/)
2. The webhook URL will be: `http://your-jenkins-server:8080/github-webhook/`

## Step 2: Configure GitHub Webhook

1. Go to your GitHub repository
2. Click on "Settings" > "Webhooks" > "Add webhook"
3. Set the following:
   - Payload URL: Your Jenkins webhook URL (from Step 1)
   - Content type: application/json
   - Secret: (Optional) Create a secret token for security
   - Events: Select "Just the push event"
   - Active: Check this box
4. Click "Add webhook"

## Step 3: Configure Jenkins

1. In your Jenkins job configuration:
   - Under "Build Triggers", select "GitHub hook trigger for GITScm polling"
   - If you set a secret token, add it to the Jenkins job configuration

## Step 4: Test the Integration

1. Push a commit to your GitHub repository
2. Check if Jenkins automatically starts a build job
3. Verify the build logs to ensure the webhook triggered correctly

## Troubleshooting

- Check GitHub webhook delivery history for errors
- Ensure Jenkins server is accessible from the internet
- Verify firewall settings allow incoming webhook requests
- Check Jenkins logs for any webhook-related issues 