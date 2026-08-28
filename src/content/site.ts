/**
 * 集团主站内容源。
 * 红线：无标杆工程、无荣誉堆砌、无团队/历程造势、无产品参数、
 * 无施工/设计/招商细则。代理品牌（HUCH 等）不在主站展开。
 */

export type Locale = 'zh' | 'en'

export type BrandStatus = 'live' | 'soon'

export type Brand = {
  id: string
  nameZh: string
  nameEn: string
  taglineZh: string
  taglineEn: string
  href: string | null
  status: BrandStatus
  color: string
}

export const contact = {
  legalNameZh: '湖南汉格供应链有限公司',
  legalNameEn: 'Hunan Hange Supply Chain Co., Ltd.',
  officeZh: '长沙市雨花区马王堆南路保利大都汇四期 F3-1002',
  officeEn: 'F3-1002, Poly Daduhui Phase IV, Mawangdui South Road, Yuhua District, Changsha',
  warehouseZh: '长沙市开福区中青路传化公路港',
  warehouseEn: 'Transfar Highway Port, Zhongqing Road, Kaifu District, Changsha',
  phone: '400-0731-360',
  email: 'inquiry@hangechain.com',
  emailPlaceholder: true,
}

export const brands: Brand[] = [
  {
    id: 'garma',
    nameZh: '嘉玛',
    nameEn: 'GARMA',
    taglineZh: '暖通材料集成',
    taglineEn: 'HVAC materials integration',
    href: 'https://www.garmagroup.com',
    status: 'live',
    color: '#002d59',
  },
  {
    id: 'bluemaple',
    nameZh: '蓝枫',
    nameEn: 'BLUEMAPLE',
    taglineZh: '暖通辅材集成',
    taglineEn: 'HVAC auxiliary materials',
    href: 'https://bluemaple.com.cn',
    status: 'live',
    color: '#1578a0',
  },
  {
    id: 'wuen',
    nameZh: '吾恩',
    nameEn: 'WUEN',
    taglineZh: '亲民暖通精材',
    taglineEn: 'Accessible HVAC materials',
    href: 'https://wuen.tech',
    status: 'live',
    color: '#c40016',
  },
  {
    id: 'hange',
    nameZh: '汉格',
    nameEn: 'HANGE',
    taglineZh: '供应链与授权分销',
    taglineEn: 'Supply chain and authorized distribution',
    href: null,
    status: 'soon',
    color: '#1b4f63',
  },
  {
    id: 'enjoyhome',
    nameZh: '享家无忧',
    nameEn: 'XIANGJIA WUYOU',
    taglineZh: '暖通标准化施工交付',
    taglineEn: 'Standardized HVAC installation',
    href: null,
    status: 'soon',
    color: '#c56a2d',
  },
  {
    id: 'heimtherm',
    nameZh: 'HEIMTHERM',
    nameEn: 'HEIMTHERM',
    taglineZh: '智能暖通设计',
    taglineEn: 'Intelligent HVAC design',
    href: null,
    status: 'soon',
    color: '#2f6b57',
  },
  {
    id: 'dasheim',
    nameZh: '达斯海姆',
    nameEn: 'DAS HEIM',
    taglineZh: '高端建筑气候自动化',
    taglineEn: 'High-end building climate automation',
    href: null,
    status: 'soon',
    color: '#3c3328',
  },
]

export const nav = [
  { path: '/', zh: '首页', en: 'Home' },
  { path: '/about', zh: '企业简介', en: 'About Us' },
  { path: '/business', zh: '业务范畴', en: 'Business' },
  { path: '/brands', zh: '品牌矩阵', en: 'Brands' },
  { path: '/quality', zh: '品质合规', en: 'Quality' },
  { path: '/contact', zh: '联系我们', en: 'Contact' },
] as const

export const navGroups = [
  {
    id: 'company',
    zh: '我们的公司',
    en: 'Our Company',
    children: [
      { path: '/about', zh: '企业简介', en: 'About Us' },
      { path: '/quality', zh: '品质合规', en: 'Quality' },
    ],
  },
  {
    id: 'work',
    zh: '业务与品牌',
    en: 'Business & Brands',
    children: [
      { path: '/business', zh: '业务范畴', en: 'Business' },
      { path: '/brands', zh: '品牌矩阵', en: 'Brands' },
    ],
  },
  {
    id: 'contact',
    zh: '联系我们',
    en: 'Contact',
    path: '/contact',
    children: [] as { path: string; zh: string; en: string }[],
  },
]

export const copy = {
  zh: {
    wordmark: 'HANGECHAIN',
    siteTitle: 'HANGECHAIN',
    sloganEn: 'Climate Intelligence Refined Living',
    sloganZh: '智驭气候 臻享生活',
    track: '建筑气候自动化',
    navAria: '主导航',
    menuOpen: '打开菜单',
    menuClose: '关闭菜单',
    localeZh: '中',
    localeEn: 'EN',
    visit: '进入站点',
    comingSoon: '站点建设中',
    arrow: '›',
    readMore: '了解更多',
    inquire: '商务咨询',
    toForm: '转到问询表',
    contactExpect: '我们期待您的问询',
    footerCompany: '我们的公司',
    footerWork: '业务与品牌',
    footerLegal: '合规',
    send: '发送问询',
    formName: '姓名',
    formOrg: '机构',
    formEmail: '邮箱',
    formMessage: '事项说明',
    formNote: '问询将通过邮件客户端发送至占位邮箱，提交不落库。',
    emailNote: '邮箱为占位地址，确认后替换。',
    icp: '网站备案申请中',
    copyright: '湖南汉格供应链有限公司',
    officeLabel: '总部办公',
    warehouseLabel: '仓储',
    phoneLabel: '电话',
    emailLabel: '邮箱',
    home: {
      introKicker: '汉格供应链',
      profileKicker: 'Company Profile',
      profileTitle: '企业简介',
      profile: [
        '湖南汉格供应链有限公司是建筑气候自动化领域的企业主体。',
        '业务覆盖暖通材料、供应链分销、人居系统施工、智能暖通设计与高端气候技术服务。',
        '集团以清晰边界运营七个自有品牌；产品、工艺、方案与招商细则由各品牌站点承载。',
        '本站仅提供企业说明、业务范畴、品牌入口与商务对接通道。',
      ],
      brandsKicker: 'Brand Ecosystem',
      brandsTitle: '品牌矩阵',
      brandsLead: '七个自有品牌各司其职。主站只作入口，不展开产品、案例或政策。',
      brandsCta: '查看品牌分工',
      fieldsKicker: 'Business Scope',
      fieldsTitle: '业务范畴',
      fieldsLead: '顶层赛道定义。细则在对应品牌站点。',
      fields: [
        {
          name: '暖通材料',
          text: '自有材料品牌展示品类与配套。采购与集采归口汉格。',
          to: '/brands',
        },
        {
          name: '供应链分销',
          text: '授权代理、渠道分销与工程成套供货的对外端口。',
          to: '/business',
        },
        {
          name: '设计与交付',
          text: '方案设计、标准化施工与高端技术定制分属不同品牌。',
          to: '/business',
        },
      ],
      qualityKicker: 'Quality Standard',
      qualityTitle: '品质与合规',
      qualityLead: '以合规经营与品控准则作为对外说明，不列示奖项或荣誉。',
      partnerKicker: 'Partner',
      partnerTitle: '合作体系',
      partnerLead:
        '材料、施工、设计与技术品牌独立运营。授权代理、分销与集采归口汉格分站，本站不作产品展示。',
      updateKicker: 'Updates',
      updateTitle: '企业动态',
      updateKind: '企业公告',
      updateDate: '2026-05-01',
      updateItem:
        '嘉玛品牌运营主体由上海尤好适智能科技有限公司变更为湖南汉格供应链有限公司。',
      inquiryKicker: 'Contact',
      inquiryTitle: '请联系我们',
      inquiryLead: '合作、采购与机构对接，请留下联系方式与事项说明。',
    },
    about: {
      title: 'About Us',
      kicker: '企业简介',
      intro: [
        '湖南汉格供应链有限公司注册于长沙，从事建筑气候自动化相关业务。',
        '集团以总部形象门户与七个品牌分站构成站点结构：主站说明主体与边界，分站承载各自业务。',
      ],
      ideaTitle: '经营理念',
      idea:
        '以专业、克制、可核对的方式对外说明企业。不夸大规模，不堆砌项目，不把分站业务上收到总部页面。',
      valuesTitle: '企业价值观',
      values: [
        { name: '边界', text: '品牌与业务分工写清，避免交叉承诺。' },
        { name: '专业', text: '用事实与结构说话，不用营销话术替代说明。' },
        { name: '合规', text: '资质、主体与授权关系可追溯，对外口径一致。' },
        { name: '长期', text: '站点与品牌作为长期资产维护，而不是短期宣传页。' },
      ],
      officeTitle: '办公体系',
      office:
        '总部办公位于长沙市雨花区；仓储位于开福区传化公路港。地址用于到访与函件，不作为实力证明。',
      rulesTitle: '经营准则',
      rules: [
        '对外信息以工商主体与已公开变更为准。',
        '代理、分销与渠道政策仅在汉格分站发布。',
        '施工、设计、材料细节分别归属对应品牌站点。',
      ],
    },
    business: {
      title: 'Business',
      kicker: '业务范畴',
      lead: '以下为集团赛道的顶层归类。具体产品、工艺、方案与合作细则见各品牌站点。',
      items: [
        {
          name: '暖通材料供应',
          text: '自有材料品牌承担终端产品展示与品类说明，采购与集采通道归口汉格。',
        },
        {
          name: '供应链分销',
          text: '汉格承载授权代理、渠道分销与工程成套供货，是集团对外分销端口。',
        },
        {
          name: '人居系统施工',
          text: '享家无忧承担标准化施工与交付，不开展产品销售或方案设计。',
        },
        {
          name: '智能暖通设计',
          text: 'HEIMTHERM 承担方案设计与数字化设计服务，不承接施工或产品销售。',
        },
        {
          name: '高端气候技术服务',
          text: 'DAS HEIM 承担高端建筑气候自动化的技术定制与研发，材料与施工分别对接汉格与享家无忧。',
        },
      ],
      boundaryTitle: '业务边界',
      boundary:
        '主站不放置产品参数、施工细节、设计案例或招商条款。各品牌站点按定位展开，彼此不重复同一套落地内容。',
    },
    brandsPage: {
      title: 'Brands',
      kicker: '品牌矩阵',
      lead: '七个自有品牌构成材料、供应链、施工、设计与高端技术的分工。点击已上线站点查看对应业务。',
      logicTitle: '协同逻辑',
      logic:
        '设计由 HEIMTHERM 或 DAS HEIM 输出，材料由自有品牌展示、汉格集采，施工由享家无忧交付。代理品牌仅在汉格分站说明。',
    },
    quality: {
      title: 'Quality',
      kicker: '品质合规',
      lead: '品质说明限于体系、准则与规范，不使用奖项、排名或项目清单作为背书。',
      items: [
        {
          name: '品控体系',
          text: '材料、施工与技术服务分属不同品牌，各自按该品牌站点公布的标准执行；总部不在此页展开参数。',
        },
        {
          name: '服务准则',
          text: '对外承诺与业务边界一致。不属于本品牌范围的需求，导向对应分站或商务问询。',
        },
        {
          name: '合规标准',
          text: '以工商登记主体开展经营。品牌运营主体若有变更，在企业动态中作事实更新。',
        },
        {
          name: '经营规范',
          text: '授权、分销与渠道合作以汉格分站发布的文本为准；本站不发布拿货政策。',
        },
      ],
    },
    contactPage: {
      title: 'Contact',
      kicker: '商务对接',
      lead: '用于机构对接、合作问询与函件往来。非零售客服页。',
    },
  },
  en: {
    wordmark: 'HANGECHAIN',
    siteTitle: 'HANGECHAIN',
    sloganEn: 'Climate Intelligence Refined Living',
    sloganZh: '智驭气候 臻享生活',
    track: 'Building Climate Automation',
    navAria: 'Primary navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    localeZh: '中',
    localeEn: 'EN',
    visit: 'Visit site',
    comingSoon: 'Site in progress',
    arrow: '›',
    readMore: 'Read more',
    inquire: 'Inquiry',
    toForm: 'Go to inquiry form',
    contactExpect: 'We welcome your inquiry.',
    footerCompany: 'Our Company',
    footerWork: 'Business & Brands',
    footerLegal: 'Compliance',
    send: 'Send inquiry',
    formName: 'Name',
    formOrg: 'Organization',
    formEmail: 'Email',
    formMessage: 'Subject',
    formNote: 'The form opens a mail client to a placeholder address. Nothing is stored on the server.',
    emailNote: 'Email address is a placeholder pending confirmation.',
    icp: 'ICP filing in progress',
    copyright: 'Hunan Hange Supply Chain Co., Ltd.',
    officeLabel: 'Office',
    warehouseLabel: 'Warehouse',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    home: {
      introKicker: 'Hange Supply Chain',
      profileKicker: 'Company Profile',
      profileTitle: 'Company',
      profile: [
        'Hunan Hange Supply Chain Co., Ltd. is the corporate entity of the group in building climate automation.',
        'The group covers HVAC materials, supply-chain distribution, residential system installation, intelligent HVAC design, and high-end climate technology services.',
        'Seven owned brands operate with defined boundaries. Product, process, scheme, and distribution detail live on each brand site.',
        'This headquarters site provides company information, business scope, brand entry points, and a channel for commercial inquiry.',
      ],
      brandsKicker: 'Brand Ecosystem',
      brandsTitle: 'Brands',
      brandsLead: 'Seven owned brands, each with a single role. This site is an entry point only.',
      brandsCta: 'Brand roles',
      fieldsKicker: 'Business Scope',
      fieldsTitle: 'Business',
      fieldsLead: 'Top-level definition. Operating detail lives on the brand sites.',
      fields: [
        {
          name: 'HVAC materials',
          text: 'Owned materials brands present ranges. Procurement is handled by HANGE.',
          to: '/brands',
        },
        {
          name: 'Supply-chain distribution',
          text: 'The group port for authorized agency, channel distribution, and project supply.',
          to: '/business',
        },
        {
          name: 'Design and installation',
          text: 'Design, standardized installation, and high-end technology belong to separate brands.',
          to: '/business',
        },
      ],
      qualityKicker: 'Quality Standard',
      qualityTitle: 'Quality',
      qualityLead: 'Compliance and quality principles only. No awards or rankings.',
      partnerKicker: 'Partner',
      partnerTitle: 'Cooperation',
      partnerLead:
        'Materials, installation, design, and technology brands operate as independent sites. Authorized distribution is managed on the HANGE site and is not catalogued here.',
      updateKicker: 'Updates',
      updateTitle: 'Updates',
      updateKind: 'Notice',
      updateDate: '2026-05-01',
      updateItem:
        'The operating entity of the GARMA brand changed from Shanghai Youhaoshi Intelligent Technology Co., Ltd. to Hunan Hange Supply Chain Co., Ltd.',
      inquiryKicker: 'Contact',
      inquiryTitle: 'Contact us',
      inquiryLead: 'For cooperation, procurement, and institutional contact, leave a name and a brief note.',
    },
    about: {
      title: 'About Us',
      kicker: 'Company',
      intro: [
        'Hunan Hange Supply Chain Co., Ltd. is registered in Changsha and operates in building climate automation.',
        'The group structure is one headquarters site and seven brand sites. The headquarters states the entity and its boundaries; each brand site carries its own work.',
      ],
      ideaTitle: 'Operating idea',
      idea:
        'The company is described in professional, restrained, and verifiable terms. Scale is not inflated, project lists are not used as proof, and brand-site work is not duplicated here.',
      valuesTitle: 'Values',
      values: [
        { name: 'Boundary', text: 'Roles are written down so that promises do not overlap.' },
        { name: 'Discipline', text: 'Structure and facts before slogans.' },
        { name: 'Compliance', text: 'Legal entity, qualifications, and authorizations remain traceable.' },
        { name: 'Duration', text: 'Sites and brands are maintained as long-term assets, not campaign pages.' },
      ],
      officeTitle: 'Offices',
      office:
        'The headquarters office is in Yuhua District, Changsha. The warehouse is at Transfar Highway Port in Kaifu District. Addresses are for visits and correspondence, not as evidence of scale.',
      rulesTitle: 'Operating rules',
      rules: [
        'Public statements follow the registered entity and published changes of operator.',
        'Agency, distribution, and channel policy appear only on the HANGE site.',
        'Installation, design, and materials detail belong to the corresponding brand sites.',
      ],
    },
    business: {
      title: 'Business',
      kicker: 'Scope',
      lead: 'A top-level classification of the group’s fields. Products, processes, schemes, and terms are published on the brand sites.',
      items: [
        {
          name: 'HVAC materials supply',
          text: 'Owned materials brands present products and ranges. Procurement and bulk supply are handled by HANGE.',
        },
        {
          name: 'Supply-chain distribution',
          text: 'HANGE is the group’s port for authorized agency, channel distribution, and project supply.',
        },
        {
          name: 'Residential system installation',
          text: 'Xiangjia Wuyou carries standardized installation and handover. It does not sell products or issue design schemes.',
        },
        {
          name: 'Intelligent HVAC design',
          text: 'HEIMTHERM provides design and digital design services. It does not install or sell products.',
        },
        {
          name: 'High-end climate technology',
          text: 'DAS HEIM provides high-end building climate automation. Materials and installation are referred to HANGE and Xiangjia Wuyou.',
        },
      ],
      boundaryTitle: 'Boundaries',
      boundary:
        'This site does not publish product data, installation detail, design cases, or distribution terms. Each brand site develops its own field without repeating the same operating content.',
    },
    brandsPage: {
      title: 'Brands',
      kicker: 'Ecosystem',
      lead: 'Seven owned brands cover materials, supply chain, installation, design, and high-end technology. Live sites open in a new tab.',
      logicTitle: 'How the brands relate',
      logic:
        'Design is issued by HEIMTHERM or DAS HEIM. Materials are presented by the owned brands and procured through HANGE. Installation is delivered by Xiangjia Wuyou. Agency brands are described only on the HANGE site.',
    },
    quality: {
      title: 'Quality',
      kicker: 'Compliance',
      lead: 'Quality is described as systems, principles, and rules. Awards, rankings, and project lists are not used as endorsement.',
      items: [
        {
          name: 'Quality control',
          text: 'Materials, installation, and technical services belong to different brands and follow the standards published on those sites. Parameters are not listed here.',
        },
        {
          name: 'Service principles',
          text: 'Public commitments stay inside each brand’s boundary. Requests outside that boundary are referred to the relevant site or to inquiry.',
        },
        {
          name: 'Compliance',
          text: 'The group operates under its registered legal entity. Changes of brand operator are recorded as factual updates.',
        },
        {
          name: 'Operating norms',
          text: 'Authorization, distribution, and channel cooperation follow texts published on the HANGE site. This site does not publish purchasing policy.',
        },
      ],
    },
    contactPage: {
      title: 'Contact',
      kicker: 'Inquiry',
      lead: 'For institutional contact, cooperation, and correspondence. This is not a retail help desk.',
    },
  },
} as const

export function pageTitle(locale: Locale, page: string) {
  const t = copy[locale]
  return page === t.siteTitle ? t.siteTitle : `${page} · ${t.siteTitle}`
}
