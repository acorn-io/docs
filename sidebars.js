/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "sidebar": [
    'overview',
    'getting-started',
    'install',
    {
      type: 'category',
      label: 'Create an Acorn',
      items: [
        'create/image',
        'create/catalog',
        'create/playground',
      ],
    },
    {
      type: 'category',
      label: 'Shared Acorns',
      items: [
        "sharing-acorns/overview",
        "sharing-acorns/links",
      ]
    },
    "hands-on-with-acorn",
    "sandbox",
    {
      "type": "category",
      "label": "Developing with Acorn",
      items: [
        "development/dev-mode",
        "development/vsc",
      ]
    },
    {
      "type": "category",
      "label": "Acorns in Production",
      items: [
        "production/acorn-sizing",
        "production/persistent-storage",
        "production/publish-http",
        "production/publish-tcp-udp",
        "production/port-forwarding",
        "production/secrets",
        "production/args",
      ],
    },
    {
      "type": "category",
      "label": "Databases",
      items: [
        "databases/overview",
        "databases/mariadb",
        "databases/postgres",
        "databases/redis",
        "databases/mongodb",
      ],
    },
    {
      type: "category",
      label: "AWS Integration",
      items: [
        "aws/overview",
        //"aws/infrastructure",
        //"aws/services"
      ]
    },
    {
      "type": "category",
      "label": "Advanced Topics",
      "items": [
        "advanced/publishing",
        "advanced/ci-gh-actions",
        "advanced/cd-autoupgrades",
        "advanced/compose-to-acorn",
        "advanced/projects",
        "advanced/upgrades",
        "advanced/events",
        "advanced/linking-acorns",
      ],
    },
    {
      "type": "category",
      "label": "Authoring Acorns",
      "items": [
        "authoring/overview",
        "authoring/best-practices",
        "authoring/structure",
        "authoring/containers",
        "authoring/volumes",
        "authoring/secrets",
        "authoring/jobs",
        "authoring/args-and-profiles",
        "authoring/localdata",
        "authoring/permissions",
        "authoring/services",
        "authoring/advanced",
        "authoring/labels",
        "authoring/nested-acorns",
        "authoring/create-services"
      ]
    },
    {
      "type": "category",
      "label": "Reference",
      "items": [
        {
          "type": "link",
          "label": "Command Line",
          "href": "https://docs.acorn.io/reference/command-line/acorn",
        },
        "reference/acornfile",
        "reference/auto-upgrades",
        "reference/encryption",
      ],
      "collapsed": true
    },
    "faq",
  ]
};

module.exports = sidebars;
