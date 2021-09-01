npm run build
aws s3 sync dist s3://demo.testnet.verida.io --profile verida-testnet --delete
aws cloudfront create-invalidation --distribution-id EWEA2O1K4RSLI --profile verida-testnet --paths "/*"
