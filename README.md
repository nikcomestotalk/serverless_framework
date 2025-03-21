# AWS Lambda Deployment using CloudFormation

This open-source project automates the deployment of AWS Lambda functions using CloudFormation. It includes a script to package and deploy Lambda functions along with API Gateway configurations.


## Why ?
At my current company, I pretty much run the whole show—managing the team, handling 80% of the technical work, taking care of infrastructure, backend, and even parts of the frontend (both web and Android). Basically, if something breaks, it’s probably my fault... but also my job to fix it.

To save money (because who doesn’t love free stuff?), I decided to run everything on AWS Lambda. Since I kept hearing about the Serverless Framework, I thought, why not? It worked like a charm… until it didn’t. Turns out, AWS has this fun little 500-resource limit, and my deployments just stopped. Even serverless-plugin-split-stacks couldn’t save me.

At this point, I had two choices:
1. Cry.
2. Write my own CloudFormation template.
 I went with option 2. In just a day or two, I hacked together a solution, removed unnecessary resources, and—voila!—everything was working perfectly again. (Nested resources support coming soon because, well… I’m not that lazy.)

Then I casually mentioned this to a friend, and he was like, Dude, just outsource it! So here we are—me, my code, and hopefully your 1000 GitHub stars. ⭐⭐⭐


## Project Structure
```
aws-lambda-deployment/
│── scripts/
│   ├── pushToServer.sh  # Shell script for packaging and deploying Lambda functions
│── config/
│   ├── template_2.json   # JSON file with API Gateway endpoints and Lambda metadata
│── src/
│   ├── generate_cf.js    # Script to generate CloudFormation templates
│── README.md             # Documentation on how to use the project
│── LICENSE               # Open-source license (e.g., MIT)
```

## Features
- Automates the deployment of AWS Lambda functions using CloudFormation.
- Reads API Gateway configurations from `template_2.json`.
- Generates a CloudFormation template dynamically.
- Deploys and updates the CloudFormation stack.

## Setup & Usage

### Prerequisites
- AWS CLI installed and configured.
- Node.js installed.
- Bash shell for executing `pushToServer.sh`.

### Deployment Steps

#### 1. Clone the repository:
```sh
git clone https://github.com/your-repo/aws-lambda-deployment.git
cd aws-lambda-deployment
```

#### 2. Install dependencies:
```sh
cd src
npm install
```

#### 3. Update Configuration:
Modify `config/template_2.json` with your API Gateway and Lambda configurations.

#### 4. Run the deployment script:
```sh
./scripts/pushToServer.sh
```

## File Descriptions

### `pushToServer.sh`
- Packages Lambda functions into a zip file.
- Generates a CloudFormation template using `generate_cf.js`.
- Deploys the stack using AWS CLI.

### `generate_cf.js`
- Reads `template_2.json`.
- Creates a CloudFormation template dynamically.

### `template_2.json`
- Defines API Gateway routes and associated Lambda function handlers.

## License
This project is licensed under the **MIT License**.

## Pre-requisite
Before running the script, configure AWS CLI:
```
aws configure
```
