### Pre-requisites

```
brew install pulumi jq awscli
```

### Setup


```
pulumi stack init dev
pulumi install
pulumi config set aws:region ap-southeast-2
```

### Upload Images
```
export ACC=$(aws sts get-caller-identity |jq -r '.Account')

REPO=spring/spring-starter
aws ecr describe-repositories --repository-names ${REPO} || aws ecr create-repository --repository-name ${REPO}

docker tag skhatri/spring-starter-java:latest $ACC.dkr.ecr.ap-southeast-2.amazonaws.com/${REPO}:1.0

aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin $ACC.dkr.ecr.ap-southeast-2.amazonaws.com

docker push $ACC.dkr.ecr.ap-southeast-2.amazonaws.com/${REPO}:1.0

```

### Deploy

```
export AWS_ACCOUNT=$ACC
pulumi up
```

### Verify

```
curl http://$(pulumi stack output url):8080/health
```

### Cleanup

```
pulumi destroy
pulumi stack rm
```
