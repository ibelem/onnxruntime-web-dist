/*!
 * ONNX Runtime Web v1.20.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var cr=Object.defineProperty;var ru=Object.getOwnPropertyDescriptor;var nu=Object.getOwnPropertyNames;var ou=Object.prototype.hasOwnProperty;var pr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var yt=(e,t)=>{for(var r in t)cr(e,r,{get:t[r],enumerable:!0})},iu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of nu(t))!ou.call(e,o)&&o!==r&&cr(e,o,{get:()=>t[o],enumerable:!(n=ru(t,o))||n.enumerable});return e};var mr=e=>iu(cr({},"__esModule",{value:!0}),e);var bt,Ne,We,su,wt,$t=A(()=>{bt=new Map,Ne=[],We=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=bt.get(e);if(n===void 0)bt.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=Ne.indexOf(e);o!==-1&&Ne.splice(o,1);for(let i=0;i<Ne.length;i++)if(bt.get(Ne[i]).priority<=r){Ne.splice(i,0,e);return}Ne.push(e)}return}throw new TypeError("not a valid backend")},su=async e=>{let t=bt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},wt=async e=>{let t=e.executionProviders||[],r=t.map(a=>typeof a=="string"?a:a.name),n=r.length===0?Ne:r,o,i=[],s=new Set;for(let a of n){let d=await su(a);typeof d=="string"?i.push({name:a,err:d}):(o||(o=d),o===d&&s.add(a))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(a=>`[${a.name}] ${a.err}`).join(", ")}`);for(let{name:a,err:d}of i)r.includes(a)&&console.warn(`removing requested execution provider "${a}" from session options because it is not available: ${d}`);let u=t.filter(a=>s.has(typeof a=="string"?a:a.name));return[o,new Proxy(e,{get:(a,d)=>d==="executionProviders"?u:Reflect.get(a,d)})]}});var an=A(()=>{$t()});var un,dn=A(()=>{un="1.20.0"});var ln,we,fr=A(()=>{dn();ln="warning",we={wasm:{},webgl:{},webgpu:{},versions:{common:un},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ln=e}},get logLevel(){return ln}};Object.defineProperty(we,"logLevel",{enumerable:!0})});var Y,cn=A(()=>{fr();Y=we});var pn,mn,fn=A(()=>{pn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,a,d;u===void 0||u.mean===void 0?a=[255,255,255,255]:typeof u.mean=="number"?a=[u.mean,u.mean,u.mean,u.mean]:(a=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(a[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let l=i*o,c=0,p=l,f=l*2,m=-1;s==="RGBA"?(c=0,p=l,f=l*2,m=l*3):s==="RGB"?(c=0,p=l,f=l*2):s==="RBG"&&(c=0,f=l,p=l*2);for(let h=0;h<i;h++)for(let b=0;b<o;b++){let y=(e.data[c++]-d[0])*a[0],g=(e.data[p++]-d[1])*a[1],w=(e.data[f++]-d[2])*a[2],$=m===-1?255:(e.data[m++]-d[3])*a[3];n.fillStyle="rgba("+y+","+g+","+w+","+$+")",n.fillRect(b,h,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},mn=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],s=e.dims[3]):(o=e.dims[3],i=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",a=t?.norm,d,l;a===void 0||a.mean===void 0?d=[255,255,255,255]:typeof a.mean=="number"?d=[a.mean,a.mean,a.mean,a.mean]:(d=[a.mean[0],a.mean[1],a.mean[2],255],a.mean[3]!==void 0&&(d[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let c=i*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,f=0,m=1,h=2,b=3,y=0,g=c,w=c*2,$=-1;u==="RGBA"?(y=0,g=c,w=c*2,$=c*3):u==="RGB"?(y=0,g=c,w=c*2):u==="RBG"&&(y=0,w=c,g=c*2),n=r.createImageData(o,i);for(let v=0;v<i*o;f+=p,m+=p,h+=p,b+=p,v++)n.data[f]=(e.data[y++]-l[0])*d[0],n.data[m]=(e.data[g++]-l[1])*d[1],n.data[h]=(e.data[w++]-l[2])*d[2],n.data[b]=$===-1?255:(e.data[$++]-l[3])*d[3]}else throw new Error("Can not access image data");return n}});var hr,hn,gn,yn,bn,wn=A(()=>{vt();hr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",a=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*n,l=a==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,p=0,f=1,m=2,h=3,b=0,y=d,g=d*2,w=-1;u==="RGB"&&(c=3,p=0,f=1,m=2,h=-1),a==="RGBA"?w=d*3:a==="RBG"?(b=0,g=d,y=d*2):a==="BGR"&&(g=0,y=d,b=d*2);for(let v=0;v<d;v++,p+=c,m+=c,f+=c,h+=c)l[b++]=(e[p]+s[0])/i[0],l[y++]=(e[f]+s[1])/i[1],l[g++]=(e[m]+s[2])/i[2],w!==-1&&h!==-1&&(l[w++]=(e[h]+s[3])/i[3]);return a==="RGBA"?new me("float32",l,[1,4,r,n]):new me("float32",l,[1,3,r,n])},hn=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,u=t??{},a=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=l=>l instanceof HTMLCanvasElement||l instanceof OffscreenCanvas?l.getContext("2d"):null;if(r){let l=a();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=p,u.width=f}else u.tensorFormat="RGBA",u.height=p,u.width=f;c.drawImage(e,0,0),s=c.getImageData(0,0,f,p).data}else throw new Error("Can not access image data")}else if(n){let l,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(l=t.resizedHeight,c=t.resizedWidth):(l=e.height,c=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=l,u.width=c,t!==void 0){let p=a();p.width=c,p.height=l;let f=d(p);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,c,l).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let l=a();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,f=e.width;return c.drawImage(e,0,0,f,p),s=c.getImageData(0,0,f,p).data,u.height=p,u.width=f,hr(s,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((l,c)=>{let p=a(),f=d(p);if(!e||!f)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,f.drawImage(m,0,0,p.width,p.height);let h=f.getImageData(0,0,p.width,p.height);u.height=p.height,u.width=p.width,l(hr(h.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return hr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},gn=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,s=[1,n,r,4];return new me({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:i})},yn=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new me({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},bn=(e,t,r)=>new me({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Le,nt,$n,vn,_n=A(()=>{Le=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),nt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),$n=!1,vn=()=>{if(!$n){$n=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Le.set("int64",BigInt64Array),nt.set(BigInt64Array,"int64")),t&&(Le.set("uint64",BigUint64Array),nt.set(BigUint64Array,"uint64")),r?(Le.set("float16",Float16Array),nt.set(Float16Array,"float16")):Le.set("float16",Uint16Array)}}});var xn,Sn,In=A(()=>{vt();xn=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Sn=(e,t)=>{switch(e.location){case"cpu":return new me(e.type,e.data,t);case"cpu-pinned":return new me({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new me({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new me({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var me,vt=A(()=>{fn();wn();_n();In();me=class{constructor(t,r,n){vn();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let u=Le.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,a;if(typeof t=="string")if(o=t,a=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let d=Le.get(t);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&d===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${d.name} as data.`);t==="uint64"||t==="int64"?u=d.from(r,BigInt):u=d.from(r)}else if(r instanceof d)u=r;else throw new TypeError(`A ${o} tensor's data must be type of ${d}`)}else if(a=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof t[0];if(d==="string")o="string",u=t;else if(d==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else{let d=nt.get(t.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=d,u=t}if(a===void 0)a=[u.length];else if(!Array.isArray(a))throw new TypeError("A tensor's dims must be a number array");i=a,this.cpuData=u,this.dataLocation="cpu"}let s=xn(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(t,r){return hn(t,r)}static fromTexture(t,r){return gn(t,r)}static fromGpuBuffer(t,r){return yn(t,r)}static fromPinnedBuffer(t,r,n){return bn(t,r,n)}toDataURL(t){return pn(this,t)}toImageData(t){return mn(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Sn(this,t)}}});var pe,_t=A(()=>{vt();pe=me});var xt,Cn,$e,fe,gr=A(()=>{fr();xt=(e,t)=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||console.timeStamp(`${e}::ORT::${t}`)},Cn=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),xt("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},$e=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cn("BEGIN",e)},fe=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cn("END",e)}});var St,Tn=A(()=>{$t();_t();gr();St=class e{constructor(t){this.handler=t}async run(t,r,n){$e();let o={},i={};if(typeof t!="object"||t===null||t instanceof pe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof pe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);o[d]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(l.indexOf(c)!==-1){let p=r[c];(p===null||p instanceof pe)&&(d=!0,s=!1,o[c]=p)}if(d){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)o[d]=null;let u=await this.handler.run(t,o,i),a={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let l=u[d];l instanceof pe?a[d]=l:a[d]=new pe(l.type,l.data,l.dims)}return fe(),a}async release(){return this.handler.dispose()}static async create(t,r,n,o){$e();let i,s={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let l=t,c=0,p=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=l.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${l.byteLength}).`);if(p=t.byteLength-c,typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>l.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${l.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(l,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,a]=await wt(s),d=await u.createInferenceSessionHandler(i,a);return fe(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var au,An=A(()=>{Tn();au=St});var kn=A(()=>{});var En=A(()=>{});var Pn=A(()=>{});var zn=A(()=>{});var uu,It,On=A(()=>{$t();_t();uu="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",It=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[s,u]=await wt(i);if(s.createTrainingSessionHandler){let a=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,u);return new e(a,!!t.optimizerModel,!!t.evalModel)}else throw new Error(uu)}typeNarrowingForRunStep(t,r,n,o,i){let s={},u={};if(typeof n!="object"||n===null||n instanceof pe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof pe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let d of o){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);s[d]=null}if(typeof i=="object"&&i!==null)u=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(o);for(let c of r)if(l.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof pe)&&(d=!0,a=!1,s[c]=p)}if(d){if(typeof i=="object"&&i!==null)u=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else u=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of t)if(typeof n[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(a)for(let d of r)s[d]=null;return[s,u]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof pe?r[n]=o:r[n]=new pe(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),s=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),s=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var du,Bn=A(()=>{On();du=It});var yr={};yt(yr,{InferenceSession:()=>au,TRACE:()=>xt,TRACE_FUNC_BEGIN:()=>$e,TRACE_FUNC_END:()=>fe,Tensor:()=>pe,TrainingSession:()=>du,env:()=>Y,registerBackend:()=>We});var Se=A(()=>{an();cn();An();_t();kn();En();gr();Pn();zn();Bn()});var Ct=A(()=>{"use strict"});var Un={};yt(Un,{default:()=>lu});var Rn,Mn,lu,Vn=A(()=>{"use strict";br();Ge();ot();Rn="ort-wasm-proxy-worker",Mn=globalThis.self?.name===Rn;Mn&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Tt(r.wasm).then(()=>{At(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;kt(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=it(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Et(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Pt(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:s,options:u}=r;zt(n,o,i,s,new Array(s.length).fill(null),u).then(a=>{a.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:a},Bt([...i,...a]))},a=>{postMessage({type:t,err:a})});break}case"end-profiling":Ot(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});lu=Mn?null:e=>new Worker(e??Ie,{type:"module",name:Rn})});var Ie,cu,Wn,pu,mu,Ln,fu,Nn,Gn,Hn,ot=A(()=>{"use strict";Ct();Ie=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),cu=!1||typeof location>"u"?void 0:location.origin,Wn=(e,t)=>{try{let r=t??Ie;return(r?new URL(e,r):new URL(e)).origin===cu}catch{return!1}},pu=(e,t)=>{let r=t??Ie;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},mu=(e,t)=>`${t??"./"}${e}`,Ln=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},fu=async e=>(await import(/*webpackIgnore:true*/e)).default,Nn=(Vn(),mr(Un)).default,Gn=async()=>{if(!Ie)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Wn(Ie))return[void 0,Nn()];let e=await Ln(Ie);return[e,Nn(e)]},Hn=async(e,t,r)=>{{let n="ort-wasm-simd-threaded.jsep.mjs",o=e??pu(n,t),i=!!1&&r&&o&&!Wn(o,t),s=i?await Ln(o):o??mu(n,t);return[i?s:void 0,await fu(s)]}}});var wr,$r,Dt,qn,hu,gu,Tt,se,Ge=A(()=>{"use strict";ot();$r=!1,Dt=!1,qn=!1,hu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},gu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tt=async e=>{if($r)return Promise.resolve();if(Dt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(qn)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dt=!0;let t=e.initTimeout,r=e.numThreads;if(!gu())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=hu();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,u=s?.href??s,a=o?.wasm,d=a?.href??a,l=e.wasmBinary,[c,p]=await Hn(u,i,r>1),f=!1,m=[];if(t>0&&m.push(new Promise(h=>{setTimeout(()=>{f=!0,h()},t)})),m.push(new Promise((h,b)=>{let y={numThreads:r};l?y.wasmBinary=l:(d||i)&&(y.locateFile=(g,w)=>d??(i??w)+g),p(y).then(g=>{Dt=!1,$r=!0,wr=g,h(),c&&URL.revokeObjectURL(c)},g=>{Dt=!1,qn=!0,b(g)})})),await Promise.race(m),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},se=()=>{if($r&&wr)return wr;throw new Error("WebAssembly is not initialized yet.")}});var de,st,oe,Rt=A(()=>{"use strict";Ge();de=(e,t)=>{let r=se(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},st=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let s=t?t+o:o;if(typeof i=="object")st(i,s+".",r,n);else if(typeof i=="string"||typeof i=="number")n(s,i.toString());else if(typeof i=="boolean")n(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},oe=e=>{let t=se(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let o=t.HEAP32[n/4],i=t.HEAPU32[n/4+1],s=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}});var Fn,Kn=A(()=>{"use strict";Ge();Rt();Fn=e=>{let t=se(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=de(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&oe("Can't create run options."),e?.extra!==void 0&&st(e.extra,"",new WeakSet,(s,u)=>{let a=de(s,n),d=de(u,n);t._OrtAddRunConfigEntry(r,a,d)!==0&&oe(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),i}}});var yu,bu,wu,$u,jn,Xn=A(()=>{"use strict";Ge();Rt();yu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},bu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},wu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},$u=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let u=n?.deviceType;if(u){let a=de("deviceType",r),d=de(u,r);se()._OrtAddSessionConfigEntry(e,a,d)!==0&&oe(`Can't set a session config entry: 'deviceType' - ${u}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let s=n;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let u=de("preferredLayout",r),a=de(s.preferredLayout,r);se()._OrtAddSessionConfigEntry(e,u,a)!==0&&oe(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=de(o,r);se()._OrtAppendExecutionProvider(e,i)!==0&&oe(`Can't append execution provider: ${o}.`)}},jn=e=>{let t=se(),r=0,n=[],o=e||{};wu(o);try{let i=yu(o.graphOptimizationLevel??"all"),s=bu(o.executionMode??"sequential"),u=typeof o.logId=="string"?de(o.logId,n):0,a=o.logSeverityLevel??2;if(!Number.isInteger(a)||a<0||a>4)throw new Error(`log serverity level is not valid: ${a}`);let d=o.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let l=typeof o.optimizedModelFilePath=="string"?de(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,u,a,d,l),r===0&&oe("Can't create session options."),o.executionProviders&&$u(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=de("enableGraphCapture",n),p=de(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,c,p)!==0&&oe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let f=de(c,n);t._OrtAddFreeDimensionOverride(r,f,p)!==0&&oe(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&st(o.extra,"",new WeakSet,(c,p)=>{let f=de(c,n),m=de(p,n);t._OrtAddSessionConfigEntry(r,f,m)!==0&&oe(`Can't set a session config entry: ${c} - ${p}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(s=>t._free(s)),i}}});var vr,Me,qe,Mt,at,Ut,_r,M=A(()=>{"use strict";vr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Me=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},qe=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Mt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},at=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ut=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool",_r=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}});var ut,xr=A(()=>{"use strict";Ct();ut=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=pr("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=pr("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let a=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:a,maximum:a}).buffer}else throw u}let s=0;for(;;){let{done:u,value:a}=await o.read();if(u)break;let d=a.byteLength;new Uint8Array(i,s,d).set(a),s+=d}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var vu,_u,Zn,Yn,Qn,xu,ee,De=A(()=>{"use strict";M();vu=["V","I","W","E","F"],_u=(e,t)=>{console.log(`[${vu[e]},${new Date().toISOString()}]${t}`)},Qn=(e,t)=>{Zn=e,Yn=t},xu=(e,t)=>{let r=at(e),n=at(Zn);r>=n&&_u(r,typeof t=="function"?t():t)},ee=(...e)=>{Yn&&xu(...e)}});var Jn,eo=A(()=>{"use strict";M();Jn=(e,t)=>new(Mt(t))(e)});var Vt=A(()=>{"use strict"});var to,Sr,Ir,Su,Iu,ro,Tr,Cr,oo,io=A(()=>{"use strict";De();Vt();to=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Sr=[],Ir=e=>Math.ceil(e/16)*16,Su=e=>{for(let t=0;t<Sr.length;t++){let r=Sr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Iu=1,ro=()=>Iu++,Tr=async(e,t,r,n)=>{let o=Ir(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let a=n();return a.set(new Uint8Array(u,0,r)),a}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},Cr=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[r]of to)Sr.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[])}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,s=Ir(i),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(u.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${i}`);let a=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=a.getMappedRange();new Uint8Array(d).set(new Uint8Array(n,o,i)),a.unmap();let l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(a,0,u.gpuData.buffer,0,s),ee("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(a)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Ir(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=this.externalBuffers.get(n),o===void 0)throw new Error("previous buffer is not registered");if(t===n)return ee("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(n)}else o=ro();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),this.externalBuffers.set(t,o),ee("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){let r=this.externalBuffers.get(t);r!==void 0&&(this.storageCache.delete(r),this.externalBuffers.delete(t),ee("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${r}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Su(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let d=(i?this.freeBuffers:this.freeUniformBuffers).get(n);d?d.length>0?o=d.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:ro(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:t}),ee("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=this.storageCache.get(t);if(!r)throw new Error("releasing data does not exist");return ee("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("data does not exist");await Tr(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=to.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t))}},oo=(...e)=>new Cr(...e)});var Ar,V,ae=A(()=>{"use strict";Ar=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},V=e=>new Ar(e)});var kr,ke,x,Fe,Nt,Wt,Lt,W=A(()=>{"use strict";kr=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},ke=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let s=Math.max(t.length,r.length),u=new Array(s);if(n){if(o<2||i<2)return;let a=kr.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(a===void 0)return;[u[s-2],u[s-1]]=a}for(let a=n?3:1;a<=s;a++){let d=o-a<0?1:t[o-a],l=i-a<0?1:r[i-a];if(d!==l&&d>1&&l>1)return;let c=Math.max(d,l);if(d&&l)u[s-a]=Math.max(d,l);else{if(c>1)return;u[s-a]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[i]}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Fe=class e{static adjustPoolAttributes(t,r,n,o,i,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,s,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<t.length-2;a++)e.adjustPadAndReturnShape(t[a+(s?1:2)],r[a],n[a],o[a],i,a,a+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,i,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let a=[r[0],r[1]];return e.computeShapeHelper(t,r,a,n,o,i,s,u),a}static computeConvOutputShape(t,r,n,o,i,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let a=[t[0],r[0]];return e.computeShapeHelper(!1,t,a,n,o,i,s,u),a}static computeShapeHelper(t,r,n,o,i,s,u,a){if(t)for(let d=0;d<r.length-2;d++)n.push(1);else for(let d=0;d<r.length-2;d++)n.push(e.adjustPadAndReturnShape(r[d+2],o[d],i[d],s[d],u,d,d+r.length-2,a))}static adjustPadAndReturnShape(t,r,n,o,i,s,u,a){let d=n*(o-1)+1;if(a&&a!=="NOTSET")switch(a){case"VALID":return i[s]=0,i[u]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+o-t;return i[s]=Math.floor(a==="SAME_LOWER"?(c+1)/2:c/2),i[u]=c-i[s],Math.floor((t+c-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[u]-d)/r+1)}},Nt=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,u,a;r?(s=t[1],u=t[0]):(s=t[0],u=t[1]);let d=-1;if(o?(a=n[0],d=1):(a=n[1],d=0),n[d]!==u)throw new Error("dimension mismatch");if(s<=0||a<=0||u<=0)throw new Error("invalid shape specified");if(i&&!ke.isValidBroadcast(i,[s,a]))throw new Error("gemm: invalid bias shape for broadcast");return[s,a,u]}},Wt=-34028234663852886e22,Lt=34028234663852886e22});var Ke,Pr,Q,ce,E,J,Ue,je,Ae,O,zr,S,T,Gt,Er,so,Je,G=A(()=>{"use strict";M();W();Ke=64,Pr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${e}`)}},Q=(e,t=1)=>{let r=Pr(e,t);return typeof r=="string"?r:r[0]},ce=(e,t=1)=>{let r=Pr(e,t);return typeof r=="string"?r:r[1]},E=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:x.computeStrides(r)})}),t},J=e=>e%4===0?4:e%2===0?2:1,Ue=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,je=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ae=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,O=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,zr=(e,t,r,n,o)=>{let i=typeof r=="number",s=i?r:r.length,u=[...new Array(s).keys()],a=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Pr(t,o),l=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],p={indices:a,value:l,storage:c,tensor:t},f=k=>typeof k=="string"?k:`${k}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",b=`${h}${e}_shape`,y=`${h}${e}_strides`,g="";for(let k=0;k<s-1;k++)g+=`
    let dim${k} = current / ${O(y,k,s)};
    let rest${k} = current % ${O(y,k,s)};
    indices[${k}] = dim${k};
    current = rest${k};
    `;g+=`indices[${s-1}] = current;`;let w=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,$=k=>(m.offsetToIndices=!0,s<2?k:`o2i_${e}(${k})`),v=[];if(s>=2)for(let k=s-1;k>=0;k--)v.push(`${O(y,k,s)} * (indices[${k}])`);let _=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${v.join("+")};
  }`,I=k=>(m.indicesToOffset=!0,s<2?k:`i2o_${e}(${k})`),C=(...k)=>s===0?"0u":`${p.indices}(${k.map(f).join(",")})`,z=(k,U)=>s<2?`${k}`:`${O(k,U,s)}`,P=(k,U,j)=>s<2?`${k}=${j};`:`${O(k,U,s)}=${j};`,R={},q=(k,U)=>{m.broadcastedIndicesToOffset=!0;let j=`${U.name}broadcastedIndicesTo${e}Offset`;if(j in R)return`${j}(${k})`;let Te=[];for(let ie=s-1;ie>=0;ie--){let Ve=U.indicesGet("outputIndices",ie+U.rank-s);Te.push(`${z(y,ie)} * (${Ve} % ${z(b,ie)})`)}return R[j]=`fn ${j}(outputIndices: ${U.type.indices}) -> u32 {
             return ${Te.length>0?Te.join("+"):"0u"};
           }`,`${j}(${k})`},F=(k,U)=>(()=>{if(p.storage===p.value)return`${e}[${k}]=${U};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${k}]=vec2<u32>(u32(${U}), select(0u, 0xFFFFFFFFu, ${U} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${k}]=vec2<u32>(u32(${U}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${k}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${U}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),K=k=>(()=>{if(p.storage===p.value)return`${e}[${k}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${k}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${k}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${k}] & 0xFFu), bool(${e}[${k}] & 0xFF00u), bool(${e}[${k}] & 0xFF0000u), bool(${e}[${k}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),re=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${l} {
    return ${K(`i2o_${e}(indices)`)};
  }`,B=s<2?"":(()=>{let k=u.map(j=>`d${j}: u32`).join(", "),U=u.map(j=>`d${j}`).join(", ");return`
  fn get_${e}(${k}) -> ${l} {
    return get_${e}ByIndices(${C(U)});
  }`})(),ne=(...k)=>{if(k.length!==s)throw new Error(`indices length must be ${s}`);let U=k.map(f).join(",");return s===0?K("0u"):s===1?K(U[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${U})`)},Z=k=>s<2?K(k):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${k})`),N=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${l}) {
    ${F(`i2o_${e}(indices)`,"value")}
  }`,H=s<2?"":(()=>{let k=u.map(j=>`d${j}: u32`).join(", "),U=u.map(j=>`d${j}`).join(", ");return`
  fn set_${e}(${k}, value: ${l}) {
    set_${e}ByIndices(${C(U)}, value);
  }`})();return{impl:()=>{let k=[],U=!1;return m.offsetToIndices&&(k.push(w),U=!0),m.indicesToOffset&&(k.push(_),U=!0),m.broadcastedIndicesToOffset&&(Object.values(R).forEach(j=>k.push(j)),U=!0),m.set&&(k.push(H),U=!0),m.setByIndices&&(k.push(N),U=!0),m.get&&(k.push(B),U=!0),m.getByIndices&&(k.push(re),U=!0),!i&&U&&k.unshift(`const ${b} = ${p.indices}(${r.join(",")});`,`const ${y} = ${p.indices}(${x.computeStrides(r).join(",")});`),k.join(`
`)},type:p,offsetToIndices:$,indicesToOffset:I,broadcastedIndicesToOffset:q,indices:C,indicesGet:z,indicesSet:P,set:(...k)=>{if(k.length!==s+1)throw new Error(`indices length must be ${s}`);let U=k[s];if(typeof U!="string")throw new Error("value must be string");let j=k.slice(0,s).map(f).join(",");return s===0?F("0u",U):s===1?F(j[0],U):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${j}, ${U})`)},setByOffset:F,setByIndices:(k,U)=>s<2?F(k,U):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${k}, ${U});`),get:ne,getByOffset:K,getByIndices:Z,usage:n,name:e,strides:y,shape:b,rank:s}},S=(e,t,r,n=1)=>zr(e,t,r,"input",n),T=(e,t,r,n=1)=>zr(e,t,r,"output",n),Gt=(e,t,r,n=1)=>zr(e,t,r,"internal",n),Er=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ke){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},so=(e,t)=>new Er(e,t),Je=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let i=r-1-o,s=e[i]||1;(t[t.length-1-o]||1)>1&&s===1&&n.unshift(i)}return n}});var Cu,ao,Tu,Au,he,uo,lo,Xe=A(()=>{"use strict";M();W();ae();G();Cu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ao=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Tu=(e,t)=>x.sortBasedOnPerm(e,ao(e.length,t)),Au=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},he=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ao(n,t),i=Tu(e.dims,o),s=T("output",r,i.length),u=S("a",r,n),a;if(o.length===2&&o[0]===1&&o[1]===0){let d=s.type.value,l=[16,16,1];a=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(u,s)}
  var<workgroup> tile : array<array<${d}, ${l[0]+1}>, ${l[0]}>;
  ${c.mainStart(l)}
    var x = workgroup_id.x * ${l[0]}u + local_id.x;
    var y = workgroup_id.y * ${l[0]}u + local_id.y;
    let width = uniforms.output_shape[0];
    let height = uniforms.output_shape[1];
    if (x < width && y < height) {
      tile[local_id.y][local_id.x] = ${u.getByOffset("y * width + x")};
    }
    workgroupBarrier();
    x = workgroup_id.y * ${l[0]}u + local_id.x;
    y = workgroup_id.x * ${l[0]}u + local_id.y;
    if (x < height && y < width) {
      ${s.setByOffset("y * height + x","tile[local_id.x][local_id.y]")}
    }
  }`}else a=d=>`
  ${d.registerUniform("output_size","u32").declareVariables(u,s)}

  ${Au(o,n,u,s)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${s.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${s.setByOffset("global_idx",u.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:d=>{let l=x.size(i);return{outputs:[{dims:i,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...E(d[0].dims,i)]}},getShaderSource:a}},uo=(e,t)=>{Cu(e.inputs),e.compute(he(e.inputs[0],t.perm))},lo=e=>V({perm:e.perm})});var ku,Eu,Pu,zu,Ou,Bu,Du,Ru,Mu,Uu,Ee,co,po,mo,fo,ho,go,yo,bo,wo,$o,vo=A(()=>{"use strict";M();W();G();Ht();Xe();ku={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Eu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Pu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},zu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ou=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Bu=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},Du=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},Ru=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Mu=(e,t)=>{let r=[];if(!Ru(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Uu=(e,t,r,n,o,i,s)=>{let u=r[0].dims,a=x.size(i),d=x.size(s),l=S("_A",r[0].dataType,u),c=T("output",o,i),p=32,f=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(l,c)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Pu[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${l.getByOffset("offset + k")});
           bestValue = ${ku[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Eu[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${n==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${zu[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:a},programUniforms:[{type:12,data:d}]})}},Ee=(e,t,r,n)=>{let o=e.inputs.length===1?r:Or(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((f,m)=>m));let s=x.normalizeAxes(i,e.inputs[0].dims.length),u=s,a=e.inputs[0],d=Mu(u,e.inputs[0].dims.length);d.length>0&&(a=e.compute(he(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=Ou(u.length,a.dims.length));let[l,c]=Bu(a.dims,u),p=l;o.keepDims&&(p=Du(l,s)),e.compute(Uu(t,{hint:o.cacheKey,inputDependencies:["type"]},[a],n,e.inputs[0].dataType,p,c),{inputs:[a]})},co=(e,t)=>{Ee(e,"ReduceMeanShared",t,"mean")},po=(e,t)=>{Ee(e,"ReduceL1Shared",t,"l1")},mo=(e,t)=>{Ee(e,"ReduceL2Shared",t,"l2")},fo=(e,t)=>{Ee(e,"ReduceLogSumExpShared",t,"logSumExp")},ho=(e,t)=>{Ee(e,"ReduceMaxShared",t,"max")},go=(e,t)=>{Ee(e,"ReduceMinShared",t,"min")},yo=(e,t)=>{Ee(e,"ReduceProdShared",t,"prod")},bo=(e,t)=>{Ee(e,"ReduceSumShared",t,"sum")},wo=(e,t)=>{Ee(e,"ReduceSumSquareShared",t,"sumSquare")},$o=(e,t)=>{Ee(e,"ReduceLogSumShared",t,"logSum")}});var Pe,Vu,qt,Or,ze,Nu,Wu,Lu,Gu,Hu,qu,Fu,Ku,ju,Xu,Oe,_o,xo,So,Io,Co,To,Ao,ko,Eo,Po,Ht=A(()=>{"use strict";M();W();ae();G();vo();Pe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Vu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qt=(e,t,r,n,o,i,s=!1,u=!1)=>{let a=[],d=r[0].dims,l=d.length,c=x.normalizeAxes(o,l),p=!u&&c.length===0;d.forEach((b,y)=>{p||c.indexOf(y)>=0?s&&a.push(1):a.push(b)});let f=a.length,m=x.size(a);return{name:e,shaderCache:t,getShaderSource:b=>{let y=[],g=S("_A",r[0].dataType,l),w=T("output",i,f),$=n(g,w,c),v=$[2];for(let _=0,I=0;_<l;_++)p||c.indexOf(_)>=0?(s&&I++,v=`for(var j${_}: u32 = 0; j${_} < ${d[_]}; j${_}++) {
                  ${$[2].includes("last_index")?`let last_index = j${_};`:""}
                  ${g.indicesSet("input_indices",_,`j${_}`)}
                  ${v}
                }`):(y.push(`${g.indicesSet("input_indices",_,w.indicesGet("output_indices",I))};`),I++);return`

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
        }`},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...E(d,a)]})}},Or=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),V({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ze=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:Or(o,r);e.compute(qt(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?Vu:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Nu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Wu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Lu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Gu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Hu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMax",t,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(n.indicesSet("input_indices",u,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},qu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMean",t,(n,o,i)=>{let s=1;for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&(s*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Fu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMin",t,(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Ku=(e,t)=>{Pe(e.inputs),ze(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},ju=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Xu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Oe=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},_o=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qu(e,t):co(e,t)},xo=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wu(e,t):po(e,t)},So=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Lu(e,t):mo(e,t)},Io=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Gu(e,t):fo(e,t)},Co=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Hu(e,t):ho(e,t)},To=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fu(e,t):go(e,t)},Ao=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ku(e,t):yo(e,t)},ko=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ju(e,t):bo(e,t)},Eo=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xu(e,t):wo(e,t)},Po=(e,t)=>{Oe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Nu(e,t):$o(e,t)}});var zo,Oo,Bo,Br,Do=A(()=>{"use strict";M();ae();Ht();zo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Oo=(e,t)=>{zo(e.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Bo=(e,t)=>{zo(e.inputs);let r=(n,o,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Br=e=>V(e)});var Zu,Yu,Qu,Ju,et,ed,Ro,Ft=A(()=>{"use strict";M();W();Vt();G();Zu=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let a=r.dims[0],d=r.dims[1],l=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==l)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,f=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of t.qkvHiddenSizes)if(w%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=d;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==a)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(h=s.dims[3])}let b=m+h,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==a||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:a,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:l,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Yu=(e,t,r)=>{let n=J(r),o=64,i=r/n;i<o&&(o=32);let s=Math.ceil(r/n/o),u=[{type:1,data:1/r},{type:12,data:i},{type:12,data:s}],a=Q(e.dataType,n),d=ce(1,n),l=["type"],c=p=>{let f=T("x",e.dataType,e.dims,n),m=ce(e.dataType),h=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${p.registerUniforms(h).declareVariables(f)}
  ${p.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${d}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${d}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(n){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${d}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${d}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(n){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${f.type.value}(${m}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${d}(x[offset + i]);
        x[offset + i] = ${f.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${a};${n}`,inputDependencies:l},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:t},programUniforms:u})}},Qu=(e,t,r,n,o,i,s,u)=>{let a=u+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,a],l=i.kvNumHeads===void 0&&e>1&&n,c=l?[i.batchSize,i.numHeads,a,i.headSize]:void 0,p=s.scale===0?1/Math.sqrt(i.headSize):s.scale,f=J(i.headSize),m=i.headSize/f,h=12,b={x:Math.ceil(a/h),y:Math.ceil(i.sequenceLength/h),z:i.batchSize*i.numHeads},y=[{type:12,data:i.sequenceLength},{type:12,data:m},{type:12,data:a},{type:12,data:i.numHeads},{type:1,data:p},{type:12,data:u},{type:12,data:i.kvSequenceLength}],g=l&&n&&x.size(n.dims)>0,w=["type","type"];g&&w.push("type"),o&&w.push("type");let $=[{dims:d,dataType:t.dataType,gpuDataType:0}];l&&$.push({dims:c,dataType:t.dataType,gpuDataType:0});let v=_=>{let I=S("q",t.dataType,t.dims,f),C=S("key",r.dataType,r.dims,f),z=[I,C];if(g){let K=S("past_key",n.dataType,n.dims,f);z.push(K)}o&&z.push(S("attention_bias",o.dataType,o.dims));let P=T("output",t.dataType,d),R=[P];l&&R.push(T("present_key",t.dataType,c,f));let q=ce(1,f),F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${h}u;

  var<workgroup> tileQ: array<${I.type.storage}, ${h*h}>;
  var<workgroup> tileK: array<${I.type.storage}, ${h*h}>;
  ${_.registerUniforms(F).declareVariables(...z,...R)}
  ${_.mainStart([h,h,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>g&&l?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${l?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${q}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>g&&l?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];")()}
      ${l?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${q}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(f){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${f}`)}})()};
        output[outputIdx] = ${P.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${f};${o!==void 0};${n!==void 0};${e}`,inputDependencies:w},getRunData:()=>({outputs:$,dispatchGroup:b,programUniforms:y}),getShaderSource:v}},Ju=(e,t,r,n,o,i)=>{let s=i+o.kvSequenceLength,u=o.nReps?o.nReps:1,a=o.vHiddenSize*u,d=o.kvNumHeads==null&&e>1&&n,l=d?[o.batchSize,o.numHeads,s,o.headSize]:void 0,c=[o.batchSize,o.sequenceLength,a],p=12,f={x:Math.ceil(o.vHeadSize/p),y:Math.ceil(o.sequenceLength/p),z:o.batchSize*o.numHeads},m=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:a},{type:12,data:i},{type:12,data:o.kvSequenceLength}],h=d&&n&&x.size(n.dims)>0,b=["type","type"];h&&b.push("type");let y=[{dims:c,dataType:t.dataType,gpuDataType:0}];d&&y.push({dims:l,dataType:t.dataType,gpuDataType:0});let g=w=>{let $=S("probs",t.dataType,t.dims),v=S("v",r.dataType,r.dims),_=[$,v];h&&_.push(S("past_value",n.dataType,n.dims));let C=[T("output",t.dataType,c)];d&&C.push(T("present_value",t.dataType,l));let z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${p}u;
  var<workgroup> tileQ: array<${$.type.value}, ${p*p}>;
  var<workgroup> tileK: array<${$.type.value}, ${p*p}>;
  ${w.registerUniforms(z).declareVariables(..._,...C)}
  ${w.mainStart([p,p,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>h&&d?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${d?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${$.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>h&&d?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:b},getRunData:()=>({outputs:y,dispatchGroup:f,programUniforms:m}),getShaderSource:g}},et=(e,t,r,n,o,i,s,u,a,d,l)=>{let c=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),p=d.kvNumHeads!==void 0||c>1?d.pastSequenceLength:0,f=p+d.kvSequenceLength,m=a&&x.size(a.dims)>0?a:void 0,h=[t,r];d.kvNumHeads===void 0&&c>1&&s&&x.size(s.dims)>0&&h.push(s),m&&h.push(m);let b=e.compute(Qu(c,t,r,s,m,d,l,p),{inputs:h,outputs:d.kvNumHeads===void 0&&c>1?[-1,1]:[-1]})[0];e.compute(Yu(b,d.batchSize*d.numHeads*d.sequenceLength,f),{inputs:[b],outputs:[]});let y=[b,n];d.kvNumHeads===void 0&&c>1&&u&&x.size(u.dims)>0&&y.push(u),e.compute(Ju(c,b,n,u,d,p),{inputs:y,outputs:d.kvNumHeads===void 0&&c>1?[0,2]:[0]})},ed=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},a=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],l=c=>{let p=T("output_q",a[0].dataType,r),f=T("output_k",a[0].dataType,r),m=T("output_v",a[0].dataType,r),h=S("input",a[0].dataType,a[0].dims),b=S("weight",a[1].dataType,a[1].dims),y=S("bias",a[2].dataType,a[2].dims),g=h.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${c.registerUniforms(w).declareVariables(h,b,y,p,f,m)}
  ${c.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:l},{inputs:a,outputs:[-1,-1,-1]})},Ro=(e,t)=>{let r=Zu(e.inputs,t),[n,o,i]=ed(e,r);return et(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}});var td,rd,nd,Mo,Uo=A(()=>{"use strict";Se();M();W();ae();G();td=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let s=o.length;if(s!==n.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((u,a)=>{if(u!==n[a])throw new Error(`${i}: dim[${a}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},rd=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,s=n?J(i[i.length-1]):1,u=o==="NHWC"&&i.length>1?s:1,a=x.size(i)/s,d=n,l=d?i.length:i,c=S("x",e[0].dataType,e[0].dims,s),p=S("scale",e[1].dataType,e[1].dims,u),f=S("bias",e[2].dataType,e[2].dims,u),m=S("inputMean",e[3].dataType,e[3].dims,u),h=S("inputVar",e[4].dataType,e[4].dims,u),b=T("y",e[0].dataType,l,s),y=()=>{let w="";if(n)w=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")w=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<p.rank;$++)w+=`cIndices[${$}] = outputIndices[${$}];`;w+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return w},g=w=>`
  const epsilon = ${r};
  ${w.registerUniform("outputSize","u32").declareVariables(c,p,f,m,h,b)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d?[{type:12,data:a},...E(i)]:[{type:12,data:a}]})}},nd=e=>V(e),Mo=(e,t)=>{let{inputs:r,outputCount:n}=e,o=nd({...t,outputCount:n});if(Y.webgpu.validateInputContent&&td(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(rd(r,o))}});var od,id,Vo,No=A(()=>{"use strict";W();G();od=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},id=e=>{let t=e[0].dims,r=e[0].dims[2],n=x.size(t)/4,o=e[0].dataType,i=S("input",o,t,4),s=S("bias",o,[r],4),u=S("residual",o,t,4),a=T("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(i,s,u,a)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${a.setByOffset("global_idx","value")}
  }`}},Vo=e=>{od(e.inputs),e.compute(id(e.inputs))}});var sd,X,Wo,Lo,Go,Ho,qo,Fo,Ko,jo,Xo,ad,Zo,Yo,Qo,Jo,dt,ei,Kt,ti,ri,ni,oi,ii,si,ai,ui,di,li,ci,pi,mi,fi,hi,gi,yi,bi,Dr,Rr,wi,$i,vi,ud,dd,_i,jt=A(()=>{"use strict";M();W();ae();G();sd=(e,t,r,n,o,i)=>{let s=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let a=S("inputData",r,[s],4),d=T("outputData",n,[s],4);return`
      ${e.registerUniform("vec_size","u32").declareVariables(a,d)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${a.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},X=(e,t,r,n,o,i=e.dataType)=>({name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:s=>sd(s,x.size(e.dims),e.dataType,i,r,n),getRunData:s=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(x.size(s[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(e.dims)/4)}]})}),Wo=e=>{e.compute(X(e.inputs[0],"Abs","abs"))},Lo=e=>{e.compute(X(e.inputs[0],"Acos","acos"))},Go=e=>{e.compute(X(e.inputs[0],"Acosh","acosh"))},Ho=e=>{e.compute(X(e.inputs[0],"Asin","asin"))},qo=e=>{e.compute(X(e.inputs[0],"Asinh","asinh"))},Fo=e=>{e.compute(X(e.inputs[0],"Atan","atan"))},Ko=e=>{e.compute(X(e.inputs[0],"Atanh","atanh"))},jo=e=>V(e),Xo=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(X(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},ad=e=>{let t=e.length>=2&&e[1].data!==0?e[1].getFloat32Array()[0]:Wt,r=e.length>=3&&e[2].data!==0?e[2].getFloat32Array()[0]:Lt;return V({min:t,max:r})},Zo=(e,t)=>{let r=e.inputs.length===1?t:ad(e.inputs),n=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"Clip",o=>`clamp(${o}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${n}> = vec4(${n}(${r.min}));
    const clip_max_: vec4<${n}> = vec4(${n}(${r.max}));
`,r.cacheKey),{inputs:[0]})},Yo=e=>{e.compute(X(e.inputs[0],"Ceil","ceil"))},Qo=e=>{e.compute(X(e.inputs[0],"Cos","cos"))},Jo=e=>{e.compute(X(e.inputs[0],"Cosh","cosh"))},dt=e=>V(e),ei=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kt=(e="f32")=>`
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
}`,ti=e=>{let t=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Kt(t)))},ri=e=>{e.compute(X(e.inputs[0],"Exp","exp"))},ni=e=>{e.compute(X(e.inputs[0],"Floor","floor"))},oi=e=>{let t=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Kt(t)))},ii=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},si=e=>{e.compute(X(e.inputs[0],"Not",t=>`!${t}`))},ai=e=>{e.compute(X(e.inputs[0],"Neg",t=>`-${t}`))},ui=e=>{e.compute(X(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},di=e=>{let t=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},li=e=>{e.compute(X(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ci=e=>V(e),pi=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},mi=e=>{e.compute(X(e.inputs[0],"Sin","sin"))},fi=e=>{e.compute(X(e.inputs[0],"Sinh","sinh"))},hi=e=>{e.compute(X(e.inputs[0],"Sqrt","sqrt"))},gi=e=>{e.compute(X(e.inputs[0],"Tan","tan"))},yi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,bi=e=>{e.compute(X(e.inputs[0],"Tanh",yi))},Dr=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${yi("v")};
}
`,Rr=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,wi=e=>{let t=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"FastGelu",Rr,Dr(t),void 0,e.inputs[0].dataType))},$i=(e,t)=>{let r=ce(e.inputs[0].dataType);return e.compute(X(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},vi=e=>{e.compute(X(e.inputs[0],"Log","log"))},ud=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,dd=e=>`quick_gelu_impl(${e})`,_i=(e,t)=>{let r=ce(e.inputs[0].dataType);e.compute(X(e.inputs[0],"QuickGelu",dd,ud(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var ld,cd,Si,Ii=A(()=>{"use strict";W();G();jt();ld=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},cd=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=S("input",e[0].dataType,e[0].dims,4),n=S("bias",e[0].dataType,[e[0].dims[2]],4),o=T("output",e[0].dataType,t,4),i=x.size(t)/4,s=Q(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:a=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${a.declareVariables(r,n,o)}

  ${Kt(s)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Si=e=>{ld(e.inputs),e.compute(cd(e.inputs))}});var pd,md,Be,Ci,Ti,Ai,ki,Ei,Pi,zi,Oi,Bi,Di,Ri=A(()=>{"use strict";M();W();G();pd=(e,t,r,n,o,i,s,u,a,d,l,c)=>{let p,f;typeof u=="string"?p=f=(g,w)=>`${u}((${g}),(${w}))`:typeof u=="function"?p=f=u:(p=u.scalar,f=u.vector);let m=T("outputData",l,n.length,4),h=S("aData",a,t.length,4),b=S("bData",d,r.length,4),y;if(o)if(i){let g=x.size(t)===1,w=x.size(r)===1,$=t.length>0&&t[t.length-1]%4===0,v=r.length>0&&r[r.length-1]%4===0;g||w?y=m.setByOffset("global_idx",f(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||$?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||v?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(h.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(w,$,v="")=>{let _=`aData[indexA${$}][componentA${$}]`,I=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${m.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,m)};
            let offsetB${$} = ${b.broadcastedIndicesToOffset(`outputIndices${$}`,m)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${w}[${$}] = ${v}(${p(_,I)});
          `};l===9?y=`
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

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},md=(e,t,r,n,o,i,s=r.dataType)=>{let u=!x.areEqual(r.dims,n.dims),a=r.dims,d=x.size(r.dims),l=!1,c=!1,p=[u];if(u){let f=ke.calcShape(r.dims,n.dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");a=f,d=x.size(a);let m=x.size(r.dims)===1,h=x.size(n.dims)===1,b=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,y=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;p.push(m),p.push(h),p.push(b),p.push(y);let g=1;for(let w=1;w<a.length;w++){let $=r.dims[r.dims.length-w]??1,v=n.dims[n.dims.length-w]??1;if($===v)g*=$;else break}g%4===0?(c=!0,l=!0):(m||h||b||y)&&(l=!0)}else l=!0;return p.push(l),{name:e,shaderCache:{hint:t+p.map(f=>f.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:f=>pd(f,r.dims,n.dims,a,l,u,c,o,r.dataType,n.dataType,s,i),getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(a)/4)},...E(r.dims,n.dims,a)]})}},Be=(e,t,r,n,o,i)=>{e.compute(md(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},Ci=e=>{Be(e,"Add",(t,r)=>`${t}+${r}`)},Ti=e=>{Be(e,"Div",(t,r)=>`${t}/${r}`)},Ai=e=>{Be(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ki=e=>{Be(e,"Mul",(t,r)=>`${t}*${r}`)},Ei=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Be(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Pi=e=>{Be(e,"Sub",(t,r)=>`${t}-${r}`)},zi=e=>{Be(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Oi=e=>{Be(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Bi=e=>{Be(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Di=e=>{Be(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var hd,gd,yd,bd,Mi,Ui,Vi=A(()=>{"use strict";M();W();ae();G();hd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((a,d)=>{if(d!==t&&a!==n.dims[d])throw new Error("non concat dimensions must match")})}})},gd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,yd=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},bd=(e,t,r,n)=>{let o=x.size(r),i=new Array(e.length),s=new Array(e.length),u=0,a=[],d=[],l=[{type:12,data:o}];for(let h=0;h<e.length;++h)u+=e[h].dims[t],i[h]=u,d.push(e[h].dims.length),s[h]=S(`input${h}`,n,d[h]),a.push("rank"),l.push({type:12,data:i[h]});for(let h=0;h<e.length;++h)l.push(...E(e[h].dims));l.push(...E(r));let c=T("output",n,r.length),p=c.indicesGet("indices",t),f=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),m=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let b=0;b<e.length;b++)h.registerUniform(`sizeInConcatAxis${b}`,"u32");return h.declareVariables(...s,c)})()}

  ${gd(i.length,f)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${f});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${yd(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:m}},Mi=(e,t)=>{let r=e.inputs,n=r[0].dims,o=x.normalizeAxis(t.axis,n.length);hd(r,o);let i=n.slice();i[o]=r.reduce((u,a)=>u+(a.dims.length>o?a.dims[o]:0),0);let s=r.filter(u=>x.size(u.dims)>0);e.compute(bd(s,o,i,r[0].dataType),{inputs:s})},Ui=e=>V({axis:e.axis})});var ve,_e,xe,Xt,Re=A(()=>{"use strict";M();W();ve=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},_e=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Xt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Wt,Lt];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var le,Zt,lt=A(()=>{"use strict";le=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Zt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Yt,Mr=A(()=>{"use strict";Yt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var wd,$d,ct,Ni,vd,pt,_d,Qt,mt=A(()=>{"use strict";M();W();G();Re();lt();wd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,$d=(e,t)=>e?`
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
        }`,ct=(e,t,r="f32",n,o=!1,i=32,s=!1,u=32)=>{let a=t[1]*e[1],d=t[0]*e[0],l=o?a:i,c=o?i:a,p=l/t[0],f=i/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&l%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${l/p}>, ${c}>;
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
          ${wd(o,n)}
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

          ${$d(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ni=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,vd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",pt=(e,t,r="f32",n,o=!1,i=32,s=!1,u=32,a=!1)=>{let d=e[1]*t[1],l=e[0]*t[0],c=o?d:i,p=o?i:d;if(!(p%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let f=p/t[1],m=c/t[0],h=i/t[1],b=a?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${l};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Ni(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
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
      ${Ni(o,n)}
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
      ${vd(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${l}>, ${i}>;
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
    ${b}
  }
`},_d=(e,t,r,n,o,i=!1)=>{let[s,u,a]=o,[d,l,c,p]=n,f=Je(s,a),m=Je(u,a),h=Q(n[0].type.tensor),b=()=>{let w=l.rank,$=d.rank,v=`var aIndices: ${l.type.indices};`;for(let _=w-2-1,I=$-1;_>=0;_--,I--)v+=`
aIndices[${_}] = ${$>1?`batchIndices[${I}]`:"batchIndices"};`;return f.forEach(_=>{v+=`
aIndices[${_}] = 0;`}),v+=`
aIndices[${w-2}] = u32(row);
                   aIndices[${w-1}] = u32(colIn);`,v},y=()=>{let w=c.rank,$=d.rank,v=`var bIndices: ${c.type.indices};`;for(let _=w-2-1,I=$-1;_>=0;_--,I--)v+=`
bIndices[${_}] = ${$>1?`batchIndices[${I}]`:"batchIndices"};`;return m.forEach(_=>{v+=`
bIndices[${_}] = 0;`}),v+=`
bIndices[${w-2}] = u32(row);
                   bIndices[${w-1}] = u32(colIn);`,v};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${le(e,h)} {
      var value = ${le(e,h)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${b()}
        value = ${l.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${le(e,h)} {
      var value = ${le(e,h)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${le(e,h)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${le(e,h)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Qt=(e,t,r,n,o=!1)=>{let i=e[0].dims,s=e[1].dims,u=i.slice(0,-2),a=s.slice(0,-2),d=n?n.slice(0,-2):r.slice(0,-2),l=x.size(d),c=i[i.length-2],p=i[i.length-1],f=s[s.length-1],m=p%4===0&&f%4===0,h=c<=8?[4,1,1]:[4,4,1],b=[8,8,1],y=[Math.ceil(f/b[0]/h[0]),Math.ceil(c/b[1]/h[1]),Math.ceil(l/b[2]/h[2])],g=m?4:1,w=[...u,c,p/g],$=w.length,v=[...a,p,f/g],_=v.length,I=[l,c,f/g],C=[{type:6,data:c},{type:6,data:f},{type:6,data:p}];_e(t,C),C.push(...E(d,w,v));let z=["rank","rank"],P=e.length>2;P&&(C.push(...E(e[2].dims)),z.push("rank")),C.push(...E(I));let R=q=>{let F=d.length,K=Gt("batchDims",e[0].dataType,F,1),re=Q(e[0].dataType),B=S("a",e[0].dataType,$,g),ne=S("b",e[1].dataType,_,g),Z=T("result",e[0].dataType,I.length,g),N=[B,ne];if(P){let k=o?g:1;N.push(S("bias",e[2].dataType,e[2].dims.length,k))}let H=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xe(t,H);let D=Q(Z.type.tensor),te=ve(t,Z.type.value,D),ue=_d(g,P,te,[K,B,ne,Z],[u,a,d],o);return`
  ${q.registerUniforms(H).registerInternalVariables(K).declareVariables(...N,Z)}
  ${ue}
  ${m?ct(h,b,re,K):pt(h,b,re,K)}
                   `};return{name:"MatMul",shaderCache:{hint:`${h};${t.activation};${m};${o}`,inputDependencies:z},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:C}),getShaderSource:R}}});var xd,Wi,Li=A(()=>{"use strict";M();De();G();Re();lt();Mr();mt();xd=(e,t,r,n,o=!1,i,s=4,u=4,a=4,d="f32")=>{let l=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},c=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},p=e?`
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
    var resData = ${le(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${l(s)}
    }
    return resData;`,w=e?t&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${le(s,d)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${le(s,d)}(0.0);`,$=`${c(u)}`,v=le(a,d),_=e?le(s,d):le(u,d),I=e?le(u,d):le(s,d),C=ve(i,v,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${_} {
      ${e?w:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${I} {
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
      ${C}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Wi=(e,t,r,n,o,i,s,u)=>{let a=t.format==="NHWC",d=a?e[0].dims[3]:e[0].dims[1],l=r[0],c=a?r[2]:r[3],p=a?r[1]:r[2],f=a?r[3]:r[1],m=a&&(d%4===0||d%3===0)&&f%4===0,h=a?f:c*p,b=a?c*p:f,y=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],w=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(l/y[2]/g[2])];ee("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${w}`);let $=m?a&&d%4!==0?3:4:1,v=y[1]*g[1],_=y[0]*g[0],I=Math.max(y[0]*$,y[1]),C=n%v===0,z=o%_===0,P=i%I===0,R=m?[$,4,4]:[1,1,1],q=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];_e(t,q),q.push(...E(e[0].dims,e[1].dims));let F=["rank","rank"];s&&(q.push(...E(e[2].dims)),F.push("rank")),q.push(...E(r));let K=re=>{let B=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xe(t,B);let ne=m?4:1,Z=Q(e[0].dataType),N=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${m?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,H=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),D=S("w",e[1].dataType,e[1].dims.length,ne),te=[H,D],ue=T("result",e[0].dataType,r.length,ne);if(s){let k=S("bias",e[2].dataType,e[2].dims.length,ne);te.push(k),N+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${Z}>`:Z} {
          return bias[coords.${a?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${Yt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${re.registerUniforms(B).declareVariables(...te,ue)}
        ${N}
        ${xd(a,C,z,P,s,t,R[0],R[1],R[2],Z)}
        ${m?ct(g,y,Z,void 0,!a,I):pt(g,y,Z,void 0,!a,I,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${m};${C};${z};${P};${v};${_};${I}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:q}),getShaderSource:K}}});var Sd,Gi,Jt,Id,Hi,Cd,qi,Fi,Ki=A(()=>{"use strict";M();De();W();G();Re();lt();Sd=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Gi=e=>typeof e=="number"?[e,e,e]:e,Jt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Id=(e,t,r,n=1)=>{let o=Jt(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Hi=(e,t,r,n,o)=>{o==null&&(o=Id(e,t[0],n[0]));let i=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*o)/n[s]+1));return i},Cd=(e,t,r,n,o,i,s,u,a,d)=>{let l,c,p,f;if(e==="VALID"&&(e=0),typeof e=="number"){l={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Hi([t,r,n,1],[u,a,d],1,[o,i,s],e);c=m[0],p=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((h,b,y)=>h===y[0]))throw Error(`Unsupported padding parameter: ${e}`);l={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Hi([t,r,n,1],[u,a,d],1,[o,i,s],e[0]);c=m[0],p=m[1],f=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/o),p=Math.ceil(r/i),f=Math.ceil(n/s);let m=(c-1)*o+u-t,h=(p-1)*i+a-r,b=(f-1)*s+d-n,y=Math.floor(m/2),g=m-y,w=Math.floor(h/2),$=h-w,v=Math.floor(b/2),_=b-v;l={top:w,bottom:$,left:v,right:_,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outDepth:c,outHeight:p,outWidth:f}},qi=(e,t,r,n,o,i=!1,s="channelsLast")=>{let u,a,d,l,c;if(s==="channelsLast")[u,a,d,l,c]=e;else if(s==="channelsFirst")[u,c,a,d,l]=e;else throw new Error(`Unknown dataFormat ${s}`);let[p,,f,m,h]=t,[b,y,g]=Gi(r),[w,$,v]=Gi(n),_=Jt(f,w),I=Jt(m,$),C=Jt(h,v),{padInfo:z,outDepth:P,outHeight:R,outWidth:q}=Cd(o,a,d,l,b,y,g,_,I,C),F=i?p*c:p,K=[0,0,0,0,0];return s==="channelsFirst"?K=[u,F,P,R,q]:s==="channelsLast"&&(K=[u,P,R,q,F]),{batchSize:u,dataFormat:s,inDepth:a,inHeight:d,inWidth:l,inChannels:c,outDepth:P,outHeight:R,outWidth:q,outChannels:F,padInfo:z,strideDepth:b,strideHeight:y,strideWidth:g,filterDepth:f,filterHeight:m,filterWidth:h,effectiveFilterDepth:_,effectiveFilterHeight:I,effectiveFilterWidth:C,dilationDepth:w,dilationHeight:$,dilationWidth:v,inShape:e,outShape:K,filterShape:t}},Fi=(e,t,r,n,o,i)=>{let s=i==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],a=!1,d=[64,1,1],l={x:r.map((g,w)=>w)},c=[Math.ceil(Sd(l.x.map(g=>r[g]))/d[0]),1,1];ee("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=a?s&&u%4!==0?3:4:1,f=x.size(r),m=[{type:12,data:f},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];_e(t,m),m.push(...E(e[0].dims,e[1].dims));let h=["rank","rank"],b=e.length===3;b&&(m.push(...E(e[2].dims)),h.push("rank")),m.push(...E(r));let y=g=>{let w=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xe(t,w);let $=a?4:1,v=Q(e[0].dataType),_=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),I=S("W",e[1].dataType,e[1].dims.length,$),C=[_,I],z=T("result",e[0].dataType,r.length,$),P="";if(b){let F=S("bias",e[2].dataType,e[2].dims.length,$);C.push(F),P+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${a?`vec4<${v}>`:v} {
          return bias[${s?O("coords",4,5):O("coords",1,5)}${a?"/ 4":""}];
        }`}let R=le(p,v),q=ve(t,R,v);return`
            ${P}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${_.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${g.registerUniforms(w).declareVariables(...C,z)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${O("coords",0,_.rank)};
              let d2 = ${s?O("coords",_.rank-1,_.rank):O("coords",1,_.rank)};
              let xFRCCorner = vec3<u32>(${s?O("coords",1,_.rank):O("coords",2,_.rank)},
              ${s?O("coords",2,_.rank):O("coords",3,_.rank)},
              ${s?O("coords",3,_.rank):O("coords",4,_.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?O("uniforms.x_shape",1,_.rank):O("uniforms.x_shape",2,_.rank)};
              let xShapeZ = ${s?O("uniforms.x_shape",2,_.rank):O("uniforms.x_shape",3,_.rank)};
              let xShapeW = ${s?O("uniforms.x_shape",3,_.rank):O("uniforms.x_shape",4,_.rank)};
              let xShapeU = ${s?O("uniforms.x_shape",4,_.rank):O("uniforms.x_shape",1,_.rank)};
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
              ${q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${b}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:y}}});var Ur,ji,Xi=A(()=>{"use strict";M();W();G();Vr();Re();Ur=(e,t,r)=>{let n=e.length>2,o=n?"value += b[output_channel];":"",i=e[0].dims,s=e[1].dims,u=s[0]/t.group,a=t.format==="NHWC",d=er(i,s,t.dilations,t.pads,t.strides,a),l=x.size(d),c=[{type:12,data:l},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:u}];_e(t,c),c.push(...E(i,s));let p=["rank","rank"];n&&(c.push(...E(e[2].dims)),p.push("rank")),c.push(...E(d));let f=m=>{let h=T("output",e[0].dataType,d.length),b=Q(h.type.tensor),y=ve(t,h.type.value,b),g=S("x",e[0].dataType,i.length),w=S("w",e[1].dataType,s.length),$=[g,w];n&&$.push(S("b",e[2].dataType,e[2].dims.length));let v=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return xe(t,v),`
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
  }`};return{name:"GroupedConv",shaderCache:{hint:t.cacheKey,inputDependencies:p},getRunData:()=>({outputs:[{dims:r?r(d):d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:f}},ji=(e,t,r)=>{let n=e.length>2,o=J(r[3]),i=J(r[2]),s=x.size(r)/o/i,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],a=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],d=[r[0],r[1],r[2],r[3]/o],l=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];_e(t,l),l.push(...E(u,a,d));let c=(i-1)*t.strides[1]+a[1],p=f=>{let m=T("output",e[0].dataType,d.length,o),h=Q(m.type.tensor),b=ve(t,m.type.value,h),y=S("x",e[0].dataType,u.length,o),g=S("w",e[1].dataType,a.length,o),w=[y,g];n&&w.push(S("b",e[2].dataType,e[2].dims,o));let $=n?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xe(t,v),`
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

    var x_vals: array<${y.type.value}, ${c}>;
    var values: array<${m.type.value}, ${i}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${a[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
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
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${i};${c};${a[0]};${a[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:p}}});var Nr,Td,Zi,Wr=A(()=>{"use strict";M();W();mt();G();Re();Nr=(e,t,r,n,o=!1)=>{let i=e[0].dims,s=e[1].dims,u=i[i.length-2],a=s[s.length-1],d=i[i.length-1],l=J(a),c=J(d),p=J(u),f=x.size(r)/l/p,m=e.length>2,h=n?n.slice(0,-2):r.slice(0,-2),y=[x.size(h),u,a],g=[{type:12,data:f},{type:12,data:u},{type:12,data:a},{type:12,data:d}];_e(t,g),g.push(...E(h,i,s)),m&&g.push(...E(e[2].dims)),g.push(...E(y));let w=$=>{let v=Gt("batch_dims",e[0].dataType,h.length),_=S("a",e[0].dataType,i.length,c),I=S("b",e[1].dataType,s.length,l),C=T("output",e[0].dataType,y.length,l),z=Q(C.type.tensor),P=ve(t,C.type.value,z),R=[_,I],q="";if(m){let H=o?l:1;R.push(S("bias",e[2].dataType,e[2].dims.length,H)),q=`${o?`value += bias[col / ${H}];`:`value += ${C.type.value}(bias[row + i]);`}`}let F=i.slice(0,-2),K=s.slice(0,-2),re=Je(F,h),B=Je(K,h),ne=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xe(t,ne);let Z=(H,D)=>{let te=H.rank,ue=H.name;if(te===2)return`var ${ue}_indices = ${H.type.indices}(0u, 0u);`;let k=v.rank,U=`var ${ue}_indices: ${H.type.indices};`;for(let j=te-2-1,Te=k-1;j>=0;j--,Te--)U+=`
${ue}_indices[${j}] = ${k>1?`batch_indices[${Te}]`:"batch_indices"};`;return D.forEach(j=>{U+=`
${ue}_indices[${j}] = 0;`}),U+=`${ue}_indices[${te-2}] = 0u;
                     ${ue}_indices[${te-1}] = 0u;`,U},N=()=>{let H=`var a_data: ${_.type.value};`;for(let D=0;D<c;D++)H+=`
              let b_data${D} = b[(b_offset + (k + ${D}) * uniforms.N + col) / ${l}];`;for(let D=0;D<p;D++){H+=`a_data = a[(a_offset + (row + ${D}) * uniforms.K + k) / ${c}];`;for(let te=0;te<c;te++)H+=`
            values[${D}] = fma(${I.type.value}(a_data${c===1?"":`[${te}]`}), b_data${te}, values[${D}]);
`}return H};return`
  ${$.registerUniforms(ne).registerInternalVariables(v).declareVariables(...R,C)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${l})) * ${l};
    var index1 = global_idx / (uniforms.N / ${l});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${Z(_,re)}
    let a_offset = ${_.indicesToOffset("a_indices")};
    ${Z(I,B)}
    let b_offset = ${I.indicesToOffset("b_indices")};
    var values: array<${C.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${N()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${q}
      ${P}
      let cur_indices = ${C.type.indices}(batch, row + i, col);
      let offset = ${C.indicesToOffset("cur_indices")};
      ${C.setByOffset(`offset / ${l}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${l};${c};${p};${o}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:w}},Td=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Zi=e=>{Td(e.inputs);let t=ke.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(Nr(e.inputs,{activation:""},t)):e.compute(Qt(e.inputs,{activation:""},t))}});var er,Lr,Ad,Gr,Hr,kd,Ed,Pd,qr,Vr=A(()=>{"use strict";W();Li();Ki();mt();Xi();Re();Wr();Xe();er=(e,t,r,n,o,i)=>{let s=e[0],u=e.slice(i?1:2,i?3:4),a=u.length,d=t[0],c=t.slice(2).map((m,h)=>m+(m-1)*(r[h]-1)),f=u.map((m,h)=>m+n[h]+n[h+a]).map((m,h)=>Math.floor((m-c[h]+o[h])/o[h]));return f.splice(0,0,s),f.splice(i?3:1,0,d),f},Lr=[2,3,1,0],Ad=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Gr=(e,t)=>{let r=e.kernelShape.slice();for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Fe.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},Hr=e=>{let t=Xt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,s=e.kernel_shape,u=e.pads,a=e.strides,d=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,pads:u,strides:a,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},kd=(e,t,r)=>{let n=Gr(r,t),o=r.format==="NHWC";if(r.group!==1){if(!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let I=er(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),C=e.kernelCustomData.wT??e.compute(he(t[1],Lr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C);let z=[t[0],C];t.length===3&&z.push(t[2]),e.compute(ji(z,n,I),{inputs:z})}else e.compute(Ur(t,n));return}let i=t.length===3,s=t[0].dims[o?1:2],u=t[0].dims[o?2:3],a=t[0].dims[o?3:1],d=t[1].dims[2],l=t[1].dims[3],c=er(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),p=c[o?1:2],f=c[o?2:3],m=c[o?3:1],h=o&&d===s&&l===u&&r.pads[0]===0&&r.pads[1]===0;if(h||d===1&&l===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let _=c[0],I,C,z,P=[];if(o){let F=e.kernelCustomData.wT??e.compute(he(t[1],Lr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=F),h){let K=s*u*a;I=t[0].reshape([1,_,K]),C=F.reshape([1,K,m]),z=[1,_,m]}else I=t[0].reshape([_,s*u,a]),C=F.reshape([1,a,m]),z=[_,p*f,m];P.push(I),P.push(C)}else I=t[0].reshape([_,a,s*u]),C=t[1].reshape([1,m,a]),z=[_,m,p*f],P.push(C),P.push(I);i&&P.push(t[2]);let R=z[2],q=P[0].dims[P[0].dims.length-1];R<8&&q<8?e.compute(Nr(P,n,c,z,o),{inputs:P}):e.compute(Qt(P,n,c,z,o),{inputs:P});return}let b=!0,y=e.kernelCustomData.wT??e.compute(he(t[1],Lr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];i&&g.push(t[2]);let w=o?p*f:m,$=o?m:p*f,v=d*l*a;e.compute(Wi(g,n,c,w,$,v,i,b),{inputs:g})},Ed=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),a=Gr({...t,pads:o,strides:i,dilations:s,kernelShape:u},n);e.compute(Ur(n,a,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},Pd=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Gr(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=qi(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Fi(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},qr=(e,t)=>{Ad(e.inputs,t),e.inputs[0].dims.length===3?Ed(e,t):e.inputs[0].dims.length===5?Pd(e,e.inputs,t):kd(e,e.inputs,t)}});var zd,Yi,Qi=A(()=>{"use strict";M();De();G();Re();lt();Mr();mt();zd=(e,t=!1,r,n,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
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
    `,a=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",d=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",l=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${l} / outWidth;
      let outCol = ${l} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
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
      let xCh = ${c} % inChannels;
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
      `,h=ve(r,n);return`
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
  }`},Yi=(e,t,r,n,o,i,s,u)=>{let a=t.format==="NHWC",d=a?e[0].dims[3]:e[0].dims[1],l=r[0],c=a?r[2]:r[3],p=a?r[1]:r[2],f=a?r[3]:r[1],m=a&&d%4===0&&d%3&&f%4===0,h=a?f:c*p,b=a?c*p:f,y=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],w=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(l/y[2]/g[2])];ee("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${w}`);let $=m?4:1,v=Math.max(y[0]*$,y[1]),_=m?4:1,I=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],C=[I[0]+(t.dilations[0]<=1?0:(I[0]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(I[1]-1)*(t.dilations[1]-1))],z=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],P=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:I},{type:6,data:z}];_e(t,P),P.push(...E(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(P.push(...E(e[2].dims)),R.push("rank")),P.push(...E(r));let q=F=>{let K=S("x",e[0].dataType,e[0].dims.length,_),re=S("w",e[1].dataType,e[1].dims.length,1),B=T("result",e[0].dataType,r.length,_),ne=[K,re],Z="";if(s){let D=S("bias",e[2].dataType,e[2].dims.length,_);ne.push(D),Z+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${D.type.value} {
            return bias[coords.${a?"w":"y"}${m?"/ 4":""}];
          }`}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:I.length},{name:"pads",type:"i32",length:z.length}];xe(t,N);let H=Q(e[0].dataType,1);if(H!=="f16"&&H!=="f32")throw new Error(`elemType ${H} is not supported.`);return`
        ${Yt("uniforms.result_strides")}
        ${F.registerUniforms(N).declareVariables(...ne,B)};
        ${Z}
        ${zd(a,s,t,K.type.value,$)}
        ${m?ct(g,y,H,void 0,!a,v):pt(g,y,H,void 0,!a,v,!1,void 0,u)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${y};${m}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:q}}});var Od,Fr,Ji=A(()=>{"use strict";M();De();W();G();Od=(e,t,r,n,o,i=!1,s,u,a=!1)=>{let d=a?1:2,l=a?2:3,c=a?3:1,p=i?2:1,f=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;n&&(f+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${a?"w":"y"}${i?"/ 4":""}];
    }`);let m=i?4:1,h=S("W",t[1].dataType,t[1].dims.length,m),b=S("Dy",t[0].dataType,t[0].dims.length,m),y=[b,h];n&&y.push(S("bias",t[2].dataType,[r[c]].length,m));let g=T("result",t[0].dataType,r.length,m),w=`{
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
              let d2Length = uniforms.Dy_shape[${c}];
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
          let d1 = ${g.indicesGet("outputIndices",c)};
          let r = ${g.indicesGet("outputIndices",d)};
          let c = ${g.indicesGet("outputIndices",l)};
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
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${l}]) ||
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
  ${i?w:$}}`},Fr=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=x.size(o),s=[Math.ceil(i/64),1,1];ee("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let u=t.format==="NHWC",a=["rank","rank"],d=[t.strides[0],t.strides[1]],l=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],c=[t.dilations[0],t.dilations[1]],p=[l[0]+(t.dilations[0]<=1?0:(t.kernelShape[u?1:2]-1)*(t.dilations[0]-1)),l[1]+(t.dilations[1]<=1?0:(t.kernelShape[u?2:3]-1)*(t.dilations[1]-1))],f=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,h=t.group,b=e[1].dims,y=b[0]/h,g=b[1],w=[{type:12,data:i},{type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:p},{type:6,data:f},{type:12,data:y},{type:12,data:g},...E(e[0].dims,e[1].dims)];n&&(w.push(...E(e[2].dims)),a.push("rank")),w.push(...E(o));let $=s[1]===1&&s[2]===1,v=_=>{let I=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:d.length},{name:"filter_dims",type:"u32",length:l.length},{name:"dilations",type:"u32",length:l.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:f.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],C=Q(e[0].dataType);return`${Od(_,e,o,n,$,m,C,I,u)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:a},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:v}}});var Bd,Dd,Rd,es,ts,Md,Ud,Vd,Nd,rs,ns=A(()=>{"use strict";Qi();Ji();Re();Xe();Bd=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,Dd=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},Rd=(e,t,r,n,o,i,s,u,a,d)=>{let l=e.length-2,c=d.length===0;if(a.length===0)for(let m=0;m<l;++m)a.push(0);let p=e[0],f=t[u?3:1]*o;for(let m=0,h=e.length-l-(u?1:0);m<l;++m,++h){let b=e[h],y=c?b*s[m]:d[m],g=Bd(b,s[m],i[m],t[h],r[m],y);Dd(g,n,i,m,m+l),c&&d.push(s[m]*(b-1)+a[m]+(t[h]-1)*r[m]+1-i[m]-i[m+l])}d.splice(0,0,p),d.splice(u?3:1,0,f)},es=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,a=e.dilations.slice();if(a.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;a=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}Rd(u,r,a,e.autoPad,e.group,o,d,n,s,i);let l=Object.assign({},e);return Object.assign(l,{kernelShape:r,pads:o,outputPadding:s,outputShape:i,dilations:a,strides:d}),l},ts=e=>{let t=Xt(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,s=e.kernelShape,u=e.pads,a=e.strides,d=e.wIsConst(),l=e.outputPadding,c=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:s,outputPadding:l,outputShape:c,pads:u,strides:a,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Md=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((l,c)=>l+c,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((l,c)=>l+c,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((l,c)=>l+c,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((l,c)=>l+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ud=[2,3,1,0],Vd=(e,t,r)=>{let n=es(r,t),o=r.format==="NHWC",i=n.outputShape,s=i[o?3:1],u=t[0].dims[o?3:1];if(n.group!==1||s===1&&u===1){e.compute(Fr(t,n));return}let a=i[o?1:2],d=i[o?2:3],l=t[1].dims[2],c=t[1].dims[3],p=o?a*d:s,f=o?s:a*d,m=l*c*u,h=!0,b=e.kernelCustomData.wT??e.compute(he(t[1],Ud),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let y=[t[0],b],g=t.length===3;g&&(!o&&t[2].dims.length===1?y.push(t[2].reshape([t[2].dims[0],1,1])):y.push(t[2])),e.compute(Yi(y,n,i,p,f,m,g,h),{inputs:y})},Nd=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let a=es({...t,pads:u,strides:s,dilations:i,kernelShape:o},n);e.compute(Fr(n,a,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},rs=(e,t)=>{Md(e.inputs,t),e.inputs[0].dims.length===3?Nd(e,t):Vd(e,e.inputs,t)}});var Wd,os,is,ss=A(()=>{"use strict";M();W();ae();G();Wd=(e,t,r,n)=>{let o=x.size(t),i=t.length,s=S("input",e,i),u=T("output",e,i),a=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=x.normalizeAxis(a,i),l=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=O("uniforms.input_shape","uniforms.axis",i),m=n.reverse?p+(n.exclusive?" + 1":""):"0",h=n.reverse?f:p+(n.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...E(t,t)]}),getShaderSource:l}},os=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Wd(n,r,o,t),{inputs:[0]})},is=e=>{let t=e.exclusive===1,r=e.reverse===1;return V({exclusive:t,reverse:r})}});var Ld,Gd,Hd,as,us,ds=A(()=>{"use strict";M();W();ae();G();Ld=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Gd=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},Hd=(e,t)=>{let r,n,o,i,s,u,a=t.format==="NHWC",d=t.blocksize,l=t.mode==="DCR";a?([r,n,o,i]=e.dims,s=l?[r,n,o,d,d,i/d**2]:[r,n,o,i/d**2,d,d],u=l?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=l?[r,d,d,i/d**2,n,o]:[r,i/d**2,d,d,n,o],u=l?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),p=c.dims.length,f=e.dataType,m=S("a",f,p),h=T("output",f,p),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,h)}

  ${Gd(u,p,m,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=a?[r,n*d,o*d,i/d**2]:[r,i/d**2,n*d,o*d],w=x.size(g),$=c.dims,v=x.sortBasedOnPerm($,u);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...E($,v)]}},getShaderSource:b}},as=(e,t)=>{Ld(e.inputs),e.compute(Hd(e.inputs[0],t))},us=e=>V({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Kr,tr,ls,qd,Fd,jr,Xr,cs,Kd,ps,ms,fs=A(()=>{"use strict";M();W();ae();G();Kr="[a-zA-Z]|\\.\\.\\.",tr="("+Kr+")+",ls="^"+tr+"$",qd="("+tr+",)*"+tr,Fd="^"+qd+"$",jr=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Xr=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(Fd)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,a)=>{let d=t[a].dims.slice();if(!u.match(RegExp(ls)))throw new Error("Invalid LHS term");let l=this.processTerm(u,!0,d,a);this.lhs.push(l)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,a])=>a.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(tr)))throw new Error("Invalid RHS");o.match(RegExp(Kr,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(u);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,s=!1,u=[],a=0;if(!t.match(RegExp(ls))&&!r&&t!=="")throw new Error("Invalid LHS term");let d=t.match(RegExp(Kr,"g")),l=new jr(o);return d?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let f=i-d.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(a,a+f),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<u.length;m++){let h=String.fromCharCode("0".charCodeAt(0)+m);l.addSymbol(h,p+m),this.addSymbol(h,n[a++],o)}}else l.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,n[a++],o)}),l}},cs=e=>e+"_max",Kd=(e,t,r,n)=>{let i=e.map(l=>l.length).map((l,c)=>S(`input${c}`,t,l)),s=x.size(n),u=T("output",t,n.length),a=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),d=l=>{let c=[],p="var prod = 1.0;",f="var sum = 0.0;",m="sum += prod;",h=[],b=[],y=[],g=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((v,_)=>{if(r.rhs.symbolToIndices.has(_)){let I=r.rhs.symbolToIndices.get(_)?.[0];I!==void 0&&r.lhs.forEach((C,z)=>{if(v.inputIndices.includes(z)){let P=C.symbolToIndices.get(_);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(R=>{c.push(`${i[z].indicesSet(`input${z}Indices`,R,u.indicesGet("outputIndices",I))}`)})}})}else r.lhs.forEach((I,C)=>{if(v.inputIndices.includes(C)){let z=I.symbolToIndices.get(_);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(P=>{h.push(`${i[C].indicesSet(`input${C}Indices`,P,`${_}`)}`)}),g.push(`prod *= ${i[C].getByIndices(`input${C}Indices`)};`)}}),b.push(`for(var ${_}: u32 = 0; ${_} < uniforms.${cs(_)}; ${_}++) {`),y.push("}")});let $=w?[...c,`let sum = ${i.map((v,_)=>v.getByIndices(`input${_}Indices`)).join(" * ")};`]:[...c,f,...b,...h,p,...g,m,...y];return`
            ${l.registerUniforms(a.map(v=>({name:`${cs(v)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,u)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${i.map((v,_)=>`var input${_}Indices: ${i[_].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=a.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));l.push({type:12,data:s});let c=e.map((p,f)=>[...E(p)]).reduce((p,f)=>p.concat(f),l);return c.push(...E(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:d}},ps=(e,t)=>{let r=new Xr(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,s)=>i.dims);e.compute(Kd(o,e.inputs[0].dataType,r,n))},ms=e=>{let t=e.equation.replace(/\s+/g,"");return V({equation:t})}});var jd,hs,Xd,Zd,gs,ys=A(()=>{"use strict";M();W();G();jd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},hs=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Xd=(e,t)=>e.length>t.length?hs(e,t):hs(t,e),Zd=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Xd(t,r),o=e[0].dataType,i=o===9?4:1,s=Math.ceil(x.size(n)/i),u=d=>{let l=S("input",o,t.length,i),c=T("output",o,n.length,i),p;if(o===9){let f=(m,h,b="")=>`
          let outputIndices${h} = ${c.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${l.broadcastedIndicesToOffset(`outputIndices${h}`,c)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${m}[${h}] = ${b}(${l.getByOffset(`index${h}`)}[component${h}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${f("data",0,"u32")}
        ${f("data",1,"u32")}
        ${f("data",2,"u32")}
        ${f("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${l.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",l.getByOffset("inputOffset"))}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(l,c)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},a=[{type:12,data:s},...E(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},gs=e=>{jd(e.inputs),e.compute(Zd(e.inputs),{inputs:[0]})}});var Yd,bs,ws=A(()=>{"use strict";M();W();G();jt();Yd=e=>{let t=e[0].dataType,r=x.size(e[0].dims),n=x.size(e[1].dims),o=n%4===0,i=s=>{let u=S("x",t,[1],4),a=S("bias",t,[1],4),d=T("y",t,[1],4),l=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${a.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,p=o?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(l).declareVariables(u,a,d)}

    ${Dr(ce(t))}

    ${s.mainStart(Ke)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Rr("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ke/4)}})}},bs=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?wi(e):e.compute(Yd(e.inputs))}});var Qd,Jd,$s,vs,_s=A(()=>{"use strict";M();W();ae();G();Qd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Jd=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=x.normalizeAxis(t.axis,o),s=r.slice(0);s.splice(i,1,...n);let u=r[i],a=e[0].dataType===9?4:1,d=Math.ceil(x.size(s)/a),l=[{type:12,data:d},{type:6,data:u},{type:12,data:i},...E(e[0].dims,e[1].dims,s)],c=p=>{let f=S("data",e[0].dataType,e[0].dims.length,a),m=S("inputIndices",e[1].dataType,e[1].dims.length),h=T("output",e[0].dataType,s.length,a),b=g=>{let w=n.length,$=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let v=0;v<w;v++)$+=`${w>1?`indicesIndices${g}[${v}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${v}]`:`outputIndices${g}`};`;$+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${f.type.indices};
        `;for(let v=0,_=0;v<o;v++)v===i?($+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = u32(idx${g});`,_+=w):($+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${_}]`:`outputIndices${g}`};`,_++);return $},y;if(e[0].dataType===9){let g=(w,$,v="")=>`
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
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:c}},$s=e=>V({axis:e.axis}),vs=(e,t)=>{let r=e.inputs;Qd(r),e.compute(Jd(e.inputs,t))}});var el,tl,xs,Ss,Is=A(()=>{"use strict";M();W();ae();G();el=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},tl=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,s=e[1].dataType,u=x.normalizeAxis(t.axis,o),a=r[u],d=i.slice(0),l=x.size(d),c=S("input",n,o),p=S("indicesInput",s,i.length),f=T("output",n,d.length),m=[{type:12,data:l},{type:6,data:a},{type:12,data:u}];return m.push(...E(r,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},xs=e=>V({axis:e.axis}),Ss=(e,t)=>{let r=e.inputs;el(r),e.compute(tl(e.inputs,t))}});var rl,nl,Cs,Ts,As=A(()=>{"use strict";M();W();G();rl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},nl=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,s]=Nt.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,i];if(!u)throw new Error("Can't use gemm on the given tensors");let a=x.size(u),d=[{type:12,data:a},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],l=["type","type"];e.length===3&&(d.push(...E(e[2].dims)),l.push("rank")),d.push(...E(u));let c=p=>{let f="";t.transA&&t.transB?f="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?f="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?f="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(f="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let m=t.alpha===1?"":"value *= uniforms.alpha;",h=S("a",e[0].dataType,e[0].dims),b=S("b",e[1].dataType,e[1].dims),y=h.type.value,g=null,w=[h,b];e.length===3&&(g=S("c",e[2].dataType,e[2].dims.length),w.push(g));let $=T("output",e[0].dataType,u.length);w.push($);let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
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
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:c}},Cs=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ts=(e,t)=>{rl(e.inputs),e.compute(nl(e.inputs,t))}});var ge,sl,Es,ks,al,ft,Ps,Zr=A(()=>{"use strict";M();W();ae();Vt();Ft();G();Xe();ge=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,sl=(e,t)=>{let r=e[0],n=ge(e,1),o=ge(e,2),i=ge(e,3),s=ge(e,4),u=ge(e,5),a=ge(e,6),d=ge(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=r.dims[0],c=r.dims[1],p=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],f=c,m=0,h=0,b=Math.floor(p/t.numHeads);if(a&&d){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims[0]!==l||a.dims[1]!==t.numHeads||a.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(a.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=a.dims[2],h=a.dims[2]}else if(a||d)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,f=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,f=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,f=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+f,w=0;if(s){w=8;let I=s.dims;throw I.length===1?I[0]===l?w=1:I[0]===3*l+2&&(w=3):I.length===2&&I[0]===l&&I[1]===g&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,v=p;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],$=!0}}let _=!1;if(s)throw new Error("Key padding mask is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:g,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:p,vHiddenSize:v,headSize:b,vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:_,passPastInKv:$,qkvFormat:y}},Es=e=>V({...e}),ks=V({perm:[0,2,1,3]}),al=(e,t,r,n,o,i,s)=>{let u=[n,o,i],a=x.size(u),d=[{type:12,data:a},{type:12,data:s},{type:12,data:i}],l=c=>{let p=T("qkv_with_bias",t.dataType,u),f=S("qkv",t.dataType,u),m=S("bias",r.dataType,u),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(h).declareVariables(f,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:l},{inputs:[t,r],outputs:[-1]})[0]},ft=(e,t,r,n,o,i,s,u)=>{let a=i;if(s){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return a=al(e,i,s,t,n,r*o,u),a=a.reshape([t,n,r,o]),e.compute(he(a,ks.perm),{inputs:[a],outputs:[-1]})[0]}else return i.dims.length===3&&(a=i.reshape([t,n,r,o])),e.compute(he(a,ks.perm),{inputs:[a],outputs:[-1]})[0]},Ps=(e,t)=>{let r=sl(e.inputs,t),n=e.inputs[0],o=ge(e.inputs,1),i=ge(e.inputs,2),s=ge(e.inputs,3),u=ge(e.inputs,4),a=ge(e.inputs,5),d=ge(e.inputs,6),l=ge(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=ft(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(c)return et(e,p,o,i,u,void 0,d,l,a,r,t);if(!o||!i)throw new Error("key and value must be provided");let f=ft(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),m=ft(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,s,2*r.hiddenSize);et(e,p,f,m,u,void 0,d,l,a,r,t)}});var zs,ul,dl,Yr,Os,Qr=A(()=>{"use strict";M();W();G();zs=e=>Array.from(e.getBigInt64Array(),Number),ul=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(zs(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},dl=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Yr=(e,t)=>{let r=e[0].dims,n=t??zs(e[1]),o=dl(r,n),i=x.size(o),s=e[0].dataType,u=S("input",s,r.length),a=T("output",s,o.length),d=l=>`
      const inputShape = ${u.indices(...r)};
      ${l.registerUniform("output_size","u32").declareVariables(u,a)}
      ${l.mainStart()}
      ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${a.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${a.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${a.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...E(e[0].dims,o)]}),getShaderSource:d}},Os=e=>{ul(e.inputs),e.compute(Yr(e.inputs),{inputs:[0]})}});var ll,Bs,Rs,cl,Ds,Ms,Us=A(()=>{"use strict";M();W();ae();Ft();G();Zr();Qr();Xe();ll=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],s=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,a=r.dims[0],d=r.dims[1],l=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=d,p=0,f=0,m=Math.floor(l/t.numHeads),h=i&&i.dims.length!==0,b=s&&s.dims.length!==0,y=!0;if(h&&b){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y?(p=i.dims[1],f=i.dims[1]):(p=i.dims[2],f=i.dims[2])}else if(h||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=2,c=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,c=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,c=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let w=0,$=!1,v=l;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],$=!0}}let _=p+c,I=!1;return{batchSize:a,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:_,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:l,vHiddenSize:v,headSize:m,vHeadSize:Math.floor(v/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:I,passPastInKv:$,qkvFormat:g,isPastkvBSNH:y}},Bs=(e,t,r,n)=>{let o=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,s=x.size(o)/i,u=n.totalSequenceLength,a=T("present_kv",r,o.length,i),d=S("new_kv",e.dataType,e.dims.length,i),l=t?S("past_kv",t.dataType,t.dims.length,i):void 0,c=Math.ceil(n.headSize/i),p={x:u,y:e.dims[0],z:1},f=t?["rank","rank"]:["rank"],m=[{type:12,data:s},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],h=[d];l?(m.push(...E(e.dims),...E(t.dims),...E(o)),h.push(l)):m.push(...E(e.dims),...E(o));let b=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],y=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
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
  ${v.mainStart([c,n.kvNumHeads,1])}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${a.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${n.kvNumHeads}u;
    let H = ${c}u;

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
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${c}${!!t}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:p,programUniforms:m}),getShaderSource:$}},Rs=e=>V({...e}),cl=V({perm:[0,2,1,3]}),Ds=(e,t,r,n,o)=>{let i=t,s=n.kvNumHeads,u=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(i=t.reshape([n.batchSize,n.kvSequenceLength,s,n.headSize])),r?i=e.compute(Bs(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?o:-1]})[0]:i=e.compute(Bs(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?o:-1]})[0],u!==1&&(i=e.compute(Yr([i],[1,1,1,u]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,s*u,n.headSize])),e.compute(he(i,cl.perm),{inputs:[i],outputs:[-1]})[0]},Ms=(e,t)=>{let r=ll(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=ft(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,s=Ds(e,e.inputs[1],o,r,1),u=Ds(e,e.inputs[2],i,r,2);et(e,n,s,u,void 0,void 0,void 0,void 0,void 0,r,t)}});var pl,ml,fl,Vs,Ns=A(()=>{"use strict";M();W();G();pl=(e,t)=>{let r=e[0].dims,n=r,o=2,i=x.sizeToDimension(r,o),s=x.sizeFromDimension(r,o),u=J(s),a=s/u,d=[r[0],r[1],a],l=["rank","type","type"],c=[{type:12,data:s},{type:12,data:a}];c.push(...E(d,d));let p=f=>{let m=S("x",e[0].dataType,d.length,u),h=S("scale",e[1].dataType,e[1].dims),b=S("bias",e[2].dataType,e[2].dims),y=T("output",e[0].dataType,d.length,u),g=[m,h,b,y],w=m.type.value,$=u===1?"f32":`vec${u}<f32>`,v=64,_=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${$}, ${v}>;
  const workgroupSize = ${v}u;
  ${f.registerUniforms(_).declareVariables(...g)}
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
      meanShared = ${Ae("workgroupShared[0]",u)} / f32(uniforms.normSize);
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
      squaredNormShared = ${Ae("workgroupShared[0]",u)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${h.getByOffset("channel")});
    let channelShift = f32(${b.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${m.get("batch","channel","h")} * ${w}(${$}(channelScale)) + ${w}(${$}(channelShift));
      ${y.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${u}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:i},programUniforms:c}),getShaderSource:p}},ml=(e,t,r,n,o,i,s,u)=>{let a=J(s),d=64,l=a===1?"vec2f":`mat2x${a}f`,c=a===1?"f32":`vec${a}f`,p=(_,I)=>`${l}(${_}, ${I})`,f=o*s/a,m=Math.ceil(i/d),h=["type"],b=[{type:12,data:m},{type:12,data:i},{type:12,data:Math.floor(s/a)},{type:12,data:Math.floor(i*s/a)}],y=_=>{let I=S("input",t.dataType,t.dims,a);return`
  ${_.declareVariables(I)}
  @group(0) @binding(1) var<storage, read_write> output : array<${l}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${_.mainStart(d)}
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
        let value = ${c}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${p("sum","squaredSum")};
  }`},g=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${a}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:[o,s,d,2],dataType:1}],dispatchGroup:{x:o*s/a},programUniforms:b}),getShaderSource:y},{inputs:[t],outputs:[-1]})[0],w=[{type:12,data:f},{type:12,data:i},{type:12,data:Math.floor(s/a)},{type:12,data:Math.floor(d*s/a)}],$=["type","type","type"],v=_=>{let I=S("scale",r.dataType,r.dims,a),C=S("bias",n.dataType,n.dims,a);return`
  @group(0) @binding(0) var<storage, read> input : array<${l}>;
  @group(0) @binding(1) var<storage, read> scale : array<${I.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${C.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${l}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
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
    let channelScale = invStdDev * ${c}(scale[currentChannelNumber]);
    let channelShift = ${c}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${p("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${a};${u}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:[o,s,2],dataType:1}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v},{inputs:[g,r,n],outputs:[-1]})[0]},fl=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],s=n[n.length-1],u=x.sizeFromDimension(n,1)/s,a=J(s),d=x.size(o)/a,l=[{type:12,data:u},{type:12,data:Math.floor(s/a)}],c=["type","type"],p=ml(e,t[0],t[1],t[2],i,u,s,r.epsilon),f=m=>{let h=Q(t[0].dataType),b=a===1?"vec2f":`mat2x${a}f`,y=a===1?h:`vec${a}<${h}>`,g=S("input",t[0].dataType,t[0].dims,a),w=T("output",t[0].dataType,o,a);return`
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
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${a}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:f},{inputs:[t[0],p]})},Vs=(e,t)=>{t.format==="NHWC"?fl(e,e.inputs,t):e.compute(pl(e.inputs,t))}});var hl,gl,Ws,Ls=A(()=>{"use strict";M();W();G();hl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},gl=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],s=!n&&e[2],u=o,a=x.normalizeAxis(t.axis,o.length),d=x.sizeToDimension(o,a),l=x.sizeFromDimension(o,a),c=x.size(i.dims),p=s?x.size(s.dims):0;if(c!==l||s&&p!==l)throw new Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let f=[];for(let v=0;v<o.length;++v)v<a?f.push(o[v]):f.push(1);let m=J(l),h=["type","type"],b=[{type:12,data:d},{type:1,data:l},{type:12,data:Math.floor(l/m)},{type:1,data:t.epsilon}];s&&h.push("type");let y=r>1,g=r>2,w=v=>{let _=Q(e[0].dataType),I=[S("x",e[0].dataType,e[0].dims,m),S("scale",i.dataType,i.dims,m)];s&&I.push(S("bias",s.dataType,s.dims,m)),I.push(T("output",e[0].dataType,u,m)),y&&I.push(T("mean_data_output",1,f)),g&&I.push(T("inv_std_output",1,f));let C=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${v.registerUniforms(C).declareVariables(...I)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ue("f32",m)};
    var mean_square_vector = ${Ue("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${je(_,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ae("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ae("mean_square_vector",m)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${je(_,m,"x[j + offset]")};
      let f32scale = ${je(_,m,"scale[j]")};
      output[j + offset] = ${I[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${je(_,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:u,dataType:e[0].dataType}];return y&&$.push({dims:f,dataType:1}),g&&$.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${n}`,inputDependencies:h},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:w}},Ws=(e,t)=>{hl(e.inputs),e.compute(gl(e.inputs,t,e.outputCount))}});var yl,bl,Gs,Hs,qs=A(()=>{"use strict";M();W();ae();G();yl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!x.areEqual(s.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let a=e[2].dims;if(x.size(a)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,c=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(x.size(l)!==c)throw new Error("zeroPoints input size error.")}},bl=(e,t,r,n)=>{let o=e[0].dims,i=o.length,s=Math.floor((t.k+t.blockSize-1)/t.blockSize),u=o[i-2],a=t.k,d=t.n,l=o.slice(0,i-2),c=x.size(l),f=t.blockSize/8*t.bits/4,m=e[0].dataType,h=J(u),b=J(t.k),y=J(f),g=qe(m,u*s),w=Math.floor(n/g),$=s<=r[0]&&w>0,v=!$||w>=4?J(d):w>=2&&J(d)>=2?2:1,_=l.concat([u,d]),I=x.size(_)/v/h,C=$?[]:[{type:12,data:I},{type:12,data:t.blockSize}],z=[c,u,a/b],P=x.convertShape(e[1].dims).slice();P.splice(-1,1,f/y),C.push(...E(z)),C.push(...E(P)),C.push(...E(e[2].dims)),e.length===4&&C.push(...E(x.convertShape(e[3].dims)));let R=[c,u,d/v];C.push(...E(R));let q=F=>{let K=z.length,re=S("a",e[0].dataType,K,b),B=S("b",12,P.length,y),ne=S("scales",e[2].dataType,e[2].dims.length),Z=[re,B,ne],N=e.length===4?S("zero_points",12,e[3].dims.length):void 0;N&&Z.push(N);let H=R.length,D=T("output",e[0].dataType,H,v),te=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],ue=Q(e[0].dataType),k=(()=>{switch(b){case 1:return`array<${ue}, 8>`;case 2:return`mat4x2<${ue}>`;case 4:return`mat2x4<${ue}>`;default:throw new Error(`${b}-component is not supported.`)}})(),U=`
        for (var word: u32 = 0; word < ${f}; word += ${y}) {
          ${B.indicesSet("b_indices","2","word")};
          let b_data = ${B.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${y}; i++) {
            let b_value: u32 = ${y===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${k}(${Array.from({length:4},(Te,ie)=>`${ue}(b_value_lower[${ie}]), ${ue}(b_value_upper[${ie}])`).join(", ")});
            let b_dequantized_values = ${(()=>b===1?`${k}(${Array.from({length:8},(Te,ie)=>`(b_quantized_values[${ie}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${k}(${Array(8).fill("zero_point").join(",")})) * scale;`)()};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${$?u:h}u; m++) {
              ${re.indicesSet("a_indices",K-2,$?"m":`row * ${h} + m`)};
              ${re.indicesSet("a_indices",K-1,"word_offset")};
              var input_offset = ${re.indicesToOffset("a_indices")};
              var a_data: ${k};
              for (var j: u32 = 0; j < ${8/b}; j++) {
                a_data[j] = ${re.getByOffset("input_offset")};
                input_offset++;
              }
              ${$?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${v>1?"[c]":""} += ${Array.from({length:8/b},(Te,ie)=>`${b===1?`a_data[${ie}] * b_dequantized_values[${ie}]`:`dot(a_data[${ie}], b_dequantized_values[${ie}])`}`).join(" + ")};
            }
            word_offset += ${8/b};
          }
        }`,j=N?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${N.getByOffset("zero_point_index")};
          }`:"";return $?`
        var<workgroup> workgroup_shared: array<${D.type.value}, ${u*s}>;
        ${F.declareVariables(...Z,D)}
        ${F.mainStart([s,1,1])}
          var a_indices: ${re.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${re.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${v}; c++) {
            let col_times_components_plus_c = col * ${v} + c;
              ${N?`
            var zero_point_bytes_per_col: u32 = (${s} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${N.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${B.type.indices};
            ${B.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${s} + block;
            let scale = ${ne.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ue}(${N?"(zero_point_word) & 0xFu":8});
            ${B.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${t.blockSize/b};
            var workgroup_shared_offset: u32 = block * ${u};
            ${U}
          }
          workgroupBarrier();
          var output_indices: ${D.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(u/s)};
          ${D.indicesSet("output_indices","0","batch")};
          ${D.indicesSet("output_indices",H-1,"col")};
          ${D.indicesSet("output_indices",H-2,"local_id.x * elements_per_thread")};
          var output_offset = ${D.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${u}) {
              var output_value: ${D.type.value} = ${D.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${s}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${u};
              }
              ${D.setByOffset("output_offset","output_value")};
              output_offset += ${d/v};
            }
          }
        }`:`
        ${F.registerUniforms(te).declareVariables(...Z,D)}
        ${F.mainStart()}
          ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${D.type.value}, ${h}>;
          var output_indices = ${D.offsetToIndices("global_idx")};
          var col = ${D.indicesGet("output_indices",H-1)};
          var row = ${D.indicesGet("output_indices",H-2)};
          var a_indices: ${re.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${N?`
          var zero_point_abs_offset = col * ${v} * ((${s} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${N.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${s*v};
          var b_indices: ${B.type.indices};
          for (var c: u32 = 0; c < ${v}; c++) {
            ${B.indicesSet("b_indices","0",`col * ${v} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${s}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${ne.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${ue}(${N?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${B.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${U}
              scale_index++;
              ${j}
              block_offset += uniforms.block_size / ${b};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${N?`if (zero_point_offset % 8 > 0) {
                ${j}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${h}u; k++) {
              ${D.indicesSet("output_indices",H-2,`${h} * row + k`)};
              ${D.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:$?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${t.cacheKey};${u};${m};${e.length}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],name:$?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:$?{x:1,y:Math.ceil(d/v),z:c}:{x:Math.ceil(I/64)},programUniforms:C}),getShaderSource:q}},Gs=(e,t)=>{yl(e.inputs,t);let r=e.getMaxComputeWorkgroupSizes(),n=e.getMaxComputeWorkgroupStoragesize();e.compute(bl(e.inputs,t,r,n))},Hs=e=>V(e)});var wl,$l,vl,_l,xl,Sl,Il,Cl,Fs,Ks=A(()=>{"use strict";M();W();G();wl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},$l=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${O("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${O("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},vl=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${O("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${O("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},_l=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k = i32(${O("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},xl=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${O("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k -= i32(${O("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Sl=(e,t,r)=>{switch(r.mode){case 0:return $l(e,t,r.pads.length);case 1:return vl(e,t,r.pads.length);case 2:return _l(e,t,r.pads.length);case 3:return xl(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Il=(e,t)=>{let r=x.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=x.size(r),i=[{type:12,data:o},{type:6,data:t.pads}];t.mode===0&&i.push({type:e[0].dataType,data:t.value}),i.push(...E(e[0].dims,r));let s=["rank"],u=a=>{let d=T("output",e[0].dataType,r.length),l=S("x",e[0].dataType,n.length),c=l.type.value,p=Sl(d,n.length,t),f=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&f.push({name:"constant_value",type:c}),`
            ${a.registerUniforms(f).declareVariables(l,d)}
            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${p}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(r)/64)},programUniforms:i}),getShaderSource:u}},Cl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let a=0;a<u.length;a++)i[Number(u[a])]=Number(r[a]),i[Number(u[a])+o]=Number(r[a+u.length])}else r.forEach((u,a)=>i[Number(a)]=Number(u));let s=[];return i.forEach(u=>s.push(u)),{mode:t.mode,value:n,pads:s}}else return t},Fs=(e,t)=>{wl(e.inputs);let r=Cl(e.inputs,t);e.compute(Il(e.inputs,r),{inputs:[0]})}});var rr,js,Xs,Zs,Ys,Tl,Al,Qs,Js,ea,ta,ra,na,oa,ia,sa,aa,ua,da,la=A(()=>{"use strict";Se();M();W();G();rr=e=>{if(Y.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},js=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),a=i?t.dilations.slice():[],d=t.pads.slice();Fe.adjustPoolAttributes(r,o,s,u,a,d);let l=Fe.computePoolOutputShape(r,o,u,a,s,d,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:s,strides:u,pads:d,dilations:a,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let p=l.slice();return p.push(p.splice(1,1)[0]),[c,n?p:l]},Xs=(e,t)=>{let r=t.format==="NHWC",n=x.size(e),o=x.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],a=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=!!(d+l);i.push({type:12,data:u},{type:12,data:a},{type:12,data:d},{type:12,data:l}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],h=t.pads[t.pads.length/2-2],b=t.pads[t.pads.length-2];p=!!(h+b),i.push({type:12,data:f},{type:12,data:m},{type:12,data:h},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=x.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let a=t.pads.reduce((d,l)=>d+l);return[i,s,!!a,!1,!1]}},Zs=(e,t,r,n,o,i,s,u,a,d,l,c)=>{let p=o.format==="NHWC",f=t.type.value,m=T("output",t.type.tensor,n);if(o.kernelShape.length<=2){let h="",b="",y="",g=r-(p?2:1);if(l?h=`
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
                }`,o.kernelShape.length===2){let $=r-(p?3:2);c?b=`
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
                  offsets[j] = offset / ${O("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${O("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${r-h}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${O("uniforms.strides",`j - ${r-h}u`,h)}
                    + offsets[j - ${r-h}u] - ${O("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},Ys=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Tl=e=>`${Ys(e)};${e.countIncludePad}`,Al=e=>`${Ys(e)};${e.storageOrder};${e.dilations}`,Qs=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Js=(e,t,r,n)=>{let[o,i]=js(t,n,r),s=S("x",t.dataType,t.dims.length),u=s.type.value,a="value += x_val;",d="";o.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[l,c,p,f,m]=Xs(i,o);l.push(...E(t.dims,i));let h=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${p};${f};${m}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:b=>Zs(b,s,t.dims.length,i.length,o,a,d,0,c,p,f,m)}},ea=e=>{let t=e.count_include_pad!==0,r=Qs(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Tl(n)}},ta=(e,t)=>{rr(e.inputs),e.compute(Js("AveragePool",e.inputs[0],!1,t))},ra={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},na=e=>{let t=e.format;return{format:t,...ra,cacheKey:t}},oa=(e,t)=>{rr(e.inputs),e.compute(Js("GlobalAveragePool",e.inputs[0],!0,t))},ia=(e,t,r,n)=>{let[o,i]=js(t,n,r),s=`
      value = max(x_val, value);
    `,u="",a=S("x",t.dataType,t.dims.length),d=["rank"],[l,c,p,f,m]=Xs(i,o);return l.push(...E(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${f};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:h=>Zs(h,a,t.dims.length,i.length,o,s,u,t.dataType===10?-65504:-1e5,c,p,f,m)}},sa=(e,t)=>{rr(e.inputs),e.compute(ia("MaxPool",e.inputs[0],!1,t))},aa=e=>{let t=e.storage_order,r=e.dilations,n=Qs(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Al(o)}},ua=e=>{let t=e.format;return{format:t,...ra,cacheKey:t}},da=(e,t)=>{rr(e.inputs),e.compute(ia("GlobalMaxPool",e.inputs[0],!0,t))}});var El,Pl,ca,pa,ma=A(()=>{"use strict";M();W();ae();G();El=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Pl=(e,t)=>{let r=x.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,s=e[1].dataType,u=x.size(i),a=n===3||n===2,d=a?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,l=e[1].dims,c=e.length>2?e[2]:void 0,p=c?a?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,f=l.length===0||l.length===1&&l[0]===1,m=f===!1&&l.length===1,h=J(u),b=f&&(!a||h===4),y=b?h:1,g=b&&!a?h:1,w=S("input",a?12:n,d.length,g),$=S("scale",s,l.length),v=c?S("zero_point",a?12:n,p.length):void 0,_=T("output",s,i.length,y),I=[w,$];v&&I.push(v);let C=[d,l];c&&C.push(p);let z=[{type:12,data:u/y},{type:12,data:r},{type:12,data:t.blockSize},...E(...C,i)],P=R=>{let q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${R.registerUniforms(q).declareVariables(...I,_)}
      ${R.mainStart()}
          ${R.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${_.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>a?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>f?`let scale_value= ${$.getByOffset("0")}`:m?`
            let scale_index = ${_.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>v?f?a?`
                let zero_point_input = ${v.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${v.getByOffset("0")}`:m?a?`
                let zero_point_index = ${_.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${v.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${_.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${v.getByOffset("zero_point_index")};`:a?`
                let zero_point_offset = ${$.indicesToOffset("scale_indices")};
                let zero_point_input = ${v.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${v.getByIndices("scale_indices")};`:`let zero_point_value = ${a?o?"i32":"u32":w.type.value}(0);`)()};
      // Compute and write output
      ${_.setByOffset("global_idx",`${_.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(u/y/64),y:1,z:1},programUniforms:z})}},ca=(e,t)=>{El(e.inputs,t),e.compute(Pl(e.inputs,t))},pa=e=>V({axis:e.axis,blockSize:e.blockSize})});var zl,Ol,fa,ha=A(()=>{"use strict";Se();M();G();zl=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},Ol=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],s=o,u=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...E(i)],a=d=>{let l=T("output",n,i.length),c=l.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(p).declareVariables(l)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:a,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},fa=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),Y.webgpu.validateInputContent&&zl(t,r,n),e.compute(Ol(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Bl,Dl,Rl,Ml,Ul,Vl,Nl,Wl,Ll,Gl,Hl,ga,ql,Fl,Kl,jl,Xl,ya,ba,wa=A(()=>{"use strict";M();W();ae();G();Bl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Dl=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Rl=(e,t,r,n,o,i)=>{let[s,u,a]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(l=>i.push(l));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length>0){if(e[u].getFloat32Array().forEach(l=>n.push(l)),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Bl(n,t),t.axes.length>0&&Dl(n,t.axes,d).forEach((l,c)=>n[c]=l)}if(a>0&&e.length>a&&(e[a].getBigInt64Array().forEach(l=>o.push(Number(l))),o.length!==d||r>=18&&o.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Ml=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Ul=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Vl=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,s)=>{n[i]=o[s],n[s+r]=o[t.length+s]}),n):o},Nl=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,s)=>o[i]=r[s])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,s)=>Math.round(i*t[s]))}return o},Wl=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,s)=>o[s]=Math.round(i*t[s]))),o},Ll=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${O("uniforms.scales","i",n)};
        var roi_low = ${O("uniforms.roi","i",o)};
        var roi_hi = ${O("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${O("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Gl=(e,t,r,n,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${O("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${O("uniforms.roi","i",i)};
          var roi_hi = ${O("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${O("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",n.length)};
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
    }`,Hl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${O("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ga=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",ql=(e,t,r,n,o)=>{let[s,u,a,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",a,`max(0, min(col, ${r[a]} - 1))`)};
      ${ga(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${u}];
      var col:${l} = originalIndices[${a}];
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
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Fl=(e,t,r,n,o,i,s,u,a,d)=>{let l=r.length===2,c=!0,[p,f]=l?[0,1]:c?[2,3]:[1,2],m=e.type.value,h=b=>{let y=b===p?"row":"col";return`
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
    `},Kl=(e,t,r,n,o)=>{let[s,u,a,d,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",a,`max(0, min(height, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${ga(e,l,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${u}];
      var height:${c} = originalIndices[${a}];
      var width:${c} = originalIndices[${d}];
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
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
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
    }`},jl=(e,t,r,n,o,i)=>{let s=e.dims,u=Vl(i,t.axes,s.length),a=Nl(s,n,o,t.axes),d=n.slice();n.length===0&&(d=s.map((g,w)=>g===0?1:a[w]/g),t.keepAspectRatioPolicy!=="stretch"&&(a=Wl(s,d,t)));let l=T("output",e.dataType,a.length),c=S("input",e.dataType,s.length),p=x.size(a),f=s.length===a.length&&s.every((g,w)=>g===a[w]),m=t.coordinateTransformMode==="tf_crop_and_resize",h=t.extrapolationValue,b=c.type.value,y=g=>`
      ${f?"":`
      ${Ml(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Hl(c,s)};
              ${Ul(t.nearestMode,r,b)};
              ${Gl(c,l,s,a,d.length,u.length,m)};
              `;case"linear":return`
              ${Ll(l,s,a,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${ql(c,l,s,m,h)}`;if(s.length===3||s.length===5)return`${Kl(c,l,s,m,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Fl(c,l,s,a,d,u,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(c,l)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${l.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?d:""}|${o.length>0?o:""}|${u.length>0?u:""}|${f}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:d},{type:1,data:u},...E(s,a)]})}},Xl=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ya=(e,t)=>{let r=[],n=[],o=[],i=Xl(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Rl(e.inputs,t,i,r,n,o),e.compute(jl(e.inputs[0],t,i,r,n,o),{inputs:[0]})},ba=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,a=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return V({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:u,mode:a,nearestMode:d})}});var Zl,Yl,$a,va=A(()=>{"use strict";M();W();ae();G();Zl=(e,t)=>{let[r,n,o,i]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!x.areEqual(n.dims,[])&&!x.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!x.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let a=r.dims[0],d=r.dims[r.dims.length-2],l=o.dims[0],c=x.sizeFromDimension(r.dims,1)/d,p=u===0?o.dims[1]*2:c/s;if(u>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(a!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(d!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(p/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>l)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Yl=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,s=e[0].dims[0],u=x.sizeFromDimension(e[0].dims,1),a=e[0].dims[e[0].dims.length-2],d=u/a,l=e[2].dims[1],c=o===0?l*2:d/n,p=new Array(s,a,d/c,c-l),f=x.computeStrides(p),m=[{type:1,data:i},{type:12,data:p},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[u,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,c,a*c,1]}):[],...E(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],h=b=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),w=S("cos_cache",e[2].dataType,e[2].dims.length),$=S("sin_cache",e[3].dataType,e[3].dims.length),v=T("output",e[0].dataType,e[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${b.declareVariables(y,g,w,$,v)}

        ${b.mainStart(Ke)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",T("",g.type.tensor,2))};
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
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:V({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/Ke)},programUniforms:m})}},$a=(e,t)=>{Zl(e.inputs,t),e.compute(Yl(e.inputs,t))}});var Ql,Jl,_a,xa=A(()=>{"use strict";M();W();G();Ql=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Jl=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,s=x.size(i),u=i,a=s,d=i.slice(-1)[0],l=n?i.slice(0,-1).concat(1):[],c=!o&&e.length>3,p=e.length>4,f=n&&r>1,m=n&&r>2,h=r>3,b=64,y=J(d),g=[{type:12,data:a},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],w=v=>{let _=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],I=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];c&&I.push(S("beta",e[3].dataType,e[3].dims,y)),p&&I.push(S("bias",e[4].dataType,e[4].dims,y)),I.push(T("output",e[0].dataType,u,y)),f&&I.push(T("mean_output",1,l)),m&&I.push(T("inv_std_output",1,l)),h&&I.push(T("input_skip_bias_sum",e[0].dataType,u,y));let C=Q(e[0].dataType),z=Q(1,y);return`

      ${v.registerUniforms(_).declareVariables(...I)}
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
          let bias_value = ${p?"bias[offset1d + i]":C+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${je(C,y,"value")};
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
        let mean = ${Ae("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ae("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${C}(mean)`}) *
            ${C}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:u,dataType:e[0].dataType}];return r>1&&$.push({dims:l,dataType:1}),r>2&&$.push({dims:l,dataType:1}),r>3&&$.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${h}`,inputDependencies:e.map((v,_)=>"type")},getShaderSource:w,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(a/d)},programUniforms:g})}},_a=(e,t)=>{Ql(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Jl(e.inputs,t,e.outputCount,!1),{outputs:n})}});var ec,nr,tc,Sa,rc,nc,Ia,Ca,Ta=A(()=>{"use strict";M();W();ae();G();ec=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},nr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},tc=(e,t)=>{if(e.length>1){let r=nr(e,1),n=nr(e,2),o=nr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),V({starts:r,ends:n,axes:o})}else return t},Sa=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},rc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${O("uniforms.input_shape","i",r.length)};
            let steps_i = ${O("uniforms.steps","i",r.length)};
            let signs_i = ${O("uniforms.signs","i",r.length)};
            let starts_i = ${O("uniforms.starts","i",r.length)};
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
      }`,nc=(e,t)=>{let r=e[0].dims,n=x.size(r),o=t.axes.length>0?x.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=nr(e,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=t.starts.map((y,g)=>Sa(y,g,r,o,i)),u=t.ends.map((y,g)=>Sa(y,g,r,o,i));if(o.length!==s.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let y=0;y<r.length;++y)o.includes(y)||(s.splice(y,0,0),u.splice(y,0,r[y]),i.splice(y,0,1));let a=i.map(y=>Math.sign(y));i.forEach((y,g,w)=>{if(y<0){let $=(u[g]-s[g])/y,v=s[g],_=v+$*i[g];s[g]=_,u[g]=v,w[g]=-y}});let d=r.slice(0);o.forEach((y,g)=>{d[y]=Math.ceil((u[y]-s[y])/i[y])});let l={dims:d,dataType:e[0].dataType},c=T("output",e[0].dataType,d.length),p=S("input",e[0].dataType,e[0].dims.length),f=x.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:a.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:f},{type:12,data:s},{type:6,data:a},{type:12,data:i},...E(e[0].dims,d)],b=y=>`
      ${y.registerUniforms(m).declareVariables(p,c)}
        ${rc(p,c,r)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${a.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[l],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Ia=(e,t)=>{ec(e.inputs,t);let r=tc(e.inputs,t);e.compute(nc(e.inputs,r),{inputs:[0]})},Ca=e=>{let t=e.starts,r=e.ends,n=e.axes;return V({starts:t,ends:r,axes:n})}});var oc,ic,Aa,ka,Ea=A(()=>{"use strict";M();W();ae();G();oc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},ic=(e,t)=>{let r=e.dims,n=x.size(r),o=64,i=t.axis;if(i<0&&(i=r.length+i),i<r.length-1)throw new Error("softmax only supports last axis for now.");let s=r[i],u=n/s,a=J(s),d=s/a,l=(b,y)=>y===4?`max(max(${b}.x, ${b}.y), max(${b}.z, ${b}.w))`:y===2?`max(${b}.x, ${b}.y)`:y===3?`max(max(${b}.x, ${b}.y), ${b}.z)`:b,c=S("x",e.dataType,e.dims,a),p=T("result",e.dataType,e.dims,a),f=c.type.value,m=Q(e.dataType)==="f32"?`var threadMax = ${f}(-3.402823e+38f);`:`var threadMax = ${f}(-65504.0h);`,h=b=>`
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
      ${b.registerUniform("packedCols","i32").declareVariables(c,p)}
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
          rowMaxShared = ${f}(${l("threadShared[0]",a)});
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
          rowSumShared = ${f}(${Ae("threadShared[0]",a)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${a}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:u},programUniforms:[{type:6,data:d}]}),getShaderSource:h}},Aa=(e,t)=>{oc(e.inputs),e.compute(ic(e.inputs[0],t))},ka=e=>V({axis:e.axis})});var sc,ac,uc,dc,lc,Pa,za,Oa=A(()=>{"use strict";M();W();ae();G();sc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},ac=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),V({numOutputs:n,axis:t.axis,splitSizes:r})},uc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${O("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,dc=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},lc=(e,t)=>{let r=e[0].dims,n=x.size(r),o=e[0].dataType,i=x.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=S("input",o,r.length),a=new Array(t.numOutputs),d=[],l=[],c=0,p=[{type:12,data:n}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],a[m]=c;let h=r.slice();h[i]=t.splitSizes[m],l.push(h),s[m]=T(`output${m}`,o,h.length),d.push({dims:l[m],dataType:e[0].dataType})}p.push({type:12,data:a},...E(r,...l));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",a.length).declareVariables(u,...s)}
  ${uc(a.length)}
  ${dc(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${O("uniforms.size_in_split_axis","output_number - 1u",a.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p})}},Pa=(e,t)=>{sc(e.inputs);let r=e.inputs.length===1?t:ac(e.inputs,t);e.compute(lc(e.inputs,r),{inputs:[0]})},za=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return V({axis:t,numOutputs:n,splitSizes:r})}});var cc,pc,Ba,Da=A(()=>{"use strict";M();W();G();cc=(e,t,r,n,o)=>{let i=T("output_data",o,r.length,4),s=S("a_data",t[1].dataType,t[1].dims.length,4),u=S("b_data",t[2].dataType,t[2].dims.length,4),a=S("c_data",t[0].dataType,t[0].dims.length,4),d,l=(c,p,f)=>`select(${p}, ${c}, ${f})`;if(!n)d=i.setByOffset("global_idx",l(s.getByOffset("global_idx"),u.getByOffset("global_idx"),a.getByOffset("global_idx")));else{let c=(p,f,m="")=>{let h=`a_data[index_a${f}][component_a${f}]`,b=`b_data[index_b${f}][component_b${f}]`,y=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
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
            ${p}[${f}] = ${m}(${l(h,b,y)});
          `};o===9?d=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(a,s,u,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},pc=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(x.areEqual(t,r)&&x.areEqual(r,n)),s=t,u=x.size(t);if(i){let d=ke.calcShape(ke.calcShape(t,r,!1),n,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=x.size(s)}let a=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>cc(d,e,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:a},...E(n,t,r,s)]})}},Ba=e=>{e.compute(pc(e.inputs))}});var Ra,Ma=A(()=>{"use strict";Do();Ft();Uo();No();Ii();Ri();Vi();Vr();ns();ss();ds();fs();ys();ws();_s();Is();As();Us();Ns();Ls();Wr();qs();Zr();Ks();la();ma();ha();Ht();wa();va();xa();Ta();Ea();Oa();Qr();Xe();jt();Da();Ra=new Map([["Abs",[Wo]],["Acos",[Lo]],["Acosh",[Go]],["Add",[Ci]],["ArgMax",[Bo,Br]],["ArgMin",[Oo,Br]],["Asin",[Ho]],["Asinh",[qo]],["Atan",[Fo]],["Atanh",[Ko]],["Attention",[Ro]],["AveragePool",[ta,ea]],["BatchNormalization",[Mo]],["BiasAdd",[Vo]],["BiasSplitGelu",[Si]],["Cast",[Xo,jo]],["Ceil",[Yo]],["Clip",[Zo]],["Concat",[Mi,Ui]],["Conv",[qr,Hr]],["ConvTranspose",[rs,ts]],["Cos",[Qo]],["Cosh",[Jo]],["CumSum",[os,is]],["DepthToSpace",[as,us]],["DequantizeLinear",[ca,pa]],["Div",[Ti]],["Einsum",[ps,ms]],["Elu",[ei,dt]],["Equal",[Ai]],["Erf",[ti]],["Exp",[ri]],["Expand",[gs]],["FastGelu",[bs]],["Floor",[ni]],["FusedConv",[qr,Hr]],["Gather",[vs,$s]],["GatherElements",[Ss,xs]],["Gelu",[oi]],["Gemm",[Ts,Cs]],["GlobalAveragePool",[oa,na]],["GlobalMaxPool",[da,ua]],["Greater",[zi]],["GreaterOrEqual",[Bi]],["GroupQueryAttention",[Ms,Rs]],["HardSigmoid",[pi,ci]],["InstanceNormalization",[Vs]],["LayerNormalization",[Ws]],["LeakyRelu",[ii,dt]],["Less",[Oi]],["LessOrEqual",[Di]],["Log",[vi]],["MatMul",[Zi]],["MatMulNBits",[Gs,Hs]],["MaxPool",[sa,aa]],["Mul",[ki]],["MultiHeadAttention",[Ps,Es]],["Neg",[ai]],["Not",[si]],["Pad",[Fs]],["Pow",[Ei]],["QuickGelu",[_i,dt]],["Range",[fa]],["Reciprocal",[ui]],["ReduceMin",[To]],["ReduceMean",[_o]],["ReduceMax",[Co]],["ReduceSum",[ko]],["ReduceProd",[Ao]],["ReduceL1",[xo]],["ReduceL2",[So]],["ReduceLogSum",[Po]],["ReduceLogSumExp",[Io]],["ReduceSumSquare",[Eo]],["Relu",[di]],["Resize",[ya,ba]],["RotaryEmbedding",[$a]],["Sigmoid",[li]],["Sin",[mi]],["Sinh",[fi]],["Slice",[Ia,Ca]],["SkipLayerNormalization",[_a]],["Split",[Pa,za]],["Sqrt",[hi]],["Softmax",[Aa,ka]],["Sub",[Pi]],["Tan",[gi]],["Tanh",[bi]],["ThresholdedRelu",[$i,dt]],["Tile",[Os]],["Transpose",[uo,lo]],["Where",[Ba]]])});var or,Ua=A(()=>{"use strict";Se();De();G();or=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){$e(t.programInfo.name);let s=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let a=[];for(let l of r)a.push({binding:a.length,resource:{buffer:l.buffer}});for(let l of n)a.push({binding:a.length,resource:{buffer:l.buffer}});i&&a.push({binding:a.length,resource:i});let d=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:a,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:d,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}u.setPipeline(t.computePipeline),u.setBindGroup(0,d),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),fe(t.programInfo.name)}dispose(){}build(t,r){$e(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let i=so(r,this.backend.device.limits),s=t.getShaderSource(i),u=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,a=n.createShaderModule({code:u,label:t.name});ee("verbose",()=>`[WebGPU] ${t.name} shader code: ${u}`);let d=n.createComputePipeline({compute:{module:a,entryPoint:"main"},layout:"auto",label:t.name});return fe(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let s=r*n*o,u=Math.ceil(Math.sqrt(s));if(u>i){if(u=Math.ceil(Math.cbrt(s)),u>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var mc,fc,Jr,ir,Va=A(()=>{"use strict";Se();M();De();eo();io();Ma();Ua();mc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},fc=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${mc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Jr=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},ir=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new Jr(r.info||await r.requestAdapterInfo()),this.gpuDataManager=oo(this),this.programManager=new or(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Qn(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;$e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],s=i.kernelId,u=this.kernels.get(s),a=u.kernelType,d=u.kernelName,l=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,f=r[o*2],m=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let h=Number(f-this.queryTimeBase),b=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(y=>({dims:y.dims,dataType:Me(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Me(y.dataType)})),kernelId:s,kernelType:a,kernelName:d,programName:l,startTime:h,endTime:b});else{let y="";c.forEach((w,$)=>{y+=`input[${$}]: [${w.dims}] | ${Me(w.dataType)}, `});let g="";p.forEach((w,$)=>{g+=`output[${$}]: [${w.dims}] | ${Me(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${a}|${d}|${l}" ${y}${g}execution time: ${b-h} ns`)}xt("GPU",`${l}::${f}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),fe()}run(t,r,n,o,i,s){$e(t.name);let u=[];for(let w=0;w<r.length;++w){let $=r[w].data;if($===0)continue;let v=this.gpuDataManager.get($);if(!v)throw new Error(`no GPU data for input: ${$}`);u.push(v)}let{outputs:a,dispatchGroup:d,programUniforms:l}=t.getRunData(r),c=n.length===0?a.map((w,$)=>$):n;if(c.length!==a.length)throw new Error(`Output size ${c.length} must be equal to ${a.length}.`);let p=[],f=[];for(let w=0;w<a.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=s)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let $=c[w]===-1,v=c[w]===-2,_=$||v?i(a[w].dataType,a[w].dims):o(c[w],a[w].dataType,a[w].dims);if(p.push(_),_.data===0)continue;let I=this.gpuDataManager.get(_.data);if(!I)throw new Error(`no GPU data for output: ${_.data}`);if($&&this.temporaryData.push(I),v){let C=this.kernelPersistentData.get(this.currentKernelId);C||(C=[],this.kernelPersistentData.set(this.currentKernelId,C)),C.push(I)}f.push(I)}if(u.length!==r.length||f.length!==p.length){if(f.length===0)return fe(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(l){let w=0,$=[];l.forEach(C=>{let z=typeof C.data=="number"?[C.data]:C.data;if(z.length===0)return;let P=C.type===10?2:4,R,q;C.type===10?(q=z.length>4?16:z.length>2?8:z.length*P,R=z.length>4?16:P*z.length):(q=z.length<=2?z.length*P:16,R=16),w=Math.ceil(w/q)*q,$.push(w);let F=C.type===10?8:4;w+=z.length>4?Math.ceil(z.length/F)*R:z.length*P});let v=16;w=Math.ceil(w/v)*v;let _=new ArrayBuffer(w);l.forEach((C,z)=>{let P=$[z],R=typeof C.data=="number"?[C.data]:C.data;if(C.type===6)new Int32Array(_,P,R.length).set(R);else if(C.type===12)new Uint32Array(_,P,R.length).set(R);else if(C.type===10)new Uint16Array(_,P,R.length).set(R);else if(C.type===1)new Float32Array(_,P,R.length).set(R);else throw new Error(`Unsupported uniform type: ${Me(C.type)}`)});let I=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,_,0,w),this.gpuDataManager.release(I.id),m={offset:0,size:w,buffer:I.buffer}}let h=this.programManager.normalizeDispatchGroupSize(d),b=h[1]===1&&h[2]===1,y=fc(t,r,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,h),this.programManager.setArtifact(y,g),ee("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),l&&g.uniformVariablesInfo){if(l.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${l.length} in program "${g.programInfo.name}".`);for(let w=0;w<l.length;w++){let $=l[w],v=$.type,_=typeof $.data=="number"?1:$.data.length,[I,C]=g.uniformVariablesInfo[w];if(v!==I||_!==C)throw new Error(`Uniform variable ${w} mismatch: expect type ${I} with size ${C}, got type ${v} with size ${_} in program "${g.programInfo.name}".`)}}if(ee("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:r,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(g,u,f,h,m),fe(t.name),p}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ra.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,s=o.kernelName,u=o.kernelEntry,a=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,a[0]&&(a[1]=a[0](a[1]),a[0]=void 0),ee("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),u(r,a[1]),0}catch(l){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${l}`)),1}finally{d&&n.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${i}] ${s}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let s=i.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,s?.[1]);return i.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[1])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await Tr(this,t,r);return Jn(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ee("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ee("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ee("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Na={};yt(Na,{init:()=>hc});var ht,en,hc,Wa=A(()=>{"use strict";M();Va();De();W();ht=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},en=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.HEAPU32,i=n>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let u=[];for(let a=0;a<s;a++){let d=o[i++],l=o[i++],c=o[i++],p=[];for(let f=0;f<c;f++)p.push(o[i++]);u.push(new ht(t,d,l,p))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],i=(u,a,d)=>new ht(this.module,a,this.output(u,d),d),s=(u,a)=>{let d=qe(u,a);if(!d)throw new Error(`Unsupported data type: ${u}`);let l=d>0?this.backend.gpuDataManager.create(d).id:0;return new ht(this.module,u,l,a)};return this.backend.run(t,n,o,i,s,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.stackAlloc((1+r.length)*4),i=o>>2;this.module.HEAPU32[i++]=r.length;for(let s=0;s<r.length;s++)this.module.HEAPU32[i++]=r[s];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},hc=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new ir;await i.initialize(r,n),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,u,a,d=!1)=>{if(d)ee("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${u}, size=${a}`),i.memcpy(s,u);else{ee("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${u}, size=${a}`);let l=t.HEAPU8.subarray(s>>>0,(s>>>0)+a);i.upload(u,l)}},async(s,u,a)=>{ee("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${a}`),await i.download(s,()=>t.HEAPU8.subarray(u>>>0,(u>>>0)+a))},(s,u,a)=>i.createKernel(s,u,a,t.UTF8ToString(t._JsepGetNodeName(u))),s=>i.releaseKernel(s),(s,u,a,d)=>{ee("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${s}, contextDataOffset=${u}`);let l=new en(t,i,u);return i.computeKernel(s,l,d)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else o("webnn")}});var gc,At,kt,Ze,yc,it,Et,Pt,La,zt,Ot,Bt,br=A(()=>{"use strict";Kn();Xn();M();Ge();Rt();xr();gc=(e,t)=>{se()._OrtInit(e,t)!==0&&oe("Can't initialize onnxruntime.")},At=async e=>{gc(e.wasm.numThreads,at(e.logLevel))},kt=async(e,t)=>{{let r=(Wa(),mr(Na)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",se(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",se(),e)}}},Ze=new Map,yc=e=>{let t=se(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&oe("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},it=e=>{let t=se(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Et=async(e,t)=>{let r,n,o=se();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=it(e);let i=0,s=0,u=0,a=[],d=[],l=[];try{if([s,a]=jn(t),t?.externalData&&o.mountExternalData){let g=[];for(let w of t.externalData){let $=typeof w=="string"?w:w.path;g.push(ut(typeof w=="string"?w:w.data).then(v=>{o.mountExternalData($,v)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let $=g,v=$?.context,_=$?.gpuDevice,I=$?.deviceType,C=$?.numThreads,z=$?.powerPreference;v?o.currentContext=v:_?o.currentContext=await navigator.ml.createContext(_):o.currentContext=await navigator.ml.createContext({deviceType:I,numThreads:C,powerPreference:z})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(r,n,s),i===0&&oe("Can't create a session."),o.currentContext&&(o.currentContext=void 0);let[c,p]=yc(i),f=!!t?.enableGraphCapture,m=[],h=[],b=[];for(let g=0;g<c;g++){let w=o._OrtGetInputName(i,g);w===0&&oe("Can't get an input name."),d.push(w),m.push(o.UTF8ToString(w))}for(let g=0;g<p;g++){let w=o._OrtGetOutputName(i,g);w===0&&oe("Can't get an output name."),l.push(w);let $=o.UTF8ToString(w);h.push($);{if(f&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let v=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[$]??"cpu";if(v!=="cpu"&&v!=="cpu-pinned"&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}.`);if(f&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(v)}}let y=null;return b.some(g=>g==="gpu-buffer")&&(u=o._OrtCreateBinding(i),u===0&&oe("Can't create IO binding."),y={handle:u,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>_r(g))}),Ze.set(i,[i,d,l,y,f,!1]),[i,m,h]}catch(c){throw d.forEach(p=>o._OrtFree(p)),l.forEach(p=>o._OrtFree(p)),u!==0&&o._OrtReleaseBinding(u),i!==0&&o._OrtReleaseSession(i),c}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s),a.forEach(c=>o._free(c)),o.unmountExternalData?.()}},Pt=e=>{let t=se(),r=Ze.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(e),o.forEach(a=>t._OrtFree(a)),i.forEach(a=>t._OrtFree(a)),t._OrtReleaseSession(n),Ze.delete(e)},La=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let s=se(),u=e[0],a=e[1],d=e[3],l,c;if(u==="string"&&d==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let m=e[2].gpuBuffer;c=qe(vr(u),a);let h=s.jsepRegisterBuffer;if(!h)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');l=h(n,o,m,c)}else{let m=e[2];if(Array.isArray(m)){c=4*m.length,l=s._malloc(c),r.push(l);let h=l/4;for(let b=0;b<m.length;b++){if(typeof m[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.HEAPU32[h++]=de(m[b],r)}}else c=m.byteLength,l=s._malloc(c),r.push(l),s.HEAPU8.set(new Uint8Array(m.buffer,m.byteOffset,c),l)}let p=s.stackSave(),f=s.stackAlloc(4*a.length);try{let m=f/4;a.forEach(b=>s.HEAP32[m++]=b);let h=s._OrtCreateTensor(vr(u),l,c,f,a.length,_r(d));h===0&&oe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(h)}finally{s.stackRestore(p)}},zt=async(e,t,r,n,o,i)=>{let s=se(),u=Ze.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let a=u[0],d=u[1],l=u[2],c=u[3],p=u[4],f=u[5],m=t.length,h=n.length,b=0,y=[],g=[],w=[],$=[],v=s.stackSave(),_=s.stackAlloc(m*4),I=s.stackAlloc(m*4),C=s.stackAlloc(h*4),z=s.stackAlloc(h*4);try{[b,y]=Fn(i);for(let B=0;B<m;B++)La(r[B],g,$,e,t[B],p);for(let B=0;B<h;B++)La(o[B],w,$,e,m+n[B],p);let P=_/4,R=I/4,q=C/4,F=z/4;for(let B=0;B<m;B++)s.HEAPU32[P++]=g[B],s.HEAPU32[R++]=d[t[B]];for(let B=0;B<h;B++)s.HEAPU32[q++]=w[B],s.HEAPU32[F++]=l[n[B]];if(c&&!f){let{handle:B,outputPreferredLocations:ne,outputPreferredLocationsEncoded:Z}=c;if(d.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);for(let N=0;N<m;N++){let H=t[N];await s._OrtBindInput(B,d[H],g[N])!==0&&oe(`Can't bind input[${N}] for session=${e}.`)}for(let N=0;N<h;N++){let H=n[N];o[N]?.[3]?s._OrtBindOutput(B,l[H],w[N],0)!==0&&oe(`Can't bind pre-allocated output[${N}] for session=${e}.`):s._OrtBindOutput(B,l[H],0,Z[H])!==0&&oe(`Can't bind output[${N}] to ${ne[N]} for session=${e}.`)}Ze.set(e,[a,d,l,c,p,!0])}s.jsepOnRunStart?.(a);let K;c?K=await s._OrtRunWithBinding(a,c.handle,h,C,b):K=await s._OrtRun(a,I,_,m,z,h,C,b),K!==0&&oe("failed to call OrtRun().");let re=[];for(let B=0;B<h;B++){let ne=s.HEAPU32[C/4+B];if(ne===w[B]){re.push(o[B]);continue}let Z=s.stackSave(),N=s.stackAlloc(4*4),H=!1,D,te=0;try{s._OrtGetTensorData(ne,N,N+4,N+8,N+12)!==0&&oe(`Can't access output tensor data on index ${B}.`);let k=N/4,U=s.HEAPU32[k++];te=s.HEAPU32[k++];let j=s.HEAPU32[k++],Te=s.HEAPU32[k++],ie=[];for(let ye=0;ye<Te;ye++)ie.push(s.HEAPU32[j/4+ye]);s._OrtFree(j);let Ve=ie.reduce((ye,be)=>ye*be,1);D=Me(U);let on=c?.outputPreferredLocations[n[B]];if(D==="string"){if(on==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let ye=[],be=te/4;for(let Qe=0;Qe<Ve;Qe++){let sn=s.HEAPU32[be++],tu=Qe===Ve-1?void 0:s.HEAPU32[be]-sn;ye.push(s.UTF8ToString(sn,tu))}re.push([D,ie,ye,"cpu"])}else if(on==="gpu-buffer"&&Ve>0){let ye=s.jsepGetBuffer;if(!ye)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=ye(te),Qe=qe(U,Ve);if(Qe===void 0||!Ut(D))throw new Error(`Unsupported data type: ${D}`);H=!0,re.push([D,ie,{gpuBuffer:be,download:s.jsepCreateDownloader(be,Qe,D),dispose:()=>{s._OrtReleaseTensor(ne)}},"gpu-buffer"])}else{let ye=Mt(D),be=new ye(Ve);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(s.HEAPU8.subarray(te,te+be.byteLength)),re.push([D,ie,be,"cpu"])}}finally{s.stackRestore(Z),D==="string"&&te&&s._free(te),H||s._OrtReleaseTensor(ne)}}return c&&!p&&(s._OrtClearBoundOutputs(c.handle),Ze.set(e,[a,d,l,c,p,!1])),re}finally{s.stackRestore(v),g.forEach(P=>s._OrtReleaseTensor(P)),w.forEach(P=>s._OrtReleaseTensor(P)),$.forEach(P=>s._free(P)),b!==0&&s._OrtReleaseRunOptions(b),y.forEach(P=>s._free(P))}},Ot=e=>{let t=se(),r=Ze.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&oe("Can't get an profile file name."),t._OrtFree(o)},Bt=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Ye,Ce,gt,ar,ur,sr,tn,rn,tt,rt,wc,Ga,Ha,qa,Fa,Ka,ja,Xa,nn=A(()=>{"use strict";Se();br();Ge();ot();Ye=()=>!!Y.wasm.proxy&&typeof document<"u",gt=!1,ar=!1,ur=!1,rn=new Map,tt=(e,t)=>{let r=rn.get(e);r?r.push(t):rn.set(e,[t])},rt=()=>{if(gt||!ar||ur||!Ce)throw new Error("worker not ready")},wc=e=>{switch(e.data.type){case"init-wasm":gt=!1,e.data.err?(ur=!0,tn[1](e.data.err)):(ar=!0,tn[0]()),sr&&(URL.revokeObjectURL(sr),sr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=rn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ga=async()=>{if(!ar){if(gt)throw new Error("multiple calls to 'initWasm()' detected.");if(ur)throw new Error("previous call to 'initWasm()' failed.");if(gt=!0,Ye())return new Promise((e,t)=>{Ce?.terminate(),Gn().then(([r,n])=>{try{Ce=n,Ce.onerror=i=>t(i),Ce.onmessage=wc,tn=[e,t];let o={type:"init-wasm",in:Y};Ce.postMessage(o),sr=r}catch(o){t(o)}},t)});try{await Tt(Y.wasm),await At(Y),ar=!0}catch(e){throw ur=!0,e}finally{gt=!1}}},Ha=async e=>{if(Ye())return rt(),new Promise((t,r)=>{tt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:Y}};Ce.postMessage(n)});await kt(Y,e)},qa=async e=>Ye()?(rt(),new Promise((t,r)=>{tt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ce.postMessage(n,[e.buffer])})):it(e),Fa=async(e,t)=>{if(Ye()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return rt(),new Promise((r,n)=>{tt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ce.postMessage(o,i)})}else return Et(e,t)},Ka=async e=>{if(Ye())return rt(),new Promise((t,r)=>{tt("release",[t,r]);let n={type:"release",in:e};Ce.postMessage(n)});Pt(e)},ja=async(e,t,r,n,o,i)=>{if(Ye()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return rt(),new Promise((s,u)=>{tt("run",[s,u]);let a=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:a,outputIndices:n,options:i}};Ce.postMessage(d,Bt(a))})}else return zt(e,t,r,n,o,i)},Xa=async e=>{if(Ye())return rt(),new Promise((t,r)=>{tt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ce.postMessage(n)});Ot(e)}});var Za,$c,dr,Ya=A(()=>{"use strict";Se();nn();M();Ct();xr();Za=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},$c=e=>{switch(e[3]){case"cpu":return new pe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ut(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return pe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},dr=class{async fetchModelAndCopyToWasmMemory(t){return qa(await ut(t))}async loadModel(t,r){$e();let n;typeof t=="string"?!1?n=await ut(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Fa(n,r),fe()}async dispose(){return Ka(this.sessionId)}async run(t,r,n){$e();let o=[],i=[];Object.entries(t).forEach(p=>{let f=p[0],m=p[1],h=this.inputNames.indexOf(f);if(h===-1)throw new Error(`invalid input '${f}'`);o.push(m),i.push(h)});let s=[],u=[];Object.entries(r).forEach(p=>{let f=p[0],m=p[1],h=this.outputNames.indexOf(f);if(h===-1)throw new Error(`invalid output '${f}'`);s.push(m),u.push(h)});let a=o.map((p,f)=>Za(p,()=>`input "${this.inputNames[i[f]]}"`)),d=s.map((p,f)=>p?Za(p,()=>`output "${this.outputNames[u[f]]}"`):null),l=await ja(this.sessionId,i,a,u,d,n),c={};for(let p=0;p<l.length;p++)c[this.outputNames[u[p]]]=s[p]??$c(l[p]);return fe(),c}startProfiling(){}endProfiling(){Xa(this.sessionId)}}});var vc,lr,Qa=A(()=>{"use strict";Se();nn();Ya();ot();vc=()=>{if((typeof Y.wasm.initTimeout!="number"||Y.wasm.initTimeout<0)&&(Y.wasm.initTimeout=0),Y.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof Y.wasm.proxy!="boolean"&&(Y.wasm.proxy=!1),typeof Y.wasm.trace!="boolean"&&(Y.wasm.trace=!1),typeof Y.wasm.numThreads!="number"||!Number.isInteger(Y.wasm.numThreads)||Y.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Y.wasm.numThreads=1;else{let e=typeof navigator>"u"?pr("node:os").cpus().length:navigator.hardwareConcurrency;Y.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}Y.wasm.wasmPaths===void 0&&Ie&&Ie.indexOf("blob:")!==0&&(Y.wasm.wasmPaths=Ie.substring(0,Ie.lastIndexOf("/")+1))},lr=class{async init(t){vc(),await Ga(),await Ha(t)}async createInferenceSessionHandler(t,r){let n=new dr;return await n.loadModel(t,r),Promise.resolve(n)}}});var Ja={};yt(Ja,{wasmBackend:()=>_c});var _c,eu=A(()=>{"use strict";Qa();_c=new lr});Se();Se();Se();var Dn="1.20.0";var J$=yr;{let e=(eu(),mr(Ja)).wasmBackend;We("webgpu",e,5),We("webnn",e,5),We("cpu",e,10),We("wasm",e,10)}Object.defineProperty(Y.versions,"web",{value:Dn,enumerable:!0});export{au as InferenceSession,xt as TRACE,$e as TRACE_FUNC_BEGIN,fe as TRACE_FUNC_END,pe as Tensor,du as TrainingSession,J$ as default,Y as env,We as registerBackend};
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
