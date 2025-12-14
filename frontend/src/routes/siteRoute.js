import Home from "../pages/frontend/home";
import Introduce from "../pages/frontend/introduce";
import PostDetail from "../pages/frontend/post/detail";
import Post from "../pages/frontend/post";
import Product from "../pages/frontend/product";
import ProductDetail from "../pages/frontend/product/detail";
import Contact from "../pages/frontend/contact";
import Login from "../pages/frontend/user/login";
import Register from "../pages/frontend/user/register";
import Profile from "../pages/frontend/user/profile";
import Cart from "../pages/frontend/cart";
import Checkout from "../pages/frontend/cart/checkout";
// ⚠️ Cần thêm các import này
import ProfileEdit from "../pages/frontend/user/ProfileEdit";
import ChangePassword from "../pages/frontend/user/ChangePassword";

const siteRoutes = [
  { path: "", element: Home }, // Trang chủ
  { path: "gioi-thieu", element: Introduce },
  { path: "san-pham", element: Product },
  { path: "san-pham/:slug", element: ProductDetail },
  { path: "bai-viet", element: Post },
{ path: "post/:id", element: PostDetail },
{ path: "bai-viet/:id", element: PostDetail }, 
  { path: "lien-he", element: Contact },
  { path: "dang-nhap", element: Login },
  { path: "dang-ky", element: Register },
  { path: "thong-tin", element: Profile },
  { path: "gio-hang", element: Cart },
  { path: "thanh-toan", element: Checkout },
  // 🆕 Thêm route Chỉnh sửa Hồ sơ
  { path: "thong-tin/chinh-sua", element: ProfileEdit },
  
  // 🆕 Thêm route Đổi Mật khẩu
  { path: "thong-tin/doi-mat-khau", element: ChangePassword },
];

export default siteRoutes;