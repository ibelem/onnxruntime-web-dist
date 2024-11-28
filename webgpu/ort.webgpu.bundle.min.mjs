/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Ln=Object.defineProperty;var Bp=Object.getOwnPropertyDescriptor;var Dp=Object.getOwnPropertyNames;var Mp=Object.prototype.hasOwnProperty;var Gn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var R=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ft=(e,t)=>{for(var r in t)Ln(e,r,{get:t[r],enumerable:!0})},Rp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Dp(t))!Mp.call(e,o)&&o!==r&&Ln(e,o,{get:()=>t[o],enumerable:!(n=Bp(t,o))||n.enumerable});return e};var br=e=>Rp(Ln({},"__esModule",{value:!0}),e);var yr,$t,xt,Up,_r,wr=R(()=>{yr=new Map,$t=[],xt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=yr.get(e);if(n===void 0)yr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=$t.indexOf(e);o!==-1&&$t.splice(o,1);for(let i=0;i<$t.length;i++)if(yr.get($t[i]).priority<=r){$t.splice(i,0,e);return}$t.push(e)}return}throw new TypeError("not a valid backend")},Up=async e=>{let t=yr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},_r=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?$t:r,o,i=[],a=new Set;for(let d of n){let c=await Up(d);typeof c=="string"?i.push({name:d,err:c}):(o||(o=c),o===c&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let l=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?l:Reflect.get(d,c)})]}});var ea=R(()=>{wr()});var ta,ra=R(()=>{ta="1.21.0"});var na,Re,Hn=R(()=>{ra();na="warning",Re={wasm:{},webgl:{},webgpu:{},versions:{common:ta},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);na=e}},get logLevel(){return na}};Object.defineProperty(Re,"logLevel",{enumerable:!0})});var we,oa=R(()=>{Hn();we=Re});var ia,aa,sa=R(()=>{ia=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",l=t?.norm,d,c;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let m=i*o,u=0,h=m,_=m*2,y=-1;a==="RGBA"?(u=0,h=m,_=m*2,y=m*3):a==="RGB"?(u=0,h=m,_=m*2):a==="RBG"&&(u=0,_=m,h=m*2);for(let g=0;g<i;g++)for(let x=0;x<o;x++){let $=(e.data[u++]-c[0])*d[0],v=(e.data[h++]-c[1])*d[1],S=(e.data[_++]-c[2])*d[2],T=y===-1?255:(e.data[y++]-c[3])*d[3];n.fillStyle="rgba("+$+","+v+","+S+","+T+")",n.fillRect(x,g,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},aa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,m;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,_=0,y=1,g=2,x=3,$=0,v=u,S=u*2,T=-1;l==="RGBA"?($=0,v=u,S=u*2,T=u*3):l==="RGB"?($=0,v=u,S=u*2):l==="RBG"&&($=0,S=u,v=u*2),n=r.createImageData(o,i);for(let C=0;C<i*o;_+=h,y+=h,g+=h,x+=h,C++)n.data[_]=(e.data[$++]-m[0])*c[0],n.data[y]=(e.data[v++]-m[1])*c[1],n.data[g]=(e.data[S++]-m[2])*c[2],n.data[x]=T===-1?255:(e.data[T++]-m[3])*c[3]}else throw new Error("Can not access image data");return n}});var Fn,ua,la,da,ca,pa,ma=R(()=>{vr();Fn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,m=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),u=4,h=0,_=1,y=2,g=3,x=0,$=c,v=c*2,S=-1;l==="RGB"&&(u=3,h=0,_=1,y=2,g=-1),d==="RGBA"?S=c*3:d==="RBG"?(x=0,v=c,$=c*2):d==="BGR"&&(v=0,$=c,x=c*2);for(let C=0;C<c;C++,h+=u,y+=u,_+=u,g+=u)m[x++]=(e[h]+a[0])/i[0],m[$++]=(e[_]+a[1])/i[1],m[v++]=(e[y]+a[2])/i[2],S!==-1&&g!==-1&&(m[S++]=(e[g]+a[3])/i[3]);return d==="RGBA"?new ze("float32",m,[1,4,r,n]):new ze("float32",m,[1,3,r,n])},ua=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=d();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=h,l.width=_}else l.tensorFormat="RGBA",l.height=h,l.width=_;u.drawImage(e,0,0),a=u.getImageData(0,0,_,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=m,l.width=u,t!==void 0){let h=d();h.width=u,h.height=m;let _=c(h);if(_!=null)_.putImageData(e,0,0),a=_.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let u=c(m);if(u!=null){let h=e.height,_=e.width;return u.drawImage(e,0,0,_,h),a=u.getImageData(0,0,_,h).data,l.height=h,l.width=_,Fn(a,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=d(),_=c(h);if(!e||!_)return u();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{h.width=y.width,h.height=y.height,_.drawImage(y,0,0,h.width,h.height);let g=_.getImageData(0,0,h.width,h.height);l.height=h.height,l.width=h.width,m(Fn(g.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Fn(a,l);throw new Error("Input data provided is not supported - aborted tensor creation")},la=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new ze({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},da=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},ca=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},pa=(e,t,r)=>new ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var St,qt,fa,ha,ga=R(()=>{St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),fa=!1,ha=()=>{if(!fa){fa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(St.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),r?(St.set("float16",Float16Array),qt.set(Float16Array,"float16")):St.set("float16",Uint16Array)}}});var ba,ya,_a=R(()=>{vr();ba=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ya=(e,t)=>{switch(e.location){case"cpu":return new ze(e.type,e.data,t);case"cpu-pinned":return new ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new ze({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var ze,vr=R(()=>{sa();ma();ga();_a();ze=class{constructor(t,r,n){ha();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let l=St.get(o);if(!l)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof l))throw new TypeError(`buffer should be of type ${l.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let l,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");l=r}else{let c=St.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?l=c.from(r,BigInt):l=c.from(r)}else if(r instanceof c)l=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")l=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",l=t;else if(c==="boolean")o="bool",l=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",l=Uint8Array.from(t);else{let c=qt.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,l=t}if(d===void 0)d=[l.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=l,this.dataLocation="cpu"}let a=ba(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return ua(t,r)}static fromTexture(t,r){return la(t,r)}static fromGpuBuffer(t,r){return da(t,r)}static fromMLTensor(t,r){return ca(t,r)}static fromPinnedBuffer(t,r,n){return pa(t,r,n)}toDataURL(t){return ia(this,t)}toImageData(t){return aa(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ya(this,t)}}});var Oe,$r=R(()=>{vr();Oe=ze});var xr,wa,Ue,De,qn=R(()=>{Hn();xr=(e,t)=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeStamp(`${e}::ORT::${t}`)},wa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),xr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ue=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||wa("BEGIN",e)},De=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||wa("END",e)}});var Sr,va=R(()=>{wr();$r();qn();Sr=class e{constructor(t){this.handler=t}async run(t,r,n){Ue();let o={},i={};if(typeof t!="object"||t===null||t instanceof Oe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof Oe)&&(c=!0,a=!1,o[u]=h)}if(c){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let l=await this.handler.run(t,o,i),d={};for(let c in l)if(Object.hasOwnProperty.call(l,c)){let m=l[c];m instanceof Oe?d[c]=m:d[c]=new Oe(m.type,m.data,m.dims)}return De(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ue();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await _r(a),c=await l.createInferenceSessionHandler(i,d);return De(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Np,$a=R(()=>{va();Np=Sr});var xa=R(()=>{});var Sa=R(()=>{});var Ta=R(()=>{});var Ia=R(()=>{});var Vp,Tr,Ca=R(()=>{wr();$r();Vp="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Tr=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,l]=await _r(i);if(a.createTrainingSessionHandler){let d=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,l);return new e(d,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Vp)}typeNarrowingForRunStep(t,r,n,o,i){let a={},l={};if(typeof n!="object"||n===null||n instanceof Oe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let c of o){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);a[c]=null}if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof Oe)&&(c=!0,d=!1,a[u]=h)}if(c){if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else l=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of t)if(typeof n[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(d)for(let c of r)a[c]=null;return[a,l]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof Oe?r[n]=o:r[n]=new Oe(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Wp,Aa=R(()=>{Ca();Wp=Tr});var jn={};Ft(jn,{InferenceSession:()=>Np,TRACE:()=>xr,TRACE_FUNC_BEGIN:()=>Ue,TRACE_FUNC_END:()=>De,Tensor:()=>Oe,TrainingSession:()=>Wp,env:()=>we,registerBackend:()=>xt});var We=R(()=>{ea();oa();$a();$r();xa();Sa();qn();Ta();Ia();Aa()});var Ir=R(()=>{"use strict"});var za={};Ft(za,{default:()=>Lp});var Ea,Pa,Lp,Oa=R(()=>{"use strict";Kn();ht();jt();Ea="ort-wasm-proxy-worker",Pa=globalThis.self?.name===Ea;Pa&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Cr(r.wasm).then(()=>{Ar(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;kr(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=Kt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Er(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Pr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:l}=r;zr(n,o,i,a,new Array(a.length).fill(null),l).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Br([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Or(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Lp=Pa?null:e=>new Worker(e??Dt,{type:"module",name:Ea})});var Da={};Ft(Da,{default:()=>Gp});var Yn,Ba,Gp,Ma=R(()=>{"use strict";Ba=(Yn=import.meta.url,async function(e={}){function t(){return se.buffer!=ee.buffer&&be(),ee}function r(){return se.buffer!=ee.buffer&&be(),ne}function n(){return se.buffer!=ee.buffer&&be(),ve}function o(){return se.buffer!=ee.buffer&&be(),Be}function i(){return se.buffer!=ee.buffer&&be(),$e}function a(){return se.buffer!=ee.buffer&&be(),de}function l(){return se.buffer!=ee.buffer&&be(),V}function d(){return se.buffer!=ee.buffer&&be(),Ge}var c,m,u=Object.assign({},e),h=new Promise((s,p)=>{c=s,m=p}),_=typeof window=="object",y=typeof importScripts=="function",g=y&&self.name=="em-pthread";u.mountExternalData=(s,p)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Eb||(u.Eb=new Map)).set(s,p)},u.unmountExternalData=()=>{delete u.Eb};var x=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,b,w)=>(...I)=>{let B=Qe,D=b?.();I=f(...I);let L=b?.();return D!==L&&(f=L,w(D),b=w=null),Qe!=B?new Promise((H,Q)=>{Bn={resolve:H,reject:Q}}):I},p=f=>async(...b)=>{try{if(u.Fb)throw Error("Session already started");let w=u.Fb={fc:b[0],errors:[]},I=await f(...b);if(u.Fb!==w)throw Error("Session mismatch");u.Gb?.flush();let B=w.errors;if(0<B.length){let D=await Promise.all(B);if(D=D.filter(L=>L),0<D.length)throw Error(D.join(`
`))}return I}finally{u.Fb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=p(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=p(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,p)=>{if($?.(),s==="webgpu"){[u.Gb,u.Ub,u.Yb,u.Nb,u.Xb,u.jb,u.Zb,u.bc,u.Vb,u.Wb,u.$b]=p;let f=u.Gb;u.jsepRegisterBuffer=(b,w,I,B)=>f.registerBuffer(b,w,I,B),u.jsepGetBuffer=b=>f.getBuffer(b),u.jsepCreateDownloader=(b,w,I)=>f.createDownloader(b,w,I),u.jsepOnCreateSession=b=>{f.onCreateSession(b)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepOnRunStart=b=>f.onRunStart(b),u.cc=(b,w)=>{f.upload(b,w)}}else if(s==="webnn"){[u.Gb,u.ac,u.Ob,u.jsepEnsureTensor,u.dc,u.jsepDownloadTensor]=p,u.jsepReleaseTensorId=u.Ob;let f=u.Gb;u.jsepOnRunStart=b=>f.onRunStart(b),u.jsepRegisterMLContext=(b,w)=>{f.registerMLContext(b,w)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepCreateMLTensorDownloader=(b,w)=>f.createMLTensorDownloader(b,w),u.jsepRegisterMLTensor=(b,w,I)=>f.registerMLTensor(b,w,I),u.jsepCreateMLContext=b=>f.createMLContext(b),u.qc=(b,w,I,B,D)=>f.registerMLConstant(b,w,I,B,D,u.Eb)}};var v,S,T=Object.assign({},u),C="./this.program",A=(s,p)=>{throw p},P="";(_||y)&&(y?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),Yn&&(P=Yn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),y&&(S=s=>{var p=new XMLHttpRequest;return p.open("GET",s,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),v=(s,p,f)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):f()},b.onerror=f,b.send(null)});var O,U=console.log.bind(console),G=console.error.bind(console),q=U,K=G;if(Object.assign(u,T),T=null,g){let s=function(p){try{var f=p.data,b=f.cmd;if(b==="load"){let w=[];self.onmessage=I=>w.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of w)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...B)=>{postMessage({Mb:"callHandler",oc:I,args:B})},I=="print"&&(q=u[I]),I=="printErr"&&(K=u[I]));se=f.wasmMemory,be(),W(f.wasmModule)}else if(b==="run"){Un(f.pthread_ptr,0,0,1,0,0),Pn(f.pthread_ptr),yc(),Fo(),Y||(Li(),Y=!0);try{_c(f.start_routine,f.arg)}catch(w){if(w!="unwind")throw w}}else b==="cancel"?Bt()&&hr(-1):f.target!=="setimmediate"&&(b==="checkMailbox"?Y&&ar():b&&(K(`worker: received unknown command ${b}`),K(f)))}catch(w){throw Gi(),w}};var hg=s,W,Y=!1;K=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Mb:"alert",text:p.join(" "),rc:Bt()})},u.instantiateWasm=(p,f)=>new Promise(b=>{W=w=>{w=new WebAssembly.Instance(w,Vo()),f(w),b()}}),self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=s}u.wasmBinary&&(O=u.wasmBinary);var se,X,re,ee,ne,ve,Be,$e,de,V,j,he,Ge,_e=!1;function be(){var s=se.buffer;u.HEAP8=ee=new Int8Array(s),u.HEAP16=ve=new Int16Array(s),u.HEAPU8=ne=new Uint8Array(s),u.HEAPU16=Be=new Uint16Array(s),u.HEAP32=$e=new Int32Array(s),u.HEAPU32=de=new Uint32Array(s),u.HEAPF32=V=new Float32Array(s),u.HEAPF64=Ge=new Float64Array(s),u.HEAP64=j=new BigInt64Array(s),u.HEAPU64=he=new BigUint64Array(s)}if(!g){if(!((se=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof x))throw K("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");be()}var Ke=[],Lt=[],bn=[],Gt=0,yn=null,Ht=null;function Do(){if(--Gt==0&&(yn!==null&&(clearInterval(yn),yn=null),Ht)){var s=Ht;Ht=null,s()}}function dt(s){throw K(s="Aborted("+s+")"),_e=!0,re=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var _n,Mo=s=>s.startsWith("data:application/octet-stream;base64,"),Ro=s=>s.startsWith("file://");function Uo(s){if(s==_n&&O)return new Uint8Array(O);if(S)return S(s);throw"both async and sync fetching of the wasm failed"}function No(s,p,f){return function(b){if(!O&&(_||y)){if(typeof fetch=="function"&&!Ro(b))return fetch(b,{credentials:"same-origin"}).then(w=>{if(!w.ok)throw`failed to load wasm binary file at '${b}'`;return w.arrayBuffer()}).catch(()=>Uo(b));if(v)return new Promise((w,I)=>{v(b,B=>w(new Uint8Array(B)),I)})}return Promise.resolve().then(()=>Uo(b))}(s).then(b=>WebAssembly.instantiate(b,p)).then(f,b=>{K(`failed to asynchronously prepare wasm: ${b}`),dt(b)})}function Vo(){return{a:{za:bc,Aa:gc,b:vc,_:Yo,z:Xo,oa:Jo,W:ti,Y:ri,pa:ni,ma:oi,fa:ii,la:ai,K:si,X:ui,U:li,na:di,V:ci,ua:$c,E:Sc,O:Tc,N:Cc,D:kc,q:Ec,m:Pc,F:zc,y:Nc,P:Vc,sa:Wc,ia:Lc,S:Gc,$:Hc,G:Fc,ha:Pn,ra:qc,x:jc,v:Zc,s:Qc,l:Jc,c:kn,k:ep,j:np,t:op,u:ip,e:ap,p:sp,w:up,h:lp,f:dp,i:cp,n:pp,g:mp,ca:fp,da:hp,ea:gp,aa:Ti,ba:Ii,R:bp,d:yp,B:_p,H:wp,L:vp,M:$p,qa:xp,T:Sp,r:Ai,C:Tp,ya:Ip,Q:Cp,xa:Ap,wa:kp,ja:Pi,ka:zi,Z:Sn,A:Oi,J:Bi,ga:Di,I:Mi,a:se,va:xn,ta:Ni,o:zp}}}var wn={811764:(s,p,f,b,w)=>{if(u===void 0||!u.Eb)return 1;if((s=Ee(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=u.Eb.get(s)))return 2;if(p=Number(p>>>0),f=Number(f>>>0),b=Number(b>>>0),p+f>s.byteLength)return 3;try{let I=s.subarray(p,p+f);switch(w){case 0:r().set(I,b>>>0);break;case 1:u.cc(b,I);break;default:return 4}return 0}catch{return 4}},812479:(s,p,f)=>{u.dc(s,r().subarray(p>>>0,p+f>>>0))},812542:()=>u.ac(),812583:s=>{u.Ob(s)},812619:()=>{u.Vb()},812650:()=>{u.Wb()},812679:()=>{u.$b()},812704:s=>u.Ub(s),812737:s=>u.Yb(s),812769:(s,p,f)=>{u.Nb(Number(s),Number(p),Number(f),!0)},812832:(s,p,f)=>{u.Nb(Number(s),Number(p),Number(f))},812889:()=>typeof wasmOffsetConverter<"u",812946:s=>{u.jb("Abs",s,void 0)},812997:s=>{u.jb("Neg",s,void 0)},813048:s=>{u.jb("Floor",s,void 0)},813101:s=>{u.jb("Ceil",s,void 0)},813153:s=>{u.jb("Reciprocal",s,void 0)},813211:s=>{u.jb("Sqrt",s,void 0)},813263:s=>{u.jb("Exp",s,void 0)},813314:s=>{u.jb("Erf",s,void 0)},813365:s=>{u.jb("Sigmoid",s,void 0)},813420:(s,p,f)=>{u.jb("HardSigmoid",s,{alpha:p,beta:f})},813499:s=>{u.jb("Log",s,void 0)},813550:s=>{u.jb("Sin",s,void 0)},813601:s=>{u.jb("Cos",s,void 0)},813652:s=>{u.jb("Tan",s,void 0)},813703:s=>{u.jb("Asin",s,void 0)},813755:s=>{u.jb("Acos",s,void 0)},813807:s=>{u.jb("Atan",s,void 0)},813859:s=>{u.jb("Sinh",s,void 0)},813911:s=>{u.jb("Cosh",s,void 0)},813963:s=>{u.jb("Asinh",s,void 0)},814016:s=>{u.jb("Acosh",s,void 0)},814069:s=>{u.jb("Atanh",s,void 0)},814122:s=>{u.jb("Tanh",s,void 0)},814174:s=>{u.jb("Not",s,void 0)},814225:(s,p,f)=>{u.jb("Clip",s,{min:p,max:f})},814294:s=>{u.jb("Clip",s,void 0)},814346:(s,p)=>{u.jb("Elu",s,{alpha:p})},814404:s=>{u.jb("Gelu",s,void 0)},814456:s=>{u.jb("Relu",s,void 0)},814508:(s,p)=>{u.jb("LeakyRelu",s,{alpha:p})},814572:(s,p)=>{u.jb("ThresholdedRelu",s,{alpha:p})},814642:(s,p)=>{u.jb("Cast",s,{to:p})},814700:s=>{u.jb("Add",s,void 0)},814751:s=>{u.jb("Sub",s,void 0)},814802:s=>{u.jb("Mul",s,void 0)},814853:s=>{u.jb("Div",s,void 0)},814904:s=>{u.jb("Pow",s,void 0)},814955:s=>{u.jb("Equal",s,void 0)},815008:s=>{u.jb("Greater",s,void 0)},815063:s=>{u.jb("GreaterOrEqual",s,void 0)},815125:s=>{u.jb("Less",s,void 0)},815177:s=>{u.jb("LessOrEqual",s,void 0)},815236:(s,p,f,b,w)=>{u.jb("ReduceMean",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},815411:(s,p,f,b,w)=>{u.jb("ReduceMax",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},815585:(s,p,f,b,w)=>{u.jb("ReduceMin",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},815759:(s,p,f,b,w)=>{u.jb("ReduceProd",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},815934:(s,p,f,b,w)=>{u.jb("ReduceSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816108:(s,p,f,b,w)=>{u.jb("ReduceL1",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816281:(s,p,f,b,w)=>{u.jb("ReduceL2",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816454:(s,p,f,b,w)=>{u.jb("ReduceLogSum",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816631:(s,p,f,b,w)=>{u.jb("ReduceSumSquare",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816811:(s,p,f,b,w)=>{u.jb("ReduceLogSumExp",s,{keepDims:!!p,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},816991:s=>{u.jb("Where",s,void 0)},817044:(s,p,f)=>{u.jb("Transpose",s,{perm:p?Array.from(i().subarray(Number(p)>>>0,Number(f)>>>0)):[]})},817168:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Ee(f),format:b?"NHWC":"NCHW"})},817301:(s,p,f,b)=>{u.jb("DepthToSpace",s,{blocksize:p,mode:Ee(f),format:b?"NHWC":"NCHW"})},817434:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[w],pads:[I,B],strides:[D],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Ee(le)})},817867:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Ee(z)})},818528:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:p,dilations:[f],group:b,kernelShape:[w],pads:[I,B],strides:[D],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Ee(le)})},818961:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("ConvTranspose",s,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Ee(z)})},819622:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},819713:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(i().subarray(Number(D)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},820192:(s,p)=>{u.jb("GlobalAveragePool",s,{format:p?"NHWC":"NCHW"})},820283:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(i().subarray(Number(D)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},820762:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},820849:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(i().subarray(Number(D)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},821324:(s,p)=>{u.jb("GlobalMaxPool",s,{format:p?"NHWC":"NCHW"})},821411:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:p,ceil_mode:f,count_include_pad:b,storage_order:w,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(i().subarray(Number(D)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},821886:(s,p,f,b,w)=>{u.jb("Gemm",s,{alpha:p,beta:f,transA:b,transB:w})},821990:s=>{u.jb("MatMul",s,void 0)},822044:(s,p,f,b)=>{u.jb("ArgMax",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},822152:(s,p,f,b)=>{u.jb("ArgMin",s,{keepDims:!!p,selectLastIndex:!!f,axis:b})},822260:(s,p)=>{u.jb("Softmax",s,{axis:p})},822323:(s,p)=>{u.jb("Concat",s,{axis:p})},822383:(s,p,f,b,w)=>{u.jb("Split",s,{axis:p,numOutputs:f,splitSizes:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},822539:s=>{u.jb("Expand",s,void 0)},822593:(s,p)=>{u.jb("Gather",s,{axis:Number(p)})},822664:(s,p)=>{u.jb("GatherElements",s,{axis:Number(p)})},822743:(s,p,f,b,w,I,B,D,L,H,Q)=>{u.jb("Resize",s,{antialias:p,axes:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Ee(w),cubicCoeffA:I,excludeOutside:B,extrapolationValue:D,keepAspectRatioPolicy:Ee(L),mode:Ee(H),nearestMode:Ee(Q)})},823105:(s,p,f,b,w,I,B)=>{u.jb("Slice",s,{starts:p?Array.from(i().subarray(Number(p)>>>0,Number(f)>>>0)):[],ends:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[],axes:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[]})},823369:s=>{u.jb("Tile",s,void 0)},823421:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},823535:(s,p,f)=>{u.jb("InstanceNormalization",s,{epsilon:p,format:f?"NHWC":"NCHW"})},823649:s=>{u.jb("Range",s,void 0)},823702:(s,p)=>{u.jb("Einsum",s,{equation:Ee(p)})},823783:(s,p,f,b,w)=>{u.jb("Pad",s,{mode:p,value:f,pads:b?Array.from(i().subarray(Number(b)>>>0,Number(w)>>>0)):[]})},823926:(s,p,f,b,w,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!w,trainingMode:!!b,format:I?"NHWC":"NCHW"})},824095:(s,p,f,b,w,I)=>{u.jb("BatchNormalization",s,{epsilon:p,momentum:f,spatial:!!w,trainingMode:!!b,format:I?"NHWC":"NCHW"})},824264:(s,p,f)=>{u.jb("CumSum",s,{exclusive:Number(p),reverse:Number(f)})},824361:(s,p,f)=>{u.jb("DequantizeLinear",s,{axis:p,blockSize:f})},824451:(s,p,f,b,w,I,B,D,L)=>{u.jb("Attention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:w,doRotary:I,qkvHiddenSizes:B?Array.from(i().subarray(Number(D)>>>0,Number(D)+B>>>0)):[],pastPresentShareBuffer:!!L})},824723:s=>{u.jb("BiasAdd",s,void 0)},824778:s=>{u.jb("BiasSplitGelu",s,void 0)},824839:s=>{u.jb("FastGelu",s,void 0)},824895:(s,p,f,b,w,I,B,D,L,H,Q,ce,ge,z,le,Te)=>{u.jb("Conv",s,{format:ce?"NHWC":"NCHW",auto_pad:p,dilations:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],group:w,kernel_shape:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],pads:D?Array.from(i().subarray(Number(D)>>>0,Number(L)>>>0)):[],strides:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],w_is_const:()=>!!t()[Number(ge)>>>0],activation:Ee(z),activation_params:le?Array.from(l().subarray(Number(le)>>>0,Number(Te)>>>0)):[]})},825479:s=>{u.jb("Gelu",s,void 0)},825531:(s,p,f,b,w,I,B,D,L)=>{u.jb("GroupQueryAttention",s,{numHeads:p,kvNumHeads:f,scale:b,softcap:w,doRotary:I,rotaryInterleaved:B,smoothSoftmax:D,localWindowSize:L})},825748:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},825859:(s,p,f,b)=>{u.jb("LayerNormalization",s,{axis:p,epsilon:f,simplified:!!b})},825970:(s,p,f,b,w,I)=>{u.jb("MatMulNBits",s,{k:p,n:f,accuracyLevel:b,bits:w,blockSize:I})},826097:(s,p,f,b,w,I)=>{u.jb("MultiHeadAttention",s,{numHeads:p,isUnidirectional:f,maskFilterValue:b,scale:w,doRotary:I})},826256:(s,p)=>{u.jb("QuickGelu",s,{alpha:p})},826320:(s,p,f,b,w)=>{u.jb("RotaryEmbedding",s,{interleaved:!!p,numHeads:f,rotaryEmbeddingDim:b,scale:w})},826459:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},826561:(s,p,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:p,simplified:!!f})},826663:(s,p,f,b)=>{u.jb("GatherBlockQuantized",s,{gatherAxis:p,quantizeAxis:f,blockSize:b})},826784:s=>{u.Zb(s)},826818:(s,p)=>u.bc(Number(s),Number(p),u.Fb.fc,u.Fb.errors)};function gc(s,p,f){return wi(async()=>{await u.Xb(Number(s),Number(p),Number(f))})}function bc(){return typeof wasmOffsetConverter<"u"}function vn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var $n=s=>{s.terminate(),s.onmessage=()=>{}},Wo=s=>{ct.length==0&&(jo(),qo(ct[0]));var p=ct.pop();if(!p)return 6;wt.push(p),Ye[s.Ab]=p,p.Ab=s.Ab;var f={cmd:"run",start_routine:s.hc,arg:s.Qb,pthread_ptr:s.Ab};return p.postMessage(f,s.mc),0},_t=0,xe=(s,p,...f)=>{for(var b=2*f.length,w=Wn(),I=Vn(8*b),B=I>>>3,D=0;D<f.length;D++){var L=f[D];typeof L=="bigint"?(j[B+2*D]=1n,j[B+2*D+1]=L):(j[B+2*D]=0n,d()[B+2*D+1>>>0]=L)}return s=Hi(s,0,b,I,p),gr(w),s};function xn(s){if(g)return xe(0,1,s);if(re=s,!(0<_t)){for(var p of wt)$n(p);for(p of ct)$n(p);ct=[],wt=[],Ye=[],_e=!0}A(s,new vn(s))}function Lo(s){if(g)return xe(1,0,s);Sn(s)}var Sn=s=>{if(re=s,g)throw Lo(s),"unwind";xn(s)},ct=[],wt=[],Go=[],Ye={},Ho=s=>{var p=s.Ab;delete Ye[p],ct.push(s),wt.splice(wt.indexOf(s),1),s.Ab=0,Nn(p)};function Fo(){Go.forEach(s=>s())}var qo=s=>new Promise(p=>{s.onmessage=w=>{var I=(w=w.data).cmd;if(w.targetThread&&w.targetThread!=Bt()){var B=Ye[w.targetThread];B?B.postMessage(w,w.transferList):K(`Internal error! Worker sent a message "${I}" to target pthread ${w.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?ar():I==="spawnThread"?Wo(w):I==="cleanupThread"?Ho(Ye[w.thread]):I==="killThread"?(w=w.thread,I=Ye[w],delete Ye[w],$n(I),Nn(w),wt.splice(wt.indexOf(I),1),I.Ab=0):I==="cancelThread"?Ye[w.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,p(s)):I==="alert"?alert(`Thread ${w.threadId}: ${w.text}`):w.target==="setimmediate"?s.postMessage(w):I==="callHandler"?u[w.handler](...w.args):I&&K(`worker sent an unknown command ${I}`)},s.onerror=w=>{throw K(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var f,b=[];for(f of[])u.hasOwnProperty(f)&&b.push(f);s.postMessage({cmd:"load",handlers:b,wasmMemory:se,wasmModule:X})});function jo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var ir=s=>{for(;0<s.length;)s.shift()(u)},yc=()=>{var s=Bt(),p=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],qi(p,p-s),gr(p)},_c=(s,p)=>{_t=0,s=ji(s,p),0<_t?re=s:hr(s)};class wc{constructor(p){this.Jb=p-24}}function vc(s,p,f){var b=new wc(s>>>=0);throw p>>>=0,f>>>=0,a()[b.Jb+16>>>2>>>0]=0,a()[b.Jb+4>>>2>>>0]=p,a()[b.Jb+8>>>2>>>0]=f,s}function Ko(s,p,f,b){return g?xe(2,1,s,p,f,b):Yo(s,p,f,b)}function Yo(s,p,f,b){if(s>>>=0,p>>>=0,f>>>=0,b>>>=0,x===void 0)return K("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var w=[];return g&&w.length===0?Ko(s,p,f,b):(s={hc:f,Ab:s,Qb:b,mc:w},g?(s.Mb="spawnThread",postMessage(s,w),0):Wo(s))}var Zo=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Qo=(s,p,f)=>{var b=(p>>>=0)+f;for(f=p;s[f]&&!(f>=b);)++f;if(16<f-p&&s.buffer&&Zo)return Zo.decode(s.buffer instanceof x?s.slice(p,f):s.subarray(p,f));for(b="";p<f;){var w=s[p++];if(128&w){var I=63&s[p++];if((224&w)==192)b+=String.fromCharCode((31&w)<<6|I);else{var B=63&s[p++];65536>(w=(240&w)==224?(15&w)<<12|I<<6|B:(7&w)<<18|I<<12|B<<6|63&s[p++])?b+=String.fromCharCode(w):(w-=65536,b+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else b+=String.fromCharCode(w)}return b},Ee=(s,p)=>(s>>>=0)?Qo(r(),s,p):"";function Xo(s,p,f){return g?xe(3,1,s,p,f):0}function Jo(s,p){if(g)return xe(4,1,s,p)}var Tn=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);127>=b?p++:2047>=b?p+=2:55296<=b&&57343>=b?(p+=4,++f):p+=3}return p},ei=(s,p,f,b)=>{if(!(0<b))return 0;var w=f>>>=0;b=f+b-1;for(var I=0;I<s.length;++I){var B=s.charCodeAt(I);if(55296<=B&&57343>=B&&(B=65536+((1023&B)<<10)|1023&s.charCodeAt(++I)),127>=B){if(f>=b)break;p[f++>>>0]=B}else{if(2047>=B){if(f+1>=b)break;p[f++>>>0]=192|B>>6}else{if(65535>=B){if(f+2>=b)break;p[f++>>>0]=224|B>>12}else{if(f+3>=b)break;p[f++>>>0]=240|B>>18,p[f++>>>0]=128|B>>12&63}p[f++>>>0]=128|B>>6&63}p[f++>>>0]=128|63&B}}return p[f>>>0]=0,f-w},Pt=(s,p,f)=>ei(s,r(),p,f);function ti(s,p){if(g)return xe(5,1,s,p)}function ri(s,p,f){if(g)return xe(6,1,s,p,f)}function ni(s,p,f){return g?xe(7,1,s,p,f):0}function oi(s,p){if(g)return xe(8,1,s,p)}function ii(s,p,f){if(g)return xe(9,1,s,p,f)}function ai(s,p,f,b){if(g)return xe(10,1,s,p,f,b)}function si(s,p,f,b){if(g)return xe(11,1,s,p,f,b)}function ui(s,p,f,b){if(g)return xe(12,1,s,p,f,b)}function li(s){if(g)return xe(13,1,s)}function di(s,p){if(g)return xe(14,1,s,p)}function ci(s,p,f){if(g)return xe(15,1,s,p,f)}var pi,pt,$c=()=>{dt("")},Ze=s=>{for(var p="";r()[s>>>0];)p+=pi[r()[s++>>>0]];return p},In={},Cn={},xc={};function at(s,p,f={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(b,w,I={}){var B=w.name;if(!b)throw new pt(`type "${B}" must have a positive integer typeid pointer`);if(Cn.hasOwnProperty(b)){if(I.Sb)return;throw new pt(`Cannot register type '${B}' twice`)}Cn[b]=w,delete xc[b],In.hasOwnProperty(b)&&(w=In[b],delete In[b],w.forEach(D=>D()))}(s,p,f)}var mi=(s,p,f)=>{switch(p){case 1:return f?b=>t()[b>>>0]:b=>r()[b>>>0];case 2:return f?b=>n()[b>>>1>>>0]:b=>o()[b>>>1>>>0];case 4:return f?b=>i()[b>>>2>>>0]:b=>a()[b>>>2>>>0];case 8:return f?b=>j[b>>>3]:b=>he[b>>>3];default:throw new TypeError(`invalid integer width (${p}): ${s}`)}};function Sc(s,p,f){f>>>=0,at(s>>>=0,{name:p=Ze(p>>>0),fromWireType:b=>b,toWireType:function(b,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(b=typeof w)=="object"||b==="array"||b==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},argPackAdvance:mt,readValueFromPointer:mi(p,f,p.indexOf("u")==-1),Db:null})}var mt=8;function Tc(s,p,f,b){at(s>>>=0,{name:p=Ze(p>>>0),fromWireType:function(w){return!!w},toWireType:function(w,I){return I?f:b},argPackAdvance:mt,readValueFromPointer:function(w){return this.fromWireType(r()[w>>>0])},Db:null})}var An=[],st=[];function kn(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,An.push(s))}var Ne=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return st[s]},Ve=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=An.pop()||st.length;return st[p]=s,st[p+1]=1,p}};function En(s){return this.fromWireType(a()[s>>>2>>>0])}var Ic={name:"emscripten::val",fromWireType:s=>{var p=Ne(s);return kn(s),p},toWireType:(s,p)=>Ve(p),argPackAdvance:mt,readValueFromPointer:En,Db:null};function Cc(s){return at(s>>>0,Ic)}var Ac=(s,p)=>{switch(p){case 4:return function(f){return this.fromWireType(l()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(d()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${s}`)}};function kc(s,p,f){f>>>=0,at(s>>>=0,{name:p=Ze(p>>>0),fromWireType:b=>b,toWireType:(b,w)=>w,argPackAdvance:mt,readValueFromPointer:Ac(p,f),Db:null})}function Ec(s,p,f,b,w){if(s>>>=0,f>>>=0,p=Ze(p>>>0),w===-1&&(w=4294967295),w=D=>D,b===0){var I=32-8*f;w=D=>D<<I>>>I}var B=p.includes("unsigned")?function(D,L){return L>>>0}:function(D,L){return L};at(s,{name:p,fromWireType:w,toWireType:B,argPackAdvance:mt,readValueFromPointer:mi(p,f,b!==0),Db:null})}function Pc(s,p,f){function b(I){var B=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new w(t().buffer,I,B)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];at(s>>>=0,{name:f=Ze(f>>>0),fromWireType:b,argPackAdvance:mt,readValueFromPointer:b},{Sb:!0})}function zc(s,p){s>>>=0;var f=(p=Ze(p>>>0))==="std::string";at(s,{name:p,fromWireType:function(b){var w=a()[b>>>2>>>0],I=b+4;if(f)for(var B=I,D=0;D<=w;++D){var L=I+D;if(D==w||r()[L>>>0]==0){if(B=Ee(B,L-B),H===void 0)var H=B;else H+=String.fromCharCode(0),H+=B;B=L+1}}else{for(H=Array(w),D=0;D<w;++D)H[D]=String.fromCharCode(r()[I+D>>>0]);H=H.join("")}return Xe(b),H},toWireType:function(b,w){w instanceof ArrayBuffer&&(w=new Uint8Array(w));var I=typeof w=="string";if(!(I||w instanceof Uint8Array||w instanceof Uint8ClampedArray||w instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var B=f&&I?Tn(w):w.length,D=fr(4+B+1),L=D+4;if(a()[D>>>2>>>0]=B,f&&I)Pt(w,L,B+1);else if(I)for(I=0;I<B;++I){var H=w.charCodeAt(I);if(255<H)throw Xe(L),new pt("String has UTF-16 code units that do not fit in 8 bits");r()[L+I>>>0]=H}else for(I=0;I<B;++I)r()[L+I>>>0]=w[I];return b!==null&&b.push(Xe,D),D},argPackAdvance:mt,readValueFromPointer:En,Db(b){Xe(b)}})}var fi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Oc=(s,p)=>{for(var f=s>>1,b=f+p/2;!(f>=b)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&fi)return fi.decode(r().slice(s,f));for(f="",b=0;!(b>=p/2);++b){var w=n()[s+2*b>>>1>>>0];if(w==0)break;f+=String.fromCharCode(w)}return f},Bc=(s,p,f)=>{if(f??=2147483647,2>f)return 0;var b=p;f=(f-=2)<2*s.length?f/2:s.length;for(var w=0;w<f;++w){var I=s.charCodeAt(w);n()[p>>>1>>>0]=I,p+=2}return n()[p>>>1>>>0]=0,p-b},Dc=s=>2*s.length,Mc=(s,p)=>{for(var f=0,b="";!(f>=p/4);){var w=i()[s+4*f>>>2>>>0];if(w==0)break;++f,65536<=w?(w-=65536,b+=String.fromCharCode(55296|w>>10,56320|1023&w)):b+=String.fromCharCode(w)}return b},Rc=(s,p,f)=>{if(p>>>=0,f??=2147483647,4>f)return 0;var b=p;f=b+f-4;for(var w=0;w<s.length;++w){var I=s.charCodeAt(w);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++w)),i()[p>>>2>>>0]=I,(p+=4)+4>f)break}return i()[p>>>2>>>0]=0,p-b},Uc=s=>{for(var p=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);55296<=b&&57343>=b&&++f,p+=4}return p};function Nc(s,p,f){if(s>>>=0,p>>>=0,f=Ze(f>>>=0),p===2)var b=Oc,w=Bc,I=Dc,B=D=>o()[D>>>1>>>0];else p===4&&(b=Mc,w=Rc,I=Uc,B=D=>a()[D>>>2>>>0]);at(s,{name:f,fromWireType:D=>{for(var L,H=a()[D>>>2>>>0],Q=D+4,ce=0;ce<=H;++ce){var ge=D+4+ce*p;ce!=H&&B(ge)!=0||(Q=b(Q,ge-Q),L===void 0?L=Q:(L+=String.fromCharCode(0),L+=Q),Q=ge+p)}return Xe(D),L},toWireType:(D,L)=>{if(typeof L!="string")throw new pt(`Cannot pass non-string to C++ string type ${f}`);var H=I(L),Q=fr(4+H+p);return a()[Q>>>2>>>0]=H/p,w(L,Q+4,H+p),D!==null&&D.push(Xe,Q),Q},argPackAdvance:mt,readValueFromPointer:En,Db(D){Xe(D)}})}function Vc(s,p){at(s>>>=0,{Tb:!0,name:p=Ze(p>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Wc=()=>1;function Lc(s){Un(s>>>0,!y,1,!_,131072,!1),Fo()}var hi=s=>{if(!_e)try{if(s(),!(0<_t))try{g?hr(re):Sn(re)}catch(p){p instanceof vn||p=="unwind"||A(1,p)}}catch(p){p instanceof vn||p=="unwind"||A(1,p)}};function Pn(s){s>>>=0,typeof Atomics.nc=="function"&&(Atomics.nc(i(),s>>>2,s).value.then(ar),s+=128,Atomics.store(i(),s>>>2,1))}var ar=()=>{var s=Bt();s&&(Pn(s),hi(Fi))};function Gc(s,p){(s>>>=0)==p>>>0?setTimeout(ar):g?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ye[s])&&s.postMessage({cmd:"checkMailbox"})}var zn=[];function Hc(s,p,f,b,w){for(p>>>=0,b/=2,zn.length=b,f=w>>>0>>>3,w=0;w<b;w++)zn[w]=j[f+2*w]?j[f+2*w+1]:d()[f+2*w+1>>>0];return(p?wn[p]:Op[s])(...zn)}function Fc(s){s>>>=0,g?postMessage({cmd:"cleanupThread",thread:s}):Ho(Ye[s])}function qc(s){}var On=(s,p)=>{var f=Cn[s];if(f===void 0)throw s=Wi(s),f=Ze(s),Xe(s),new pt(`${p} has unknown type ${f}`);return f},gi=(s,p,f)=>{var b=[];return s=s.toWireType(b,f),b.length&&(a()[p>>>2>>>0]=Ve(b)),s};function jc(s,p,f){return p>>>=0,f>>>=0,s=Ne(s>>>0),p=On(p,"emval::as"),gi(p,f,s)}var sr=s=>{try{s()}catch(p){dt(p)}},ft=0,Qe=null,bi=0,ur=[],yi={},_i={},Kc=0,Bn=null,Yc=[];function wi(s){return function(p){if(!_e){if(ft===0){var f=!1,b=!1;p((w=0)=>{if(!_e&&(bi=w,f=!0,b)){ft=2,sr(()=>Zi(Qe)),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.resume(),w=!1;try{var I=function(){var L=i()[Qe+8>>>2>>>0];return L=Z[_i[L]],--_t,L()}()}catch(L){I=L,w=!0}var B=!1;if(!Qe){var D=Bn;D&&(Bn=null,(w?D.reject:D.resolve)(I),B=!0)}if(w&&!B)throw I}}),b=!0,f||(ft=1,Qe=function(){var w=fr(65548),I=w+12;a()[w>>>2>>>0]=I,a()[w+4>>>2>>>0]=I+65536,I=ur[0];var B=yi[I];return B===void 0&&(B=Kc++,yi[I]=B,_i[B]=I),I=B,i()[w+8>>>2>>>0]=I,w}(),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.pause(),sr(()=>Ki(Qe)))}else ft===2?(ft=0,sr(Qi),Xe(Qe),Qe=null,Yc.forEach(hi)):dt(`invalid state: ${ft}`);return bi}}(p=>{s().then(p)})}function Zc(s){return s>>>=0,wi(()=>(s=Ne(s)).then(Ve))}var lr=[];function Qc(s,p,f,b){return f>>>=0,b>>>=0,(s=lr[s>>>0])(null,p=Ne(p>>>0),f,b)}var Xc={},dr=s=>{var p=Xc[s];return p===void 0?Ze(s):p};function Jc(s,p,f,b,w){return f>>>=0,b>>>=0,w>>>=0,(s=lr[s>>>0])(p=Ne(p>>>0),p[f=dr(f)],b,w)}var vi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function ep(s){return(s>>>=0)==0?Ve(vi()):(s=dr(s),Ve(vi()[s]))}var tp=s=>{var p=lr.length;return lr.push(s),p},rp=(s,p)=>{for(var f=Array(s),b=0;b<s;++b)f[b]=On(a()[p+4*b>>>2>>>0],"parameter "+b);return f},$i=(s,p)=>Object.defineProperty(p,"name",{value:s});function np(s,p,f){var b=(p=rp(s,p>>>0)).shift();s--;var w=`return function (obj, func, destructorsRef, args) {
`,I=0,B=[];f===0&&B.push("obj");for(var D=["retType"],L=[b],H=0;H<s;++H)B.push("arg"+H),D.push("argType"+H),L.push(p[H]),w+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[H].argPackAdvance;return w+=`  var rv = ${f===1?"new func":"func.call"}(${B.join(", ")});
`,b.Tb||(D.push("emval_returnValue"),L.push(gi),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(w+`};
`),s=function(Q){var ce=Function;if(!(ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ce} which is not a function`);var ge=$i(ce.name||"unknownFunctionName",function(){});return ge.prototype=ce.prototype,ge=new ge,(Q=ce.apply(ge,Q))instanceof Object?Q:ge}(D)(...L),f=`methodCaller<(${p.map(Q=>Q.name).join(", ")}) => ${b.name}>`,tp($i(f,s))}function op(s){return s=dr(s>>>0),Ve(u[s])}function ip(s,p){return p>>>=0,s=Ne(s>>>0),p=Ne(p),Ve(s[p])}function ap(s){9<(s>>>=0)&&(st[s+1]+=1)}function sp(){return Ve([])}function up(s){s=Ne(s>>>0);for(var p=Array(s.length),f=0;f<s.length;f++)p[f]=s[f];return Ve(p)}function lp(s){return Ve(dr(s>>>0))}function dp(){return Ve({})}function cp(s){for(var p=Ne(s>>>=0);p.length;){var f=p.pop();p.pop()(f)}kn(s)}function pp(s,p,f){p>>>=0,f>>>=0,s=Ne(s>>>0),p=Ne(p),f=Ne(f),s[p]=f}function mp(s,p){return p>>>=0,s=(s=On(s>>>0,"_emval_take_value")).readValueFromPointer(p),Ve(s)}function fp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getUTCSeconds(),i()[p+4>>>2>>>0]=s.getUTCMinutes(),i()[p+8>>>2>>>0]=s.getUTCHours(),i()[p+12>>>2>>>0]=s.getUTCDate(),i()[p+16>>>2>>>0]=s.getUTCMonth(),i()[p+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[p+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[p+28>>>2>>>0]=s}var zt=s=>s%4==0&&(s%100!=0||s%400==0),xi=[0,31,60,91,121,152,182,213,244,274,305,335],Si=[0,31,59,90,120,151,181,212,243,273,304,334];function hp(s,p){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),p>>>=0,s=new Date(1e3*s),i()[p>>>2>>>0]=s.getSeconds(),i()[p+4>>>2>>>0]=s.getMinutes(),i()[p+8>>>2>>>0]=s.getHours(),i()[p+12>>>2>>>0]=s.getDate(),i()[p+16>>>2>>>0]=s.getMonth(),i()[p+20>>>2>>>0]=s.getFullYear()-1900,i()[p+24>>>2>>>0]=s.getDay();var f=(zt(s.getFullYear())?xi:Si)[s.getMonth()]+s.getDate()-1|0;i()[p+28>>>2>>>0]=f,i()[p+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=b&&s.getTimezoneOffset()==Math.min(b,f)),i()[p+32>>>2>>>0]=s}function gp(s){s>>>=0;var p=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],b=p.getTimezoneOffset(),w=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),B=Math.min(I,w);return 0>f?i()[s+32>>>2>>>0]=+(w!=I&&B==b):0<f!=(B==b)&&(w=Math.max(I,w),p.setTime(p.getTime()+6e4*((0<f?B:w)-b))),i()[s+24>>>2>>>0]=p.getDay(),f=(zt(p.getFullYear())?xi:Si)[p.getMonth()]+p.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=p.getSeconds(),i()[s+4>>>2>>>0]=p.getMinutes(),i()[s+8>>>2>>>0]=p.getHours(),i()[s+12>>>2>>>0]=p.getDate(),i()[s+16>>>2>>>0]=p.getMonth(),i()[s+20>>>2>>>0]=p.getYear(),s=p.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function Ti(s,p,f,b,w,I,B){return g?xe(16,1,s,p,f,b,w,I,B):-52}function Ii(s,p,f,b,w,I){if(g)return xe(17,1,s,p,f,b,w,I)}function bp(s,p,f,b){s>>>=0,p>>>=0,f>>>=0,b>>>=0;var w=new Date().getFullYear(),I=new Date(w,0,1),B=new Date(w,6,1);w=I.getTimezoneOffset();var D=B.getTimezoneOffset(),L=Math.max(w,D);a()[s>>>2>>>0]=60*L,i()[p>>>2>>>0]=+(w!=D),I=(s=H=>H.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),B=s(B),D<w?(Pt(I,f,17),Pt(B,b,17)):(Pt(I,b,17),Pt(B,f,17))}var Dn=[],Ci=(s,p)=>{Dn.length=0;for(var f;f=r()[s++>>>0];){var b=f!=105;p+=(b&=f!=112)&&p%8?4:0,Dn.push(f==112?a()[p>>>2>>>0]:f==106?j[p>>>3]:f==105?i()[p>>>2>>>0]:d()[p>>>3>>>0]),p+=b?8:4}return Dn};function yp(s,p,f){return s>>>=0,p=Ci(p>>>0,f>>>0),wn[s](...p)}function _p(s,p,f){return s>>>=0,p=Ci(p>>>0,f>>>0),wn[s](...p)}var wp=()=>{},vp=()=>Date.now();function $p(s,p){return K(Ee(s>>>0,p>>>0))}var Ai,xp=()=>{throw _t+=1,"unwind"};function Sp(){return 4294901760}Ai=()=>performance.timeOrigin+performance.now();var Tp=()=>navigator.hardwareConcurrency;function Ip(){return dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Cp(s){s>>>=0;var p=r().length;if(s<=p||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var b=p*(1+.2/f);b=Math.min(b,s+100663296);var w=Math;b=Math.max(s,b);e:{w=(w.min.call(w,4294901760,b+(65536-b%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(w),be();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var cr=()=>(dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ot={},ki=s=>{s.forEach(p=>{var f=cr();f&&(Ot[f]=p)})};function Ap(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),ki(s),Ot.Pb=cr(),Ot.ec=s,Ot.Pb}function kp(s,p,f){if(s>>>=0,p>>>=0,Ot.Pb==s)var b=Ot.ec;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),ki(b);for(var w=3;b[w]&&cr()!=s;)++w;for(s=0;s<f&&b[s+w];++s)i()[p+4*s>>>2>>>0]=cr();return s}var Mn,Rn={},Ei=()=>{if(!Mn){var s,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:C||"./this.program"};for(s in Rn)Rn[s]===void 0?delete p[s]:p[s]=Rn[s];var f=[];for(s in p)f.push(`${s}=${p[s]}`);Mn=f}return Mn};function Pi(s,p){if(g)return xe(18,1,s,p);s>>>=0,p>>>=0;var f=0;return Ei().forEach((b,w)=>{var I=p+f;for(w=a()[s+4*w>>>2>>>0]=I,I=0;I<b.length;++I)t()[w++>>>0]=b.charCodeAt(I);t()[w>>>0]=0,f+=b.length+1}),0}function zi(s,p){if(g)return xe(19,1,s,p);s>>>=0,p>>>=0;var f=Ei();a()[s>>>2>>>0]=f.length;var b=0;return f.forEach(w=>b+=w.length+1),a()[p>>>2>>>0]=b,0}function Oi(s){return g?xe(20,1,s):52}function Bi(s,p,f,b){return g?xe(21,1,s,p,f,b):52}function Di(s,p,f,b){return g?xe(22,1,s,p,f,b):70}var Ep=[null,[],[]];function Mi(s,p,f,b){if(g)return xe(23,1,s,p,f,b);p>>>=0,f>>>=0,b>>>=0;for(var w=0,I=0;I<f;I++){var B=a()[p>>>2>>>0],D=a()[p+4>>>2>>>0];p+=8;for(var L=0;L<D;L++){var H=r()[B+L>>>0],Q=Ep[s];H===0||H===10?((s===1?q:K)(Qo(Q,0)),Q.length=0):Q.push(H)}w+=D}return a()[b>>>2>>>0]=w,0}var Ri=[31,29,31,30,31,30,31,31,30,31,30,31],Ui=[31,28,31,30,31,30,31,31,30,31,30,31],Pp=(s,p)=>{t().set(s,p>>>0)};function Ni(s,p,f,b){function w(z,le,Te){for(z=typeof z=="number"?z.toString():z||"";z.length<le;)z=Te[0]+z;return z}function I(z,le){return w(z,le,"0")}function B(z,le){function Te(Ji){return 0>Ji?-1:0<Ji?1:0}var vt;return(vt=Te(z.getFullYear()-le.getFullYear()))===0&&(vt=Te(z.getMonth()-le.getMonth()))===0&&(vt=Te(z.getDate()-le.getDate())),vt}function D(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function L(z){var le=z.Bb;for(z=new Date(new Date(z.Cb+1900,0,1).getTime());0<le;){var Te=z.getMonth(),vt=(zt(z.getFullYear())?Ri:Ui)[Te];if(!(le>vt-z.getDate())){z.setDate(z.getDate()+le);break}le-=vt-z.getDate()+1,z.setDate(1),11>Te?z.setMonth(Te+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Te=new Date(z.getFullYear()+1,0,4),le=D(new Date(z.getFullYear(),0,4)),Te=D(Te),0>=B(le,z)?0>=B(Te,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,p>>>=0,f>>>=0,b>>>=0;var H=a()[b+40>>>2>>>0];for(var Q in b={kc:i()[b>>>2>>>0],jc:i()[b+4>>>2>>>0],Hb:i()[b+8>>>2>>>0],Lb:i()[b+12>>>2>>>0],Ib:i()[b+16>>>2>>>0],Cb:i()[b+20>>>2>>>0],ub:i()[b+24>>>2>>>0],Bb:i()[b+28>>>2>>>0],sc:i()[b+32>>>2>>>0],ic:i()[b+36>>>2>>>0],lc:H?Ee(H):""},f=Ee(f),H={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(Q,"g"),H[Q]);var ce="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ge="January February March April May June July August September October November December".split(" ");for(Q in H={"%a":z=>ce[z.ub].substring(0,3),"%A":z=>ce[z.ub],"%b":z=>ge[z.Ib].substring(0,3),"%B":z=>ge[z.Ib],"%C":z=>I((z.Cb+1900)/100|0,2),"%d":z=>I(z.Lb,2),"%e":z=>w(z.Lb,2," "),"%g":z=>L(z).toString().substring(2),"%G":L,"%H":z=>I(z.Hb,2),"%I":z=>((z=z.Hb)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var le=0,Te=0;Te<=z.Ib-1;le+=(zt(z.Cb+1900)?Ri:Ui)[Te++]);return I(z.Lb+le,3)},"%m":z=>I(z.Ib+1,2),"%M":z=>I(z.jc,2),"%n":()=>`
`,"%p":z=>0<=z.Hb&&12>z.Hb?"AM":"PM","%S":z=>I(z.kc,2),"%t":()=>"	","%u":z=>z.ub||7,"%U":z=>I(Math.floor((z.Bb+7-z.ub)/7),2),"%V":z=>{var le=Math.floor((z.Bb+7-(z.ub+6)%7)/7);if(2>=(z.ub+371-z.Bb-2)%7&&le++,le)le==53&&((Te=(z.ub+371-z.Bb)%7)==4||Te==3&&zt(z.Cb)||(le=1));else{le=52;var Te=(z.ub+7-z.Bb-1)%7;(Te==4||Te==5&&zt(z.Cb%400-1))&&le++}return I(le,2)},"%w":z=>z.ub,"%W":z=>I(Math.floor((z.Bb+7-(z.ub+6)%7)/7),2),"%y":z=>(z.Cb+1900).toString().substring(2),"%Y":z=>z.Cb+1900,"%z":z=>{var le=0<=(z=z.ic);return z=Math.abs(z)/60,(le?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.lc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),H)f.includes(Q)&&(f=f.replace(new RegExp(Q,"g"),H[Q](b)));return Q=function(z){var le=Array(Tn(z)+1);return ei(z,le,0,le.length),le}(f=f.replace(/\0\0/g,"%")),Q.length>p?0:(Pp(Q,s),Q.length-1)}function zp(s,p,f,b){return Ni(s>>>0,p>>>0,f>>>0,b>>>0)}g||function(){for(var s=u.numThreads-1;s--;)jo();Ke.unshift(()=>{Gt++,function(p){g?p():Promise.all(ct.map(qo)).then(p)}(()=>Do())})}();for(var Vi=Array(256),pr=0;256>pr;++pr)Vi[pr]=String.fromCharCode(pr);pi=Vi,pt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>st.length/2-5-An.length;var Op=[xn,Lo,Ko,Xo,Jo,ti,ri,ni,oi,ii,ai,si,ui,li,di,ci,Ti,Ii,Pi,zi,Oi,Bi,Di,Mi],Z=function(){function s(f,b){return Z=f.exports,Z=function(){var w=Z,I={};for(let[B,D]of Object.entries(w))I[B]=typeof D=="function"?(...L)=>{ur.push(B);try{return D(...L)}finally{_e||(ur.pop(),Qe&&ft===1&&ur.length===0&&(ft=0,_t+=1,sr(Yi),typeof Fibers<"u"&&Fibers.tc()))}}:D;return I}(),Z=function(){var w=Z,I=D=>L=>D(L)>>>0,B=D=>()=>D()>>>0;return(w=Object.assign({},w)).Ca=I(w.Ca),w.fb=B(w.fb),w.hb=I(w.hb),w.emscripten_main_runtime_thread_id=B(w.emscripten_main_runtime_thread_id),w.sb=I(w.sb),w.tb=B(w.tb),w}(),Go.push(Z.ib),Lt.unshift(Z.Ba),X=b,Do(),Z}var p=Vo();if(Gt++,u.instantiateWasm)try{return u.instantiateWasm(p,s)}catch(f){K(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return _n||=u.locateFile?Mo("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,b){var w=_n;return O||typeof WebAssembly.instantiateStreaming!="function"||Mo(w)||Ro(w)||typeof fetch!="function"?No(w,f,b):fetch(w,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(b,function(B){return K(`wasm streaming compile failed: ${B}`),K("falling back to ArrayBuffer instantiation"),No(w,f,b)}))}(p,function(f){s(f.instance,f.module)}).catch(m),{}}(),Wi=s=>(Wi=Z.Ca)(s),Li=()=>(Li=Z.Da)();u._OrtInit=(s,p)=>(u._OrtInit=Z.Ea)(s,p),u._OrtGetLastError=(s,p)=>(u._OrtGetLastError=Z.Fa)(s,p),u._OrtCreateSessionOptions=(s,p,f,b,w,I,B,D,L,H)=>(u._OrtCreateSessionOptions=Z.Ga)(s,p,f,b,w,I,B,D,L,H),u._OrtAppendExecutionProvider=(s,p)=>(u._OrtAppendExecutionProvider=Z.Ha)(s,p),u._OrtAddFreeDimensionOverride=(s,p,f)=>(u._OrtAddFreeDimensionOverride=Z.Ia)(s,p,f),u._OrtAddSessionConfigEntry=(s,p,f)=>(u._OrtAddSessionConfigEntry=Z.Ja)(s,p,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=Z.Ka)(s),u._OrtCreateSession=(s,p,f)=>(u._OrtCreateSession=Z.La)(s,p,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=Z.Ma)(s),u._OrtGetInputOutputCount=(s,p,f)=>(u._OrtGetInputOutputCount=Z.Na)(s,p,f),u._OrtGetInputName=(s,p)=>(u._OrtGetInputName=Z.Oa)(s,p),u._OrtGetOutputName=(s,p)=>(u._OrtGetOutputName=Z.Pa)(s,p),u._OrtFree=s=>(u._OrtFree=Z.Qa)(s),u._OrtCreateTensor=(s,p,f,b,w,I)=>(u._OrtCreateTensor=Z.Ra)(s,p,f,b,w,I),u._OrtGetTensorData=(s,p,f,b,w)=>(u._OrtGetTensorData=Z.Sa)(s,p,f,b,w),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=Z.Ta)(s),u._OrtCreateRunOptions=(s,p,f,b)=>(u._OrtCreateRunOptions=Z.Ua)(s,p,f,b),u._OrtAddRunConfigEntry=(s,p,f)=>(u._OrtAddRunConfigEntry=Z.Va)(s,p,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=Z.Wa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=Z.Xa)(s),u._OrtBindInput=(s,p,f)=>(u._OrtBindInput=Z.Ya)(s,p,f),u._OrtBindOutput=(s,p,f,b)=>(u._OrtBindOutput=Z.Za)(s,p,f,b),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=Z._a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=Z.$a)(s),u._OrtRunWithBinding=(s,p,f,b,w)=>(u._OrtRunWithBinding=Z.ab)(s,p,f,b,w),u._OrtRun=(s,p,f,b,w,I,B,D)=>(u._OrtRun=Z.bb)(s,p,f,b,w,I,B,D),u._OrtEndProfiling=s=>(u._OrtEndProfiling=Z.cb)(s),u._JsepOutput=(s,p,f)=>(u._JsepOutput=Z.db)(s,p,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=Z.eb)(s);var mr,Bt=()=>(Bt=Z.fb)(),Xe=u._free=s=>(Xe=u._free=Z.gb)(s),fr=u._malloc=s=>(fr=u._malloc=Z.hb)(s),Un=(s,p,f,b,w,I)=>(Un=Z.kb)(s,p,f,b,w,I),Gi=()=>(Gi=Z.lb)(),Hi=(s,p,f,b,w)=>(Hi=Z.mb)(s,p,f,b,w),Nn=s=>(Nn=Z.nb)(s),hr=s=>(hr=Z.ob)(s),Fi=()=>(Fi=Z.pb)(),qi=(s,p)=>(qi=Z.qb)(s,p),gr=s=>(gr=Z.rb)(s),Vn=s=>(Vn=Z.sb)(s),Wn=()=>(Wn=Z.tb)(),ji=u.dynCall_ii=(s,p)=>(ji=u.dynCall_ii=Z.vb)(s,p),Ki=s=>(Ki=Z.wb)(s),Yi=()=>(Yi=Z.xb)(),Zi=s=>(Zi=Z.yb)(s),Qi=()=>(Qi=Z.zb)();function Xi(){0<Gt||(g?(c(u),g||ir(Lt),startWorker(u)):(ir(Ke),0<Gt||mr||(mr=!0,u.calledRun=!0,_e||(g||ir(Lt),c(u),g||ir(bn)))))}return u.___start_em_js=826946,u.___stop_em_js=827192,u.stackSave=()=>Wn(),u.stackRestore=s=>gr(s),u.stackAlloc=s=>Vn(s),u.setValue=function(s,p,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":t()[s>>>0]=p;break;case"i16":n()[s>>>1>>>0]=p;break;case"i32":i()[s>>>2>>>0]=p;break;case"i64":j[s>>>3]=BigInt(p);break;case"float":l()[s>>>2>>>0]=p;break;case"double":d()[s>>>3>>>0]=p;break;case"*":a()[s>>>2>>>0]=p;break;default:dt(`invalid type for setValue: ${f}`)}},u.getValue=function(s,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return t()[s>>>0];case"i16":return n()[s>>>1>>>0];case"i32":return i()[s>>>2>>>0];case"i64":return j[s>>>3];case"float":return l()[s>>>2>>>0];case"double":return d()[s>>>3>>>0];case"*":return a()[s>>>2>>>0];default:dt(`invalid type for getValue: ${p}`)}},u.UTF8ToString=Ee,u.stringToUTF8=Pt,u.lengthBytesUTF8=Tn,Ht=function s(){mr||Xi(),mr||(Ht=s)},Xi(),u.PTR_SIZE=4,h}),Gp=Ba;globalThis.self?.name==="em-pthread"&&Ba()});var Dt,Hp,Fp,qp,Ra,Ua,jp,Na,jt=R(()=>{"use strict";Ir();Dt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Hp=!1||typeof location>"u"?void 0:location.origin,Fp=(e,t)=>{try{let r=t??Dt;return(r?new URL(e,r):new URL(e)).origin===Hp}catch{return!1}},qp=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Ra=(Oa(),br(za)).default,Ua=async()=>{if(!Dt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Fp(Dt))return[void 0,Ra()];let e=await qp(Dt);return[e,Ra(e)]},jp=(Ma(),br(Da)).default,Na=async(e,t,r)=>[void 0,jp]});var Zn,Qn,Dr,Va,Kp,Yp,Cr,Ie,ht=R(()=>{"use strict";jt();Qn=!1,Dr=!1,Va=!1,Kp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Yp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Cr=async e=>{if(Qn)return Promise.resolve();if(Dr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Va)throw new Error("previous call to 'initializeWebAssembly()' failed.");Dr=!0;let t=e.initTimeout,r=e.numThreads;if(!Yp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Kp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,l=a?.href??a,d=o?.wasm,c=d?.href??d,m=e.wasmBinary,[u,h]=await Na(l,i,r>1),_=!1,y=[];if(t>0&&y.push(new Promise(g=>{setTimeout(()=>{_=!0,g()},t)})),y.push(new Promise((g,x)=>{let $={numThreads:r};m?$.wasmBinary=m:(c||i)&&($.locateFile=(v,S)=>c??(i??S)+v),h($).then(v=>{Dr=!1,Qn=!0,Zn=v,g(),u&&URL.revokeObjectURL(u)},v=>{Dr=!1,Va=!0,x(v)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(Qn&&Zn)return Zn;throw new Error("WebAssembly is not initialized yet.")}});var Ce,Yt,pe,Mr=R(()=>{"use strict";ht();Ce=(e,t)=>{let r=Ie(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Yt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Yt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},pe=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),l=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}});var Wa,La=R(()=>{"use strict";ht();Mr();Wa=e=>{let t=Ie(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ce(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&pe("Can't create run options."),e?.extra!==void 0&&Yt(e.extra,"",new WeakSet,(a,l)=>{let d=Ce(a,n),c=Ce(l,n);t._OrtAddRunConfigEntry(r,d,c)!==0&&pe(`Can't set a run config entry: ${a} - ${l}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Zp,Qp,Xp,Jp,Ga,Ha=R(()=>{"use strict";ht();Mr();Zp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Qp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Xp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Jp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let l=n?.deviceType;if(l){let d=Ce("deviceType",r),c=Ce(l,r);Ie()._OrtAddSessionConfigEntry(e,d,c)!==0&&pe(`Can't set a session config entry: 'deviceType' - ${l}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let l=Ce("preferredLayout",r),d=Ce(a.preferredLayout,r);Ie()._OrtAddSessionConfigEntry(e,l,d)!==0&&pe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ce(o,r);Ie()._OrtAppendExecutionProvider(e,i)!==0&&pe(`Can't append execution provider: ${o}.`)}},Ga=e=>{let t=Ie(),r=0,n=[],o=e||{};Xp(o);try{let i=Zp(o.graphOptimizationLevel??"all"),a=Qp(o.executionMode??"sequential"),l=typeof o.logId=="string"?Ce(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?Ce(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,l,d,c,m),r===0&&pe("Can't create session options."),o.executionProviders&&Jp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=Ce("enableGraphCapture",n),h=Ce(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&pe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let _=Ce(u,n);t._OrtAddFreeDimensionOverride(r,_,h)!==0&&pe(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Yt(o.extra,"",new WeakSet,(u,h)=>{let _=Ce(u,n),y=Ce(h,n);t._OrtAddSessionConfigEntry(r,_,y)!==0&&pe(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Zt,gt,Tt,Rr,Qt,Ur,Nr,Xn,te=R(()=>{"use strict";Zt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Qt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Xn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Xt,Jn=R(()=>{"use strict";Ir();Xt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Gn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Gn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(l){if(l instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let a=0;for(;;){let{done:l,value:d}=await o.read();if(l)break;let c=d.byteLength;new Uint8Array(i,a,c).set(d),a+=c}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var em,tm,Fa,qa,Vr,rm,ue,Je=R(()=>{"use strict";te();em=["V","I","W","E","F"],tm=(e,t)=>{console.log(`[${em[e]},${new Date().toISOString()}]${t}`)},Vr=(e,t)=>{Fa=e,qa=t},rm=(e,t)=>{let r=Qt(e),n=Qt(Fa);r>=n&&tm(r,typeof t=="function"?t():t)},ue=(...e)=>{qa&&rm(...e)}});var Wr,eo=R(()=>{"use strict";te();Wr=(e,t)=>new(Rr(t))(e)});var Lr=R(()=>{"use strict"});var ja,to,ro,nm,om,Ka,oo,no,Za,Qa=R(()=>{"use strict";Je();Lr();ja=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),to=[],ro=e=>Math.ceil(Number(e)/16)*16,nm=e=>{for(let t=0;t<to.length;t++){let r=to[t];if(e<=r)return r}return Math.ceil(e/16)*16},om=1,Ka=()=>om++,oo=async(e,t,r,n)=>{let o=ro(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},no=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of ja)to.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=ro(i),l=this.storageCache.get(t);if(!l)throw new Error("gpu data for uploading does not exist");if(Number(l.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${l.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=d.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,o,i)),d.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(d,0,l.gpuData.buffer,0,a),this.backend.device.queue.submit([m.finish()]),d.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=ro(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ka();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=nm(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let l={id:Ka(),type:0,buffer:o};return this.storageCache.set(l.id,{gpuData:l,originalSize:Number(t)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${l.id}`),l}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await oo(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=ja.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Za=(...e)=>new no(...e)});var io,J,Se=R(()=>{"use strict";io=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new io(e)});var ao,et,k,It,Gr,Xa,Ja,oe=R(()=>{"use strict";ao=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),l=new Array(a);if(n){if(o<2||i<2)return;let d=ao.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[l[a-2],l[a-1]]=d}for(let d=n?3:1;d<=a;d++){let c=o-d<0?1:t[o-d],m=i-d<0?1:r[i-d];if(c!==m&&c>1&&m>1)return;let u=Math.max(c,m);if(c&&m)l[a-d]=Math.max(c,m);else{if(u>1)return;l[a-d]=0}}return l}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},It=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=n.length?n.push(r[l+2]):n[l]=r[l+2];for(let l=0;l<n.length;l++)if(l<o.length){if(o[l]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let l=0;l<n.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<n.length*2;l++)if(l<a.length){if(a[l]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let l=0;l<n.length;l++){if(n[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[l]>=n[l]||a[l+n.length]>=n[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,n,o,i,a,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,l),d}static computeConvOutputShape(t,r,n,o,i,a,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,l),d}static computeShapeHelper(t,r,n,o,i,a,l,d){if(t)for(let c=0;c<r.length-2;c++)n.push(1);else for(let c=0;c<r.length-2;c++)n.push(e.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],l,c,c+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,l,d){let c=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[l]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(u+1)/2:u/2),i[l]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[l]-c)/r+1)}},Gr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,l,d;r?(a=t[1],l=t[0]):(a=t[0],l=t[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==l)throw new Error("dimension mismatch");if(a<=0||d<=0||l<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,l]}},Xa=-34028234663852886e22,Ja=34028234663852886e22});var Ct,uo,ye,Ae,N,me,lo,At,He,F,Hr,E,M,es,Fr,so,ts,ae=R(()=>{"use strict";te();oe();Ct=64,uo=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ye=(e,t=1)=>{let r=uo(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=uo(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},me=e=>e%4===0?4:e%2===0?2:1,lo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,At=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,He=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Hr=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,l=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=uo(t,o),m=typeof c=="string"?c:c[1],u=typeof c=="string"?c:c[0],h={indices:d,value:m,storage:u,tensor:t},_=V=>typeof V=="string"?V:`${V}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},g=i?"uniforms.":"",x=`${g}${e}_shape`,$=`${g}${e}_strides`,v="";for(let V=0;V<a-1;V++)v+=`
    let dim${V} = current / ${F($,V,a)};
    let rest${V} = current % ${F($,V,a)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;v+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=V=>(y.offsetToIndices=!0,a<2?V:`o2i_${e}(${V})`),C=[];if(a>=2)for(let V=a-1;V>=0;V--)C.push(`${F($,V,a)} * (indices[${V}])`);let A=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=V=>(y.indicesToOffset=!0,a<2?V:`i2o_${e}(${V})`),O=(...V)=>a===0?"0u":`${h.indices}(${V.map(_).join(",")})`,U=(V,j)=>a<2?`${V}`:`${F(V,j,a)}`,G=(V,j,he)=>a<2?`${V}=${he};`:`${F(V,j,a)}=${he};`,q={},K=(V,j)=>{y.broadcastedIndicesToOffset=!0;let he=`${j.name}broadcastedIndicesTo${e}Offset`;if(he in q)return`${he}(${V})`;let Ge=[];for(let _e=a-1;_e>=0;_e--){let be=j.indicesGet("outputIndices",_e+j.rank-a);Ge.push(`${U($,_e)} * (${be} % ${U(x,_e)})`)}return q[he]=`fn ${he}(outputIndices: ${j.type.indices}) -> u32 {
             return ${Ge.length>0?Ge.join("+"):"0u"};
           }`,`${he}(${V})`},W=(V,j)=>(()=>{if(h.storage===h.value)return`${e}[${V}]=${j};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${j}), select(0u, 0xFFFFFFFFu, ${j} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${j}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${j}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Y=V=>(()=>{if(h.storage===h.value)return`${e}[${V}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${V}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${V}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),se=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,X=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),j=l.map(he=>`d${he}`).join(", ");return`
  fn get_${e}(${V}) -> ${m} {
    return get_${e}ByIndices(${O(j)});
  }`})(),re=(...V)=>{if(V.length!==a)throw new Error(`indices length must be ${a}`);let j=V.map(_).join(",");return a===0?Y("0u"):a===1?Y(j[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${j})`)},ee=V=>a<2?Y(V):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${V})`),ne=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ve=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),j=l.map(he=>`d${he}`).join(", ");return`
  fn set_${e}(${V}, value: ${m}) {
    set_${e}ByIndices(${O(j)}, value);
  }`})();return{impl:()=>{let V=[],j=!1;return y.offsetToIndices&&(V.push(S),j=!0),y.indicesToOffset&&(V.push(A),j=!0),y.broadcastedIndicesToOffset&&(Object.values(q).forEach(he=>V.push(he)),j=!0),y.set&&(V.push(ve),j=!0),y.setByIndices&&(V.push(ne),j=!0),y.get&&(V.push(X),j=!0),y.getByIndices&&(V.push(se),j=!0),!i&&j&&V.unshift(`const ${x} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),V.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:K,indices:O,indicesGet:U,indicesSet:G,set:(...V)=>{if(V.length!==a+1)throw new Error(`indices length must be ${a}`);let j=V[a];if(typeof j!="string")throw new Error("value must be string");let he=V.slice(0,a).map(_).join(",");return a===0?W("0u",j):a===1?W(he[0],j):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${he}, ${j})`)},setByOffset:W,setByIndices:(V,j)=>a<2?W(V,j):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${j});`),get:re,getByOffset:Y,getByIndices:ee,usage:n,name:e,strides:$,shape:x,rank:a}},E=(e,t,r,n=1)=>Hr(e,t,r,"input",n),M=(e,t,r,n=1)=>Hr(e,t,r,"output",n),es=(e,t,r)=>Hr(e,t,r,"atomicOutput",1),Fr=(e,t,r,n=1)=>Hr(e,t,r,"internal",n),so=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ct){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,l=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${a}) {
    ${l}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},ts=(e,t)=>new so(e,t)});var im,rs,am,sm,um,lm,ke,ns,os,ut=R(()=>{"use strict";te();oe();Se();ae();im=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},rs=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,am=(e,t)=>k.sortBasedOnPerm(e,rs(e.length,t)),sm=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=r.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},um=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},lm=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},ke=(e,t)=>{let r=e.dataType,n=e.dims.length,o=rs(n,t),i=am(e.dims,o),a=e.dims,l=i,d=lm(o,e.dims),c;if(d)return c=g=>{let x=E("input",r,a,4),$=M("output",r,l,4);return`
  ${g.registerUniform("output_size","u32").declareVariables(x,$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:c};let{newShape:m,newPerm:u}=um(e.dims,o),h=k.areEqual(u,[2,3,1]),_=k.areEqual(u,[3,1,2]);if(m.length===2||h||_){a=h?[m[0],m[1]*m[2]]:_?[m[0]*m[1],m[2]]:m,l=[a[1],a[0]];let g=16;return c=x=>{let $=E("a",r,a.length),v=M("output",r,l.length);return`
  ${x.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${g+1}>, ${g}>;
  ${x.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/g),y:Math.ceil(l[0]/g)},programUniforms:[{type:12,data:x},...N(a,l)]}},getShaderSource:c}}return c=g=>{let x=E("a",r,a.length),$=M("output",r,l.length);return`
  ${g.registerUniform("output_size","u32").declareVariables(x,$)}

  ${sm(o,n,x,$)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...N(a,l)]}},getShaderSource:c}},ns=(e,t)=>{im(e.inputs),e.compute(ke(e.inputs[0],t.perm))},os=e=>J({perm:e.perm})});var dm,cm,pm,mm,fm,hm,gm,bm,ym,_m,tt,is,as,ss,us,ls,ds,cs,ps,ms,fs,hs=R(()=>{"use strict";te();oe();ae();qr();ut();dm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},cm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},pm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},mm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},fm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},hm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},gm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},bm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},ym=(e,t)=>{let r=[];if(!bm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},_m=(e,t,r,n,o,i,a)=>{let l=r[0].dims,d=k.size(i),c=k.size(a),m=E("_A",r[0].dataType,l),u=M("output",o,i),h=64;d===1&&(h=256);let _=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=g=>`
        ${g.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${g.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${pm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${dm[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${cm[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${mm[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:co(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((_,y)=>y));let a=k.normalizeAxes(i,e.inputs[0].dims.length),l=a,d=e.inputs[0],c=ym(l,e.inputs[0].dims.length);c.length>0&&(d=e.compute(ke(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],l=fm(l.length,d.dims.length));let[m,u]=hm(d.dims,l),h=m;o.keepDims&&(h=gm(m,a)),e.compute(_m(t,o.cacheKey,[d],n,e.inputs[0].dataType,h,u),{inputs:[d]})},is=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},as=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},ss=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},us=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},ls=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},ds=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},cs=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},ps=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},ms=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},fs=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,wm,jr,co,nt,vm,$m,xm,Sm,Tm,Im,Cm,Am,km,Em,ot,gs,bs,ys,_s,ws,vs,$s,xs,Ss,Ts,qr=R(()=>{"use strict";te();oe();Se();ae();hs();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},wm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],jr=(e,t,r,n,o,i,a=!1,l=!1)=>{let d=[],c=r[0].dims,m=c.length,u=k.normalizeAxes(o,m),h=!l&&u.length===0;c.forEach((x,$)=>{h||u.indexOf($)>=0?a&&d.push(1):d.push(x)});let _=d.length,y=k.size(d);return{name:e,shaderCache:t,getShaderSource:x=>{let $=[],v=E("_A",r[0].dataType,m),S=M("output",i,_),T=n(v,S,u),C=T[2];for(let A=0,P=0;A<m;A++)h||u.indexOf(A)>=0?(a&&P++,C=`for(var j${A}: u32 = 0; j${A} < ${c[A]}; j${A}++) {
                  ${T[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):($.push(`${v.indicesSet("input_indices",A,S.indicesGet("output_indices",P))};`),P++);return`

        ${x.registerUniform("output_size","u32").declareVariables(v,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...N(c,d)]})}},co=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:co(o,r);e.compute(jr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?wm:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},vm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},$m=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},xm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Sm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Tm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",l,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Im=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&(a*=e.inputs[0].dims[l]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Cm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Am=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},km=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Em=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},gs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Im(e,t):is(e,t)},bs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$m(e,t):as(e,t)},ys=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xm(e,t):ss(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sm(e,t):us(e,t)},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tm(e,t):ls(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cm(e,t):ds(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Am(e,t):cs(e,t)},xs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?km(e,t):ps(e,t)},Ss=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Em(e,t):ms(e,t)},Ts=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vm(e,t):fs(e,t)}});var Is,Cs,As,po,ks=R(()=>{"use strict";te();Se();qr();Is=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Cs=(e,t)=>{Is(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},As=(e,t)=>{Is(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},po=e=>J(e)});var Pm,mo,zm,Om,Bm,Rt,Dm,Es,Kr=R(()=>{"use strict";te();oe();Lr();ae();Pm=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],l=e[5];if(a&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,_=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=c;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(a){if(h!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=a.dims[3])}let x=y+g,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[2]!==c||l.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:y,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:_,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},mo=(e,t,r)=>t&&e?`
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
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,zm=(e,t,r,n,o,i,a,l)=>{let d=me(a?1:i),c=64,m=i/d;m<c&&(c=32);let u=Math.ceil(i/d/c),h=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:u}],_=ye(e.dataType,d),y=Ae(1,d),g=["type"];a&&g.push("type"),l&&g.push("type");let x=$=>{let v=M("x",e.dataType,e.dims,d),S=[v],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&S.push(T);let C=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;C&&S.push(C);let A=Ae(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(P).declareVariables(...S)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${mo(T,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${_};${d}`,inputDependencies:g},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/c),y:o,z:t*r},programUniforms:h})}},Om=(e,t,r,n,o,i,a,l,d)=>{let c=a+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,c],u=e>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=u?[i.batchSize,h,c,i.headSize]:void 0,y=i.nReps?i.nReps:1,g=i.scale===0?1/Math.sqrt(i.headSize):i.scale,x=me(i.headSize),$=i.headSize/x,v=12,S={x:Math.ceil(c/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:g},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],C=u&&n&&k.size(n.dims)>0,A=["type","type"];C&&A.push("type"),o&&A.push("type"),l&&A.push("type"),d&&A.push("type");let P=[{dims:m,dataType:t.dataType,gpuDataType:0}];u&&P.push({dims:_,dataType:t.dataType,gpuDataType:0});let O=U=>{let G=E("q",t.dataType,t.dims,x),q=E("key",r.dataType,r.dims,x),K=[G,q];if(C){let ne=E("past_key",n.dataType,n.dims,x);K.push(ne)}o&&K.push(E("attention_bias",o.dataType,o.dims));let W=l?E("seq_lens",l.dataType,l.dims):void 0;W&&K.push(W);let Y=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;Y&&K.push(Y);let se=M("output",t.dataType,m),X=[se];u&&X.push(M("present_key",t.dataType,_,x));let re=Ae(1,x),ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${G.type.storage}, ${v*v}>;
  ${U.registerUniforms(ee).declareVariables(...K,...X)}
  ${U.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${mo(W,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&u?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${u?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${re}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>C&&u?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${u?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${re}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${n!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:P,dispatchGroup:S,programUniforms:T}),getShaderSource:O}},Bm=(e,t,r,n,o,i,a=void 0,l=void 0)=>{let d=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,m=o.vHiddenSize*c,u=e>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=u?[o.batchSize,h,d,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,m],g=12,x={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],v=u&&n&&k.size(n.dims)>0,S=["type","type"];v&&S.push("type"),a&&S.push("type"),l&&S.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];u&&T.push({dims:_,dataType:t.dataType,gpuDataType:0});let C=A=>{let P=E("probs",t.dataType,t.dims),O=E("v",r.dataType,r.dims),U=[P,O];v&&U.push(E("past_value",n.dataType,n.dims));let G=a?E("seq_lens",a.dataType,a.dims):void 0;a&&U.push(G);let q=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;l&&U.push(q);let W=[M("output",t.dataType,y)];u&&W.push(M("present_value",t.dataType,_));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${P.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${P.type.value}, ${g*g}>;
  ${A.registerUniforms(Y).declareVariables(...U,...W)}
  ${A.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${mo(G,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&u?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${u?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${P.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>v&&u?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${u?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:$}),getShaderSource:C}},Rt=(e,t,r,n,o,i,a,l,d,c,m=void 0,u=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(l?1:0)),_=h>1?c.pastSequenceLength:0,y=_+c.kvSequenceLength,g=d&&k.size(d.dims)>0?d:void 0,x=[t,r];h>1&&a&&k.size(a.dims)>0&&x.push(a),g&&x.push(g),m&&x.push(m),u&&x.push(u);let $=e.compute(Om(h,t,r,a,g,c,_,m,u),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];e.compute(zm($,c.batchSize,c.numHeads,_,c.sequenceLength,y,m,u),{inputs:m&&u?[$,m,u]:[$],outputs:[]});let v=[$,n];h>1&&l&&k.size(l.dims)>0&&v.push(l),m&&v.push(m),u&&v.push(u),e.compute(Bm(h,$,n,l,c,_,m,u),{inputs:v,outputs:h>1?[0,2]:[0]})},Dm=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,l={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=M("output_q",d[0].dataType,r),_=M("output_k",d[0].dataType,r),y=M("output_v",d[0].dataType,r),g=E("input",d[0].dataType,d[0].dims),x=E("weight",d[1].dataType,d[1].dims),$=E("bias",d[2].dataType,d[2].dims),v=g.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(S).declareVariables(g,x,$,h,_,y)}
  ${u.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:c}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},Es=(e,t)=>{let r=Pm(e.inputs,t),[n,o,i]=Dm(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Mm,Rm,Um,Ps,zs=R(()=>{"use strict";We();te();oe();Se();ae();Mm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((l,d)=>{if(l!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Rm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?me(i[i.length-1]):1,l=o==="NHWC"&&i.length>1?a:1,d=k.size(i)/a,c=n,m=c?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,l),_=E("bias",e[2].dataType,e[2].dims,l),y=E("inputMean",e[3].dataType,e[3].dims,l),g=E("inputVar",e[4].dataType,e[4].dims,l),x=M("y",e[0].dataType,m,a),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,h,_,y,g,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...N(i)]:[{type:12,data:d}]})}},Um=e=>J(e),Ps=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Um({...t,outputCount:n});if(we.webgpu.validateInputContent&&Mm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Rm(r,o))}});var Nm,Vm,Os,Bs=R(()=>{"use strict";oe();ae();Nm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vm=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),l=E("residual",o,t,4),d=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,l,d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Os=e=>{Nm(e.inputs),e.compute(Vm(e.inputs))}});var Wm,fe,Ds,Ms,Rs,Us,Ns,Vs,Ws,Ls,Gs,Lm,Hs,Fs,qs,js,Jt,Ks,Yr,Ys,Zs,Qs,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,lu,du,cu,pu,fo,ho,mu,fu,hu,Gm,Hm,gu,Zr=R(()=>{"use strict";te();oe();Se();ae();Wm=(e,t,r,n,o,i,a)=>{let l=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=E("inputData",r,[l],4),m=M("outputData",n,[l],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(c,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},fe=(e,t,r,n,o,i=e.dataType,a,l)=>{let d=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>Wm(c,k.size(e.dims),e.dataType,i,r,n,l),getRunData:c=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(c[0].dims)/64/4)},programUniforms:d})}},Ds=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Ms=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},Rs=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Us=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Ns=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Vs=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},Ws=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},Ls=e=>J(e),Gs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Lm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:t,max:r})},Hs=(e,t)=>{let r=t||Lm(e.inputs),n=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Fs=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},qs=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},js=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},Jt=e=>J(e),Ks=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Yr=(e="f32")=>`
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
}`,Ys=e=>{let t=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Yr(t)))},Zs=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},Qs=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},Xs=e=>{let t=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Yr(t)))},Js=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},eu=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},tu=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},ru=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},nu=e=>{let t=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ou=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},iu=e=>J(e),au=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},su=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},uu=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},lu=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},du=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},cu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,pu=e=>{e.compute(fe(e.inputs[0],"Tanh",cu))},fo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${cu("v")};
}
`,ho=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,mu=e=>{let t=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",ho,fo(t),void 0,e.inputs[0].dataType))},fu=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},hu=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Gm=(e,t)=>`
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
`,Hm=e=>`quick_gelu_impl(${e})`,gu=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Hm,Gm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Fm,qm,yu,_u=R(()=>{"use strict";oe();ae();Zr();Fm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},qm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=k.size(t)/4,a=ye(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Yr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},yu=e=>{Fm(e.inputs),e.compute(qm(e.inputs))}});var jm,Km,it,wu,vu,$u,xu,Su,Tu,Iu,Cu,Au,ku,Eu=R(()=>{"use strict";te();oe();ae();jm=(e,t,r,n,o,i,a,l,d,c,m,u)=>{let h,_;typeof l=="string"?h=_=(v,S)=>`${l}((${v}),(${S}))`:typeof l=="function"?h=_=l:(h=l.scalar,_=l.vector);let y=M("outputData",m,n.length,4),g=E("aData",d,t.length,4),x=E("bData",c,r.length,4),$;if(o)if(i){let v=k.size(t)===1,S=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;v||S?$=y.setByOffset("global_idx",_(v?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(a||T?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(g.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,T,C="")=>{let A=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${g.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${C}(${h(A,P)});
          `};m===9?$=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(g,x,y)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Km=(e,t,r,n,o,i,a=r.dataType)=>{let l=r.dims.map(g=>Number(g)??1),d=n.dims.map(g=>Number(g)??1),c=!k.areEqual(l,d),m=l,u=k.size(l),h=!1,_=!1,y=[c];if(c){let g=et.calcShape(l,d,!1);if(!g)throw new Error("Can't perform binary op on the given tensors");m=g.slice(),u=k.size(m);let x=k.size(l)===1,$=k.size(d)===1,v=l.length>0&&l[l.length-1]%4===0,S=d.length>0&&d[d.length-1]%4===0;y.push(x),y.push($),y.push(v),y.push(S);let T=1;for(let C=1;C<m.length;C++){let A=l[l.length-C],P=d[d.length-C];if(A===P)T*=A;else break}T%4===0?(_=!0,h=!0):(x||$||v||S)&&(h=!0)}else h=!0;return y.push(h),{name:e,shaderCache:{hint:t+y.map(g=>g.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:g=>jm(g,l,d,m,h,c,_,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:m,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(m)/4)},...N(l,d,m)]})}},it=(e,t,r,n,o,i)=>{e.compute(Km(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},wu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},vu=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},$u=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},xu=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},Su=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Tu=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},Iu=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Cu=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Au=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},ku=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Zm,Qm,Xm,Jm,Pu,zu,Ou=R(()=>{"use strict";te();oe();Se();ae();Zm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,l)=>{if(l!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,c)=>{if(c!==t&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},Qm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Xm=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Jm=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),l=0,d=[],c=[],m=[{type:12,data:o}];for(let g=0;g<e.length;++g)l+=e[g].dims[t],i[g]=l,c.push(e[g].dims.length),a[g]=E(`input${g}`,n,c[g]),d.push("rank"),m.push({type:12,data:i[g]});for(let g=0;g<e.length;++g)m.push(...N(e[g].dims));m.push(...N(r));let u=M("output",n,r.length),h=u.indicesGet("indices",t),_=Array.from(Array(i.length).keys()).map(g=>`uniforms.sizeInConcatAxis${g}`).join(","),y=g=>`

  ${(()=>{g.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)g.registerUniform(`sizeInConcatAxis${x}`,"u32");return g.declareVariables(...a,u)})()}

  ${Qm(i.length,_)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Xm(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:y}},Pu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Zm(r,o);let i=n.slice();i[o]=r.reduce((l,d)=>l+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(l=>k.size(l.dims)>0);e.compute(Jm(a,o,i,r[0].dataType),{inputs:a})},zu=e=>J({axis:e.axis})});var Fe,qe,je,Qr,bt=R(()=>{"use strict";te();oe();Fe=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},je=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Qr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Xa,Ja];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Pe,Bu,Xr=R(()=>{"use strict";Pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Bu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Du,Mu=R(()=>{"use strict";Du=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var er,Jr,en=R(()=>{"use strict";te();oe();ae();bt();er=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,l)=>`
      if (${F(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,F(o,l+i,n))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},Jr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a[a.length-2],c=l[l.length-1],m=a[a.length-1],u=me(c),h=me(m),_=me(d),y=k.size(r)/u/_,g=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(x),d,c],S=[{type:12,data:y},{type:12,data:d},{type:12,data:c},{type:12,data:m}];qe(t,S),S.push(...N(x,a,l)),g&&S.push(...N(e[2].dims)),S.push(...N(v));let T=C=>{let A=Fr("batch_dims",e[0].dataType,x.length),P=E("a",e[0].dataType,a.length,h),O=E("b",e[1].dataType,l.length,u),U=M("output",e[0].dataType,v.length,u),G=ye(U.type.tensor),q=Fe(t,U.type.value,G),K=[P,O],W="";if(g){let X=o?u:1;K.push(E("bias",e[2].dataType,e[2].dims.length,X)),W=`${o?`value += bias[col / ${X}];`:`value += ${U.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];je(t,Y);let se=()=>{let X=`var a_data: ${P.type.value};`;for(let re=0;re<h;re++)X+=`
              let b_data${re} = b[(b_offset + (k + ${re}) * uniforms.N + col) / ${u}];`;for(let re=0;re<_;re++){X+=`a_data = a[(a_offset + (row + ${re}) * uniforms.K + k) / ${h}];`;for(let ee=0;ee<h;ee++)X+=`
            values[${re}] = fma(${O.type.value}(a_data${h===1?"":`[${ee}]`}), b_data${ee}, values[${re}]);
`}return X};return`
  ${C.registerUniforms(Y).registerInternalVariables(A).declareVariables(...K,U)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${er("a_indices",P,P.rank-2,A.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${er("b_indices",O,O.rank-2,A.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${U.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${se()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${W}
      ${q}
      let cur_indices = ${U.type.indices}(batch, row + i, col);
      let offset = ${U.indicesToOffset("cur_indices")};
      ${U.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${_};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:S}),getShaderSource:T}}});var ef,tf,go,Ru,rf,bo,nf,tr,tn=R(()=>{"use strict";te();oe();ae();bt();en();Xr();ef=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,tf=(e,t)=>e?`
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
        }`,go=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32)=>{let d=t[1]*e[1],c=t[0]*e[0],m=o?d:i,u=o?i:d,h=m/t[0],_=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${m/h}>, ${u}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
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
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${a?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ef(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
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
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${tf(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ru=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,rf=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",bo=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32,d=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],u=o?c:i,h=o?i:c;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let _=h/t[1],y=u/t[0],g=i/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Ru(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ru(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
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
      ${rf(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${u}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${m}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},nf=(e,t,r,n,o=!1)=>{let[i,a,l,d]=n,c=ye(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,c)} {
      var value = ${Pe(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${er("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,c)} {
      var value = ${Pe(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${er("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Pe(e,c)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Pe(e,c)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},tr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a.slice(0,-2),c=l.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],_=a[a.length-1],y=l[l.length-1],g=_%4===0&&y%4===0,x=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(y/$[0]/x[0]),Math.ceil(h/$[1]/x[1]),Math.ceil(u/$[2]/x[2])],S=g?4:1,T=[...d,h,_/S],C=T.length,A=[...c,_,y/S],P=A.length,O=[u,h,y/S],U=[{type:6,data:h},{type:6,data:y},{type:6,data:_}];qe(t,U),U.push(...N(m,T,A));let G=["rank","rank"],q=e.length>2;q&&(U.push(...N(e[2].dims)),G.push("rank")),U.push(...N(O));let K=W=>{let Y=m.length,se=Fr("batchDims",e[0].dataType,Y,1),X=ye(e[0].dataType),re=E("a",e[0].dataType,C,S),ee=E("b",e[1].dataType,P,S),ne=M("result",e[0].dataType,O.length,S),ve=[re,ee];if(q){let j=o?S:1;ve.push(E("bias",e[2].dataType,e[2].dims.length,j))}let Be=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];je(t,Be);let $e=ye(ne.type.tensor),de=Fe(t,ne.type.value,$e),V=nf(S,q,de,[se,re,ee,ne],o);return`
  ${W.registerUniforms(Be).registerInternalVariables(se).declareVariables(...ve,ne)}
  ${V}
  ${g?go(x,$,X,se):bo(x,$,X,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${g};${o}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:U}),getShaderSource:K}}});var of,Uu,Nu=R(()=>{"use strict";te();Je();ae();bt();Xr();Mu();tn();of=(e,t,r,n,o=!1,i,a=4,l=4,d=4,c="f32")=>{let m=G=>{switch(G){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},u=G=>{switch(G){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",g=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Pe(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${g}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Pe(a,c)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Pe(a,c)}(0.0);`,T=`${u(l)}`,C=Pe(d,c),A=e?Pe(a,c):Pe(l,c),P=e?Pe(l,c):Pe(a,c),O=Fe(i,C,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Bu(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Uu=(e,t,r,n,o,i,a,l,d)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],u=r[0],h=c?r[2]:r[3],_=c?r[1]:r[2],y=c?r[3]:r[1],g=c&&(m%4===0||m%3===0)&&y%4===0,x=c?y:h*_,$=c?h*_:y,v=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(u/v[2]/S[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let C=g?c&&m%4!==0?3:4:1,A=v[1]*S[1],P=v[0]*S[0],O=Math.max(v[0]*C,v[1]),U=n%A===0,G=o%P===0,q=i%O===0,K=g?[C,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qe(t,W),W.push(...N(e[0].dims,e[1].dims));let Y=["rank","rank"];a&&(W.push(...N(e[2].dims)),Y.push("rank")),W.push(...N(r));let se=X=>{let re=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];je(t,re);let ee=g?4:1,ne=ye(e[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${g?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,Be=E("x",e[0].dataType,e[0].dims.length,C===3?1:C),$e=E("w",e[1].dataType,e[1].dims.length,ee),de=[Be,$e],V=M("result",e[0].dataType,r.length,ee);if(a){let j=E("bias",e[2].dataType,e[2].dims.length,ee);de.push(j),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${ne}>`:ne} {
          return bias[coords.${c?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${Du("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(re).declareVariables(...de,V)}
        ${ve}
        ${of(c,U,G,q,a,t,K[0],K[1],K[2],ne)}
        ${g?go(S,v,ne,void 0,!c,O):bo(S,v,ne,void 0,!c,O,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${g};${U};${G};${q};${A};${P};${O}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:se}}});var af,Vu,rn,sf,Wu,uf,Lu,Gu,Hu=R(()=>{"use strict";te();Je();oe();ae();bt();Xr();af=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Vu=e=>typeof e=="number"?[e,e,e]:e,rn=(e,t)=>t<=1?e:e+(e-1)*(t-1),sf=(e,t,r,n=1)=>{let o=rn(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Wu=(e,t,r,n,o)=>{o==null&&(o=sf(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},uf=(e,t,r,n,o,i,a,l,d,c)=>{let m,u,h,_;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Wu([t,r,n,1],[l,d,c],1,[o,i,a],e);u=y[0],h=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((g,x,$)=>g===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Wu([t,r,n,1],[l,d,c],1,[o,i,a],e[0]);u=y[0],h=y[1],_=y[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),_=Math.ceil(n/a);let y=(u-1)*o+l-t,g=(h-1)*i+d-r,x=(_-1)*a+c-n,$=Math.floor(y/2),v=y-$,S=Math.floor(g/2),T=g-S,C=Math.floor(x/2),A=x-C;m={top:S,bottom:T,left:C,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:_}},Lu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let l,d,c,m,u;if(a==="channelsLast")[l,d,c,m,u]=e;else if(a==="channelsFirst")[l,u,d,c,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,_,y,g]=t,[x,$,v]=Vu(r),[S,T,C]=Vu(n),A=rn(_,S),P=rn(y,T),O=rn(g,C),{padInfo:U,outDepth:G,outHeight:q,outWidth:K}=uf(o,d,c,m,x,$,v,A,P,O),W=i?h*u:h,Y=[0,0,0,0,0];return a==="channelsFirst"?Y=[l,W,G,q,K]:a==="channelsLast"&&(Y=[l,G,q,K,W]),{batchSize:l,dataFormat:a,inDepth:d,inHeight:c,inWidth:m,inChannels:u,outDepth:G,outHeight:q,outWidth:K,outChannels:W,padInfo:U,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:y,filterWidth:g,effectiveFilterDepth:A,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:T,dilationWidth:C,inShape:e,outShape:Y,filterShape:t}},Gu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",l=a?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],m={x:r.map((v,S)=>S)},u=[Math.ceil(af(m.x.map(v=>r[v]))/c[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=d?a&&l%4!==0?3:4:1,_=k.size(r),y=[{type:12,data:_},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];qe(t,y),y.push(...N(e[0].dims,e[1].dims));let g=["rank","rank"],x=e.length===3;x&&(y.push(...N(e[2].dims)),g.push("rank")),y.push(...N(r));let $=v=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];je(t,S);let T=d?4:1,C=ye(e[0].dataType),A=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),O=[A,P],U=M("result",e[0].dataType,r.length,T),G="";if(x){let W=E("bias",e[2].dataType,e[2].dims.length,T);O.push(W),G+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${C}>`:C} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Pe(h,C),K=Fe(t,q,C);return`
            ${G}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(S).declareVariables(...O,U)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,A.rank)};
              let d2 = ${a?F("coords",A.rank-1,A.rank):F("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${a?F("coords",1,A.rank):F("coords",2,A.rank)},
              ${a?F("coords",2,A.rank):F("coords",3,A.rank)},
              ${a?F("coords",3,A.rank):F("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?F("uniforms.x_shape",1,A.rank):F("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${a?F("uniforms.x_shape",2,A.rank):F("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${a?F("uniforms.x_shape",3,A.rank):F("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${a?F("uniforms.x_shape",4,A.rank):F("uniforms.x_shape",1,A.rank)};
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
                      ${a?`let xValues = vec4<f32>(
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
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
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
                      ${a?`let xValues = vec3<f32>(
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${K}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${x}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:y}),getShaderSource:$}}});var Fu,qu,ju=R(()=>{"use strict";te();oe();ae();bt();Fu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,l=e[1].dims,d=t.format==="NHWC",c=d?r[3]:r[1],m=c/t.group,u=d&&m>=4?me(c):1,h=k.size(r)/u,_=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];qe(t,_),_.push(...N(a,[l[0],l[1],l[2],l[3]/u]));let y=o?["rank","rank","rank"]:["rank","rank"];_.push(...N([r[0],r[1],r[2],r[3]/u]));let g=x=>{let $=M("output",e[0].dataType,r.length,u),v=ye($.type.tensor),S=Fe(t,$.type.value,v),T=E("x",e[0].dataType,a.length),C=E("w",e[1].dataType,l.length,u),A=[T,C];o&&A.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];je(t,P);let O=d?`
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
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(P).declareVariables(...A,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:g}},qu=(e,t,r,n)=>{let o=e.length>2,i=me(r[3]),a=me(r[2]),l=k.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qe(t,u),u.push(...N(d,c,m));let h=(a-1)*t.strides[1]+c[1],_=y=>{let g=M("output",e[0].dataType,m.length,i),x=ye(g.type.tensor),$=Fe(t,g.type.value,x),v=E("x",e[0].dataType,d.length,i),S=E("w",e[1].dataType,c.length,i),T=[v,S];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let C=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return je(t,A),`
  ${y.registerUniforms(A).declareVariables(...T,g)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${g.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${C}
      ${$}
      ${g.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:_}}});var lf,yo,df,_o,wo,Ku,cf,pf,vo,Yu=R(()=>{"use strict";oe();Nu();Hu();tn();ju();bt();en();ut();lf=(e,t,r,n,o,i)=>{let a=e[0],l=e.slice(i?1:2,i?3:4),d=l.length,c=t[0],u=t.slice(2).map((y,g)=>y+(y-1)*(r[g]-1)),_=l.map((y,g)=>y+n[g]+n[g+d]).map((y,g)=>Math.floor((y-u[g]+o[g])/o[g]));return _.splice(0,0,a),_.splice(i?3:1,0,c),_},yo=[2,3,1,0],df=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},_o=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();It.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},wo=e=>{let t=Qr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,l=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:l,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Ku=(e,t,r,n)=>{let o=r.format==="NHWC",i=lf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(ke(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),A.push(O)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(qu(A,r,i,n),{inputs:A}):e.compute(Fu(A,r,i,n),{inputs:A});return}let a=t.length===3,l=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],_=i[o?2:3],y=i[o?3:1],g=o&&m===l&&u===d&&r.pads[0]===0&&r.pads[1]===0;if(g||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],P,O,U,G=[];if(o){let W=e.kernelCustomData.wT??e.compute(ke(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),g){let Y=l*d*c;P=t[0].reshape([1,A,Y]),O=W.reshape([1,Y,y]),U=[1,A,y]}else P=t[0].reshape([A,l*d,c]),O=W.reshape([1,c,y]),U=[A,h*_,y];G.push(P),G.push(O)}else P=t[0].reshape([A,c,l*d]),O=t[1].reshape([1,y,c]),U=[A,y,h*_],G.push(O),G.push(P);a&&G.push(t[2]);let q=U[2],K=G[0].dims[G[0].dims.length-1];q<8&&K<8?e.compute(Jr(G,r,i,U,o,n),{inputs:G}):e.compute(tr(G,r,i,U,o,n),{inputs:G});return}let x=!0,$=e.kernelCustomData.wT??e.compute(ke(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let S=o?h*_:y,T=o?y:h*_,C=m*u*c;e.compute(Uu(v,r,i,S,T,C,a,x,n),{inputs:v})},cf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=_o({...t,pads:o,strides:i,dilations:a,kernelShape:l},n);Ku(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},pf=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=_o(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Lu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Gu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},vo=(e,t)=>{if(df(e.inputs,t),e.inputs[0].dims.length===3)cf(e,t);else if(e.inputs[0].dims.length===5)pf(e,e.inputs,t);else{let r=_o(t,e.inputs);Ku(e,e.inputs,r)}}});var Zu,Qu=R(()=>{"use strict";te();Je();oe();ae();Zu=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,l=e[1].dims,d=l[2]/a,c=l[3],m=i?me(c):1,u=k.size(o)/m,h=[Math.ceil(u/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${h}`);let _=["rank","rank"],y=[t.strides[0],t.strides[1]],g=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],x=[t.dilations[0],t.dilations[1]],$=[g[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),g[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],v=[$[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),$[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],S=[{type:12,data:u},{type:12,data:y},{type:12,data:g},{type:12,data:x},{type:12,data:$},{type:6,data:v},{type:12,data:d},{type:12,data:c},...N(e[0].dims,e[1].dims)];n&&(S.push(...N(e[2].dims)),_.push("rank")),S.push(...N(o));let T=C=>{let A=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:y.length},{name:"filter_dims",type:"u32",length:g.length},{name:"dilations",type:"u32",length:g.length},{name:"effective_filter_dims",type:"u32",length:$.length},{name:"pads",type:"i32",length:v.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],P=ye(e[0].dataType),O=i?1:2,U=i?2:3,G=i?3:1,q=E("W",e[1].dataType,e[1].dims.length,m),K=E("Dy",e[0].dataType,e[0].dims.length),W=[K,q];n&&W.push(E("bias",e[2].dataType,[o[G]].length,m));let Y=M("result",e[0].dataType,o.length,m),se=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",G)};
            let r = ${Y.indicesGet("outputIndices",O)};
            let c = ${Y.indicesGet("outputIndices",U)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${P}(dyRCorner) + ${P}(wR)) / ${P}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${P}(uniforms.Dy_shape[${O}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);

              for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${P}(dyCCorner) + ${P}(wC)) / ${P}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${P}(uniforms.Dy_shape[${U}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                  let xValue = ${i?K.get("batch","idyR","idyC","inputChannel"):K.get("batch","inputChannel","idyR","idyC")};
                  let w_offset = ${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
                  let wValue = ${q.getByOffset(`w_offset / ${m}`)};
                  dotProd = dotProd + xValue * wValue;
                  inputChannel = inputChannel + 1;
                }
              }
            }
            let value = dotProd${n?` + bias[d1 / ${m}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${C.registerUniforms(A).declareVariables(...W,Y)}
      ${C.mainStart()}
      ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${se}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:h[0],y:h[1],z:h[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:T}}});var mf,ff,hf,Xu,Ju,gf,el,bf,tl,rl=R(()=>{"use strict";Qu();bt();ut();mf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,ff=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},hf=(e,t,r,n,o,i,a,l,d,c)=>{let m=e.length-2,u=c.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let h=e[0],_=t[l?3:1]*o;for(let y=0,g=e.length-m-(l?1:0);y<m;++y,++g){let x=e[g],$=u?x*a[y]:c[y],v=mf(x,a[y],i[y],t[g],r[y],$);ff(v,n,i,y,y+m),u&&c.push(a[y]*(x-1)+d[y]+(t[g]-1)*r[y]+1-i[y]-i[y+m])}c.splice(0,0,h),c.splice(l?3:1,0,_)},Xu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;d=new Array(u).fill(1)}let c=e.strides.slice();if(c.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;c=new Array(u).fill(1)}hf(l,r,d,e.autoPad,e.group,o,c,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:c}),m},Ju=e=>{let t=Qr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,l=e.pads,d=e.strides,c=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:l,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},gf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},el=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(ke(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Zu(i,r,n),{inputs:i})},bf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=Xu({...t,pads:l,strides:a,dilations:i,kernelShape:o},n);el(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},tl=(e,t)=>{if(gf(e.inputs,t),e.inputs[0].dims.length===3)bf(e,t);else{let r=Xu(t,e.inputs);el(e,e.inputs,r)}}});var yf,nl,ol,il=R(()=>{"use strict";te();oe();Se();ae();yf=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),l=M("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=k.normalizeAxis(d,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,_=F("uniforms.input_shape","uniforms.axis",i),y=n.reverse?h+(n.exclusive?" + 1":""):"0",g=n.reverse?_:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,l)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${g};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...N(t,t)]}),getShaderSource:m}},nl=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(yf(n,r,o,t),{inputs:[0]})},ol=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var _f,wf,vf,al,sl,ul=R(()=>{"use strict";te();oe();Se();ae();_f=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},wf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},vf=(e,t)=>{let r,n,o,i,a,l,d=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=m?[r,n,o,c,c,i/c**2]:[r,n,o,i/c**2,c,c],l=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,c,c,i/c**2,n,o]:[r,i/c**2,c,c,n,o],l=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,_=e.dataType,y=E("a",_,h),g=M("output",_,h),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,g)}

  ${wf(l,h,y,g)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=d?[r,n*c,o*c,i/c**2]:[r,i/c**2,n*c,o*c],S=k.size(v),T=u.dims,C=k.sortBasedOnPerm(T,l);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...N(T,C)]}},getShaderSource:x}},al=(e,t)=>{_f(e.inputs),e.compute(vf(e.inputs[0],t))},sl=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var $o,nn,ll,$f,xf,xo,So,dl,Sf,cl,pl,ml=R(()=>{"use strict";te();oe();Se();ae();$o="[a-zA-Z]|\\.\\.\\.",nn="("+$o+")+",ll="^"+nn+"$",$f="("+nn+",)*"+nn,xf="^"+$f+"$",xo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},So=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(xf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((l,d)=>{let c=t[d].dims.slice();if(!l.match(RegExp(ll)))throw new Error("Invalid LHS term");let m=this.processTerm(l,!0,c,d);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([l,d])=>d.count===1||l==="...").map(([l])=>l).join("");else if(!o.match(RegExp(nn)))throw new Error("Invalid RHS");o.match(RegExp($o,"g"))?.forEach(l=>{if(l==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(l);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,l=[],d=0;if(!t.match(RegExp(ll))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp($o,"g")),m=new xo(o);return c?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let _=i-c.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(l=n.slice(d,d+_),this.hasEllipsis){if(this.ellipsisDims.length!==l.length||this.ellipsisDims.toString()!==l.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=l;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<l.length;y++){let g=String.fromCharCode("0".charCodeAt(0)+y);m.addSymbol(g,h+y),this.addSymbol(g,n[d++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[d++],o)}),m}},dl=e=>e+"_max",Sf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),l=M("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),c=m=>{let u=[],h="var prod = 1.0;",_="var sum = 0.0;",y="sum += prod;",g=[],x=[],$=[],v=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,A)=>{if(r.rhs.symbolToIndices.has(A)){let P=r.rhs.symbolToIndices.get(A)?.[0];P!==void 0&&r.lhs.forEach((O,U)=>{if(C.inputIndices.includes(U)){let G=O.symbolToIndices.get(A);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(q=>{u.push(`${i[U].indicesSet(`input${U}Indices`,q,l.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(C.inputIndices.includes(O)){let U=P.symbolToIndices.get(A);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(G=>{g.push(`${i[O].indicesSet(`input${O}Indices`,G,`${A}`)}`)}),v.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),x.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${dl(A)}; ${A}++) {`),$.push("}")});let T=S?[...u,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...u,_,...x,...g,h,...v,y,...$];return`
            ${m.registerUniforms(d.map(C=>({name:`${dl(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,l)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=d.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,_)=>[...N(h)]).reduce((h,_)=>h.concat(_),m);return u.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:c}},cl=(e,t)=>{let r=new So(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(Sf(o,e.inputs[0].dataType,r,n))},pl=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var Tf,fl,If,Cf,hl,gl=R(()=>{"use strict";te();oe();ae();Tf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fl=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},If=(e,t)=>e.length>t.length?fl(e,t):fl(t,e),Cf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=If(t,r),o=e[0].dataType,i=o===9||k.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,l=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(k.size(n)/l),c=u=>{let h=E("input",o,t.length,a),_=M("output",o,n.length,l),y;if(o===9){let g=(x,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${v}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${g("data",0,"u32")}
        ${g("data",1,"u32")}
        ${g("data",2,"u32")}
        ${g("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${u.registerUniform("vec_size","u32").declareVariables(h,_)}
    ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},m=[{type:12,data:d},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${l}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},hl=e=>{Tf(e.inputs),e.compute(Cf(e.inputs),{inputs:[0]})}});var Af,bl,yl=R(()=>{"use strict";te();oe();ae();Zr();Af=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let l=E("x",t,[1],4),d=E("bias",t,[1],4),c=M("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,h=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(l,d,c)}

    ${fo(Ae(t))}

    ${a.mainStart(Ct)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",ho("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ct/4)}})}},bl=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?mu(e):e.compute(Af(e.inputs))}});var kf,Ef,_l,wl,vl=R(()=>{"use strict";te();oe();Se();ae();kf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ef=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let l=r[i],d=e[0].dataType===9?4:1,c=Math.ceil(k.size(a)/d),m=[{type:12,data:c},{type:6,data:l},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],u=h=>{let _=E("data",e[0].dataType,e[0].dims.length,d),y=E("inputIndices",e[1].dataType,e[1].dims.length),g=M("output",e[0].dataType,a.length,d),x=v=>{let S=n.length,T=`var indicesIndices${v}  = ${y.type.indices}(0);`;for(let C=0;C<S;C++)T+=`${S>1?`indicesIndices${v}[${C}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${C}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${y.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let C=0,A=0;C<o;C++)C===i?(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = u32(idx${v});`,A+=S):(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return T},$;if(e[0].dataType===9){let v=(S,T,C="")=>`
          let outputIndices${T} = ${g.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${_.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${C}(${_.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${g.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${g.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${g.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,g)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:u}},_l=e=>J({axis:e.axis}),wl=(e,t)=>{let r=e.inputs;kf(r),e.compute(Ef(e.inputs,t))}});var Pf,zf,$l,xl,Sl=R(()=>{"use strict";te();oe();Se();ae();Pf=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((l,d)=>d===r?Math.ceil(l/n)===i.dims[d]:l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((l,d)=>l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},zf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),l=r.slice(0);l.splice(i,1,...n);let d=k.size(l),c=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((y,g)=>y.dims),l)],_=y=>{let g=E("data",e[0].dataType,e[0].dims.length),x=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=M("output",c,l.length),T=[g,x,$];v&&T.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...T,S)}
        ${y.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${Ae(c)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,g)=>g!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,g)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}},$l=(e,t)=>{let r=e.inputs;Pf(r,t),e.compute(zf(e.inputs,t))},xl=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Of,Bf,Tl,Il,Cl=R(()=>{"use strict";te();oe();Se();ae();Of=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Bf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,l=k.normalizeAxis(t.axis,o),d=r[l],c=i.slice(0),m=k.size(c),u=E("input",n,o),h=E("indicesInput",a,i.length),_=M("output",n,c.length),y=[{type:12,data:m},{type:6,data:d},{type:12,data:l}];return y.push(...N(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,h,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Tl=e=>J({axis:e.axis}),Il=(e,t)=>{let r=e.inputs;Of(r),e.compute(Bf(e.inputs,t))}});var Df,Mf,Al,kl,El=R(()=>{"use strict";te();oe();ae();Df=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Mf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Gr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),l=[o,i];if(!l)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(i/d),m=Math.ceil(o/d),u=!0,h=k.size(l),_=[{type:12,data:u?c:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...N(e[2].dims)),y.push("rank")),_.push(...N(l));let g=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=E("a",e[0].dataType,e[0].dims),C=E("b",e[1].dataType,e[1].dims),A=T.type.value,P=null,O=[T,C];e.length===3&&(P=E("c",e[2].dataType,e[2].dims.length),O.push(P));let U=M("output",e[0].dataType,l.length);O.push(U);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(G).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${(()=>P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${A}(uniforms.beta) * ${P.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},x=$=>{let v=E("a",e[0].dataType,e[0].dims),S=E("b",e[1].dataType,e[1].dims),T=null,C=[v,S];e.length===3&&(T=E("c",e[2].dataType,e[2].dims.length),C.push(T));let A=M("output",e[0].dataType,l.length);C.push(A);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",U="";t.transA&&t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(P).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return u?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:c*m},programUniforms:_}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:g}},Al=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},kl=(e,t)=>{Df(e.inputs),e.compute(Mf(e.inputs,t))}});var lt,yt,Ut,Nt,Rf,Uf,Nf,Vf,Wf,Lf,Gf,Hf,Pl,zl,Ol=R(()=>{"use strict";te();oe();Se();ae();[lt,yt,Ut,Nt]=[0,1,2,3],Rf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Uf=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Nf=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Vf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Wf=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Lf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${lt}] = batch;
     indices[${yt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ut}] = u32(r);
            indices[${Nt}] = u32(c);
          }
        `;case"border":return`
          indices[${Ut}] = u32(clamp(r, 0, H - 1));
          indices[${Nt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Ut}] = gs_reflect(r, border[1], border[3]);
          indices[${Nt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Gf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${lt}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${lt}], indices[${yt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${lt}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Hf=(e,t)=>{let r=E("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=E("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[lt,yt,Ut,Nt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),l=r.type.value,d=k.size(i),c=[{type:12,data:d},...N(e[0].dims,n,i)],m=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${Uf}
  ${Nf(l)}
  ${Vf(t)}
  ${Wf(t)}
  ${Lf(r,l,t)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ut}]);
      let W_in = i32(uniforms.x_shape[${Nt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${lt}], indices[${Ut}], indices[${Nt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Gf(a,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:u=>{let h=k.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}},getShaderSource:m}},Pl=(e,t)=>{Rf(e.inputs),e.compute(Hf(e.inputs,t))},zl=e=>J({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Me,jf,Dl,Bl,Kf,rr,Ml,To=R(()=>{"use strict";te();oe();Se();Lr();Kr();ae();ut();Me=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,jf=(e,t)=>{let r=e[0],n=Me(e,1),o=Me(e,2),i=Me(e,3),a=Me(e,4),l=Me(e,5),d=Me(e,6),c=Me(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=u,y=0,g=0,x=Math.floor(h/t.numHeads);if(d&&c&&k.size(d.dims)&&k.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],g=d.dims[2]}else if(d&&k.size(d.dims)||c&&k.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=y+_,S=0;if(a&&k.size(a.dims)>0){S=8;let P=a.dims;throw P.length===1?P[0]===m?S=1:P[0]===3*m+2&&(S=3):P.length===2&&P[0]===m&&P[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,C=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(l&&k.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[2]!==u||l.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:x,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:A,passPastInKv:T,qkvFormat:$}},Dl=e=>J({...e}),Bl=J({perm:[0,2,1,3]}),Kf=(e,t,r,n,o,i,a)=>{let l=[n,o,i],d=k.size(l),c=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],m=u=>{let h=M("qkv_with_bias",t.dataType,l),_=E("qkv",t.dataType,l),y=E("bias",r.dataType,l),g=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(g).declareVariables(_,y,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},rr=(e,t,r,n,o,i,a,l)=>{let d=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Kf(e,i,a,t,n,r*o,l),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(ke(d,Bl.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(ke(d,Bl.perm),{inputs:[d],outputs:[-1]})[0]},Ml=(e,t)=>{let r=jf(e.inputs,t),n=e.inputs[0],o=Me(e.inputs,1),i=Me(e.inputs,2),a=Me(e.inputs,3),l=Me(e.inputs,4),d=Me(e.inputs,5),c=Me(e.inputs,6),m=Me(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Rt(e,h,o,i,l,void 0,c,m,d,r);if(!o||!i)throw new Error("key and value must be provided");let _=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,h,_,y,l,void 0,c,m,d,r)}});var Yf,Zf,Qf,Xf,Io,Rl,Ul,Co=R(()=>{"use strict";te();oe();Se();ae();Yf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Zf=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},Qf=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Xf=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Io=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),l=E("input",o,r.length),d=new Array(t.numOutputs),c=[],m=[],u=0,h=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){u+=t.splitSizes[y],d[y]=u;let g=r.slice();g[i]=t.splitSizes[y],m.push(g),a[y]=M(`output${y}`,o,g.length),c.push({dims:m[y],dataType:e[0].dataType})}h.push({type:12,data:d},...N(r,...m));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...a)}
  ${Qf(d.length)}
  ${Xf(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${l.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Rl=(e,t)=>{Yf(e.inputs);let r=e.inputs.length===1?t:Zf(e.inputs,t);e.compute(Io(e.inputs,r),{inputs:[0]})},Ul=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var Jf,eh,Nl,Vl,Wl=R(()=>{"use strict";Se();Kr();To();Co();ut();Jf=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],c=r.dims[1],m=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=c,h=0,_=!n||n.dims.length===0,y=Math.floor(_?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);_&&(m=y*t.numHeads);let g=i&&i.dims.length!==0,x=a&&a.dims.length!==0;if(g&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(g&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(g||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let S=0,T=!1,C=t.kvNumHeads?y*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=e.length>4?e[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let P=-1,O=-1,U=!1;return{batchSize:d,sequenceLength:c,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:P,maxSequenceLength:O,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:y,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:U,passPastInKv:T,qkvFormat:v}},eh=J({perm:[0,2,1,3]}),Nl=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(ke(n,eh.perm),{inputs:[n],outputs:[-1]})[0]),n},Vl=(e,t)=>{let r=Jf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,u=J({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[h,_,y]=!o&&!i?e.compute(Io([n],u),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],g=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);Rt(e,g,Nl(e,_,r),Nl(e,y,r),void 0,void 0,a,l,void 0,r,d,c)}});var Ll,th,rh,Gl,Hl=R(()=>{"use strict";te();oe();ut();ae();Ll=(e,t,r,n,o,i,a,l)=>{let d=me(i),c=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,u=o*a,h=64;u===1&&(h=256);let _=[o,a,i/d],y=[o,a,2],g=["rank","type","type"],x=[];x.push(...N(_,y));let $=v=>{let S=E("x",t.dataType,3,d),T=E("scale",r.dataType,r.dims),C=E("bias",n.dataType,n.dims),A=M("output",1,3,2),P=[S,T,C,A];return`
  var<workgroup> workgroup_shared : array<${m}, ${h}>;
  const workgroup_size = ${h}u;
  ${v.declareVariables(...P)}
  ${v.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${He("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${He("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l};${h}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:u},programUniforms:x}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},th=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],l=n[1],d=k.sizeFromDimension(n,i),c=me(d),m=k.size(o)/c,u=Ll(e,t[0],t[1],t[2],a,d,l,r.epsilon),h=[a,l,d/c],_=[a,l],y=["type","none"],g=x=>{let $=E("x",t[0].dataType,h.length,c),v=E("scale_shift",1,_.length,2),S=M("output",t[0].dataType,h.length,c),T=[$,v,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...N(h,_,h)]}),getShaderSource:g},{inputs:[t[0],u]})},rh=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],l=k.sizeFromDimension(n,1)/a,d=me(a),c=k.size(o)/d,m=[{type:12,data:l},{type:12,data:Math.floor(a/d)}],u=["type","type"],h=!1,_=[0,n.length-1];for(let $=0;$<n.length-2;$++)h=h||n[$+1]!==1,_.push($+1);h=h&&n[n.length-1]!==1;let y=h?e.compute(ke(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[_[v]])),g=Ll(e,y,t[1],t[2],i,l,a,r.epsilon),x=$=>{let v=ye(t[0].dataType),S=d===1?"vec2f":`mat${d}x2f`,T=P=>{let O=P===0?"x":"y",U=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${v}(${U}(scale.${O}))`;case 2:return`vec2<${v}>(${U}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${U}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${d}`)}},C=E("input",t[0].dataType,t[0].dims,d),A=M("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:x},{inputs:[t[0],g]})},Gl=(e,t)=>{t.format==="NHWC"?rh(e,e.inputs,t):th(e,e.inputs,t)}});var nh,oh,Fl,ql=R(()=>{"use strict";te();oe();ae();nh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},oh=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],l=o,d=k.normalizeAxis(t.axis,o.length),c=k.sizeToDimension(o,d),m=k.sizeFromDimension(o,d),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let _=[];for(let C=0;C<o.length;++C)C<d?_.push(o[C]):_.push(1);let y=me(m),g=["type","type"],x=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/y)},{type:1,data:t.epsilon}];a&&g.push("type");let $=r>1,v=r>2,S=C=>{let A=ye(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,y),E("scale",i.dataType,i.dims,y)];a&&P.push(E("bias",a.dataType,a.dims,y)),P.push(M("output",e[0].dataType,l,y)),$&&P.push(M("mean_data_output",1,_)),v&&P.push(M("inv_std_output",1,_));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(O).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${lo("f32",y)};
    var mean_square_vector = ${lo("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(A,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${He("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${He("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(A,y,"x[j + offset]")};
      let f32scale = ${At(A,y,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(A,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:l,dataType:e[0].dataType}];return $&&T.push({dims:_,dataType:1}),v&&T.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:g},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:S}},Fl=(e,t)=>{nh(e.inputs),e.compute(oh(e.inputs,t,e.outputCount))}});var ih,jl,Kl=R(()=>{"use strict";oe();en();tn();ih=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},jl=e=>{ih(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Jr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=k.size(e.inputs[0].dims.slice(0,-2)),a=k.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let l=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),c=[1,i,r],m=[l,d];e.compute(tr(m,{activation:""},t,c),{inputs:m})}else e.compute(tr(e.inputs,{activation:""},t))}}});var ah,sh,uh,Yl,Zl,Ql=R(()=>{"use strict";te();oe();Se();ae();ah=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(k.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},sh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),_=me(m),y=me(a),g=l.concat([o,a]),x=o>1&&a/y%2===0?2:1,$=k.size(g)/y/x,v=64,S=[],T=[d,o,i/h],C=k.convertShape(e[1].dims).slice();C.splice(-1,1,m/_),S.push(...N(T)),S.push(...N(C)),S.push(...N(e[2].dims)),e.length===4&&S.push(...N(k.convertShape(e[3].dims)));let A=[d,o,a/y];S.push(...N(A));let P=O=>{let U=T.length,G=E("a",e[0].dataType,U,h),q=E("b",12,C.length,_),K=E("scales",e[2].dataType,e[2].dims.length),W=[G,q,K],Y=e.length===4?E("zero_points",12,e[3].dims.length):void 0;Y&&W.push(Y);let se=A.length,X=M("output",e[0].dataType,se,y),re=ye(e[0].dataType),ee=(()=>{switch(h){case 1:return`array<${re}, 8>`;case 2:return`mat4x2<${re}>`;case 4:return`mat2x4<${re}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ne=()=>{let $e=`
          // reuse a data
            var input_offset = ${G.indicesToOffset(`${G.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ee};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${G.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let de=0;de<y*x;de++)$e+=`
            b_value = ${_===1?`b${de}_data`:`b${de}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ee}(${Array.from({length:4},(V,j)=>`${re}(b_value_lower[${j}]), ${re}(b_value_upper[${j}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${ee}(${Array.from({length:8},(V,j)=>`(b_quantized_values[${j}] - ${Y?`zero_point${de}`:"zero_point"}) * scale${de}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${Y?`zero_point${de}`:"zero_point"}`).join(",")})) * scale${de};`)()};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(de/y)}]${y>1?`[${de%y}]`:""} += ${Array.from({length:8/h},(V,j)=>`${h===1?`a_data[${j}] * b_dequantized_values[${j}]`:`dot(a_data[${j}], b_dequantized_values[${j}])`}`).join(" + ")};
          `;return $e},ve=()=>{let $e=`
            var col_index = col * ${y};
            ${Y?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${re}(8);`}
            `;for(let de=0;de<y*x;de++)$e+=`
            let scale${de} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${de} = ${re}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return $e},Be=()=>{let $e=`col_index = col * ${y};`;for(let de=0;de<y*x;de++)$e+=`
            let b${de}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return $e+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,$e};return`
        var<workgroup> workgroup_shared: array<${X.type.value}, ${x*v}>;
        ${O.declareVariables(...W,X)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${X.offsetToIndices(`(global_idx / ${v}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${ve()}
            for (var word: u32 = 0; word < ${m}; word += ${_}) {
              ${Be()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${ne()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${X.setByIndices(`${X.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${_};${y};${x};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:u}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:P}},uh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),_=me(m),y=l.concat([o,a]),g=128,x=a%8===0?8:a%4===0?4:1,$=g/x,v=$*_*8,S=v/h,T=v/t.blockSize,C=k.size(y)/x,A=[],P=[d,o,i/h],O=k.convertShape(e[1].dims).slice();O.splice(-1,1,m/_),A.push(...N(P)),A.push(...N(O)),A.push(...N(e[2].dims)),e.length===4&&A.push(...N(k.convertShape(e[3].dims)));let U=[d,o,a];A.push(...N(U));let G=q=>{let K=P.length,W=E("a",e[0].dataType,K,h),Y=E("b",12,O.length,_),se=E("scales",e[2].dataType,e[2].dims.length),X=[W,Y,se],re=e.length===4?E("zero_points",12,e[3].dims.length):void 0;re&&X.push(re);let ee=U.length,ne=M("output",e[0].dataType,ee),ve=ye(e[0].dataType),Be=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${$}>, ${x}>;
        ${q.declareVariables(...X,ne)}
        ${q.mainStart([$,x,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${g})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${re?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${re.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ve}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${Be()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},($e,de)=>`${ve}(b_value_lower[${de}]), ${ve}(b_value_upper[${de}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,de)=>`${`dot(a_data${de}, b_dequantized_values[${de}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${_};${$};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:G}},Yl=(e,t)=>{ah(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(uh(e.inputs,t)):e.compute(sh(e.inputs,t))},Zl=e=>J(e)});var lh,dh,ch,ph,mh,fh,hh,gh,Xl,Jl=R(()=>{"use strict";te();oe();ae();lh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},dh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},ch=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},ph=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k = i32(${F("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},mh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k -= i32(${F("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},fh=(e,t,r)=>{switch(r.mode){case 0:return dh(e,t,r.pads.length);case 1:return ch(e,t,r.pads.length);case 2:return ph(e,t,r.pads.length);case 3:return mh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},hh=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let l=["rank"],d=c=>{let m=M("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,_=fh(m,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:a?h:"f32"}),`
            ${c.registerUniforms(y).declareVariables(u,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},gh=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)i[Number(l[d])]=Number(r[d]),i[Number(l[d])+o]=Number(r[d+l.length])}else r.forEach((l,d)=>i[Number(d)]=Number(l));let a=[];return i.forEach(l=>a.push(l)),{mode:t.mode,value:n,pads:a}}else return t},Xl=(e,t)=>{lh(e.inputs);let r=gh(e.inputs,t);e.compute(hh(e.inputs,r),{inputs:[0]})}});var on,ed,td,rd,nd,bh,yh,od,id,ad,sd,ud,ld,dd,cd,pd,md,fd,hd,gd=R(()=>{"use strict";We();te();oe();ae();on=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ed=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),l=t.strides.slice(),d=i?t.dilations.slice():[],c=t.pads.slice();It.adjustPoolAttributes(r,o,a,l,d,c);let m=It.computePoolOutputShape(r,o,l,d,a,c,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:l,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:l,pads:c,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},td=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(c+m);i.push({type:12,data:l},{type:12,data:d},{type:12,data:c},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],g=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];h=!!(g+x),i.push({type:12,data:_},{type:12,data:y},{type:12,data:g},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=k.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,m)=>c+m);return[i,a,!!d,!1,!1]}},rd=(e,t,r,n,o,i,a,l,d,c,m,u)=>{let h=o.format==="NHWC",_=t.type.value,y=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let g="",x="",$="",v=r-(h?2:1);if(m?g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${l});
              var pad = 0;
              ${x}
              ${g}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let g=o.kernelShape.length,x=o.pads.length,$="";return c?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${g}>;

              var value = ${_}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${g-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",g)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",g)};
                }
                offsets[${g-1}] = offset;

                isPad = false;
                for (var j = ${r-g}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-g}u`,g)}
                    + offsets[j - ${r-g}u] - ${F("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},nd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,bh=e=>`${nd(e)};${e.countIncludePad}`,yh=e=>`${nd(e)};${e.storageOrder};${e.dilations}`,od=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),id=(e,t,r,n)=>{let[o,i]=ed(t,n,r),a=E("x",t.dataType,t.dims.length),l=a.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${l}(uniforms.kernelSize);`:c+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,_,y]=td(i,o);m.push(...N(t.dims,i));let g=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:x=>rd(x,a,t.dims.length,i.length,o,d,c,0,u,h,_,y)}},ad=e=>{let t=e.count_include_pad!==0,r=od(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:bh(n)}},sd=(e,t)=>{on(e.inputs),e.compute(id("AveragePool",e.inputs[0],!1,t))},ud={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ld=e=>{let t=e.format;return{format:t,...ud,cacheKey:t}},dd=(e,t)=>{on(e.inputs),e.compute(id("GlobalAveragePool",e.inputs[0],!0,t))},cd=(e,t,r,n)=>{let[o,i]=ed(t,n,r),a=`
      value = max(x_val, value);
    `,l="",d=E("x",t.dataType,t.dims.length),c=["rank"],[m,u,h,_,y]=td(i,o);return m.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${_};${y}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:g=>rd(g,d,t.dims.length,i.length,o,a,l,t.dataType===10?-65504:-1e5,u,h,_,y)}},pd=(e,t)=>{on(e.inputs),e.compute(cd("MaxPool",e.inputs[0],!1,t))},md=e=>{let t=e.storage_order,r=e.dilations,n=od(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:yh(o)}},fd=e=>{let t=e.format;return{format:t,...ud,cacheKey:t}},hd=(e,t)=>{on(e.inputs),e.compute(cd("GlobalMaxPool",e.inputs[0],!0,t))}});var wh,vh,bd,yd,_d=R(()=>{"use strict";te();oe();Se();ae();wh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},vh=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,l=k.size(i),d=n===3||n===2,c=d?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?d?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,_=m.length===0||m.length===1&&m[0]===1,y=_===!1&&m.length===1,g=me(l),x=_&&(!d||g===4),$=x?g:1,v=x&&!d?g:1,S=E("input",d?12:n,c.length,v),T=E("scale",a,m.length),C=u?E("zero_point",d?12:n,h.length):void 0,A=M("output",a,i.length,$),P=[S,T];C&&P.push(C);let O=[c,m];u&&O.push(h);let U=[{type:12,data:l/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...O,i)],G=q=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(K).declareVariables(...P,A)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>d?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>_?`let scale_value= ${T.getByOffset("0")}`:y?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>C?_?d?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:y?d?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":S.type.value}(0);`)()};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:U})}},bd=(e,t)=>{wh(e.inputs,t),e.compute(vh(e.inputs,t))},yd=e=>J({axis:e.axis,blockSize:e.blockSize})});var $h,xh,wd,vd=R(()=>{"use strict";We();te();ae();$h=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},xh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,l=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],d=c=>{let m=M("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${c.registerUniforms(h).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},wd=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&$h(t,r,n),e.compute(xh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Sh,Th,$d,xd,Sd=R(()=>{"use strict";te();oe();Se();ae();Sh=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${o}bitcast<${n}>(oldValue) + (${r})${i}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Th=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,i=1,a=Math.ceil(k.size(n)/i),l=n[n.length-1],d=k.sizeFromDimension(r,l),c=[{type:12,data:a},{type:12,data:l},{type:12,data:d},...N(e[1].dims,e[2].dims,o)],m=u=>{let h=E("indices",e[1].dataType,e[1].dims.length),_=E("updates",e[2].dataType,e[2].dims.length,i),y=t.reduction!=="none"&&t.reduction!==""?es("output",e[0].dataType,o.length):M("output",e[0].dataType,o.length,i);return`
      ${u.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,_,y)}
      ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Sh(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:m}},$d=e=>J({reduction:e.reduction}),xd=(e,t)=>{e.compute(Th(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var Ih,Ch,Ah,kh,Eh,Ph,zh,Oh,Bh,Dh,Mh,Td,Rh,Uh,Nh,Vh,Wh,Id,Cd,Ad=R(()=>{"use strict";te();oe();Se();ae();Ih=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ch=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Ah=(e,t,r,n,o,i)=>{let[a,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ih(n,t),t.axes.length>0&&Ch(n,t.axes,c).forEach((m,u)=>n[u]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},kh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Eh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ph=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},zh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Oh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},Bh=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",n)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Dh=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${F("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${F("uniforms.roi","i",i)};
          var roi_hi = ${F("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${F("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,Mh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Td=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Rh=(e,t,r,n,o)=>{let[a,l,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(row, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${Td(e,c,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${l}];
      var col:${m} = originalIndices[${d}];
      ${n?`if (row < 0 || row > (${r[l]} - 1) || col < 0 || col > (${r[d]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[l]} - 1));
      col = max(0, min(col, ${r[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Uh=(e,t,r,n,o,i,a,l,d,c)=>{let m=r.length===2,u=!0,[h,_]=m?[0,1]:u?[2,3]:[1,2],y=e.type.value,g=x=>{let $=x===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${i[x]}, ${i[x]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[x]}) {
            ${(()=>c?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${$} = max(0, min(${$}, ${r[x]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${$})`)};
          data[i + 1] = ${x===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(h)};
    ${g(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Nh=(e,t,r,n,o)=>{let[a,l,d,c,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(depth, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${Td(e,m,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${l}];
      var height:${u} = originalIndices[${d}];
      var width:${u} = originalIndices[${c}];
      ${n?`if (depth < 0 || depth > (${r[l]} - 1) || height < 0 || height > (${r[d]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[l]} - 1));
      height = max(0, min(height, ${r[d]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
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
    }`},Vh=(e,t,r,n,o,i)=>{let a=e.dims,l=Ph(i,t.axes,a.length),d=zh(a,n,o,t.axes),c=n.slice();n.length===0&&(c=a.map((v,S)=>v===0?1:d[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(d=Oh(a,c,t)));let m=M("output",e.dataType,d.length),u=E("input",e.dataType,a.length),h=k.size(d),_=a.length===d.length&&a.every((v,S)=>v===d[S]),y=t.coordinateTransformMode==="tf_crop_and_resize",g=t.extrapolationValue,x=u.type.value,$=v=>`
      ${_?"":`
      ${kh(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Mh(u,a)};
              ${Eh(t.nearestMode,r,x)};
              ${Dh(u,m,a,d,c.length,l.length,y)};
              `;case"linear":return`
              ${Bh(m,a,d,c.length,l.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Rh(u,m,a,y,g)}`;if(a.length===3||a.length===5)return`${Nh(u,m,a,y,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Uh(u,m,a,d,c,l,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",l.length).declareVariables(u,m)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${u.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${u.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?c:""}|${o.length>0?o:""}|${l.length>0?l:""}|${_}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:c},{type:1,data:l},...N(a,d)]})}},Wh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Id=(e,t)=>{let r=[],n=[],o=[],i=Wh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Ah(e.inputs,t,i,r,n,o),e.compute(Vh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},Cd=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:l,mode:d,nearestMode:c})}});var Lh,Gh,kd,Ed=R(()=>{"use strict";te();oe();Se();ae();Lh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/c,h=l===0?o.dims[1]*2:u/a;if(l>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&l/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Gh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],l=k.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=l/d,m=e[2].dims[1],u=o===0?m*2:c/n,h=new Array(a,d,c/u,u-m),_=k.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[l,c,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,u,d*u,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=x=>{let $=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),C=M("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${x.declareVariables($,v,S,T,C)}

        ${x.mainStart(Ct)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",M("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Ct)},programUniforms:y})}},kd=(e,t)=>{Lh(e.inputs,t),e.compute(Gh(e.inputs,t))}});var Hh,Fh,Pd,zd=R(()=>{"use strict";te();oe();ae();Hh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Fh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),l=i,d=a,c=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,_=n&&r>1,y=n&&r>2,g=r>3,x=64,$=me(c),v=[{type:12,data:d},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],S=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&P.push(E("beta",e[3].dataType,e[3].dims,$)),h&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(M("output",e[0].dataType,l,$)),_&&P.push(M("mean_output",1,m)),y&&P.push(M("inv_std_output",1,m)),g&&P.push(M("input_skip_bias_sum",e[0].dataType,l,$));let O=ye(e[0].dataType),U=ye(1,$);return`

      ${C.registerUniforms(A).declareVariables(...P)}
      var<workgroup> sum_shared : array<${U}, ${x}>;
      var<workgroup> sum_squared_shared : array<${U}, ${x}>;

      ${C.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(O,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
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
        let mean = ${He("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${He("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:l,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${g}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:v})}},Pd=(e,t)=>{Hh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Fh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var qh,an,jh,Od,Kh,Yh,Bd,Dd,Md=R(()=>{"use strict";te();oe();Se();ae();qh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},an=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},jh=(e,t)=>{if(e.length>1){let r=an(e,1),n=an(e,2),o=an(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},Od=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Kh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",r.length)};
            let steps_i = ${F("uniforms.steps","i",r.length)};
            let signs_i = ${F("uniforms.signs","i",r.length)};
            let starts_i = ${F("uniforms.starts","i",r.length)};
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
      }`,Yh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=an(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>Od($,v,r,o,i)),l=t.ends.map(($,v)=>Od($,v,r,o,i));if(o.length!==a.length||o.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),l.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,v,S)=>{if($<0){let T=(l[v]-a[v])/$,C=a[v],A=C+T*i[v];a[v]=A,l[v]=C,S[v]=-$}});let c=r.slice(0);o.forEach(($,v)=>{c[$]=Math.ceil((l[$]-a[$])/i[$])});let m={dims:c,dataType:e[0].dataType},u=M("output",e[0].dataType,c.length),h=E("input",e[0].dataType,e[0].dims.length),_=k.size(c),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],g=[{type:12,data:_},{type:12,data:a},{type:6,data:d},{type:12,data:i},...N(e[0].dims,c)],x=$=>`
      ${$.registerUniforms(y).declareVariables(h,u)}
        ${Kh(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},Bd=(e,t)=>{qh(e.inputs,t);let r=jh(e.inputs,t);e.compute(Yh(e.inputs,r),{inputs:[0]})},Dd=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var Zh,Qh,Rd,Ud,Nd=R(()=>{"use strict";te();oe();Se();ut();ae();Zh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Qh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=n.length,a=k.normalizeAxis(t.axis,i),l=a<n.length-1,d,c=[];l?(c=Array.from({length:i},(P,O)=>O),c[a]=i-1,c[i-1]=a,d=e.compute(ke(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let m=d.dims,u=m[i-1],h=o/u,_=me(u),y=u/_,g=64;h===1&&(g=256);let x=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",d.dataType,d.dims,_),v=M("result",d.dataType,d.dims,_),S=$.type.value,T=ye(d.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,C=P=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${g}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables($,v)}
      ${P.mainStart(g)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${g};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
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
          rowMaxShared = ${S}(${x("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
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
          rowSumShared = ${S}(${He("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${_};${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:C},{inputs:[d],outputs:[l?-1:0]})[0];l&&e.compute(ke(A,c),{inputs:[A]})},Rd=(e,t)=>{Zh(e.inputs),Qh(e,t)},Ud=e=>J({axis:e.axis})});var Vd,Xh,Jh,eg,Wd,Ld=R(()=>{"use strict";te();oe();ae();Vd=e=>Array.from(e.getBigInt64Array(),Number),Xh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Vd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},eg=(e,t)=>{let r=e[0].dims,n=t??Vd(e[1]),o=Jh(r,n),i=k.size(o),a=e[0].dataType,l=E("input",a,r.length),d=M("output",a,o.length),c=m=>`
      const inputShape = ${l.indices(...r)};
      ${m.registerUniform("output_size","u32").declareVariables(l,d)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:c}},Wd=e=>{Xh(e.inputs),e.compute(eg(e.inputs),{inputs:[0]})}});var tg,rg,Gd,Hd=R(()=>{"use strict";te();oe();ae();tg=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),l=E("b_data",t[2].dataType,t[2].dims.length,4),d=E("c_data",t[0].dataType,t[0].dims.length,4),c,m=(u,h,_)=>`select(${h}, ${u}, ${_})`;if(!n)c=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let u=(h,_,y="")=>{let g=`a_data[index_a${_}][component_a${_}]`,x=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${a.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${h}[${_}] = ${y}(${m(g,x,$)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${u("data",0,"u32")}
            ${u("data",1,"u32")}
            ${u("data",2,"u32")}
            ${u("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${u("output_data[global_idx]",0)}
            ${u("output_data[global_idx]",1)}
            ${u("output_data[global_idx]",2)}
            ${u("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,a,l,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},rg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,l=k.size(t);if(i){let c=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,l=k.size(a)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>tg(c,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...N(n,t,r,a)]})}},Gd=e=>{e.compute(rg(e.inputs))}});var Fd,qd=R(()=>{"use strict";ks();Kr();zs();Bs();_u();Eu();Ou();Yu();rl();il();ul();ml();gl();yl();vl();Sl();Cl();El();Ol();Wl();Hl();ql();Kl();Ql();To();Jl();gd();_d();vd();Sd();qr();Ad();Ed();zd();Md();Nd();Co();Ld();ut();Zr();Hd();Fd=new Map([["Abs",[Ds]],["Acos",[Ms]],["Acosh",[Rs]],["Add",[wu]],["ArgMax",[As,po]],["ArgMin",[Cs,po]],["Asin",[Us]],["Asinh",[Ns]],["Atan",[Vs]],["Atanh",[Ws]],["Attention",[Es]],["AveragePool",[sd,ad]],["BatchNormalization",[Ps]],["BiasAdd",[Os]],["BiasSplitGelu",[yu]],["Cast",[Gs,Ls]],["Ceil",[Fs]],["Clip",[Hs]],["Concat",[Pu,zu]],["Conv",[vo,wo]],["ConvTranspose",[tl,Ju]],["Cos",[qs]],["Cosh",[js]],["CumSum",[nl,ol]],["DepthToSpace",[al,sl]],["DequantizeLinear",[bd,yd]],["Div",[vu]],["Einsum",[cl,pl]],["Elu",[Ks,Jt]],["Equal",[$u]],["Erf",[Ys]],["Exp",[Zs]],["Expand",[hl]],["FastGelu",[bl]],["Floor",[Qs]],["FusedConv",[vo,wo]],["Gather",[wl,_l]],["GatherElements",[Il,Tl]],["GatherBlockQuantized",[$l,xl]],["Gelu",[Xs]],["Gemm",[kl,Al]],["GlobalAveragePool",[dd,ld]],["GlobalMaxPool",[hd,fd]],["Greater",[Iu]],["GreaterOrEqual",[Au]],["GridSample",[Pl,zl]],["GroupQueryAttention",[Vl]],["HardSigmoid",[au,iu]],["InstanceNormalization",[Gl]],["LayerNormalization",[Fl]],["LeakyRelu",[Js,Jt]],["Less",[Cu]],["LessOrEqual",[ku]],["Log",[hu]],["MatMul",[jl]],["MatMulNBits",[Yl,Zl]],["MaxPool",[pd,md]],["Mul",[xu]],["MultiHeadAttention",[Ml,Dl]],["Neg",[tu]],["Not",[eu]],["Pad",[Xl]],["Pow",[Su]],["QuickGelu",[gu,Jt]],["Range",[wd]],["Reciprocal",[ru]],["ReduceMin",[vs]],["ReduceMean",[gs]],["ReduceMax",[ws]],["ReduceSum",[xs]],["ReduceProd",[$s]],["ReduceL1",[bs]],["ReduceL2",[ys]],["ReduceLogSum",[Ts]],["ReduceLogSumExp",[_s]],["ReduceSumSquare",[Ss]],["Relu",[nu]],["Resize",[Id,Cd]],["RotaryEmbedding",[kd]],["ScatterND",[xd,$d]],["Sigmoid",[ou]],["Sin",[su]],["Sinh",[uu]],["Slice",[Bd,Dd]],["SkipLayerNormalization",[Pd]],["Split",[Rl,Ul]],["Sqrt",[lu]],["Softmax",[Rd,Ud]],["Sub",[Tu]],["Tan",[du]],["Tanh",[pu]],["ThresholdedRelu",[fu,Jt]],["Tile",[Wd]],["Transpose",[ns,os]],["Where",[Gd]]])});var sn,jd=R(()=>{"use strict";We();Je();ae();sn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Ue(t.programInfo.name);let a=this.backend.device,l=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let m of r)d.push({binding:d.length,resource:{buffer:m.buffer}});for(let m of n)d.push({binding:d.length,resource:{buffer:m.buffer}});i&&d.push({binding:d.length,resource:i});let c=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}l.setPipeline(t.computePipeline),l.setBindGroup(0,c),l.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),De(t.programInfo.name)}dispose(){}build(t,r){Ue(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(u=>{n.features.has(u.feature)&&o.push(`enable ${u.extension};`)});let a=ts(r,this.backend.device.limits),l=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${l}`,c=n.createShaderModule({code:d,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let m=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return De(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,l=Math.ceil(Math.sqrt(a));if(l>i){if(l=Math.ceil(Math.cbrt(a)),l>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[l,l,l]}else return[l,l,1]}}});var ng,og,Ao,ko,un,Kd=R(()=>{"use strict";We();te();Je();eo();Qa();qd();jd();ng=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},og=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${ng(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Ao=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},ko=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},un=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new ko(this.device),this.adapterInfo=new Ao(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Za(this),this.programManager=new sn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ue(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,l=this.kernels.get(a),d=l.kernelType,c=l.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,_=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let g=Number(_-this.queryTimeBase),x=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:gt($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:gt($.dataType)})),kernelId:a,kernelType:d,kernelName:c,programName:m,startTime:g,endTime:x});else{let $="";u.forEach((S,T)=>{$+=`input[${T}]: [${S.dims}] | ${gt(S.dataType)}, `});let v="";h.forEach((S,T)=>{v+=`output[${T}]: [${S.dims}] | ${gt(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${c}|${m}" ${$}${v}execution time: ${x-g} ns`)}xr("GPU",`${m}::${_}::${y}`)}t.unmap(),this.pendingQueries.delete(t)}),De()}run(t,r,n,o,i,a){Ue(t.name);let l=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);l.push(C)}let{outputs:d,dispatchGroup:c,programUniforms:m}=t.getRunData(r),u=n.length===0?d.map((S,T)=>T):n;if(u.length!==d.length)throw new Error(`Output size ${u.length} must be equal to ${d.length}.`);let h=[],_=[];for(let S=0;S<d.length;++S){if(!Number.isInteger(u[S])||u[S]<-3||u[S]>=a)throw new Error(`Invalid output index: ${u[S]}`);if(u[S]===-3)continue;let T=u[S]===-1,C=u[S]===-2,A=T||C?i(d[S].dataType,d[S].dims):o(u[S],d[S].dataType,d[S].dims);if(h.push(A),A.data===0)continue;let P=this.gpuDataManager.get(A.data);if(!P)throw new Error(`no GPU data for output: ${A.data}`);if(T&&this.temporaryData.push(P),C){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}_.push(P)}if(l.length!==r.length||_.length!==h.length){if(_.length===0)return De(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(m){let S=0,T=[];m.forEach(O=>{let U=typeof O.data=="number"?[O.data]:O.data;if(U.length===0)return;let G=O.type===10?2:4,q,K;O.type===10?(K=U.length>4?16:U.length>2?8:U.length*G,q=U.length>4?16:G*U.length):(K=U.length<=2?U.length*G:16,q=16),S=Math.ceil(S/K)*K,T.push(S);let W=O.type===10?8:4;S+=U.length>4?Math.ceil(U.length/W)*q:U.length*G});let C=16;S=Math.ceil(S/C)*C;let A=new ArrayBuffer(S);m.forEach((O,U)=>{let G=T[U],q=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(A,G,q.length).set(q);else if(O.type===12)new Uint32Array(A,G,q.length).set(q);else if(O.type===10)new Uint16Array(A,G,q.length).set(q);else if(O.type===1)new Float32Array(A,G,q.length).set(q);else throw new Error(`Unsupported uniform type: ${gt(O.type)}`)});let P=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,A,0,S),this.gpuDataManager.release(P.id),y={offset:0,size:S,buffer:P.buffer}}let g=this.programManager.normalizeDispatchGroupSize(c),x=g[1]===1&&g[2]===1,$=og(t,r,x),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,g),this.programManager.setArtifact($,v),ue("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let S=0;S<m.length;S++){let T=m[S],C=T.type,A=typeof T.data=="number"?1:T.data.length,[P,O]=v.uniformVariablesInfo[S];if(C!==P||A!==O)throw new Error(`Uniform variable ${S} mismatch: expect type ${P} with size ${O}, got type ${C} with size ${A} in program "${v.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(v,l,_,g,y),De(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Fd.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,l=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),l(r,d[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{c&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),l=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[l,n]),l}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await oo(this,t,r);return Wr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ig,Yd,ag,Zd,ln,dn,Eo,Qd,Xd=R(()=>{"use strict";Je();ig=1,Yd=()=>ig++,ag=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Zd=(e,t)=>{let r=ag.get(e);if(!r)throw new Error("Unsupported data type.");return Math.ceil(t.reduce((n,o)=>n*o)*r/8)},ln=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Zd(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,o)=>n===r[o])}},dn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Zd(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},Eo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Yd();return this.tensorTrackersById.set(t,new dn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=Yd(),a=new ln({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(i,new dn(this,a)),this.externalTensors.add(a),i}async getCachedTensor(t,r,n,o,i){let a=this.backend.currentSessionId;for(let[c,m]of this.freeTensors.entries())if(m.sameTypeAndShape(t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let u=this.freeTensors.splice(c,1)[0];return u.sessionId=a,u}let l=this.backend.currentContext;ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let d=await l.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:i});return new ln({sessionId:a,context:l,tensor:d,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},Qd=(...e)=>new Eo(...e)});var Jd,sg,cn,ec=R(()=>{"use strict";te();ht();eo();Xd();Je();Jd=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),sg=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},cn=class{constructor(t){this.tensorManager=Qd(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Vr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>sg(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Jd.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Wr(n,r)}}registerMLTensor(t,r,n){let o=Jd.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let d=a.get(l);if(!d)throw new Error(`File with name ${l} not found in preloaded files.`);if(r+n>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=d.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(c);break;case"float16":m=new Uint16Array(c);break;case"int32":m=new Int32Array(c);break;case"uint32":m=new Uint32Array(c);break;case"int64":m=new BigInt64Array(c);break;case"uint64":m=new BigUint64Array(c);break;case"int8":m=new Int8Array(c);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,m)}flush(){}}});var tc={};Ft(tc,{init:()=>ug});var nr,Po,ug,rc=R(()=>{"use strict";te();Kd();Je();oe();ec();nr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Po=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let l=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let c=0;c<l;c++){let m=Number(t.getValue(o*i++,a)),u=Number(t.getValue(o*i++,"*")),h=Number(t.getValue(o*i++,a)),_=[];for(let y=0;y<h;y++)_.push(Number(t.getValue(o*i++,a)));d.push(new nr(t,m,u,_))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(l=>typeof l=="number"?this.inputs[l]:l)??this.inputs,o=r?.outputs??[],i=(l,d,c)=>new nr(this.module,d,this.output(l,c),c),a=(l,d)=>{let c=Tt(l,d);if(!c)throw new Error(`Unsupported data type: ${l}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new nr(this.module,l,m,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let l=0;l<r.length;l++)this.module.setValue(a+o*(l+1),r[l],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},ug=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new un;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,l,d,c=!1)=>{if(c)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(a),Number(l));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let m=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(d));i.upload(Number(l),m)}},async(a,l,d)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${l}, size=${d}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(a,l,d)=>i.createKernel(a,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),a=>i.releaseKernel(a),(a,l,d,c)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${a}, contextDataOffset=${l}`);let m=new Po(t,i,Number(l));return i.computeKernel(Number(a),m,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new cn(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,l,d,c)=>i.ensureTensor(a,l,d,c),(a,l)=>{i.uploadTensor(a,l)},async(a,l)=>i.downloadTensor(a,l)])}}});var lg,Ar,kr,kt,dg,Kt,Er,Pr,nc,zr,Or,Br,Kn=R(()=>{"use strict";La();Ha();te();ht();Mr();Jn();lg=(e,t)=>{Ie()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},Ar=async e=>{lg(e.wasm.numThreads,Qt(e.logLevel))},kr=async(e,t)=>{{let r=(rc(),br(tc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ie(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ie(),e)}}},kt=new Map,dg=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&pe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},Kt=e=>{let t=Ie(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Er=async(e,t)=>{let r,n,o=Ie();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Kt(e);let i=0,a=0,l=0,d=[],c=[],m=[];try{if([a,d]=Ga(t),t?.externalData&&o.mountExternalData){let v=[];for(let S of t.externalData){let T=typeof S=="string"?S:S.path;v.push(Xt(typeof S=="string"?S:S.data).then(C=>{o.mountExternalData(T,C)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let T=v,C=T?.context,A=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;C?o.currentContext=C:A?o.currentContext=await o.jsepCreateMLContext(A):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=dg(i),_=!!t?.enableGraphCapture,y=[],g=[],x=[];for(let v=0;v<u;v++){let S=o._OrtGetInputName(i,v);S===0&&pe("Can't get an input name."),c.push(S),y.push(o.UTF8ToString(S))}for(let v=0;v<h;v++){let S=o._OrtGetOutputName(i,v);S===0&&pe("Can't get an output name."),m.push(S);let T=o.UTF8ToString(S);g.push(T);{if(_&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(_&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(C)}}let $=null;return x.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(l=o._OrtCreateBinding(i),l===0&&pe("Can't create IO binding."),$={handle:l,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(v=>Xn(v))}),kt.set(i,[i,c,m,$,_,!1]),[i,y,g]}catch(u){throw c.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),l!==0&&o._OrtReleaseBinding(l)!==0&&pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&pe("Can't release session."),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&pe("Can't release session options."),d.forEach(u=>o._free(u)),o.unmountExternalData?.()}},Pr=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,l]=r;a&&(l&&t._OrtClearBoundOutputs(a.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&pe("Can't release session."),kt.delete(e)},nc=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ie(),l=a.PTR_SIZE,d=e[0],c=e[1],m=e[3],u,h;if(d==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let g=e[2].gpuBuffer;h=Tt(Zt(d),c);let x=a.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');u=x(n,o,g,h)}else if(m==="ml-tensor"){let g=e[2].mlTensor;h=Tt(Zt(d),c);let x=a.jsepRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');u=x(g,Zt(d),c)}else{let g=e[2];if(Array.isArray(g)){h=l*g.length,u=a._malloc(h),r.push(u);for(let x=0;x<g.length;x++){if(typeof g[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);a.setValue(u+x*l,Ce(g[x],r),"*")}}else h=g.byteLength,u=a._malloc(h),r.push(u),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,h),u)}let _=a.stackSave(),y=a.stackAlloc(4*c.length);try{c.forEach((x,$)=>a.setValue(y+$*l,x,l===4?"i32":"i64"));let g=a._OrtCreateTensor(Zt(d),u,h,y,c.length,Xn(m));g===0&&pe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(g)}finally{a.stackRestore(_)}},zr=async(e,t,r,n,o,i)=>{let a=Ie(),l=a.PTR_SIZE,d=kt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],m=d[1],u=d[2],h=d[3],_=d[4],y=d[5],g=t.length,x=n.length,$=0,v=[],S=[],T=[],C=[],A=a.stackSave(),P=a.stackAlloc(g*l),O=a.stackAlloc(g*l),U=a.stackAlloc(x*l),G=a.stackAlloc(x*l);try{a.jsepOnRunStart?.(c),[$,v]=Wa(i);for(let W=0;W<g;W++)nc(r[W],S,C,e,t[W],_);for(let W=0;W<x;W++)nc(o[W],T,C,e,g+n[W],_);for(let W=0;W<g;W++)a.setValue(P+W*l,S[W],"*"),a.setValue(O+W*l,m[t[W]],"*");for(let W=0;W<x;W++)a.setValue(U+W*l,T[W],"*"),a.setValue(G+W*l,u[n[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:Y,outputPreferredLocationsEncoded:se}=h;if(m.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${m.length}).`);for(let X=0;X<g;X++){let re=t[X];await a._OrtBindInput(W,m[re],S[X])!==0&&pe(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<x;X++){let re=n[X];o[X]?.[3]?a._OrtBindOutput(W,u[re],T[X],0)!==0&&pe(`Can't bind pre-allocated output[${X}] for session=${e}.`):a._OrtBindOutput(W,u[re],0,se[re])!==0&&pe(`Can't bind output[${X}] to ${Y[X]} for session=${e}.`)}kt.set(e,[c,m,u,h,_,!0])}let q;h?q=await a._OrtRunWithBinding(c,h.handle,x,U,$):q=await a._OrtRun(c,O,P,g,G,x,U,$),q!==0&&pe("failed to call OrtRun().");let K=[];for(let W=0;W<x;W++){let Y=Number(a.getValue(U+W*l,"*"));if(Y===T[W]){K.push(o[W]);continue}let se=a.stackSave(),X=a.stackAlloc(4*l),re=!1,ee,ne=0;try{a._OrtGetTensorData(Y,X,X+l,X+2*l,X+3*l)!==0&&pe(`Can't access output tensor data on index ${W}.`);let Be=l===4?"i32":"i64",$e=Number(a.getValue(X,Be));ne=a.getValue(X+l,"*");let de=a.getValue(X+l*2,"*"),V=Number(a.getValue(X+l*3,Be)),j=[];for(let _e=0;_e<V;_e++)j.push(Number(a.getValue(de+_e*l,Be)));a._OrtFree(de)!==0&&pe("Can't free memory for tensor dims.");let he=j.reduce((_e,be)=>_e*be,1);ee=gt($e);let Ge=h?.outputPreferredLocations[n[W]];if(ee==="string"){if(Ge==="gpu-buffer"||Ge==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let _e=[];for(let be=0;be<he;be++){let Ke=a.getValue(ne+be*l,"*"),Lt=a.getValue(ne+(be+1)*l,"*"),bn=be===he-1?void 0:Lt-Ke;_e.push(a.UTF8ToString(Ke,bn))}K.push([ee,j,_e,"cpu"])}else if(Ge==="gpu-buffer"&&he>0){let _e=a.jsepGetBuffer;if(!_e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=_e(ne),Ke=Tt($e,he);if(Ke===void 0||!Ur(ee))throw new Error(`Unsupported data type: ${ee}`);re=!0,K.push([ee,j,{gpuBuffer:be,download:a.jsepCreateDownloader(be,Ke,ee),dispose:()=>{a._OrtReleaseTensor(Y)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(Ge==="ml-tensor"&&he>0){let _e=a.jsepEnsureTensor;if(!_e)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt($e,he)===void 0||!Nr(ee))throw new Error(`Unsupported data type: ${ee}`);let Ke=await _e(ne,$e,j,!1);re=!0,K.push([ee,j,{mlTensor:Ke,download:a.jsepCreateMLTensorDownloader(ne,ee),dispose:()=>{a.jsepReleaseTensorId(ne),a._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let _e=Rr(ee),be=new _e(he);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(a.HEAPU8.subarray(ne,ne+be.byteLength)),K.push([ee,j,be,"cpu"])}}finally{a.stackRestore(se),ee==="string"&&ne&&a._free(ne),re||a._OrtReleaseTensor(Y)}}return h&&!_&&(a._OrtClearBoundOutputs(h.handle)!==0&&pe("Can't clear bound outputs."),kt.set(e,[c,m,u,h,_,!1])),K}finally{a.stackRestore(A),S.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),C.forEach(q=>a._free(q)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(q=>a._free(q))}},Or=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&pe("Can't get an profile file name."),t._OrtFree(o)},Br=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,Le,or,mn,fn,pn,zo,Oo,Vt,Wt,pg,oc,ic,ac,sc,uc,lc,dc,Bo=R(()=>{"use strict";We();Kn();ht();jt();Et=()=>!!we.wasm.proxy&&typeof document<"u",or=!1,mn=!1,fn=!1,Oo=new Map,Vt=(e,t)=>{let r=Oo.get(e);r?r.push(t):Oo.set(e,[t])},Wt=()=>{if(or||!mn||fn||!Le)throw new Error("worker not ready")},pg=e=>{switch(e.data.type){case"init-wasm":or=!1,e.data.err?(fn=!0,zo[1](e.data.err)):(mn=!0,zo[0]()),pn&&(URL.revokeObjectURL(pn),pn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Oo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},oc=async()=>{if(!mn){if(or)throw new Error("multiple calls to 'initWasm()' detected.");if(fn)throw new Error("previous call to 'initWasm()' failed.");if(or=!0,Et())return new Promise((e,t)=>{Le?.terminate(),Ua().then(([r,n])=>{try{Le=n,Le.onerror=i=>t(i),Le.onmessage=pg,zo=[e,t];let o={type:"init-wasm",in:we};Le.postMessage(o),pn=r}catch(o){t(o)}},t)});try{await Cr(we.wasm),await Ar(we),mn=!0}catch(e){throw fn=!0,e}finally{or=!1}}},ic=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:we}};Le.postMessage(n)});await kr(we,e)},ac=async e=>Et()?(Wt(),new Promise((t,r)=>{Vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Le.postMessage(n,[e.buffer])})):Kt(e),sc=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wt(),new Promise((r,n)=>{Vt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Le.postMessage(o,i)})}else return Er(e,t)},uc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("release",[t,r]);let n={type:"release",in:e};Le.postMessage(n)});Pr(e)},lc=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wt(),new Promise((a,l)=>{Vt("run",[a,l]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Le.postMessage(c,Br(d))})}else return zr(e,t,r,n,o,i)},dc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Le.postMessage(n)});Or(e)}});var cc,mg,hn,pc=R(()=>{"use strict";We();Bo();te();Ir();Jn();cc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},mg=e=>{switch(e[3]){case"cpu":return new Oe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Oe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Nr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Oe.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},hn=class{async fetchModelAndCopyToWasmMemory(t){return ac(await Xt(t))}async loadModel(t,r){Ue();let n;typeof t=="string"?!1?n=await Xt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await sc(n,r),De()}async dispose(){return uc(this.sessionId)}async run(t,r,n){Ue();let o=[],i=[];Object.entries(t).forEach(h=>{let _=h[0],y=h[1],g=this.inputNames.indexOf(_);if(g===-1)throw new Error(`invalid input '${_}'`);o.push(y),i.push(g)});let a=[],l=[];Object.entries(r).forEach(h=>{let _=h[0],y=h[1],g=this.outputNames.indexOf(_);if(g===-1)throw new Error(`invalid output '${_}'`);a.push(y),l.push(g)});let d=o.map((h,_)=>cc(h,()=>`input "${this.inputNames[i[_]]}"`)),c=a.map((h,_)=>h?cc(h,()=>`output "${this.outputNames[l[_]]}"`):null),m=await lc(this.sessionId,i,d,l,c,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[l[h]]]=a[h]??mg(m[h]);return De(),u}startProfiling(){}endProfiling(){dc(this.sessionId)}}});var fc={};Ft(fc,{OnnxruntimeWebAssemblyBackend:()=>gn,initializeFlags:()=>mc,wasmBackend:()=>fg});var mc,gn,fg,hc=R(()=>{"use strict";We();Bo();pc();jt();mc=()=>{if((typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0),we.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let e=typeof navigator>"u"?Gn("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},gn=class{async init(t){mc(),await oc(),await ic(t)}async createInferenceSessionHandler(t,r){let n=new hn;return await n.loadModel(t,r),Promise.resolve(n)}},fg=new gn});We();We();We();var ka="1.21.0";var b1=jn;{let e=(hc(),br(fc)).wasmBackend;xt("webgpu",e,5),xt("webnn",e,5),xt("cpu",e,10),xt("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:ka,enumerable:!0});export{Np as InferenceSession,xr as TRACE,Ue as TRACE_FUNC_BEGIN,De as TRACE_FUNC_END,Oe as Tensor,Wp as TrainingSession,b1 as default,we as env,xt as registerBackend};
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
