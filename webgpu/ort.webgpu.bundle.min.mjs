/*!
 * ONNX Runtime Web v1.20.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var pn=Object.defineProperty;var Vl=Object.getOwnPropertyDescriptor;var Nl=Object.getOwnPropertyNames;var Hl=Object.prototype.hasOwnProperty;var mn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var B=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ot=(e,t)=>{for(var r in t)pn(e,r,{get:t[r],enumerable:!0})},Wl=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Nl(t))!Hl.call(e,o)&&o!==r&&pn(e,o,{get:()=>t[o],enumerable:!(n=Vl(t,o))||n.enumerable});return e};var rr=e=>Wl(pn({},"__esModule",{value:!0}),e);var nr,lt,ct,Ll,or,ir=B(()=>{nr=new Map,lt=[],ct=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=nr.get(e);if(n===void 0)nr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=lt.indexOf(e);o!==-1&&lt.splice(o,1);for(let a=0;a<lt.length;a++)if(nr.get(lt[a]).priority<=r){lt.splice(a,0,e);return}lt.push(e)}return}throw new TypeError("not a valid backend")},Ll=async e=>{let t=nr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},or=async e=>{let t=e.executionProviders||[],r=t.map(i=>typeof i=="string"?i:i.name),n=r.length===0?lt:r,o,a=[],s=new Set;for(let i of n){let l=await Ll(i);typeof l=="string"?a.push({name:i,err:l}):(o||(o=l),o===l&&s.add(i))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(i=>`[${i.name}] ${i.err}`).join(", ")}`);for(let{name:i,err:l}of a)r.includes(i)&&console.warn(`removing requested execution provider "${i}" from session options because it is not available: ${l}`);let d=t.filter(i=>s.has(typeof i=="string"?i:i.name));return[o,new Proxy(e,{get:(i,l)=>l==="executionProviders"?d:Reflect.get(i,l)})]}});var li=B(()=>{ir()});var ci,pi=B(()=>{ci="1.20.0"});var mi,Ue,fn=B(()=>{pi();mi="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:ci},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);mi=e}},get logLevel(){return mi}};Object.defineProperty(Ue,"logLevel",{enumerable:!0})});var me,fi=B(()=>{fn();me=Ue});var hi,gi,yi=B(()=>{hi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",d=t?.norm,i,l;d===void 0||d.mean===void 0?i=[255,255,255,255]:typeof d.mean=="number"?i=[d.mean,d.mean,d.mean,d.mean]:(i=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(i[3]=d.mean[3])),d===void 0||d.bias===void 0?l=[0,0,0,0]:typeof d.bias=="number"?l=[d.bias,d.bias,d.bias,d.bias]:(l=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(l[3]=d.bias[3]));let c=a*o,p=0,m=c,g=c*2,h=-1;s==="RGBA"?(p=0,m=c,g=c*2,h=c*3):s==="RGB"?(p=0,m=c,g=c*2):s==="RBG"&&(p=0,g=c,m=c*2);for(let y=0;y<a;y++)for(let $=0;$<o;$++){let v=(e.data[p++]-l[0])*i[0],w=(e.data[m++]-l[1])*i[1],x=(e.data[g++]-l[2])*i[2],S=h===-1?255:(e.data[h++]-l[3])*i[3];n.fillStyle="rgba("+v+","+w+","+x+","+S+")",n.fillRect($,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},gi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",i=t?.norm,l,c;i===void 0||i.mean===void 0?l=[255,255,255,255]:typeof i.mean=="number"?l=[i.mean,i.mean,i.mean,i.mean]:(l=[i.mean[0],i.mean[1],i.mean[2],255],i.mean[3]!==void 0&&(l[3]=i.mean[3])),i===void 0||i.bias===void 0?c=[0,0,0,0]:typeof i.bias=="number"?c=[i.bias,i.bias,i.bias,i.bias]:(c=[i.bias[0],i.bias[1],i.bias[2],0],i.bias[3]!==void 0&&(c[3]=i.bias[3]));let p=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,g=0,h=1,y=2,$=3,v=0,w=p,x=p*2,S=-1;d==="RGBA"?(v=0,w=p,x=p*2,S=p*3):d==="RGB"?(v=0,w=p,x=p*2):d==="RBG"&&(v=0,x=p,w=p*2),n=r.createImageData(o,a);for(let C=0;C<a*o;g+=m,h+=m,y+=m,$+=m,C++)n.data[g]=(e.data[v++]-c[0])*l[0],n.data[h]=(e.data[w++]-c[1])*l[1],n.data[y]=(e.data[x++]-c[2])*l[2],n.data[$]=S===-1?255:(e.data[S++]-c[3])*l[3]}else throw new Error("Can not access image data");return n}});var hn,bi,wi,vi,_i,$i=B(()=>{ar();hn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",i=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*n,c=i==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,m=0,g=1,h=2,y=3,$=0,v=l,w=l*2,x=-1;d==="RGB"&&(p=3,m=0,g=1,h=2,y=-1),i==="RGBA"?x=l*3:i==="RBG"?($=0,w=l,v=l*2):i==="BGR"&&(w=0,v=l,$=l*2);for(let C=0;C<l;C++,m+=p,h+=p,g+=p,y+=p)c[$++]=(e[m]+s[0])/a[0],c[v++]=(e[g]+s[1])/a[1],c[w++]=(e[h]+s[2])/a[2],x!==-1&&y!==-1&&(c[x++]=(e[y]+s[3])/a[3]);return i==="RGBA"?new ze("float32",c,[1,4,r,n]):new ze("float32",c,[1,3,r,n])},bi=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,d=t??{},i=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=i();c.width=e.width,c.height=e.height;let p=l(c);if(p!=null){let m=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=m,d.width=g}else d.tensorFormat="RGBA",d.height=m,d.width=g;p.drawImage(e,0,0),s=p.getImageData(0,0,g,m).data}else throw new Error("Can not access image data")}else if(n){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=c,d.width=p,t!==void 0){let m=i();m.width=p,m.height=c;let g=l(m);if(g!=null)g.putImageData(e,0,0),s=g.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=i();c.width=e.width,c.height=e.height;let p=l(c);if(p!=null){let m=e.height,g=e.width;return p.drawImage(e,0,0,g,m),s=p.getImageData(0,0,g,m).data,d.height=m,d.width=g,hn(s,d)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let m=i(),g=l(m);if(!e||!g)return p();let h=new Image;h.crossOrigin="Anonymous",h.src=e,h.onload=()=>{m.width=h.width,m.height=h.height,g.drawImage(h,0,0,m.width,m.height);let y=g.getImageData(0,0,m.width,m.height);d.height=m.height,d.width=m.width,c(hn(y.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return hn(s,d);throw new Error("Input data provided is not supported - aborted tensor creation")},wi=(e,t)=>{let{width:r,height:n,download:o,dispose:a}=t,s=[1,n,r,4];return new ze({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},vi=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:a}=t;return new ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:a})},_i=(e,t,r)=>new ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var pt,zt,xi,Si,Ii=B(()=>{pt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),zt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xi=!1,Si=()=>{if(!xi){xi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(pt.set("int64",BigInt64Array),zt.set(BigInt64Array,"int64")),t&&(pt.set("uint64",BigUint64Array),zt.set(BigUint64Array,"uint64")),r?(pt.set("float16",Float16Array),zt.set(Float16Array,"float16")):pt.set("float16",Uint16Array)}}});var Ci,Ti,Ai=B(()=>{ar();Ci=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Ti=(e,t)=>{switch(e.location){case"cpu":return new ze(e.type,e.data,t);case"cpu-pinned":return new ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var ze,ar=B(()=>{yi();$i();Ii();Ai();ze=class{constructor(t,r,n){Si();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let d=pt.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,i;if(typeof t=="string")if(o=t,i=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");d=r}else{let l=pt.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&l===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${l.name} as data.`);t==="uint64"||t==="int64"?d=l.from(r,BigInt):d=l.from(r)}else if(r instanceof l)d=r;else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(i=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")o="string",d=t;else if(l==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=zt.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=l,d=t}if(i===void 0)i=[d.length];else if(!Array.isArray(i))throw new TypeError("A tensor's dims must be a number array");a=i,this.cpuData=d,this.dataLocation="cpu"}let s=Ci(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,r){return bi(t,r)}static fromTexture(t,r){return wi(t,r)}static fromGpuBuffer(t,r){return vi(t,r)}static fromPinnedBuffer(t,r,n){return _i(t,r,n)}toDataURL(t){return hi(this,t)}toImageData(t){return gi(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ti(this,t)}}});var Pe,sr=B(()=>{ar();Pe=ze});var ur,ki,Ve,De,gn=B(()=>{fn();ur=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},ki=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),ur("CPU",a);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ve=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||ki("BEGIN",e)},De=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||ki("END",e)}});var dr,Ei=B(()=>{ir();sr();gn();dr=class e{constructor(t){this.handler=t}async run(t,r,n){Ve();let o={},a={};if(typeof t!="object"||t===null||t instanceof Pe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Pe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let m=r[p];(m===null||m instanceof Pe)&&(l=!0,s=!1,o[p]=m)}if(l){if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let d=await this.handler.run(t,o,a),i={};for(let l in d)if(Object.hasOwnProperty.call(d,l)){let c=d[l];c instanceof Pe?i[l]=c:i[l]=new Pe(c.type,c.data,c.dims)}return De(),i}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ve();let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(m=t.byteLength-p,typeof n=="number"){if(m=n,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,i]=await or(s),l=await d.createInferenceSessionHandler(a,i);return De(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Gl,Pi=B(()=>{Ei();Gl=dr});var Oi=B(()=>{});var zi=B(()=>{});var Di=B(()=>{});var Bi=B(()=>{});var Fl,lr,Ri=B(()=>{ir();sr();Fl="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",lr=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",a=r||{},[s,d]=await or(a);if(s.createTrainingSessionHandler){let i=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,d);return new e(i,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Fl)}typeNarrowingForRunStep(t,r,n,o,a){let s={},d={};if(typeof n!="object"||n===null||n instanceof Pe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let i=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Pe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");i=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof a=="object"&&a!==null)d=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(o);for(let p of r)if(c.indexOf(p)!==-1){let m=o[p];(m===null||m instanceof Pe)&&(l=!0,i=!1,s[p]=m)}if(l){if(typeof a=="object"&&a!==null)d=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else d=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of t)if(typeof n[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(i)for(let l of r)s[l]=null;return[s,d]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof Pe?r[n]=o:r[n]=new Pe(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,a]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),s=await this.handler.runTrainStep(t,o,a);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,a]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),s=await this.handler.runEvalStep(t,o,a);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var ql,Mi=B(()=>{Ri();ql=lr});var yn={};Ot(yn,{InferenceSession:()=>Gl,TRACE:()=>ur,TRACE_FUNC_BEGIN:()=>Ve,TRACE_FUNC_END:()=>De,Tensor:()=>Pe,TrainingSession:()=>ql,env:()=>me,registerBackend:()=>ct});var Le=B(()=>{li();fi();Pi();sr();Oi();zi();gn();Di();Bi();Mi()});var cr=B(()=>{"use strict"});var Hi={};Ot(Hi,{default:()=>Kl});var Vi,Ni,Kl,Wi=B(()=>{"use strict";bn();mt();Dt();Vi="ort-wasm-proxy-worker",Ni=globalThis.self?.name===Vi;Ni&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":pr(r.wasm).then(()=>{mr(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;fr(o,n).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:n}=r,o=Bt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;hr(n,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":gr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:a,outputIndices:s,options:d}=r;yr(n,o,a,s,new Array(s.length).fill(null),d).then(i=>{i.some(l=>l[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:i},wr([...a,...i]))},i=>{postMessage({type:t,err:i})});break}case"end-profiling":br(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Kl=Ni?null:e=>new Worker(e??xt,{type:"module",name:Vi})});var Gi={};Ot(Gi,{default:()=>jl});var wn,Li,jl,Fi=B(()=>{"use strict";Li=(wn=import.meta.url,async function(e={}){function t(){return j.buffer!=ue.buffer&&pe(),ue}function r(){return j.buffer!=ue.buffer&&pe(),L}function n(){return j.buffer!=ue.buffer&&pe(),ye}function o(){return j.buffer!=ue.buffer&&pe(),ie}function a(){return j.buffer!=ue.buffer&&pe(),F}var s,d,i=e,l=new Promise((u,f)=>{s=u,d=f}),c=typeof window=="object",p=typeof importScripts=="function",m=p&&self.name=="em-pthread";i.mountExternalData=(u,f)=>{u.startsWith("./")&&(u=u.substring(2)),(i.Za||(i.Za=new Map)).set(u,f)},i.unmountExternalData=()=>{delete i.Za};var g=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let h=()=>{let u=(b,_,I)=>(...E)=>{let R=Ke,N=_?.();E=b(...E);let W=_?.();return N!==W&&(b=W,I(N),_=I=null),Ke!=R?new Promise((Q,de)=>{sn={resolve:Q,reject:de}}):E},f=b=>async(..._)=>{try{if(i.Ya)throw Error("Session already started");let I=i.Ya={rb:_[0],errors:[]},E=await b(..._);if(i.Ya!==I)throw Error("Session mismatch");i.cb?.flush();let R=I.errors;if(0<R.length){let N=await Promise.all(R);if(N=N.filter(W=>W),0<N.length)throw Error(N.join(`
`))}return E}finally{i.Ya=null}};i._OrtCreateSession=u(i._OrtCreateSession,()=>i._OrtCreateSession,b=>i._OrtCreateSession=b),i._OrtRun=f(u(i._OrtRun,()=>i._OrtRun,b=>i._OrtRun=b)),i._OrtRunWithBinding=f(u(i._OrtRunWithBinding,()=>i._OrtRunWithBinding,b=>i._OrtRunWithBinding=b)),i._OrtBindInput=u(i._OrtBindInput,()=>i._OrtBindInput,b=>i._OrtBindInput=b),h=void 0};i.jsepInit=(u,f)=>{if(h?.(),u==="webgpu"){[i.cb,i.ib,i.mb,i.eb,i.lb,i.Ha,i.nb,i.pb,i.jb,i.kb,i.ob]=f;let b=i.cb;i.jsepRegisterBuffer=(_,I,E,R)=>b.registerBuffer(_,I,E,R),i.jsepGetBuffer=_=>b.getBuffer(_),i.jsepCreateDownloader=(_,I,E)=>b.createDownloader(_,I,E),i.jsepOnReleaseSession=_=>{b.onReleaseSession(_)},i.jsepOnRunStart=_=>b.onRunStart(_)}};var y,$,v=Object.assign({},i),w="./this.program",x=(u,f)=>{throw f},S="";(c||p)&&(p?S=self.location.href:typeof document<"u"&&document.currentScript&&(S=document.currentScript.src),wn&&(S=wn),S=S.startsWith("blob:")?"":S.substr(0,S.replace(/[?#].*/,"").lastIndexOf("/")+1),p&&($=u=>{var f=new XMLHttpRequest;return f.open("GET",u,!1),f.responseType="arraybuffer",f.send(null),new Uint8Array(f.response)}),y=u=>Et(u)?new Promise((f,b)=>{var _=new XMLHttpRequest;_.open("GET",u,!0),_.responseType="arraybuffer",_.onload=()=>{(_.status==200||_.status==0&&_.response)&&b(_.response),f(_.status)},_.onerror=f,_.send(null)}):fetch(u,{credentials:"same-origin"}).then(f=>f.ok?f.arrayBuffer():Promise.reject(Error(f.status+" : "+f.url))));var C,T=console.log.bind(console),P=console.error.bind(console),O=T,U=P;if(Object.assign(i,v),v=null,m){let u=function(f){try{var b=f.data,_=b.cmd;if(_==="load"){let I=[];self.onmessage=E=>I.push(E),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let E of I)u(E);self.onmessage=u};for(let E of b.handlers)i[E]&&!i[E].proxy||(i[E]=(...R)=>{postMessage({bb:"callHandler",vb:E,args:R})},E=="print"&&(O=i[E]),E=="printErr"&&(U=i[E]));j=b.wasmMemory,pe(),V(b.wasmModule)}else if(_==="run"){un(b.pthread_ptr,0,0,1,0,0),tn(b.pthread_ptr),al(),po(),q||=!0;try{sl(b.start_routine,b.arg)}catch(I){if(I!="unwind")throw I}}else _==="cancel"?$t()&&er(-1):b.target!=="setimmediate"&&(_==="checkMailbox"?q&&Yt():_&&(U(`worker: received unknown command ${_}`),U(b)))}catch(I){throw Jo(),I}};var uf=u,V,q=!1;U=function(...f){f=f.join(" "),console.error(f)},self.alert=function(...f){postMessage({bb:"alert",text:f.join(" "),xb:$t()})},i.instantiateWasm=(f,b)=>new Promise(_=>{V=I=>{I=new WebAssembly.Instance(I,ao()),b(I),_()}}),self.onunhandledrejection=f=>{throw f.reason||f},self.onmessage=u}i.wasmBinary&&(C=i.wasmBinary);var j,oe,ne,ue,L,ye,ie,X,Z,F,ae=!1;function pe(){var u=j.buffer;i.HEAP8=ue=new Int8Array(u),i.HEAP16=new Int16Array(u),i.HEAPU8=L=new Uint8Array(u),i.HEAPU16=new Uint16Array(u),i.HEAP32=ye=new Int32Array(u),i.HEAPU32=ie=new Uint32Array(u),i.HEAPF32=X=new Float32Array(u),i.HEAPF64=F=new Float64Array(u),i.HEAP64=Z=new BigInt64Array(u),i.HEAPU64=new BigUint64Array(u)}if(!m){if(!((j=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof g))throw U("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");pe()}var D=[],K=[],se=[],Ae=0,be=null,Me=null;function kt(){if(--Ae==0&&(be!==null&&(clearInterval(be),be=null),Me)){var u=Me;Me=null,u()}}function xe(u){throw U(u="Aborted("+u+")"),ae=!0,ne=1,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),d(u),u}var ke,et=u=>u.startsWith("data:application/octet-stream;base64,"),Et=u=>u.startsWith("file://");function Kt(u){if(u==ke&&C)return new Uint8Array(C);if($)return $(u);throw"both async and sync fetching of the wasm failed"}function io(u,f,b){return function(_){return C?Promise.resolve().then(()=>Kt(_)):y(_).then(I=>new Uint8Array(I),()=>Kt(_))}(u).then(_=>WebAssembly.instantiate(_,f)).then(b,_=>{U(`failed to asynchronously prepare wasm: ${_}`),xe(_)})}function ao(){return{a:{j:il,D:ol,b:dl,C:go,g:wo,T:vo,y:_o,A:$o,U:xo,R:So,K:Io,Q:Co,p:To,z:Ao,w:ko,S:Eo,x:Po,Y:ll,X:cl,N:pl,u:ml,E:fl,k:hl,M:tn,W:gl,H:yl,I:bl,J:wl,F:Ro,G:Mo,_:vl,c:_l,m:$l,l:xl,q:Sl,e:Il,V:Cl,v:Tl,d:Vo,f:Al,i:kl,t:El,s:Pl,r:Ol,O:Wo,P:Lo,B:en,h:Go,o:Fo,L:qo,n:Ko,a:j,Z:Jr}}}var Zr={782940:(u,f,b,_)=>{if(i===void 0||!i.Za)return 1;if((u=Oe(u>>>0)).startsWith("./")&&(u=u.substring(2)),!(u=i.Za.get(u)))return 2;if(_>>>=0,(f>>>=0)+(b>>>=0)>u.byteLength)return 3;try{return r().set(u.subarray(f,f+b),_>>>0),0}catch{return 4}},783441:()=>{i.jb()},783472:()=>{i.kb()},783501:()=>{i.ob()},783526:u=>i.ib(u),783559:u=>i.mb(u),783591:(u,f,b)=>{i.eb(u,f,b,!0)},783630:(u,f,b)=>{i.eb(u,f,b)},783663:()=>typeof wasmOffsetConverter<"u",783720:u=>{i.Ha("Abs",u,void 0)},783771:u=>{i.Ha("Neg",u,void 0)},783822:u=>{i.Ha("Floor",u,void 0)},783875:u=>{i.Ha("Ceil",u,void 0)},783927:u=>{i.Ha("Reciprocal",u,void 0)},783985:u=>{i.Ha("Sqrt",u,void 0)},784037:u=>{i.Ha("Exp",u,void 0)},784088:u=>{i.Ha("Erf",u,void 0)},784139:u=>{i.Ha("Sigmoid",u,void 0)},784194:(u,f,b)=>{i.Ha("HardSigmoid",u,{alpha:f,beta:b})},784273:u=>{i.Ha("Log",u,void 0)},784324:u=>{i.Ha("Sin",u,void 0)},784375:u=>{i.Ha("Cos",u,void 0)},784426:u=>{i.Ha("Tan",u,void 0)},784477:u=>{i.Ha("Asin",u,void 0)},784529:u=>{i.Ha("Acos",u,void 0)},784581:u=>{i.Ha("Atan",u,void 0)},784633:u=>{i.Ha("Sinh",u,void 0)},784685:u=>{i.Ha("Cosh",u,void 0)},784737:u=>{i.Ha("Asinh",u,void 0)},784790:u=>{i.Ha("Acosh",u,void 0)},784843:u=>{i.Ha("Atanh",u,void 0)},784896:u=>{i.Ha("Tanh",u,void 0)},784948:u=>{i.Ha("Not",u,void 0)},784999:(u,f,b)=>{i.Ha("Clip",u,{min:f,max:b})},785068:u=>{i.Ha("Clip",u,void 0)},785120:(u,f)=>{i.Ha("Elu",u,{alpha:f})},785178:u=>{i.Ha("Gelu",u,void 0)},785230:u=>{i.Ha("Relu",u,void 0)},785282:(u,f)=>{i.Ha("LeakyRelu",u,{alpha:f})},785346:(u,f)=>{i.Ha("ThresholdedRelu",u,{alpha:f})},785416:(u,f)=>{i.Ha("Cast",u,{to:f})},785474:u=>{i.Ha("Add",u,void 0)},785525:u=>{i.Ha("Sub",u,void 0)},785576:u=>{i.Ha("Mul",u,void 0)},785627:u=>{i.Ha("Div",u,void 0)},785678:u=>{i.Ha("Pow",u,void 0)},785729:u=>{i.Ha("Equal",u,void 0)},785782:u=>{i.Ha("Greater",u,void 0)},785837:u=>{i.Ha("GreaterOrEqual",u,void 0)},785899:u=>{i.Ha("Less",u,void 0)},785951:u=>{i.Ha("LessOrEqual",u,void 0)},786010:(u,f,b,_,I)=>{i.Ha("ReduceMean",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786169:(u,f,b,_,I)=>{i.Ha("ReduceMax",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786327:(u,f,b,_,I)=>{i.Ha("ReduceMin",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786485:(u,f,b,_,I)=>{i.Ha("ReduceProd",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786644:(u,f,b,_,I)=>{i.Ha("ReduceSum",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786802:(u,f,b,_,I)=>{i.Ha("ReduceL1",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},786959:(u,f,b,_,I)=>{i.Ha("ReduceL2",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},787116:(u,f,b,_,I)=>{i.Ha("ReduceLogSum",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},787277:(u,f,b,_,I)=>{i.Ha("ReduceSumSquare",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},787441:(u,f,b,_,I)=>{i.Ha("ReduceLogSumExp",u,{keepDims:!!f,noopWithEmptyAxes:!!b,axes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},787605:u=>{i.Ha("Where",u,void 0)},787658:(u,f,b)=>{i.Ha("Transpose",u,{perm:f?Array.from(n().subarray(f>>>0,b>>>0)):[]})},787766:(u,f,b,_)=>{i.Ha("DepthToSpace",u,{blocksize:f,mode:Oe(b),format:_?"NHWC":"NCHW"})},787899:(u,f,b,_)=>{i.Ha("DepthToSpace",u,{blocksize:f,mode:Oe(b),format:_?"NHWC":"NCHW"})},788032:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie,tt)=>{i.Ha("ConvTranspose",u,{format:W?"NHWC":"NCHW",autoPad:f,dilations:[b],group:_,kernelShape:[I],pads:[E,R],strides:[N],wIsConst:()=>!!t()[Q>>>0],outputPadding:de?Array.from(n().subarray(de>>>0,he>>>0)):[],outputShape:Se?Array.from(n().subarray(Se>>>0,Ie>>>0)):[],activation:Oe(tt)})},788433:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("ConvTranspose",u,{format:N?"NHWC":"NCHW",autoPad:f,dilations:Array.from(n().subarray(b>>>0,2+(b>>>0)>>>0)),group:_,kernelShape:Array.from(n().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(n().subarray(E>>>0,4+(E>>>0)>>>0)),strides:Array.from(n().subarray(R>>>0,2+(R>>>0)>>>0)),wIsConst:()=>!!t()[W>>>0],outputPadding:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],outputShape:he?Array.from(n().subarray(he>>>0,Se>>>0)):[],activation:Oe(Ie)})},788998:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie,tt)=>{i.Ha("ConvTranspose",u,{format:W?"NHWC":"NCHW",autoPad:f,dilations:[b],group:_,kernelShape:[I],pads:[E,R],strides:[N],wIsConst:()=>!!t()[Q>>>0],outputPadding:de?Array.from(n().subarray(de>>>0,he>>>0)):[],outputShape:Se?Array.from(n().subarray(Se>>>0,Ie>>>0)):[],activation:Oe(tt)})},789399:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("ConvTranspose",u,{format:N?"NHWC":"NCHW",autoPad:f,dilations:Array.from(n().subarray(b>>>0,2+(b>>>0)>>>0)),group:_,kernelShape:Array.from(n().subarray(I>>>0,2+(I>>>0)>>>0)),pads:Array.from(n().subarray(E>>>0,4+(E>>>0)>>>0)),strides:Array.from(n().subarray(R>>>0,2+(R>>>0)>>>0)),wIsConst:()=>!!t()[W>>>0],outputPadding:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],outputShape:he?Array.from(n().subarray(he>>>0,Se>>>0)):[],activation:Oe(Ie)})},789964:(u,f)=>{i.Ha("GlobalAveragePool",u,{format:f?"NHWC":"NCHW"})},790055:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("AveragePool",u,{format:Ie?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:_,storage_order:I,dilations:E?Array.from(n().subarray(E>>>0,R>>>0)):[],kernel_shape:N?Array.from(n().subarray(N>>>0,W>>>0)):[],pads:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],strides:he?Array.from(n().subarray(he>>>0,Se>>>0)):[]})},790470:(u,f)=>{i.Ha("GlobalAveragePool",u,{format:f?"NHWC":"NCHW"})},790561:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("AveragePool",u,{format:Ie?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:_,storage_order:I,dilations:E?Array.from(n().subarray(E>>>0,R>>>0)):[],kernel_shape:N?Array.from(n().subarray(N>>>0,W>>>0)):[],pads:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],strides:he?Array.from(n().subarray(he>>>0,Se>>>0)):[]})},790976:(u,f)=>{i.Ha("GlobalMaxPool",u,{format:f?"NHWC":"NCHW"})},791063:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("MaxPool",u,{format:Ie?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:_,storage_order:I,dilations:E?Array.from(n().subarray(E>>>0,R>>>0)):[],kernel_shape:N?Array.from(n().subarray(N>>>0,W>>>0)):[],pads:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],strides:he?Array.from(n().subarray(he>>>0,Se>>>0)):[]})},791474:(u,f)=>{i.Ha("GlobalMaxPool",u,{format:f?"NHWC":"NCHW"})},791561:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie)=>{i.Ha("MaxPool",u,{format:Ie?"NHWC":"NCHW",auto_pad:f,ceil_mode:b,count_include_pad:_,storage_order:I,dilations:E?Array.from(n().subarray(E>>>0,R>>>0)):[],kernel_shape:N?Array.from(n().subarray(N>>>0,W>>>0)):[],pads:Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],strides:he?Array.from(n().subarray(he>>>0,Se>>>0)):[]})},791972:(u,f,b,_,I)=>{i.Ha("Gemm",u,{alpha:f,beta:b,transA:_,transB:I})},792076:u=>{i.Ha("MatMul",u,void 0)},792130:(u,f,b,_)=>{i.Ha("ArgMax",u,{keepDims:!!f,selectLastIndex:!!b,axis:_})},792238:(u,f,b,_)=>{i.Ha("ArgMin",u,{keepDims:!!f,selectLastIndex:!!b,axis:_})},792346:(u,f)=>{i.Ha("Softmax",u,{axis:f})},792409:(u,f)=>{i.Ha("Concat",u,{axis:f})},792469:(u,f,b,_,I)=>{i.Ha("Split",u,{axis:f,numOutputs:b,splitSizes:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},792609:u=>{i.Ha("Expand",u,void 0)},792663:(u,f)=>{i.Ha("Gather",u,{axis:Number(f)})},792734:(u,f)=>{i.Ha("GatherElements",u,{axis:Number(f)})},792813:(u,f,b,_,I,E,R,N,W,Q,de)=>{i.Ha("Resize",u,{antialias:f,axes:b?Array.from(n().subarray(b>>>0,_>>>0)):[],coordinateTransformMode:Oe(I),cubicCoeffA:E,excludeOutside:R,extrapolationValue:N,keepAspectRatioPolicy:Oe(W),mode:Oe(Q),nearestMode:Oe(de)})},793159:(u,f,b,_,I,E,R)=>{i.Ha("Slice",u,{starts:f?Array.from(n().subarray(f>>>0,b>>>0)):[],ends:_?Array.from(n().subarray(_>>>0,I>>>0)):[],axes:E?Array.from(n().subarray(E>>>0,R>>>0)):[]})},793375:u=>{i.Ha("Tile",u,void 0)},793427:(u,f,b)=>{i.Ha("InstanceNormalization",u,{epsilon:f,format:b?"NHWC":"NCHW"})},793541:(u,f,b)=>{i.Ha("InstanceNormalization",u,{epsilon:f,format:b?"NHWC":"NCHW"})},793655:u=>{i.Ha("Range",u,void 0)},793708:(u,f)=>{i.Ha("Einsum",u,{equation:Oe(f)})},793789:(u,f,b,_,I)=>{i.Ha("Pad",u,{mode:f,value:b,pads:_?Array.from(n().subarray(_>>>0,I>>>0)):[]})},793916:(u,f,b,_,I,E)=>{i.Ha("BatchNormalization",u,{epsilon:f,momentum:b,spatial:!!I,trainingMode:!!_,format:E?"NHWC":"NCHW"})},794085:(u,f,b,_,I,E)=>{i.Ha("BatchNormalization",u,{epsilon:f,momentum:b,spatial:!!I,trainingMode:!!_,format:E?"NHWC":"NCHW"})},794254:(u,f,b)=>{i.Ha("CumSum",u,{exclusive:Number(f),reverse:Number(b)})},794351:(u,f,b)=>{i.Ha("DequantizeLinear",u,{axis:f,blockSize:b})},794441:(u,f,b,_,I,E,R,N,W)=>{i.Ha("Attention",u,{numHeads:f,isUnidirectional:b,maskFilterValue:_,scale:I,doRotary:E,qkvHiddenSizes:R?Array.from(n().subarray(Number(N)>>>0,Number(N)+R>>>0)):[],pastPresentShareBuffer:!!W})},794713:u=>{i.Ha("BiasAdd",u,void 0)},794768:u=>{i.Ha("BiasSplitGelu",u,void 0)},794829:u=>{i.Ha("FastGelu",u,void 0)},794885:(u,f,b,_,I,E,R,N,W,Q,de,he,Se,Ie,tt,Ml)=>{var di=i,Ul=di.Ha;b=b?Array.from(n().subarray(b>>>0,_>>>0)):[],E=E?Array.from(n().subarray(E>>>0,R>>>0)):[],N=N?Array.from(n().subarray(N>>>0,W>>>0)):[],Q=Q?Array.from(n().subarray(Q>>>0,de>>>0)):[],Ie=Oe(Ie),tt?(W=(de=Array).from,j.buffer!=ue.buffer&&pe(),tt=W.call(de,X.subarray(tt>>>0,Ml>>>0))):tt=[],Ul.call(di,"Conv",u,{format:he?"NHWC":"NCHW",auto_pad:f,dilations:b,group:I,kernel_shape:E,pads:N,strides:Q,w_is_const:()=>!!t()[Se>>>0],activation:Ie,activation_params:tt})},795381:u=>{i.Ha("Gelu",u,void 0)},795433:(u,f,b,_)=>{i.Ha("GroupQueryAttention",u,{numHeads:f,kvNumHeads:b,scale:_})},795546:(u,f,b,_)=>{i.Ha("LayerNormalization",u,{axis:f,epsilon:b,simplified:!!_})},795657:(u,f,b,_)=>{i.Ha("LayerNormalization",u,{axis:f,epsilon:b,simplified:!!_})},795768:(u,f,b,_,I,E)=>{i.Ha("MatMulNBits",u,{k:f,n:b,accuracyLevel:_,bits:I,blockSize:E})},795895:(u,f,b,_,I,E)=>{i.Ha("MultiHeadAttention",u,{numHeads:f,isUnidirectional:b,maskFilterValue:_,scale:I,doRotary:E})},796054:(u,f)=>{i.Ha("QuickGelu",u,{alpha:f})},796118:(u,f,b,_,I)=>{i.Ha("RotaryEmbedding",u,{interleaved:!!f,numHeads:b,rotaryEmbeddingDim:_,scale:I})},796257:(u,f,b)=>{i.Ha("SkipLayerNormalization",u,{epsilon:f,simplified:!!b})},796359:u=>{i.nb(u)},796393:(u,f)=>i.pb(u,f,i.Ya.rb,i.Ya.errors),796505:(u,f,b)=>{i.Ha("SkipLayerNormalization",u,{epsilon:f,simplified:!!b})}};function ol(u,f,b){return function(_){return function(I){if(!ae){if(it===0){var E=!1,R=!1;I((N=0)=>{if(!ae&&(jo=N,E=!0,R)){it=2,Xt(()=>ai(Ke)),typeof Browser<"u"&&Browser.ab.hb&&Browser.ab.resume(),N=!1;try{var W=function(){var he=n()[Ke+8>>>2>>>0];return he=G[Zo[he]],--ut,he()}()}catch(he){W=he,N=!0}var Q=!1;if(!Ke){var de=sn;de&&(sn=null,(N?de.reject:de.resolve)(W),Q=!0)}if(N&&!Q)throw W}}),R=!0,E||(it=1,Ke=function(){var N=Xo(65548),W=N+12;o()[N>>>2>>>0]=W,o()[N+4>>>2>>>0]=W+65536,W=Qt[0];var Q=Yo[W];return Q===void 0&&(Q=Dl++,Yo[W]=Q,Zo[Q]=W),W=Q,n()[N+8>>>2>>>0]=W,N}(),typeof Browser<"u"&&Browser.ab.hb&&Browser.ab.pause(),Xt(()=>oi(Ke)))}else it===2?(it=0,Xt(si),Qo(Ke),Ke=null,Bl.forEach(Oo)):xe(`invalid state: ${it}`);return jo}}(I=>{_().then(I)})}(async()=>{await i.lb(u,f,b)})}function il(){return typeof wasmOffsetConverter<"u"}function Xr(u){this.name="ExitStatus",this.message=`Program terminated with exit(${u})`,this.status=u}var Qr=u=>{u.terminate(),u.onmessage=()=>{}},so=u=>{ot.length==0&&(fo(),mo(ot[0]));var f=ot.pop();if(!f)return 6;dt.push(f),qe[u.Sa]=f,f.Sa=u.Sa;var b={cmd:"run",start_routine:u.sb,arg:u.gb,pthread_ptr:u.Sa};return f.postMessage(b,u.tb),0},ut=0,ve=(u,f,...b)=>{for(var _=2*b.length,I=cn(),E=ln(8*_),R=E>>>3,N=0;N<b.length;N++){var W=b[N];typeof W=="bigint"?(Z[R+2*N]=1n,Z[R+2*N+1]=W):(Z[R+2*N]=0n,a()[R+2*N+1>>>0]=W)}return u=ei(u,0,_,E,f),tr(I),u};function Jr(u){if(m)return ve(0,1,u);if(ne=u,!(0<ut)){for(var f of dt)Qr(f);for(f of ot)Qr(f);ot=[],dt=[],qe=[],ae=!0}x(u,new Xr(u))}function uo(u){if(m)return ve(1,0,u);en(u)}var en=u=>{if(ne=u,m)throw uo(u),"unwind";Jr(u)},ot=[],dt=[],lo=[],qe={},co=u=>{var f=u.Sa;delete qe[f],ot.push(u),dt.splice(dt.indexOf(u),1),u.Sa=0,dn(f)};function po(){lo.forEach(u=>u())}var mo=u=>new Promise(f=>{u.onmessage=I=>{var E=(I=I.data).cmd;if(I.targetThread&&I.targetThread!=$t()){var R=qe[I.targetThread];R?R.postMessage(I,I.transferList):U(`Internal error! Worker sent a message "${E}" to target pthread ${I.targetThread}, but that thread no longer exists!`)}else E==="checkMailbox"?Yt():E==="spawnThread"?so(I):E==="cleanupThread"?co(qe[I.thread]):E==="killThread"?(I=I.thread,E=qe[I],delete qe[I],Qr(E),dn(I),dt.splice(dt.indexOf(E),1),E.Sa=0):E==="cancelThread"?qe[I.thread].postMessage({cmd:"cancel"}):E==="loaded"?(u.loaded=!0,f(u)):E==="alert"?alert(`Thread ${I.threadId}: ${I.text}`):I.target==="setimmediate"?u.postMessage(I):E==="callHandler"?i[I.handler](...I.args):E&&U(`worker sent an unknown command ${E}`)},u.onerror=I=>{throw U(`worker sent an error! ${I.filename}:${I.lineno}: ${I.message}`),I};var b,_=[];for(b of[])i.propertyIsEnumerable(b)&&_.push(b);u.postMessage({cmd:"load",handlers:_,wasmMemory:j,wasmModule:oe})});function fo(){var u=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ot.push(u)}var jt=u=>{for(;0<u.length;)u.shift()(i)},al=()=>{var u=$t(),f=o()[u+52>>>2>>>0];u=o()[u+56>>>2>>>0],ri(f,f-u),tr(f)},sl=(u,f)=>{ut=0,u=ni(u,f),0<ut?ne=u:er(u)};class ul{constructor(f){this.$a=f-24}}function dl(u,f,b){var _=new ul(u>>>=0);throw f>>>=0,b>>>=0,o()[_.$a+16>>>2>>>0]=0,o()[_.$a+4>>>2>>>0]=f,o()[_.$a+8>>>2>>>0]=b,u}function ho(u,f,b,_){return m?ve(2,1,u,f,b,_):go(u,f,b,_)}function go(u,f,b,_){if(u>>>=0,f>>>=0,b>>>=0,_>>>=0,g===void 0)return U("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var I=[];return m&&I.length===0?ho(u,f,b,_):(u={sb:b,Sa:u,gb:_,tb:I},m?(u.bb="spawnThread",postMessage(u,I),0):so(u))}var yo=typeof TextDecoder<"u"?new TextDecoder:void 0,bo=(u,f,b)=>{var _=(f>>>=0)+b;for(b=f;u[b]&&!(b>=_);)++b;if(16<b-f&&u.buffer&&yo)return yo.decode(u.buffer instanceof g?u.slice(f,b):u.subarray(f,b));for(_="";f<b;){var I=u[f++];if(128&I){var E=63&u[f++];if((224&I)==192)_+=String.fromCharCode((31&I)<<6|E);else{var R=63&u[f++];65536>(I=(240&I)==224?(15&I)<<12|E<<6|R:(7&I)<<18|E<<12|R<<6|63&u[f++])?_+=String.fromCharCode(I):(I-=65536,_+=String.fromCharCode(55296|I>>10,56320|1023&I))}}else _+=String.fromCharCode(I)}return _},Oe=(u,f)=>(u>>>=0)?bo(r(),u,f):"";function wo(u,f,b){return m?ve(3,1,u,f,b):0}function vo(u,f){if(m)return ve(4,1,u,f)}var Pt=(u,f,b)=>{var _=r();if(f>>>=0,0<b){var I=f;b=f+b-1;for(var E=0;E<u.length;++E){var R=u.charCodeAt(E);if(55296<=R&&57343>=R&&(R=65536+((1023&R)<<10)|1023&u.charCodeAt(++E)),127>=R){if(f>=b)break;_[f++>>>0]=R}else{if(2047>=R){if(f+1>=b)break;_[f++>>>0]=192|R>>6}else{if(65535>=R){if(f+2>=b)break;_[f++>>>0]=224|R>>12}else{if(f+3>=b)break;_[f++>>>0]=240|R>>18,_[f++>>>0]=128|R>>12&63}_[f++>>>0]=128|R>>6&63}_[f++>>>0]=128|63&R}}_[f>>>0]=0,u=f-I}else u=0;return u};function _o(u,f){if(m)return ve(5,1,u,f)}function $o(u,f,b){if(m)return ve(6,1,u,f,b)}function xo(u,f,b){return m?ve(7,1,u,f,b):0}function So(u,f){if(m)return ve(8,1,u,f)}function Io(u,f,b){if(m)return ve(9,1,u,f,b)}function Co(u,f,b,_){if(m)return ve(10,1,u,f,b,_)}function To(u,f,b,_){if(m)return ve(11,1,u,f,b,_)}function Ao(u,f,b,_){if(m)return ve(12,1,u,f,b,_)}function ko(u){if(m)return ve(13,1,u)}function Eo(u,f){if(m)return ve(14,1,u,f)}function Po(u,f,b){if(m)return ve(15,1,u,f,b)}var ll=()=>{xe("")},cl=()=>1;function pl(u){un(u>>>0,!p,1,!c,131072,!1),po()}var Oo=u=>{if(!ae)try{if(u(),!(0<ut))try{m?er(ne):en(ne)}catch(f){f instanceof Xr||f=="unwind"||x(1,f)}}catch(f){f instanceof Xr||f=="unwind"||x(1,f)}};function tn(u){u>>>=0,typeof Atomics.ub=="function"&&(Atomics.ub(n(),u>>>2,u).value.then(Yt),u+=128,Atomics.store(n(),u>>>2,1))}var Yt=()=>{var u=$t();u&&(tn(u),Oo(ti))};function ml(u,f){(u>>>=0)==f>>>0?setTimeout(Yt):m?postMessage({targetThread:u,cmd:"checkMailbox"}):(u=qe[u])&&u.postMessage({cmd:"checkMailbox"})}var rn=[];function fl(u,f,b,_,I){for(f>>>=0,_/=2,rn.length=_,b=I>>>0>>>3,I=0;I<_;I++)rn[I]=Z[b+2*I]?Z[b+2*I+1]:a()[b+2*I+1>>>0];return(f?Zr[f]:Rl[u])(...rn)}function hl(u){u>>>=0,m?postMessage({cmd:"cleanupThread",thread:u}):co(qe[u])}function gl(u){}function yl(u,f){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),f>>>=0,u=new Date(1e3*u),n()[f>>>2>>>0]=u.getUTCSeconds(),n()[f+4>>>2>>>0]=u.getUTCMinutes(),n()[f+8>>>2>>>0]=u.getUTCHours(),n()[f+12>>>2>>>0]=u.getUTCDate(),n()[f+16>>>2>>>0]=u.getUTCMonth(),n()[f+20>>>2>>>0]=u.getUTCFullYear()-1900,n()[f+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,n()[f+28>>>2>>>0]=u}var zo=u=>u%4==0&&(u%100!=0||u%400==0),Do=[0,31,60,91,121,152,182,213,244,274,305,335],Bo=[0,31,59,90,120,151,181,212,243,273,304,334];function bl(u,f){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),f>>>=0,u=new Date(1e3*u),n()[f>>>2>>>0]=u.getSeconds(),n()[f+4>>>2>>>0]=u.getMinutes(),n()[f+8>>>2>>>0]=u.getHours(),n()[f+12>>>2>>>0]=u.getDate(),n()[f+16>>>2>>>0]=u.getMonth(),n()[f+20>>>2>>>0]=u.getFullYear()-1900,n()[f+24>>>2>>>0]=u.getDay();var b=(zo(u.getFullYear())?Do:Bo)[u.getMonth()]+u.getDate()-1|0;n()[f+28>>>2>>>0]=b,n()[f+36>>>2>>>0]=-60*u.getTimezoneOffset(),b=new Date(u.getFullYear(),6,1).getTimezoneOffset();var _=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(b!=_&&u.getTimezoneOffset()==Math.min(_,b)),n()[f+32>>>2>>>0]=u}function wl(u){u>>>=0;var f=new Date(n()[u+20>>>2>>>0]+1900,n()[u+16>>>2>>>0],n()[u+12>>>2>>>0],n()[u+8>>>2>>>0],n()[u+4>>>2>>>0],n()[u>>>2>>>0],0),b=n()[u+32>>>2>>>0],_=f.getTimezoneOffset(),I=new Date(f.getFullYear(),6,1).getTimezoneOffset(),E=new Date(f.getFullYear(),0,1).getTimezoneOffset(),R=Math.min(E,I);return 0>b?n()[u+32>>>2>>>0]=+(I!=E&&R==_):0<b!=(R==_)&&(I=Math.max(E,I),f.setTime(f.getTime()+6e4*((0<b?R:I)-_))),n()[u+24>>>2>>>0]=f.getDay(),b=(zo(f.getFullYear())?Do:Bo)[f.getMonth()]+f.getDate()-1|0,n()[u+28>>>2>>>0]=b,n()[u>>>2>>>0]=f.getSeconds(),n()[u+4>>>2>>>0]=f.getMinutes(),n()[u+8>>>2>>>0]=f.getHours(),n()[u+12>>>2>>>0]=f.getDate(),n()[u+16>>>2>>>0]=f.getMonth(),n()[u+20>>>2>>>0]=f.getYear(),u=f.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function Ro(u,f,b,_,I,E,R){return m?ve(16,1,u,f,b,_,I,E,R):-52}function Mo(u,f,b,_,I,E){if(m)return ve(17,1,u,f,b,_,I,E)}function vl(u,f,b,_){u>>>=0,f>>>=0,b>>>=0,_>>>=0;var I=new Date().getFullYear(),E=new Date(I,0,1),R=new Date(I,6,1);I=E.getTimezoneOffset();var N=R.getTimezoneOffset(),W=Math.max(I,N);o()[u>>>2>>>0]=60*W,n()[f>>>2>>>0]=+(I!=N),E=(u=Q=>Q.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(E),R=u(R),N<I?(Pt(E,b,17),Pt(R,_,17)):(Pt(E,_,17),Pt(R,b,17))}var nn=[],Uo=(u,f)=>{nn.length=0;for(var b;b=r()[u++>>>0];){var _=b!=105;f+=(_&=b!=112)&&f%8?4:0,nn.push(b==112?o()[f>>>2>>>0]:b==106?Z[f>>>3]:b==105?n()[f>>>2>>>0]:a()[f>>>3>>>0]),f+=_?8:4}return nn};function _l(u,f,b){return u>>>=0,f=Uo(f>>>0,b>>>0),Zr[u](...f)}function $l(u,f,b){return u>>>=0,f=Uo(f>>>0,b>>>0),Zr[u](...f)}var xl=()=>{},Sl=()=>Date.now();function Il(u,f){return U(Oe(u>>>0,f>>>0))}var Vo,Cl=()=>{throw ut+=1,"unwind"};function Tl(){return 4294901760}Vo=()=>performance.timeOrigin+performance.now();var Al=()=>navigator.hardwareConcurrency;function kl(){return xe("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function El(u){u>>>=0;var f=r().length;if(u<=f||4294901760<u)return!1;for(var b=1;4>=b;b*=2){var _=f*(1+.2/b);_=Math.min(_,u+100663296);var I=Math;_=Math.max(u,_);e:{I=(I.min.call(I,4294901760,_+(65536-_%65536)%65536)-j.buffer.byteLength+65535)/65536;try{j.grow(I),pe();var E=1;break e}catch{}E=void 0}if(E)return!0}return!1}var Zt=()=>(xe("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),_t={},No=u=>{u.forEach(f=>{var b=Zt();b&&(_t[b]=f)})};function Pl(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),No(u),_t.fb=Zt(),_t.qb=u,_t.fb}function Ol(u,f,b){if(u>>>=0,f>>>=0,_t.fb==u)var _=_t.qb;else(_=Error().stack.toString().split(`
`))[0]=="Error"&&_.shift(),No(_);for(var I=3;_[I]&&Zt()!=u;)++I;for(u=0;u<b&&_[u+I];++u)n()[f+4*u>>>2>>>0]=Zt();return u}var on,an={},Ho=()=>{if(!on){var u,f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:w||"./this.program"};for(u in an)an[u]===void 0?delete f[u]:f[u]=an[u];var b=[];for(u in f)b.push(`${u}=${f[u]}`);on=b}return on};function Wo(u,f){if(m)return ve(18,1,u,f);u>>>=0,f>>>=0;var b=0;return Ho().forEach((_,I)=>{var E=f+b;for(I=o()[u+4*I>>>2>>>0]=E,E=0;E<_.length;++E)t()[I++>>>0]=_.charCodeAt(E);t()[I>>>0]=0,b+=_.length+1}),0}function Lo(u,f){if(m)return ve(19,1,u,f);u>>>=0,f>>>=0;var b=Ho();o()[u>>>2>>>0]=b.length;var _=0;return b.forEach(I=>_+=I.length+1),o()[f>>>2>>>0]=_,0}function Go(u){return m?ve(20,1,u):52}function Fo(u,f,b,_){return m?ve(21,1,u,f,b,_):52}function qo(u,f,b,_){return m?ve(22,1,u,f,b,_):70}var zl=[null,[],[]];function Ko(u,f,b,_){if(m)return ve(23,1,u,f,b,_);f>>>=0,b>>>=0,_>>>=0;for(var I=0,E=0;E<b;E++){var R=o()[f>>>2>>>0],N=o()[f+4>>>2>>>0];f+=8;for(var W=0;W<N;W++){var Q=r()[R+W>>>0],de=zl[u];Q===0||Q===10?((u===1?O:U)(bo(de,0)),de.length=0):de.push(Q)}I+=N}return o()[_>>>2>>>0]=I,0}var Xt=u=>{try{u()}catch(f){xe(f)}},it=0,Ke=null,jo=0,Qt=[],Yo={},Zo={},Dl=0,sn=null,Bl=[];m||function(){for(var u=i.numThreads-1;u--;)fo();D.unshift(()=>{Ae++,function(f){m?f():Promise.all(ot.map(mo)).then(f)}(()=>kt())})}();var Rl=[Jr,uo,ho,wo,vo,_o,$o,xo,So,Io,Co,To,Ao,ko,Eo,Po,Ro,Mo,Wo,Lo,Go,Fo,qo,Ko],G=function(){function u(b,_){return G=b.exports,G=function(){var I=G,E={};for(let[R,N]of Object.entries(I))E[R]=typeof N=="function"?(...W)=>{Qt.push(R);try{return N(...W)}finally{ae||(Qt.pop(),Ke&&it===1&&Qt.length===0&&(it=0,ut+=1,Xt(ii),typeof Fibers<"u"&&Fibers.yb()))}}:N;return E}(),G=function(){var I=G,E=N=>()=>N()>>>0,R=N=>W=>N(W)>>>0;return(I=Object.assign({},I)).Da=E(I.Da),I.Ea=R(I.Ea),I.emscripten_main_runtime_thread_id=E(I.emscripten_main_runtime_thread_id),I.Qa=R(I.Qa),I.Ra=E(I.Ra),I}(),lo.push(G.Ga),K.unshift(G.$),oe=_,kt(),G}var f=ao();if(Ae++,i.instantiateWasm)try{return i.instantiateWasm(f,u)}catch(b){U(`Module.instantiateWasm callback failed with error: ${b}`),d(b)}return ke||=i.locateFile?et("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",S):S+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(b,_){var I=ke;return C||typeof WebAssembly.instantiateStreaming!="function"||et(I)||Et(I)||typeof fetch!="function"?io(I,b,_):fetch(I,{credentials:"same-origin"}).then(E=>WebAssembly.instantiateStreaming(E,b).then(_,function(R){return U(`wasm streaming compile failed: ${R}`),U("falling back to ArrayBuffer instantiation"),io(I,b,_)}))}(f,function(b){u(b.instance,b.module)}).catch(d),{}}();i._OrtInit=(u,f)=>(i._OrtInit=G.aa)(u,f),i._OrtGetLastError=(u,f)=>(i._OrtGetLastError=G.ba)(u,f),i._OrtCreateSessionOptions=(u,f,b,_,I,E,R,N,W,Q)=>(i._OrtCreateSessionOptions=G.ca)(u,f,b,_,I,E,R,N,W,Q),i._OrtAppendExecutionProvider=(u,f)=>(i._OrtAppendExecutionProvider=G.da)(u,f),i._OrtAddFreeDimensionOverride=(u,f,b)=>(i._OrtAddFreeDimensionOverride=G.ea)(u,f,b),i._OrtAddSessionConfigEntry=(u,f,b)=>(i._OrtAddSessionConfigEntry=G.fa)(u,f,b),i._OrtReleaseSessionOptions=u=>(i._OrtReleaseSessionOptions=G.ga)(u),i._OrtCreateSession=(u,f,b)=>(i._OrtCreateSession=G.ha)(u,f,b),i._OrtReleaseSession=u=>(i._OrtReleaseSession=G.ia)(u),i._OrtGetInputOutputCount=(u,f,b)=>(i._OrtGetInputOutputCount=G.ja)(u,f,b),i._OrtGetInputName=(u,f)=>(i._OrtGetInputName=G.ka)(u,f),i._OrtGetOutputName=(u,f)=>(i._OrtGetOutputName=G.la)(u,f),i._OrtFree=u=>(i._OrtFree=G.ma)(u),i._OrtCreateTensor=(u,f,b,_,I,E)=>(i._OrtCreateTensor=G.na)(u,f,b,_,I,E),i._OrtGetTensorData=(u,f,b,_,I)=>(i._OrtGetTensorData=G.oa)(u,f,b,_,I),i._OrtReleaseTensor=u=>(i._OrtReleaseTensor=G.pa)(u),i._OrtCreateRunOptions=(u,f,b,_)=>(i._OrtCreateRunOptions=G.qa)(u,f,b,_),i._OrtAddRunConfigEntry=(u,f,b)=>(i._OrtAddRunConfigEntry=G.ra)(u,f,b),i._OrtReleaseRunOptions=u=>(i._OrtReleaseRunOptions=G.sa)(u),i._OrtCreateBinding=u=>(i._OrtCreateBinding=G.ta)(u),i._OrtBindInput=(u,f,b)=>(i._OrtBindInput=G.ua)(u,f,b),i._OrtBindOutput=(u,f,b,_)=>(i._OrtBindOutput=G.va)(u,f,b,_),i._OrtClearBoundOutputs=u=>(i._OrtClearBoundOutputs=G.wa)(u),i._OrtReleaseBinding=u=>(i._OrtReleaseBinding=G.xa)(u),i._OrtRunWithBinding=(u,f,b,_,I)=>(i._OrtRunWithBinding=G.ya)(u,f,b,_,I),i._OrtRun=(u,f,b,_,I,E,R,N)=>(i._OrtRun=G.za)(u,f,b,_,I,E,R,N),i._OrtEndProfiling=u=>(i._OrtEndProfiling=G.Aa)(u),i._JsepOutput=(u,f,b)=>(i._JsepOutput=G.Ba)(u,f,b),i._JsepGetNodeName=u=>(i._JsepGetNodeName=G.Ca)(u);var Jt,$t=()=>($t=G.Da)(),Xo=i._malloc=u=>(Xo=i._malloc=G.Ea)(u),Qo=i._free=u=>(Qo=i._free=G.Fa)(u),un=(u,f,b,_,I,E)=>(un=G.Ia)(u,f,b,_,I,E),Jo=()=>(Jo=G.Ja)(),ei=(u,f,b,_,I)=>(ei=G.Ka)(u,f,b,_,I),dn=u=>(dn=G.La)(u),er=u=>(er=G.Ma)(u),ti=()=>(ti=G.Na)(),ri=(u,f)=>(ri=G.Oa)(u,f),tr=u=>(tr=G.Pa)(u),ln=u=>(ln=G.Qa)(u),cn=()=>(cn=G.Ra)(),ni=i.dynCall_ii=(u,f)=>(ni=i.dynCall_ii=G.Ta)(u,f),oi=u=>(oi=G.Ua)(u),ii=()=>(ii=G.Va)(),ai=u=>(ai=G.Wa)(u),si=()=>(si=G.Xa)();function ui(){0<Ae||(m?(s(i),m||jt(K),startWorker(i)):(jt(D),0<Ae||Jt||(Jt=!0,i.calledRun=!0,ae||(m||jt(K),s(i),m||jt(se)))))}return i.stackSave=()=>cn(),i.stackRestore=u=>tr(u),i.stackAlloc=u=>ln(u),i.UTF8ToString=Oe,i.stringToUTF8=Pt,i.lengthBytesUTF8=u=>{for(var f=0,b=0;b<u.length;++b){var _=u.charCodeAt(b);127>=_?f++:2047>=_?f+=2:55296<=_&&57343>=_?(f+=4,++b):f+=3}return f},Me=function u(){Jt||ui(),Jt||(Me=u)},ui(),l}),jl=Li;globalThis.self?.name==="em-pthread"&&Li()});var xt,Yl,Zl,Xl,qi,Ki,Ql,ji,Dt=B(()=>{"use strict";cr();xt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Yl=!1||typeof location>"u"?void 0:location.origin,Zl=(e,t)=>{try{let r=t??xt;return(r?new URL(e,r):new URL(e)).origin===Yl}catch{return!1}},Xl=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},qi=(Wi(),rr(Hi)).default,Ki=async()=>{if(!xt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Zl(xt))return[void 0,qi()];let e=await Xl(xt);return[e,qi(e)]},Ql=(Fi(),rr(Gi)).default,ji=async(e,t,r)=>[void 0,Ql]});var vn,_n,vr,Yi,Jl,ec,pr,_e,mt=B(()=>{"use strict";Dt();_n=!1,vr=!1,Yi=!1,Jl=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},ec=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},pr=async e=>{if(_n)return Promise.resolve();if(vr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Yi)throw new Error("previous call to 'initializeWebAssembly()' failed.");vr=!0;let t=e.initTimeout,r=e.numThreads;if(!ec())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Jl();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,d=s?.href??s,i=o?.wasm,l=i?.href??i,c=e.wasmBinary,[p,m]=await ji(d,a,r>1),g=!1,h=[];if(t>0&&h.push(new Promise(y=>{setTimeout(()=>{g=!0,y()},t)})),h.push(new Promise((y,$)=>{let v={numThreads:r};c?v.wasmBinary=c:(l||a)&&(v.locateFile=(w,x)=>l??(a??x)+w),m(v).then(w=>{vr=!1,_n=!0,vn=w,y(),p&&URL.revokeObjectURL(p)},w=>{vr=!1,Yi=!0,$(w)})})),await Promise.race(h),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},_e=()=>{if(_n&&vn)return vn;throw new Error("WebAssembly is not initialized yet.")}});var Ce,Rt,we,_r=B(()=>{"use strict";mt();Ce=(e,t)=>{let r=_e(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Rt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")Rt(a,s+".",r,n);else if(typeof a=="string"||typeof a=="number")n(s,a.toString());else if(typeof a=="boolean")n(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},we=e=>{let t=_e(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let o=t.HEAP32[n/4],a=t.HEAPU32[n/4+1],s=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}});var Zi,Xi=B(()=>{"use strict";mt();_r();Zi=e=>{let t=_e(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Ce(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),r===0&&we("Can't create run options."),e?.extra!==void 0&&Rt(e.extra,"",new WeakSet,(s,d)=>{let i=Ce(s,n),l=Ce(d,n);t._OrtAddRunConfigEntry(r,i,l)!==0&&we(`Can't set a run config entry: ${s} - ${d}.`)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),a}}});var tc,rc,nc,oc,Qi,Ji=B(()=>{"use strict";mt();_r();tc=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},rc=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},nc=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},oc=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let d=n?.deviceType;if(d){let i=Ce("deviceType",r),l=Ce(d,r);_e()._OrtAddSessionConfigEntry(e,i,l)!==0&&we(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let s=n;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let d=Ce("preferredLayout",r),i=Ce(s.preferredLayout,r);_e()._OrtAddSessionConfigEntry(e,d,i)!==0&&we(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Ce(o,r);_e()._OrtAppendExecutionProvider(e,a)!==0&&we(`Can't append execution provider: ${o}.`)}},Qi=e=>{let t=_e(),r=0,n=[],o=e||{};nc(o);try{let a=tc(o.graphOptimizationLevel??"all"),s=rc(o.executionMode??"sequential"),d=typeof o.logId=="string"?Ce(o.logId,n):0,i=o.logSeverityLevel??2;if(!Number.isInteger(i)||i<0||i>4)throw new Error(`log serverity level is not valid: ${i}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Ce(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,d,i,l,c),r===0&&we("Can't create session options."),o.executionProviders&&oc(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let p=Ce("enableGraphCapture",n),m=Ce(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,p,m)!==0&&we(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[p,m]of Object.entries(o.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let g=Ce(p,n);t._OrtAddFreeDimensionOverride(r,g,m)!==0&&we(`Can't set a free dimension override: ${p} - ${m}.`)}return o.extra!==void 0&&Rt(o.extra,"",new WeakSet,(p,m)=>{let g=Ce(p,n),h=Ce(m,n);t._OrtAddSessionConfigEntry(r,g,h)!==0&&we(`Can't set a session config entry: ${p} - ${m}.`)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(s=>t._free(s)),a}}});var $n,at,ft,$r,Mt,xr,xn,Y=B(()=>{"use strict";$n=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},at=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},ft=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return r>0?Math.ceil(n*r):void 0},$r=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Mt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},xr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool",xn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}});var Ut,Sn=B(()=>{"use strict";cr();Ut=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=mn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=mn("node:fs"),n=r(e),o=[];for await(let a of n)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(n)}catch(d){if(d instanceof RangeError){let i=Math.ceil(n/65536);a=new WebAssembly.Memory({initial:i,maximum:i}).buffer}else throw d}let s=0;for(;;){let{done:d,value:i}=await o.read();if(d)break;let l=i.byteLength;new Uint8Array(a,s,l).set(i),s+=l}return new Uint8Array(a,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var ic,ac,ea,ta,ra,sc,ge,rt=B(()=>{"use strict";Y();ic=["V","I","W","E","F"],ac=(e,t)=>{console.log(`[${ic[e]},${new Date().toISOString()}]${t}`)},ra=(e,t)=>{ea=e,ta=t},sc=(e,t)=>{let r=Mt(e),n=Mt(ea);r>=n&&ac(r,typeof t=="function"?t():t)},ge=(...e)=>{ta&&sc(...e)}});var na,oa=B(()=>{"use strict";Y();na=(e,t)=>new($r(t))(e)});var Sr=B(()=>{"use strict"});var ia,In,Cn,uc,dc,aa,An,Tn,ua,da=B(()=>{"use strict";rt();Sr();ia=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),In=[],Cn=e=>Math.ceil(e/16)*16,uc=e=>{for(let t=0;t<In.length;t++){let r=In[t];if(e<=r)return r}return Math.ceil(e/16)*16},dc=1,aa=()=>dc++,An=async(e,t,r,n)=>{let o=Cn(r),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let d=a.getMappedRange();if(n){let i=n();return i.set(new Uint8Array(d,0,r)),i}else return new Uint8Array(d.slice(0,r))}finally{a.destroy()}},Tn=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[r]of ia)In.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[])}upload(t,r){let n=r.buffer,o=r.byteOffset,a=r.byteLength,s=Cn(a),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(d.originalSize!==a)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${a}`);let i=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=i.getMappedRange();new Uint8Array(l).set(new Uint8Array(n,o,a)),i.unmap();let c=this.backend.getCommandEncoder();this.backend.endComputePass(),c.copyBufferToBuffer(i,0,d.gpuData.buffer,0,s),ge("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(i)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Cn(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,r,n){let o;if(n){if(o=this.externalBuffers.get(n),o===void 0)throw new Error("previous buffer is not registered");if(t===n)return ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(n)}else o=aa();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),this.externalBuffers.set(t,o),ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){let r=this.externalBuffers.get(t);r!==void 0&&(this.storageCache.delete(r),this.externalBuffers.delete(t),ge("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${r}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=uc(t),o,a=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let l=(a?this.freeBuffers:this.freeUniformBuffers).get(n);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let d={id:aa(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:t}),ge("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=this.storageCache.get(t);if(!r)throw new Error("releasing data does not exist");return ge("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("data does not exist");await An(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=ia.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t))}},ua=(...e)=>new Tn(...e)});var kn,J,$e=B(()=>{"use strict";kn=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new kn(e)});var En,je,A,ht,Ir,Cr,Tr,ee=B(()=>{"use strict";En=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},je=class{static calcShape(t,r,n=!1){let o=t.length,a=r.length;if(o===0)return r;if(a===0)return t;let s=Math.max(t.length,r.length),d=new Array(s);if(n){if(o<2||a<2)return;let i=En.calcMatMulShape([t[o-2],t[o-1]],[r[a-2],r[a-1]]);if(i===void 0)return;[d[s-2],d[s-1]]=i}for(let i=n?3:1;i<=s;i++){let l=o-i<0?1:t[o-i],c=a-i<0?1:r[a-i];if(l!==c&&l>1&&c>1)return;let p=Math.max(l,c);if(l&&c)d[s-i]=Math.max(l,c);else{if(p>1)return;d[s-i]=0}}return d}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let a=1;a<=n;a++)if(t[n-a]!==1&&t[n-a]!==r[o-a])return!1;return!0}},A=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),a=n-1;for(;a>=0;){if(t[a]%r===0){o[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,r/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let a=r;a<n;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[a]}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,a)=>o+r[a]+r[a+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},ht=class e{static adjustPoolAttributes(t,r,n,o,a,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<r.length-2;d++)d>=n.length?n.push(r[d+2]):n[d]=r[d+2];for(let d=0;d<n.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<n.length;d++)if(d<a.length){if(a[d]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let d=0;d<n.length*2;d++)if(d<s.length){if(s[d]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let d=0;d<n.length;d++){if(n[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[d]>=n[d]||s[d+n.length]>=n[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,a,s,d){if(d){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let i=0;i<t.length-2;i++)e.adjustPadAndReturnShape(t[i+(s?1:2)],r[i],n[i],o[i],a,i,i+t.length-2,d)}}static computePoolOutputShape(t,r,n,o,a,s,d){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let i=[r[0],r[1]];return e.computeShapeHelper(t,r,i,n,o,a,s,d),i}static computeConvOutputShape(t,r,n,o,a,s,d){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let i=[t[0],r[0]];return e.computeShapeHelper(!1,t,i,n,o,a,s,d),i}static computeShapeHelper(t,r,n,o,a,s,d,i){if(t)for(let l=0;l<r.length-2;l++)n.push(1);else for(let l=0;l<r.length-2;l++)n.push(e.adjustPadAndReturnShape(r[l+2],o[l],a[l],s[l],d,l,l+r.length-2,i))}static adjustPadAndReturnShape(t,r,n,o,a,s,d,i){let l=n*(o-1)+1;if(i&&i!=="NOTSET")switch(i){case"VALID":return a[s]=0,a[d]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+r-1)/r-1)*r+o-t;return a[s]=Math.floor(i==="SAME_LOWER"?(p+1)/2:p/2),a[d]=p-a[s],Math.floor((t+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[d]-l)/r+1)}},Ir=class{static getShapeOfGemmResult(t,r,n,o,a){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,d,i;r?(s=t[1],d=t[0]):(s=t[0],d=t[1]);let l=-1;if(o?(i=n[0],l=1):(i=n[1],l=0),n[l]!==d)throw new Error("dimension mismatch");if(s<=0||i<=0||d<=0)throw new Error("invalid shape specified");if(a&&!je.isValidBroadcast(a,[s,i]))throw new Error("gemm: invalid bias shape for broadcast");return[s,i,d]}},Cr=-34028234663852886e22,Tr=34028234663852886e22});var gt,On,ce,Ee,M,fe,st,yt,Fe,H,zn,k,z,Ar,Pn,la,It,re=B(()=>{"use strict";Y();ee();gt=64,On=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${e}`)}},ce=(e,t=1)=>{let r=On(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=On(e,t);return typeof r=="string"?r:r[1]},M=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:A.computeStrides(r)})}),t},fe=e=>e%4===0?4:e%2===0?2:1,st=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,yt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Fe=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,H=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,zn=(e,t,r,n,o)=>{let a=typeof r=="number",s=a?r:r.length,d=[...new Array(s).keys()],i=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=On(t,o),c=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],m={indices:i,value:c,storage:p,tensor:t},g=D=>typeof D=="string"?D:`${D}u`,h={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=a?"uniforms.":"",$=`${y}${e}_shape`,v=`${y}${e}_strides`,w="";for(let D=0;D<s-1;D++)w+=`
    let dim${D} = current / ${H(v,D,s)};
    let rest${D} = current % ${H(v,D,s)};
    indices[${D}] = dim${D};
    current = rest${D};
    `;w+=`indices[${s-1}] = current;`;let x=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${w}
    return indices;
  }`,S=D=>(h.offsetToIndices=!0,s<2?D:`o2i_${e}(${D})`),C=[];if(s>=2)for(let D=s-1;D>=0;D--)C.push(`${H(v,D,s)} * (indices[${D}])`);let T=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=D=>(h.indicesToOffset=!0,s<2?D:`i2o_${e}(${D})`),O=(...D)=>s===0?"0u":`${m.indices}(${D.map(g).join(",")})`,U=(D,K)=>s<2?`${D}`:`${H(D,K,s)}`,V=(D,K,se)=>s<2?`${D}=${se};`:`${H(D,K,s)}=${se};`,q={},j=(D,K)=>{h.broadcastedIndicesToOffset=!0;let se=`${K.name}broadcastedIndicesTo${e}Offset`;if(se in q)return`${se}(${D})`;let Ae=[];for(let be=s-1;be>=0;be--){let Me=K.indicesGet("outputIndices",be+K.rank-s);Ae.push(`${U(v,be)} * (${Me} % ${U($,be)})`)}return q[se]=`fn ${se}(outputIndices: ${K.type.indices}) -> u32 {
             return ${Ae.length>0?Ae.join("+"):"0u"};
           }`,`${se}(${D})`},oe=(D,K)=>(()=>{if(m.storage===m.value)return`${e}[${D}]=${K};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${D}]=vec2<u32>(u32(${K}), select(0u, 0xFFFFFFFFu, ${K} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${D}]=vec2<u32>(u32(${K}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${D}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${K}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ne=D=>(()=>{if(m.storage===m.value)return`${e}[${D}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${D}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${D}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${D}] & 0xFFu), bool(${e}[${D}] & 0xFF00u), bool(${e}[${D}] & 0xFF0000u), bool(${e}[${D}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ue=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${c} {
    return ${ne(`i2o_${e}(indices)`)};
  }`,L=s<2?"":(()=>{let D=d.map(se=>`d${se}: u32`).join(", "),K=d.map(se=>`d${se}`).join(", ");return`
  fn get_${e}(${D}) -> ${c} {
    return get_${e}ByIndices(${O(K)});
  }`})(),ye=(...D)=>{if(D.length!==s)throw new Error(`indices length must be ${s}`);let K=D.map(g).join(",");return s===0?ne("0u"):s===1?ne(K[0]):(h.get=!0,h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}(${K})`)},ie=D=>s<2?ne(D):(h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}ByIndices(${D})`),X=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${c}) {
    ${oe(`i2o_${e}(indices)`,"value")}
  }`,Z=s<2?"":(()=>{let D=d.map(se=>`d${se}: u32`).join(", "),K=d.map(se=>`d${se}`).join(", ");return`
  fn set_${e}(${D}, value: ${c}) {
    set_${e}ByIndices(${O(K)}, value);
  }`})();return{impl:()=>{let D=[],K=!1;return h.offsetToIndices&&(D.push(x),K=!0),h.indicesToOffset&&(D.push(T),K=!0),h.broadcastedIndicesToOffset&&(Object.values(q).forEach(se=>D.push(se)),K=!0),h.set&&(D.push(Z),K=!0),h.setByIndices&&(D.push(X),K=!0),h.get&&(D.push(L),K=!0),h.getByIndices&&(D.push(ue),K=!0),!a&&K&&D.unshift(`const ${$} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${A.computeStrides(r).join(",")});`),D.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:P,broadcastedIndicesToOffset:j,indices:O,indicesGet:U,indicesSet:V,set:(...D)=>{if(D.length!==s+1)throw new Error(`indices length must be ${s}`);let K=D[s];if(typeof K!="string")throw new Error("value must be string");let se=D.slice(0,s).map(g).join(",");return s===0?oe("0u",K):s===1?oe(se[0],K):(h.set=!0,h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}(${se}, ${K})`)},setByOffset:oe,setByIndices:(D,K)=>s<2?oe(D,K):(h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}ByIndices(${D}, ${K});`),get:ye,getByOffset:ne,getByIndices:ie,usage:n,name:e,strides:v,shape:$,rank:s}},k=(e,t,r,n=1)=>zn(e,t,r,"input",n),z=(e,t,r,n=1)=>zn(e,t,r,"output",n),Ar=(e,t,r,n=1)=>zn(e,t,r,"internal",n),Pn=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=gt){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=a?"let global_idx = global_id.x; let local_idx = local_id.x;":`let global_idx = (workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
          workgroup_id.y * num_workgroups[0] + workgroup_id.x) * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${s}) {
    ${d}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},la=(e,t)=>new Pn(e,t),It=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;o++){let a=r-1-o,s=e[a]||1;(t[t.length-1-o]||1)>1&&s===1&&n.unshift(a)}return n}});var lc,ca,cc,pc,Be,pa,ma,bt=B(()=>{"use strict";Y();ee();$e();re();lc=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ca=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,cc=(e,t)=>A.sortBasedOnPerm(e,ca(e.length,t)),pc=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)o.push(r.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},Be=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ca(n,t),a=cc(e.dims,o),s=z("output",r,a.length),d=k("a",r,n),i;if(o.length===2&&o[0]===1&&o[1]===0){let l=s.type.value,c=[16,16,1];i=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(d,s)}
  var<workgroup> tile : array<array<${l}, ${c[0]+1}>, ${c[0]}>;
  ${p.mainStart(c)}
    var x = workgroup_id.x * ${c[0]}u + local_id.x;
    var y = workgroup_id.y * ${c[0]}u + local_id.y;
    let width = uniforms.output_shape[0];
    let height = uniforms.output_shape[1];
    if (x < width && y < height) {
      tile[local_id.y][local_id.x] = ${d.getByOffset("y * width + x")};
    }
    workgroupBarrier();
    x = workgroup_id.y * ${c[0]}u + local_id.x;
    y = workgroup_id.x * ${c[0]}u + local_id.y;
    if (x < height && y < width) {
      ${s.setByOffset("y * height + x","tile[local_id.x][local_id.y]")}
    }
  }`}else i=l=>`
  ${l.registerUniform("output_size","u32").declareVariables(d,s)}

  ${pc(o,n,d,s)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${s.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${s.setByOffset("global_idx",d.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:l=>{let c=A.size(a);return{outputs:[{dims:a,dataType:l[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...M(l[0].dims,a)]}},getShaderSource:i}},pa=(e,t)=>{lc(e.inputs),e.compute(Be(e.inputs[0],t.perm))},ma=e=>J({perm:e.perm})});var mc,fc,hc,gc,yc,bc,wc,vc,_c,$c,Ye,fa,ha,ga,ya,ba,wa,va,_a,$a,xa,Sa=B(()=>{"use strict";Y();ee();re();kr();bt();mc={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},fc={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},hc={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},gc={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},yc=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},bc=(e,t)=>{let r=[],n=e.length;for(let a=0;a<n;a++)t.indexOf(a)===-1&&r.push(e[a]);let o=t.map(a=>e[a]);return[r,o]},wc=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?n.push(e[o++]):n.push(1);return n},vc=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},_c=(e,t)=>{let r=[];if(!vc(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},$c=(e,t,r,n,o,a,s)=>{let d=r[0].dims,i=A.size(a),l=A.size(s),c=k("_A",r[0].dataType,d),p=z("output",o,a),m=32,g=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `;return{name:e,shaderCache:t,getShaderSource:y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${hc[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${mc[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${fc[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${n==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${gc[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:i},programUniforms:[{type:12,data:l}]})}},Ye=(e,t,r,n)=>{let o=e.inputs.length===1?r:Dn(e.inputs,r),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,h)=>h));let s=A.normalizeAxes(a,e.inputs[0].dims.length),d=s,i=e.inputs[0],l=_c(d,e.inputs[0].dims.length);l.length>0&&(i=e.compute(Be(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],d=yc(d.length,i.dims.length));let[c,p]=bc(i.dims,d),m=c;o.keepDims&&(m=wc(c,s)),e.compute($c(t,{hint:o.cacheKey,inputDependencies:["type"]},[i],n,e.inputs[0].dataType,m,p),{inputs:[i]})},fa=(e,t)=>{Ye(e,"ReduceMeanShared",t,"mean")},ha=(e,t)=>{Ye(e,"ReduceL1Shared",t,"l1")},ga=(e,t)=>{Ye(e,"ReduceL2Shared",t,"l2")},ya=(e,t)=>{Ye(e,"ReduceLogSumExpShared",t,"logSumExp")},ba=(e,t)=>{Ye(e,"ReduceMaxShared",t,"max")},wa=(e,t)=>{Ye(e,"ReduceMinShared",t,"min")},va=(e,t)=>{Ye(e,"ReduceProdShared",t,"prod")},_a=(e,t)=>{Ye(e,"ReduceSumShared",t,"sum")},$a=(e,t)=>{Ye(e,"ReduceSumSquareShared",t,"sumSquare")},xa=(e,t)=>{Ye(e,"ReduceLogSumShared",t,"logSum")}});var Ze,xc,Er,Dn,Xe,Sc,Ic,Cc,Tc,Ac,kc,Ec,Pc,Oc,zc,Qe,Ia,Ca,Ta,Aa,ka,Ea,Pa,Oa,za,Da,kr=B(()=>{"use strict";Y();ee();$e();re();Sa();Ze=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},xc=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Er=(e,t,r,n,o,a,s=!1,d=!1)=>{let i=[],l=r[0].dims,c=l.length,p=A.normalizeAxes(o,c),m=!d&&p.length===0;l.forEach(($,v)=>{m||p.indexOf(v)>=0?s&&i.push(1):i.push($)});let g=i.length,h=A.size(i);return{name:e,shaderCache:t,getShaderSource:$=>{let v=[],w=k("_A",r[0].dataType,c),x=z("output",a,g),S=n(w,x,p),C=S[2];for(let T=0,P=0;T<c;T++)m||p.indexOf(T)>=0?(s&&P++,C=`for(var j${T}: u32 = 0; j${T} < ${l[T]}; j${T}++) {
                  ${S[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${w.indicesSet("input_indices",T,`j${T}`)}
                  ${C}
                }`):(v.push(`${w.indicesSet("input_indices",T,x.indicesGet("output_indices",P))};`),P++);return`

        ${$.registerUniform("output_size","u32").declareVariables(w,x)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${C}
          ${S[3]}
          ${S.length===4?x.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...M(l,i)]})}},Dn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Xe=(e,t,r,n)=>{let o=e.inputs,a=o.length===1?r:Dn(o,r);e.compute(Er(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?xc:n,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Sc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},Ic=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Cc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Tc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Ac=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceMax",t,(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(n.indicesSet("input_indices",d,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},kc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceMean",t,(n,o,a)=>{let s=1;for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&(s*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Ec=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceMin",t,(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Pc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Oc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},zc=(e,t)=>{Ze(e.inputs),Xe(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Qe=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?n*=e[a]:o*=e[a];return o<32&&n>1024},Ia=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?kc(e,t):fa(e,t)},Ca=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ic(e,t):ha(e,t)},Ta=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cc(e,t):ga(e,t)},Aa=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tc(e,t):ya(e,t)},ka=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ac(e,t):ba(e,t)},Ea=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ec(e,t):wa(e,t)},Pa=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Pc(e,t):va(e,t)},Oa=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Oc(e,t):_a(e,t)},za=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zc(e,t):$a(e,t)},Da=(e,t)=>{Qe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sc(e,t):xa(e,t)}});var Ba,Ra,Ma,Bn,Ua=B(()=>{"use strict";Y();$e();kr();Ba=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Ra=(e,t)=>{Ba(e.inputs);let r=(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Er("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ma=(e,t)=>{Ba(e.inputs);let r=(n,o,a)=>{let s=[];for(let d=0;d<n.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Er("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Bn=e=>J(e)});var Dc,Bc,Rc,Mc,Ct,Uc,Va,Pr=B(()=>{"use strict";Y();ee();Sr();re();Dc=(e,t)=>{let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4],d=e[5];if(s&&d)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let i=r.dims[0],l=r.dims[1],c=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=o.dims[0]/3,m=p,g=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let h=l;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==p+m+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(s){if(m!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==i)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=s.dims[3])}let $=h+y,v=-1,w=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==i||d.dims[1]!==t.numHeads||d.dims[2]!==l||d.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:i,sequenceLength:l,pastSequenceLength:y,kvSequenceLength:h,totalSequenceLength:$,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Bc=(e,t,r)=>{let n=fe(r),o=64,a=r/n;a<o&&(o=32);let s=Math.ceil(r/n/o),d=[{type:1,data:1/r},{type:12,data:a},{type:12,data:s}],i=ce(e.dataType,n),l=Ee(1,n),c=["type"],p=m=>{let g=z("x",e.dataType,e.dims,n),h=Ee(e.dataType),y=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${m.registerUniforms(y).declareVariables(g)}
  ${m.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${l}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${l}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(n){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${l}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${l}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(n){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${n}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${g.type.value}(${h}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${l}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${i};${n}`,inputDependencies:c},getShaderSource:p,getRunData:()=>({outputs:[],dispatchGroup:{x:t},programUniforms:d})}},Rc=(e,t,r,n,o,a,s,d)=>{let i=d+a.kvSequenceLength,l=[a.batchSize,a.numHeads,a.sequenceLength,i],c=a.kvNumHeads===void 0&&e>1&&n,p=c?[a.batchSize,a.numHeads,i,a.headSize]:void 0,m=s.scale===0?1/Math.sqrt(a.headSize):s.scale,g=fe(a.headSize),h=a.headSize/g,y=12,$={x:Math.ceil(i/y),y:Math.ceil(a.sequenceLength/y),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:h},{type:12,data:i},{type:12,data:a.numHeads},{type:1,data:m},{type:12,data:d},{type:12,data:a.kvSequenceLength}],w=c&&n&&A.size(n.dims)>0,x=["type","type"];w&&x.push("type"),o&&x.push("type");let S=[{dims:l,dataType:t.dataType,gpuDataType:0}];c&&S.push({dims:p,dataType:t.dataType,gpuDataType:0});let C=T=>{let P=k("q",t.dataType,t.dims,g),O=k("key",r.dataType,r.dims,g),U=[P,O];if(w){let ne=k("past_key",n.dataType,n.dims,g);U.push(ne)}o&&U.push(k("attention_bias",o.dataType,o.dims));let V=z("output",t.dataType,l),q=[V];c&&q.push(z("present_key",t.dataType,p,g));let j=Ee(1,g),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${P.type.storage}, ${y*y}>;
  ${T.registerUniforms(oe).declareVariables(...U,...q)}
  ${T.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>w&&c?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${c?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${j}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>w&&c?`
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
        value += ${j}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${V.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${g};${o!==void 0};${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:S,dispatchGroup:$,programUniforms:v}),getShaderSource:C}},Mc=(e,t,r,n,o,a)=>{let s=a+o.kvSequenceLength,d=o.nReps?o.nReps:1,i=o.vHiddenSize*d,l=o.kvNumHeads==null&&e>1&&n,c=l?[o.batchSize,o.numHeads,s,o.headSize]:void 0,p=[o.batchSize,o.sequenceLength,i],m=12,g={x:Math.ceil(o.vHeadSize/m),y:Math.ceil(o.sequenceLength/m),z:o.batchSize*o.numHeads},h=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:i},{type:12,data:a},{type:12,data:o.kvSequenceLength}],y=l&&n&&A.size(n.dims)>0,$=["type","type"];y&&$.push("type");let v=[{dims:p,dataType:t.dataType,gpuDataType:0}];l&&v.push({dims:c,dataType:t.dataType,gpuDataType:0});let w=x=>{let S=k("probs",t.dataType,t.dims),C=k("v",r.dataType,r.dims),T=[S,C];y&&T.push(k("past_value",n.dataType,n.dims));let O=[z("output",t.dataType,p)];l&&O.push(z("present_value",t.dataType,c));let U=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${m}u;
  var<workgroup> tileQ: array<${S.type.value}, ${m*m}>;
  var<workgroup> tileK: array<${S.type.value}, ${m*m}>;
  ${x.registerUniforms(U).declareVariables(...T,...O)}
  ${x.mainStart([m,m,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>y&&l?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${l?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${S.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>y&&l?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:$},getRunData:()=>({outputs:v,dispatchGroup:g,programUniforms:h}),getShaderSource:w}},Ct=(e,t,r,n,o,a,s,d,i,l,c)=>{let p=Math.min(e.outputCount,1+(s?1:0)+(d?1:0)),m=l.kvNumHeads!==void 0||p>1?l.pastSequenceLength:0,g=m+l.kvSequenceLength,h=i&&A.size(i.dims)>0?i:void 0,y=[t,r];l.kvNumHeads===void 0&&p>1&&s&&A.size(s.dims)>0&&y.push(s),h&&y.push(h);let $=e.compute(Rc(p,t,r,s,h,l,c,m),{inputs:y,outputs:l.kvNumHeads===void 0&&p>1?[-1,1]:[-1]})[0];e.compute(Bc($,l.batchSize*l.numHeads*l.sequenceLength,g),{inputs:[$],outputs:[]});let v=[$,n];l.kvNumHeads===void 0&&p>1&&d&&A.size(d.dims)>0&&v.push(d),e.compute(Mc(p,$,n,d,l,m),{inputs:v,outputs:l.kvNumHeads===void 0&&p>1?[0,2]:[0]})},Uc=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,d={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},i=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:n},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let m=z("output_q",i[0].dataType,r),g=z("output_k",i[0].dataType,r),h=z("output_v",i[0].dataType,r),y=k("input",i[0].dataType,i[0].dims),$=k("weight",i[1].dataType,i[1].dims),v=k("bias",i[2].dataType,i[2].dims),w=y.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${p.registerUniforms(x).declareVariables(y,$,v,m,g,h)}
  ${p.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:l}),getShaderSource:c},{inputs:i,outputs:[-1,-1,-1]})},Va=(e,t)=>{let r=Dc(e.inputs,t),[n,o,a]=Uc(e,r);return Ct(e,n,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}});var Vc,Nc,Hc,Na,Ha=B(()=>{"use strict";Le();Y();ee();$e();re();Vc=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,a)=>{let s=o.length;if(s!==n.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((d,i)=>{if(d!==n[i])throw new Error(`${a}: dim[${i}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Nc=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,a=e[0].dims,s=n?fe(a[a.length-1]):1,d=o==="NHWC"&&a.length>1?s:1,i=A.size(a)/s,l=n,c=l?a.length:a,p=k("x",e[0].dataType,e[0].dims,s),m=k("scale",e[1].dataType,e[1].dims,d),g=k("bias",e[2].dataType,e[2].dims,d),h=k("inputMean",e[3].dataType,e[3].dims,d),y=k("inputVar",e[4].dataType,e[4].dims,d),$=z("y",e[0].dataType,c,s),v=()=>{let x="";if(n)x=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${$.indicesSet("outputIndices","0","0")}
            let cOffset = ${$.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let S=1;S<m.rank;S++)x+=`cIndices[${S}] = outputIndices[${S}];`;x+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return x},w=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(p,m,g,h,y,$)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${$.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${$.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l?[{type:12,data:i},...M(a)]:[{type:12,data:i}]})}},Hc=e=>J(e),Na=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Hc({...t,outputCount:n});if(me.webgpu.validateInputContent&&Vc(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Nc(r,o))}});var Wc,Lc,Wa,La=B(()=>{"use strict";ee();re();Wc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Lc=e=>{let t=e[0].dims,r=e[0].dims[2],n=A.size(t)/4,o=e[0].dataType,a=k("input",o,t,4),s=k("bias",o,[r],4),d=k("residual",o,t,4),i=z("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(a,s,d,i)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${i.setByOffset("global_idx","value")}
  }`}},Wa=e=>{Wc(e.inputs),e.compute(Lc(e.inputs))}});var Gc,le,Ga,Fa,qa,Ka,ja,Ya,Za,Xa,Qa,Fc,Ja,es,ts,rs,Vt,ns,Or,os,is,as,ss,us,ds,ls,cs,ps,ms,fs,hs,gs,ys,bs,ws,vs,_s,Rn,Mn,$s,xs,Ss,qc,Kc,Is,zr=B(()=>{"use strict";Y();ee();$e();re();Gc=(e,t,r,n,o,a)=>{let s=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let i=k("inputData",r,[s],4),l=z("outputData",n,[s],4);return`
      ${e.registerUniform("vec_size","u32").declareVariables(i,l)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${i.getByOffset("global_idx")};
    ${l.setByOffset("global_idx",d)}
  }`},le=(e,t,r,n,o,a=e.dataType)=>({name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:s=>Gc(s,A.size(e.dims),e.dataType,a,r,n),getRunData:s=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(A.size(s[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(e.dims)/4)}]})}),Ga=e=>{e.compute(le(e.inputs[0],"Abs","abs"))},Fa=e=>{e.compute(le(e.inputs[0],"Acos","acos"))},qa=e=>{e.compute(le(e.inputs[0],"Acosh","acosh"))},Ka=e=>{e.compute(le(e.inputs[0],"Asin","asin"))},ja=e=>{e.compute(le(e.inputs[0],"Asinh","asinh"))},Ya=e=>{e.compute(le(e.inputs[0],"Atan","atan"))},Za=e=>{e.compute(le(e.inputs[0],"Atanh","atanh"))},Xa=e=>J(e),Qa=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(le(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Fc=e=>{let t=e.length>=2&&e[1].data!==0?e[1].getFloat32Array()[0]:Cr,r=e.length>=3&&e[2].data!==0?e[2].getFloat32Array()[0]:Tr;return J({min:t,max:r})},Ja=(e,t)=>{let r=e.inputs.length===1?t:Fc(e.inputs),n=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"Clip",o=>`clamp(${o}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${n}> = vec4(${n}(${r.min}));
    const clip_max_: vec4<${n}> = vec4(${n}(${r.max}));
`,r.cacheKey),{inputs:[0]})},es=e=>{e.compute(le(e.inputs[0],"Ceil","ceil"))},ts=e=>{e.compute(le(e.inputs[0],"Cos","cos"))},rs=e=>{e.compute(le(e.inputs[0],"Cosh","cosh"))},Vt=e=>J(e),ns=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Or=(e="f32")=>`
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
}`,os=e=>{let t=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Or(t)))},is=e=>{e.compute(le(e.inputs[0],"Exp","exp"))},as=e=>{e.compute(le(e.inputs[0],"Floor","floor"))},ss=e=>{let t=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Or(t)))},us=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},ds=e=>{e.compute(le(e.inputs[0],"Not",t=>`!${t}`))},ls=e=>{e.compute(le(e.inputs[0],"Neg",t=>`-${t}`))},cs=e=>{e.compute(le(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ps=e=>{let t=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ms=e=>{e.compute(le(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},fs=e=>J(e),hs=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},gs=e=>{e.compute(le(e.inputs[0],"Sin","sin"))},ys=e=>{e.compute(le(e.inputs[0],"Sinh","sinh"))},bs=e=>{e.compute(le(e.inputs[0],"Sqrt","sqrt"))},ws=e=>{e.compute(le(e.inputs[0],"Tan","tan"))},vs=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,_s=e=>{e.compute(le(e.inputs[0],"Tanh",vs))},Rn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${vs("v")};
}
`,Mn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,$s=e=>{let t=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"FastGelu",Mn,Rn(t),void 0,e.inputs[0].dataType))},xs=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(le(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Ss=e=>{e.compute(le(e.inputs[0],"Log","log"))},qc=(e,t)=>`
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
`,Kc=e=>`quick_gelu_impl(${e})`,Is=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(le(e.inputs[0],"QuickGelu",Kc,qc(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var jc,Yc,Ts,As=B(()=>{"use strict";ee();re();zr();jc=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Yc=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=k("input",e[0].dataType,e[0].dims,4),n=k("bias",e[0].dataType,[e[0].dims[2]],4),o=z("output",e[0].dataType,t,4),a=A.size(t)/4,s=ce(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:i=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${i.declareVariables(r,n,o)}

  ${Or(s)}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ts=e=>{jc(e.inputs),e.compute(Yc(e.inputs))}});var Zc,Xc,Je,ks,Es,Ps,Os,zs,Ds,Bs,Rs,Ms,Us,Vs=B(()=>{"use strict";Y();ee();re();Zc=(e,t,r,n,o,a,s,d,i,l,c,p)=>{let m,g;typeof d=="string"?m=g=(w,x)=>`${d}((${w}),(${x}))`:typeof d=="function"?m=g=d:(m=d.scalar,g=d.vector);let h=z("outputData",c,n.length,4),y=k("aData",i,t.length,4),$=k("bData",l,r.length,4),v;if(o)if(a){let w=A.size(t)===1,x=A.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;w||x?v=h.setByOffset("global_idx",g(w?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),x?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"))):v=`
            let outputIndices = ${h.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",h)};
            let offsetB = ${$.broadcastedIndicesToOffset("outputIndices",h)};
            ${h.setByOffset("global_idx",g(s||S?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||C?$.getByOffset("offsetB / 4u"):`${$.type.value}(${$.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=h.setByOffset("global_idx",g(y.getByOffset("global_idx"),$.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(x,S,C="")=>{let T=`aData[indexA${S}][componentA${S}]`,P=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${h.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${y.broadcastedIndicesToOffset(`outputIndices${S}`,h)};
            let offsetB${S} = ${$.broadcastedIndicesToOffset(`outputIndices${S}`,h)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${x}[${S}] = ${C}(${m(T,P)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(y,$,h)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Xc=(e,t,r,n,o,a,s=r.dataType)=>{let d=!A.areEqual(r.dims,n.dims),i=r.dims,l=A.size(r.dims),c=!1,p=!1,m=[d];if(d){let g=je.calcShape(r.dims,n.dims,!1);if(!g)throw new Error("Can't perform binary op on the given tensors");i=g,l=A.size(i);let h=A.size(r.dims)===1,y=A.size(n.dims)===1,$=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,v=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;m.push(h),m.push(y),m.push($),m.push(v);let w=1;for(let x=1;x<i.length;x++){let S=r.dims[r.dims.length-x]??1,C=n.dims[n.dims.length-x]??1;if(S===C)w*=S;else break}w%4===0?(p=!0,c=!0):(h||y||$||v)&&(c=!0)}else c=!0;return m.push(c),{name:e,shaderCache:{hint:t+m.map(g=>g.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:g=>Zc(g,r.dims,n.dims,i,c,d,p,o,r.dataType,n.dataType,s,a),getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(i)/4)},...M(r.dims,n.dims,i)]})}},Je=(e,t,r,n,o,a)=>{e.compute(Xc(t,o??"",e.inputs[0],e.inputs[1],r,n,a))},ks=e=>{Je(e,"Add",(t,r)=>`${t}+${r}`)},Es=e=>{Je(e,"Div",(t,r)=>`${t}/${r}`)},Ps=e=>{Je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Os=e=>{Je(e,"Mul",(t,r)=>`${t}*${r}`)},zs=e=>{let t=k("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Je(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Ds=e=>{Je(e,"Sub",(t,r)=>`${t}-${r}`)},Bs=e=>{Je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Rs=e=>{Je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Ms=e=>{Je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Us=e=>{Je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Jc,ep,tp,rp,Ns,Hs,Ws=B(()=>{"use strict";Y();ee();$e();re();Jc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,a=n.dims.length;e.forEach((s,d)=>{if(d!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((i,l)=>{if(l!==t&&i!==n.dims[l])throw new Error("non concat dimensions must match")})}})},ep=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,tp=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(a):o===0?n.push(`if (inputIndex == ${o}u) { ${a} }`):o===r-1?n.push(`else { ${a} }`):n.push(`else if (inputIndex == ${o}) { ${a} }`)}return n.join(`
`)},rp=(e,t,r,n)=>{let o=A.size(r),a=new Array(e.length),s=new Array(e.length),d=0,i=[],l=[],c=[{type:12,data:o}];for(let y=0;y<e.length;++y)d+=e[y].dims[t],a[y]=d,l.push(e[y].dims.length),s[y]=k(`input${y}`,n,l[y]),i.push("rank"),c.push({type:12,data:a[y]});for(let y=0;y<e.length;++y)c.push(...M(e[y].dims));c.push(...M(r));let p=z("output",n,r.length),m=p.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),h=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let $=0;$<e.length;$++)y.registerUniform(`sizeInConcatAxis${$}`,"u32");return y.declareVariables(...s,p)})()}

  ${ep(a.length,g)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${tp(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:h}},Ns=(e,t)=>{let r=e.inputs,n=r[0].dims,o=A.normalizeAxis(t.axis,n.length);Jc(r,o);let a=n.slice();a[o]=r.reduce((d,i)=>d+(i.dims.length>o?i.dims[o]:0),0);let s=r.filter(d=>A.size(d.dims)>0);e.compute(rp(s,o,a,r[0].dataType),{inputs:s})},Hs=e=>J({axis:e.axis})});var Ne,He,We,Dr,nt=B(()=>{"use strict";Y();ee();Ne=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},He=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},We=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Dr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Cr,Tr];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Te,Br,Nt=B(()=>{"use strict";Te=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Br=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Rr,Un=B(()=>{"use strict";Rr=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var np,op,Ht,Ls,ip,Wt,ap,Mr,Lt=B(()=>{"use strict";Y();ee();re();nt();Nt();np=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,op=(e,t)=>e?`
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
        }`,Ht=(e,t,r="f32",n,o=!1,a=32,s=!1,d=32)=>{let i=t[1]*e[1],l=t[0]*e[0],c=o?i:a,p=o?a:i,m=c/t[0],g=a/t[1];if(!((o&&m===4&&e[1]===4||!o&&(m===3||m===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${c/m}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${a};

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
  let globalRowStart = i32(workgroupId.y) * ${i};

  let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${np(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
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
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${op(o,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ls=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,ip=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Wt=(e,t,r="f32",n,o=!1,a=32,s=!1,d=32,i=!1)=>{let l=e[1]*t[1],c=e[0]*t[0],p=o?l:a,m=o?a:l;if(!(m%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=m/t[1],h=p/t[0],y=a/t[1],$=i?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${Ls(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
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
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${h};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${h}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ls(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
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
      ${ip(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${$}
  }
`},ap=(e,t,r,n,o,a=!1)=>{let[s,d,i]=o,[l,c,p,m]=n,g=It(s,i),h=It(d,i),y=ce(n[0].type.tensor),$=()=>{let x=c.rank,S=l.rank,C=`var aIndices: ${c.type.indices};`;for(let T=x-2-1,P=S-1;T>=0;T--,P--)C+=`
aIndices[${T}] = ${S>1?`batchIndices[${P}]`:"batchIndices"};`;return g.forEach(T=>{C+=`
aIndices[${T}] = 0;`}),C+=`
aIndices[${x-2}] = u32(row);
                   aIndices[${x-1}] = u32(colIn);`,C},v=()=>{let x=p.rank,S=l.rank,C=`var bIndices: ${p.type.indices};`;for(let T=x-2-1,P=S-1;T>=0;T--,P--)C+=`
bIndices[${T}] = ${S>1?`batchIndices[${P}]`:"batchIndices"};`;return h.forEach(T=>{C+=`
bIndices[${T}] = 0;`}),C+=`
bIndices[${x-2}] = u32(row);
                   bIndices[${x-1}] = u32(colIn);`,C};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Te(e,y)} {
      var value = ${Te(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${$()}
        value = ${c.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${l.type.indices}) -> ${Te(e,y)} {
      var value = ${Te(e,y)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${v()}
        value = ${p.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Te(e,y)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Te(e,y)}(bias[row])`};`:""}
        ${r}
        ${m.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Mr=(e,t,r,n,o=!1)=>{let a=e[0].dims,s=e[1].dims,d=a.slice(0,-2),i=s.slice(0,-2),l=n?n.slice(0,-2):r.slice(0,-2),c=A.size(l),p=a[a.length-2],m=a[a.length-1],g=s[s.length-1],h=m%4===0&&g%4===0,y=p<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(g/$[0]/y[0]),Math.ceil(p/$[1]/y[1]),Math.ceil(c/$[2]/y[2])],w=h?4:1,x=[...d,p,m/w],S=x.length,C=[...i,m,g/w],T=C.length,P=[c,p,g/w],O=[{type:6,data:p},{type:6,data:g},{type:6,data:m}];He(t,O),O.push(...M(l,x,C));let U=["rank","rank"],V=e.length>2;V&&(O.push(...M(e[2].dims)),U.push("rank")),O.push(...M(P));let q=j=>{let oe=l.length,ne=Ar("batchDims",e[0].dataType,oe,1),ue=ce(e[0].dataType),L=k("a",e[0].dataType,S,w),ye=k("b",e[1].dataType,T,w),ie=z("result",e[0].dataType,P.length,w),X=[L,ye];if(V){let D=o?w:1;X.push(k("bias",e[2].dataType,e[2].dims.length,D))}let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];We(t,Z);let F=ce(ie.type.tensor),ae=Ne(t,ie.type.value,F),pe=ap(w,V,ae,[ne,L,ye,ie],[d,i,l],o);return`
  ${j.registerUniforms(Z).registerInternalVariables(ne).declareVariables(...X,ie)}
  ${pe}
  ${h?Ht(y,$,ue,ne):Wt(y,$,ue,ne)}
                   `};return{name:"MatMul",shaderCache:{hint:`${y};${t.activation};${h};${o}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:O}),getShaderSource:q}}});var sp,Gs,Fs=B(()=>{"use strict";Y();rt();re();nt();Nt();Un();Lt();sp=(e,t,r,n,o=!1,a,s=4,d=4,i=4,l="f32")=>{let c=V=>{switch(V){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},p=V=>{switch(V){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${V} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=e?`
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
    `,h=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",$=e?"row":"col",v=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${$} / outWidth;
    let outCol = ${$} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Te(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${h} && xCol >= 0 && xCol < ${y}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,x=e?t&&n?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Te(s,l)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Te(s,l)}(0.0);`,S=`${p(d)}`,C=Te(i,l),T=e?Te(s,l):Te(d,l),P=e?Te(d,l):Te(s,l),O=Ne(a,C,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?x:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?S:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${i};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${Br(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gs=(e,t,r,n,o,a,s,d)=>{let i=t.format==="NHWC",l=i?e[0].dims[3]:e[0].dims[1],c=r[0],p=i?r[2]:r[3],m=i?r[1]:r[2],g=i?r[3]:r[1],h=i&&(l%4===0||l%3===0)&&g%4===0,y=i?g:p*m,$=i?p*m:g,v=[8,8,1],w=n<=8?[4,1,1]:[4,4,1],x=[Math.ceil(y/v[0]/w[0]),Math.ceil($/v[1]/w[1]),Math.ceil(c/v[2]/w[2])];ge("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let S=h?i&&l%4!==0?3:4:1,C=v[1]*w[1],T=v[0]*w[0],P=Math.max(v[0]*S,v[1]),O=n%C===0,U=o%T===0,V=a%P===0,q=h?[S,4,4]:[1,1,1],j=[{type:6,data:n},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];He(t,j),j.push(...M(e[0].dims,e[1].dims));let oe=["rank","rank"];s&&(j.push(...M(e[2].dims)),oe.push("rank")),j.push(...M(r));let ne=ue=>{let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];We(t,L);let ye=h?4:1,ie=ce(e[0].dataType),X=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${ie}>`:ie}) {
        result[flatIndex] = ${h?`vec4<${ie}>`:ie}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${ie}>`:ie}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,Z=k("x",e[0].dataType,e[0].dims.length,S===3?1:S),F=k("w",e[1].dataType,e[1].dims.length,ye),ae=[Z,F],pe=z("result",e[0].dataType,r.length,ye);if(s){let D=k("bias",e[2].dataType,e[2].dims.length,ye);ae.push(D),X+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${ie}>`:ie} {
          return bias[coords.${i?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Rr("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${ue.registerUniforms(L).declareVariables(...ae,pe)}
        ${X}
        ${sp(i,O,U,V,s,t,q[0],q[1],q[2],ie)}
        ${h?Ht(w,v,ie,void 0,!i,P):Wt(w,v,ie,void 0,!i,P,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${S};${h};${O};${U};${V};${C};${T};${P}`,inputDependencies:oe},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:j}),getShaderSource:ne}}});var up,qs,Ur,dp,Ks,lp,js,Ys,Zs=B(()=>{"use strict";Y();rt();ee();re();nt();Nt();up=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},qs=e=>typeof e=="number"?[e,e,e]:e,Ur=(e,t)=>t<=1?e:e+(e-1)*(t-1),dp=(e,t,r,n=1)=>{let o=Ur(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Ks=(e,t,r,n,o)=>{o==null&&(o=dp(e,t[0],n[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/n[s]+1));return a},lp=(e,t,r,n,o,a,s,d,i,l)=>{let c,p,m,g;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let h=Ks([t,r,n,1],[d,i,l],1,[o,a,s],e);p=h[0],m=h[1],g=h[2]}else if(Array.isArray(e)){if(!e.every((y,$,v)=>y===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let h=Ks([t,r,n,1],[d,i,l],1,[o,a,s],e[0]);p=h[0],m=h[1],g=h[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/o),m=Math.ceil(r/a),g=Math.ceil(n/s);let h=(p-1)*o+d-t,y=(m-1)*a+i-r,$=(g-1)*s+l-n,v=Math.floor(h/2),w=h-v,x=Math.floor(y/2),S=y-x,C=Math.floor($/2),T=$-C;c={top:x,bottom:S,left:C,right:T,front:v,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:m,outWidth:g}},js=(e,t,r,n,o,a=!1,s="channelsLast")=>{let d,i,l,c,p;if(s==="channelsLast")[d,i,l,c,p]=e;else if(s==="channelsFirst")[d,p,i,l,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,g,h,y]=t,[$,v,w]=qs(r),[x,S,C]=qs(n),T=Ur(g,x),P=Ur(h,S),O=Ur(y,C),{padInfo:U,outDepth:V,outHeight:q,outWidth:j}=lp(o,i,l,c,$,v,w,T,P,O),oe=a?m*p:m,ne=[0,0,0,0,0];return s==="channelsFirst"?ne=[d,oe,V,q,j]:s==="channelsLast"&&(ne=[d,V,q,j,oe]),{batchSize:d,dataFormat:s,inDepth:i,inHeight:l,inWidth:c,inChannels:p,outDepth:V,outHeight:q,outWidth:j,outChannels:oe,padInfo:U,strideDepth:$,strideHeight:v,strideWidth:w,filterDepth:g,filterHeight:h,filterWidth:y,effectiveFilterDepth:T,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:x,dilationHeight:S,dilationWidth:C,inShape:e,outShape:ne,filterShape:t}},Ys=(e,t,r,n,o,a)=>{let s=a==="channelsLast",d=s?e[0].dims[3]:e[0].dims[1],i=!1,l=[64,1,1],c={x:r.map((w,x)=>x)},p=[Math.ceil(up(c.x.map(w=>r[w]))/l[0]),1,1];ge("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let m=i?s&&d%4!==0?3:4:1,g=A.size(r),h=[{type:12,data:g},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];He(t,h),h.push(...M(e[0].dims,e[1].dims));let y=["rank","rank"],$=e.length===3;$&&(h.push(...M(e[2].dims)),y.push("rank")),h.push(...M(r));let v=w=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];We(t,x);let S=i?4:1,C=ce(e[0].dataType),T=k("x",e[0].dataType,e[0].dims.length,m===3?1:m),P=k("W",e[1].dataType,e[1].dims.length,S),O=[T,P],U=z("result",e[0].dataType,r.length,S),V="";if($){let oe=k("bias",e[2].dataType,e[2].dims.length,S);O.push(oe),V+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${i?`vec4<${C}>`:C} {
          return bias[${s?H("coords",4,5):H("coords",1,5)}${i?"/ 4":""}];
        }`}let q=Te(m,C),j=Ne(t,q,C);return`
            ${V}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${w.registerUniforms(x).declareVariables(...O,U)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
              let batch = ${H("coords",0,T.rank)};
              let d2 = ${s?H("coords",T.rank-1,T.rank):H("coords",1,T.rank)};
              let xFRCCorner = vec3<u32>(${s?H("coords",1,T.rank):H("coords",2,T.rank)},
              ${s?H("coords",2,T.rank):H("coords",3,T.rank)},
              ${s?H("coords",3,T.rank):H("coords",4,T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?H("uniforms.x_shape",1,T.rank):H("uniforms.x_shape",2,T.rank)};
              let xShapeZ = ${s?H("uniforms.x_shape",2,T.rank):H("uniforms.x_shape",3,T.rank)};
              let xShapeW = ${s?H("uniforms.x_shape",3,T.rank):H("uniforms.x_shape",4,T.rank)};
              let xShapeU = ${s?H("uniforms.x_shape",4,T.rank):H("uniforms.x_shape",1,T.rank)};
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
              ${$?"value = value + getBiasByOutputCoords(coords)":""};
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${m};${$}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:h}),getShaderSource:v}}});var Vn,Xs,Qs=B(()=>{"use strict";Y();ee();re();Nn();nt();Vn=(e,t,r)=>{let n=e.length>2,o=n?"value += b[output_channel];":"",a=e[0].dims,s=e[1].dims,d=s[0]/t.group,i=t.format==="NHWC",l=Vr(a,s,t.dilations,t.pads,t.strides,i),c=A.size(l),p=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];He(t,p),p.push(...M(a,s));let m=["rank","rank"];n&&(p.push(...M(e[2].dims)),m.push("rank")),p.push(...M(l));let g=h=>{let y=z("output",e[0].dataType,l.length),$=ce(y.type.tensor),v=Ne(t,y.type.value,$),w=k("x",e[0].dataType,a.length),x=k("w",e[1].dataType,s.length),S=[w,x];n&&S.push(k("b",e[2].dataType,e[2].dims.length));let C=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return We(t,C),`
  ${h.registerUniforms(C).declareVariables(...S,y)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${i?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${i?1:2}], outputIndices[${i?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel / uniforms.output_channels_per_group;

    var value: ${y.type.value} = ${y.type.value}(0);
    for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
      let input_channel = group_id * uniforms.w_shape[1] + wInChannel;
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[${i?1:2}]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[${i?2:3}]) {
            continue;
          }

          let xVal = ${i?w.get("batch","xHeight","xWidth","input_channel"):w.get("batch","input_channel","xHeight","xWidth")};
          let wVal = ${x.get("output_channel","wInChannel","wHeight","wWidth")};
          value += xVal*wVal;
        }
      }
    }
    ${o}
    ${v}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:t.cacheKey,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(l):l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:g}},Xs=(e,t,r)=>{let n=e.length>2,o=fe(r[3]),a=fe(r[2]),s=A.size(r)/o/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],i=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],l=[r[0],r[1],r[2],r[3]/o],c=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];He(t,c),c.push(...M(d,i,l));let p=(a-1)*t.strides[1]+i[1],m=g=>{let h=z("output",e[0].dataType,l.length,o),y=ce(h.type.tensor),$=Ne(t,h.type.value,y),v=k("x",e[0].dataType,d.length,o),w=k("w",e[1].dataType,i.length,o),x=[v,w];n&&x.push(k("b",e[2].dataType,e[2].dims,o));let S=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return We(t,C),`
  ${g.registerUniforms(C).declareVariables(...x,h)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${p}>;
    var values: array<${h.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${i[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${i[1]}; w_width++) {
          let w_val = ${w.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${S}
      ${$}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${a};${p};${i[0]};${i[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:m}}});var Hn,cp,Js,Wn=B(()=>{"use strict";Y();ee();Lt();re();nt();Hn=(e,t,r,n,o=!1)=>{let a=e[0].dims,s=e[1].dims,d=a[a.length-2],i=s[s.length-1],l=a[a.length-1],c=fe(i),p=fe(l),m=fe(d),g=A.size(r)/c/m,h=e.length>2,y=n?n.slice(0,-2):r.slice(0,-2),v=[A.size(y),d,i],w=[{type:12,data:g},{type:12,data:d},{type:12,data:i},{type:12,data:l}];He(t,w),w.push(...M(y,a,s)),h&&w.push(...M(e[2].dims)),w.push(...M(v));let x=S=>{let C=Ar("batch_dims",e[0].dataType,y.length),T=k("a",e[0].dataType,a.length,p),P=k("b",e[1].dataType,s.length,c),O=z("output",e[0].dataType,v.length,c),U=ce(O.type.tensor),V=Ne(t,O.type.value,U),q=[T,P],j="";if(h){let Z=o?c:1;q.push(k("bias",e[2].dataType,e[2].dims.length,Z)),j=`${o?`value += bias[col / ${Z}];`:`value += ${O.type.value}(bias[row + i]);`}`}let oe=a.slice(0,-2),ne=s.slice(0,-2),ue=It(oe,y),L=It(ne,y),ye=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];We(t,ye);let ie=(Z,F)=>{let ae=Z.rank,pe=Z.name;if(ae===2)return`var ${pe}_indices = ${Z.type.indices}(0u, 0u);`;let D=C.rank,K=`var ${pe}_indices: ${Z.type.indices};`;for(let se=ae-2-1,Ae=D-1;se>=0;se--,Ae--)K+=`
${pe}_indices[${se}] = ${D>1?`batch_indices[${Ae}]`:"batch_indices"};`;return F.forEach(se=>{K+=`
${pe}_indices[${se}] = 0;`}),K+=`${pe}_indices[${ae-2}] = 0u;
                     ${pe}_indices[${ae-1}] = 0u;`,K},X=()=>{let Z=`var a_data: ${T.type.value};`;for(let F=0;F<p;F++)Z+=`
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${c}];`;for(let F=0;F<m;F++){Z+=`a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${p}];`;for(let ae=0;ae<p;ae++)Z+=`
            values[${F}] = fma(${P.type.value}(a_data${p===1?"":`[${ae}]`}), b_data${ae}, values[${F}]);
`}return Z};return`
  ${S.registerUniforms(ye).registerInternalVariables(C).declareVariables(...q,O)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}
    ${ie(T,ue)}
    let a_offset = ${T.indicesToOffset("a_indices")};
    ${ie(P,L)}
    let b_offset = ${P.indicesToOffset("b_indices")};
    var values: array<${O.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${X()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${j}
      ${V}
      let cur_indices = ${O.type.indices}(batch, row + i, col);
      let offset = ${O.indicesToOffset("cur_indices")};
      ${O.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${m};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:w}),getShaderSource:x}},cp=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Js=e=>{cp(e.inputs);let t=je.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(Hn(e.inputs,{activation:""},t)):e.compute(Mr(e.inputs,{activation:""},t))}});var Vr,Ln,pp,Gn,Fn,mp,fp,hp,qn,Nn=B(()=>{"use strict";ee();Fs();Zs();Lt();Qs();nt();Wn();bt();Vr=(e,t,r,n,o,a)=>{let s=e[0],d=e.slice(a?1:2,a?3:4),i=d.length,l=t[0],p=t.slice(2).map((h,y)=>h+(h-1)*(r[y]-1)),g=d.map((h,y)=>h+n[y]+n[y+i]).map((h,y)=>Math.floor((h-p[y]+o[y])/o[y]));return g.splice(0,0,s),g.splice(a?3:1,0,l),g},Ln=[2,3,1,0],pp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Gn=(e,t)=>{let r=e.kernelShape.slice();for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let n=e.pads.slice();ht.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},Fn=e=>{let t=Dr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,d=e.pads,i=e.strides,l=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,pads:d,strides:i,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},mp=(e,t,r)=>{let n=Gn(r,t),o=r.format==="NHWC";if(r.group!==1){if(!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let P=Vr(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),O=e.kernelCustomData.wT??e.compute(Be(t[1],Ln),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O);let U=[t[0],O];t.length===3&&U.push(t[2]),e.compute(Xs(U,n,P),{inputs:U})}else e.compute(Vn(t,n));return}let a=t.length===3,s=t[0].dims[o?1:2],d=t[0].dims[o?2:3],i=t[0].dims[o?3:1],l=t[1].dims[2],c=t[1].dims[3],p=Vr(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,o),m=p[o?1:2],g=p[o?2:3],h=p[o?3:1],y=o&&l===s&&c===d&&r.pads[0]===0&&r.pads[1]===0;if(y||l===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let T=p[0],P,O,U,V=[];if(o){let oe=e.kernelCustomData.wT??e.compute(Be(t[1],Ln),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=oe),y){let ne=s*d*i;P=t[0].reshape([1,T,ne]),O=oe.reshape([1,ne,h]),U=[1,T,h]}else P=t[0].reshape([T,s*d,i]),O=oe.reshape([1,i,h]),U=[T,m*g,h];V.push(P),V.push(O)}else P=t[0].reshape([T,i,s*d]),O=t[1].reshape([1,h,i]),U=[T,h,m*g],V.push(O),V.push(P);a&&V.push(t[2]);let q=U[2],j=V[0].dims[V[0].dims.length-1];q<8&&j<8?e.compute(Hn(V,n,p,U,o),{inputs:V}):e.compute(Mr(V,n,p,U,o),{inputs:V});return}let $=!0,v=e.kernelCustomData.wT??e.compute(Be(t[1],Ln),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let w=[t[0],v];a&&w.push(t[2]);let x=o?m*g:h,S=o?h:m*g,C=l*c*i;e.compute(Gs(w,n,p,x,S,C,a,$),{inputs:w})},fp=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),d=[1].concat(t.kernelShape),i=Gn({...t,pads:o,strides:a,dilations:s,kernelShape:d},n);e.compute(Vn(n,i,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},hp=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Gn(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=js(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,n);e.compute(Ys(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},qn=(e,t)=>{pp(e.inputs,t),e.inputs[0].dims.length===3?fp(e,t):e.inputs[0].dims.length===5?hp(e,e.inputs,t):mp(e,e.inputs,t)}});var gp,eu,tu=B(()=>{"use strict";Y();rt();re();nt();Nt();Un();Lt();gp=(e,t=!1,r,n,o=4)=>{let a=v=>{switch(v){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${v} is not supported.`)}},s=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,d=e?`
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
    `,i=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",l=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",c=e?"row":"col",p=e?"col":"row",m=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${c} / outWidth;
      let outCol = ${c} % outWidth;

      let WRow = ${p} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${p} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${i}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${l}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${p} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,g=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${m}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${m}
      }
      return ${n}(0.0);`,h=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${a(o)}
      }
      return ${n}(0.0);
      `,y=Ne(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?g:h}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?h:g}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${d}
      ${Br(t)}
      ${y}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},eu=(e,t,r,n,o,a,s,d)=>{let i=t.format==="NHWC",l=i?e[0].dims[3]:e[0].dims[1],c=r[0],p=i?r[2]:r[3],m=i?r[1]:r[2],g=i?r[3]:r[1],h=i&&l%4===0&&l%3&&g%4===0,y=i?g:p*m,$=i?p*m:g,v=[8,8,1],w=n<=8?[4,1,1]:[4,4,1],x=[Math.ceil(y/v[0]/w[0]),Math.ceil($/v[1]/w[1]),Math.ceil(c/v[2]/w[2])];ge("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${x}`);let S=h?4:1,C=Math.max(v[0]*S,v[1]),T=h?4:1,P=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],O=[P[0]+(t.dilations[0]<=1?0:(P[0]-1)*(t.dilations[0]-1)),P[1]+(t.dilations[1]<=1?0:(P[1]-1)*(t.dilations[1]-1))],U=[O[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),O[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],V=[{type:6,data:n},{type:6,data:o},{type:6,data:a},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:P},{type:6,data:U}];He(t,V),V.push(...M(e[0].dims,e[1].dims));let q=["rank","rank"];s&&(V.push(...M(e[2].dims)),q.push("rank")),V.push(...M(r));let j=oe=>{let ne=k("x",e[0].dataType,e[0].dims.length,T),ue=k("w",e[1].dataType,e[1].dims.length,1),L=z("result",e[0].dataType,r.length,T),ye=[ne,ue],ie="";if(s){let F=k("bias",e[2].dataType,e[2].dims.length,T);ye.push(F),ie+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${F.type.value} {
            return bias[coords.${i?"w":"y"}${h?"/ 4":""}];
          }`}let X=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:P.length},{name:"pads",type:"i32",length:U.length}];We(t,X);let Z=ce(e[0].dataType,1);if(Z!=="f16"&&Z!=="f32")throw new Error(`elemType ${Z} is not supported.`);return`
        ${Rr("uniforms.result_strides")}
        ${oe.registerUniforms(X).declareVariables(...ye,L)};
        ${ie}
        ${gp(i,s,t,ne.type.value,S)}
        ${h?Ht(w,v,Z,void 0,!i,C):Wt(w,v,Z,void 0,!i,C,!1,void 0,d)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${w};${v};${h}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:V}),getShaderSource:j}}});var yp,Kn,ru=B(()=>{"use strict";Y();rt();ee();re();yp=(e,t,r,n,o,a=!1,s,d,i=!1)=>{let l=i?1:2,c=i?2:3,p=i?3:1,m=a?2:1,g=`
  fn setOutputAtIndex(flatIndex : u32, value : ${a?`vec4<${s}>`:s}) {
    result[flatIndex] = ${a?`vec4<${s}>`:s}(value);
  }`;n&&(g+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${a?`vec4<${s}>`:s} {
      return bias[coords.${i?"w":"y"}${a?"/ 4":""}];
    }`);let h=a?4:1,y=k("W",t[1].dataType,t[1].dims.length,h),$=k("Dy",t[0].dataType,t[0].dims.length,h),v=[$,y];n&&v.push(k("bias",t[2].dataType,[r[p]].length,h));let w=z("result",t[0].dataType,r.length,h),x=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${m};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${m}>;
        for (var i = 0; i < ${m}; i++) {
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
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${$.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${p}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${y.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${$.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${m}; i = i + 1) {
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${w.set("batch","r","c + i","d1","value")};
        }
      }`,S=`
          let outputIndices = ${w.offsetToIndices("global_idx")};
          let batch = ${w.indicesGet("outputIndices",0)};
          let d1 = ${w.indicesGet("outputIndices",p)};
          let r = ${w.indicesGet("outputIndices",l)};
          let c = ${w.indicesGet("outputIndices",c)};
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
                let xValue = ${i?$.get("batch","idyR","idyC","inputChannel"):$.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${y.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${s}(0.0)`};
          ${w.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(d).declareVariables(...v,w)}
  ${g}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${a?x:S}}`},Kn=(e,t,r)=>{let n=e.length>2,o=t.outputShape,a=A.size(o),s=[Math.ceil(a/64),1,1];ge("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let d=t.format==="NHWC",i=["rank","rank"],l=[t.strides[0],t.strides[1]],c=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],p=[t.dilations[0],t.dilations[1]],m=[c[0]+(t.dilations[0]<=1?0:(t.kernelShape[d?1:2]-1)*(t.dilations[0]-1)),c[1]+(t.dilations[1]<=1?0:(t.kernelShape[d?2:3]-1)*(t.dilations[1]-1))],g=[m[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),m[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],h=!1,y=t.group,$=e[1].dims,v=$[0]/y,w=$[1],x=[{type:12,data:a},{type:12,data:l},{type:12,data:c},{type:12,data:p},{type:12,data:m},{type:6,data:g},{type:12,data:v},{type:12,data:w},...M(e[0].dims,e[1].dims)];n&&(x.push(...M(e[2].dims)),i.push("rank")),x.push(...M(o));let S=s[1]===1&&s[2]===1,C=T=>{let P=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:c.length},{name:"dilations",type:"u32",length:c.length},{name:"effective_filter_dims",type:"u32",length:m.length},{name:"pads",type:"i32",length:g.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],O=ce(e[0].dataType);return`${yp(T,e,o,n,S,h,O,P,d)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:i},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:C}}});var bp,wp,vp,nu,ou,_p,$p,xp,Sp,iu,au=B(()=>{"use strict";tu();ru();nt();bt();bp=(e,t,r,n,o,a)=>(e-1)*t+r+(n-1)*o+1-a,wp=(e,t,r,n,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=a,r[o]=e-a):t==="SAME_LOWER"&&(r[n]=e-a,r[o]=a)},vp=(e,t,r,n,o,a,s,d,i,l)=>{let c=e.length-2,p=l.length===0;if(i.length===0)for(let h=0;h<c;++h)i.push(0);let m=e[0],g=t[d?3:1]*o;for(let h=0,y=e.length-c-(d?1:0);h<c;++h,++y){let $=e[y],v=p?$*s[h]:l[h],w=bp($,s[h],a[h],t[y],r[h],v);wp(w,n,a,h,h+c),p&&l.push(s[h]*($-1)+i[h]+(t[y]-1)*r[h]+1-a[h]-a[h+c])}l.splice(0,0,m),l.splice(d?3:1,0,g)},nu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,m)=>p*m,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),d=t[0].dims,i=e.dilations.slice();if(i.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;i=new Array(p).fill(1)}let l=e.strides.slice();if(l.reduce((p,m)=>p+m,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}vp(d,r,i,e.autoPad,e.group,o,l,n,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:o,outputPadding:s,outputShape:a,dilations:i,strides:l}),c},ou=e=>{let t=Dr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,d=e.pads,i=e.strides,l=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,outputPadding:c,outputShape:p,pads:d,strides:i,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},_p=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((c,p)=>c+p,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((c,p)=>c+p,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((c,p)=>c+p,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((c,p)=>c+p,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},$p=[2,3,1,0],xp=(e,t,r)=>{let n=nu(r,t),o=r.format==="NHWC",a=n.outputShape,s=a[o?3:1],d=t[0].dims[o?3:1];if(n.group!==1||s===1&&d===1){e.compute(Kn(t,n));return}let i=a[o?1:2],l=a[o?2:3],c=t[1].dims[2],p=t[1].dims[3],m=o?i*l:s,g=o?s:i*l,h=c*p*d,y=!0,$=e.kernelCustomData.wT??e.compute(Be(t[1],$p),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$],w=t.length===3;w&&(!o&&t[2].dims.length===1?v.push(t[2].reshape([t[2].dims[0],1,1])):v.push(t[2])),e.compute(eu(v,n,a,m,g,h,w,y),{inputs:v})},Sp=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let i=nu({...t,pads:d,strides:s,dilations:a,kernelShape:o},n);e.compute(Kn(n,i,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},iu=(e,t)=>{_p(e.inputs,t),e.inputs[0].dims.length===3?Sp(e,t):xp(e,e.inputs,t)}});var Ip,su,uu,du=B(()=>{"use strict";Y();ee();$e();re();Ip=(e,t,r,n)=>{let o=A.size(t),a=t.length,s=k("input",e,a),d=z("output",e,a),i=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=A.normalizeAxis(i,a),c=p=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=H("uniforms.input_shape","uniforms.axis",a),h=n.reverse?m+(n.exclusive?" + 1":""):"0",y=n.reverse?g:m+(n.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,d)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${h};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...M(t,t)]}),getShaderSource:c}},su=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Ip(n,r,o,t),{inputs:[0]})},uu=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var Cp,Tp,Ap,lu,cu,pu=B(()=>{"use strict";Y();ee();$e();re();Cp=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Tp=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)o.push(r.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},Ap=(e,t)=>{let r,n,o,a,s,d,i=t.format==="NHWC",l=t.blocksize,c=t.mode==="DCR";i?([r,n,o,a]=e.dims,s=c?[r,n,o,l,l,a/l**2]:[r,n,o,a/l**2,l,l],d=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,l,l,a/l**2,n,o]:[r,a/l**2,l,l,n,o],d=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),m=p.dims.length,g=e.dataType,h=k("a",g,m),y=z("output",g,m),$=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(h,y)}

  ${Tp(d,m,h,y)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let w=i?[r,n*l,o*l,a/l**2]:[r,a/l**2,n*l,o*l],x=A.size(w),S=p.dims,C=A.sortBasedOnPerm(S,d);return{outputs:[{dims:w,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...M(S,C)]}},getShaderSource:$}},lu=(e,t)=>{Cp(e.inputs),e.compute(Ap(e.inputs[0],t))},cu=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var jn,Nr,mu,kp,Ep,Yn,Zn,fu,Pp,hu,gu,yu=B(()=>{"use strict";Y();ee();$e();re();jn="[a-zA-Z]|\\.\\.\\.",Nr="("+jn+")+",mu="^"+Nr+"$",kp="("+Nr+",)*"+Nr,Ep="^"+kp+"$",Yn=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Zn=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(Ep)))throw new Error("Invalid LHS term");if(n.split(",").forEach((d,i)=>{let l=t[i].dims.slice();if(!d.match(RegExp(mu)))throw new Error("Invalid LHS term");let c=this.processTerm(d,!0,l,i);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,i])=>i.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(Nr)))throw new Error("Invalid RHS");o.match(RegExp(jn,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let i=this.symbolToInfo.get(d);if(i===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(i.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let a=n.length,s=!1,d=[],i=0;if(!t.match(RegExp(mu))&&!r&&t!=="")throw new Error("Invalid LHS term");let l=t.match(RegExp(jn,"g")),c=new Yn(o);return l?.forEach((p,m)=>{if(p==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=a-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(i,i+g),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<d.length;h++){let y=String.fromCharCode("0".charCodeAt(0)+h);c.addSymbol(y,m+h),this.addSymbol(y,n[i++],o)}}else c.addSymbol(p,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,n[i++],o)}),c}},fu=e=>e+"_max",Pp=(e,t,r,n)=>{let a=e.map(c=>c.length).map((c,p)=>k(`input${p}`,t,c)),s=A.size(n),d=z("output",t,n.length),i=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),l=c=>{let p=[],m="var prod = 1.0;",g="var sum = 0.0;",h="sum += prod;",y=[],$=[],v=[],w=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,T)=>{if(r.rhs.symbolToIndices.has(T)){let P=r.rhs.symbolToIndices.get(T)?.[0];P!==void 0&&r.lhs.forEach((O,U)=>{if(C.inputIndices.includes(U)){let V=O.symbolToIndices.get(T);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(q=>{p.push(`${a[U].indicesSet(`input${U}Indices`,q,d.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(C.inputIndices.includes(O)){let U=P.symbolToIndices.get(T);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(V=>{y.push(`${a[O].indicesSet(`input${O}Indices`,V,`${T}`)}`)}),w.push(`prod *= ${a[O].getByIndices(`input${O}Indices`)};`)}}),$.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${fu(T)}; ${T}++) {`),v.push("}")});let S=x?[...p,`let sum = ${a.map((C,T)=>C.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...p,g,...$,...y,m,...w,h,...v];return`
            ${c.registerUniforms(i.map(C=>({name:`${fu(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,d)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${a.map((C,T)=>`var input${T}Indices: ${a[T].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let c=i.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));c.push({type:12,data:s});let p=e.map((m,g)=>[...M(m)]).reduce((m,g)=>m.concat(g),c);return p.push(...M(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}},getShaderSource:l}},hu=(e,t)=>{let r=new Zn(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(Pp(o,e.inputs[0].dataType,r,n))},gu=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var Op,bu,zp,Dp,wu,vu=B(()=>{"use strict";Y();ee();re();Op=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},bu=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},zp=(e,t)=>e.length>t.length?bu(e,t):bu(t,e),Dp=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=zp(t,r),o=e[0].dataType,a=o===9?4:1,s=Math.ceil(A.size(n)/a),d=l=>{let c=k("input",o,t.length,a),p=z("output",o,n.length,a),m;if(o===9){let g=(h,y,$="")=>`
          let outputIndices${y} = ${p.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${c.broadcastedIndicesToOffset(`outputIndices${y}`,p)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${h}[${y}] = ${$}(${c.getByOffset(`index${y}`)}[component${y}]);
        `;m=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${g("data",0,"u32")}
        ${g("data",1,"u32")}
        ${g("data",2,"u32")}
        ${g("data",3,"u32")}
        ${p.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${p.offsetToIndices("global_idx")};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",p)};
        ${p.setByOffset("global_idx",c.getByOffset("inputOffset"))}
      }`;return`
    ${l.registerUniform("vec_size","u32").declareVariables(c,p)}
    ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},i=[{type:12,data:s},...M(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:i})}},wu=e=>{Op(e.inputs),e.compute(Dp(e.inputs),{inputs:[0]})}});var Bp,_u,$u=B(()=>{"use strict";Y();ee();re();zr();Bp=e=>{let t=e[0].dataType,r=A.size(e[0].dims),n=A.size(e[1].dims),o=n%4===0,a=s=>{let d=k("x",t,[1],4),i=k("bias",t,[1],4),l=z("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${i.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,m=o?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(d,i,l)}

    ${Rn(Ee(t))}

    ${s.mainStart(gt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Mn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/gt/4)}})}},_u=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?$s(e):e.compute(Bp(e.inputs))}});var Rp,Mp,xu,Su,Iu=B(()=>{"use strict";Y();ee();$e();re();Rp=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Mp=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,a=A.normalizeAxis(t.axis,o),s=r.slice(0);s.splice(a,1,...n);let d=r[a],i=e[0].dataType===9?4:1,l=Math.ceil(A.size(s)/i),c=[{type:12,data:l},{type:6,data:d},{type:12,data:a},...M(e[0].dims,e[1].dims,s)],p=m=>{let g=k("data",e[0].dataType,e[0].dims.length,i),h=k("inputIndices",e[1].dataType,e[1].dims.length),y=z("output",e[0].dataType,s.length,i),$=w=>{let x=n.length,S=`var indicesIndices${w}  = ${h.type.indices}(0);`;for(let C=0;C<x;C++)S+=`${x>1?`indicesIndices${w}[${C}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${C}]`:`outputIndices${w}`};`;S+=`
          var idx${w} = ${h.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${g.type.indices};
        `;for(let C=0,T=0;C<o;C++)C===a?(S+=`${o>1?`dataIndices${w}[${C}]`:`dataIndices${w}`} = u32(idx${w});`,T+=x):(S+=`${o>1?`dataIndices${w}[${C}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${T}]`:`outputIndices${w}`};`,T++);return S},v;if(e[0].dataType===9){let w=(x,S,C="")=>`
          let outputIndices${S} = ${y.offsetToIndices(`outputOffset + ${S}u`)};
          ${$(S)};
          let offset${S} = ${g.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${x}[${S}] = ${C}(${g.getByOffset(`index${S}`)}[component${S}]);
        `;v=`
        let outputOffset = global_idx * ${i};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${$("")};
      let value = ${g.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,h,y)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:p}},xu=e=>J({axis:e.axis}),Su=(e,t)=>{let r=e.inputs;Rp(r),e.compute(Mp(e.inputs,t))}});var Up,Vp,Cu,Tu,Au=B(()=>{"use strict";Y();ee();$e();re();Up=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Vp=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,a=e[1].dims,s=e[1].dataType,d=A.normalizeAxis(t.axis,o),i=r[d],l=a.slice(0),c=A.size(l),p=k("input",n,o),m=k("indicesInput",s,a.length),g=z("output",n,l.length),h=[{type:12,data:c},{type:6,data:i},{type:12,data:d}];return h.push(...M(r,a,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,g)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Cu=e=>J({axis:e.axis}),Tu=(e,t)=>{let r=e.inputs;Up(r),e.compute(Vp(e.inputs,t))}});var Np,Hp,ku,Eu,Pu=B(()=>{"use strict";Y();ee();re();Np=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Hp=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,a,s]=Ir.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),d=[o,a];if(!d)throw new Error("Can't use gemm on the given tensors");let i=A.size(d),l=[{type:12,data:i},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],c=["type","type"];e.length===3&&(l.push(...M(e[2].dims)),c.push("rank")),l.push(...M(d));let p=m=>{let g="";t.transA&&t.transB?g="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?g="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?g="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(g="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let h=t.alpha===1?"":"value *= uniforms.alpha;",y=k("a",e[0].dataType,e[0].dims),$=k("b",e[1].dataType,e[1].dims),v=y.type.value,w=null,x=[y,$];e.length===3&&(w=k("c",e[2].dataType,e[2].dims.length),x.push(w));let S=z("output",e[0].dataType,d.length);x.push(S);let C=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${m.registerUniforms(C).declareVariables(...x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${v}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${g}
    }

    ${h}
    ${(()=>w!=null?`let cOffset = ${w.broadcastedIndicesToOffset("vec2(m, n)",S)}; value += ${v}(uniforms.beta) * ${w.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:p}},ku=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Eu=(e,t)=>{Np(e.inputs),e.compute(Hp(e.inputs,t))}});var Re,Gp,zu,Ou,Fp,Gt,Du,Xn=B(()=>{"use strict";Y();ee();$e();Sr();Pr();re();bt();Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Gp=(e,t)=>{let r=e[0],n=Re(e,1),o=Re(e,2),a=Re(e,3),s=Re(e,4),d=Re(e,5),i=Re(e,6),l=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],p=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],g=p,h=0,y=0,$=Math.floor(m/t.numHeads);if(i&&l){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(i.dims[0]!==c||i.dims[1]!==t.numHeads||i.dims[3]!==$)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==$)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(i.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2],y=i.dims[2]}else if(i||l)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==$)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==$)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=h+g,x=0;if(s){x=8;let P=s.dims;throw P.length===1?P[0]===c?x=1:P[0]===3*c+2&&(x=3):P.length===2&&P[0]===c&&P[1]===w&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,C=m;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],S=!0}}let T=!1;if(s)throw new Error("Key padding mask is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:h,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:$,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:T,passPastInKv:S,qkvFormat:v}},zu=e=>J({...e}),Ou=J({perm:[0,2,1,3]}),Fp=(e,t,r,n,o,a,s)=>{let d=[n,o,a],i=A.size(d),l=[{type:12,data:i},{type:12,data:s},{type:12,data:a}],c=p=>{let m=z("qkv_with_bias",t.dataType,d),g=k("qkv",t.dataType,d),h=k("bias",r.dataType,d),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(g,h,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},Gt=(e,t,r,n,o,a,s,d)=>{let i=a;if(s){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return i=Fp(e,a,s,t,n,r*o,d),i=i.reshape([t,n,r,o]),e.compute(Be(i,Ou.perm),{inputs:[i],outputs:[-1]})[0]}else return a.dims.length===3&&(i=a.reshape([t,n,r,o])),e.compute(Be(i,Ou.perm),{inputs:[i],outputs:[-1]})[0]},Du=(e,t)=>{let r=Gp(e.inputs,t),n=e.inputs[0],o=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),d=Re(e.inputs,4),i=Re(e.inputs,5),l=Re(e.inputs,6),c=Re(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let p=o&&a&&o.dims.length===4&&a.dims.length===4,m=Gt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(p)return Ct(e,m,o,a,d,void 0,l,c,i,r,t);if(!o||!a)throw new Error("key and value must be provided");let g=Gt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),h=Gt(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);Ct(e,m,g,h,d,void 0,l,c,i,r,t)}});var Bu,qp,Kp,Qn,Ru,Jn=B(()=>{"use strict";Y();ee();re();Bu=e=>Array.from(e.getBigInt64Array(),Number),qp=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Bu(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Kp=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Qn=(e,t)=>{let r=e[0].dims,n=t??Bu(e[1]),o=Kp(r,n),a=A.size(o),s=e[0].dataType,d=k("input",s,r.length),i=z("output",s,o.length),l=c=>`
      const inputShape = ${d.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(d,i)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${i.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${i.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${i.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...M(e[0].dims,o)]}),getShaderSource:l}},Ru=e=>{qp(e.inputs),e.compute(Qn(e.inputs),{inputs:[0]})}});var jp,Mu,Vu,Yp,Uu,Nu,Hu=B(()=>{"use strict";Y();ee();$e();Pr();re();Xn();Jn();bt();jp=(e,t)=>{let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,i=r.dims[0],l=r.dims[1],c=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=l,m=0,g=0,h=Math.floor(c/t.numHeads),y=a&&a.dims.length!==0,$=s&&s.dims.length!==0,v=!0;if(y&&$){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');v?(m=a.dims[1],g=a.dims[1]):(m=a.dims[2],g=a.dims[2])}else if(y||$)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');w=2,p=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==h)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,p=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==h)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,p=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let x=0,S=!1,C=c;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],S=!0}}let T=m+p,P=!1;return{batchSize:i,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:T,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:c,vHiddenSize:C,headSize:h,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:P,passPastInKv:S,qkvFormat:w,isPastkvBSNH:v}},Mu=(e,t,r,n)=>{let o=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],a=4,s=A.size(o)/a,d=n.totalSequenceLength,i=z("present_kv",r,o.length,a),l=k("new_kv",e.dataType,e.dims.length,a),c=t?k("past_kv",t.dataType,t.dims.length,a):void 0,p=Math.ceil(n.headSize/a),m={x:d,y:e.dims[0],z:1},g=t?["rank","rank"]:["rank"],h=[{type:12,data:s},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],y=[l];c?(h.push(...M(e.dims),...M(t.dims),...M(o)),y.push(c)):h.push(...M(e.dims),...M(o));let $=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],v=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,w=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,x=t?`if (s < past_seqlen) {
        ${v}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${w}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${w}
        }`,S=C=>`

  ${C.registerUniforms($).declareVariables(...y,i)}
  ${C.mainStart([p,n.kvNumHeads,1])}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${i.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${n.kvNumHeads}u;
    let H = ${p}u;

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
    ${x}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${p}${!!t}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:r}],dispatchGroup:m,programUniforms:h}),getShaderSource:S}},Vu=e=>J({...e}),Yp=J({perm:[0,2,1,3]}),Uu=(e,t,r,n,o)=>{let a=t,s=n.kvNumHeads,d=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(a=t.reshape([n.batchSize,n.kvSequenceLength,s,n.headSize])),r?a=e.compute(Mu(a,r,a.dataType,n),{inputs:[a,r],outputs:[n.isPastkvBSNH?o:-1]})[0]:a=e.compute(Mu(a,void 0,a.dataType,n),{inputs:[a],outputs:[n.isPastkvBSNH?o:-1]})[0],d!==1&&(a=e.compute(Qn([a],[1,1,1,d]),{inputs:[a],outputs:[-1]})[0],a=a.reshape([n.batchSize,n.totalSequenceLength,s*d,n.headSize])),e.compute(Be(a,Yp.perm),{inputs:[a],outputs:[-1]})[0]},Nu=(e,t)=>{let r=jp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=Gt(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,a=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,s=Uu(e,e.inputs[1],o,r,1),d=Uu(e,e.inputs[2],a,r,2);Ct(e,n,s,d,void 0,void 0,void 0,void 0,void 0,r,t)}});var Zp,Xp,Qp,Wu,Lu=B(()=>{"use strict";Y();ee();re();Zp=(e,t)=>{let r=e[0].dims,n=r,o=2,a=A.sizeToDimension(r,o),s=A.sizeFromDimension(r,o),d=fe(s),i=s/d,l=[r[0],r[1],i],c=["rank","type","type"],p=[{type:12,data:s},{type:12,data:i}];p.push(...M(l,l));let m=g=>{let h=k("x",e[0].dataType,l.length,d),y=k("scale",e[1].dataType,e[1].dims),$=k("bias",e[2].dataType,e[2].dims),v=z("output",e[0].dataType,l.length,d),w=[h,y,$,v],x=h.type.value,S=d===1?"f32":`vec${d}<f32>`,C=64,T=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${S}, ${C}>;
  const workgroupSize = ${C}u;
  ${g.registerUniforms(T).declareVariables(...w)}
  ${g.mainStart(C)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${S}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${S}(${h.get("batch","channel","h")});
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
      meanShared = ${Fe("workgroupShared[0]",d)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${S}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${S}(${h.get("batch","channel","h")}) - ${S}(meanShared);
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
      squaredNormShared = ${Fe("workgroupShared[0]",d)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${y.getByOffset("channel")});
    let channelShift = f32(${$.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${h.get("batch","channel","h")} * ${x}(${S}(channelScale)) + ${x}(${S}(channelShift));
      ${v.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${d}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:a},programUniforms:p}),getShaderSource:m}},Xp=(e,t,r,n,o,a,s,d)=>{let i=fe(s),l=64,c=i===1?"vec2f":`mat2x${i}f`,p=i===1?"f32":`vec${i}f`,m=(T,P)=>`${c}(${T}, ${P})`,g=o*s/i,h=Math.ceil(a/l),y=["type"],$=[{type:12,data:h},{type:12,data:a},{type:12,data:Math.floor(s/i)},{type:12,data:Math.floor(a*s/i)}],v=T=>{let P=k("input",t.dataType,t.dims,i);return`
  ${T.declareVariables(P)}
  @group(0) @binding(1) var<storage, read_write> output : array<${c}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${T.mainStart(l)}
    let currentImageNumber = global_idx / ${l} / uniforms.C;
    let currentChannelNumber = (global_idx / ${l}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${st("f32",i)};
    var squaredSum = ${st("f32",i)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${p}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${m("sum","squaredSum")};
  }`},w=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${i}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:[o,s,l,2],dataType:1}],dispatchGroup:{x:o*s/i},programUniforms:$}),getShaderSource:v},{inputs:[t],outputs:[-1]})[0],x=[{type:12,data:g},{type:12,data:a},{type:12,data:Math.floor(s/i)},{type:12,data:Math.floor(l*s/i)}],S=["type","type","type"],C=T=>{let P=k("scale",r.dataType,r.dims,i),O=k("bias",n.dataType,n.dims,i);return`
  @group(0) @binding(0) var<storage, read> input : array<${c}>;
  @group(0) @binding(1) var<storage, read> scale : array<${P.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${O.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${c}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${st("f32",i)};
    var squaredSum = ${st("f32",i)};
    for (var i: u32 = 0; i < min(${l}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${l}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${d}));
    let channelScale = invStdDev * ${p}(scale[currentChannelNumber]);
    let channelShift = ${p}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${m("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${i};${d}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:[o,s,2],dataType:1}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:x}),getShaderSource:C},{inputs:[w,r,n],outputs:[-1]})[0]},Qp=(e,t,r)=>{let n=t[0].dims,o=n,a=n[0],s=n[n.length-1],d=A.sizeFromDimension(n,1)/s,i=fe(s),l=A.size(o)/i,c=[{type:12,data:d},{type:12,data:Math.floor(s/i)}],p=["type","type"],m=Xp(e,t[0],t[1],t[2],a,d,s,r.epsilon),g=h=>{let y=ce(t[0].dataType),$=i===1?"vec2f":`mat2x${i}f`,v=i===1?y:`vec${i}<${y}>`,w=k("input",t[0].dataType,t[0].dims,i),x=z("output",t[0].dataType,o,i);return`
  @group(0) @binding(0) var<storage, read> input : array<${w.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${$}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${x.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${h.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${v}(scale[0]), ${v}(scale[1]));
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${i}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:g},{inputs:[t[0],m]})},Wu=(e,t)=>{t.format==="NHWC"?Qp(e,e.inputs,t):e.compute(Zp(e.inputs,t))}});var Jp,em,Gu,Fu=B(()=>{"use strict";Y();ee();re();Jp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},em=(e,t,r)=>{let n=t.simplified,o=e[0].dims,a=e[1],s=!n&&e[2],d=o,i=A.normalizeAxis(t.axis,o.length),l=A.sizeToDimension(o,i),c=A.sizeFromDimension(o,i),p=A.size(a.dims),m=s?A.size(s.dims):0;if(p!==c||s&&m!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let g=[];for(let C=0;C<o.length;++C)C<i?g.push(o[C]):g.push(1);let h=fe(c),y=["type","type"],$=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/h)},{type:1,data:t.epsilon}];s&&y.push("type");let v=r>1,w=r>2,x=C=>{let T=ce(e[0].dataType),P=[k("x",e[0].dataType,e[0].dims,h),k("scale",a.dataType,a.dims,h)];s&&P.push(k("bias",s.dataType,s.dims,h)),P.push(z("output",e[0].dataType,d,h)),v&&P.push(z("mean_data_output",1,g)),w&&P.push(z("inv_std_output",1,g));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(O).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${st("f32",h)};
    var mean_square_vector = ${st("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${yt(T,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Fe("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Fe("mean_square_vector",h)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${yt(T,h,"x[j + offset]")};
      let f32scale = ${yt(T,h,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${yt(T,h,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:d,dataType:e[0].dataType}];return v&&S.push({dims:g,dataType:1}),w&&S.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${r};${n}`,inputDependencies:y},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:$}),getShaderSource:x}},Gu=(e,t)=>{Jp(e.inputs),e.compute(em(e.inputs,t,e.outputCount))}});var tm,rm,qu,Ku,ju=B(()=>{"use strict";Y();ee();$e();re();tm=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!A.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let i=e[2].dims;if(A.size(i)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let c=e[3].dims,p=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(A.size(c)!==p)throw new Error("zeroPoints input size error.")}},rm=(e,t,r,n)=>{let o=e[0].dims,a=o.length,s=Math.floor((t.k+t.blockSize-1)/t.blockSize),d=o[a-2],i=t.k,l=t.n,c=o.slice(0,a-2),p=A.size(c),g=t.blockSize/8*t.bits/4,h=e[0].dataType,y=fe(d),$=fe(t.k),v=fe(g),w=ft(h,d*s),x=Math.floor(n/w),S=s<=r[0]&&x>0,C=!S||x>=4?fe(l):x>=2&&fe(l)>=2?2:1,T=c.concat([d,l]),P=A.size(T)/C/y,O=S?[]:[{type:12,data:P},{type:12,data:t.blockSize}],U=[p,d,i/$],V=A.convertShape(e[1].dims).slice();V.splice(-1,1,g/v),O.push(...M(U)),O.push(...M(V)),O.push(...M(e[2].dims)),e.length===4&&O.push(...M(A.convertShape(e[3].dims)));let q=[p,d,l/C];O.push(...M(q));let j=oe=>{let ne=U.length,ue=k("a",e[0].dataType,ne,$),L=k("b",12,V.length,v),ye=k("scales",e[2].dataType,e[2].dims.length),ie=[ue,L,ye],X=e.length===4?k("zero_points",12,e[3].dims.length):void 0;X&&ie.push(X);let Z=q.length,F=z("output",e[0].dataType,Z,C),ae=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],pe=ce(e[0].dataType),D=(()=>{switch($){case 1:return`array<${pe}, 8>`;case 2:return`mat4x2<${pe}>`;case 4:return`mat2x4<${pe}>`;default:throw new Error(`${$}-component is not supported.`)}})(),K=`
        for (var word: u32 = 0; word < ${g}; word += ${v}) {
          ${L.indicesSet("b_indices","2","word")};
          let b_data = ${L.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${v}; i++) {
            let b_value: u32 = ${v===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${D}(${Array.from({length:4},(Ae,be)=>`${pe}(b_value_lower[${be}]), ${pe}(b_value_upper[${be}])`).join(", ")});
            let b_dequantized_values = ${(()=>$===1?`${D}(${Array.from({length:8},(Ae,be)=>`(b_quantized_values[${be}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${D}(${Array(8).fill("zero_point").join(",")})) * scale;`)()};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${S?d:y}u; m++) {
              ${ue.indicesSet("a_indices",ne-2,S?"m":`row * ${y} + m`)};
              ${ue.indicesSet("a_indices",ne-1,"word_offset")};
              var input_offset = ${ue.indicesToOffset("a_indices")};
              var a_data: ${D};
              for (var j: u32 = 0; j < ${8/$}; j++) {
                a_data[j] = ${ue.getByOffset("input_offset")};
                input_offset++;
              }
              ${S?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${C>1?"[c]":""} += ${Array.from({length:8/$},(Ae,be)=>`${$===1?`a_data[${be}] * b_dequantized_values[${be}]`:`dot(a_data[${be}], b_dequantized_values[${be}])`}`).join(" + ")};
            }
            word_offset += ${8/$};
          }
        }`,se=X?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${X.getByOffset("zero_point_index")};
          }`:"";return S?`
        var<workgroup> workgroup_shared: array<${F.type.value}, ${d*s}>;
        ${oe.declareVariables(...ie,F)}
        ${oe.mainStart([s,1,1])}
          var a_indices: ${ue.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${ue.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${C}; c++) {
            let col_times_components_plus_c = col * ${C} + c;
              ${X?`
            var zero_point_bytes_per_col: u32 = (${s} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${L.type.indices};
            ${L.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${s} + block;
            let scale = ${ye.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${pe}(${X?"(zero_point_word) & 0xFu":8});
            ${L.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${t.blockSize/$};
            var workgroup_shared_offset: u32 = block * ${d};
            ${K}
          }
          workgroupBarrier();
          var output_indices: ${F.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(d/s)};
          ${F.indicesSet("output_indices","0","batch")};
          ${F.indicesSet("output_indices",Z-1,"col")};
          ${F.indicesSet("output_indices",Z-2,"local_id.x * elements_per_thread")};
          var output_offset = ${F.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${d}) {
              var output_value: ${F.type.value} = ${F.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${s}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${d};
              }
              ${F.setByOffset("output_offset","output_value")};
              output_offset += ${l/C};
            }
          }
        }`:`
        ${oe.registerUniforms(ae).declareVariables(...ie,F)}
        ${oe.mainStart()}
          ${oe.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${F.type.value}, ${y}>;
          var output_indices = ${F.offsetToIndices("global_idx")};
          var col = ${F.indicesGet("output_indices",Z-1)};
          var row = ${F.indicesGet("output_indices",Z-2)};
          var a_indices: ${ue.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${X?`
          var zero_point_abs_offset = col * ${C} * ((${s} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${X.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${s*C};
          var b_indices: ${L.type.indices};
          for (var c: u32 = 0; c < ${C}; c++) {
            ${L.indicesSet("b_indices","0",`col * ${C} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${s}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${ye.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${pe}(${X?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${L.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${K}
              scale_index++;
              ${se}
              block_offset += uniforms.block_size / ${$};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${X?`if (zero_point_offset % 8 > 0) {
                ${se}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${y}u; k++) {
              ${F.indicesSet("output_indices",Z-2,`${y} * row + k`)};
              ${F.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:S?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${t.cacheKey};${d};${h};${e.length}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:T,dataType:h}],name:S?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:S?{x:1,y:Math.ceil(l/C),z:p}:{x:Math.ceil(P/64)},programUniforms:O}),getShaderSource:j}},qu=(e,t)=>{tm(e.inputs,t);let r=e.getMaxComputeWorkgroupSizes(),n=e.getMaxComputeWorkgroupStoragesize();e.compute(rm(e.inputs,t,r,n))},Ku=e=>J(e)});var nm,om,im,am,sm,um,dm,lm,Yu,Zu=B(()=>{"use strict";Y();ee();re();nm=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},om=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${H("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${H("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},im=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${H("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${H("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},am=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${H("uniforms.x_shape",o,t)})) {
                  k = i32(${H("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},sm=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${H("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${H("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${H("uniforms.x_shape",o,t)})) {
                  k -= i32(${H("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${H("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},um=(e,t,r)=>{switch(r.mode){case 0:return om(e,t,r.pads.length);case 1:return im(e,t,r.pads.length);case 2:return am(e,t,r.pads.length);case 3:return sm(e,t,r.pads.length);default:throw new Error("Invalid mode")}},dm=(e,t)=>{let r=A.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=A.size(r),a=[{type:12,data:o},{type:6,data:t.pads}];t.mode===0&&a.push({type:e[0].dataType,data:t.value}),a.push(...M(e[0].dims,r));let s=["rank"],d=i=>{let l=z("output",e[0].dataType,r.length),c=k("x",e[0].dataType,n.length),p=c.type.value,m=um(l,n.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:p}),`
            ${i.registerUniforms(g).declareVariables(c,l)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${l.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${m}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(r)/64)},programUniforms:a}),getShaderSource:d}},lm=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let i=0;i<d.length;i++)a[Number(d[i])]=Number(r[i]),a[Number(d[i])+o]=Number(r[i+d.length])}else r.forEach((d,i)=>a[Number(i)]=Number(d));let s=[];return a.forEach(d=>s.push(d)),{mode:t.mode,value:n,pads:s}}else return t},Yu=(e,t)=>{nm(e.inputs);let r=lm(e.inputs,t);e.compute(dm(e.inputs,r),{inputs:[0]})}});var Hr,Xu,Qu,Ju,ed,cm,pm,td,rd,nd,od,id,ad,sd,ud,dd,ld,cd,pd,md=B(()=>{"use strict";Le();Y();ee();re();Hr=e=>{if(me.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Xu=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),d=t.strides.slice(),i=a?t.dilations.slice():[],l=t.pads.slice();ht.adjustPoolAttributes(r,o,s,d,i,l);let c=ht.computePoolOutputShape(r,o,d,i,s,l,t.autoPad),p=Object.assign({},t);a?Object.assign(p,{kernelShape:s,strides:d,pads:l,dilations:i,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:d,pads:l,cacheKey:t.cacheKey});let m=c.slice();return m.push(m.splice(1,1)[0]),[p,n?m:c]},Qu=(e,t)=>{let r=t.format==="NHWC",n=A.size(e),o=A.size(t.kernelShape),a=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(l+c);a.push({type:12,data:d},{type:12,data:i},{type:12,data:l},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],h=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],$=t.pads[t.pads.length-2];m=!!(y+$),a.push({type:12,data:g},{type:12,data:h},{type:12,data:y},{type:12,data:$}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,p,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=A.computeStrides(t.kernelShape);a.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let i=t.pads.reduce((l,c)=>l+c);return[a,s,!!i,!1,!1]}},Ju=(e,t,r,n,o,a,s,d,i,l,c,p)=>{let m=o.format==="NHWC",g=t.type.value,h=z("output",t.type.tensor,n);if(o.kernelShape.length<=2){let y="",$="",v="",w=r-(m?2:1);if(c?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,o.kernelShape.length===2){let S=r-(m?3:2);p?$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:$=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(i).declareVariables(t,h)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var value = ${g}(${d});
              var pad = 0;
              ${$}
              ${y}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=o.kernelShape.length,$=o.pads.length,v="";return l?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(i).declareVariables(t,h)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${h.offsetToIndices("global_idx")};
              var xIndices = ${h.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${g}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${H("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${H("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${H("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${H("uniforms.pads","j - 2u",$)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},ed=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,cm=e=>`${ed(e)};${e.countIncludePad}`,pm=e=>`${ed(e)};${e.storageOrder};${e.dilations}`,td=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),rd=(e,t,r,n)=>{let[o,a]=Xu(t,n,r),s=k("x",t.dataType,t.dims.length),d=s.type.value,i="value += x_val;",l="";o.countIncludePad?l+=`value /= ${d}(uniforms.kernelSize);`:l+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[c,p,m,g,h]=Qu(a,o);c.push(...M(t.dims,a));let y=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${m};${g};${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(a)/64)},programUniforms:c}),getShaderSource:$=>Ju($,s,t.dims.length,a.length,o,i,l,0,p,m,g,h)}},nd=e=>{let t=e.count_include_pad!==0,r=td(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:cm(n)}},od=(e,t)=>{Hr(e.inputs),e.compute(rd("AveragePool",e.inputs[0],!1,t))},id={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ad=e=>{let t=e.format;return{format:t,...id,cacheKey:t}},sd=(e,t)=>{Hr(e.inputs),e.compute(rd("GlobalAveragePool",e.inputs[0],!0,t))},ud=(e,t,r,n)=>{let[o,a]=Xu(t,n,r),s=`
      value = max(x_val, value);
    `,d="",i=k("x",t.dataType,t.dims.length),l=["rank"],[c,p,m,g,h]=Qu(a,o);return c.push(...M(t.dims,a)),{name:e,shaderCache:{hint:`${n.cacheKey};${m};${g};${h}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(a)/64)},programUniforms:c}),getShaderSource:y=>Ju(y,i,t.dims.length,a.length,o,s,d,t.dataType===10?-65504:-1e5,p,m,g,h)}},dd=(e,t)=>{Hr(e.inputs),e.compute(ud("MaxPool",e.inputs[0],!1,t))},ld=e=>{let t=e.storage_order,r=e.dilations,n=td(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:pm(o)}},cd=e=>{let t=e.format;return{format:t,...id,cacheKey:t}},pd=(e,t)=>{Hr(e.inputs),e.compute(ud("GlobalMaxPool",e.inputs[0],!0,t))}});var fm,hm,fd,hd,gd=B(()=>{"use strict";Y();ee();$e();re();fm=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},hm=(e,t)=>{let r=A.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,a=e[0].dims,s=e[1].dataType,d=A.size(a),i=n===3||n===2,l=i?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,m=p?i?[Math.ceil(A.size(p.dims)/4)]:p.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,h=g===!1&&c.length===1,y=fe(d),$=g&&(!i||y===4),v=$?y:1,w=$&&!i?y:1,x=k("input",i?12:n,l.length,w),S=k("scale",s,c.length),C=p?k("zero_point",i?12:n,m.length):void 0,T=z("output",s,a.length,v),P=[x,S];C&&P.push(C);let O=[l,c];p&&O.push(m);let U=[{type:12,data:d/v},{type:12,data:r},{type:12,data:t.blockSize},...M(...O,a)],V=q=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(j).declareVariables(...P,T)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${T.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>i?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>g?`let scale_value= ${S.getByOffset("0")}`:h?`
            let scale_index = ${T.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>C?g?i?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:h?i?`
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:i?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${i?o?"i32":"u32":x.type.value}(0);`)()};
      // Compute and write output
      ${T.setByOffset("global_idx",`${T.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/v/64),y:1,z:1},programUniforms:U})}},fd=(e,t)=>{fm(e.inputs,t),e.compute(hm(e.inputs,t))},hd=e=>J({axis:e.axis,blockSize:e.blockSize})});var gm,ym,yd,bd=B(()=>{"use strict";Le();Y();re();gm=(e,t,r)=>{let n=e===t,o=e<t&&r<0,a=e>t&&r>0;if(n||o||a)throw new Error("Range these inputs' contents are invalid.")},ym=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),a=[o],s=o,d=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...M(a)],i=l=>{let c=z("output",n,a.length),p=c.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(m).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:i,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},yd=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&gm(t,r,n),e.compute(ym(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var bm,wm,vm,_m,$m,xm,Sm,Im,Cm,Tm,Am,wd,km,Em,Pm,Om,zm,vd,_d,$d=B(()=>{"use strict";Y();ee();$e();re();bm=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},wm=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,a)=>n[o]=e[a]),n},vm=(e,t,r,n,o,a)=>{let[s,d,i]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length>0){if(e[d].getFloat32Array().forEach(c=>n.push(c)),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");bm(n,t),t.axes.length>0&&wm(n,t.axes,l).forEach((c,p)=>n[p]=c)}if(i>0&&e.length>i&&(e[i].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==l||r>=18&&o.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},_m=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",$m=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",xm=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((a,s)=>{n[a]=o[s],n[s+r]=o[t.length+s]}),n):o},Sm=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(a=>o.push(a)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((a,s)=>o[a]=r[s])}else r.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},Im=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=n),r.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(n,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},Cm=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${H("uniforms.scales","i",n)};
        var roi_low = ${H("uniforms.roi","i",o)};
        var roi_hi = ${H("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${H("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${H("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Tm=(e,t,r,n,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${H("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${H("uniforms.roi","i",a)};
          var roi_hi = ${H("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${H("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${H("uniforms.output_shape","i",n.length)};
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
    }`,Am=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${H("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,wd=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",km=(e,t,r,n,o)=>{let[s,d,i,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",i,`max(0, min(col, ${r[i]} - 1))`)};
      ${wd(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${d}];
      var col:${c} = originalIndices[${i}];
      ${n?`if (row < 0 || row > (${r[d]} - 1) || col < 0 || col > (${r[i]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[d]} - 1));
      col = max(0, min(col, ${r[i]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
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
    }`},Em=(e,t,r,n,o,a,s,d,i,l)=>{let c=r.length===2,p=!0,[m,g]=c?[0,1]:p?[2,3]:[1,2],h=e.type.value,y=$=>{let v=$===m?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${h} {
        var output_index = ${t.indicesGet("output_indices",$)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[$]},
        ${n[$]}, ${r[$]}, ${a[$]}, ${a[$]} + ${r.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${r[$]} - 1))) {
          return ${i};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${h} = originalIdx + ${h}(i);
          if (${v} < 0 || ${v} >= ${r[$]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${i};`:`${v} = max(0, min(${v}, ${r[$]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",$,`u32(${v})`)};
          data[i + 1] = ${$===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${y(m)};
    ${y(g)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${h} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Pm=(e,t,r,n,o)=>{let[s,d,i,l,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",i,`max(0, min(height, ${r[i]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${wd(e,c,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${d}];
      var height:${p} = originalIndices[${i}];
      var width:${p} = originalIndices[${l}];
      ${n?`if (depth < 0 || depth > (${r[d]} - 1) || height < 0 || height > (${r[i]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[d]} - 1));
      height = max(0, min(height, ${r[i]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
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
    }`},Om=(e,t,r,n,o,a)=>{let s=e.dims,d=xm(a,t.axes,s.length),i=Sm(s,n,o,t.axes),l=n.slice();n.length===0&&(l=s.map((w,x)=>w===0?1:i[x]/w),t.keepAspectRatioPolicy!=="stretch"&&(i=Im(s,l,t)));let c=z("output",e.dataType,i.length),p=k("input",e.dataType,s.length),m=A.size(i),g=s.length===i.length&&s.every((w,x)=>w===i[x]),h=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,$=p.type.value,v=w=>`
      ${g?"":`
      ${_m(t.coordinateTransformMode,$)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Am(p,s)};
              ${$m(t.nearestMode,r,$)};
              ${Tm(p,c,s,i,l.length,d.length,h)};
              `;case"linear":return`
              ${Cm(c,s,i,l.length,d.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${km(p,c,s,h,y)}`;if(s.length===3||s.length===5)return`${Pm(p,c,s,h,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Em(p,c,s,i,l,d,t.cubicCoeffA,h,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",d.length).declareVariables(p,c)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?l:""}|${o.length>0?o:""}|${d.length>0?d:""}|${g}|${s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:l},{type:1,data:d},...M(s,i)]})}},zm=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},vd=(e,t)=>{let r=[],n=[],o=[],a=zm(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");vm(e.inputs,t,a,r,n,o),e.compute(Om(e.inputs[0],t,a,r,n,o),{inputs:[0]})},_d=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,d=e.keepAspectRatioPolicy,i=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:d,mode:i,nearestMode:l})}});var Dm,Bm,xd,Sd=B(()=>{"use strict";Y();ee();$e();re();Dm=(e,t)=>{let[r,n,o,a]=e,{numHeads:s,rotaryEmbeddingDim:d}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!A.areEqual(n.dims,[])&&!A.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!A.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let i=r.dims[0],l=r.dims[r.dims.length-2],c=o.dims[0],p=A.sizeFromDimension(r.dims,1)/l,m=d===0?o.dims[1]*2:p/s;if(d>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(i!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(l!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(m/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Bm=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],d=A.sizeFromDimension(e[0].dims,1),i=e[0].dims[e[0].dims.length-2],l=d/i,c=e[2].dims[1],p=o===0?c*2:l/n,m=new Array(s,i,l/p,p-c),g=A.computeStrides(m),h=[{type:1,data:a},{type:12,data:m},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[d,l,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,p,i*p,1]}):[],...M(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=$=>{let v=k("input",e[0].dataType,e[0].dims.length),w=k("position_ids",e[1].dataType,e[1].dims.length),x=k("cos_cache",e[2].dataType,e[2].dims.length),S=k("sin_cache",e[3].dataType,e[3].dims.length),C=z("output",e[0].dataType,e[0].dims.length);return $.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${$.declareVariables(v,w,x,S,C)}

        ${$.mainStart(gt)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",z("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(m)/gt)},programUniforms:h})}},xd=(e,t)=>{Dm(e.inputs,t),e.compute(Bm(e.inputs,t))}});var Rm,Mm,Id,Cd=B(()=>{"use strict";Y();ee();re();Rm=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Mm=(e,t,r,n)=>{let o=t.simplified,a=e[0].dims,s=A.size(a),d=a,i=s,l=a.slice(-1)[0],c=n?a.slice(0,-1).concat(1):[],p=!o&&e.length>3,m=e.length>4,g=n&&r>1,h=n&&r>2,y=r>3,$=64,v=fe(l),w=[{type:12,data:i},{type:12,data:v},{type:12,data:l},{type:1,data:t.epsilon}],x=C=>{let T=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[k("x",e[0].dataType,e[0].dims,v),k("skip",e[1].dataType,e[1].dims,v),k("gamma",e[2].dataType,e[2].dims,v)];p&&P.push(k("beta",e[3].dataType,e[3].dims,v)),m&&P.push(k("bias",e[4].dataType,e[4].dims,v)),P.push(z("output",e[0].dataType,d,v)),g&&P.push(z("mean_output",1,c)),h&&P.push(z("inv_std_output",1,c)),y&&P.push(z("input_skip_bias_sum",e[0].dataType,d,v));let O=ce(e[0].dataType),U=ce(1,v);return`

      ${C.registerUniforms(T).declareVariables(...P)}
      var<workgroup> sum_shared : array<${U}, ${$}>;
      var<workgroup> sum_squared_shared : array<${U}, ${$}>;

      ${C.mainStart([$,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${$};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${$};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${$-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${yt(O,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${$};
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
        let mean = ${Fe("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Fe("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${h?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:d,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${h};${y}`,inputDependencies:e.map((C,T)=>"type")},getShaderSource:x,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(i/l)},programUniforms:w})}},Id=(e,t)=>{Rm(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Mm(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Um,Wr,Vm,Td,Nm,Hm,Ad,kd,Ed=B(()=>{"use strict";Y();ee();$e();re();Um=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Wr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Vm=(e,t)=>{if(e.length>1){let r=Wr(e,1),n=Wr(e,2),o=Wr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},Td=(e,t,r,n,o)=>{let a=e;return e<0&&(a+=r[n[t]]),o[t]<0?Math.max(0,Math.min(a,r[n[t]]-1)):Math.max(0,Math.min(a,r[n[t]]))},Nm=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${H("uniforms.input_shape","i",r.length)};
            let steps_i = ${H("uniforms.steps","i",r.length)};
            let signs_i = ${H("uniforms.signs","i",r.length)};
            let starts_i = ${H("uniforms.starts","i",r.length)};
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
      }`,Hm=(e,t)=>{let r=e[0].dims,n=A.size(r),o=t.axes.length>0?A.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=Wr(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map((v,w)=>Td(v,w,r,o,a)),d=t.ends.map((v,w)=>Td(v,w,r,o,a));if(o.length!==s.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let v=0;v<r.length;++v)o.includes(v)||(s.splice(v,0,0),d.splice(v,0,r[v]),a.splice(v,0,1));let i=a.map(v=>Math.sign(v));a.forEach((v,w,x)=>{if(v<0){let S=(d[w]-s[w])/v,C=s[w],T=C+S*a[w];s[w]=T,d[w]=C,x[w]=-v}});let l=r.slice(0);o.forEach((v,w)=>{l[v]=Math.ceil((d[v]-s[v])/a[v])});let c={dims:l,dataType:e[0].dataType},p=z("output",e[0].dataType,l.length),m=k("input",e[0].dataType,e[0].dims.length),g=A.size(l),h=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:i.length},{name:"steps",type:"u32",length:a.length}],y=[{type:12,data:g},{type:12,data:s},{type:6,data:i},{type:12,data:a},...M(e[0].dims,l)],$=v=>`
      ${v.registerUniforms(h).declareVariables(m,p)}
        ${Nm(m,p,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${i.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:y})}},Ad=(e,t)=>{Um(e.inputs,t);let r=Vm(e.inputs,t);e.compute(Hm(e.inputs,r),{inputs:[0]})},kd=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var Wm,Lm,Pd,Od,zd=B(()=>{"use strict";Y();ee();$e();re();Wm=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Lm=(e,t)=>{let r=e.dims,n=A.size(r),o=64,a=t.axis;if(a<0&&(a=r.length+a),a<r.length-1)throw new Error("softmax only supports last axis for now.");let s=r[a],d=n/s,i=fe(s),l=s/i,c=($,v)=>v===4?`max(max(${$}.x, ${$}.y), max(${$}.z, ${$}.w))`:v===2?`max(${$}.x, ${$}.y)`:v===3?`max(max(${$}.x, ${$}.y), ${$}.z)`:$,p=k("x",e.dataType,e.dims,i),m=z("result",e.dataType,e.dims,i),g=p.type.value,h=ce(e.dataType)==="f32"?`var threadMax = ${g}(-3.402823e+38f);`:`var threadMax = ${g}(-65504.0h);`,y=$=>`
      var<workgroup> rowMaxShared : ${g};
      var<workgroup> rowSumShared : ${g};
      var<workgroup> threadShared : array<${g}, ${o}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${g} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${g}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${$.registerUniform("packedCols","i32").declareVariables(p,m)}
      ${$.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${o};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${h}
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
          rowMaxShared = ${g}(${c("threadShared[0]",i)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${g}(0.0);
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
          rowSumShared = ${g}(${Fe("threadShared[0]",i)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${i}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:d},programUniforms:[{type:6,data:l}]}),getShaderSource:y}},Pd=(e,t)=>{Wm(e.inputs),e.compute(Lm(e.inputs[0],t))},Od=e=>J({axis:e.axis})});var Gm,Fm,qm,Km,jm,Dd,Bd,Rd=B(()=>{"use strict";Y();ee();$e();re();Gm=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Fm=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},qm=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${H("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Km=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},jm=(e,t)=>{let r=e[0].dims,n=A.size(r),o=e[0].dataType,a=A.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),d=k("input",o,r.length),i=new Array(t.numOutputs),l=[],c=[],p=0,m=[{type:12,data:n}];for(let h=0;h<t.numOutputs;h++){p+=t.splitSizes[h],i[h]=p;let y=r.slice();y[a]=t.splitSizes[h],c.push(y),s[h]=z(`output${h}`,o,y.length),l.push({dims:c[h],dataType:e[0].dataType})}m.push({type:12,data:i},...M(r,...c));let g=h=>`
  ${h.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",i.length).declareVariables(d,...s)}
  ${qm(i.length)}
  ${Km(s)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${H("uniforms.size_in_split_axis","output_number - 1u",i.length)};
      ${d.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},Dd=(e,t)=>{Gm(e.inputs);let r=e.inputs.length===1?t:Fm(e.inputs,t);e.compute(jm(e.inputs,r),{inputs:[0]})},Bd=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var Ym,Zm,Md,Ud=B(()=>{"use strict";Y();ee();re();Ym=(e,t,r,n,o)=>{let a=z("output_data",o,r.length,4),s=k("a_data",t[1].dataType,t[1].dims.length,4),d=k("b_data",t[2].dataType,t[2].dims.length,4),i=k("c_data",t[0].dataType,t[0].dims.length,4),l,c=(p,m,g)=>`select(${m}, ${p}, ${g})`;if(!n)l=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),d.getByOffset("global_idx"),i.getByOffset("global_idx")));else{let p=(m,g,h="")=>{let y=`a_data[index_a${g}][component_a${g}]`,$=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${a.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_b${g} = ${d.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_c${g} = ${i.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${m}[${g}] = ${h}(${c(y,$,v)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(i,s,d,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},Zm=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,a=!(A.areEqual(t,r)&&A.areEqual(r,n)),s=t,d=A.size(t);if(a){let l=je.calcShape(je.calcShape(t,r,!1),n,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,d=A.size(s)}let i=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Ym(l,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:i},...M(n,t,r,s)]})}},Md=e=>{e.compute(Zm(e.inputs))}});var Vd,Nd=B(()=>{"use strict";Ua();Pr();Ha();La();As();Vs();Ws();Nn();au();du();pu();yu();vu();$u();Iu();Au();Pu();Hu();Lu();Fu();Wn();ju();Xn();Zu();md();gd();bd();kr();$d();Sd();Cd();Ed();zd();Rd();Jn();bt();zr();Ud();Vd=new Map([["Abs",[Ga]],["Acos",[Fa]],["Acosh",[qa]],["Add",[ks]],["ArgMax",[Ma,Bn]],["ArgMin",[Ra,Bn]],["Asin",[Ka]],["Asinh",[ja]],["Atan",[Ya]],["Atanh",[Za]],["Attention",[Va]],["AveragePool",[od,nd]],["BatchNormalization",[Na]],["BiasAdd",[Wa]],["BiasSplitGelu",[Ts]],["Cast",[Qa,Xa]],["Ceil",[es]],["Clip",[Ja]],["Concat",[Ns,Hs]],["Conv",[qn,Fn]],["ConvTranspose",[iu,ou]],["Cos",[ts]],["Cosh",[rs]],["CumSum",[su,uu]],["DepthToSpace",[lu,cu]],["DequantizeLinear",[fd,hd]],["Div",[Es]],["Einsum",[hu,gu]],["Elu",[ns,Vt]],["Equal",[Ps]],["Erf",[os]],["Exp",[is]],["Expand",[wu]],["FastGelu",[_u]],["Floor",[as]],["FusedConv",[qn,Fn]],["Gather",[Su,xu]],["GatherElements",[Tu,Cu]],["Gelu",[ss]],["Gemm",[Eu,ku]],["GlobalAveragePool",[sd,ad]],["GlobalMaxPool",[pd,cd]],["Greater",[Bs]],["GreaterOrEqual",[Ms]],["GroupQueryAttention",[Nu,Vu]],["HardSigmoid",[hs,fs]],["InstanceNormalization",[Wu]],["LayerNormalization",[Gu]],["LeakyRelu",[us,Vt]],["Less",[Rs]],["LessOrEqual",[Us]],["Log",[Ss]],["MatMul",[Js]],["MatMulNBits",[qu,Ku]],["MaxPool",[dd,ld]],["Mul",[Os]],["MultiHeadAttention",[Du,zu]],["Neg",[ls]],["Not",[ds]],["Pad",[Yu]],["Pow",[zs]],["QuickGelu",[Is,Vt]],["Range",[yd]],["Reciprocal",[cs]],["ReduceMin",[Ea]],["ReduceMean",[Ia]],["ReduceMax",[ka]],["ReduceSum",[Oa]],["ReduceProd",[Pa]],["ReduceL1",[Ca]],["ReduceL2",[Ta]],["ReduceLogSum",[Da]],["ReduceLogSumExp",[Aa]],["ReduceSumSquare",[za]],["Relu",[ps]],["Resize",[vd,_d]],["RotaryEmbedding",[xd]],["Sigmoid",[ms]],["Sin",[gs]],["Sinh",[ys]],["Slice",[Ad,kd]],["SkipLayerNormalization",[Id]],["Split",[Dd,Bd]],["Sqrt",[bs]],["Softmax",[Pd,Od]],["Sub",[Ds]],["Tan",[ws]],["Tanh",[_s]],["ThresholdedRelu",[xs,Vt]],["Tile",[Ru]],["Transpose",[pa,ma]],["Where",[Md]]])});var Lr,Hd=B(()=>{"use strict";Le();rt();re();Lr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,a){Ve(t.programInfo.name);let s=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let i=[];for(let c of r)i.push({binding:i.length,resource:{buffer:c.buffer}});for(let c of n)i.push({binding:i.length,resource:{buffer:c.buffer}});a&&i.push({binding:i.length,resource:a});let l=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:i,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}d.setPipeline(t.computePipeline),d.setBindGroup(0,l),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),De(t.programInfo.name)}dispose(){}build(t,r){Ve(t.name);let n=this.backend.device,o=[];n.features.has("shader-f16")&&o.push("enable f16;");let a=la(r,this.backend.device.limits),s=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,i=n.createShaderModule({code:d,label:t.name});ge("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let l=n.createComputePipeline({compute:{module:i,entryPoint:"main"},layout:"auto",label:t.name});return De(t.name),{programInfo:t,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=a&&n<=a&&o<=a)return[r,n,o];let s=r*n*o,d=Math.ceil(Math.sqrt(s));if(d>a){if(d=Math.ceil(Math.cbrt(s)),d>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Xm,Qm,eo,Gr,Wd=B(()=>{"use strict";Le();Y();rt();oa();da();Nd();Hd();Xm=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let a=e[n].dims.length;r.push(`${o};${a}`);break}case"dims":{let a=e[n].dims.join(",");r.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Qm=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Xm(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},eo=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Gr=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n};r.features.has("chromium-experimental-timestamp-query-inside-passes")?n.push("chromium-experimental-timestamp-query-inside-passes"):r.features.has("timestamp-query")&&n.push("timestamp-query"),r.features.has("shader-f16")&&n.push("shader-f16"),this.device=await r.requestDevice(o),this.adapterInfo=new eo(r.info||await r.requestAdapterInfo()),this.gpuDataManager=ua(this),this.programManager=new Lr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ra(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let a=n[o],s=a.kernelId,d=this.kernels.get(s),i=d.kernelType,l=d.kernelName,c=a.programName,p=a.inputTensorViews,m=a.outputTensorViews,g=r[o*2],h=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let y=Number(g-this.queryTimeBase),$=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(v=>({dims:v.dims,dataType:at(v.dataType)})),outputsMetadata:m.map(v=>({dims:v.dims,dataType:at(v.dataType)})),kernelId:s,kernelType:i,kernelName:l,programName:c,startTime:y,endTime:$});else{let v="";p.forEach((x,S)=>{v+=`input[${S}]: [${x.dims}] | ${at(x.dataType)}, `});let w="";m.forEach((x,S)=>{w+=`output[${S}]: [${x.dims}] | ${at(x.dataType)}, `}),console.log(`[profiling] kernel "${s}|${i}|${l}|${c}" ${v}${w}execution time: ${$-y} ns`)}ur("GPU",`${c}::${g}::${h}`)}t.unmap(),this.pendingQueries.delete(t)}),De()}run(t,r,n,o,a,s){Ve(t.name);let d=[];for(let x=0;x<r.length;++x){let S=r[x].data;if(S===0)continue;let C=this.gpuDataManager.get(S);if(!C)throw new Error(`no GPU data for input: ${S}`);d.push(C)}let{outputs:i,dispatchGroup:l,programUniforms:c}=t.getRunData(r),p=n.length===0?i.map((x,S)=>S):n;if(p.length!==i.length)throw new Error(`Output size ${p.length} must be equal to ${i.length}.`);let m=[],g=[];for(let x=0;x<i.length;++x){if(!Number.isInteger(p[x])||p[x]<-3||p[x]>=s)throw new Error(`Invalid output index: ${p[x]}`);if(p[x]===-3)continue;let S=p[x]===-1,C=p[x]===-2,T=S||C?a(i[x].dataType,i[x].dims):o(p[x],i[x].dataType,i[x].dims);if(m.push(T),T.data===0)continue;let P=this.gpuDataManager.get(T.data);if(!P)throw new Error(`no GPU data for output: ${T.data}`);if(S&&this.temporaryData.push(P),C){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}g.push(P)}if(d.length!==r.length||g.length!==m.length){if(g.length===0)return De(t.name),m;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(c){let x=0,S=[];c.forEach(O=>{let U=typeof O.data=="number"?[O.data]:O.data;if(U.length===0)return;let V=O.type===10?2:4,q,j;O.type===10?(j=U.length>4?16:U.length>2?8:U.length*V,q=U.length>4?16:V*U.length):(j=U.length<=2?U.length*V:16,q=16),x=Math.ceil(x/j)*j,S.push(x);let oe=O.type===10?8:4;x+=U.length>4?Math.ceil(U.length/oe)*q:U.length*V});let C=16;x=Math.ceil(x/C)*C;let T=new ArrayBuffer(x);c.forEach((O,U)=>{let V=S[U],q=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(T,V,q.length).set(q);else if(O.type===12)new Uint32Array(T,V,q.length).set(q);else if(O.type===10)new Uint16Array(T,V,q.length).set(q);else if(O.type===1)new Float32Array(T,V,q.length).set(q);else throw new Error(`Unsupported uniform type: ${at(O.type)}`)});let P=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,T,0,x),this.gpuDataManager.release(P.id),h={offset:0,size:x,buffer:P.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),$=y[1]===1&&y[2]===1,v=Qm(t,r,$),w=this.programManager.getArtifact(v);if(w||(w=this.programManager.build(t,y),this.programManager.setArtifact(v,w),ge("info",()=>`[artifact] key: ${v}, programName: ${t.name}`)),c&&w.uniformVariablesInfo){if(c.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${c.length} in program "${w.programInfo.name}".`);for(let x=0;x<c.length;x++){let S=c[x],C=S.type,T=typeof S.data=="number"?1:S.data.length,[P,O]=w.uniformVariablesInfo[x];if(C!==P||T!==O)throw new Error(`Uniform variable ${x} mismatch: expect type ${P} with size ${O}, got type ${C} with size ${T} in program "${w.programInfo.name}".`)}}if(ge("info",()=>`[ProgramManager] run "${t.name}" (key=${v}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:m};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(w,d,g,y,h),De(t.name),m}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let a=Vd.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],n]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,d=o.kernelEntry,i=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,i[0]&&(i[1]=i[0](i[1]),i[0]=void 0),ge("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),d(r,i[1]),0}catch(c){return n.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${c}`)),1}finally{l&&n.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${a}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(r),d=this.gpuDataManager.registerExternalBuffer(n,o,s?.[1]);return a.set(r,[d,n]),d}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[1])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await An(this,t,r);return na(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ge("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ge("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ge("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Ld={};Ot(Ld,{init:()=>Jm});var Ft,to,Jm,Gd=B(()=>{"use strict";Y();Wd();rt();ee();Ft=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},to=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.HEAPU32,a=n>>>2;this.opKernelContext=o[a++];let s=o[a++];this.outputCount=o[a++],this.customDataOffset=o[a++],this.customDataSize=o[a++];let d=[];for(let i=0;i<s;i++){let l=o[a++],c=o[a++],p=o[a++],m=[];for(let g=0;g<p;g++)m.push(o[a++]);d.push(new Ft(t,l,c,m))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,r){let n=r?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=r?.outputs??[],a=(d,i,l)=>new Ft(this.module,i,this.output(d,l),l),s=(d,i)=>{let l=ft(d,i);if(!l)throw new Error(`Unsupported data type: ${d}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ft(this.module,d,c,i)};return this.backend.run(t,n,o,a,s,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.stackAlloc((1+r.length)*4),a=o>>2;this.module.HEAPU32[a++]=r.length;for(let s=0;s<r.length;s++)this.module.HEAPU32[a++]=r[s];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Jm=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=new Gr;await a.initialize(r,n),o("webgpu",[a,s=>a.alloc(s),s=>a.free(s),(s,d,i,l=!1)=>{if(l)ge("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${d}, size=${i}`),a.memcpy(s,d);else{ge("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${d}, size=${i}`);let c=t.HEAPU8.subarray(s>>>0,(s>>>0)+i);a.upload(d,c)}},async(s,d,i)=>{ge("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${d}, size=${i}`),await a.download(s,()=>t.HEAPU8.subarray(d>>>0,(d>>>0)+i))},(s,d,i)=>a.createKernel(s,d,i,t.UTF8ToString(t._JsepGetNodeName(d))),s=>a.releaseKernel(s),(s,d,i,l)=>{ge("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${i}, kernel=${s}, contextDataOffset=${d}`);let c=new to(t,a,d);return a.computeKernel(s,c,l)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else o("webnn")}});var ef,mr,fr,wt,tf,Bt,hr,gr,Fd,yr,br,wr,bn=B(()=>{"use strict";Xi();Ji();Y();mt();_r();Sn();ef=(e,t)=>{_e()._OrtInit(e,t)!==0&&we("Can't initialize onnxruntime.")},mr=async e=>{ef(e.wasm.numThreads,Mt(e.logLevel))},fr=async(e,t)=>{{let r=(Gd(),rr(Ld)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:a}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",_e(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",_e(),e)}}},wt=new Map,tf=e=>{let t=_e(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&we("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},Bt=e=>{let t=_e(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},hr=async(e,t)=>{let r,n,o=_e();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Bt(e);let a=0,s=0,d=0,i=[],l=[],c=[];try{if([s,i]=Qi(t),t?.externalData&&o.mountExternalData){let w=[];for(let x of t.externalData){let S=typeof x=="string"?x:x.path;w.push(Ut(typeof x=="string"?x:x.data).then(C=>{o.mountExternalData(S,C)}))}await Promise.all(w)}for(let w of t?.executionProviders??[])if((typeof w=="string"?w:w.name)==="webnn"){if(o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof w!="string"){let S=w,C=S?.context,T=S?.gpuDevice,P=S?.deviceType,O=S?.numThreads,U=S?.powerPreference;C?o.currentContext=C:T?o.currentContext=await navigator.ml.createContext(T):o.currentContext=await navigator.ml.createContext({deviceType:P,numThreads:O,powerPreference:U})}else o.currentContext=await navigator.ml.createContext();break}a=await o._OrtCreateSession(r,n,s),a===0&&we("Can't create a session."),o.currentContext&&(o.currentContext=void 0);let[p,m]=tf(a),g=!!t?.enableGraphCapture,h=[],y=[],$=[];for(let w=0;w<p;w++){let x=o._OrtGetInputName(a,w);x===0&&we("Can't get an input name."),l.push(x),h.push(o.UTF8ToString(x))}for(let w=0;w<m;w++){let x=o._OrtGetOutputName(a,w);x===0&&we("Can't get an output name."),c.push(x);let S=o.UTF8ToString(x);y.push(S);{if(g&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[S]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}.`);if(g&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(C)}}let v=null;return $.some(w=>w==="gpu-buffer")&&(d=o._OrtCreateBinding(a),d===0&&we("Can't create IO binding."),v={handle:d,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(w=>xn(w))}),wt.set(a,[a,l,c,v,g,!1]),[a,h,y]}catch(p){throw l.forEach(m=>o._OrtFree(m)),c.forEach(m=>o._OrtFree(m)),d!==0&&o._OrtReleaseBinding(d),a!==0&&o._OrtReleaseSession(a),p}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s),i.forEach(p=>o._free(p)),o.unmountExternalData?.()}},gr=e=>{let t=_e(),r=wt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,a,s,d]=r;s&&(d&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(e),o.forEach(i=>t._OrtFree(i)),a.forEach(i=>t._OrtFree(i)),t._OrtReleaseSession(n),wt.delete(e)},Fd=(e,t,r,n,o,a=!1)=>{if(!e){t.push(0);return}let s=_e(),d=e[0],i=e[1],l=e[3],c,p;if(d==="string"&&l==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(a&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let h=e[2].gpuBuffer;p=ft($n(d),i);let y=s.jsepRegisterBuffer;if(!y)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=y(n,o,h,p)}else{let h=e[2];if(Array.isArray(h)){p=4*h.length,c=s._malloc(p),r.push(c);let y=c/4;for(let $=0;$<h.length;$++){if(typeof h[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);s.HEAPU32[y++]=Ce(h[$],r)}}else p=h.byteLength,c=s._malloc(p),r.push(c),s.HEAPU8.set(new Uint8Array(h.buffer,h.byteOffset,p),c)}let m=s.stackSave(),g=s.stackAlloc(4*i.length);try{let h=g/4;i.forEach($=>s.HEAP32[h++]=$);let y=s._OrtCreateTensor($n(d),c,p,g,i.length,xn(l));y===0&&we(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(y)}finally{s.stackRestore(m)}},yr=async(e,t,r,n,o,a)=>{let s=_e(),d=wt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let i=d[0],l=d[1],c=d[2],p=d[3],m=d[4],g=d[5],h=t.length,y=n.length,$=0,v=[],w=[],x=[],S=[],C=s.stackSave(),T=s.stackAlloc(h*4),P=s.stackAlloc(h*4),O=s.stackAlloc(y*4),U=s.stackAlloc(y*4);try{[$,v]=Zi(a);for(let L=0;L<h;L++)Fd(r[L],w,S,e,t[L],m);for(let L=0;L<y;L++)Fd(o[L],x,S,e,h+n[L],m);let V=T/4,q=P/4,j=O/4,oe=U/4;for(let L=0;L<h;L++)s.HEAPU32[V++]=w[L],s.HEAPU32[q++]=l[t[L]];for(let L=0;L<y;L++)s.HEAPU32[j++]=x[L],s.HEAPU32[oe++]=c[n[L]];if(p&&!g){let{handle:L,outputPreferredLocations:ye,outputPreferredLocationsEncoded:ie}=p;if(l.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${l.length}).`);for(let X=0;X<h;X++){let Z=t[X];await s._OrtBindInput(L,l[Z],w[X])!==0&&we(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<y;X++){let Z=n[X];o[X]?.[3]?s._OrtBindOutput(L,c[Z],x[X],0)!==0&&we(`Can't bind pre-allocated output[${X}] for session=${e}.`):s._OrtBindOutput(L,c[Z],0,ie[Z])!==0&&we(`Can't bind output[${X}] to ${ye[X]} for session=${e}.`)}wt.set(e,[i,l,c,p,m,!0])}s.jsepOnRunStart?.(i);let ne;p?ne=await s._OrtRunWithBinding(i,p.handle,y,O,$):ne=await s._OrtRun(i,P,T,h,U,y,O,$),ne!==0&&we("failed to call OrtRun().");let ue=[];for(let L=0;L<y;L++){let ye=s.HEAPU32[O/4+L];if(ye===x[L]){ue.push(o[L]);continue}let ie=s.stackSave(),X=s.stackAlloc(4*4),Z=!1,F,ae=0;try{s._OrtGetTensorData(ye,X,X+4,X+8,X+12)!==0&&we(`Can't access output tensor data on index ${L}.`);let D=X/4,K=s.HEAPU32[D++];ae=s.HEAPU32[D++];let se=s.HEAPU32[D++],Ae=s.HEAPU32[D++],be=[];for(let xe=0;xe<Ae;xe++)be.push(s.HEAPU32[se/4+xe]);s._OrtFree(se);let Me=be.reduce((xe,ke)=>xe*ke,1);F=at(K);let kt=p?.outputPreferredLocations[n[L]];if(F==="string"){if(kt==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let xe=[],ke=ae/4;for(let et=0;et<Me;et++){let Et=s.HEAPU32[ke++],Kt=et===Me-1?void 0:s.HEAPU32[ke]-Et;xe.push(s.UTF8ToString(Et,Kt))}ue.push([F,be,xe,"cpu"])}else if(kt==="gpu-buffer"&&Me>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ke=xe(ae),et=ft(K,Me);if(et===void 0||!xr(F))throw new Error(`Unsupported data type: ${F}`);Z=!0,ue.push([F,be,{gpuBuffer:ke,download:s.jsepCreateDownloader(ke,et,F),dispose:()=>{s._OrtReleaseTensor(ye)}},"gpu-buffer"])}else{let xe=$r(F),ke=new xe(Me);new Uint8Array(ke.buffer,ke.byteOffset,ke.byteLength).set(s.HEAPU8.subarray(ae,ae+ke.byteLength)),ue.push([F,be,ke,"cpu"])}}finally{s.stackRestore(ie),F==="string"&&ae&&s._free(ae),Z||s._OrtReleaseTensor(ye)}}return p&&!m&&(s._OrtClearBoundOutputs(p.handle),wt.set(e,[i,l,c,p,m,!1])),ue}finally{s.stackRestore(C),w.forEach(V=>s._OrtReleaseTensor(V)),x.forEach(V=>s._OrtReleaseTensor(V)),S.forEach(V=>s._free(V)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(V=>s._free(V))}},br=e=>{let t=_e(),r=wt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&we("Can't get an profile file name."),t._OrtFree(o)},wr=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var vt,Ge,qt,qr,Kr,Fr,ro,no,Tt,At,nf,qd,Kd,jd,Yd,Zd,Xd,Qd,oo=B(()=>{"use strict";Le();bn();mt();Dt();vt=()=>!!me.wasm.proxy&&typeof document<"u",qt=!1,qr=!1,Kr=!1,no=new Map,Tt=(e,t)=>{let r=no.get(e);r?r.push(t):no.set(e,[t])},At=()=>{if(qt||!qr||Kr||!Ge)throw new Error("worker not ready")},nf=e=>{switch(e.data.type){case"init-wasm":qt=!1,e.data.err?(Kr=!0,ro[1](e.data.err)):(qr=!0,ro[0]()),Fr&&(URL.revokeObjectURL(Fr),Fr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=no.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},qd=async()=>{if(!qr){if(qt)throw new Error("multiple calls to 'initWasm()' detected.");if(Kr)throw new Error("previous call to 'initWasm()' failed.");if(qt=!0,vt())return new Promise((e,t)=>{Ge?.terminate(),Ki().then(([r,n])=>{try{Ge=n,Ge.onerror=a=>t(a),Ge.onmessage=nf,ro=[e,t];let o={type:"init-wasm",in:me};Ge.postMessage(o),Fr=r}catch(o){t(o)}},t)});try{await pr(me.wasm),await mr(me),qr=!0}catch(e){throw Kr=!0,e}finally{qt=!1}}},Kd=async e=>{if(vt())return At(),new Promise((t,r)=>{Tt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:me}};Ge.postMessage(n)});await fr(me,e)},jd=async e=>vt()?(At(),new Promise((t,r)=>{Tt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ge.postMessage(n,[e.buffer])})):Bt(e),Yd=async(e,t)=>{if(vt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return At(),new Promise((r,n)=>{Tt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Ge.postMessage(o,a)})}else return hr(e,t)},Zd=async e=>{if(vt())return At(),new Promise((t,r)=>{Tt("release",[t,r]);let n={type:"release",in:e};Ge.postMessage(n)});gr(e)},Xd=async(e,t,r,n,o,a)=>{if(vt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return At(),new Promise((s,d)=>{Tt("run",[s,d]);let i=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:i,outputIndices:n,options:a}};Ge.postMessage(l,wr(i))})}else return yr(e,t,r,n,o,a)},Qd=async e=>{if(vt())return At(),new Promise((t,r)=>{Tt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ge.postMessage(n)});br(e)}});var Jd,of,jr,el=B(()=>{"use strict";Le();oo();Y();cr();Sn();Jd=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},of=e=>{switch(e[3]){case"cpu":return new Pe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!xr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Pe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},jr=class{async fetchModelAndCopyToWasmMemory(t){return jd(await Ut(t))}async loadModel(t,r){Ve();let n;typeof t=="string"?!1?n=await Ut(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await Yd(n,r),De()}async dispose(){return Zd(this.sessionId)}async run(t,r,n){Ve();let o=[],a=[];Object.entries(t).forEach(m=>{let g=m[0],h=m[1],y=this.inputNames.indexOf(g);if(y===-1)throw new Error(`invalid input '${g}'`);o.push(h),a.push(y)});let s=[],d=[];Object.entries(r).forEach(m=>{let g=m[0],h=m[1],y=this.outputNames.indexOf(g);if(y===-1)throw new Error(`invalid output '${g}'`);s.push(h),d.push(y)});let i=o.map((m,g)=>Jd(m,()=>`input "${this.inputNames[a[g]]}"`)),l=s.map((m,g)=>m?Jd(m,()=>`output "${this.outputNames[d[g]]}"`):null),c=await Xd(this.sessionId,a,i,d,l,n),p={};for(let m=0;m<c.length;m++)p[this.outputNames[d[m]]]=s[m]??of(c[m]);return De(),p}startProfiling(){}endProfiling(){Qd(this.sessionId)}}});var af,Yr,tl=B(()=>{"use strict";Le();oo();el();Dt();af=()=>{if((typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0),me.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let e=typeof navigator>"u"?mn("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},Yr=class{async init(t){af(),await qd(),await Kd(t)}async createInferenceSessionHandler(t,r){let n=new jr;return await n.loadModel(t,r),Promise.resolve(n)}}});var rl={};Ot(rl,{wasmBackend:()=>sf});var sf,nl=B(()=>{"use strict";tl();sf=new Yr});Le();Le();Le();var Ui="1.20.0";var V$=yn;{let e=(nl(),rr(rl)).wasmBackend;ct("webgpu",e,5),ct("webnn",e,5),ct("cpu",e,10),ct("wasm",e,10)}Object.defineProperty(me.versions,"web",{value:Ui,enumerable:!0});export{Gl as InferenceSession,ur as TRACE,Ve as TRACE_FUNC_BEGIN,De as TRACE_FUNC_END,Pe as Tensor,ql as TrainingSession,V$ as default,me as env,ct as registerBackend};
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
//# sourceMappingURL=ort.webgpu.bundle.min.mjs.map
