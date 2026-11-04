var l=Object.defineProperty;var e=(t,r)=>l(t,"name",{value:r,configurable:!0});import{Z as i,aI as o}from"./BUfTxZIz.js";import{a}from"./AuGeJjTY.js";function p(t){return o`
    upperTitle,
    title,
    "button": button {${i()}},
    "list": coalesce(
      articles[]-> {${a()}}, 
      *[(_type == "page.article" || _type == "page.articleExternal") && lang == "${t}"] | order(coalesce(presentation.title, metadata.title, "") asc)[0..2] {${a()}}
    )
  `}e(p,"relatedArticles");export{p as r};
