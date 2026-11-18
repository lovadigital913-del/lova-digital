(() => {
  const admin = document.querySelector('#admin .adminwrap');
  if (!admin) return;
  const fixedWhatsAppUrl = 'https://wa.me/message/DJ3HTYS4GPDIC1';
  // Hidden owner shortcut: tap the brand logo five times within 2 seconds.
  let logoTaps = 0;
  let logoTapTimer;
  document.querySelector('.brand')?.addEventListener('click', event => {
    logoTaps += 1;
    clearTimeout(logoTapTimer);
    logoTapTimer = setTimeout(() => { logoTaps = 0; }, 2000);
    if (logoTaps >= 5) {
      event.preventDefault();
      event.stopPropagation();
      logoTaps = 0;
      document.querySelector('[data-page="admin"]')?.click();
    }
  }, true);
  const configured = window.LOVA_SUPABASE_URL && window.LOVA_SUPABASE_KEY &&
    !String(window.LOVA_SUPABASE_URL).includes('YOUR_') &&
    !String(window.LOVA_SUPABASE_KEY).includes('YOUR_');

  const loginBox = document.createElement('div');
  loginBox.className = 'adminbox';
  loginBox.id = 'sharedLogin';
  loginBox.innerHTML = '<h2>بەڕێوەبردنی هاوبەش</h2><p class="hint" id="sharedStatus"></p>' +
    '<div class="formgrid" id="loginFields"><input class="field" id="ownerEmail" type="email" autocomplete="username" placeholder="ئیمەیڵی بەڕێوەبەر">' +
    '<input class="field" id="ownerPassword" type="password" autocomplete="current-password" placeholder="وشەی نهێنی بەڕێوەبەر">' +
    '<button class="btn solid" id="ownerLogin">چوونەژوورەوە</button></div>' +
    '<button class="btn" id="ownerLogout" style="display:none">چوونەدەرەوە</button>';
  admin.querySelector('.pagehead').after(loginBox);
  const homeBox = document.createElement('div');
  homeBox.className = 'adminbox';
  homeBox.innerHTML = '<h2>✦ دەستکاریکردنی پەڕەی سەرەکی</h2><p class="hint">سەردێڕ، وەسف، دوگمە و وێنەی گەورەی سەرەتا بگۆڕە؛ پاشان پاشەکەوتی بکە بۆ ئەوەی لە ماڵپەڕی خەڵکیش نوێ ببێتەوە.</p><div class="formgrid"><input class="field" id="homeEyebrow" placeholder="دەقی بچوکی سەرەوە"><input class="field" id="homeTitleFirst" placeholder="ڕیزی یەکەمی سەردێڕ"><input class="field" id="homeTitleAccent" placeholder="ڕیزی دووەمی سەردێڕ"><input class="field" id="homeBadgeOne" placeholder="بەشی بچوکی سەر وێنە"><input class="field" id="homeBadgeTwo" placeholder="بەشی بچوکی خوار وێنە"><input class="field" id="homeButtonWork" placeholder="دەقی دوگمەی کارەکان"><input class="field" id="homeButtonContact" placeholder="دەقی دوگمەی پەیوەندی"><input class="field" id="homeImageUrl" placeholder="لینکی وێنەی سەرەکی (ئارەزوومەندانە)"><textarea class="field" id="homeDescription" placeholder="وەسفی پەڕەی سەرەکی"></textarea><input class="field upload-field" id="homeImageFile" type="file" accept="image/*" aria-label="هەڵبژاردنی وێنەی سەرەکی"><button class="btn solid" id="saveHome">پاشەکەوتکردنی پەڕەی سەرەکی</button></div>';
  loginBox.after(homeBox);
  const textGroups = [
    ['پەڕەی سەرەکی', [['homeNav','ناوی پەڕە لە مینیو'],['servicesEyebrow','سەردێڕی بچوکی خزمەتگوزاری'],['servicesTitle','سەردێڕی خزمەتگوزاری'],['servicesDescription','کورتەی خزمەتگوزاری'],['serviceGraphicTitle','ناوی خزمەتی گرافیک'],['serviceGraphicText','وەسفی خزمەتی گرافیک'],['serviceWebTitle','ناوی خزمەتی وێبسایت'],['serviceWebText','وەسفی خزمەتی وێبسایت'],['serviceDigitalTitle','ناوی خزمەتی دیجیتاڵ'],['serviceDigitalText','وەسفی خزمەتی دیجیتاڵ'],['homeCtaTitle','سەردێڕی کۆتایی پەڕە'],['homeCtaText','دەقی کۆتایی پەڕە'],['platformsEyebrow','سەردێڕی پلاتفۆرمەکان'],['platformsTitle','ناونیشانی بەشی پلاتفۆرمەکان'],['platformsSubtitle','دەقی بەشی پلاتفۆرمەکان']]],
    ['پەڕەی گرافیک دیزاین', [['graphicsNav','ناوی لە مینیو'],['graphicsEyebrow','سەردێڕی بچووک'],['graphicsTitle','ناونیشانی پەڕە'],['graphicsSubtitle','کورتەی پەڕە']]],
    ['پەڕەی وێبسایت', [['websitesNav','ناوی لە مینیو'],['websitesEyebrow','سەردێڕی بچووک'],['websitesTitle','ناونیشانی پەڕە'],['websitesSubtitle','کورتەی پەڕە']]],
    ['پەڕەی پەیوەندی', [['contactNav','ناوی لە مینیو'],['contactEyebrow','سەردێڕی بچووک'],['contactTitle','ناونیشانی پەڕە'],['contactSubtitle','کورتەی پەڕە'],['contactBoxTitle','ناونیشانی خانەی پەیوەندی'],['contactBoxText','دەقی خانەی پەیوەندی']]]
  ];
  const longTextKeys = new Set(['servicesDescription','serviceGraphicText','serviceWebText','serviceDigitalText','homeCtaText','platformsSubtitle','graphicsSubtitle','websitesSubtitle','contactSubtitle','contactBoxText']);
  const pageTextBox = document.createElement('div');
  pageTextBox.className = 'adminbox';
  pageTextBox.id = 'pageCopyBox';
  pageTextBox.innerHTML = '<h2>✎ دەستکاریکردنی ناو و دەقی پەڕەکان</h2><p class="hint">ناوی مینیو، سەردێڕ و دەقی پەڕەکان بگۆڕە؛ پەیوەندی هەمیشە لە دوای پەڕە نوێکان دەمێنێتەوە.</p>' + textGroups.map(([title, fields]) => `<section class="page-copy-group"><h3>${title}</h3><div class="formgrid">${fields.map(([key,label]) => `<label class="page-copy-field"><span>${label}</span>${longTextKeys.has(key)?`<textarea class="field" id="pagecopy-${key}"></textarea>`:`<input class="field" id="pagecopy-${key}">`}</label>`).join('')}</div></section>`).join('') + '<button class="btn solid" id="savePageCopy">پاشەکەوتکردنی دەقەکان</button>';
  homeBox.after(pageTextBox);
  const customPagesBox = document.createElement('div');
  customPagesBox.className = 'adminbox';
  customPagesBox.innerHTML = '<h2>＋ زیادکردنی پەڕەی نوێ</h2><p class="hint">جۆری پەڕە هەڵبژێرە؛ ئایکۆنی گونجاو خۆکار دادەنرێت. پەیوەندی هەمیشە لە کۆتایی مینیو دەمێنێتەوە.</p><div class="formgrid"><input class="field" id="newPageTitle" placeholder="ناوی پەڕە"><input class="field" id="newPageNav" placeholder="ناوی کورت بۆ مینیو (ئارەزوومەندانە)"><select class="field" id="newPageIcon"><option value="website">وێبسایت · ئایکۆنی شاشە</option><option value="graphics">گرافیک · ئایکۆنی پەلێت</option><option value="portfolio">پۆرتفۆلیۆ · ئایکۆنی پەڕگە</option><option value="services">خزمەتگوزاری · ئایکۆنی بیرۆکە</option><option value="shop">فرۆشگا · ئایکۆنی سەبەتە</option><option value="contact">پەیوەندی · ئایکۆنی گفتوگۆ</option><option value="general">پەڕەی گشتی · ئایکۆنی خانە</option></select><input class="field" id="newPageEyebrow" placeholder="دەقی بچوکی سەرەوە"><input class="field" id="newPageSubtitle" placeholder="کورتەی پەڕە"><input class="field" id="newPageImageUrl" placeholder="لینکی وێنە (ئارەزوومەندانە)"><textarea class="field" id="newPageContent" placeholder="دەقی ناو پەڕە"></textarea><input class="field upload-field" id="newPageImageFile" type="file" accept="image/*" aria-label="وێنەی پەڕەی نوێ"><button class="btn solid" id="addCustomPage">زیادکردنی پەڕە</button></div><h3>پەڕە زیادکراوەکان</h3><div class="adminlist" id="adminCustomPages"></div>';
  pageTextBox.after(customPagesBox);
  const customManager = document.createElement('div');
  customManager.className = 'adminbox';
  customManager.id = 'customPageManager';
  customManager.innerHTML = '<h2>✦ لیست و نموونەی پەڕە نوێکان</h2><p class="hint">پەڕەیەک هەڵبژێرە، لیستی نوێ دروست بکە و نموونەی وێنەدار زیاد بکە.</p><div class="formgrid"><select class="field" id="manageCustomPage"></select><div class="formgrid"><input class="field" id="newCustomCategory" placeholder="ناوی لیستی نوێ، وەک لۆگۆ"><button class="btn" id="addCustomCategory">＋ زیادکردنی لیست</button></div><div class="adminlist" id="customCategoryRows"></div><h3>＋ زیادکردنی نموونە</h3><select class="field" id="customSampleCategory"></select><input class="field" id="customSampleTitle" placeholder="ناوی نموونە"><input class="field" id="customSampleImageUrl" placeholder="لینکی وێنە (ئارەزوومەندانە)"><input class="field upload-field" id="customSampleImageFile" type="file" accept="image/*" aria-label="وێنەی نموونە"><textarea class="field" id="customSampleDesc" placeholder="کورتەی نموونە"></textarea><input class="field" id="customSampleLink" placeholder="لینکی وێبسایت (ئارەزوومەندانە)"><button class="btn solid" id="addCustomSample">زیادکردنی نموونە</button></div><h3>نموونەکانی ئەم پەڕەیە</h3><div class="adminlist" id="customSampleRows"></div>';
  customPagesBox.after(customManager);
  const pageAdminStyle = document.createElement('style');
  pageAdminStyle.textContent = '.page-copy-group{padding:14px 0;border-top:1px solid #ffffff14}.page-copy-group h3{color:#d8b5ff}.page-copy-field{display:grid;gap:6px;color:#c9c0d2;font-size:13px}.page-copy-field textarea{min-height:68px}.custom-page-content{margin-bottom:30px}';
  document.head.append(pageAdminStyle);
  ['gCategory', 'sCategory'].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const kind = id === 'gCategory' ? 'graphics' : 'sites';
    const group = document.createElement('div');
    group.className = 'category-control';
    select.parentNode.insertBefore(group, select);
    group.append(select);
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'delete';
    removeButton.textContent = 'لابردنی جۆری هەڵبژێردراو';
    removeButton.addEventListener('click', () => {
      const lists = kind === 'graphics' ? graphicLists : websiteLists;
      const index = lists.indexOf(select.value);
      if (index < 0) return toast('جۆرێک هەڵبژێرە بۆ لابردن.');
      document.querySelector(`[data-list-remove="${kind}"][data-index="${index}"]`)?.click();
    });
    group.append(removeButton);
  });
  const categoryStyle = document.createElement('style');
  categoryStyle.textContent = '.category-control{display:grid;gap:8px;min-width:0}.category-control .field{width:100%}';
  document.head.append(categoryStyle);
  admin.querySelector('.pagehead .sub').textContent = 'لە بەڕێوەبردنەوە ناوەڕۆکی پەڕەی سەرەکی، نموونەکان و پلاتفۆرمەکان بگۆڕە؛ پاشەکەوتەکان لە Supabase هەڵدەگیرێن و لە ماڵپەڕی گشتی نوێ دەبنەوە.';
  const oldLocalHint = [...admin.querySelectorAll('.hint')].find(element => element.textContent.includes('پاراستنی خۆجێییە'));
  if (oldLocalHint) oldLocalHint.textContent = 'ناوەڕۆکەکان لە Supabase پاشەکەوت دەکرێن و لە هەموو ئامێرێکەوە بەڕێوە دەبرێن.';
  let adminNoticeBox = null;
  if (oldLocalHint) {
    adminNoticeBox = document.createElement('div');
    adminNoticeBox.className = 'adminbox';
    oldLocalHint.replaceWith(adminNoticeBox);
    adminNoticeBox.append(oldLocalHint);
  }
  const makerBox = admin.querySelector('.list-maker')?.closest('.adminbox');
  let graphicCategoryBox = null;
  let websiteCategoryBox = null;
  if (makerBox) {
    const makeCategoryBox = (id, title, note) => {
      const box = document.createElement('div');
      box.className = 'adminbox';
      box.innerHTML = `<h2>${title}</h2><p class="hint">${note}</p>`;
      const section = document.getElementById(id)?.closest('section');
      if (section) {
        section.querySelector('h3')?.remove();
        box.append(section);
      }
      return box;
    };
    graphicCategoryBox = makeCategoryBox('graphicListTags', 'بەڕێوەبردنی جۆرەکانی گرافیک', 'جۆری نوێ زیاد بکە، ناوی جۆرێک بگۆڕە، یان لایببە. نموونەکانت بەجێ دەمێنن.');
    websiteCategoryBox = makeCategoryBox('siteListTags', 'بەڕێوەبردنی جۆرەکانی وێبسایت', 'جۆری نوێ زیاد بکە، ناوی جۆرێک بگۆڕە، یان لایببە. نموونەکانت بەجێ دەمێنن.');
    makerBox.replaceWith(graphicCategoryBox, websiteCategoryBox);
  }
  document.getElementById('pUrl')?.insertAdjacentHTML('afterend', '<input class="field upload-field" id="pImageFile" type="file" accept="image/*" aria-label="بارکردنی وێنەی پلاتفۆرم">');
  const bulkShareBox = document.createElement('div');
  bulkShareBox.className = 'adminbox';
  bulkShareBox.id = 'bulkShareBox';
  bulkShareBox.innerHTML = '<h2>شیرکردنی نموونەکان</h2><p class="hint">نموونەکان هەڵبژێرە؛ دوای ئامادەبوونی وێنەکان تەنها دوگمەی شیرکردن دابگرە و لە لیستی ئەپەکانت Telegram یان پلاتفۆرمێکی تر هەڵبژێرە. دەقی هەر نموونەیەک بە ڕیز لە کپشن دێت و لە بەستەری کۆمەڵەکە لە ژێر وێنەی خۆی دەردەکەوێت. Telegram لە ئەلبومی چەند وێنەییدا تەنها یەک کپشن هەیە. بۆ ناردن لە چەناڵی Telegram، چەناڵەکەت لە Telegram هەڵبژێرە. هەر جار تا ١٠ نموونە.</p><div class="bulk-share-toolbar"><button class="btn" type="button" id="selectAllSamples">هەموو نموونەکان هەڵبژێرە</button><button class="btn" type="button" id="clearSelectedSamples">پاککردنەوەی هەڵبژاردن</button><span class="hint" id="selectedSamplesCount">هیچ نموونەیەک هەڵنەبژێردراوە</span></div><label class="bulk-share-caption-label" for="bulkShareCaption">دەقی پۆست</label><textarea class="field" id="bulkShareCaption" placeholder="دەقی پۆست بنووسە؛ لینکی نموونەکان خۆکارانە زیاد دەکرێت."></textarea><div class="bulk-share-actions"><button class="btn" type="button" id="saveSampleShareText" disabled>پاشەکەوتی دەقی نموونەی هەڵبژێردراو</button><button class="btn solid" type="button" id="shareBulkSamples" disabled>شیرکردنی نموونە هەڵبژێردراو</button></div><p class="hint" id="bulkShareStatus" aria-live="polite">نموونەکان هەڵبژێرە بۆ ئامادەکردنی خۆکار.</p>';
  const status = document.getElementById('sharedStatus');
  const loginFields = document.getElementById('loginFields');
  const loginButton = document.getElementById('ownerLogin');
  const protectedBoxes = [...admin.querySelectorAll('.adminbox')].filter(box => box !== loginBox);
  const adminStyle = document.createElement('style');
  adminStyle.textContent = '.admin-sections-toolbar{position:sticky;top:12px;z-index:8;display:flex;align-items:center;gap:12px;padding:12px 14px;margin:18px 0;border:1px solid #ffffff20;border-radius:16px;background:#111018ed;backdrop-filter:blur(14px)}.admin-sections-toggle{display:inline-flex;align-items:center;gap:10px;border:1px solid #bc70ff66;border-radius:12px;padding:10px 15px;background:#a855f71b;color:white;font-weight:700}.admin-sections-toggle .hamburger{font-size:22px;line-height:1}.admin-sections-current{color:#d8b5ff;font-size:14px;font-weight:700}.admin-sections-menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin:0 0 18px;padding:12px;border:1px solid #ffffff1b;border-radius:16px;background:#111018}.admin-sections-menu[hidden],.admin-section-panel[hidden]{display:none!important}.admin-sections-menu button{border:1px solid #ffffff1b;border-radius:11px;padding:10px 14px;background:#191621;color:#ddd5e5;text-align:right}.admin-sections-menu button[aria-current="page"]{border-color:#b65eff88;background:#a855f72b;color:#f1d8ff}.admin-section-panel>.adminbox:first-child{margin-top:0}.admin-section-panel>.adminbox:last-child{margin-bottom:0}.bulk-share-toolbar,.bulk-share-actions,.sample-list-share-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:14px 0}.sample-list-share-actions{padding-top:12px;border-top:1px solid #ffffff16}.bulk-share-caption-label{display:block;color:#e5d7f0;font-weight:700;margin:18px 0 8px}.bulk-share-caption{min-height:120px}.admin-sample-select{accent-color:#a855f7;width:19px;height:19px;vertical-align:middle;margin-inline-end:9px}.sample-select-all{display:flex;align-items:center;gap:8px;margin:0 0 10px;padding:10px 13px;border:1px solid #ffffff18;border-radius:11px;background:#191621;color:#e0d9e9}.adminrow-sample-info{display:flex;align-items:center;gap:10px;min-width:0}.adminrow-sample-info>span{min-width:0}.admin-sample-actions{display:flex;gap:8px;align-items:center;flex:none}@media(max-width:600px){.admin-sections-toolbar{top:8px}.admin-sections-menu{grid-template-columns:1fr}.bulk-share-toolbar,.bulk-share-actions,.sample-list-share-actions{align-items:stretch;flex-direction:column}.bulk-share-toolbar button,.bulk-share-actions button,.sample-list-share-actions button{width:100%}.adminrow-sample-info{flex:1}.admin-sample-actions{width:100%;justify-content:flex-end}.adminrow.has-share{align-items:flex-start}}';
  document.head.append(adminStyle);
  const sections = [
    { id:'home', title:'پەڕەی سەرەکی', description:'وێنە و دەقی سەرەکیی وێبسایت بگۆڕە.', boxes:[homeBox] },
    { id:'copy', title:'دەق و ناوی پەڕەکان', description:'سەردێڕ و دەقی پەڕەکان ڕێکبخە.', boxes:[pageTextBox] },
    { id:'pages', title:'پەڕە و نموونەی تایبەت', description:'پەڕەی نوێ و نموونەکانی بەڕێوەببە.', boxes:[customPagesBox, customManager] },
    { id:'graphics', title:'گرافیک دیزاین', description:'نموونە، جۆر و گۆڕانکارییە پەیوەندیدارەکانی گرافیک.', boxes:[] },
    { id:'websites', title:'وێبسایت', description:'نموونە و جۆرەکانی وێبسایت بەڕێوەببە.', boxes:[] },
    { id:'contact', title:'پەیوەندی و پلاتفۆرمەکان', description:'لینک و زانیاریی پەیوەندی بگۆڕە.', boxes:[] },
    { id:'sharing', title:'شیرکردن بۆ Telegram', description:'نموونەکان هەڵبژێرە و وێنەیان بۆ چەناڵەکەت بنێرە.', boxes:[bulkShareBox] }
  ];
  protectedBoxes.forEach(box => {
    if (box === homeBox || box === pageTextBox || box === customPagesBox || box === customManager || box === adminNoticeBox) {
      if (box === adminNoticeBox) sections[0].boxes.push(box);
    } else if (box.querySelector('#pName, #adminPlatforms')) {
      sections[5].boxes.push(box);
    } else if (box.querySelector('#gTitle, #adminGraphics, #graphicListTags')) {
      sections[3].boxes.push(box);
    } else if (box.querySelector('#sTitle, #adminSites, #siteListTags')) {
      sections[4].boxes.push(box);
    } else if (box === bulkShareBox) {
      sections[6].boxes.push(box);
    } else {
      sections[1].boxes.push(box);
    }
  });
  const sectionToolbar = document.createElement('div');
  sectionToolbar.className = 'admin-sections-toolbar';
  sectionToolbar.innerHTML = '<button class="admin-sections-toggle" type="button" aria-expanded="false" aria-controls="adminSectionsMenu"><span class="hamburger" aria-hidden="true">☰</span><span>بەشەکان</span></button><span class="admin-sections-current" id="adminSectionCurrent">گرافیک دیزاین</span>';
  loginBox.after(sectionToolbar);
  const sectionMenu = document.createElement('nav');
  sectionMenu.id = 'adminSectionsMenu';
  sectionMenu.className = 'admin-sections-menu';
  sectionMenu.hidden = true;
  sectionMenu.setAttribute('aria-label', 'بەشەکانی بەڕێوەبردن');
  const sectionPanels = new Map();
  let activeSectionId = 'graphics';
  sections.forEach((section, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.dataset.adminSection = section.id;
    option.setAttribute('aria-current', section.id === activeSectionId ? 'page' : 'false');
    option.textContent = section.title;
    sectionMenu.append(option);
    const panel = document.createElement('section');
    panel.className = 'admin-section-panel';
    panel.dataset.adminPanel = section.id;
    panel.hidden = section.id !== activeSectionId;
    const heading = document.createElement('div');
    heading.className = 'adminbox';
    heading.innerHTML = `<h2>${safe(section.title)}</h2><p class="hint">${safe(section.description)}</p>`;
    panel.append(heading);
    section.boxes.forEach(box => panel.append(box));
    sectionPanels.set(section.id, panel);
  });
  sectionToolbar.after(sectionMenu);
  sections.forEach(section => sectionMenu.after(sectionPanels.get(section.id)));
  const sectionToggle = sectionToolbar.querySelector('.admin-sections-toggle');
  sectionToggle.addEventListener('click', () => {
    sectionMenu.hidden = !sectionMenu.hidden;
    sectionToggle.setAttribute('aria-expanded', String(!sectionMenu.hidden));
  });
  sectionMenu.addEventListener('click', event => {
    const option = event.target.closest('[data-admin-section]');
    if (!option) return;
    sections.forEach(section => {
      const selected = section.id === option.dataset.adminSection;
      activeSectionId = option.dataset.adminSection;
      sectionPanels.get(section.id).hidden = !selected;
      sectionMenu.querySelector(`[data-admin-section="${section.id}"]`).setAttribute('aria-current', selected ? 'page' : 'false');
    });
    document.getElementById('adminSectionCurrent').textContent = sections.find(section => section.id === option.dataset.adminSection).title;
    sectionMenu.hidden = true;
    sectionToggle.setAttribute('aria-expanded', 'false');
    sectionToolbar.scrollIntoView({ behavior:'smooth', block:'start' });
  });
  let db = null;
  let ownerSignedIn = false;
  let contentLoaded = false;

  function setAccess() {
    protectedBoxes.forEach(box => box.style.display = ownerSignedIn ? '' : 'none');
    loginFields.style.display = ownerSignedIn ? 'none' : 'grid';
    document.getElementById('ownerLogout').style.display = ownerSignedIn ? '' : 'none';
    sectionToolbar.style.display = ownerSignedIn ? 'flex' : 'none';
    sectionMenu.hidden = true;
    sectionToggle.setAttribute('aria-expanded', 'false');
    sectionPanels.forEach((panel, id) => { panel.hidden = !ownerSignedIn || id !== activeSectionId; });
    if (!ownerSignedIn) {
      bulkPreparationVersion++;
      clearTimeout(bulkPreparationTimer);
      clearPreparedShare();
    }
    updateBulkShareControls();
    refreshViewerShareButton();
  }
  function refreshLists(cats) {
    ownerCategories = cats || { graphics: [], sites: [] };
    graphicLists = ownerCategories.managed
      ? [...new Set(ownerCategories.graphics || [])]
      : [...new Set([...graphicBase, ...(ownerCategories.graphics || [])])];
    websiteLists = ownerCategories.managed
      ? [...new Set(ownerCategories.sites || [])]
      : [...new Set([...allowedWebsiteTypes, ...(ownerCategories.sites || [])])];
    refreshOwnerControls();
    renderOwnerListTags();
  }
  async function loadContent() {
    const { data: row, error } = await db.from('lova_site_content').select('content').eq('id', 'main').single();
    if (error) throw error;
    const value = row.content || {};
    data.graphics = Array.isArray(value.graphics) ? value.graphics : [];
    data.sites = Array.isArray(value.sites) ? value.sites : [];
    data.platforms = Array.isArray(value.platforms) ? value.platforms : [];
    data.home = { ...homeDefaults, ...(value.home || {}) };
    data.pageSettings = { ...pageSettingsDefaults, ...(value.pageSettings || {}) };
    data.customPages = Array.isArray(value.customPages) ? value.customPages : [];
    const whatsApp = data.platforms.find(item => /whatsapp|واتسئاپ|واتساپ/i.test(item.name || '') || /wa\.me/i.test(item.url || ''));
    if (whatsApp) { whatsApp.name = 'WhatsApp'; whatsApp.url = fixedWhatsAppUrl; }
    else data.platforms.unshift({ name: 'WhatsApp', url: fixedWhatsAppUrl });
    const telegram = data.platforms.find(item => /telegram|تیلیگرام/i.test(item.name || '') || /t\.me/i.test(item.url || ''));
    if (!telegram) data.platforms.push({ name: 'Telegram', url: 'https://t.me/share/url' });
    refreshLists(value.categories);
    contentLoaded = true;
    fillHomeForm();
    fillPageCopyForm();
    render();
  }
  function fillHomeForm() {
    const h = data.home || homeDefaults;
    [['homeEyebrow','eyebrow'],['homeTitleFirst','titleFirst'],['homeTitleAccent','titleAccent'],['homeDescription','description'],['homeImageUrl','image'],['homeBadgeOne','badgeOne'],['homeBadgeTwo','badgeTwo'],['homeButtonWork','buttonWork'],['homeButtonContact','buttonContact']].forEach(([id,key]) => { const input = document.getElementById(id); if (input) input.value = h[key] || ''; });
  }
  function fillPageCopyForm() {
    const settings = data.pageSettings || pageSettingsDefaults;
    Object.keys(pageSettingsDefaults).forEach(key => {
      const input = document.getElementById(`pagecopy-${key}`);
      if (input) input.value = settings[key] || '';
    });
  }
  async function uploadImages(items, group) {
    for (const item of items) {
      if (!item.image || !item.image.startsWith('data:image/')) continue;
      const blob = await (await fetch(item.image)).blob();
      if (blob.size > 5 * 1024 * 1024) throw new Error('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
      const ext = (blob.type.split('/')[1] || 'png').replace('jpeg', 'jpg').replace(/[^a-z0-9]/gi, '');
      const unique = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const path = `${group}/${unique}.${ext}`;
      const { error } = await db.storage.from('lova-images').upload(path, blob, { contentType: blob.type, upsert: false });
      if (error) throw error;
      item.image = db.storage.from('lova-images').getPublicUrl(path).data.publicUrl;
    }
  }
  async function publish() {
    if (!ownerSignedIn) throw new Error('owner sign in required');
    if (!contentLoaded) throw new Error('Supabase content has not loaded; refusing to overwrite shared content.');
    clearPreparedShare();
    await uploadImages(data.graphics, 'graphics');
    await uploadImages(data.sites, 'websites');
    await uploadImages(data.platforms, 'platforms');
    for (const page of data.customPages) await uploadImages(page.samples || [], `custom-pages/${page.id}`);
    await uploadImages(data.customPages, 'custom-pages');
    if (data.home?.image?.startsWith('data:image/')) await uploadImages([data.home], 'home');
    const content = {
      graphics: data.graphics,
      sites: data.sites,
      platforms: data.platforms,
      home: data.home,
      pageSettings: data.pageSettings,
      customPages: data.customPages,
      categories: ownerCategories
    };
    const { data: updated, error } = await db.from('lova_site_content')
      .update({ content, updated_at: new Date().toISOString() }).eq('id', 'main').select('id');
    if (error) throw error;
    if (!updated?.length) throw new Error('ڕێگەی نووسینی داتا پێشتر ڕێکنەخراوە.');
    [...data.graphics, ...data.sites].forEach(item => unsavedSampleShareIds.delete(item));
    render();
    toast('گۆڕانکارییەکان بۆ هەموو سەردانکەران پاشەکەوت کران.');
  }

  // All add/edit/delete controls use this shared save path, including contact platforms.
  save = function () {
    if (!ownerSignedIn) {
      toast('سەرەتا بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.');
      return Promise.resolve(false);
    }
    return publish().then(() => true).catch(error => {
      console.error(error);
      const detail = String(error?.message || error?.details || error?.hint || 'هەڵەی نەناسراو').replace(/\s+/g, ' ').slice(0, 150);
      toast(`پاشەکەوت نەکرا: ${detail}`);
      return false;
    });
  };
  const selectedSamples = new Set();
  const adminRowShareFiles = new WeakMap();
  const adminRowSharePending = new WeakMap();
  let preparedBulkShare = null;
  let bulkPreparationTimer = null;
  let bulkPreparationVersion = 0;
  let bulkCaptionEdited = false;
  const unsavedSampleShareIds = new WeakSet();
  const makeShareId = () => globalThis.crypto?.randomUUID?.() || `sample-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  function ensureSampleShareId(item) {
    if (!item.shareId) {
      item.shareId = makeShareId();
      unsavedSampleShareIds.add(item);
    }
    return item.shareId;
  }
  function findSample(kind, shareId) {
    return data[kind]?.find(item => ensureSampleShareId(item) === shareId);
  }
  function updateBulkShareControls() {
    const count = document.getElementById('selectedSamplesCount');
    const saveTextButton = document.getElementById('saveSampleShareText');
    const shareButton = document.getElementById('shareBulkSamples');
    const items = [...selectedSamples].map(key => {
      const [kind, shareId] = key.split(':');
      const item = findSample(kind, shareId);
      return item ? { kind, shareId, item } : null;
    }).filter(Boolean);
    if (count) count.textContent = items.length ? `${items.length} نموونە هەڵبژێردراوە${items.length > 10 ? ` · لەم جارەدا ١٠ دانە دەبنێردرێن` : ''}` : 'هیچ نموونەیەک هەڵنەبژێردراوە';
    if (saveTextButton) saveTextButton.disabled = !ownerSignedIn || items.length !== 1;
    if (shareButton) shareButton.disabled = !ownerSignedIn || !preparedBulkShare;
    document.querySelectorAll('[data-share-selected]').forEach(button => { button.disabled = !ownerSignedIn || !preparedBulkShare; });
    return items;
  }
  function clearPreparedShare() {
    preparedBulkShare = null;
    const button = document.getElementById('shareBulkSamples');
    if (button) button.disabled = true;
  }
  function scheduleBulkPreparation() {
    clearTimeout(bulkPreparationTimer);
    const version = ++bulkPreparationVersion;
    clearPreparedShare();
    const statusText = document.getElementById('bulkShareStatus');
    const selected = updateBulkShareControls();
    if (!selected.length) {
      statusText.textContent = 'نموونەکان هەڵبژێرە بۆ ئامادەکردنی خۆکار.';
      return;
    }
    if (!ownerSignedIn) {
      statusText.textContent = 'بۆ ئامادەکردنی شیرکردن، بە Supabase وەک بەڕێوەبەر بچۆ ژوورەوە.';
      return;
    }
    statusText.textContent = 'وێنەکان خۆکارانە ئامادە دەکرێن...';
    bulkPreparationTimer = setTimeout(() => prepareBulkShare(version), 250);
  }
  function sampleCaption(item) {
    const text = item.shareText || [item.title, item.desc].filter(Boolean).join('\n');
    return String(text).split(/\r?\n/).filter(line => !/#sample=.*&kind=(graphics|sites)/.test(line)).join('\n').trim();
  }
  ['graphics', 'sites'].forEach(kind => {
    const list = document.getElementById(kind === 'graphics' ? 'adminGraphics' : 'adminSites');
    if (!list) return;
    const actions = document.createElement('div');
    actions.className = 'sample-list-share-actions';
    actions.innerHTML = `<span class="hint">نموونە چێککراوەکان بە وێنە و دەقی تایبەتی هەر یەک شیر بکە.</span><button class="btn solid" type="button" data-share-selected="${kind}" disabled>شیرکردنی هەڵبژێردراوەکان</button>`;
    list.after(actions);
    actions.querySelector('button').addEventListener('click', sharePreparedSamples);
  });
  adminRows = function (kind, id) {
    const isSampleList = kind === 'graphics' || kind === 'sites';
    document.getElementById(id).innerHTML = data[kind].map((item, i) => {
      if (!isSampleList) return `<div class="adminrow"><span>${item.image ? `<img src="${safe(item.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-inline-end:8px">` : ''}${safe(item.title || item.name)} <span class="hint">${safe(item.category || item.url || '')}</span></span><span><button class="btn" data-edit="${kind}" data-index="${i}">دەستکاری</button> <button class="delete" data-remove="${kind}" data-index="${i}">لابردن</button></span></div>`;
      const shareId = ensureSampleShareId(item);
      const selected = selectedSamples.has(`${kind}:${shareId}`);
      return `<div class="adminrow"><span class="adminrow-sample-info"><input class="admin-sample-select" type="checkbox" data-sample-select="${kind}" data-share-id="${safe(shareId)}" aria-label="هەڵبژاردنی ${safe(item.title || 'نموونە')}" ${selected ? 'checked' : ''}>${item.image ? `<img src="${safe(item.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:8px">` : ''}<span>${safe(item.title || item.name)} <span class="hint">${safe(item.category || '')}</span></span></span><span class="admin-sample-actions"><button class="btn" type="button" data-row-share="${kind}" data-index="${i}" ${ownerSignedIn ? '' : 'disabled'}>شیرکردن</button><button class="btn" data-edit="${kind}" data-index="${i}">دەستکاری</button><button class="delete" data-remove="${kind}" data-index="${i}">لابردن</button></span></div>`;
    }).join('') || '<span class="hint">هیچ دانەیەک نییە.</span>';
    updateBulkShareControls();
  };
  admin.addEventListener('change', event => {
    const checkbox = event.target.closest('[data-sample-select]');
    if (!checkbox) return;
    const key = `${checkbox.dataset.sampleSelect}:${checkbox.dataset.shareId}`;
    if (checkbox.checked) selectedSamples.add(key);
    else selectedSamples.delete(key);
    const items = updateBulkShareControls();
    scheduleBulkPreparation();
    const caption = document.getElementById('bulkShareCaption');
    if (caption && items.length === 1) {
      caption.value = sampleCaption(items[0].item);
      bulkCaptionEdited = false;
    } else if (caption && items.length > 1 && !bulkCaptionEdited) {
      caption.value = 'نموونەکانمان، بە وێنە و کورتەی وەسف.';
    }
  });
  document.getElementById('selectAllSamples').addEventListener('click', () => {
    ['graphics', 'sites'].forEach(kind => (data[kind] || []).forEach(item => selectedSamples.add(`${kind}:${ensureSampleShareId(item)}`)));
    if (!bulkCaptionEdited && selectedSamples.size > 1) document.getElementById('bulkShareCaption').value = 'نموونەکانمان، بە وێنە و کورتەی وەسف.';
    render();
    scheduleBulkPreparation();
  });
  document.getElementById('clearSelectedSamples').addEventListener('click', () => {
    selectedSamples.clear();
    bulkPreparationVersion++;
    clearTimeout(bulkPreparationTimer);
    clearPreparedShare();
    document.getElementById('bulkShareCaption').value = '';
    bulkCaptionEdited = false;
    render();
    scheduleBulkPreparation();
  });
  document.getElementById('bulkShareCaption').addEventListener('input', () => {
    bulkCaptionEdited = true;
    if (!preparedBulkShare) return;
    const items = updateBulkShareControls().slice(0, 10);
    const link = items.length === 1 ? sampleShareLink(items[0].kind, items[0].item) : collectionShareLink(items);
    preparedBulkShare.text = document.getElementById('bulkShareCaption').value.trim();
    preparedBulkShare.caption = [preparedBulkShare.text, link].filter(Boolean).join('\n');
    preparedBulkShare.url = link;
  });
  function sampleShareLink(kind, item) {
    const base = 'https://lovadigital913-del.github.io/lova-digital/';
    return `${base}#sample=${encodeURIComponent(ensureSampleShareId(item))}&kind=${kind}`;
  }
  function collectionShareLink(items) {
    const base = 'https://lovadigital913-del.github.io/lova-digital/';
    const ids = items.map(({ kind, item }) => `${kind}~${ensureSampleShareId(item)}`).join(',');
    return `${base}#collection=${encodeURIComponent(ids)}`;
  }
  function bulkShareCaption(items, text, link) {
    if (items.length === 1) return [text || sampleCaption(items[0].item), link].filter(Boolean).join('\n\n');
    const details = items.map(({ item }, index) => {
      const description = sampleCaption(item) || item.desc || '';
      return `${index + 1}. ${item.title || 'نموونە'}${description ? `\n${description}` : ''}`;
    });
    const fullCaption = [text, ...details, link].filter(Boolean).join('\n\n');
    return fullCaption.length <= 1024
      ? fullCaption
      : [text, 'دەقی هەر نموونەیەک لە ژێر وێنەکەی لە بەستەری کۆمەڵەکە ببینە.', link].filter(Boolean).join('\n\n');
  }
  function shareImageUrl(kind, item, index) {
    return item.image || (kind === 'graphics' ? sampleGraphic(index % 6) : finalSitePreview(item));
  }
  async function createShareFile(item, kind, index) {
    const response = await fetch(shareImageUrl(kind, item, index));
    if (!response.ok) throw new Error(`وێنەی «${item.title || 'نموونە'}» بار نەکرا (${response.status}).`);
    let blob = await response.blob();
    if (blob.type === 'image/svg+xml') {
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width || 960;
      canvas.height = bitmap.height || 560;
      canvas.getContext('2d').drawImage(bitmap, 0, 0);
      bitmap.close();
      blob = await new Promise((resolve, reject) => canvas.toBlob(result => result ? resolve(result) : reject(new Error('گۆڕینی وێنە بۆ PNG سەرکەوتوو نەبوو.')), 'image/png'));
    }
    if (!blob.type.startsWith('image/')) throw new Error(`فایلی وێنەی «${item.title || 'نموونە'}» جۆری دروستی نییە.`);
    const filename = `${String(item.title || 'sample').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').slice(0, 70) || 'sample'}.${blob.type.split('/')[1].replace('jpeg', 'jpg')}`;
    return new File([blob], filename, { type: blob.type });
  }
  function adminRowShareButton(kind, index) {
    return admin.querySelector(`[data-row-share="${kind}"][data-index="${index}"]`);
  }
  async function prepareAdminRowShare(item, kind, index, reportError) {
    const prepared = adminRowShareFiles.get(item);
    if (prepared) return prepared;
    const pending = adminRowSharePending.get(item);
    if (pending) return pending;
    const button = adminRowShareButton(kind, index);
    if (button) {
      button.textContent = 'وێنەکە ئامادە دەکرێت...';
    }
    const preparation = createShareFile(item, kind, index).then(file => {
      adminRowShareFiles.set(item, file);
      return file;
    }).catch(error => {
      console.error(error);
      const currentButton = adminRowShareButton(kind, index);
      if (currentButton) {
        currentButton.disabled = !ownerSignedIn;
        currentButton.textContent = 'دووبارە هەوڵبدە';
        currentButton.title = String(error?.message || 'ئامادەکردنی وێنە سەرکەوتوو نەبوو.');
      }
      if (reportError) toast(`ئامادەکردنی وێنە سەرکەوتوو نەبوو: ${String(error?.message || 'هەڵەی نەناسراو').slice(0, 120)}`);
      return null;
    }).finally(() => adminRowSharePending.delete(item));
    adminRowSharePending.set(item, preparation);
    const file = await preparation;
    const currentButton = adminRowShareButton(kind, index);
    if (file && currentButton) {
      currentButton.disabled = !ownerSignedIn;
      currentButton.textContent = 'شیرکردن';
      currentButton.title = '';
    }
    return file;
  }
  async function shareAdminRowSample(button) {
    const kind = button.dataset.rowShare;
    const index = Number(button.dataset.index);
    const item = data[kind]?.[index];
    if (!item || !ownerSignedIn) return;
    let file = adminRowShareFiles.get(item);
    const wasPrepared = Boolean(file);
    if (!file) {
      file = await prepareAdminRowShare(item, kind, index, true);
      if (!file) return;
    }
    ensureSampleShareId(item);
    if (unsavedSampleShareIds.has(item)) {
      if (!(await save(kind))) return;
      toast('بەستەری نموونەکە پاشەکەوت کرا؛ دووبارە دوگمەی شیرکردن دابگرە بۆ ناردن.');
      return;
    }
    if (!wasPrepared) {
      toast('وێنەکە ئامادەیە؛ دووبارە دوگمەی شیرکردن دابگرە بۆ ناردن.');
      return;
    }
    const caption = [item.title, sampleCaption(item)].filter(Boolean).join('\n');
    const link = sampleShareLink(kind, item);
    const text = [caption, link].filter(Boolean).join('\n');
    if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
      let copiedLink = Promise.resolve(false);
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          copiedLink = navigator.clipboard.writeText(link).then(() => true).catch(error => {
            console.warn('Could not copy sample link for sharing.', error);
            return false;
          });
        } catch (error) {
          console.warn('Could not copy sample link for sharing.', error);
        }
      }
      try {
        await navigator.share({ files: [file], title: item.title || 'Lova Digital', text: caption, url: link });
        const linkWasCopied = await copiedLink;
        toast(linkWasCopied
          ? 'وێنە و دەق هاوبەش کران و لینکی نموونە کۆپی کرا؛ ئەگەر لە کپشنی Telegram نەبوو، لە کپشنەکە دایبنێ.'
          : 'وێنە و دەق هاوبەش کران؛ لە پێشبینینی Telegram دڵنیابە لینکەکەش لە کپشنەکەدایە.');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error(error);
      }
    }
    const telegramWindow = window.open('about:blank', '_blank');
    const imageUrl = URL.createObjectURL(file);
    const download = document.createElement('a');
    download.href = imageUrl;
    download.download = file.name;
    download.click();
    setTimeout(() => URL.revokeObjectURL(imageUrl), 60000);
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (error) {
      console.warn('Could not copy sample share text.', error);
    }
    const destination = new URL('https://t.me/share/url');
    destination.searchParams.set('url', link);
    destination.searchParams.set('text', caption);
    if (telegramWindow) telegramWindow.location.href = destination.href;
    toast(`وێنەکە دابەزێنرا${copied ? ' و دەقەکە کۆپی کرا' : ''}؛ لە Telegram وێنەکە هاوپێچ بکە.`);
  }
  admin.addEventListener('pointerover', event => {
    if (event.relatedTarget instanceof Node && event.target.contains(event.relatedTarget)) return;
    const button = event.target.closest('[data-row-share]');
    if (!button || !ownerSignedIn) return;
    const kind = button.dataset.rowShare;
    const index = Number(button.dataset.index);
    const item = data[kind]?.[index];
    if (item && !adminRowShareFiles.has(item)) prepareAdminRowShare(item, kind, index, false);
  });
  admin.addEventListener('focusin', event => {
    const button = event.target.closest('[data-row-share]');
    if (!button || !ownerSignedIn) return;
    const kind = button.dataset.rowShare;
    const index = Number(button.dataset.index);
    const item = data[kind]?.[index];
    if (item && !adminRowShareFiles.has(item)) prepareAdminRowShare(item, kind, index, false);
  });
  admin.addEventListener('click', event => {
    const button = event.target.closest('[data-row-share]');
    if (button) shareAdminRowSample(button);
  });
  let viewerShareState = null;
  let viewerShareVersion = 0;
  function refreshViewerShareButton() {
    const actions = document.getElementById('sampleViewerActions');
    if (!actions) return;
    let button = actions.querySelector('[data-viewer-share]');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn solid';
      button.dataset.viewerShare = '';
      button.textContent = 'ئامادەکردنی شیرکردن...';
      button.addEventListener('click', shareViewerSample);
      actions.append(button);
    }
    button.hidden = !ownerSignedIn;
    button.disabled = !ownerSignedIn || !viewerShareState?.file;
    if (ownerSignedIn && viewerShareState && !viewerShareState.file && !viewerShareState.loading) {
      prepareViewerShare(viewerShareState, viewerShareVersion);
    }
  }
  async function prepareViewerShare(state, version) {
    state.loading = true;
    const button = document.querySelector('#sampleViewerActions [data-viewer-share]');
    if (button) {
      button.disabled = true;
      button.textContent = 'وێنەکە ئامادە دەکرێت...';
    }
    try {
      if ((state.kind === 'graphics' || state.kind === 'sites') && unsavedSampleShareIds.has(state.item)) {
        ensureSampleShareId(state.item);
        await publish();
      }
      const file = await createShareFile({ ...state.item, image: state.imageUrl }, state.kind, state.index);
      if (version !== viewerShareVersion || state !== viewerShareState) return;
      state.file = file;
      if (button) {
        button.disabled = false;
        button.textContent = 'شیرکردنی ئەم وێنە و دەقە';
      }
    } catch (error) {
      console.error(error);
      if (version !== viewerShareVersion || state !== viewerShareState) return;
      if (button) {
        button.disabled = true;
        button.textContent = 'ئامادەکردنی وێنە سەرکەوتوو نەبوو';
        button.title = String(error?.message || 'هەڵەی نەناسراو');
      }
    } finally {
      state.loading = false;
    }
  }
  function setViewerShareSample(item, kind, index, imageUrl) {
    viewerShareVersion++;
    viewerShareState = { item, kind, index, imageUrl, caption: sampleCaption(item), file: null, loading: false };
    const description = document.getElementById('sampleViewerDescription');
    if (description && viewerShareState.caption) description.textContent = viewerShareState.caption;
    refreshViewerShareButton();
  }
  document.addEventListener('click', event => {
    const sampleButton = event.target.closest('[data-sample-kind]');
    if (sampleButton) {
      const kind = sampleButton.dataset.sampleKind;
      const index = Number(sampleButton.dataset.sampleIndex);
      const item = data[kind]?.[index];
      if (!item) return;
      const imageUrl = shareImageUrl(kind, item, index);
      setViewerShareSample(item, kind, index, imageUrl);
      return;
    }
    const customButton = event.target.closest('[data-custom-sample-page]');
    if (customButton) {
      const page = data.customPages.find(item => item.id === customButton.dataset.customSamplePage);
      const index = Number(customButton.dataset.customSampleIndex);
      const item = page?.samples?.[index];
      if (item) setViewerShareSample(item, 'custom', index, item.image || page.image || 'logo.png');
    }
  });
  const viewerActions = document.getElementById('sampleViewerActions');
  if (viewerActions) new MutationObserver(refreshViewerShareButton).observe(viewerActions, { childList: true });
  async function shareViewerSample() {
    const share = viewerShareState;
    if (!ownerSignedIn || !share?.file) return;
    const link = share.kind === 'graphics' || share.kind === 'sites' ? sampleShareLink(share.kind, share.item) : '';
    const text = [share.item.title, share.caption, link].filter(Boolean).join('\n');
    if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [share.file] })) {
      try {
        await navigator.share({ files: [share.file], title: share.item.title || 'Lova Digital', text });
        toast('وێنە و دەقی ئەم نموونەیە هاوبەش کران.');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
          toast(`هاوبەشکردن سەرکەوتوو نەبوو: ${String(error?.message || 'هەڵەی نەناسراو').slice(0, 120)}`);
        }
      }
      return;
    }
    const telegramWindow = window.open('about:blank', '_blank');
    const imageUrl = URL.createObjectURL(share.file);
    const download = document.createElement('a');
    download.href = imageUrl;
    download.download = share.file.name;
    download.click();
    setTimeout(() => URL.revokeObjectURL(imageUrl), 60000);
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (error) {
      console.warn('Could not copy sample share text.', error);
    }
    const destination = new URL('https://t.me/share/url');
    destination.searchParams.set('url', link || location.href);
    destination.searchParams.set('text', text);
    if (telegramWindow) telegramWindow.location.href = destination.href;
    toast(`وێنەکە دابەزێنرا${copied ? ' و دەقەکە کۆپی کرا' : ''}؛ لە Telegram وێنەکە هاوپێچ بکە.`);
  }
  async function prepareBulkShare(version) {
    const statusText = document.getElementById('bulkShareStatus');
    const button = document.getElementById('shareBulkSamples');
    const selected = updateBulkShareControls().slice(0, 10);
    if (!ownerSignedIn || !selected.length) return;
    const captionField = document.getElementById('bulkShareCaption');
    const link = selected.length === 1 ? sampleShareLink(selected[0].kind, selected[0].item) : collectionShareLink(selected);
    const text = captionField.value.trim();
    const caption = bulkShareCaption(selected, text, link);
    if (caption.length > 1024) {
      statusText.textContent = 'دەقی پۆست لەگەڵ لینک نابێت لە ١٠٢٤ پیت زیاتر بێت.';
      return;
    }
    button.disabled = true;
    statusText.textContent = 'وێنەکان ئامادە دەکرێن...';
    try {
      for (const { item } of selected) ensureSampleShareId(item);
      await publish();
      if (version !== bulkPreparationVersion) return;
      const files = await Promise.all(selected.map(({ kind, item }) => createShareFile(item, kind, data[kind].indexOf(item))));
      if (version !== bulkPreparationVersion) return;
      preparedBulkShare = { files, caption, text, keys: selected.map(({ kind, shareId }) => `${kind}:${shareId}`), url: link };
      updateBulkShareControls();
      statusText.textContent = `${files.length} وێنە ئامادەن. دوگمەی شیرکردن دابگرە و Telegram یان پلاتفۆرمێکی تر هەڵبژێرە.`;
    } catch (error) {
      console.error(error);
      if (version !== bulkPreparationVersion) return;
      statusText.textContent = `ئامادەکردن سەرکەوتوو نەبوو: ${String(error?.message || 'هەڵەی نەناسراو').slice(0, 180)}`;
    }
  }
  document.getElementById('saveSampleShareText').addEventListener('click', async () => {
    const items = updateBulkShareControls();
    if (items.length !== 1) return;
    items[0].item.shareText = document.getElementById('bulkShareCaption').value.trim();
    if (await save(items[0].kind)) toast('دەقی نموونە پاشەکەوت کرا.');
  });
  async function sharePreparedSamples() {
    if (!ownerSignedIn || !preparedBulkShare) return;
    const share = preparedBulkShare;
    const statusText = document.getElementById('bulkShareStatus');
    const nativeShareAvailable = typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: share.files });
    if (nativeShareAvailable) {
      try {
        await navigator.share({ files: share.files, title: 'نموونەکانی Lova Digital', text: share.caption });
        share.keys.forEach(key => selectedSamples.delete(key));
        clearPreparedShare();
        render();
        statusText.textContent = 'هاوبەشکردن تەواو بوو.';
        scheduleBulkPreparation();
      } catch (error) {
        if (error.name === 'AbortError') {
          statusText.textContent = 'هاوبەشکردن هەڵوەشێندرایەوە؛ هەڵبژاردنەکەت پارێزراوە.';
          return;
        }
        console.error(error);
        statusText.textContent = 'هاوبەشکردنی ڕاستەوخۆ کار نەکرد؛ وێنەکان دادەبەزێنرێن بۆ هاوپێچکردنی دەستی.';
        downloadShareFallback(share, statusText);
      }
      return;
    }
    downloadShareFallback(share, statusText);
  }
  document.getElementById('shareBulkSamples').addEventListener('click', sharePreparedSamples);
  async function downloadShareFallback(share, statusText) {
    const telegramWindow = window.open('about:blank', '_blank');
    share.files.forEach(file => {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    });
    let copied = false;
    try {
      await navigator.clipboard.writeText(share.caption);
      copied = true;
    } catch (error) {
      console.warn('Could not copy Telegram post text.', error);
    }
    const text = share.caption.split(share.url).join('').trim();
    if (telegramWindow) telegramWindow.location.href = `https://t.me/share/url?url=${encodeURIComponent(share.url)}&text=${encodeURIComponent(text)}`;
    statusText.textContent = `وێنەکان دابەزێنران${copied ? ' و دەقی پۆست کۆپی کرا' : ''}. لە Telegram وێنەکان هاوپێچ بکە و بۆ چەناڵ بنێرە؛ هەڵبژاردنەکە دەمێنێتەوە.`;
  }
  function platformShareUrl(platform, text, imageUrl) {
    const name = String(platform?.name || '').toLowerCase();
    const encodedText = encodeURIComponent(text);
    const publicImage = /^https?:\/\//i.test(imageUrl) ? imageUrl : location.href;
    if (/whatsapp|واتسئاپ|واتساپ/.test(name)) {
      const base = safePlatformHref(platform.url || fixedWhatsAppUrl) || fixedWhatsAppUrl;
      const url = new URL(base);
      url.searchParams.set('text', text);
      return url.href;
    }
    if (/telegram/.test(name)) return `https://t.me/share/url?url=${encodeURIComponent(publicImage)}&text=${encodedText}`;
    if (/facebook/.test(name)) return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicImage)}&quote=${encodedText}`;
    if (/twitter|(^|\s)x($|\s)/i.test(name)) return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(publicImage)}`;
    if (/linkedin/.test(name)) return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicImage)}`;
    return safePlatformHref(platform.url || '');
  }
  admin.addEventListener('input', event => {
    const field = event.target.closest('[data-share-copy]');
    if (!field) return;
    const item = data[field.dataset.shareCopy]?.[Number(field.dataset.index)];
    if (item) item.shareText = field.value;
  });
  admin.addEventListener('click', async event => {
    const saveButton = event.target.closest('[data-share-save]');
    const shareButton = event.target.closest('[data-share-sample]');
    const button = saveButton || shareButton;
    if (!button || !ownerSignedIn) return;
    const kind = button.dataset.shareSave || button.dataset.shareSample;
    const index = Number(button.dataset.index);
    const item = data[kind]?.[index];
    const textField = admin.querySelector(`[data-share-copy="${kind}"][data-index="${index}"]`);
    if (!item || !textField) return;
    let text = textField.value.trim();
    if (kind === 'graphics' || kind === 'sites') {
      const deepLink = sampleShareLink(kind, item);
      if (!text.includes(deepLink)) text = `${text}${text ? '\n' : ''}${deepLink}`;
    }
    item.shareText = text;
    if (saveButton) {
      if (await save(kind)) toast('دەقی شیرکردن پاشەکەوت کرا.');
      return;
    }
    const platformSelect = admin.querySelector(`[data-share-platform="${kind}"][data-index="${index}"]`);
    const platform = data.platforms?.[Number(platformSelect?.value)];
    if (!platform) return toast('سەرەتا پلاتفۆرمێک زیاد بکە.');
    const imageUrl = item.image || (kind === 'graphics' ? sampleGraphic(index % 6) : finalSitePreview(item));
    const destination = platformShareUrl(platform, text, imageUrl);
    if (!destination) return toast('لینکی ئەم پلاتفۆرمە دروست نییە.');
    if (!(await save(kind))) return;
    let blob = null;
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`Image request failed: ${response.status}`);
      blob = await response.blob();
    } catch (error) {
      console.warn('Could not load sample image for sharing.', error);
    }
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `${item.title || 'sample'}.${(blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`, { type: blob.type || 'image/jpeg' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: item.title || '', text });
          return;
        } catch (error) {
          if (error.name === 'AbortError') return;
          console.warn('Native sharing was unavailable; using the download fallback.', error);
        }
      }
    }
    if (blob) {
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${item.title || 'sample'}.${(blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } else {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (error) {
      console.warn('Could not copy sample share text.', error);
    }
    window.open(destination, '_blank', 'noopener,noreferrer');
    if (blob) toast(copied ? 'وێنەکە دابەزێنرا و دەقەکە کۆپی کرا؛ لە پلاتفۆرمەکە هاوپێچی بکە.' : 'وێنەکە دابەزێنرا؛ دەقەکە لە خانەکەوە کۆپی بکە و هاوپێچی بکە.');
    else toast(copied ? 'وێنەکە لە پەڕەیەکی نوێ کراوەتەوە و دەقەکە کۆپی کرا؛ وێنەکە لەوێ دابەزێنە.' : 'وێنەکە لە پەڕەیەکی نوێ کراوەتەوە؛ دەقەکە لە خانەکەوە کۆپی بکە.');
  });
  function activeCustomPage() { return data.customPages.find(page => page.id === document.getElementById('manageCustomPage').value); }
  function renderCustomPageManager() {
    const pages = data.customPages || [], pageSelect = document.getElementById('manageCustomPage');
    const selected = pageSelect.value;
    pageSelect.innerHTML = pages.map(page => `<option value="${safe(page.id)}">${safe(page.title)}</option>`).join('') || '<option value="">سەرەتا پەڕەیەکی نوێ زیاد بکە</option>';
    if (pages.some(page => page.id === selected)) pageSelect.value = selected;
    const page = activeCustomPage();
    const cats = page?.categories || [];
    document.getElementById('customCategoryRows').innerHTML = cats.map((name, i) => `<div class="adminrow"><span>${safe(name)}</span><button class="delete" data-custom-category-remove="${i}">لابردن</button></div>`).join('') || '<span class="hint">لیستێک زیاد بکە.</span>';
    document.getElementById('customSampleCategory').innerHTML = cats.map(name => `<option value="${safe(name)}">${safe(name)}</option>`).join('') || '<option value="">سەرەتا لیست دروست بکە</option>';
    document.getElementById('customSampleCategory').disabled = !page || !cats.length;
    document.getElementById('addCustomSample').disabled = !page || !cats.length;
    document.getElementById('customSampleRows').innerHTML = (page?.samples || []).map((sample, i) => `<div class="adminrow"><span>${sample.image ? `<img src="${safe(sample.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-inline-end:8px">` : ''}${safe(sample.title)} <span class="hint">${safe(sample.category || '')}</span></span><span><button class="btn" data-custom-sample-edit="${i}">دەستکاری</button> <button class="delete" data-custom-sample-remove="${i}">لابردن</button></span></div>`).join('') || '<span class="hint">هێشتا نموونە زیاد نەکراوە.</span>';
  }
  document.getElementById('manageCustomPage').addEventListener('change', renderCustomPageManager);
  document.getElementById('addCustomCategory').addEventListener('click', () => {
    const page = activeCustomPage(), input = document.getElementById('newCustomCategory'), name = input.value.trim();
    if (!page) return toast('پەڕەیەک هەڵبژێرە یان پەڕەی نوێ زیاد بکە.');
    if (!name) return toast('ناوی لیستەکە بنووسە.');
    page.categories = page.categories || [];
    if (page.categories.some(value => value.toLowerCase() === name.toLowerCase())) return toast('ئەم لیستە پێشتر هەیە.');
    page.categories.push(name); input.value = ''; renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
  });
  document.getElementById('addCustomSample').addEventListener('click', () => {
    const page = activeCustomPage(), title = document.getElementById('customSampleTitle').value.trim(), file = document.getElementById('customSampleImageFile').files?.[0];
    if (!page) return toast('پەڕەیەک هەڵبژێرە.');
    if (!(page.categories || []).length) return toast('سەرەتا لیستێک دروست بکە.');
    if (!title) return toast('ناوی نموونەکە بنووسە.');
    if (file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) return toast('وێنەی دروست و بچووکتر لە ٥ مێگابایت هەڵبژێرە.');
    const add = image => {
      page.samples = page.samples || [];
      page.samples.unshift({ title, category:document.getElementById('customSampleCategory').value, image:image || document.getElementById('customSampleImageUrl').value.trim(), desc:document.getElementById('customSampleDesc').value.trim(), url:document.getElementById('customSampleLink').value.trim() });
      publish().then(() => { ['customSampleTitle','customSampleImageUrl','customSampleImageFile','customSampleDesc','customSampleLink'].forEach(id => document.getElementById(id).value = ''); toast('نموونە زیاد و پاشەکەوت کرا.') }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
    };
    if (!file) return add('');
    const reader = new FileReader(); reader.onload = () => add(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  });
  customManager.addEventListener('click', event => {
    const page = activeCustomPage(); if (!page || !ownerSignedIn) return;
    const removeCategory = event.target.closest('[data-custom-category-remove]');
    if (removeCategory) { const index = Number(removeCategory.dataset.customCategoryRemove), name = page.categories[index]; if (!confirm(`لیستی «${name}» لاببرێت؟ نموونەکان دەمێننەوە و بەبێ جۆر پیشان دەدرێن.`)) return; page.categories.splice(index,1); (page.samples || []).forEach(sample => { if (sample.category === name) sample.category = ''; }); renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); return; }
    const remove = event.target.closest('[data-custom-sample-remove]');
    if (remove) { const index = Number(remove.dataset.customSampleRemove); if (!confirm('ئەم نموونەیە بسڕمەوە؟')) return; page.samples.splice(index,1); renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); return; }
    const edit = event.target.closest('[data-custom-sample-edit]');
    if (edit) { const sample = page.samples[Number(edit.dataset.customSampleEdit)]; if (!sample) return; const title = prompt('ناوی نموونە:', sample.title || ''); if (title === null) return; const category = prompt('ناوی لیست:', sample.category || ''); if (category === null) return; const desc = prompt('کورتەی نموونە:', sample.desc || ''); if (desc === null) return; const url = prompt('لینکی وێبسایت (ئارەزوومەندانە):', sample.url || ''); if (url === null) return; const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ هێشتنەوەی وێنەی ئێستا):', sample.image || ''); if (image === null) return; sample.title=title.trim(); sample.category=category.trim(); sample.desc=desc.trim(); sample.url=url.trim(); if (image.trim()) sample.image=image.trim(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-edit]');
    if (!button || !ownerSignedIn) return;
    const kind = button.dataset.edit, item = data[kind]?.[Number(button.dataset.index)];
    if (!item) return;
    if (kind === 'customPages') {
      const title = prompt('ناوی پەڕە:', item.title || ''); if (title === null) return;
      const navTitle = prompt('ناوی پەڕە لە مینیو:', item.navTitle || item.title || ''); if (navTitle === null) return;
      const eyebrow = prompt('دەقی بچوکی سەرەوە:', item.eyebrow || ''); if (eyebrow === null) return;
      const subtitle = prompt('کورتەی پەڕە:', item.subtitle || ''); if (subtitle === null) return;
      const content = prompt('دەقی ناو پەڕە:', item.content || ''); if (content === null) return;
      const icon = prompt('ئایکۆن: website / graphics / portfolio / services / shop / contact / general', item.icon || 'general'); if (icon === null) return;
      const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ وێنەی پێشوو):', item.image || ''); if (image === null) return;
      item.title = title.trim(); item.navTitle = navTitle.trim(); item.eyebrow = eyebrow.trim(); item.subtitle = subtitle.trim(); item.content = content.trim();
      item.icon = ['website','graphics','portfolio','services','shop','contact','general'].includes(icon.trim()) ? icon.trim() : 'general';
      if (image.trim()) item.image = image.trim();
      save('customPages');
      return;
    }
    const titleKey = kind === 'platforms' ? 'name' : 'title';
    const title = prompt('ناو:', item[titleKey] || ''); if (title === null) return;
    const category = kind === 'platforms' ? item.category : prompt('جۆر/لیست:', item.category || '');
    if (kind !== 'platforms' && category === null) return;
    const link = kind === 'platforms' ? prompt('بەستەری پلاتفۆرم:', item.url || '') : item.url;
    if (kind === 'platforms' && link === null) return;
    const desc = kind === 'platforms' ? item.desc : prompt('کورتەی نموونە:', item.desc || '');
    if (kind !== 'platforms' && desc === null) return;
    const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ وێنەی پێشوو):', item.image || '');
    if (image === null) return;
    item[titleKey] = title.trim();
    if (kind === 'platforms') item.url = link.trim();
    else { item.category = category.trim(); item.desc = desc.trim(); }
    if (image.trim()) item.image = image.trim();
    save(kind);
  });
  document.getElementById('addPlatform').onclick = () => {
    const name = document.getElementById('pName').value.trim();
    let url = document.getElementById('pUrl').value.trim();
    if (!name || !url) return toast('ناو و لینکی پلاتفۆرم بنووسە.');
    if (/whatsapp|واتسئاپ|واتساپ/i.test(name) && /^\+?[\d\s()-]{7,}$/.test(url)) url = 'https://wa.me/' + url.replace(/\D/g, '');
    else if (!/^(https?:|mailto:|tel:)/i.test(url)) url = 'https://' + url;
    const file = document.getElementById('pImageFile').files?.[0];
    const add = image => {
      data.platforms.unshift({ name, url, image });
      save('platforms');
      document.getElementById('pName').value = document.getElementById('pUrl').value = '';
      document.getElementById('pImageFile').value = '';
    };
    if (!file) return add('');
    if (!file.type.startsWith('image/')) return toast('تەنها فایلێکی وێنە هەڵبژێرە.');
    if (file.size > 5 * 1024 * 1024) return toast('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
    const reader = new FileReader(); reader.onload = () => add(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  document.getElementById('saveHome').onclick = () => {
    const h = data.home || (data.home = { ...homeDefaults });
    h.eyebrow = document.getElementById('homeEyebrow').value.trim();
    h.titleFirst = document.getElementById('homeTitleFirst').value.trim();
    h.titleAccent = document.getElementById('homeTitleAccent').value.trim();
    h.description = document.getElementById('homeDescription').value.trim();
    h.badgeOne = document.getElementById('homeBadgeOne').value.trim();
    h.badgeTwo = document.getElementById('homeBadgeTwo').value.trim();
    h.buttonWork = document.getElementById('homeButtonWork').value.trim();
    h.buttonContact = document.getElementById('homeButtonContact').value.trim();
    h.image = document.getElementById('homeImageUrl').value.trim() || h.image || 'logo.png';
    const file = document.getElementById('homeImageFile').files?.[0];
    const finish = () => publish().then(() => { document.getElementById('homeImageFile').value = ''; fillHomeForm(); }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || 'هەڵەی نەناسراو').slice(0,120)}`));
    if (!file) return finish();
    if (!file.type.startsWith('image/')) return toast('تەنها فایلێکی وێنە هەڵبژێرە.');
    if (file.size > 5 * 1024 * 1024) return toast('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
    const reader = new FileReader(); reader.onload = () => { h.image = String(reader.result); finish(); }; reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  document.getElementById('savePageCopy').onclick = () => {
    const settings = data.pageSettings || (data.pageSettings = { ...pageSettingsDefaults });
    Object.keys(pageSettingsDefaults).forEach(key => { const field = document.getElementById(`pagecopy-${key}`); if (field) settings[key] = field.value.trim(); });
    publish().then(() => toast('ناو و دەقی پەڕەکان پاشەکەوت کران.')).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
  };
  document.getElementById('addCustomPage').onclick = () => {
    const title = document.getElementById('newPageTitle').value.trim();
    if (!title) return toast('ناوی پەڕەکە بنووسە.');
    const imageUrl = document.getElementById('newPageImageUrl').value.trim();
    const file = document.getElementById('newPageImageFile').files?.[0];
    if (file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) return toast('وێنەی دروست و بچووکتر لە ٥ مێگابایت هەڵبژێرە.');
    const addPage = image => {
      data.customPages.unshift({ id:`page-${Date.now().toString(36)}`, title, navTitle:document.getElementById('newPageNav').value.trim()||title, icon:document.getElementById('newPageIcon').value, eyebrow:document.getElementById('newPageEyebrow').value.trim(), subtitle:document.getElementById('newPageSubtitle').value.trim(), content:document.getElementById('newPageContent').value.trim(), image:image||imageUrl, categories:[], samples:[] });
      renderCustomPageManager();
      publish().then(() => { ['newPageTitle','newPageNav','newPageEyebrow','newPageSubtitle','newPageImageUrl','newPageContent','newPageImageFile'].forEach(id=>{document.getElementById(id).value=''}); toast('پەڕەی نوێ زیاد و پاشەکەوت کرا.') }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
    };
    if (!file) return addPage('');
    const reader = new FileReader(); reader.onload = () => addPage(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  const originalRender = render;
  render = function () {
    originalRender();
    adminRows('customPages', 'adminCustomPages');
    renderCustomPageManager();
    document.querySelectorAll('#contactPlatforms .platform').forEach((element, i) => {
      const platform = data.platforms[i];
      if (platform?.image) element.innerHTML = `<img src="${safe(platform.image)}" alt="" style="width:26px;height:26px;object-fit:cover;border-radius:7px;vertical-align:middle;margin-inline-end:7px">${safe(platform.name)}`;
    });
  };
  ['makeGraphicList', 'makeSiteList'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => setTimeout(() => {
      if (ownerSignedIn) publish().catch(() => toast('لیستەکە پاشەکەوت نەکرا.'));
    }, 0));
  });

  if (!configured || !window.supabase?.createClient) {
    status.textContent = 'پڕۆژەی Supabase پەیوەست نییە. بۆ چالاککردنی بەڕێوەبردن، settings لە supabase-config.js دابنێ.';
    setAccess();
    return;
  }
  db = window.supabase.createClient(window.LOVA_SUPABASE_URL, window.LOVA_SUPABASE_KEY);
  setAccess();
  loginButton.disabled = true;
  status.textContent = 'داتاکان لە Supabase بار دەکرێن...';

  loginButton.addEventListener('click', async () => {
    if (!contentLoaded) return toast('تکایە چاوەڕێ بکە داتاکان بار ببن.');
    const email = document.getElementById('ownerEmail').value.trim();
    const password = document.getElementById('ownerPassword').value;
    if (!email || !password) return toast('ئیمەیڵ و وشەی نهێنی بنووسە.');
    const button = document.getElementById('ownerLogin');
    button.disabled = true;
    const { error } = await db.auth.signInWithPassword({ email, password });
    button.disabled = false;
    if (error) return toast('ئیمەیڵ یان وشەی نهێنی دروست نییە.');
    document.getElementById('ownerPassword').value = '';
  });
  document.getElementById('ownerLogout').addEventListener('click', async () => {
    await db.auth.signOut();
  });

  (async () => {
    try {
      await loadContent();
      loginButton.disabled = false;
      const { data: { session } } = await db.auth.getSession();
      ownerSignedIn = !!session;
      setAccess();
      status.textContent = ownerSignedIn
        ? 'چوویتە ژوورەوە؛ دەتوانیت نموونە، وێنە، لیست و پلاتفۆرمەکان بەڕێوە ببەیت.'
        : 'نموونەکان بۆ هەمووان دەردەکەون. بۆ دەستکاری بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.';
      db.auth.onAuthStateChange((_event, session) => {
        ownerSignedIn = !!session;
        setAccess();
        if (ownerSignedIn && selectedSamples.size) scheduleBulkPreparation();
        status.textContent = ownerSignedIn
          ? 'چوویتە ژوورەوە؛ گۆڕانکارییەکان بۆ هەمووان پاشەکەوت دەبن.'
          : 'چوویتە دەرەوە؛ نموونە هاوبەشەکان بۆ خەڵک دەمێننەوە.';
      });
    } catch (error) {
      console.error(error);
      loginButton.disabled = true;
      status.textContent = 'Supabase پەیوەست بوو، بەڵام داتابەیس/SQL ئامادە نییە یان URL و key هەڵەن.';
      setAccess();
    }
  })();
})();
