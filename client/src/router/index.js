import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/Layouts/AppLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import BoardLayout from "@/Layouts/BoardLayout.vue"
import LandingLayout from "@/Layouts/LandingLayout.vue"
import AdminLayout from "@/Layouts/AdminLayout.vue"
import { createPinia } from "pinia";
import { useCurrentUser } from "@/stores/auth";

const pinia = createPinia();
const currentUserStore = useCurrentUser(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "boards",
      meta: {
        layout: AppLayout,
        auth: true,
        admin: false
      },
      component: () => import('../views/Boards.vue'),
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import('../views/admin/index.vue'),
    },
    {
      path: "/admin/users",
      name: "users",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import('../views/admin/Users.vue'),
    },
    {
      path: "/admin/workspaces",
      name: "adminworkspaces",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import('../views/admin/Workspaces.vue'),
    },
    {
      path: "/admin/blog",
      name: "adminBlogPosts",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import("../views/admin/BlogPosts.vue")
    },
    {
      path: "/admin/blog/create",
      name: "createBlogPost",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import("../views/admin/CreateBlogPost.vue")
    },
    {
      path: "/admin/blog/:blogPostId",
      name: "adminPost",
      meta: {
        layout: AdminLayout,
        auth: true,
        admin: true
      },
      component: () => import("../views/admin/BlogPost.vue")
    },
    {
      path: "/home/blog/:blogPostId",
      name: "post",
      meta: {
        layout: LandingLayout,
        auth: false,
        admin: false
      },
      component: () => import("../views/landing/BlogPost.vue")
    },
    {
      path: "/home/blog",
      name: "blogs",
      meta: {
        layout: LandingLayout,
        auth: false,
        admin: false
      },
      component: () => import("../views/landing/Blogs.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/Settings.vue"),
      meta: {
        admin: false,
        layout: AppLayout,
        auth: true
      },
    },
    {
      path: "/admin/settings",
      name: "admin-settings",
      component: () => import("../views/Settings.vue"),
      meta: {
        admin: true,
        layout: AdminLayout,
        auth: true
      },
    },
    {
      path: "/admin/premiumRequests",
      name: "premiumRequests",
      component: () => import("../views/admin/PremiumRequests.vue"),
      meta: {
        admin: true,
        layout: AdminLayout,
        auth: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        layout: AuthLayout,
        auth: false
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/ForgotPassword.vue"),
      meta: {
        layout: AuthLayout,
        auth: false
      },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("../views/ResetPassword.vue"),
      meta: {
        layout: AuthLayout,
        auth: false
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        layout: AuthLayout,
        auth: false
      },
    },
    {
      path: "/w/settings/:workspaceId",
      name: "workspacesettings",
      component: () => import("../views/WorkspaceSettings.vue"),
      meta: {
        layout: AppLayout,
        auth: true
      },
    },
    {
      path: "/w/:workspaceId",
      name: "workspaceBoards",
      component: () => import("../views/WorkspaceBoards.vue"),
      meta: {
        layout: AppLayout,
        auth: true
      },
    },
    {
      path: "/b/:boardId",
      name: "Board",
      component: () => import("../views/Board.vue"),
      meta: {
        layout: BoardLayout,
        auth: true
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/landing/index.vue"),
      meta: {
        layout: LandingLayout,
        auth: false
      },
    },
    {
      path: "/home/about",
      name: "about",
      component: () => import("../views/landing/About.vue"),
      meta: {
        layout: LandingLayout,
        auth: false
      }
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: () => import("../views/VerifyEmail.vue"),
      meta: {
        auth: null
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "ErrorView",
      component: () => import("../views/Error.vue"),
      meta: {
        auth: true
      }
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    await currentUserStore.getUser();
    const isAuth = !!currentUserStore.user.id;
    const isAdmin = currentUserStore.user && currentUserStore.user.role === 'admin';
    // Redirect unauthenticated users to the home page if the route requires authentication
    if (to.meta.auth && !isAuth) {
      next({ name: "home" });
      return;
    }

    // Redirect authenticated users away from non-auth pages
    if (to.meta.auth === false && isAuth) {
      next({ name: "boards" });
      return;
    }

    // Redirect non-admin users away from admin-only pages
    if (to.meta.admin && !isAdmin) {
      next({ name: 'boards' });
      return;
    }

    if (!to.meta.admin && isAdmin) {
      next({ name: 'admin' })
      return;
    }

    next(); // Proceed to the requested route
  } catch (err) {
    console.log(err);
  }
});
export default router;
