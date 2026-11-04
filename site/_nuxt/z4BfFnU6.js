var l=Object.defineProperty;var e=(t,r)=>l(t,"name",{value:r,configurable:!0});import{bo as n,bi as a,aI as o,bT as c}from"./BUfTxZIz.js";function u(){return o` {
    "thumb": ^.presentation.media[]{...${n()}}[0],
    "category": category-> {
      "title": content.title,
      "singleTitle": coalesce(content.singleTitle, content.title),
      "slug": metadata.slug.current
    },
    "subcategory": subcategory-> {
      "title": content.title,
      "slug": metadata.slug.current
    },
    "variants": [
      {
        "category": {
          "title": category->content.title,
          "singleTitle": coalesce(category->content.singleTitle,category->content.title),
          "slug": category->metadata.slug.current
        },
        "subcategory": {
          "title": subcategory->content.title,
          "slug": subcategory->metadata.slug.current
        },
        "characteristics": sections[][_type == 'header'][0].characteristics,
        "link" : {
          ...${a("^.")},
        },
      },
      ...variants[]-> {
        "category": {
          "title": setup.category->content.title,
          "singleTitle": coalesce(setup.category->content.singleTitle, setup.category->content.title),
          "slug": setup.category->metadata.slug.current
        },
        "subcategory": {
          "title": setup.subcategory->content.title,
          "slug": setup.subcategory->metadata.slug.current
        },
        "characteristics": content.sections[][_type == 'header'][0].characteristics,
        "link" : {
          ...${a()},
        },
      }
    ],
    price,
    "colorSchema": colorSchema {
      "accentColor": accentColor.hex,
      "backgroundColor": backgroundColor.hex,
      "altAccentColor": altAccentColor.hex,
      "altBackgroundColor": altBackgroundColor.hex,
    }
  }
`}e(u,"productSetup");function g(t="pt"){return o`
  title,
  list[]-> {...${c()}},
  "allProducts": *[_type == "page.product" && lang == "${t}"] | order(coalesce(presentation.title, metadata.title, "") asc) {...${c()}}
  `}e(g,"relatedProducts");export{u as p,g as r};
