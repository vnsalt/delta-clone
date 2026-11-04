const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VOAMc_qO.js","./B32ztiMu.js","./BUfTxZIz.js","./entry.D_EBu6YN.css","./DJM9MajS.js","./Figure.Cj0KgmyH.css","./Dy9F8kd-.js","./Polaroid.RsRl01Ez.css","./9j7T8iVd.js","./ButtonCircle.DcmGBOFz.css","./B24WrIuJ.js","./ScriptYouTubePlayer.CoSvkT4i.css","./Body.CQgVdu3X.css","./D6DJclaH.js","./BQCzafF4.js","./B2NrXjgO.js","./CXtJ6YlM.js","./Tag.DTHRULsv.css","./JournalCard.C6_CaNVh.css","./JournalCardsList.CLowEg_w.css","./BPg_1cZC.js","./RelatedArticles.Bb3I0cPl.css"])))=>i.map(i=>d[i]);
var H=Object.defineProperty;var c=(e,t)=>H(e,"name",{value:t,configurable:!0});import{aI as O,aG as F,cT as M,Z as D,b3 as $,aJ as B,aU as N,bP as q,bt as Z,x as R,cB as G,cL as U,ct as C,b5 as L,bD as P,bE as z,bH as n,aj as S,ag as s,an as w,bs as k,ck as a,n as J,ah as d,ai as u,cf as y,bZ as b,cF as Q,b_ as W,cA as X,cX as j,bz as E,r as V,cD as K,cW as Y,c7 as I,aM as ee,_ as te,cH as ae}from"./BUfTxZIz.js";import{c as oe,a as se}from"./DDr8UP34.js";import{_ as ne}from"./CXtJ6YlM.js";import{_ as re}from"./B32ztiMu.js";import{F as le}from"./anAuLnUb.js";import{u as ie}from"./BeKfI9Yx.js";import{T as ce}from"./GFprEKJ-.js";import{f as de}from"./D7DFRwIz.js";import{r as ue}from"./D7qulZB6.js";import{u as me}from"./BJJLNzjd.js";import"./DJM9MajS.js";import"./AuGeJjTY.js";function pe(){return O`
    {
      "type": "image",
      "uid": _key,
      ...asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
      }
    }
  `}c(pe,"svgAsset");function _e(e){return B`
    articleContent[]{
      ...,
      _type == 'block' => {
        ...,
        style == null => {
          "style": 'normal'
        },
        markDefs[]{
          ...,
          _type == "globalLink" => {
            ${F()}
          },
        }
      },
      _type == 'videoEmbed' => {
        ...,
        video[]{
          ...,
          _type == 'digital-ocean' => {
            ...,
            "videoAsset": videoAsset {...${M()}}
          }
        }
      },
      _type == 'button' => {
        "size": "medium",
        ${D()},
      },
      _type == 'image' => {
        "image": { 
          ...${$()}
        }
      },
      _type == 'doublePolaroid' => {
        ...,
        "leftImage" : {
          ...leftImage,
          "image": {           
            ...leftImage ${$()}
          } 
        },
        "rightImage" : {
          ...rightImage,
          "image": { 
            ...rightImage ${$()}
          }
        }
      },
      _type == 'pictoBullets' => {
        bullets[]{
          ... {
            ...,
            "pictogramTitle" : pictogram -> title,
            "pictogramSVG" : pictogram -> icon ${pe()},
          },
        }
      }
    },
  `}c(_e,"body");function ge(e="pt",t,r){return B`*[_type == "page.article" && metadata.slug.current == "${r}" && setup.tag->slug.current == "${t}" && lang == "${e}" && !(_id in path("drafts.**"))][0] {
    _type,
    "name": _type,
    "tag": setup.tag->{
      title,
      slug
    },
    setup,
    presentation,
    "metadata": metadata{...${Z(e)}},
    "footer":{...${de(e)}},
    "sections": sections[] {
      _type,
      _type == 'header' => {${N}},
      _type == 'body' => {${_e()}},
      _type == 'relatedArticles' => {${ue(e)}},
      _type == 'preFooter' => {${q}}
    }
  }
`}c(ge,"article");const fe={class:"header-wrapper"},ye={class:"header-title xxl-18 xl-18 lg-20 md-22 sm-12 xs-14 -mix-title-3"},he={class:"header-info"},be={class:"-mix-text-2-regular"},xe=["datetime"],ve={class:"-mix-text-2-regular"},Ae={class:"-sans-text-3-medium"},$e={__name:"ArticleHeader",props:{title:{type:String,default:""},date:{type:String,default:""},timeToRead:{type:Number,default:0},image:{type:[Boolean,Object],default:!1},tag:{type:[Boolean,Object],default:!1}},setup(e){G();const t=U(),{locale:r}=C(),i=b(null);return L("pageContext"),P(()=>{}),z(()=>{}),(o,p)=>{const _=J,m=ne,g=re;return n(),S("div",{ref_key:"el",ref:i,"data-component":"header"},[s("div",fe,[w(_,k({label:a(t)("backToNews","Voltar a Notícias"),icon:"arrow-left",size:"small"},{to:{document:"page.journal",lang:a(r),slug:"jornal",_type:"internal",url:null}}),null,16,["label"]),e.tag?(n(),d(m,{key:0,label:e.tag.title},null,8,["label"])):u("",!0),s("h1",ye,y(e.title),1),s("h2",he,[s("span",be,y(a(t)("published","Publicado")),1),s("time",{class:"-sans-text-3-medium",datetime:e.date},y(e.date),9,xe),p[0]||(p[0]=s("svg",{class:"em-dash",width:"16",height:"3",viewBox:"0 0 16 3",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[s("path",{d:"M0.152344 0.820007H15.8483V2.18001H0.152344V0.820007Z",fill:"#35221A"})],-1)),s("span",ve,y(a(t)("timeToRead","Tempo de Leitura")),1),s("span",Ae,y(e.timeToRead)+"m ",1)]),e.image?(n(),d(g,{key:1,class:"header-figure",sizes:"xsmall:400px small:600px medium:1000px xlarge:1600px",image:e.image,source:e.image.source},null,8,["image","source"])):u("",!0)])],512)}}},ke=R($e,[["__scopeId","data-v-4490f3fb"]]),we=oe("components/pages/Article/sections/Body/Body.vue",()=>V(()=>import("./VOAMc_qO.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]),import.meta.url).then(e=>e.default||e)),Te=se("components/sections/RelatedArticles/RelatedArticles.vue",()=>V(()=>import("./D6DJclaH.js"),__vite__mapDeps([13,2,3,14,15,16,17,18,19,20,21]),import.meta.url).then(e=>e.default||e)),Ie={class:"article"},Be={__name:"Article",props:{tag:{type:Object,default:void 0},metadata:{type:Object,default:void 0},sections:{type:Array,default:void 0},footer:{type:Object,default:void 0}},setup(e){const t=e,r=b(null),i=L("pageContext"),o=c(h=>t.sections?.find(v=>v._type==h),"getSection"),_=Q().currentRoute.value.path;W(_);const m=b(!1),{registerHydration:g,factor:l}=ie(),f=c(()=>{},"init"),x=c(()=>{},"kill");return P(()=>x()),z(()=>{i.$page.loader.loaded.then(()=>{g(m,500),setTimeout(()=>{i.$page.loader.dispatch("hydration-ready")},500*l+50)}),i.$page.loader.ready.then(()=>f())}),X({template:"ArticleTemplate",title:t.metadata?.title||t.sections?.[0]?.title||!1,subtitle:t.tag?.title||!1,image:t.sections?.[0]?.image||!1}),(h,v)=>{const T=we,A=Te;return n(),S("div",{ref_key:"el",ref:r,"data-component":"article"},[w(a(ce),null,{default:j(()=>[s("div",Ie,[o("header")?(n(),d(a(ke),E(k({key:0},o("header"))),null,16)):u("",!0),s("main",null,[o("body")?(n(),d(T,{key:0,"hydrate-on-idle":"","article-content":o("body")?.articleContent},null,8,["article-content"])):u("",!0),o("relatedArticles")?(n(),d(A,{key:1,"hydrate-when":a(m),cols:"xxl-32","upper-title":o("relatedArticles")?.upperTitle,title:o("relatedArticles")?.title,list:o("relatedArticles")?.list,button:o("relatedArticles")?.button},null,8,["hydrate-when","upper-title","title","list","button"])):u("",!0)]),e.footer?(n(),d(a(le),k({key:1},e.footer,{"pre-footer":o("preFooter")}),null,16,["pre-footer"])):u("",!0)])]),_:1})],512)}}},Re=R(Be,[["__scopeId","data-v-84023241"]]),Ne={__name:"[slug]",async setup(e){let t,r;const i=K(),{category:o,slug:p}=i.params,{locale:_}=C(),m=ge(_.value,o,p),g=b(null),{data:l,error:f}=([t,r]=Y(()=>ae(m)),t=await t,r(),t),{onEnter:x,onLeave:h}=me();if(f.value)throw I({statusCode:f.value?.statusCode||500,statusMessage:f.value?.message||"An error occurred"});if(!l.value)throw I({statusCode:404,statusMessage:"Page not found"});return(v,T)=>{const A=te;return a(l)?(n(),d(A,{key:0,ref_key:"page",ref:g,slug:a(l).metadata.slug,name:a(l).name,metadata:a(l).metadata,"transition-enter":a(x),"transition-leave":a(h)},{default:j(()=>[w(a(Re),E(ee(a(l))),null,16)]),_:1},8,["slug","name","metadata","transition-enter","transition-leave"])):u("",!0)}}};export{Ne as default};
