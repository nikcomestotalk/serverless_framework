const fs = require('fs');

const templatePath = '../config/template_2.json';
const outputPath = '../cloudformation-template.yaml';

// Read the template JSON file
const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

const cloudFormationTemplate = {
    AWSTemplateFormatVersion: '2010-09-09',
    Resources: {
        LambdaExecutionRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
                AssumeRolePolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: { Service: 'lambda.amazonaws.com' },
                            Action: 'sts:AssumeRole',
                        },
                    ],
                },
                Policies: [
                    {
                        PolicyName: 'LambdaBasicExecution',
                        PolicyDocument: {
                            Version: '2012-10-17',
                            Statement: [
                                {
                                    Effect: 'Allow',
                                    Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                                    Resource: '*',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
};

Object.entries(templateData).forEach(([functionName, config]) => {
    const lambdaResourceName = `${functionName}Lambda`;
    const apiGatewayResourceName = `${functionName}ApiGateway`;

    // Define Lambda function
    cloudFormationTemplate.Resources[lambdaResourceName] = {
        Type: 'AWS::Lambda::Function',
        Properties: {
            FunctionName: functionName,
            Handler: config.handler,
            Role: { 'Fn::GetAtt': ['LambdaExecutionRole', 'Arn'] },
            Runtime: 'nodejs18.x',
            Code: {
                S3Bucket: { Ref: 'S3BucketName' },
                S3Key: { Ref: 'LambdaZipFile' },
            },
            MemorySize: 128,
            Timeout: 10,
        },
    };

    // Define API Gateway for each function
    if (config.events) {
        config.events.forEach((event, index) => {
            if (event.http) {
                const { path, method, cors } = event.http;
                const apiResource = `${apiGatewayResourceName}${index}`;

                cloudFormationTemplate.Resources[apiResource] = {
                    Type: 'AWS::ApiGateway::Method',
                    Properties: {
                        HttpMethod: method.toUpperCase(),
                        AuthorizationType: 'NONE',
                        Integration: {
                            IntegrationHttpMethod: 'POST',
                            Type: 'AWS_PROXY',
                            Uri: {
                                'Fn::Sub': [
                                    'arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${LambdaArn}/invocations',
                                    { LambdaArn: { 'Fn::GetAtt': [lambdaResourceName, 'Arn'] } },
                                ],
                            },
                        },
                    },
                };

                if (cors) {
                    cloudFormationTemplate.Resources[apiResource].Properties.Integration.IntegrationResponses = [
                        {
                            StatusCode: 200,
                            ResponseParameters: {
                                'method.response.header.Access-Control-Allow-Origin': "'*'",
                            },
                        },
                    ];
                }
            }
        });
    }
});

// Write the generated CloudFormation template to a file
fs.writeFileSync(outputPath, JSON.stringify(cloudFormationTemplate, null, 2));

console.log(`CloudFormation template generated at ${outputPath}`);
