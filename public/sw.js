if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/XEsLZD64HECepp9be1S9v/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/XEsLZD64HECepp9be1S9v/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/320-2615a2d077cdd64a.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/468-6f9ac2f9914c53b3.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/5e22fd23-e644cca841d8dfcf.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/795-68748d30a7cfac6f.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/795d4814-3619e5156383fec3.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/812-e3005b715cdd8bd1.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/8e1d74a4-a9c170e4758f7c68.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/9c4e2130-9c9b78b66e9f0e43.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/app/_not-found-7d196e4f8f95424a.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/app/contact/page-95264fefaff072a4.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/app/layout-296a3df0610e7bee.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/app/page-5ec0d34735178399.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/fd9d1056-86b26466c3c28796.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/main-1b63f307f4345ff0.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/main-app-f15f24cd783163bf.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-3975e3b9a7a04c48.js",revision:"XEsLZD64HECepp9be1S9v"},{url:"/_next/static/css/1e3589fe5800ad4c.css",revision:"1e3589fe5800ad4c"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/default-deposit.35b13382.png",revision:"00c56a9da475d493b8b9aab8f8d67d8a"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/logo-black.c6313b60.svg",revision:"c67ba670d23af17fee750e56dc289ceb"},{url:"/_next/static/media/logo.533a1584.svg",revision:"3ac327cb62a9ac0518bbeb8c93a8db4e"},{url:"/app-1240.png",revision:"3c44d2236d93ce9856d52ab26a222f44"},{url:"/app-192.png",revision:"e20f3357ca1f3c162ef79b6a9e1ede47"},{url:"/app-256.png",revision:"9703266779a0a39f39472729075bdfb3"},{url:"/app-512.png",revision:"57413f499b55b63a09af09116762116a"},{url:"/default-deposit.png",revision:"00c56a9da475d493b8b9aab8f8d67d8a"},{url:"/logo-black.svg",revision:"c67ba670d23af17fee750e56dc289ceb"},{url:"/logo.svg",revision:"3ac327cb62a9ac0518bbeb8c93a8db4e"},{url:"/manifest.json",revision:"ab1c69d244e0ffc134948a4a523d57dc"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
