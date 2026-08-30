/**
 * 集团主站内容源。
 * 红线：无标杆工程、无荣誉堆砌、无团队/历程造势、无产品参数、
 * 无施工/设计/招商细则。代理品牌在矩阵中单列名称，不展开产品与政策。
 */

export type Locale = 'zh' | 'en'

export type BrandStatus = 'live' | 'soon'
export type BrandKind = 'own' | 'agency'

export type Brand = {
  id: string
  nameZh: string
  nameEn: string
  /** 弹出卡片 LOGO 位英文；未提供时用 nameEn */
  logoEn?: string
  taglineZh: string
  taglineEn: string
  /** 弹出卡片第三行广告语；未单独提供时沿用 taglineZh */
  sloganZh: string
  href: string | null
  status: BrandStatus
  color: string
  /** 缺省视为自有品牌 */
  kind?: BrandKind
}

export const coopPath = '/p/page-mtemc5ka'

export type Job = {
  id?: string
  title?: string
  titleEn?: string
  team?: string
  teamEn?: string
  type?: string
  typeEn?: string
  location?: string
  locationEn?: string
  summary?: string
  summaryEn?: string
}

/** 空清单。职位在后台「人力对接」增减后发布。 */
export const jobs: Job[] = []

export const contact = {
  legalNameZh: '湖南汉格供应链有限公司',
  legalNameEn: 'Hunan Hange Supply Chain Co., Ltd.',
  officeZh: '湖南省长沙市天心区万家丽南路海伦堡·爱ME城市11栋2单元208室 邮编 410114',
  officeEn:
    'Room 208, Unit 2, Building 11, Helenbergh · Love ME City, Wanjiali South Road, Tianxin District, Changsha, Hunan, Postal code 410114',
  officeLat: '28.065587',
  officeLng: '113.019618',
  warehouseZh: '长沙市开福区中青路传化公路港',
  warehouseEn: 'Transfar Highway Port, Zhongqing Road, Kaifu District, Changsha',
  warehouseLat: '28.3369',
  warehouseLng: '112.9965',
  phone: '400-0731-360',
  email: 'inquiry@hangechain.com',
  emailPlaceholder: true,
  site: 'hangechain.com',
  siteHref: 'https://hangechain.com',
  icp: '湘ICP备13002354号-9',
  icpHref: 'https://beian.miit.gov.cn/',
}

export const brands: Brand[] = [
  {
    id: 'garma',
    nameZh: '嘉玛',
    nameEn: 'GARMA',
    taglineZh: '暖通材料集成',
    taglineEn: 'HVAC materials integration',
    sloganZh: '冷暖风水智 系统材料品牌',
    href: 'http://www.garmagroup.com',
    status: 'live',
    color: '#002d59',
  },
  {
    id: 'bluemaple',
    nameZh: '蓝枫',
    nameEn: 'BLUEMAPLE',
    taglineZh: '暖通辅材集成',
    taglineEn: 'HVAC auxiliary materials',
    sloganZh: '高端暖通品质辅材集成',
    href: 'http://www.bluemaple.com.cn',
    status: 'live',
    color: '#233f93',
  },
  {
    id: 'wuen',
    nameZh: '吾恩',
    nameEn: 'WUEN',
    taglineZh: '亲民暖通精材',
    taglineEn: 'Accessible HVAC materials',
    sloganZh: '透明好材料 信任不踩坑',
    href: 'http://wuen.tech',
    status: 'live',
    color: '#ca061e',
  },
  {
    id: 'hange',
    nameZh: '汉格',
    nameEn: 'HANGE',
    taglineZh: '供应链与授权分销',
    taglineEn: 'Supply chain and authorized distribution',
    sloganZh: '选品仓配 技术赋能',
    href: 'http://hunanhange.com',
    status: 'live',
    color: '#1d4e89',
  },
  {
    id: 'sunjoy',
    nameZh: '享家无忧',
    nameEn: 'SUNJOY',
    taglineZh: '暖通标准化施工交付',
    taglineEn: 'Standardized HVAC installation',
    sloganZh: '样板级工地 管家式服务',
    href: null,
    status: 'soon',
    color: '#ea6403',
  },
  {
    id: 'heimtherm',
    nameZh: '海姆腾',
    nameEn: 'HEIMTHERM',
    logoEn: 'HeimTherm',
    taglineZh: '智能暖通设计',
    taglineEn: 'Intelligent HVAC design',
    sloganZh: '负荷计算 专业选型\n仿真模拟 数字设计',
    href: 'http://heimtherm.com',
    status: 'live',
    color: '#2f6b57',
  },
  {
    id: 'dasheim',
    nameZh: '达斯海姆',
    nameEn: 'DAS HEIM',
    taglineZh: '高端建筑气候自动化',
    taglineEn: 'High-end building climate automation',
    sloganZh: '宅以安心 境即吾家',
    href: null,
    status: 'soon',
    color: '#3c3328',
  },
  {
    id: 'mannred',
    nameZh: '曼瑞德',
    nameEn: 'MANNRED',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
  {
    id: 'poly',
    nameZh: '保利',
    nameEn: 'POLY',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
  {
    id: 'lvyu',
    nameZh: '绿羽',
    nameEn: 'LVYU',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
  {
    id: 'oberno',
    nameZh: '欧博诺',
    nameEn: 'OBERNO',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
  {
    id: 'huch',
    nameZh: '胡赫',
    nameEn: 'HUCH',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
  {
    id: 'watts',
    nameZh: '沃茨',
    nameEn: 'WATTS',
    taglineZh: '授权代理品牌',
    taglineEn: 'Authorized agency brand',
    sloganZh: '汉格甄选代理',
    href: null,
    status: 'soon',
    color: '#4a5560',
    kind: 'agency',
  },
]

export const nav = [
  { path: '/', zh: '首页', en: 'Home' },
  { path: '/about', zh: '企业简介', en: 'About Us' },
  { path: '/business', zh: '业务范畴', en: 'Business' },
  { path: '/brands', zh: '品牌矩阵', en: 'Brands' },
  { path: '/quality', zh: '品质合规', en: 'Quality' },
  { path: '/history', zh: '发展历史', en: 'History' },
  { path: '/contact', zh: '联系我们', en: 'Contact' },
] as const

export const navGroups: {
  id: string
  zh: string
  en: string
  path?: string
  children: { path: string; zh: string; en: string }[]
}[] = [
  {
    id: 'company',
    zh: '何为汉格',
    en: 'What is Hange',
    children: [
      { path: '/about', zh: '企业简介', en: 'About Us' },
      { path: '/history', zh: '发展历史', en: 'History' },
      { path: '/quality', zh: '品质合规', en: 'Quality' },
    ],
  },
  {
    id: 'work',
    zh: '何以相助',
    en: 'How we help',
    children: [
      { path: '/business', zh: '业务范畴', en: 'Business' },
      { path: '/brands', zh: '品牌矩阵', en: 'Brands' },
    ],
  },
  {
    id: 'contact',
    zh: '何从接洽',
    en: 'How to inquire',
    children: [
      { path: '/p/page-mtemc5ka', zh: '商务合作', en: 'Business' },
      { path: '/contact', zh: '人力对接', en: 'People' },
    ],
  },
]

export const copy = {
  zh: {
    wordmark: 'HANGECHAIN',
    wordmarkSub: '汉格供应链',
    siteTitle: 'HANGECHAIN',
    sloganEn: 'Climate Intelligence Refined Living',
    sloganZh: '智驭气候 臻享生活',
    heroLine1: 'Climate Intelligence',
    heroLine2: 'Refined Living',
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
    inquire: '合作问询',
    toForm: '转到问询表',
    contactExpect: '我们期待您的问询',
    send: '提交自荐',
    formName: '姓名',
    formOrg: '机构',
    formPhone: '电话',
    formEmail: '邮箱',
    formRole: '意向职位',
    formRoleOpen: '开放自荐',
    formMessage: '补充说明',
    formResume: '简历',
    formResumeHint: 'PDF 或 Word，不超过 8 MB',
    formNote: '资料仅用于招聘对接。提交后由总部人事查阅。',
    applyOk: '已收到。我们会按留下的联系方式回复。',
    applyErr: '提交未完成，请稍后重试，或改用邮件发送简历。',
    applySending: '正在提交…',
    emailNote: '邮箱为占位地址，确认后替换。',
    copyright: '汉格供应链有限公司',
    officeLabel: '总部办公',
    warehouseLabel: '仓储',
    phoneLabel: '电话',
    emailLabel: '邮箱',
    officeSection: '商务地址',
    warehouseSection: '仓储基地',
    businessContact: '商务联系',
    mapNavigate: '导航前往',
    mapOpen: '打开高德',
    mapRoad: '地图',
    mapSat: '卫星',
    mapZoomIn: '放大',
    mapZoomOut: '缩小',
    mapHint: '拖动或缩放查看位置',
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
      heroBusiness: '业务说明',
      heroBrands: '品牌入口',
      heroContact: '合作问询',
      genesKicker: 'Culture',
      genesTitle: '文化基因',
      genesLead: '做事方式的底层定义。不另写成口号。',
      genes: [
        {
          name: '第一性原理',
          nameEn: 'First principles',
          text: '汉格坚持第一性原理。无论产品还是技术，都从表面开始，不断挖掘、追索到问题最根本的那一层，再反推回来，建立从根源出发的认知。',
        },
        {
          name: '数字化工具',
          nameEn: 'Digital tools',
          text: '汉格一直具备数字化的精神与做法：从建立采暖网开展在线采购，到小程序上的智能问答产品说明书，再到自有开发的建筑气候系统专业设计平台。',
        },
        {
          name: '原创式开发',
          nameEn: 'Original development',
          text: '汉格始终着眼合作伙伴与市场上的需求，再去做原创性开发。例如首创并命名了F阀这一产品。',
        },
      ],
      fieldsKicker: 'Business Scope',
      fieldsTitle: '业务方向',
      fieldsLead: '顶层赛道定义。细则在对应品牌站点。',
      fields: [
        {
          name: '自有品牌',
          text: '严控品质・匠心出品',
          to: '/business/own',
        },
        {
          name: '代理甄选',
          text: '技术优势・差异价值',
          to: '/business/agency',
        },
        {
          name: '集成仓配',
          text: '选品集成・仓配一体',
          to: '/business/warehouse',
        },
        {
          name: '落地安装',
          text: '包工包料・安装售后',
          to: '/business/install',
        },
        {
          name: '智能设计',
          text: '选型设计・仿真模拟',
          to: '/business/design',
        },
        {
          name: '五恒智控',
          text: '建筑五恒・高端智控',
          to: '/business/climate',
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
      gates: [
        {
          id: 'talk',
          kicker: 'Partner',
          title: '洽谈合作',
          text: '外界与汉格的商务对接由总部问询接入。请写明机构、事项与联系人。授权代理、分销与集采归口汉格分站；产品、施工、设计分别对接对应品牌，避免交叉承诺。',
          cta: '商务合作',
          to: coopPath,
        },
        {
          id: 'join',
          kicker: 'People',
          title: '加入汉格',
          text: '汉格取人之道：底层思维、责任底线、长期导向。\n不只给职位、更给平台；不只是机会、更是磨砺；\n炼人、炼心、为人、处世，相互成就。',
          cta: '人力对接',
          to: '/contact',
        },
      ],
    },
    about: {
      title: 'Philosophy',
      kicker: '文化理念',
      lead: '',
      sloganTitle: 'SLOGAN 解析',
      sloganHeading: '智驭气候 臻享生活',
      sloganLead: '汉格的 SLOGAN 只有八个字，却定义了我们是谁、我们为什么而存在。',
      abilityTitle: '智驭气候——我们的能力与手段',
      ability: [
        {
          name: '智',
          text: '是智慧、是智能、是数字化。\n汉格坚持用数字化工具驱动业务——从采暖网在线采购，到小程序智能问答，再到自主研发的 HeimTherm 建筑气候设计平台。\n我们相信，专业的门槛可以用技术降低，决策的质量可以用数据提升。',
        },
        {
          name: '驭',
          text: '是驾驭、是掌控、是精准调控。\n建筑气候不是简单的冷暖，而是温度、湿度、氧气、洁净、安静的系统平衡。\n汉格的五恒智控，就是要把不可控的气候，变成可精确驾驭的人居环境。',
        },
        {
          name: '气候',
          text: '是我们的战场。\n汉格深耕建筑环境与暖通系统领域，我们做的不是单一产品，而是整套建筑气候解决方案。',
        },
      ],
      idealTitle: '臻享生活——我们的理想与归宿',
      ideal: [
        {
          name: '臻',
          text: '是极致、是臻选、是不妥协。汉格代理甄选，只选有特色、有技术含量、能创造独特价值的好货；汉格原创开发，不做跟随者，做定义者。臻，是我们对品质的态度。',
        },
        {
          name: '享',
          text: '不只是享受舒适的室内环境，更是享受一种从容、健康、有品质的生活方式。我们做的一切技术、产品、系统，最终都是为了让人从被环境困扰，变为从容驾驭生活。',
        },
        {
          name: '生活',
          text: '不只是温度、湿度这些技术指标，更是生活方式、生活心态、生活状态、人生态度。汉格不只是一家暖通企业，我们是在为美好生活提供底层支撑——智驭气候是手段，臻享生活才是理想与归宿。',
        },
      ],
      purposeTitle: '使命与愿景',
      missionTitle: '我们的使命',
      mission: '用智慧与技术重塑建筑气候，让每个人都能极致享受健康、舒适、可持续的美好生活。',
      visionTitle: '我们的愿景',
      vision:
        '成为建筑环境领域最受信赖的技术驱动型企业——以底层思维定义产品，以责任底线赢得信任，以长期导向穿越周期。',
      valuesTitle: '核心价值观',
      valuesLead:
        '汉格的核心价值观有三条：底层思维、责任底线、长期导向。这不是挂在墙上的口号，而是我们做每一个决策、选每一个人、谈每一次合作的标尺。',
      values: [
        {
          name: '底层思维',
          text: '汉格坚持第一性原理。无论产品还是技术，都从表象切入，层层穿透、追索到问题最根本的那一层，再由根源反推，建立从本质出发的认知。\n\n不从众、不跟风、不迷信经验。遇到问题，先问“本质是什么”，再问“怎么做”。\n\n底层思维决定了我们不做市场上已有的同质化产品，而是回到问题本身，寻找真正的解。',
        },
        {
          name: '责任底线',
          text: '汉格相信，诚信是最低成本的沟通方式，也是最高的竞争壁垒。\n\n对产品负责——不合格的绝不出厂，不夸大、不造假、不拿用户当试验品。\n\n对人负责——不以头衔取人，不以宣传口径取人，看的是底层思维、责任担当和能不能长期一起干。\n\n对合作负责——不越界、不短视、不交叉承诺。不抢合作方的饭碗，不做一锤子买卖。',
        },
        {
          name: '长期导向',
          text: '汉格关注长期。不短视、不赚快钱、不做一锤子买卖。\n\n对产品看长期——打磨到真正好用再推向市场，不为了赶周期牺牲品质。\n\n对人看长期——给平台、给磨砺、给成长时间，不追求短期产出，追求相互成就。\n\n对合作看长期——诚信保底、共利共赢，做时间的朋友。\n\n做难而正确的事，时间会给出答案。',
        },
      ],
      practiceTitle: '第一性原理的实践',
      practiceLead: '底层思维不是空谈，它体现在汉格做的每一件事里。',
      practice: [
        {
          name: '原创开发：从问题出发，不从市场出发',
          text: '汉格原创式开发，始终着眼合作伙伴与市场的真实需求，而不是“市场上什么好卖就做什么”。\n\n例如首创并命名的 F 阀——我们回到阀门在系统中的本质作用，重新定义了它的结构与功能。不做跟随者，做定义者。',
        },
        {
          name: '数字化工具：用技术降低专业门槛',
          text: '建筑气候设计是高度专业的工作，传统方式依赖工程师个人经验，效率低、误差大。\n\n汉格自主研发 HeimTherm 建筑气候系统专业设计平台，把经验固化为算法，把直觉转化为数据。从采暖网在线采购，到小程序智能问答产品说明书，再到 HeimTherm 设计平台——汉格的数字化不是为了炫技，而是为了让专业更高效、让决策更精准。',
        },
        {
          name: '五恒智控：回到人居的本质需求',
          text: '人们对室内环境的本质需求，不是“制冷”或“制热”，而是舒适、健康、安静、洁净、富氧。\n\n汉格的五恒系统，回到人居本质，把温度、湿度、氧气、洁净、安静作为一个整体来调控，而不是头痛医头、脚痛医脚。这就是第一性原理在产品上的落地。',
        },
      ],
      linesTitle: '我们的底线与红线',
      linesLead: '汉格有明确的不做清单。这些底线和红线，比我们做什么更能定义我们是谁。',
      lines: [
        { name: '诚信红线', text: '不造假、不夸大、不交叉承诺。说到的必须做到，做不到的绝不承诺。' },
        { name: '品质红线', text: '不合格的产品绝不出厂，不拿用户当试验品，不为了赶周期牺牲品质。' },
        { name: '长期红线', text: '不赚快钱、不做一锤子买卖、不牺牲长期价值换取短期利益。' },
        { name: '合作红线', text: '不越界、不抢合作方的饭碗、不做损害合作伙伴利益的事。' },
        { name: '用人红线', text: '不看头衔看底层思维，不看宣传看责任担当，不能长期共事的人再优秀也不勉强。' },
      ],
      storiesTitle: '文化故事',
      storiesLead: '文化不是写出来的，是做出来的。汉格的文化，藏在每一次决策、每一款产品、每一次合作里。',
      storiesBody: '',
      close: ['智驭气候，臻享生活。', '同频者方能同行。汉格，与你相互成就。'],
    },
    business: {
      title: 'Business',
      kicker: '业务方向',
      lead: '致广大而尽精微，极高明而道中庸。——《中庸》第二十七章',
      back: '返回业务方向',
      items: [
        {
          id: 'own',
          name: '自有品牌',
          nameEn: 'Own brands',
          card: '严控品质・匠心出品',
          text: '严控标准，成套系统方案。',
          body: '【定位】\n汉格以自有品牌覆盖材料、供应链、施工、设计与高端技术。七个品牌各自独立站点运营，总部主站只作入口与归类，不展开产品目录。\n【构成】\n嘉玛做暖通材料集成，蓝枫做暖通辅材集成，吾恩做亲民暖通精材，汉格做供应链与授权分销，享家无忧做标准化施工交付，HEIMTHERM 做智能暖通设计，DAS HEIM 做高端建筑气候自动化。\n【边界】\n主站不放置产品参数、工艺说明或方案细则。分站按定位展开，彼此不重复同一套落地内容。来访者先看清边界，再进入对应站点。',
          cta: '查看品牌矩阵',
          ctaTo: '/brands',
        },
        {
          id: 'agency',
          name: '代理甄选',
          nameEn: 'Agency selection',
          card: '技术优势・差异价值',
          text: '臻选行业特色品牌，独特价值赋能渠道伙伴。',
          body: '【定位】\n代理甄选是集团对外的分销端口。授权代理与渠道选品归口汉格，不由材料、施工或设计品牌各自对外招商。\n【原则】\n汉格不按“什么好卖代理什么”铺货。甄选看特色、技术含量、能否创造独特价值。渠道时代先后引入曼瑞德、保利、绿羽、欧博诺、胡赫、沃茨等品牌，授权关系由汉格分站说明。\n【边界】\n主站品牌矩阵只列甄选名单，不展开产品、参数或招商细则。对外分销、授权与集采的端口归口汉格，避免与自有品牌站点交叉承诺。',
          cta: '查看品牌矩阵',
          ctaTo: '/brands',
        },
        {
          id: 'warehouse',
          name: '集成仓配',
          nameEn: 'Integrated warehousing',
          card: '选品集成・仓配一体',
          text: '集中采购仓储成套供货，降本增效交付可控。',
          body: '【定位】\n汉格作为供应链主体，把集采、仓储与工程成套供货收在同一条链上：按工程需求组套，而不是按单品零售铺货。\n【落点】\n仓库设在长沙开福区传化公路港，服务渠道与工程项目的出货节奏。材料按设计与施工界面组套发出，减少现场临时拼货。\n【边界】\n主站不放置库存、报价或物流细则。仓配执行、授权分销与集采条款在汉格分站说明。现场收货与安装分别对接享家无忧，仓配不越界承担施工。',
          cta: '商务问询',
          ctaTo: coopPath,
        },
        {
          id: 'install',
          name: '落地安装',
          nameEn: 'On-site installation',
          card: '包工包料・安装售后',
          text: '标准化施工与管理交付，保障项目落地品质。',
          body: '【定位】\n落地安装是把设计与材料变成可验收的现场。享家无忧只做标准化施工与交付：样板级工地、管家式服务。\n【协同】\n设计由 HEIMTHERM 或 DAS HEIM 输出，材料由自有品牌展示、汉格集采，施工由享家无忧交付。界面清楚，是为了不交叉承诺。\n【边界】\n享家无忧不销售产品，不出具方案。主站不放置工法、验收表或施工案例。现场细则在享家无忧站点上线后展开。',
          cta: '商务问询',
          ctaTo: coopPath,
        },
        {
          id: 'design',
          name: '智能设计',
          nameEn: 'Intelligent design',
          card: '选型设计・仿真模拟',
          text: '数字化驱动设计，输出精准专业的系统方案。',
          body: '【定位】\n建筑气候设计高度依赖专业判断。HEIMTHERM 把负荷计算、专业选型、仿真模拟做成可交付的设计服务，并以自有开发的建筑气候系统专业设计平台降低经验门槛。\n【协同】\n方案交给供应链与施工执行：材料对接汉格与各材料品牌，安装对接享家无忧。数字化工具服务设计本身，不替代现场。\n【边界】\nHEIMTHERM 不施工、不卖货。主站不放置设计案例或软件操作说明，细则在 HEIMTHERM 站点。',
          cta: '商务问询',
          ctaTo: coopPath,
        },
        {
          id: 'climate',
          name: '五恒智控',
          nameEn: 'Five-constant climate',
          card: '建筑五恒・高端智控',
          text: '五恒系统智能调控，打造恒温恒湿恒氧气候。',
          body: '【定位】\n人对室内环境的本质需求不是制冷或制热，而是舒适、健康、安静、洁净、富氧。五恒智控把温度、湿度、氧气、洁净、安静作为一个整体来调控。\n【承担】\nDAS HEIM 做高端建筑气候自动化的技术定制与研发，不替代供应链，也不替代施工。材料归口汉格，安装归口享家无忧。\n【边界】\n主站只说明定位与协同，不展开产品参数、控制系统清单或案例。站点上线前，对外问询走总部通道。',
          cta: '商务问询',
          ctaTo: coopPath,
        },
      ],
      boundaryTitle: '业务边界',
      boundary:
        '主站不放置产品参数、施工细节、设计案例或招商条款。各品牌站点按定位展开，彼此不重复同一套落地内容。',
    },
    brandsPage: {
      title: 'Brands',
      kicker: '品牌矩阵',
      lead: '天下同归而殊途，一致而百虑。 ——《周易·系辞下》第五章',
      ownTitle: '自有品牌',
      ownLead: '材料、供应链、施工、设计与高端技术，各有边界。点击已上线站点查看对应业务。',
      agencyTitle: '代理品牌',
      agencyLead: '授权代理与渠道选品归口汉格。此处只列甄选品牌，不展开产品、参数或招商细则。',
      logicTitle: '协同逻辑',
      logic:
        '设计由 HEIMTHERM 或 DAS HEIM 输出，材料由自有品牌展示、汉格集采，施工由享家无忧交付。代理品牌由汉格分站说明。',
    },
    history: {
      title: 'History',
      kicker: '发展历史',
      lead: '汉格走过的阶段。左侧是时代，右侧是沿时间排布的关键节点。',
      eras: [
        {
          name: '零售时代',
          text: '2008 年南方冰灾，汉格由此起源。\n创始人温辉时任职于美的集团。冰灾令其痛感采暖技术匮乏，\n十年职场亦深憾疏于陪伴家人、未曾安顿人生。\n遂辞职归乡，于长沙开设首家暖通门店。',
        },
        {
          name: '渠道时代',
          text: '2012后年渠道市场兴起，恰逢长沙地铁建设，汉格三家零售门店均被施工围挡。\n汉格借势退出零售，不与分销商争利，全面聚焦渠道批发，\n前后甄选代理了曼瑞德、保利、绿羽、欧博诺、胡赫、沃茨等一系列品牌。',
        },
        {
          name: '供应链时代',
          text: '以供应链主体统筹集采、仓储与成套供货，让各品牌在同一条链上各司其职、边界清楚。',
        },
        {
          name: '平台时代',
          text: '用数字化工具与品牌矩阵，把专业能力做成可复用的平台，减少重复劳动，提高决策精度。',
        },
        {
          name: '未来',
          text: '继续回到问题本身。不做同质化的下一件商品，做难而正确的事，让时间给出下一阶段的形态。',
        },
      ],
      events: [
        { date: '2009.07', text: '左岸右岸店开业' },
        { date: '2011.08', text: '惠通店开业' },
        { date: '2013.07', text: '浏阳河仓储中心成立' },
        { date: '2014.01', text: '丽景香山店开业' },
        { date: '2014.11', text: '万家丽仓储中心成立' },
        { date: '2015.07', text: '霞辉仓储中心成立' },
        { date: '2015.11', text: '湖南股交所挂牌' },
        { date: '2018.07', text: '传化仓储中心成立' },
        { date: '2018.09', text: '牛头村运营办公室启用' },
        { date: '2019.09', text: '郴州仓储中心成立' },
        { date: '2020.06', text: '益阳仓储中心成立' },
        { date: '2021.04', text: '旭辉运营中心成立' },
        { date: '2021.05', text: '嘉玛上海华侨城运营中心成立' },
        { date: '2023.05', text: '湘潭仓储中心成立' },
        { date: '2023.11', text: '嘉玛长沙品牌运营中心成立' },
        { date: '2024.03', text: '衡阳仓储中心成立' },
        { date: '2024.11', text: '岳阳仓储中心成立' },
      ],
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
      title: 'People',
      kicker: '人力对接',
      lead: '己欲立而立人，己欲达而达人。 ——《论语·雍也》',
      jobsKicker: 'Openings',
      jobsTitle: '人力需求',
      jobsEmpty: '目前暂无公开职位。仍欢迎自荐。',
      jobApply: '自荐此职位',
      interviewKicker: 'Interview',
      interviewTitle: '商务面试地点',
      interviewName: '汉格供应链总部',
      interviewNameEn: 'HANGECHAIN Headquarters',
      applyKicker: 'Apply',
      applyTitle: '人才自荐',
      applyLead: '填写资料并上传简历。意向职位可与上栏条目对应，也可开放自荐。',
    },
  },
  en: {
    wordmark: 'HANGECHAIN',
    wordmarkSub: '汉格供应链',
    siteTitle: 'HANGECHAIN',
    sloganEn: 'Climate Intelligence Refined Living',
    sloganZh: '智驭气候 臻享生活',
    heroLine1: 'Climate Intelligence',
    heroLine2: 'Refined Living',
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
    inquire: 'Partner inquiry',
    toForm: 'Go to inquiry form',
    contactExpect: 'We welcome your inquiry.',
    send: 'Submit application',
    formName: 'Name',
    formOrg: 'Organization',
    formPhone: 'Phone',
    formEmail: 'Email',
    formRole: 'Role',
    formRoleOpen: 'Open application',
    formMessage: 'Note',
    formResume: 'Resume',
    formResumeHint: 'PDF or Word, up to 8 MB',
    formNote: 'Used only for recruitment. Headquarters HR will review the file.',
    applyOk: 'Received. We will reply using the contact details you left.',
    applyErr: 'The submission did not go through. Please try again, or send the resume by email.',
    applySending: 'Submitting…',
    emailNote: 'Email address is a placeholder pending confirmation.',
    copyright: 'Hunan Hange Supply Chain Co., Ltd.',
    officeLabel: 'Office',
    warehouseLabel: 'Warehouse',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    officeSection: 'Business address',
    warehouseSection: 'Warehouse',
    businessContact: 'Business contact',
    mapNavigate: 'Get directions',
    mapOpen: 'Open in Amap',
    mapRoad: 'Map',
    mapSat: 'Satellite',
    mapZoomIn: 'Zoom in',
    mapZoomOut: 'Zoom out',
    mapHint: 'Drag or zoom to inspect the location',
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
      heroBusiness: 'Business overview',
      heroBrands: 'Brand sites',
      heroContact: 'Partner inquiry',
      genesKicker: 'Culture',
      genesTitle: 'Cultural DNA',
      genesLead: 'Working habits at the root. Not slogans.',
      genes: [
        {
          name: 'First principles',
          nameEn: 'First principles',
          text: 'Hange holds to first-principles thinking. In product and in technology, work starts at the surface, keeps digging until the most fundamental layer of the problem is reached, then reasons back to a view that begins at the root.',
        },
        {
          name: 'Digital tools',
          nameEn: 'Digital tools',
          text: 'Hange has long worked with a digital spirit: from founding 采暖网 for online procurement, to intelligent Q&A manuals in mini-programs, to a self-developed professional design platform for building climate systems.',
        },
        {
          name: 'Original development',
          nameEn: 'Original development',
          text: 'Hange looks first at what partners and the market need, then develops originally. One example is pioneering and naming the F-valve.',
        },
      ],
      fieldsKicker: 'Business Scope',
      fieldsTitle: 'Direction',
      fieldsLead: 'Top-level definition. Operating detail lives on the brand sites.',
      fields: [
        {
          name: 'Own brands',
          text: 'Seven owned brands. Product and range detail live on each brand site.',
          to: '/business/own',
        },
        {
          name: 'Agency selection',
          text: 'Authorized agency and channel selection are handled by HANGE.',
          to: '/business/agency',
        },
        {
          name: 'Integrated warehousing',
          text: 'Procurement, warehousing, and project supply are handled by HANGE.',
          to: '/business/warehouse',
        },
        {
          name: 'On-site installation',
          text: 'Standardized installation and handover are carried by Sunjoy.',
          to: '/business/install',
        },
        {
          name: 'Intelligent design',
          text: 'Schemes and digital design are carried by HEIMTHERM.',
          to: '/business/design',
        },
        {
          name: 'Five-constant climate',
          text: 'High-end building climate automation is carried by DAS HEIM.',
          to: '/business/climate',
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
      gates: [
        {
          id: 'talk',
          kicker: 'Partner',
          title: 'Talk cooperation',
          text: 'Outside parties reach Hange through headquarters inquiry. Name the organization, the matter, and a contact. Authorized agency, distribution, and procurement are handled on the HANGE site. Product, installation, and design go to the corresponding brand, so promises do not overlap.',
          cta: 'Business',
          to: coopPath,
        },
        {
          id: 'join',
          kicker: 'People',
          title: 'Join Hange',
          text: 'Hange hires for craft, clear responsibility, and the ability to work over time—not for titles or slogans. Openings are listed on the People page; you may also apply with a resume. Interviews are held at headquarters.',
          cta: 'People',
          to: '/contact',
        },
      ],
    },
    about: {
      title: 'Philosophy',
      kicker: 'Company',
      lead: '',
      sloganTitle: 'SLOGAN',
      sloganHeading: 'Master the climate. Live it fully.',
      sloganLead:
        'Eight characters in Chinese. They state who we are, and why the work exists.',
      abilityTitle: 'Master the climate — capability and method',
      ability: [
        {
          name: 'Wisdom',
          text: 'Intelligence, and digital tools. Hange runs the work on systems: online heating procurement, a mini-program that answers product questions, and HeimTherm, the in-house building-climate design platform. Expertise should be easier to use. Decisions should rest on data.',
        },
        {
          name: 'Mastery',
          text: 'Control, and precise regulation. Building climate is not merely hot or cold. It is a balance of temperature, humidity, oxygen, cleanliness, and quiet. Five-constant climate control turns weather that cannot be managed into an interior that can.',
        },
        {
          name: 'Climate',
          text: 'This is the field. Hange works in building environment and HVAC. The offering is not a single product, but a complete building-climate solution.',
        },
      ],
      idealTitle: 'Live it fully — the aim',
      ideal: [
        {
          name: 'Refinement',
          text: 'The extreme, the selected, the uncompromised. Agency selection takes goods with character, technical substance, and a distinct value. Original development does not follow; it defines. That is the stance on quality.',
        },
        {
          name: 'Ease',
          text: 'Not only a comfortable room, but a way of living that is calm, healthy, and considered. Every technique, product, and system is there so people stop being troubled by the environment and start governing daily life.',
        },
        {
          name: 'Life',
          text: 'Not only temperature and humidity as metrics, but a way of living, a temperament, a condition, an attitude. Hange is not only an HVAC firm. It supplies the substrate of a better life. Mastering climate is the means. Living it fully is the end.',
        },
      ],
      purposeTitle: 'Mission and vision',
      missionTitle: 'Mission',
      mission:
        'Reshape building climate with intelligence and technique, so that health, comfort, and a sustainable life are available without compromise.',
      visionTitle: 'Vision',
      vision:
        'To be the most trusted technology-driven firm in the building-environment field — products defined from first principles, trust earned at the line of responsibility, and a long horizon through the cycle.',
      valuesTitle: 'Core values',
      valuesLead:
        'Three values: first principles, a line of responsibility, and a long horizon. They are not wall slogans. They are the measure for every decision, every hire, and every partnership.',
      values: [
        {
          name: 'First principles',
          text: 'Hange starts from first principles. Product or technique, the work cuts through appearance until it reaches the root of the problem, then builds understanding back from that root.\n\nNot crowd-following, not fashion, not inherited habit treated as law. First: what is the essence. Then: what to do.\n\nThat is why the firm does not add another copy of what the market already sells. It returns to the problem and looks for a real answer.',
        },
        {
          name: 'A line of responsibility',
          text: 'Honesty is the cheapest form of communication, and the highest barrier to entry.\n\nOn product: nothing unfit leaves the plant. No inflation, no fabrication, no treating users as a trial.\n\nOn people: not by title, not by publicity. First principles, responsibility, and whether the work can be done together over time.\n\nOn partners: no overreach, no short horizon, no overlapping promises. No taking a partner’s work. No one-off deals.',
        },
        {
          name: 'A long horizon',
          text: 'Hange looks far. No short view, no easy money, no one-off deals.\n\nOn product: finish until it is truly usable, then release. Quality is not traded for a calendar.\n\nOn people: a platform, a grind, and time to grow. Not a hunt for output this quarter. Mutual accomplishment.\n\nOn partners: honesty as the floor, shared gain, time as an ally.\n\nDo the hard and correct thing. Time answers.',
        },
      ],
      practiceTitle: 'First principles in practice',
      practiceLead: 'First principles are not a speech. They show up in the work.',
      practice: [
        {
          name: 'Original development: from the problem, not the market',
          text: 'Original development starts from what partners and the market actually need — not from whatever happens to sell.\n\nThe F-valve, named here first, is an example: return to what a valve must do in the system, then redefine structure and function. Not a follower. A definer.',
        },
        {
          name: 'Digital tools: lower the bar of expertise',
          text: 'Building-climate design is specialized work. The old way leans on one engineer’s experience: slow, and easy to miss.\n\nHeimTherm, the in-house professional design platform, turns experience into algorithms and intuition into data. From online heating procurement, to a mini-program that reads the product manual, to HeimTherm itself — the digital work is not display. It makes expertise faster and decisions more exact.',
        },
        {
          name: 'Five-constant climate: back to what a room is for',
          text: 'What people need indoors is not “cooling” or “heating”. It is comfort, health, quiet, cleanliness, and oxygen.\n\nThe five-constant system treats temperature, humidity, oxygen, cleanliness, and quiet as one regulation — not a patch for each complaint. That is first principles in the product.',
        },
      ],
      linesTitle: 'Lines we will not cross',
      linesLead: 'There is a clear list of what Hange will not do. The lines define the firm as much as the work does.',
      lines: [
        { name: 'Honesty', text: 'No fabrication, no inflation, no overlapping promises. What is said is done. What cannot be done is not promised.' },
        { name: 'Quality', text: 'Nothing unfit leaves the plant. Users are not a trial. Quality is not traded for a calendar.' },
        { name: 'Duration', text: 'No easy money, no one-off deals, no long-term value sold for a short gain.' },
        { name: 'Partnership', text: 'No overreach, no taking a partner’s work, no harm to a partner’s interest.' },
        { name: 'People', text: 'First principles over titles, responsibility over publicity. Talent that cannot work over time is not forced in.' },
      ],
      storiesTitle: 'Culture in the work',
      storiesLead:
        'Culture is not written. It is done. It sits in each decision, each product, and each partnership.',
      storiesBody: '',
      close: [
        'Master the climate. Live it fully.',
        'Those on the same frequency can walk together. Hange, and mutual accomplishment.',
      ],
    },
    business: {
      title: 'Business',
      kicker: 'Scope',
      lead: 'A top-level classification of the group’s fields. Open an entry for boundaries and how the tracks work together. Products, processes, schemes, and terms are published on the brand sites.',
      back: 'Back to business',
      items: [
        {
          id: 'own',
          name: 'Own brands',
          nameEn: 'Own brands',
          text: 'Seven owned brands. Product and range detail live on each brand site.',
          body: '【Position】\nOwned brands cover materials, supply chain, installation, design, and high-end technology. Each brand runs its own site. This headquarters site is an entry and a map of boundaries, not a product catalogue.\n【The seven】\nGARMA integrates HVAC materials. Bluemaple integrates auxiliary HVAC materials. Wuen supplies accessible HVAC goods. HANGE handles supply chain and authorized distribution. Sunjoy carries standardized installation. HEIMTHERM provides intelligent HVAC design. DAS HEIM develops high-end building climate automation.\n【Boundary】\nThis site does not publish product data, process notes, or scheme detail. Each brand site develops its own field without repeating the same operating content. Visitors see the boundary first, then enter the matching site.',
          cta: 'See the brand matrix',
          ctaTo: '/brands',
        },
        {
          id: 'agency',
          name: 'Agency selection',
          nameEn: 'Agency selection',
          text: 'Authorized agency and channel selection are handled by HANGE.',
          body: '【Position】\nAgency selection is the group’s external distribution port. Authorized agency and channel goods are handled by HANGE — not by the material, installation, or design brands recruiting on their own.\n【Principle】\nHange does not agency whatever happens to sell. Selection looks for character, technical substance, and a distinct value. In the channel years the list came to include MANNRED, POLY, LVYU, OBERNO, HUCH, and WATTS. Authorization is described on the HANGE site.\n【Boundary】\nThe brand matrix on this site lists names only. No product data, no terms of trade. Distribution, authorization, and procurement stay with HANGE, so promises do not overlap the owned-brand sites.',
          cta: 'See the brand matrix',
          ctaTo: '/brands',
        },
        {
          id: 'warehouse',
          name: 'Integrated warehousing',
          nameEn: 'Integrated warehousing',
          text: 'Procurement, warehousing, and project supply are handled by HANGE.',
          body: '【Position】\nAs the supply-chain entity, HANGE holds procurement, warehousing, and project kitting on one line: goods are assembled for the job, not laid out as retail singles.\n【Place】\nThe warehouse sits at Transfar Highway Port in Kaifu District, Changsha, serving channel and project dispatch. Materials leave as kits matched to design and installation interfaces, so the site is not left to improvise stock.\n【Boundary】\nThis site does not publish inventory, quotations, or logistics rules. Execution, authorized distribution, and procurement terms live on the HANGE site. Receiving and installation stay with Sunjoy. Warehousing does not take on the site work.',
          cta: 'Business inquiry',
          ctaTo: coopPath,
        },
        {
          id: 'install',
          name: 'On-site installation',
          nameEn: 'On-site installation',
          text: 'Standardized installation and handover are carried by Sunjoy.',
          body: '【Position】\nInstallation turns design and materials into a site that can be handed over. Sunjoy does only standardized installation and handover — a model site, a steward’s service.\n【Together】\nDesign comes from HEIMTHERM or DAS HEIM. Materials are shown by owned brands and procured by HANGE. Installation is carried by Sunjoy. Clear interfaces keep promises from overlapping.\n【Boundary】\nSunjoy does not sell products or issue schemes. This site does not publish methods, checklists, or installation cases. Site detail will live on the Sunjoy site when it opens.',
          cta: 'Business inquiry',
          ctaTo: coopPath,
        },
        {
          id: 'design',
          name: 'Intelligent design',
          nameEn: 'Intelligent design',
          text: 'Schemes and digital design are carried by HEIMTHERM.',
          body: '【Position】\nBuilding-climate design depends on professional judgment. HEIMTHERM turns load calculation, selection, and simulation into a deliverable design service, and uses an in-house professional platform to lower the bar of experience.\n【Together】\nThe scheme is executed by supply chain and installation: materials go to HANGE and the material brands, installation to Sunjoy. Digital tools serve the design. They do not replace the site.\n【Boundary】\nHEIMTHERM does not install or sell. This site does not publish design cases or software manuals. Operating detail lives on the HEIMTHERM site.',
          cta: 'Business inquiry',
          ctaTo: coopPath,
        },
        {
          id: 'climate',
          name: 'Five-constant climate',
          nameEn: 'Five-constant climate',
          text: 'High-end building climate automation is carried by DAS HEIM.',
          body: '【Position】\nWhat a room needs is not cooling or heating as such. It is comfort, health, quiet, cleanliness, and oxygen. Five-constant climate control regulates temperature, humidity, oxygen, cleanliness, and quiet as one.\n【Role】\nDAS HEIM develops high-end building climate automation. It does not replace the supply chain or the installer. Materials stay with HANGE. Installation stays with Sunjoy.\n【Boundary】\nThis site states position and collaboration only. No product data, no control-system lists, no cases. Until the brand site opens, outside inquiry goes through headquarters.',
          cta: 'Business inquiry',
          ctaTo: coopPath,
        },
      ],
      boundaryTitle: 'Boundaries',
      boundary:
        'This site does not publish product data, installation detail, design cases, or distribution terms. Each brand site develops its own field without repeating the same operating content.',
    },
    brandsPage: {
      title: 'Brands',
      kicker: 'Ecosystem',
      lead: 'Owned brands operate independently; agency brands are selected by HANGE.',
      ownTitle: 'Owned brands',
      ownLead: 'Materials, supply chain, installation, design, and high-end technology, each with a boundary. Live sites open in a new tab.',
      agencyTitle: 'Agency brands',
      agencyLead: 'Authorized agency and channel selection are handled by HANGE. Names only on this page; product, data, and terms stay on the HANGE site.',
      logicTitle: 'How the brands relate',
      logic:
        'Design is issued by HEIMTHERM or DAS HEIM. Materials are presented by the owned brands and procured through HANGE. Installation is delivered by Sunjoy. Agency brands are described on the HANGE site.',
    },
    history: {
      title: 'History',
      kicker: 'History',
      lead: 'The stages Hange has walked. Eras on the left; key nodes along a timeline on the right.',
      eras: [
        {
          name: 'Retail era',
          text: 'It began in retail: facing daily demand in the shop, making goods and service something you could see and check.',
        },
        {
          name: 'Channel era',
          text: 'Steady supply moved into the dealer network. Reliability of delivery came before a one-off push of goods.',
        },
        {
          name: 'Supply-chain era',
          text: 'A supply-chain entity took procurement, warehousing, and kit supply as one, so each brand kept a clear role on the same chain.',
        },
        {
          name: 'Platform era',
          text: 'Digital tools and the brand matrix turned expertise into a reusable platform: less repeated labour, more exact decisions.',
        },
        {
          name: 'Future',
          text: 'Return to the problem. Not another copy of what the market already sells. Do the hard and correct thing, and let time shape the next form.',
        },
      ],
      events: [
        { date: '2008', text: 'Retail points opened; supply faced the user directly.' },
        { date: '2013', text: 'The dealer network took shape, with steady delivery first.' },
        { date: '2016', text: 'The supply-chain entity began to run procurement, warehousing, and kits.' },
        { date: '2021', text: 'Brand matrix and digital tools in parallel; expertise began to platform.' },
        { date: '2026', text: 'The next stage: products from first principles, partnerships over the long horizon.' },
      ],
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
      title: 'People',
      kicker: 'People',
      lead: 'Openings are listed here. Interviews are at HANGECHAIN headquarters. If no listing matches, you may still apply with a resume.',
      jobsKicker: 'Openings',
      jobsTitle: 'Roles',
      jobsEmpty: 'No openings are listed. Open applications are still welcome.',
      jobApply: 'Apply for this role',
      interviewKicker: 'Interview',
      interviewTitle: 'Interview location',
      interviewName: '汉格供应链总部',
      interviewNameEn: 'HANGECHAIN Headquarters',
      applyKicker: 'Apply',
      applyTitle: 'Application',
      applyLead: 'Leave your details and upload a resume. You may match a listing above, or apply openly.',
    },
  },
} as const

export function pageTitle(locale: Locale, page: string) {
  const t = copy[locale]
  return page === t.siteTitle ? t.siteTitle : `${page} · ${t.siteTitle}`
}
