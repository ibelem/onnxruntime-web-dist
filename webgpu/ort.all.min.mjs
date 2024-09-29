/*!
 * ONNX Runtime Web v1.20.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var nb=Object.create;var hn=Object.defineProperty;var ob=Object.getOwnPropertyDescriptor;var ib=Object.getOwnPropertyNames;var ab=Object.getPrototypeOf,sb=Object.prototype.hasOwnProperty;var Jo=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var S=(r,e)=>()=>(r&&(e=r(r=0)),e);var Be=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),Rr=(r,e)=>{for(var n in e)hn(r,n,{get:e[n],enumerable:!0})},ja=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ib(e))!sb.call(r,o)&&o!==n&&hn(r,o,{get:()=>e[o],enumerable:!(t=ob(e,o))||t.enumerable});return r};var wr=(r,e,n)=>(n=r!=null?nb(ab(r)):{},ja(e||!r||!r.__esModule?hn(n,"default",{value:r,enumerable:!0}):n,r)),gn=r=>ja(hn({},"__esModule",{value:!0}),r);var bn,Yt,Mt,ub,yn,xn=S(()=>{"use strict";bn=new Map,Yt=[],Mt=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=bn.get(r);if(t===void 0)bn.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Yt.indexOf(r);o!==-1&&Yt.splice(o,1);for(let i=0;i<Yt.length;i++)if(bn.get(Yt[i]).priority<=n){Yt.splice(i,0,r);return}Yt.push(r)}return}throw new TypeError("not a valid backend")},ub=async r=>{let e=bn.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},yn=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Yt:n,o,i=[],s=new Set;for(let u of t){let l=await ub(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var Xa=S(()=>{"use strict";xn()});var Za,Ja=S(()=>{"use strict";Za="1.20.0"});var Ya,nt,Yo=S(()=>{"use strict";Ja();Ya="warning",nt={wasm:{},webgl:{},webgpu:{},versions:{common:Za},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);Ya=r}},get logLevel(){return Ya}};Object.defineProperty(nt,"logLevel",{enumerable:!0})});var j,Qa=S(()=>{"use strict";Yo();j=nt});var es,ts,rs=S(()=>{"use strict";es=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let c=i*o,f=0,d=c,m=c*2,p=-1;s==="RGBA"?(f=0,d=c,m=c*2,p=c*3):s==="RGB"?(f=0,d=c,m=c*2):s==="RBG"&&(f=0,m=c,d=c*2);for(let h=0;h<i;h++)for(let b=0;b<o;b++){let y=(r.data[f++]-l[0])*u[0],g=(r.data[d++]-l[1])*u[1],x=(r.data[m++]-l[2])*u[2],v=p===-1?255:(r.data[p++]-l[3])*u[3];t.fillStyle="rgba("+y+","+g+","+x+","+v+")",t.fillRect(b,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ts=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],s=r.dims[3]):(o=r.dims[3],i=r.dims[2],s=r.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let d=4,m=0,p=1,h=2,b=3,y=0,g=f,x=f*2,v=-1;a==="RGBA"?(y=0,g=f,x=f*2,v=f*3):a==="RGB"?(y=0,g=f,x=f*2):a==="RBG"&&(y=0,x=f,g=f*2),t=n.createImageData(o,i);for(let _=0;_<i*o;m+=d,p+=d,h+=d,b+=d,_++)t.data[m]=(r.data[y++]-c[0])*l[0],t.data[p]=(r.data[g++]-c[1])*l[1],t.data[h]=(r.data[x++]-c[2])*l[2],t.data[b]=v===-1?255:(r.data[v++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var Qo,ns,os,is,as,ss=S(()=>{"use strict";wn();Qo=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),f=4,d=0,m=1,p=2,h=3,b=0,y=l,g=l*2,x=-1;a==="RGB"&&(f=3,d=0,m=1,p=2,h=-1),u==="RGBA"?x=l*3:u==="RBG"?(b=0,g=l,y=l*2):u==="BGR"&&(g=0,y=l,b=l*2);for(let _=0;_<l;_++,d+=f,p+=f,m+=f,h+=f)c[b++]=(r[d]+s[0])/i[0],c[y++]=(r[m]+s[1])/i[1],c[g++]=(r[p]+s[2])/i[2],x!==-1&&h!==-1&&(c[x++]=(r[h]+s[3])/i[3]);return u==="RGBA"?new qe("float32",c,[1,4,n,t]):new qe("float32",c,[1,3,n,t])},ns=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=u();c.width=r.width,c.height=r.height;let f=l(c);if(f!=null){let d=r.height,m=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(d=e.resizedHeight,m=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=d,a.width=m}else a.tensorFormat="RGBA",a.height=d,a.width=m;f.drawImage(r,0,0),s=f.getImageData(0,0,m,d).data}else throw new Error("Can not access image data")}else if(t){let c,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,f=e.resizedWidth):(c=r.height,f=r.width),e!==void 0&&(a=e),a.format="RGBA",a.height=c,a.width=f,e!==void 0){let d=u();d.width=f,d.height=c;let m=l(d);if(m!=null)m.putImageData(r,0,0),s=m.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=r.width,c.height=r.height;let f=l(c);if(f!=null){let d=r.height,m=r.width;return f.drawImage(r,0,0,m,d),s=f.getImageData(0,0,m,d).data,a.height=d,a.width=m,Qo(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,f)=>{let d=u(),m=l(d);if(!r||!m)return f();let p=new Image;p.crossOrigin="Anonymous",p.src=r,p.onload=()=>{d.width=p.width,d.height=p.height,m.drawImage(p,0,0,d.width,d.height);let h=m.getImageData(0,0,d.width,d.height);a.height=d.height,a.width=d.width,c(Qo(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Qo(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},os=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,s=[1,t,n,4];return new qe({location:"texture",type:"float32",texture:r,dims:s,download:o,dispose:i})},is=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new qe({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},as=(r,e,n)=>new qe({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Qt,Nr,us,ls,cs=S(()=>{"use strict";Qt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Nr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),us=!1,ls=()=>{if(!us){us=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;r&&(Qt.set("int64",BigInt64Array),Nr.set(BigInt64Array,"int64")),e&&(Qt.set("uint64",BigUint64Array),Nr.set(BigUint64Array,"uint64")),n?(Qt.set("float16",Float16Array),Nr.set(Float16Array,"float16")):Qt.set("float16",Uint16Array)}}});var fs,ds,ps=S(()=>{"use strict";wn();fs=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},ds=(r,e)=>{switch(r.location){case"cpu":return new qe(r.type,r.data,e);case"cpu-pinned":return new qe({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new qe({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new qe({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var qe,wn=S(()=>{"use strict";rs();ss();cs();ps();qe=class{constructor(e,n,t){ls();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=Qt.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=Qt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(e);else{let l=Nr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=fs(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,n){return ns(e,n)}static fromTexture(e,n){return os(e,n)}static fromGpuBuffer(e,n){return is(e,n)}static fromPinnedBuffer(e,n,t){return as(e,n,t)}toDataURL(e){return es(this,e)}toImageData(e){return ts(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ds(this,e)}}});var Ne,vn=S(()=>{"use strict";wn();Ne=qe});var Tn,ms,ot,Ze,ei=S(()=>{"use strict";Yo();Tn=(r,e)=>{(typeof nt.trace>"u"?!nt.wasm.trace:!nt.trace)||console.timeStamp(`${r}::ORT::${e}`)},ms=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),Tn("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},ot=r=>{(typeof nt.trace>"u"?!nt.wasm.trace:!nt.trace)||ms("BEGIN",r)},Ze=r=>{(typeof nt.trace>"u"?!nt.wasm.trace:!nt.trace)||ms("END",r)}});var _n,hs=S(()=>{"use strict";xn();vn();ei();_n=class r{constructor(e){this.handler=e}async run(e,n,t){ot();let o={},i={};if(typeof e!="object"||e===null||e instanceof Ne||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Ne)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(n);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let d=n[f];(d===null||d instanceof Ne)&&(l=!0,s=!1,o[f]=d)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let c=a[l];c instanceof Ne?u[l]=c:u[l]=new Ne(c.type,c.data,c.dims)}return Ze(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){ot();let i,s={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,f=0,d=e.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(d=e.byteLength-f,typeof t=="number"){if(d=t,!Number.isSafeInteger(d))throw new RangeError("'byteLength' must be an integer.");if(d<=0||f+d>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,f,d)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await yn(s),l=await a.createInferenceSessionHandler(i,u);return Ze(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var lb,gs=S(()=>{"use strict";hs();lb=_n});var bs=S(()=>{"use strict"});var ys=S(()=>{"use strict"});var xs=S(()=>{"use strict"});var ws=S(()=>{"use strict"});var cb,In,vs=S(()=>{"use strict";xn();vn();cb="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",In=class r{constructor(e,n,t){this.handler=e,this.hasOptimizerModel=n,this.hasEvalModel=t}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(e,n){let t=e.evalModel||"",o=e.optimizerModel||"",i=n||{},[s,a]=await yn(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(e.checkpointState,e.trainModel,t,o,a);return new r(u,!!e.optimizerModel,!!e.evalModel)}else throw new Error(cb)}typeNarrowingForRunStep(e,n,t,o,i){let s={},a={};if(typeof t!="object"||t===null||t instanceof Ne||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Ne)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(o);for(let f of n)if(c.indexOf(f)!==-1){let d=o[f];(d===null||d instanceof Ne)&&(l=!0,u=!1,s[f]=d)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of e)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of n)s[l]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(e){let n={};for(let t in e)if(Object.hasOwnProperty.call(e,t)){let o=e[t];o instanceof Ne?n[t]=o:n[t]=new Ne(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(e,n,t){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,e,n,t),s=await this.handler.runTrainStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(e){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(e||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(e,n,t){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,e,n,t),s=await this.handler.runEvalStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(e=!0){return this.handler.getParametersSize(e)}async loadParametersBuffer(e,n=!0){let t=await this.getParametersSize(n);if(e.length!==4*t)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(e,n)}async getContiguousParameters(e=!0){return this.handler.getContiguousParameters(e)}async release(){return this.handler.dispose()}}});var fb,Ts=S(()=>{"use strict";vs();fb=In});var ti={};Rr(ti,{InferenceSession:()=>lb,TRACE:()=>Tn,TRACE_FUNC_BEGIN:()=>ot,TRACE_FUNC_END:()=>Ze,Tensor:()=>Ne,TrainingSession:()=>fb,env:()=>j,registerBackend:()=>Mt});var Ue=S(()=>{"use strict";Xa();Qa();gs();vn();bs();ys();ei();xs();ws();Ts()});function Ut(r,e,n,t){if(e===void 0)return pb(r);if(n===void 0)Sn(r,e,1);else if(typeof n=="number"&&t===void 0)Sn(r,e,n);else if(typeof n=="string"&&t===void 0)Sn(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")Sn(r,n,t,e);else throw new TypeError("input is valid")}function pb(r){return{verbose:Ut.verbose.bind(null,r),info:Ut.info.bind(null,r),warning:Ut.warning.bind(null,r),error:Ut.error.bind(null,r),fatal:Ut.fatal.bind(null,r)}}function Sn(r,e,n,t){let o=Vr[t||""]||Vr[""];Is[r]<Is[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,db[o.provider].log(r,e,t))}var ri,ni,Is,db,Ss,Vr,ge,An,Pn,On,$n,ut=S(()=>{"use strict";ri=class{log(e,n,t){}},ni=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Is={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},db={none:new ri,console:new ni},Ss={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Vr={"":Ss};(u=>{function r(l,c){u("verbose",l,c)}u.verbose=r;function e(l,c){u("info",l,c)}u.info=e;function n(l,c){u("warning",l,c)}u.warning=n;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){Vr={},s("",l||{})}u.reset=i;function s(l,c){if(l==="*")i(c);else{let f=Vr[l]||Ss;Vr[l]={provider:c.provider||f.provider,minimalSeverity:c.minimalSeverity||f.minimalSeverity,logDateTime:c.logDateTime===void 0?f.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?f.logSourceLocation:c.logSourceLocation}}}u.set=s;function a(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),s("",c)}u.setWithEnv=a})(Ut||={});ge=Ut,An=class{constructor(e,n,t,o,i,s){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Pn=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},On=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=$n(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(a)},f=>{c(f)})})}return a}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=$n();return this.flush(o),new An(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new An(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Pn(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=$n();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Pn(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){ge.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=$n()}}get started(){return this._started}},$n=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function $s(r,e,n){for(let t of n){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&mb(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function mb(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var As=S(()=>{"use strict"});var Ps=Be(oi=>{"use strict";oi.__esModule=!0;var hb=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();oi.Guid=hb});function Te(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function We(r){return(r&&r.__isLong__)===!0}function Os(r){var e=Math.clz32(r&-r);return r?31-e:e}function er(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=Cs[r],t)?t:(n=pe(r,0,!0),o&&(Cs[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Es[r],t)?t:(n=pe(r,r<0?-1:0,!1),o&&(Es[r]=n),n))}function ct(r,e){if(isNaN(r))return e?Rt:xt;if(e){if(r<0)return Rt;if(r>=Ls)return Ns}else{if(r<=-Ds)return Je;if(r+1>=Ds)return Rs}return r<0?ct(-r,e).neg():pe(r%Tr|0,r/Tr|0,e)}function pe(r,e,n){return new Te(r,e,n)}function ai(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?Rt:xt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return ai(r.substring(1),e,n).neg();for(var o=ct(En(n,8)),i=xt,s=0;s<r.length;s+=8){var a=Math.min(8,r.length-s),u=parseInt(r.substring(s,s+a),n);if(a<8){var l=ct(En(n,a));i=i.mul(l).add(ct(u))}else i=i.mul(o),i=i.add(ct(u))}return i.unsigned=e,i}function wt(r,e){return typeof r=="number"?ct(r,e):typeof r=="string"?ai(r,e):pe(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var lt,Es,Cs,En,ks,gb,Tr,Ls,Ds,Bs,xt,Rt,vr,zs,ii,Rs,Ns,Je,L,Nt,si=S(()=>{lt=null;try{lt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Te.prototype.__isLong__;Object.defineProperty(Te.prototype,"__isLong__",{value:!0});Te.isLong=We;Es={},Cs={};Te.fromInt=er;Te.fromNumber=ct;Te.fromBits=pe;En=Math.pow;Te.fromString=ai;Te.fromValue=wt;ks=65536,gb=1<<24,Tr=ks*ks,Ls=Tr*Tr,Ds=Ls/2,Bs=er(gb),xt=er(0);Te.ZERO=xt;Rt=er(0,!0);Te.UZERO=Rt;vr=er(1);Te.ONE=vr;zs=er(1,!0);Te.UONE=zs;ii=er(-1);Te.NEG_ONE=ii;Rs=pe(-1,2147483647,!1);Te.MAX_VALUE=Rs;Ns=pe(-1,-1,!0);Te.MAX_UNSIGNED_VALUE=Ns;Je=pe(0,-2147483648,!1);Te.MIN_VALUE=Je;L=Te.prototype;L.toInt=function(){return this.unsigned?this.low>>>0:this.low};L.toNumber=function(){return this.unsigned?(this.high>>>0)*Tr+(this.low>>>0):this.high*Tr+(this.low>>>0)};L.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Je)){var n=ct(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=ct(En(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(s=u,s.isZero())return c+a;for(;c.length<6;)c="0"+c;a=""+c+a}};L.getHighBits=function(){return this.high};L.getHighBitsUnsigned=function(){return this.high>>>0};L.getLowBits=function(){return this.low};L.getLowBitsUnsigned=function(){return this.low>>>0};L.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Je)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};L.isZero=function(){return this.high===0&&this.low===0};L.eqz=L.isZero;L.isNegative=function(){return!this.unsigned&&this.high<0};L.isPositive=function(){return this.unsigned||this.high>=0};L.isOdd=function(){return(this.low&1)===1};L.isEven=function(){return(this.low&1)===0};L.equals=function(e){return We(e)||(e=wt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};L.eq=L.equals;L.notEquals=function(e){return!this.eq(e)};L.neq=L.notEquals;L.ne=L.notEquals;L.lessThan=function(e){return this.comp(e)<0};L.lt=L.lessThan;L.lessThanOrEqual=function(e){return this.comp(e)<=0};L.lte=L.lessThanOrEqual;L.le=L.lessThanOrEqual;L.greaterThan=function(e){return this.comp(e)>0};L.gt=L.greaterThan;L.greaterThanOrEqual=function(e){return this.comp(e)>=0};L.gte=L.greaterThanOrEqual;L.ge=L.greaterThanOrEqual;L.compare=function(e){if(We(e)||(e=wt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};L.comp=L.compare;L.negate=function(){return!this.unsigned&&this.eq(Je)?Je:this.not().add(vr)};L.neg=L.negate;L.add=function(e){We(e)||(e=wt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,f=0,d=0,m=0;return m+=i+l,d+=m>>>16,m&=65535,d+=o+u,f+=d>>>16,d&=65535,f+=t+a,c+=f>>>16,f&=65535,c+=n+s,c&=65535,pe(d<<16|m,c<<16|f,this.unsigned)};L.subtract=function(e){return We(e)||(e=wt(e)),this.add(e.neg())};L.sub=L.subtract;L.multiply=function(e){if(this.isZero())return this;if(We(e)||(e=wt(e)),lt){var n=lt.mul(this.low,this.high,e.low,e.high);return pe(n,lt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Rt:xt;if(this.eq(Je))return e.isOdd()?Je:xt;if(e.eq(Je))return this.isOdd()?Je:xt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Bs)&&e.lt(Bs))return ct(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,f=0,d=0,m=0,p=0;return p+=s*c,m+=p>>>16,p&=65535,m+=i*c,d+=m>>>16,m&=65535,m+=s*l,d+=m>>>16,m&=65535,d+=o*c,f+=d>>>16,d&=65535,d+=i*l,f+=d>>>16,d&=65535,d+=s*u,f+=d>>>16,d&=65535,f+=t*c+o*l+i*u+s*a,f&=65535,pe(m<<16|p,f<<16|d,this.unsigned)};L.mul=L.multiply;L.divide=function(e){if(We(e)||(e=wt(e)),e.isZero())throw Error("division by zero");if(lt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?lt.div_u:lt.div_s)(this.low,this.high,e.low,e.high);return pe(n,lt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Rt:xt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Rt;if(e.gt(this.shru(1)))return zs;i=Rt}else{if(this.eq(Je)){if(e.eq(vr)||e.eq(ii))return Je;if(e.eq(Je))return vr;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(xt)?e.isNegative()?vr:ii:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(Je))return this.unsigned?Rt:xt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=xt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:En(2,a-48),l=ct(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=ct(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=vr),i=i.add(l),o=o.sub(c)}return i};L.div=L.divide;L.modulo=function(e){if(We(e)||(e=wt(e)),lt){var n=(this.unsigned?lt.rem_u:lt.rem_s)(this.low,this.high,e.low,e.high);return pe(n,lt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};L.mod=L.modulo;L.rem=L.modulo;L.not=function(){return pe(~this.low,~this.high,this.unsigned)};L.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};L.clz=L.countLeadingZeros;L.countTrailingZeros=function(){return this.low?Os(this.low):Os(this.high)+32};L.ctz=L.countTrailingZeros;L.and=function(e){return We(e)||(e=wt(e)),pe(this.low&e.low,this.high&e.high,this.unsigned)};L.or=function(e){return We(e)||(e=wt(e)),pe(this.low|e.low,this.high|e.high,this.unsigned)};L.xor=function(e){return We(e)||(e=wt(e)),pe(this.low^e.low,this.high^e.high,this.unsigned)};L.shiftLeft=function(e){return We(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?pe(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):pe(0,this.low<<e-32,this.unsigned)};L.shl=L.shiftLeft;L.shiftRight=function(e){return We(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?pe(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):pe(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};L.shr=L.shiftRight;L.shiftRightUnsigned=function(e){return We(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?pe(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?pe(this.high,0,this.unsigned):pe(this.high>>>e-32,0,this.unsigned)};L.shru=L.shiftRightUnsigned;L.shr_u=L.shiftRightUnsigned;L.rotateLeft=function(e){var n;return We(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?pe(this.high,this.low,this.unsigned):e<32?(n=32-e,pe(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,pe(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};L.rotl=L.rotateLeft;L.rotateRight=function(e){var n;return We(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?pe(this.high,this.low,this.unsigned):e<32?(n=32-e,pe(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,pe(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};L.rotr=L.rotateRight;L.toSigned=function(){return this.unsigned?pe(this.low,this.high,!1):this};L.toUnsigned=function(){return this.unsigned?this:pe(this.low,this.high,!0)};L.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};L.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};L.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Te.fromBytes=function(e,n,t){return t?Te.fromBytesLE(e,n):Te.fromBytesBE(e,n)};Te.fromBytesLE=function(e,n){return new Te(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Te.fromBytesBE=function(e,n){return new Te(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};Nt=Te});var $,Cn=S(()=>{$={};$.Offset;$.Table;$.SIZEOF_SHORT=2;$.SIZEOF_INT=4;$.FILE_IDENTIFIER_LENGTH=4;$.SIZE_PREFIX_LENGTH=4;$.Encoding={UTF8_BYTES:1,UTF16_STRING:2};$.int32=new Int32Array(2);$.float32=new Float32Array($.int32.buffer);$.float64=new Float64Array($.int32.buffer);$.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;$.Long=function(r,e){this.low=r|0,this.high=e|0};$.Long.create=function(r,e){return r==0&&e==0?$.Long.ZERO:new $.Long(r,e)};$.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};$.Long.prototype.equals=function(r){return this.low==r.low&&this.high==r.high};$.Long.ZERO=new $.Long(0,0);$.Builder=function(r){if(r)var e=r;else var e=1024;this.bb=$.ByteBuffer.allocate(e),this.space=e,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};$.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};$.Builder.prototype.forceDefaults=function(r){this.force_defaults=r};$.Builder.prototype.dataBuffer=function(){return this.bb};$.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};$.Builder.prototype.prep=function(r,e){r>this.minalign&&(this.minalign=r);for(var n=~(this.bb.capacity()-this.space+e)+1&r-1;this.space<n+r+e;){var t=this.bb.capacity();this.bb=$.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)};$.Builder.prototype.pad=function(r){for(var e=0;e<r;e++)this.bb.writeInt8(--this.space,0)};$.Builder.prototype.writeInt8=function(r){this.bb.writeInt8(this.space-=1,r)};$.Builder.prototype.writeInt16=function(r){this.bb.writeInt16(this.space-=2,r)};$.Builder.prototype.writeInt32=function(r){this.bb.writeInt32(this.space-=4,r)};$.Builder.prototype.writeInt64=function(r){this.bb.writeInt64(this.space-=8,r)};$.Builder.prototype.writeFloat32=function(r){this.bb.writeFloat32(this.space-=4,r)};$.Builder.prototype.writeFloat64=function(r){this.bb.writeFloat64(this.space-=8,r)};$.Builder.prototype.addInt8=function(r){this.prep(1,0),this.writeInt8(r)};$.Builder.prototype.addInt16=function(r){this.prep(2,0),this.writeInt16(r)};$.Builder.prototype.addInt32=function(r){this.prep(4,0),this.writeInt32(r)};$.Builder.prototype.addInt64=function(r){this.prep(8,0),this.writeInt64(r)};$.Builder.prototype.addFloat32=function(r){this.prep(4,0),this.writeFloat32(r)};$.Builder.prototype.addFloat64=function(r){this.prep(8,0),this.writeFloat64(r)};$.Builder.prototype.addFieldInt8=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(r))};$.Builder.prototype.addFieldInt16=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(r))};$.Builder.prototype.addFieldInt32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(r))};$.Builder.prototype.addFieldInt64=function(r,e,n){(this.force_defaults||!e.equals(n))&&(this.addInt64(e),this.slot(r))};$.Builder.prototype.addFieldFloat32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(r))};$.Builder.prototype.addFieldFloat64=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(r))};$.Builder.prototype.addFieldOffset=function(r,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(r))};$.Builder.prototype.addFieldStruct=function(r,e,n){e!=n&&(this.nested(e),this.slot(r))};$.Builder.prototype.nested=function(r){if(r!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};$.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};$.Builder.prototype.slot=function(r){this.vtable[r]=this.offset()};$.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};$.Builder.growByteBuffer=function(r){var e=r.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var n=e<<1,t=$.ByteBuffer.allocate(n);return t.setPosition(n-e),t.bytes().set(r.bytes(),n-e),t};$.Builder.prototype.addOffset=function(r){this.prep($.SIZEOF_INT,0),this.writeInt32(this.offset()-r+$.SIZEOF_INT)};$.Builder.prototype.startObject=function(r){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=r;for(var e=0;e<r;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()};$.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var r=this.offset(),e=this.vtable_in_use-1;e>=0&&this.vtable[e]==0;e--);for(var n=e+1;e>=0;e--)this.addInt16(this.vtable[e]!=0?r-this.vtable[e]:0);var t=2;this.addInt16(r-this.object_start);var o=(n+t)*$.SIZEOF_SHORT;this.addInt16(o);var i=0,s=this.space;e:for(e=0;e<this.vtables.length;e++){var a=this.bb.capacity()-this.vtables[e];if(o==this.bb.readInt16(a)){for(var u=$.SIZEOF_SHORT;u<o;u+=$.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(a+u))continue e;i=this.vtables[e];break}}return i?(this.space=this.bb.capacity()-r,this.bb.writeInt32(this.space,i-r)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-r,this.offset()-r)),this.isNested=!1,r};$.Builder.prototype.finish=function(r,e,n){var t=n?$.SIZE_PREFIX_LENGTH:0;if(e){var o=e;if(this.prep(this.minalign,$.SIZEOF_INT+$.FILE_IDENTIFIER_LENGTH+t),o.length!=$.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+$.FILE_IDENTIFIER_LENGTH);for(var i=$.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(o.charCodeAt(i))}this.prep(this.minalign,$.SIZEOF_INT+t),this.addOffset(r),t&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};$.Builder.prototype.finishSizePrefixed=function(r,e){this.finish(r,e,!0)};$.Builder.prototype.requiredField=function(r,e){var n=this.bb.capacity()-r,t=n-this.bb.readInt32(n),o=this.bb.readInt16(t+e)!=0;if(!o)throw new Error("FlatBuffers: field "+e+" must be set")};$.Builder.prototype.startVector=function(r,e,n){this.notNested(),this.vector_num_elems=e,this.prep($.SIZEOF_INT,r*e),this.prep(n,r*e)};$.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};$.Builder.prototype.createString=function(r){if(r instanceof Uint8Array)var e=r;else for(var e=[],n=0;n<r.length;){var t,o=r.charCodeAt(n++);if(o<55296||o>=56320)t=o;else{var i=r.charCodeAt(n++);t=(o<<10)+i+(65536-56623104-56320)}t<128?e.push(t):(t<2048?e.push(t>>6&31|192):(t<65536?e.push(t>>12&15|224):e.push(t>>18&7|240,t>>12&63|128),e.push(t>>6&63|128)),e.push(t&63|128))}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(var n=0,s=this.space,a=this.bb.bytes();n<e.length;n++)a[s++]=e[n];return this.endVector()};$.Builder.prototype.createLong=function(r,e){return $.Long.create(r,e)};$.ByteBuffer=function(r){this.bytes_=r,this.position_=0};$.ByteBuffer.allocate=function(r){return new $.ByteBuffer(new Uint8Array(r))};$.ByteBuffer.prototype.clear=function(){this.position_=0};$.ByteBuffer.prototype.bytes=function(){return this.bytes_};$.ByteBuffer.prototype.position=function(){return this.position_};$.ByteBuffer.prototype.setPosition=function(r){this.position_=r};$.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};$.ByteBuffer.prototype.readInt8=function(r){return this.readUint8(r)<<24>>24};$.ByteBuffer.prototype.readUint8=function(r){return this.bytes_[r]};$.ByteBuffer.prototype.readInt16=function(r){return this.readUint16(r)<<16>>16};$.ByteBuffer.prototype.readUint16=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8};$.ByteBuffer.prototype.readInt32=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8|this.bytes_[r+2]<<16|this.bytes_[r+3]<<24};$.ByteBuffer.prototype.readUint32=function(r){return this.readInt32(r)>>>0};$.ByteBuffer.prototype.readInt64=function(r){return new $.Long(this.readInt32(r),this.readInt32(r+4))};$.ByteBuffer.prototype.readUint64=function(r){return new $.Long(this.readUint32(r),this.readUint32(r+4))};$.ByteBuffer.prototype.readFloat32=function(r){return $.int32[0]=this.readInt32(r),$.float32[0]};$.ByteBuffer.prototype.readFloat64=function(r){return $.int32[$.isLittleEndian?0:1]=this.readInt32(r),$.int32[$.isLittleEndian?1:0]=this.readInt32(r+4),$.float64[0]};$.ByteBuffer.prototype.writeInt8=function(r,e){this.bytes_[r]=e};$.ByteBuffer.prototype.writeUint8=function(r,e){this.bytes_[r]=e};$.ByteBuffer.prototype.writeInt16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};$.ByteBuffer.prototype.writeUint16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};$.ByteBuffer.prototype.writeInt32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};$.ByteBuffer.prototype.writeUint32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};$.ByteBuffer.prototype.writeInt64=function(r,e){this.writeInt32(r,e.low),this.writeInt32(r+4,e.high)};$.ByteBuffer.prototype.writeUint64=function(r,e){this.writeUint32(r,e.low),this.writeUint32(r+4,e.high)};$.ByteBuffer.prototype.writeFloat32=function(r,e){$.float32[0]=e,this.writeInt32(r,$.int32[0])};$.ByteBuffer.prototype.writeFloat64=function(r,e){$.float64[0]=e,this.writeInt32(r,$.int32[$.isLittleEndian?0:1]),this.writeInt32(r+4,$.int32[$.isLittleEndian?1:0])};$.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+$.SIZEOF_INT+$.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var r="",e=0;e<$.FILE_IDENTIFIER_LENGTH;e++)r+=String.fromCharCode(this.readInt8(this.position_+$.SIZEOF_INT+e));return r};$.ByteBuffer.prototype.__offset=function(r,e){var n=r-this.readInt32(r);return e<this.readInt16(n)?this.readInt16(n+e):0};$.ByteBuffer.prototype.__union=function(r,e){return r.bb_pos=e+this.readInt32(e),r.bb=this,r};$.ByteBuffer.prototype.__string=function(r,e){r+=this.readInt32(r);var n=this.readInt32(r),t="",o=0;if(r+=$.SIZEOF_INT,e===$.Encoding.UTF8_BYTES)return this.bytes_.subarray(r,r+n);for(;o<n;){var i,s=this.readUint8(r+o++);if(s<192)i=s;else{var a=this.readUint8(r+o++);if(s<224)i=(s&31)<<6|a&63;else{var u=this.readUint8(r+o++);if(s<240)i=(s&15)<<12|(a&63)<<6|u&63;else{var l=this.readUint8(r+o++);i=(s&7)<<18|(a&63)<<12|(u&63)<<6|l&63}}}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode((i>>10)+55296,(i&1024-1)+56320))}return t};$.ByteBuffer.prototype.__indirect=function(r){return r+this.readInt32(r)};$.ByteBuffer.prototype.__vector=function(r){return r+this.readInt32(r)+$.SIZEOF_INT};$.ByteBuffer.prototype.__vector_len=function(r){return this.readInt32(r+this.readInt32(r))};$.ByteBuffer.prototype.__has_identifier=function(r){if(r.length!=$.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+$.FILE_IDENTIFIER_LENGTH);for(var e=0;e<$.FILE_IDENTIFIER_LENGTH;e++)if(r.charCodeAt(e)!=this.readInt8(this.position_+$.SIZEOF_INT+e))return!1;return!0};$.ByteBuffer.prototype.createLong=function(r,e){return $.Long.create(r,e)}});var M,Fr=S(()=>{"use strict";Cn();(e=>{let r;(t=>{let n;(i=>{let o;(x=>(x[x.UNDEFINED=0]="UNDEFINED",x[x.FLOAT=1]="FLOAT",x[x.INT=2]="INT",x[x.STRING=3]="STRING",x[x.TENSOR=4]="TENSOR",x[x.GRAPH=5]="GRAPH",x[x.FLOATS=6]="FLOATS",x[x.INTS=7]="INTS",x[x.STRINGS=8]="STRINGS",x[x.TENSORS=9]="TENSORS",x[x.GRAPHS=10]="GRAPHS",x[x.SPARSE_TENSOR=11]="SPARSE_TENSOR",x[x.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(o=i.AttributeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{let o;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(o=i.DimensionValueType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{let o;(k=>(k[k.UNDEFINED=0]="UNDEFINED",k[k.FLOAT=1]="FLOAT",k[k.UINT8=2]="UINT8",k[k.INT8=3]="INT8",k[k.UINT16=4]="UINT16",k[k.INT16=5]="INT16",k[k.INT32=6]="INT32",k[k.INT64=7]="INT64",k[k.STRING=8]="STRING",k[k.BOOL=9]="BOOL",k[k.FLOAT16=10]="FLOAT16",k[k.DOUBLE=11]="DOUBLE",k[k.UINT32=12]="UINT32",k[k.UINT64=13]="UINT64",k[k.COMPLEX64=14]="COMPLEX64",k[k.COMPLEX128=15]="COMPLEX128",k[k.BFLOAT16=16]="BFLOAT16",k[k.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",k[k.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",k[k.FLOAT8E5M2=19]="FLOAT8E5M2",k[k.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(o=i.TensorDataType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{let o;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(o=i.NodeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{let o;(c=>(c[c.NONE=0]="NONE",c[c.tensor_type=1]="tensor_type",c[c.sequence_type=2]="sequence_type",c[c.map_type=3]="map_type"))(o=i.TypeInfoValue||={})})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsShape(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dim(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}dimLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}static startShape(a){a.startObject(1)}static addDim(a,u){a.addFieldOffset(0,u,0)}static createDimVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startDimVector(a,u){a.startVector(4,u,4)}static endShape(a){return a.endObject()}static createShape(a,u){return o.startShape(a),o.addDim(a,u),o.endShape(a)}}i.Shape=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimension(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimension(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}value(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimension(a){a.startObject(2)}static addValue(a,u){a.addFieldOffset(0,u,0)}static addDenotation(a,u){a.addFieldOffset(1,u,0)}static endDimension(a){return a.endObject()}static createDimension(a,u,l){return o.startDimension(a),o.addValue(a,u),o.addDenotation(a,l),o.endDimension(a)}}i.Dimension=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimensionValue(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimensionValue(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dimType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt8(this.bb_pos+a):0}dimValue(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}dimParam(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimensionValue(a){a.startObject(3)}static addDimType(a,u){a.addFieldInt8(0,u,0)}static addDimValue(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static addDimParam(a,u){a.addFieldOffset(2,u,0)}static endDimensionValue(a){return a.endObject()}static createDimensionValue(a,u,l,c){return o.startDimensionValue(a),o.addDimType(a,u),o.addDimValue(a,l),o.addDimParam(a,c),o.endDimensionValue(a)}}i.DimensionValue=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensorTypeAndShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}shape(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,u){a.addFieldInt32(0,u,0)}static addShape(a,u){a.addFieldOffset(1,u,0)}static endTensorTypeAndShape(a){return a.endObject()}static createTensorTypeAndShape(a,u,l){return o.startTensorTypeAndShape(a),o.addElemType(a,u),o.addShape(a,l),o.endTensorTypeAndShape(a)}}i.TensorTypeAndShape=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsMapType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}keyType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}valueType(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,u){a.addFieldInt32(0,u,0)}static addValueType(a,u){a.addFieldOffset(1,u,0)}static endMapType(a){return a.endObject()}static createMapType(a,u,l){return o.startMapType(a),o.addKeyType(a,u),o.addValueType(a,l),o.endMapType(a)}}i.MapType=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSequenceType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSequenceType(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(a){a.startObject(1)}static addElemType(a,u){a.addFieldOffset(0,u,0)}static endSequenceType(a){return a.endObject()}static createSequenceType(a,u){return o.startSequenceType(a),o.addElemType(a,u),o.endSequenceType(a)}}i.SequenceType=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(a,u,l,c){return a.prep(4,12),a.writeInt32(c),a.writeInt32(l),a.writeInt32(u),a.offset()}}i.EdgeEnd=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNodeEdge(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNodeEdge(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndex(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readUint32(this.bb_pos+a):0}inputEdges(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}inputEdgesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}outputEdges(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}outputEdgesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNodeEdge(a){a.startObject(3)}static addNodeIndex(a,u){a.addFieldInt32(0,u,0)}static addInputEdges(a,u){a.addFieldOffset(1,u,0)}static startInputEdgesVector(a,u){a.startVector(12,u,4)}static addOutputEdges(a,u){a.addFieldOffset(2,u,0)}static startOutputEdgesVector(a,u){a.startVector(12,u,4)}static endNodeEdge(a){return a.endObject()}static createNodeEdge(a,u,l,c){return o.startNodeEdge(a),o.addNodeIndex(a,u),o.addInputEdges(a,l),o.addOutputEdges(a,c),o.endNodeEdge(a)}}i.NodeEdge=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNode(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}sinceVersion(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):0}executionProviderType(a){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,a):null}inputs(a,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new e.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}attributesLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+a*4):0}inputArgCountsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){let a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}implicitInputsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDomain(a,u){a.addFieldOffset(2,u,0)}static addSinceVersion(a,u){a.addFieldInt32(3,u,0)}static addIndex(a,u){a.addFieldInt32(4,u,0)}static addOpType(a,u){a.addFieldOffset(5,u,0)}static addType(a,u){a.addFieldInt32(6,u,0)}static addExecutionProviderType(a,u){a.addFieldOffset(7,u,0)}static addInputs(a,u){a.addFieldOffset(8,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(9,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addAttributes(a,u){a.addFieldOffset(10,u,0)}static createAttributesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startAttributesVector(a,u){a.startVector(4,u,4)}static addInputArgCounts(a,u){a.addFieldOffset(11,u,0)}static createInputArgCountsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startInputArgCountsVector(a,u){a.startVector(4,u,4)}static addImplicitInputs(a,u){a.addFieldOffset(12,u,0)}static createImplicitInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startImplicitInputsVector(a,u){a.startVector(4,u,4)}static endNode(a){return a.endObject()}static createNode(a,u,l,c,f,d,m,p,h,b,y,g,x,v){return o.startNode(a),o.addName(a,u),o.addDocString(a,l),o.addDomain(a,c),o.addSinceVersion(a,f),o.addIndex(a,d),o.addOpType(a,m),o.addType(a,p),o.addExecutionProviderType(a,h),o.addInputs(a,b),o.addOutputs(a,y),o.addAttributes(a,g),o.addInputArgCounts(a,x),o.addImplicitInputs(a,v),o.endNode(a)}}i.Node=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsValueInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsValueInfo(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(a){a.startObject(3)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldOffset(2,u,0)}static endValueInfo(a){return a.endObject()}static createValueInfo(a,u,l,c){return o.startValueInfo(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,c),o.endValueInfo(a)}}i.ValueInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTypeInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTypeInfo(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}denotation(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}valueType(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readUint8(this.bb_pos+a):0}value(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(a,this.bb_pos+u):null}static startTypeInfo(a){a.startObject(3)}static addDenotation(a,u){a.addFieldOffset(0,u,0)}static addValueType(a,u){a.addFieldInt8(1,u,0)}static addValue(a,u){a.addFieldOffset(2,u,0)}static endTypeInfo(a){return a.endObject()}static createTypeInfo(a,u,l,c){return o.startTypeInfo(a),o.addDenotation(a,u),o.addValueType(a,l),o.addValue(a,c),o.endTypeInfo(a)}}i.TypeInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsOperatorSetId(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsOperatorSetId(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}domain(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}version(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}static startOperatorSetId(a){a.startObject(2)}static addDomain(a,u){a.addFieldOffset(0,u,0)}static addVersion(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static endOperatorSetId(a){return a.endObject()}static createOperatorSetId(a,u,l){return o.startOperatorSetId(a),o.addDomain(a,u),o.addVersion(a,l),o.endOperatorSetId(a)}}i.OperatorSetId=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensor(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}dataType(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}rawData(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+a):0}rawDataLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}rawDataArray(){let a=this.bb.__offset(this.bb_pos,12);return a?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}stringData(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringDataLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}static startTensor(a){a.startObject(6)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static addDataType(a,u){a.addFieldInt32(3,u,0)}static addRawData(a,u){a.addFieldOffset(4,u,0)}static createRawDataVector(a,u){a.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)a.addInt8(u[l]);return a.endVector()}static startRawDataVector(a,u){a.startVector(1,u,1)}static addStringData(a,u){a.addFieldOffset(5,u,0)}static createStringDataVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringDataVector(a,u){a.startVector(4,u,4)}static endTensor(a){return a.endObject()}static createTensor(a,u,l,c,f,d,m){return o.startTensor(a),o.addName(a,u),o.addDocString(a,l),o.addDims(a,c),o.addDataType(a,f),o.addRawData(a,d),o.addStringData(a,m),o.endTensor(a)}}i.Tensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSparseTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSparseTensor(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}values(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSparseTensor(a){a.startObject(3)}static addValues(a,u){a.addFieldOffset(0,u,0)}static addIndices(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static endSparseTensor(a){return a.endObject()}static createSparseTensor(a,u,l,c){return o.startSparseTensor(a),o.addValues(a,u),o.addIndices(a,l),o.addDims(a,c),o.endSparseTensor(a)}}i.SparseTensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsAttribute(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsAttribute(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt32(this.bb_pos+a):0}f(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readFloat32(this.bb_pos+a):0}i(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}s(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}t(a){let u=this.bb.__offset(this.bb_pos,16);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+a*4):0}floatsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}floatsArray(){let a=this.bb.__offset(this.bb_pos,20);return a?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}ints(a){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}intsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}strings(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringsLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}tensors(a,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}tensorsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}graphs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}graphsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startAttribute(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldInt32(2,u,0)}static addF(a,u){a.addFieldFloat32(3,u,0)}static addI(a,u){a.addFieldInt64(4,u,a.createLong(0,0))}static addS(a,u){a.addFieldOffset(5,u,0)}static addT(a,u){a.addFieldOffset(6,u,0)}static addG(a,u){a.addFieldOffset(7,u,0)}static addFloats(a,u){a.addFieldOffset(8,u,0)}static createFloatsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addFloat32(u[l]);return a.endVector()}static startFloatsVector(a,u){a.startVector(4,u,4)}static addInts(a,u){a.addFieldOffset(9,u,0)}static createIntsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startIntsVector(a,u){a.startVector(8,u,8)}static addStrings(a,u){a.addFieldOffset(10,u,0)}static createStringsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringsVector(a,u){a.startVector(4,u,4)}static addTensors(a,u){a.addFieldOffset(11,u,0)}static createTensorsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startTensorsVector(a,u){a.startVector(4,u,4)}static addGraphs(a,u){a.addFieldOffset(12,u,0)}static createGraphsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startGraphsVector(a,u){a.startVector(4,u,4)}static endAttribute(a){return a.endObject()}static createAttribute(a,u,l,c,f,d,m,p,h,b,y,g,x,v){return o.startAttribute(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,c),o.addF(a,f),o.addI(a,d),o.addS(a,m),o.addT(a,p),o.addG(a,h),o.addFloats(a,b),o.addInts(a,y),o.addStrings(a,g),o.addTensors(a,x),o.addGraphs(a,v),o.endAttribute(a)}}i.Attribute=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsGraph(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsGraph(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}initializers(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}initializersLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeArgs(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeArgsLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}nodes(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}maxNodeIndex(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readUint32(this.bb_pos+a):0}nodeEdges(a,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new e.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeEdgesLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}inputs(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__vector_len(this.bb_pos+a):0}sparseInitializers(a,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new e.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}sparseInitializersLength(){let a=this.bb.__offset(this.bb_pos,18);return a?this.bb.__vector_len(this.bb_pos+a):0}static startGraph(a){a.startObject(8)}static addInitializers(a,u){a.addFieldOffset(0,u,0)}static createInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInitializersVector(a,u){a.startVector(4,u,4)}static addNodeArgs(a,u){a.addFieldOffset(1,u,0)}static createNodeArgsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeArgsVector(a,u){a.startVector(4,u,4)}static addNodes(a,u){a.addFieldOffset(2,u,0)}static createNodesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodesVector(a,u){a.startVector(4,u,4)}static addMaxNodeIndex(a,u){a.addFieldInt32(3,u,0)}static addNodeEdges(a,u){a.addFieldOffset(4,u,0)}static createNodeEdgesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeEdgesVector(a,u){a.startVector(4,u,4)}static addInputs(a,u){a.addFieldOffset(5,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(6,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addSparseInitializers(a,u){a.addFieldOffset(7,u,0)}static createSparseInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSparseInitializersVector(a,u){a.startVector(4,u,4)}static endGraph(a){return a.endObject()}static createGraph(a,u,l,c,f,d,m,p,h){return o.startGraph(a),o.addInitializers(a,u),o.addNodeArgs(a,l),o.addNodes(a,c),o.addMaxNodeIndex(a,f),o.addNodeEdges(a,d),o.addInputs(a,m),o.addOutputs(a,p),o.addSparseInitializers(a,h),o.endGraph(a)}}i.Graph=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsModel(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsModel(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}irVersion(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}opsetImport(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}opsetImportLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}producerName(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}producerVersion(a){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,a):null}modelVersion(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}docString(a){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,a):null}graph(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,a):null}static startModel(a){a.startObject(9)}static addIrVersion(a,u){a.addFieldInt64(0,u,a.createLong(0,0))}static addOpsetImport(a,u){a.addFieldOffset(1,u,0)}static createOpsetImportVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOpsetImportVector(a,u){a.startVector(4,u,4)}static addProducerName(a,u){a.addFieldOffset(2,u,0)}static addProducerVersion(a,u){a.addFieldOffset(3,u,0)}static addDomain(a,u){a.addFieldOffset(4,u,0)}static addModelVersion(a,u){a.addFieldInt64(5,u,a.createLong(0,0))}static addDocString(a,u){a.addFieldOffset(6,u,0)}static addGraph(a,u){a.addFieldOffset(7,u,0)}static addGraphDocString(a,u){a.addFieldOffset(8,u,0)}static endModel(a){return a.endObject()}static createModel(a,u,l,c,f,d,m,p,h,b){return o.startModel(a),o.addIrVersion(a,u),o.addOpsetImport(a,l),o.addProducerName(a,c),o.addProducerVersion(a,f),o.addDomain(a,d),o.addModelVersion(a,m),o.addDocString(a,p),o.addGraph(a,h),o.addGraphDocString(a,b),o.endModel(a)}}i.Model=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsKernelCreateInfos(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsKernelCreateInfos(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndices(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+a*4):0}nodeIndicesLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeIndicesArray(){let a=this.bb.__offset(this.bb_pos,4);return a?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}kernelDefHashes(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startKernelCreateInfos(a){a.startObject(2)}static addNodeIndices(a,u){a.addFieldOffset(0,u,0)}static createNodeIndicesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startNodeIndicesVector(a,u){a.startVector(4,u,4)}static addKernelDefHashes(a,u){a.addFieldOffset(1,u,0)}static createKernelDefHashesVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startKernelDefHashesVector(a,u){a.startVector(8,u,8)}static endKernelCreateInfos(a){return a.endObject()}static createKernelCreateInfos(a,u,l){return o.startKernelCreateInfos(a),o.addNodeIndices(a,u),o.addKernelDefHashes(a,l),o.endKernelCreateInfos(a)}}i.KernelCreateInfos=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSubGraphSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSubGraphSessionState(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}graphId(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(a){a.startObject(2)}static addGraphId(a,u){a.addFieldOffset(0,u,0)}static addSessionState(a,u){a.addFieldOffset(1,u,0)}static endSubGraphSessionState(a){let u=a.endObject();return a.requiredField(u,4),u}static createSubGraphSessionState(a,u,l){return o.startSubGraphSessionState(a),o.addGraphId(a,u),o.addSessionState(a,l),o.endSubGraphSessionState(a)}}i.SubGraphSessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSessionState(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}subGraphSessionStatesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSessionState(a){a.startObject(2)}static addKernels(a,u){a.addFieldOffset(0,u,0)}static addSubGraphSessionStates(a,u){a.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSubGraphSessionStatesVector(a,u){a.startVector(4,u,4)}static endSessionState(a){return a.endObject()}static createSessionState(a,u,l){return o.startSessionState(a),o.addKernels(a,u),o.addSubGraphSessionStates(a,l),o.endSessionState(a)}}i.SessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsInferenceSession(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,u){return a.setPosition(a.position()+$.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}model(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(a){a.startObject(3)}static addOrtVersion(a,u){a.addFieldOffset(0,u,0)}static addModel(a,u){a.addFieldOffset(1,u,0)}static addSessionState(a,u){a.addFieldOffset(2,u,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,u){a.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,u){a.finish(u,"ORTM",!0)}static createInferenceSession(a,u,l,c){return o.startInferenceSession(a),o.addOrtVersion(a,u),o.addModel(a,l),o.addSessionState(a,c),o.endInferenceSession(a)}}i.InferenceSession=o})(n=t.fbs||={})})(r=e.experimental||={})})(M||={})});var Fs=Be((X_,Vs)=>{"use strict";Vs.exports=bb;function bb(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(a,u){n[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var f=new Array(arguments.length-1),d=0;d<f.length;)f[d++]=arguments[d];a.apply(null,f)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var Ws=Be(Us=>{"use strict";var kn=Us;kn.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var _r=new Array(64),Ms=new Array(123);for(vt=0;vt<64;)Ms[_r[vt]=vt<26?vt+65:vt<52?vt+71:vt<62?vt-4:vt-59|43]=vt++;var vt;kn.encode=function(e,n,t){for(var o=null,i=[],s=0,a=0,u;n<t;){var l=e[n++];switch(a){case 0:i[s++]=_r[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=_r[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=_r[u|l>>6],i[s++]=_r[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=_r[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var Gs="invalid encoding";kn.decode=function(e,n,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=Ms[u])===void 0)throw Error(Gs);switch(i){case 0:s=u,i=1;break;case 1:n[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:n[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:n[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(Gs);return t-o};kn.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var qs=Be((J_,Hs)=>{"use strict";Hs.exports=Dn;function Dn(){this._listeners={}}Dn.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Dn.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Dn.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Qs=Be((Y_,Ys)=>{"use strict";Ys.exports=Ks(Ks);function Ks(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3]}function i(u,l,c){e[0]=u,l[c]=n[3],l[c+1]=n[2],l[c+2]=n[1],l[c+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function a(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?s:a,r.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}r.writeFloatLE=e.bind(null,js),r.writeFloatBE=e.bind(null,Xs);function n(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Zs),r.readFloatBE=n.bind(null,Js)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3],l[c+4]=n[4],l[c+5]=n[5],l[c+6]=n[6],l[c+7]=n[7]}function i(u,l,c){e[0]=u,l[c]=n[7],l[c+1]=n[6],l[c+2]=n[5],l[c+3]=n[4],l[c+4]=n[3],l[c+5]=n[2],l[c+6]=n[1],l[c+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function a(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?s:a,r.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var c;if(s<22250738585072014e-324)c=s/5e-324,t(c>>>0,a,u+o),t((l<<31|c/4294967296)>>>0,a,u+i);else{var f=Math.floor(Math.log(s)/Math.LN2);f===1024&&(f=1023),c=s*Math.pow(2,-f),t(c*4503599627370496>>>0,a,u+o),t((l<<31|f+1023<<20|c*1048576&1048575)>>>0,a,u+i)}}}r.writeDoubleLE=e.bind(null,js,0,4),r.writeDoubleBE=e.bind(null,Xs,4,0);function n(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),c=(l>>31)*2+1,f=l>>>20&2047,d=4294967296*(l&1048575)+u;return f===2047?d?NaN:c*(1/0):f===0?c*5e-324*d:c*Math.pow(2,f-1075)*(d+4503599627370496)}r.readDoubleLE=n.bind(null,Zs,0,4),r.readDoubleBE=n.bind(null,Js,4,0)}(),r}function js(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Xs(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Zs(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function Js(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var eu=Be((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var ru=Be(tu=>{"use strict";var ui=tu;ui.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};ui.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,s=[],a=0,u;n<t;)u=e[n++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};ui.write=function(e,n,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var ou=Be((e2,nu)=>{"use strict";nu.exports=yb;function yb(r,e,n){var t=n||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return r(u);s+u>t&&(i=r(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var au=Be((t2,iu)=>{"use strict";iu.exports=Ve;var Gr=Ht();function Ve(r,e){this.lo=r>>>0,this.hi=e>>>0}var tr=Ve.zero=new Ve(0,0);tr.toNumber=function(){return 0};tr.zzEncode=tr.zzDecode=function(){return this};tr.length=function(){return 1};var xb=Ve.zeroHash="\0\0\0\0\0\0\0\0";Ve.fromNumber=function(e){if(e===0)return tr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new Ve(t,o)};Ve.from=function(e){if(typeof e=="number")return Ve.fromNumber(e);if(Gr.isString(e))if(Gr.Long)e=Gr.Long.fromString(e);else return Ve.fromNumber(parseInt(e,10));return e.low||e.high?new Ve(e.low>>>0,e.high>>>0):tr};Ve.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};Ve.prototype.toLong=function(e){return Gr.Long?new Gr.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Wt=String.prototype.charCodeAt;Ve.fromHash=function(e){return e===xb?tr:new Ve((Wt.call(e,0)|Wt.call(e,1)<<8|Wt.call(e,2)<<16|Wt.call(e,3)<<24)>>>0,(Wt.call(e,4)|Wt.call(e,5)<<8|Wt.call(e,6)<<16|Wt.call(e,7)<<24)>>>0)};Ve.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Ve.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};Ve.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};Ve.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var Ht=Be(li=>{"use strict";var W=li;W.asPromise=Fs();W.base64=Ws();W.EventEmitter=qs();W.float=Qs();W.inquire=eu();W.utf8=ru();W.pool=ou();W.LongBits=au();W.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);W.global=W.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||li;W.emptyArray=Object.freeze?Object.freeze([]):[];W.emptyObject=Object.freeze?Object.freeze({}):{};W.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};W.isString=function(e){return typeof e=="string"||e instanceof String};W.isObject=function(e){return e&&typeof e=="object"};W.isset=W.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};W.Buffer=function(){try{var r=W.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();W._Buffer_from=null;W._Buffer_allocUnsafe=null;W.newBuffer=function(e){return typeof e=="number"?W.Buffer?W._Buffer_allocUnsafe(e):new W.Array(e):W.Buffer?W._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};W.Array=typeof Uint8Array<"u"?Uint8Array:Array;W.Long=W.global.dcodeIO&&W.global.dcodeIO.Long||W.global.Long||W.inquire("long");W.key2Re=/^true|false|0|1$/;W.key32Re=/^-?(?:0|[1-9][0-9]*)$/;W.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;W.longToHash=function(e){return e?W.LongBits.from(e).toHash():W.LongBits.zeroHash};W.longFromHash=function(e,n){var t=W.LongBits.fromHash(e);return W.Long?W.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function su(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}W.merge=su;W.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function uu(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&su(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}W.newError=uu;W.ProtocolError=uu("ProtocolError");W.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};W.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};W.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};W._configure=function(){var r=W.Buffer;if(!r){W._Buffer_from=W._Buffer_allocUnsafe=null;return}W._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},W._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var gi=Be((n2,du)=>{"use strict";du.exports=ce;var ft=Ht(),ci,Bn=ft.LongBits,lu=ft.base64,cu=ft.utf8;function Mr(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function di(){}function wb(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function ce(){this.len=0,this.head=new Mr(di,0,0),this.tail=this.head,this.states=null}var fu=function(){return ft.Buffer?function(){return(ce.create=function(){return new ci})()}:function(){return new ce}};ce.create=fu();ce.alloc=function(e){return new ft.Array(e)};ft.Array!==Array&&(ce.alloc=ft.pool(ce.alloc,ft.Array.prototype.subarray));ce.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Mr(e,n,t),this.len+=n,this};function pi(r,e,n){e[n]=r&255}function vb(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function mi(r,e){this.len=r,this.next=void 0,this.val=e}mi.prototype=Object.create(Mr.prototype);mi.prototype.fn=vb;ce.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new mi((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};ce.prototype.int32=function(e){return e<0?this._push(hi,10,Bn.fromNumber(e)):this.uint32(e)};ce.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function hi(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}ce.prototype.uint64=function(e){var n=Bn.from(e);return this._push(hi,n.length(),n)};ce.prototype.int64=ce.prototype.uint64;ce.prototype.sint64=function(e){var n=Bn.from(e).zzEncode();return this._push(hi,n.length(),n)};ce.prototype.bool=function(e){return this._push(pi,1,e?1:0)};function fi(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}ce.prototype.fixed32=function(e){return this._push(fi,4,e>>>0)};ce.prototype.sfixed32=ce.prototype.fixed32;ce.prototype.fixed64=function(e){var n=Bn.from(e);return this._push(fi,4,n.lo)._push(fi,4,n.hi)};ce.prototype.sfixed64=ce.prototype.fixed64;ce.prototype.float=function(e){return this._push(ft.float.writeFloatLE,4,e)};ce.prototype.double=function(e){return this._push(ft.float.writeDoubleLE,8,e)};var Tb=ft.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};ce.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(pi,1,0);if(ft.isString(e)){var t=ce.alloc(n=lu.length(e));lu.decode(e,t,0),e=t}return this.uint32(n)._push(Tb,n,e)};ce.prototype.string=function(e){var n=cu.length(e);return n?this.uint32(n)._push(cu.write,n,e):this._push(pi,1,0)};ce.prototype.fork=function(){return this.states=new wb(this),this.head=this.tail=new Mr(di,0,0),this.len=0,this};ce.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Mr(di,0,0),this.len=0),this};ce.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};ce.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};ce._configure=function(r){ci=r,ce.create=fu(),ci._configure()}});var hu=Be((o2,mu)=>{"use strict";mu.exports=$t;var pu=gi();($t.prototype=Object.create(pu.prototype)).constructor=$t;var qt=Ht();function $t(){pu.call(this)}$t._configure=function(){$t.alloc=qt._Buffer_allocUnsafe,$t.writeBytesBuffer=qt.Buffer&&qt.Buffer.prototype instanceof Uint8Array&&qt.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};$t.prototype.bytes=function(e){qt.isString(e)&&(e=qt._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push($t.writeBytesBuffer,n,e),this};function _b(r,e,n){r.length<40?qt.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}$t.prototype.string=function(e){var n=qt.Buffer.byteLength(e);return this.uint32(n),n&&this._push(_b,n,e),this};$t._configure()});var xi=Be((i2,wu)=>{"use strict";wu.exports=Oe;var Tt=Ht(),yi,yu=Tt.LongBits,Ib=Tt.utf8;function _t(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Oe(r){this.buf=r,this.pos=0,this.len=r.length}var gu=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Oe(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Oe(e);throw Error("illegal buffer")},xu=function(){return Tt.Buffer?function(n){return(Oe.create=function(o){return Tt.Buffer.isBuffer(o)?new yi(o):gu(o)})(n)}:gu};Oe.create=xu();Oe.prototype._slice=Tt.Array.prototype.subarray||Tt.Array.prototype.slice;Oe.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,_t(this,10);return e}}();Oe.prototype.int32=function(){return this.uint32()|0};Oe.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function bi(){var r=new yu(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw _t(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw _t(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Oe.prototype.bool=function(){return this.uint32()!==0};function Ln(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Oe.prototype.fixed32=function(){if(this.pos+4>this.len)throw _t(this,4);return Ln(this.buf,this.pos+=4)};Oe.prototype.sfixed32=function(){if(this.pos+4>this.len)throw _t(this,4);return Ln(this.buf,this.pos+=4)|0};function bu(){if(this.pos+8>this.len)throw _t(this,8);return new yu(Ln(this.buf,this.pos+=4),Ln(this.buf,this.pos+=4))}Oe.prototype.float=function(){if(this.pos+4>this.len)throw _t(this,4);var e=Tt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Oe.prototype.double=function(){if(this.pos+8>this.len)throw _t(this,4);var e=Tt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Oe.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw _t(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Tt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Oe.prototype.string=function(){var e=this.bytes();return Ib.read(e,0,e.length)};Oe.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw _t(this,e);this.pos+=e}else do if(this.pos>=this.len)throw _t(this);while(this.buf[this.pos++]&128);return this};Oe.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Oe._configure=function(r){yi=r,Oe.create=xu(),yi._configure();var e=Tt.Long?"toLong":"toNumber";Tt.merge(Oe.prototype,{int64:function(){return bi.call(this)[e](!1)},uint64:function(){return bi.call(this)[e](!0)},sint64:function(){return bi.call(this).zzDecode()[e](!1)},fixed64:function(){return bu.call(this)[e](!0)},sfixed64:function(){return bu.call(this)[e](!1)}})}});var Iu=Be((a2,_u)=>{"use strict";_u.exports=rr;var Tu=xi();(rr.prototype=Object.create(Tu.prototype)).constructor=rr;var vu=Ht();function rr(r){Tu.call(this,r)}rr._configure=function(){vu.Buffer&&(rr.prototype._slice=vu.Buffer.prototype.slice)};rr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};rr._configure()});var $u=Be((s2,Su)=>{"use strict";Su.exports=Ur;var wi=Ht();(Ur.prototype=Object.create(wi.EventEmitter.prototype)).constructor=Ur;function Ur(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");wi.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Ur.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return wi.asPromise(r,s,e,n,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return s.emit("error",c,e),i(c)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Ur.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Pu=Be(Au=>{"use strict";var Sb=Au;Sb.Service=$u()});var Eu=Be((l2,Ou)=>{"use strict";Ou.exports={}});var Du=Be(ku=>{"use strict";var Ye=ku;Ye.build="minimal";Ye.Writer=gi();Ye.BufferWriter=hu();Ye.Reader=xi();Ye.BufferReader=Iu();Ye.util=Ht();Ye.rpc=Pu();Ye.roots=Eu();Ye.configure=Cu;function Cu(){Ye.util._configure(),Ye.Writer._configure(Ye.BufferWriter),Ye.Reader._configure(Ye.BufferReader)}Cu()});var Lu=Be((f2,Bu)=>{"use strict";Bu.exports=Du()});var Ir=Be((d2,zu)=>{"use strict";var _e=Lu(),R=_e.Reader,Ee=_e.Writer,T=_e.util,w=_e.roots.default||(_e.roots.default={});w.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.s=T.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=T.emptyArray,e.prototype.ints=T.emptyArray,e.prototype.strings=T.emptyArray,e.prototype.tensors=T.emptyArray,e.prototype.graphs=T.emptyArray,e.prototype.sparseTensors=T.emptyArray,e.prototype.typeProtos=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&w.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&w.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)w.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)w.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&w.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)w.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&w.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)w.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=w.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=w.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=w.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=w.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(w.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(w.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(w.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(w.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!T.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!T.isInteger(t.i)&&!(t.i&&T.isInteger(t.i.low)&&T.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||T.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=w.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=w.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=w.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=w.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!T.isInteger(t.ints[i])&&!(t.ints[i]&&T.isInteger(t.ints[i].low)&&T.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||T.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=w.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=w.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=w.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=w.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof w.onnx.AttributeProto)return t;var o=new w.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(T.Long?(o.i=T.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new T.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?T.base64.decode(t.s,o.s=T.newBuffer(T.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=w.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=w.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=w.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=w.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)T.Long?(o.ints[i]=T.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new T.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?T.base64.decode(t.strings[i],o.strings[i]=T.newBuffer(T.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=w.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=w.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=w.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=w.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,T.Long){var s=new T.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=T.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?T.Long.prototype.toString.call(t.i):o.longs===Number?new T.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?T.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=w.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=w.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?T.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new T.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?T.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=w.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=w.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=w.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=w.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?w.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:w.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=w.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=w.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ee.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&w.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=w.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=w.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.ValueInfoProto)return t;var o=new w.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=w.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=w.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=T.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)w.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(w.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!T.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!T.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!T.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=w.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.NodeProto)return t;var o=new w.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=w.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=w.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=T.emptyArray,e.prototype.updateBinding=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&w.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&w.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)w.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)w.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=w.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=w.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=w.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=w.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=w.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=w.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TrainingInfoProto)return t;var o=new w.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=w.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=w.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=w.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=w.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=w.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=w.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=w.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=w.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=T.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=T.emptyArray,e.prototype.trainingInfo=T.emptyArray,e.prototype.functions=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&w.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)w.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)w.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)w.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)w.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(w.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=w.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(w.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(w.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!T.isInteger(t.irVersion)&&!(t.irVersion&&T.isInteger(t.irVersion.low)&&T.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=w.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!T.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!T.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!T.isInteger(t.modelVersion)&&!(t.modelVersion&&T.isInteger(t.modelVersion.low)&&T.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=w.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=w.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=w.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.ModelProto)return t;var o=new w.onnx.ModelProto;if(t.irVersion!=null&&(T.Long?(o.irVersion=T.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new T.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=w.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(T.Long?(o.modelVersion=T.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new T.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=w.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=w.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=w.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=w.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(T.Long){var s=new T.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",T.Long){var s=new T.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?T.Long.prototype.toString.call(t.irVersion):o.longs===Number?new T.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?T.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new T.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=w.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=w.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=w.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=w.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=w.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ee.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!T.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!T.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.StringStringEntryProto)return t;var o=new w.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)w.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!T.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorAnnotation)return t;var o=new w.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=w.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=w.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=T.emptyArray,e.prototype.name="",e.prototype.initializer=T.emptyArray,e.prototype.sparseInitializer=T.emptyArray,e.prototype.docString="",e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.valueInfo=T.emptyArray,e.prototype.quantizationAnnotation=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)w.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)w.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)w.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)w.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)w.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)w.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)w.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(w.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(w.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(w.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(w.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=w.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=w.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=w.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=w.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=w.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=w.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=w.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.GraphProto)return t;var o=new w.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=w.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=w.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=w.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=w.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=w.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=w.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=w.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=w.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=w.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=w.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=w.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=w.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=w.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=w.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=T.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=T.emptyArray,e.prototype.int32Data=T.emptyArray,e.prototype.stringData=T.emptyArray,e.prototype.int64Data=T.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=T.newBuffer([]),e.prototype.externalData=T.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=T.emptyArray,e.prototype.uint64Data=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&w.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)w.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=w.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!T.isInteger(t.dims[o])&&!(t.dims[o]&&T.isInteger(t.dims[o].low)&&T.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!T.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=w.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!T.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||T.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!T.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&T.isInteger(t.int64Data[o].low)&&T.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||T.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!T.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&T.isInteger(t.uint64Data[o].low)&&T.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorProto)return t;var o=new w.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)T.Long?(o.dims[i]=T.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new T.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=w.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?T.base64.decode(t.stringData[i],o.stringData[i]=T.newBuffer(T.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)T.Long?(o.int64Data[i]=T.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new T.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?T.base64.decode(t.rawData,o.rawData=T.newBuffer(T.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=w.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)T.Long?(o.uint64Data[i]=T.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new T.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=T.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?T.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new T.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=w.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?T.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?T.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new T.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?T.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?T.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new T.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=w.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?w.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:w.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=T.Long?T.Long.fromBits(0,0,!1):0,n.prototype.end=T.Long?T.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=Ee.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof R||(o=R.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new w.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},n.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!T.isInteger(o.begin)&&!(o.begin&&T.isInteger(o.begin.low)&&T.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!T.isInteger(o.end)&&!(o.end&&T.isInteger(o.end.low)&&T.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof w.onnx.TensorProto.Segment)return o;var i=new w.onnx.TensorProto.Segment;return o.begin!=null&&(T.Long?(i.begin=T.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new T.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(T.Long?(i.end=T.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new T.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(T.Long){var a=new T.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(T.Long){var a=new T.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?T.Long.prototype.toString.call(o.begin):i.longs===Number?new T.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?T.Long.prototype.toString.call(o.end):i.longs===Number?new T.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&w.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&w.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=w.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=w.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=w.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=w.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!T.isInteger(t.dims[i])&&!(t.dims[i]&&T.isInteger(t.dims[i].low)&&T.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof w.onnx.SparseTensorProto)return t;var o=new w.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=w.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=w.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)T.Long?(o.dims[i]=T.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new T.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=w.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=w.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?T.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new T.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)w.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(w.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=w.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorShapeProto)return t;var o=new w.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=w.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=w.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:T.oneOfGetter(t=["dimValue","dimParam"]),set:T.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,s){return s||(s=Ee.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},n.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},n.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!T.isInteger(i.dimValue)&&!(i.dimValue&&T.isInteger(i.dimValue.low)&&T.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!T.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!T.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof w.onnx.TensorShapeProto.Dimension)return i;var s=new w.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(T.Long?(s.dimValue=T.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new T.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},n.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?T.Long.prototype.toString.call(i.dimValue):s.longs===Number?new T.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:T.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:T.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Ee.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&w.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&w.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&w.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&w.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&w.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof R||(o=R.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new w.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=w.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=w.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=w.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=w.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=w.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=w.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!T.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof w.onnx.TypeProto)return o;var i=new w.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=w.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=w.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=w.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=w.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=w.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=w.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=w.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=w.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=w.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=w.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ee.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&w.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=w.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!T.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=w.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Tensor)return i;var s=new w.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=w.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=w.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ee.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&w.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=w.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Sequence)return i;var s=new w.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=w.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=w.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ee.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&w.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!T.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=w.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Map)return i;var s=new w.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=w.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=w.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ee.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&w.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=w.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Optional)return i;var s=new w.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=w.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=w.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Ee.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&w.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=w.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!T.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=w.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.SparseTensor)return i;var s=new w.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=w.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=w.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=T.Long?T.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Ee.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!T.isInteger(t.version)&&!(t.version&&T.isInteger(t.version.low)&&T.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof w.onnx.OperatorSetIdProto)return t;var o=new w.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(T.Long?(o.version=T.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new T.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",T.Long){var s=new T.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?T.Long.prototype.toString.call(t.version):o.longs===Number?new T.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.attribute=T.emptyArray,e.prototype.attributeProto=T.emptyArray,e.prototype.node=T.emptyArray,e.prototype.docString="",e.prototype.opsetImport=T.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Ee.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)w.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)w.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)w.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(w.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(w.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(w.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!T.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!T.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!T.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=w.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=w.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=w.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.FunctionProto)return t;var o=new w.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=w.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=w.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=w.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=w.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=w.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=w.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,_e.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();zu.exports=w});function Sr(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Hr(r){return new TextDecoder().decode(r)}var Ie,nr,vi,Ke,zn,Me,Qe,G,Wr,or,ir,ar,me=S(()=>{"use strict";Cn();si();Ie=wr(Ir());sr();nr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},vi=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Ke=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=vi.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;a[s-u]=Math.max(l,c)}return a}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let s=r.calcShape(e.dims,n.dims);if(s){if(o&&!G.areEqual(s,e.dims))return;let a=G.size(s),u=o?e:new Le(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(s.length),c=new Array(e.dims.length),f=new Array(n.dims.length),d=0,m=0,p=!1,h=!1;e.dims.length===0&&(d=e.get([]),p=!0),n.dims.length===0&&(m=n.get([]),h=!0);let b;for(let y=0;y<a;y++){b=y;for(let g=s.length-1;g>=0;g--)l[g]=b%s[g],b=Math.floor(b/s[g]);p||(r.fillIndex(l,e.dims,c),d=e.get(c)),h||(r.fillIndex(l,n.dims,f),m=n.get(f)),u.set(l,t(d,m))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(n[n.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},zn=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Ke.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Me=class r{static tensorDataTypeFromProto(e){switch(e){case Ie.onnx.TensorProto.DataType.INT8:return"int8";case Ie.onnx.TensorProto.DataType.UINT8:return"uint8";case Ie.onnx.TensorProto.DataType.BOOL:return"bool";case Ie.onnx.TensorProto.DataType.INT16:return"int16";case Ie.onnx.TensorProto.DataType.UINT16:return"uint16";case Ie.onnx.TensorProto.DataType.INT32:return"int32";case Ie.onnx.TensorProto.DataType.UINT32:return"uint32";case Ie.onnx.TensorProto.DataType.FLOAT:return"float32";case Ie.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ie.onnx.TensorProto.DataType.STRING:return"string";case Ie.onnx.TensorProto.DataType.INT64:return"int32";case Ie.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ie.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ie.onnx.TensorProto.DataType.INT8;case"uint8":return Ie.onnx.TensorProto.DataType.UINT8;case"bool":return Ie.onnx.TensorProto.DataType.BOOL;case"int16":return Ie.onnx.TensorProto.DataType.INT16;case"uint16":return Ie.onnx.TensorProto.DataType.UINT16;case"int32":return Ie.onnx.TensorProto.DataType.INT32;case"uint32":return Ie.onnx.TensorProto.DataType.UINT32;case"float32":return Ie.onnx.TensorProto.DataType.FLOAT;case"float64":return Ie.onnx.TensorProto.DataType.DOUBLE;case"string":return Ie.onnx.TensorProto.DataType.STRING;case"int64":return Ie.onnx.TensorProto.DataType.INT64;case"uint64":return Ie.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>Nt.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(Qe.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},Qe=class{static longToNumber(e,n){return Nt.isLong(e)?e.toNumber():e instanceof $.Long?Nt.fromValue({low:e.low,high:e.high,unsigned:n??!1}).toNumber():e}static isLong(e){return Nt.isLong(e)||e instanceof $.Long}},G=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];s*=o[u]}}let a=r.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(n).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let s=r.normalizeAxis(n[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Wr=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[n]=t[a],i.push(u)}return[i,s]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},or=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)r.adjustPadAndReturnShape(e[a+2],n[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[a]=f-i[s],Math.floor((e+f-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},ir=-34028234663852886e22,ar=34028234663852886e22});function $b(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function Ru(r){switch(r){case te.onnx.TensorProto.DataType.UINT8:case te.onnx.TensorProto.DataType.INT8:case te.onnx.TensorProto.DataType.BOOL:return 1;case te.onnx.TensorProto.DataType.UINT16:case te.onnx.TensorProto.DataType.INT16:return 2;case te.onnx.TensorProto.DataType.FLOAT:case te.onnx.TensorProto.DataType.INT32:case te.onnx.TensorProto.DataType.UINT32:return 4;case te.onnx.TensorProto.DataType.INT64:case te.onnx.TensorProto.DataType.DOUBLE:case te.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${te.onnx.TensorProto.DataType[r]}`)}}function Ab(r,e){return new(Fu(e))(r)}function Fu(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function _i(r,e){if(e===te.onnx.TensorProto.DataType.INT64||e===Ti.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===te.onnx.TensorProto.DataType.UINT32||e===Ti.TensorDataType.UINT32||e===te.onnx.TensorProto.DataType.UINT64||e===Ti.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${te.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Nu(r,e,n){switch(e){case te.onnx.TensorProto.DataType.BOOL:case te.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case te.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case te.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case te.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case te.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case te.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case te.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case te.onnx.TensorProto.DataType.INT64:return _i(Nt.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case te.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case te.onnx.TensorProto.DataType.UINT64:return _i(Nt.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${te.onnx.TensorProto.DataType[e]}`)}}var Vu,te,Ti,Le,sr=S(()=>{"use strict";Vu=wr(Ps());si();Fr();te=wr(Ir());me();Ti=M.experimental.fbs,Le=class r{constructor(e,n,t,o,i,s=Vu.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=G.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=Fu(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*$b(n));this.cache=Ab(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[G.indicesToOffset(e,this.strides)]}set(e,n){this.data[G.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=G.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=Me.tensorDataTypeFromProto(e.dataType),t=Me.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,s)=>{o.data[s]=Hr(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=Ru(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Nu(s,e.dataType,l*a);i[l]=c}}else{let i;switch(e.dataType){case te.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case te.onnx.TensorProto.DataType.INT32:case te.onnx.TensorProto.DataType.INT16:case te.onnx.TensorProto.DataType.UINT16:case te.onnx.TensorProto.DataType.INT8:case te.onnx.TensorProto.DataType.UINT8:case te.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case te.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case te.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case te.onnx.TensorProto.DataType.UINT32:case te.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];Nt.isLong(u)?s[a]=_i(u,e.dataType):s[a]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=Me.tensorDimsFromORTFormat(e),t=Me.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=Ru(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Nu(s,e.dataType(),l*a);i[l]=c}}return o}}});function H(r){return r===1?Pb:Ob}function Gu(r){let e=H(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Mu(r){let e=H(r);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function Uu(r,e){let n=H(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var Pb,Ob,Ae=S(()=>{"use strict";Pb={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},Ob={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var le=S(()=>{"use strict"});async function Ii(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,s=()=>{if(r()){t();return}i++;let a=e(i);if(n!=null&&i>=n){o();return}setTimeout(s,a)};s()})}function Rn(r){return Sr(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function Wu(r){return Sr(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function $r(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function Ar(r,e){return e.map(n=>r[n]).join(", ")}function je(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function It(r=6){return["x","y","z","w","u","v"].slice(0,r)}var At=S(()=>{"use strict";me()});function Eb(r,e){return It(e).map(n=>`${r}.${n}`)}function Pr(r,e){return e===1?[r]:Eb(r,e)}function Pt(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var ur=S(()=>{"use strict";At()});function kb(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function Db(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(n>2)for(let u=0;u<n-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function Bb(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var Hu,Cb,qu,Ku=S(()=>{"use strict";Ae();le();At();ur();Hu={name:"pack",inputNames:["A"],inputTypes:[1]},Cb=(r,e)=>{let n=H(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=je(i),a=Pr("rc",i),u=Bb(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=kb(i,l,a),f=Db(t,a),d=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${c}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${f});
          }
        }
      `;return{...Hu,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:d}},qu=(r,e)=>({...Hu,get:()=>Cb(r,e)})});function Si(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Xu(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function Rb(r){let e=G.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${n[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${n[s+1]} = ${t} - ${n[s]} * ${i}`:`index -= ${n[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function Nb(r){let e=G.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Lb,zb,ju,Zu=S(()=>{"use strict";me();Ae();le();ur();Lb=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),zb=(r,e,n,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=H(r.session.backend.glContext.version),u=`
      ${Rb(o)}
      ${Nb(i)}
      ${Pt()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},ju=(r,e,n)=>{let t=Lb(n);return{...t,get:()=>zb(r,e,t,n)}}});var $i,Ju=S(()=>{"use strict";Ae();le();$i=(r,e)=>{let n=e.shape,t=H(r.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function Fb(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Yu,Vb,Qu,el=S(()=>{"use strict";Ae();le();At();ur();Yu={name:"unpack",inputNames:["A"],inputTypes:[2]},Vb=(r,e)=>{let n=e.dims.length,t=Pr("rc",n),o=t.slice(-2),i=je(n),s=Pt(),u=e.dims.length===0?"":Fb(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,c=H(r.session.backend.glContext.version),f=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Yu,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},Qu=(r,e)=>({...Yu,get:()=>Vb(r,e)})});var Nn,qr,Vn,Kr=S(()=>{"use strict";ut();Nn=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(ge.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(ge.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},qr=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(ge.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Vn=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var jr,tl,Ai,rl=S(()=>{"use strict";me();le();jr=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,s=n===4?e.length-1:void 0,a=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Ai(r,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},tl=(r,e,n)=>{let t=jr(r,e,n);return[t.width,t.height]},Ai=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:n,isPacked:i,shape:l,strides:G.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var Mb,Fn,ol=S(()=>{"use strict";ut();sr();me();Ku();Zu();Ju();el();Kr();rl();le();Mb=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Fn=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return tl(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=Mb(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=jr(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=jr(this.session.layoutStrategy,e.dims,n);if(n===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=jr(this.session.layoutStrategy,u,n),c=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let f=a[0],d=a[1]*a[2]*a[3],m=Math.ceil(d*1/4)*4,p=f*m;c=new Float32Array(p);for(let h=0;h<f;++h){let b=h*d,y=h*m+h%1*d;c.set(e.numberData.subarray(b,b+d),y)}}return this.createTextureData(l,e.type,c,e,1)}}if(n===2){let i=Ai(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){ge.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,s,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:G.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Xu(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:G.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Si(e.dims),i=Si(n),s=this.reshapePacked(e,o),a=this.run(ju(this,s,i),[s]);return this.reshapePacked(a,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let s={...e,tensor:o||new Le(e.unpackedShape,n,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat($i(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat($i(this,e))}pack(e){return this.executeProgram(qu(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Qu(this,e.tensor),[e.tensor])}}});var Pi,ee,Fe=S(()=>{"use strict";Pi=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ee=r=>new Pi(r)});var il,al,sl,Ub,Wb,ul=S(()=>{"use strict";Fe();Ae();le();il={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},al=(r,e,n)=>(Wb(e),[r.run({...il,cacheHint:n.cacheKey,get:()=>Ub(r,e,n)},e)]),sl=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return ee({epsilon:e,momentum:n,spatial:t})},Ub=(r,e,n)=>{let t=H(r.session.backend.glContext.version),o=e[0].dims.length,[i,s]=r.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...il,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},Wb=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Gn,dt,V,Xr,Mn,Vt=S(()=>{"use strict";Gn=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},dt=class{constructor(e){this.context=e}},V=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Xr=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},Mn=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function qb(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function Kb(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function jb(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function Xb(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function Zb(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function Jb(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function Yb(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function Qb(){let r="and_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}}function ey(){let r="or_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:r,type:0}}function ty(){let r="xor_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}}function ry(){return oy("pow")}function ny(){let r="prelu_";return{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0}}function oy(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var pt,iy,ll,cl,fl,dl,pl,ml,hl,gl,bl,yl,xl,wl,vl=S(()=>{"use strict";me();Vt();Ae();le();pt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>iy(r,e,n,t)}},iy=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!G.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=r.session.pack;if(i){let c=Ke.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");s=c;let f=s.length,d=e[0].dims.length!==0?e[0].dims.length:1,m=e[1].dims.length!==0?e[1].dims.length:1,p=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",b=H(r.session.backend.glContext.version),y=a?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${b.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${f}]) {
        int aindices[${d}];
        int bindices[${m}];
        ${p}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:y,hasMain:a}}let u=H(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},ll=(r,e)=>[r.run(pt(r,e,qb()),e)],cl=(r,e)=>[r.run(pt(r,e,Qb(),"bool"),e)],fl=(r,e)=>[r.run(pt(r,e,Kb()),e)],dl=(r,e)=>[r.run(pt(r,e,Zb(),"bool"),e)],pl=(r,e)=>[r.run(pt(r,e,Jb(),"bool"),e)],ml=(r,e)=>[r.run(pt(r,e,Yb(),"bool"),e)],hl=(r,e)=>[r.run(pt(r,e,jb()),e)],gl=(r,e)=>[r.run(pt(r,e,ey(),"bool"),e)],bl=(r,e)=>[r.run(pt(r,e,ry()),e)],yl=(r,e)=>[r.run(pt(r,e,ny()),e)],xl=(r,e)=>[r.run(pt(r,e,Xb()),e)],wl=(r,e)=>[r.run(pt(r,e,ty(),"bool"),e)]});var Tl,_l,sy,Il=S(()=>{"use strict";me();Tl=(r,e,n)=>(sy(e),[r.cast(e[0],n)]),_l=r=>Me.tensorDataTypeFromProto(r.attributes.getInt("to")),sy=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var uy,ly,Sl,Un,$l=S(()=>{"use strict";Ae();le();At();ur();uy=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),ly=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let _=1;_<n.length;_++){let I=n[_].dims.slice();for(let O=0;O<o.length;O++)if(O===t)i[t]+=I[O];else if(o[O]!==I[O])throw new Error("non concat dimensions must match")}let s=i.length,a=Pr("coords",s),u=je(s),l=Pt(),c=n.map(_=>_.dims),f=It(s),d=new Array(c.length-1);d[0]=c[0][t];for(let _=1;_<d.length;_++)d[_]=d[_-1]+c[_][t];let m=f[t],p=f.slice(-2),h=f.join(),b=`if (${m} < ${d[0]}) {
        return getChannel(
            getX0(${h}), vec2(${p.join()}));
        }`;for(let _=1;_<d.length;_++){let I=d[_-1];b+=`
            if (${m} < ${d[_]}  && ${m} >= ${d[_-1]}) {
              return getChannel(
                getX${_}(${Un(f,m,I)}),
                vec2(${Un(p,m,I)}));
            }`}let y=d.length,g=d[d.length-1];b+=`
            return getChannel(
              getX${y}(${Un(f,m,g)}),
              vec2(${Un(p,m,g)}));`;let x=H(r.session.backend.glContext.version),v=`
          ${l}
          float getValue(${f.map(_=>"int "+_)}) {
            ${b}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${f[s-1]};
            coords.${f[s-1]} = coords.${f[s-2]};
            coords.${f[s-2]} = lastDim;

            vec4 result = vec4(getValue(${a}), 0., 0., 0.);

            ${a[s-1]} = ${a[s-1]} + 1;
            if (${a[s-1]} < ${i[s-1]}) {
              result.g = getValue(${a});
            }

            ${a[s-2]} = ${a[s-2]} + 1;
            if (${a[s-2]} < ${i[s-2]}) {
              result.a = getValue(${a});
            }

            ${a[s-1]} = ${a[s-1]} - 1;
            if (${a[s-2]} < ${i[s-2]} &&
                ${a[s-1]} < ${i[s-1]}) {
              result.b = getValue(${a});
            }
            ${x.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:v,hasMain:!0}},Sl=(r,e,n)=>{let t=uy(e.length,n.cacheKey);return{...t,get:()=>ly(r,t,e,n.axis)}},Un=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,s)=>s===t?`${i} - ${n}`:i).join()}});var Al,cy,fy,dy,Pl,py,my,hy,Ol,gy,El=S(()=>{"use strict";Fe();le();$l();Al=(r,e,n)=>(gy(e),r.session.pack&&e[0].dims.length>1?[r.run(Sl(r,e,n),e)]:[r.run(dy(r,e,n),e)]),cy=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),fy=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let m=1;m<n.length;m++){let p=n[m].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=p[h];else if(o[h]!==p[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(n.length),u=0;for(let m=0;m<a.length;++m)u+=n[m].dims[t],a[m]=u;let l="";n.length<5?l=Pl(a):l=py(a);let c=my(n.length,s),f=hy(a),d=`
        ${c}
        ${f}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:d}},dy=(r,e,n)=>{let t=cy(e.length,n.cacheKey);return{...t,get:()=>fy(r,t,e,n.axis)}},Pl=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,py=r=>Pl(r),my=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},hy=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},Ol=r=>ee({axis:r.attributes.getInt("axis")}),gy=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function by(){return mt("abs")}function yy(){return mt("acos")}function xy(){return mt("asin")}function wy(){return mt("atan")}function vy(){return mt("ceil")}function Ty(){return mt("cos")}function _y(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Iy(){return mt("exp")}function Sy(){return mt("floor")}function Oi(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function $y(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function Ay(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Py(){return mt("log")}function Oy(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function Ey(){let r="not";return{body:`
  float ${r}_(float a) {
    return float( ! bool(a) );
  }
  bool ${r}_(bool a) {
    return !a;
  }
  vec4 ${r}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${r}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:r,type:0}}function Cy(){return mt("sin")}function Ei(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function Ci(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function ky(){return mt("sqrt")}function Dy(){return mt("tan")}function By(){let r="tanh";return{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0}}function mt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var Ly,Ce,Cl,kl,Dl,Bl,ki,Ll,zl,zy,Rl,Nl,Vl,Fl,Gl,Ml,Di,Ul,Wl,Hl,ql,Kl,jl,Xl,Zl,Jl,Yl,Ql,Bi=S(()=>{"use strict";Fe();me();Vt();Ae();le();Ly=(r,e,n,t)=>{let o=r.session.pack?2:0,i=H(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},Ce=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>Ly(r,i,e,n)}},Cl=(r,e)=>[r.run(Ce(r,e[0],by()),e)],kl=(r,e)=>[r.run(Ce(r,e[0],yy()),e)],Dl=(r,e)=>[r.run(Ce(r,e[0],xy()),e)],Bl=(r,e)=>[r.run(Ce(r,e[0],wy()),e)],ki=(r,e,n)=>[r.run(Ce(r,e[0],Oi(n.min,n.max),n.cacheKey),e)],Ll=r=>ee({min:r.attributes.getFloat("min",ir),max:r.attributes.getFloat("max",ar)}),zl=(r,e)=>{let n=zy(r,e);return ki(r,[e[0]],n)},zy=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:ir,t=e.length>=3?e[2].numberData[0]:ar;return ee({min:n,max:t})},Rl=(r,e)=>[r.run(Ce(r,e[0],vy()),e)],Nl=(r,e)=>[r.run(Ce(r,e[0],Ty()),e)],Vl=(r,e,n)=>[r.run(Ce(r,e[0],_y(n.alpha),n.cacheKey),e)],Fl=r=>ee({alpha:r.attributes.getFloat("alpha",1)}),Gl=(r,e)=>[r.run(Ce(r,e[0],Iy()),e)],Ml=(r,e)=>[r.run(Ce(r,e[0],Sy()),e)],Di=(r,e)=>[r.run(Ce(r,e[0],$y()),e)],Ul=(r,e,n)=>[r.run(Ce(r,e[0],Ay(n.alpha),n.cacheKey),e)],Wl=r=>ee({alpha:r.attributes.getFloat("alpha",.01)}),Hl=(r,e)=>[r.run(Ce(r,e[0],Py()),e)],ql=(r,e)=>[r.run(Ce(r,e[0],Oy()),e)],Kl=(r,e)=>[r.run(Ce(r,e[0],Ey()),e)],jl=(r,e)=>[r.run(Ce(r,e[0],Ei()),e)],Xl=(r,e)=>[r.run(Ce(r,e[0],Ci()),e)],Zl=(r,e)=>[r.run(Ce(r,e[0],Cy()),e)],Jl=(r,e)=>[r.run(Ce(r,e[0],ky()),e)],Yl=(r,e)=>[r.run(Ce(r,e[0],Dy()),e)],Ql=(r,e)=>[r.run(Ce(r,e[0],By()),e)]});function Ot(r){let e;switch(r.activation){case"Relu":e=Ei();break;case"Sigmoid":e=Ci();break;case"Clip":e=Oi(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var Or,lr=S(()=>{"use strict";me();Bi();Or=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[ir,ar]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var Ny,Vy,ec,tc=S(()=>{"use strict";ut();Ae();le();Wn();lr();Ny=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),Vy=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;ge.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=Er(s,a,t.dilations,t.pads,t.strides),c=H(r.session.backend.glContext.version),{activationFunction:f,applyActivation:d}=Ot(t),m=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${d}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},ec=(r,e,n)=>{let t=Ny(e.length>2,n.cacheKey);return{...t,get:()=>Vy(r,e,t,n)}}});var Fy,Gy,rc,nc=S(()=>{"use strict";Ae();le();ur();Fy=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),Gy=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=2,l=3,c=o.length,f=[a[1]*a[2]*a[3],o[2]*o[3]],d=a[2]*a[3],m=Pt(),p=H(r.session.backend.glContext.version),h="";for(let y=0;y<=1;y++)for(let g=0;g<=1;g++)h+=`
            blockIndex = rc.x + ${g};
            pos = rc.y + ${y};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${d}) / ${a[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${d}), ${a[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${d}.);
                    innerDims = vec2(d0, d1);
                    result[${y*2+g}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let b=`
      ${m}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${p.output} = result;
      }
            `;return{...e,output:{dims:f,type:n.type,textureType:2},shaderSource:b,hasMain:!0}},rc=(r,e,n,t,o)=>{let i=Fy(o.cacheKey);return{...i,get:()=>Gy(r,i,e,n,t,o)}}});function Uy(r,e,n){let t=e[0].dims,o=e[1].dims,i=Ke.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=je(i.length),a=It(),{activationFunction:u,applyActivation:l}=Ot(n),c=e.length>2,f=c?"value += getBiasForMatmul();":"",d=c?`${zi(s,a,e[2].dims,i,!1)}`:"",m=i.length,p=t.length,h=o.length,b=t[t.length-1],y=`
    ${u}
    ${d}
    float process(int indices[${m}]) {
        int a[${p}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${b}; ++k) {
            a[${p-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:y}}function Li(r,e){let n=My(r.length>2,e.activationCacheKey);return{...n,get:()=>Uy(n,r,e)}}function zi(r,e,n,t,o){let i="",s=n.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=n.map((h,b)=>`coords.${e[b+u]}`).join(", ");let c=Ke.getBroadcastDims(n,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
`),d=G.size(n)===1,m="vec4(outputValue.xx, outputValue.yy)";return d&&(m="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${m};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var oc,ic,My,Wy,Hn=S(()=>{"use strict";me();le();At();lr();Ri();oc=(r,e,n)=>(Wy(e),r.session.pack?[r.run(qn(r,e,n),e)]:[r.run(Li(e,n),e)]),ic=r=>Or(r.attributes),My=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});Wy=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function Ky(r,e,n,t){let o=[],i=[],s=n[0].dims,a=n[1].dims,u=s.length,l=a.length,c=t.length,f=c-u,d=c-l;o=s.map((x,v)=>`coords.${e[v+f]}`),o[u-1]="i*2",o.join(", "),i=a.map((x,v)=>`coords.${e[v+d]}`),i[l-2]="i*2",i.join(", ");let m=Ke.getBroadcastDims(s,t),p=Ke.getBroadcastDims(a,t),h=m.map(x=>`coords.${e[x+f]} = 0;`).join(`
`),b=p.map(x=>`coords.${e[x+d]} = 0;`).join(`
`),y=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${y}
  ${h}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${y}
  ${b}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function jy(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function Xy(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var Hy,qy,qn,Ri=S(()=>{"use strict";me();Ae();le();At();lr();Hn();Hy=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),qy=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",s=n[0].dims,a=n[1].dims,u=Ke.calcShape(s,a,!0),l=!G.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=s[s.length-1],f=Math.ceil(c/2),d=s.length,m=a.length,p=H(r.session.backend.glContext.version),h=je(u.length),b=u.length,y=It(),{activationFunction:g,applyActivation:x}=Ot(t),v=o?`${zi(h,y,n[2].dims,u,!0)}`:"",_=l?`${Ky(h,y,n,u)}`:"",I=l?"getAAtOutCoordsMatmul(i)":`getA(${jy(y,d)})`,O=l?"getBAtOutCoordsMatmul(i)":`getB(${Xy(y,m)})`,E=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${y[b-1]}; rc.${y[b-1]} =
          rc.${y[b-2]}; rc.${y[b-2]} = lastDim;
      `,z=`
            ${_}
            ${v}
            ${g}
            void main() {
              ${E}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${I};
                vec4 b = ${O};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${x}
              ${p.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:z,hasMain:!0}},qn=(r,e,n)=>{let t=Hy(e.length>2,n.activationCacheKey);return{...t,get:()=>qy(r,t,e,n)}}});var ac,sc=S(()=>{"use strict";Wn();nc();Ri();ac=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Er(t,o,n.dilations,n.pads,n.strides),s=r.run(rc(r,e[0],e[1],i,n),[e[0]]),a=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=r.run(qn(r,u,n),u);return r.reshapePacked(l,i)}});var Zy,Jy,uc,Ni,Vi=S(()=>{"use strict";le();Zy=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),Jy=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=o.length,l=Ni(s,a,o,4),c=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${s.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:c}},uc=(r,e,n,t,o)=>{let i=Zy(o.cacheKey);return{...i,get:()=>Jy(r,i,e,n,t,o)}},Ni=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var Yy,Qy,lc,cc=S(()=>{"use strict";me();Ae();le();lr();Vi();Yy=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),Qy=(r,e,n,t,o)=>{let i=n[0].dims,s=n[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=Ni(i,s,t),[l,c]=r.calculateTextureWidthAndHeight(a,4),f=G.computeStrides(u),[d,m]=r.calculateTextureWidthAndHeight(u,4),p=t.length,h=n.length<3?"0.0":"_B(b)",b=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:y,applyActivation:g}=Ot(o),x=H(r.session.backend.glContext.version),v=`
${y}
float process(int indices[${p}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${f[0]} + im2col[1] * ${f[1]} + im2col[2] * ${f[2]};
  int kernelOffset = indices[1] * ${a[1]};
  float value = ${h};
  for (int i = 0; i < ${b}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${d}, ${m});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${x.texture2D}(Im2Col, im2colCoords), ${x.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${g}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:v}},lc=(r,e,n,t)=>{let o=Yy(e.length>2,t);return{...o,get:()=>Qy(r,o,e,n,t)}}});var Er,Fi,ex,tx,rx,nx,Gi,ox,Wn=S(()=>{"use strict";Fe();me();tc();sc();cc();lr();Vi();Hn();Er=(r,e,n,t,o)=>{let i=r[0],s=r.slice(2),a=s.length,u=e[0],c=e.slice(2).map((p,h)=>p+(p-1)*(n[h]-1)),d=s.map((p,h)=>p+t[h]+t[h+a]).map((p,h)=>Math.floor((p-c[h]+o[h])/o[h]));return[i,u].concat(...d)},Fi=(r,e,n)=>(ox(e,n),ex(r,e,n)),ex=(r,e,n)=>{let t=nx(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(ec(r,e,t),e)]:i&&o?[tx(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[ac(r,e,t)]:[rx(r,e,t)]},tx=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Er(t,o,n.dilations,n.pads,n.strides),s=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=r.run(Li(u,n),u);return r.reshapeUnpacked(l,i)},rx=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Er(t,o,n.dilations,n.pads,n.strides),s=r.run(uc(r,e[0],e[1],i,n),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return r.run(lc(r,e,i,n),a)},nx=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();or.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},Gi=r=>{let e=r.attributes,n=Or(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return ee({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...n})},ox=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var ix,ax,sx,fc,ux,lx,cx,fx,dx,px,dc,mx,pc=S(()=>{"use strict";Fe();Ae();le();lr();ix=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,ax=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},sx=(r,e,n,t,o,i,s,a)=>{let u=r.length-2,l=a.length===0;for(let c=0;c<u;++c){let f=l?r[c+2]*i[c]:a[c],d=ix(r[c+2],i[c],o[c],e[c],n[c],f);ax(d,t,o,c,c+u),l&&a.push(i[c]*(r[c+2]-1)+s[c]+(e[c]-1)*n[c]+1-o[c]-o[c+u])}},fc=(r,e,n)=>(mx(e,n),ux(r,e,n)),ux=(r,e,n)=>{let t=px(n,e);return[dx(r,e,t)]},lx=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),cx=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=H(r.session.backend.glContext.version),{activationFunction:d,applyActivation:m}=Ot(t),p=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${d}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${m}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:c,type:e[0].type,textureType:0},shaderSource:p,hasMain:!0}},fx=(r,e,n)=>{let t=lx(e.length>2,n.cacheKey);return{...t,get:()=>cx(r,e,t,n)}},dx=(r,e,n)=>r.run(fx(r,e,n),e),px=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)n.push(e[1].dims[a]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;sx(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let s=Object.assign({},r);return Object.assign(s,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),s},dc=r=>{let e=r.attributes,n=Or(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return ee({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:c,...n})},mx=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var mc,cr,hc,hx,gc,gx,bx,yx,Kn=S(()=>{"use strict";Fe();me();le();mc={name:"Transpose",inputNames:["A"],inputTypes:[0]},cr=(r,e,n)=>(yx(e),[r.run({...mc,cacheHint:n.cacheKey,get:()=>hx(r,e[0],n.perm)},e)]),hc=r=>ee({perm:r.attributes.getInts("perm",[])}),hx=(r,e,n)=>{let t=e.dims;n=gc(t,n);let o=gx(t,n),i=t.length,s=`
      ${bx("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...mc,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},gc=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),gx=(r,e)=>(e=gc(r,e),G.sortBasedOnPerm(r,e)),bx=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},yx=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var bc,yc,xx,xc=S(()=>{"use strict";Kn();bc=(r,e,n)=>{xx(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=r.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=cr(r,[a],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,c)]},yc=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},xx=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var wc,vc,wx,Tc=S(()=>{"use strict";me();wc=(r,e,n)=>{wx(e,n);let t=G.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},vc=r=>r.attributes.getInt("axis",1),wx=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var Kt,Zr=S(()=>{"use strict";Kt=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var _c,Ic,vx,Tx,_x,Ix,Sc=S(()=>{"use strict";Fe();Zr();me();le();_c=(r,e,n)=>(Ix(e,n.axis),[r.run(_x(r,e,n),e)]),Ic=r=>ee({axis:r.attributes.getInt("axis",0)}),vx={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},Tx=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),s=new Array(o.length+i.length-1);t=G.normalizeAxis(t,o.length);let a=[];for(let d=0;d<s.length;d++)d<t?(s[d]=o[d],a.push(`inputIdx[${d}] = outputIdx[${d}];`)):d<t+i.length?(s[d]=i[d-t],a.push(`indexDataIdx[${d-t}] = outputIdx[${d}];`)):(s[d]=o[d-i.length+1],a.push(`inputIdx[${d-i.length+1}] = outputIdx[${d}];`));let u=s.length||1,l=o.length,c=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:n[0].type,textureType:0},shaderSource:f}},_x=(r,e,n)=>{let t={...vx,cacheHint:n.cacheKey};return{...t,get:()=>Tx(r,t,e,n.axis)}},Ix=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(Kt.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var Mi,$c,Ac,Pc,Sx,$x,Ax,Oc=S(()=>{"use strict";Fe();me();le();Mi=(r,e,n)=>(Ax(e,n),[r.run(Sx(e,n),e)]),$c=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return ee({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},Ac=r=>$c(r,!1),Pc=r=>$c(r,!0),Sx=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>$x(n,r,e)}},$x=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=zn.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let c=a.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",d=e.length===3?"bcastIndices_C(indices, c);":"",m=e.length===3?"value += beta * _C(c);":"",p=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${d}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${m}
          return value;
      }`;return{...r,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:p}},Ax=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var Ec,Cc,Px,Ox,Ex,Cx,kx,kc=S(()=>{"use strict";Fe();le();Ec=(r,e,n)=>(kx(e),[r.run(Ex(r,e,n),e)]),Cc=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return ee({scale:e,bias:n})},Px={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},Ox=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,a=`
      ${Cx(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},Ex=(r,e,n)=>{let t={...Px,cacheHint:n.cacheKey};return{...t,get:()=>Ox(r,t,e,n)}},Cx=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},kx=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Bc,Lc,Dc,Dx,Bx,Lx,zx,Rx,Nx,zc=S(()=>{"use strict";Ae();le();Bc=(r,e,n)=>{Nx(e);let t=r.run(Bx(e[0]),e);return[r.run(Rx(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Lc=r=>r.attributes.getFloat("epsilon",1e-5),Dc={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},Dx=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},Bx=r=>({...Dc,get:()=>Dx(Dc,r)}),Lx={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},zx=(r,e,n,t,o)=>{let i=H(r.session.backend.glContext.version),[s,a]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},Rx=(r,e,n,t)=>{let o={...Lx,cacheHint:`${n}`};return{...o,get:()=>zx(r,o,e,n,t)}},Nx=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function Vx(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${a} + ${s} * square_sum, ${u});
    }`;return{...Vc,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function Fx(r,e){return{...Vc,cacheHint:e.cacheKey,get:()=>Vx(r,e)}}var Rc,Nc,Vc,Gx,Fc=S(()=>{"use strict";Fe();le();Rc=(r,e,n)=>(Gx(e),[r.run(Fx(e,n),e)]),Nc=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return ee({alpha:e,beta:n,bias:t,size:o})},Vc={name:"LRN",inputNames:["X"],inputTypes:[0]};Gx=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var Mx,Ui,Gc,Mc,Uc,Ux,Wx,Hx,qx,Kx,jx,Xx,Zx,Wc=S(()=>{"use strict";Fe();me();Ae();le();Mx={name:"Pad",inputNames:["A"],inputTypes:[0]},Ui=(r,e,n)=>(Hx(e),[r.run({...Mx,cacheHint:n.cacheKey,get:()=>Wx(r,e[0],n)},e)]),Gc=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return ee({mode:e,value:n,pads:t})},Mc=(r,e,n)=>{qx(e);let t=Ux(r,e,n);return Ui(r,[e[0]],t)},Uc=r=>r.attributes.getString("mode","constant"),Ux=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return ee({mode:n,pads:t,value:o})},Wx=(r,e,n)=>{let t=G.padShape(e.dims.slice(),n.pads),o=t.length,s=`
      ${Kx(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},Hx=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},qx=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},Kx=(r,e,n)=>{let t=H(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),s=G.computeStrides(e.dims);switch(n.mode){case"constant":return jx(t,e.dims,s,o,i,n.pads,n.value);case"reflect":return Xx(t,e.dims,s,o,i,n.pads);case"edge":return Zx(t,e.dims,s,o,i,n.pads);default:throw new Error("Invalid mode")}},jx=(r,e,n,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${a}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},Xx=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},Zx=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var qc,Kc,jc,Xc,Zc,Jc,Yc,Qc,ef,Jx,Hc,tf,Xn,rf,jn,Yx,nf=S(()=>{"use strict";Fe();me();le();qc=(r,e,n)=>{Xn(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>jc(e,t,!1,n)},e)]},Kc=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),s=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return ee({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:s})},jc=(r,e,n,t)=>{let[o,i]=ef(r,t,n),s=G.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let c=`
        ${rf(r[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:c}},Xc=(r,e,n)=>{Xn(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>jc(e,t,!0,n)},e)]},Zc=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return ee({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Jc=(r,e,n)=>{Xn(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Qc(e,t,!1,n)},e)]},Yc=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),s=r.attributes.getInt("storage_order",0),a=r.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return ee({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},Qc=(r,e,n,t)=>{let[o,i]=ef(r,t,n),s=`
      value = max(_X(x), value);
    `,a="",l=`
      ${rf(r[0].dims,o,s,a,"-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},ef=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();or.adjustPoolAttributes(n,t,i,s,a,u);let l=or.computePoolOutputShape(n,t,s,a,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[c,l]},Jx={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Hc={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},tf=(r,e)=>(Xn(e),[r.run({...Hc,get:()=>Qc(e,Hc,!0,Jx)},e)]),Xn=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},rf=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=r[i-1],f="",d="",m="";if(u+l!==0?f=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${n}
          }`:f=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],b=e.strides[e.strides.length-2],y=e.pads[e.pads.length/2-2],g=e.pads[e.pads.length-2],x=r[i-2];y+g!==0?d=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${b} - ${y} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${x}) {
                pad+= ${s};
                continue;
              }
          `:d=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${b} - ${y} + j;
            `,m=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${d}
          ${f}
          ${m}
          ${t}
          return value;
        }
      `}else{let s=G.size(e.kernelShape),a=G.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,c=Yx(u),f=jn(r,"inputDims"),d=jn(e.pads,"pads"),m=jn(a,"kernelStrides"),p=jn(e.strides,"strides"),h=e.pads.reduce((g,x)=>g+x),b="";return h?b=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:b=`
          }
          ${n}
        `,`
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${d}
          ${f}
          ${p}
          ${m}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${b}
          }
          ${t}

          return value;
        }
      `}},jn=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},Yx=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var fr,jt,Qx,ew,of,af,sf,uf,lf,cf,ff,df=S(()=>{"use strict";Fe();Zr();me();le();fr=(r,e,n,t,o)=>{ew(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>Qx(r,e,n,t,o,i)},e)]},jt=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return ee({axes:e,keepDims:n})},Qx=(r,e,n,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=G.normalizeAxes(n.axes,e[0].dims.length),c=o(e,l),f=c[1];for(let p=0;p<e[0].dims.length;p++)l.indexOf(p)>=0||l.length===0?(n.keepDims&&s.push(1),f=`
          for(int j${p} = 0; j${p} < ${e[0].dims[p]}; j${p}++) {
            inputIdx[${p}] = j${p};
            ${f}
          }`):(u.push(`inputIdx[${p}] = outputIdx[${s.length}];`),s.push(e[0].dims[p]));let m=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${f}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:m}},ew=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(Kt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},of=(r,e,n)=>fr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),af=(r,e,n)=>fr(r,e,n,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),sf=(r,e,n)=>fr(r,e,n,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),uf=(r,e,n)=>fr(r,e,n,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),lf=(r,e,n)=>fr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),cf=(r,e,n)=>fr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),ff=(r,e,n)=>fr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var pf,mf=S(()=>{"use strict";me();pf=(r,e)=>{let n=G.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var hf,Wi,gf,bf,Jr,tw,Hi,Zn,qi=S(()=>{"use strict";Fe();Ae();le();hf={name:"Upsample",inputNames:["X"],inputTypes:[0]},Wi=(r,e,n)=>(Hi(e,n),[r.run({...hf,cacheHint:n.cacheKey,get:()=>tw(r,e,n)},e)]),gf=r=>Jr(r,7),bf=r=>Jr(r,9),Jr=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),Zn(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),s=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=r.attributes.getFloat("cubic_coeff_a",-.75),f=r.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let d=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",m=0,p=0,h=0;return e>10?r.inputs.length>2?(m=1,p=2,h=3):(p=1,h=2):e===9&&(p=1),ee({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:c,excludeOutside:f,useNearest2xOptimization:d,roiInputIdx:m,scalesInputIdx:p,sizesInputIdx:h})},tw=(r,e,n)=>{let t=H(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,b)=>Math.floor(h*n.scales[b])),[a,u]=r.calculateTextureWidthAndHeight(s,0),l=s.length,c=new Array(l),f=new Array(l),d=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let h=l-1;h>=0;h--)c[h]=h===l-1?1:c[h+1]*s[h+1],f[h]=h===l-1?1:f[h+1]*e[0].dims[h+1],d+=`
        output_pitches[${h}] = ${c[h]};
        input_pitches[${h}] = ${f[h]};
        `;let m=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,p=n.mode==="nearest"?`
    ${m}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${m}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${m}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...hf,output:{dims:s,type:e[0].type,textureType:0},shaderSource:p,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(h=>Math.ceil(h))}]}},Hi=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},Zn=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var Ki,ji,yf,xf,rw,nw,ow,iw,wf=S(()=>{"use strict";Ae();le();At();ur();qi();Ki={name:"Resize",inputNames:["A"],inputTypes:[2]},ji=(r,e,n)=>(Hi(e,n),[r.run({...Ki,cacheHint:n.cacheKey,get:()=>rw(r,e,n)},e)]),yf=r=>Jr(r,10),xf=r=>Jr(r,11),rw=(r,e,n)=>{let t=H(r.session.backend.glContext.version),[o,i]=nw(e,n);if(o.every(x=>x===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Ki,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let a=i.length;if(a<2)throw new Error(`output dimension should be at least 2, but got ${a}`);let u=i[a-2],l=i[a-1],c=e[0].dims;if(a!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${a}`);let f=c[a-2],d=c[a-1],m=o[a-2],p=o[a-1],h="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${d}.0 - 1.0, ${f}.0 - 1.0, ${d}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let b=je(a),y=Pt(),g=`
            const vec2 inputWH = vec2(${f}.0, ${d}.0);
            const vec4 scaleWHWH = vec4(float(${m}), float(${p}), float(${m}), float(${p}));
            ${y}
            ${h}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${b} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...Ki,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:g}},nw=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let a=r[e.scalesInputIdx];if(a&&a.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=ow(a,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=iw(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},ow=(r,e,n)=>{let t=Array.from(r.floatData);return Zn(t,e,n),t},iw=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(r[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=r[s]/e[s];return Zn(i,n,t),i}});var vf,aw,Tf=S(()=>{"use strict";sr();vf=(r,e)=>(aw(e),[new Le([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),aw=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var Xi,_f,If,Sf,sw,$f,uw,lw,Af=S(()=>{"use strict";Fe();Zr();me();le();Xi={name:"Slice",inputNames:["A"],inputTypes:[0]},_f=(r,e,n)=>(sw(e),[r.run({...Xi,cacheHint:n.cacheKey,get:()=>Sf(r,e[0],n)},e)]),If=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return ee({starts:e,ends:n,axes:t})},Sf=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((f,d)=>d):n.axes,o=G.normalizeAxes(t,e.dims.length),i=n.starts.map((f,d)=>f>e.dims[o[d]]-1?e.dims[o[d]]:G.normalizeAxis(f,e.dims[o[d]])),s=n.ends.map((f,d)=>f>e.dims[o[d]]-1?e.dims[o[d]]:G.normalizeAxis(f,e.dims[o[d]])),a=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)a[o[f]]=s[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let c=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Xi,output:{dims:a,type:e.type,textureType:0},shaderSource:c}},sw=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(Kt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},$f=(r,e)=>{lw(e);let n=uw(r,e);return[r.run({...Xi,cacheHint:n.cacheKey,get:()=>Sf(r,e[0],n)},[e[0]])]},uw=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},lw=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var Pf,Of,Ef,Cf,kf,Df,Bf,Lf,cw,fw,dw,zf,Rf=S(()=>{"use strict";Fe();me();Ae();le();Kn();Pf={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Of={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Ef={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Cf=(r,e,n)=>{zf(e);let t=e[0].dims.slice(),o=G.normalizeAxis(n.axis,t.length),i=G.sizeToDimension(t,o),s=G.sizeFromDimension(t,o);return Lf(r,e,n,i,s)},kf=r=>ee({axis:r.attributes.getInt("axis",1)}),Df=r=>ee({axis:r.attributes.getInt("axis",-1)}),Bf=(r,e,n)=>{zf(e);let t=e[0].dims.slice(),o=G.normalizeAxis(n.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],c;s&&(u=Array.from({length:i}).map((p,h)=>h),u[o]=i-1,u[i-1]=o,u.map(p=>a.push(t[p])),c=ee({perm:u}),l=cr(r,e,c));let f=s?G.sizeToDimension(a,i-1):G.sizeToDimension(t,i-1),d=s?G.sizeFromDimension(a,i-1):G.sizeFromDimension(t,i-1),m=Lf(r,s?l:e,n,f,d);return s?cr(r,m,c):m},Lf=(r,e,n,t,o)=>{let i=cw(r,e[0],t,o,[t]),s=r.run({...Pf,cacheHint:n.cacheKey,get:()=>i},e),a=fw(r,e[0],t,o,i.output.dims,[t]),u=r.run({...Of,cacheHint:n.cacheKey,get:()=>a},[e[0],s]),l=dw(r,e[0],t,o,i.output.dims,a.output.dims);return[r.run({...Ef,cacheHint:n.cacheKey,get:()=>l},[e[0],s,u])]},cw=(r,e,n,t,o)=>{let[i,s]=r.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=H(r.session.backend.glContext.version),l=`
      float process(int[${a}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${s} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Pf,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},fw=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=H(r.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a}))) - max);
        }

        return norm_factor;
      }`;return{...Of,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},dw=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${a});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Ef,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},zf=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Nf,Vf,Ff,pw,mw,hw,Gf=S(()=>{"use strict";Fe();me();le();Nf={name:"Split",inputNames:["A"],inputTypes:[0]},Vf=(r,e,n)=>{hw(e);let t=G.normalizeAxis(n.axis,e[0].dims.length),o=pw(r,e,t,n),i=[];for(let s=0;s<o;++s)i.push(r.run({...Nf,cacheHint:`${n.cacheKey};${s}`,get:()=>mw(r,e[0],n,t,s)},e));return i},Ff=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return ee({axis:e,split:n,numOutputs:t})},pw=(r,e,n,t)=>{let[,o]=Wr.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},mw=(r,e,n,t,o)=>{let[i,s]=Wr.splitShape(e.dims,t,n.split,n.numOutputs),a=s[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...Nf,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},hw=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var Zi,Mf,Uf,gw,bw,Wf=S(()=>{"use strict";me();Zi=(r,e,n)=>{gw(e);let t=G.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Mf=(r,e)=>(bw(e),Zi(r,[e[0]],Array.from(e[1].integerData))),Uf=r=>r.attributes.getInts("axes"),gw=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},bw=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Hf,yw,xw,qf=S(()=>{"use strict";Ae();le();Hf=(r,e)=>{xw(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>yw(r,e,n)},e)]},yw=(r,e,n)=>{let t=H(r.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},xw=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Kf,ww,vw,jf=S(()=>{"use strict";Zr();le();Kf=(r,e)=>{vw(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>ww(r,e,n)},e)]},ww=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},vw=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(Kt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var Ji,Xf,Zf,Tw,_w,Jf=S(()=>{"use strict";me();Ji=(r,e,n)=>{Tw(e);let t=G.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Xf=(r,e)=>(_w(e),Ji(r,[e[0]],Array.from(e[1].integerData))),Zf=r=>r.attributes.getInts("axes"),Tw=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},_w=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Yf,Qf=S(()=>{"use strict";ul();vl();Il();El();Wn();pc();xc();Tc();Sc();Oc();kc();zc();Fc();Hn();Wc();nf();df();mf();wf();Tf();Af();Rf();Gf();Wf();qf();jf();Kn();Bi();Jf();qi();Yf=[["Abs","","6+",Cl],["Acos","","7+",kl],["Add","","7+",ll],["And","","7+",cl],["Asin","","7+",Dl],["Atan","","7+",Bl],["AveragePool","","7+",qc,Kc],["BatchNormalization","","7+",al,sl],["Cast","","6+",Tl,_l],["Ceil","","6+",Rl],["Clip","","6-10",ki,Ll],["Clip","","11+",zl],["Concat","","4+",Al,Ol],["Conv","","1+",Fi,Gi],["ConvTranspose","","1+",fc,dc],["Cos","","7+",Nl],["Div","","7+",fl],["Dropout","","7+",Di],["DepthToSpace","","1+",bc,yc],["Equal","","7+",dl],["Elu","","6+",Vl,Fl],["Exp","","6+",Gl],["Flatten","","1+",wc,vc],["Floor","","6+",Ml],["FusedConv","com.microsoft","1+",Fi,Gi],["Gather","","1+",_c,Ic],["Gemm","","7-10",Mi,Ac],["Gemm","","11+",Mi,Pc],["GlobalAveragePool","","1+",Xc,Zc],["GlobalMaxPool","","1+",tf],["Greater","","7+",pl],["Identity","","1+",Di],["ImageScaler","","1+",Ec,Cc],["InstanceNormalization","","6+",Bc,Lc],["LeakyRelu","","6+",Ul,Wl],["Less","","7+",ml],["LRN","","1+",Rc,Nc],["Log","","6+",Hl],["MatMul","","1+",oc,ic],["MaxPool","","1+",Jc,Yc],["Mul","","7+",hl],["Neg","","6+",ql],["Not","","1+",Kl],["Or","","7+",gl],["Pad","","2-10",Ui,Gc],["Pad","","11+",Mc,Uc],["Pow","","7+",bl],["PRelu","","7+",yl],["ReduceLogSum","","1+",cf,jt],["ReduceMax","","1+",sf,jt],["ReduceMean","","1+",af,jt],["ReduceMin","","1+",uf,jt],["ReduceProd","","1+",lf,jt],["ReduceSum","","1-12",of,jt],["ReduceSumSquare","","1+",ff,jt],["Relu","","6+",jl],["Reshape","","5+",pf],["Resize","","10",ji,yf],["Resize","","11+",ji,xf],["Shape","","1+",vf],["Sigmoid","","6+",Xl],["Sin","","7+",Zl],["Slice","","10+",$f],["Slice","","1-9",_f,If],["Softmax","","1-12",Cf,kf],["Softmax","","13+",Bf,Df],["Split","","2-12",Vf,Ff],["Sqrt","","6+",Jl],["Squeeze","","1-12",Zi,Uf],["Squeeze","","13+",Mf],["Sub","","7+",xl],["Sum","","6+",Hf],["Tan","","7+",Yl],["Tanh","","6+",Ql],["Tile","","6+",Kf],["Transpose","","1+",cr,hc],["Upsample","","7-8",Wi,gf],["Upsample","","9",Wi,bf],["Unsqueeze","","1-12",Ji,Zf],["Unsqueeze","","13+",Xf],["Xor","","7+",wl]]});function td(r){let e={},n;for(;(n=ed.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=Iw.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let s=n[1],a=n[2],u=n[3].split(","),l=s?`${s} ${a};`:"",c=e[t].body,f="";e[t].params.forEach((m,p)=>{m&&(f+=`${m.type} ${m.name} = ${u[p]};
`)}),c=`${f}
 ${c}`,c=c.replace("return",`${a} = `);let d=`
      ${l}
      {
        ${c}
      }
      `;r=r.replace(n[0],d)}}return r=r.replace(ed,""),r}var ed,Iw,rd=S(()=>{"use strict";ed=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,Iw="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Cr(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:Sw(e,r).sort(),s=0;for(let a=0;a<r.length;++a){if(i!=null){if(i[s]===a&&r[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${r[a]}' is not 1`);(i[s]==null||i[s]>a)&&r[a]===1&&(n.push(r[a]),t.push(a)),i[s]<=a&&s++}r[a]!==1&&(n.push(r[a]),t.push(a))}return{newShape:n,keptDims:t}}function Sw(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),Sr(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),Sr(r.every($w),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function $w(r){return r%1===0}function Aw(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function nd(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var Jn,Yi=S(()=>{"use strict";ut();me();Jn=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let a=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,c)=>l*c),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,c)=>l*c);if(a>o||u>o)ge.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=Cr(i).newShape);let s=Aw(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?nd(s/4).map(a=>a*2):nd(s)}}});var Yn,od=S(()=>{"use strict";me();Vt();Ae();Yi();At();Yn=class extends dt{constructor(n){super(n)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let n="offsetToCoords";return{offsetToCoords:new V(`
      vec2 ${n}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let n="coordsToOffset";return{coordsToOffset:new V(`
      int ${n}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let n=this.context.outputTextureLayout;return n.isPacked?this.getPackedOutputSamplingSnippet(n):this.getUnpackedOutputSamplingSnippet(n)}getPackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputPacked1DCoords(t,o);break;case 2:i[s]=this.getOutputPacked2DCoords(t,o);break;case 3:i[s]=this.getOutputPacked3DCoords(t,o);break;default:i[s]=this.getOutputPackedNDCoords(t,o)}let u=`
      void setOutput(vec4 val) {
        ${H(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new V(u),i}getUnpackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[s]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[s]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[s]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[s]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[s]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${H(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return i[l]=new V(u),i}getOutputScalarCoords(){return new V(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(n,t){let o=t,i="";return o[0]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${o[1]}.0);
          }
        `,new V(i)):o[1]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${o[0]}.0);
          }
        `,new V(i)):(i=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${o[0]}, ${o[1]}));
          return 2 * (resTexRC.y * ${o[0]} + resTexRC.x);
        }
      `,new V(i))}getOutputPacked2DCoords(n,t){let o="";if(nr.arraysEqual(n,t))return o=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new V(o);let i=t,s=Math.ceil(n[1]/2);return o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new V(o)}getOutputPacked3DCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[2]/2),s=i*Math.ceil(n[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));
          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          int b = index / ${s};
          index -= b * ${s};

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec3(b, r, c);
        }
      `;return new V(a)}getOutputPackedNDCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[n.length-1]/2),s=i*Math.ceil(n[n.length-2]/2),a=s,u="",l="b, r, c";for(let f=2;f<n.length-1;f++)a*=n[n.length-f-1],u=`
      int b${f} = index / ${a};
      index -= b${f} * ${a};
    `+u,l=`b${f}, `+l;let c=`
      ivec${n.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${o[0]}, ${o[1]}));
        int index = resTexRC.y * ${o[0]} + resTexRC.x;

        ${u}

        int b = index / ${s};
        index -= b * ${s};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${n.length}(${l});
      }
    `;return new V(c)}getOutputUnpacked1DCoords(n,t){let o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new V(o)}getOutputUnpacked2DCoords(n,t){let o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${n[1]};
          int c = index - r * ${n[1]};
          return ivec2(r, c);
        }
      `;return new V(o)}getOutputUnpacked3DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d"],u=s.map((l,c)=>{let f=`int ${a[c]} = index / ${l}`,d=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${f}; ${d};`}).join("");return o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new V(o)}getOutputUnpacked4DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2"],u=s.map((l,c)=>{let f=`int ${a[c]} = index / ${l}`,d=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${f}; ${d};`}).join("");return o=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new V(o)}getOutputUnpacked5DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3"],u=s.map((l,c)=>{let f=`int ${a[c]} = index / ${l}`,d=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${f}; ${d};`}).join("");return o=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new V(o)}getOutputUnpacked6DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3","d4"],u=s.map((l,c)=>{let f=`int ${a[c]} = index / ${l}`,d=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${f}; ${d};`}).join("");return o=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new V(o)}getCommonUtilFuncs(){let n={},t="uvFromFlat";n[t]=new V(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",n[t]=new V(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",n[t]=new V(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",n[t]=new V(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let o=H(this.context.glContext.version);return n[t]=new V(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),n}getInputsSamplingSnippets(){let n={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let s=this.context.inputTextureLayouts[i],a=Rn(o);s.isPacked?n[a]=this.getPackedSamplerFromInput(a,o,s):n[a]=this.getUnpackedSamplerFromInput(a,o,s);let u=Wu(o);s.unpackedShape.length<=t.unpackedShape.length&&(s.isPacked?n[u]=this.getPackedSamplerAtOutputCoords(u,s,t,o):n[u]=this.getUnpackedSamplerAtOutputCoords(u,s,t,o))}),n}getPackedSamplerAtOutputCoords(n,t,o,i){let s=t.unpackedShape,a=o.unpackedShape,l=Rn(i),c=s.length,f=a.length,d=Ke.getBroadcastDims(s,a),m=je(f),p=f-c,h,b=It();c===0?h="":f<2&&d.length>=1?h="coords = 0;":h=d.map(z=>`coords.${b[z+p]} = 0;`).join(`
`);let y="";f<2&&c>0?y="coords":y=s.map((z,N)=>`coords.${b[N+p]}`).join(", ");let g="return outputValue;",v=G.size(s)===1,I=G.size(a)===1;if(c===1&&!v&&!I)g=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(v&&!I)f===1?g=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:g=`
          return vec4(outputValue.x);
        `;else if(d.length){let z=c-2,N=c-1;d.indexOf(z)>-1&&d.indexOf(N)>-1?g="return vec4(outputValue.x);":d.indexOf(z)>-1?g="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":d.indexOf(N)>-1&&(g="return vec4(outputValue.xx, outputValue.zz);")}let O=`
        int lastDim = coords.${b[f-1]};
        coords.${b[f-1]} = coords.${b[f-2]};
        coords.${b[f-2]} = lastDim;
      `,E=`
      vec4 ${n}() {
        ${m} coords = getOutputCoords();
        ${O}
        ${h}
        vec4 outputValue = ${l}(${y});
        ${g}
      }
    `;return new V(E,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(n,t,o,i){let s=[o.width,o.height],a=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,c=t.unpackedShape,f=o.unpackedShape,d=Rn(i);if(u===l&&nr.arraysEqual(a,s)){let v=`
          float ${n}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new V(v,["coordinates.sampleTexture"])}let m=je(l),p=Ke.getBroadcastDims(c,f),h=l-u,b,y=It();u===0?b="":l<2&&p.length>=1?b="coords = 0;":b=p.map(v=>`coords.${y[v+h]} = 0;`).join(`
`);let g="";l<2&&u>0?g="coords":g=t.unpackedShape.map((v,_)=>`coords.${y[_+h]}`).join(", ");let x=`
        float ${n}() {
          ${m} coords = getOutputCoords();
          ${b}
          return ${d}(${g});
        }
      `;return new V(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(n,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(n,t);case 1:return this.getPackedSampler1D(n,t,o);case 2:return this.getPackedSampler2D(n,t,o);case 3:return this.getPackedSampler3D(n,t,o);default:return this.getPackedSamplerND(n,t,o)}}getUnpackedSamplerFromInput(n,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(n,t,o);case 1:return this.getUnpackedSampler1D(n,t,o);case 2:return this.getUnpackedSampler2D(n,t,o);case 3:return this.getUnpackedSampler3D(n,t,o);case 4:return this.getUnpackedSampler4D(n,t,o);case 5:return this.getUnpackedSampler5D(n,t,o);case 6:return this.getUnpackedSampler6D(n,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(n,t){let o=H(this.context.glContext.version),i=`
          vec4 ${n}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new V(i)}getPackedSampler1D(n,t,o){let i=[o.width,o.height],s=[i[1],i[0]],a=H(this.context.glContext.version),l=`vec4 ${n}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new V(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=H(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&nr.arraysEqual(i,s)){let p=`vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new V(p)}let c=s,f=Math.ceil(i[1]/2),m=`vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${f}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new V(m,["coordinates.packedUVfrom2D"])}getPackedSampler3D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=[s[0],s[1]],u=H(this.context.glContext.version);if(i[0]===1){let h=i.slice(1),b=[1,2],y=$r(i,h),g=["b","row","col"],x=JSON.parse(JSON.stringify(o));x.unpackedShape=y;let v=this.getPackedSamplerFromInput(n,t,x),I=`${v.routineBody}
      vec4 ${n}(int b, int row, int col) {
        return ${n}(${Ar(g,b)});
      } `;return new V(I,v.dependencies)}let l=a[0],c=a[1],f=Math.ceil(i[2]/2),d=f*Math.ceil(i[1]/2),p=`vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${d}, ${f}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new V(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(n,t,o){let i=o.unpackedShape,s=i.length,a=[o.width,o.height],u=H(this.context.glContext.version),l=[a[0],a[1]],c=l[1],f=l[0],d=Math.ceil(i[s-1]/2),m=d*Math.ceil(i[s-2]/2),p="int b, int row, int col",h=`b * ${m} + (row / 2) * ${d} + (col / 2)`;for(let g=2;g<s-1;g++)p=`int b${g}, `+p,m*=i[s-g-1],h=`b${g} * ${m} + `+h;let y=`vec4 ${n}(${p}) {
      int index = ${h};
      int texR = index / ${f};
      int texC = index - texR * ${f};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${f}, ${c});
      return ${u.texture2D}(${t}, uv);
    }`;return new V(y)}getUnpackedSamplerScalar(n,t,o){let[i,s]=[o.width,o.height];if(i===1&&s===1){let u=`
          float ${n}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new V(u,["coordinates.sampleTexture"])}let a=`
        float ${n}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${s});
          vec2 uv = uvFromFlat(${i}, ${s}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new V(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(n,t,o){let i=o.width,s=o.height;if(s===1&&i===1){let u=`
        float ${n}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new V(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new V(u,["coordinates.sampleTexture"])}if(i===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new V(u,["coordinates.sampleTexture"])}let a=`
        float ${n}(int index) {
          vec2 uv = uvFromFlat(${i}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new V(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.height,o.width];if(s!=null&&nr.arraysEqual(i,s)){let m=s[1],p=s[0],h=`
          float ${n}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${m}.0, ${p}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new V(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:u}=Cr(i),l=a;if(l.length<i.length){let m=$r(i,l),p=JSON.parse(JSON.stringify(o));p.unpackedShape=m;let h=["col","row"],b=`
          ${this.getUnpackedSamplerFromInput(n,t,p).routineBody}
          float ${n}(int row, int col) {
            return ${n}(${Ar(h,u)});
          }
        `;return new V(b,["coordinates.sampleTexture"])}let c=s[1],f=s[0];if(f===1){let m=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new V(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let m=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${f}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new V(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let d=`
        float ${n}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${f}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new V(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(n,t,o){let i=o.unpackedShape,s=i[1]*i[2],a=i[2],{newShape:u,keptDims:l}=Cr(i),c=u;if(c.length<i.length){let p=$r(i,c),h=["batch","col","row"],b=JSON.parse(JSON.stringify(o));b.unpackedShape=p;let y=this.getUnpackedSamplerFromInput(n,t,b),g=l.reverse(),x=`
          ${y.routineBody}
          float ${n}(int batch, int row, int col) {
            return ${n}(${Ar(h,g)});
          }
        `;return new V(x,y.dependencies)}let f=o.width,d=o.height,m=`
          float ${n}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${a} + row;
            vec2 uv = uvFromFlat(${f}, ${d}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new V(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(n,t,o){let i=o.unpackedShape,s=i[3],a=i[2]*s,u=i[1]*a,l=o.width,c=o.height,f=`
        float ${n}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${a} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new V(f,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(n,t,o){let i=o.unpackedShape,s=i[4],a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:c,keptDims:f}=Cr(i);if(c.length<i.length){let h=$r(i,c),b=["row","col","depth","depth2","depth3"],y=JSON.parse(JSON.stringify(o));y.unpackedShape=h;let g=`
          ${this.getUnpackedSamplerFromInput(n,t,y).routineBody}
          float ${n}(int row, int col, int depth, int depth2, int depth3) {
            return ${n}(${Ar(b,f)});
          }
        `;return new V(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=o.width,m=o.height,p=`
        float ${n}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${a} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${d}, ${m}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new V(p,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(n,t,o){let i=o.unpackedShape,s=i[5],a=i[4]*s,u=i[3]*a,l=i[2]*u,c=i[1]*l,{newShape:f,keptDims:d}=Cr(i);if(f.length<i.length){let b=$r(i,f),y=["row","col","depth","depth2","depth3","depth4"],g=JSON.parse(JSON.stringify(o));g.unpackedShape=b;let x=`
            ${this.getUnpackedSamplerFromInput(n,t,g).routineBody}
            float ${n}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${n}(${Ar(y,d)});
            }
          `;return new V(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let m=o.width,p=o.height,h=`
          float ${n}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${l} + depth * ${u} +
            depth2 * ${a} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${m}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new V(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let n=this.context.outputTextureLayout,t=n.shape.length,o=n.strides,i=n.width,s=n.height,a=[];for(let l=0;l<t-1;++l)a.push(`
        c[${l}] = offset / ${o[l]};`),a.push(`
        offset -= c[${l}] * ${o[l]};`);a.push(`
        c[${t-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${s});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${a.join("")}
      }
    `;return{toVec:new V(u,["coordinates.coordsToOffset"])}}valueFrom(){let n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;n[u]=new V(this.getValueFromSingle(t,a,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",n[u]=new V(this.getValueFromSingle(t,a,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),n}getValueFromSingle(n,t,o,i,s){let a=`_${n}`;s&&(a=a+"_T");let u=H(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${n}, coords));
          return value;
        }
        `}getPackedValueFrom(n,t,o,i,s){let a=`_${n}_Pack`;s&&(a=a+"_T");let u=H(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${n}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${n}, coords);
        }
        `}}});var Qn,id=S(()=>{"use strict";Vt();Qn=class r extends dt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new V(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new V(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new V(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new V(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var eo,ad=S(()=>{"use strict";Vt();Ae();eo=class extends dt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=H(this.context.glContext.version);return{setFragColor:new V(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new V(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var to,sd=S(()=>{"use strict";Vt();to=class r extends dt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let f=0;f<s;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${a+f}]), ${i[f]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
        }
        `;n[u]=new V(c)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let s=i.length,a=e-s,u=`bcastMatmulIndices_${t}`,l="";for(let f=0;f<s-2;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${a+f}]), ${i[f]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${e-1}];
          realIndices[${s-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new V(c)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`indicesToOffset_${n}`;e[a]=new V(r.indexToOffsetSingle(a,s,i)),a=`indicesToOffset_${n}_T`,e[a]=new V(r.indexToOffsetSingle(a,s,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`offsetToIndices_${n}`;e[a]=new V(r.offsetToIndicesSingle(a,s,i)),a=`offsetToIndices_${n}_T`,e[a]=new V(r.offsetToIndicesSingle(a,s,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,s=`incrementIndices_${n}`,a="";for(let l=0;l<i;++l)a+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${s}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${a};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[s]=new V(u)}),e}}});var ro,ud=S(()=>{"use strict";Vt();ro=class extends dt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<n;++l)a+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${s}(int src[${n}], out int dest[${n}]) {
          ${a}
        }
        `;o[s]=new V(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new V(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${n} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${n-1}] = value;
        `;let o=`
      void setVecItem(out int m[${n}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new V(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${n} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${n-1}];
        `;let o=`
      int getVecItem(int m[${n}], int index) {
        ${t}
      }
    `;return{getVecItem:new V(o)}}}});var Qi,ld=S(()=>{"use strict";od();id();ad();sd();ud();Qi={encoding:Qn,fragcolor:eo,vec:ro,shapeUtils:to,coordinates:Yn}});var no,cd=S(()=>{"use strict";Vt();rd();ld();Ae();no=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Gn(e,n,t,o),Object.keys(Qi).forEach(s=>{let a=new Qi[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let c=s+"."+l,f;i[c]?(f=i[c],f.routineBody=u[l].routineBody):(f=new Xr(c,u[l].routineBody),i[c]=f);let d=u[l].dependencies;if(d)for(let m=0;m<d.length;++m)if(i[d[m]])f.addDependency(i[d[m]]);else{let p=new Xr(d[m]);i[d[m]]=p,f.addDependency(p)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Uu(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=td(n),`${Mu(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),Mn.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var oo,fd=S(()=>{"use strict";Ue();ut();cd();Ae();oo=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(s){throw ge.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new no(this.glContext,e,n,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){ge.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Gu(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}j.debug&&ge.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;ge.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let c=n.find(f=>f.name===s)?.data;if(a!=="sampler2D"&&!c)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var io,dd=S(()=>{"use strict";ut();Kr();io=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let a=n.width,u=n.height,l,c;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let d=this.idleTextures.get(l);if(d&&d.length>0){let m=d.pop();return c.push(m),o===1&&this.glContext.updateTexture(m,a,u,s,this.toTextureData(e,t)),m}}ge.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let f=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(f),this.textureLookup.set(f,l)),f}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),a=this.toTensorData(n,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||n)&&(ge.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ao,pd=S(()=>{"use strict";ut();As();ol();Qf();fd();Yi();dd();ao=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new Jn(e.glContext.maxTextureSize),this.programManager=new oo(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new io(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Fn(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){ge.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=$s(e,n,Yf);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function Pw(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Yr,md=S(()=>{"use strict";Ue();Kr();Kr();At();Yr=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,n,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,n*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,s),l=u.allocate(n*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,n,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(j.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Nn(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new qr(this.gl,n):new qr(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Vn(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,s;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await Ii(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=Pw(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await Ii(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function ea(r){let e;if((!r||r==="webgl2")&&"webgl2"in kr?e=kr.webgl2:(!r||r==="webgl")&&"webgl"in kr&&(e=kr.webgl),!e)try{let t=Ew();e=hd(t,r)}catch{let o=Ow();e=hd(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return kr[r]=e,n.isContextLost()?(delete kr[r],ea(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function hd(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Yr(t,2)}catch(i){ge.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Yr(t,1)}catch(i){ge.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function Ow(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function Ew(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var kr,gd=S(()=>{"use strict";ut();md();kr={}});var so,bd=S(()=>{"use strict";Ue();ut();pd();gd();so=class{get contextId(){return j.webgl.contextId}set contextId(e){j.webgl.contextId=e}get matmulMaxBatchSize(){return j.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){j.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return j.webgl.textureCacheMode}set textureCacheMode(e){j.webgl.textureCacheMode=e}get pack(){return j.webgl.pack}set pack(e){j.webgl.pack=e}get async(){return j.webgl.async}set async(e){j.webgl.async=e}initialize(){try{return this.glContext=ea(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ge.setWithEnv(j),j.webgl.context||Object.defineProperty(j.webgl,"context",{value:this.glContext.gl}),ge.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ge.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ao(this,e)}dispose(){this.glContext.dispose()}}});async function ta(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=yd.get(n);if(t)return t;let o=await kw(n);if(o)return o}}else return ta(["webgl"]);throw new Error("no available backend to use")}async function kw(r){let e=Cw;if(typeof e[r]<"u"&&Dw(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return yd.set(r,n),n}}function Dw(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var yd,Cw,xd=S(()=>{"use strict";bd();yd=new Map,Cw={webgl:new so}});var ra,uo,wd=S(()=>{"use strict";ut();ra=class{constructor(e,n){this.op=e;this.node=n}},uo=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new ra(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((c,f)=>{let d=o[f];this._values[d]=c});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],f=this._ops[c],d=f.node.inputs.map(b=>this._values[b]);if(d.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let m=d;ge.verbose("ExecPlan",`Running op:${f.node.name} (${m.map((b,y)=>`'${f.node.inputs[y]}': ${b.type}[${b.dims.join(",")}]`).join(", ")})`);let p=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,m,f.op.context));if(p.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");p.forEach((b,y)=>{let g=f.node.outputs[y];if(this._values[g])throw new Error(`output [${g}] already has value: op:${f.node.name}`);this._values[g]=b});let h=new Set;p.forEach((b,y)=>{let g=f.node.outputs[y];for(let x of s[g].to){let v=a[x],_=!0;for(let I of v.inputs)if(!this._values[I]){_=!1;break}_&&h.add(x)}}),i.push(...h)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let f=this.graph.getOutputIndices()[c],d=this._values[f];if(d===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await d.getData():d.data,l.push(d)}return ge.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var oe,ht,Qr,vd=S(()=>{"use strict";Fr();oe=wr(Ir());sr();me();ht=M.experimental.fbs,Qr=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof oe.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof ht.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof oe.onnx.AttributeProto?e.type:e.type();switch(n){case oe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case oe.onnx.AttributeProto.AttributeType.INT:return"int";case oe.onnx.AttributeProto.AttributeType.STRING:return"string";case oe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case oe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case oe.onnx.AttributeProto.AttributeType.INTS:return"ints";case oe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case oe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${oe.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof oe.onnx.AttributeProto?e.type:e.type();if(n===oe.onnx.AttributeProto.AttributeType.GRAPH||n===oe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===oe.onnx.AttributeProto.AttributeType.INT&&Qe.isLong(t))return Qe.longToNumber(t);if(n===oe.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=Qe.longToNumber(a)}return i}if(n===oe.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof oe.onnx.AttributeProto?Le.fromProto(t):Le.fromOrtTensor(t);if(n===oe.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof oe.onnx.AttributeProto)return t.map(i=>Le.fromProto(i));if(e instanceof ht.Attribute)return t.map(i=>Le.fromOrtTensor(i))}return n===oe.onnx.AttributeProto.AttributeType.STRING&&e instanceof oe.onnx.AttributeProto?Hr(t):n===oe.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof oe.onnx.AttributeProto?t.map(Hr):t}static getValueNoCheck(e){return e instanceof oe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case oe.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case oe.onnx.AttributeProto.AttributeType.INT:return e.i;case oe.onnx.AttributeProto.AttributeType.STRING:return e.s;case oe.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case oe.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case oe.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case oe.onnx.AttributeProto.AttributeType.INTS:return e.ints;case oe.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case oe.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case oe.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${oe.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case ht.AttributeType.FLOAT:return e.f();case ht.AttributeType.INT:return e.i();case ht.AttributeType.STRING:return e.s();case ht.AttributeType.TENSOR:return e.t();case ht.AttributeType.GRAPH:return e.g();case ht.AttributeType.FLOATS:return e.floatsArray();case ht.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case ht.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case ht.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${ht.AttributeType[e.type()]}`)}}}});var oa,lo,ia,Et,co,na,Td=S(()=>{"use strict";vd();Fr();oa=wr(Ir());sr();me();lo=M.experimental.fbs,ia={from:(r,e)=>new na(r,e)},Et=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=Me.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},co=class{constructor(e,n){e instanceof oa.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Qr(e.attribute)):e instanceof lo.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Qr(Me.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},na=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof oa.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof lo.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new Et(i))-1;n.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=n.get(i.name);if(s===void 0){let a=new Et;a.type={shape:{dims:Me.tensorDimsFromProto(i.dims)},tensorType:Me.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,n.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=Le.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new Et(i))-1;n.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new co(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new Et)-1,n.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=Le.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(n.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new Et;if(e.nodeArgs(a)?.type()?.valueType()!==lo.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(a).type().value(new lo.TensorTypeAndShape),f=Me.tensorDataTypeFromProto(c.elemType()),d=c.shape(),m=[];for(let h=0;h<d.dimLength();h++)m.push(Qe.longToNumber(d.dim(h).value().dimValue()));u.type={shape:{dims:m},tensorType:f};let p=this._allData.push(u)-1;n.set(s,p),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=n.get(s.name());if(a===void 0){let u=new Et,l=Me.tensorDimsFromORTFormat(s),c=Me.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:c},a=this._allData.push(u)-1,n.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=Le.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(n.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new Et)-1;n.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new co(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),c=n.get(l);if(typeof c>"u"&&(c=this._allData.push(new Et)-1,n.set(l,c)),s.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=Le.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),c=n.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&n.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=n[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let a=1;a<n.outputs.length;a++)if(this._allData[n.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let a=0;a<n.inputs.length;a++){let u=this._allData[n.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[ir,ar])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var _d,Bw,fo,Id=S(()=>{"use strict";Cn();Td();Fr();_d=wr(Ir());me();Bw=M.experimental.fbs,fo=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=_d.onnx.ModelProto.decode(e);if(Qe.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:Qe.longToNumber(i.version)})),this._graph=ia.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new $.ByteBuffer(e),o=Bw.InferenceSession.getRootAsInferenceSession(t).model();if(Qe.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:Qe.longToNumber(a.version())})}this._graph=ia.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var po,Sd=S(()=>{"use strict";xd();wd();ut();Id();po=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=On.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await ta(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new fo,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new uo(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let s=e.get(n[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],s=n[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var mo,$d=S(()=>{"use strict";Ue();sr();mo=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new Le(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new Ne(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Ad={};Rr(Ad,{onnxjsBackend:()=>Lw});var aa,Lw,Pd=S(()=>{"use strict";Sd();$d();aa=class{async init(){}async createInferenceSessionHandler(e,n){let t=new po(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new mo(t)}},Lw=new aa});var ho=S(()=>{"use strict"});var Cd={};Rr(Cd,{default:()=>zw});var Od,Ed,zw,kd=S(()=>{"use strict";sa();dr();en();Od="ort-wasm-proxy-worker",Ed=globalThis.self?.name===Od;Ed&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":go(n.wasm).then(()=>{bo(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;yo(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=tn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;xo(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":wo(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;vo(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},_o([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":To(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});zw=Ed?null:r=>new Worker(r??gt,{type:"module",name:Od})});var gt,Rw,Bd,Nw,Vw,Ld,Fw,Dd,zd,Rd,en=S(()=>{"use strict";ho();gt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Rw=!1||typeof location>"u"?void 0:location.origin,Bd=(r,e)=>{try{let n=e??gt;return(n?new URL(r,n):new URL(r)).origin===Rw}catch{return!1}},Nw=(r,e)=>{let n=e??gt;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},Vw=(r,e)=>`${e??"./"}${r}`,Ld=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Fw=async r=>(await import(/*webpackIgnore:true*/r)).default,Dd=(kd(),gn(Cd)).default,zd=async()=>{if(!gt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Bd(gt))return[void 0,Dd()];let r=await Ld(gt);return[r,Dd(r)]},Rd=async(r,e,n)=>{{let t="ort-wasm-simd-threaded.jsep.mjs",o=r??Nw(t,e),i=!!1&&n&&o&&!Bd(o,e),s=i?await Ld(o):o??Vw(t,e);return[i?s:void 0,await Fw(s)]}}});var ua,la,Io,Nd,Gw,Mw,go,ke,dr=S(()=>{"use strict";en();la=!1,Io=!1,Nd=!1,Gw=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Mw=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},go=async r=>{if(la)return Promise.resolve();if(Io)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Nd)throw new Error("previous call to 'initializeWebAssembly()' failed.");Io=!0;let e=r.initTimeout,n=r.numThreads;if(!Mw())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=Gw();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,c=r.wasmBinary,[f,d]=await Rd(a,i,n>1),m=!1,p=[];if(e>0&&p.push(new Promise(h=>{setTimeout(()=>{m=!0,h()},e)})),p.push(new Promise((h,b)=>{let y={numThreads:n};c?y.wasmBinary=c:(l||i)&&(y.locateFile=(g,x)=>l??(i??x)+g),d(y).then(g=>{Io=!1,la=!0,ua=g,h(),f&&URL.revokeObjectURL(f)},g=>{Io=!1,Nd=!0,b(g)})})),await Promise.race(p),m)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},ke=()=>{if(la&&ua)return ua;throw new Error("WebAssembly is not initialized yet.")}});var ze,rn,$e,So=S(()=>{"use strict";dr();ze=(r,e)=>{let n=ke(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},rn=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")rn(i,s+".",n,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},$e=r=>{let e=ke(),n=e.stackSave();try{let t=e.stackAlloc(8);e._OrtGetLastError(t,t+4);let o=e.HEAP32[t/4],i=e.HEAPU32[t/4+1],s=i?e.UTF8ToString(i):"";throw new Error(`${r} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var Vd,Fd=S(()=>{"use strict";dr();So();Vd=r=>{let e=ke(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=ze(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&$e("Can't create run options."),r?.extra!==void 0&&rn(r.extra,"",new WeakSet,(s,a)=>{let u=ze(s,t),l=ze(a,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&$e(`Can't set a run config entry: ${s} - ${a}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(s=>e._free(s)),i}}});var Uw,Ww,Hw,qw,Gd,Md=S(()=>{"use strict";dr();So();Uw=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},Ww=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},Hw=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},qw=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=ze("deviceType",n),l=ze(a,n);ke()._OrtAddSessionConfigEntry(r,u,l)!==0&&$e(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=ze("preferredLayout",n),u=ze(s.preferredLayout,n);ke()._OrtAddSessionConfigEntry(r,a,u)!==0&&$e(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ze(o,n);ke()._OrtAppendExecutionProvider(r,i)!==0&&$e(`Can't append execution provider: ${o}.`)}},Gd=r=>{let e=ke(),n=0,t=[],o=r||{};Hw(o);try{let i=Uw(o.graphOptimizationLevel??"all"),s=Ww(o.executionMode??"sequential"),a=typeof o.logId=="string"?ze(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?ze(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,c),n===0&&$e("Can't create session options."),o.executionProviders&&qw(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let f=ze("enableGraphCapture",t),d=ze(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,f,d)!==0&&$e(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[f,d]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof d!="number"||!Number.isInteger(d)||d<0)throw new Error(`free dimension override value must be a non-negative integer: ${d}`);let m=ze(f,t);e._OrtAddFreeDimensionOverride(n,m,d)!==0&&$e(`Can't set a free dimension override: ${f} - ${d}.`)}return o.extra!==void 0&&rn(o.extra,"",new WeakSet,(f,d)=>{let m=ze(f,t),p=ze(d,t);e._OrtAddSessionConfigEntry(n,m,p)!==0&&$e(`Can't set a session config entry: ${f} - ${d}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n),t.forEach(s=>e._free(s)),i}}});var ca,Xt,nn,$o,on,Ao,fa,q=S(()=>{"use strict";ca=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Xt=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},nn=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},$o=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},on=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Ao=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",fa=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${r}`)}}});var an,da=S(()=>{"use strict";ho();an=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=Jo("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Jo("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var Kw,jw,Ud,Wd,Hd,Xw,ye,Ft=S(()=>{"use strict";q();Kw=["V","I","W","E","F"],jw=(r,e)=>{console.log(`[${Kw[r]},${new Date().toISOString()}]${e}`)},Hd=(r,e)=>{Ud=r,Wd=e},Xw=(r,e)=>{let n=on(r),t=on(Ud);n>=t&&jw(n,typeof e=="function"?e():e)},ye=(...r)=>{Wd&&Xw(...r)}});var qd,Kd=S(()=>{"use strict";q();qd=(r,e)=>new($o(e))(r)});var Po=S(()=>{"use strict"});var jd,pa,ma,Zw,Jw,Xd,ga,ha,Jd,Yd=S(()=>{"use strict";Ft();Po();jd=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),pa=[],ma=r=>Math.ceil(r/16)*16,Zw=r=>{for(let e=0;e<pa.length;e++){let n=pa[e];if(r<=n)return n}return Math.ceil(r/16)*16},Jw=1,Xd=()=>Jw++,ga=async(r,e,n,t)=>{let o=ma(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=r.getCommandEncoder();r.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},ha=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[n]of jd)pa.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[])}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,s=ma(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.getCommandEncoder();this.backend.endComputePass(),c.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),ye("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`),this.buffersForUploadingPending.push(u)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=ma(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=this.externalBuffers.get(t),o===void 0)throw new Error("previous buffer is not registered");if(e===t)return ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(t)}else o=Xd();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),this.externalBuffers.set(e,o),ye("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){let n=this.externalBuffers.get(e);n!==void 0&&(this.storageCache.delete(n),this.externalBuffers.delete(e),ye("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${n}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=Zw(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let a={id:Xd(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:e}),ye("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=this.storageCache.get(e);if(!n)throw new Error("releasing data does not exist");return ye("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("data does not exist");await ga(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){for(let e of this.buffersForUploadingPending)e.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=jd.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e))}},Jd=(...r)=>new ha(...r)});var ba,X,Pe=S(()=>{"use strict";ba=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},X=r=>new ba(r)});var ya,Ct,A,mr,Oo,Qd,ep,J=S(()=>{"use strict";ya=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Ct=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=ya.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;let f=Math.max(l,c);if(l&&c)a[s-u]=Math.max(l,c);else{if(f>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},A=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},mr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(s?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[a]=f-i[s],Math.floor((e+f-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},Oo=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Ct.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Qd=-34028234663852886e22,ep=34028234663852886e22});var hr,wa,he,Re,B,xe,va,gr,St,F,Ta,P,C,Eo,xa,tp,Dr,Q=S(()=>{"use strict";q();J();hr=64,wa=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(r){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},he=(r,e=1)=>{let n=wa(r,e);return typeof n=="string"?n:n[0]},Re=(r,e=1)=>{let n=wa(r,e);return typeof n=="string"?n:n[1]},B=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:A.computeStrides(n)})}),e},xe=r=>r%4===0?4:r%2===0?2:1,va=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,gr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,St=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,F=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Ta=(r,e,n,t,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=wa(e,o),c=typeof l=="string"?l:l[1],f=typeof l=="string"?l:l[0],d={indices:u,value:c,storage:f,tensor:e},m=D=>typeof D=="string"?D:`${D}u`,p={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",b=`${h}${r}_shape`,y=`${h}${r}_strides`,g="";for(let D=0;D<s-1;D++)g+=`
    let dim${D} = current / ${F(y,D,s)};
    let rest${D} = current % ${F(y,D,s)};
    indices[${D}] = dim${D};
    current = rest${D};
    `;g+=`indices[${s-1}] = current;`;let x=s<2?"":`
  fn o2i_${r}(offset: u32) -> ${d.indices} {
    var indices: ${d.indices};
    var current = offset;
    ${g}
    return indices;
  }`,v=D=>(p.offsetToIndices=!0,s<2?D:`o2i_${r}(${D})`),_=[];if(s>=2)for(let D=s-1;D>=0;D--)_.push(`${F(y,D,s)} * (indices[${D}])`);let I=s<2?"":`
  fn i2o_${r}(indices: ${d.indices}) -> u32 {
    return ${_.join("+")};
  }`,O=D=>(p.indicesToOffset=!0,s<2?D:`i2o_${r}(${D})`),E=(...D)=>s===0?"0u":`${d.indices}(${D.map(m).join(",")})`,z=(D,U)=>s<2?`${D}`:`${F(D,U,s)}`,N=(D,U,be)=>s<2?`${D}=${be};`:`${F(D,U,s)}=${be};`,k={},ue=(D,U)=>{p.broadcastedIndicesToOffset=!0;let be=`${U.name}broadcastedIndicesTo${r}Offset`;if(be in k)return`${be}(${D})`;let yt=[];for(let Xe=s-1;Xe>=0;Xe--){let Jt=U.indicesGet("outputIndices",Xe+U.rank-s);yt.push(`${z(y,Xe)} * (${Jt} % ${z(b,Xe)})`)}return k[be]=`fn ${be}(outputIndices: ${U.type.indices}) -> u32 {
             return ${yt.length>0?yt.join("+"):"0u"};
           }`,`${be}(${D})`},re=(D,U)=>(()=>{if(d.storage===d.value)return`${r}[${D}]=${U};`;if(d.storage==="vec2<u32>"&&d.value==="i32")return`${r}[${D}]=vec2<u32>(u32(${U}), select(0u, 0xFFFFFFFFu, ${U} < 0));`;if(d.storage==="vec2<u32>"&&d.value==="u32")return`${r}[${D}]=vec2<u32>(u32(${U}), 0u);`;if(d.storage==="u32"&&d.value==="vec4<bool>")return`${r}[${D}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${U}));`;throw new Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),ie=D=>(()=>{if(d.storage===d.value)return`${r}[${D}]`;if(d.storage==="vec2<u32>"&&d.value==="i32")return`i32(${r}[${D}].x)`;if(d.storage==="vec2<u32>"&&d.value==="u32")return`u32(${r}[${D}].x)`;if(d.storage==="u32"&&d.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${D}] & 0xFFu), bool(${r}[${D}] & 0xFF00u), bool(${r}[${D}] & 0xFF0000u), bool(${r}[${D}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),De=s<2?"":`
  fn get_${r}ByIndices(indices: ${d.indices}) -> ${c} {
    return ${ie(`i2o_${r}(indices)`)};
  }`,K=s<2?"":(()=>{let D=a.map(be=>`d${be}: u32`).join(", "),U=a.map(be=>`d${be}`).join(", ");return`
  fn get_${r}(${D}) -> ${c} {
    return get_${r}ByIndices(${E(U)});
  }`})(),we=(...D)=>{if(D.length!==s)throw new Error(`indices length must be ${s}`);let U=D.map(m).join(",");return s===0?ie("0u"):s===1?ie(U[0]):(p.get=!0,p.getByIndices=!0,p.indicesToOffset=!0,`get_${r}(${U})`)},Se=D=>s<2?ie(D):(p.getByIndices=!0,p.indicesToOffset=!0,`get_${r}ByIndices(${D})`),Z=s<2?"":`
  fn set_${r}ByIndices(indices: ${d.indices}, value: ${c}) {
    ${re(`i2o_${r}(indices)`,"value")}
  }`,ve=s<2?"":(()=>{let D=a.map(be=>`d${be}: u32`).join(", "),U=a.map(be=>`d${be}`).join(", ");return`
  fn set_${r}(${D}, value: ${c}) {
    set_${r}ByIndices(${E(U)}, value);
  }`})();return{impl:()=>{let D=[],U=!1;return p.offsetToIndices&&(D.push(x),U=!0),p.indicesToOffset&&(D.push(I),U=!0),p.broadcastedIndicesToOffset&&(Object.values(k).forEach(be=>D.push(be)),U=!0),p.set&&(D.push(ve),U=!0),p.setByIndices&&(D.push(Z),U=!0),p.get&&(D.push(K),U=!0),p.getByIndices&&(D.push(De),U=!0),!i&&U&&D.unshift(`const ${b} = ${d.indices}(${n.join(",")});`,`const ${y} = ${d.indices}(${A.computeStrides(n).join(",")});`),D.join(`
`)},type:d,offsetToIndices:v,indicesToOffset:O,broadcastedIndicesToOffset:ue,indices:E,indicesGet:z,indicesSet:N,set:(...D)=>{if(D.length!==s+1)throw new Error(`indices length must be ${s}`);let U=D[s];if(typeof U!="string")throw new Error("value must be string");let be=D.slice(0,s).map(m).join(",");return s===0?re("0u",U):s===1?re(be[0],U):(p.set=!0,p.setByIndices=!0,p.indicesToOffset=!0,`set_${r}(${be}, ${U})`)},setByOffset:re,setByIndices:(D,U)=>s<2?re(D,U):(p.setByIndices=!0,p.indicesToOffset=!0,`set_${r}ByIndices(${D}, ${U});`),get:we,getByOffset:ie,getByIndices:Se,usage:t,name:r,strides:y,shape:b,rank:s}},P=(r,e,n,t=1)=>Ta(r,e,n,"input",t),C=(r,e,n,t=1)=>Ta(r,e,n,"output",t),Eo=(r,e,n,t=1)=>Ta(r,e,n,"internal",t),xa=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=hr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let local_idx = local_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},tp=(r,e)=>new xa(r,e),Dr=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;o++){let i=n-1-o,s=r[i]||1;(e[e.length-1-o]||1)>1&&s===1&&t.unshift(i)}return t}});var Yw,rp,Qw,e0,t0,He,np,op,Zt=S(()=>{"use strict";q();J();Pe();Q();Yw=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.")},rp=(r,e)=>e&&e.length!==r?[...new Array(r).keys()].reverse():e,Qw=(r,e)=>A.sortBasedOnPerm(r,rp(r.length,e)),e0=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=n.indicesSet("a",r[i],`i[${i}]`);return o+="return a;}"},t0=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},He=(r,e)=>{let n=r.dataType,t=r.dims.length,o=rp(t,e),i=Qw(r.dims,o),{newShape:s,newPerm:a}=t0(r.dims,o),u=A.areEqual(a,[2,3,1]),l=A.areEqual(a,[3,1,2]),c=s.length===2&&a[0]>a[1]||u||l,f=c?s:r.dims,d=i;c&&(f=u?[s[0],s[1]*s[2]]:l?[s[0]*s[1],s[2]]:s,d=[f[1],f[0]]);let m=P("a",n,f.length),p=C("output",n,d.length),h=16,b;return c?b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,p)}
  var<workgroup> tile : array<array<${p.type.value}, ${h+1}>, ${h}>;
  ${y.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${m.getByIndices(`${m.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${p.setByIndices(`${p.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,p)}

  ${e0(o,t,m,p)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${p.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${p.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`,{name:c?"TransposeShared":"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let y=A.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:c?{x:Math.ceil(d[1]/h),y:Math.ceil(d[0]/h)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...B(f,d)]}},getShaderSource:b}},np=(r,e)=>{Yw(r.inputs),r.compute(He(r.inputs[0],e.perm))},op=r=>X({perm:r.perm})});var r0,n0,o0,i0,a0,s0,u0,l0,c0,f0,kt,ip,ap,sp,up,lp,cp,fp,dp,pp,mp,hp=S(()=>{"use strict";q();J();Q();Co();Zt();r0={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},n0={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},o0={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},i0={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},a0=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},s0=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},u0=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},l0=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},c0=(r,e)=>{let n=[];if(!l0(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},f0=(r,e,n,t,o,i,s)=>{let a=n[0].dims,u=A.size(i),l=A.size(s),c=P("_A",n[0].dataType,a),f=C("output",o,i),d=32,m=`
          var<workgroup> aBestValues : array<f32, ${d}>;
       `;return{name:r,shaderCache:e,getShaderSource:h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${m}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(d)}

          let outputIndex = global_idx / ${d};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${o0[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${d}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${r0[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${d}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${n0[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${i0[t]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},kt=(r,e,n,t)=>{let o=r.inputs.length===1?n:_a(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((m,p)=>p));let s=A.normalizeAxes(i,r.inputs[0].dims.length),a=s,u=r.inputs[0],l=c0(a,r.inputs[0].dims.length);l.length>0&&(u=r.compute(He(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=a0(a.length,u.dims.length));let[c,f]=s0(u.dims,a),d=c;o.keepDims&&(d=u0(c,s)),r.compute(f0(e,{hint:o.cacheKey,inputDependencies:["type"]},[u],t,r.inputs[0].dataType,d,f),{inputs:[u]})},ip=(r,e)=>{kt(r,"ReduceMeanShared",e,"mean")},ap=(r,e)=>{kt(r,"ReduceL1Shared",e,"l1")},sp=(r,e)=>{kt(r,"ReduceL2Shared",e,"l2")},up=(r,e)=>{kt(r,"ReduceLogSumExpShared",e,"logSumExp")},lp=(r,e)=>{kt(r,"ReduceMaxShared",e,"max")},cp=(r,e)=>{kt(r,"ReduceMinShared",e,"min")},fp=(r,e)=>{kt(r,"ReduceProdShared",e,"prod")},dp=(r,e)=>{kt(r,"ReduceSumShared",e,"sum")},pp=(r,e)=>{kt(r,"ReduceSumSquareShared",e,"sumSquare")},mp=(r,e)=>{kt(r,"ReduceLogSumShared",e,"logSum")}});var Dt,d0,ko,_a,Bt,p0,m0,h0,g0,b0,y0,x0,w0,v0,T0,Lt,gp,bp,yp,xp,wp,vp,Tp,_p,Ip,Sp,Co=S(()=>{"use strict";q();J();Pe();Q();hp();Dt=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},d0=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],ko=(r,e,n,t,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,c=l.length,f=A.normalizeAxes(o,c),d=!a&&f.length===0;l.forEach((b,y)=>{d||f.indexOf(y)>=0?s&&u.push(1):u.push(b)});let m=u.length,p=A.size(u);return{name:r,shaderCache:e,getShaderSource:b=>{let y=[],g=P("_A",n[0].dataType,c),x=C("output",i,m),v=t(g,x,f),_=v[2];for(let I=0,O=0;I<c;I++)d||f.indexOf(I)>=0?(s&&O++,_=`for(var j${I}: u32 = 0; j${I} < ${l[I]}; j${I}++) {
                  ${v[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${g.indicesSet("input_indices",I,`j${I}`)}
                  ${_}
                }`):(y.push(`${g.indicesSet("input_indices",I,x.indicesGet("output_indices",O))};`),O++);return`

        ${b.registerUniform("output_size","u32").declareVariables(g,x)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${v[0]}       // init ops for reduce max/min
          ${v[1]}
          ${_}
          ${v[3]}
          ${v.length===4?x.setByOffset("global_idx","value"):v.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...B(l,u)]})}},_a=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),X({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Bt=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:_a(o,n);r.compute(ko(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?d0:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},p0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},m0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},h0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},g0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},b0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},y0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=r.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},x0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},w0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},v0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},T0=(r,e)=>{Dt(r.inputs),Bt(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Lt=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},gp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?y0(r,e):ip(r,e)},bp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?m0(r,e):ap(r,e)},yp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?h0(r,e):sp(r,e)},xp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?g0(r,e):up(r,e)},wp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?b0(r,e):lp(r,e)},vp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?x0(r,e):cp(r,e)},Tp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?w0(r,e):fp(r,e)},_p=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?v0(r,e):dp(r,e)},Ip=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?T0(r,e):pp(r,e)},Sp=(r,e)=>{Lt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?p0(r,e):mp(r,e)}});var $p,Ap,Pp,Ia,Op=S(()=>{"use strict";q();Pe();Co();$p=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},Ap=(r,e)=>{$p(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(ko("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Pp=(r,e)=>{$p(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(ko("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Ia=r=>X(r)});var _0,I0,S0,$0,Br,A0,Ep,Do=S(()=>{"use strict";q();J();Po();Q();_0=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4],a=r[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],c=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,d=f,m=d;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of e.qkvHiddenSizes)if(x%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],d=e.qkvHiddenSizes[1],m=e.qkvHiddenSizes[2]}let p=l;if(f!==d)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+d+m)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(d!==m)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==d/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let b=p+h,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:c,hiddenSize:f,vHiddenSize:m,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(m/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:g,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},I0=(r,e,n)=>{let t=xe(n),o=64,i=n/t;i<o&&(o=32);let s=Math.ceil(n/t/o),a=[{type:1,data:1/n},{type:12,data:i},{type:12,data:s}],u=he(r.dataType,t),l=Re(1,t),c=["type"],f=d=>{let m=C("x",r.dataType,r.dims,t),p=Re(r.dataType),h=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${d.registerUniforms(h).declareVariables(m)}
  ${d.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${l}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${l}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(t){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${t}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${l}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${l}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(t){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${t}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${m.type.value}(${p}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${l}(x[offset + i]);
        x[offset + i] = ${m.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${u};${t}`,inputDependencies:c},getShaderSource:f,getRunData:()=>({outputs:[],dispatchGroup:{x:e},programUniforms:a})}},S0=(r,e,n,t,o,i,s,a)=>{let u=a+i.kvSequenceLength,l=[i.batchSize,i.numHeads,i.sequenceLength,u],c=i.kvNumHeads===void 0&&r>1&&t,f=c?[i.batchSize,i.numHeads,u,i.headSize]:void 0,d=s.scale===0?1/Math.sqrt(i.headSize):s.scale,m=xe(i.headSize),p=i.headSize/m,h=12,b={x:Math.ceil(u/h),y:Math.ceil(i.sequenceLength/h),z:i.batchSize*i.numHeads},y=[{type:12,data:i.sequenceLength},{type:12,data:p},{type:12,data:u},{type:12,data:i.numHeads},{type:1,data:d},{type:12,data:a},{type:12,data:i.kvSequenceLength}],g=c&&t&&A.size(t.dims)>0,x=["type","type"];g&&x.push("type"),o&&x.push("type");let v=[{dims:l,dataType:e.dataType,gpuDataType:0}];c&&v.push({dims:f,dataType:e.dataType,gpuDataType:0});let _=I=>{let O=P("q",e.dataType,e.dims,m),E=P("key",n.dataType,n.dims,m),z=[O,E];if(g){let ie=P("past_key",t.dataType,t.dims,m);z.push(ie)}o&&z.push(P("attention_bias",o.dataType,o.dims));let N=C("output",e.dataType,l),k=[N];c&&k.push(C("present_key",e.dataType,f,m));let ue=Re(1,m),re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;

  var<workgroup> tileQ: array<${O.type.storage}, ${h*h}>;
  var<workgroup> tileK: array<${O.type.storage}, ${h*h}>;
  ${I.registerUniforms(re).declareVariables(...z,...k)}
  ${I.mainStart([h,h,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>g&&c?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${c?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${ue}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>g&&c?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];")()}
      ${c?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${ue}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(m){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${m}`)}})()};
        output[outputIdx] = ${N.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${m};${o!==void 0};${t!==void 0};${r}`,inputDependencies:x},getRunData:()=>({outputs:v,dispatchGroup:b,programUniforms:y}),getShaderSource:_}},$0=(r,e,n,t,o,i)=>{let s=i+o.kvSequenceLength,a=o.nReps?o.nReps:1,u=o.vHiddenSize*a,l=o.kvNumHeads==null&&r>1&&t,c=l?[o.batchSize,o.numHeads,s,o.headSize]:void 0,f=[o.batchSize,o.sequenceLength,u],d=12,m={x:Math.ceil(o.vHeadSize/d),y:Math.ceil(o.sequenceLength/d),z:o.batchSize*o.numHeads},p=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:u},{type:12,data:i},{type:12,data:o.kvSequenceLength}],h=l&&t&&A.size(t.dims)>0,b=["type","type"];h&&b.push("type");let y=[{dims:f,dataType:e.dataType,gpuDataType:0}];l&&y.push({dims:c,dataType:e.dataType,gpuDataType:0});let g=x=>{let v=P("probs",e.dataType,e.dims),_=P("v",n.dataType,n.dims),I=[v,_];h&&I.push(P("past_value",t.dataType,t.dims));let E=[C("output",e.dataType,f)];l&&E.push(C("present_value",e.dataType,c));let z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${d}u;
  var<workgroup> tileQ: array<${v.type.value}, ${d*d}>;
  var<workgroup> tileK: array<${v.type.value}, ${d*d}>;
  ${x.registerUniforms(z).declareVariables(...I,...E)}
  ${x.mainStart([d,d,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>h&&l?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${l?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${v.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>h&&l?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `)()}
        ${l?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:b},getRunData:()=>({outputs:y,dispatchGroup:m,programUniforms:p}),getShaderSource:g}},Br=(r,e,n,t,o,i,s,a,u,l,c)=>{let f=Math.min(r.outputCount,1+(s?1:0)+(a?1:0)),d=l.kvNumHeads!==void 0||f>1?l.pastSequenceLength:0,m=d+l.kvSequenceLength,p=u&&A.size(u.dims)>0?u:void 0,h=[e,n];l.kvNumHeads===void 0&&f>1&&s&&A.size(s.dims)>0&&h.push(s),p&&h.push(p);let b=r.compute(S0(f,e,n,s,p,l,c,d),{inputs:h,outputs:l.kvNumHeads===void 0&&f>1?[-1,1]:[-1]})[0];r.compute(I0(b,l.batchSize*l.numHeads*l.sequenceLength,m),{inputs:[b],outputs:[]});let y=[b,t];l.kvNumHeads===void 0&&f>1&&a&&A.size(a.dims)>0&&y.push(a),r.compute($0(f,b,t,a,l,d),{inputs:y,outputs:l.kvNumHeads===void 0&&f>1?[0,2]:[0]})},A0=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=f=>{let d=C("output_q",u[0].dataType,n),m=C("output_k",u[0].dataType,n),p=C("output_v",u[0].dataType,n),h=P("input",u[0].dataType,u[0].dims),b=P("weight",u[1].dataType,u[1].dims),y=P("bias",u[2].dataType,u[2].dims),g=h.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${f.registerUniforms(x).declareVariables(h,b,y,d,m,p)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},Ep=(r,e)=>{let n=_0(r.inputs,e),[t,o,i]=A0(r,n);return Br(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n,e)}});var P0,O0,E0,Cp,kp=S(()=>{"use strict";Ue();q();J();Pe();Q();P0=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},O0=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,s=t?xe(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=A.size(i)/s,l=t,c=l?i.length:i,f=P("x",r[0].dataType,r[0].dims,s),d=P("scale",r[1].dataType,r[1].dims,a),m=P("bias",r[2].dataType,r[2].dims,a),p=P("inputMean",r[3].dataType,r[3].dims,a),h=P("inputVar",r[4].dataType,r[4].dims,a),b=C("y",r[0].dataType,c,s),y=()=>{let x="";if(t)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${d.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let v=1;v<d.rank;v++)x+=`cIndices[${v}] = outputIndices[${v}];`;x+=`let cOffset = ${d.indicesToOffset("cIndices")};`}return x},g=x=>`
  const epsilon = ${n};
  ${x.registerUniform("outputSize","u32").declareVariables(f,d,m,p,h,b)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${d.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${p.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...B(i)]:[{type:12,data:u}]})}},E0=r=>X(r),Cp=(r,e)=>{let{inputs:n,outputCount:t}=r,o=E0({...e,outputCount:t});if(j.webgpu.validateInputContent&&P0(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(O0(n,o))}});var C0,k0,Dp,Bp=S(()=>{"use strict";J();Q();C0=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},k0=r=>{let e=r[0].dims,n=r[0].dims[2],t=A.size(e)/4,o=r[0].dataType,i=P("input",o,e,4),s=P("bias",o,[n],4),a=P("residual",o,e,4),u=C("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${n}u / 4;
  ${c.declareVariables(i,s,a,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Dp=r=>{C0(r.inputs),r.compute(k0(r.inputs))}});var D0,de,Lp,zp,Rp,Np,Vp,Fp,Gp,Mp,Up,B0,Wp,Hp,qp,Kp,sn,jp,Bo,Xp,Zp,Jp,Yp,Qp,em,tm,rm,nm,om,im,am,sm,um,lm,cm,fm,dm,Sa,$a,pm,mm,hm,L0,z0,gm,Lo=S(()=>{"use strict";q();J();Pe();Q();D0=(r,e,n,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=P("inputData",n,[a],4),c=C("outputData",t,[a],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${r.registerUniforms(f).declareVariables(l,c)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},de=(r,e,n,t,o,i=r.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(A.size(r.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>D0(l,A.size(r.dims),r.dataType,i,n,t,a),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(A.size(l[0].dims)/64/4)},programUniforms:u})}},Lp=r=>{r.compute(de(r.inputs[0],"Abs","abs"))},zp=r=>{r.compute(de(r.inputs[0],"Acos","acos"))},Rp=r=>{r.compute(de(r.inputs[0],"Acosh","acosh"))},Np=r=>{r.compute(de(r.inputs[0],"Asin","asin"))},Vp=r=>{r.compute(de(r.inputs[0],"Asinh","asinh"))},Fp=r=>{r.compute(de(r.inputs[0],"Atan","atan"))},Gp=r=>{r.compute(de(r.inputs[0],"Atanh","atanh"))},Mp=r=>X(r),Up=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(de(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},B0=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return X({min:e,max:n})},Wp=(r,e)=>{let n=e||B0(r.inputs),t=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Hp=r=>{r.compute(de(r.inputs[0],"Ceil","ceil"))},qp=r=>{r.compute(de(r.inputs[0],"Cos","cos"))},Kp=r=>{r.compute(de(r.inputs[0],"Cosh","cosh"))},sn=r=>X(r),jp=(r,e)=>{let n=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Bo=(r="f32")=>`
const r0: ${r} = 0.3275911;
const r1: ${r} = 0.254829592;
const r2: ${r} = -0.284496736;
const r3: ${r} = 1.421413741;
const r4: ${r} = -1.453152027;
const r5: ${r} = 1.061405429;

fn erf_vf32(v: vec4<${r}>) -> vec4<${r}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Xp=r=>{let e=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Bo(e)))},Zp=r=>{r.compute(de(r.inputs[0],"Exp","exp"))},Jp=r=>{r.compute(de(r.inputs[0],"Floor","floor"))},Yp=r=>{let e=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Bo(e)))},Qp=(r,e)=>{let n=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},em=r=>{r.compute(de(r.inputs[0],"Not",e=>`!${e}`))},tm=r=>{r.compute(de(r.inputs[0],"Neg",e=>`-${e}`))},rm=r=>{r.compute(de(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},nm=r=>{let e=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},om=r=>{r.compute(de(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},im=r=>X(r),am=(r,e)=>{let n=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},sm=r=>{r.compute(de(r.inputs[0],"Sin","sin"))},um=r=>{r.compute(de(r.inputs[0],"Sinh","sinh"))},lm=r=>{r.compute(de(r.inputs[0],"Sqrt","sqrt"))},cm=r=>{r.compute(de(r.inputs[0],"Tan","tan"))},fm=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,dm=r=>{r.compute(de(r.inputs[0],"Tanh",fm))},Sa=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${fm("v")};
}
`,$a=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,pm=r=>{let e=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"FastGelu",$a,Sa(e),void 0,r.inputs[0].dataType))},mm=(r,e)=>{let n=Re(r.inputs[0].dataType);return r.compute(de(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},hm=r=>{r.compute(de(r.inputs[0],"Log","log"))},L0=(r,e)=>`
const alpha = vec4<${r}>(${e});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,z0=r=>`quick_gelu_impl(${r})`,gm=(r,e)=>{let n=Re(r.inputs[0].dataType);r.compute(de(r.inputs[0],"QuickGelu",z0,L0(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var R0,N0,ym,xm=S(()=>{"use strict";J();Q();Lo();R0=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},N0=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=P("input",r[0].dataType,r[0].dims,4),t=P("bias",r[0].dataType,[r[0].dims[2]],4),o=C("output",r[0].dataType,e,4),i=A.size(e)/4,s=he(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Bo(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ym=r=>{R0(r.inputs),r.compute(N0(r.inputs))}});var V0,F0,zt,wm,vm,Tm,_m,Im,Sm,$m,Am,Pm,Om,Em=S(()=>{"use strict";q();J();Q();V0=(r,e,n,t,o,i,s,a,u,l,c,f)=>{let d,m;typeof a=="string"?d=m=(g,x)=>`${a}((${g}),(${x}))`:typeof a=="function"?d=m=a:(d=a.scalar,m=a.vector);let p=C("outputData",c,t.length,4),h=P("aData",u,e.length,4),b=P("bData",l,n.length,4),y;if(o)if(i){let g=A.size(e)===1,x=A.size(n)===1,v=e.length>0&&e[e.length-1]%4===0,_=n.length>0&&n[n.length-1]%4===0;g||x?y=p.setByOffset("global_idx",m(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),x?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${p.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",p)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",p)};
            ${p.setByOffset("global_idx",m(s||v?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||_?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=p.setByOffset("global_idx",m(h.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(x,v,_="")=>{let I=`aData[indexA${v}][componentA${v}]`,O=`bData[indexB${v}][componentB${v}]`;return`
            let outputIndices${v} = ${p.offsetToIndices(`global_idx * 4u + ${v}u`)};
            let offsetA${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,p)};
            let offsetB${v} = ${b.broadcastedIndicesToOffset(`outputIndices${v}`,p)};
            let indexA${v} = offsetA${v} / 4u;
            let indexB${v} = offsetB${v} / 4u;
            let componentA${v} = offsetA${v} % 4u;
            let componentB${v} = offsetB${v} % 4u;
            ${x}[${v}] = ${_}(${d(I,O)});
          `};c===9?y=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(h,b,p)}

        ${f??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},F0=(r,e,n,t,o,i,s=n.dataType)=>{let a=!A.areEqual(n.dims,t.dims),u=n.dims,l=A.size(n.dims),c=!1,f=!1,d=[a];if(a){let m=Ct.calcShape(n.dims,t.dims,!1);if(!m)throw new Error("Can't perform binary op on the given tensors");u=m,l=A.size(u);let p=A.size(n.dims)===1,h=A.size(t.dims)===1,b=n.dims.length>0&&n.dims[n.dims.length-1]%4===0,y=t.dims.length>0&&t.dims[t.dims.length-1]%4===0;d.push(p),d.push(h),d.push(b),d.push(y);let g=1;for(let x=1;x<u.length;x++){let v=n.dims[n.dims.length-x]??1,_=t.dims[t.dims.length-x]??1;if(v===_)g*=v;else break}g%4===0?(f=!0,c=!0):(p||h||b||y)&&(c=!0)}else c=!0;return d.push(c),{name:r,shaderCache:{hint:e+d.map(m=>m.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:m=>V0(m,n.dims,t.dims,u,c,a,f,o,n.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(u)/4)},...B(n.dims,t.dims,u)]})}},zt=(r,e,n,t,o,i)=>{r.compute(F0(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},wm=r=>{zt(r,"Add",(e,n)=>`${e}+${n}`)},vm=r=>{zt(r,"Div",(e,n)=>`${e}/${n}`)},Tm=r=>{zt(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},_m=r=>{zt(r,"Mul",(e,n)=>`${e}*${n}`)},Im=r=>{let e=P("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;zt(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Sm=r=>{zt(r,"Sub",(e,n)=>`${e}-${n}`)},$m=r=>{zt(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},Am=r=>{zt(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},Pm=r=>{zt(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Om=r=>{zt(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var M0,U0,W0,H0,Cm,km,Dm=S(()=>{"use strict";q();J();Pe();Q();M0=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},U0=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,W0=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},H0=(r,e,n,t)=>{let o=A.size(n),i=new Array(r.length),s=new Array(r.length),a=0,u=[],l=[],c=[{type:12,data:o}];for(let h=0;h<r.length;++h)a+=r[h].dims[e],i[h]=a,l.push(r[h].dims.length),s[h]=P(`input${h}`,t,l[h]),u.push("rank"),c.push({type:12,data:i[h]});for(let h=0;h<r.length;++h)c.push(...B(r[h].dims));c.push(...B(n));let f=C("output",t,n.length),d=f.indicesGet("indices",e),m=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),p=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let b=0;b<r.length;b++)h.registerUniform(`sizeInConcatAxis${b}`,"u32");return h.declareVariables(...s,f)})()}

  ${U0(i.length,m)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${d});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${d} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${W0(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:p}},Cm=(r,e)=>{let n=r.inputs,t=n[0].dims,o=A.normalizeAxis(e.axis,t.length);M0(n,o);let i=t.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>A.size(a.dims)>0);r.compute(H0(s,o,i,n[0].dataType),{inputs:s})},km=r=>X({axis:r.axis})});var it,at,st,zo,Gt=S(()=>{"use strict";q();J();it=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},at=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},st=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},zo=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[Qd,ep];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var Ge,Ro,un=S(()=>{"use strict";Ge=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Ro=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var No,Aa=S(()=>{"use strict";No=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var q0,K0,ln,Bm,j0,cn,X0,Vo,fn=S(()=>{"use strict";q();J();Q();Gt();un();q0=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,K0=(r,e)=>r?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ln=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32)=>{let u=e[1]*r[1],l=e[0]*r[0],c=o?u:i,f=o?i:u,d=c/e[0],m=i/e[1];if(!((o&&d===4&&r[1]===4||!o&&(d===3||d===4))&&c%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${d} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${d} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${d}<${n}>, ${c/d}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${d};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${m};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${q0(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${d===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${K0(o,d)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Bm=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,j0=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",cn=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=r[1]*e[1],c=r[0]*e[0],f=o?l:i,d=o?i:l;if(!(d%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${d} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let m=d/e[1],p=f/e[0],h=i/e[1],b=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${d}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${Bm(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${m};
let tileColA = i32(localId.x) * ${p};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${p}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Bm(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${j0(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${f}>, ${d}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`},X0=(r,e,n,t,o,i=!1)=>{let[s,a,u]=o,[l,c,f,d]=t,m=Dr(s,u),p=Dr(a,u),h=he(t[0].type.tensor),b=()=>{let x=c.rank,v=l.rank,_=`var aIndices: ${c.type.indices};`;for(let I=x-2-1,O=v-1;I>=0;I--,O--)_+=`
aIndices[${I}] = ${v>1?`batchIndices[${O}]`:"batchIndices"};`;return m.forEach(I=>{_+=`
aIndices[${I}] = 0;`}),_+=`
aIndices[${x-2}] = u32(row);
                   aIndices[${x-1}] = u32(colIn);`,_},y=()=>{let x=f.rank,v=l.rank,_=`var bIndices: ${f.type.indices};`;for(let I=x-2-1,O=v-1;I>=0;I--,O--)_+=`
bIndices[${I}] = ${v>1?`batchIndices[${O}]`:"batchIndices"};`;return p.forEach(I=>{_+=`
bIndices[${I}] = 0;`}),_+=`
bIndices[${x-2}] = u32(row);
                   bIndices[${x-1}] = u32(colIn);`,_};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Ge(r,h)} {
      var value = ${Ge(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${b()}
        value = ${c.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Ge(r,h)} {
      var value = ${Ge(r,h)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${f.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ge(r,h)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${i?"bias[colIn]":`${Ge(r,h)}(bias[row])`};`:""}
        ${n}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Vo=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),c=t?t.slice(0,-2):n.slice(0,-2),f=A.size(c),d=s[s.length-2],m=s[s.length-1],p=a[a.length-1],h=m%4===0&&p%4===0,b=d<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(p/y[0]/b[0]),Math.ceil(d/y[1]/b[1]),Math.ceil(f/y[2]/b[2])],x=h?4:1,v=[...u,d,m/x],_=v.length,I=[...l,m,p/x],O=I.length,E=[f,d,p/x],z=[{type:6,data:d},{type:6,data:p},{type:6,data:m}];at(e,z),z.push(...B(c,v,I));let N=["rank","rank"],k=r.length>2;k&&(z.push(...B(r[2].dims)),N.push("rank")),z.push(...B(E));let ue=re=>{let ie=c.length,De=Eo("batchDims",r[0].dataType,ie,1),K=he(r[0].dataType),we=P("a",r[0].dataType,_,x),Se=P("b",r[1].dataType,O,x),Z=C("result",r[0].dataType,E.length,x),ve=[we,Se];if(k){let U=o?x:1;ve.push(P("bias",r[2].dataType,r[2].dims.length,U))}let ae=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];st(e,ae);let ne=he(Z.type.tensor),se=it(e,Z.type.value,ne),D=X0(x,k,se,[De,we,Se,Z],[u,l,c],o);return`
  ${re.registerUniforms(ae).registerInternalVariables(De).declareVariables(...ve,Z)}
  ${D}
  ${h?ln(b,y,K,De):cn(b,y,K,De)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${e.activation};${h};${o}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:z}),getShaderSource:ue}}});var Z0,Lm,zm=S(()=>{"use strict";q();Ft();Q();Gt();un();Aa();fn();Z0=(r,e,n,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},d=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,m=r?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,p=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=r?"row":"col",y=r?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${Ge(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${p} && xCol >= 0 && xCol < ${h}) {
      ${d}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,x=r?e&&t?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${Ge(s,l)}(0.0);`:t&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${Ge(s,l)}(0.0);`,v=`${f(a)}`,_=Ge(u,l),I=r?Ge(s,l):Ge(a,l),O=r?Ge(a,l):Ge(s,l),E=it(i,_,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${r?x:v}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${r?v:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${_}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${m}
      ${Ro(o)}
      ${E}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Lm=(r,e,n,t,o,i,s,a,u)=>{let l=e.format==="NHWC",c=l?r[0].dims[3]:r[0].dims[1],f=n[0],d=l?n[2]:n[3],m=l?n[1]:n[2],p=l?n[3]:n[1],h=l&&(c%4===0||c%3===0)&&p%4===0,b=l?p:d*m,y=l?d*m:p,g=[8,8,1],x=t<=8?[4,1,1]:[4,4,1],v=[Math.ceil(b/g[0]/x[0]),Math.ceil(y/g[1]/x[1]),Math.ceil(f/g[2]/x[2])];ye("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let _=h?l&&c%4!==0?3:4:1,I=g[1]*x[1],O=g[0]*x[0],E=Math.max(g[0]*_,g[1]),z=t%I===0,N=o%O===0,k=i%E===0,ue=h?[_,4,4]:[1,1,1],re=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];at(e,re),re.push(...B(r[0].dims,r[1].dims));let ie=["rank","rank"];s&&(re.push(...B(r[2].dims)),ie.push("rank")),re.push(...B(n));let De=K=>{let we=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];st(e,we);let Se=h?4:1,Z=he(r[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${h?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,ae=P("x",r[0].dataType,r[0].dims.length,_===3?1:_),ne=P("w",r[1].dataType,r[1].dims.length,Se),se=[ae,ne],D=C("result",r[0].dataType,n.length,Se);if(s){let U=P("bias",r[2].dataType,r[2].dims.length,Se);se.push(U),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${Z}>`:Z} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${No("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${K.registerUniforms(we).declareVariables(...se,D)}
        ${ve}
        ${Z0(l,z,N,k,s,e,ue[0],ue[1],ue[2],Z)}
        ${h?ln(x,g,Z,void 0,!l,E):cn(x,g,Z,void 0,!l,E,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${_};${h};${z};${N};${k};${I};${O};${E}`,inputDependencies:ie},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:re}),getShaderSource:De}}});var J0,Rm,Fo,Y0,Nm,Q0,Vm,Fm,Gm=S(()=>{"use strict";q();Ft();J();Q();Gt();un();J0=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Rm=r=>typeof r=="number"?[r,r,r]:r,Fo=(r,e)=>e<=1?r:r+(r-1)*(e-1),Y0=(r,e,n,t=1)=>{let o=Fo(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},Nm=(r,e,n,t,o)=>{o==null&&(o=Y0(r,e[0],t[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)r[s]+2*o>=e[s]&&(i[s]=Math.trunc((r[s]-e[s]+2*o)/t[s]+1));return i},Q0=(r,e,n,t,o,i,s,a,u,l)=>{let c,f,d,m;if(r==="VALID"&&(r=0),typeof r=="number"){c={top:r,bottom:r,left:r,right:r,front:r,back:r};let p=Nm([e,n,t,1],[a,u,l],1,[o,i,s],r);f=p[0],d=p[1],m=p[2]}else if(Array.isArray(r)){if(!r.every((h,b,y)=>h===y[0]))throw Error(`Unsupported padding parameter: ${r}`);c={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let p=Nm([e,n,t,1],[a,u,l],1,[o,i,s],r[0]);f=p[0],d=p[1],m=p[2]}else if(r==="SAME_UPPER"){f=Math.ceil(e/o),d=Math.ceil(n/i),m=Math.ceil(t/s);let p=(f-1)*o+a-e,h=(d-1)*i+u-n,b=(m-1)*s+l-t,y=Math.floor(p/2),g=p-y,x=Math.floor(h/2),v=h-x,_=Math.floor(b/2),I=b-_;c={top:x,bottom:v,left:_,right:I,front:y,back:g}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:c,outDepth:f,outHeight:d,outWidth:m}},Vm=(r,e,n,t,o,i=!1,s="channelsLast")=>{let a,u,l,c,f;if(s==="channelsLast")[a,u,l,c,f]=r;else if(s==="channelsFirst")[a,f,u,l,c]=r;else throw new Error(`Unknown dataFormat ${s}`);let[d,,m,p,h]=e,[b,y,g]=Rm(n),[x,v,_]=Rm(t),I=Fo(m,x),O=Fo(p,v),E=Fo(h,_),{padInfo:z,outDepth:N,outHeight:k,outWidth:ue}=Q0(o,u,l,c,b,y,g,I,O,E),re=i?d*f:d,ie=[0,0,0,0,0];return s==="channelsFirst"?ie=[a,re,N,k,ue]:s==="channelsLast"&&(ie=[a,N,k,ue,re]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:c,inChannels:f,outDepth:N,outHeight:k,outWidth:ue,outChannels:re,padInfo:z,strideDepth:b,strideHeight:y,strideWidth:g,filterDepth:m,filterHeight:p,filterWidth:h,effectiveFilterDepth:I,effectiveFilterHeight:O,effectiveFilterWidth:E,dilationDepth:x,dilationHeight:v,dilationWidth:_,inShape:r,outShape:ie,filterShape:e}},Fm=(r,e,n,t,o,i)=>{let s=i==="channelsLast",a=s?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],c={x:n.map((g,x)=>x)},f=[Math.ceil(J0(c.x.map(g=>n[g]))/l[0]),1,1];ye("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let d=u?s&&a%4!==0?3:4:1,m=A.size(n),p=[{type:12,data:m},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];at(e,p),p.push(...B(r[0].dims,r[1].dims));let h=["rank","rank"],b=r.length===3;b&&(p.push(...B(r[2].dims)),h.push("rank")),p.push(...B(n));let y=g=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];st(e,x);let v=u?4:1,_=he(r[0].dataType),I=P("x",r[0].dataType,r[0].dims.length,d===3?1:d),O=P("W",r[1].dataType,r[1].dims.length,v),E=[I,O],z=C("result",r[0].dataType,n.length,v),N="";if(b){let re=P("bias",r[2].dataType,r[2].dims.length,v);E.push(re),N+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${_}>`:_} {
          return bias[${s?F("coords",4,5):F("coords",1,5)}${u?"/ 4":""}];
        }`}let k=Ge(d,_),ue=it(e,k,_);return`
            ${N}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${g.registerUniforms(x).declareVariables(...E,z)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,I.rank)};
              let d2 = ${s?F("coords",I.rank-1,I.rank):F("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${s?F("coords",1,I.rank):F("coords",2,I.rank)},
              ${s?F("coords",2,I.rank):F("coords",3,I.rank)},
              ${s?F("coords",3,I.rank):F("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?F("uniforms.x_shape",1,I.rank):F("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${s?F("uniforms.x_shape",2,I.rank):F("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${s?F("uniforms.x_shape",3,I.rank):F("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${s?F("uniforms.x_shape",4,I.rank):F("uniforms.x_shape",1,I.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${b?"value = value + getBiasByOutputCoords(coords)":""};
              ${ue}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${d};${b}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:p}),getShaderSource:y}}});var Mm,Um,Wm=S(()=>{"use strict";q();J();Q();Gt();Mm=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",s=r[0].dims,a=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],c=l/e.group,f=u&&c>=4?xe(l):1,d=A.size(n)/f,m=[{type:12,data:d},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];at(e,m),m.push(...B(s,[a[0],a[1],a[2],a[3]/f]));let p=o?["rank","rank","rank"]:["rank","rank"];m.push(...B([n[0],n[1],n[2],n[3]/f]));let h=b=>{let y=C("output",r[0].dataType,n.length,f),g=he(y.type.tensor),x=it(e,y.type.value,g),v=P("x",r[0].dataType,s.length),_=P("w",r[1].dataType,a.length,f),I=[v,_];o&&I.push(P("b",r[2].dataType,r[2].dims,f));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];st(e,O);let E=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${v.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${_.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${v.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${_.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${b.registerUniforms(O).declareVariables(...I,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${E}
    ${i}
    ${x}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:h}},Um=(r,e,n,t)=>{let o=r.length>2,i=xe(n[3]),s=xe(n[2]),a=A.size(n)/i/s,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],c=[n[0],n[1],n[2],n[3]/i],f=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];at(e,f),f.push(...B(u,l,c));let d=(s-1)*e.strides[1]+l[1],m=p=>{let h=C("output",r[0].dataType,c.length,i),b=he(h.type.tensor),y=it(e,h.type.value,b),g=P("x",r[0].dataType,u.length,i),x=P("w",r[1].dataType,l.length,i),v=[g,x];o&&v.push(P("b",r[2].dataType,r[2].dims,i));let _=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return st(e,I),`
  ${p.registerUniforms(I).declareVariables(...v,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${d}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${d}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${_}
      ${y}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${d};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:m}}});var Pa,ev,Hm,Oa=S(()=>{"use strict";q();J();fn();Q();Gt();Pa=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s[s.length-2],l=a[a.length-1],c=s[s.length-1],f=xe(l),d=xe(c),m=xe(u),p=A.size(n)/f/m,h=r.length>2,b=t?t.slice(0,-2):n.slice(0,-2),g=[A.size(b),u,l],x=[{type:12,data:p},{type:12,data:u},{type:12,data:l},{type:12,data:c}];at(e,x),x.push(...B(b,s,a)),h&&x.push(...B(r[2].dims)),x.push(...B(g));let v=_=>{let I=Eo("batch_dims",r[0].dataType,b.length),O=P("a",r[0].dataType,s.length,d),E=P("b",r[1].dataType,a.length,f),z=C("output",r[0].dataType,g.length,f),N=he(z.type.tensor),k=it(e,z.type.value,N),ue=[O,E],re="";if(h){let ae=o?f:1;ue.push(P("bias",r[2].dataType,r[2].dims.length,ae)),re=`${o?`value += bias[col / ${ae}];`:`value += ${z.type.value}(bias[row + i]);`}`}let ie=s.slice(0,-2),De=a.slice(0,-2),K=Dr(ie,b),we=Dr(De,b),Se=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];st(e,Se);let Z=(ae,ne)=>{let se=ae.rank,D=ae.name;if(se===2)return`var ${D}_indices = ${ae.type.indices}(0u, 0u);`;let U=I.rank,be=`var ${D}_indices: ${ae.type.indices};`;for(let yt=se-2-1,Xe=U-1;yt>=0;yt--,Xe--)be+=`
${D}_indices[${yt}] = ${U>1?`batch_indices[${Xe}]`:"batch_indices"};`;return ne.forEach(yt=>{be+=`
${D}_indices[${yt}] = 0;`}),be+=`${D}_indices[${se-2}] = 0u;
                     ${D}_indices[${se-1}] = 0u;`,be},ve=()=>{let ae=`var a_data: ${O.type.value};`;for(let ne=0;ne<d;ne++)ae+=`
              let b_data${ne} = b[(b_offset + (k + ${ne}) * uniforms.N + col) / ${f}];`;for(let ne=0;ne<m;ne++){ae+=`a_data = a[(a_offset + (row + ${ne}) * uniforms.K + k) / ${d}];`;for(let se=0;se<d;se++)ae+=`
            values[${ne}] = fma(${E.type.value}(a_data${d===1?"":`[${se}]`}), b_data${se}, values[${ne}]);
`}return ae};return`
  ${_.registerUniforms(Se).registerInternalVariables(I).declareVariables(...ue,z)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}
    ${Z(O,K)}
    let a_offset = ${O.indicesToOffset("a_indices")};
    ${Z(E,we)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${z.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${d}) {
      ${ve()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${re}
      ${k}
      let cur_indices = ${z.type.indices}(batch, row + i, col);
      let offset = ${z.indicesToOffset("cur_indices")};
      ${z.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${d};${m};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:v}},ev=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},Hm=r=>{ev(r.inputs);let e=Ct.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];n<8&&t<8?r.compute(Pa(r.inputs,{activation:""},e)):r.compute(Vo(r.inputs,{activation:""},e))}});var tv,Ea,rv,Ca,ka,qm,nv,ov,Da,Km=S(()=>{"use strict";J();zm();Gm();fn();Wm();Gt();Oa();Zt();tv=(r,e,n,t,o,i)=>{let s=r[0],a=r.slice(i?1:2,i?3:4),u=a.length,l=e[0],f=e.slice(2).map((p,h)=>p+(p-1)*(n[h]-1)),m=a.map((p,h)=>p+t[h]+t[h+u]).map((p,h)=>Math.floor((p-f[h]+o[h])/o[h]));return m.splice(0,0,s),m.splice(i?3:1,0,l),m},Ea=[2,3,1,0],rv=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},Ca=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();mr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},ka=r=>{let e=zo(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,s=r.kernel_shape,a=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},qm=(r,e,n,t)=>{let o=n.format==="NHWC",i=tv(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let I=[e[0]];if(o){let E=r.kernelCustomData.wT??r.compute(He(e[1],Ea),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=E),I.push(E)}else I.push(e[1]);e.length===3&&I.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Um(I,n,i,t),{inputs:I}):r.compute(Mm(I,n,i,t),{inputs:I});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],f=e[1].dims[3],d=i[o?1:2],m=i[o?2:3],p=i[o?3:1],h=o&&c===a&&f===u&&n.pads[0]===0&&n.pads[1]===0;if(h||c===1&&f===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let I=i[0],O,E,z,N=[];if(o){let re=r.kernelCustomData.wT??r.compute(He(e[1],Ea),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=re),h){let ie=a*u*l;O=e[0].reshape([1,I,ie]),E=re.reshape([1,ie,p]),z=[1,I,p]}else O=e[0].reshape([I,a*u,l]),E=re.reshape([1,l,p]),z=[I,d*m,p];N.push(O),N.push(E)}else O=e[0].reshape([I,l,a*u]),E=e[1].reshape([1,p,l]),z=[I,p,d*m],N.push(E),N.push(O);s&&N.push(e[2]);let k=z[2],ue=N[0].dims[N[0].dims.length-1];k<8&&ue<8?r.compute(Pa(N,n,i,z,o,t),{inputs:N}):r.compute(Vo(N,n,i,z,o,t),{inputs:N});return}let b=!0,y=r.kernelCustomData.wT??r.compute(He(e[1],Ea),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=y);let g=[e[0],y];s&&g.push(e[2]);let x=o?d*m:p,v=o?p:d*m,_=c*f*l;r.compute(Lm(g,n,i,x,v,_,s,b,t),{inputs:g})},nv=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=Ca({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);qm(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},ov=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=Ca(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Vm(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(Fm(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},Da=(r,e)=>{if(rv(r.inputs,e),r.inputs[0].dims.length===3)nv(r,e);else if(r.inputs[0].dims.length===5)ov(r,r.inputs,e);else{let n=Ca(e,r.inputs);qm(r,r.inputs,n)}}});var iv,jm,Xm=S(()=>{"use strict";q();Ft();Q();Gt();un();Aa();fn();iv=(r,e=!1,n,t,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${t}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},s=r?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=r?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,u=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",l=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",c=r?"row":"col",f=r?"col":"row",d=`
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${c} / outWidth;
      let outCol = ${c} % outWidth;

      let WRow = ${f} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${f} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${t}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${l}) || fract(xC) > 0.0) {
        return ${t}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${f} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,m=r?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${d}
      }
      return ${t}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${d}
      }
      return ${t}(0.0);`,p=`
      let col = colIn * ${o};
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${r?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${t}(0.0);
      `,h=it(n,t);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?m:p}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?p:m}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${t}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Ro(e)}
      ${h}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},jm=(r,e,n,t,o,i,s,a)=>{let u=e.format==="NHWC",l=u?r[0].dims[3]:r[0].dims[1],c=n[0],f=u?n[2]:n[3],d=u?n[1]:n[2],m=u?n[3]:n[1],p=u&&l%4===0&&l%3&&m%4===0,h=u?m:f*d,b=u?f*d:m,y=[8,8,1],g=t<=8?[4,1,1]:[4,4,1],x=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(c/y[2]/g[2])];ye("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${x}`);let v=p?4:1,_=Math.max(y[0]*v,y[1]),I=p?4:1,O=[e.kernelShape[u?1:2],e.kernelShape[u?2:3]],E=[O[0]+(e.dilations[0]<=1?0:(O[0]-1)*(e.dilations[0]-1)),O[1]+(e.dilations[1]<=1?0:(O[1]-1)*(e.dilations[1]-1))],z=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],N=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:e.strides},{type:6,data:e.dilations},{type:6,data:O},{type:6,data:z}];at(e,N),N.push(...B(r[0].dims,r[1].dims));let k=["rank","rank"];s&&(N.push(...B(r[2].dims)),k.push("rank")),N.push(...B(n));let ue=re=>{let ie=P("x",r[0].dataType,r[0].dims.length,I),De=P("w",r[1].dataType,r[1].dims.length,1),K=C("result",r[0].dataType,n.length,I),we=[ie,De],Se="";if(s){let ae=P("bias",r[2].dataType,r[2].dims.length,I);we.push(ae),Se+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${ae.type.value} {
            return bias[coords.${u?"w":"y"}${p?"/ 4":""}];
          }`}let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:O.length},{name:"pads",type:"i32",length:z.length}];st(e,Z);let ve=he(r[0].dataType,1);if(ve!=="f16"&&ve!=="f32")throw new Error(`elemType ${ve} is not supported.`);return`
        ${No("uniforms.result_strides")}
        ${re.registerUniforms(Z).declareVariables(...we,K)};
        ${Se}
        ${iv(u,s,e,ie.type.value,v)}
        ${p?ln(g,y,ve,void 0,!u,_):cn(g,y,ve,void 0,!u,_,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${e.cacheKey};${g};${y};${p}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:N}),getShaderSource:ue}}});var av,Ba,Zm=S(()=>{"use strict";q();Ft();J();Q();av=(r,e,n,t,o,i=!1,s,a,u=!1)=>{let l=u?1:2,c=u?2:3,f=u?3:1,d=i?2:1,m=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;t&&(m+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let p=i?4:1,h=P("W",e[1].dataType,e[1].dims.length,p),b=P("Dy",e[0].dataType,e[0].dims.length,p),y=[b,h];t&&y.push(P("bias",e[2].dataType,[n[f]].length,p));let g=C("result",e[0].dataType,n.length,p),x=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${d};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${d}>;
        for (var i = 0; i < ${d}; i++) {
          dotProd[i] = vec4<${s}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${s}(dyCorner.x) + ${s}(wR)) / ${s}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${s}(dyCorner.y) + ${s}(wC)) / ${s}(uniforms.strides.y);
            let dyC2 = (${s}(dyCorner.y) + 1.0 + ${s}(wC)) / ${s}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${b.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${f}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${d}; i = i + 1) {
          let value = dotProd[i] + ${t?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,v=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",f)};
          let r = ${g.indicesGet("outputIndices",l)};
          let c = ${g.indicesGet("outputIndices",c)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${s}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${l}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${c}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?b.get("batch","idyR","idyC","inputChannel"):b.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${h.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${t?"bias[d1]":`${s}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${r.registerUniforms(a).declareVariables(...y,g)}
  ${m}

    ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?x:v}}`},Ba=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=A.size(o),s=[Math.ceil(i/64),1,1];ye("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=e.format==="NHWC",u=["rank","rank"],l=[e.strides[0],e.strides[1]],c=[e.kernelShape[a?1:2],e.kernelShape[a?2:3]],f=[e.dilations[0],e.dilations[1]],d=[c[0]+(e.dilations[0]<=1?0:(e.kernelShape[a?1:2]-1)*(e.dilations[0]-1)),c[1]+(e.dilations[1]<=1?0:(e.kernelShape[a?2:3]-1)*(e.dilations[1]-1))],m=[d[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),d[1]-1-Math.floor(e.pads[1]+e.pads[3])/2],p=!1,h=e.group,b=r[1].dims,y=b[0]/h,g=b[1],x=[{type:12,data:i},{type:12,data:l},{type:12,data:c},{type:12,data:f},{type:12,data:d},{type:6,data:m},{type:12,data:y},{type:12,data:g},...B(r[0].dims,r[1].dims)];t&&(x.push(...B(r[2].dims)),u.push("rank")),x.push(...B(o));let v=s[1]===1&&s[2]===1,_=I=>{let O=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:c.length},{name:"dilations",type:"u32",length:c.length},{name:"effective_filter_dims",type:"u32",length:d.length},{name:"pads",type:"i32",length:m.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],E=he(r[0].dataType);return`${av(I,r,o,t,v,p,E,O,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:x}),getShaderSource:_}}});var sv,uv,lv,Jm,Ym,cv,fv,dv,pv,Qm,eh=S(()=>{"use strict";Xm();Zm();Gt();Zt();sv=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,uv=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},lv=(r,e,n,t,o,i,s,a,u,l)=>{let c=r.length-2,f=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let d=r[0],m=e[a?3:1]*o;for(let p=0,h=r.length-c-(a?1:0);p<c;++p,++h){let b=r[h],y=f?b*s[p]:l[p],g=sv(b,s[p],i[p],e[h],n[p],y);uv(g,t,i,p,p+c),f&&l.push(s[p]*(b-1)+u[p]+(e[h]-1)*n[p]+1-i[p]-i[p+c])}l.splice(0,0,d),l.splice(a?3:1,0,m)},Jm=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((f,d)=>f*d,1)===0){n.length=0;for(let f=2;f<e[1].dims.length;++f)n.push(e[1].dims[f])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),s=r.outputPadding.slice(),a=e[0].dims,u=r.dilations.slice();if(u.reduce((f,d)=>f+d,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let l=r.strides.slice();if(l.reduce((f,d)=>f+d,0)===0){let f=e[0].dims.length-2;l=new Array(f).fill(1)}lv(a,n,u,r.autoPad,r.group,o,l,t,s,i);let c=Object.assign({},r);return Object.assign(c,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),c},Ym=r=>{let e=zo(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,s=r.kernelShape,a=r.pads,u=r.strides,l=r.wIsConst(),c=r.outputPadding,f=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,outputPadding:c,outputShape:f,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},cv=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((c,f)=>c+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,f)=>c+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,f)=>c+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,f)=>c+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},fv=[2,3,1,0],dv=(r,e,n)=>{let t=Jm(n,e),o=n.format==="NHWC",i=t.outputShape,s=i[o?3:1],a=e[0].dims[o?3:1];if(t.group!==1||s===1&&a===1){r.compute(Ba(e,t));return}let u=i[o?1:2],l=i[o?2:3],c=e[1].dims[2],f=e[1].dims[3],d=o?u*l:s,m=o?s:u*l,p=c*f*a,h=!0,b=r.kernelCustomData.wT??r.compute(He(e[1],fv),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=b);let y=[e[0],b],g=e.length===3;g&&(!o&&e[2].dims.length===1?y.push(e[2].reshape([e[2].dims[0],1,1])):y.push(e[2])),r.compute(jm(y,t,i,d,m,p,g,h),{inputs:y})},pv=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=Jm({...e,pads:a,strides:s,dilations:i,kernelShape:o},t);r.compute(Ba(t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},Qm=(r,e)=>{cv(r.inputs,e),r.inputs[0].dims.length===3?pv(r,e):dv(r,r.inputs,e)}});var mv,th,rh,nh=S(()=>{"use strict";q();J();Pe();Q();mv=(r,e,n,t)=>{let o=A.size(e),i=e.length,s=P("input",r,i),a=C("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=A.normalizeAxis(u,i),c=f=>{let d=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,m=F("uniforms.input_shape","uniforms.axis",i),p=t.reverse?d+(t.exclusive?" + 1":""):"0",h=t.reverse?m:d+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${p};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...B(e,e)]}),getShaderSource:c}},th=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(mv(t,n,o,e),{inputs:[0]})},rh=r=>{let e=r.exclusive===1,n=r.reverse===1;return X({exclusive:e,reverse:n})}});var hv,gv,bv,oh,ih,ah=S(()=>{"use strict";q();J();Pe();Q();hv=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},gv=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},bv=(r,e)=>{let n,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([n,t,o,i]=r.dims,s=c?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],a=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],s=c?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],a=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=r.reshape(s),d=f.dims.length,m=r.dataType,p=P("a",m,d),h=C("output",m,d),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(p,h)}

  ${gv(a,d,p,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",p.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],x=A.size(g),v=f.dims,_=A.sortBasedOnPerm(v,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...B(v,_)]}},getShaderSource:b}},oh=(r,e)=>{hv(r.inputs),r.compute(bv(r.inputs[0],e))},ih=r=>X({blocksize:r.blocksize,mode:r.mode,format:r.format})});var La,Go,sh,yv,xv,za,Ra,uh,wv,lh,ch,fh=S(()=>{"use strict";q();J();Pe();Q();La="[a-zA-Z]|\\.\\.\\.",Go="("+La+")+",sh="^"+Go+"$",yv="("+Go+",)*"+Go,xv="^"+yv+"$",za=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},Ra=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(xv)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(sh)))throw new Error("Invalid LHS term");let c=this.processTerm(a,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Go)))throw new Error("Invalid RHS");o.match(RegExp(La,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(sh))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(La,"g")),c=new za(o);return l?.forEach((f,d)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let p=0;p<a.length;p++){let h=String.fromCharCode("0".charCodeAt(0)+p);c.addSymbol(h,d+p),this.addSymbol(h,t[u++],o)}}else c.addSymbol(f,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),c}},uh=r=>r+"_max",wv=(r,e,n,t)=>{let i=r.map(c=>c.length).map((c,f)=>P(`input${f}`,e,c)),s=A.size(t),a=C("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(c=>!n.rhs.symbolToIndices.has(c)),l=c=>{let f=[],d="var prod = 1.0;",m="var sum = 0.0;",p="sum += prod;",h=[],b=[],y=[],g=[],x=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((_,I)=>{if(n.rhs.symbolToIndices.has(I)){let O=n.rhs.symbolToIndices.get(I)?.[0];O!==void 0&&n.lhs.forEach((E,z)=>{if(_.inputIndices.includes(z)){let N=E.symbolToIndices.get(I);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(k=>{f.push(`${i[z].indicesSet(`input${z}Indices`,k,a.indicesGet("outputIndices",O))}`)})}})}else n.lhs.forEach((O,E)=>{if(_.inputIndices.includes(E)){let z=O.symbolToIndices.get(I);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(N=>{h.push(`${i[E].indicesSet(`input${E}Indices`,N,`${I}`)}`)}),g.push(`prod *= ${i[E].getByIndices(`input${E}Indices`)};`)}}),b.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${uh(I)}; ${I}++) {`),y.push("}")});let v=x?[...f,`let sum = ${i.map((_,I)=>_.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...f,m,...b,...h,d,...g,p,...y];return`
            ${c.registerUniforms(u.map(_=>({name:`${uh(_)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((_,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${v.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let c=u.filter(d=>n.symbolToInfo.has(d)).map(d=>({type:12,data:n.symbolToInfo.get(d)?.dimValue||0}));c.push({type:12,data:s});let f=r.map((d,m)=>[...B(d)]).reduce((d,m)=>d.concat(m),c);return f.push(...B(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:l}},lh=(r,e)=>{let n=new Ra(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,s)=>i.dims);r.compute(wv(o,r.inputs[0].dataType,n,t))},ch=r=>{let e=r.equation.replace(/\s+/g,"");return X({equation:e})}});var vv,dh,Tv,_v,ph,mh=S(()=>{"use strict";q();J();Q();vv=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},dh=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},Tv=(r,e)=>r.length>e.length?dh(r,e):dh(e,r),_v=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=Tv(e,n),o=r[0].dataType,i=o===9?4:1,s=Math.ceil(A.size(t)/i),a=l=>{let c=P("input",o,e.length,i),f=C("output",o,t.length,i),d;if(o===9){let m=(p,h,b="")=>`
          let outputIndices${h} = ${f.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${c.broadcastedIndicesToOffset(`outputIndices${h}`,f)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${p}[${h}] = ${b}(${c.getByOffset(`index${h}`)}[component${h}]);
        `;d=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${m("data",0,"u32")}
        ${m("data",1,"u32")}
        ${m("data",2,"u32")}
        ${m("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else d=`
        let outputIndices = ${f.offsetToIndices("global_idx")};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",f)};
        ${f.setByOffset("global_idx",c.getByOffset("inputOffset"))}
      }`;return`
    ${l.registerUniform("vec_size","u32").declareVariables(c,f)}
    ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${d}`},u=[{type:12,data:s},...B(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},ph=r=>{vv(r.inputs),r.compute(_v(r.inputs),{inputs:[0]})}});var Iv,hh,gh=S(()=>{"use strict";q();J();Q();Lo();Iv=r=>{let e=r[0].dataType,n=A.size(r[0].dims),t=A.size(r[1].dims),o=t%4===0,i=s=>{let a=P("x",e,[1],4),u=P("bias",e,[1],4),l=C("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=m=>`
      let bias${m}_offset: u32 = (global_idx * 4 + ${m}) % uniforms.bias_size;
      let bias${m} = ${u.getByOffset(`bias${m}_offset / 4`)}[bias${m}_offset % 4];`,d=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(a,u,l)}

    ${Sa(Re(e))}

    ${s.mainStart(hr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${d}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",$a("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/hr/4)}})}},hh=r=>{r.inputs.length<2||A.size(r.inputs[1].dims)===0?pm(r):r.compute(Iv(r.inputs))}});var Sv,$v,bh,yh,xh=S(()=>{"use strict";q();J();Pe();Q();Sv=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},$v=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=A.normalizeAxis(e.axis,o),s=n.slice(0);s.splice(i,1,...t);let a=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(A.size(s)/u),c=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...B(r[0].dims,r[1].dims,s)],f=d=>{let m=P("data",r[0].dataType,r[0].dims.length,u),p=P("inputIndices",r[1].dataType,r[1].dims.length),h=C("output",r[0].dataType,s.length,u),b=g=>{let x=t.length,v=`var indicesIndices${g}  = ${p.type.indices}(0);`;for(let _=0;_<x;_++)v+=`${x>1?`indicesIndices${g}[${_}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${_}]`:`outputIndices${g}`};`;v+=`
          var idx${g} = ${p.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${m.type.indices};
        `;for(let _=0,I=0;_<o;_++)_===i?(v+=`${o>1?`dataIndices${g}[${_}]`:`dataIndices${g}`} = u32(idx${g});`,I+=x):(v+=`${o>1?`dataIndices${g}[${_}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${I}]`:`outputIndices${g}`};`,I++);return v},y;if(r[0].dataType===9){let g=(x,v,_="")=>`
          let outputIndices${v} = ${h.offsetToIndices(`outputOffset + ${v}u`)};
          ${b(v)};
          let offset${v} = ${m.indicesToOffset(`dataIndices${v}`)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${_}(${m.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${m.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${d.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,p,h)}
      ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:f}},bh=r=>X({axis:r.axis}),yh=(r,e)=>{let n=r.inputs;Sv(n),r.compute($v(r.inputs,e))}});var Av,Pv,wh,vh,Th=S(()=>{"use strict";q();J();Pe();Q();Av=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=A.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],s=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Pv=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=A.normalizeAxis(e.gatherAxis,o),s=A.normalizeAxis(e.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...t);let u=A.size(a),l=r[2].dataType,f=r[0].dataType===22,d=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...B(...r.map((p,h)=>p.dims),a)],m=p=>{let h=P("data",r[0].dataType,r[0].dims.length),b=P("inputIndices",r[1].dataType,r[1].dims.length),y=P("scales",r[2].dataType,r[2].dims.length),g=r.length>3?P("zeroPoint",r[3].dataType,r[3].dims.length):void 0,x=C("output",l,a.length),v=[h,b,y];g&&v.push(g);let _=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${p.registerUniforms(_).declareVariables(...v,x)}
        ${p.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${h.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${h.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${h.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${y.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${y.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${y.getByIndices("scale_indices")};
        ${(()=>g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${Re(l)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((p,h)=>h!==1).map(p=>p.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(p,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:m}},wh=(r,e)=>{let n=r.inputs;Av(n,e),r.compute(Pv(r.inputs,e))},vh=r=>X({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var Ov,Ev,_h,Ih,Sh=S(()=>{"use strict";q();J();Pe();Q();Ov=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ev=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,s=r[1].dataType,a=A.normalizeAxis(e.axis,o),u=n[a],l=i.slice(0),c=A.size(l),f=P("input",t,o),d=P("indicesInput",s,i.length),m=C("output",t,l.length),p=[{type:12,data:c},{type:6,data:u},{type:12,data:a}];return p.push(...B(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,d,m)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${d.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}},_h=r=>X({axis:r.axis}),Ih=(r,e)=>{let n=r.inputs;Ov(n),r.compute(Ev(r.inputs,e))}});var Cv,kv,$h,Ah,Ph=S(()=>{"use strict";q();J();Q();Cv=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},kv=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,s]=Oo.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=A.size(a),l=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],c=["type","type"];r.length===3&&(l.push(...B(r[2].dims)),c.push("rank")),l.push(...B(a));let f=d=>{let m="";e.transA&&e.transB?m="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?m="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?m="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(m="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let p=e.alpha===1?"":"value *= uniforms.alpha;",h=P("a",r[0].dataType,r[0].dims),b=P("b",r[1].dataType,r[1].dims),y=h.type.value,g=null,x=[h,b];r.length===3&&(g=P("c",r[2].dataType,r[2].dims.length),x.push(g));let v=C("output",r[0].dataType,a.length);x.push(v);let _=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${d.registerUniforms(_).declareVariables(...x)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${y}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${m}
    }

    ${p}
    ${(()=>g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",v)}; value += ${y}(uniforms.beta) * ${g.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:f}},$h=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Ah=(r,e)=>{Cv(r.inputs),r.compute(kv(r.inputs,e))}});var et,Lv,Eh,Oh,zv,dn,Ch,Na=S(()=>{"use strict";q();J();Pe();Po();Do();Q();Zt();et=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,Lv=(r,e)=>{let n=r[0],t=et(r,1),o=et(r,2),i=et(r,3),s=et(r,4),a=et(r,5),u=et(r,6),l=et(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],f=n.dims[1],d=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],m=f,p=0,h=0,b=Math.floor(d/e.numHeads);if(u&&l&&A.size(u.dims)&&A.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=u.dims[2],h=u.dims[2]}else if(u&&A.size(u.dims)||l&&A.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(t&&A.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,m=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,m=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,m=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i&&A.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=p+m,x=0;if(s&&A.size(s.dims)>0){x=8;let O=s.dims;throw O.length===1?O[0]===c?x=1:O[0]===3*c+2&&(x=3):O.length===2&&O[0]===c&&O[1]===g&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let v=!1,_=d;if(o&&A.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');_=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');_=o.dims[1]*o.dims[3],v=!0}}let I=!1;if(s&&A.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&A.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==c||a.dims[1]!==e.numHeads||a.dims[2]!==f||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:p,kvSequenceLength:m,totalSequenceLength:g,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:d,vHiddenSize:_,headSize:b,vHeadSize:Math.floor(_/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:I,passPastInKv:v,qkvFormat:y}},Eh=r=>X({...r}),Oh=X({perm:[0,2,1,3]}),zv=(r,e,n,t,o,i,s)=>{let a=[t,o,i],u=A.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],c=f=>{let d=C("qkv_with_bias",e.dataType,a),m=P("qkv",e.dataType,a),p=P("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(h).declareVariables(m,p,d)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,n],outputs:[-1]})[0]},dn=(r,e,n,t,o,i,s,a)=>{let u=i;if(s&&A.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=zv(r,i,s,e,t,n*o,a),u=u.reshape([e,t,n,o]),r.compute(He(u,Oh.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),r.compute(He(u,Oh.perm),{inputs:[u],outputs:[-1]})[0]},Ch=(r,e)=>{let n=Lv(r.inputs,e),t=r.inputs[0],o=et(r.inputs,1),i=et(r.inputs,2),s=et(r.inputs,3),a=et(r.inputs,4),u=et(r.inputs,5),l=et(r.inputs,6),c=et(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,d=dn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,s,0);if(f)return Br(r,d,o,i,a,void 0,l,c,u,n,e);if(!o||!i)throw new Error("key and value must be provided");let m=dn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),p=dn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Br(r,d,m,p,a,void 0,l,c,u,n,e)}});var kh,Rv,Nv,Va,Dh,Fa=S(()=>{"use strict";q();J();Q();kh=r=>Array.from(r.getBigInt64Array(),Number),Rv=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(kh(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Nv=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},Va=(r,e)=>{let n=r[0].dims,t=e??kh(r[1]),o=Nv(n,t),i=A.size(o),s=r[0].dataType,a=P("input",s,n.length),u=C("output",s,o.length),l=c=>`
      const inputShape = ${a.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(a,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...B(r[0].dims,o)]}),getShaderSource:l}},Dh=r=>{Rv(r.inputs),r.compute(Va(r.inputs),{inputs:[0]})}});var Vv,Bh,zh,Fv,Lh,Rh,Nh=S(()=>{"use strict";q();J();Pe();Do();Q();Na();Fa();Zt();Vv=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4];if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],c=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],f=l,d=0,m=0,p=Math.floor(c/e.numHeads),h=i&&i.dims.length!==0,b=s&&s.dims.length!==0,y=!0;if(h&&b){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y?(d=i.dims[1],m=i.dims[1]):(d=i.dims[2],m=i.dims[2])}else if(h||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(t){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=2,f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==p)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==p)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,f=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let x=0,v=!1,_=c;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');_=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');_=o.dims[1]*o.dims[3],v=!0}}let I=d+f,O=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:d,kvSequenceLength:f,totalSequenceLength:I,maxSequenceLength:m,inputHiddenSize:0,hiddenSize:c,vHiddenSize:_,headSize:p,vHeadSize:Math.floor(_/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:e.scale,broadcastResPosBias:O,passPastInKv:v,qkvFormat:g,isPastkvBSNH:y}},Bh=(r,e,n,t)=>{let o=[t.batchSize,t.totalSequenceLength,t.kvNumHeads,t.headSize],i=4,s=A.size(o)/i,a=t.totalSequenceLength,u=C("present_kv",n,o.length,i),l=P("new_kv",r.dataType,r.dims.length,i),c=e?P("past_kv",e.dataType,e.dims.length,i):void 0,f=Math.ceil(t.headSize/i),d={x:a,y:r.dims[0],z:1},m=e?["rank","rank"]:["rank"],p=[{type:12,data:s},{type:12,data:t.pastSequenceLength},{type:12,data:t.kvSequenceLength},{type:12,data:t.totalSequenceLength}],h=[l];c?(p.push(...B(r.dims),...B(e.dims),...B(o)),h.push(c)):p.push(...B(r.dims),...B(o));let b=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],y=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,g=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,x=e?`if (s < past_seqlen) {
        ${y}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${g}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${g}
        }`,v=_=>`

  ${_.registerUniforms(b).declareVariables(...h,u)}
  ${_.mainStart([f,t.kvNumHeads,1])}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${u.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${t.kvNumHeads}u;
    let H = ${f}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${t.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${x}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${t.kvNumHeads}${f}${!!e}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:d,programUniforms:p}),getShaderSource:v}},zh=r=>X({...r}),Fv=X({perm:[0,2,1,3]}),Lh=(r,e,n,t,o)=>{let i=e,s=t.kvNumHeads,a=t.nReps;return e.dims.length===3&&t.kvSequenceLength!==0&&(i=e.reshape([t.batchSize,t.kvSequenceLength,s,t.headSize])),n?i=r.compute(Bh(i,n,i.dataType,t),{inputs:[i,n],outputs:[t.isPastkvBSNH?o:-1]})[0]:i=r.compute(Bh(i,void 0,i.dataType,t),{inputs:[i],outputs:[t.isPastkvBSNH?o:-1]})[0],a!==1&&(i=r.compute(Va([i],[1,1,1,a]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([t.batchSize,t.totalSequenceLength,s*a,t.headSize])),r.compute(He(i,Fv.perm),{inputs:[i],outputs:[-1]})[0]},Rh=(r,e)=>{let n=Vv(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=dn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r.inputs[0],void 0,0),o=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,i=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,s=Lh(r,r.inputs[1],o,n,1),a=Lh(r,r.inputs[2],i,n,2);Br(r,t,s,a,void 0,void 0,void 0,void 0,void 0,n,e)}});var Vh,Gv,Mv,Fh,Gh=S(()=>{"use strict";q();J();Zt();Q();Vh=(r,e,n,t,o,i,s,a)=>{let u=xe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,f=o*s,d=[o,s,i/u],m=[o,s,2],p=["rank","type","type"],h=[];h.push(...B(d,m));let b=y=>{let g=P("x",e.dataType,3,u),x=P("scale",n.dataType,n.dims),v=P("bias",t.dataType,t.dims),_=C("output",1,3,2),I=[g,x,v,_],O=64;return`
  var<workgroup> workgroup_shared : array<${c}, ${O}>;
  const workgroup_size = ${O}u;
  ${y.declareVariables(...I)}
  ${y.mainStart(O)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${g.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${St("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${St("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:f},programUniforms:h}),getShaderSource:b},{inputs:[e,n,t],outputs:[-1]})[0]},Gv=(r,e,n)=>{let t=e[0].dims,o=t,i=2,s=t[0],a=t[1],u=A.sizeFromDimension(t,i),l=xe(u),c=A.size(o)/l,f=Vh(r,e[0],e[1],e[2],s,u,a,n.epsilon),d=[s,a,u/l],m=[s,a],p=["type","none"],h=b=>{let y=P("x",e[0].dataType,d.length,l),g=P("scale_shift",1,m.length,2),x=C("output",e[0].dataType,d.length,l),v=[y,g,x];return`
  ${b.registerUniform("output_size","u32").declareVariables(...v)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...B(d,m,d)]}),getShaderSource:h},{inputs:[e[0],f]})},Mv=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=A.sizeFromDimension(t,1)/s,u=xe(s),l=A.size(o)/u,c=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],f=["type","type"],d=[0,t.length-1];for(let b=0;b<t.length-2;b++)d.push(b+1);let m=r.compute(He(r.inputs[0],d),{inputs:[r.inputs[0]],outputs:[-1]})[0],p=Vh(r,m,e[1],e[2],i,a,s,n.epsilon),h=b=>{let y=he(e[0].dataType),g=u===1?"vec2f":`mat${u}x2f`,x=I=>{let O=I===0?"x":"y",E=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${y}(${E}(scale.${O}))`;case 2:return`vec2<${y}>(${E}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${y}>(${E}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${u}`)}},v=P("input",e[0].dataType,e[0].dims,u),_=C("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${v.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${g}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${_.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${b.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${x(0)}, ${x(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:h},{inputs:[e[0],p]})},Fh=(r,e)=>{e.format==="NHWC"?Mv(r,r.inputs,e):Gv(r,r.inputs,e)}});var Uv,Wv,Mh,Uh=S(()=>{"use strict";q();J();Q();Uv=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Wv=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],s=!t&&r[2],a=o,u=A.normalizeAxis(e.axis,o.length),l=A.sizeToDimension(o,u),c=A.sizeFromDimension(o,u),f=A.size(i.dims),d=s?A.size(s.dims):0;if(f!==c||s&&d!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${d}`);let m=[];for(let _=0;_<o.length;++_)_<u?m.push(o[_]):m.push(1);let p=xe(c),h=["type","type"],b=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/p)},{type:1,data:e.epsilon}];s&&h.push("type");let y=n>1,g=n>2,x=_=>{let I=he(r[0].dataType),O=[P("x",r[0].dataType,r[0].dims,p),P("scale",i.dataType,i.dims,p)];s&&O.push(P("bias",s.dataType,s.dims,p)),O.push(C("output",r[0].dataType,a,p)),y&&O.push(C("mean_data_output",1,m)),g&&O.push(C("inv_std_output",1,m));let E=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${_.registerUniforms(E).declareVariables(...O)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${va("f32",p)};
    var mean_square_vector = ${va("f32",p)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${gr(I,p,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${St("mean_vector",p)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${St("mean_square_vector",p)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${gr(I,p,"x[j + offset]")};
      let f32scale = ${gr(I,p,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${gr(I,p,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},v=[{dims:a,dataType:r[0].dataType}];return y&&v.push({dims:m,dataType:1}),g&&v.push({dims:m,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${p};${n};${t}`,inputDependencies:h},getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:b}),getShaderSource:x}},Mh=(r,e)=>{Uv(r.inputs),r.compute(Wv(r.inputs,e,r.outputCount))}});var Hv,qv,Wh,Hh,qh=S(()=>{"use strict";q();J();Pe();Q();Hv=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=r[1];if(!A.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(A.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let c=r[3].dims,f=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(A.size(c)!==f)throw new Error("zeroPoints input size error.")}},qv=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=A.size(a),c=r[1].dims[2]/4,f=r[0].dataType,d=xe(e.k),m=xe(c),p=xe(s),h=a.concat([o,s]),b=o>1&&s/p%2===0?2:1,y=A.size(h)/p/b,g=64,x=[],v=[u,o,i/d],_=A.convertShape(r[1].dims).slice();_.splice(-1,1,c/m),x.push(...B(v)),x.push(...B(_)),x.push(...B(r[2].dims)),r.length===4&&x.push(...B(A.convertShape(r[3].dims)));let I=[u,o,s/p];x.push(...B(I));let O=E=>{let z=v.length,N=P("a",r[0].dataType,z,d),k=P("b",12,_.length,m),ue=P("scales",r[2].dataType,r[2].dims.length),re=[N,k,ue],ie=r.length===4?P("zero_points",12,r[3].dims.length):void 0;ie&&re.push(ie);let De=I.length,K=C("output",r[0].dataType,De,p),we=he(r[0].dataType),Se=(()=>{switch(d){case 1:return`array<${we}, 8>`;case 2:return`mat4x2<${we}>`;case 4:return`mat2x4<${we}>`;default:throw new Error(`${d}-component is not supported.`)}})(),Z=()=>{let ne=`
          // reuse a data
            var input_offset = ${N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Se};
            for (var j: u32 = 0; j < ${8/d}; j++) {
              a_data[j] = ${N.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let se=0;se<p*b;se++)ne+=`
            b_value = ${m===1?`b${se}_data`:`b${se}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Se}(${Array.from({length:4},(D,U)=>`${we}(b_value_lower[${U}]), ${we}(b_value_upper[${U}])`).join(", ")});
            b_dequantized_values = ${(()=>d===1?`${Se}(${Array.from({length:8},(D,U)=>`(b_quantized_values[${U}] - ${ie?`zero_point${se}`:"zero_point"}) * scale${se}`).join(", ")});`:`(b_quantized_values - ${Se}(${Array(8).fill(`${ie?`zero_point${se}`:"zero_point"}`).join(",")})) * scale${se};`)()};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(se/p)}]${p>1?`[${se%p}]`:""} += ${Array.from({length:8/d},(D,U)=>`${d===1?`a_data[${U}] * b_dequantized_values[${U}]`:`dot(a_data[${U}], b_dequantized_values[${U}])`}`).join(" + ")};
          `;return ne},ve=()=>{let ne=`
            var col_index = col * ${p};
            ${ie?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${we}(8);`}
            `;for(let se=0;se<p*b;se++)ne+=`
            let scale${se} = ${ue.getByOffset("col_index * nBlocksPerCol + block")};
            ${ie?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ie.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${se} = ${we}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ne},ae=()=>{let ne=`col_index = col * ${p};`;for(let se=0;se<p*b;se++)ne+=`
            let b${se}_data = ${k.getByIndices(`${k.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ne+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Se};
            var b_dequantized_values: ${Se};`,ne};return`
        var<workgroup> workgroup_shared: array<${K.type.value}, ${b*g}>;
        ${E.declareVariables(...re,K)}
        ${E.mainStart([g,1,1])}
          let output_indices = ${K.offsetToIndices(`(global_idx / ${g}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/d};
            ${ve()}
            for (var word: u32 = 0; word < ${c}; word += ${m}) {
              ${ae()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${Z()}
                word_offset += ${8/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${K.type.value} = ${K.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${K.setByIndices(`${K.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${d};${m};${p};${b};${g}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:f}],dispatchGroup:{x:y},programUniforms:x}),getShaderSource:O}},Wh=(r,e)=>{Hv(r.inputs,e),r.compute(qv(r.inputs,e))},Hh=r=>X(r)});var Kv,jv,Xv,Zv,Jv,Yv,Qv,eT,Kh,jh=S(()=>{"use strict";q();J();Q();Kv=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},jv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},Xv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Zv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k = i32(${F("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Jv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k -= i32(${F("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Yv=(r,e,n)=>{switch(n.mode){case 0:return jv(r,e,n.pads.length);case 1:return Xv(r,e,n.pads.length);case 2:return Zv(r,e,n.pads.length);case 3:return Jv(r,e,n.pads.length);default:throw new Error("Invalid mode")}},Qv=(r,e)=>{let n=A.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=A.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],s=r.length>=3&&r[2].data;e.mode===0&&i.push({type:s?r[2].dataType:1,data:e.value}),i.push(...B(r[0].dims,n));let a=["rank"],u=l=>{let c=C("output",r[0].dataType,n.length),f=P("x",r[0].dataType,t.length),d=f.type.value,m=Yv(c,t.length,e),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&p.push({name:"constant_value",type:s?d:"f32"}),`
            ${l.registerUniforms(p).declareVariables(f,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${d}(0);
            ${m}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(n)/64)},programUniforms:i}),getShaderSource:u}},eT=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let a=r[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},Kh=(r,e)=>{Kv(r.inputs);let n=eT(r.inputs,e);r.compute(Qv(r.inputs,n),{inputs:[0]})}});var Mo,Xh,Zh,Jh,Yh,tT,rT,Qh,eg,tg,rg,ng,og,ig,ag,sg,ug,lg,cg,fg=S(()=>{"use strict";Ue();q();J();Q();Mo=r=>{if(j.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},Xh=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();mr.adjustPoolAttributes(n,o,s,a,u,l);let c=mr.computePoolOutputShape(n,o,a,u,s,l,e.autoPad),f=Object.assign({},e);i?Object.assign(f,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let d=c.slice();return d.push(d.splice(1,1)[0]),[f,t?d:c]},Zh=(r,e)=>{let n=e.format==="NHWC",t=A.size(r),o=A.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],f=!!(l+c);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let d=!1;if(e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],p=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],b=e.pads[e.pads.length-2];d=!!(h+b),i.push({type:12,data:m},{type:12,data:p},{type:12,data:h},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,f,d]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=A.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,s,!!u,!1,!1]}},Jh=(r,e,n,t,o,i,s,a,u,l,c,f)=>{let d=o.format==="NHWC",m=e.type.value,p=C("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",b="",y="",g=n-(d?2:1);if(c?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let v=n-(d?3:2);f?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${v}] < 0 || xIndices[${v}] >= uniforms.x_shape[${v}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,p)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${p.offsetToIndices("global_idx")};
              var xIndices = ${p.offsetToIndices("global_idx")};

              var value = ${m}(${a});
              var pad = 0;
              ${b}
              ${h}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(d)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,b=o.pads.length,y="";return l?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:y=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,p)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${p.offsetToIndices("global_idx")};
              var xIndices = ${p.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${m}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${F("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},Yh=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,tT=r=>`${Yh(r)};${r.countIncludePad}`,rT=r=>`${Yh(r)};${r.storageOrder};${r.dilations}`,Qh=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),eg=(r,e,n,t)=>{let[o,i]=Xh(e,t,n),s=P("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[c,f,d,m,p]=Zh(i,o);c.push(...B(e.dims,i));let h=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${d};${m};${p}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(A.size(i)/64)},programUniforms:c}),getShaderSource:b=>Jh(b,s,e.dims.length,i.length,o,u,l,0,f,d,m,p)}},tg=r=>{let e=r.count_include_pad!==0,n=Qh(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:tT(t)}},rg=(r,e)=>{Mo(r.inputs),r.compute(eg("AveragePool",r.inputs[0],!1,e))},ng={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},og=r=>{let e=r.format;return{format:e,...ng,cacheKey:e}},ig=(r,e)=>{Mo(r.inputs),r.compute(eg("GlobalAveragePool",r.inputs[0],!0,e))},ag=(r,e,n,t)=>{let[o,i]=Xh(e,t,n),s=`
      value = max(x_val, value);
    `,a="",u=P("x",e.dataType,e.dims.length),l=["rank"],[c,f,d,m,p]=Zh(i,o);return c.push(...B(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${d};${m};${p}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(A.size(i)/64)},programUniforms:c}),getShaderSource:h=>Jh(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,f,d,m,p)}},sg=(r,e)=>{Mo(r.inputs),r.compute(ag("MaxPool",r.inputs[0],!1,e))},ug=r=>{let e=r.storage_order,n=r.dilations,t=Qh(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:rT(o)}},lg=r=>{let e=r.format;return{format:e,...ng,cacheKey:e}},cg=(r,e)=>{Mo(r.inputs),r.compute(ag("GlobalMaxPool",r.inputs[0],!0,e))}});var oT,iT,dg,pg,mg=S(()=>{"use strict";q();J();Pe();Q();oT=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},iT=(r,e)=>{let n=A.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,s=r[1].dataType,a=A.size(i),u=t===3||t===2,l=u?[Math.ceil(A.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,f=r.length>2?r[2]:void 0,d=f?u?[Math.ceil(A.size(f.dims)/4)]:f.dims:void 0,m=c.length===0||c.length===1&&c[0]===1,p=m===!1&&c.length===1,h=xe(a),b=m&&(!u||h===4),y=b?h:1,g=b&&!u?h:1,x=P("input",u?12:t,l.length,g),v=P("scale",s,c.length),_=f?P("zero_point",u?12:t,d.length):void 0,I=C("output",s,i.length,y),O=[x,v];_&&O.push(_);let E=[l,c];f&&E.push(d);let z=[{type:12,data:a/y},{type:12,data:n},{type:12,data:e.blockSize},...B(...E,i)],N=k=>{let ue=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${k.registerUniforms(ue).declareVariables(...O,I)}
      ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>m?`let scale_value= ${v.getByOffset("0")}`:p?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>_?m?u?`
                let zero_point_input = ${_.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${_.getByOffset("0")}`:p?u?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${_.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${_.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${_.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${_.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":x.type.value}(0);`)()};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getShaderSource:N,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:z})}},dg=(r,e)=>{oT(r.inputs,e),r.compute(iT(r.inputs,e))},pg=r=>X({axis:r.axis,blockSize:r.blockSize})});var aT,sT,hg,gg=S(()=>{"use strict";Ue();q();Q();aT=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},sT=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:r},{type:t,data:n},...B(i)],u=l=>{let c=C("output",t,i.length),f=c.type.value,d=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${l.registerUniforms(d).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},hg=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),j.webgpu.validateInputContent&&aT(e,n,t),r.compute(sT(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var uT,lT,cT,fT,dT,pT,mT,hT,gT,bT,yT,bg,xT,wT,vT,TT,_T,yg,xg,wg=S(()=>{"use strict";q();J();Pe();Q();uT=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},lT=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},cT=(r,e,n,t,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(s>0&&r.length>s&&r[s].dims.length>0)r[s].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&r.length>a&&r[a].dims.length>0){if(r[a].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");uT(t,e),e.axes.length>0&&lT(t,e.axes,l).forEach((c,f)=>t[f]=c)}if(u>0&&r.length>u&&(r[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==l||n>=18&&o.length===e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},fT=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`return ${e}(xResized) / ${e}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${e}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${e}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${e}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",dT=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",pT=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+n]=o[e.length+s]}),t):o},mT=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,s)=>Math.round(i*e[s]))}return o},hT=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},gT=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",t)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,bT=(r,e,n,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${F("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${F("uniforms.roi","i",i)};
          var roi_hi = ${F("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${F("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${r.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,yT=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,bg=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",xT=(r,e,n,t,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${bg(r,l,s,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${a}];
      var col:${c} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},wT=(r,e,n,t,o,i,s,a,u,l)=>{let c=n.length===2,f=!0,[d,m]=c?[0,1]:f?[2,3]:[1,2],p=r.type.value,h=b=>{let y=b===d?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${p} {
        var output_index = ${e.indicesGet("output_indices",b)};
        var originalIdx: ${p} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[b]},
        ${t[b]}, ${n[b]}, ${i[b]}, ${i[b]} + ${n.length});
        var fractOriginalIdx: ${p} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[b]} - 1))) {
          return ${u};
        }
        var data: array<${p}, 4> = array<${p}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${p} = originalIdx + ${p}(i);
          if (${y} < 0 || ${y} >= ${n[b]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${n[b]} - 1));`)()};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",b,`u32(${y})`)};
          data[i + 1] = ${b===d?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(d)};
    ${h(m)};
  fn getCubicInterpolationCoefs(s: ${p}) -> array<${p}, 4> {
    var absS = abs(s);
    var coeffs: array<${p}, 4> = array<${p}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${p} = 1.0 - absS;
    var twoMinusAbsS: ${p} = 2.0 - absS;
    var onePlusAbsS: ${p} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${p}, 4>, coefs: array<${p}, 4>) -> ${p} {
    var coefsSum: ${p} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${p} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},vT=(r,e,n,t,o)=>{let[s,a,u,l,c]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${bg(r,c,s,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${a}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},TT=(r,e,n,t,o,i)=>{let s=r.dims,a=pT(i,e.axes,s.length),u=mT(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((g,x)=>g===0?1:u[x]/g),e.keepAspectRatioPolicy!=="stretch"&&(u=hT(s,l,e)));let c=C("output",r.dataType,u.length),f=P("input",r.dataType,s.length),d=A.size(u),m=s.length===u.length&&s.every((g,x)=>g===u[x]),p=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,b=f.type.value,y=g=>`
      ${m?"":`
      ${fT(e.coordinateTransformMode,b)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${yT(f,s)};
              ${dT(e.nearestMode,n,b)};
              ${bT(f,c,s,u,l.length,a.length,p)};
              `;case"linear":return`
              ${gT(c,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${xT(f,c,s,p,h)}`;if(s.length===3||s.length===5)return`${vT(f,c,s,p,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${wT(f,c,s,u,l,a,e.cubicCoeffA,p,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(f,c)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${m?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${m}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},{type:1,data:l},{type:1,data:a},...B(s,u)]})}},_T=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},yg=(r,e)=>{let n=[],t=[],o=[],i=_T(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");cT(r.inputs,e,i,n,t,o),r.compute(TT(r.inputs[0],e,i,n,t,o),{inputs:[0]})},xg=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,s=r.extrapolationValue,a=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return X({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var IT,ST,vg,Tg=S(()=>{"use strict";q();J();Pe();Q();IT=(r,e)=>{let[n,t,o,i]=r,{numHeads:s,rotaryEmbeddingDim:a}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!A.areEqual(t.dims,[])&&!A.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!A.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],c=o.dims[0],f=A.sizeFromDimension(n.dims,1)/l,d=a===0?o.dims[1]*2:f/s;if(a>d)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(d/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},ST=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=r[0].dims[0],a=A.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=a/u,c=r[2].dims[1],f=o===0?c*2:l/t,d=new Array(s,u,l/f,f-c),m=A.computeStrides(d),p=[{type:1,data:i},{type:12,data:d},{type:12,data:m},...r[0].dims.length===3?new Array({type:12,data:[a,l,f,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[a,f,u*f,1]}):[],...B(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],h=b=>{let y=P("input",r[0].dataType,r[0].dims.length),g=P("position_ids",r[1].dataType,r[1].dims.length),x=P("cos_cache",r[2].dataType,r[2].dims.length),v=P("sin_cache",r[3].dataType,r[3].dims.length),_=C("output",r[0].dataType,r[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:d.length},{name:"global_strides",type:"u32",length:m.length},{name:"input_output_strides",type:"u32",length:m.length}]),`
        ${b.declareVariables(y,g,x,v,_)}

        ${b.mainStart(hr)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",C("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${y.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${v.get("position_id","bsnh[3]")};
            ${_.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${v.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${_.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${_.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:X({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(d)/hr)},programUniforms:p})}},vg=(r,e)=>{IT(r.inputs,e),r.compute(ST(r.inputs,e))}});var $T,AT,_g,Ig=S(()=>{"use strict";q();J();Q();$T=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let s=r[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let s=r[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},AT=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,s=A.size(i),a=i,u=s,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],f=!o&&r.length>3,d=r.length>4,m=t&&n>1,p=t&&n>2,h=n>3,b=64,y=xe(l),g=[{type:12,data:u},{type:12,data:y},{type:12,data:l},{type:1,data:e.epsilon}],x=_=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",r[0].dataType,r[0].dims,y),P("skip",r[1].dataType,r[1].dims,y),P("gamma",r[2].dataType,r[2].dims,y)];f&&O.push(P("beta",r[3].dataType,r[3].dims,y)),d&&O.push(P("bias",r[4].dataType,r[4].dims,y)),O.push(C("output",r[0].dataType,a,y)),m&&O.push(C("mean_output",1,c)),p&&O.push(C("inv_std_output",1,c)),h&&O.push(C("input_skip_bias_sum",r[0].dataType,a,y));let E=he(r[0].dataType),z=he(1,y);return`

      ${_.registerUniforms(I).declareVariables(...O)}
      var<workgroup> sum_shared : array<${z}, ${b}>;
      var<workgroup> sum_squared_shared : array<${z}, ${b}>;

      ${_.mainStart([b,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${d?"bias[offset1d + i]":E+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${gr(E,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${St("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${St("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${m?"mean_output[global_idx] = mean;":""}
        ${p?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${E}(mean)`}) *
            ${E}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},v=[{dims:a,dataType:r[0].dataType}];return n>1&&v.push({dims:c,dataType:1}),n>2&&v.push({dims:c,dataType:1}),n>3&&v.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${m};${p};${h}`,inputDependencies:r.map((_,I)=>"type")},getShaderSource:x,getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:g})}},_g=(r,e)=>{$T(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(AT(r.inputs,e,r.outputCount,!1),{outputs:t})}});var PT,Uo,OT,Sg,ET,CT,$g,Ag,Pg=S(()=>{"use strict";q();J();Pe();Q();PT=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Uo=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},OT=(r,e)=>{if(r.length>1){let n=Uo(r,1),t=Uo(r,2),o=Uo(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),X({starts:n,ends:t,axes:o})}else return e},Sg=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},ET=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",n.length)};
            let steps_i = ${F("uniforms.steps","i",n.length)};
            let signs_i = ${F("uniforms.signs","i",n.length)};
            let starts_i = ${F("uniforms.starts","i",n.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,CT=(r,e)=>{let n=r[0].dims,t=A.size(n),o=e.axes.length>0?A.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Uo(r,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((y,g)=>Sg(y,g,n,o,i)),a=e.ends.map((y,g)=>Sg(y,g,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let y=0;y<n.length;++y)o.includes(y)||(s.splice(y,0,0),a.splice(y,0,n[y]),i.splice(y,0,1));let u=i.map(y=>Math.sign(y));i.forEach((y,g,x)=>{if(y<0){let v=(a[g]-s[g])/y,_=s[g],I=_+v*i[g];s[g]=I,a[g]=_,x[g]=-y}});let l=n.slice(0);o.forEach((y,g)=>{l[y]=Math.ceil((a[y]-s[y])/i[y])});let c={dims:l,dataType:r[0].dataType},f=C("output",r[0].dataType,l.length),d=P("input",r[0].dataType,r[0].dims.length),m=A.size(l),p=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:m},{type:12,data:s},{type:6,data:u},{type:12,data:i},...B(r[0].dims,l)],b=y=>`
      ${y.registerUniforms(p).declareVariables(d,f)}
        ${ET(d,f,n)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",d.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},$g=(r,e)=>{PT(r.inputs,e);let n=OT(r.inputs,e);r.compute(CT(r.inputs,n),{inputs:[0]})},Ag=r=>{let e=r.starts,n=r.ends,t=r.axes;return X({starts:e,ends:n,axes:t})}});var kT,DT,Og,Eg,Cg=S(()=>{"use strict";q();J();Pe();Q();kT=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},DT=(r,e)=>{let n=r.dims,t=A.size(n),o=64,i=e.axis;if(i<0&&(i=n.length+i),i<n.length-1)throw new Error("softmax only supports last axis for now.");let s=n[i],a=t/s,u=xe(s),l=s/u,c=(b,y)=>y===4?`max(max(${b}.x, ${b}.y), max(${b}.z, ${b}.w))`:y===2?`max(${b}.x, ${b}.y)`:y===3?`max(max(${b}.x, ${b}.y), ${b}.z)`:b,f=P("x",r.dataType,r.dims,u),d=C("result",r.dataType,r.dims,u),m=f.type.value,p=he(r.dataType)==="f32"?`var threadMax = ${m}(-3.402823e+38f);`:`var threadMax = ${m}(-65504.0h);`,h=b=>`
      var<workgroup> rowMaxShared : ${m};
      var<workgroup> rowSumShared : ${m};
      var<workgroup> threadShared : array<${m}, ${o}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${m} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${m}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${b.registerUniform("packedCols","i32").declareVariables(f,d)}
      ${b.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${o};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${p}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${m}(${c("threadShared[0]",u)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${m}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${m}(${St("threadShared[0]",u)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${u}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.dataType}],dispatchGroup:{x:a},programUniforms:[{type:6,data:l}]}),getShaderSource:h}},Og=(r,e)=>{kT(r.inputs),r.compute(DT(r.inputs[0],e))},Eg=r=>X({axis:r.axis})});var BT,LT,zT,RT,NT,kg,Dg,Bg=S(()=>{"use strict";q();J();Pe();Q();BT=r=>{if(!r||r.length<1)throw new Error("too few inputs")},LT=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),X({numOutputs:t,axis:e.axis,splitSizes:n})},zT=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,RT=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},NT=(r,e)=>{let n=r[0].dims,t=A.size(n),o=r[0].dataType,i=A.normalizeAxis(e.axis,n.length),s=new Array(e.numOutputs),a=P("input",o,n.length),u=new Array(e.numOutputs),l=[],c=[],f=0,d=[{type:12,data:t}];for(let p=0;p<e.numOutputs;p++){f+=e.splitSizes[p],u[p]=f;let h=n.slice();h[i]=e.splitSizes[p],c.push(h),s[p]=C(`output${p}`,o,h.length),l.push({dims:c[p],dataType:r[0].dataType})}d.push({type:12,data:u},...B(n,...c));let m=p=>`
  ${p.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${zT(u.length)}
  ${RT(s)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:d})}},kg=(r,e)=>{BT(r.inputs);let n=r.inputs.length===1?e:LT(r.inputs,e);r.compute(NT(r.inputs,n),{inputs:[0]})},Dg=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return X({axis:e,numOutputs:t,splitSizes:n})}});var VT,FT,Lg,zg=S(()=>{"use strict";q();J();Q();VT=(r,e,n,t,o)=>{let i=C("output_data",o,n.length,4),s=P("a_data",e[1].dataType,e[1].dims.length,4),a=P("b_data",e[2].dataType,e[2].dims.length,4),u=P("c_data",e[0].dataType,e[0].dims.length,4),l,c=(f,d,m)=>`select(${d}, ${f}, ${m})`;if(!t)l=i.setByOffset("global_idx",c(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(d,m,p="")=>{let h=`a_data[index_a${m}][component_a${m}]`,b=`b_data[index_b${m}][component_b${m}]`,y=`bool(c_data[index_c${m}] & (0xffu << (component_c${m} * 8)))`;return`
            let output_indices${m} = ${i.offsetToIndices(`global_idx * 4u + ${m}u`)};
            let offset_a${m} = ${s.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_b${m} = ${a.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_c${m} = ${u.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let index_a${m} = offset_a${m} / 4u;
            let index_b${m} = offset_b${m} / 4u;
            let index_c${m} = offset_c${m} / 4u;
            let component_a${m} = offset_a${m} % 4u;
            let component_b${m} = offset_b${m} % 4u;
            let component_c${m} = offset_c${m} % 4u;
            ${d}[${m}] = ${p}(${c(h,b,y)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},FT=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(A.areEqual(e,n)&&A.areEqual(n,t)),s=e,a=A.size(e);if(i){let l=Ct.calcShape(Ct.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=A.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>VT(l,r,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...B(t,e,n,s)]})}},Lg=r=>{r.compute(FT(r.inputs))}});var Rg,Ng=S(()=>{"use strict";Op();Do();kp();Bp();xm();Em();Dm();Km();eh();nh();ah();fh();mh();gh();xh();Th();Sh();Ph();Nh();Gh();Uh();Oa();qh();Na();jh();fg();mg();gg();Co();wg();Tg();Ig();Pg();Cg();Bg();Fa();Zt();Lo();zg();Rg=new Map([["Abs",[Lp]],["Acos",[zp]],["Acosh",[Rp]],["Add",[wm]],["ArgMax",[Pp,Ia]],["ArgMin",[Ap,Ia]],["Asin",[Np]],["Asinh",[Vp]],["Atan",[Fp]],["Atanh",[Gp]],["Attention",[Ep]],["AveragePool",[rg,tg]],["BatchNormalization",[Cp]],["BiasAdd",[Dp]],["BiasSplitGelu",[ym]],["Cast",[Up,Mp]],["Ceil",[Hp]],["Clip",[Wp]],["Concat",[Cm,km]],["Conv",[Da,ka]],["ConvTranspose",[Qm,Ym]],["Cos",[qp]],["Cosh",[Kp]],["CumSum",[th,rh]],["DepthToSpace",[oh,ih]],["DequantizeLinear",[dg,pg]],["Div",[vm]],["Einsum",[lh,ch]],["Elu",[jp,sn]],["Equal",[Tm]],["Erf",[Xp]],["Exp",[Zp]],["Expand",[ph]],["FastGelu",[hh]],["Floor",[Jp]],["FusedConv",[Da,ka]],["Gather",[yh,bh]],["GatherElements",[Ih,_h]],["GatherBlockQuantized",[wh,vh]],["Gelu",[Yp]],["Gemm",[Ah,$h]],["GlobalAveragePool",[ig,og]],["GlobalMaxPool",[cg,lg]],["Greater",[$m]],["GreaterOrEqual",[Pm]],["GroupQueryAttention",[Rh,zh]],["HardSigmoid",[am,im]],["InstanceNormalization",[Fh]],["LayerNormalization",[Mh]],["LeakyRelu",[Qp,sn]],["Less",[Am]],["LessOrEqual",[Om]],["Log",[hm]],["MatMul",[Hm]],["MatMulNBits",[Wh,Hh]],["MaxPool",[sg,ug]],["Mul",[_m]],["MultiHeadAttention",[Ch,Eh]],["Neg",[tm]],["Not",[em]],["Pad",[Kh]],["Pow",[Im]],["QuickGelu",[gm,sn]],["Range",[hg]],["Reciprocal",[rm]],["ReduceMin",[vp]],["ReduceMean",[gp]],["ReduceMax",[wp]],["ReduceSum",[_p]],["ReduceProd",[Tp]],["ReduceL1",[bp]],["ReduceL2",[yp]],["ReduceLogSum",[Sp]],["ReduceLogSumExp",[xp]],["ReduceSumSquare",[Ip]],["Relu",[nm]],["Resize",[yg,xg]],["RotaryEmbedding",[vg]],["Sigmoid",[om]],["Sin",[sm]],["Sinh",[um]],["Slice",[$g,Ag]],["SkipLayerNormalization",[_g]],["Split",[kg,Dg]],["Sqrt",[lm]],["Softmax",[Og,Eg]],["Sub",[Sm]],["Tan",[cm]],["Tanh",[dm]],["ThresholdedRelu",[mm,sn]],["Tile",[Dh]],["Transpose",[np,op]],["Where",[Lg]]])});var Wo,Vg=S(()=>{"use strict";Ue();Ft();Q();Wo=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){ot(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of n)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ze(e.programInfo.name)}dispose(){}build(e,n){ot(e.name);let t=this.backend.device,o=[];t.features.has("shader-f16")&&o.push("enable f16;");let i=tp(n,this.backend.device.limits),s=e.getShaderSource(i),a=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,u=t.createShaderModule({code:a,label:e.name});ye("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=t.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ze(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let s=n*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var GT,MT,Ga,Ho,Fg=S(()=>{"use strict";Ue();q();Ft();Kd();Yd();Ng();Vg();GT=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},MT=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${GT(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Ga=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ho=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t};n.features.has("chromium-experimental-timestamp-query-inside-passes")?t.push("chromium-experimental-timestamp-query-inside-passes"):n.features.has("timestamp-query")&&t.push("timestamp-query"),n.features.has("shader-f16")&&t.push("shader-f16"),this.device=await n.requestDevice(o),this.adapterInfo=new Ga(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Jd(this),this.programManager=new Wo(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Hd(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ot(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,c=i.programName,f=i.inputTensorViews,d=i.outputTensorViews,m=n[o*2],p=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let h=Number(m-this.queryTimeBase),b=Number(p-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(y=>({dims:y.dims,dataType:Xt(y.dataType)})),outputsMetadata:d.map(y=>({dims:y.dims,dataType:Xt(y.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:c,startTime:h,endTime:b});else{let y="";f.forEach((x,v)=>{y+=`input[${v}]: [${x.dims}] | ${Xt(x.dataType)}, `});let g="";d.forEach((x,v)=>{g+=`output[${v}]: [${x.dims}] | ${Xt(x.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${c}" ${y}${g}execution time: ${b-h} ns`)}Tn("GPU",`${c}::${m}::${p}`)}e.unmap(),this.pendingQueries.delete(e)}),Ze()}run(e,n,t,o,i,s){ot(e.name);let a=[];for(let x=0;x<n.length;++x){let v=n[x].data;if(v===0)continue;let _=this.gpuDataManager.get(v);if(!_)throw new Error(`no GPU data for input: ${v}`);a.push(_)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(n),f=t.length===0?u.map((x,v)=>v):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let d=[],m=[];for(let x=0;x<u.length;++x){if(!Number.isInteger(f[x])||f[x]<-3||f[x]>=s)throw new Error(`Invalid output index: ${f[x]}`);if(f[x]===-3)continue;let v=f[x]===-1,_=f[x]===-2,I=v||_?i(u[x].dataType,u[x].dims):o(f[x],u[x].dataType,u[x].dims);if(d.push(I),I.data===0)continue;let O=this.gpuDataManager.get(I.data);if(!O)throw new Error(`no GPU data for output: ${I.data}`);if(v&&this.temporaryData.push(O),_){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(O)}m.push(O)}if(a.length!==n.length||m.length!==d.length){if(m.length===0)return Ze(e.name),d;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let p;if(c){let x=0,v=[];c.forEach(E=>{let z=typeof E.data=="number"?[E.data]:E.data;if(z.length===0)return;let N=E.type===10?2:4,k,ue;E.type===10?(ue=z.length>4?16:z.length>2?8:z.length*N,k=z.length>4?16:N*z.length):(ue=z.length<=2?z.length*N:16,k=16),x=Math.ceil(x/ue)*ue,v.push(x);let re=E.type===10?8:4;x+=z.length>4?Math.ceil(z.length/re)*k:z.length*N});let _=16;x=Math.ceil(x/_)*_;let I=new ArrayBuffer(x);c.forEach((E,z)=>{let N=v[z],k=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(I,N,k.length).set(k);else if(E.type===12)new Uint32Array(I,N,k.length).set(k);else if(E.type===10)new Uint16Array(I,N,k.length).set(k);else if(E.type===1)new Float32Array(I,N,k.length).set(k);else throw new Error(`Unsupported uniform type: ${Xt(E.type)}`)});let O=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,I,0,x),this.gpuDataManager.release(O.id),p={offset:0,size:x,buffer:O.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),b=h[1]===1&&h[2]===1,y=MT(e,n,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(e,h),this.programManager.setArtifact(y,g),ye("info",()=>`[artifact] key: ${y}, programName: ${e.name}`)),c&&g.uniformVariablesInfo){if(c.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${c.length} in program "${g.programInfo.name}".`);for(let x=0;x<c.length;x++){let v=c[x],_=v.type,I=typeof v.data=="number"?1:v.data.length,[O,E]=g.uniformVariablesInfo[x];if(_!==O||I!==E)throw new Error(`Uniform variable ${x} mismatch: expect type ${O} with size ${E}, got type ${_} with size ${I} in program "${g.programInfo.name}".`)}}if(ye("info",()=>`[ProgramManager] run "${e.name}" (key=${y}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:n,outputTensorViews:d};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(g,a,m,h,p),Ze(e.name),d}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=Rg.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,s)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ye("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(t,o,s?.[1]);return i.set(n,[a,t]),a}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[1])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await ga(this,e,n);return qd(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ye("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ye("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ye("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var Gg={};Rr(Gg,{init:()=>UT});var pn,Ma,UT,Mg=S(()=>{"use strict";q();Fg();Ft();J();pn=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=A.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=A.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=A.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=A.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(A.size(e)!==A.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},Ma=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=e.HEAPU32,i=t>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let a=[];for(let u=0;u<s;u++){let l=o[i++],c=o[i++],f=o[i++],d=[];for(let m=0;m<f;m++)d.push(o[i++]);a.push(new pn(e,l,c,d))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(e,n){let t=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new pn(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=nn(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new pn(this.module,a,c,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.stackAlloc((1+n.length)*4),i=o>>2;this.module.HEAPU32[i++]=n.length;for(let s=0;s<n.length;s++)this.module.HEAPU32[i++]=n[s];return this.module._JsepOutput(this.opKernelContext,e,o)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},UT=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new Ho;await i.initialize(n,t),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,a,u,l=!1)=>{if(l)ye("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${a}, size=${u}`),i.memcpy(s,a);else{ye("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${a}, size=${u}`);let c=e.HEAPU8.subarray(s>>>0,(s>>>0)+u);i.upload(a,c)}},async(s,a,u)=>{ye("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(s,()=>e.HEAPU8.subarray(a>>>0,(a>>>0)+u))},(s,a,u)=>i.createKernel(s,a,u,e.UTF8ToString(e._JsepGetNodeName(a))),s=>i.releaseKernel(s),(s,a,u,l)=>{ye("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let c=new Ma(e,i,a);return i.computeKernel(s,c,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else o("webnn")}});var WT,bo,yo,br,HT,tn,xo,wo,Ug,vo,To,_o,sa=S(()=>{"use strict";Fd();Md();q();dr();So();da();WT=(r,e)=>{ke()._OrtInit(r,e)!==0&&$e("Can't initialize onnxruntime.")},bo=async r=>{WT(r.wasm.numThreads,on(r.logLevel))},yo=async(r,e)=>{{let n=(Mg(),gn(Gg)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",ke(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",ke(),r)}}},br=new Map,HT=r=>{let e=ke(),n=e.stackSave();try{let t=e.stackAlloc(8);return e._OrtGetInputOutputCount(r,t,t+4)!==0&&$e("Can't get session input/output count."),[e.HEAP32[t/4],e.HEAP32[t/4+1]]}finally{e.stackRestore(n)}},tn=r=>{let e=ke(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},xo=async(r,e)=>{let n,t,o=ke();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=tn(r);let i=0,s=0,a=0,u=[],l=[],c=[];try{if([s,u]=Gd(e),e?.externalData&&o.mountExternalData){let g=[];for(let x of e.externalData){let v=typeof x=="string"?x:x.path;g.push(an(typeof x=="string"?x:x.data).then(_=>{o.mountExternalData(v,_)}))}await Promise.all(g)}for(let g of e?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let v=g,_=v?.context,I=v?.gpuDevice,O=v?.deviceType,E=v?.numThreads,z=v?.powerPreference;_?o.currentContext=_:I?o.currentContext=await navigator.ml.createContext(I):o.currentContext=await navigator.ml.createContext({deviceType:O,numThreads:E,powerPreference:z})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(n,t,s),i===0&&$e("Can't create a session."),o.currentContext&&(o.currentContext=void 0);let[f,d]=HT(i),m=!!e?.enableGraphCapture,p=[],h=[],b=[];for(let g=0;g<f;g++){let x=o._OrtGetInputName(i,g);x===0&&$e("Can't get an input name."),l.push(x),p.push(o.UTF8ToString(x))}for(let g=0;g<d;g++){let x=o._OrtGetOutputName(i,g);x===0&&$e("Can't get an output name."),c.push(x);let v=o.UTF8ToString(x);h.push(v);{if(m&&e?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let _=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[v]??"cpu";if(_!=="cpu"&&_!=="cpu-pinned"&&_!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${_}.`);if(m&&_!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${_}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(_)}}let y=null;return b.some(g=>g==="gpu-buffer")&&(a=o._OrtCreateBinding(i),a===0&&$e("Can't create IO binding."),y={handle:a,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>fa(g))}),br.set(i,[i,l,c,y,m,!1]),[i,p,h]}catch(f){throw l.forEach(d=>o._OrtFree(d)),c.forEach(d=>o._OrtFree(d)),a!==0&&o._OrtReleaseBinding(a),i!==0&&o._OrtReleaseSession(i),f}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},wo=r=>{let e=ke(),n=br.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,s,a]=n;s&&(a&&e._OrtClearBoundOutputs(s.handle),e._OrtReleaseBinding(s.handle)),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t),br.delete(r)},Ug=(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let s=ke(),a=r[0],u=r[1],l=r[3],c,f;if(a==="string"&&l==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let p=r[2].gpuBuffer;f=nn(ca(a),u);let h=s.jsepRegisterBuffer;if(!h)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=h(t,o,p,f)}else{let p=r[2];if(Array.isArray(p)){f=4*p.length,c=s._malloc(f),n.push(c);let h=c/4;for(let b=0;b<p.length;b++){if(typeof p[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.HEAPU32[h++]=ze(p[b],n)}}else f=p.byteLength,c=s._malloc(f),n.push(c),s.HEAPU8.set(new Uint8Array(p.buffer,p.byteOffset,f),c)}let d=s.stackSave(),m=s.stackAlloc(4*u.length);try{let p=m/4;u.forEach(b=>s.HEAP32[p++]=b);let h=s._OrtCreateTensor(ca(a),c,f,m,u.length,fa(l));h===0&&$e(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(h)}finally{s.stackRestore(d)}},vo=async(r,e,n,t,o,i)=>{let s=ke(),a=br.get(r);if(!a)throw new Error(`cannot run inference. invalid session id: ${r}`);let u=a[0],l=a[1],c=a[2],f=a[3],d=a[4],m=a[5],p=e.length,h=t.length,b=0,y=[],g=[],x=[],v=[],_=s.stackSave(),I=s.stackAlloc(p*4),O=s.stackAlloc(p*4),E=s.stackAlloc(h*4),z=s.stackAlloc(h*4);try{[b,y]=Vd(i);for(let K=0;K<p;K++)Ug(n[K],g,v,r,e[K],d);for(let K=0;K<h;K++)Ug(o[K],x,v,r,p+t[K],d);let N=I/4,k=O/4,ue=E/4,re=z/4;for(let K=0;K<p;K++)s.HEAPU32[N++]=g[K],s.HEAPU32[k++]=l[e[K]];for(let K=0;K<h;K++)s.HEAPU32[ue++]=x[K],s.HEAPU32[re++]=c[t[K]];if(f&&!m){let{handle:K,outputPreferredLocations:we,outputPreferredLocationsEncoded:Se}=f;if(l.length!==p)throw new Error(`input count from feeds (${p}) is expected to be always equal to model's input count (${l.length}).`);for(let Z=0;Z<p;Z++){let ve=e[Z];await s._OrtBindInput(K,l[ve],g[Z])!==0&&$e(`Can't bind input[${Z}] for session=${r}.`)}for(let Z=0;Z<h;Z++){let ve=t[Z];o[Z]?.[3]?s._OrtBindOutput(K,c[ve],x[Z],0)!==0&&$e(`Can't bind pre-allocated output[${Z}] for session=${r}.`):s._OrtBindOutput(K,c[ve],0,Se[ve])!==0&&$e(`Can't bind output[${Z}] to ${we[Z]} for session=${r}.`)}br.set(r,[u,l,c,f,d,!0])}s.jsepOnRunStart?.(u);let ie;f?ie=await s._OrtRunWithBinding(u,f.handle,h,E,b):ie=await s._OrtRun(u,O,I,p,z,h,E,b),ie!==0&&$e("failed to call OrtRun().");let De=[];for(let K=0;K<h;K++){let we=s.HEAPU32[E/4+K];if(we===x[K]){De.push(o[K]);continue}let Se=s.stackSave(),Z=s.stackAlloc(4*4),ve=!1,ae,ne=0;try{s._OrtGetTensorData(we,Z,Z+4,Z+8,Z+12)!==0&&$e(`Can't access output tensor data on index ${K}.`);let D=Z/4,U=s.HEAPU32[D++];ne=s.HEAPU32[D++];let be=s.HEAPU32[D++],yt=s.HEAPU32[D++],Xe=[];for(let tt=0;tt<yt;tt++)Xe.push(s.HEAPU32[be/4+tt]);s._OrtFree(be);let Jt=Xe.reduce((tt,rt)=>tt*rt,1);ae=Xt(U);let qa=f?.outputPreferredLocations[t[K]];if(ae==="string"){if(qa==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let tt=[],rt=ne/4;for(let xr=0;xr<Jt;xr++){let Ka=s.HEAPU32[rt++],rb=xr===Jt-1?void 0:s.HEAPU32[rt]-Ka;tt.push(s.UTF8ToString(Ka,rb))}De.push([ae,Xe,tt,"cpu"])}else if(qa==="gpu-buffer"&&Jt>0){let tt=s.jsepGetBuffer;if(!tt)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let rt=tt(ne),xr=nn(U,Jt);if(xr===void 0||!Ao(ae))throw new Error(`Unsupported data type: ${ae}`);ve=!0,De.push([ae,Xe,{gpuBuffer:rt,download:s.jsepCreateDownloader(rt,xr,ae),dispose:()=>{s._OrtReleaseTensor(we)}},"gpu-buffer"])}else{let tt=$o(ae),rt=new tt(Jt);new Uint8Array(rt.buffer,rt.byteOffset,rt.byteLength).set(s.HEAPU8.subarray(ne,ne+rt.byteLength)),De.push([ae,Xe,rt,"cpu"])}}finally{s.stackRestore(Se),ae==="string"&&ne&&s._free(ne),ve||s._OrtReleaseTensor(we)}}return f&&!d&&(s._OrtClearBoundOutputs(f.handle),br.set(r,[u,l,c,f,d,!1])),De}finally{s.stackRestore(_),g.forEach(N=>s._OrtReleaseTensor(N)),x.forEach(N=>s._OrtReleaseTensor(N)),v.forEach(N=>s._free(N)),b!==0&&s._OrtReleaseRunOptions(b),y.forEach(N=>s._free(N))}},To=r=>{let e=ke(),n=br.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&$e("Can't get an profile file name."),e._OrtFree(o)},_o=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var yr,bt,mn,Ko,jo,qo,Ua,Wa,Lr,zr,KT,Wg,Hg,qg,Kg,jg,Xg,Zg,Ha=S(()=>{"use strict";Ue();sa();dr();en();yr=()=>!!j.wasm.proxy&&typeof document<"u",mn=!1,Ko=!1,jo=!1,Wa=new Map,Lr=(r,e)=>{let n=Wa.get(r);n?n.push(e):Wa.set(r,[e])},zr=()=>{if(mn||!Ko||jo||!bt)throw new Error("worker not ready")},KT=r=>{switch(r.data.type){case"init-wasm":mn=!1,r.data.err?(jo=!0,Ua[1](r.data.err)):(Ko=!0,Ua[0]()),qo&&(URL.revokeObjectURL(qo),qo=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Wa.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},Wg=async()=>{if(!Ko){if(mn)throw new Error("multiple calls to 'initWasm()' detected.");if(jo)throw new Error("previous call to 'initWasm()' failed.");if(mn=!0,yr())return new Promise((r,e)=>{bt?.terminate(),zd().then(([n,t])=>{try{bt=t,bt.onerror=i=>e(i),bt.onmessage=KT,Ua=[r,e];let o={type:"init-wasm",in:j};bt.postMessage(o),qo=n}catch(o){e(o)}},e)});try{await go(j.wasm),await bo(j),Ko=!0}catch(r){throw jo=!0,r}finally{mn=!1}}},Hg=async r=>{if(yr())return zr(),new Promise((e,n)=>{Lr("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:j}};bt.postMessage(t)});await yo(j,r)},qg=async r=>yr()?(zr(),new Promise((e,n)=>{Lr("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};bt.postMessage(t,[r.buffer])})):tn(r),Kg=async(r,e)=>{if(yr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return zr(),new Promise((n,t)=>{Lr("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),bt.postMessage(o,i)})}else return xo(r,e)},jg=async r=>{if(yr())return zr(),new Promise((e,n)=>{Lr("release",[e,n]);let t={type:"release",in:r};bt.postMessage(t)});wo(r)},Xg=async(r,e,n,t,o,i)=>{if(yr()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return zr(),new Promise((s,a)=>{Lr("run",[s,a]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};bt.postMessage(l,_o(u))})}else return vo(r,e,n,t,o,i)},Zg=async r=>{if(yr())return zr(),new Promise((e,n)=>{Lr("end-profiling",[e,n]);let t={type:"end-profiling",in:r};bt.postMessage(t)});To(r)}});var Jg,jT,Xo,Yg=S(()=>{"use strict";Ue();Ha();q();ho();da();Jg=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},jT=r=>{switch(r[3]){case"cpu":return new Ne(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Ao(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return Ne.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},Xo=class{async fetchModelAndCopyToWasmMemory(e){return qg(await an(e))}async loadModel(e,n){ot();let t;typeof e=="string"?!1?t=await an(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Kg(t,n),Ze()}async dispose(){return jg(this.sessionId)}async run(e,n,t){ot();let o=[],i=[];Object.entries(e).forEach(d=>{let m=d[0],p=d[1],h=this.inputNames.indexOf(m);if(h===-1)throw new Error(`invalid input '${m}'`);o.push(p),i.push(h)});let s=[],a=[];Object.entries(n).forEach(d=>{let m=d[0],p=d[1],h=this.outputNames.indexOf(m);if(h===-1)throw new Error(`invalid output '${m}'`);s.push(p),a.push(h)});let u=o.map((d,m)=>Jg(d,()=>`input "${this.inputNames[i[m]]}"`)),l=s.map((d,m)=>d?Jg(d,()=>`output "${this.outputNames[a[m]]}"`):null),c=await Xg(this.sessionId,i,u,a,l,t),f={};for(let d=0;d<c.length;d++)f[this.outputNames[a[d]]]=s[d]??jT(c[d]);return Ze(),f}startProfiling(){}endProfiling(){Zg(this.sessionId)}}});var eb={};Rr(eb,{OnnxruntimeWebAssemblyBackend:()=>Zo,initializeFlags:()=>Qg,wasmBackend:()=>XT});var Qg,Zo,XT,tb=S(()=>{"use strict";Ue();Ha();Yg();en();Qg=()=>{if((typeof j.wasm.initTimeout!="number"||j.wasm.initTimeout<0)&&(j.wasm.initTimeout=0),j.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof j.wasm.proxy!="boolean"&&(j.wasm.proxy=!1),typeof j.wasm.trace!="boolean"&&(j.wasm.trace=!1),typeof j.wasm.numThreads!="number"||!Number.isInteger(j.wasm.numThreads)||j.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)j.wasm.numThreads=1;else{let r=typeof navigator>"u"?Jo("node:os").cpus().length:navigator.hardwareConcurrency;j.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}j.wasm.wasmPaths===void 0&&gt&&gt.indexOf("blob:")!==0&&(j.wasm.wasmPaths=gt.substring(0,gt.lastIndexOf("/")+1))},Zo=class{async init(e){Qg(),await Wg(),await Hg(e)}async createInferenceSessionHandler(e,n){let t=new Xo;return await t.loadModel(e,n),Promise.resolve(t)}},XT=new Zo});Ue();Ue();Ue();var _s="1.20.0";var yR=ti;{let r=(Pd(),gn(Ad)).onnxjsBackend;Mt("webgl",r,-10)}{let r=(tb(),gn(eb)).wasmBackend;Mt("webgpu",r,5),Mt("webnn",r,5),Mt("cpu",r,10),Mt("wasm",r,10)}Object.defineProperty(j.versions,"web",{value:_s,enumerable:!0});export{lb as InferenceSession,Tn as TRACE,ot as TRACE_FUNC_BEGIN,Ze as TRACE_FUNC_END,Ne as Tensor,fb as TrainingSession,yR as default,j as env,Mt as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.min.mjs.map
