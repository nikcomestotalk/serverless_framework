#!/bin/bash

# Configurable variables
S3_BUCKET_NAME=${S3_BUCKET_NAME:-"default-bucket-name"}
ZIP_FILE_NAME=${ZIP_FILE_NAME:-"lambda-deployment.zip"}
FILE_ZIP_NAME=${FILE_ZIP_NAME:-"lambda-package"}
STACK_NAME=${CF_STACK_NAME}
# Set working directory
WORK_DIR=$(pwd)
LAMBDA_PATH=${LAMBDA_PATH_FULL}

echo "Packaging Lambda functions..."
zip -r "$WORK_DIR/$ZIP_FILE_NAME" "$LAMBDA_PATH"

echo "Uploading to S3 bucket: $S3_BUCKET_NAME"
aws s3 cp "$WORK_DIR/$ZIP_FILE_NAME" "s3://$S3_BUCKET_NAME/"

echo "Generating CloudFormation template..."
node src/generate_cf.js > "$WORK_DIR/cloudformation-template.yaml"

echo "Deploying CloudFormation stack..."
aws cloudformation deploy \
    --template-file "$WORK_DIR/cloudformation-template.yaml" \
    --stack-name "$STACK_NAME" \
    --capabilities CAPABILITY_NAMED_IAM

echo "Deployment completed!"