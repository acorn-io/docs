---
title: Publish HTTP(S) Endpoints
---


## Publishing HTTP(s) Endpoints

By default, Acorn will deploy with the default port configurations specified in the Acornfile. This behavior can be overriden at runtime if needed.

All published ports in the Acornfile that are defined as type HTTP will be deployed and exposed via 80/443 automatically. This traffic will go through a load balancer managed by Acorn and will be routed to the appropriate container based on host headers.

## DNS

Acorn creates a unique DNS name for each published port in the Acorn. If you would like to use a custom domain name, you can do so by launching with the domain name and creating a CNAME record in your DNS provider that points to the Acorn DNS name.

For example, to launch a site on `hello.cloudnautiuqe.com` you would launch the Acorn with the following command:

```shell
acorn run -n hello-world -p hello.cloudnautique.com:webapp:80 ghcr.io/acorn-io/hello-world
# hello-world
# STATUS: ENDPOINTS[] HEALTHY[] UPTODATE[] 
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] waiting for quota allocation
# STATUS: ENDPOINTS[] HEALTHY[0] UPTODATE[0] (container: webapp): pending
# STATUS: ENDPOINTS[https://hello-world-2b949c2a.0bh0qd.on-acorn.io, https://hello.cloudnautique.com] HEALTHY[0/1] UPTODATE[1] (container: webapp): ContainerCreating
# 
# ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
# | STATUS: ENDPOINTS[https://hello-world-2b949c2a.0bh0qd.on-acorn.io, https://hello.cloudnautique.com] HEALTHY[1] UPTODATE[1] OK |
# └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

This will add the appropriate host entries to the Acorn load balancer so traffic will route once the CNAME has been setup in your DNS provider.

### CNAME Record

To setup the CNAME, go to your DNS provider and create a CNAME record for `hello.cloudnautique.com` that points to `hello-world-2b949c2a.0bh0qd.on-acorn.io`. Once the DNS record has been created, the site will be available at `https://hello.cloudnautique.com`.

## TLS Certs

Acorn provides a unique domain name for each published port in the Acorn being deployed and also provides a TLS certificate. This certificate is automatically generated and managed by Acorn using letsencrypt. All http endpoints are referenced by their TLS protocol <https://generated-domain.on-acorn.io>.

When running an Acorn with a custom domain assigned to the port like:

```acorn
acorn run -p docs.cloudnautique.com:docs my-docs
```

A TLS certificate will be issued for `docs.cloudnautique.com` when DNS is configured to point to the Acorn DNS name. The certificate will be automatically renewed by Acorn when it is close to expiring.
