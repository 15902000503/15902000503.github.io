import type { Product } from './types'

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

const COLORS = {
  black: { name: 'Black', hex: '#1f2937' },
  white: { name: 'White', hex: '#f8fafc' },
  navy: { name: 'Navy', hex: '#1e3a5f' },
  red: { name: 'Red', hex: '#dc2626' },
  green: { name: 'Green', hex: '#16a34a' },
  yellow: { name: 'Yellow', hex: '#facc15' },
  pink: { name: 'Pink', hex: '#ec4899' },
  grey: { name: 'Grey', hex: '#6b7280' },
  blue: { name: 'Blue', hex: '#3b82f6' },
  beige: { name: 'Beige', hex: '#d6c7a1' },
}

/** 商品静态数据，可自行增删改 */
export const products: Product[] = [
  {
    id: 1,
    slug: 'classic-oxford-shirt',
    name: { en: 'Classic Oxford Shirt', zh: '经典牛津衬衫' },
    brand: 'Urban Thread',
    category: 'mens',
    price: 39.99,
    oldPrice: 59.99,
    rating: 4.5,
    reviewCount: 2368,
    images: [
      img('photo-1596755094514-f87e34085b2c'),
      img('photo-1602810318383-eef946ba2f27'),
      img('photo-1594938298669-ce556def2ca0'),
    ],
    colors: [COLORS.white, COLORS.navy, COLORS.black],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badges: ['sale'],
    shortDescription: {
      en: 'A timeless button-down crafted from breathable cotton oxford.',
      zh: '采用透气棉质牛津布制成的经典纽扣衬衫，永不过时。',
    },
    description: {
      en: 'This classic oxford shirt pairs a refined collar with soft, durable cotton. Perfect for the office or a weekend brunch, it features a tailored fit, mother-of-pearl buttons and a reinforced placket that keeps its shape wash after wash.',
      zh: '这款经典牛津衬衫将考究的领型与柔软耐用的棉质面料相结合。无论是通勤办公还是周末早午餐都非常合适——修身剪裁、贝母纽扣、加固门襟，久穿久洗依然挺括有型。',
    },
    features: [
      { en: '100% breathable cotton oxford', zh: '100% 透气棉质牛津布' },
      { en: 'Tailored fit with classic collar', zh: '修身剪裁，经典领型' },
      { en: 'Machine washable at 30°C', zh: '30°C 可机洗' },
      { en: 'Mother-of-pearl buttons', zh: '贝母纽扣' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Daniel K.',
        rating: 5,
        date: '2026-09-18',
        content: {
          en: 'Great fabric quality and the fit is exactly as described.',
          zh: '面料质感很好，版型与描述完全一致。',
        },
      },
      {
        id: 2,
        author: 'Marta S.',
        rating: 4,
        date: '2026-08-02',
        content: {
          en: 'Bought one more after the first wash held up so well.',
          zh: '第一次水洗后依然如新，于是又买了一件。',
        },
      },
    ],
  },
  {
    id: 2,
    slug: 'slim-chino-trousers',
    name: { en: 'Slim Chino Trousers', zh: '修身休闲裤' },
    brand: 'Urban Thread',
    category: 'mens',
    price: 49.0,
    rating: 4.3,
    reviewCount: 2154,
    images: [
      img('photo-1555529669-e69e7aa0ba9a'),
      img('photo-1473966968820-ac60e9c324bc'),
    ],
    colors: [COLORS.beige, COLORS.navy, COLORS.black],
    sizes: ['28', '30', '32', '34', '36'],
    badges: ['new'],
    shortDescription: {
      en: 'Stretch-cotton chinos with a modern slim silhouette.',
      zh: '弹力棉质休闲裤，现代修身廓形。',
    },
    description: {
      en: 'Cut from a comfortable stretch cotton twill, these slim chinos move with you through busy days. Finished with a clean waistband, hidden coin pocket and tapered leg for a sharp, modern look.',
      zh: '采用舒适的弹力棉斜纹布裁剪，修身裤型让你忙碌一天依旧轻松自如。简洁腰头、隐藏零钱袋与锥形裤脚，塑造利落现代的造型。',
    },
    features: [
      { en: 'Stretch cotton twill', zh: '弹力棉斜纹布' },
      { en: 'Slim tapered leg', zh: '修身锥形裤脚' },
      { en: 'Hidden coin pocket', zh: '隐藏零钱袋' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Leo M.',
        rating: 4,
        date: '2026-10-01',
        content: {
          en: 'Comfortable and versatile — my go-to work trousers now.',
          zh: '舒适百搭，现在成了我的上班首选裤。',
        },
      },
    ],
  },
  {
    id: 3,
    slug: 'wool-blend-overcoat',
    name: { en: 'Wool Blend Overcoat', zh: '羊毛混纺大衣' },
    brand: 'North Line',
    category: 'mens',
    price: 159.0,
    oldPrice: 199.0,
    rating: 4.8,
    reviewCount: 3421,
    images: [
      img('photo-1544022613-e87c8b33b41b'),
      img('photo-1591047139808-ca29a2df926a'),
    ],
    colors: [COLORS.black, COLORS.grey, COLORS.navy],
    sizes: ['M', 'L', 'XL', 'XXL'],
    badges: ['hot'],
    shortDescription: {
      en: 'A warm, sharply tailored overcoat for cold seasons.',
      zh: '保暖又挺括的剪裁大衣，为寒冷季节而生。',
    },
    description: {
      en: 'This wool blend overcoat combines heritage tailoring with everyday practicality. A full satin lining, notch lapels and side slash pockets make it the finishing piece of any winter wardrobe.',
      zh: '这款羊毛混纺大衣将传统工艺与日常实用性融为一体。全缎内衬、平驳领与侧插袋，让它成为冬季衣橱的点睛之笔。',
    },
    features: [
      { en: '70% wool blend fabric', zh: '70% 羊毛混纺面料' },
      { en: 'Full satin lining', zh: '全缎面内衬' },
      { en: 'Notch lapel collar', zh: '平驳领设计' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Hugo B.',
        rating: 5,
        date: '2026-11-02',
        content: {
          en: 'Feels premium, keeps me warm down to -5°C.',
          zh: '质感高级，零下 5 度也能保暖。',
        },
      },
    ],
  },
  {
    id: 4,
    slug: 'floral-summer-dress',
    name: { en: 'Floral Summer Dress', zh: '碎花夏日连衣裙' },
    brand: 'Bloom & Co',
    category: 'women',
    price: 45.99,
    oldPrice: 65.0,
    rating: 4.6,
    reviewCount: 4276,
    images: [
      img('photo-1490481651871-ab68de25d43d'),
      img('photo-1515372039740-b88df843ae11'),
      img('photo-1487412720507-e751944a98af'),
    ],
    colors: [COLORS.pink, COLORS.white, COLORS.yellow],
    sizes: ['XS', 'S', 'M', 'L'],
    badges: ['sale'],
    shortDescription: {
      en: 'Lightweight A-line dress with a hand-drawn floral print.',
      zh: '轻盈 A 字版型连衣裙，手绘风印花。',
    },
    description: {
      en: 'Sun-ready and effortless, this A-line dress flows with every step. The viscose fabric breathes in the heat, while the hand-drawn floral print adds a romantic touch to warm afternoons.',
      zh: '为阳光而生的轻盈连衣裙，每一步都灵动飘逸。粘胶面料透气凉爽，手绘花卉印花为温暖午后增添浪漫气息。',
    },
    features: [
      { en: 'Breathable viscose fabric', zh: '透气粘胶面料' },
      { en: 'A-line flattering silhouette', zh: '显身材 A 字版型' },
      { en: 'Hidden side pockets', zh: '隐藏侧口袋' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Amelia R.',
        rating: 5,
        date: '2026-07-21',
        content: {
          en: 'Perfect for summer holidays, got so many compliments!',
          zh: '度假必备，收到了好多夸奖！',
        },
      },
      {
        id: 2,
        author: 'Chloe L.',
        rating: 4,
        date: '2026-06-30',
        content: {
          en: 'Runs slightly large, consider sizing down.',
          zh: '版型偏大，建议选小一码。',
        },
      },
    ],
  },
  {
    id: 5,
    slug: 'high-waist-jeans',
    name: { en: 'High Waist Jeans', zh: '高腰牛仔裤' },
    brand: 'Bloom & Co',
    category: 'women',
    price: 55.0,
    rating: 4.4,
    reviewCount: 2890,
    images: [
      img('photo-1541099649105-f69ac290fa1f'),
      img('photo-1584785939610-b745e252be26'),
    ],
    colors: [COLORS.blue, COLORS.black, COLORS.white],
    sizes: ['24', '26', '28', '30', '32'],
    badges: ['hot'],
    shortDescription: {
      en: 'Vintage-wash high-rise denim with a straight leg.',
      zh: '复古水洗高腰直筒牛仔裤。',
    },
    description: {
      en: 'A modern take on the vintage straight-leg jean. Mid-weight rigid denim holds its shape, the high waist flatters, and a subtle stone wash gives it an instantly worn-in feel.',
      zh: '对复古直筒牛仔裤的现代演绎。中等克重硬挺牛仔布不易变形，高腰设计修饰身形，石水洗工艺带来自然的穿着质感。',
    },
    features: [
      { en: 'Mid-weight rigid denim', zh: '中等克重硬挺牛仔布' },
      { en: 'High-rise straight leg', zh: '高腰直筒版型' },
      { en: 'Stone washed finish', zh: '石水洗工艺' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Ivy W.',
        rating: 5,
        date: '2026-09-12',
        content: {
          en: 'Best fitting jeans I have owned in years.',
          zh: '多年来穿过版型最好的牛仔裤。',
        },
      },
    ],
  },
  {
    id: 6,
    slug: 'silk-blouse',
    name: { en: 'Silk Touch Blouse', zh: '真丝触感衬衫' },
    brand: 'Maison Lum',
    category: 'women',
    price: 69.0,
    oldPrice: 89.0,
    rating: 4.7,
    reviewCount: 2043,
    images: [
      img('photo-1551027719-90bdd172b42e'),
      img('photo-1485469657522-335880d25bc4'),
    ],
    colors: [COLORS.white, COLORS.black, COLORS.pink],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['new'],
    shortDescription: {
      en: 'Fluid satin blouse with a elegant drape.',
      zh: '垂坠感极佳的缎面衬衫。',
    },
    description: {
      en: 'This satin-touch blouse drapes beautifully and catches the light with every movement. Designed for boardroom-to-dinner versatility, it finishes with covered buttons and a soft stand collar.',
      zh: '这款缎感衬衫垂坠优雅，随动作流转光泽。从会议室到晚宴皆可驾驭，包扣设计与温柔立领尽显精致。',
    },
    features: [
      { en: 'Satin-touch fluid fabric', zh: '缎感垂坠面料' },
      { en: 'Soft stand collar', zh: '温柔立领' },
      { en: 'Concealed button placket', zh: '隐藏门襟' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Nina F.',
        rating: 5,
        date: '2026-10-20',
        content: {
          en: 'Elegant and comfortable — wears beautifully all day.',
          zh: '优雅舒适，穿一整天都很得体。',
        },
      },
    ],
  },
  {
    id: 7,
    slug: 'kids-cotton-hoodie',
    name: { en: 'Kids Cotton Hoodie', zh: '儿童棉质卫衣' },
    brand: 'Tiny Steps',
    category: 'kids',
    price: 24.99,
    rating: 4.9,
    reviewCount: 3155,
    images: [
      img('photo-1519238203854-03560f2e1d4e'),
      img('photo-1503944583220-79d89ac0e8e9'),
    ],
    colors: [COLORS.red, COLORS.blue, COLORS.green],
    sizes: ['2Y', '4Y', '6Y', '8Y', '10Y'],
    badges: ['hot'],
    shortDescription: {
      en: 'Soft brushed-cotton hoodie built for playgrounds.',
      zh: '柔软磨毛棉卫衣，为操场而生。',
    },
    description: {
      en: 'Play-proof and cozy: brushed cotton fleece inside, a roomy kangaroo pocket and a double-layer hood that keeps little ones warm without the bulk.',
      zh: '耐穿又舒适：内里磨毛棉绒、大袋鼠口袋、双层帽檐，让小朋友温暖而不臃肿。',
    },
    features: [
      { en: 'Brushed cotton fleece', zh: '磨毛棉绒内里' },
      { en: 'Double-layer hood', zh: '双层帽檐' },
      { en: 'Reinforced seams', zh: '加固缝线' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Sarah T.',
        rating: 5,
        date: '2026-09-05',
        content: {
          en: 'My kid refuses to take it off. Holds up great in the wash.',
          zh: '孩子爱不释手，水洗后依旧如新。',
        },
      },
    ],
  },
  {
    id: 8,
    slug: 'kids-rainbow-sneakers',
    name: { en: 'Kids Rainbow Sneakers', zh: '儿童彩虹运动鞋' },
    brand: 'Tiny Steps',
    category: 'kids',
    price: 34.5,
    oldPrice: 45.0,
    rating: 4.5,
    reviewCount: 2487,
    images: [
      img('photo-1514989943764-eb449d62a661'),
      img('photo-1497035010947-3daebf2592ad'),
    ],
    colors: [COLORS.white, COLORS.pink, COLORS.yellow],
    sizes: ['25', '27', '29', '31', '33'],
    badges: ['sale'],
    shortDescription: {
      en: 'Lightweight sneakers with a rainbow sole.',
      zh: '轻量运动鞋，彩虹鞋底点缀。',
    },
    description: {
      en: 'Flexible, breathable and fun — a hook-and-loop strap gets them out the door fast, while the cushioned rainbow-rubber sole grips the playground.',
      zh: '柔软、透气又有趣——魔术贴设计穿脱快捷，缓震彩虹橡胶底提供操场级抓地力。',
    },
    features: [
      { en: 'Hook-and-loop strap', zh: '魔术贴设计' },
      { en: 'Cushioned rubber sole', zh: '缓震橡胶底' },
      { en: 'Breathable upper', zh: '透气鞋面' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Kevin Z.',
        rating: 4,
        date: '2026-08-19',
        content: {
          en: 'Easy on, easy off — perfect first-day-of-school shoes.',
          zh: '穿脱方便，开学第一天就派上用场。',
        },
      },
    ],
  },
  {
    id: 9,
    slug: 'kids-graphic-tee-set',
    name: { en: 'Kids Graphic Tee 3-Pack', zh: '儿童图案 T 恤三件装' },
    brand: 'Tiny Steps',
    category: 'kids',
    price: 27.0,
    rating: 4.2,
    reviewCount: 2098,
    images: [
      img('photo-1503919545889-aef636e10793'),
      img('photo-1519238203854-03560f2e1d4e'),
    ],
    colors: [COLORS.white, COLORS.blue, COLORS.green],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    badges: ['new'],
    shortDescription: {
      en: 'Three organic-cotton tees with playful prints.',
      zh: '三件装有机棉 T 恤，趣味印花。',
    },
    description: {
      en: 'A value 3-pack of soft organic cotton tees in playful prints. Pre-shrunk and colour-fast, they survive the wash cycle and the playground alike.',
      zh: '三件装柔软有机棉 T 恤，印花活泼有趣。预缩水、不褪色，经得起洗衣机和操场的双重考验。',
    },
    features: [
      { en: 'GOTS certified organic cotton', zh: 'GOTS 认证有机棉' },
      { en: 'Pre-shrunk & colour-fast', zh: '预缩水、不褪色' },
    ],
    inStock: true,
    reviews: [],
  },
  {
    id: 10,
    slug: 'daily-vitamin-serum',
    name: { en: 'Daily Vitamin C Serum', zh: '每日维 C 精华' },
    brand: 'Pure Ritual',
    category: 'wellness',
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.6,
    reviewCount: 4512,
    images: [
      img('photo-1620916566599-457738820c3c'),
      img('photo-1556911220-bff31c812dba'),
    ],
    colors: [],
    sizes: ['30ml', '50ml'],
    badges: ['sale', 'hot'],
    shortDescription: {
      en: 'Brightening serum with 15% vitamin C and hyaluronic acid.',
      zh: '15% 维 C + 玻尿酸，提亮肤色精华。',
    },
    description: {
      en: 'A lightweight morning serum that layers under sunscreen and makeup. 15% stabilised vitamin C brightens, hyaluronic acid hydrates, and vitamin E defends against daily stress.',
      zh: '轻盈的晨间精华，可叠加防晒霜与彩妆使用。15% 稳定维 C 提亮肤色，玻尿酸深层补水，维 E 抵御日常氧化压力。',
    },
    features: [
      { en: '15% stabilised vitamin C', zh: '15% 稳定维 C' },
      { en: 'With hyaluronic acid', zh: '含玻尿酸' },
      { en: 'Fragrance free', zh: '无香精' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Grace H.',
        rating: 5,
        date: '2026-10-11',
        content: {
          en: 'Skin looks noticeably brighter after three weeks.',
          zh: '用了三周，肤色明显提亮了。',
        },
      },
    ],
  },
  {
    id: 11,
    slug: 'bamboo-yoga-mat',
    name: { en: 'Bamboo Yoga Mat', zh: '竹纤维瑜伽垫' },
    brand: 'Pure Ritual',
    category: 'wellness',
    price: 48.0,
    rating: 4.4,
    reviewCount: 2231,
    images: [
      img('photo-1592883415431-3f2b412d9a17'),
      img('photo-1506126613408-eca07ce68773'),
    ],
    colors: [COLORS.green, COLORS.grey],
    sizes: ['Standard', 'Long'],
    badges: ['new'],
    shortDescription: {
      en: 'Non-slip natural rubber mat with a bamboo fibre top.',
      zh: '天然橡胶防滑垫，竹纤维表层。',
    },
    description: {
      en: 'Grip that holds in hot classes, thanks to the moisture-wicking bamboo fibre surface over a natural rubber base. Rolls up tight and comes with a carry strap.',
      zh: '竹纤维表层吸湿排汗，搭配天然橡胶底，高温瑜伽课也稳稳抓地。可卷收紧凑，附赠背带。',
    },
    features: [
      { en: 'Natural rubber base', zh: '天然橡胶底' },
      { en: 'Moisture-wicking bamboo surface', zh: '竹纤维吸湿表层' },
      { en: 'Includes carry strap', zh: '附赠背带' },
    ],
    inStock: true,
    reviews: [],
  },
  {
    id: 12,
    slug: 'aroma-candle-set',
    name: { en: 'Aroma Candle Gift Set', zh: '香薰蜡烛礼盒' },
    brand: 'Hygge Lab',
    category: 'wellness',
    price: 36.0,
    oldPrice: 49.0,
    rating: 4.8,
    reviewCount: 3689,
    images: [
      img('photo-1602874806546-1b30b2d1f9c8'),
      img('photo-1603909536043-2c9e3e0060a7'),
    ],
    colors: [],
    sizes: ['Set of 3', 'Set of 6'],
    badges: ['sale'],
    shortDescription: {
      en: 'Soy-wax candles in cedar, vanilla and sea salt scents.',
      zh: '大豆蜡蜡烛，雪松 / 香草 / 海盐三种香型。',
    },
    description: {
      en: 'Hand-poured soy wax candles with cotton wicks, in three signature scents. A 45-hour burn each, presented in a giftable kraft box.',
      zh: '手工浇注大豆蜡、棉质烛芯，三种招牌香型。单枚可燃 45 小时，牛皮纸礼盒包装，送礼体面。',
    },
    features: [
      { en: '100% soy wax, cotton wick', zh: '100% 大豆蜡，棉质烛芯' },
      { en: '45-hour burn time', zh: '45 小时燃烧时长' },
      { en: 'Giftable kraft box', zh: '礼盒包装' },
    ],
    inStock: true,
    reviews: [
      {
        id: 1,
        author: 'Emma J.',
        rating: 5,
        date: '2026-11-01',
        content: {
          en: 'Beautiful scents, zero soot. The box looks premium too.',
          zh: '香气高级，无黑烟，礼盒质感也很棒。',
        },
      },
    ],
  },
]

export function findProduct(idOrSlug: number | string) {
  const key = String(idOrSlug)
  return products.find((p) => String(p.id) === key || p.slug === key)
}

export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  )
  return [...same, ...others].slice(0, limit)
}
