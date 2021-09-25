import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import pluginLogo from "./assets/images/logo.svg";
import App from "./containers/Main";
import PreviewLink from "./InjectedComponents/PreviewLink";
import ConfigureViewButton from "./InjectedComponents/ContentTypeBuilder/ConfigureViewButton";
import lifecycles from "./lifecycles";
import reducers from "./reducers";
import trads from "./translations";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: null,
    injectedComponents: [
      // This is the injection zone
      {
        plugin: "content-manager.editView",
        area: "right.links",
        component: PreviewLink,
        key: "content-manager.preview-link",
      },
      {
        plugin: "content-type-builder.listView",
        area: "list.link",
        component: ConfigureViewButton,
        key: "content-manager.link",
      },
    ],
    injectionZones: {
      editView: { informations: [] },
      listView: { actions: [], deleteModalAdditionalInfos: [] },
    },
    isReady: true,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name: pluginPkg.strapi.name,
    pluginLogo,
    preventComponentRendering: false,
    reducers,
    trads,
  };
  return strapi.registerPlugin(plugin);
};
