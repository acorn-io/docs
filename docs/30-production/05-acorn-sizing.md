---
title: Acorn Sizing
---

When running applications you'll want to make sure that you have enough cpu and memory resources to run your application. Acorn provides two methods for sizing your application. You can use a compute class which specifies a type of instance, memory range, and default memory allocation. You can also specify memory for your Acorn within that compute class memory range.

## Compute Classes

In order to see what compute classes are available, you can run:

```shell
acorn offerings computeclasses
# NAME      DEFAULT   MEMORY RANGE   MEMORY DEFAULT   REGIONS                                               DESCRIPTION
# c5                  128Mi-14Gi     512Mi            aws-us-east-2                                         Compute optimized AWS instances (c5)
# default   *         128Mi-14Gi     512Mi            aws-us-east-2,acorn-gp-us-east-2,acorn-sb-us-east-2   Default compute class
# m5                  128Mi-14Gi     512Mi            aws-us-east-2                                         General purpose AWS instances (m5)
# r5                  128Mi-62Gi     512Mi            aws-us-east-2                                         Memory optimized AWS instances (r5)
# t3                  128Mi-14Gi     512Mi            aws-us-east-2                                         Burstable AWS instances (t3)
```

| **NOTE:** *The output might be different depending on your region and plan.*

This produces a list of available compute classes available for you to use. The default compute class is marked with a `*`. When running your application you can specify the compute class you want to use with the `--compute-class` flag.

```shell
acorn run --compute-class m5 ghcr.io/acorn-io/hello-world
```

## Memory

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

### Valid memory values

Supported value formats for memory flags include

- 1_234 ->`1234`
- 5M -> `5_000_000`
- 1.5Gi ->`1_610_612_736`
- 0x1000_0000 -> `268_435_456`

These all translate into an exact amount of bytes. We encourage you use the binary representation of large quantities of bytes when interacting with memory such as `Ki`, `Mi`, `Gi`, and `Pi`.
