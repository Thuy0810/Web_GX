export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isHot?: boolean;
  inStock?: boolean;
  description?: string;
  instructions?: string[];
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Combo Hosting Premium 12 Thang",
    price: 199000,
    originalPrice: 299000,
    image: "/placeholder.svg",
    category: "Hosting",
    isHot: true,
    inStock: true,
    description:
      "Goi hosting toc do cao, ho tro SSL, backup tu dong va boi thuong uptime.",
    instructions: [
      "Dat hang va hoan tat thanh toan",
      "Nhan thong tin dich vu qua email",
      "Dang nhap trang quan tri de su dung",
    ],
  },
  {
    id: 2,
    name: "Tai Khoan AI Pro 1 Thang",
    price: 149000,
    originalPrice: 199000,
    image: "/placeholder.svg",
    category: "AI Tools",
    isHot: true,
    inStock: true,
    description: "Tai khoan AI da kich hoat san, su dung ngay sau khi mua.",
    instructions: [
      "Nhan tai khoan va mat khau qua email",
      "Dang nhap theo huong dan gui kem",
      "Doi mat khau lan dau de tang bao mat",
    ],
  },
  {
    id: 3,
    name: "Theme WordPress Ban Quyen",
    price: 89000,
    image: "/placeholder.svg",
    category: "Theme",
    inStock: true,
    description: "Theme chuan SEO, responsive, toi uu toc do tai trang.",
    instructions: [
      "Tai file theme sau thanh toan",
      "Vao wp-admin > Appearance > Themes",
      "Upload file zip va kich hoat",
    ],
  },
  {
    id: 4,
    name: "Plugin Bao Mat Pro",
    price: 129000,
    originalPrice: 169000,
    image: "/placeholder.svg",
    category: "Plugin",
    inStock: true,
    description: "Bao ve website khoi tan cong bot, spam va malware.",
    instructions: [
      "Cai dat plugin tu file zip",
      "Nhap license duoc cap",
      "Bat cac tinh nang de xuat",
    ],
  },
  {
    id: 5,
    name: "Khoa Hoc Next.js Tu Co Ban",
    price: 299000,
    image: "/placeholder.svg",
    category: "Khoa hoc",
    inStock: true,
    description: "Khoa hoc video tu co ban den trien khai du an thuc te.",
    instructions: [
      "Nhan link khoa hoc qua email",
      "Dang nhap tai khoan hoc tap",
      "Hoc theo lo trinh tung bai",
    ],
  },
  {
    id: 6,
    name: "Tai Khoan Canva Pro 3 Thang",
    price: 99000,
    originalPrice: 149000,
    image: "/placeholder.svg",
    category: "Design",
    inStock: true,
    description: "Tai khoan Canva Pro, ho tro day du mau thiet ke cao cap.",
    instructions: [
      "Cung cap email nhan loi moi",
      "Chap nhan invite vao team",
      "Su dung ngay sau khi kich hoat",
    ],
  },
];

export function getProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id);
}
