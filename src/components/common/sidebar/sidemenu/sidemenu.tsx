export const MENUITEMS = [
  {
    menutitle: "DASHBOARD",
    Items: [
      {
        icon: <i className="side-menu__icon bx bx-home"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Dashboards",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}dashboards/crm`,
      },
    ],
  },
  {
    menutitle: "PRODUCT CATALOG",
    Items: [
      {
        icon: <i className="side-menu__icon bi bi-terminal-plus mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Product Catalog",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}productentry/productentry`,    
        // children: [
        //   {   
        //     path: `${import.meta.env.BASE_URL}productdetails/productdetails`,
        //     title: "Add Product",
        //     type: "link",
        //     active: false,
        //     selected: false,
        //   },
        //   {   
           
        //     title: "Product Addition",
        //     type: "link",
        //     active: false,
        //     selected: false,
        //   },
        // ],
      },
    ],
  },
];
