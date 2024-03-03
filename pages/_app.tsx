import {
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import { AppIcon } from "src/components/app-icon";
import { supabaseClient } from "src/utility";
import { AppstoreOutlined, DashboardOutlined, DeliveredProcedureOutlined, MenuOutlined, ProjectOutlined, SolutionOutlined, StarOutlined, StarTwoTone, TableOutlined, UserOutlined } from "@ant-design/icons";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="Training Wheels"
            icon={<AppIcon />}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(supabaseClient)}
                authProvider={authProvider}
                liveProvider={liveProvider(supabaseClient)}
                notificationProvider={useNotificationProvider}
                i18nProvider={i18nProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    create: "/dashboard/create",
                    edit: "/dashboard/edit/:id",
                    show: "/dashboard/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<DashboardOutlined/>,
                      
                    },
                  },
                  {
                    name: "operations",
                    meta: {
                      canDelete: true,
                      icon:<MenuOutlined />,
                    },
                  },
                  {
                    name: "Standard Method & Procedure (SMP)",
                    list: "/SMP",
                    create: "/SMP/create",
                    edit: "/SMP/edit/:id",
                    show: "/SMP/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<DeliveredProcedureOutlined />,
                      parent:"Operations",
                      label:"SMP",
                      
                    },
                  },
                  {
                    name: "JES",
                    list: "/JES",
                    create: "/JES/create",
                    edit: "/JES/edit/:id",
                    show: "/JES/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<DeliveredProcedureOutlined />,
                      parent:"Operations",
                      label:"JES"
                    },
                  },
                  {
                    name: "Training-Modules",
                    list: "/training-modules",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<ProjectOutlined />,
                      parent:"Operations",
                      label:"Training Modules",
                    },
                  },
                  {
                    name: "projects",
                    list: "/projects",
                    create: "/projects/create",
                    edit: "/projects/edit/:id",
                    show: "/projects/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<StarOutlined />,
                    },
                  },
                  {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: "/posts/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<TableOutlined />,
                    },
                  },
                  {
                    name: "tasks",
                    list: "/tasks",
                    create: "/tasks/create",
                    edit: "/tasks/edit/:id",
                    show: "/tasks/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<SolutionOutlined />,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<AppstoreOutlined />,                    
                    },
                  },
                  {
                    name: "profiles",
                    list: "/profiles",
                    create: "/profiles/create",
                    edit: "/profiles/edit/:id",
                    show: "/profiles/show/:id",
                    meta: {
                      canDelete: true,
                      icon:<UserOutlined />,
                    },
                  },
                ]}
                options={{
                  liveMode:"auto",
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "hvXL8W-YsyqHT-h8SPxs",
                  textTransformers: {
                    plural: (text) => text,
                    singular: (text) => text,
                  },
                }}
              >
                {renderComponent()}
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
