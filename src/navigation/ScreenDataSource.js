import { Icons } from "../utils/fontUtils";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

//DRAVER SCREENS
import Welcome from "../screens/ScreenPages/Welcome";

// HOME STACK > TOP TAB SCREEN
import Talepler from "../screens/ScreenPages/Talepler";
import Istekler from "../screens/ScreenPages/Istekler";

// HOME STACK > BOTTOM TAB SCREEN
import TalepGiris from "../screens/ScreenPages/TalepGiris";
import TalepBildirim from "../screens/ScreenPages/TalepBildirim";
import Closed from "../screens/ScreenPages/Closed";
import ODataListApp from "../screens/ScreenPages/ODataListApp";

// Drawer - Master Side Menu
export const DrawerScreens = [
  { isShowMenu:true, route: 'Home', label: 'Proje Yönetimi', type: Icons.AntDesign  , icon: 'barschart', isActive:true, component: null, notification: 0 }, // Elleme Home Stack! // Stack Genişi TopTabScreen'e geçiş için kullanılıyor.
  { isShowMenu:true, route: 'musteridegerlendirme', label: 'Değerlendirmeler', type: Icons.Feather, icon: 'pie-chart', isActive:true,component: Welcome, notification: 0, }
];

// HOME STACK > TOP TAB SCREEN (Üst)
export const TopTabScreens = [
  { route: 'tamamlananlar', label: 'Görevler', type: Icons.Feather, icon: 'inbox', isActive:true,component: Istekler, notification: 0, },
  { route: 'bekleyenler', label: 'Açık', type: Icons.Feather, icon: 'home', isActive:true, component: Talepler, notification: 0, },
  { route: 'aciklar', label: 'Kapalı', type: Icons.Feather, icon: 'home', isActive:true, component: ODataListApp, notification: 0, },
];


// HOME STACK > BOTTOM TAB SCREEN (Alt)
export const TabScreens = [
  
  { route: 'talepgiris', label: 'Talep Bildirim', type: Icons.Entypo, icon: 'back-in-time', isActive:true, component: TalepBildirim, notification: 0, },
  { route: 'Home', label: 'Talepler', type: Icons.AntDesign  , icon: 'barschart', isActive:true, component: null, notification: 0, }, // Elleme Home Stack! // Stack Genişi TopTabScreen'e geçiş için kullanılıyor.
  { route: 'musteriefor', label: 'Yeni Talep', type: Icons.Entypo, icon: 'back-in-time', isActive:true, component: TalepGiris, notification: 0, },
];


// Kullanılmıyor şimdilik
export const ActionMenuDataSource = [
  { title: "Action 1", icon: "list", isActive:false, color: DefaultThemeProperty.Basic_color1, iconType: Icons.Ionicons },
  { title: "Action 2", icon: "home", isActive:false, color: DefaultThemeProperty.Basic_color2, iconType: Icons.Entypo },
  { title: "Action 3", icon: "inbox", isActive:false,color: DefaultThemeProperty.Basic_color3, iconType: Icons.Feather },
  { title: "Action 4", icon: "plus", isActive:false, color: DefaultThemeProperty.Basic_color4, iconType: Icons.AntDesign },
  { title: "Action 5", icon: "info", isActive:false, color: DefaultThemeProperty.Basic_color5, iconType: Icons.MaterialIcons },
]

// Kullanılmıyor şimdilik
export const ProfileMenu = [
  { label: 'About Us', icon: 'info',isActive:true, iconType: Icons.MaterialIcons, action:"goAbout" },
  { label: 'Phone', icon: 'phone', isActive:true,iconType: Icons.MaterialIcons, action:"linkPhone" },
  { label: 'Email', icon: 'mail', isActive:true,iconType: Icons.MaterialIcons, action:"linkEmail" },
  { label: 'Website', icon: 'network', isActive:true,iconType: Icons.Entypo, action:"linkWebsite" },
  { label: 'Share', icon: 'share', isActive:false, iconType: Icons.MaterialIcons, action:"share" },
  { label: 'Logout', icon: 'logout', isActive:true,iconType: Icons.MaterialIcons, action:"logout" },
]