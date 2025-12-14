import DashboardHome from "../pages/backend/dashboardhome";
import { BannerAdd, BannerEdit,BannerDetail, BannerList } from "../pages/backend/banner";
import { BrandAdd, BrandDetail, BrandEdit, BrandList } from "../pages/backend/brand";
import { CategoryAdd, CategoryEdit,CategoryDetail, CategoryList } from "../pages/backend/category";
import { ContactAdd, ContactEdit, ContactList } from "../pages/backend/contact";
import { ProductAdd, ProductDetail, ProductEdit, ProductList } from "../pages/backend/product";
import { PostAdd, PostDetail, PostEdit, PostList } from "../pages/backend/post";
import { TopicAdd, TopicEdit,TopicDetail, TopicList } from "../pages/backend/topic";
import { UserAdd, UserDetail, UserEdit, UserList } from "../pages/backend/user";
import { OrderAdd, OrderDetail, OrderEdit, OrderList } from "../pages/backend/order";
import { MenuAdd, MenuEdit,MenuDetail, MenuList } from "../pages/backend/menu";

const adminRoutes = [
  { path: "", element: <DashboardHome /> }, // Trang dashboard chính

  // Banner
  { path: "banner", element: <BannerList /> },
  { path: "banner/add", element: <BannerAdd /> },
  { path: "banner/edit/:id", element: <BannerEdit /> },
   { path: "banner/detail/:id", element: <BannerDetail /> },

  // Brand
  { path: "brand", element: <BrandList /> },
  { path: "brand/add", element: <BrandAdd /> },
  { path: "brand/edit/:id", element: <BrandEdit /> },
  { path: "brand/detail/:id", element: <BrandDetail /> },

  // Category
  { path: "category", element: <CategoryList /> },
  { path: "category/add", element: <CategoryAdd /> },
  { path: "category/edit/:id", element: <CategoryEdit /> },
  { path: "category/detail/:id", element: <CategoryDetail /> },

  // Contact
  { path: "contact", element: <ContactList /> },
  { path: "contact/add", element: <ContactAdd /> },
  { path: "contact/edit/:id", element: <ContactEdit /> },

  // Product
  { path: "product", element: <ProductList /> },
  { path: "product/add", element: <ProductAdd /> },
  { path: "product/edit/:id", element: <ProductEdit /> },
  { path: "product/detail/:id", element: <ProductDetail /> },
  // Post
  { path: "post", element: <PostList /> },
  { path: "post/add", element: <PostAdd /> },
  { path: "post/edit/:id", element: <PostEdit /> },
 { path: "post/detail/:id", element: <PostDetail /> },
  // Topic
  { path: "topic", element: <TopicList /> },
  { path: "topic/add", element: <TopicAdd /> },
  { path: "topic/edit/:id", element: <TopicEdit /> },
{ path: "topic/detail/:id", element: <TopicDetail /> },
  // User
  { path: "user", element: <UserList /> },
  { path: "user/add", element: <UserAdd /> },
  { path: "user/edit/:id", element: <UserEdit /> },
{ path: "user/detail/:id", element: <UserDetail /> },
  // Order
  { path: "order", element: <OrderList /> },
  { path: "order/add", element: <OrderAdd /> },
  { path: "order/edit/:id", element: <OrderEdit /> },
{ path: "order/detail/:id", element: <OrderDetail /> },
  // Menu
  { path: "menu", element: <MenuList /> },
  { path: "menu/add", element: <MenuAdd /> },
  { path: "menu/edit/:id", element: <MenuEdit /> },
    { path: "menu/detail/:id", element: <MenuDetail /> },
];

export default adminRoutes;