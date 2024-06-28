/*!
 * ONNX Runtime Web v1.19.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var lr=Object.defineProperty;var Fa=Object.getOwnPropertyDescriptor;var Ka=Object.getOwnPropertyNames;var ja=Object.prototype.hasOwnProperty;var cr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var E=(e,t)=>()=>(e&&(t=e(e=0)),t);var ht=(e,t)=>{for(var r in t)lr(e,r,{get:t[r],enumerable:!0})},Za=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ka(t))!ja.call(e,o)&&o!==r&&lr(e,o,{get:()=>t[o],enumerable:!(n=Fa(t,o))||n.enumerable});return e};var pr=e=>Za(lr({},"__esModule",{value:!0}),e);var gt,Ne,We,Ya,yt,bt=E(()=>{gt=new Map,Ne=[],We=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=gt.get(e);if(n===void 0)gt.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=Ne.indexOf(e);o!==-1&&Ne.splice(o,1);for(let i=0;i<Ne.length;i++)if(gt.get(Ne[i]).priority<=r){Ne.splice(i,0,e);return}Ne.push(e)}return}throw new TypeError("not a valid backend")},Ya=async e=>{let t=gt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},yt=async e=>{let t=e.executionProviders||[],r=t.map(a=>typeof a=="string"?a:a.name),n=r.length===0?Ne:r,o,i=[],s=new Set;for(let a of n){let d=await Ya(a);typeof d=="string"?i.push({name:a,err:d}):(o||(o=d),o===d&&s.add(a))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(a=>`[${a.name}] ${a.err}`).join(", ")}`);for(let{name:a,err:d}of i)r.includes(a)&&console.warn(`removing requested execution provider "${a}" from session options because it is not available: ${d}`);let u=t.filter(a=>s.has(typeof a=="string"?a:a.name));return[o,new Proxy(e,{get:(a,d)=>d==="executionProviders"?u:Reflect.get(a,d)})]}});var on=E(()=>{bt()});var sn,an=E(()=>{sn="1.19.0"});var un,$e,mr=E(()=>{an();un="warning",$e={wasm:{},webgl:{},webgpu:{},versions:{common:sn},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);un=e}},get logLevel(){return un}};Object.defineProperty($e,"logLevel",{enumerable:!0})});var j,dn=E(()=>{mr();j=$e});var ln,cn,pn=E(()=>{ln=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,a,d;u===void 0||u.mean===void 0?a=[255,255,255,255]:typeof u.mean=="number"?a=[u.mean,u.mean,u.mean,u.mean]:(a=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(a[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let c=i*o,l=0,p=c,f=c*2,m=-1;s==="RGBA"?(l=0,p=c,f=c*2,m=c*3):s==="RGB"?(l=0,p=c,f=c*2):s==="RBG"&&(l=0,f=c,p=c*2);for(let h=0;h<i;h++)for(let b=0;b<o;b++){let y=(e.data[l++]-d[0])*a[0],g=(e.data[p++]-d[1])*a[1],w=(e.data[f++]-d[2])*a[2],$=m===-1?255:(e.data[m++]-d[3])*a[3];n.fillStyle="rgba("+y+","+g+","+w+","+$+")",n.fillRect(b,h,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},cn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],s=e.dims[3]):(o=e.dims[3],i=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",a=t?.norm,d,c;a===void 0||a.mean===void 0?d=[255,255,255,255]:typeof a.mean=="number"?d=[a.mean,a.mean,a.mean,a.mean]:(d=[a.mean[0],a.mean[1],a.mean[2],255],a.mean[3]!==void 0&&(d[3]=a.mean[3])),a===void 0||a.bias===void 0?c=[0,0,0,0]:typeof a.bias=="number"?c=[a.bias,a.bias,a.bias,a.bias]:(c=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(c[3]=a.bias[3]));let l=i*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,f=0,m=1,h=2,b=3,y=0,g=l,w=l*2,$=-1;u==="RGBA"?(y=0,g=l,w=l*2,$=l*3):u==="RGB"?(y=0,g=l,w=l*2):u==="RBG"&&(y=0,w=l,g=l*2),n=r.createImageData(o,i);for(let v=0;v<i*o;f+=p,m+=p,h+=p,b+=p,v++)n.data[f]=(e.data[y++]-c[0])*d[0],n.data[m]=(e.data[g++]-c[1])*d[1],n.data[h]=(e.data[w++]-c[2])*d[2],n.data[b]=$===-1?255:(e.data[$++]-c[3])*d[3]}else throw new Error("Can not access image data");return n}});var fr,mn,fn,hn,gn,yn=E(()=>{wt();fr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",a=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*n,c=a==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),l=4,p=0,f=1,m=2,h=3,b=0,y=d,g=d*2,w=-1;u==="RGB"&&(l=3,p=0,f=1,m=2,h=-1),a==="RGBA"?w=d*3:a==="RBG"?(b=0,g=d,y=d*2):a==="BGR"&&(g=0,y=d,b=d*2);for(let v=0;v<d;v++,p+=l,m+=l,f+=l,h+=l)c[b++]=(e[p]+s[0])/i[0],c[y++]=(e[f]+s[1])/i[1],c[g++]=(e[m]+s[2])/i[2],w!==-1&&h!==-1&&(c[w++]=(e[h]+s[3])/i[3]);return a==="RGBA"?new pe("float32",c,[1,4,r,n]):new pe("float32",c,[1,3,r,n])},mn=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,u=t??{},a=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=a();c.width=e.width,c.height=e.height;let l=d(c);if(l!=null){let p=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=p,u.width=f}else u.tensorFormat="RGBA",u.height=p,u.width=f;l.drawImage(e,0,0),s=l.getImageData(0,0,f,p).data}else throw new Error("Can not access image data")}else if(n){let c,l;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,l=t.resizedWidth):(c=e.height,l=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=l,t!==void 0){let p=a();p.width=l,p.height=c;let f=d(p);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,l,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=a();c.width=e.width,c.height=e.height;let l=d(c);if(l!=null){let p=e.height,f=e.width;return l.drawImage(e,0,0,f,p),s=l.getImageData(0,0,f,p).data,u.height=p,u.width=f,fr(s,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,l)=>{let p=a(),f=d(p);if(!e||!f)return l();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,f.drawImage(m,0,0,p.width,p.height);let h=f.getImageData(0,0,p.width,p.height);u.height=p.height,u.width=p.width,c(fr(h.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return fr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},fn=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,s=[1,n,r,4];return new pe({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:i})},hn=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new pe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},gn=(e,t,r)=>new pe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Ge,nt,bn,wn,$n=E(()=>{Ge=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),nt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),bn=!1,wn=()=>{if(!bn){bn=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Ge.set("int64",BigInt64Array),nt.set(BigInt64Array,"int64")),t&&(Ge.set("uint64",BigUint64Array),nt.set(BigUint64Array,"uint64")),r?(Ge.set("float16",Float16Array),nt.set(Float16Array,"float16")):Ge.set("float16",Uint16Array)}}});var vn,_n,Sn=E(()=>{wt();vn=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},_n=(e,t)=>{switch(e.location){case"cpu":return new pe(e.type,e.data,t);case"cpu-pinned":return new pe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new pe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new pe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var pe,wt=E(()=>{pn();yn();$n();Sn();pe=class{constructor(t,r,n){wn();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let u=Ge.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,a;if(typeof t=="string")if(o=t,a=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let d=Ge.get(t);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&d===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");t==="uint64"||t==="int64"?u=d.from(r,BigInt):u=d.from(r)}else if(r instanceof d)u=r;else throw new TypeError(`A ${o} tensor's data must be type of ${d}`)}else if(a=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof t[0];if(d==="string")o="string",u=t;else if(d==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else{let d=nt.get(t.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=d,u=t}if(a===void 0)a=[u.length];else if(!Array.isArray(a))throw new TypeError("A tensor's dims must be a number array");i=a,this.cpuData=u,this.dataLocation="cpu"}let s=vn(i);if(this.cpuData&&s!==this.cpuData.length)throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(t,r){return mn(t,r)}static fromTexture(t,r){return fn(t,r)}static fromGpuBuffer(t,r){return hn(t,r)}static fromPinnedBuffer(t,r,n){return gn(t,r,n)}toDataURL(t){return ln(this,t)}toImageData(t){return cn(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return _n(this,t)}}});var de,$t=E(()=>{wt();de=pe});var vt,xn,ve,he,hr=E(()=>{mr();vt=(e,t)=>{(typeof $e.trace>"u"?!$e.wasm.trace:!$e.trace)||console.timeStamp(`${e}::ORT::${t}`)},xn=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),vt("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},ve=e=>{(typeof $e.trace>"u"?!$e.wasm.trace:!$e.trace)||xn("BEGIN",e)},he=e=>{(typeof $e.trace>"u"?!$e.wasm.trace:!$e.trace)||xn("END",e)}});var _t,In=E(()=>{bt();$t();hr();_t=class e{constructor(t){this.handler=t}async run(t,r,n){ve();let o={},i={};if(typeof t!="object"||t===null||t instanceof de||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof de)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);o[d]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(r);for(let l of this.outputNames)if(c.indexOf(l)!==-1){let p=r[l];(p===null||p instanceof de)&&(d=!0,s=!1,o[l]=p)}if(d){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)o[d]=null;let u=await this.handler.run(t,o,i),a={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let c=u[d];c instanceof de?a[d]=c:a[d]=new de(c.type,c.data,c.dims)}return he(),a}async release(){return this.handler.dispose()}static async create(t,r,n,o){ve();let i,s={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,l=0,p=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(l=r,!Number.isSafeInteger(l))throw new RangeError("'byteOffset' must be an integer.");if(l<0||l>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(p=t.byteLength-l,typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||l+p>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-l}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,l,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,a]=await yt(s),d=await u.createInferenceSessionHandler(i,a);return he(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Qa,Cn=E(()=>{In();Qa=_t});var Tn=E(()=>{});var An=E(()=>{});var En=E(()=>{});var kn=E(()=>{});var Xa,St,Pn=E(()=>{bt();$t();Xa="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",St=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[s,u]=await yt(i);if(s.createTrainingSessionHandler){let a=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,u);return new e(a,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Xa)}typeNarrowingForRunStep(t,r,n,o,i){let s={},u={};if(typeof n!="object"||n===null||n instanceof de||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof de)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let d of o){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);s[d]=null}if(typeof i=="object"&&i!==null)u=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(o);for(let l of r)if(c.indexOf(l)!==-1){let p=o[l];(p===null||p instanceof de)&&(d=!0,a=!1,s[l]=p)}if(d){if(typeof i=="object"&&i!==null)u=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else u=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of t)if(typeof n[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(a)for(let d of r)s[d]=null;return[s,u]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof de?r[n]=o:r[n]=new de(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),s=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),s=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Ja,zn=E(()=>{Pn();Ja=St});var gr={};ht(gr,{InferenceSession:()=>Qa,TRACE:()=>vt,TRACE_FUNC_BEGIN:()=>ve,TRACE_FUNC_END:()=>he,Tensor:()=>de,TrainingSession:()=>Ja,env:()=>j,registerBackend:()=>We});var _e=E(()=>{on();dn();Cn();$t();Tn();An();hr();En();kn();zn()});var xt=E(()=>{"use strict"});var Rn={};ht(Rn,{default:()=>eu});var Bn,Dn,eu,Mn=E(()=>{"use strict";yr();Le();ot();Bn="ort-wasm-proxy-worker",Dn=globalThis.self?.name===Bn;Dn&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":It(r.wasm).then(()=>{Ct(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Tt(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=it(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;At(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Et(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:s,options:u}=r;kt(n,o,i,s,new Array(s.length).fill(null),u).then(a=>{a.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:a},zt([...i,...a]))},a=>{postMessage({type:t,err:a})});break}case"end-profiling":Pt(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});eu=Dn?null:e=>new Worker(e??Se,{type:"module",name:Bn})});var Se,tu,Vn,ru,nu,Nn,ou,Un,Wn,Gn,ot=E(()=>{"use strict";xt();Se=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),tu=!1||typeof location>"u"?void 0:location.origin,Vn=(e,t)=>{try{let r=t??Se;return(r?new URL(e,r):new URL(e)).origin===tu}catch{return!1}},ru=(e,t)=>{let r=t??Se;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},nu=(e,t)=>`${t??"./"}${e}`,Nn=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},ou=async e=>(await import(/*webpackIgnore:true*/e)).default,Un=(Mn(),pr(Rn)).default,Wn=async()=>{if(!Se)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Vn(Se))return[void 0,Un()];let e=await Nn(Se);return[e,Un(e)]},Gn=async(e,t,r)=>{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??ru(n,t),i=!!1&&r&&o&&!Vn(o,t),s=i?await Nn(o):o??nu(n,t);return[i?s:void 0,await ou(s)]}});var br,wr,Ot,Ln,iu,su,It,oe,Le=E(()=>{"use strict";ot();wr=!1,Ot=!1,Ln=!1,iu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},su=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},It=async e=>{if(wr)return Promise.resolve();if(Ot)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ln)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ot=!0;let t=e.initTimeout,r=e.numThreads;if(!su())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=iu();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,u=s?.href??s,a=o?.wasm,d=a?.href??a,[c,l]=await Gn(u,i,r>1),p=!1,f=[];if(t>0&&f.push(new Promise(m=>{setTimeout(()=>{p=!0,m()},t)})),f.push(new Promise((m,h)=>{l({numThreads:r,locateFile:(y,g)=>d??(i??g)+y}).then(y=>{Ot=!1,wr=!0,br=y,m(),c&&URL.revokeObjectURL(c)},y=>{Ot=!1,Ln=!0,h(y)})})),await Promise.race(f),p)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},oe=()=>{if(wr&&br)return br;throw new Error("WebAssembly is not initialized yet.")}});var ie,st,te,Bt=E(()=>{"use strict";Le();ie=(e,t)=>{let r=oe(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},st=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let s=t?t+o:o;if(typeof i=="object")st(i,s+".",r,n);else if(typeof i=="string"||typeof i=="number")n(s,i.toString());else if(typeof i=="boolean")n(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},te=e=>{let t=oe(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let o=t.HEAP32[n/4],i=t.HEAPU32[n/4+1],s=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}});var Hn,qn=E(()=>{"use strict";Le();Bt();Hn=e=>{let t=oe(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=ie(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&te("Can't create run options."),e?.extra!==void 0&&st(e.extra,"",new WeakSet,(s,u)=>{let a=ie(s,n),d=ie(u,n);t._OrtAddRunConfigEntry(r,a,d)!==0&&te(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),i}}});var au,uu,du,lu,Fn,Kn=E(()=>{"use strict";Le();Bt();au=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},uu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},du=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},lu=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let s=n,u=s?.deviceType,a=s?.numThreads,d=s?.powerPreference;if(u){let c=ie("deviceType",r),l=ie(u,r);oe()._OrtAddSessionConfigEntry(e,c,l)!==0&&te(`Can't set a session config entry: 'deviceType' - ${u}.`)}if(a!==void 0){let c=typeof a!="number"||!Number.isInteger(a)||a<0?0:a,l=ie("numThreads",r),p=ie(c.toString(),r);oe()._OrtAddSessionConfigEntry(e,l,p)!==0&&te(`Can't set a session config entry: 'numThreads' - ${a}.`)}if(d){let c=ie("powerPreference",r),l=ie(d,r);oe()._OrtAddSessionConfigEntry(e,c,l)!==0&&te(`Can't set a session config entry: 'powerPreference' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let s=n;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let u=ie("preferredLayout",r),a=ie(s.preferredLayout,r);oe()._OrtAddSessionConfigEntry(e,u,a)!==0&&te(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ie(o,r);oe()._OrtAppendExecutionProvider(e,i)!==0&&te(`Can't append execution provider: ${o}.`)}},Fn=e=>{let t=oe(),r=0,n=[],o=e||{};du(o);try{let i=au(o.graphOptimizationLevel??"all"),s=uu(o.executionMode??"sequential"),u=typeof o.logId=="string"?ie(o.logId,n):0,a=o.logSeverityLevel??2;if(!Number.isInteger(a)||a<0||a>4)throw new Error(`log serverity level is not valid: ${a}`);let d=o.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof o.optimizedModelFilePath=="string"?ie(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,u,a,d,c),r===0&&te("Can't create session options."),o.executionProviders&&lu(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let l=ie("enableGraphCapture",n),p=ie(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,l,p)!==0&&te(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[l,p]of Object.entries(o.freeDimensionOverrides)){if(typeof l!="string")throw new Error(`free dimension override name must be a string: ${l}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let f=ie(l,n);t._OrtAddFreeDimensionOverride(r,f,p)!==0&&te(`Can't set a free dimension override: ${l} - ${p}.`)}return o.extra!==void 0&&st(o.extra,"",new WeakSet,(l,p)=>{let f=ie(l,n),m=ie(p,n);t._OrtAddSessionConfigEntry(r,f,m)!==0&&te(`Can't set a session config entry: ${l} - ${p}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(s=>t._free(s)),i}}});var $r,Re,qe,Dt,at,Rt,vr,R=E(()=>{"use strict";$r=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${e}`)}},Re=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${e}`)}},qe=e=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][e],Dt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},at=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Rt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool",vr=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}});var ut,_r=E(()=>{"use strict";xt();ut=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=cr("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=cr("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let a=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:a,maximum:a}).buffer}else throw u}let s=0;for(;;){let{done:u,value:a}=await o.read();if(u)break;let d=a.byteLength;new Uint8Array(i,s,d).set(a),s+=d}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var cu,pu,jn,Zn,Yn,mu,re,Me=E(()=>{"use strict";R();cu=["V","I","W","E","F"],pu=(e,t)=>{console.log(`[${cu[e]},${new Date().toISOString()}]${t}`)},Yn=(e,t)=>{jn=e,Zn=t},mu=(e,t)=>{let r=at(e),n=at(jn);r>=n&&pu(r,typeof t=="function"?t():t)},re=(...e)=>{Zn&&mu(...e)}});var Qn,Xn=E(()=>{"use strict";R();Qn=(e,t)=>new(Dt(t))(e)});var Mt=E(()=>{"use strict"});var Jn,Sr,xr,fu,hu,eo,Cr,Ir,ro,no=E(()=>{"use strict";Me();Mt();Jn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Sr=[],xr=e=>Math.ceil(e/16)*16,fu=e=>{for(let t=0;t<Sr.length;t++){let r=Sr[t];if(e<=r)return r}return Math.ceil(e/16)*16},hu=1,eo=()=>hu++,Cr=async(e,t,r,n)=>{let o=xr(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let a=n();return a.set(new Uint8Array(u,0,r)),a}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},Ir=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[r]of Jn)Sr.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[])}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,s=xr(i),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(u.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let a=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=a.getMappedRange();new Uint8Array(d).set(new Uint8Array(n,o,i)),a.unmap();let c=this.backend.getCommandEncoder();this.backend.endComputePass(),c.copyBufferToBuffer(a,0,u.gpuData.buffer,0,s),re("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(a)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=xr(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=this.externalBuffers.get(n),o===void 0)throw new Error("previous buffer is not registered");if(t===n)return re("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(n)}else o=eo();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),this.externalBuffers.set(t,o),re("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){let r=this.externalBuffers.get(t);r!==void 0&&(this.storageCache.delete(r),this.externalBuffers.delete(t),re("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${r}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=fu(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let d=(i?this.freeBuffers:this.freeUniformBuffers).get(n);d?d.length>0?o=d.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:eo(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:t}),re("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=this.storageCache.get(t);if(!r)throw new Error("releasing data does not exist");return re("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("data does not exist");await Cr(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Jn.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t))}},ro=(...e)=>new Ir(...e)});var Tr,U,ae=E(()=>{"use strict";Tr=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},U=e=>new Tr(e)});var Ar,ke,_,Fe,Ut,Vt,Nt,L=E(()=>{"use strict";Ar=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},ke=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let s=Math.max(t.length,r.length),u=new Array(s);if(n){if(o<2||i<2)return;let a=Ar.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(a===void 0)return;[u[s-2],u[s-1]]=a}for(let a=n?3:1;a<=s;a++){let d=o-a<0?1:t[o-a],c=i-a<0?1:r[i-a];if(d!==c&&d>1&&c>1)return;let l=Math.max(d,c);if(d&&c)u[s-a]=Math.max(d,c);else{if(l>1)return;u[s-a]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},_=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[i]}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Fe=class e{static adjustPoolAttributes(t,r,n,o,i,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,s,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<t.length-2;a++)e.adjustPadAndReturnShape(t[a+(s?1:2)],r[a],n[a],o[a],i,a,a+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,i,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let a=[r[0],r[1]];return e.computeShapeHelper(t,r,a,n,o,i,s,u),a}static computeConvOutputShape(t,r,n,o,i,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let a=[t[0],r[0]];return e.computeShapeHelper(!1,t,a,n,o,i,s,u),a}static computeShapeHelper(t,r,n,o,i,s,u,a){if(t)for(let d=0;d<r.length-2;d++)n.push(1);else for(let d=0;d<r.length-2;d++)n.push(e.adjustPadAndReturnShape(r[d+2],o[d],i[d],s[d],u,d,d+r.length-2,a))}static adjustPadAndReturnShape(t,r,n,o,i,s,u,a){let d=n*(o-1)+1;if(a&&a!=="NOTSET")switch(a){case"VALID":return i[s]=0,i[u]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let l=((t+r-1)/r-1)*r+o-t;return i[s]=Math.floor(a==="SAME_LOWER"?(l+1)/2:l/2),i[u]=l-i[s],Math.floor((t+l-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[u]-d)/r+1)}},Ut=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,u,a;r?(s=t[1],u=t[0]):(s=t[0],u=t[1]);let d=-1;if(o?(a=n[0],d=1):(a=n[1],d=0),n[d]!==u)throw new Error("dimension mismatch");if(s<=0||a<=0||u<=0)throw new Error("invalid shape specified");if(i&&!ke.isValidBroadcast(i,[s,a]))throw new Error("gemm: invalid bias shape for broadcast");return[s,a,u]}},Vt=-34028234663852886e22,Nt=34028234663852886e22});var Ke,kr,X,le,k,ee,Ue,je,Ce,D,Pr,S,A,Wt,Er,oo,Je,W=E(()=>{"use strict";R();L();Ke=64,kr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${e}`)}},X=(e,t=1)=>{let r=kr(e,t);return typeof r=="string"?r:r[0]},le=(e,t=1)=>{let r=kr(e,t);return typeof r=="string"?r:r[1]},k=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:_.computeStrides(r)})}),t},ee=e=>e%4===0?4:e%2===0?2:1,Ue=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,je=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ce=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,D=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Pr=(e,t,r,n,o)=>{let i=typeof r=="number",s=i?r:r.length,u=[...new Array(s).keys()],a=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=kr(t,o),c=typeof d=="string"?d:d[1],l=typeof d=="string"?d:d[0],p={indices:a,value:c,storage:l,tensor:t},f=T=>typeof T=="string"?T:`${T}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",b=`${h}${e}_shape`,y=`${h}${e}_strides`,g="";for(let T=0;T<s-1;T++)g+=`
    let dim${T} = current / ${D(y,T,s)};
    let rest${T} = current % ${D(y,T,s)};
    indices[${T}] = dim${T};
    current = rest${T};
    `;g+=`indices[${s-1}] = current;`;let w=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,$=T=>(m.offsetToIndices=!0,s<2?T:`o2i_${e}(${T})`),v=[];if(s>=2)for(let T=s-1;T>=0;T--)v.push(`${D(y,T,s)} * (indices[${T}])`);let x=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${v.join("+")};
  }`,C=T=>(m.indicesToOffset=!0,s<2?T:`i2o_${e}(${T})`),I=(...T)=>s===0?"0u":`${p.indices}(${T.map(f).join(",")})`,z=(T,B)=>s<2?`${T}`:`${D(T,B,s)}`,P=(T,B,F)=>s<2?`${T}=${F};`:`${D(T,B,s)}=${F};`,G={},J=(T,B)=>{m.broadcastedIndicesToOffset=!0;let F=`${B.name}broadcastedIndicesTo${e}Offset`;if(F in G)return`${F}(${T})`;let Ie=[];for(let fe=s-1;fe>=0;fe--){let ue=B.indicesGet("outputIndices",fe+B.rank-s);Ie.push(`${z(y,fe)} * (${ue} % ${z(b,fe)})`)}return G[F]=`fn ${F}(outputIndices: ${B.type.indices}) -> u32 {
             return ${Ie.length>0?Ie.join("+"):"0u"};
           }`,`${F}(${T})`},ne=(T,B)=>(()=>{if(p.storage===p.value)return`${e}[${T}]=${B};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${T}]=vec2<u32>(u32(${B}), select(0u, 0xFFFFFFFFu, ${B} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${T}]=vec2<u32>(u32(${B}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${T}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${B}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),Q=T=>(()=>{if(p.storage===p.value)return`${e}[${T}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${T}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${T}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${T}] & 0xFFu), bool(${e}[${T}] & 0xFF00u), bool(${e}[${T}] & 0xFF0000u), bool(${e}[${T}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),se=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${c} {
    return ${Q(`i2o_${e}(indices)`)};
  }`,O=s<2?"":(()=>{let T=u.map(F=>`d${F}: u32`).join(", "),B=u.map(F=>`d${F}`).join(", ");return`
  fn get_${e}(${T}) -> ${c} {
    return get_${e}ByIndices(${I(B)});
  }`})(),Y=(...T)=>{if(T.length!==s)throw new Error(`indices length must be ${s}`);let B=T.map(f).join(",");return s===0?Q("0u"):s===1?Q(B[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${B})`)},K=T=>s<2?Q(T):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${T})`),q=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${c}) {
    ${ne(`i2o_${e}(indices)`,"value")}
  }`,M=s<2?"":(()=>{let T=u.map(F=>`d${F}: u32`).join(", "),B=u.map(F=>`d${F}`).join(", ");return`
  fn set_${e}(${T}, value: ${c}) {
    set_${e}ByIndices(${I(B)}, value);
  }`})();return{impl:()=>{let T=[],B=!1;return m.offsetToIndices&&(T.push(w),B=!0),m.indicesToOffset&&(T.push(x),B=!0),m.broadcastedIndicesToOffset&&(Object.values(G).forEach(F=>T.push(F)),B=!0),m.set&&(T.push(M),B=!0),m.setByIndices&&(T.push(q),B=!0),m.get&&(T.push(O),B=!0),m.getByIndices&&(T.push(se),B=!0),!i&&B&&T.unshift(`const ${b} = ${p.indices}(${r.join(",")});`,`const ${y} = ${p.indices}(${_.computeStrides(r).join(",")});`),T.join(`
`)},type:p,offsetToIndices:$,indicesToOffset:C,broadcastedIndicesToOffset:J,indices:I,indicesGet:z,indicesSet:P,set:(...T)=>{if(T.length!==s+1)throw new Error(`indices length must be ${s}`);let B=T[s];if(typeof B!="string")throw new Error("value must be string");let F=T.slice(0,s).map(f).join(",");return s===0?ne("0u",B):s===1?ne(F[0],B):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${F}, ${B})`)},setByOffset:ne,setByIndices:(T,B)=>s<2?ne(T,B):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${T}, ${B});`),get:Y,getByOffset:Q,getByIndices:K,usage:n,name:e,strides:y,shape:b,rank:s}},S=(e,t,r,n=1)=>Pr(e,t,r,"input",n),A=(e,t,r,n=1)=>Pr(e,t,r,"output",n),Wt=(e,t,r,n=1)=>Pr(e,t,r,"internal",n),Er=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ke){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,u=i?"let global_idx = global_id.x; let local_idx = local_id.x;":`let global_idx = (workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
          workgroup_id.y * num_workgroups[0] + workgroup_id.x) * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${s}) {
    ${u}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},oo=(e,t)=>new Er(e,t),Je=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let i=r-1-o,s=e[i]||1;(t[t.length-1-o]||1)>1&&s===1&&n.unshift(i)}return n}});var gu,io,yu,bu,ge,so,ao,Ze=E(()=>{"use strict";R();L();ae();W();gu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},io=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,yu=(e,t)=>_.sortBasedOnPerm(e,io(e.length,t)),bu=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},ge=(e,t)=>{let r=e.dataType,n=e.dims.length,o=io(n,t),i=yu(e.dims,o),s=A("output",r,i.length),u=S("a",r,n),a;if(o.length===2&&o[0]===1&&o[1]===0){let d=s.type.value,c=[16,16,1];a=l=>`
  ${l.registerUniform("output_size","u32").declareVariables(u,s)}
  var<workgroup> tile : array<array<${d}, ${c[0]+1}>, ${c[0]}>;
  ${l.mainStart(c)}
    var x = workgroup_id.x * ${c[0]}u + local_id.x;
    var y = workgroup_id.y * ${c[0]}u + local_id.y;
    let width = uniforms.output_shape[0];
    let height = uniforms.output_shape[1];
    if (x < width && y < height) {
      tile[local_id.y][local_id.x] = ${u.getByOffset("y * width + x")};
    }
    workgroupBarrier();
    x = workgroup_id.y * ${c[0]}u + local_id.x;
    y = workgroup_id.x * ${c[0]}u + local_id.y;
    if (x < height && y < width) {
      ${s.setByOffset("y * height + x","tile[local_id.x][local_id.y]")}
    }
  }`}else a=d=>`
  ${d.registerUniform("output_size","u32").declareVariables(u,s)}

  ${bu(o,n,u,s)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${s.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${s.setByOffset("global_idx",u.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:d=>{let c=_.size(i);return{outputs:[{dims:i,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...k(d[0].dims,i)]}},getShaderSource:a}},so=(e,t)=>{gu(e.inputs),e.compute(ge(e.inputs[0],t.perm))},ao=e=>U({perm:e.perm})});var wu,$u,vu,_u,Su,xu,Iu,Cu,Tu,Au,Pe,uo,lo,co,po,mo,fo,ho,go,yo,bo,wo=E(()=>{"use strict";R();L();W();Gt();Ze();wu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},$u={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},vu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},_u={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Su=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},xu=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},Iu=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},Cu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Tu=(e,t)=>{let r=[];if(!Cu(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Au=(e,t,r,n,o,i,s)=>{let u=r[0].dims,a=_.size(i),d=_.size(s),c=S("_A",r[0].dataType,u),l=A("output",o,i),p=32,f=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(c,l)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${vu[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${wu[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${$u[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${l.setByOffset("outputIndex",`${n==="mean"?`${l.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${l.type.storage}(${_u[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:a},programUniforms:[{type:12,data:d}]})}},Pe=(e,t,r,n)=>{let o=e.inputs.length===1?r:zr(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((f,m)=>m));let s=_.normalizeAxes(i,e.inputs[0].dims.length),u=s,a=e.inputs[0],d=Tu(u,e.inputs[0].dims.length);d.length>0&&(a=e.compute(ge(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=Su(u.length,a.dims.length));let[c,l]=xu(a.dims,u),p=c;o.keepDims&&(p=Iu(c,s)),e.compute(Au(t,{hint:o.cacheKey,inputDependencies:["type"]},[a],n,e.inputs[0].dataType,p,l),{inputs:[a]})},uo=(e,t)=>{Pe(e,"ReduceMeanShared",t,"mean")},lo=(e,t)=>{Pe(e,"ReduceL1Shared",t,"l1")},co=(e,t)=>{Pe(e,"ReduceL2Shared",t,"l2")},po=(e,t)=>{Pe(e,"ReduceLogSumExpShared",t,"logSumExp")},mo=(e,t)=>{Pe(e,"ReduceMaxShared",t,"max")},fo=(e,t)=>{Pe(e,"ReduceMinShared",t,"min")},ho=(e,t)=>{Pe(e,"ReduceProdShared",t,"prod")},go=(e,t)=>{Pe(e,"ReduceSumShared",t,"sum")},yo=(e,t)=>{Pe(e,"ReduceSumSquareShared",t,"sumSquare")},bo=(e,t)=>{Pe(e,"ReduceLogSumShared",t,"logSum")}});var ze,Eu,Lt,zr,Oe,ku,Pu,zu,Ou,Bu,Du,Ru,Mu,Uu,Vu,Be,$o,vo,_o,So,xo,Io,Co,To,Ao,Eo,Gt=E(()=>{"use strict";R();L();ae();W();wo();ze=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Eu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Lt=(e,t,r,n,o,i,s=!1,u=!1)=>{let a=[],d=r[0].dims,c=d.length,l=_.normalizeAxes(o,c),p=!u&&l.length===0;d.forEach((b,y)=>{p||l.indexOf(y)>=0?s&&a.push(1):a.push(b)});let f=a.length,m=_.size(a);return{name:e,shaderCache:t,getShaderSource:b=>{let y=[],g=S("_A",r[0].dataType,c),w=A("output",i,f),$=n(g,w,l),v=$[2];for(let x=0,C=0;x<c;x++)p||l.indexOf(x)>=0?(s&&C++,v=`for(var j${x}: u32 = 0; j${x} < ${d[x]}; j${x}++) {
                  ${$[2].includes("last_index")?`let last_index = j${x};`:""}
                  ${g.indicesSet("input_indices",x,`j${x}`)}
                  ${v}
                }`):(y.push(`${g.indicesSet("input_indices",x,w.indicesGet("output_indices",C))};`),C++);return`

        ${b.registerUniform("output_size","u32").declareVariables(g,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${v}
          ${$[3]}
          ${$.length===4?w.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(d,a)]})}},zr=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),U({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Oe=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:zr(o,r);e.compute(Lt(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?Eu:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},ku=(e,t)=>{ze(e.inputs),Oe(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Pu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},zu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Ou=(e,t)=>{ze(e.inputs),Oe(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Bu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceMax",t,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(n.indicesSet("input_indices",u,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Du=(e,t)=>{ze(e.inputs),Oe(e,"ReduceMean",t,(n,o,i)=>{let s=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(s*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Ru=(e,t)=>{ze(e.inputs),Oe(e,"ReduceMin",t,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Mu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Uu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Vu=(e,t)=>{ze(e.inputs),Oe(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Be=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},$o=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Du(e,t):uo(e,t)},vo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pu(e,t):lo(e,t)},_o=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zu(e,t):co(e,t)},So=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ou(e,t):po(e,t)},xo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bu(e,t):mo(e,t)},Io=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ru(e,t):fo(e,t)},Co=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Mu(e,t):ho(e,t)},To=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Uu(e,t):go(e,t)},Ao=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vu(e,t):yo(e,t)},Eo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ku(e,t):bo(e,t)}});var ko,Po,zo,Or,Oo=E(()=>{"use strict";R();ae();Gt();ko=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Po=(e,t)=>{ko(e.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Lt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},zo=(e,t)=>{ko(e.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Lt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Or=e=>U(e)});var Nu,Wu,Gu,Lu,et,Hu,Bo,Ht=E(()=>{"use strict";R();Mt();W();Nu=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and relative_position_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let a=r.dims[0],d=r.dims[1],c=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let l=o.dims[0]/3,p=l,f=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of t.qkvHiddenSizes)if(w%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");l=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=d;if(l!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==l+p+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==a)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(h=s.dims[3])}let b=m+h,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");return{batchSize:a,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:c,hiddenSize:l,vHiddenSize:f,headSize:Math.floor(l/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Wu=(e,t,r,n)=>{let o=ee(n),i=64,s=n/o;s<i?i=1:s/8<64&&(i=Math.ceil(s/8));let u=Math.ceil(n/o/i),a=[{type:t.dataType,data:1/n},{type:12,data:s},{type:12,data:u}],d=X(t.dataType,o),c=le(1,o),l=p=>{let f=A("x",t.dataType,t.dims,o),h=[{name:"d_inv",type:le(t.dataType)},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${i}>;
  var<workgroup> thread_sum: array<f32, ${i}>;
  ${p.registerUniforms(h).declareVariables(f)}
  ${p.mainStart([i,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = workgroup_id.x * uniforms.d_comp + local_offset;

    var thread_max_vector = ${c}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${c}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(o){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${i}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${c}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${c}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(o){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${i}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${f.type.value}(uniforms.d_inv);
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${c}(x[offset + i]);
        x[offset + i] = ${f.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${i};${d};${o}`},getShaderSource:l,getRunData:()=>({outputs:[],dispatchGroup:{x:r},programUniforms:a})}},Gu=(e,t,r,n,o,i,s,u)=>{let a=u+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,a],c=i.kvNumHeads===void 0&&e.outputCount>1,l=c?[i.batchSize,i.numHeads,a,i.headSize]:void 0,p=s.scale===0?1/Math.sqrt(i.headSize):s.scale,f=ee(i.headSize),m=i.headSize/f,h=12,b={x:Math.ceil(a/h),y:Math.ceil(i.sequenceLength/h),z:i.batchSize*i.numHeads},y=[{type:12,data:i.sequenceLength},{type:12,data:m},{type:12,data:a},{type:12,data:i.numHeads},{type:1,data:p},{type:12,data:u},{type:12,data:i.kvSequenceLength}],g=["type","type"];n&&g.push("type"),o&&g.push("type");let w=[{dims:d,dataType:t.dataType,gpuDataType:0}];c&&w.push({dims:l,dataType:t.dataType,gpuDataType:0});let $=v=>{let x=S("q",t.dataType,t.dims,f),C=S("key",r.dataType,r.dims,f),I=[x,C];if(n){let ne=S("past_key",n.dataType,n.dims,f);I.push(ne)}o&&I.push(S("relative_position_bias",o.dataType,o.dims));let z=A("output",t.dataType,d),P=[z];c&&P.push(A("present_key",t.dataType,l,f));let G=le(1,f),J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;

  var<workgroup> tileQ: array<${x.type.storage}, ${h*h}>;
  var<workgroup> tileK: array<${x.type.storage}, ${h*h}>;
  ${v.registerUniforms(J).declareVariables(...I,...P)}
  ${v.mainStart([h,h,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>n&&c?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${c?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>n&&c?`
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
        value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(f){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${f}`)}})()};
        output[outputIdx] = ${z.type.value} (sum * uniforms.alpha) + ${o?"relative_position_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${f};${o!==void 0};${n!==void 0};${e.outputCount}`,inputDependencies:g},getRunData:()=>({outputs:w,dispatchGroup:b,programUniforms:y}),getShaderSource:$}},Lu=(e,t,r,n,o,i)=>{let s=i+o.kvSequenceLength,u=o.nReps?o.nReps:1,a=o.vHiddenSize*u,d=o.kvNumHeads==null&&e.outputCount>1,c=d?[o.batchSize,o.numHeads,s,o.headSize]:void 0,l=[o.batchSize,o.sequenceLength,a],p=12,f={x:Math.ceil(o.vHeadSize/p),y:Math.ceil(o.sequenceLength/p),z:o.batchSize*o.numHeads},m=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:a},{type:12,data:i},{type:12,data:o.kvSequenceLength}],h=n?["type","type","type"]:["type","type"],b=[{dims:l,dataType:t.dataType,gpuDataType:0}];d&&b.push({dims:c,dataType:t.dataType,gpuDataType:0});let y=g=>{let w=S("probs",t.dataType,t.dims),$=S("v",r.dataType,r.dims),v=[w,$];n&&v.push(S("past_value",n.dataType,n.dims));let C=[A("output",t.dataType,l)];d&&C.push(A("present_value",t.dataType,c));let I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${p}u;
  var<workgroup> tileQ: array<${w.type.value}, ${p*p}>;
  var<workgroup> tileK: array<${w.type.value}, ${p*p}>;
  ${g.registerUniforms(I).declareVariables(...v,...C)}
  ${g.mainStart([p,p,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>n&&d?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${d?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${w.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>n&&d?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `)()}
        ${d?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e.outputCount}`,inputDependencies:h},getRunData:()=>({outputs:b,dispatchGroup:f,programUniforms:m}),getShaderSource:y}},et=(e,t,r,n,o,i,s,u,a,d,c)=>{let l=e.outputCount,p=d.kvNumHeads!==void 0||l>1?d.pastSequenceLength:0,f=p+d.kvSequenceLength,m=d.kvNumHeads===void 0&&l>1&&s?[t,r,s]:[t,r];a&&m.push(a);let h=e.compute(Gu(e,t,r,l>1?s:void 0,a,d,c,p),{inputs:m,outputs:d.kvNumHeads===void 0&&l>1?[-1,1]:[-1]})[0];e.compute(Wu(e,h,d.batchSize*d.numHeads*d.sequenceLength,f),{inputs:[h],outputs:[]});let b=d.kvNumHeads===void 0&&l>1&&u?[h,n,u]:[h,n];e.compute(Lu(e,h,n,l>1&&u?u:void 0,d,p),{inputs:b,outputs:d.kvNumHeads===void 0&&l>1?[0,2]:[0]})},Hu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},a=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=l=>{let p=A("output_q",a[0].dataType,r),f=A("output_k",a[0].dataType,r),m=A("output_v",a[0].dataType,r),h=S("input",a[0].dataType,a[0].dims),b=S("weight",a[1].dataType,a[1].dims),y=S("bias",a[2].dataType,a[2].dims),g=h.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${l.registerUniforms(w).declareVariables(h,b,y,p,f,m)}
  ${l.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:c},{inputs:a,outputs:[-1,-1,-1]})},Bo=(e,t)=>{let r=Nu(e.inputs,t),[n,o,i]=Hu(e,r);return et(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}});var qu,Fu,Ku,Do,Ro=E(()=>{"use strict";_e();R();L();ae();W();qu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let s=o.length;if(s!==n.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((u,a)=>{if(u!==n[a])throw new Error(`${i}: dim[${a}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Fu=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,s=n?ee(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?s:1,a=_.size(i)/s,d=n,c=d?i.length:i,l=S("x",e[0].dataType,e[0].dims,s),p=S("scale",e[1].dataType,e[1].dims,u),f=S("bias",e[2].dataType,e[2].dims,u),m=S("inputMean",e[3].dataType,e[3].dims,u),h=S("inputVar",e[4].dataType,e[4].dims,u),b=A("y",e[0].dataType,c,s),y=()=>{let w="";if(n)w=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")w=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<p.rank;$++)w+=`cIndices[${$}] = outputIndices[${$}];`;w+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return w},g=w=>`
  const epsilon = ${r};
  ${w.registerUniform("outputSize","u32").declareVariables(l,p,f,m,h,b)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${l.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d?[{type:12,data:a},...k(i)]:[{type:12,data:a}]})}},Ku=e=>U(e),Do=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Ku({...t,outputCount:n});if(j.webgpu.validateInputContent&&qu(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Fu(r,o))}});var ju,Zu,Mo,Uo=E(()=>{"use strict";L();W();ju=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Zu=e=>{let t=e[0].dims,r=e[0].dims[2],n=_.size(t)/4,o=e[0].dataType,i=S("input",o,t,4),s=S("bias",o,[r],4),u=S("residual",o,t,4),a=A("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(i,s,u,a)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${a.setByOffset("global_idx","value")}
  }`}},Mo=e=>{ju(e.inputs),e.compute(Zu(e.inputs))}});var Yu,Z,Vo,No,Wo,Go,Lo,Ho,qo,Fo,Ko,Qu,jo,Zo,Yo,Qo,qt,Xo,Ft,Jo,ei,ti,ri,ni,oi,ii,si,ai,ui,di,li,ci,pi,mi,fi,hi,gi,Br,Dr,yi,bi,wi,Kt=E(()=>{"use strict";R();L();ae();W();Yu=(e,t,r,n,o,i)=>{let s=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let a=S("inputData",r,[s],4),d=A("outputData",n,[s],4);return`
      ${e.registerUniform("vec_size","u32").declareVariables(a,d)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${a.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Z=(e,t,r,n,o,i=e.dataType)=>({name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:s=>Yu(s,_.size(e.dims),e.dataType,i,r,n),getRunData:s=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(_.size(s[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(_.size(e.dims)/4)}]})}),Vo=e=>{e.compute(Z(e.inputs[0],"Abs","abs"))},No=e=>{e.compute(Z(e.inputs[0],"Acos","acos"))},Wo=e=>{e.compute(Z(e.inputs[0],"Acosh","acosh"))},Go=e=>{e.compute(Z(e.inputs[0],"Asin","asin"))},Lo=e=>{e.compute(Z(e.inputs[0],"Asinh","asinh"))},Ho=e=>{e.compute(Z(e.inputs[0],"Atan","atan"))},qo=e=>{e.compute(Z(e.inputs[0],"Atanh","atanh"))},Fo=e=>U(e),Ko=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Z(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Qu=e=>{let t=e.length>=2&&e[1].data!==0?e[1].getFloat32Array()[0]:Vt,r=e.length>=3&&e[2].data!==0?e[2].getFloat32Array()[0]:Nt;return U({min:t,max:r})},jo=(e,t)=>{let r=e.inputs.length===1?t:Qu(e.inputs),n=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"Clip",o=>`clamp(${o}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${n}> = vec4(${n}(${r.min}));
    const clip_max_: vec4<${n}> = vec4(${n}(${r.max}));
`,r.cacheKey),{inputs:[0]})},Zo=e=>{e.compute(Z(e.inputs[0],"Ceil","ceil"))},Yo=e=>{e.compute(Z(e.inputs[0],"Cos","cos"))},Qo=e=>{e.compute(Z(e.inputs[0],"Cosh","cosh"))},qt=e=>U(e),Xo=(e,t)=>{let r=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ft=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Jo=e=>{let t=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Ft(t)))},ei=e=>{e.compute(Z(e.inputs[0],"Exp","exp"))},ti=e=>{e.compute(Z(e.inputs[0],"Floor","floor"))},ri=e=>{let t=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Ft(t)))},ni=(e,t)=>{let r=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},oi=e=>{e.compute(Z(e.inputs[0],"Not",t=>`!${t}`))},ii=e=>{e.compute(Z(e.inputs[0],"Neg",t=>`-${t}`))},si=e=>{e.compute(Z(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ai=e=>{let t=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ui=e=>{e.compute(Z(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},di=e=>U(e),li=(e,t)=>{let r=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},ci=e=>{e.compute(Z(e.inputs[0],"Sin","sin"))},pi=e=>{e.compute(Z(e.inputs[0],"Sinh","sinh"))},mi=e=>{e.compute(Z(e.inputs[0],"Sqrt","sqrt"))},fi=e=>{e.compute(Z(e.inputs[0],"Tan","tan"))},hi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,gi=e=>{e.compute(Z(e.inputs[0],"Tanh",hi))},Br=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${hi("v")};
}
`,Dr=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,yi=e=>{let t=le(e.inputs[0].dataType);e.compute(Z(e.inputs[0],"FastGelu",Dr,Br(t),void 0,e.inputs[0].dataType))},bi=(e,t)=>{let r=le(e.inputs[0].dataType);return e.compute(Z(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},wi=e=>{e.compute(Z(e.inputs[0],"Log","log"))}});var Xu,Ju,vi,_i=E(()=>{"use strict";L();W();Kt();Xu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ju=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=S("input",e[0].dataType,e[0].dims,4),n=S("bias",e[0].dataType,[e[0].dims[2]],4),o=A("output",e[0].dataType,t,4),i=_.size(t)/4,s=X(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:a=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${a.declareVariables(r,n,o)}

  ${Ft(s)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},vi=e=>{Xu(e.inputs),e.compute(Ju(e.inputs))}});var ed,td,De,Si,xi,Ii,Ci,Ti,Ai,Ei,ki,Pi,zi,Oi=E(()=>{"use strict";R();L();W();ed=(e,t,r,n,o,i,s,u,a,d,c,l)=>{let p,f;typeof u=="string"?p=f=(g,w)=>`${u}((${g}),(${w}))`:typeof u=="function"?p=f=u:(p=u.scalar,f=u.vector);let m=A("outputData",c,n.length,4),h=S("aData",a,t.length,4),b=S("bData",d,r.length,4),y;if(o)if(i){let g=_.size(t)===1,w=_.size(r)===1,$=t.length>0&&t[t.length-1]%4===0,v=r.length>0&&r[r.length-1]%4===0;g||w?y=m.setByOffset("global_idx",f(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||$?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||v?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(h.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(w,$,v="")=>{let x=`aData[indexA${$}][componentA${$}]`,C=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${m.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,m)};
            let offsetB${$} = ${b.broadcastedIndicesToOffset(`outputIndices${$}`,m)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${w}[${$}] = ${v}(${p(x,C)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(h,b,m)}

        ${l??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},td=(e,t,r,n,o,i,s=r.dataType)=>{let u=!_.areEqual(r.dims,n.dims),a=r.dims,d=_.size(r.dims),c=!1,l=!1,p=[u];if(u){let f=ke.calcShape(r.dims,n.dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");a=f,d=_.size(a);let m=_.size(r.dims)===1,h=_.size(n.dims)===1,b=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,y=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;p.push(m),p.push(h),p.push(b),p.push(y);let g=1;for(let w=1;w<a.length;w++){let $=r.dims[r.dims.length-w]??1,v=n.dims[n.dims.length-w]??1;if($===v)g*=$;else break}g%4===0?(l=!0,c=!0):(m||h||b||y)&&(c=!0)}else c=!0;return p.push(c),{name:e,shaderCache:{hint:t+p.map(f=>f.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:f=>ed(f,r.dims,n.dims,a,c,u,l,o,r.dataType,n.dataType,s,i),getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(_.size(a)/4)},...k(r.dims,n.dims,a)]})}},De=(e,t,r,n,o,i)=>{e.compute(td(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},Si=e=>{De(e,"Add",(t,r)=>`${t}+${r}`)},xi=e=>{De(e,"Div",(t,r)=>`${t}/${r}`)},Ii=e=>{De(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Ci=e=>{De(e,"Mul",(t,r)=>`${t}*${r}`)},Ti=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;De(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Ai=e=>{De(e,"Sub",(t,r)=>`${t}-${r}`)},Ei=e=>{De(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},ki=e=>{De(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Pi=e=>{De(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},zi=e=>{De(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var nd,od,id,sd,Bi,Di,Ri=E(()=>{"use strict";R();L();ae();W();nd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((a,d)=>{if(d!==t&&a!==n.dims[d])throw new Error("non concat dimensions must match")})}})},od=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,id=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},sd=(e,t,r,n)=>{let o=_.size(r),i=new Array(e.length),s=new Array(e.length),u=0,a=[],d=[],c=[{type:12,data:o}];for(let h=0;h<e.length;++h)u+=e[h].dims[t],i[h]=u,d.push(e[h].dims.length),s[h]=S(`input${h}`,n,d[h]),a.push("rank"),c.push({type:12,data:i[h]});for(let h=0;h<e.length;++h)c.push(...k(e[h].dims));c.push(...k(r));let l=A("output",n,r.length),p=l.indicesGet("indices",t),f=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),m=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let b=0;b<e.length;b++)h.registerUniform(`sizeInConcatAxis${b}`,"u32");return h.declareVariables(...s,l)})()}

  ${od(i.length,f)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${l.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${f});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${id(s,l)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:m}},Bi=(e,t)=>{let r=e.inputs,n=r[0].dims,o=_.normalizeAxis(t.axis,n.length);nd(r,o);let i=n.slice();i[o]=r.reduce((u,a)=>u+(a.dims.length>o?a.dims[o]:0),0);let s=r.filter(u=>_.size(u.dims)>0);e.compute(sd(s,o,i,r[0].dataType),{inputs:s})},Di=e=>U({axis:e.axis})});var Te,Ae,Ee,jt,Ve=E(()=>{"use strict";R();L();Te=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ae=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ee=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},jt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Vt,Nt];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var ce,Zt,Yt=E(()=>{"use strict";ce=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Zt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Qt,Rr=E(()=>{"use strict";Qt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var ad,ud,dt,Mi,dd,lt,ld,Xt,ct=E(()=>{"use strict";R();L();W();Ve();Yt();ad=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,ud=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,dt=(e,t,r="f32",n,o=!1,i=32,s=!1,u=32)=>{let a=t[1]*e[1],d=t[0]*e[0],c=o?a:i,l=o?i:a,p=c/t[0],f=i/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&c%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${c/p}>, ${l}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${a};

  let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ad(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ud(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Mi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,dd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",lt=(e,t,r="f32",n,o=!1,i=32,s=!1,u=32,a=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],l=o?d:i,p=o?i:d;if(!(p%t[1]===0&&l%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let f=p/t[1],m=l/t[0],h=i/t[1],b=a?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
          ${Mi(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Mi(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${dd(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${l}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;

    // Without this initialization strange values show up in acc.
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = 0.0;
      }
    }
    ${b}
  }
`},ld=(e,t,r,n,o,i=!1)=>{let[s,u,a]=o,[d,c,l,p]=n,f=Je(s,a),m=Je(u,a),h=X(n[0].type.tensor),b=()=>{let w=c.rank,$=d.rank,v=`var aIndices: ${c.type.indices};`;for(let x=w-2-1,C=$-1;x>=0;x--,C--)v+=`
aIndices[${x}] = ${$>1?`batchIndices[${C}]`:"batchIndices"};`;return f.forEach(x=>{v+=`
aIndices[${x}] = 0;`}),v+=`
aIndices[${w-2}] = u32(row);
                   aIndices[${w-1}] = u32(colIn);`,v},y=()=>{let w=l.rank,$=d.rank,v=`var bIndices: ${l.type.indices};`;for(let x=w-2-1,C=$-1;x>=0;x--,C--)v+=`
bIndices[${x}] = ${$>1?`batchIndices[${C}]`:"batchIndices"};`;return m.forEach(x=>{v+=`
bIndices[${x}] = 0;`}),v+=`
bIndices[${w-2}] = u32(row);
                   bIndices[${w-1}] = u32(colIn);`,v};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${ce(e,h)} {
      var value = ${ce(e,h)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${b()}
        value = ${c.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${ce(e,h)} {
      var value = ${ce(e,h)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ce(e,h)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${ce(e,h)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Xt=(e,t,r,n,o=!1)=>{let i=e[0].dims,s=e[1].dims,u=i.slice(0,-2),a=s.slice(0,-2),d=n?n.slice(0,-2):r.slice(0,-2),c=_.size(d),l=i[i.length-2],p=i[i.length-1],f=s[s.length-1],m=p%4===0&&f%4===0,h=l<=8?[4,1,1]:[4,4,1],b=[8,8,1],y=[Math.ceil(f/b[0]/h[0]),Math.ceil(l/b[1]/h[1]),Math.ceil(c/b[2]/h[2])],g=m?4:1,w=[...u,l,p/g],$=w.length,v=[...a,p,f/g],x=v.length,C=[c,l,f/g],I=[{type:6,data:l},{type:6,data:f},{type:6,data:p}];Ae(t,I),I.push(...k(d,w,v));let z=["rank","rank"],P=e.length>2;P&&(I.push(...k(e[2].dims)),z.push("rank")),I.push(...k(C));let G=J=>{let ne=d.length,Q=Wt("batchDims",e[0].dataType,ne,1),se=X(e[0].dataType),O=S("a",e[0].dataType,$,g),Y=S("b",e[1].dataType,x,g),K=A("result",e[0].dataType,C.length,g),q=[O,Y];if(P){let T=o?g:1;q.push(S("bias",e[2].dataType,e[2].dims.length,T))}let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ee(t,M);let H=X(K.type.tensor),V=Te(t,K.type.value,H),me=ld(g,P,V,[Q,O,Y,K],[u,a,d],o);return`
  ${J.registerUniforms(M).registerInternalVariables(Q).declareVariables(...q,K)}
  ${me}
  ${m?dt(h,b,se,Q):lt(h,b,se,Q)}
                   `};return{name:"MatMul",shaderCache:{hint:`${h};${t.activation};${m};${o}`,inputDependencies:z},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:I}),getShaderSource:G}}});var cd,Ui,Vi=E(()=>{"use strict";R();Me();W();Ve();Yt();Rr();ct();cd=(e,t,r,n,o=!1,i,s=4,u=4,a=4,d="f32")=>{let c=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},l=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${ce(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,w=e?t&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${ce(s,d)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${ce(s,d)}(0.0);`,$=`${l(u)}`,v=ce(a,d),x=e?ce(s,d):ce(u,d),C=e?ce(u,d):ce(s,d),I=Te(i,v,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${x} {
      ${e?w:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?$:w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${v}) {
      let col = colIn * ${a};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Zt(o)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ui=(e,t,r,n,o,i,s,u)=>{let a=t.format==="NHWC",d=a?e[0].dims[3]:e[0].dims[1],c=r[0],l=a?r[2]:r[3],p=a?r[1]:r[2],f=a?r[3]:r[1],m=a&&(d%4===0||d%3===0)&&f%4===0,h=a?f:l*p,b=a?l*p:f,y=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],w=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(c/y[2]/g[2])];re("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${w}`);let $=m?a&&d%4!==0?3:4:1,v=y[1]*g[1],x=y[0]*g[0],C=Math.max(y[0]*$,y[1]),I=n%v===0,z=o%x===0,P=i%C===0,G=m?[$,4,4]:[1,1,1],J=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ae(t,J),J.push(...k(e[0].dims,e[1].dims));let ne=["rank","rank"];s&&(J.push(...k(e[2].dims)),ne.push("rank")),J.push(...k(r));let Q=se=>{let O=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ee(t,O);let Y=m?4:1,K=X(e[0].dataType),q=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${K}>`:K}) {
        result[flatIndex] = ${m?`vec4<${K}>`:K}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${K}>`:K}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,M=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),H=S("w",e[1].dataType,e[1].dims.length,Y),V=[M,H],me=A("result",e[0].dataType,r.length,Y);if(s){let T=S("bias",e[2].dataType,e[2].dims.length,Y);V.push(T),q+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${K}>`:K} {
          return bias[coords.${a?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${Qt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${se.registerUniforms(O).declareVariables(...V,me)}
        ${q}
        ${cd(a,I,z,P,s,t,G[0],G[1],G[2],K)}
        ${m?dt(g,y,K,void 0,!a,C):lt(g,y,K,void 0,!a,C,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${m};${I};${z};${P};${v};${x};${C}`,inputDependencies:ne},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:J}),getShaderSource:Q}}});var Mr,Ni,Wi=E(()=>{"use strict";R();L();W();Ur();Ve();Mr=(e,t,r)=>{let n=e.length>2,o=n?"value += b[output_channel];":"",i=e[0].dims,s=e[1].dims,u=s[0]/t.group,a=t.format==="NHWC",d=Jt(i,s,t.dilations,t.pads,t.strides,a),c=_.size(d),l=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:u}];Ae(t,l),l.push(...k(i,s));let p=["rank","rank"];n&&(l.push(...k(e[2].dims)),p.push("rank")),l.push(...k(d));let f=m=>{let h=A("output",e[0].dataType,d.length),b=X(h.type.tensor),y=Te(t,h.type.value,b),g=S("x",e[0].dataType,i.length),w=S("w",e[1].dataType,s.length),$=[g,w];n&&$.push(S("b",e[2].dataType,e[2].dims.length));let v=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return Ee(t,v),`
  ${m.registerUniforms(v).declareVariables(...$,h)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${h.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${a?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${a?1:2}], outputIndices[${a?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel / uniforms.output_channels_per_group;

    var value: ${h.type.value} = ${h.type.value}(0);
    for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
      let input_channel = group_id * uniforms.w_shape[1] + wInChannel;
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[${a?1:2}]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[${a?2:3}]) {
            continue;
          }

          let xVal = ${a?g.get("batch","xHeight","xWidth","input_channel"):g.get("batch","input_channel","xHeight","xWidth")};
          let wVal = ${w.get("output_channel","wInChannel","wHeight","wWidth")};
          value += xVal*wVal;
        }
      }
    }
    ${o}
    ${y}
    ${h.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:t.cacheKey,inputDependencies:p},getRunData:()=>({outputs:[{dims:r?r(d):d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l}),getShaderSource:f}},Ni=(e,t,r)=>{let n=e.length>2,o=ee(r[3]),i=ee(r[2]),s=_.size(r)/o/i,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],a=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],d=[r[0],r[1],r[2],r[3]/o],c=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ae(t,c),c.push(...k(u,a,d));let l=(i-1)*t.strides[1]+a[1],p=f=>{let m=A("output",e[0].dataType,d.length,o),h=X(m.type.tensor),b=Te(t,m.type.value,h),y=S("x",e[0].dataType,u.length,o),g=S("w",e[1].dataType,a.length,o),w=[y,g];n&&w.push(S("b",e[2].dataType,e[2].dims,o));let $=n?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ee(t,v),`
  ${f.registerUniforms(v).declareVariables(...w,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${i}u;
    let col = (index1 % width1) * ${i}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${y.type.value}, ${l}>;
    var values: array<${m.type.value}, ${i}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${a[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${l}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${y.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${y.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${a[1]}; w_width++) {
          let w_val = ${g.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${i}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${i}u; i++) {
      var value = values[i];
      ${$}
      ${b}
      ${m.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${i};${l};${a[0]};${a[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:p}}});var Vr,pd,Gi,Nr=E(()=>{"use strict";R();L();ct();W();Ve();Vr=(e,t,r,n,o=!1)=>{let i=e[0].dims,s=e[1].dims,u=i[i.length-2],a=s[s.length-1],d=i[i.length-1],c=ee(a),l=ee(d),p=ee(u),f=_.size(r)/c/p,m=e.length>2,h=n?n.slice(0,-2):r.slice(0,-2),y=[_.size(h),u,a],g=[{type:12,data:f},{type:12,data:u},{type:12,data:a},{type:12,data:d}];Ae(t,g),g.push(...k(h,i,s)),m&&g.push(...k(e[2].dims)),g.push(...k(y));let w=$=>{let v=Wt("batch_dims",e[0].dataType,h.length),x=S("a",e[0].dataType,i.length,l),C=S("b",e[1].dataType,s.length,c),I=A("output",e[0].dataType,y.length,c),z=X(I.type.tensor),P=Te(t,I.type.value,z),G=[x,C],J="";if(m){let M=o?c:1;G.push(S("bias",e[2].dataType,e[2].dims.length,M)),J=`${o?`value += bias[col / ${M}];`:`value += ${I.type.value}(bias[row + i]);`}`}let ne=i.slice(0,-2),Q=s.slice(0,-2),se=Je(ne,h),O=Je(Q,h),Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ee(t,Y);let K=(M,H)=>{let V=M.rank,me=M.name;if(V===2)return`var ${me}_indices = ${M.type.indices}(0u, 0u);`;let T=v.rank,B=`var ${me}_indices: ${M.type.indices};`;for(let F=V-2-1,Ie=T-1;F>=0;F--,Ie--)B+=`
${me}_indices[${F}] = ${T>1?`batch_indices[${Ie}]`:"batch_indices"};`;return H.forEach(F=>{B+=`
${me}_indices[${F}] = 0;`}),B+=`${me}_indices[${V-2}] = 0u;
                     ${me}_indices[${V-1}] = 0u;`,B},q=()=>{let M=`var a_data: ${x.type.value};`;for(let H=0;H<l;H++)M+=`
              let b_data${H} = b[(b_offset + (k + ${H}) * uniforms.N + col) / ${c}];`;for(let H=0;H<p;H++){M+=`a_data = a[(a_offset + (row + ${H}) * uniforms.K + k) / ${l}];`;for(let V=0;V<l;V++)M+=`
            values[${H}] = fma(${C.type.value}(a_data${l===1?"":`[${V}]`}), b_data${V}, values[${H}]);
`}return M};return`
  ${$.registerUniforms(Y).registerInternalVariables(v).declareVariables(...G,I)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${K(x,se)}
    let a_offset = ${x.indicesToOffset("a_indices")};
    ${K(C,O)}
    let b_offset = ${C.indicesToOffset("b_indices")};
    var values: array<${I.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${l}) {
      ${q()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${J}
      ${P}
      let cur_indices = ${I.type.indices}(batch, row + i, col);
      let offset = ${I.indicesToOffset("cur_indices")};
      ${I.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${l};${p};${o}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:w}},pd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Gi=e=>{pd(e.inputs);let t=ke.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(Vr(e.inputs,{activation:""},t)):e.compute(Xt(e.inputs,{activation:""},t))}});var Jt,Wr,md,Li,Gr,fd,hd,Lr,Ur=E(()=>{"use strict";L();Vi();ct();Wi();Ve();Nr();Ze();Jt=(e,t,r,n,o,i)=>{let s=e[0],u=e.slice(i?1:2,i?3:4),a=u.length,d=t[0],l=t.slice(2).map((m,h)=>m+(m-1)*(r[h]-1)),f=u.map((m,h)=>m+n[h]+n[h+a]).map((m,h)=>Math.floor((m-l[h]+o[h])/o[h]));return f.splice(0,0,s),f.splice(i?3:1,0,d),f},Wr=[2,3,1,0],md=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support conv 1D and 2D");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Li=(e,t)=>{let r=e.kernelShape.slice();for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Fe.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},Gr=e=>{let t=jt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,s=e.kernel_shape,u=e.pads,a=e.strides,d=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,pads:u,strides:a,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},fd=(e,t,r)=>{let n=Li(r,t),o=r.format==="NHWC";if(r.group!==1){if(!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let C=Jt(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),I=e.kernelCustomData.wT??e.compute(ge(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=I);let z=[t[0],I];t.length===3&&z.push(t[2]),e.compute(Ni(z,n,C),{inputs:z})}else e.compute(Mr(t,n));return}let i=t.length===3,s=t[0].dims[o?1:2],u=t[0].dims[o?2:3],a=t[0].dims[o?3:1],d=t[1].dims[2],c=t[1].dims[3],l=Jt(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),p=l[o?1:2],f=l[o?2:3],m=l[o?3:1],h=o&&d===s&&c===u&&r.pads[0]===0&&r.pads[1]===0;if(h||d===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let x=l[0],C,I,z,P=[];if(o){let ne=e.kernelCustomData.wT??e.compute(ge(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ne),h){let Q=s*u*a;C=t[0].reshape([1,x,Q]),I=ne.reshape([1,Q,m]),z=[1,x,m]}else C=t[0].reshape([x,s*u,a]),I=ne.reshape([1,a,m]),z=[x,p*f,m];P.push(C),P.push(I)}else C=t[0].reshape([x,a,s*u]),I=t[1].reshape([1,m,a]),z=[x,m,p*f],P.push(I),P.push(C);i&&P.push(t[2]);let G=z[2],J=P[0].dims[P[0].dims.length-1];G<8&&J<8?e.compute(Vr(P,n,l,z,o),{inputs:P}):e.compute(Xt(P,n,l,z,o),{inputs:P});return}let b=!0,y=e.kernelCustomData.wT??e.compute(ge(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];i&&g.push(t[2]);let w=o?p*f:m,$=o?m:p*f,v=d*c*a;e.compute(Ui(g,n,l,w,$,v,i,b),{inputs:g})},hd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),a=Li({...t,pads:o,strides:i,dilations:s,kernelShape:u},n);e.compute(Mr(n,a,d=>r?[d[0],d[2],d[3]]:[]))},Lr=(e,t)=>{md(e.inputs,t),e.inputs[0].dims.length===3?hd(e,t):fd(e,e.inputs,t)}});var gd,Hi,qi=E(()=>{"use strict";R();Me();W();Ve();Yt();Rr();ct();gd=(e,t=!1,r,n,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},s=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,u=e?`
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
    `,a=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",d=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",c=e?"row":"col",l=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${c} / outWidth;
      let outCol = ${c} % outWidth;

      let WRow = ${l} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${l} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${a}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${d}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${l} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,f=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${n}(0.0);`,m=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${n}(0.0);
      `,h=Te(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?f:m}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?m:f}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${u}
      ${Zt(t)}
      ${h}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Hi=(e,t,r,n,o,i,s,u)=>{let a=t.format==="NHWC",d=a?e[0].dims[3]:e[0].dims[1],c=r[0],l=a?r[2]:r[3],p=a?r[1]:r[2],f=a?r[3]:r[1],m=a&&d%4===0&&d%3&&f%4===0,h=a?f:l*p,b=a?l*p:f,y=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],w=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(c/y[2]/g[2])];re("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${w}`);let $=m?4:1,v=Math.max(y[0]*$,y[1]),x=m?4:1,C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[C[0]+(t.dilations[0]<=1?0:(C[0]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(C[1]-1)*(t.dilations[1]-1))],z=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],P=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:C},{type:6,data:z}];Ae(t,P),P.push(...k(e[0].dims,e[1].dims));let G=["rank","rank"];s&&(P.push(...k(e[2].dims)),G.push("rank")),P.push(...k(r));let J=ne=>{let Q=S("x",e[0].dataType,e[0].dims.length,x),se=S("w",e[1].dataType,e[1].dims.length,1),O=A("result",e[0].dataType,r.length,x),Y=[Q,se],K="";if(s){let H=S("bias",e[2].dataType,e[2].dims.length,x);Y.push(H),K+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${H.type.value} {
            return bias[coords.${a?"w":"y"}${m?"/ 4":""}];
          }`}let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:C.length},{name:"pads",type:"i32",length:z.length}];Ee(t,q);let M=X(e[0].dataType,1);if(M!=="f16"&&M!=="f32")throw new Error(`elemType ${M} is not supported.`);return`
        ${Qt("uniforms.result_strides")}
        ${ne.registerUniforms(q).declareVariables(...Y,O)};
        ${K}
        ${gd(a,s,t,Q.type.value,$)}
        ${m?dt(g,y,M,void 0,!a,v):lt(g,y,M,void 0,!a,v,!1,void 0,u)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${y};${m}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:J}}});var yd,Hr,Fi=E(()=>{"use strict";R();Me();L();W();yd=(e,t,r,n,o,i=!1,s,u,a=!1)=>{let d=a?1:2,c=a?2:3,l=a?3:1,p=i?2:1,f=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;n&&(f+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${a?"w":"y"}${i?"/ 4":""}];
    }`);let m=i?4:1,h=S("W",t[1].dataType,t[1].dims.length,m),b=S("Dy",t[0].dataType,t[0].dims.length,m),y=[b,h];n&&y.push(S("bias",t[2].dataType,[r[l]].length,m));let g=A("result",t[0].dataType,r.length,m),w=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${p}>;
        for (var i = 0; i < ${p}; i++) {
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
              let d2Length = uniforms.Dy_shape[${l}];
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

        for (var i: u32 = 0; i < ${p}; i = i + 1) {
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,$=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",l)};
          let r = ${g.indicesGet("outputIndices",d)};
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
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${d}]) || fract(dyR) > 0.0 ||
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
                let xValue = ${a?b.get("batch","idyR","idyC","inputChannel"):b.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${h.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${s}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(u).declareVariables(...y,g)}
  ${f}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?w:$}}`},Hr=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=_.size(o),s=[Math.ceil(i/64),1,1];re("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let u=t.format==="NHWC",a=["rank","rank"],d=[t.strides[0],t.strides[1]],c=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],l=[t.dilations[0],t.dilations[1]],p=[c[0]+(t.dilations[0]<=1?0:(t.kernelShape[u?1:2]-1)*(t.dilations[0]-1)),c[1]+(t.dilations[1]<=1?0:(t.kernelShape[u?2:3]-1)*(t.dilations[1]-1))],f=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,h=t.group,b=e[1].dims,y=b[0]/h,g=b[1],w=[{type:12,data:i},{type:12,data:d},{type:12,data:c},{type:12,data:l},{type:12,data:p},{type:6,data:f},{type:12,data:y},{type:12,data:g},...k(e[0].dims,e[1].dims)];n&&(w.push(...k(e[2].dims)),a.push("rank")),w.push(...k(o));let $=s[1]===1&&s[2]===1,v=x=>{let C=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:d.length},{name:"filter_dims",type:"u32",length:c.length},{name:"dilations",type:"u32",length:c.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:f.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],I=X(e[0].dataType);return`${yd(x,e,o,n,$,m,I,C,u)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:a},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:v}}});var bd,wd,$d,Ki,ji,vd,_d,Sd,xd,Zi,Yi=E(()=>{"use strict";qi();Fi();Ve();Ze();bd=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,wd=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},$d=(e,t,r,n,o,i,s,u,a,d)=>{let c=e.length-2,l=d.length===0;if(a.length===0)for(let m=0;m<c;++m)a.push(0);let p=e[0],f=t[u?3:1]*o;for(let m=0,h=e.length-c-(u?1:0);m<c;++m,++h){let b=e[h],y=l?b*s[m]:d[m],g=bd(b,s[m],i[m],t[h],r[m],y);wd(g,n,i,m,m+c),l&&d.push(s[m]*(b-1)+a[m]+(t[h]-1)*r[m]+1-i[m]-i[m+c])}d.splice(0,0,p),d.splice(u?3:1,0,f)},Ki=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((l,p)=>l*p,1)===0){r.length=0;for(let l=2;l<t[1].dims.length;++l)r.push(t[1].dims[l])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,a=e.dilations.slice();if(a.reduce((l,p)=>l+p,0)===0){let l=t[0].dims.length-2;a=new Array(l).fill(1)}let d=e.strides.slice();if(d.reduce((l,p)=>l+p,0)===0){let l=t[0].dims.length-2;d=new Array(l).fill(1)}$d(u,r,a,e.autoPad,e.group,o,d,n,s,i);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:o,outputPadding:s,outputShape:i,dilations:a,strides:d}),c},ji=e=>{let t=jt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,s=e.kernelShape,u=e.pads,a=e.strides,d=e.wIsConst(),c=e.outputPadding,l=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,outputPadding:c,outputShape:l,pads:u,strides:a,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},vd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((c,l)=>c+l,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((c,l)=>c+l,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((c,l)=>c+l,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((c,l)=>c+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},_d=[2,3,1,0],Sd=(e,t,r)=>{let n=Ki(r,t),o=r.format==="NHWC",i=n.outputShape,s=i[o?3:1],u=t[0].dims[o?3:1];if(n.group!==1||s===1&&u===1){e.compute(Hr(t,n));return}let a=i[o?1:2],d=i[o?2:3],c=t[1].dims[2],l=t[1].dims[3],p=o?a*d:s,f=o?s:a*d,m=c*l*u,h=!0,b=e.kernelCustomData.wT??e.compute(ge(t[1],_d),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let y=[t[0],b],g=t.length===3;g&&(!o&&t[2].dims.length===1?y.push(t[2].reshape([t[2].dims[0],1,1])):y.push(t[2])),e.compute(Hi(y,n,i,p,f,m,g,h),{inputs:y})},xd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let a=Ki({...t,pads:u,strides:s,dilations:i,kernelShape:o},n);e.compute(Hr(n,a,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},Zi=(e,t)=>{vd(e.inputs,t),e.inputs[0].dims.length===3?xd(e,t):Sd(e,e.inputs,t)}});var Id,Qi,Xi,Ji=E(()=>{"use strict";R();L();ae();W();Id=(e,t,r,n)=>{let o=_.size(t),i=t.length,s=S("input",e,i),u=A("output",e,i),a=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=_.normalizeAxis(a,i),c=l=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=D("uniforms.input_shape","uniforms.axis",i),m=n.reverse?p+(n.exclusive?" + 1":""):"0",h=n.reverse?f:p+(n.exclusive?"":" + 1");return`
                ${l.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${l.mainStart()}
                  ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...k(t,t)]}),getShaderSource:c}},Qi=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Id(n,r,o,t),{inputs:[0]})},Xi=e=>{let t=e.exclusive===1,r=e.reverse===1;return U({exclusive:t,reverse:r})}});var Cd,Td,Ad,es,ts,rs=E(()=>{"use strict";R();L();ae();W();Cd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Td=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},Ad=(e,t)=>{let r,n,o,i,s,u,a=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";a?([r,n,o,i]=e.dims,s=c?[r,n,o,d,d,i/d**2]:[r,n,o,i/d**2,d,d],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,d,d,i/d**2,n,o]:[r,i/d**2,d,d,n,o],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let l=e.reshape(s),p=l.dims.length,f=e.dataType,m=S("a",f,p),h=A("output",f,p),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,h)}

  ${Td(u,p,m,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=a?[r,n*d,o*d,i/d**2]:[r,i/d**2,n*d,o*d],w=_.size(g),$=l.dims,v=_.sortBasedOnPerm($,u);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...k($,v)]}},getShaderSource:b}},es=(e,t)=>{Cd(e.inputs),e.compute(Ad(e.inputs[0],t))},ts=e=>U({blocksize:e.blocksize,mode:e.mode,format:e.format})});var qr,er,ns,Ed,kd,Fr,Kr,os,Pd,is,ss,as=E(()=>{"use strict";R();L();ae();W();qr="[a-zA-Z]|\\.\\.\\.",er="("+qr+")+",ns="^"+er+"$",Ed="("+er+",)*"+er,kd="^"+Ed+"$",Fr=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Kr=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(kd)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,a)=>{let d=t[a].dims.slice();if(!u.match(RegExp(ns)))throw new Error("Invalid LHS term");let c=this.processTerm(u,!0,d,a);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,a])=>a.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(er)))throw new Error("Invalid RHS");o.match(RegExp(qr,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(u);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,s=!1,u=[],a=0;if(!t.match(RegExp(ns))&&!r&&t!=="")throw new Error("Invalid LHS term");let d=t.match(RegExp(qr,"g")),c=new Fr(o);return d?.forEach((l,p)=>{if(l==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let f=i-d.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(a,a+f),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<u.length;m++){let h=String.fromCharCode("0".charCodeAt(0)+m);c.addSymbol(h,p+m),this.addSymbol(h,n[a++],o)}}else c.addSymbol(l,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(l,n[a++],o)}),c}},os=e=>e+"_max",Pd=(e,t,r,n)=>{let i=e.map(c=>c.length).map((c,l)=>S(`input${l}`,t,c)),s=_.size(n),u=A("output",t,n.length),a=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),d=c=>{let l=[],p="var prod = 1.0;",f="var sum = 0.0;",m="sum += prod;",h=[],b=[],y=[],g=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((v,x)=>{if(r.rhs.symbolToIndices.has(x)){let C=r.rhs.symbolToIndices.get(x)?.[0];C!==void 0&&r.lhs.forEach((I,z)=>{if(v.inputIndices.includes(z)){let P=I.symbolToIndices.get(x);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(G=>{l.push(`${i[z].indicesSet(`input${z}Indices`,G,u.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,I)=>{if(v.inputIndices.includes(I)){let z=C.symbolToIndices.get(x);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(P=>{h.push(`${i[I].indicesSet(`input${I}Indices`,P,`${x}`)}`)}),g.push(`prod *= ${i[I].getByIndices(`input${I}Indices`)};`)}}),b.push(`for(var ${x}: u32 = 0; ${x} < uniforms.${os(x)}; ${x}++) {`),y.push("}")});let $=w?[...l,`let sum = ${i.map((v,x)=>v.getByIndices(`input${x}Indices`)).join(" * ")};`]:[...l,f,...b,...h,p,...g,m,...y];return`
            ${c.registerUniforms(a.map(v=>({name:`${os(v)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((v,x)=>`var input${x}Indices: ${i[x].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let c=a.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));c.push({type:12,data:s});let l=e.map((p,f)=>[...k(p)]).reduce((p,f)=>p.concat(f),c);return l.push(...k(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}},getShaderSource:d}},is=(e,t)=>{let r=new Kr(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,s)=>i.dims);e.compute(Pd(o,e.inputs[0].dataType,r,n))},ss=e=>{let t=e.equation.replace(/\s+/g,"");return U({equation:t})}});var zd,us,Od,Bd,ds,ls=E(()=>{"use strict";R();L();W();zd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},us=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Od=(e,t)=>e.length>t.length?us(e,t):us(t,e),Bd=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Od(t,r),o=e[0].dataType,i=o===9?4:1,s=Math.ceil(_.size(n)/i),u=d=>{let c=S("input",o,t.length,i),l=A("output",o,n.length,i),p;if(o===9){let f=(m,h,b="")=>`
          let outputIndices${h} = ${l.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${c.broadcastedIndicesToOffset(`outputIndices${h}`,l)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${m}[${h}] = ${b}(${c.getByOffset(`index${h}`)}[component${h}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${f("data",0,"u32")}
        ${f("data",1,"u32")}
        ${f("data",2,"u32")}
        ${f("data",3,"u32")}
        ${l.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${l.offsetToIndices("global_idx")};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",l)};
        ${l.setByOffset("global_idx",c.getByOffset("inputOffset"))}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(c,l)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},a=[{type:12,data:s},...k(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},ds=e=>{zd(e.inputs),e.compute(Bd(e.inputs),{inputs:[0]})}});var Dd,cs,ps=E(()=>{"use strict";R();L();W();Kt();Dd=e=>{let t=e[0].dataType,r=_.size(e[0].dims),n=_.size(e[1].dims),o=n%4===0,i=s=>{let u=S("x",t,[1],4),a=S("bias",t,[1],4),d=A("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],l=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${a.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,p=o?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${l(0)}${l(1)}${l(2)}${l(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,a,d)}

    ${Br(le(t))}

    ${s.mainStart(Ke)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Dr("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ke/4)}})}},cs=e=>{e.inputs.length<2||_.size(e.inputs[1].dims)===0?yi(e):e.compute(Dd(e.inputs))}});var Rd,Md,ms,fs,hs=E(()=>{"use strict";R();L();ae();W();Rd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Md=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=_.normalizeAxis(t.axis,o),s=r.slice(0);s.splice(i,1,...n);let u=r[i],a=e[0].dataType===9?4:1,d=Math.ceil(_.size(s)/a),c=[{type:12,data:d},{type:6,data:u},{type:12,data:i},...k(e[0].dims,e[1].dims,s)],l=p=>{let f=S("data",e[0].dataType,e[0].dims.length,a),m=S("inputIndices",e[1].dataType,e[1].dims.length),h=A("output",e[0].dataType,s.length,a),b=g=>{let w=n.length,$=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let v=0;v<w;v++)$+=`${w>1?`indicesIndices${g}[${v}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${v}]`:`outputIndices${g}`};`;$+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${f.type.indices};
        `;for(let v=0,x=0;v<o;v++)v===i?($+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = u32(idx${g});`,x+=w):($+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${x}]`:`outputIndices${g}`};`,x++);return $},y;if(e[0].dataType===9){let g=(w,$,v="")=>`
          let outputIndices${$} = ${h.offsetToIndices(`outputOffset + ${$}u`)};
          ${b($)};
          let offset${$} = ${f.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${w}[${$}] = ${v}(${f.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${a};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${f.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,h)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:l}},ms=e=>U({axis:e.axis}),fs=(e,t)=>{let r=e.inputs;Rd(r),e.compute(Md(e.inputs,t))}});var Ud,Vd,gs,ys,bs=E(()=>{"use strict";R();L();ae();W();Ud=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Vd=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,s=e[1].dataType,u=_.normalizeAxis(t.axis,o),a=r[u],d=i.slice(0),c=_.size(d),l=S("input",n,o),p=S("indicesInput",s,i.length),f=A("output",n,d.length),m=[{type:12,data:c},{type:6,data:a},{type:12,data:u}];return m.push(...k(r,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(l,p,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${l.type.indices}(outputIndices);
      ${l.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${l.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},gs=e=>U({axis:e.axis}),ys=(e,t)=>{let r=e.inputs;Ud(r),e.compute(Vd(e.inputs,t))}});var Nd,Wd,ws,$s,vs=E(()=>{"use strict";R();L();W();Nd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Wd=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,s]=Ut.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let a=_.size(u),d=[{type:12,data:a},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],c=["type","type"];e.length===3&&(d.push(...k(e[2].dims)),c.push("rank")),d.push(...k(u));let l=p=>{let f="";t.transA&&t.transB?f="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?f="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?f="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(f="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let m=t.alpha===1?"":"value *= uniforms.alpha;",h=S("a",e[0].dataType,e[0].dims),b=S("b",e[1].dataType,e[1].dims),y=h.type.value,g=null,w=[h,b];e.length===3&&(g=S("c",e[2].dataType,e[2].dims.length),w.push(g));let $=A("output",e[0].dataType,u.length);w.push($);let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms(v).declareVariables(...w)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${y}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${f}
    }

    ${m}
    ${(()=>g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",$)}; value += ${y}(uniforms.beta) * ${g.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:l}},ws=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},$s=(e,t)=>{Nd(e.inputs),e.compute(Wd(e.inputs,t))}});var ye,Hd,Ss,_s,qd,pt,xs,jr=E(()=>{"use strict";R();L();ae();Mt();Ht();W();Ze();ye=(e,t)=>e.length>t&&e[t].dims.length>0&&_.size(e[t].dims)>0?e[t]:void 0,Hd=(e,t)=>{let r=e[0],n=ye(e,1),o=ye(e,2),i=ye(e,3),s=ye(e,4),u=ye(e,5),a=ye(e,6),d=ye(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=!1,l=r.dims[0],p=r.dims[1],f=r.dims.length===3?c?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=p,h=0,b=0,y=Math.floor(f/t.numHeads);if(a&&d){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims[0]!==l||a.dims[1]!==t.numHeads||a.dims[3]!==y)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[3]!==y)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(a.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=a.dims[2],b=a.dims[2]}else if(a||d)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');g=2,m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,m=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}if(i){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(o&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=0;if(s){w=8;let I=s.dims;throw I.length===1?I[0]===l?w=1:I[0]===3*l+2&&(w=3):I.length===2&&I[0]===l&&I[1]===m&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, kv_sequence_length)'):new Error("Mask not supported")}let $=!1,v=f;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],$=!0}}let x=h+m,C=!1;if(s)throw new Error("Key padding mask is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "relative_position_bias" is expected to have 4 dimensions');if(u.dims[0]!==l&&u.dims[0]!==1||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==x)throw new Error('Input "relative_position_bias" shape (batch_size, 1, sequence_length, kv_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:v,headSize:y,vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:C,passPastInKv:$,qkvFormat:g}},Ss=e=>U({...e}),_s=U({perm:[0,2,1,3]}),qd=(e,t,r,n,o,i,s)=>{let u=[n,o,i],a=_.size(u),d=[{type:12,data:a},{type:12,data:s},{type:12,data:i}],c=l=>{let p=A("qkv_with_bias",t.dataType,u),f=S("qkv",t.dataType,u),m=S("bias",r.dataType,u),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${l.registerUniforms(h).declareVariables(f,m,p)}
  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},pt=(e,t,r,n,o,i,s,u)=>{let a=i;if(s){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return a=qd(e,i,s,t,n,r*o,u),a=a.reshape([t,n,r,o]),e.compute(ge(a,_s.perm),{inputs:[a],outputs:[-1]})[0]}else return i.dims.length===3&&(a=i.reshape([t,n,r,o])),e.compute(ge(a,_s.perm),{inputs:[a],outputs:[-1]})[0]},xs=(e,t)=>{let r=Hd(e.inputs,t),n=e.inputs[0],o=ye(e.inputs,1),i=ye(e.inputs,2),s=ye(e.inputs,3),u=ye(e.inputs,4),a=ye(e.inputs,5),d=ye(e.inputs,6),c=ye(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let l=o&&i&&o.dims.length===4&&i.dims.length===4,p=pt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(l)return et(e,p,o,i,u,void 0,d,c,a,r,t);if(!o||!i)throw new Error("key and value must be provided");let f=pt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),m=pt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,s,2*r.hiddenSize);et(e,p,f,m,u,void 0,d,c,a,r,t)}});var Is,Fd,Kd,Zr,Cs,Yr=E(()=>{"use strict";R();L();W();Is=e=>Array.from(e.getBigInt64Array(),Number),Fd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Is(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Kd=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Zr=(e,t)=>{let r=e[0].dims,n=t??Is(e[1]),o=Kd(r,n),i=_.size(o),s=e[0].dataType,u=S("input",s,r.length),a=A("output",s,o.length),d=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,a)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${a.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${a.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${a.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...k(e[0].dims,o)]}),getShaderSource:d}},Cs=e=>{Fd(e.inputs),e.compute(Zr(e.inputs),{inputs:[0]})}});var jd,Ts,Es,Zd,As,ks,Ps=E(()=>{"use strict";R();L();ae();Ht();W();jr();Yr();Ze();jd=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],s=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,a=r.dims[0],d=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],l=d,p=0,f=0,m=Math.floor(c/t.numHeads),h=i&&i.dims.length!==0,b=s&&s.dims.length!==0,y=!0;if(h&&b){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y?(p=i.dims[1],f=i.dims[1]):(p=i.dims[2],f=i.dims[2])}else if(h||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=2,l=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,l=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,l=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let w=0,$=!1,v=c;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(l!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(l!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],$=!0}}let x=p+l,C=!1;return{batchSize:a,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:l,totalSequenceLength:x,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:c,vHiddenSize:v,headSize:m,vHeadSize:Math.floor(v/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:C,passPastInKv:$,qkvFormat:g,isPastkvBSNH:y}},Ts=(e,t,r,n)=>{let o=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,s=_.size(o)/i,u=n.totalSequenceLength,a=A("present_kv",r,o.length,i),d=S("new_kv",e.dataType,e.dims.length,i),c=t?S("past_kv",t.dataType,t.dims.length,i):void 0,l=Math.ceil(n.headSize/i),p={x:u,y:e.dims[0],z:1},f=t?["rank","rank"]:["rank"],m=[{type:12,data:s},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],h=[d];c?(m.push(...k(e.dims),...k(t.dims),...k(o)),h.push(c)):m.push(...k(e.dims),...k(o));let b=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],y=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,g=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,w=t?`if (s < past_seqlen) {
        ${y}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${g}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${g}
        }`,$=v=>`

  ${v.registerUniforms(b).declareVariables(...h,a)}
  ${v.mainStart([l,n.kvNumHeads,1])}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${a.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${n.kvNumHeads}u;
    let H = ${l}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${n.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${w}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${l}${!!t}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:p,programUniforms:m}),getShaderSource:$}},Es=e=>U({...e}),Zd=U({perm:[0,2,1,3]}),As=(e,t,r,n,o)=>{let i=t,s=n.kvNumHeads,u=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(i=t.reshape([n.batchSize,n.kvSequenceLength,s,n.headSize])),r?i=e.compute(Ts(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?o:-1]})[0]:i=e.compute(Ts(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?o:-1]})[0],u!==1&&(i=e.compute(Zr([i],[1,1,1,u]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,s*u,n.headSize])),e.compute(ge(i,Zd.perm),{inputs:[i],outputs:[-1]})[0]},ks=(e,t)=>{let r=jd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=pt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,s=As(e,e.inputs[1],o,r,1),u=As(e,e.inputs[2],i,r,2);et(e,n,s,u,void 0,void 0,void 0,void 0,void 0,r,t)}});var Yd,Qd,Xd,zs,Os=E(()=>{"use strict";R();L();W();Yd=(e,t)=>{let r=e[0].dims,n=r,o=2,i=_.sizeToDimension(r,o),s=_.sizeFromDimension(r,o),u=ee(s),a=s/u,d=[r[0],r[1],a],c=["rank","type","type"],l=[{type:12,data:s},{type:12,data:a}];l.push(...k(d,d));let p=f=>{let m=S("x",e[0].dataType,d.length,u),h=S("scale",e[1].dataType,e[1].dims),b=S("bias",e[2].dataType,e[2].dims),y=A("output",e[0].dataType,d.length,u),g=[m,h,b,y],w=m.type.value,$=u===1?"f32":`vec${u}<f32>`,v=64,x=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${$}, ${v}>;
  const workgroupSize = ${v}u;
  ${f.registerUniforms(x).declareVariables(...g)}
  ${f.mainStart(v)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${$}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${$}(${m.get("batch","channel","h")});
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the mean of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      meanShared = ${Ce("workgroupShared[0]",u)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${$}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${$}(${m.get("batch","channel","h")}) - ${$}(meanShared);
      initial = initial + deviation * deviation;
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the sum of square of deviation of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      squaredNormShared = ${Ce("workgroupShared[0]",u)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${h.getByOffset("channel")});
    let channelShift = f32(${b.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${m.get("batch","channel","h")} * ${w}(${$}(channelScale)) + ${w}(${$}(channelShift));
      ${y.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:i},programUniforms:l}),getShaderSource:p}},Qd=(e,t,r,n,o,i,s,u)=>{let a=ee(s),d=64,c=a===1?"vec2f":`mat2x${a}f`,l=a===1?"f32":`vec${a}f`,p=(x,C)=>`${c}(${x}, ${C})`,f=o*s/a,m=Math.ceil(i/d),h=["type"],b=[{type:12,data:m},{type:12,data:i},{type:12,data:Math.floor(s/a)},{type:12,data:Math.floor(i*s/a)}],y=x=>{let C=S("input",t.dataType,t.dims,a);return`
  ${x.declareVariables(C)}
  @group(0) @binding(1) var<storage, read_write> output : array<${c}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${x.mainStart(d)}
    let currentImageNumber = global_idx / ${d} / uniforms.C;
    let currentChannelNumber = (global_idx / ${d}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${Ue("f32",a)};
    var squaredSum = ${Ue("f32",a)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${l}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${p("sum","squaredSum")};
  }`},g=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${a}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:[o,s,d,2],dataType:1}],dispatchGroup:{x:o*s/a},programUniforms:b}),getShaderSource:y},{inputs:[t],outputs:[-1]})[0],w=[{type:12,data:f},{type:12,data:i},{type:12,data:Math.floor(s/a)},{type:12,data:Math.floor(d*s/a)}],$=["type","type","type"],v=x=>{let C=S("scale",r.dataType,r.dims,a),I=S("bias",n.dataType,n.dims,a);return`
  @group(0) @binding(0) var<storage, read> input : array<${c}>;
  @group(0) @binding(1) var<storage, read> scale : array<${C.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${I.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${c}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${Ue("f32",a)};
    var squaredSum = ${Ue("f32",a)};
    for (var i: u32 = 0; i < min(${d}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${d}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${u}));
    let channelScale = invStdDev * ${l}(scale[currentChannelNumber]);
    let channelShift = ${l}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${p("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${a};${u}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:[o,s,2],dataType:1}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v},{inputs:[g,r,n],outputs:[-1]})[0]},Xd=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],s=n[n.length-1],u=_.sizeFromDimension(n,1)/s,a=ee(s),d=_.size(o)/a,c=[{type:12,data:u},{type:12,data:Math.floor(s/a)}],l=["type","type"],p=Qd(e,t[0],t[1],t[2],i,u,s,r.epsilon),f=m=>{let h=X(t[0].dataType),b=a===1?"vec2f":`mat2x${a}f`,y=a===1?h:`vec${a}<${h}>`,g=S("input",t[0].dataType,t[0].dims,a),w=A("output",t[0].dataType,o,a);return`
  @group(0) @binding(0) var<storage, read> input : array<${g.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${b}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${w.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${m.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${y}(scale[0]), ${y}(scale[1]));
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${a}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:f},{inputs:[t[0],p]})},zs=(e,t)=>{t.format==="NHWC"?Xd(e,e.inputs,t):e.compute(Yd(e.inputs,t))}});var Jd,el,Bs,Ds=E(()=>{"use strict";R();L();W();Jd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},el=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],s=!n&&e[2],u=o,a=_.normalizeAxis(t.axis,o.length),d=_.sizeToDimension(o,a),c=_.sizeFromDimension(o,a),l=_.size(i.dims),p=s?_.size(s.dims):0;if(l!==c||s&&p!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${l} and bias size of ${p}`);let f=[];for(let v=0;v<o.length;++v)v<a?f.push(o[v]):f.push(1);let m=ee(c),h=["type","type"],b=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:t.epsilon}];s&&h.push("type");let y=r>1,g=r>2,w=v=>{let x=X(e[0].dataType),C=[S("x",e[0].dataType,e[0].dims,m),S("scale",i.dataType,i.dims,m)];s&&C.push(S("bias",s.dataType,s.dims,m)),C.push(A("output",e[0].dataType,u,m)),y&&C.push(A("mean_data_output",1,f)),g&&C.push(A("inv_std_output",1,f));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${v.registerUniforms(I).declareVariables(...C)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ue("f32",m)};
    var mean_square_vector = ${Ue("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${je(x,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ce("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ce("mean_square_vector",m)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${je(x,m,"x[j + offset]")};
      let f32scale = ${je(x,m,"scale[j]")};
      output[j + offset] = ${C[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${je(x,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:u,dataType:e[0].dataType}];return y&&$.push({dims:f,dataType:1}),g&&$.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${n}`,inputDependencies:h},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:w}},Bs=(e,t)=>{Jd(e.inputs),e.compute(el(e.inputs,t,e.outputCount))}});var tl,rl,Rs,Ms,Us=E(()=>{"use strict";R();L();ae();W();tl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!_.areEqual(s.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let a=e[2].dims;if(_.size(a)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let c=e[3].dims,l=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(_.size(c)!==l)throw new Error("zeroPoints input size error.")}},rl=(e,t,r,n)=>{let o=e[0].dims,i=o.length,s=Math.floor((t.k+t.blockSize-1)/t.blockSize),u=o[i-2],a=t.k,d=t.n,c=o.slice(0,i-2),l=_.size(c),f=t.blockSize/8*t.bits/4,m=e[0].dataType,h=ee(u),b=ee(t.k),y=ee(f),g=qe(m),w=u*s*g,$=Math.floor(n/w),v=s<=r[0]&&$>0,x=!v||$>=4?ee(d):$>=2&&ee(d)>=2?2:1,C=c.concat([u,d]),I=_.size(C)/x/h,z=v?[]:[{type:12,data:I},{type:12,data:t.blockSize}],P=[l,u,a/b],G=_.convertShape(e[1].dims).slice();G.splice(-1,1,f/y),z.push(...k(P)),z.push(...k(G)),z.push(...k(e[2].dims)),e.length===4&&z.push(...k(_.convertShape(e[3].dims)));let J=[l,u,d/x];z.push(...k(J));let ne=Q=>{let se=P.length,O=S("a",e[0].dataType,se,b),Y=S("b",12,G.length,y),K=S("scales",e[2].dataType,e[2].dims.length),q=[O,Y,K],M=e.length===4?S("zero_points",12,e[3].dims.length):void 0;M&&q.push(M);let H=J.length,V=A("output",e[0].dataType,H,x),me=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],T=X(e[0].dataType),B=(()=>{switch(b){case 1:return`array<${T}, 8>`;case 2:return`mat4x2<${T}>`;case 4:return`mat2x4<${T}>`;default:throw new Error(`${b}-component is not supported.`)}})(),F=`
        for (var word: u32 = 0; word < ${f}; word += ${y}) {
          ${Y.indicesSet("b_indices","2","word")};
          let b_data = ${Y.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${y}; i++) {
            let b_value: u32 = ${y===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${B}(${Array.from({length:4},(fe,ue)=>`${T}(b_value_lower[${ue}]), ${T}(b_value_upper[${ue}])`).join(", ")});
            let b_dequantized_values = ${(()=>b===1?`${B}(${Array.from({length:8},(fe,ue)=>`(b_quantized_values[${ue}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${B}(${Array(8).fill("zero_point").join(",")})) * scale;`)()};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${v?u:h}u; m++) {
              ${O.indicesSet("a_indices",se-2,v?"m":`row * ${h} + m`)};
              ${O.indicesSet("a_indices",se-1,"word_offset")};
              var input_offset = ${O.indicesToOffset("a_indices")};
              var a_data: ${B};
              for (var j: u32 = 0; j < ${8/b}; j++) {
                a_data[j] = ${O.getByOffset("input_offset")};
                input_offset++;
              }
              ${v?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${x>1?"[c]":""} += ${Array.from({length:8/b},(fe,ue)=>`${b===1?`a_data[${ue}] * b_dequantized_values[${ue}]`:`dot(a_data[${ue}], b_dequantized_values[${ue}])`}`).join(" + ")};
            }
            word_offset += ${8/b};
          }
        }`,Ie=M?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${M.getByOffset("zero_point_index")};
          }`:"";return v?`
        var<workgroup> workgroup_shared: array<${V.type.value}, ${u*s}>;
        ${Q.declareVariables(...q,V)}
        ${Q.mainStart([s,1,1])}
          var a_indices: ${O.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${O.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${x}; c++) {
            let col_times_components_plus_c = col * ${x} + c;
              ${M?`
            var zero_point_bytes_per_col: u32 = (${s} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${M.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${Y.type.indices};
            ${Y.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${s} + block;
            let scale = ${K.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${T}(${M?"(zero_point_word) & 0xFu":8});
            ${Y.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${t.blockSize/b};
            var workgroup_shared_offset: u32 = block * ${u};
            ${F}
          }
          workgroupBarrier();
          var output_indices: ${V.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(u/s)};
          ${V.indicesSet("output_indices","0","batch")};
          ${V.indicesSet("output_indices",H-1,"col")};
          ${V.indicesSet("output_indices",H-2,"local_id.x * elements_per_thread")};
          var output_offset = ${V.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${u}) {
              var output_value: ${V.type.value} = ${V.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${s}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${u};
              }
              ${V.setByOffset("output_offset","output_value")};
              output_offset += ${d/x};
            }
          }
        }`:`
        ${Q.registerUniforms(me).declareVariables(...q,V)}
        ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${V.type.value}, ${h}>;
          var output_indices = ${V.offsetToIndices("global_idx")};
          var col = ${V.indicesGet("output_indices",H-1)};
          var row = ${V.indicesGet("output_indices",H-2)};
          var a_indices: ${O.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${M?`
          var zero_point_abs_offset = col * ${x} * ((${s} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${M.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${s*x};
          var b_indices: ${Y.type.indices};
          for (var c: u32 = 0; c < ${x}; c++) {
            ${Y.indicesSet("b_indices","0",`col * ${x} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${s}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${K.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${T}(${M?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${Y.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${F}
              scale_index++;
              ${Ie}
              block_offset += uniforms.block_size / ${b};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${M?`if (zero_point_offset % 8 > 0) {
                ${Ie}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${h}u; k++) {
              ${V.indicesSet("output_indices",H-2,`${h} * row + k`)};
              ${V.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:v?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${t.cacheKey};${u};${m};${e.length}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:C,dataType:m}],name:v?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:v?{x:1,y:Math.ceil(d/x),z:l}:{x:Math.ceil(I/64)},programUniforms:z}),getShaderSource:ne}},Rs=(e,t)=>{tl(e.inputs,t);let r=e.getMaxComputeWorkgroupSizes(),n=e.getMaxComputeWorkgroupStoragesize();e.compute(rl(e.inputs,t,r,n))},Ms=e=>U(e)});var nl,ol,il,sl,al,ul,dl,ll,Vs,Ns=E(()=>{"use strict";R();L();W();nl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ol=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${D("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${D("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${D("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},il=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${D("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${D("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${D("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${D("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},sl=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${D("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${D("uniforms.x_shape",o,t)})) {
                  k = i32(${D("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${D("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},al=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${D("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${D("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${D("uniforms.x_shape",o,t)})) {
                  k -= i32(${D("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${D("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},ul=(e,t,r)=>{switch(r.mode){case 0:return ol(e,t,r.pads.length);case 1:return il(e,t,r.pads.length);case 2:return sl(e,t,r.pads.length);case 3:return al(e,t,r.pads.length);default:throw new Error("Invalid mode")}},dl=(e,t)=>{let r=_.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=_.size(r),i=[{type:12,data:o},{type:6,data:t.pads}];t.mode===0&&i.push({type:e[0].dataType,data:t.value}),i.push(...k(e[0].dims,r));let s=["rank"],u=a=>{let d=A("output",e[0].dataType,r.length),c=S("x",e[0].dataType,n.length),l=c.type.value,p=ul(d,n.length,t),f=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&f.push({name:"constant_value",type:l}),`
            ${a.registerUniforms(f).declareVariables(c,d)}
            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${p}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_.size(r)/64)},programUniforms:i}),getShaderSource:u}},ll=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let a=0;a<u.length;a++)i[Number(u[a])]=Number(r[a]),i[Number(u[a])+o]=Number(r[a+u.length])}else r.forEach((u,a)=>i[Number(a)]=Number(u));let s=[];return i.forEach(u=>s.push(u)),{mode:t.mode,value:n,pads:s}}else return t},Vs=(e,t)=>{nl(e.inputs);let r=ll(e.inputs,t);e.compute(dl(e.inputs,r),{inputs:[0]})}});var tr,Ws,Gs,Ls,Hs,cl,pl,qs,Fs,Ks,js,Zs,Ys,Qs,Xs,Js,ea,ta,ra,na=E(()=>{"use strict";_e();R();L();W();tr=e=>{if(j.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Ws=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),a=i?t.dilations.slice():[],d=t.pads.slice();Fe.adjustPoolAttributes(r,o,s,u,a,d);let c=Fe.computePoolOutputShape(r,o,u,a,s,d,t.autoPad),l=Object.assign({},t);i?Object.assign(l,{kernelShape:s,strides:u,pads:d,dilations:a,cacheKey:t.cacheKey}):Object.assign(l,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let p=c.slice();return p.push(p.splice(1,1)[0]),[l,n?p:c]},Gs=(e,t)=>{let r=t.format==="NHWC",n=_.size(e),o=_.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],a=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],l=!!(d+c);i.push({type:12,data:u},{type:12,data:a},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],h=t.pads[t.pads.length/2-2],b=t.pads[t.pads.length-2];p=!!(h+b),i.push({type:12,data:f},{type:12,data:m},{type:12,data:h},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,l,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=_.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let a=t.pads.reduce((d,c)=>d+c);return[i,s,!!a,!1,!1]}},Ls=(e,t,r,n,o,i,s,u,a,d,c,l)=>{let p=o.format==="NHWC",f=t.type.value,m=A("output",t.type.tensor,n);if(o.kernelShape.length<=2){let h="",b="",y="",g=r-(p?2:1);if(c?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=r-(p?3:2);l?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(a).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${b}
              ${h}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,b=o.pads.length,y="";return d?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(a).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${D("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${D("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${r-h}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${D("uniforms.strides",`j - ${r-h}u`,h)}
                    + offsets[j - ${r-h}u] - ${D("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},Hs=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,cl=e=>`${Hs(e)};${e.countIncludePad}`,pl=e=>`${Hs(e)};${e.storageOrder};${e.dilations}`,qs=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Fs=(e,t,r,n)=>{let[o,i]=Ws(t,n,r),s=S("x",t.dataType,t.dims.length),u=s.type.value,a="value += x_val;",d="";o.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,l,p,f,m]=Gs(i,o);c.push(...k(t.dims,i));let h=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${p};${f};${m}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(_.size(i)/64)},programUniforms:c}),getShaderSource:b=>Ls(b,s,t.dims.length,i.length,o,a,d,0,l,p,f,m)}},Ks=e=>{let t=e.count_include_pad!==0,r=qs(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:cl(n)}},js=(e,t)=>{tr(e.inputs),e.compute(Fs("AveragePool",e.inputs[0],!1,t))},Zs={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Ys=e=>{let t=e.format;return{format:t,...Zs,cacheKey:t}},Qs=(e,t)=>{tr(e.inputs),e.compute(Fs("GlobalAveragePool",e.inputs[0],!0,t))},Xs=(e,t,r,n)=>{let[o,i]=Ws(t,n,r),s=`
      value = max(x_val, value);
    `,u="",a=S("x",t.dataType,t.dims.length),d=["rank"],[c,l,p,f,m]=Gs(i,o);return c.push(...k(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${f};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(_.size(i)/64)},programUniforms:c}),getShaderSource:h=>Ls(h,a,t.dims.length,i.length,o,s,u,t.dataType===10?-65504:-1e5,l,p,f,m)}},Js=(e,t)=>{tr(e.inputs),e.compute(Xs("MaxPool",e.inputs[0],!1,t))},ea=e=>{let t=e.storage_order,r=e.dilations,n=qs(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:pl(o)}},ta=e=>{let t=e.format;return{format:t,...Zs,cacheKey:t}},ra=(e,t)=>{tr(e.inputs),e.compute(Xs("GlobalMaxPool",e.inputs[0],!0,t))}});var fl,hl,oa,ia=E(()=>{"use strict";_e();R();W();fl=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},hl=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],s=o,u=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...k(i)],a=d=>{let c=A("output",n,i.length),l=c.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:l},{name:"delta",type:l}];return`
        ${d.registerUniforms(p).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${l}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:a,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},oa=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),j.webgpu.validateInputContent&&fl(t,r,n),e.compute(hl(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var gl,yl,bl,wl,$l,vl,_l,Sl,xl,Il,Cl,sa,Tl,Al,El,kl,Pl,aa,ua,da=E(()=>{"use strict";R();L();ae();W();gl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},yl=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},bl=(e,t,r,n,o,i)=>{let[s,u,a]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>i.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length>0){if(e[u].getFloat32Array().forEach(c=>n.push(c)),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");gl(n,t),t.axes.length>0&&yl(n,t.axes,d).forEach((c,l)=>n[l]=c)}if(a>0&&e.length>a&&(e[a].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==d||r>=18&&o.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},wl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",$l=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",vl=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,s)=>{n[i]=o[s],n[s+r]=o[t.length+s]}),n):o},_l=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,s)=>o[i]=r[s])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,s)=>Math.round(i*t[s]))}return o},Sl=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,s)=>o[s]=Math.round(i*t[s]))),o},xl=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${D("uniforms.scales","i",n)};
        var roi_low = ${D("uniforms.roi","i",o)};
        var roi_hi = ${D("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${D("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Il=(e,t,r,n,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${D("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${D("uniforms.roi","i",i)};
          var roi_hi = ${D("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${D("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,Cl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${D("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,sa=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Tl=(e,t,r,n,o)=>{let[s,u,a,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",a,`max(0, min(col, ${r[a]} - 1))`)};
      ${sa(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${u}];
      var col:${c} = originalIndices[${a}];
      ${n?`if (row < 0 || row > (${r[u]} - 1) || col < 0 || col > (${r[a]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[u]} - 1));
      col = max(0, min(col, ${r[a]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},Al=(e,t,r,n,o,i,s,u,a,d)=>{let c=r.length===2,l=!0,[p,f]=c?[0,1]:l?[2,3]:[1,2],m=e.type.value,h=b=>{let y=b===p?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[b]},
        ${n[b]}, ${r[b]}, ${i[b]}, ${i[b]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${a};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${m} = originalIdx + ${m}(i);
          if (${y} < 0 || ${y} >= ${r[b]}) {
            ${(()=>d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${a};`:`${y} = max(0, min(${y}, ${r[b]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${y})`)};
          data[i + 1] = ${b===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(p)};
    ${h(f)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},El=(e,t,r,n,o)=>{let[s,u,a,d,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",a,`max(0, min(height, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${sa(e,c,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${l} = originalIndices[${u}];
      var height:${l} = originalIndices[${a}];
      var width:${l} = originalIndices[${d}];
      ${n?`if (depth < 0 || depth > (${r[u]} - 1) || height < 0 || height > (${r[a]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[u]} - 1));
      height = max(0, min(height, ${r[a]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${l} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${l} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${l} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${l} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${l} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${l} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${l} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${l} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${l} = abs(depth - ${l}(depth1));
      var dx2: ${l} = abs(${l}(depth2) - depth);
      var dy1: ${l} = abs(height - ${l}(height1));
      var dy2: ${l} = abs(${l}(height2) - height);
      var dz1: ${l} = abs(width - ${l}(width1));
      var dz2: ${l} = abs(${l}(width2) - width);
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
    }`},kl=(e,t,r,n,o,i)=>{let s=e.dims,u=vl(i,t.axes,s.length),a=_l(s,n,o,t.axes),d=n.slice();n.length===0&&(d=s.map((g,w)=>g===0?1:a[w]/g),t.keepAspectRatioPolicy!=="stretch"&&(a=Sl(s,d,t)));let c=A("output",e.dataType,a.length),l=S("input",e.dataType,s.length),p=_.size(a),f=s.length===a.length&&s.every((g,w)=>g===a[w]),m=t.coordinateTransformMode==="tf_crop_and_resize",h=t.extrapolationValue,b=l.type.value,y=g=>`
      ${f?"":`
      ${wl(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Cl(l,s)};
              ${$l(t.nearestMode,r,b)};
              ${Il(l,c,s,a,d.length,u.length,m)};
              `;case"linear":return`
              ${xl(c,s,a,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Tl(l,c,s,m,h)}`;if(s.length===3||s.length===5)return`${El(l,c,s,m,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Al(l,c,s,a,d,u,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(l,c)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${l.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${l.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?d:""}|${o.length>0?o:""}|${u.length>0?u:""}|${f}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:d},{type:1,data:u},...k(s,a)]})}},Pl=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},aa=(e,t)=>{let r=[],n=[],o=[],i=Pl(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");bl(e.inputs,t,i,r,n,o),e.compute(kl(e.inputs[0],t,i,r,n,o),{inputs:[0]})},ua=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,a=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return U({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:u,mode:a,nearestMode:d})}});var zl,Ol,la,ca=E(()=>{"use strict";R();L();ae();W();zl=(e,t)=>{let[r,n,o,i]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!_.areEqual(n.dims,[])&&!_.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!_.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let a=r.dims[0],d=r.dims[r.dims.length-2],c=o.dims[0],l=_.sizeFromDimension(r.dims,1)/d,p=u===0?o.dims[1]*2:l/s;if(u>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(a!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(d!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(p/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ol=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,s=e[0].dims[0],u=_.sizeFromDimension(e[0].dims,1),a=e[0].dims[e[0].dims.length-2],d=u/a,c=e[2].dims[1],l=o===0?c*2:d/n,p=new Array(s,a,d/l,l-c),f=_.computeStrides(p),m=[{type:1,data:i},{type:12,data:p},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[u,d,l,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,l,a*l,1]}):[],...k(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],h=b=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),w=S("cos_cache",e[2].dataType,e[2].dims.length),$=S("sin_cache",e[3].dataType,e[3].dims.length),v=A("output",e[0].dataType,e[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${b.declareVariables(y,g,w,$,v)}

        ${b.mainStart(Ke)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",A("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${y.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${v.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${v.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${v.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:U({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_.size(p)/Ke)},programUniforms:m})}},la=(e,t)=>{zl(e.inputs,t),e.compute(Ol(e.inputs,t))}});var Bl,Dl,pa,ma=E(()=>{"use strict";R();L();W();Bl=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Dl=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,s=_.size(i),u=i,a=s,d=i.slice(-1)[0],c=n?i.slice(0,-1).concat(1):[],l=!o&&e.length>3,p=e.length>4,f=n&&r>1,m=n&&r>2,h=r>3,b=64,y=ee(d),g=[{type:12,data:a},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],w=v=>{let x=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],C=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];l&&C.push(S("beta",e[3].dataType,e[3].dims,y)),p&&C.push(S("bias",e[4].dataType,e[4].dims,y)),C.push(A("output",e[0].dataType,u,y)),f&&C.push(A("mean_output",1,c)),m&&C.push(A("inv_std_output",1,c)),h&&C.push(A("input_skip_bias_sum",e[0].dataType,u,y));let I=X(e[0].dataType),z=X(1,y);return`

      ${v.registerUniforms(x).declareVariables(...C)}
      var<workgroup> sum_shared : array<${z}, ${b}>;
      var<workgroup> sum_squared_shared : array<${z}, ${b}>;

      ${v.mainStart([b,1,1])}
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
          let bias_value = ${p?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${je(I,y,"value")};
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
        let mean = ${Ce("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ce("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${l?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:u,dataType:e[0].dataType}];return r>1&&$.push({dims:c,dataType:1}),r>2&&$.push({dims:c,dataType:1}),r>3&&$.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${h}`,inputDependencies:e.map((v,x)=>"type")},getShaderSource:w,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(a/d)},programUniforms:g})}},pa=(e,t)=>{Bl(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Dl(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Rl,rr,Ml,fa,Ul,Vl,ha,ga,ya=E(()=>{"use strict";R();L();ae();W();Rl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},rr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Ml=(e,t)=>{if(e.length>1){let r=rr(e,1),n=rr(e,2),o=rr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),U({starts:r,ends:n,axes:o})}else return t},fa=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Ul=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${D("uniforms.input_shape","i",r.length)};
            let steps_i = ${D("uniforms.steps","i",r.length)};
            let signs_i = ${D("uniforms.signs","i",r.length)};
            let starts_i = ${D("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Vl=(e,t)=>{let r=e[0].dims,n=_.size(r),o=t.axes.length>0?_.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=rr(e,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=t.starts.map((y,g)=>fa(y,g,r,o,i)),u=t.ends.map((y,g)=>fa(y,g,r,o,i));if(o.length!==s.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let y=0;y<r.length;++y)o.includes(y)||(s.splice(y,0,0),u.splice(y,0,r[y]),i.splice(y,0,1));let a=i.map(y=>Math.sign(y));i.forEach((y,g,w)=>{if(y<0){let $=(u[g]-s[g])/y,v=s[g],x=v+$*i[g];s[g]=x,u[g]=v,w[g]=-y}});let d=r.slice(0);o.forEach((y,g)=>{d[y]=Math.ceil((u[y]-s[y])/i[y])});let c={dims:d,dataType:e[0].dataType},l=A("output",e[0].dataType,d.length),p=S("input",e[0].dataType,e[0].dims.length),f=_.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:a.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:f},{type:12,data:s},{type:6,data:a},{type:12,data:i},...k(e[0].dims,d)],b=y=>`
      ${y.registerUniforms(m).declareVariables(p,l)}
        ${Ul(p,l,r)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${l.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${l.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${a.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},ha=(e,t)=>{Rl(e.inputs,t);let r=Ml(e.inputs,t);e.compute(Vl(e.inputs,r),{inputs:[0]})},ga=e=>{let t=e.starts,r=e.ends,n=e.axes;return U({starts:t,ends:r,axes:n})}});var Nl,Wl,ba,wa,$a=E(()=>{"use strict";R();L();ae();W();Nl=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Wl=(e,t)=>{let r=e.dims,n=_.size(r),o=64,i=t.axis;if(i<0&&(i=r.length+i),i<r.length-1)throw new Error("softmax only supports last axis for now.");let s=r[i],u=n/s,a=ee(s),d=s/a,c=(b,y)=>y===4?`max(max(${b}.x, ${b}.y), max(${b}.z, ${b}.w))`:y===2?`max(${b}.x, ${b}.y)`:y===3?`max(max(${b}.x, ${b}.y), ${b}.z)`:b,l=S("x",e.dataType,e.dims,a),p=A("result",e.dataType,e.dims,a),f=l.type.value,m=X(e.dataType)==="f32"?`var threadMax = ${f}(-3.402823e+38f);`:`var threadMax = ${f}(-65504.0h);`,h=b=>`
      var<workgroup> rowMaxShared : ${f};
      var<workgroup> rowSumShared : ${f};
      var<workgroup> threadShared : array<${f}, ${o}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${f} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${f}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${b.registerUniform("packedCols","i32").declareVariables(l,p)}
      ${b.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${o};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${m}
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
          rowMaxShared = ${f}(${c("threadShared[0]",a)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${f}(0.0);
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
          rowSumShared = ${f}(${Ce("threadShared[0]",a)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${a}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:u},programUniforms:[{type:6,data:d}]}),getShaderSource:h}},ba=(e,t)=>{Nl(e.inputs),e.compute(Wl(e.inputs[0],t))},wa=e=>U({axis:e.axis})});var Gl,Ll,Hl,ql,Fl,va,_a,Sa=E(()=>{"use strict";R();L();ae();W();Gl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ll=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),U({numOutputs:n,axis:t.axis,splitSizes:r})},Hl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${D("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,ql=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Fl=(e,t)=>{let r=e[0].dims,n=_.size(r),o=e[0].dataType,i=_.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=S("input",o,r.length),a=new Array(t.numOutputs),d=[],c=[],l=0,p=[{type:12,data:n}];for(let m=0;m<t.numOutputs;m++){l+=t.splitSizes[m],a[m]=l;let h=r.slice();h[t.axis]=t.splitSizes[m],c.push(h),s[m]=A(`output${m}`,o,h.length),d.push({dims:c[m],dataType:e[0].dataType})}p.push({type:12,data:a},...k(r,...c));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",a.length).declareVariables(u,...s)}
  ${Hl(a.length)}
  ${ql(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${D("uniforms.size_in_split_axis","output_number - 1u",a.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p})}},va=(e,t)=>{Gl(e.inputs);let r=e.inputs.length===1?t:Ll(e.inputs,t);e.compute(Fl(e.inputs,r),{inputs:[0]})},_a=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return U({axis:t,numOutputs:n,splitSizes:r})}});var Kl,jl,xa,Ia=E(()=>{"use strict";R();L();W();Kl=(e,t,r,n,o)=>{let i=A("output_data",o,r.length,4),s=S("a_data",t[1].dataType,t[1].dims.length,4),u=S("b_data",t[2].dataType,t[2].dims.length,4),a=S("c_data",t[0].dataType,t[0].dims.length,4),d,c=(l,p,f)=>`select(${p}, ${l}, ${f})`;if(!n)d=i.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),a.getByOffset("global_idx")));else{let l=(p,f,m="")=>{let h=`a_data[index_a${f}][component_a${f}]`,b=`b_data[index_b${f}][component_b${f}]`,y=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${i.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_b${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_c${f} = ${a.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${p}[${f}] = ${m}(${c(h,b,y)});
          `};o===9?d=`
            var data = vec4<u32>(0);
            ${l("data",0,"u32")}
            ${l("data",1,"u32")}
            ${l("data",2,"u32")}
            ${l("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${l("output_data[global_idx]",0)}
            ${l("output_data[global_idx]",1)}
            ${l("output_data[global_idx]",2)}
            ${l("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(a,s,u,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},jl=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(_.areEqual(t,r)&&_.areEqual(r,n)),s=t,u=_.size(t);if(i){let d=ke.calcShape(ke.calcShape(t,r,!1),n,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=_.size(s)}let a=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Kl(d,e,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:a},...k(n,t,r,s)]})}},xa=e=>{e.compute(jl(e.inputs))}});var Ca,Ta=E(()=>{"use strict";Oo();Ht();Ro();Uo();_i();Oi();Ri();Ur();Yi();Ji();rs();as();ls();ps();hs();bs();vs();Ps();Os();Ds();Nr();Us();jr();Ns();na();ia();Gt();da();ca();ma();ya();$a();Sa();Yr();Ze();Kt();Ia();Ca=new Map([["Abs",[Vo]],["Acos",[No]],["Acosh",[Wo]],["Add",[Si]],["ArgMax",[zo,Or]],["ArgMin",[Po,Or]],["Asin",[Go]],["Asinh",[Lo]],["Atan",[Ho]],["Atanh",[qo]],["Attention",[Bo]],["AveragePool",[js,Ks]],["BatchNormalization",[Do]],["BiasAdd",[Mo]],["BiasSplitGelu",[vi]],["Cast",[Ko,Fo]],["Ceil",[Zo]],["Clip",[jo]],["Concat",[Bi,Di]],["Conv",[Lr,Gr]],["ConvTranspose",[Zi,ji]],["Cos",[Yo]],["Cosh",[Qo]],["CumSum",[Qi,Xi]],["DepthToSpace",[es,ts]],["Div",[xi]],["Einsum",[is,ss]],["Elu",[Xo,qt]],["Equal",[Ii]],["Erf",[Jo]],["Exp",[ei]],["Expand",[ds]],["FastGelu",[cs]],["Floor",[ti]],["FusedConv",[Lr,Gr]],["Gather",[fs,ms]],["GatherElements",[ys,gs]],["Gelu",[ri]],["Gemm",[$s,ws]],["GlobalAveragePool",[Qs,Ys]],["GlobalMaxPool",[ra,ta]],["Greater",[Ei]],["GreaterOrEqual",[Pi]],["GroupQueryAttention",[ks,Es]],["HardSigmoid",[li,di]],["InstanceNormalization",[zs]],["LayerNormalization",[Bs]],["LeakyRelu",[ni,qt]],["Less",[ki]],["LessOrEqual",[zi]],["Log",[wi]],["MatMul",[Gi]],["MatMulNBits",[Rs,Ms]],["MaxPool",[Js,ea]],["Mul",[Ci]],["MultiHeadAttention",[xs,Ss]],["Neg",[ii]],["Not",[oi]],["Pad",[Vs]],["Pow",[Ti]],["Range",[oa]],["Reciprocal",[si]],["ReduceMin",[Io]],["ReduceMean",[$o]],["ReduceMax",[xo]],["ReduceSum",[To]],["ReduceProd",[Co]],["ReduceL1",[vo]],["ReduceL2",[_o]],["ReduceLogSum",[Eo]],["ReduceLogSumExp",[So]],["ReduceSumSquare",[Ao]],["Relu",[ai]],["Resize",[aa,ua]],["RotaryEmbedding",[la]],["Sigmoid",[ui]],["Sin",[ci]],["Sinh",[pi]],["Slice",[ha,ga]],["SkipLayerNormalization",[pa]],["Split",[va,_a]],["Sqrt",[mi]],["Softmax",[ba,wa]],["Sub",[Ai]],["Tan",[fi]],["Tanh",[gi]],["ThresholdedRelu",[bi,qt]],["Tile",[Cs]],["Transpose",[so,ao]],["Where",[xa]]])});var nr,Aa=E(()=>{"use strict";_e();Me();W();nr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){ve(t.programInfo.name);let s=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let a=[];for(let c of r)a.push({binding:a.length,resource:{buffer:c.buffer}});for(let c of n)a.push({binding:a.length,resource:{buffer:c.buffer}});i&&a.push({binding:a.length,resource:i});let d=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:a,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:d,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}u.setPipeline(t.computePipeline),u.setBindGroup(0,d),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),he(t.programInfo.name)}dispose(){}build(t,r){ve(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let i=oo(r,this.backend.device.limits),s=t.getShaderSource(i),u=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,a=n.createShaderModule({code:u,label:t.name});re("verbose",()=>`[WebGPU] ${t.name} shader code: ${u}`);let d=n.createComputePipeline({compute:{module:a,entryPoint:"main"},layout:"auto",label:t.name});return he(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let s=r*n*o,u=Math.ceil(Math.sqrt(s));if(u>i){if(u=Math.ceil(Math.cbrt(s)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var Zl,Yl,Qr,or,Ea=E(()=>{"use strict";_e();R();Me();Xn();no();Ta();Aa();Zl=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Yl=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Zl(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Qr=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},or=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new Qr(await r.requestAdapterInfo()),this.gpuDataManager=ro(this),this.programManager=new nr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Yn(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],s=i.kernelId,u=this.kernels.get(s),a=u.kernelType,d=u.kernelName,c=i.programName,l=i.inputTensorViews,p=i.outputTensorViews,f=r[o*2],m=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let h=Number(f-this.queryTimeBase),b=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(y=>({dims:y.dims,dataType:Re(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Re(y.dataType)})),kernelId:s,kernelType:a,kernelName:d,programName:c,startTime:h,endTime:b});else{let y="";l.forEach((w,$)=>{y+=`input[${$}]: [${w.dims}] | ${Re(w.dataType)}, `});let g="";p.forEach((w,$)=>{g+=`output[${$}]: [${w.dims}] | ${Re(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${a}|${d}|${c}" ${y}${g}execution time: ${b-h} ns`)}vt("GPU",`${c}::${f}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),he()}run(t,r,n,o,i,s){ve(t.name);let u=[];for(let w=0;w<r.length;++w){let $=r[w].data;if($===0)continue;let v=this.gpuDataManager.get($);if(!v)throw new Error(`no GPU data for input: ${$}`);u.push(v)}let{outputs:a,dispatchGroup:d,programUniforms:c}=t.getRunData(r),l=n.length===0?a.map((w,$)=>$):n;if(l.length!==a.length)throw new Error(`Output size ${l.length} must be equal to ${a.length}.`);let p=[],f=[];for(let w=0;w<a.length;++w){if(!Number.isInteger(l[w])||l[w]<-3||l[w]>=s)throw new Error(`Invalid output index: ${l[w]}`);if(l[w]===-3)continue;let $=l[w]===-1,v=l[w]===-2,x=$||v?i(a[w].dataType,a[w].dims):o(l[w],a[w].dataType,a[w].dims);if(p.push(x),x.data===0)continue;let C=this.gpuDataManager.get(x.data);if(!C)throw new Error(`no GPU data for output: ${x.data}`);if($&&this.temporaryData.push(C),v){let I=this.kernelPersistentData.get(this.currentKernelId);I||(I=[],this.kernelPersistentData.set(this.currentKernelId,I)),I.push(C)}f.push(C)}if(u.length!==r.length||f.length!==p.length){if(f.length===0)return he(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(c){let w=0,$=[];c.forEach(I=>{let z=typeof I.data=="number"?[I.data]:I.data;if(z.length===0)return;let P=I.type===10?2:4,G,J;I.type===10?(J=z.length>4?16:z.length>2?8:z.length*P,G=z.length>4?16:P*z.length):(J=z.length<=2?z.length*P:16,G=16),w=Math.ceil(w/J)*J,$.push(w);let ne=I.type===10?8:4;w+=z.length>4?Math.ceil(z.length/ne)*G:z.length*P});let v=16;w=Math.ceil(w/v)*v;let x=new ArrayBuffer(w);c.forEach((I,z)=>{let P=$[z],G=typeof I.data=="number"?[I.data]:I.data;if(I.type===6)new Int32Array(x,P,G.length).set(G);else if(I.type===12)new Uint32Array(x,P,G.length).set(G);else if(I.type===10)new Uint16Array(x,P,G.length).set(G);else if(I.type===1)new Float32Array(x,P,G.length).set(G);else throw new Error(`Unsupported uniform type: ${Re(I.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,x,0,w),this.gpuDataManager.release(C.id),m={offset:0,size:w,buffer:C.buffer}}let h=this.programManager.normalizeDispatchGroupSize(d),b=h[1]===1&&h[2]===1,y=Yl(t,r,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,h),this.programManager.setArtifact(y,g),re("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),c&&g.uniformVariablesInfo){if(c.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${c.length} in program "${g.programInfo.name}".`);for(let w=0;w<c.length;w++){let $=c[w],v=$.type,x=typeof $.data=="number"?1:$.data.length,[C,I]=g.uniformVariablesInfo[w];if(v!==C||x!==I)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${I}, got type ${v} with size ${x} in program "${g.programInfo.name}".`)}}if(re("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:r,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(g,u,f,h,m),he(t.name),p}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ca.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,s=o.kernelName,u=o.kernelEntry,a=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,a[0]&&(a[1]=a[0](a[1]),a[0]=void 0),re("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),u(r,a[1]),0}catch(c){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${c}`)),1}finally{d&&n.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let s=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,s?.[1]);return i.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[1])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await Cr(this,t,r);return Qn(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){re("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){re("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){re("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ka={};ht(ka,{init:()=>Ql});var mt,Xr,Ql,Pa=E(()=>{"use strict";R();Ea();Me();L();mt=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=_.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=_.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=_.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(_.size(t)!==_.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Xr=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.HEAPU32,i=n>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let u=[];for(let a=0;a<s;a++){let d=o[i++],c=o[i++],l=o[i++],p=[];for(let f=0;f<l;f++)p.push(o[i++]);u.push(new mt(t,d,c,p))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,a,d)=>new mt(this.module,a,this.output(u,d),d),s=(u,a)=>{let d=qe(u);if(!d)throw new Error(`Unsupported data type: ${u}`);let c=d*_.size(a),l=c>0?this.backend.gpuDataManager.create(c).id:0;return new mt(this.module,u,l,a)};return this.backend.run(t,n,o,i,s,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.stackAlloc((1+r.length)*4),i=o>>2;this.module.HEAPU32[i++]=r.length;for(let s=0;s<r.length;s++)this.module.HEAPU32[i++]=r[s];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Ql=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new or;await i.initialize(r,n),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,u,a,d=!1)=>{if(d)re("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${u}, size=${a}`),i.memcpy(s,u);else{re("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${u}, size=${a}`);let c=t.HEAPU8.subarray(s>>>0,(s>>>0)+a);i.upload(u,c)}},async(s,u,a)=>{re("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${a}`),await i.download(s,()=>t.HEAPU8.subarray(u>>>0,(u>>>0)+a))},(s,u,a)=>i.createKernel(s,u,a,t.UTF8ToString(t._JsepGetNodeName(u))),s=>i.releaseKernel(s),(s,u,a,d)=>{re("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${s}, contextDataOffset=${u}`);let c=new Xr(t,i,u);return i.computeKernel(s,c,d)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else o("webnn")}});var Xl,Ct,Tt,Ye,Jl,it,At,Et,za,kt,Pt,zt,yr=E(()=>{"use strict";qn();Kn();R();Le();Bt();_r();Xl=(e,t)=>{oe()._OrtInit(e,t)!==0&&te("Can't initialize onnxruntime.")},Ct=async e=>{Xl(e.wasm.numThreads,at(e.logLevel))},Tt=async(e,t)=>{{let r=(Pa(),pr(ka)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",oe(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",oe(),e)}}},Ye=new Map,Jl=e=>{let t=oe(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&te("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},it=e=>{let t=oe(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},At=async(e,t)=>{let r,n,o=oe();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=it(e);let i=0,s=0,u=0,a=[],d=[],c=[];try{if([s,a]=Fn(t),t?.externalData&&o.mountExternalData){let g=[];for(let w of t.externalData){let $=typeof w=="string"?w:w.path;g.push(ut(typeof w=="string"?w:w.data).then(v=>{o.mountExternalData($,v)}))}await Promise.all(g)}i=await o._OrtCreateSession(r,n,s),i===0&&te("Can't create a session.");let[l,p]=Jl(i),f=!!t?.enableGraphCapture,m=[],h=[],b=[];for(let g=0;g<l;g++){let w=o._OrtGetInputName(i,g);w===0&&te("Can't get an input name."),d.push(w),m.push(o.UTF8ToString(w))}for(let g=0;g<p;g++){let w=o._OrtGetOutputName(i,g);w===0&&te("Can't get an output name."),c.push(w);let $=o.UTF8ToString(w);h.push($);{if(f&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let v=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[$]??"cpu";if(v!=="cpu"&&v!=="cpu-pinned"&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}.`);if(f&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(v)}}let y=null;return b.some(g=>g==="gpu-buffer")&&(u=o._OrtCreateBinding(i),u===0&&te("Can't create IO binding."),y={handle:u,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>vr(g))}),Ye.set(i,[i,d,c,y,f,!1]),[i,m,h]}catch(l){throw d.forEach(p=>o._OrtFree(p)),c.forEach(p=>o._OrtFree(p)),u!==0&&o._OrtReleaseBinding(u),i!==0&&o._OrtReleaseSession(i),l}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s),a.forEach(l=>o._free(l)),o.unmountExternalData?.()}},Et=e=>{let t=oe(),r=Ye.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(e),o.forEach(a=>t._OrtFree(a)),i.forEach(a=>t._OrtFree(a)),t._OrtReleaseSession(n),Ye.delete(e)},za=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let s=oe(),u=e[0],a=e[1],d=e[3],c,l;if(u==="string"&&d==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let m=e[2].gpuBuffer,h=qe($r(u));l=a.reduce((y,g)=>y*g,1)*h;let b=s.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=b(n,o,m,l)}else{let m=e[2];if(Array.isArray(m)){l=4*m.length,c=s._malloc(l),r.push(c);let h=c/4;for(let b=0;b<m.length;b++){if(typeof m[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.HEAPU32[h++]=ie(m[b],r)}}else l=m.byteLength,c=s._malloc(l),r.push(c),s.HEAPU8.set(new Uint8Array(m.buffer,m.byteOffset,l),c)}let p=s.stackSave(),f=s.stackAlloc(4*a.length);try{let m=f/4;a.forEach(b=>s.HEAP32[m++]=b);let h=s._OrtCreateTensor($r(u),c,l,f,a.length,vr(d));h===0&&te(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(h)}finally{s.stackRestore(p)}},kt=async(e,t,r,n,o,i)=>{let s=oe(),u=Ye.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let a=u[0],d=u[1],c=u[2],l=u[3],p=u[4],f=u[5],m=t.length,h=n.length,b=0,y=[],g=[],w=[],$=[],v=s.stackSave(),x=s.stackAlloc(m*4),C=s.stackAlloc(m*4),I=s.stackAlloc(h*4),z=s.stackAlloc(h*4);try{[b,y]=Hn(i);for(let O=0;O<m;O++)za(r[O],g,$,e,t[O],p);for(let O=0;O<h;O++)za(o[O],w,$,e,m+n[O],p);let P=x/4,G=C/4,J=I/4,ne=z/4;for(let O=0;O<m;O++)s.HEAPU32[P++]=g[O],s.HEAPU32[G++]=d[t[O]];for(let O=0;O<h;O++)s.HEAPU32[J++]=w[O],s.HEAPU32[ne++]=c[n[O]];if(l&&!f){let{handle:O,outputPreferredLocations:Y,outputPreferredLocationsEncoded:K}=l;if(d.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);for(let q=0;q<m;q++){let M=t[q];await s._OrtBindInput(O,d[M],g[q])!==0&&te(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<h;q++){let M=n[q];o[q]?.[3]?s._OrtBindOutput(O,c[M],w[q],0)!==0&&te(`Can't bind pre-allocated output[${q}] for session=${e}.`):s._OrtBindOutput(O,c[M],0,K[M])!==0&&te(`Can't bind output[${q}] to ${Y[q]} for session=${e}.`)}Ye.set(e,[a,d,c,l,p,!0])}s.jsepOnRunStart?.(a);let Q;l?Q=await s._OrtRunWithBinding(a,l.handle,h,I,b):Q=await s._OrtRun(a,C,x,m,z,h,I,b),Q!==0&&te("failed to call OrtRun().");let se=[];for(let O=0;O<h;O++){let Y=s.HEAPU32[I/4+O];if(Y===w[O]){se.push(o[O]);continue}let K=s.stackSave(),q=s.stackAlloc(4*4),M=!1,H,V=0;try{s._OrtGetTensorData(Y,q,q+4,q+8,q+12)!==0&&te(`Can't access output tensor data on index ${O}.`);let T=q/4,B=s.HEAPU32[T++];V=s.HEAPU32[T++];let F=s.HEAPU32[T++],Ie=s.HEAPU32[T++],fe=[];for(let be=0;be<Ie;be++)fe.push(s.HEAPU32[F/4+be]);s._OrtFree(F);let ue=fe.reduce((be,we)=>be*we,1);H=Re(B);let rn=l?.outputPreferredLocations[n[O]];if(H==="string"){if(rn==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let be=[],we=V/4;for(let Xe=0;Xe<ue;Xe++){let nn=s.HEAPU32[we++],qa=Xe===ue-1?void 0:s.HEAPU32[we]-nn;be.push(s.UTF8ToString(nn,qa))}se.push([H,fe,be,"cpu"])}else if(rn==="gpu-buffer"&&ue>0){let be=s.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=be(V),Xe=qe(B);if(Xe===void 0||!Rt(H))throw new Error(`Unsupported data type: ${H}`);M=!0,se.push([H,fe,{gpuBuffer:we,download:s.jsepCreateDownloader(we,ue*Xe,H),dispose:()=>{s._OrtReleaseTensor(Y)}},"gpu-buffer"])}else{let be=Dt(H),we=new be(ue);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(s.HEAPU8.subarray(V,V+we.byteLength)),se.push([H,fe,we,"cpu"])}}finally{s.stackRestore(K),H==="string"&&V&&s._free(V),M||s._OrtReleaseTensor(Y)}}return l&&!p&&(s._OrtClearBoundOutputs(l.handle),Ye.set(e,[a,d,c,l,p,!1])),se}finally{s.stackRestore(v),g.forEach(P=>s._OrtReleaseTensor(P)),w.forEach(P=>s._OrtReleaseTensor(P)),$.forEach(P=>s._free(P)),b!==0&&s._OrtReleaseRunOptions(b),y.forEach(P=>s._free(P))}},Pt=e=>{let t=oe(),r=Ye.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&te("Can't get an profile file name."),t._OrtFree(o)},zt=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Qe,xe,ft,sr,ar,ir,Jr,en,tt,rt,tc,Oa,Ba,Da,Ra,Ma,Ua,Va,tn=E(()=>{"use strict";_e();yr();Le();ot();Qe=()=>!!j.wasm.proxy&&typeof document<"u",ft=!1,sr=!1,ar=!1,en=new Map,tt=(e,t)=>{let r=en.get(e);r?r.push(t):en.set(e,[t])},rt=()=>{if(ft||!sr||ar||!xe)throw new Error("worker not ready")},tc=e=>{switch(e.data.type){case"init-wasm":ft=!1,e.data.err?(ar=!0,Jr[1](e.data.err)):(sr=!0,Jr[0]()),ir&&(URL.revokeObjectURL(ir),ir=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=en.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Oa=async()=>{if(!sr){if(ft)throw new Error("multiple calls to 'initWasm()' detected.");if(ar)throw new Error("previous call to 'initWasm()' failed.");if(ft=!0,Qe())return new Promise((e,t)=>{xe?.terminate(),Wn().then(([r,n])=>{try{xe=n,xe.onerror=i=>t(i),xe.onmessage=tc,Jr=[e,t];let o={type:"init-wasm",in:j};xe.postMessage(o),ir=r}catch(o){t(o)}},t)});try{await It(j.wasm),await Ct(j),sr=!0}catch(e){throw ar=!0,e}finally{ft=!1}}},Ba=async e=>{if(Qe())return rt(),new Promise((t,r)=>{tt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:j}};xe.postMessage(n)});await Tt(j,e)},Da=async e=>Qe()?(rt(),new Promise((t,r)=>{tt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};xe.postMessage(n,[e.buffer])})):it(e),Ra=async(e,t)=>{if(Qe()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return rt(),new Promise((r,n)=>{tt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),xe.postMessage(o,i)})}else return At(e,t)},Ma=async e=>{if(Qe())return rt(),new Promise((t,r)=>{tt("release",[t,r]);let n={type:"release",in:e};xe.postMessage(n)});Et(e)},Ua=async(e,t,r,n,o,i)=>{if(Qe()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return rt(),new Promise((s,u)=>{tt("run",[s,u]);let a=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:a,outputIndices:n,options:i}};xe.postMessage(d,zt(a))})}else return kt(e,t,r,n,o,i)},Va=async e=>{if(Qe())return rt(),new Promise((t,r)=>{tt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};xe.postMessage(n)});Pt(e)}});var Na,rc,ur,Wa=E(()=>{"use strict";_e();tn();R();xt();_r();Na=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},rc=e=>{switch(e[3]){case"cpu":return new de(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Rt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return de.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},ur=class{async fetchModelAndCopyToWasmMemory(t){return Da(await ut(t))}async loadModel(t,r){ve();let n;typeof t=="string"?!1?n=await ut(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Ra(n,r),he()}async dispose(){return Ma(this.sessionId)}async run(t,r,n){ve();let o=[],i=[];Object.entries(t).forEach(p=>{let f=p[0],m=p[1],h=this.inputNames.indexOf(f);if(h===-1)throw new Error(`invalid input '${f}'`);o.push(m),i.push(h)});let s=[],u=[];Object.entries(r).forEach(p=>{let f=p[0],m=p[1],h=this.outputNames.indexOf(f);if(h===-1)throw new Error(`invalid output '${f}'`);s.push(m),u.push(h)});let a=o.map((p,f)=>Na(p,()=>`input "${this.inputNames[i[f]]}"`)),d=s.map((p,f)=>p?Na(p,()=>`output "${this.outputNames[u[f]]}"`):null),c=await Ua(this.sessionId,i,a,u,d,n),l={};for(let p=0;p<c.length;p++)l[this.outputNames[u[p]]]=s[p]??rc(c[p]);return he(),l}startProfiling(){}endProfiling(){Va(this.sessionId)}}});var nc,dr,Ga=E(()=>{"use strict";_e();tn();Wa();ot();nc=()=>{if((typeof j.wasm.initTimeout!="number"||j.wasm.initTimeout<0)&&(j.wasm.initTimeout=0),j.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof j.wasm.proxy!="boolean"&&(j.wasm.proxy=!1),typeof j.wasm.trace!="boolean"&&(j.wasm.trace=!1),typeof j.wasm.numThreads!="number"||!Number.isInteger(j.wasm.numThreads)||j.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)j.wasm.numThreads=1;else{let e=typeof navigator>"u"?cr("node:os").cpus().length:navigator.hardwareConcurrency;j.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}j.wasm.wasmPaths===void 0&&Se&&Se.indexOf("blob:")!==0&&(j.wasm.wasmPaths=Se.substring(0,Se.lastIndexOf("/")+1))},dr=class{async init(t){nc(),await Oa(),await Ba(t)}async createInferenceSessionHandler(t,r){let n=new ur;return await n.loadModel(t,r),Promise.resolve(n)}}});var La={};ht(La,{wasmBackend:()=>oc});var oc,Ha=E(()=>{"use strict";Ga();oc=new dr});_e();_e();_e();var On="1.19.0";var h$=gr;{let e=(Ha(),pr(La)).wasmBackend;We("webgpu",e,5),We("webnn",e,5),We("cpu",e,10),We("wasm",e,10)}Object.defineProperty(j.versions,"web",{value:On,enumerable:!0});export{Qa as InferenceSession,vt as TRACE,ve as TRACE_FUNC_BEGIN,he as TRACE_FUNC_END,de as Tensor,Ja as TrainingSession,h$ as default,j as env,We as registerBackend};
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
//# sourceMappingURL=ort.webgpu.min.mjs.map
