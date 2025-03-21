AWS Lambda Deployment using CloudFormation

This open-source project helps automate the deployment of AWS Lambda functions using CloudFormation. It includes a script to package and deploy Lambda functions along with API Gateway configurations.

Project Structure

aws-lambda-deployment/
│── scripts/
│ ├── pushToServer.sh # Shell script for packaging and deploying Lambda functions
│── config/
│ ├── template_2.json # JSON file with API Gateway endpoints and Lambda metadata
│── src/
│ ├── generate_cf.js # Script to generate CloudFormation templates
│── README.md # Documentation on how to use the project
│── LICENSE # Open-source license (e.g., MIT)

Features

Automates the deployment of AWS Lambda functions using CloudFormation.

Reads API Gateway configurations from template_2.json.

Generates a CloudFormation template dynamically.

Deploys and updates the CloudFormation stack.

Setup & Usage

Prerequisites

AWS CLI installed and configured.

Node.js installed.

Bash shell for executing pushToServer.sh.

Deployment Steps

Clone the repository:

git clone https://github.com/your-repo/aws-lambda-deployment.git
cd aws-lambda-deployment

Install dependencies:

cd src
npm install

Update config/template_2.json with your API Gateway and Lambda configurations.

Run the deployment script:

./scripts/pushToServer.sh

File Descriptions

pushToServer.sh

Packages Lambda functions into a zip file.

Generates a CloudFormation template using generate_cf.js.

Deploys the stack using AWS CLI.

generate_cf.js

Reads template_2.json.

Creates a CloudFormation template dynamically.

template_2.json

Defines API Gateway routes and associated Lambda function handlers.

License

This project is licensed under the MIT License.

Pre-requisite
run aws configure before running this script.
