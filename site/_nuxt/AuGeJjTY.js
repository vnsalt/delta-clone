var n=Object.defineProperty;var e=(a,i)=>n(a,"name",{value:i,configurable:!0});import{b3 as l,bi as t,aJ as s}from"./BUfTxZIz.js";function m(){return s`
        ...,
        "title": coalesce(presentation.title, sections[_type == 'header'][0].title, metadata.title, ""),
        "date": setup.date,
        coalesce(presentation.media, metadata.image, sections[_type == 'header'][0].image) != null => {
          "image": coalesce(presentation.media[0], metadata.image, sections[_type == 'header'][0].image){...${l()}},
        },
        "category": setup.tag->title,
        externalLink != null => {
          "to": externalLink.link[0]{...${t()}},
        },
        externalLink == null => {
          "to": {
            ...${t()},
          }
        },
        `}e(m,"articleCard");export{m as a};
