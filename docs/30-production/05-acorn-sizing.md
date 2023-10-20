---
title: Acorn Sizing
---

When running Acorns you'll want to make sure that you have enough cpu and memory resources to run your application. Acorn provides two methods for sizing your application. You can use a ComputeClass which specifies a type of instance, memory range, and default memory allocation. The second method is to specify memory directly for your Acorn within that compute class memory range.

CPU resources are allocated based on the memory requests. If you need more CPU resources, you can use compute optimized ComputeClasses or specify more memory for your Acorn.

## ComputeClasses

In order to see what compute classes are available to use in your project, you can run:

```shell
acorn offerings computeclasses
# NAME      DEFAULT   MEMORY RANGE   MEMORY DEFAULT   REGIONS                                               DESCRIPTION
# c5                  128Mi-14Gi     512Mi            aws-us-east-2                                         Compute optimized AWS instances (c5)
# default   *         128Mi-14Gi     512Mi            aws-us-east-2,acorn-gp-us-east-2,acorn-sb-us-east-2   Default compute class
# m5                  128Mi-14Gi     512Mi            aws-us-east-2                                         General purpose AWS instances (m5)
# r5                  128Mi-62Gi     512Mi            aws-us-east-2                                         Memory optimized AWS instances (r5)
# t3                  128Mi-14Gi     512Mi            aws-us-east-2                                         Burstable AWS instances (t3)
```

| **NOTE:** *The output might be different depending on your project, region and plan.*

This produces a list of available compute classes available. The default ComputeClass is marked with a `*`. When running your application you can specify the compute class you want to use with the `--compute-class` flag.

```shell
acorn run --compute-class m5 ghcr.io/acorn-io/hello-world
```

The above example will launch the hello world acorn on an m5 type of machine. While possible, we don't recommend specifying a ComputeClass in an Acornfile that is intended to share. This is because the ComputeClass might not be defined in everyone's projects. Instead, we recommend specifying the ComputeClass when running the Acorn, and in Acornfiles used to define your specific deployment through nested acorns.

### Change Existing Acorn ComputeClass

In order to adjust an existing Acorn's ComputeClass, you can use the `update` command.

For example if we use our running hello-world app from above that was launched with the `m5` compute class we can change it to a `t3` compute class with the following command:

```shell
acorn update --compute-class t3 hello-world
```

This will relaunch the Acorn on a `t3` compute class with the same args and defaults as the original command.

## Memory Presets and Customizations

You can also specify the memory for your Acorn within the memory range of the compute class. For example the default compute class from above:

```shell
NAME      DEFAULT   MEMORY RANGE   MEMORY DEFAULT   REGIONS                                               DESCRIPTION
default   *         128Mi-14Gi     512Mi            aws-us-east-2,acorn-gp-us-east-2,acorn-sb-us-east-2   Default compute class
```

Automatically sets the memory requests to 512Mi. If you find that your application needs more memory, you can specify the memory with the `--memory` flag.

```shell
acorn run -m 1Gi -n hello-world ghcr.io/acorn-io/hello-world
# or if you are updating an existing running Acorn with the name hello-world
acorn update -m 1Gi hello-world
```

### Memory values in Acornfiles

You can also specify the memory value for containers in your Acornfile. This is useful if you know the minimum memory requirement is above the defaults for the compute class you are using.

```acorn
containers: web: {
    image "nginx"
    memory: "1Gi"
}
```

This will allocate 1Gi of memory for the web container.

When deploying an Acorn or Service, you can assign additional memory as well. This is useful as you might want to allocate more memory for your production workloads vs. development. Here is an example:

```acorn
services: mariadb: {
    image: "ghcr.io/acorn-io/mariadb:v10.#.#-#"
    memory: "4Gi"
}
```

### Valid memory values

Supported value formats for memory flags include

- 1_234 ->`1234`
- 5M -> `5_000_000`
- 1.5Gi ->`1_610_612_736`
- 0x1000_0000 -> `268_435_456`

These all translate into an exact amount of bytes. We encourage you use the binary representation of large quantities of bytes when interacting with memory such as `Ki`, `Mi`, `Gi`, and `Pi`.

## Set ComputeClass in the Acornfile

Setting compute classes in your Acorn file is not recommended because it restricts portability of your Acorn.

If you are using an Acornfile to define your specific deployment for CD [CD and AutoUpgrades](advanced/cd-autoupgrades) then it makes sense to define in the Acornfile.

### On an Acorn and Service

When describing an Acorn deployment in an Acornfile, you can specify the compute class with the `class` field on the acorn:

```acorn
services: mariadb: {
    class: "m5"
    image: "ghcr.io/acorn-io/mariadb:v10.#.#-#"
    autoUpgrade: true
}

acorns: app: {
    class: "c5"
    image: "ghcr.io/acorn-io/hello-world:v1.#.#"
    autoUpgrade: true
}
```

In this example, the `mariadb` service will be deployed on an `m5` compute class and the `app` acorn will be deployed on a `c5` compute class. If you don't specify a compute class, the default compute class will be used, same as on the command line.

### On a container

This is possible, but not recommended. If you want to specify a compute class for a container, you can do so with the `class` field on the container:

```acorn
containers: nginx: {
    image: "nginx"
    class: "t3"
}
```

In this example, the `nginx` container will be deployed on a `t3` compute class. If you don't specify a compute class, the default compute class will be used, same as on the command line.
