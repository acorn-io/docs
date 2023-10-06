---
title: Publish TCP/UDP
---

## Publishing TCP/UDP Endpoints

By default, Acorn will deploy with the default port configurations specified in the Acornfile. This behavior can be overriden at runtime if needed. For TCP/UDP ports a load balancer and unique DNS name is created by Acorn pointing to the exposed endpoint.

### DNS setttings

Acorn creates a unique DNS name for each published port in the Acorn. If you would like to use a custom domain name, you can do so by launching with the domain name and creating a CNAME record in your DNS provider that points to the Acorn DNS name.

For instance when runnning a Minecraft server you would launch the Acorn with the following command:

```shell
acorn run -n mc ghcr.io/acorn-io/examples/minecraft
mc
# STATUS: ENDPOINTS[] HEALTHY[] UPTODATE[] 
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] (container: mc): pending; (volume: mc-data): pending
# STATUS: ENDPOINTS[tcp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:25565] HEALTHY[0/1] UPTODATE[1] (container: mc): not ready
# ...
# ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[udp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:19132, tcp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:25565] HEALTHY[1] UPTODATE[1] OK |
# └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

You could now create a CNAME to the address in the ENDPOINTs section of the output.
