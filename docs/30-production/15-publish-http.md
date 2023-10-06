---
title: Publish HTTP(S) Endpoints
---


## Publishing HTTP(s) Endpoints

By default, Acorn will deploy with the default port configurations specified in the Acornfile. This behavior can be overriden at runtime if needed.

All published ports in the Acornfile that are defined as type HTTP will be deployed and exposed via 80/443 automatically. This traffic will go through a load balancer managed by Acorn and will be routed to the appropriate container based on host headers.

## DNS

Acorn creates a unique DNS name for each published port in the Acorn. If you would like to use a custom domain name, you can do so by launching with the domain name and creating a CNAME record in your DNS provider that points to the Acorn DNS name.

For example, to launch a site on `docs.cloudnautiuqe.com` you would launch the Acorn with the following command:

```shell
acorn run -p docs.cloudnautiuqe.com:docs my-docs
```

This will add the appropriate host entries to the Acorn loadbalancer so traffic will route once the CNAME has been setup in your DNS provider.

## TLS Certs

Acorn provides a unique domain name for each published port in the Acorn being deployed and also provides a TLS certificate. This certificate is automatically generated and managed by Acorn using letsencrypt. All http endpoints are referenced by their TLS protocol <https://generated-domain.on-acorn.io>.

When pointing a custom domain to the Acorn, a TLS certificate will also be created for that domain once the DNS is setup.
