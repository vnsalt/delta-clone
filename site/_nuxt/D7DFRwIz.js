var o=Object.defineProperty;var n=(e,a)=>o(e,"name",{value:a,configurable:!0});import{Z as t,aI as r}from"./BUfTxZIz.js";function i(e="pt"){return r`
  *[_type == 'sharedContent' && lang == "${e}"][0].footer{
    ...,
    "mainGroups": *[_type == 'sharedContent' && lang == "${e}"][0].navigation.main[] {
      "type": _type,
      _type == 'group' => {
        name,
        "links": subPages[]{
          _type == 'group' => {
            "type": 'group',
            "mainPage": mainPage { ${t()} },
            "subPages": subPages[] { ${t()} }
          },
          _type == 'internalCta' => { 
            ${t()},
          }
        },
      },
      _type == 'single' => {
        ${t()},
      },
    },
    "secondaryGroups": *[_type == 'sharedContent' && lang == "${e}"][0].navigation.secondary[]{${t()}},
    "socials": *[_type == 'sharedContent' && lang == "${e}"][0].social.list[] {
      network,
      url
    },
    "contacts": contacts[]{
          ...,
          _type == 'block' => {
            ...,
            style == null => {
              "style": 'normal'
            },
            markDefs[]{
              ...,
              _type == "externalLink" => {
               "to": {
                "href": href,
                "_type": 'external'
               },
               
              },
            }
          },
        },
    "underFooter": underFooter {
      trademark,
      "links": links[]{${t()}},
    }
	}
`}n(i,"footer");export{i as f};
