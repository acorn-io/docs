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
      ],
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
        {
          "type": "category",
          "label": "Authoring Acornfiles",
          "items": [
            "reference/authoring/overview",
            "reference/authoring/best-practices",
            "reference/authoring/acornfile",
            "reference/authoring/structure",
            "reference/authoring/containers",
            "reference/authoring/volumes",
            "reference/authoring/secrets",
            "reference/authoring/jobs",
            "reference/authoring/args-and-profiles",
            "reference/authoring/localdata",
            "reference/authoring/permissions",
            "reference/authoring/services",
            "reference/authoring/advanced",
            "reference/authoring/nested-acorns"
          ]
        },
        "reference/auto-upgrades",
        "reference/encryption",
        "reference/services"
      ],
      "collapsed": true
    },
  ]
};

module.exports = sidebars;
