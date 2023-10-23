---
title: Publish TCP/UDP
---

## Publishing TCP/UDP Endpoints

By default, Acorn will deploy with the default port configurations specified in the Acornfile. This behavior can be overridden at runtime if needed. For TCP/UDP ports a load balancer and unique DNS name is created by Acorn pointing to the exposed endpoint on a random port.

The way to work with publishing ports is the `-p` flag. The flag is used to publish ports that were not defined to be published and/or assign custom names. In the examples below, we are using it to assign a name to a port that was defined to be published in the Acornfile.

### DNS settings

Acorn creates a unique DNS name for each published port in the Acorn. If you would like to use a custom domain name, you can do so by launching with the domain name and creating a CNAME record in your DNS provider that points to the Acorn DNS name.

For instance when running a Minecraft server you would launch the Acorn with the following command:

```shell
acorn run -n mc ghcr.io/acorn-io/examples/minecraft
mc
# STATUS: ENDPOINTS[] HEALTHY[] UPTODATE[] 
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] (container: mc): pending; (volume: mc-data): pending
# STATUS: ENDPOINTS[tcp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:25565] HEALTHY[0/1] UPTODATE[1] (container: mc): not ready
# ...
# ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[udp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:XXXXX, tcp://k8s-mc7cb7bb-mcpublis-1c9c1da3a3-a2767a33d62c518a.elb.us-east-2.amazonaws.com:XXXXX] HEALTHY[1] UPTODATE[1] OK |
# └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

You could now create a CNAME to the address in the ENDPOINTs section of the output. Note that the ports are randomly assigned and will need to be accounted for when configuring your applications to connect.

## Additional Info

* [Defining Ports in Acornfiles](/authoring/containers#network-ports)
