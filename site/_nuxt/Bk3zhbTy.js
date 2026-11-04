var g=Object.defineProperty;var r=(e,a)=>g(e,"name",{value:a,configurable:!0});import{b3 as c,aI as s,aO as p,bU as m,V as $,bJ as y,c5 as _,bQ as f,bP as u,bt as n,bp as b,bT as P}from"./BUfTxZIz.js";import{p as h,r as F}from"./z4BfFnU6.js";import{f as i}from"./D7DFRwIz.js";function T(e="pt"){return s`
  *[_type == 'subcategory.product' && lang == "${e}" ] {
    lang,
    "slug": metadata.slug.current,
    "title": content.title,
    "image": content.image{...${c()}},
    "category": content.category-> {
      lang,
      "slug": metadata.slug.current,
      "title": content.title,
      "singleTitle": coalesce(content.singleTitle,content.title),
      "image": content.image{...${c()}},
    }
  }
`}r(T,"productsCategories");function A(e,a=!1,o=!1,t="pt"){const d=a?` && setup.category->.metadata.slug.current == "${a}" `:"",l=o?` && setup.subcategory->.metadata.slug.current == "${o}" `:"";return s`coalesce(
		*[_type == 'page.product' ${d} ${l} && metadata.slug.current == "${e}" && lang == "${t}"][0],
		*[_type == 'page.product' && metadata.slug.current == "${e}" && lang == "${t}"][0]
	) {
    _id,
    _type,
    "name": _type,
    "metadata": metadata{...${n(t)}},
    "menu": {...${b()}},
    "setup": setup{...${h()}},
    "footer":{...${i(t)}},
    "sections": sections[] {
      _type,
      _type == 'header' => {${p}},
      _type == 'profile' => {${m}},
      _type == 'blendId' => {${$}},
      _type == 'origins' => {${y}},
      _type == 'sensorialProfile' => {${_}},
      _type == 'preparation' => {${f}},
      _type == 'relatedProducts' => {${F(t)}},
      _type == 'preFooter' => {${u}}
    }
  }
`}r(A,"product");function D(e="pt"){return s`*[_type == 'page.products' && lang == "${e}"][0] {
    _type,
    "name": _type,
    "metadata": metadata{...${n(e)}},
    "title": coalesce(presentation.title, metadata.title, 'Produtos'),
    "categories": ${T(e)},
    "products": *[_type == 'page.product' && lang == "${e}"] | order(select(setup.subcategory->metadata.slug.current == "signature" => 1, 0) desc, select(metadata.title != "Decaf" => 1, 0) desc, select(setup.subcategory->metadata.slug.current == "origens" => 1, 0) desc, select(setup.category->metadata.slug.current == "moidos" => 1, 0) desc, setup.category->metadata.slug.current asc, setup.price desc) {...${P()}},
    "footer":{...${i(e)}},
    "sections": sections[] {
      _type,
      _type == 'header' => {${p}},
      _type == 'preFooter' => {${u}}
    }
  }
`}r(D,"products");export{D as a,A as p};
