export const MENUITEMS = [
  // {
  //   menutitle: "DASHBOARD",
  //   Items: [
  //     {
  //       icon: <i className="side-menu__icon bx bx-home"></i>,
  //       type: "link",
  //       Name: "",
  //       active: false,
  //       selected: false,
  //       title: "Dashboards",
  //       badge: "",
  //       class: "badge bg-warning-transparent ms-2",
  //       path: `${import.meta.env.BASE_URL}dashboards/crm`,
  //     },
  //   ],
  // },
  {
    menutitle: "PDF",
    Items: [
      {
        icon: <i className="side-menu__icon bi bi-filetype-pdf mb-2"></i>,
        type: "link",
        Name: "",
        active: false,
        selected: false,
        title: "Pdf Uploader",
        badge: "",
        class: "badge bg-warning-transparent ms-2",
        path: `${import.meta.env.BASE_URL}upload-pdf`,    
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
