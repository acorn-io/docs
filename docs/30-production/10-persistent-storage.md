---
title: Persistent Storage
---

Applications that need to write data  to disk will need to make use of volumeclasses. Acorn provides a default volume class in each region that persists and one that is ephemeral for scratch space. When you launch an application that declares a volume, the default volumeclass is used.

## Volume Classes

To see which volume class is the default, along with other available types, you can run the following command:

```shell
acorn offerings volumeclasses
# NAME         DEFAULT   INACTIVE   STORAGE-CLASS   SIZE-RANGE     DEFAULT-SIZE   ACCESS-MODES   REGIONS                                               DESCRIPTION
# ephemeral                                         Unrestricted                                 aws-us-east-2,acorn-sb-us-east-2,acorn-gp-us-east-2   Acorn-generated volume class representing ephemeral volumes not backed by a storage class
# ebs-retain   *                    ebs-retain      Unrestricted                                 aws-us-east-2,acorn-sb-us-east-2,acorn-gp-us-east-2   Acorn-generated volume class representing the storage class ebs-retain
```

### Configuring volumes at runtime

Acorn images can define volumes. To see which volumes are available for an Acorn image you can run `--help` on the image.

```shell
acorn run [IMAGE] --help
# ...
# Volumes: my-data
# ...
```

These values can be customized at runtime by passing `-v` arguments. For example, the following command will cause the "my-data" volume to be created with `5G` of storage and using the `fast` volume class:

```shell
acorn run -v my-data,size=5G,class=ebs-retain[IMAGE]
```

The volume class used, including the default, may have restrictions on the size of volumes created or the access modes available. If your volume uses a class that is not available or uses class settings that violate its rules, then will not run. A descriptive error will be produced to explain any failures.

You can see a list of available volume classes and their restrictions, if any, with the [`acorn offerings volumeclasses`](https://runtime-docs.acorn.io/reference/command-line/acorn_offerings_volumeclasses) command.
