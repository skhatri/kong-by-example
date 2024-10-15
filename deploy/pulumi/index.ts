import * as awsx from "@pulumi/awsx";

const cluster = new awsx.classic.ecs.Cluster("cluster1");

const alb = new awsx.classic.lb.ApplicationLoadBalancer(
    "net-lb", { external: true, securityGroups: cluster.securityGroups });
const web = alb.createListener("web", { port: 8080, external: true });

const accountId = process.env.AWS_ACCOUNT || "";
if (accountId == "") {
  throw {"code":"AWS_ACCOUNT required"};
}

const repoBase = `${accountId}.dkr.ecr.ap-southeast-2.amazonaws.com/spring`;
const appImage = "spring-starter:1.0";
const img = `${repoBase}/${appImage}`;

const appService = new awsx.classic.ecs.FargateService("spring-app", {
    cluster,
    taskDefinitionArgs: {
        container: {
            image: img,
            cpu: 102, 
            memory: 500,
            portMappings: [ web ],
        },
    },
    desiredCount: 1,
});

export const url = web.endpoint.hostname;

