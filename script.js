// CHANGE THIS to your real business email before publishing.
const BUSINESS_EMAIL = 'hello@example.com';
const $ = (selector) => document.querySelector(selector);
const menuToggle = $('#menuToggle');
menuToggle.addEventListener('click', () => { const open = $('#nav').classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '✕' : '☰'; });
document.querySelectorAll('#nav a').forEach(link => link.addEventListener('click', () => { $('#nav').classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰'; }));
$('#year').textContent = new Date().getFullYear();
const finishes = {black:['#25282d','#e3e4df'],white:['#e5e3df','#373b3b'],sage:['#718c80','#edf5e9'],copper:['#a06e5a','#f8e3c8']};
let currentFinish = 'black';
const engraving = $('#engraveText');
function updatePreview(){ const value = engraving.value.trim() || 'YOUR NAME'; $('#previewName').textContent = value.toUpperCase(); $('#charCount').textContent = `${engraving.value.length} / 18`; }
engraving.addEventListener('input', updatePreview);updatePreview();
document.querySelectorAll('.swatch').forEach(btn => btn.addEventListener('click', () => {currentFinish=btn.dataset.finish;document.querySelectorAll('.swatch').forEach(s => {s.classList.toggle('active',s===btn);s.setAttribute('aria-pressed',String(s===btn));});$('#previewTumbler').style.setProperty('--cup',finishes[currentFinish][0]);$('#previewTumbler').style.setProperty('--engrave',finishes[currentFinish][1]);}));
function emailLink(subject,body){if(BUSINESS_EMAIL==='hello@example.com'){showToast('Set your business email in script.js first.');return;}window.location.href=`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}
let toastTimeout;function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),3500);}
$('#sendDesign').addEventListener('click',()=>emailLink('Lazarly custom tumbler inquiry',`Hello Lazarly,\n\nI am interested in a custom tumbler.\nEngraving: ${engraving.value.trim()||'YOUR NAME'}\nFinish: ${currentFinish}\n\nPlease let me know what options are available.`));
// These figures are example estimates only. Replace them with your actual pricing before relying on them.
const prices={tumbler:{label:'tumblers',min:15,max:20},ornament:{label:'ornaments',min:8,max:13},coaster:{label:'coasters',min:7,max:11},other:{label:'items',min:12,max:25}};
const money = value => '$'+Math.round(value).toLocaleString('en-US');
function updateEstimate(){const type=$('#itemType').value;const qty=Number($('#quantity').value);const unique=$('#personalize').checked;const item=prices[type];const discount=qty>=50?.78:qty>=25?.85:qty>=10?.95:1;const add=unique?2:0;const low=qty*(item.min*discount+add);const high=qty*(item.max*discount+add);$('#qtyDisplay').textContent=qty===100?'100+':qty;$('#priceEstimate').textContent=`${money(low)}–${money(high)}`;$('#unitEstimate').textContent=`For ${qty===100?'100+':qty} ${item.label}. Final pricing depends on materials, artwork, and order details.`;}
['input','change'].forEach(event=>{$('#quantity').addEventListener(event,updateEstimate);$('#itemType').addEventListener(event,updateEstimate);$('#personalize').addEventListener(event,updateEstimate);});updateEstimate();
$('#quoteButton').addEventListener('click',()=>emailLink('Lazarly custom order quote request',`Hello Lazarly,\n\nI'd like a quote for:\nProduct: ${$('#itemType').selectedOptions[0].text}\nQuantity: ${$('#quantity').value}${Number($('#quantity').value)===100?' or more':''}\nUnique personalization: ${$('#personalize').checked?'Yes':'No'}\n\nPlease let me know the next steps.`));
$('#contactForm').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);emailLink(`Lazarly inquiry: ${form.get('interest')}`,`Name: ${form.get('name')}\nEmail: ${form.get('email')}\nInterested in: ${form.get('interest')}\n\n${form.get('message')}`);});
