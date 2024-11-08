/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var mn=Object.defineProperty;var mu=Object.getOwnPropertyDescriptor;var fu=Object.getOwnPropertyNames;var hu=Object.prototype.hasOwnProperty;var fn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var gt=(e,t)=>{for(var n in t)mn(e,n,{get:t[n],enumerable:!0})},gu=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of fu(t))!hu.call(e,o)&&o!==n&&mn(e,o,{get:()=>t[o],enumerable:!(r=mu(t,o))||r.enumerable});return e};var hn=e=>gu(mn({},"__esModule",{value:!0}),e);var yt,Ne,We,yu,bt,wt=A(()=>{yt=new Map,Ne=[],We=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=yt.get(e);if(r===void 0)yt.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=Ne.indexOf(e);o!==-1&&Ne.splice(o,1);for(let i=0;i<Ne.length;i++)if(yt.get(Ne[i]).priority<=n){Ne.splice(i,0,e);return}Ne.push(e)}return}throw new TypeError("not a valid backend")},yu=async e=>{let t=yt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},bt=async e=>{let t=e.executionProviders||[],n=t.map(u=>typeof u=="string"?u:u.name),r=n.length===0?Ne:n,o,i=[],s=new Set;for(let u of r){let d=await yu(u);typeof d=="string"?i.push({name:u,err:d}):(o||(o=d),o===d&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let a=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(e,{get:(u,d)=>d==="executionProviders"?a:Reflect.get(u,d)})]}});var ar=A(()=>{wt()});var ur,dr=A(()=>{ur="1.21.0"});var lr,we,gn=A(()=>{dr();lr="warning",we={wasm:{},webgl:{},webgpu:{},versions:{common:ur},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);lr=e}},get logLevel(){return lr}};Object.defineProperty(we,"logLevel",{enumerable:!0})});var te,cr=A(()=>{gn();te=we});var pr,mr,fr=A(()=>{pr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",a=t?.norm,u,d;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?d=[0,0,0,0]:typeof a.bias=="number"?d=[a.bias,a.bias,a.bias,a.bias]:(d=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(d[3]=a.bias[3]));let l=i*o,c=0,p=l,h=l*2,m=-1;s==="RGBA"?(c=0,p=l,h=l*2,m=l*3):s==="RGB"?(c=0,p=l,h=l*2):s==="RBG"&&(c=0,h=l,p=l*2);for(let f=0;f<i;f++)for(let b=0;b<o;b++){let y=(e.data[c++]-d[0])*u[0],g=(e.data[p++]-d[1])*u[1],w=(e.data[h++]-d[2])*u[2],_=m===-1?255:(e.data[m++]-d[3])*u[3];r.fillStyle="rgba("+y+","+g+","+w+","+_+")",r.fillRect(b,f,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},mr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],s=e.dims[3]):(o=e.dims[3],i=e.dims[2],s=e.dims[1]);let a=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,l;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?l=[0,0,0,0]:typeof u.bias=="number"?l=[u.bias,u.bias,u.bias,u.bias]:(l=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(l[3]=u.bias[3]));let c=i*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,m=1,f=2,b=3,y=0,g=c,w=c*2,_=-1;a==="RGBA"?(y=0,g=c,w=c*2,_=c*3):a==="RGB"?(y=0,g=c,w=c*2):a==="RBG"&&(y=0,w=c,g=c*2),r=n.createImageData(o,i);for(let $=0;$<i*o;h+=p,m+=p,f+=p,b+=p,$++)r.data[h]=(e.data[y++]-l[0])*d[0],r.data[m]=(e.data[g++]-l[1])*d[1],r.data[f]=(e.data[w++]-l[2])*d[2],r.data[b]=_===-1?255:(e.data[_++]-l[3])*d[3]}else throw new Error("Can not access image data");return r}});var yn,hr,gr,yr,br,wr,_r=A(()=>{_t();yn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*r,l=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,p=0,h=1,m=2,f=3,b=0,y=d,g=d*2,w=-1;a==="RGB"&&(c=3,p=0,h=1,m=2,f=-1),u==="RGBA"?w=d*3:u==="RBG"?(b=0,g=d,y=d*2):u==="BGR"&&(g=0,y=d,b=d*2);for(let $=0;$<d;$++,p+=c,m+=c,h+=c,f+=c)l[b++]=(e[p]+s[0])/i[0],l[y++]=(e[h]+s[1])/i[1],l[g++]=(e[m]+s[2])/i[2],w!==-1&&f!==-1&&(l[w++]=(e[f]+s[3])/i[3]);return u==="RGBA"?new fe("float32",l,[1,4,n,r]):new fe("float32",l,[1,3,n,r])},hr=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,a=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=l=>typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||l instanceof OffscreenCanvas?l.getContext("2d"):null;if(n){let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(a=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=h}else a.tensorFormat="RGBA",a.height=p,a.width=h;c.drawImage(e,0,0),s=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(r){let l,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(l=t.resizedHeight,c=t.resizedWidth):(l=e.height,c=e.width),t!==void 0&&(a=t),a.format="RGBA",a.height=l,a.width=c,t!==void 0){let p=u();p.width=c,p.height=l;let h=d(p);if(h!=null)h.putImageData(e,0,0),s=h.getImageData(0,0,c,l).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),s=c.getImageData(0,0,h,p).data,a.height=p,a.width=h,yn(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((l,c)=>{let p=u(),h=d(p);if(!e||!h)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,h.drawImage(m,0,0,p.width,p.height);let f=h.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,l(yn(f.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return yn(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},gr=(e,t)=>{let{width:n,height:r,download:o,dispose:i}=t,s=[1,r,n,4];return new fe({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:i})},yr=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new fe({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:i})},br=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new fe({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:i})},wr=(e,t,n)=>new fe({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var Le,et,$r,vr,xr=A(()=>{Le=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),et=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),$r=!1,vr=()=>{if(!$r){$r=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;e&&(Le.set("int64",BigInt64Array),et.set(BigInt64Array,"int64")),t&&(Le.set("uint64",BigUint64Array),et.set(BigUint64Array,"uint64")),n?(Le.set("float16",Float16Array),et.set(Float16Array,"float16")):Le.set("float16",Uint16Array)}}});var Sr,Ir,Tr=A(()=>{_t();Sr=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Ir=(e,t)=>{switch(e.location){case"cpu":return new fe(e.type,e.data,t);case"cpu-pinned":return new fe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new fe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new fe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new fe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var fe,_t=A(()=>{fr();_r();xr();Tr();fe=class{constructor(t,n,r){vr();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let a=Le.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof t=="string")if(o=t,u=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let d=Le.get(t);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&d===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${d.name} as data.`);t==="uint64"||t==="int64"?a=d.from(n,BigInt):a=d.from(n)}else if(n instanceof d)a=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${d}`)}else if(u=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof t[0];if(d==="string")o="string",a=t;else if(d==="boolean")o="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(t);else{let d=et.get(t.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=d,a=t}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Sr(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(t,n){return hr(t,n)}static fromTexture(t,n){return gr(t,n)}static fromGpuBuffer(t,n){return yr(t,n)}static fromMLTensor(t,n){return br(t,n)}static fromPinnedBuffer(t,n,r){return wr(t,n,r)}toDataURL(t){return pr(this,t)}toImageData(t){return mr(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ir(this,t)}}});var he,$t=A(()=>{_t();he=fe});var vt,Cr,_e,ye,bn=A(()=>{gn();vt=(e,t)=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||console.timeStamp(`${e}::ORT::${t}`)},Cr=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),vt("CPU",i);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},_e=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cr("BEGIN",e)},ye=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||Cr("END",e)}});var xt,Ar=A(()=>{wt();$t();bn();xt=class e{constructor(t){this.handler=t}async run(t,n,r){_e();let o={},i={};if(typeof t!="object"||t===null||t instanceof he||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of n){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);o[d]=null}if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(l.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof he)&&(d=!0,s=!1,o[c]=p)}if(d){if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)o[d]=null;let a=await this.handler.run(t,o,i),u={};for(let d in a)if(Object.hasOwnProperty.call(a,d)){let l=a[d];l instanceof he?u[d]=l:u[d]=new he(l.type,l.data,l.dims)}return ye(),u}async release(){return this.handler.dispose()}static async create(t,n,r,o){_e();let i,s={};if(typeof t=="string"){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let l=t,c=0,p=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=l.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${l.byteLength}).`);if(p=t.byteLength-c,typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>l.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${l.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(l,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await bt(s),d=await a.createInferenceSessionHandler(i,u);return ye(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var bu,kr=A(()=>{Ar();bu=xt});var Er=A(()=>{});var Pr=A(()=>{});var zr=A(()=>{});var Br=A(()=>{});var wu,St,Or=A(()=>{wt();$t();wu="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",St=class e{constructor(t,n,r){this.handler=t,this.hasOptimizerModel=n,this.hasEvalModel=r}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,n){let r=t.evalModel||"",o=t.optimizerModel||"",i=n||{},[s,a]=await bt(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,r,o,a);return new e(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error(wu)}typeNarrowingForRunStep(t,n,r,o,i){let s={},a={};if(typeof r!="object"||r===null||r instanceof he||Array.isArray(r))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof he)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let d of o){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);s[d]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(o);for(let c of n)if(l.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof he)&&(d=!0,u=!1,s[c]=p)}if(d){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of t)if(typeof r[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(u)for(let d of n)s[d]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(t){let n={};for(let r in t)if(Object.hasOwnProperty.call(t,r)){let o=t[r];o instanceof he?n[r]=o:n[r]=new he(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,n,r){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,n,r),s=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,n,r){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,n,r),s=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,n=!0){let r=await this.getParametersSize(n);if(t.length!==4*r)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,n)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var _u,Dr=A(()=>{Or();_u=St});var wn={};gt(wn,{InferenceSession:()=>bu,TRACE:()=>vt,TRACE_FUNC_BEGIN:()=>_e,TRACE_FUNC_END:()=>ye,Tensor:()=>he,TrainingSession:()=>_u,env:()=>te,registerBackend:()=>We});var Se=A(()=>{ar();cr();kr();$t();Er();Pr();bn();zr();Br();Dr()});var It=A(()=>{"use strict"});var Ur={};gt(Ur,{default:()=>$u});var Mr,Vr,$u,Nr=A(()=>{"use strict";_n();Me();tt();Mr="ort-wasm-proxy-worker",Vr=globalThis.self?.name===Mr;Vr&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Tt(n.wasm).then(()=>{Ct(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;At(o,r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:r}=n,o=nt(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;kt(r,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Et(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;Pt(r,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Bt([...i,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":zt(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});$u=Vr?null:e=>new Worker(e??Ie,{type:"module",name:Mr})});var Ie,vu,Lr,xu,Su,Gr,Iu,Wr,Hr,qr,tt=A(()=>{"use strict";It();Ie=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),vu=!1||typeof location>"u"?void 0:location.origin,Lr=(e,t)=>{try{let n=t??Ie;return(n?new URL(e,n):new URL(e)).origin===vu}catch{return!1}},xu=(e,t)=>{let n=t??Ie;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Su=(e,t)=>`${t??"./"}${e}`,Gr=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Iu=async e=>(await import(/*webpackIgnore:true*/e)).default,Wr=(Nr(),hn(Ur)).default,Hr=async()=>{if(!Ie)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Lr(Ie))return[void 0,Wr()];let e=await Gr(Ie);return[e,Wr(e)]},qr=async(e,t,n)=>{{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??xu(r,t),i=!!1&&n&&o&&!Lr(o,t),s=i?await Gr(o):o??Su(r,t);return[i?s:void 0,await Iu(s)]}}});var $n,vn,Ot,Fr,Tu,Cu,Tt,ae,Me=A(()=>{"use strict";tt();vn=!1,Ot=!1,Fr=!1,Tu=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Cu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tt=async e=>{if(vn)return Promise.resolve();if(Ot)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Fr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ot=!0;let t=e.initTimeout,n=e.numThreads;if(!Cu())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=Tu();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,d=u?.href??u,l=e.wasmBinary,[c,p]=await qr(a,i,n>1),h=!1,m=[];if(t>0&&m.push(new Promise(f=>{setTimeout(()=>{h=!0,f()},t)})),m.push(new Promise((f,b)=>{let y={numThreads:n};l?y.wasmBinary=l:(d||i)&&(y.locateFile=(g,w)=>d??(i??w)+g),p(y).then(g=>{Ot=!1,vn=!0,$n=g,f(),c&&URL.revokeObjectURL(c)},g=>{Ot=!1,Fr=!0,b(g)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ae=()=>{if(vn&&$n)return $n;throw new Error("WebAssembly is not initialized yet.")}});var le,rt,X,Dt=A(()=>{"use strict";Me();le=(e,t)=>{let n=ae(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},rt=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,i])=>{let s=t?t+o:o;if(typeof i=="object")rt(i,s+".",n,r);else if(typeof i=="string"||typeof i=="number")r(s,i.toString());else if(typeof i=="boolean")r(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},X=e=>{let t=ae(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let i=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),a=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(n)}}});var Kr,jr=A(()=>{"use strict";Me();Dt();Kr=e=>{let t=ae(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=le(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&X("Can't create run options."),e?.extra!==void 0&&rt(e.extra,"",new WeakSet,(s,a)=>{let u=le(s,r),d=le(a,r);t._OrtAddRunConfigEntry(n,u,d)!==0&&X(`Can't set a run config entry: ${s} - ${a}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),i}}});var Au,ku,Eu,Pu,Zr,Xr=A(()=>{"use strict";Me();Dt();Au=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ku=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Eu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Pu=(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name;switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let a=r?.deviceType;if(a){let u=le("deviceType",n),d=le(a,n);ae()._OrtAddSessionConfigEntry(e,u,d)!==0&&X(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof r!="string"){let s=r;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=le("preferredLayout",n),u=le(s.preferredLayout,n);ae()._OrtAddSessionConfigEntry(e,a,u)!==0&&X(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=le(o,n);ae()._OrtAppendExecutionProvider(e,i)!==0&&X(`Can't append execution provider: ${o}.`)}},Zr=e=>{let t=ae(),n=0,r=[],o=e||{};Eu(o);try{let i=Au(o.graphOptimizationLevel??"all"),s=ku(o.executionMode??"sequential"),a=typeof o.logId=="string"?le(o.logId,r):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let d=o.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let l=typeof o.optimizedModelFilePath=="string"?le(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,d,l),n===0&&X("Can't create session options."),o.executionProviders&&Pu(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=le("enableGraphCapture",r),p=le(o.enableGraphCapture.toString(),r);t._OrtAddSessionConfigEntry(n,c,p)!==0&&X(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=le(c,r);t._OrtAddFreeDimensionOverride(n,h,p)!==0&&X(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&rt(o.extra,"",new WeakSet,(c,p)=>{let h=le(c,r),m=le(p,r);t._OrtAddSessionConfigEntry(n,h,m)!==0&&X(`Can't set a session config entry: ${c} - ${p}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&X("Can't release session options."),r.forEach(s=>t._free(s)),i}}});var ot,Ve,He,Rt,it,Mt,Vt,xn,M=A(()=>{"use strict";ot=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ve=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},He=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return n>0?Math.ceil(r*n):void 0},Rt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},it=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Vt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",xn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var st,Sn=A(()=>{"use strict";It();st=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=fn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=fn("node:fs"),r=n(e),o=[];for await(let i of r)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(a){if(a instanceof RangeError){let u=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let d=u.byteLength;new Uint8Array(i,s,d).set(u),s+=d}return new Uint8Array(i,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var zu,Bu,Qr,Yr,Ut,Ou,j,Ce=A(()=>{"use strict";M();zu=["V","I","W","E","F"],Bu=(e,t)=>{console.log(`[${zu[e]},${new Date().toISOString()}]${t}`)},Ut=(e,t)=>{Qr=e,Yr=t},Ou=(e,t)=>{let n=it(e),r=it(Qr);n>=r&&Bu(n,typeof t=="function"?t():t)},j=(...e)=>{Yr&&Ou(...e)}});var Nt,In=A(()=>{"use strict";M();Nt=(e,t)=>new(Rt(t))(e)});var Wt=A(()=>{"use strict"});var Jr,Tn,Cn,Du,Ru,eo,kn,An,no,ro=A(()=>{"use strict";Ce();Wt();Jr=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Tn=[],Cn=e=>Math.ceil(Number(e)/16)*16,Du=e=>{for(let t=0;t<Tn.length;t++){let n=Tn[t];if(e<=n)return n}return Math.ceil(e/16)*16},Ru=1,eo=()=>Ru++,kn=async(e,t,n,r)=>{let o=Cn(n),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(r){let u=r();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},An=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Jr)Tn.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,i=n.byteLength,s=Cn(i),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,o,i)),u.unmap();let l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),j("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(u)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Cn(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=eo();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),j("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Du(t),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let d=(i?this.freeBuffers:this.freeUniformBuffers).get(r);d?d.length>0?o=d.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let a={id:eo(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(t)}),j("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return j("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await kn(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=Jr.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(j("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},no=(...e)=>new An(...e)});var En,U,ue=A(()=>{"use strict";En=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},U=e=>new En(e)});var Pn,ke,x,qe,Lt,oo,io,q=A(()=>{"use strict";Pn=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},ke=class{static calcShape(t,n,r=!1){let o=t.length,i=n.length;if(o===0)return n;if(i===0)return t;let s=Math.max(t.length,n.length),a=new Array(s);if(r){if(o<2||i<2)return;let u=Pn.calcMatMulShape([t[o-2],t[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=r?3:1;u<=s;u++){let d=o-u<0?1:t[o-u],l=i-u<0?1:n[i-u];if(d!==l&&d>1&&l>1)return;let c=Math.max(d,l);if(d&&l)a[s-u]=Math.max(d,l);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let i=1;i<=r;i++)if(t[r-i]!==1&&t[r-i]!==n[o-i])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),i=r-1;for(;i>=0;){if(t[i]%n===0){o[i]=t[i]/n;break}if(n%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let i=n;i<r;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,i)=>o+n[i]+n[i+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},qe=class e{static adjustPoolAttributes(t,n,r,o,i,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let a=0;a<n.length-2;a++)a>=r.length?r.push(n[a+2]):r[a]=n[a+2];for(let a=0;a<r.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<r.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<r.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<r.length;a++){if(r[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=r[a]||s[a+r.length]>=r[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,i,s,a){if(a){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(s?1:2)],n[u],r[u],o[u],i,u,u+t.length-2,a)}}static computePoolOutputShape(t,n,r,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return e.computeShapeHelper(t,n,u,r,o,i,s,a),u}static computeConvOutputShape(t,n,r,o,i,s,a){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],n[0]];return e.computeShapeHelper(!1,t,u,r,o,i,s,a),u}static computeShapeHelper(t,n,r,o,i,s,a,u){if(t)for(let d=0;d<n.length-2;d++)r.push(1);else for(let d=0;d<n.length-2;d++)r.push(e.adjustPadAndReturnShape(n[d+2],o[d],i[d],s[d],a,d,d+n.length-2,u))}static adjustPadAndReturnShape(t,n,r,o,i,s,a,u){let d=r*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((t-d)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+o-t;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((t+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[a]-d)/n+1)}},Lt=class{static getShapeOfGemmResult(t,n,r,o,i){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=t[1],a=t[0]):(s=t[0],a=t[1]);let d=-1;if(o?(u=r[0],d=1):(u=r[1],d=0),r[d]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!ke.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},oo=-34028234663852886e22,io=34028234663852886e22});var Fe,Bn,J,ce,k,ne,On,Ke,Ae,O,Dn,S,C,Gt,zn,so,Xe,F=A(()=>{"use strict";M();q();Fe=64,Bn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},J=(e,t=1)=>{let n=Bn(e,t);return typeof n=="string"?n:n[0]},ce=(e,t=1)=>{let n=Bn(e,t);return typeof n=="string"?n:n[1]},k=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:x.computeStrides(n)})}),t},ne=e=>e%4===0?4:e%2===0?2:1,On=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Ke=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Ae=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,O=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Dn=(e,t,n,r,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Bn(t,o),l=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],p={indices:u,value:l,storage:c,tensor:t},h=E=>typeof E=="string"?E:`${E}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},f=i?"uniforms.":"",b=`${f}${e}_shape`,y=`${f}${e}_strides`,g="";for(let E=0;E<s-1;E++)g+=`
    let dim${E} = current / ${O(y,E,s)};
    let rest${E} = current % ${O(y,E,s)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;g+=`indices[${s-1}] = current;`;let w=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,_=E=>(m.offsetToIndices=!0,s<2?E:`o2i_${e}(${E})`),$=[];if(s>=2)for(let E=s-1;E>=0;E--)$.push(`${O(y,E,s)} * (indices[${E}])`);let v=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${$.join("+")};
  }`,I=E=>(m.indicesToOffset=!0,s<2?E:`i2o_${e}(${E})`),T=(...E)=>s===0?"0u":`${p.indices}(${E.map(h).join(",")})`,P=(E,R)=>s<2?`${E}`:`${O(E,R,s)}`,B=(E,R,Y)=>s<2?`${E}=${Y};`:`${O(E,R,s)}=${Y};`,D={},L=(E,R)=>{m.broadcastedIndicesToOffset=!0;let Y=`${R.name}broadcastedIndicesTo${e}Offset`;if(Y in D)return`${Y}(${E})`;let ge=[];for(let ie=s-1;ie>=0;ie--){let de=R.indicesGet("outputIndices",ie+R.rank-s);ge.push(`${P(y,ie)} * (${de} % ${P(b,ie)})`)}return D[Y]=`fn ${Y}(outputIndices: ${R.type.indices}) -> u32 {
             return ${ge.length>0?ge.join("+"):"0u"};
           }`,`${Y}(${E})`},z=(E,R)=>(()=>{if(p.storage===p.value)return`${e}[${E}]=${R};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${E}]=vec2<u32>(u32(${R}), select(0u, 0xFFFFFFFFu, ${R} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${E}]=vec2<u32>(u32(${R}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${R}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),N=E=>(()=>{if(p.storage===p.value)return`${e}[${E}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${E}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${E}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${E}] & 0xFFu), bool(${e}[${E}] & 0xFF00u), bool(${e}[${E}] & 0xFF0000u), bool(${e}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),se=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${l} {
    return ${N(`i2o_${e}(indices)`)};
  }`,W=s<2?"":(()=>{let E=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn get_${e}(${E}) -> ${l} {
    return get_${e}ByIndices(${T(R)});
  }`})(),Z=(...E)=>{if(E.length!==s)throw new Error(`indices length must be ${s}`);let R=E.map(h).join(",");return s===0?N("0u"):s===1?N(R[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${R})`)},K=E=>s<2?N(E):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${E})`),V=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${l}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,re=s<2?"":(()=>{let E=a.map(Y=>`d${Y}: u32`).join(", "),R=a.map(Y=>`d${Y}`).join(", ");return`
  fn set_${e}(${E}, value: ${l}) {
    set_${e}ByIndices(${T(R)}, value);
  }`})();return{impl:()=>{let E=[],R=!1;return m.offsetToIndices&&(E.push(w),R=!0),m.indicesToOffset&&(E.push(v),R=!0),m.broadcastedIndicesToOffset&&(Object.values(D).forEach(Y=>E.push(Y)),R=!0),m.set&&(E.push(re),R=!0),m.setByIndices&&(E.push(V),R=!0),m.get&&(E.push(W),R=!0),m.getByIndices&&(E.push(se),R=!0),!i&&R&&E.unshift(`const ${b} = ${p.indices}(${n.join(",")});`,`const ${y} = ${p.indices}(${x.computeStrides(n).join(",")});`),E.join(`
`)},type:p,offsetToIndices:_,indicesToOffset:I,broadcastedIndicesToOffset:L,indices:T,indicesGet:P,indicesSet:B,set:(...E)=>{if(E.length!==s+1)throw new Error(`indices length must be ${s}`);let R=E[s];if(typeof R!="string")throw new Error("value must be string");let Y=E.slice(0,s).map(h).join(",");return s===0?z("0u",R):s===1?z(Y[0],R):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${Y}, ${R})`)},setByOffset:z,setByIndices:(E,R)=>s<2?z(E,R):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${E}, ${R});`),get:Z,getByOffset:N,getByIndices:K,usage:r,name:e,strides:y,shape:b,rank:s}},S=(e,t,n,r=1)=>Dn(e,t,n,"input",r),C=(e,t,n,r=1)=>Dn(e,t,n,"output",r),Gt=(e,t,n,r=1)=>Dn(e,t,n,"internal",r),zn=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Fe){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},so=(e,t)=>new zn(e,t),Xe=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;o++){let i=n-1-o,s=e[i]||1;(t[t.length-1-o]||1)>1&&s===1&&r.unshift(i)}return r}});var Mu,ao,Vu,Uu,Nu,pe,uo,lo,De=A(()=>{"use strict";M();q();ue();F();Mu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ao=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Vu=(e,t)=>x.sortBasedOnPerm(e,ao(e.length,t)),Uu=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<t;++i)o+=n.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},Nu=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},pe=(e,t)=>{let n=e.dataType,r=e.dims.length,o=ao(r,t),i=Vu(e.dims,o),{newShape:s,newPerm:a}=Nu(e.dims,o),u=x.areEqual(a,[2,3,1]),d=x.areEqual(a,[3,1,2]),l=s.length===2&&a[0]>a[1]||u||d,c=l?s:e.dims,p=i;l&&(c=u?[s[0],s[1]*s[2]]:d?[s[0]*s[1],s[2]]:s,p=[c[1],c[0]]);let h=S("a",n,c.length),m=C("output",n,p.length),f=16,b;return l?b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}
  var<workgroup> tile : array<array<${m.type.value}, ${f+1}>, ${f}>;
  ${y.mainStart([f,f,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${f} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${f}u + local_id.x;
    let input_row = workgroup_id_x * ${f}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${h.getByIndices(`${h.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${f}u + local_id.x;
    let output_row = workgroup_id_y * ${f}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${m.setByIndices(`${m.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}

  ${Uu(o,r,h,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`,{name:l?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=x.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:l?{x:Math.ceil(p[1]/f),y:Math.ceil(p[0]/f)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...k(c,p)]}},getShaderSource:b}},uo=(e,t)=>{Mu(e.inputs),e.compute(pe(e.inputs[0],t.perm))},lo=e=>U({perm:e.perm})});var Wu,Lu,Gu,Hu,qu,Fu,Ku,ju,Zu,Xu,Ee,co,po,mo,fo,ho,go,yo,bo,wo,_o,$o=A(()=>{"use strict";M();q();F();Ht();De();Wu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Lu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Gu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Hu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qu=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Fu=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);let o=t.map(i=>e[i]);return[n,o]},Ku=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let i=0;i<n;i++)t.indexOf(i)===-1?r.push(e[o++]):r.push(1);return r},ju=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Zu=(e,t)=>{let n=[];if(!ju(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Xu=(e,t,n,r,o,i,s)=>{let a=n[0].dims,u=x.size(i),d=x.size(s),l=S("_A",n[0].dataType,a),c=C("output",o,i),p=32,h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(l,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Gu[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${l.getByOffset("offset + k")});
           bestValue = ${Wu[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Lu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${r==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Hu[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},Ee=(e,t,n,r)=>{let o=e.inputs.length===1?n:Rn(e.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((h,m)=>m));let s=x.normalizeAxes(i,e.inputs[0].dims.length),a=s,u=e.inputs[0],d=Zu(a,e.inputs[0].dims.length);d.length>0&&(u=e.compute(pe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],a=qu(a.length,u.dims.length));let[l,c]=Fu(u.dims,a),p=l;o.keepDims&&(p=Ku(l,s)),e.compute(Xu(t,{hint:o.cacheKey,inputDependencies:["type"]},[u],r,e.inputs[0].dataType,p,c),{inputs:[u]})},co=(e,t)=>{Ee(e,"ReduceMeanShared",t,"mean")},po=(e,t)=>{Ee(e,"ReduceL1Shared",t,"l1")},mo=(e,t)=>{Ee(e,"ReduceL2Shared",t,"l2")},fo=(e,t)=>{Ee(e,"ReduceLogSumExpShared",t,"logSumExp")},ho=(e,t)=>{Ee(e,"ReduceMaxShared",t,"max")},go=(e,t)=>{Ee(e,"ReduceMinShared",t,"min")},yo=(e,t)=>{Ee(e,"ReduceProdShared",t,"prod")},bo=(e,t)=>{Ee(e,"ReduceSumShared",t,"sum")},wo=(e,t)=>{Ee(e,"ReduceSumSquareShared",t,"sumSquare")},_o=(e,t)=>{Ee(e,"ReduceLogSumShared",t,"logSum")}});var Pe,Qu,qt,Rn,ze,Yu,Ju,ed,td,nd,rd,od,id,sd,ad,Be,vo,xo,So,Io,To,Co,Ao,ko,Eo,Po,Ht=A(()=>{"use strict";M();q();ue();F();$o();Pe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Qu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qt=(e,t,n,r,o,i,s=!1,a=!1)=>{let u=[],d=n[0].dims,l=d.length,c=x.normalizeAxes(o,l),p=!a&&c.length===0;d.forEach((b,y)=>{p||c.indexOf(y)>=0?s&&u.push(1):u.push(b)});let h=u.length,m=x.size(u);return{name:e,shaderCache:t,getShaderSource:b=>{let y=[],g=S("_A",n[0].dataType,l),w=C("output",i,h),_=r(g,w,c),$=_[2];for(let v=0,I=0;v<l;v++)p||c.indexOf(v)>=0?(s&&I++,$=`for(var j${v}: u32 = 0; j${v} < ${d[v]}; j${v}++) {
                  ${_[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${g.indicesSet("input_indices",v,`j${v}`)}
                  ${$}
                }`):(y.push(`${g.indicesSet("input_indices",v,w.indicesGet("output_indices",I))};`),I++);return`

        ${b.registerUniform("output_size","u32").declareVariables(g,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${_[0]}       // init ops for reduce max/min
          ${_[1]}
          ${$}
          ${_[3]}
          ${_.length===4?w.setByOffset("global_idx","value"):_.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(d,u)]})}},Rn=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),U({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ze=(e,t,n,r)=>{let o=e.inputs,i=o.length===1?n:Rn(o,n);e.compute(qt(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?Qu:r,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Yu=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Ju=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},ed=(e,t)=>{Pe(e.inputs),ze(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},td=(e,t)=>{Pe(e.inputs),ze(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},nd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMax",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},rd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMean",t,(r,o,i)=>{let s=1;for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},od=(e,t)=>{Pe(e.inputs),ze(e,"ReduceMin",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},id=(e,t)=>{Pe(e.inputs),ze(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},sd=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ad=(e,t)=>{Pe(e.inputs),ze(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Be=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?r*=e[i]:o*=e[i];return o<32&&r>1024},vo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):co(e,t)},xo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ju(e,t):po(e,t)},So=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ed(e,t):mo(e,t)},Io=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):fo(e,t)},To=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nd(e,t):ho(e,t)},Co=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?od(e,t):go(e,t)},Ao=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):yo(e,t)},ko=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sd(e,t):bo(e,t)},Eo=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ad(e,t):wo(e,t)},Po=(e,t)=>{Be(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yu(e,t):_o(e,t)}});var zo,Bo,Oo,Mn,Do=A(()=>{"use strict";M();ue();Ht();zo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Bo=(e,t)=>{zo(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Oo=(e,t)=>{zo(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Mn=e=>U(e)});var ud,Vn,dd,ld,cd,Qe,pd,Ro,Ft=A(()=>{"use strict";M();q();Wt();F();ud=(e,t)=>{let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4],a=e[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],d=n.dims[1],l=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==l)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,h=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let w of t.qkvHiddenSizes)if(w%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=d;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(s){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=s.dims[3])}let b=m+f,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==d||a.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:l,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Vn=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,dd=(e,t,n,r,o,i,s,a)=>{let u=ne(s?1:i),d=64,l=i/u;l<d&&(d=32);let c=Math.ceil(i/u/d),p=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:l},{type:12,data:c}],h=J(e.dataType,u),m=ce(1,u),f=["type"];s&&f.push("type"),a&&f.push("type");let b=y=>{let g=C("x",e.dataType,e.dims,u),w=[g],_=s?S("seq_lens",s.dataType,s.dims):void 0;_&&w.push(_);let $=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;$&&w.push($);let v=ce(e.dataType),I=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${y.registerUniforms(I).declareVariables(...w)}
  ${y.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Vn(_,$,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${v}(1.0) / ${v}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${v}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${h};${u}`,inputDependencies:f},getShaderSource:b,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/d),y:o,z:t*n},programUniforms:p})}},ld=(e,t,n,r,o,i,s,a,u)=>{let d=s+i.kvSequenceLength,l=[i.batchSize,i.numHeads,i.sequenceLength,d],c=e>1&&r,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,h=c?[i.batchSize,p,d,i.headSize]:void 0,m=i.nReps?i.nReps:1,f=i.scale===0?1/Math.sqrt(i.headSize):i.scale,b=ne(i.headSize),y=i.headSize/b,g=12,w={x:Math.ceil(d/g),y:Math.ceil(i.sequenceLength/g),z:i.batchSize*i.numHeads},_=[{type:12,data:i.sequenceLength},{type:12,data:y},{type:12,data:d},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:f},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:m}],$=c&&r&&x.size(r.dims)>0,v=["type","type"];$&&v.push("type"),o&&v.push("type"),a&&v.push("type"),u&&v.push("type");let I=[{dims:l,dataType:t.dataType,gpuDataType:0}];c&&I.push({dims:h,dataType:t.dataType,gpuDataType:0});let T=P=>{let B=S("q",t.dataType,t.dims,b),D=S("key",n.dataType,n.dims,b),L=[B,D];if($){let V=S("past_key",r.dataType,r.dims,b);L.push(V)}o&&L.push(S("attention_bias",o.dataType,o.dims));let z=a?S("seq_lens",a.dataType,a.dims):void 0;z&&L.push(z);let N=u?S("total_sequence_length_input",u.dataType,u.dims):void 0;N&&L.push(N);let se=C("output",t.dataType,l),W=[se];c&&W.push(C("present_key",t.dataType,h,b));let Z=ce(1,b),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${B.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${B.type.storage}, ${g*g}>;
  ${P.registerUniforms(K).declareVariables(...L,...W)}
  ${P.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Vn(z,N,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${$&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>$&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${o!==void 0};${r!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:I,dispatchGroup:w,programUniforms:_}),getShaderSource:T}},cd=(e,t,n,r,o,i,s=void 0,a=void 0)=>{let u=i+o.kvSequenceLength,d=o.nReps?o.nReps:1,l=o.vHiddenSize*d,c=e>1&&r,p=o.kvNumHeads?o.kvNumHeads:o.numHeads,h=c?[o.batchSize,p,u,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,l],f=12,b={x:Math.ceil(o.vHeadSize/f),y:Math.ceil(o.sequenceLength/f),z:o.batchSize*o.numHeads},y=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:l},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:d}],g=c&&r&&x.size(r.dims)>0,w=["type","type"];g&&w.push("type"),s&&w.push("type"),a&&w.push("type");let _=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&_.push({dims:h,dataType:t.dataType,gpuDataType:0});let $=v=>{let I=S("probs",t.dataType,t.dims),T=S("v",n.dataType,n.dims),P=[I,T];g&&P.push(S("past_value",r.dataType,r.dims));let B=s?S("seq_lens",s.dataType,s.dims):void 0;s&&P.push(B);let D=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;a&&P.push(D);let z=[C("output",t.dataType,m)];c&&z.push(C("present_value",t.dataType,h));let N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${f}u;
  var<workgroup> tileQ: array<${I.type.value}, ${f*f}>;
  var<workgroup> tileV: array<${I.type.value}, ${f*f}>;
  ${v.registerUniforms(N).declareVariables(...P,...z)}
  ${v.mainStart([f,f,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Vn(B,D,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${I.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>g&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${c?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:w},getRunData:()=>({outputs:_,dispatchGroup:b,programUniforms:y}),getShaderSource:$}},Qe=(e,t,n,r,o,i,s,a,u,d,l=void 0,c=void 0)=>{let p=Math.min(e.outputCount,1+(s?1:0)+(a?1:0)),h=p>1?d.pastSequenceLength:0,m=h+d.kvSequenceLength,f=u&&x.size(u.dims)>0?u:void 0,b=[t,n];p>1&&s&&x.size(s.dims)>0&&b.push(s),f&&b.push(f),l&&b.push(l),c&&b.push(c);let y=e.compute(ld(p,t,n,s,f,d,h,l,c),{inputs:b,outputs:p>1?[-1,1]:[-1]})[0];e.compute(dd(y,d.batchSize,d.numHeads,h,d.sequenceLength,m,l,c),{inputs:l&&c?[y,l,c]:[y],outputs:[]});let g=[y,r];p>1&&a&&x.size(a.dims)>0&&g.push(a),l&&g.push(l),c&&g.push(c),e.compute(cd(p,y,r,a,d,h,l,c),{inputs:g,outputs:p>1?[0,2]:[0]})},pd=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,s=12,a={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],l=c=>{let p=C("output_q",u[0].dataType,n),h=C("output_k",u[0].dataType,n),m=C("output_v",u[0].dataType,n),f=S("input",u[0].dataType,u[0].dims),b=S("weight",u[1].dataType,u[1].dims),y=S("bias",u[2].dataType,u[2].dims),g=f.type.storage,w=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${c.registerUniforms(w).declareVariables(f,b,y,p,h,m)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:d}),getShaderSource:l},{inputs:u,outputs:[-1,-1,-1]})},Ro=(e,t)=>{let n=ud(e.inputs,t),[r,o,i]=pd(e,n);return Qe(e,r,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var md,fd,hd,Mo,Vo=A(()=>{"use strict";Se();M();q();ue();F();md=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,i)=>{let s=o.length;if(s!==r.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==r[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},fd=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,i=e[0].dims,s=r?ne(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=x.size(i)/s,d=r,l=d?i.length:i,c=S("x",e[0].dataType,e[0].dims,s),p=S("scale",e[1].dataType,e[1].dims,a),h=S("bias",e[2].dataType,e[2].dims,a),m=S("inputMean",e[3].dataType,e[3].dims,a),f=S("inputVar",e[4].dataType,e[4].dims,a),b=C("y",e[0].dataType,l,s),y=()=>{let w="";if(r)w=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")w=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{w=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let _=1;_<p.rank;_++)w+=`cIndices[${_}] = outputIndices[${_}];`;w+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return w},g=w=>`
  const epsilon = ${n};
  ${w.registerUniform("outputSize","u32").declareVariables(c,p,h,m,f,b)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...k(i)]:[{type:12,data:u}]})}},hd=e=>U(e),Mo=(e,t)=>{let{inputs:n,outputCount:r}=e,o=hd({...t,outputCount:r});if(te.webgpu.validateInputContent&&md(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(fd(n,o))}});var gd,yd,Uo,No=A(()=>{"use strict";q();F();gd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},yd=e=>{let t=e[0].dims,n=e[0].dims[2],r=x.size(t)/4,o=e[0].dataType,i=S("input",o,t,4),s=S("bias",o,[n],4),a=S("residual",o,t,4),u=C("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:l=>`
  const channels = ${n}u / 4;
  ${l.declareVariables(i,s,a,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Uo=e=>{gd(e.inputs),e.compute(yd(e.inputs))}});var bd,ee,Wo,Lo,Go,Ho,qo,Fo,Ko,jo,Zo,wd,Xo,Qo,Yo,Jo,at,ei,Kt,ti,ni,ri,oi,ii,si,ai,ui,di,li,ci,pi,mi,fi,hi,gi,yi,bi,Un,Nn,wi,_i,$i,_d,$d,vi,jt=A(()=>{"use strict";M();q();ue();F();bd=(e,t,n,r,o,i,s)=>{let a=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let d=S("inputData",n,[a],4),l=C("outputData",r,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(d,l)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx",u)}
  }`},ee=(e,t,n,r,o,i=e.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(x.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:d=>bd(d,x.size(e.dims),e.dataType,i,n,r,a),getRunData:d=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(x.size(d[0].dims)/64/4)},programUniforms:u})}},Wo=e=>{e.compute(ee(e.inputs[0],"Abs","abs"))},Lo=e=>{e.compute(ee(e.inputs[0],"Acos","acos"))},Go=e=>{e.compute(ee(e.inputs[0],"Acosh","acosh"))},Ho=e=>{e.compute(ee(e.inputs[0],"Asin","asin"))},qo=e=>{e.compute(ee(e.inputs[0],"Asinh","asinh"))},Fo=e=>{e.compute(ee(e.inputs[0],"Atan","atan"))},Ko=e=>{e.compute(ee(e.inputs[0],"Atanh","atanh"))},jo=e=>U(e),Zo=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ee(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},wd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return U({min:t,max:n})},Xo=(e,t)=>{let n=t||wd(e.inputs),r=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Qo=e=>{e.compute(ee(e.inputs[0],"Ceil","ceil"))},Yo=e=>{e.compute(ee(e.inputs[0],"Cos","cos"))},Jo=e=>{e.compute(ee(e.inputs[0],"Cosh","cosh"))},at=e=>U(e),ei=(e,t)=>{let n=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
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
}`,ti=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Kt(t)))},ni=e=>{e.compute(ee(e.inputs[0],"Exp","exp"))},ri=e=>{e.compute(ee(e.inputs[0],"Floor","floor"))},oi=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Kt(t)))},ii=(e,t)=>{let n=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},si=e=>{e.compute(ee(e.inputs[0],"Not",t=>`!${t}`))},ai=e=>{e.compute(ee(e.inputs[0],"Neg",t=>`-${t}`))},ui=e=>{e.compute(ee(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},di=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},li=e=>{e.compute(ee(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ci=e=>U(e),pi=(e,t)=>{let n=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},mi=e=>{e.compute(ee(e.inputs[0],"Sin","sin"))},fi=e=>{e.compute(ee(e.inputs[0],"Sinh","sinh"))},hi=e=>{e.compute(ee(e.inputs[0],"Sqrt","sqrt"))},gi=e=>{e.compute(ee(e.inputs[0],"Tan","tan"))},yi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,bi=e=>{e.compute(ee(e.inputs[0],"Tanh",yi))},Un=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${yi("v")};
}
`,Nn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,wi=e=>{let t=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"FastGelu",Nn,Un(t),void 0,e.inputs[0].dataType))},_i=(e,t)=>{let n=ce(e.inputs[0].dataType);return e.compute(ee(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},$i=e=>{e.compute(ee(e.inputs[0],"Log","log"))},_d=(e,t)=>`
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
`,$d=e=>`quick_gelu_impl(${e})`,vi=(e,t)=>{let n=ce(e.inputs[0].dataType);e.compute(ee(e.inputs[0],"QuickGelu",$d,_d(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var vd,xd,Si,Ii=A(()=>{"use strict";q();F();jt();vd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},xd=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=S("input",e[0].dataType,e[0].dims,4),r=S("bias",e[0].dataType,[e[0].dims[2]],4),o=C("output",e[0].dataType,t,4),i=x.size(t)/4,s=J(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(n,r,o)}

  ${Kt(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Si=e=>{vd(e.inputs),e.compute(xd(e.inputs))}});var Sd,Id,Oe,Ti,Ci,Ai,ki,Ei,Pi,zi,Bi,Oi,Di,Ri=A(()=>{"use strict";M();q();F();Sd=(e,t,n,r,o,i,s,a,u,d,l,c)=>{let p,h;typeof a=="string"?p=h=(g,w)=>`${a}((${g}),(${w}))`:typeof a=="function"?p=h=a:(p=a.scalar,h=a.vector);let m=C("outputData",l,r.length,4),f=S("aData",u,t.length,4),b=S("bData",d,n.length,4),y;if(o)if(i){let g=x.size(t)===1,w=x.size(n)===1,_=t.length>0&&t[t.length-1]%4===0,$=n.length>0&&n[n.length-1]%4===0;g||w?y=m.setByOffset("global_idx",h(g?`${f.type.value}(${f.getByOffset("0")}.x)`:f.getByOffset("global_idx"),w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${f.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(s||_?f.getByOffset("offsetA / 4u"):`${f.type.value}(${f.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||$?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",h(f.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(w,_,$="")=>{let v=`aData[indexA${_}][componentA${_}]`,I=`bData[indexB${_}][componentB${_}]`;return`
            let outputIndices${_} = ${m.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offsetA${_} = ${f.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let offsetB${_} = ${b.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let indexA${_} = offsetA${_} / 4u;
            let indexB${_} = offsetB${_} / 4u;
            let componentA${_} = offsetA${_} % 4u;
            let componentB${_} = offsetB${_} % 4u;
            ${w}[${_}] = ${$}(${p(v,I)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(f,b,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},Id=(e,t,n,r,o,i,s=n.dataType)=>{let a=n.dims.map(f=>Number(f)??1),u=r.dims.map(f=>Number(f)??1),d=!x.areEqual(a,u),l=a,c=x.size(a),p=!1,h=!1,m=[d];if(d){let f=ke.calcShape(a,u,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");l=f.slice(),c=x.size(l);let b=x.size(a)===1,y=x.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,w=u.length>0&&u[u.length-1]%4===0;m.push(b),m.push(y),m.push(g),m.push(w);let _=1;for(let $=1;$<l.length;$++){let v=a[a.length-$],I=u[u.length-$];if(v===I)_*=v;else break}_%4===0?(h=!0,p=!0):(b||y||g||w)&&(p=!0)}else p=!0;return m.push(p),{name:e,shaderCache:{hint:t+m.map(f=>f.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:f=>Sd(f,a,u,l,p,d,h,o,n.dataType,r.dataType,s,i),getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(l)/4)},...k(a,u,l)]})}},Oe=(e,t,n,r,o,i)=>{e.compute(Id(t,o??"",e.inputs[0],e.inputs[1],n,r,i))},Ti=e=>{Oe(e,"Add",(t,n)=>`${t}+${n}`)},Ci=e=>{Oe(e,"Div",(t,n)=>`${t}/${n}`)},Ai=e=>{Oe(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},ki=e=>{Oe(e,"Mul",(t,n)=>`${t}*${n}`)},Ei=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Oe(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
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
      `)},Pi=e=>{Oe(e,"Sub",(t,n)=>`${t}-${n}`)},zi=e=>{Oe(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Bi=e=>{Oe(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Oi=e=>{Oe(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Di=e=>{Oe(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Cd,Ad,kd,Ed,Mi,Vi,Ui=A(()=>{"use strict";M();q();ue();F();Cd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,i=r.dims.length;e.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Ad=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,kd=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(i):o===0?r.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?r.push(`else { ${i} }`):r.push(`else if (inputIndex == ${o}) { ${i} }`)}return r.join(`
`)},Ed=(e,t,n,r)=>{let o=x.size(n),i=new Array(e.length),s=new Array(e.length),a=0,u=[],d=[],l=[{type:12,data:o}];for(let f=0;f<e.length;++f)a+=e[f].dims[t],i[f]=a,d.push(e[f].dims.length),s[f]=S(`input${f}`,r,d[f]),u.push("rank"),l.push({type:12,data:i[f]});for(let f=0;f<e.length;++f)l.push(...k(e[f].dims));l.push(...k(n));let c=C("output",r,n.length),p=c.indicesGet("indices",t),h=Array.from(Array(i.length).keys()).map(f=>`uniforms.sizeInConcatAxis${f}`).join(","),m=f=>`

  ${(()=>{f.registerUniform("outputSize","u32");for(let b=0;b<e.length;b++)f.registerUniform(`sizeInConcatAxis${b}`,"u32");return f.declareVariables(...s,c)})()}

  ${Ad(i.length,h)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${kd(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:m}},Mi=(e,t)=>{let n=e.inputs,r=n[0].dims,o=x.normalizeAxis(t.axis,r.length);Cd(n,o);let i=r.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>x.size(a.dims)>0);e.compute(Ed(s,o,i,n[0].dataType),{inputs:s})},Vi=e=>U({axis:e.axis})});var $e,ve,xe,Zt,Re=A(()=>{"use strict";M();q();$e=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},ve=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[oo,io];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var me,Xt,ut=A(()=>{"use strict";me=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Xt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Qt,Wn=A(()=>{"use strict";Qt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Pd,zd,dt,Ni,Bd,lt,Od,ct,pt=A(()=>{"use strict";M();q();F();Re();ut();Pd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,zd=(e,t)=>e?`
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
        }`,dt=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32)=>{let u=t[1]*e[1],d=t[0]*e[0],l=o?u:i,c=o?i:u,p=l/t[0],h=i/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&l%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${l/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${i}>;

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
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Pd(o,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${zd(o,p)}
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
            `,Bd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",lt=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32,u=!1)=>{let d=e[1]*t[1],l=e[0]*t[0],c=o?d:i,p=o?i:d;if(!(p%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],m=c/t[0],f=i/t[1],b=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${l};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Ni(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
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

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${f};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ni(o,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
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
      ${Bd(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${l}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`},Od=(e,t,n,r,o,i=!1)=>{let[s,a,u]=o,[d,l,c,p]=r,h=Xe(s,u),m=Xe(a,u),f=J(r[0].type.tensor),b=()=>{let w=l.rank,_=d.rank,$=`var aIndices: ${l.type.indices};`;for(let v=w-2-1,I=_-1;v>=0;v--,I--)$+=`
aIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return h.forEach(v=>{$+=`
aIndices[${v}] = 0;`}),$+=`
aIndices[${w-2}] = u32(row);
                   aIndices[${w-1}] = u32(colIn);`,$},y=()=>{let w=c.rank,_=d.rank,$=`var bIndices: ${c.type.indices};`;for(let v=w-2-1,I=_-1;v>=0;v--,I--)$+=`
bIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return m.forEach(v=>{$+=`
bIndices[${v}] = 0;`}),$+=`
bIndices[${w-2}] = u32(row);
                   bIndices[${w-1}] = u32(colIn);`,$};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${b()}
        value = ${l.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${me(e,f)} {
      var value = ${me(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${me(e,f)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${me(e,f)}(bias[row])`};`:""}
        ${n}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ct=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s.slice(0,-2),d=a.slice(0,-2),l=r?r.slice(0,-2):n.slice(0,-2),c=x.size(l),p=s[s.length-2],h=s[s.length-1],m=a[a.length-1],f=h%4===0&&m%4===0,b=p<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(m/y[0]/b[0]),Math.ceil(p/y[1]/b[1]),Math.ceil(c/y[2]/b[2])],w=f?4:1,_=[...u,p,h/w],$=_.length,v=[...d,h,m/w],I=v.length,T=[c,p,m/w],P=[{type:6,data:p},{type:6,data:m},{type:6,data:h}];ve(t,P),P.push(...k(l,_,v));let B=["rank","rank"],D=e.length>2;D&&(P.push(...k(e[2].dims)),B.push("rank")),P.push(...k(T));let L=z=>{let N=l.length,se=Gt("batchDims",e[0].dataType,N,1),W=J(e[0].dataType),Z=S("a",e[0].dataType,$,w),K=S("b",e[1].dataType,I,w),V=C("result",e[0].dataType,T.length,w),re=[Z,K];if(D){let R=o?w:1;re.push(S("bias",e[2].dataType,e[2].dims.length,R))}let oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xe(t,oe);let Q=J(V.type.tensor),H=$e(t,V.type.value,Q),E=Od(w,D,H,[se,Z,K,V],[u,d,l],o);return`
  ${z.registerUniforms(oe).registerInternalVariables(se).declareVariables(...re,V)}
  ${E}
  ${f?dt(b,y,W,se):lt(b,y,W,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${t.activation};${f};${o}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:P}),getShaderSource:L}}});var Dd,Wi,Li=A(()=>{"use strict";M();Ce();F();Re();ut();Wn();pt();Dd=(e,t,n,r,o=!1,i,s=4,a=4,u=4,d="f32")=>{let l=B=>{switch(B){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},c=B=>{switch(B){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",f=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${me(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${l(s)}
    }
    return resData;`,w=e?t&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${me(s,d)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${me(s,d)}(0.0);`,_=`${c(a)}`,$=me(u,d),v=e?me(s,d):me(a,d),I=e?me(a,d):me(s,d),T=$e(i,$,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?w:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?_:w}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Xt(o)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Wi=(e,t,n,r,o,i,s,a,u)=>{let d=t.format==="NHWC",l=d?e[0].dims[3]:e[0].dims[1],c=n[0],p=d?n[2]:n[3],h=d?n[1]:n[2],m=d?n[3]:n[1],f=d&&(l%4===0||l%3===0)&&m%4===0,b=d?m:p*h,y=d?p*h:m,g=[8,8,1],w=r<=8?[4,1,1]:[4,4,1],_=[Math.ceil(b/g[0]/w[0]),Math.ceil(y/g[1]/w[1]),Math.ceil(c/g[2]/w[2])];j("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${_}`);let $=f?d&&l%4!==0?3:4:1,v=g[1]*w[1],I=g[0]*w[0],T=Math.max(g[0]*$,g[1]),P=r%v===0,B=o%I===0,D=i%T===0,L=f?[$,4,4]:[1,1,1],z=[{type:6,data:r},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ve(t,z),z.push(...k(e[0].dims,e[1].dims));let N=["rank","rank"];s&&(z.push(...k(e[2].dims)),N.push("rank")),z.push(...k(n));let se=W=>{let Z=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xe(t,Z);let K=f?4:1,V=J(e[0].dataType),re=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${V}>`:V}) {
        result[flatIndex] = ${f?`vec4<${V}>`:V}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${V}>`:V}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,oe=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),Q=S("w",e[1].dataType,e[1].dims.length,K),H=[oe,Q],E=C("result",e[0].dataType,n.length,K);if(s){let R=S("bias",e[2].dataType,e[2].dims.length,K);H.push(R),re+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${V}>`:V} {
          return bias[coords.${d?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${Qt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${W.registerUniforms(Z).declareVariables(...H,E)}
        ${re}
        ${Dd(d,P,B,D,s,t,L[0],L[1],L[2],V)}
        ${f?dt(w,g,V,void 0,!d,T):lt(w,g,V,void 0,!d,T,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${f};${P};${B};${D};${v};${I};${T}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:z}),getShaderSource:se}}});var Rd,Gi,Yt,Md,Hi,Vd,qi,Fi,Ki=A(()=>{"use strict";M();Ce();q();F();Re();ut();Rd=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Gi=e=>typeof e=="number"?[e,e,e]:e,Yt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Md=(e,t,n,r=1)=>{let o=Yt(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},Hi=(e,t,n,r,o)=>{o==null&&(o=Md(e,t[0],r[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return i},Vd=(e,t,n,r,o,i,s,a,u,d)=>{let l,c,p,h;if(e==="VALID"&&(e=0),typeof e=="number"){l={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Hi([t,n,r,1],[a,u,d],1,[o,i,s],e);c=m[0],p=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((f,b,y)=>f===y[0]))throw Error(`Unsupported padding parameter: ${e}`);l={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Hi([t,n,r,1],[a,u,d],1,[o,i,s],e[0]);c=m[0],p=m[1],h=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/o),p=Math.ceil(n/i),h=Math.ceil(r/s);let m=(c-1)*o+a-t,f=(p-1)*i+u-n,b=(h-1)*s+d-r,y=Math.floor(m/2),g=m-y,w=Math.floor(f/2),_=f-w,$=Math.floor(b/2),v=b-$;l={top:w,bottom:_,left:$,right:v,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outDepth:c,outHeight:p,outWidth:h}},qi=(e,t,n,r,o,i=!1,s="channelsLast")=>{let a,u,d,l,c;if(s==="channelsLast")[a,u,d,l,c]=e;else if(s==="channelsFirst")[a,c,u,d,l]=e;else throw new Error(`Unknown dataFormat ${s}`);let[p,,h,m,f]=t,[b,y,g]=Gi(n),[w,_,$]=Gi(r),v=Yt(h,w),I=Yt(m,_),T=Yt(f,$),{padInfo:P,outDepth:B,outHeight:D,outWidth:L}=Vd(o,u,d,l,b,y,g,v,I,T),z=i?p*c:p,N=[0,0,0,0,0];return s==="channelsFirst"?N=[a,z,B,D,L]:s==="channelsLast"&&(N=[a,B,D,L,z]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:d,inWidth:l,inChannels:c,outDepth:B,outHeight:D,outWidth:L,outChannels:z,padInfo:P,strideDepth:b,strideHeight:y,strideWidth:g,filterDepth:h,filterHeight:m,filterWidth:f,effectiveFilterDepth:v,effectiveFilterHeight:I,effectiveFilterWidth:T,dilationDepth:w,dilationHeight:_,dilationWidth:$,inShape:e,outShape:N,filterShape:t}},Fi=(e,t,n,r,o,i)=>{let s=i==="channelsLast",a=s?e[0].dims[3]:e[0].dims[1],u=!1,d=[64,1,1],l={x:n.map((g,w)=>w)},c=[Math.ceil(Rd(l.x.map(g=>n[g]))/d[0]),1,1];j("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,h=x.size(n),m=[{type:12,data:h},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];ve(t,m),m.push(...k(e[0].dims,e[1].dims));let f=["rank","rank"],b=e.length===3;b&&(m.push(...k(e[2].dims)),f.push("rank")),m.push(...k(n));let y=g=>{let w=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xe(t,w);let _=u?4:1,$=J(e[0].dataType),v=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),I=S("W",e[1].dataType,e[1].dims.length,_),T=[v,I],P=C("result",e[0].dataType,n.length,_),B="";if(b){let z=S("bias",e[2].dataType,e[2].dims.length,_);T.push(z),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${$}>`:$} {
          return bias[${s?O("coords",4,5):O("coords",1,5)}${u?"/ 4":""}];
        }`}let D=me(p,$),L=$e(t,D,$);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${g.registerUniforms(w).declareVariables(...T,P)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${P.offsetToIndices("global_idx")};
              let batch = ${O("coords",0,v.rank)};
              let d2 = ${s?O("coords",v.rank-1,v.rank):O("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${s?O("coords",1,v.rank):O("coords",2,v.rank)},
              ${s?O("coords",2,v.rank):O("coords",3,v.rank)},
              ${s?O("coords",3,v.rank):O("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?O("uniforms.x_shape",1,v.rank):O("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${s?O("uniforms.x_shape",2,v.rank):O("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${s?O("uniforms.x_shape",3,v.rank):O("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${s?O("uniforms.x_shape",4,v.rank):O("uniforms.x_shape",1,v.rank)};
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
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${b}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:y}}});var ji,Zi,Xi=A(()=>{"use strict";M();q();F();Re();ji=(e,t,n,r)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",s=e[0].dims,a=e[1].dims,u=t.format==="NHWC",d=u?n[3]:n[1],l=d/t.group,c=u&&l>=4?ne(d):1,p=x.size(n)/c,h=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:l}];ve(t,h),h.push(...k(s,[a[0],a[1],a[2],a[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];h.push(...k([n[0],n[1],n[2],n[3]/c]));let f=b=>{let y=C("output",e[0].dataType,n.length,c),g=J(y.type.tensor),w=$e(t,y.type.value,g),_=S("x",e[0].dataType,s.length),$=S("w",e[1].dataType,a.length,c),v=[_,$];o&&v.push(S("b",e[2].dataType,e[2].dims,c));let I=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];xe(t,I);let T=u?`
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
            let xVal = ${_.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${$.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${_.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${$.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${b.registerUniforms(I).declareVariables(...v,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${T}
    ${i}
    ${w}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},Zi=(e,t,n,r)=>{let o=e.length>2,i=ne(n[3]),s=ne(n[2]),a=x.size(n)/i/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],l=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ve(t,c),c.push(...k(u,d,l));let p=(s-1)*t.strides[1]+d[1],h=m=>{let f=C("output",e[0].dataType,l.length,i),b=J(f.type.tensor),y=$e(t,f.type.value,b),g=S("x",e[0].dataType,u.length,i),w=S("w",e[1].dataType,d.length,i),_=[g,w];o&&_.push(S("b",e[2].dataType,e[2].dims,i));let $=o?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xe(t,v),`
  ${m.registerUniforms(v).declareVariables(..._,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${p}>;
    var values: array<${f.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${w.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${$}
      ${y}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${s};${p};${d[0]};${d[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:h}}});var Ln,Ud,Qi,Gn=A(()=>{"use strict";M();q();pt();F();Re();Ln=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s[s.length-2],d=a[a.length-1],l=s[s.length-1],c=ne(d),p=ne(l),h=ne(u),m=x.size(n)/c/h,f=e.length>2,b=r?r.slice(0,-2):n.slice(0,-2),g=[x.size(b),u,d],w=[{type:12,data:m},{type:12,data:u},{type:12,data:d},{type:12,data:l}];ve(t,w),w.push(...k(b,s,a)),f&&w.push(...k(e[2].dims)),w.push(...k(g));let _=$=>{let v=Gt("batch_dims",e[0].dataType,b.length),I=S("a",e[0].dataType,s.length,p),T=S("b",e[1].dataType,a.length,c),P=C("output",e[0].dataType,g.length,c),B=J(P.type.tensor),D=$e(t,P.type.value,B),L=[I,T],z="";if(f){let oe=o?c:1;L.push(S("bias",e[2].dataType,e[2].dims.length,oe)),z=`${o?`value += bias[col / ${oe}];`:`value += ${P.type.value}(bias[row + i]);`}`}let N=s.slice(0,-2),se=a.slice(0,-2),W=Xe(N,b),Z=Xe(se,b),K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xe(t,K);let V=(oe,Q)=>{let H=oe.rank,E=oe.name;if(H===2)return`var ${E}_indices = ${oe.type.indices}(0u, 0u);`;let R=v.rank,Y=`var ${E}_indices: ${oe.type.indices};`;for(let ge=H-2-1,ie=R-1;ge>=0;ge--,ie--)Y+=`
${E}_indices[${ge}] = ${R>1?`batch_indices[${ie}]`:"batch_indices"};`;return Q.forEach(ge=>{Y+=`
${E}_indices[${ge}] = 0;`}),Y+=`${E}_indices[${H-2}] = 0u;
                     ${E}_indices[${H-1}] = 0u;`,Y},re=()=>{let oe=`var a_data: ${I.type.value};`;for(let Q=0;Q<p;Q++)oe+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${c}];`;for(let Q=0;Q<h;Q++){oe+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${p}];`;for(let H=0;H<p;H++)oe+=`
            values[${Q}] = fma(${T.type.value}(a_data${p===1?"":`[${H}]`}), b_data${H}, values[${Q}]);
`}return oe};return`
  ${$.registerUniforms(K).registerInternalVariables(v).declareVariables(...L,P)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${V(I,W)}
    let a_offset = ${I.indicesToOffset("a_indices")};
    ${V(T,Z)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${P.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${re()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${z}
      ${D}
      let cur_indices = ${P.type.indices}(batch, row + i, col);
      let offset = ${P.indicesToOffset("cur_indices")};
      ${P.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${h};${o}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:_}},Ud=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Qi=e=>{Ud(e.inputs);let t=ke.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Ln(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=x.size(e.inputs[0].dims.slice(0,-2)),s=x.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let a=e.inputs[0].reshape([1,i,r]),u=e.inputs[1].reshape([1,r,n]),d=[1,i,n],l=[a,u];e.compute(ct(l,{activation:""},t,d),{inputs:l})}else e.compute(ct(e.inputs,{activation:""},t))}}});var Nd,Hn,Wd,qn,Fn,Yi,Ld,Gd,Kn,Ji=A(()=>{"use strict";q();Li();Ki();pt();Xi();Re();Gn();De();Nd=(e,t,n,r,o,i)=>{let s=e[0],a=e.slice(i?1:2,i?3:4),u=a.length,d=t[0],c=t.slice(2).map((m,f)=>m+(m-1)*(n[f]-1)),h=a.map((m,f)=>m+r[f]+r[f+u]).map((m,f)=>Math.floor((m-c[f]+o[f])/o[f]));return h.splice(0,0,s),h.splice(i?3:1,0,d),h},Hn=[2,3,1,0],Wd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},qn=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let i=2;i<t[1].dims.length;++i)n[i-2]===0&&(n[i-2]=t[1].dims[i]);let r=e.pads.slice();qe.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},Fn=e=>{let t=Zt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,s=e.kernel_shape,a=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Yi=(e,t,n,r)=>{let o=n.format==="NHWC",i=Nd(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let v=[t[0]];if(o){let T=e.kernelCustomData.wT??e.compute(pe(t[1],Hn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T),v.push(T)}else v.push(t[1]);t.length===3&&v.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Zi(v,n,i,r),{inputs:v}):e.compute(ji(v,n,i,r),{inputs:v});return}let s=t.length===3,a=t[0].dims[o?1:2],u=t[0].dims[o?2:3],d=t[0].dims[o?3:1],l=t[1].dims[2],c=t[1].dims[3],p=i[o?1:2],h=i[o?2:3],m=i[o?3:1],f=o&&l===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(f||l===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let v=i[0],I,T,P,B=[];if(o){let z=e.kernelCustomData.wT??e.compute(pe(t[1],Hn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),f){let N=a*u*d;I=t[0].reshape([1,v,N]),T=z.reshape([1,N,m]),P=[1,v,m]}else I=t[0].reshape([v,a*u,d]),T=z.reshape([1,d,m]),P=[v,p*h,m];B.push(I),B.push(T)}else I=t[0].reshape([v,d,a*u]),T=t[1].reshape([1,m,d]),P=[v,m,p*h],B.push(T),B.push(I);s&&B.push(t[2]);let D=P[2],L=B[0].dims[B[0].dims.length-1];D<8&&L<8?e.compute(Ln(B,n,i,P,o,r),{inputs:B}):e.compute(ct(B,n,i,P,o,r),{inputs:B});return}let b=!0,y=e.kernelCustomData.wT??e.compute(pe(t[1],Hn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];s&&g.push(t[2]);let w=o?p*h:m,_=o?m:p*h,$=l*c*d;e.compute(Wi(g,n,i,w,_,$,s,b,r),{inputs:g})},Ld=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=qn({...t,pads:o,strides:i,dilations:s,kernelShape:a},r);Yi(e,r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Gd=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=qn(n,t),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=qi(t[0].dims,t[1].dims,n.strides,n.dilations,i,!1,r);e.compute(Fi(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},Kn=(e,t)=>{if(Wd(e.inputs,t),e.inputs[0].dims.length===3)Ld(e,t);else if(e.inputs[0].dims.length===5)Gd(e,e.inputs,t);else{let n=qn(t,e.inputs);Yi(e,e.inputs,n)}}});var Hd,es,ts=A(()=>{"use strict";M();Ce();F();Re();ut();Wn();pt();Hd=(e,t=!1,n,r,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${r}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},s=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=e?`
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
    `,u=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",d=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",l=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${l} / outWidth;
      let outCol = ${l} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${r}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${d}) || fract(xC) > 0.0) {
        return ${r}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,h=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${r}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${r}(0.0);`,m=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${r}(0.0);
      `,f=$e(n,r);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${r} {
    ${e?h:m}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${r} {
    ${e?m:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${r}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Xt(t)}
      ${f}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},es=(e,t,n,r,o,i,s,a)=>{let u=t.format==="NHWC",d=u?e[0].dims[3]:e[0].dims[1],l=n[0],c=u?n[2]:n[3],p=u?n[1]:n[2],h=u?n[3]:n[1],m=u&&d%4===0&&d%3&&h%4===0,f=u?h:c*p,b=u?c*p:h,y=[8,8,1],g=r<=8?[4,1,1]:[4,4,1],w=[Math.ceil(f/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(l/y[2]/g[2])];j("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${w}`);let _=m?4:1,$=Math.max(y[0]*_,y[1]),v=m?4:1,I=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],T=[I[0]+(t.dilations[0]<=1?0:(I[0]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(I[1]-1)*(t.dilations[1]-1))],P=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],B=[{type:6,data:r},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:I},{type:6,data:P}];ve(t,B),B.push(...k(e[0].dims,e[1].dims));let D=["rank","rank"];s&&(B.push(...k(e[2].dims)),D.push("rank")),B.push(...k(n));let L=z=>{let N=S("x",e[0].dataType,e[0].dims.length,v),se=S("w",e[1].dataType,e[1].dims.length,1),W=C("result",e[0].dataType,n.length,v),Z=[N,se],K="";if(s){let oe=S("bias",e[2].dataType,e[2].dims.length,v);Z.push(oe),K+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${oe.type.value} {
            return bias[coords.${u?"w":"y"}${m?"/ 4":""}];
          }`}let V=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:I.length},{name:"pads",type:"i32",length:P.length}];xe(t,V);let re=J(e[0].dataType,1);if(re!=="f16"&&re!=="f32")throw new Error(`elemType ${re} is not supported.`);return`
        ${Qt("uniforms.result_strides")}
        ${z.registerUniforms(V).declareVariables(...Z,W)};
        ${K}
        ${Hd(u,s,t,N.type.value,_)}
        ${m?dt(g,y,re,void 0,!u,$):lt(g,y,re,void 0,!u,$,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${y};${m}`,inputDependencies:D},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:B}),getShaderSource:L}}});var qd,jn,ns=A(()=>{"use strict";M();Ce();q();F();qd=(e,t,n,r,o,i=!1,s,a,u=!1)=>{let d=u?1:2,l=u?2:3,c=u?3:1,p=i?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;r&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let m=i?4:1,f=S("W",t[1].dataType,t[1].dims.length,m),b=S("Dy",t[0].dataType,t[0].dims.length,m),y=[b,f];r&&y.push(S("bias",t[2].dataType,[n[c]].length,m));let g=C("result",t[0].dataType,n.length,m),w=`{
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
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

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
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

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
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

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
          let value = dotProd[i] + ${r?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,_=`
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
                let xValue = ${u?b.get("batch","idyR","idyC","inputChannel"):b.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${f.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${r?"bias[d1]":`${s}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(a).declareVariables(...y,g)}
  ${h}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?w:_}}`},jn=(e,t,n)=>{let r=e.length>2,o=t.outputShape,i=x.size(o),s=[Math.ceil(i/64),1,1];j("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=t.format==="NHWC",u=["rank","rank"],d=[t.strides[0],t.strides[1]],l=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],c=[t.dilations[0],t.dilations[1]],p=[l[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),l[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],h=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,f=t.group,b=e[1].dims,y=b[0]/f,g=b[1],w=[{type:12,data:i},{type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:y},{type:12,data:g},...k(e[0].dims,e[1].dims)];r&&(w.push(...k(e[2].dims)),u.push("rank")),w.push(...k(o));let _=s[1]===1&&s[2]===1,$=v=>{let I=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:d.length},{name:"filter_dims",type:"u32",length:l.length},{name:"dilations",type:"u32",length:l.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],T=J(e[0].dataType);return`${qd(v,e,o,r,_,m,T,I,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:$}}});var Fd,Kd,jd,rs,os,Zd,Xd,Qd,Yd,is,ss=A(()=>{"use strict";ts();ns();Re();De();Fd=(e,t,n,r,o,i)=>(e-1)*t+n+(r-1)*o+1-i,Kd=(e,t,n,r,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=i,n[o]=e-i):t==="SAME_LOWER"&&(n[r]=e-i,n[o]=i)},jd=(e,t,n,r,o,i,s,a,u,d)=>{let l=e.length-2,c=d.length===0;u.length<l&&u.push(...Array(l-u.length).fill(0));let p=e[0],h=t[a?3:1]*o;for(let m=0,f=e.length-l-(a?1:0);m<l;++m,++f){let b=e[f],y=c?b*s[m]:d[m],g=Fd(b,s[m],i[m],t[f],n[m],y);Kd(g,r,i,m,m+l),c&&d.push(s[m]*(b-1)+u[m]+(t[f]-1)*n[m]+1-i[m]-i[m+l])}d.splice(0,0,p),d.splice(a?3:1,0,h)},rs=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<t[1].dims.length;++c)n.push(t[1].dims[c])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}jd(a,n,u,e.autoPad,e.group,o,d,r,s,i);let l=Object.assign({},e);return Object.assign(l,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:d}),l},os=e=>{let t=Zt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,s=e.kernelShape,a=e.pads,u=e.strides,d=e.wIsConst(),l=e.outputPadding,c=e.outputShape;return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,outputPadding:l,outputShape:c,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Zd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((l,c)=>l+c,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((l,c)=>l+c,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((l,c)=>l+c,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((l,c)=>l+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Xd=[2,3,1,0],Qd=(e,t,n)=>{let r=rs(n,t),o=n.format==="NHWC",i=r.outputShape,s=i[o?3:1],a=t[0].dims[o?3:1];if(r.group!==1||s===1&&a===1){e.compute(jn(t,r));return}let u=i[o?1:2],d=i[o?2:3],l=t[1].dims[2],c=t[1].dims[3],p=o?u*d:s,h=o?s:u*d,m=l*c*a,f=!0,b=e.kernelCustomData.wT??e.compute(pe(t[1],Xd),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let y=[t[0],b],g=t.length===3;g&&(!o&&t[2].dims.length===1?y.push(t[2].reshape([t[2].dims[0],1,1])):y.push(t[2])),e.compute(es(y,r,i,p,h,m,g,f),{inputs:y})},Yd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=t.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=rs({...t,pads:a,strides:s,dilations:i,kernelShape:o},r);e.compute(jn(r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},is=(e,t)=>{Zd(e.inputs,t),e.inputs[0].dims.length===3?Yd(e,t):Qd(e,e.inputs,t)}});var Jd,as,us,ds=A(()=>{"use strict";M();q();ue();F();Jd=(e,t,n,r)=>{let o=x.size(t),i=t.length,s=S("input",e,i),a=C("output",e,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=x.normalizeAxis(u,i),l=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,h=O("uniforms.input_shape","uniforms.axis",i),m=r.reverse?p+(r.exclusive?" + 1":""):"0",f=r.reverse?h:p+(r.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${f};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...k(t,t)]}),getShaderSource:l}},as=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(Jd(r,n,o,t),{inputs:[0]})},us=e=>{let t=e.exclusive===1,n=e.reverse===1;return U({exclusive:t,reverse:n})}});var el,tl,nl,ls,cs,ps=A(()=>{"use strict";M();q();ue();F();el=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},tl=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)o.push(n.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},nl=(e,t)=>{let n,r,o,i,s,a,u=t.format==="NHWC",d=t.blocksize,l=t.mode==="DCR";u?([n,r,o,i]=e.dims,s=l?[n,r,o,d,d,i/d**2]:[n,r,o,i/d**2,d,d],a=l?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=l?[n,d,d,i/d**2,r,o]:[n,i/d**2,d,d,r,o],a=l?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),p=c.dims.length,h=e.dataType,m=S("a",h,p),f=C("output",h,p),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,f)}

  ${tl(a,p,m,f)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${f.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${f.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[n,r*d,o*d,i/d**2]:[n,i/d**2,r*d,o*d],w=x.size(g),_=c.dims,$=x.sortBasedOnPerm(_,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...k(_,$)]}},getShaderSource:b}},ls=(e,t)=>{el(e.inputs),e.compute(nl(e.inputs[0],t))},cs=e=>U({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Zn,Jt,ms,rl,ol,Xn,Qn,fs,il,hs,gs,ys=A(()=>{"use strict";M();q();ue();F();Zn="[a-zA-Z]|\\.\\.\\.",Jt="("+Zn+")+",ms="^"+Jt+"$",rl="("+Jt+",)*"+Jt,ol="^"+rl+"$",Xn=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},Qn=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(ol)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,u)=>{let d=t[u].dims.slice();if(!a.match(RegExp(ms)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,d,u);this.lhs.push(l)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Jt)))throw new Error("Invalid RHS");o.match(RegExp(Zn,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let i=r.length,s=!1,a=[],u=0;if(!t.match(RegExp(ms))&&!n&&t!=="")throw new Error("Invalid LHS term");let d=t.match(RegExp(Zn,"g")),l=new Xn(o);return d?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=i-d.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(u,u+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let f=String.fromCharCode("0".charCodeAt(0)+m);l.addSymbol(f,p+m),this.addSymbol(f,r[u++],o)}}else l.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],o)}),l}},fs=e=>e+"_max",il=(e,t,n,r)=>{let i=e.map(l=>l.length).map((l,c)=>S(`input${c}`,t,l)),s=x.size(r),a=C("output",t,r.length),u=[...n.symbolToInfo.keys()].filter(l=>!n.rhs.symbolToIndices.has(l)),d=l=>{let c=[],p="var prod = 1.0;",h="var sum = 0.0;",m="sum += prod;",f=[],b=[],y=[],g=[],w=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach(($,v)=>{if(n.rhs.symbolToIndices.has(v)){let I=n.rhs.symbolToIndices.get(v)?.[0];I!==void 0&&n.lhs.forEach((T,P)=>{if($.inputIndices.includes(P)){let B=T.symbolToIndices.get(v);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(D=>{c.push(`${i[P].indicesSet(`input${P}Indices`,D,a.indicesGet("outputIndices",I))}`)})}})}else n.lhs.forEach((I,T)=>{if($.inputIndices.includes(T)){let P=I.symbolToIndices.get(v);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(B=>{f.push(`${i[T].indicesSet(`input${T}Indices`,B,`${v}`)}`)}),g.push(`prod *= ${i[T].getByIndices(`input${T}Indices`)};`)}}),b.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${fs(v)}; ${v}++) {`),y.push("}")});let _=w?[...c,`let sum = ${i.map(($,v)=>$.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...c,h,...b,...f,p,...g,m,...y];return`
            ${l.registerUniforms(u.map($=>({name:`${fs($)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map(($,v)=>`var input${v}Indices: ${i[v].type.indices};`).join(`
`)}
            ${_.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));l.push({type:12,data:s});let c=e.map((p,h)=>[...k(p)]).reduce((p,h)=>p.concat(h),l);return c.push(...k(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:d}},hs=(e,t)=>{let n=new Qn(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((i,s)=>i.dims);e.compute(il(o,e.inputs[0].dataType,n,r))},gs=e=>{let t=e.equation.replace(/\s+/g,"");return U({equation:t})}});var sl,bs,al,ul,ws,_s=A(()=>{"use strict";M();q();F();sl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},bs=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},al=(e,t)=>e.length>t.length?bs(e,t):bs(t,e),ul=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=al(t,n),o=e[0].dataType,i=o===9?4:1,s=Math.ceil(x.size(r)/i),a=d=>{let l=S("input",o,t.length,i),c=C("output",o,r.length,i),p;if(o===9){let h=(m,f,b="")=>`
          let outputIndices${f} = ${c.offsetToIndices(`outputOffset + ${f}u`)};
          let offset${f} = ${l.broadcastedIndicesToOffset(`outputIndices${f}`,c)};
          let index${f} = offset${f} / 4u;
          let component${f} = offset${f} % 4u;
          ${m}[${f}] = ${b}(${l.getByOffset(`index${f}`)}[component${f}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${l.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",l.getByOffset("inputOffset"))}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(l,c)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},u=[{type:12,data:s},...k(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},ws=e=>{sl(e.inputs),e.compute(ul(e.inputs),{inputs:[0]})}});var dl,$s,vs=A(()=>{"use strict";M();q();F();jt();dl=e=>{let t=e[0].dataType,n=x.size(e[0].dims),r=x.size(e[1].dims),o=r%4===0,i=s=>{let a=S("x",t,[1],4),u=S("bias",t,[1],4),d=C("y",t,[1],4),l=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${u.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(l).declareVariables(a,u,d)}

    ${Un(ce(t))}

    ${s.mainStart(Fe)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Nn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Fe/4)}})}},$s=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?wi(e):e.compute(dl(e.inputs))}});var ll,cl,xs,Ss,Is=A(()=>{"use strict";M();q();ue();F();ll=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},cl=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(i,1,...r);let a=n[i],u=e[0].dataType===9?4:1,d=Math.ceil(x.size(s)/u),l=[{type:12,data:d},{type:6,data:a},{type:12,data:i},...k(e[0].dims,e[1].dims,s)],c=p=>{let h=S("data",e[0].dataType,e[0].dims.length,u),m=S("inputIndices",e[1].dataType,e[1].dims.length),f=C("output",e[0].dataType,s.length,u),b=g=>{let w=r.length,_=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let $=0;$<w;$++)_+=`${w>1?`indicesIndices${g}[${$}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${$}]`:`outputIndices${g}`};`;_+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${h.type.indices};
        `;for(let $=0,v=0;$<o;$++)$===i?(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = u32(idx${g});`,v+=w):(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${v}]`:`outputIndices${g}`};`,v++);return _},y;if(e[0].dataType===9){let g=(w,_,$="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          ${b(_)};
          let offset${_} = ${h.indicesToOffset(`dataIndices${_}`)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${w}[${_}] = ${$}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${f.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${f.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${h.getByIndices("dataIndices")};
      ${f.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,f)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:c}},xs=e=>U({axis:e.axis}),Ss=(e,t)=>{let n=e.inputs;ll(n),e.compute(cl(e.inputs,t))}});var pl,ml,Ts,Cs,As=A(()=>{"use strict";M();q();ue();F();pl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=x.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],i=e[2],s=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/r)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ml=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.gatherAxis,o),s=x.normalizeAxis(t.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...r);let u=x.size(a),d=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:t.blockSize},...k(...e.map((m,f)=>m.dims),a)],h=m=>{let f=S("data",e[0].dataType,e[0].dims.length),b=S("inputIndices",e[1].dataType,e[1].dims.length),y=S("scales",e[2].dataType,e[2].dims.length),g=e.length>3?S("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=C("output",d,a.length),_=[f,b,y];g&&_.push(g);let $=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms($).declareVariables(..._,w)}
        ${m.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${(()=>r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${f.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${f.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${f.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${f.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${f.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ce(d)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((m,f)=>f!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(m,f)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},Ts=(e,t)=>{let n=e.inputs;pl(n,t),e.compute(ml(e.inputs,t))},Cs=e=>U({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var fl,hl,ks,Es,Ps=A(()=>{"use strict";M();q();ue();F();fl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},hl=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,i=e[1].dims,s=e[1].dataType,a=x.normalizeAxis(t.axis,o),u=n[a],d=i.slice(0),l=x.size(d),c=S("input",r,o),p=S("indicesInput",s,i.length),h=C("output",r,d.length),m=[{type:12,data:l},{type:6,data:u},{type:12,data:a}];return m.push(...k(n,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,h)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},ks=e=>U({axis:e.axis}),Es=(e,t)=>{let n=e.inputs;fl(n),e.compute(hl(e.inputs,t))}});var gl,yl,zs,Bs,Os=A(()=>{"use strict";M();q();F();gl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},yl=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,i,s]=Lt.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=x.size(a),d=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],l=["type","type"];e.length===3&&(d.push(...k(e[2].dims)),l.push("rank")),d.push(...k(a));let c=p=>{let h="";t.transA&&t.transB?h="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?h="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?h="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(h="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let m=t.alpha===1?"":"value *= uniforms.alpha;",f=S("a",e[0].dataType,e[0].dims),b=S("b",e[1].dataType,e[1].dims),y=f.type.value,g=null,w=[f,b];e.length===3&&(g=S("c",e[2].dataType,e[2].dims.length),w.push(g));let _=C("output",e[0].dataType,a.length);w.push(_);let $=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms($).declareVariables(...w)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${y}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${h}
    }

    ${m}
    ${(()=>g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",_)}; value += ${y}(uniforms.beta) * ${g.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},zs=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Bs=(e,t)=>{gl(e.inputs),e.compute(yl(e.inputs,t))}});var be,_l,Rs,Ds,$l,mt,Ms,Yn=A(()=>{"use strict";M();q();ue();Wt();Ft();F();De();be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,_l=(e,t)=>{let n=e[0],r=be(e,1),o=be(e,2),i=be(e,3),s=be(e,4),a=be(e,5),u=be(e,6),d=be(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],h=c,m=0,f=0,b=Math.floor(p/t.numHeads);if(u&&d&&x.size(u.dims)&&x.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],f=u.dims[2]}else if(u&&x.size(u.dims)||d&&x.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(r&&x.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,h=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i&&x.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+h,w=0;if(s&&x.size(s.dims)>0){w=8;let I=s.dims;throw I.length===1?I[0]===l?w=1:I[0]===3*l+2&&(w=3):I.length===2&&I[0]===l&&I[1]===g&&(w=5),w===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let _=!1,$=p;if(o&&x.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=!1;if(s&&x.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&x.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==l||a.dims[1]!==t.numHeads||a.dims[2]!==c||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:g,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:p,vHiddenSize:$,headSize:b,vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:v,passPastInKv:_,qkvFormat:y}},Rs=e=>U({...e}),Ds=U({perm:[0,2,1,3]}),$l=(e,t,n,r,o,i,s)=>{let a=[r,o,i],u=x.size(a),d=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],l=c=>{let p=C("qkv_with_bias",t.dataType,a),h=S("qkv",t.dataType,a),m=S("bias",n.dataType,a),f=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(f).declareVariables(h,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:l},{inputs:[t,n],outputs:[-1]})[0]},mt=(e,t,n,r,o,i,s,a)=>{let u=i;if(s&&x.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=$l(e,i,s,t,r,n*o,a),u=u.reshape([t,r,n,o]),n===1||r===1?u:e.compute(pe(u,Ds.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([t,r,n,o])),n===1||r===1?u:e.compute(pe(u,Ds.perm),{inputs:[u],outputs:[-1]})[0]},Ms=(e,t)=>{let n=_l(e.inputs,t),r=e.inputs[0],o=be(e.inputs,1),i=be(e.inputs,2),s=be(e.inputs,3),a=be(e.inputs,4),u=be(e.inputs,5),d=be(e.inputs,6),l=be(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=mt(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(c)return Qe(e,p,o,i,a,void 0,d,l,u,n);if(!o||!i)throw new Error("key and value must be provided");let h=mt(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),m=mt(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Qe(e,p,h,m,a,void 0,d,l,u,n)}});var vl,xl,Sl,Il,Jn,Vs,Us,er=A(()=>{"use strict";M();q();ue();F();vl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},xl=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),U({numOutputs:r,axis:t.axis,splitSizes:n})},Sl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${O("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Il=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Jn=(e,t)=>{let n=e[0].dims,r=x.size(n),o=e[0].dataType,i=x.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),a=S("input",o,n.length),u=new Array(t.numOutputs),d=[],l=[],c=0,p=[{type:12,data:r}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],u[m]=c;let f=n.slice();f[i]=t.splitSizes[m],l.push(f),s[m]=C(`output${m}`,o,f.length),d.push({dims:l[m],dataType:e[0].dataType})}p.push({type:12,data:u},...k(n,...l));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${Sl(u.length)}
  ${Il(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${O("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p})}},Vs=(e,t)=>{vl(e.inputs);let n=e.inputs.length===1?t:xl(e.inputs,t);e.compute(Jn(e.inputs,n),{inputs:[0]})},Us=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return U({axis:t,numOutputs:r,splitSizes:n})}});var Tl,Cl,Ns,Ws,Ls=A(()=>{"use strict";ue();Ft();Yn();er();De();Tl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],d=n.dims[1],l=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],c=d,p=0,h=!r||r.dims.length===0,m=Math.floor(h?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);h&&(l=m*t.numHeads);let f=i&&i.dims.length!==0,b=s&&s.dims.length!==0;if(f&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(f&&b){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[2]}else if(f||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');c=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let w=0,_=!1,$=t.kvNumHeads?m*t.kvNumHeads:l;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=e.length>4?e[5]:void 0;if(v&&v.dims.length!==1&&v.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let I=-1,T=-1,P=!1;return{batchSize:u,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:I,maxSequenceLength:T,inputHiddenSize:0,hiddenSize:l,vHiddenSize:$,headSize:m,vHeadSize:Math.floor($/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:P,passPastInKv:_,qkvFormat:g}},Cl=U({perm:[0,2,1,3]}),Ns=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(pe(r,Cl.perm),{inputs:[r],outputs:[-1]})[0]),r},Ws=(e,t)=>{let n=Tl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,a=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,l=n.kvNumHeads?n.kvNumHeads:n.numHeads,c=U({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,l*n.headSize,l*n.headSize]}),[p,h,m]=!o&&!i?e.compute(Jn([r],c),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,i],f=mt(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,p,void 0,0);Qe(e,f,Ns(e,h,n),Ns(e,m,n),void 0,void 0,s,a,void 0,n,u,d)}});var Gs,Al,kl,Hs,qs=A(()=>{"use strict";M();q();De();F();Gs=(e,t,n,r,o,i,s,a)=>{let u=ne(i),d=u===1?"f32":`vec${u}f`,l=u===1?"vec2f":`mat2x${u}f`,c=o*s,p=64;c===1&&(p=256);let h=[o,s,i/u],m=[o,s,2],f=["rank","type","type"],b=[];b.push(...k(h,m));let y=g=>{let w=S("x",t.dataType,3,u),_=S("scale",n.dataType,n.dims),$=S("bias",r.dataType,r.dims),v=C("output",1,3,2),I=[w,_,$,v];return`
  var<workgroup> workgroup_shared : array<${l}, ${p}>;
  const workgroup_size = ${p}u;
  ${g.declareVariables(...I)}
  ${g.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${w.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${l}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ae("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Ae("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${p}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:b}),getShaderSource:y},{inputs:[t,n,r],outputs:[-1]})[0]},Al=(e,t,n)=>{let r=t[0].dims,o=r,i=2,s=r[0],a=r[1],u=x.sizeFromDimension(r,i),d=ne(u),l=x.size(o)/d,c=Gs(e,t[0],t[1],t[2],s,u,a,n.epsilon),p=[s,a,u/d],h=[s,a],m=["type","none"],f=b=>{let y=S("x",t[0].dataType,p.length,d),g=S("scale_shift",1,h.length,2),w=C("output",t[0].dataType,p.length,d),_=[y,g,w];return`
  ${b.registerUniform("output_size","u32").declareVariables(..._)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${w.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${w.type.value}(scale_shift.x) + ${w.type.value}(scale_shift.y);
      ${w.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...k(p,h,p)]}),getShaderSource:f},{inputs:[t[0],c]})},kl=(e,t,n)=>{let r=t[0].dims,o=r,i=r[0],s=r[r.length-1],a=x.sizeFromDimension(r,1)/s,u=ne(s),d=x.size(o)/u,l=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=!1,h=[0,r.length-1];for(let y=0;y<r.length-2;y++)p=p||r[y+1]!==1,h.push(y+1);p=p&&r[r.length-1]!==1;let m=p?e.compute(pe(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(y,g)=>r[h[g]])),f=Gs(e,m,t[1],t[2],i,a,s,n.epsilon),b=y=>{let g=J(t[0].dataType),w=u===1?"vec2f":`mat${u}x2f`,_=I=>{let T=I===0?"x":"y",P=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${g}(${P}(scale.${T}))`;case 2:return`vec2<${g}>(${P}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${g}>(${P}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${u}`)}},$=S("input",t[0].dataType,t[0].dims,u),v=C("output",t[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${$.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${w}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${v.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${_(0)}, ${_(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:b},{inputs:[t[0],f]})},Hs=(e,t)=>{t.format==="NHWC"?kl(e,e.inputs,t):Al(e,e.inputs,t)}});var El,Pl,Fs,Ks=A(()=>{"use strict";M();q();F();El=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Pl=(e,t,n)=>{let r=t.simplified,o=e[0].dims,i=e[1],s=!r&&e[2],a=o,u=x.normalizeAxis(t.axis,o.length),d=x.sizeToDimension(o,u),l=x.sizeFromDimension(o,u),c=x.size(i.dims),p=s?x.size(s.dims):0;if(c!==l||s&&p!==l)throw new Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let $=0;$<o.length;++$)$<u?h.push(o[$]):h.push(1);let m=ne(l),f=["type","type"],b=[{type:12,data:d},{type:1,data:l},{type:12,data:Math.floor(l/m)},{type:1,data:t.epsilon}];s&&f.push("type");let y=n>1,g=n>2,w=$=>{let v=J(e[0].dataType),I=[S("x",e[0].dataType,e[0].dims,m),S("scale",i.dataType,i.dims,m)];s&&I.push(S("bias",s.dataType,s.dims,m)),I.push(C("output",e[0].dataType,a,m)),y&&I.push(C("mean_data_output",1,h)),g&&I.push(C("inv_std_output",1,h));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${$.registerUniforms(T).declareVariables(...I)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${On("f32",m)};
    var mean_square_vector = ${On("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ke(v,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ae("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ae("mean_square_vector",m)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ke(v,m,"x[j + offset]")};
      let f32scale = ${Ke(v,m,"scale[j]")};
      output[j + offset] = ${I[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Ke(v,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},_=[{dims:a,dataType:e[0].dataType}];return y&&_.push({dims:h,dataType:1}),g&&_.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${r}`,inputDependencies:f},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:w}},Fs=(e,t)=>{El(e.inputs),e.compute(Pl(e.inputs,t,e.outputCount))}});var zl,Bl,Ol,js,Zs,Xs=A(()=>{"use strict";M();q();ue();F();zl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!x.areEqual(s.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(x.size(u)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,c=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(x.size(l)!==c)throw new Error("zeroPoints input size error.")}},Bl=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=ne(t.k),h=ne(l),m=ne(s),f=a.concat([o,s]),b=o>1&&s/m%2===0?2:1,y=x.size(f)/m/b,g=64,w=[],_=[u,o,i/p],$=x.convertShape(e[1].dims).slice();$.splice(-1,1,l/h),w.push(...k(_)),w.push(...k($)),w.push(...k(e[2].dims)),e.length===4&&w.push(...k(x.convertShape(e[3].dims)));let v=[u,o,s/m];w.push(...k(v));let I=T=>{let P=_.length,B=S("a",e[0].dataType,P,p),D=S("b",12,$.length,h),L=S("scales",e[2].dataType,e[2].dims.length),z=[B,D,L],N=e.length===4?S("zero_points",12,e[3].dims.length):void 0;N&&z.push(N);let se=v.length,W=C("output",e[0].dataType,se,m),Z=J(e[0].dataType),K=(()=>{switch(p){case 1:return`array<${Z}, 8>`;case 2:return`mat4x2<${Z}>`;case 4:return`mat2x4<${Z}>`;default:throw new Error(`${p}-component is not supported.`)}})(),V=()=>{let Q=`
          // reuse a data
            var input_offset = ${B.indicesToOffset(`${B.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${B.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let H=0;H<m*b;H++)Q+=`
            b_value = ${h===1?`b${H}_data`:`b${H}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(E,R)=>`${Z}(b_value_lower[${R}]), ${Z}(b_value_upper[${R}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${K}(${Array.from({length:8},(E,R)=>`(b_quantized_values[${R}] - ${N?`zero_point${H}`:"zero_point"}) * scale${H}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${N?`zero_point${H}`:"zero_point"}`).join(",")})) * scale${H};`)()};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(H/m)}]${m>1?`[${H%m}]`:""} += ${Array.from({length:8/p},(E,R)=>`${p===1?`a_data[${R}] * b_dequantized_values[${R}]`:`dot(a_data[${R}], b_dequantized_values[${R}])`}`).join(" + ")};
          `;return Q},re=()=>{let Q=`
            var col_index = col * ${m};
            ${N?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Z}(8);`}
            `;for(let H=0;H<m*b;H++)Q+=`
            let scale${H} = ${L.getByOffset("col_index * nBlocksPerCol + block")};
            ${N?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${N.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${Z}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Q},oe=()=>{let Q=`col_index = col * ${m};`;for(let H=0;H<m*b;H++)Q+=`
            let b${H}_data = ${D.getByIndices(`${D.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Q+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,Q};return`
        var<workgroup> workgroup_shared: array<${W.type.value}, ${b*g}>;
        ${T.declareVariables(...z,W)}
        ${T.mainStart([g,1,1])}
          let output_indices = ${W.offsetToIndices(`(global_idx / ${g}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${re()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${oe()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${V()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${W.setByIndices(`${W.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${m};${b};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:y},programUniforms:w}),getShaderSource:I}},Ol=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=ne(t.k),h=ne(l),m=a.concat([o,s]),f=128,b=s%8===0?8:s%4===0?4:1,y=f/b,g=y*h*8,w=g/p,_=g/t.blockSize,$=x.size(m)/b,v=[],I=[u,o,i/p],T=x.convertShape(e[1].dims).slice();T.splice(-1,1,l/h),v.push(...k(I)),v.push(...k(T)),v.push(...k(e[2].dims)),e.length===4&&v.push(...k(x.convertShape(e[3].dims)));let P=[u,o,s];v.push(...k(P));let B=D=>{let L=I.length,z=S("a",e[0].dataType,L,p),N=S("b",12,T.length,h),se=S("scales",e[2].dataType,e[2].dims.length),W=[z,N,se],Z=e.length===4?S("zero_points",12,e[3].dims.length):void 0;Z&&W.push(Z);let K=P.length,V=C("output",e[0].dataType,K),re=J(e[0].dataType),oe=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${re}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${re}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${z.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${V.type.value}, ${y}>, ${b}>;
        ${D.declareVariables(...W,V)}
        ${D.mainStart([y,b,1])}
          let output_indices = ${V.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${_} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${f})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${z.getByIndices(`${z.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${z.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${_} + local_id.x;
            ${Z?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${re}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${re}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${N.getByIndices(`${N.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${oe()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${re}>(${Array.from({length:4},(Q,H)=>`${re}(b_value_lower[${H}]), ${re}(b_value_upper[${H}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${re}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Q,H)=>`${`dot(a_data${H}, b_dequantized_values[${H}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${V.type.value} = ${V.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${V.setByIndices(`${V.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${y};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:$},programUniforms:v}),getShaderSource:B}},js=(e,t)=>{zl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Ol(e.inputs,t)):e.compute(Bl(e.inputs,t))},Zs=e=>U(e)});var Dl,Rl,Ml,Vl,Ul,Nl,Wl,Ll,Qs,Ys=A(()=>{"use strict";M();q();F();Dl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Rl=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
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
            ${r}
            value = x[offset];
          }
      `},Ml=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},Vl=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},Ul=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
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
              ${r}
              value = x[offset];
          `},Nl=(e,t,n)=>{switch(n.mode){case 0:return Rl(e,t,n.pads.length);case 1:return Ml(e,t,n.pads.length);case 2:return Vl(e,t,n.pads.length);case 3:return Ul(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Wl=(e,t)=>{let n=x.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=x.size(n),i=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&i.push({type:s?e[2].dataType:1,data:t.value}),i.push(...k(e[0].dims,n));let a=["rank"],u=d=>{let l=C("output",e[0].dataType,n.length),c=S("x",e[0].dataType,r.length),p=c.type.value,h=Nl(l,r.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?p:"f32"}),`
            ${d.registerUniforms(m).declareVariables(c,l)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${l.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(n)/64)},programUniforms:i}),getShaderSource:u}},Ll=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let a=e[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:t.mode,value:r,pads:s}}else return t},Qs=(e,t)=>{Dl(e.inputs);let n=Ll(e.inputs,t);e.compute(Wl(e.inputs,n),{inputs:[0]})}});var en,Js,ea,ta,na,Gl,Hl,ra,oa,ia,sa,aa,ua,da,la,ca,pa,ma,fa,ha=A(()=>{"use strict";Se();M();q();F();en=e=>{if(te.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Js=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),a=t.strides.slice(),u=i?t.dilations.slice():[],d=t.pads.slice();qe.adjustPoolAttributes(n,o,s,a,u,d);let l=qe.computePoolOutputShape(n,o,a,u,s,d,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:s,strides:a,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:d,cacheKey:t.cacheKey});let p=l.slice();return p.push(p.splice(1,1)[0]),[c,r?p:l]},ea=(e,t)=>{let n=t.format==="NHWC",r=x.size(e),o=x.size(t.kernelShape),i=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=!!(d+l);i.push({type:12,data:a},{type:12,data:u},{type:12,data:d},{type:12,data:l}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],f=t.pads[t.pads.length/2-2],b=t.pads[t.pads.length-2];p=!!(f+b),i.push({type:12,data:h},{type:12,data:m},{type:12,data:f},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=x.computeStrides(t.kernelShape);i.push({type:12,data:a},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,l)=>d+l);return[i,s,!!u,!1,!1]}},ta=(e,t,n,r,o,i,s,a,u,d,l,c)=>{let p=o.format==="NHWC",h=t.type.value,m=C("output",t.type.tensor,r);if(o.kernelShape.length<=2){let f="",b="",y="",g=n-(p?2:1);if(l?f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let _=n-(p?3:2);c?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${_}] < 0 || xIndices[${_}] >= uniforms.x_shape[${_}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${a});
              var pad = 0;
              ${b}
              ${f}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let f=o.kernelShape.length,b=o.pads.length,y="";return d?y=`
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
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${f}>;

              var value = ${h}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${f-1}u; j++) {
                  offsets[j] = offset / ${O("uniforms.kernelStrides","j",f)};
                  offset -= offsets[j] * ${O("uniforms.kernelStrides","j",f)};
                }
                offsets[${f-1}] = offset;

                isPad = false;
                for (var j = ${n-f}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${O("uniforms.strides",`j - ${n-f}u`,f)}
                    + offsets[j - ${n-f}u] - ${O("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},na=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Gl=e=>`${na(e)};${e.countIncludePad}`,Hl=e=>`${na(e)};${e.storageOrder};${e.dilations}`,ra=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),oa=(e,t,n,r)=>{let[o,i]=Js(t,r,n),s=S("x",t.dataType,t.dims.length),a=s.type.value,u="value += x_val;",d="";o.countIncludePad?d+=`value /= ${a}(uniforms.kernelSize);`:d+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[l,c,p,h,m]=ea(i,o);l.push(...k(t.dims,i));let f=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${p};${h};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:b=>ta(b,s,t.dims.length,i.length,o,u,d,0,c,p,h,m)}},ia=e=>{let t=e.count_include_pad!==0,n=ra(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Gl(r)}},sa=(e,t)=>{en(e.inputs),e.compute(oa("AveragePool",e.inputs[0],!1,t))},aa={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ua=e=>{let t=e.format;return{format:t,...aa,cacheKey:t}},da=(e,t)=>{en(e.inputs),e.compute(oa("GlobalAveragePool",e.inputs[0],!0,t))},la=(e,t,n,r)=>{let[o,i]=Js(t,r,n),s=`
      value = max(x_val, value);
    `,a="",u=S("x",t.dataType,t.dims.length),d=["rank"],[l,c,p,h,m]=ea(i,o);return l.push(...k(t.dims,i)),{name:e,shaderCache:{hint:`${r.cacheKey};${p};${h};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:f=>ta(f,u,t.dims.length,i.length,o,s,a,t.dataType===10?-65504:-1e5,c,p,h,m)}},ca=(e,t)=>{en(e.inputs),e.compute(la("MaxPool",e.inputs[0],!1,t))},pa=e=>{let t=e.storage_order,n=e.dilations,r=ra(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:Hl(o)}},ma=e=>{let t=e.format;return{format:t,...aa,cacheKey:t}},fa=(e,t)=>{en(e.inputs),e.compute(la("GlobalMaxPool",e.inputs[0],!0,t))}});var Fl,Kl,ga,ya,ba=A(()=>{"use strict";M();q();ue();F();Fl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Kl=(e,t)=>{let n=x.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,i=e[0].dims,s=e[1].dataType,a=x.size(i),u=r===3||r===2,d=u?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,l=e[1].dims,c=e.length>2?e[2]:void 0,p=c?u?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,h=l.length===0||l.length===1&&l[0]===1,m=h===!1&&l.length===1,f=ne(a),b=h&&(!u||f===4),y=b?f:1,g=b&&!u?f:1,w=S("input",u?12:r,d.length,g),_=S("scale",s,l.length),$=c?S("zero_point",u?12:r,p.length):void 0,v=C("output",s,i.length,y),I=[w,_];$&&I.push($);let T=[d,l];c&&T.push(p);let P=[{type:12,data:a/y},{type:12,data:n},{type:12,data:t.blockSize},...k(...T,i)],B=D=>{let L=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${D.registerUniforms(L).declareVariables(...I,v)}
      ${D.mainStart()}
          ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>h?`let scale_value= ${_.getByOffset("0")}`:m?`
            let scale_index = ${v.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${_.getByOffset("scale_index")};`:`
            var scale_indices: ${_.type.indices} = output_indices;
            let index = ${_.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${_.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${_.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>$?h?u?`
                let zero_point_input = ${$.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${$.getByOffset("0")}`:m?u?`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${$.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${$.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${$.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${$.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":w.type.value}(0);`)()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getShaderSource:B,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:P})}},ga=(e,t)=>{Fl(e.inputs,t),e.compute(Kl(e.inputs,t))},ya=e=>U({axis:e.axis,blockSize:e.blockSize})});var jl,Zl,wa,_a=A(()=>{"use strict";Se();M();F();jl=(e,t,n)=>{let r=e===t,o=e<t&&n<0,i=e>t&&n>0;if(r||o||i)throw new Error("Range these inputs' contents are invalid.")},Zl=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),i=[o],s=o,a=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...k(i)],u=d=>{let l=C("output",r,i.length),c=l.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(p).declareVariables(l)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},wa=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),te.webgpu.validateInputContent&&jl(t,n,r),e.compute(Zl(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var Xl,Ql,Yl,Jl,ec,tc,nc,rc,oc,ic,sc,$a,ac,uc,dc,lc,cc,va,xa,Sa=A(()=>{"use strict";M();q();ue();F();Xl=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ql=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,i)=>r[o]=e[i]),r},Yl=(e,t,n,r,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(l=>i.push(l));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&e[a].dims.length===1&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(l=>r.push(l)),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Xl(r,t),t.axes.length>0&&Ql(r,t.axes,d).forEach((l,c)=>r[c]=l)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(l=>o.push(Number(l))),o.length!==0&&o.length!==d&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Jl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ec=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",tc=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((i,s)=>{r[i]=o[s],r[s+n]=o[t.length+s]}),r):o},nc=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(i=>o.push(i)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,s)=>Math.round(i*t[s]))}return o},rc=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(i=>t[i]=r),n.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(r,0,t.length),o.forEach((i,s)=>o[s]=Math.round(i*t[s]))),o},oc=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${O("uniforms.scales","i",r)};
        var roi_low = ${O("uniforms.roi","i",o)};
        var roi_hi = ${O("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${O("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ic=(e,t,n,r,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${O("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${O("uniforms.roi","i",i)};
          var roi_hi = ${O("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${O("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",r.length)};
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
    }`,sc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${O("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,$a=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",ac=(e,t,n,r,o)=>{let[s,a,u,d]=n.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${$a(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${u}];
      ${r?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},uc=(e,t,n,r,o,i,s,a,u,d)=>{let l=n.length===2,c=!0,[p,h]=l?[0,1]:c?[2,3]:[1,2],m=e.type.value,f=b=>{let y=b===p?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[b]},
        ${r[b]}, ${n[b]}, ${i[b]}, ${i[b]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[b]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${m} = originalIdx + ${m}(i);
          if (${y} < 0 || ${y} >= ${n[b]}) {
            ${(()=>d?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${n[b]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${y})`)};
          data[i + 1] = ${b===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(h)};
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
    `},dc=(e,t,n,r,o)=>{let[s,a,u,d,l]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${n[d]} - 1))`)};
      ${$a(e,l,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${d}];
      ${r?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[d]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},lc=(e,t,n,r,o,i)=>{let s=e.dims,a=tc(i,t.axes,s.length),u=nc(s,r,o,t.axes),d=r.slice();r.length===0&&(d=s.map((g,w)=>g===0?1:u[w]/g),t.keepAspectRatioPolicy!=="stretch"&&(u=rc(s,d,t)));let l=C("output",e.dataType,u.length),c=S("input",e.dataType,s.length),p=x.size(u),h=s.length===u.length&&s.every((g,w)=>g===u[w]),m=t.coordinateTransformMode==="tf_crop_and_resize",f=t.extrapolationValue,b=c.type.value,y=g=>`
      ${h?"":`
      ${Jl(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${sc(c,s)};
              ${ec(t.nearestMode,n,b)};
              ${ic(c,l,s,u,d.length,a.length,m)};
              `;case"linear":return`
              ${oc(l,s,u,d.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${ac(c,l,s,m,f)}`;if(s.length===3||s.length===5)return`${dc(c,l,s,m,f)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${uc(c,l,s,u,d,a,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",a.length).declareVariables(c,l)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${l.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?d:""}|${o.length>0?o:""}|${a.length>0?a:""}|${h}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:d},{type:1,data:a},...k(s,u)]})}},cc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},va=(e,t)=>{let n=[],r=[],o=[],i=cc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Yl(e.inputs,t,i,n,r,o),e.compute(lc(e.inputs[0],t,i,n,r,o),{inputs:[0]})},xa=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return U({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:d})}});var pc,mc,Ia,Ta=A(()=>{"use strict";M();q();ue();F();pc=(e,t)=>{let[n,r,o,i]=e,{numHeads:s,rotaryEmbeddingDim:a}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!x.areEqual(r.dims,[])&&!x.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!x.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],d=n.dims[n.dims.length-2],l=o.dims[0],c=x.sizeFromDimension(n.dims,1)/d,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(u!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>l)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},mc=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:i}=t,s=e[0].dims[0],a=x.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=a/u,l=e[2].dims[1],c=o===0?l*2:d/r,p=new Array(s,u,d/c,c-l),h=x.computeStrides(p),m=[{type:1,data:i},{type:12,data:p},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[a,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...k(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],f=b=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),w=S("cos_cache",e[2].dataType,e[2].dims.length),_=S("sin_cache",e[3].dataType,e[3].dims.length),$=C("output",e[0].dataType,e[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${b.declareVariables(y,g,w,_,$)}

        ${b.mainStart(Fe)}
          let half_rotary_emb_dim = uniforms.${w.name}_shape[1];
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
            let re = ${y.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${$.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${$.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${$.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:U({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/Fe)},programUniforms:m})}},Ia=(e,t)=>{pc(e.inputs,t),e.compute(mc(e.inputs,t))}});var fc,hc,Ca,Aa=A(()=>{"use strict";M();q();F();fc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},hc=(e,t,n,r)=>{let o=t.simplified,i=e[0].dims,s=x.size(i),a=i,u=s,d=i.slice(-1)[0],l=r?i.slice(0,-1).concat(1):[],c=!o&&e.length>3,p=e.length>4,h=r&&n>1,m=r&&n>2,f=n>3,b=64,y=ne(d),g=[{type:12,data:u},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],w=$=>{let v=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],I=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];c&&I.push(S("beta",e[3].dataType,e[3].dims,y)),p&&I.push(S("bias",e[4].dataType,e[4].dims,y)),I.push(C("output",e[0].dataType,a,y)),h&&I.push(C("mean_output",1,l)),m&&I.push(C("inv_std_output",1,l)),f&&I.push(C("input_skip_bias_sum",e[0].dataType,a,y));let T=J(e[0].dataType),P=J(1,y);return`

      ${$.registerUniforms(v).declareVariables(...I)}
      var<workgroup> sum_shared : array<${P}, ${b}>;
      var<workgroup> sum_squared_shared : array<${P}, ${b}>;

      ${$.mainStart([b,1,1])}
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
          let bias_value = ${p?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${f?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ke(T,y,"value")};
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
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},_=[{dims:a,dataType:e[0].dataType}];return n>1&&_.push({dims:l,dataType:1}),n>2&&_.push({dims:l,dataType:1}),n>3&&_.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${h};${m};${f}`,inputDependencies:e.map(($,v)=>"type")},getShaderSource:w,getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:g})}},Ca=(e,t)=>{fc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(hc(e.inputs,t,e.outputCount,!1),{outputs:r})}});var gc,tn,yc,ka,bc,wc,Ea,Pa,za=A(()=>{"use strict";M();q();ue();F();gc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},tn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},yc=(e,t)=>{if(e.length>1){let n=tn(e,1),r=tn(e,2),o=tn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),U({starts:n,ends:r,axes:o})}else return t},ka=(e,t,n,r,o)=>{let i=e;return e<0&&(i+=n[r[t]]),o[t]<0?Math.max(0,Math.min(i,n[r[t]]-1)):Math.max(0,Math.min(i,n[r[t]]))},bc=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${O("uniforms.input_shape","i",n.length)};
            let steps_i = ${O("uniforms.steps","i",n.length)};
            let signs_i = ${O("uniforms.signs","i",n.length)};
            let starts_i = ${O("uniforms.starts","i",n.length)};
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
      }`,wc=(e,t)=>{let n=e[0].dims,r=x.size(n),o=t.axes.length>0?x.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],i=tn(e,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=t.starts.map((y,g)=>ka(y,g,n,o,i)),a=t.ends.map((y,g)=>ka(y,g,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let y=0;y<n.length;++y)o.includes(y)||(s.splice(y,0,0),a.splice(y,0,n[y]),i.splice(y,0,1));let u=i.map(y=>Math.sign(y));i.forEach((y,g,w)=>{if(y<0){let _=(a[g]-s[g])/y,$=s[g],v=$+_*i[g];s[g]=v,a[g]=$,w[g]=-y}});let d=n.slice(0);o.forEach((y,g)=>{d[y]=Math.ceil((a[y]-s[y])/i[y])});let l={dims:d,dataType:e[0].dataType},c=C("output",e[0].dataType,d.length),p=S("input",e[0].dataType,e[0].dims.length),h=x.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],f=[{type:12,data:h},{type:12,data:s},{type:6,data:u},{type:12,data:i},...k(e[0].dims,d)],b=y=>`
      ${y.registerUniforms(m).declareVariables(p,c)}
        ${bc(p,c,n)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[l],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},Ea=(e,t)=>{gc(e.inputs,t);let n=yc(e.inputs,t);e.compute(wc(e.inputs,n),{inputs:[0]})},Pa=e=>{let t=e.starts,n=e.ends,r=e.axes;return U({starts:t,ends:n,axes:r})}});var _c,$c,Ba,Oa,Da=A(()=>{"use strict";M();q();ue();De();F();_c=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},$c=(e,t)=>{let n=e.inputs[0],r=n.dims,o=x.size(r),i=64,s=r.length,a=x.normalizeAxis(t.axis,s),u=a<r.length-1,d,l=[];u?(l=Array.from({length:s},(I,T)=>T),l[a]=s-1,l[s-1]=a,d=e.compute(pe(n,l),{inputs:[n],outputs:[-1]})[0]):d=n;let c=d.dims,p=c[s-1],h=o/p,m=ne(p),f=p/m,b=(I,T)=>T===4?`max(max(${I}.x, ${I}.y), max(${I}.z, ${I}.w))`:T===2?`max(${I}.x, ${I}.y)`:T===3?`max(max(${I}.x, ${I}.y), ${I}.z)`:I,y=S("x",d.dataType,d.dims,m),g=C("result",d.dataType,d.dims,m),w=y.type.value,_=J(d.dataType)==="f32"?`var threadMax = ${w}(-3.402823e+38f);`:`var threadMax = ${w}(-65504.0h);`,$=I=>`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${I.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${I.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${i};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${_}
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
          rowMaxShared = ${w}(${b("threadShared[0]",m)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
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
          rowSumShared = ${w}(${Ae("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,v=e.compute({name:"Softmax",shaderCache:{hint:`${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:f}]}),getShaderSource:$},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(pe(v,l),{inputs:[v]})},Ba=(e,t)=>{_c(e.inputs),$c(e,t)},Oa=e=>U({axis:e.axis})});var Ra,vc,xc,Sc,Ma,Va=A(()=>{"use strict";M();q();F();Ra=e=>Array.from(e.getBigInt64Array(),Number),vc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ra(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},xc=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Sc=(e,t)=>{let n=e[0].dims,r=t??Ra(e[1]),o=xc(n,r),i=x.size(o),s=e[0].dataType,a=S("input",s,n.length),u=C("output",s,o.length),d=l=>`
      const inputShape = ${a.indices(...n)};
      ${l.registerUniform("output_size","u32").declareVariables(a,u)}
      ${l.mainStart()}
      ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...k(e[0].dims,o)]}),getShaderSource:d}},Ma=e=>{vc(e.inputs),e.compute(Sc(e.inputs),{inputs:[0]})}});var Ic,Tc,Ua,Na=A(()=>{"use strict";M();q();F();Ic=(e,t,n,r,o)=>{let i=C("output_data",o,n.length,4),s=S("a_data",t[1].dataType,t[1].dims.length,4),a=S("b_data",t[2].dataType,t[2].dims.length,4),u=S("c_data",t[0].dataType,t[0].dims.length,4),d,l=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!r)d=i.setByOffset("global_idx",l(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,h,m="")=>{let f=`a_data[index_a${h}][component_a${h}]`,b=`b_data[index_b${h}][component_b${h}]`,y=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${i.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${s.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_b${h} = ${a.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_c${h} = ${u.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${p}[${h}] = ${m}(${l(f,b,y)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Tc=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,i=!(x.areEqual(t,n)&&x.areEqual(n,r)),s=t,a=x.size(t);if(i){let d=ke.calcShape(ke.calcShape(t,n,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,a=x.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Ic(d,e,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...k(r,t,n,s)]})}},Ua=e=>{e.compute(Tc(e.inputs))}});var Wa,La=A(()=>{"use strict";Do();Ft();Vo();No();Ii();Ri();Ui();Ji();ss();ds();ps();ys();_s();vs();Is();As();Ps();Os();Ls();qs();Ks();Gn();Xs();Yn();Ys();ha();ba();_a();Ht();Sa();Ta();Aa();za();Da();er();Va();De();jt();Na();Wa=new Map([["Abs",[Wo]],["Acos",[Lo]],["Acosh",[Go]],["Add",[Ti]],["ArgMax",[Oo,Mn]],["ArgMin",[Bo,Mn]],["Asin",[Ho]],["Asinh",[qo]],["Atan",[Fo]],["Atanh",[Ko]],["Attention",[Ro]],["AveragePool",[sa,ia]],["BatchNormalization",[Mo]],["BiasAdd",[Uo]],["BiasSplitGelu",[Si]],["Cast",[Zo,jo]],["Ceil",[Qo]],["Clip",[Xo]],["Concat",[Mi,Vi]],["Conv",[Kn,Fn]],["ConvTranspose",[is,os]],["Cos",[Yo]],["Cosh",[Jo]],["CumSum",[as,us]],["DepthToSpace",[ls,cs]],["DequantizeLinear",[ga,ya]],["Div",[Ci]],["Einsum",[hs,gs]],["Elu",[ei,at]],["Equal",[Ai]],["Erf",[ti]],["Exp",[ni]],["Expand",[ws]],["FastGelu",[$s]],["Floor",[ri]],["FusedConv",[Kn,Fn]],["Gather",[Ss,xs]],["GatherElements",[Es,ks]],["GatherBlockQuantized",[Ts,Cs]],["Gelu",[oi]],["Gemm",[Bs,zs]],["GlobalAveragePool",[da,ua]],["GlobalMaxPool",[fa,ma]],["Greater",[zi]],["GreaterOrEqual",[Oi]],["GroupQueryAttention",[Ws]],["HardSigmoid",[pi,ci]],["InstanceNormalization",[Hs]],["LayerNormalization",[Fs]],["LeakyRelu",[ii,at]],["Less",[Bi]],["LessOrEqual",[Di]],["Log",[$i]],["MatMul",[Qi]],["MatMulNBits",[js,Zs]],["MaxPool",[ca,pa]],["Mul",[ki]],["MultiHeadAttention",[Ms,Rs]],["Neg",[ai]],["Not",[si]],["Pad",[Qs]],["Pow",[Ei]],["QuickGelu",[vi,at]],["Range",[wa]],["Reciprocal",[ui]],["ReduceMin",[Co]],["ReduceMean",[vo]],["ReduceMax",[To]],["ReduceSum",[ko]],["ReduceProd",[Ao]],["ReduceL1",[xo]],["ReduceL2",[So]],["ReduceLogSum",[Po]],["ReduceLogSumExp",[Io]],["ReduceSumSquare",[Eo]],["Relu",[di]],["Resize",[va,xa]],["RotaryEmbedding",[Ia]],["Sigmoid",[li]],["Sin",[mi]],["Sinh",[fi]],["Slice",[Ea,Pa]],["SkipLayerNormalization",[Ca]],["Split",[Vs,Us]],["Sqrt",[hi]],["Softmax",[Ba,Oa]],["Sub",[Pi]],["Tan",[gi]],["Tanh",[bi]],["ThresholdedRelu",[_i,at]],["Tile",[Ma]],["Transpose",[uo,lo]],["Where",[Ua]]])});var nn,Ga=A(()=>{"use strict";Se();Ce();F();nn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,i){_e(t.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let l of n)u.push({binding:u.length,resource:{buffer:l.buffer}});for(let l of r)u.push({binding:u.length,resource:{buffer:l.buffer}});i&&u.push({binding:u.length,resource:i});let d=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:d,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}a.setPipeline(t.computePipeline),a.setBindGroup(0,d),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ye(t.programInfo.name)}dispose(){}build(t,n){_e(t.name);let r=this.backend.device,o=[];r.features.has("shader-f16")&&o.push("enable f16;");let i=so(n,this.backend.device.limits),s=t.getShaderSource(i),a=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,u=r.createShaderModule({code:a,label:t.name});j("verbose",()=>`[WebGPU] ${t.name} shader code: ${a}`);let d=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:t.name});return ye(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&r<=i&&o<=i)return[n,r,o];let s=n*r*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var Cc,Ac,tr,rn,Ha=A(()=>{"use strict";Se();M();Ce();In();ro();La();Ga();Cc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=e[r].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=e[r].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Ac=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Cc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},tr=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},rn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r};n.features.has("chromium-experimental-timestamp-query-inside-passes")?r.push("chromium-experimental-timestamp-query-inside-passes"):n.features.has("timestamp-query")&&r.push("timestamp-query"),n.features.has("shader-f16")&&r.push("shader-f16"),this.device=await n.requestDevice(o),this.adapterInfo=new tr(n.info||await n.requestAdapterInfo()),this.gpuDataManager=no(this),this.programManager=new nn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ut(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;_e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let i=r[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,d=a.kernelName,l=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,h=n[o*2],m=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let f=Number(h-this.queryTimeBase),b=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(y=>({dims:y.dims,dataType:Ve(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Ve(y.dataType)})),kernelId:s,kernelType:u,kernelName:d,programName:l,startTime:f,endTime:b});else{let y="";c.forEach((w,_)=>{y+=`input[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `});let g="";p.forEach((w,_)=>{g+=`output[${_}]: [${w.dims}] | ${Ve(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${d}|${l}" ${y}${g}execution time: ${b-f} ns`)}vt("GPU",`${l}::${h}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),ye()}run(t,n,r,o,i,s){_e(t.name);let a=[];for(let w=0;w<n.length;++w){let _=n[w].data;if(_===0)continue;let $=this.gpuDataManager.get(_);if(!$)throw new Error(`no GPU data for input: ${_}`);a.push($)}let{outputs:u,dispatchGroup:d,programUniforms:l}=t.getRunData(n),c=r.length===0?u.map((w,_)=>_):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],h=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=s)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let _=c[w]===-1,$=c[w]===-2,v=_||$?i(u[w].dataType,u[w].dims):o(c[w],u[w].dataType,u[w].dims);if(p.push(v),v.data===0)continue;let I=this.gpuDataManager.get(v.data);if(!I)throw new Error(`no GPU data for output: ${v.data}`);if(_&&this.temporaryData.push(I),$){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(I)}h.push(I)}if(a.length!==n.length||h.length!==p.length){if(h.length===0)return ye(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(l){let w=0,_=[];l.forEach(T=>{let P=typeof T.data=="number"?[T.data]:T.data;if(P.length===0)return;let B=T.type===10?2:4,D,L;T.type===10?(L=P.length>4?16:P.length>2?8:P.length*B,D=P.length>4?16:B*P.length):(L=P.length<=2?P.length*B:16,D=16),w=Math.ceil(w/L)*L,_.push(w);let z=T.type===10?8:4;w+=P.length>4?Math.ceil(P.length/z)*D:P.length*B});let $=16;w=Math.ceil(w/$)*$;let v=new ArrayBuffer(w);l.forEach((T,P)=>{let B=_[P],D=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(v,B,D.length).set(D);else if(T.type===12)new Uint32Array(v,B,D.length).set(D);else if(T.type===10)new Uint16Array(v,B,D.length).set(D);else if(T.type===1)new Float32Array(v,B,D.length).set(D);else throw new Error(`Unsupported uniform type: ${Ve(T.type)}`)});let I=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,v,0,w),this.gpuDataManager.release(I.id),m={offset:0,size:w,buffer:I.buffer}}let f=this.programManager.normalizeDispatchGroupSize(d),b=f[1]===1&&f[2]===1,y=Ac(t,n,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,f),this.programManager.setArtifact(y,g),j("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),l&&g.uniformVariablesInfo){if(l.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${l.length} in program "${g.programInfo.name}".`);for(let w=0;w<l.length;w++){let _=l[w],$=_.type,v=typeof _.data=="number"?1:_.data.length,[I,T]=g.uniformVariablesInfo[w];if($!==I||v!==T)throw new Error(`Uniform variable ${w} mismatch: expect type ${I} with size ${T}, got type ${$} with size ${v} in program "${g.programInfo.name}".`)}}if(j("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(g,a,h,f,m),ye(t.name),p}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let i=Wa.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),j("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${l}`)),1}finally{d&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${i}] ${s}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(r,o,s);return i.set(n,[a,r]),a}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await kn(this,t,n);return Nt(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){j("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){j("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){j("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let i=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var kc,qa,on,sn,nr,Fa,Ka=A(()=>{"use strict";Ce();kc=1,qa=()=>kc++,on=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}destroy(){j("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,n){return this.dataType===t&&this.tensorShape.every((r,o)=>r===n[o])}},sn=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&this.tensorManager.releaseTensor(this.tensorWrapper)}async ensureTensor(t,n,r){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,n))return this.wrapper.tensor;r&&(this.activeUpload=new Uint8Array(await this.wrapper.read())),this.tensorManager.releaseTensor(this.wrapper)}let o=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,o,!0,!0),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper){this.wrapper.write(t);return}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},nr=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=qa();return this.tensorTrackersById.set(t,new sn(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o){j("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(n,r,o)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){j("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let i=qa(),s=new on({sessionId:this.backend.currentSessionId,context:t,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(i,new sn(this,s)),this.externalTensors.add(s),i}async getCachedTensor(t,n,r,o,i){let s=this.backend.currentSessionId;for(let[d,l]of this.freeTensors.entries())if(l.sameTypeAndShape(t,n)){let c=this.freeTensors.splice(d,1)[0];return c.sessionId=s,c}let a=this.backend.currentContext;j("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${n}}`);let u=await a.createTensor({dataType:t,shape:n,dimensions:n,usage:r,writable:o,readable:i});return new on({sessionId:s,context:a,tensor:u,dataType:t,shape:n})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Fa=(...e)=>new nr(...e)});var ja,Ec,an,Za=A(()=>{"use strict";M();Me();In();Ka();Ce();ja=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Ec=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,i)=>o===r[i]&&e[o]===t[o])},an=class{constructor(t){this.tensorManager=Fa(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Ut(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>Ec(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t)}onReleaseSession(t){let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){j("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o){let i=ja.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t,i,r,o)}uploadTensor(t,n){if(!ae().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");j("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Nt(r,n)}}registerMLTensor(t,n,r){let o=ja.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,r);return j("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${r}} -> {tensorId: ${i}}`),i}registerMLConstant(t,n,r,o,i,s){if(!s)throw new Error("External mounted files are not available.");let a=t;t.startsWith("./")&&(a=t.substring(2));let u=s.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(n+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(n,n+r).buffer,l;switch(i.dataType){case"float32":l=new Float32Array(d);break;case"float16":l=new Uint16Array(d);break;case"int32":l=new Int32Array(d);break;case"uint32":l=new Uint32Array(d);break;case"int64":l=new BigInt64Array(d);break;case"uint64":l=new BigUint64Array(d);break;case"int8":l=new Int8Array(d);break;case"int4":case"uint4":case"uint8":l=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return j("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,l)}flush(){}}});var Xa={};gt(Xa,{init:()=>Pc});var ft,rr,Pc,Qa=A(()=>{"use strict";M();Ha();Ce();q();Za();ft=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},rr=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=t.PTR_SIZE,i=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,s));let a=Number(t.getValue(o*i++,s));this.outputCount=Number(t.getValue(o*i++,s)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,s));let u=[];for(let d=0;d<a;d++){let l=Number(t.getValue(o*i++,s)),c=Number(t.getValue(o*i++,"*")),p=Number(t.getValue(o*i++,s)),h=[];for(let m=0;m<p;m++)h.push(Number(t.getValue(o*i++,s)));u.push(new ft(t,l,c,h))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,n){let r=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,d)=>new ft(this.module,u,this.output(a,d),d),s=(a,u)=>{let d=He(a,u);if(!d)throw new Error(`Unsupported data type: ${a}`);let l=d>0?this.backend.gpuDataManager.create(d).id:0;return new ft(this.module,a,l,u)};return this.backend.run(t,r,o,i,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,i);for(let a=0;a<n.length;a++)this.module.setValue(s+o*(a+1),n[a],i);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},Pc=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new rn;await i.initialize(n,r),o("webgpu",[i,s=>i.alloc(Number(s)),s=>i.free(s),(s,a,u,d=!1)=>{if(d)j("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(a)}, size=${Number(u)}`),i.memcpy(Number(s),Number(a));else{j("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let l=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));i.upload(Number(a),l)}},async(s,a,u)=>{j("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(Number(s),()=>t.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(s,a,u)=>i.createKernel(s,Number(a),u,t.UTF8ToString(t._JsepGetNodeName(Number(a)))),s=>i.releaseKernel(s),(s,a,u,d)=>{j("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let l=new rr(t,i,Number(a));return i.computeKernel(Number(s),l,d)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new an(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,d)=>i.ensureTensor(s,a,u,d),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var zc,Ct,At,je,Bc,nt,kt,Et,Ya,Pt,zt,Bt,_n=A(()=>{"use strict";jr();Xr();M();Me();Dt();Sn();zc=(e,t)=>{ae()._OrtInit(e,t)!==0&&X("Can't initialize onnxruntime.")},Ct=async e=>{zc(e.wasm.numThreads,it(e.logLevel))},At=async(e,t)=>{{let n=(Qa(),hn(Xa)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",ae(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",ae(),e)}}},je=new Map,Bc=e=>{let t=ae(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&X("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},nt=e=>{let t=ae(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},kt=async(e,t)=>{let n,r,o=ae();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=nt(e);let i=0,s=0,a=0,u=[],d=[],l=[];try{if([s,u]=Zr(t),t?.externalData&&o.mountExternalData){let g=[];for(let w of t.externalData){let _=typeof w=="string"?w:w.path;g.push(st(typeof w=="string"?w:w.data).then($=>{o.mountExternalData(_,$)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let _=g,$=_?.context,v=_?.gpuDevice,I=_?.deviceType,T=_?.powerPreference;$?o.currentContext=$:v?o.currentContext=await o.jsepCreateMLContext(v):o.currentContext=await o.jsepCreateMLContext({deviceType:I,powerPreference:T})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(n,r,s),i===0&&X("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=Bc(i),h=!!t?.enableGraphCapture,m=[],f=[],b=[];for(let g=0;g<c;g++){let w=o._OrtGetInputName(i,g);w===0&&X("Can't get an input name."),d.push(w),m.push(o.UTF8ToString(w))}for(let g=0;g<p;g++){let w=o._OrtGetOutputName(i,g);w===0&&X("Can't get an output name."),l.push(w);let _=o.UTF8ToString(w);f.push(_);{if(h&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[_]??"cpu";if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(h&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push($)}}let y=null;return b.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&X("Can't create IO binding."),y={handle:a,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>xn(g))}),je.set(i,[i,d,l,y,h,!1]),[i,m,f]}catch(c){throw d.forEach(p=>o._OrtFree(p)),l.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a)!==0&&X("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&X("Can't release session."),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&X("Can't release session options."),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},Et=e=>{let t=ae(),n=je.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,i,s,a]=n;s&&(a&&t._OrtClearBoundOutputs(s.handle)!==0&&X("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&X("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(u=>t._OrtFree(u)),i.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(r)!==0&&X("Can't release session."),je.delete(e)},Ya=(e,t,n,r,o,i=!1)=>{if(!e){t.push(0);return}let s=ae(),a=s.PTR_SIZE,u=e[0],d=e[1],l=e[3],c,p;if(u==="string"&&(l==="gpu-buffer"||l==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let f=e[2].gpuBuffer;p=He(ot(u),d);let b=s.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=b(r,o,f,p)}else if(l==="ml-tensor"){let f=e[2].mlTensor;p=He(ot(u),d);let b=s.jsepRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=b(f,ot(u),d)}else{let f=e[2];if(Array.isArray(f)){p=a*f.length,c=s._malloc(p),n.push(c);for(let b=0;b<f.length;b++){if(typeof f[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.setValue(c+b*a,le(f[b],n),"*")}}else p=f.byteLength,c=s._malloc(p),n.push(c),s.HEAPU8.set(new Uint8Array(f.buffer,f.byteOffset,p),c)}let h=s.stackSave(),m=s.stackAlloc(4*d.length);try{d.forEach((b,y)=>s.setValue(m+y*a,b,a===4?"i32":"i64"));let f=s._OrtCreateTensor(ot(u),c,p,m,d.length,xn(l));f===0&&X(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(f)}finally{s.stackRestore(h)}},Pt=async(e,t,n,r,o,i)=>{let s=ae(),a=s.PTR_SIZE,u=je.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],l=u[1],c=u[2],p=u[3],h=u[4],m=u[5],f=t.length,b=r.length,y=0,g=[],w=[],_=[],$=[],v=s.stackSave(),I=s.stackAlloc(f*a),T=s.stackAlloc(f*a),P=s.stackAlloc(b*a),B=s.stackAlloc(b*a);try{s.jsepOnRunStart?.(d),[y,g]=Kr(i);for(let z=0;z<f;z++)Ya(n[z],w,$,e,t[z],h);for(let z=0;z<b;z++)Ya(o[z],_,$,e,f+r[z],h);for(let z=0;z<f;z++)s.setValue(I+z*a,w[z],"*"),s.setValue(T+z*a,l[t[z]],"*");for(let z=0;z<b;z++)s.setValue(P+z*a,_[z],"*"),s.setValue(B+z*a,c[r[z]],"*");if(p&&!m){let{handle:z,outputPreferredLocations:N,outputPreferredLocationsEncoded:se}=p;if(l.length!==f)throw new Error(`input count from feeds (${f}) is expected to be always equal to model's input count (${l.length}).`);for(let W=0;W<f;W++){let Z=t[W];await s._OrtBindInput(z,l[Z],w[W])!==0&&X(`Can't bind input[${W}] for session=${e}.`)}for(let W=0;W<b;W++){let Z=r[W];o[W]?.[3]?s._OrtBindOutput(z,c[Z],_[W],0)!==0&&X(`Can't bind pre-allocated output[${W}] for session=${e}.`):s._OrtBindOutput(z,c[Z],0,se[Z])!==0&&X(`Can't bind output[${W}] to ${N[W]} for session=${e}.`)}je.set(e,[d,l,c,p,h,!0])}let D;p?D=await s._OrtRunWithBinding(d,p.handle,b,P,y):D=await s._OrtRun(d,T,I,f,B,b,P,y),D!==0&&X("failed to call OrtRun().");let L=[];for(let z=0;z<b;z++){let N=Number(s.getValue(P+z*a,"*"));if(N===_[z]){L.push(o[z]);continue}let se=s.stackSave(),W=s.stackAlloc(4*a),Z=!1,K,V=0;try{s._OrtGetTensorData(N,W,W+a,W+2*a,W+3*a)!==0&&X(`Can't access output tensor data on index ${z}.`);let oe=a===4?"i32":"i64",Q=Number(s.getValue(W,oe));V=s.getValue(W+a,"*");let H=s.getValue(W+a*2,"*"),E=Number(s.getValue(W+a*3,oe)),R=[];for(let ie=0;ie<E;ie++)R.push(Number(s.getValue(H+ie*a,oe)));s._OrtFree(H)!==0&&X("Can't free memory for tensor dims.");let Y=R.reduce((ie,de)=>ie*de,1);K=Ve(Q);let ge=p?.outputPreferredLocations[r[z]];if(K==="string"){if(ge==="gpu-buffer"||ge==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ie=[];for(let de=0;de<Y;de++){let Ue=s.getValue(V+de*a,"*"),cu=s.getValue(V+(de+1)*a,"*"),pu=de===Y-1?void 0:cu-Ue;ie.push(s.UTF8ToString(Ue,pu))}L.push([K,R,ie,"cpu"])}else if(ge==="gpu-buffer"&&Y>0){let ie=s.jsepGetBuffer;if(!ie)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let de=ie(V),Ue=He(Q,Y);if(Ue===void 0||!Mt(K))throw new Error(`Unsupported data type: ${K}`);Z=!0,L.push([K,R,{gpuBuffer:de,download:s.jsepCreateDownloader(de,Ue,K),dispose:()=>{s._OrtReleaseTensor(N)!==0&&X("Can't release tensor.")}},"gpu-buffer"])}else if(ge==="ml-tensor"&&Y>0){let ie=s.jsepEnsureTensor;if(!ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(He(Q,Y)===void 0||!Vt(K))throw new Error(`Unsupported data type: ${K}`);let Ue=await ie(V,Q,R,!1);Z=!0,L.push([K,R,{mlTensor:Ue,download:s.jsepCreateMLTensorDownloader(V,K),dispose:()=>{s.jsepReleaseTensorId(V),s._OrtReleaseTensor(N)}},"ml-tensor"])}else{let ie=Rt(K),de=new ie(Y);new Uint8Array(de.buffer,de.byteOffset,de.byteLength).set(s.HEAPU8.subarray(V,V+de.byteLength)),L.push([K,R,de,"cpu"])}}finally{s.stackRestore(se),K==="string"&&V&&s._free(V),Z||s._OrtReleaseTensor(N)}}return p&&!h&&(s._OrtClearBoundOutputs(p.handle)!==0&&X("Can't clear bound outputs."),je.set(e,[d,l,c,p,h,!1])),L}finally{s.stackRestore(v),w.forEach(D=>s._OrtReleaseTensor(D)),_.forEach(D=>s._OrtReleaseTensor(D)),$.forEach(D=>s._free(D)),y!==0&&s._OrtReleaseRunOptions(y),g.forEach(D=>s._free(D))}},zt=e=>{let t=ae(),n=je.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&X("Can't get an profile file name."),t._OrtFree(o)},Bt=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Ze,Te,ht,dn,ln,un,or,ir,Ye,Je,Dc,Ja,eu,tu,nu,ru,ou,iu,sr=A(()=>{"use strict";Se();_n();Me();tt();Ze=()=>!!te.wasm.proxy&&typeof document<"u",ht=!1,dn=!1,ln=!1,ir=new Map,Ye=(e,t)=>{let n=ir.get(e);n?n.push(t):ir.set(e,[t])},Je=()=>{if(ht||!dn||ln||!Te)throw new Error("worker not ready")},Dc=e=>{switch(e.data.type){case"init-wasm":ht=!1,e.data.err?(ln=!0,or[1](e.data.err)):(dn=!0,or[0]()),un&&(URL.revokeObjectURL(un),un=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ir.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ja=async()=>{if(!dn){if(ht)throw new Error("multiple calls to 'initWasm()' detected.");if(ln)throw new Error("previous call to 'initWasm()' failed.");if(ht=!0,Ze())return new Promise((e,t)=>{Te?.terminate(),Hr().then(([n,r])=>{try{Te=r,Te.onerror=i=>t(i),Te.onmessage=Dc,or=[e,t];let o={type:"init-wasm",in:te};Te.postMessage(o),un=n}catch(o){t(o)}},t)});try{await Tt(te.wasm),await Ct(te),dn=!0}catch(e){throw ln=!0,e}finally{ht=!1}}},eu=async e=>{if(Ze())return Je(),new Promise((t,n)=>{Ye("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:te}};Te.postMessage(r)});await At(te,e)},tu=async e=>Ze()?(Je(),new Promise((t,n)=>{Ye("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Te.postMessage(r,[e.buffer])})):nt(e),nu=async(e,t)=>{if(Ze()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Je(),new Promise((n,r)=>{Ye("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Te.postMessage(o,i)})}else return kt(e,t)},ru=async e=>{if(Ze())return Je(),new Promise((t,n)=>{Ye("release",[t,n]);let r={type:"release",in:e};Te.postMessage(r)});Et(e)},ou=async(e,t,n,r,o,i)=>{if(Ze()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Je(),new Promise((s,a)=>{Ye("run",[s,a]);let u=n,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:r,options:i}};Te.postMessage(d,Bt(u))})}else return Pt(e,t,n,r,o,i)},iu=async e=>{if(Ze())return Je(),new Promise((t,n)=>{Ye("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Te.postMessage(r)});zt(e)}});var su,Rc,cn,au=A(()=>{"use strict";Se();sr();M();It();Sn();su=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Rc=e=>{switch(e[3]){case"cpu":return new he(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return he.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Vt(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return he.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},cn=class{async fetchModelAndCopyToWasmMemory(t){return tu(await st(t))}async loadModel(t,n){_e();let r;typeof t=="string"?!1?r=await st(t):r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await nu(r,n),ye()}async dispose(){return ru(this.sessionId)}async run(t,n,r){_e();let o=[],i=[];Object.entries(t).forEach(p=>{let h=p[0],m=p[1],f=this.inputNames.indexOf(h);if(f===-1)throw new Error(`invalid input '${h}'`);o.push(m),i.push(f)});let s=[],a=[];Object.entries(n).forEach(p=>{let h=p[0],m=p[1],f=this.outputNames.indexOf(h);if(f===-1)throw new Error(`invalid output '${h}'`);s.push(m),a.push(f)});let u=o.map((p,h)=>su(p,()=>`input "${this.inputNames[i[h]]}"`)),d=s.map((p,h)=>p?su(p,()=>`output "${this.outputNames[a[h]]}"`):null),l=await ou(this.sessionId,i,u,a,d,r),c={};for(let p=0;p<l.length;p++)c[this.outputNames[a[p]]]=s[p]??Rc(l[p]);return ye(),c}startProfiling(){}endProfiling(){iu(this.sessionId)}}});var du={};gt(du,{OnnxruntimeWebAssemblyBackend:()=>pn,initializeFlags:()=>uu,wasmBackend:()=>Mc});var uu,pn,Mc,lu=A(()=>{"use strict";Se();sr();au();tt();uu=()=>{if((typeof te.wasm.initTimeout!="number"||te.wasm.initTimeout<0)&&(te.wasm.initTimeout=0),te.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof te.wasm.proxy!="boolean"&&(te.wasm.proxy=!1),typeof te.wasm.trace!="boolean"&&(te.wasm.trace=!1),typeof te.wasm.numThreads!="number"||!Number.isInteger(te.wasm.numThreads)||te.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)te.wasm.numThreads=1;else{let e=typeof navigator>"u"?fn("node:os").cpus().length:navigator.hardwareConcurrency;te.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}te.wasm.wasmPaths===void 0&&Ie&&Ie.indexOf("blob:")!==0&&(te.wasm.wasmPaths=Ie.substring(0,Ie.lastIndexOf("/")+1))},pn=class{async init(t){uu(),await Ja(),await eu(t)}async createInferenceSessionHandler(t,n){let r=new cn;return await r.loadModel(t,n),Promise.resolve(r)}},Mc=new pn});Se();Se();Se();var Rr="1.21.0";var C$=wn;{let e=(lu(),hn(du)).wasmBackend;We("webgpu",e,5),We("webnn",e,5),We("cpu",e,10),We("wasm",e,10)}Object.defineProperty(te.versions,"web",{value:Rr,enumerable:!0});export{bu as InferenceSession,vt as TRACE,_e as TRACE_FUNC_BEGIN,ye as TRACE_FUNC_END,he as Tensor,_u as TrainingSession,C$ as default,te as env,We as registerBackend};
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
